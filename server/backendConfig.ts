import { connectionManager } from './connectionManager';
import { ConnectionPoolManager } from './connectionPool';
import { log } from './vite';

// Configuration for different backend services
export const backendConfigs = {
  // Main API servers with load balancing
  mainApi: {
    urls: [
      process.env.API_SERVER_1 || 'http://localhost:5001',
      process.env.API_SERVER_2 || 'http://localhost:5002',
      process.env.API_SERVER_3 || 'http://localhost:5003',
    ],
    poolConfig: {
      name: 'main-api-pool',
      minConnections: 3,
      maxConnections: 20,
      loadBalancingStrategy: 'least-connections' as const,
    }
  },
  
  // WebSocket servers for real-time features
  websocket: {
    urls: [
      process.env.WS_SERVER_1 || 'ws://localhost:6001',
      process.env.WS_SERVER_2 || 'ws://localhost:6002',
    ],
    poolConfig: {
      name: 'websocket-pool',
      minConnections: 2,
      maxConnections: 10,
      loadBalancingStrategy: 'round-robin' as const,
    }
  },
  
  // External APIs
  external: {
    weather: process.env.WEATHER_API_URL || 'https://api.weather.com',
    maps: process.env.MAPS_API_URL || 'https://api.maps.com',
    payment: process.env.PAYMENT_API_URL || 'https://api.payment.com',
  }
};

// Initialize all backend connections
export async function initializeBackends() {
  log('Initializing backend connections...');
  
  try {
    // 1. Create connection pools for load-balanced services
    if (backendConfigs.mainApi.urls.length > 0) {
      const mainApiPool = ConnectionPoolManager.createPool({
        ...backendConfigs.mainApi.poolConfig,
        urls: backendConfigs.mainApi.urls.filter(url => url),
      });
      
      // Register each URL as a separate backend for health monitoring
      backendConfigs.mainApi.urls.forEach((url, index) => {
        if (url) {
          connectionManager.registerBackend({
            name: `main-api-${index + 1}`,
            type: 'http',
            url,
            healthCheckEndpoint: '/health',
          });
        }
      });
    }
    
    // 2. Create WebSocket connection pool
    if (backendConfigs.websocket.urls.length > 0) {
      const wsPool = ConnectionPoolManager.createPool({
        ...backendConfigs.websocket.poolConfig,
        urls: backendConfigs.websocket.urls.filter(url => url),
      });
      
      // Register WebSocket servers
      backendConfigs.websocket.urls.forEach((url, index) => {
        if (url) {
          connectionManager.registerBackend({
            name: `websocket-${index + 1}`,
            type: 'websocket',
            url,
          });
        }
      });
    }
    
    // 3. Register external APIs
    Object.entries(backendConfigs.external).forEach(([name, url]) => {
      if (url) {
        connectionManager.registerBackend({
          name: `external-${name}`,
          type: 'http',
          url,
          healthCheckEndpoint: '/status',
          reconnectInterval: 10000, // Retry less frequently for external APIs
        });
      }
    });
    
    // 4. Connect to all backends simultaneously
    await connectionManager.connectAll();
    
    // 5. Setup monitoring
    setupBackendMonitoring();
    
    log('✅ Backend initialization complete');
  } catch (error) {
    log(`❌ Backend initialization failed: ${error.message}`);
    throw error;
  }
}

// Monitor backend health and performance
function setupBackendMonitoring() {
  // Log connection status changes
  connectionManager.on('status:changed', (status) => {
    if (status.status === 'error') {
      log(`⚠️  Backend ${status.name} error: ${status.error}`);
    }
  });
  
  // Log pool statistics periodically
  setInterval(() => {
    const poolStats = ConnectionPoolManager.getStats();
    const connectionStatuses = connectionManager.getStatuses();
    
    const summary = {
      pools: poolStats,
      connections: {
        total: connectionStatuses.length,
        connected: connectionStatuses.filter(s => s.status === 'connected').length,
        errors: connectionStatuses.filter(s => s.status === 'error').length,
      }
    };
    
    log(`Backend health: ${JSON.stringify(summary)}`);
  }, 60000); // Every minute
}

// Helper function to get a connection from pool
export async function getApiConnection() {
  const pool = ConnectionPoolManager.getPool('main-api-pool');
  if (!pool) {
    throw new Error('API connection pool not initialized');
  }
  
  return await pool.acquire();
}

// Helper function to make load-balanced API request
export async function makeBalancedRequest(
  path: string, 
  options: RequestInit = {}
): Promise<Response> {
  const conn = await getApiConnection();
  const pool = ConnectionPoolManager.getPool('main-api-pool');
  
  try {
    const response = await fetch(`${conn.url}${path}`, {
      ...options,
      headers: {
        'X-Connection-Id': conn.id,
        ...options.headers,
      }
    });
    
    pool?.release(conn.id, !response.ok);
    return response;
  } catch (error) {
    pool?.release(conn.id, true);
    throw error;
  }
}

// Graceful shutdown
export async function shutdownBackends() {
  log('Shutting down backend connections...');
  
  await Promise.all([
    connectionManager.disconnectAll(),
    ConnectionPoolManager.destroyAll(),
  ]);
  
  log('Backend connections closed');
}