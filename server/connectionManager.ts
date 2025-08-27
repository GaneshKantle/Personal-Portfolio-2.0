import { EventEmitter } from 'events';
import WebSocket from 'ws';
import { log } from './vite';

interface BackendConfig {
  name: string;
  type: 'http' | 'websocket' | 'database';
  url: string;
  healthCheckEndpoint?: string;
  reconnectInterval?: number;
  maxRetries?: number;
}

interface ConnectionStatus {
  name: string;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  lastCheck: Date;
  error?: string;
}

class BackendConnectionManager extends EventEmitter {
  private backends: Map<string, BackendConfig> = new Map();
  private connections: Map<string, any> = new Map();
  private statuses: Map<string, ConnectionStatus> = new Map();
  private healthCheckIntervals: Map<string, NodeJS.Timeout> = new Map();

  constructor() {
    super();
  }

  // Register a backend service
  registerBackend(config: BackendConfig) {
    this.backends.set(config.name, {
      reconnectInterval: 5000,
      maxRetries: 5,
      ...config
    });
    
    this.statuses.set(config.name, {
      name: config.name,
      status: 'disconnected',
      lastCheck: new Date()
    });

    log(`Registered backend: ${config.name} (${config.type}) at ${config.url}`);
  }

  // Connect to all registered backends
  async connectAll(): Promise<void> {
    const promises = Array.from(this.backends.values()).map(backend => 
      this.connect(backend.name)
    );
    
    await Promise.allSettled(promises);
  }

  // Connect to a specific backend
  async connect(name: string): Promise<void> {
    const backend = this.backends.get(name);
    if (!backend) {
      throw new Error(`Backend ${name} not registered`);
    }

    this.updateStatus(name, 'connecting');

    try {
      switch (backend.type) {
        case 'http':
          await this.connectHttp(backend);
          break;
        case 'websocket':
          await this.connectWebSocket(backend);
          break;
        case 'database':
          await this.connectDatabase(backend);
          break;
      }
    } catch (error) {
      this.updateStatus(name, 'error', error.message);
      this.scheduleReconnect(name);
    }
  }

  // HTTP backend connection
  private async connectHttp(backend: BackendConfig): Promise<void> {
    const healthUrl = backend.healthCheckEndpoint || `${backend.url}/health`;
    
    try {
      const response = await fetch(healthUrl, {
        method: 'GET',
        timeout: 5000
      });

      if (response.ok) {
        this.updateStatus(backend.name, 'connected');
        this.setupHealthCheck(backend);
      } else {
        throw new Error(`Health check failed: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`HTTP connection failed: ${error.message}`);
    }
  }

  // WebSocket backend connection
  private async connectWebSocket(backend: BackendConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(backend.url);
      
      ws.on('open', () => {
        this.connections.set(backend.name, ws);
        this.updateStatus(backend.name, 'connected');
        this.emit('websocket:connected', backend.name);
        
        // Setup ping/pong for connection health
        const pingInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.ping();
          }
        }, 30000);
        
        ws.on('close', () => {
          clearInterval(pingInterval);
          this.handleDisconnection(backend.name);
        });
        
        ws.on('error', (error) => {
          clearInterval(pingInterval);
          this.updateStatus(backend.name, 'error', error.message);
          this.scheduleReconnect(backend.name);
        });
        
        resolve();
      });
      
      ws.on('error', (error) => {
        reject(new Error(`WebSocket connection failed: ${error.message}`));
      });
      
      // Set connection timeout
      setTimeout(() => {
        if (ws.readyState === WebSocket.CONNECTING) {
          ws.terminate();
          reject(new Error('WebSocket connection timeout'));
        }
      }, 10000);
    });
  }

  // Database backend connection (placeholder for actual implementation)
  private async connectDatabase(backend: BackendConfig): Promise<void> {
    // This would be replaced with actual database connection logic
    // For example, using pg for PostgreSQL or mongoose for MongoDB
    log(`Connecting to database: ${backend.name}`);
    
    // Simulate connection
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    this.updateStatus(backend.name, 'connected');
    this.setupHealthCheck(backend);
  }

  // Setup health check for a backend
  private setupHealthCheck(backend: BackendConfig): void {
    if (backend.healthCheckEndpoint || backend.type === 'http') {
      const interval = setInterval(async () => {
        try {
          await this.checkHealth(backend);
        } catch (error) {
          this.handleDisconnection(backend.name);
        }
      }, 30000); // Check every 30 seconds
      
      this.healthCheckIntervals.set(backend.name, interval);
    }
  }

  // Check health of a backend
  private async checkHealth(backend: BackendConfig): Promise<void> {
    if (backend.type === 'http') {
      const healthUrl = backend.healthCheckEndpoint || `${backend.url}/health`;
      const response = await fetch(healthUrl, {
        method: 'GET',
        timeout: 5000
      });
      
      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`);
      }
    }
  }

  // Handle disconnection
  private handleDisconnection(name: string): void {
    this.updateStatus(name, 'disconnected');
    this.connections.delete(name);
    
    const interval = this.healthCheckIntervals.get(name);
    if (interval) {
      clearInterval(interval);
      this.healthCheckIntervals.delete(name);
    }
    
    this.emit('backend:disconnected', name);
    this.scheduleReconnect(name);
  }

  // Schedule reconnection
  private scheduleReconnect(name: string, retryCount = 0): void {
    const backend = this.backends.get(name);
    if (!backend || retryCount >= backend.maxRetries) {
      log(`Max retries reached for ${name}, giving up`);
      return;
    }
    
    const delay = backend.reconnectInterval * Math.pow(2, retryCount); // Exponential backoff
    
    log(`Scheduling reconnect for ${name} in ${delay}ms (attempt ${retryCount + 1})`);
    
    setTimeout(async () => {
      try {
        await this.connect(name);
      } catch (error) {
        this.scheduleReconnect(name, retryCount + 1);
      }
    }, delay);
  }

  // Update connection status
  private updateStatus(name: string, status: ConnectionStatus['status'], error?: string): void {
    const currentStatus = this.statuses.get(name);
    if (currentStatus) {
      currentStatus.status = status;
      currentStatus.lastCheck = new Date();
      currentStatus.error = error;
      
      this.emit('status:changed', currentStatus);
      log(`${name}: ${status}${error ? ` - ${error}` : ''}`);
    }
  }

  // Get all connection statuses
  getStatuses(): ConnectionStatus[] {
    return Array.from(this.statuses.values());
  }

  // Get specific connection
  getConnection(name: string): any {
    return this.connections.get(name);
  }

  // Disconnect all backends
  async disconnectAll(): Promise<void> {
    for (const [name, connection] of this.connections) {
      if (connection && connection.close) {
        connection.close();
      }
      this.updateStatus(name, 'disconnected');
    }
    
    for (const interval of this.healthCheckIntervals.values()) {
      clearInterval(interval);
    }
    
    this.connections.clear();
    this.healthCheckIntervals.clear();
  }
}

export const connectionManager = new BackendConnectionManager();