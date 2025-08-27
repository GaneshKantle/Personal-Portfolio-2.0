import { EventEmitter } from 'events';
import { log } from './vite';

interface PoolConfig {
  name: string;
  urls: string[];
  minConnections?: number;
  maxConnections?: number;
  acquireTimeout?: number;
  idleTimeout?: number;
  loadBalancingStrategy?: 'round-robin' | 'least-connections' | 'random';
}

interface PooledConnection {
  id: string;
  url: string;
  inUse: boolean;
  lastUsed: Date;
  useCount: number;
  errors: number;
}

export class ConnectionPool extends EventEmitter {
  private config: Required<PoolConfig>;
  private connections: Map<string, PooledConnection> = new Map();
  private currentIndex = 0;
  private waitingQueue: Array<(conn: PooledConnection | null) => void> = [];

  constructor(config: PoolConfig) {
    super();
    
    this.config = {
      minConnections: 2,
      maxConnections: 10,
      acquireTimeout: 5000,
      idleTimeout: 300000, // 5 minutes
      loadBalancingStrategy: 'round-robin',
      ...config
    };

    this.initialize();
  }

  private async initialize() {
    // Create minimum connections
    for (let i = 0; i < this.config.minConnections; i++) {
      const url = this.selectUrl();
      await this.createConnection(url);
    }

    // Setup idle connection cleanup
    setInterval(() => this.cleanupIdleConnections(), 60000); // Check every minute

    log(`Connection pool ${this.config.name} initialized with ${this.connections.size} connections`);
  }

  private selectUrl(): string {
    if (this.config.urls.length === 1) {
      return this.config.urls[0];
    }

    switch (this.config.loadBalancingStrategy) {
      case 'round-robin':
        const url = this.config.urls[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.config.urls.length;
        return url;
      
      case 'random':
        return this.config.urls[Math.floor(Math.random() * this.config.urls.length)];
      
      case 'least-connections':
        // Find URL with least active connections
        const urlCounts = new Map<string, number>();
        this.config.urls.forEach(url => urlCounts.set(url, 0));
        
        this.connections.forEach(conn => {
          if (conn.inUse) {
            urlCounts.set(conn.url, (urlCounts.get(conn.url) || 0) + 1);
          }
        });
        
        let minUrl = this.config.urls[0];
        let minCount = Infinity;
        
        urlCounts.forEach((count, url) => {
          if (count < minCount) {
            minCount = count;
            minUrl = url;
          }
        });
        
        return minUrl;
      
      default:
        return this.config.urls[0];
    }
  }

  private async createConnection(url: string): Promise<PooledConnection> {
    const connection: PooledConnection = {
      id: `${this.config.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      url,
      inUse: false,
      lastUsed: new Date(),
      useCount: 0,
      errors: 0
    };

    this.connections.set(connection.id, connection);
    this.emit('connection:created', connection);
    
    return connection;
  }

  async acquire(): Promise<PooledConnection> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        const index = this.waitingQueue.indexOf(resolve);
        if (index > -1) {
          this.waitingQueue.splice(index, 1);
        }
        reject(new Error(`Connection acquire timeout after ${this.config.acquireTimeout}ms`));
      }, this.config.acquireTimeout);

      const tryAcquire = async () => {
        // Find available connection
        for (const [id, conn] of this.connections) {
          if (!conn.inUse && conn.errors < 3) {
            conn.inUse = true;
            conn.useCount++;
            conn.lastUsed = new Date();
            clearTimeout(timeout);
            resolve(conn);
            return;
          }
        }

        // Create new connection if under limit
        if (this.connections.size < this.config.maxConnections) {
          const url = this.selectUrl();
          const conn = await this.createConnection(url);
          conn.inUse = true;
          conn.useCount++;
          clearTimeout(timeout);
          resolve(conn);
          return;
        }

        // Wait for available connection
        this.waitingQueue.push((conn) => {
          clearTimeout(timeout);
          if (conn) {
            conn.inUse = true;
            conn.useCount++;
            conn.lastUsed = new Date();
            resolve(conn);
          } else {
            reject(new Error('Connection pool destroyed'));
          }
        });
      };

      tryAcquire().catch(reject);
    });
  }

  release(connectionId: string, hadError: boolean = false) {
    const conn = this.connections.get(connectionId);
    if (!conn) return;

    conn.inUse = false;
    conn.lastUsed = new Date();
    
    if (hadError) {
      conn.errors++;
      
      // Remove connection if too many errors
      if (conn.errors >= 3) {
        this.connections.delete(connectionId);
        this.emit('connection:removed', conn);
        log(`Removed connection ${connectionId} due to errors`);
        
        // Ensure minimum connections
        if (this.connections.size < this.config.minConnections) {
          const url = this.selectUrl();
          this.createConnection(url);
        }
      }
    }

    // Notify waiting requests
    if (this.waitingQueue.length > 0 && !hadError) {
      const waiter = this.waitingQueue.shift();
      if (waiter) waiter(conn);
    }

    this.emit('connection:released', conn);
  }

  private cleanupIdleConnections() {
    const now = Date.now();
    const toRemove: string[] = [];

    this.connections.forEach((conn, id) => {
      if (!conn.inUse && 
          this.connections.size > this.config.minConnections &&
          now - conn.lastUsed.getTime() > this.config.idleTimeout) {
        toRemove.push(id);
      }
    });

    toRemove.forEach(id => {
      this.connections.delete(id);
      log(`Removed idle connection ${id}`);
    });
  }

  getStats() {
    const stats = {
      total: this.connections.size,
      inUse: 0,
      available: 0,
      waiting: this.waitingQueue.length,
      errorRate: 0,
      connectionsByUrl: new Map<string, number>()
    };

    let totalErrors = 0;
    let totalUses = 0;

    this.connections.forEach(conn => {
      if (conn.inUse) {
        stats.inUse++;
      } else {
        stats.available++;
      }
      
      totalErrors += conn.errors;
      totalUses += conn.useCount;
      
      const urlCount = stats.connectionsByUrl.get(conn.url) || 0;
      stats.connectionsByUrl.set(conn.url, urlCount + 1);
    });

    stats.errorRate = totalUses > 0 ? totalErrors / totalUses : 0;

    return stats;
  }

  async destroy() {
    // Clear waiting queue
    this.waitingQueue.forEach(waiter => waiter(null));
    this.waitingQueue = [];

    // Clear all connections
    this.connections.clear();
    
    this.emit('pool:destroyed');
    log(`Connection pool ${this.config.name} destroyed`);
  }
}

// Factory for creating connection pools
export class ConnectionPoolManager {
  private static pools: Map<string, ConnectionPool> = new Map();

  static createPool(config: PoolConfig): ConnectionPool {
    if (this.pools.has(config.name)) {
      throw new Error(`Pool ${config.name} already exists`);
    }

    const pool = new ConnectionPool(config);
    this.pools.set(config.name, pool);
    return pool;
  }

  static getPool(name: string): ConnectionPool | undefined {
    return this.pools.get(name);
  }

  static async destroyPool(name: string): Promise<void> {
    const pool = this.pools.get(name);
    if (pool) {
      await pool.destroy();
      this.pools.delete(name);
    }
  }

  static async destroyAll(): Promise<void> {
    const promises = Array.from(this.pools.values()).map(pool => pool.destroy());
    await Promise.all(promises);
    this.pools.clear();
  }

  static getStats() {
    const stats: Record<string, any> = {};
    this.pools.forEach((pool, name) => {
      stats[name] = pool.getStats();
    });
    return stats;
  }
}