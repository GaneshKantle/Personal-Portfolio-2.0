import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

interface ConnectionStatus {
  name: string;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  lastCheck: Date;
  error?: string;
}

interface ConnectionsResponse {
  status: 'healthy' | 'degraded';
  connections: ConnectionStatus[];
  timestamp: string;
}

export function useBackendConnections(refreshInterval = 30000) {
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

  const { data, error, isLoading, refetch } = useQuery<ConnectionsResponse>({
    queryKey: ['/api/connections'],
    refetchInterval: isAutoRefresh ? refreshInterval : false,
    retry: 1,
  });

  // Monitor connection changes
  useEffect(() => {
    if (data?.status === 'degraded') {
      console.warn('Some backend connections are degraded:', data.connections);
    }
  }, [data]);

  const toggleAutoRefresh = () => {
    setIsAutoRefresh(prev => !prev);
  };

  const getConnectionByName = (name: string) => {
    return data?.connections.find(conn => conn.name === name);
  };

  const isAllHealthy = data?.status === 'healthy';
  const connectedCount = data?.connections.filter(c => c.status === 'connected').length || 0;
  const totalCount = data?.connections.length || 0;

  return {
    connections: data?.connections || [],
    status: data?.status,
    isLoading,
    error,
    isAutoRefresh,
    toggleAutoRefresh,
    refetch,
    getConnectionByName,
    isAllHealthy,
    connectedCount,
    totalCount,
  };
}