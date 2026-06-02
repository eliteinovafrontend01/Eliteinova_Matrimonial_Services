// src/Components/admin/bookings/BookingHistoryPage.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { FeatureCard } from '../shared/FeatureCard';
import { allBookingsData } from '../../../data/admin/bookings';
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

// Log Details Modal
const LogDetailsModal = ({ log, onClose }) => {
  if (!log) return null;

  const getActionColor = (action) => {
    if (action === 'Booking Created') return 'bg-green-100 text-green-700';
    if (action === 'Payment Received') return 'bg-blue-100 text-blue-700';
    if (action === 'Vendor Assigned') return 'bg-purple-100 text-purple-700';
    if (action === 'Status Updated') return 'bg-amber-100 text-amber-700';
    if (action === 'Booking Cancelled') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Log Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-3">
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-gray-500">Date & Time</span>
            <span className="text-sm font-semibold text-gray-700">{log.date}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-gray-500">User</span>
            <span className="text-sm font-semibold text-gray-700">{log.user}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-gray-500">Action</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${getActionColor(log.action)}`}>{log.action}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-gray-500">Module</span>
            <span className="text-sm font-semibold text-gray-700">{log.module}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-gray-500">Booking ID</span>
            <span className="text-sm font-mono text-gray-700">{log.bookingId}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span className="text-sm text-gray-500">IP Address</span>
            <span className="text-sm font-mono text-gray-700">{log.ip}</span>
          </div>
          <div className="py-2">
            <span className="text-sm text-gray-500 block mb-2">Details</span>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">{log.details}</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 pt-0">
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

// Export Logs Modal
const ExportLogsModal = ({ logs, onExport, onClose }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onExport(logs, exportFormat, dateRange);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Export Logs</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Export Format</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="csv"
                  checked={exportFormat === 'csv'}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="text-red-600"
                />
                <span className="text-sm">CSV</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="excel"
                  checked={exportFormat === 'excel'}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="text-red-600"
                />
                <span className="text-sm">Excel</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="pdf"
                  checked={exportFormat === 'pdf'}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="text-red-600"
                />
                <span className="text-sm">PDF</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date Range (Optional)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                placeholder="Start Date"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                placeholder="End Date"
              />
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
            📊 Exporting {logs.length} log entries
          </div>
          
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Export
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const BookingHistoryPage = () => {
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [actionFilter, setActionFilter] = useState('');
  const [moduleFilter, setModuleFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const loadLogs = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Generate comprehensive log data
        const sampleLogs = [
          { id: 1, bookingId: 'BK-001', date: '2024-01-15 10:30:00', user: 'Admin User', action: 'Booking Created', module: 'Booking Management', details: 'New booking created for John Doe - Wedding Photography', ip: '192.168.1.1' },
          { id: 2, bookingId: 'BK-001', date: '2024-01-15 11:00:00', user: 'Admin User', action: 'Vendor Assigned', module: 'Vendor Management', details: 'Assigned to Wedding Planners Inc. for photography services', ip: '192.168.1.1' },
          { id: 3, bookingId: 'BK-001', date: '2024-01-16 09:15:00', user: 'System', action: 'Payment Received', module: 'Payment', details: 'Received advance payment of ₹15,000 via Credit Card', ip: 'System' },
          { id: 4, bookingId: 'BK-002', date: '2024-01-16 10:00:00', user: 'Customer', action: 'Booking Created', module: 'Booking', details: 'New booking for Jane Smith - Birthday Party', ip: '203.0.113.1' },
          { id: 5, bookingId: 'BK-001', date: '2024-01-17 14:30:00', user: 'Admin User', action: 'Status Updated', module: 'Booking Management', details: 'Status changed from Pending to Confirmed', ip: '192.168.1.1' },
          { id: 6, bookingId: 'BK-002', date: '2024-01-18 11:20:00', user: 'Admin User', action: 'Vendor Assigned', module: 'Vendor Management', details: 'Assigned to Grand Decor for decoration services', ip: '192.168.1.1' },
          { id: 7, bookingId: 'BK-003', date: '2024-01-19 09:00:00', user: 'Admin User', action: 'Booking Created', module: 'Booking', details: 'New booking for Mike Johnson - Corporate Event', ip: '192.168.1.2' },
          { id: 8, bookingId: 'BK-002', date: '2024-01-20 16:45:00', user: 'Customer', action: 'Payment Received', module: 'Payment', details: 'Partial payment of ₹8,000 received via UPI', ip: '203.0.113.1' },
          { id: 9, bookingId: 'BK-001', date: '2024-01-21 10:15:00', user: 'Admin User', action: 'Booking Updated', module: 'Booking Management', details: 'Event date changed from Feb 20 to Feb 25', ip: '192.168.1.1' },
          { id: 10, bookingId: 'BK-003', date: '2024-01-22 13:30:00', user: 'System', action: 'Vendor Assigned', module: 'Vendor Management', details: 'Assigned to Corporate Solutions for event planning', ip: 'System' },
          { id: 11, bookingId: 'BK-001', date: '2024-01-23 09:00:00', user: 'Admin User', action: 'Booking Completed', module: 'Booking', details: 'Event completed successfully', ip: '192.168.1.1' },
          { id: 12, bookingId: 'BK-004', date: '2024-01-24 11:30:00', user: 'Customer', action: 'Booking Cancelled', module: 'Booking', details: 'Cancellation requested - change of plans', ip: '203.0.113.3' },
        ];
        
        setLogs(sampleLogs);
      } catch (err) {
        setError('Failed to load audit logs');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadLogs();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const filtered = useMemo(() => {
    let filteredLogs = [...logs];
    
    // Search filter
    if (search) {
      filteredLogs = filteredLogs.filter(l =>
        l.bookingId.toLowerCase().includes(search.toLowerCase()) ||
        l.user.toLowerCase().includes(search.toLowerCase()) ||
        l.action.toLowerCase().includes(search.toLowerCase()) ||
        l.details.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Date range filter
    if (dateFilter.start && dateFilter.end) {
      filteredLogs = filteredLogs.filter(l => {
        const logDate = new Date(l.date);
        const startDate = new Date(dateFilter.start);
        const endDate = new Date(dateFilter.end);
        endDate.setHours(23, 59, 59);
        return logDate >= startDate && logDate <= endDate;
      });
    }
    
    // Action filter
    if (actionFilter) {
      filteredLogs = filteredLogs.filter(l => l.action === actionFilter);
    }
    
    // Module filter
    if (moduleFilter) {
      filteredLogs = filteredLogs.filter(l => l.module === moduleFilter);
    }
    
    return filteredLogs;
  }, [logs, search, dateFilter, actionFilter, moduleFilter]);

  const uniqueActions = [...new Set(logs.map(l => l.action))];
  const uniqueModules = [...new Set(logs.map(l => l.module))];

  const exportLogs = (logsToExport, format, dateRange) => {
    const exportData = logsToExport.map(log => ({
      'Date & Time': log.date,
      'User': log.user,
      'Action': log.action,
      'Module': log.module,
      'Booking ID': log.bookingId,
      'Details': log.details,
      'IP Address': log.ip
    }));
    
    if (format === 'csv') {
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
      
      showToast(`Exported ${logsToExport.length} log entries successfully!`, 'success');
    } else {
      showToast(`${format.toUpperCase()} export will be available soon!`, 'info');
    }
  };

  const stats = {
    totalLogs: logs.length,
    uniqueBookings: new Set(logs.map(l => l.bookingId)).size,
    uniqueUsers: new Set(logs.map(l => l.user)).size,
    recentActivity: logs.filter(l => {
      const logDate = new Date(l.date);
      const today = new Date();
      const diffDays = Math.floor((today - logDate) / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    }).length
  };

  const statCards = [
    { label: 'Total Logs', value: stats.totalLogs, icon: '📜', color: 'border-blue-400' },
    { label: 'Unique Bookings', value: stats.uniqueBookings, icon: '📋', color: 'border-green-400' },
    { label: 'Active Users', value: stats.uniqueUsers, icon: '👥', color: 'border-purple-400' },
    { label: '7-Day Activity', value: stats.recentActivity, icon: '📊', color: 'border-amber-400' },
  ];

  const getActionColor = (action) => {
    if (action === 'Booking Created') return 'bg-green-100 text-green-700';
    if (action === 'Payment Received') return 'bg-blue-100 text-blue-700';
    if (action === 'Vendor Assigned') return 'bg-purple-100 text-purple-700';
    if (action === 'Status Updated') return 'bg-amber-100 text-amber-700';
    if (action === 'Booking Cancelled') return 'bg-red-100 text-red-700';
    if (action === 'Booking Completed') return 'bg-emerald-100 text-emerald-700';
    if (action === 'Booking Updated') return 'bg-indigo-100 text-indigo-700';
    return 'bg-gray-100 text-gray-700';
  };

  const featureCards = [
    { emoji: '📜', title: 'Complete Audit Trail', accentColor: 'bg-blue-50', points: ['Every action recorded', 'Timestamp tracking', 'User attribution', 'IP logging'] },
    { emoji: '🔍', title: 'Forensic Analysis', accentColor: 'bg-purple-50', points: ['Search by criteria', 'Date range filtering', 'Action type filters', 'Export capabilities'] },
    { emoji: '📊', title: 'Compliance Reporting', accentColor: 'bg-green-50', points: ['Regulatory compliance', 'Audit ready reports', 'Data retention', 'Chain of custody'] },
    { emoji: '🛡️', title: 'Security Monitoring', accentColor: 'bg-red-50', points: ['Suspicious activity', 'Unauthorized access', 'Anomaly detection', 'Real-time alerts'] }
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div>
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-orange-500'
          } text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Modals */}
      {selectedLog && (
        <LogDetailsModal 
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}

      {showExportModal && (
        <ExportLogsModal 
          logs={filtered}
          onExport={exportLogs}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">📜</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Booking History & Logs</h3>
              <p className="text-sm text-gray-500 mt-0.5">Complete history of booking activities for tracking and audit purposes</p>
            </div>
          </div>
          <button 
            onClick={() => setShowExportModal(true)}
            className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1"
          >
            <Icon d={ICONS.download} size={13} /> Export Logs
          </button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-gray-800">{s.value}</p>
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Activity Timeline */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <h4 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center text-sm">⏱️</span>
          Recent Activity Timeline
        </h4>
        <div className="space-y-3">
          {logs.slice(0, 5).map(log => (
            <div key={log.id} className="flex items-start gap-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors">
              <div className="flex-shrink-0 w-32">
                <p className="text-xs text-gray-400">{log.date}</p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5"></div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getActionColor(log.action)}`}>
                    {log.action}
                  </span>
                  <span className="text-xs text-gray-400">{log.bookingId}</span>
                </div>
                <p className="text-sm text-gray-700">{log.details}</p>
                <p className="text-xs text-gray-400 mt-1">By: {log.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Logs Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.history} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Audit Logs</h3>
                <p className="text-xs text-gray-400">{filtered.length} log entries</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <input 
                type="date" 
                value={dateFilter.start}
                onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100" 
                placeholder="Start Date"
              />
              <input 
                type="date" 
                value={dateFilter.end}
                onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100" 
                placeholder="End Date"
              />
              {(dateFilter.start || dateFilter.end) && (
                <button 
                  onClick={() => setDateFilter({ start: '', end: '' })}
                  className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Clear Dates
                </button>
              )}
            </div>
          </div>
          
          {/* Search and Additional Filters */}
          <div className="space-y-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon d={ICONS.search} size={15} />
              </span>
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                type="text" 
                placeholder="Search by booking ID, user, action, or details..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
              >
                <option value="">All Actions</option>
                {uniqueActions.map(action => (
                  <option key={action} value={action}>{action}</option>
                ))}
              </select>
              <select
                value={moduleFilter}
                onChange={(e) => setModuleFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
              >
                <option value="">All Modules</option>
                {uniqueModules.map(module => (
                  <option key={module} value={module}>{module}</option>
                ))}
              </select>
              {(actionFilter || moduleFilter) && (
                <button 
                  onClick={() => {
                    setActionFilter('');
                    setModuleFilter('');
                  }}
                  className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Date & Time</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">User</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Action</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Module</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Booking ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Details</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-gray-400">
                    No log entries found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{log.date}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-gray-700">{log.user}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500">{log.module}</td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{log.bookingId}</td>
                    <td className="px-4 py-3 text-xs text-gray-500 max-w-md truncate" title={log.details}>
                      {log.details}
                    </td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => setSelectedLog(log)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                        title="View Details"
                      >
                        <Icon d={ICONS.eye} size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Card View */}
        <div className="lg:hidden p-4">
          {filtered.length === 0 ? (
            <div className="text-center text-sm text-gray-400 py-8">
              No log entries found matching your criteria.
            </div>
          ) : (
            filtered.map(log => (
              <div key={log.id} className="bg-white border border-gray-100 rounded-xl p-4 mb-3 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white text-xs font-bold">
                      {log.user.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{log.user}</div>
                      <div className="text-xs text-gray-400">{log.date}</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedLog(log)}
                    className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                  >
                    <Icon d={ICONS.eye} size={14} />
                  </button>
                </div>
                
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                    <span className="text-xs font-mono text-gray-400">{log.bookingId}</span>
                  </div>
                  <p className="text-xs text-gray-600">{log.details}</p>
                  <p className="text-xs text-gray-400">Module: {log.module}</p>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Summary Footer */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">
              Showing {filtered.length} of {logs.length} log entries
            </span>
            <span className="text-gray-400">
              Last updated: {new Date().toLocaleString()}
            </span>
          </div>
        </div>
      </div>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
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