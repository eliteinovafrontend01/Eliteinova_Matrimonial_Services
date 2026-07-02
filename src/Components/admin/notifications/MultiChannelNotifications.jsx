// src/components/admin/notifications/MultiChannelNotifications.jsx
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

// Configure Channel Modal
const ConfigureChannelModal = ({ channel, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: channel?.name || '',
    status: channel?.status || 'Active',
    apiKey: '',
    apiSecret: '',
    senderId: '',
    settings: {
      enabled: channel?.status === 'Active',
      dailyLimit: '10000',
      rateLimit: '1000'
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const getChannelIcon = (name) => {
    const icons = {
      'Push Notifications': '📱',
      'SMS Notifications': '💬',
      'Email Notifications': '✉️',
      'In-App Notifications': '🔔'
    };
    return icons[name] || '📡';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{getChannelIcon(channel?.name)}</span>
              <h3 className="text-lg font-bold text-gray-800">
                Configure {channel?.name || 'Channel'}
              </h3>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Channel Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              API Key
            </label>
            <input
              type="text"
              value={formData.apiKey}
              onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
              placeholder="Enter API key"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              API Secret
            </label>
            <input
              type="password"
              value={formData.apiSecret}
              onChange={(e) => setFormData({ ...formData, apiSecret: e.target.value })}
              placeholder="Enter API secret"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sender ID
            </label>
            <input
              type="text"
              value={formData.senderId}
              onChange={(e) => setFormData({ ...formData, senderId: e.target.value })}
              placeholder="Enter sender ID"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Daily Limit
              </label>
              <input
                type="number"
                value={formData.settings.dailyLimit}
                onChange={(e) => setFormData({
                  ...formData,
                  settings: { ...formData.settings, dailyLimit: e.target.value }
                })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rate Limit
              </label>
              <input
                type="number"
                value={formData.settings.rateLimit}
                onChange={(e) => setFormData({
                  ...formData,
                  settings: { ...formData.settings, rateLimit: e.target.value }
                })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              />
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
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Channel Details Modal
const ChannelDetailsModal = ({ channel, onClose }) => {
  if (!channel) return null;

  const getChannelColor = (name) => {
    const colors = {
      'Push Notifications': 'bg-blue-50 text-blue-700',
      'SMS Notifications': 'bg-green-50 text-green-700',
      'Email Notifications': 'bg-purple-50 text-purple-700',
      'In-App Notifications': 'bg-orange-50 text-orange-700'
    };
    return colors[name] || 'bg-gray-50 text-gray-700';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Channel Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl mb-3">{channel.icon}</div>
            <h4 className="text-lg font-bold text-gray-800">{channel.name}</h4>
            <StatusBadge status={channel.status} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Channel ID</span>
              <span className="text-sm font-mono text-gray-700">#{channel.id.toString().padStart(3, '0')}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Description</span>
              <span className="text-sm text-gray-700 text-right max-w-[60%]">{channel.description}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Usage</span>
              <span className="text-sm font-semibold text-gray-700">{channel.usage}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Status</span>
              <StatusBadge status={channel.status} />
            </div>
            {channel.settings && (
              <>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Daily Limit</span>
                  <span className="text-sm font-semibold text-gray-700">{channel.settings.dailyLimit}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Rate Limit</span>
                  <span className="text-sm font-semibold text-gray-700">{channel.settings.rateLimit}</span>
                </div>
              </>
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

export const MultiChannelNotifications = () => {
  const [channels, setChannels] = useState([]);
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [showConfigureModal, setShowConfigureModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChannel, setFilterChannel] = useState('All');

  // Load data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const sampleChannels = [
          { 
            id: 1, 
            name: 'Push Notifications', 
            icon: '📱', 
            status: 'Active', 
            description: 'Mobile app push notifications for real-time updates', 
            usage: '45%', 
            color: 'blue',
            settings: { dailyLimit: '50,000', rateLimit: '5,000' }
          },
          { 
            id: 2, 
            name: 'SMS Notifications', 
            icon: '💬', 
            status: 'Active', 
            description: 'OTP & alerts via Twilio integration', 
            usage: '30%', 
            color: 'green',
            settings: { dailyLimit: '10,000', rateLimit: '1,000' }
          },
          { 
            id: 3, 
            name: 'Email Notifications', 
            icon: '✉️', 
            status: 'Active', 
            description: 'Transactional and marketing emails', 
            usage: '25%', 
            color: 'purple',
            settings: { dailyLimit: '100,000', rateLimit: '10,000' }
          },
          { 
            id: 4, 
            name: 'In-App Notifications', 
            icon: '🔔', 
            status: 'Inactive', 
            description: 'Notifications within the application', 
            usage: '0%', 
            color: 'gray',
            settings: { dailyLimit: '20,000', rateLimit: '2,000' }
          },
        ];
        
        const sampleLogs = [
          { id: 1, channel: 'Push', title: 'Booking Confirmation', sent: '12.5K', delivered: '11.8K', rate: '94%', status: 'Delivered' },
          { id: 2, channel: 'SMS', title: 'OTP Verification', sent: '8.2K', delivered: '7.9K', rate: '96%', status: 'Delivered' },
          { id: 3, channel: 'Email', title: 'Weekly Newsletter', sent: '15.1K', delivered: '14.2K', rate: '94%', status: 'Delivered' },
          { id: 4, channel: 'Push', title: 'Promotional Offer', sent: '5.6K', delivered: '4.8K', rate: '86%', status: 'Failed' },
          { id: 5, channel: 'SMS', title: 'Payment Reminder', sent: '3.4K', delivered: '3.2K', rate: '94%', status: 'Delivered' },
          { id: 6, channel: 'Email', title: 'Vendor Approval', sent: '2.1K', delivered: '1.9K', rate: '90%', status: 'Delivered' },
        ];
        
        setChannels(sampleChannels);
        setLogs(sampleLogs);
      } catch (err) {
        setError('Failed to load channel data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Handle configure channel
  const handleConfigureChannel = (formData) => {
    setChannels(prev =>
      prev.map(channel =>
        channel.id === selectedChannel.id
          ? { 
              ...channel, 
              status: formData.status,
              settings: formData.settings,
              usage: formData.status === 'Active' ? channel.usage : '0%'
            }
          : channel
      )
    );
    showToast(`Channel "${selectedChannel.name}" configured successfully!`, 'success');
  };

  // Handle toggle channel status
  const handleToggleStatus = (channelId) => {
    setChannels(prev =>
      prev.map(channel =>
        channel.id === channelId
          ? { 
              ...channel, 
              status: channel.status === 'Active' ? 'Inactive' : 'Active',
              usage: channel.status === 'Active' ? '0%' : '30%'
            }
          : channel
      )
    );
    const channel = channels.find(c => c.id === channelId);
    if (channel) {
      const newStatus = channel.status === 'Active' ? 'Inactive' : 'Active';
      showToast(`Channel "${channel.name}" ${newStatus === 'Active' ? 'activated' : 'deactivated'}!`, 'info');
    }
  };

  // Handle export
  const handleExport = () => {
    try {
      const exportData = filteredLogs.map(log => ({
        'Channel': log.channel,
        'Notification': log.title,
        'Sent': log.sent,
        'Delivered': log.delivered,
        'Rate': log.rate,
        'Status': log.status
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
      link.download = `channel_performance_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast(`Successfully exported ${filteredLogs.length} entries!`, 'success');
    } catch (err) {
      showToast('Error exporting data', 'error');
    }
  };

  // Filter logs
  const filteredLogs = useMemo(() => {
    let filtered = logs;
    
    if (filterChannel !== 'All') {
      filtered = filtered.filter(log => log.channel === filterChannel);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(log => 
        log.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.channel.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [logs, filterChannel, searchTerm]);

  // Get channel color for badge
  const getChannelColor = (channelName) => {
    const colors = {
      'Push': 'bg-blue-50 text-blue-700',
      'SMS': 'bg-green-50 text-green-700',
      'Email': 'bg-purple-50 text-purple-700',
      'In-App': 'bg-orange-50 text-orange-700'
    };
    return colors[channelName] || 'bg-gray-50 text-gray-700';
  };

  // Stat cards
  const statCards = [
    { label: 'Active Channels', value: channels.filter(c => c.status === 'Active').length, icon: '📡', color: 'border-green-400' },
    { label: 'Total Channels', value: channels.length, icon: '📋', color: 'border-blue-400' },
    { label: 'Total Sent', value: logs.reduce((sum, log) => sum + parseInt(log.sent.replace('K', '000')), 0).toLocaleString(), icon: '📨', color: 'border-purple-400' },
    { label: 'Avg. Delivery Rate', value: `${Math.round(logs.reduce((sum, log) => sum + parseInt(log.rate), 0) / logs.length)}%`, icon: '📊', color: 'border-amber-400' },
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

      {/* Configure Modal */}
      {showConfigureModal && selectedChannel && (
        <ConfigureChannelModal 
          channel={selectedChannel}
          onSave={handleConfigureChannel}
          onClose={() => {
            setShowConfigureModal(false);
            setSelectedChannel(null);
          }}
        />
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedChannel && (
        <ChannelDetailsModal 
          channel={selectedChannel}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedChannel(null);
          }}
        />
      )}

      {/* Header Section - Matching Booking Overview Theme */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-red-50 to-amber-50 border border-red-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📡</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Multi-Channel Notifications</h3>
            <p className="text-sm text-gray-500 mt-0.5">Send notifications through multiple channels: Push, SMS, Email, and In-App</p>
          </div>
        </div>
      </div>

      {/* Stats Cards - Matching Booking Overview Theme */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Channel Cards - Matching Booking Overview Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {channels.map((channel) => (
          <div 
            key={channel.id} 
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
            onClick={() => {
              setSelectedChannel(channel);
              setShowDetailsModal(true);
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">{channel.icon}</span>
              <StatusBadge status={channel.status} />
            </div>
            <h4 className="font-bold text-gray-800">{channel.name}</h4>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{channel.description}</p>
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Usage</span>
                <span className="font-semibold text-gray-700">{channel.usage}</span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                <div 
                  className={`h-1.5 rounded-full ${
                    channel.color === 'blue' ? 'bg-blue-500' :
                    channel.color === 'green' ? 'bg-green-500' :
                    channel.color === 'purple' ? 'bg-purple-500' :
                    'bg-gray-400'
                  }`} 
                  style={{ width: channel.usage }}
                ></div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedChannel(channel);
                  setShowConfigureModal(true);
                }}
                className="px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Configure
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleStatus(channel.id);
                }}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  channel.status === 'Active' 
                    ? 'text-gray-500 hover:bg-gray-50' 
                    : 'text-green-600 hover:bg-green-50'
                }`}
              >
                {channel.status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Channel Performance Table - Matching Booking Overview Theme */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.channels} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Channel Performance</h3>
                <p className="text-xs text-gray-400">
                  {filteredLogs.length} entries
                </p>
              </div>
            </div>
            <button 
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              <Icon d={ICONS.download} size={13} /> Export
            </button>
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
                  placeholder="Search by notification or channel..." 
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
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Channel</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Notification</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sent</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Delivered</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Rate</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-12 text-center text-sm text-gray-400">
                    No logs found for the selected filters.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${getChannelColor(log.channel)}`}>
                        {log.channel}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{log.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.sent}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{log.delivered}</td>
                    <td className="px-4 py-3">
                      <span className={`text-sm font-semibold ${
                        parseInt(log.rate) >= 90 ? 'text-green-600' :
                        parseInt(log.rate) >= 70 ? 'text-amber-600' :
                        'text-red-600'
                      }`}>
                        {log.rate}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={log.status} />
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
                    <div className="font-semibold text-gray-800 text-sm">{log.title}</div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${getChannelColor(log.channel)}`}>
                      {log.channel}
                    </span>
                  </div>
                  <StatusBadge status={log.status} />
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div>
                    <span className="text-gray-400">Sent:</span>
                    <span className="text-gray-700 ml-1">{log.sent}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Delivered:</span>
                    <span className="text-gray-700 ml-1">{log.delivered}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">Rate:</span>
                    <span className={`ml-1 font-semibold ${
                      parseInt(log.rate) >= 90 ? 'text-green-600' :
                      parseInt(log.rate) >= 70 ? 'text-amber-600' :
                      'text-red-600'
                    }`}>
                      {log.rate}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Stats - Matching Booking Overview Style */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Channel Insights</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">Active Channels</p>
            <p className="text-lg font-bold text-green-600">{channels.filter(c => c.status === 'Active').length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Channels</p>
            <p className="text-lg font-bold text-blue-600">{channels.length}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Total Sent</p>
            <p className="text-lg font-bold text-purple-600">{logs.reduce((sum, log) => sum + parseInt(log.sent.replace('K', '000')), 0).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Avg. Delivery Rate</p>
            <p className="text-lg font-bold text-amber-600">{Math.round(logs.reduce((sum, log) => sum + parseInt(log.rate), 0) / logs.length)}%</p>
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};