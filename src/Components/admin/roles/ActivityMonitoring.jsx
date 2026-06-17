// src/components/admin/roles/ActivityMonitoring.jsx
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

// Activity Detail Modal
const ActivityDetailModal = ({ activity, onClose }) => {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Activity Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            ✕
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">User</label>
              <p className="text-sm font-semibold text-gray-800">{activity.user}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Status</label>
              <div className="mt-1">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                  activity.status === 'Success' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {activity.status}
                </span>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Action</label>
              <p className="text-sm text-gray-800">{activity.action}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Module</label>
              <p className="text-sm text-gray-800">{activity.module}</p>
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-400 uppercase font-bold">Timestamp</label>
              <p className="text-sm text-gray-800">{activity.timestamp}</p>
            </div>
            {activity.details && (
              <div className="col-span-2">
                <label className="text-xs text-gray-400 uppercase font-bold">Details</label>
                <p className="text-sm text-gray-800">{activity.details}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ActivityMonitoring = () => {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [autoRefresh, setAutoRefresh] = useState(false);

  const itemsPerPage = 10;

  // Load activities
  useEffect(() => {
    const loadActivities = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockActivities = [
          { id: 1, user: 'John Doe', action: 'Login', module: 'System', timestamp: '2024-01-15 10:30:00', status: 'Success', details: 'User logged in from IP 192.168.1.1' },
          { id: 2, user: 'Jane Smith', action: 'Vendor Approval', module: 'Vendor Management', timestamp: '2024-01-15 11:45:00', status: 'Success', details: 'Approved vendor "ABC Events" for photography services' },
          { id: 3, user: 'Mike Johnson', action: 'Booking Update', module: 'Booking Management', timestamp: '2024-01-15 14:20:00', status: 'Success', details: 'Updated booking #BK-2024-001 status to Confirmed' },
          { id: 4, user: 'Sarah Wilson', action: 'Complaint Resolved', module: 'Support', timestamp: '2024-01-15 15:10:00', status: 'Success', details: 'Resolved complaint #CP-2024-045 regarding vendor behavior' },
          { id: 5, user: 'David Brown', action: 'Payment Processing', module: 'Payments', timestamp: '2024-01-15 16:30:00', status: 'Failed', details: 'Payment processing failed for booking #BK-2024-023 - insufficient funds' },
          { id: 6, user: 'John Doe', action: 'Role Update', module: 'User Management', timestamp: '2024-01-15 17:00:00', status: 'Success', details: 'Updated permissions for role "Vendor Manager"' },
          { id: 7, user: 'Emma White', action: 'Report Generated', module: 'Analytics', timestamp: '2024-01-15 18:15:00', status: 'Success', details: 'Generated monthly revenue report for December 2024' },
          { id: 8, user: 'Robert Taylor', action: 'User Deactivation', module: 'User Management', timestamp: '2024-01-15 19:00:00', status: 'Success', details: 'Deactivated user account for security reasons' },
          { id: 9, user: 'Jennifer Lee', action: 'Content Update', module: 'System', timestamp: '2024-01-15 20:30:00', status: 'Failed', details: 'Failed to update system configuration - validation error' },
          { id: 10, user: 'Michael Brown', action: 'Export Data', module: 'Reports', timestamp: '2024-01-15 21:45:00', status: 'Success', details: 'Exported vendor performance report' },
          { id: 11, user: 'Sarah Wilson', action: 'Ticket Escalated', module: 'Support', timestamp: '2024-01-15 22:00:00', status: 'Success', details: 'Escalated support ticket to Level 2' },
          { id: 12, user: 'John Doe', action: 'Security Audit', module: 'System', timestamp: '2024-01-15 23:15:00', status: 'Success', details: 'Completed security audit check' },
        ];
        setActivities(mockActivities);
      } catch (err) {
        setError('Failed to load activities. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadActivities();

    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        setActivities(prev => {
          const newActivity = {
            id: Date.now(),
            user: 'System',
            action: 'Auto Refresh',
            module: 'System',
            timestamp: new Date().toLocaleString('en-US', { 
              year: 'numeric', month: '2-digit', day: '2-digit',
              hour: '2-digit', minute: '2-digit', second: '2-digit'
            }),
            status: 'Success',
            details: 'Auto-refresh triggered - monitoring active'
          };
          return [newActivity, ...prev.slice(0, 49)];
        });
      }, 30000);
    }

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const total = activities.length;
    const success = activities.filter(a => a.status === 'Success').length;
    const failed = activities.filter(a => a.status === 'Failed').length;
    const successRate = total > 0 ? Math.round((success / total) * 100) : 0;
    const uniqueUsers = new Set(activities.map(a => a.user)).size;
    
    const modules = {};
    activities.forEach(a => {
      modules[a.module] = (modules[a.module] || 0) + 1;
    });
    
    return { total, success, failed, successRate, uniqueUsers, modules };
  }, [activities]);

  // Filter activities
  const filteredActivities = useMemo(() => {
    try {
      return activities.filter(activity => {
        const matchFilter = filter === 'All' || activity.status === filter;
        const matchSearch = !search || 
          activity.user.toLowerCase().includes(search.toLowerCase()) ||
          activity.action.toLowerCase().includes(search.toLowerCase()) ||
          activity.module.toLowerCase().includes(search.toLowerCase()) ||
          (activity.details && activity.details.toLowerCase().includes(search.toLowerCase()));
        
        let matchDateRange = true;
        if (dateRange.start) {
          const activityDate = new Date(activity.timestamp);
          const startDate = new Date(dateRange.start);
          matchDateRange = activityDate >= startDate;
          
          if (matchDateRange && dateRange.end) {
            const endDate = new Date(dateRange.end);
            matchDateRange = activityDate <= endDate;
          }
        }
        
        return matchFilter && matchSearch && matchDateRange;
      });
    } catch (err) {
      return [];
    }
  }, [activities, filter, search, dateRange]);

  // Pagination logic
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedData = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stat Cards
  const statCards = [
    { label: 'Total Activities', value: stats.total || 0, icon: '📋', color: 'border-blue-400', filter: 'All' },
    { label: 'Success Rate', value: `${stats.successRate || 0}%`, icon: '✅', color: 'border-green-400', filter: 'Success' },
    { label: 'Active Users', value: stats.uniqueUsers || 0, icon: '👤', color: 'border-purple-400', filter: 'All' },
    { label: 'Failed Activities', value: stats.failed || 0, icon: '❌', color: 'border-red-400', filter: 'Failed' },
  ];

  const getModuleColor = (module) => {
    const colors = {
      'System': 'bg-purple-100 text-purple-700',
      'Vendor Management': 'bg-blue-100 text-blue-700',
      'Booking Management': 'bg-green-100 text-green-700',
      'Support': 'bg-orange-100 text-orange-700',
      'Payments': 'bg-red-100 text-red-700',
      'User Management': 'bg-indigo-100 text-indigo-700',
      'Analytics': 'bg-teal-100 text-teal-700',
      'Reports': 'bg-amber-100 text-amber-700'
    };
    return colors[module] || 'bg-gray-100 text-gray-700';
  };

  const getActionIcon = (action) => {
    const icons = {
      'Login': '🔑',
      'Logout': '🚪',
      'Vendor Approval': '✅',
      'Booking Update': '📝',
      'Complaint Resolved': '🎯',
      'Payment Processing': '💳',
      'Role Update': '👤',
      'Report Generated': '📊',
      'User Deactivation': '⛔',
      'Content Update': '📄',
      'Export Data': '📤',
      'Ticket Escalated': '📈',
      'Security Audit': '🔒',
      'Auto Refresh': '🔄'
    };
    return icons[action] || '📌';
  };

  if (isLoading && activities.length === 0) return <LoadingSpinner />;
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

      {/* Activity Detail Modal */}
      {showDetailModal && selectedActivity && (
        <ActivityDetailModal 
          activity={selectedActivity}
          onClose={() => {
            setShowDetailModal(false);
            setSelectedActivity(null);
          }}
        />
      )}

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Activity Monitoring</h2>
            <p className="text-sm text-gray-500 mt-1">Track admin actions including login history, changes made, approvals, and updates</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 ${
                autoRefresh 
                  ? 'bg-green-600 text-white' 
                  : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {autoRefresh ? '🔄 Auto-Refresh ON' : '⏸️ Auto-Refresh OFF'}
            </button>
            <button
              onClick={() => {
                try {
                  const exportData = filteredActivities.map(activity => ({
                    'User': activity.user,
                    'Action': activity.action,
                    'Module': activity.module,
                    'Timestamp': activity.timestamp,
                    'Status': activity.status,
                    'Details': activity.details || ''
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
                  link.download = `activity_log_${new Date().toISOString().split('T')[0]}.csv`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                  
                  showToast(`Successfully exported ${filteredActivities.length} activities!`, 'success');
                } catch (err) {
                  showToast('Error exporting data', 'error');
                }
              }}
              className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1"
            >
              <Icon d={ICONS.download} size={14} />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {statCards.map((s, i) => (
            <div key={i} 
              onClick={() => s.filter && setFilter(s.filter)}
              className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} ${s.filter ? 'cursor-pointer' : 'cursor-default'} transition-all duration-200 hover:shadow-md ${s.filter ? 'hover:-translate-y-0.5' : ''} ${filter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{s.value}</p>
                  {filter === s.filter && s.filter && (
                    <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>
                  )}
                </div>
                <div className="text-2xl">{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Module Breakdown */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Module Activity</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(stats.modules).map(([module, count]) => (
              <span key={module} className={`px-3 py-1 rounded-lg text-xs font-semibold ${getModuleColor(module)}`}>
                {module}: {count}
              </span>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="flex-1 min-w-[200px] relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon d={ICONS.search} size={15} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search activities, users, actions..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDateFilter(!showDateFilter)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1 ${
                showDateFilter ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              📅 Date Filter
            </button>
            <div className="flex gap-1">
              {['All', 'Success', 'Failed'].map(status => (
                <button
                  key={status}
                  onClick={() => {
                    setFilter(status);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    filter === status 
                      ? 'bg-red-600 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status === 'All' ? '📊 All' : status === 'Success' ? '✅ Success' : '❌ Failed'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Date Range Filter */}
        {showDateFilter && (
          <div className="flex flex-wrap items-center gap-3 mt-3 p-3 bg-gray-50 rounded-xl">
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
            {(filter !== 'All' || search || dateRange.start || dateRange.end) && (
              <button
                onClick={() => {
                  setFilter('All');
                  setSearch('');
                  setDateRange({ start: '', end: '' });
                  setShowDateFilter(false);
                  setCurrentPage(1);
                  showToast('All filters cleared!', 'success');
                }}
                className="text-xs text-red-600 hover:text-red-700 font-semibold"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* Activities Table */}
        <div className="mt-6 overflow-x-auto">
          {paginatedData.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm text-gray-400">No activities found matching your filters</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="text-left py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Action</th>
                  <th className="text-left py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Module</th>
                  <th className="text-left py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Timestamp</th>
                  <th className="text-left py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-[11px] font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedData.map(activity => (
                  <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                          {activity.user.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{activity.user}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="flex items-center gap-1.5 text-sm text-gray-600">
                        <span>{getActionIcon(activity.action)}</span>
                        {activity.action}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-lg text-xs font-semibold ${getModuleColor(activity.module)}`}>
                        {activity.module}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500 font-mono">{activity.timestamp}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        activity.status === 'Success' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {activity.status === 'Success' ? '✅' : '❌'} {activity.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => {
                          setSelectedActivity(activity);
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
              Showing {paginatedData.length} of {filteredActivities.length} activities
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

        {/* Last Updated */}
        <div className="mt-4 text-xs text-gray-400 text-right">
          Last updated: {new Date().toLocaleString('en-US', { 
            year: 'numeric', month: 'short', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
          })}
          {autoRefresh && ' (Auto-refresh enabled)'}
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