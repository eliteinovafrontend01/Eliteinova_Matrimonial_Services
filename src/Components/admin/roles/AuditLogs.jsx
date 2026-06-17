// src/components/admin/roles/AuditLogs.jsx
import { useState, useEffect, useMemo } from 'react';
import { Icon } from '../shared/Icon';
import { StatusBadge } from '../shared/StatusBadge';
import { ICONS } from '../../../constants/admin/icons';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

// Error Message Component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
    <div className="text-red-600 text-lg font-semibold mb-2">⚠️ Error</div>
    <div className="text-red-500 mb-4">{message}</div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    )}
  </div>
);

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`px-4 py-3 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-orange-500'
      } text-white flex items-center gap-3 min-w-[280px]`}>
        <span>{message}</span>
        <button onClick={onClose} className="text-white hover:text-gray-200 ml-auto">
          ✕
        </button>
      </div>
    </div>
  );
};

// Log Detail Modal
const LogDetailModal = ({ log, onClose }) => {
  if (!log) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Log Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            ✕
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">User</label>
              <p className="text-sm font-semibold text-gray-800">{log.user}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Action</label>
              <p className="text-sm">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  log.action.includes('Created') || log.action.includes('Assigned') 
                    ? 'bg-green-100 text-green-700'
                    : log.action.includes('Updated') 
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {log.action}
                </span>
              </p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Entity</label>
              <p className="text-sm text-gray-800">{log.entity}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">IP Address</label>
              <p className="text-sm font-mono text-gray-800">{log.ip}</p>
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-400 uppercase font-bold">Timestamp</label>
              <p className="text-sm text-gray-800">{log.timestamp}</p>
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-400 uppercase font-bold">Details</label>
              <p className="text-sm text-gray-800">{log.details}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('All');
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const itemsPerPage = 10;

  // Load logs data
  useEffect(() => {
    const loadLogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockLogs = [
          { id: 1, user: 'John Doe', action: 'Role Created', entity: 'Vendor Manager', details: 'Role with full vendor access', timestamp: '2024-01-15 10:30:00', ip: '192.168.1.1' },
          { id: 2, user: 'Jane Smith', action: 'User Assigned', entity: 'Mike Johnson', details: 'Assigned to Booking Manager role', timestamp: '2024-01-15 11:45:00', ip: '192.168.1.2' },
          { id: 3, user: 'Mike Johnson', action: 'Permission Updated', entity: 'Booking Management', details: 'Added Cancel and Reschedule permissions', timestamp: '2024-01-15 14:20:00', ip: '192.168.1.3' },
          { id: 4, user: 'Sarah Wilson', action: 'Role Deactivated', entity: 'Support Executive', details: 'Temporary deactivation for review', timestamp: '2024-01-15 15:10:00', ip: '192.168.1.4' },
          { id: 5, user: 'David Brown', action: 'Access Restricted', entity: 'Financial Data', details: 'Restricted access to Finance data', timestamp: '2024-01-15 16:30:00', ip: '192.168.1.5' },
          { id: 6, user: 'Emma White', action: 'Role Created', entity: 'Operations Manager', details: 'New role for operations oversight', timestamp: '2024-01-16 09:15:00', ip: '192.168.1.6' },
          { id: 7, user: 'Robert Taylor', action: 'Permission Updated', entity: 'Reports & Analytics', details: 'Added Export and Schedule permissions', timestamp: '2024-01-16 10:30:00', ip: '192.168.1.7' },
          { id: 8, user: 'Jennifer Lee', action: 'User Assigned', entity: 'Sarah Johnson', details: 'Assigned to Support Executive role', timestamp: '2024-01-16 11:45:00', ip: '192.168.1.8' },
          { id: 9, user: 'Michael Brown', action: 'Role Deactivated', entity: 'Temporary Admin', details: 'Deactivated due to inactivity', timestamp: '2024-01-16 14:20:00', ip: '192.168.1.9' },
          { id: 10, user: 'Sarah Wilson', action: 'Access Restricted', entity: 'KYC Data', details: 'Restricted access to sensitive KYC information', timestamp: '2024-01-16 15:10:00', ip: '192.168.1.10' },
          { id: 11, user: 'John Doe', action: 'Role Created', entity: 'Finance Manager', details: 'Role with full finance access', timestamp: '2024-01-17 09:00:00', ip: '192.168.1.11' },
          { id: 12, user: 'Jane Smith', action: 'Permission Updated', entity: 'Customer Management', details: 'Added Delete and Block permissions', timestamp: '2024-01-17 10:30:00', ip: '192.168.1.12' },
        ];
        setLogs(mockLogs);
      } catch (err) {
        setError('Failed to load audit logs. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadLogs();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const total = logs.length;
    const roleCreated = logs.filter(l => l.action === 'Role Created').length;
    const userAssigned = logs.filter(l => l.action === 'User Assigned').length;
    const permissionUpdated = logs.filter(l => l.action === 'Permission Updated').length;
    const roleDeactivated = logs.filter(l => l.action === 'Role Deactivated').length;
    const accessRestricted = logs.filter(l => l.action === 'Access Restricted').length;
    
    const uniqueUsers = new Set(logs.map(l => l.user)).size;
    
    return { total, roleCreated, userAssigned, permissionUpdated, roleDeactivated, accessRestricted, uniqueUsers };
  }, [logs]);

  // Filter logs
  const filteredLogs = useMemo(() => {
    try {
      return logs.filter(log => {
        const matchAction = filterType === 'All' || log.action === filterType;
        const matchSearch = !search || 
          log.user.toLowerCase().includes(search.toLowerCase()) ||
          log.action.toLowerCase().includes(search.toLowerCase()) ||
          log.entity.toLowerCase().includes(search.toLowerCase()) ||
          log.details.toLowerCase().includes(search.toLowerCase()) ||
          log.ip.includes(search);
        
        let matchDateRange = true;
        if (dateRange.start) {
          const logDate = new Date(log.timestamp);
          const startDate = new Date(dateRange.start);
          matchDateRange = logDate >= startDate;
          
          if (matchDateRange && dateRange.end) {
            const endDate = new Date(dateRange.end);
            matchDateRange = logDate <= endDate;
          }
        }
        
        return matchAction && matchSearch && matchDateRange;
      });
    } catch (err) {
      return [];
    }
  }, [logs, filterType, search, dateRange]);

  // Pagination logic
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  const paginatedData = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (type) => {
    setFilterType(type);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setFilterType('All');
    setSearch('');
    setDateRange({ start: '', end: '' });
    setShowDateFilter(false);
    setCurrentPage(1);
    showToast('All filters cleared!', 'success');
  };

  const handleExport = () => {
    try {
      const exportData = filteredLogs.map(log => ({
        'User': log.user,
        'Action': log.action,
        'Entity': log.entity,
        'Details': log.details,
        'Timestamp': log.timestamp,
        'IP Address': log.ip
      }));
      
      const headers = Object.keys(exportData[0] || {});
      const csvRows = [
        headers.join(','),
        ...exportData.map(row => headers.map(header => 
          `"${(row[header] || '').toString().replace(/"/g, '""')}"`
        ).join(','))
      ];
      
      const csvString = csvRows.join('\n');
      const blob = new Blob([csvString], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `audit_logs_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast(`Successfully exported ${filteredLogs.length} logs!`, 'success');
    } catch (err) {
      showToast('Error exporting data', 'error');
    }
  };

  const getActionColor = (action) => {
    if (action.includes('Created') || action.includes('Assigned')) {
      return 'bg-green-100 text-green-700';
    } else if (action.includes('Updated')) {
      return 'bg-blue-100 text-blue-700';
    } else if (action.includes('Deactivated')) {
      return 'bg-red-100 text-red-700';
    } else if (action.includes('Restricted')) {
      return 'bg-orange-100 text-orange-700';
    }
    return 'bg-gray-100 text-gray-700';
  };

  const getActionIcon = (action) => {
    if (action.includes('Created')) return '➕';
    if (action.includes('Assigned')) return '👤';
    if (action.includes('Updated')) return '✏️';
    if (action.includes('Deactivated')) return '⛔';
    if (action.includes('Restricted')) return '🔒';
    return '📌';
  };

  // Stat Cards
  const statCards = [
    { label: 'Total Logs', value: stats.total || 0, icon: '📋', color: 'border-blue-400', filter: 'All' },
    { label: 'Role Created', value: stats.roleCreated || 0, icon: '➕', color: 'border-green-400', filter: 'Role Created' },
    { label: 'User Assigned', value: stats.userAssigned || 0, icon: '👤', color: 'border-purple-400', filter: 'User Assigned' },
    { label: 'Permission Updated', value: stats.permissionUpdated || 0, icon: '✏️', color: 'border-indigo-400', filter: 'Permission Updated' },
    { label: 'Role Deactivated', value: stats.roleDeactivated || 0, icon: '⛔', color: 'border-red-400', filter: 'Role Deactivated' },
    { label: 'Unique Users', value: stats.uniqueUsers || 0, icon: '👥', color: 'border-amber-400', filter: 'All' },
  ];

  if (isLoading && logs.length === 0) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}

      {/* Log Detail Modal */}
      {showDetailModal && selectedLog && (
        <LogDetailModal 
          log={selectedLog}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedLog(null);
          }}
        />
      )}

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Audit Logs</h2>
            <p className="text-sm text-gray-500 mt-1">Maintain detailed logs of all admin activities for security and transparency</p>
          </div>
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            <Icon d={ICONS.download} size={16} />
            Export Logs
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {statCards.map((s, i) => (
            <div key={i} 
              onClick={() => s.filter && handleFilterChange(s.filter)}
              className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${s.color} ${s.filter ? 'cursor-pointer' : 'cursor-default'} transition-all duration-200 hover:shadow-md ${s.filter ? 'hover:-translate-y-0.5' : ''} ${filterType === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                  <p className="text-xl font-bold text-gray-800">{s.value}</p>
                  {filterType === s.filter && s.filter && (
                    <p className="text-[10px] text-red-500 font-bold mt-1">● Active</p>
                  )}
                </div>
                <div className="text-xl">{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex-1 min-w-[200px] relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon d={ICONS.search} size={15} />
            </span>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search logs by user, action, entity..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={filterType}
              onChange={(e) => handleFilterChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
            >
              <option value="All">📊 All Activities</option>
              <option value="Role Created">➕ Role Created</option>
              <option value="User Assigned">👤 User Assigned</option>
              <option value="Permission Updated">✏️ Permission Updated</option>
              <option value="Role Deactivated">⛔ Role Deactivated</option>
              <option value="Access Restricted">🔒 Access Restricted</option>
            </select>
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1 ${
                showDateFilter ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              📅 Date Filter
            </button>
          </div>
        </div>

        {/* Date Range Filter */}
        {showDateFilter && (
          <div className="flex flex-wrap items-center gap-3 mb-6 p-3 bg-gray-50 rounded-xl">
            <span className="text-xs font-semibold text-gray-600">Date Range:</span>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => {
                setDateRange({...dateRange, start: e.target.value});
                setCurrentPage(1);
              }}
              className="px-2 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-300"
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => {
                setDateRange({...dateRange, end: e.target.value});
                setCurrentPage(1);
              }}
              className="px-2 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-300"
            />
            {(filterType !== 'All' || search || dateRange.start || dateRange.end) && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-red-600 hover:text-red-700 font-semibold"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Logs Table */}
        <div className="overflow-x-auto">
          {paginatedData.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm text-gray-400">No logs found matching your filters</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="text-left py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="text-left py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Entity</th>
                  <th className="text-left py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="text-left py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="text-left py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th className="text-left py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedData.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                          {log.user.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{log.user}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getActionColor(log.action)}`}>
                        {getActionIcon(log.action)} {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 font-medium">{log.entity}</td>
                    <td className="py-3 px-4 text-sm text-gray-500 max-w-xs truncate">{log.details}</td>
                    <td className="py-3 px-4 text-sm text-gray-500 font-mono whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-3 px-4 text-sm text-gray-500 font-mono">{log.ip}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          setSelectedLog(log);
                          setShowDetailModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-xs font-semibold hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Showing {paginatedData.length} of {filteredLogs.length} logs
              {filterType !== 'All' && ` (filtered by ${filterType})`}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`w-7 h-7 text-xs rounded-lg font-semibold transition-colors ${
                  currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                ←
              </button>
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                  if (i === 4) pageNum = '...';
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                  if (i === 0) pageNum = '...';
                } else {
                  pageNum = currentPage - 2 + i;
                  if (i === 0 || i === 4) pageNum = i === 0 ? '...' : currentPage + 2;
                }
                return (
                  <button
                    key={i}
                    onClick={() => typeof pageNum === 'number' && setCurrentPage(pageNum)}
                    className={`w-7 h-7 text-xs rounded-lg font-semibold transition-colors ${
                      currentPage === pageNum ? 'bg-red-600 text-white' : 'text-gray-500 hover:bg-gray-100'
                    } ${typeof pageNum !== 'number' ? 'cursor-default' : ''}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`w-7 h-7 text-xs rounded-lg font-semibold transition-colors ${
                  currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'
                }`}
              >
                →
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400">
            Total: {filteredLogs.length} logs
            {filterType !== 'All' && ` • Filter: ${filterType}`}
            {search && ` • Search: "${search}"`}
            {(dateRange.start || dateRange.end) && ` • Date range applied`}
          </p>
          <p className="text-xs text-gray-400">
            Last updated: {new Date().toLocaleString('en-US', { 
              year: 'numeric', month: 'short', day: 'numeric',
              hour: '2-digit', minute: '2-digit', second: '2-digit'
            })}
          </p>
        </div>
      </div>

      {/* Security Note */}
      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">🔒 Security & Compliance</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/60 rounded-lg p-3">
            <p className="text-xs font-semibold text-blue-700">Data Retention</p>
            <p className="text-xs text-blue-600 mt-1">Logs are retained for 90 days for security compliance</p>
          </div>
          <div className="bg-white/60 rounded-lg p-3">
            <p className="text-xs font-semibold text-blue-700">Audit Trail</p>
            <p className="text-xs text-blue-600 mt-1">All admin actions are logged for transparency</p>
          </div>
          <div className="bg-white/60 rounded-lg p-3">
            <p className="text-xs font-semibold text-blue-700">IP Tracking</p>
            <p className="text-xs text-blue-600 mt-1">IP addresses are recorded for security monitoring</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};