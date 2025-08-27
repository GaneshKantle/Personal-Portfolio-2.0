import React from 'react';
import { useBackendConnections } from '../hooks/useBackendConnections';
import { RefreshCw, CheckCircle, XCircle, AlertCircle, Activity } from 'lucide-react';

export function BackendMonitor() {
  const {
    connections,
    status,
    isLoading,
    isAutoRefresh,
    toggleAutoRefresh,
    refetch,
    connectedCount,
    totalCount,
  } = useBackendConnections();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'disconnected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'connecting':
        return <Activity className="w-4 h-4 text-yellow-500 animate-pulse" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'degraded':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center space-x-2">
          <Activity className="w-5 h-5 animate-spin" />
          <span>Loading backend status...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Backend Connections
        </h3>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(status || '')}`}>
            {status === 'healthy' ? 'All Systems Operational' : 'Some Services Degraded'}
          </span>
          <button
            onClick={() => refetch()}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Refresh status"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <label className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={isAutoRefresh}
              onChange={toggleAutoRefresh}
              className="rounded"
            />
            Auto-refresh
          </label>
        </div>
      </div>

      <div className="mb-2 text-sm text-gray-600">
        {connectedCount} of {totalCount} services connected
      </div>

      <div className="space-y-2">
        {connections.map((connection) => (
          <div
            key={connection.name}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
          >
            <div className="flex items-center gap-3">
              {getStatusIcon(connection.status)}
              <div>
                <div className="font-medium text-sm">{connection.name}</div>
                {connection.error && (
                  <div className="text-xs text-red-600 mt-1">{connection.error}</div>
                )}
              </div>
            </div>
            <div className="text-xs text-gray-500">
              Last check: {new Date(connection.lastCheck).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      {connections.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No backend services configured
        </div>
      )}
    </div>
  );
}