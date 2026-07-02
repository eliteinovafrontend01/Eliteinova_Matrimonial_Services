// src/components/admin/notifications/RealTimeAlerts.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '../shared/Icon';
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

// Alert Settings Modal
const AlertSettingsModal = ({ onSave, onClose }) => {
  const [settings, setSettings] = useState({
    bookingAlerts: true,
    paymentAlerts: true,
    vendorAlerts: true,
    complaintAlerts: true,
    systemAlerts: false,
    highPrioritySound: true,
    emailNotifications: true,
    pushNotifications: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(settings);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Alert Settings</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Alert Types</label>
            <div className="space-y-2">
              {[
                { key: 'bookingAlerts', label: 'Booking Alerts' },
                { key: 'paymentAlerts', label: 'Payment Alerts' },
                { key: 'vendorAlerts', label: 'Vendor Alerts' },
                { key: 'complaintAlerts', label: 'Complaint Alerts' },
                { key: 'systemAlerts', label: 'System Alerts' }
              ].map((item) => (
                <label key={item.key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings[item.key]}
                    onChange={(e) => setSettings({ ...settings, [item.key]: e.target.checked })}
                    className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Notifications</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.highPrioritySound}
                  onChange={(e) => setSettings({ ...settings, highPrioritySound: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">High Priority Sound</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Email Notifications</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) => setSettings({ ...settings, pushNotifications: e.target.checked })}
                  className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Push Notifications</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
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
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Alert Details Modal
const AlertDetailsModal = ({ alert, onClose }) => {
  if (!alert) return null;

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-red-100 text-red-700',
      'Medium': 'bg-amber-100 text-amber-700',
      'Low': 'bg-blue-100 text-blue-700'
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  const getTypeColor = (type) => {
    const colors = {
      'Booking': 'bg-purple-50 text-purple-700',
      'Payment': 'bg-green-50 text-green-700',
      'Vendor': 'bg-amber-50 text-amber-700',
      'Complaint': 'bg-red-50 text-red-700',
      'System': 'bg-gray-50 text-gray-700'
    };
    return colors[type] || 'bg-gray-50 text-gray-700';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Alert Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl mb-3">🔴</div>
            <h4 className="text-lg font-bold text-gray-800">{alert.type} Alert</h4>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getTypeColor(alert.type)}`}>
                {alert.type}
              </span>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getPriorityColor(alert.priority)}`}>
                {alert.priority}
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Alert ID</span>
              <span className="text-sm font-mono text-gray-700">#{alert.id.toString().padStart(3, '0')}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Message</span>
              <span className="text-sm text-gray-700 text-right max-w-[60%]">{alert.message}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Time</span>
              <span className="text-sm font-semibold text-gray-700">{alert.time}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Status</span>
              <span className="text-sm font-semibold text-green-600">{alert.status}</span>
            </div>
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

export const RealTimeAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [stats, setStats] = useState({
    high: 0,
    medium: 0,
    low: 0,
    total: 0
  });

  // Load alerts data
  useEffect(() => {
    const loadAlerts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const sampleAlerts = [
          { id: 1, type: 'Booking', message: 'New booking #BK-2024-001 confirmed', time: 'Just now', status: 'Active', priority: 'High' },
          { id: 2, type: 'Payment', message: 'Payment #PY-2024-045 processed successfully', time: '2 mins ago', status: 'Active', priority: 'High' },
          { id: 3, type: 'Vendor', message: 'Vendor approval requested by "Sharma Photography"', time: '5 mins ago', status: 'Active', priority: 'Medium' },
          { id: 4, type: 'System', message: 'System maintenance scheduled for 2:00 AM', time: '15 mins ago', status: 'Active', priority: 'Low' },
          { id: 5, type: 'Complaint', message: 'New complaint #CMP-2024-012 raised', time: '23 mins ago', status: 'Active', priority: 'High' },
          { id: 6, type: 'Payment', message: 'Payment #PY-2024-046 failed', time: '30 mins ago', status: 'Active', priority: 'High' },
          { id: 7, type: 'Booking', message: 'Booking #BK-2024-002 cancelled by customer', time: '35 mins ago', status: 'Active', priority: 'Medium' },
          { id: 8, type: 'Vendor', message: 'New vendor registration: "Event Planners Inc."', time: '45 mins ago', status: 'Active', priority: 'Medium' },
        ];
        
        setAlerts(sampleAlerts);
        
        const high = sampleAlerts.filter(a => a.priority === 'High').length;
        const medium = sampleAlerts.filter(a => a.priority === 'Medium').length;
        const low = sampleAlerts.filter(a => a.priority === 'Low').length;
        
        setStats({
          high,
          medium,
          low,
          total: sampleAlerts.length
        });
      } catch (err) {
        setError('Failed to load alerts data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAlerts();
  }, []);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Handle alert dismiss
  const handleDismissAlert = (alertId) => {
    if (window.confirm('Are you sure you want to dismiss this alert?')) {
      setAlerts(prev => prev.filter(alert => alert.id !== alertId));
      
      // Update stats
      const dismissedAlert = alerts.find(a => a.id === alertId);
      if (dismissedAlert) {
        setStats(prev => {
          const updated = { ...prev, total: prev.total - 1 };
          if (dismissedAlert.priority === 'High') updated.high--;
          else if (dismissedAlert.priority === 'Medium') updated.medium--;
          else if (dismissedAlert.priority === 'Low') updated.low--;
          return updated;
        });
      }
      
      showToast('Alert dismissed successfully!', 'success');
    }
  };

  // Handle save settings
  const handleSaveSettings = (settings) => {
    showToast('Alert settings saved successfully!', 'success');
    console.log('Settings saved:', settings);
  };

  // Filter alerts
  const filteredAlerts = useMemo(() => {
    let filtered = alerts;
    
    if (filterPriority !== 'All') {
      filtered = filtered.filter(a => a.priority === filterPriority);
    }
    
    if (filterType !== 'All') {
      filtered = filtered.filter(a => a.type === filterType);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(a => 
        a.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [alerts, filterPriority, filterType, searchTerm]);

  // Get priority color
  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'bg-red-100 text-red-700',
      'Medium': 'bg-amber-100 text-amber-700',
      'Low': 'bg-blue-100 text-blue-700'
    };
    return colors[priority] || 'bg-gray-100 text-gray-700';
  };

  // Get type color
  const getTypeColor = (type) => {
    const colors = {
      'Booking': 'bg-purple-50 text-purple-700',
      'Payment': 'bg-green-50 text-green-700',
      'Vendor': 'bg-amber-50 text-amber-700',
      'Complaint': 'bg-red-50 text-red-700',
      'System': 'bg-gray-50 text-gray-700'
    };
    return colors[type] || 'bg-gray-50 text-gray-700';
  };

  // Get priority dot color
  const getPriorityDot = (priority) => {
    const colors = {
      'High': 'bg-red-500',
      'Medium': 'bg-amber-500',
      'Low': 'bg-blue-500'
    };
    return colors[priority] || 'bg-gray-500';
  };

  // Stat cards
  const statCards = [
    { label: 'High Priority', value: stats.high, icon: '🔴', color: 'border-red-400', filter: 'High' },
    { label: 'Medium Priority', value: stats.medium, icon: '🟡', color: 'border-amber-400', filter: 'Medium' },
    { label: 'Low Priority', value: stats.low, icon: '🔵', color: 'border-blue-400', filter: 'Low' },
    { label: 'Total Alerts', value: stats.total, icon: '📋', color: 'border-purple-400', filter: null },
  ];

  // Alert type options for filter
  const alertTypes = ['All', 'Booking', 'Payment', 'Vendor', 'Complaint', 'System'];

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

      {/* Modals */}
      {showSettingsModal && (
        <AlertSettingsModal 
          onSave={handleSaveSettings}
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {showDetailsModal && selectedAlert && (
        <AlertDetailsModal 
          alert={selectedAlert}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedAlert(null);
          }}
        />
      )}

      {/* Header Section - Matching Booking Overview Theme */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-red-50 to-amber-50 border border-red-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔴</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Real-Time Alerts</h3>
            <p className="text-sm text-gray-500 mt-0.5">Instantly notify users about important updates or urgent actions</p>
          </div>
        </div>
      </div>

      {/* Stats Cards - Matching Booking Overview Theme */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div 
            key={i} 
            onClick={() => s.filter && setFilterPriority(s.filter)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} ${s.filter ? 'cursor-pointer' : 'cursor-default'} transition-all duration-200 hover:shadow-md ${s.filter ? 'hover:-translate-y-0.5' : ''} ${filterPriority === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}
            role={s.filter ? "button" : "status"}
            tabIndex={s.filter ? 0 : -1}
            aria-label={s.filter ? `Filter by ${s.label}` : undefined}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                {filterPriority === s.filter && s.filter && (
                  <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>
                )}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Alerts Section - Matching Booking Overview Theme */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.notification} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Live Alerts</h3>
                <p className="text-xs text-gray-400">
                  {filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''}
                  {filterPriority !== 'All' ? ` (priority: ${filterPriority})` : ''}
                  {filterType !== 'All' ? ` (type: ${filterType})` : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-semibold text-green-600">Live</span>
              </div>
              <button 
                onClick={() => setShowSettingsModal(true)}
                className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1.5"
              >
                <Icon d={ICONS.settings} size={13} /> Settings
              </button>
            </div>
          </div>

          {/* Search and Filters - Matching Booking Overview */}
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
                  placeholder="Search by message or type..." 
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                {alertTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              {(filterPriority !== 'All' || filterType !== 'All') && (
                <button 
                  onClick={() => {
                    setFilterPriority('All');
                    setFilterType('All');
                  }} 
                  className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  ✕ Clear Filters
                </button>
              )}
            </div>

            {/* Priority Filter Buttons - Matching Booking Overview */}
            <div className="flex flex-wrap gap-2">
              {['All', 'High', 'Medium', 'Low'].map(f => (
                <button 
                  key={f} 
                  onClick={() => setFilterPriority(f)} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
                    filterPriority === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {f === 'All' ? 'All' : `${f} Priority`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="divide-y divide-gray-50 max-h-96 overflow-y-auto">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-3">🔕</div>
              <p className="text-sm text-gray-500">No alerts found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or check back later</p>
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className="px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => {
                  setSelectedAlert(alert);
                  setShowDetailsModal(true);
                }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getPriorityDot(alert.priority)}`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${getTypeColor(alert.type)}`}>
                          {alert.type}
                        </span>
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${getPriorityColor(alert.priority)}`}>
                          {alert.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{alert.time}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDismissAlert(alert.id);
                          }}
                          className="p-1 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                          title="Dismiss Alert"
                        >
                          <Icon d={ICONS.cancel} size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Stats - Matching Booking Overview Style */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Alert Insights</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">High Priority</p>
            <p className="text-lg font-bold text-red-600">{stats.high}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Medium Priority</p>
            <p className="text-lg font-bold text-amber-600">{stats.medium}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Low Priority</p>
            <p className="text-lg font-bold text-blue-600">{stats.low}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Alerts</p>
            <p className="text-lg font-bold text-purple-600">{stats.total}</p>
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
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};