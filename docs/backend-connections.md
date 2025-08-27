# Backend Connection System

This project includes a comprehensive backend connection management system that supports automatic and simultaneous connections to multiple backend services.

## Features

### 1. **Automatic Connection Management**
- Automatically connects to all configured backends on server startup
- Supports HTTP, WebSocket, and database connections
- Built-in health checking and monitoring
- Automatic reconnection with exponential backoff

### 2. **Connection Pooling**
- Efficient connection pooling for better resource utilization
- Configurable pool sizes (min/max connections)
- Connection acquisition timeout handling
- Idle connection cleanup

### 3. **Load Balancing**
- Multiple load balancing strategies:
  - Round-robin
  - Least-connections
  - Random selection
- Automatic failover for unhealthy backends
- Real-time connection statistics

### 4. **Health Monitoring**
- Built-in health check endpoints
- Real-time connection status monitoring
- React hook for frontend integration
- Automatic error tracking and reporting

## Configuration

Create a `.env` file based on `.env.example`:

```bash
# Enable automatic backend connections
ENABLE_AUTO_CONNECT=true

# Configure your backend services
API_SERVER_1=http://localhost:5001
API_SERVER_2=http://localhost:5002
WS_SERVER_1=ws://localhost:6001

# Database connection
DATABASE_URL=postgresql://user:password@localhost:5432/myapp

# External APIs
WEATHER_API_URL=https://api.weather.com
PAYMENT_API_URL=https://api.payment.com
```

## Usage

### Server-Side

The backend connections are automatically initialized when the server starts:

```typescript
// Connections are established automatically on server startup
// No manual initialization required if ENABLE_AUTO_CONNECT=true
```

To use load-balanced API requests:

```typescript
import { makeBalancedRequest } from './server/backendConfig';

// Make a request to a load-balanced backend
const response = await makeBalancedRequest('/api/users', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### Client-Side

Use the React hook to monitor backend connections:

```tsx
import { useBackendConnections } from '@/hooks/useBackendConnections';

function MyComponent() {
  const { connections, status, isAllHealthy } = useBackendConnections();

  return (
    <div>
      {isAllHealthy ? (
        <p>All backends connected</p>
      ) : (
        <p>Some backends are offline</p>
      )}
    </div>
  );
}
```

Or use the pre-built monitoring component:

```tsx
import { BackendMonitor } from '@/components/BackendMonitor';

function Dashboard() {
  return (
    <div>
      <BackendMonitor />
    </div>
  );
}
```

## API Endpoints

### Health Check Endpoints

- `GET /api/health` - Main server health check
- `GET /api/connections` - All backend connections status
- `GET /api/connections/:name/health` - Specific backend health

### Example Response

```json
{
  "status": "healthy",
  "connections": [
    {
      "name": "main-api-1",
      "status": "connected",
      "lastCheck": "2024-01-15T10:30:00.000Z"
    },
    {
      "name": "websocket-1",
      "status": "connected",
      "lastCheck": "2024-01-15T10:30:00.000Z"
    }
  ],
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Architecture

### Connection Manager
- Central hub for all backend connections
- Event-driven architecture for status updates
- Automatic retry logic with exponential backoff

### Connection Pool
- Manages a pool of reusable connections
- Prevents connection exhaustion
- Handles connection lifecycle

### Load Balancer
- Distributes requests across multiple backends
- Monitors backend health
- Automatic failover handling

## Best Practices

1. **Environment Configuration**
   - Use environment variables for all backend URLs
   - Enable only the features you need
   - Configure appropriate timeout values

2. **Error Handling**
   - The system continues running even if some backends fail
   - Failed connections are automatically retried
   - Monitor logs for connection issues

3. **Performance**
   - Connection pools prevent connection overhead
   - Load balancing improves response times
   - Health checks run asynchronously

4. **Monitoring**
   - Use the BackendMonitor component in admin dashboards
   - Check server logs for connection events
   - Monitor the /api/connections endpoint

## Troubleshooting

### Connections failing to establish
1. Check that backend services are running
2. Verify URLs in environment configuration
3. Check network connectivity
4. Review server logs for error details

### High connection pool usage
1. Increase POOL_MAX_CONNECTIONS
2. Check for connection leaks
3. Review connection release logic
4. Monitor pool statistics

### WebSocket disconnections
1. Check WebSocket server availability
2. Verify firewall/proxy settings
3. Review reconnection settings
4. Check for network stability issues