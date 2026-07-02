// src/components/admin/notifications/HistoryLogs.jsx
import React, { useState, useEffect, useMemo } from 'react';
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
const Toast = ({ message, type, onClose }) => (
  <div className="fixed top-4 right-4 z-50 animate-slide-in">
    <div className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
      type === 'success' ? 'bg-green-500' : 
      type === 'error' ? 'bg-red-500' : 
      'bg-blue-500'
    } text-white`}>
      <span>{message}</span>
      <button onClick={onClose} className="text-white hover:text-gray-200">
        <Icon d={ICONS.cancel} size={16} />
      </button>
    </div>
  </div>
);

// View Log Details Modal
const LogDetailsModal = ({ log, onClose }) => {
  if (!log) return null;

  const getChannelColor = (channel) => {
    const colors = {
      'Push': 'bg-blue-50 text-blue-700',
      'SMS': 'bg-green-50 text-green-700',
      'Email': 'bg-purple-50 text-purple-700',
      'In-App': 'bg-orange-50 text-orange-700'
    };
    return colors[channel] || 'bg-gray-50 text-gray-700';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Log Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl mb-3">📜</div>
            <h4 className="text-lg font-bold text-gray-800">{log.notification}</h4>
            <StatusBadge status={log.status} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Log ID</span>
              <span className="text-sm font-mono text-gray-700">#{log.id.toString().padStart(3, '0')}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Channel</span>
              <span className={`text-sm font-semibold px-2 py-0.5 rounded-lg ${getChannelColor(log.channel)}`}>
                {log.channel}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Audience</span>
              <span className="text-sm font-semibold text-gray-700">{log.audience}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Sent Time</span>
              <span className="text-sm font-semibold text-gray-700">{log.sent}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">User</span>
              <span className="text-sm font-semibold text-gray-700">{log.user}</span>
            </div>
            {log.recipients && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Recipients</span>
                <span className="text-sm font-semibold text-gray-700">{log.recipients}</span>
              </div>
            )}
            {log.deliveryTime && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Delivery Time</span>
                <span className="text-sm font-semibold text-gray-700">{log.deliveryTime}</span>
              </div>
            )}
          </div>
          
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const HistoryLogs = () => {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChannel, setFilterChannel] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [dateRange, setDateRange] = useState('Today');
  const [selectedLog, setSelectedLog] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [stats, setStats] = useState({
    totalLogs: 0,
    uniqueUsers: 0,
    storageUsed: '0 MB',
    storageLimit: '100 MB'
  });

  // Load logs data
  useEffect(() => {
    const loadLogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const sampleLogs = [
          { id: 1, notification: 'Booking Confirmation', channel: 'Push', audience: 'Customers', sent: '2024-03-21 10:30 AM', status: 'Delivered', user: 'System', recipients: '247', deliveryTime: '1.2 min' },
          { id: 2, notification: 'OTP Verification', channel: 'SMS', audience: 'All Users', sent: '2024-03-21 10:35 AM', status: 'Delivered', user: 'System', recipients: '856', deliveryTime: '0.8 min' },
          { id: 3, notification: 'Vendor Approval', channel: 'Email', audience: 'Vendors', sent: '2024-03-21 11:00 AM', status: 'Delivered', user: 'Admin', recipients: '45', deliveryTime: '2.3 min' },
          { id: 4, notification: 'Payment Success', channel: 'Push', audience: 'Customers', sent: '2024-03-21 11:15 AM', status: 'Failed', user: 'System', recipients: '0', deliveryTime: 'Failed' },
          { id: 5, notification: 'Weekly Newsletter', channel: 'Email', audience: 'All Users', sent: '2024-03-21 12:00 PM', status: 'Delivered', user: 'Admin', recipients: '5,432', deliveryTime: '15.2 min' },
          { id: 6, notification: 'Promotional Offer', channel: 'Push', audience: 'Selected Users', sent: '2024-03-21 01:30 PM', status: 'Sent', user: 'Marketing', recipients: '2,103', deliveryTime: 'Pending' },
          { id: 7, notification: 'Booking Reminder', channel: 'SMS', audience: 'Customers', sent: '2024-03-21 02:00 PM', status: 'Delivered', user: 'System', recipients: '634', deliveryTime: '1.8 min' },
          { id: 8, notification: 'Event Reminder', channel: 'Push', audience: 'All Users', sent: '2024-03-21 02:30 PM', status: 'Delivered', user: 'System', recipients: '1,543', deliveryTime: '2.1 min' },
          { id: 9, notification: 'Feedback Request', channel: 'Email', audience: 'Customers', sent: '2024-03-21 03:00 PM', status: 'Sent', user: 'Admin', recipients: '3,210', deliveryTime: 'Pending' },
          { id: 10, notification: 'Welcome Message', channel: 'In-App', audience: 'All Users', sent: '2024-03-21 03:30 PM', status: 'Delivered', user: 'System', recipients: '1,247', deliveryTime: '0.5 min' },
        ];
        
        setLogs(sampleLogs);
        setStats({
          totalLogs: sampleLogs.length,
          uniqueUsers: 342,
          storageUsed: '2.4 MB',
          storageLimit: '100 MB'
        });
      } catch (err) {
        setError('Failed to load logs data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadLogs();
  }, []);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Filter logs
  const filteredLogs = useMemo(() => {
    let filtered = logs;
    
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.notification.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.audience.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterChannel !== 'All') {
      filtered = filtered.filter(log => log.channel === filterChannel);
    }
    
    if (filterStatus !== 'All') {
      filtered = filtered.filter(log => log.status === filterStatus);
    }
    
    // Date range filtering (simplified for demo)
    if (dateRange === 'Today') {
      // In real implementation, filter by today's date
    } else if (dateRange === 'Yesterday') {
      // Filter by yesterday
    } else if (dateRange === 'Week') {
      // Filter by this week
    } else if (dateRange === 'Month') {
      // Filter by this month
    }
    
    return filtered;
  }, [logs, searchTerm, filterChannel, filterStatus, dateRange]);

  // Handle delete log
  const handleDeleteLog = (logId) => {
    if (window.confirm('Are you sure you want to delete this log entry?')) {
      setLogs(prev => prev.filter(log => log.id !== logId));
      showToast('Log entry deleted successfully!', 'success');
    }
  };

  // Handle export CSV
  const handleExportCSV = () => {
    try {
      const exportData = filteredLogs.map(log => ({
        'ID': `#${log.id.toString().padStart(3, '0')}`,
        'Notification': log.notification,
        'Channel': log.channel,
        'Audience': log.audience,
        'Sent Time': log.sent,
        'Status': log.status,
        'User': log.user,
        'Recipients': log.recipients || 'N/A',
        'Delivery Time': log.deliveryTime || 'N/A'
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
      link.download = `history_logs_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast(`Successfully exported ${filteredLogs.length} logs!`, 'success');
    } catch (err) {
      showToast('Error exporting data', 'error');
    }
  };

  // Handle export PDF (simulated)
  const handleExportPDF = () => {
    showToast('PDF export will be available soon!', 'info');
  };

  // Get channel color
  const getChannelColor = (channel) => {
    const colors = {
      'Push': 'bg-blue-50 text-blue-700',
      'SMS': 'bg-green-50 text-green-700',
      'Email': 'bg-purple-50 text-purple-700',
      'In-App': 'bg-orange-50 text-orange-700'
    };
    return colors[channel] || 'bg-gray-50 text-gray-700';
  };

  // Stat cards
  const statCards = [
    { label: 'Total Logs', value: stats.totalLogs.toLocaleString(), icon: '📋', color: 'border-blue-400' },
    { label: 'Unique Users', value: stats.uniqueUsers.toLocaleString(), icon: '👤', color: 'border-green-400' },
    { label: 'Storage Used', value: stats.storageUsed, icon: '💾', color: 'border-purple-400', subtext: `of ${stats.storageLimit} limit` },
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div>
      {/* Toast Notification */}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}

      {/* Log Details Modal */}
      {showDetailsModal && selectedLog && (
        <LogDetailsModal 
          log={selectedLog}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedLog(null);
          }}
        />
      )}

      {/* Header Section - Matching Booking Overview Theme */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-red-50 to-amber-50 border border-red-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📜</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">History & Logs</h3>
            <p className="text-sm text-gray-500 mt-0.5">Maintain a record of all notifications sent for tracking and auditing</p>
          </div>
        </div>
      </div>

      {/* Stats Cards - Matching Booking Overview Theme */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                {s.subtext && (
                  <p className="text-xs text-gray-500 mt-1">{s.subtext}</p>
                )}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
            {s.label === 'Storage Used' && (
              <div className="mt-3 h-1.5 bg-gray-200 rounded-full">
                <div className="w-[2.4%] h-1.5 bg-red-500 rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Search and Filters - Matching Booking Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.logs} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Notification Logs</h3>
                <p className="text-xs text-gray-400">
                  {filteredLogs.length} log{filteredLogs.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleExportCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <Icon d={ICONS.download} size={13} /> Export CSV
              </button>
              <button 
                onClick={handleExportPDF}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <Icon d={ICONS.download} size={13} /> Export PDF
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px] relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon d={ICONS.search} size={15} />
                </span>
                <input 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  type="text" 
                  placeholder="Search by notification, user or audience..." 
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50"
                />
              </div>
              <select
                value={filterChannel}
                onChange={(e) => setFilterChannel(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                <option value="All">All Channels</option>
                <option value="Push">Push</option>
                <option value="SMS">SMS</option>
                <option value="Email">Email</option>
                <option value="In-App">In-App</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                <option value="All">All Status</option>
                <option value="Sent">Sent</option>
                <option value="Delivered">Delivered</option>
                <option value="Failed">Failed</option>
              </select>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                <option value="Today">📅 Today</option>
                <option value="Yesterday">📅 Yesterday</option>
                <option value="Week">📅 This Week</option>
                <option value="Month">📅 This Month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Notification</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Channel</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Audience</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sent Time</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-4 py-12 text-center text-sm text-gray-400">
                    No logs found for the selected filters.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">#{log.id.toString().padStart(3, '0')}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{log.notification}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${getChannelColor(log.channel)}`}>
                        {log.channel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{log.audience}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{log.sent}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{log.user}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => {
                            setSelectedLog(log);
                            setShowDetailsModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View Details"
                        >
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        <button 
                          onClick={() => handleDeleteLog(log.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                          title="Delete Log"
                        >
                          <Icon d={ICONS.delete} size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden p-4">
          {filteredLogs.length === 0 ? (
            <div className="text-center text-sm text-gray-400 py-8">
              No logs found for the selected filters.
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="bg-white border border-gray-100 rounded-xl p-4 mb-3 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{log.notification}</div>
                    <div className="text-xs text-gray-400 font-mono">#{log.id.toString().padStart(3, '0')}</div>
                  </div>
                  <StatusBadge status={log.status} />
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div>
                    <span className="text-gray-400">Channel:</span>
                    <span className={`ml-1 font-medium ${getChannelColor(log.channel)}`}>{log.channel}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Audience:</span>
                    <span className="text-gray-700 ml-1">{log.audience}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Sent:</span>
                    <span className="text-gray-700 ml-1">{log.sent}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">User:</span>
                    <span className="text-gray-700 ml-1">{log.user}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-50">
                  <button 
                    onClick={() => {
                      setSelectedLog(log);
                      setShowDetailsModal(true);
                    }}
                    className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                    title="View Details"
                  >
                    <Icon d={ICONS.eye} size={14} />
                  </button>
                  <button 
                    onClick={() => handleDeleteLog(log.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                    title="Delete Log"
                  >
                    <Icon d={ICONS.delete} size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Stats - Matching Booking Overview Style */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Log Insights</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">Total Logs</p>
            <p className="text-lg font-bold text-blue-600">{stats.totalLogs}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Unique Users</p>
            <p className="text-lg font-bold text-green-600">{stats.uniqueUsers}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Storage Used</p>
            <p className="text-lg font-bold text-purple-600">{stats.storageUsed}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Logs Today</p>
            <p className="text-lg font-bold text-amber-600">{filteredLogs.length}</p>
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