// src/components/admin/notifications/NotificationsPage.jsx
import { useState, useEffect, useMemo } from 'react';
import { Icon } from '../shared/Icon';
import { StatusBadge } from '../shared/StatusBadge';
import { FeatureCard } from '../shared/FeatureCard';
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

// Create Notification Modal
const CreateNotificationModal = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'Push',
    audience: 'All Users',
    channel: 'Push',
    schedule: 'Now',
    scheduledDate: '',
  });

  const [isConfirming, setIsConfirming] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    
    const notificationData = {
      id: `NOT${String(Date.now()).slice(-6)}`,
      title: formData.title,
      message: formData.message,
      type: formData.type,
      channel: formData.channel,
      audience: formData.audience,
      status: formData.schedule === 'Now' ? 'Sent' : 'Scheduled',
      sentDate: formData.schedule === 'Now' ? new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : formData.scheduledDate || 'Scheduled',
      openRate: formData.schedule === 'Now' ? `${Math.floor(Math.random() * 30 + 70)}%` : '-',
      scheduledDate: formData.schedule === 'Later' ? formData.scheduledDate : null,
      createdAt: new Date().toISOString()
    };
    
    onSave(notificationData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Create New Notification</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Notification Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter notification title"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Write your notification message here..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Characters: {formData.message.length}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Channel</label>
              <select
                name="channel"
                value={formData.channel}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                <option value="Push">Push Notification</option>
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="In-App">In-App</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Audience</label>
              <select
                name="audience"
                value={formData.audience}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                <option value="All Users">All Users</option>
                <option value="Customers">Customers Only</option>
                <option value="Vendors">Vendors Only</option>
                <option value="Selected Users">Selected Users</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Schedule</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="schedule"
                  value="Now"
                  checked={formData.schedule === 'Now'}
                  onChange={handleChange}
                  className="text-red-600"
                />
                <span className="text-sm text-gray-700">Send Now</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="schedule"
                  value="Later"
                  checked={formData.schedule === 'Later'}
                  onChange={handleChange}
                  className="text-red-600"
                />
                <span className="text-sm text-gray-700">Schedule Later</span>
              </label>
            </div>
          </div>
          
          {formData.schedule === 'Later' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Scheduled Date & Time</label>
              <input
                type="datetime-local"
                name="scheduledDate"
                value={formData.scheduledDate}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                required
              />
            </div>
          )}
          
          {isConfirming && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
              📨 Confirm sending this notification to {formData.audience} via {formData.channel}
            </div>
          )}
          
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
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isConfirming ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isConfirming ? 'Confirm Send' : 'Send Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Notification Details Modal
const NotificationDetailsModal = ({ notification, onClose }) => {
  if (!notification) return null;

  const getChannelIcon = (channel) => {
    const icons = {
      'Push': '📱',
      'Email': '📧',
      'SMS': '💬',
      'In-App': '🔔'
    };
    return icons[channel] || '📨';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Notification Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl mb-3">{getChannelIcon(notification.type)}</div>
            <h4 className="text-lg font-bold text-gray-800">{notification.title}</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Notification ID</span>
              <span className="text-sm font-mono text-gray-700">{notification.id}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Channel</span>
              <span className="text-sm font-semibold text-gray-700">{notification.type}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Audience</span>
              <span className="text-sm font-semibold text-gray-700">{notification.audience}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Status</span>
              <StatusBadge status={notification.status} />
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Sent Date</span>
              <span className="text-sm font-semibold text-gray-700">{notification.sentDate}</span>
            </div>
            {notification.openRate && notification.openRate !== '-' && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-500">Open Rate</span>
                <span className="text-sm font-semibold text-green-600">{notification.openRate}</span>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs font-semibold text-gray-600 mb-2">Message:</p>
            <p className="text-sm text-gray-700">{notification.message || 'No message content available'}</p>
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

export const NotificationsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const sampleNotifications = [
          { id: 'NOT001', title: 'Welcome to Wedding Services', type: 'Email', audience: 'All Users', status: 'Sent', sentDate: '15 Mar 2024', openRate: '68%', message: 'Welcome to our platform! Get started with your wedding planning journey.' },
          { id: 'NOT002', title: 'Booking Confirmation', type: 'Push', audience: 'Customers', status: 'Sent', sentDate: '16 Mar 2024', openRate: '92%', message: 'Your booking has been confirmed. Thank you for choosing us!' },
          { id: 'NOT003', title: 'Vendor Approval', type: 'SMS', audience: 'Vendors', status: 'Pending', sentDate: 'Scheduled', openRate: '-', message: 'Your vendor registration has been approved. Welcome aboard!' },
          { id: 'NOT004', title: 'Payment Success', type: 'Email', audience: 'All Users', status: 'Sent', sentDate: '17 Mar 2024', openRate: '75%', message: 'Payment of ₹15,000 received successfully for booking #BK-001' },
          { id: 'NOT005', title: 'Summer Offer 2024', type: 'Push', audience: 'Selected Users', status: 'Draft', sentDate: '-', openRate: '-', message: 'Get 20% off on all services this summer!' },
          { id: 'NOT006', title: 'Event Reminder', type: 'SMS', audience: 'Customers', status: 'Sent', sentDate: '18 Mar 2024', openRate: '88%', message: 'Reminder: Your event is scheduled for tomorrow at 10:00 AM' },
          { id: 'NOT007', title: 'Payment Reminder', type: 'Email', audience: 'Customers', status: 'Failed', sentDate: '18 Mar 2024', openRate: '0%', message: 'Payment of ₹5,000 is due for your booking' },
          { id: 'NOT008', title: 'Vendor Rejection', type: 'SMS', audience: 'Vendors', status: 'Sent', sentDate: '19 Mar 2024', openRate: '45%', message: 'We regret to inform you that your application was not approved.' },
        ];
        
        const sampleTemplates = [
          { id: 'TPL001', name: 'Booking Confirmation', type: 'Email', lastUsed: '2 days ago' },
          { id: 'TPL002', name: 'Payment Receipt', type: 'Email', lastUsed: '3 days ago' },
          { id: 'TPL003', name: 'Vendor Approval', type: 'Push/SMS', lastUsed: '5 days ago' },
          { id: 'TPL004', name: 'Welcome Message', type: 'Email', lastUsed: '1 week ago' },
          { id: 'TPL005', name: 'Event Reminder', type: 'Push', lastUsed: '1 day ago' },
          { id: 'TPL006', name: 'Payment Reminder', type: 'SMS', lastUsed: '4 days ago' },
        ];
        
        setNotifications(sampleNotifications);
        setTemplates(sampleTemplates);
      } catch (err) {
        setError('Failed to load notification data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleCreateNotification = (notificationData) => {
    setNotifications(prev => [notificationData, ...prev]);
    showToast(`Notification "${notificationData.title}" created successfully!`, 'success');
  };

  const handleUseTemplate = (template) => {
    setShowCreateModal(true);
    showToast(`Using template "${template.name}"`, 'info');
  };

  const handleDeleteNotification = (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      setNotifications(prev => prev.filter(n => n.id !== id));
      showToast('Notification deleted successfully!', 'success');
    }
  };

  const handleExport = () => {
    try {
      const exportData = filtered.map(n => ({
        ID: n.id,
        Title: n.title,
        Channel: n.type,
        Audience: n.audience,
        Status: n.status,
        'Sent Date': n.sentDate,
        'Open Rate': n.openRate
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
      link.download = `notifications_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast(`Successfully exported ${filtered.length} notifications!`, 'success');
    } catch (err) {
      setError('Error exporting data');
    }
  };

  const statCards = [
    { label: 'Total Sent', value: notifications.filter(n => n.status === 'Sent').length, icon: '📨', color: 'border-blue-400', filter: 'Sent' },
    { label: 'Pending', value: notifications.filter(n => n.status === 'Pending' || n.status === 'Scheduled').length, icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Open Rate', value: `${Math.round(notifications.filter(n => n.openRate && n.openRate !== '-').reduce((acc, n) => acc + parseInt(n.openRate), 0) / notifications.filter(n => n.openRate && n.openRate !== '-').length || 0)}%`, icon: '👁️', color: 'border-green-400', filter: 'All' },
    { label: 'Failed', value: notifications.filter(n => n.status === 'Failed').length, icon: '❌', color: 'border-red-400', filter: 'Failed' },
  ];

  const filtered = useMemo(() => {
    try {
      let filteredData = notifications.filter(n => {
        const matchStatus = activeFilter === 'All' || n.status === activeFilter;
        const matchSearch = !search || 
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.id.toLowerCase().includes(search.toLowerCase()) ||
          n.audience.toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
      });
      
      // Sort by date (newest first)
      return filteredData.sort((a, b) => {
        if (a.sentDate === '-' || a.sentDate === 'Scheduled') return 1;
        if (b.sentDate === '-' || b.sentDate === 'Scheduled') return -1;
        // Try to parse dates
        const dateA = new Date(a.sentDate);
        const dateB = new Date(b.sentDate);
        if (isNaN(dateA.getTime())) return 1;
        if (isNaN(dateB.getTime())) return -1;
        return dateB - dateA;
      });
    } catch (err) {
      setError('Error filtering notifications');
      return [];
    }
  }, [notifications, search, activeFilter]);

  const getChannelColor = (type) => {
    const colors = {
      'Email': 'bg-blue-50 text-blue-700',
      'Push': 'bg-green-50 text-green-700',
      'SMS': 'bg-amber-50 text-amber-700',
      'In-App': 'bg-purple-50 text-purple-700'
    };
    return colors[type] || 'bg-gray-50 text-gray-700';
  };

  const featureCards = [
    { emoji: '📱', title: 'Multi-Channel Notifications', accentColor: 'bg-red-50', points: ['Push Notifications (Mobile App)', 'SMS (OTP & alerts via Twilio)', 'Email Notifications', 'In-app notifications'] },
    { emoji: '⚡', title: 'Event-Based Triggers', accentColor: 'bg-amber-50', points: ['User registration & verification', 'Booking confirmation & updates', 'Payment success or failure', 'Vendor approval or rejection'] },
    { emoji: '🎯', title: 'Audience Targeting', accentColor: 'bg-green-50', points: ['All users', 'Customers only', 'Vendors only', 'Selected users'] },
    { emoji: '📅', title: 'Scheduling & Templates', accentColor: 'bg-blue-50', points: ['Schedule notifications', 'Reusable templates', 'Real-time alerts', 'User preferences control'] }
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div>
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 
            toast.type === 'info' ? 'bg-blue-500' : 'bg-red-500'
          } text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreateNotificationModal 
          onSave={handleCreateNotification}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {showDetailsModal && selectedNotification && (
        <NotificationDetailsModal 
          notification={selectedNotification}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedNotification(null);
          }}
        />
      )}

      {/* Header Section - Matching Booking Overview Theme */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-red-50 to-amber-50 border border-red-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔔</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Notification Management</h3>
            <p className="text-sm text-gray-500 mt-0.5">Send, schedule and manage multi-channel notifications across the platform</p>
          </div>
        </div>
      </div>

      {/* Stats Cards - Matching Booking Overview Theme */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} 
            onClick={() => setActiveFilter(s.filter)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} ${s.filter ? 'cursor-pointer' : 'cursor-default'} transition-all duration-200 hover:shadow-md ${s.filter ? 'hover:-translate-y-0.5' : ''} ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}
            role={s.filter ? "button" : "status"}
            tabIndex={s.filter ? 0 : -1}
            aria-label={s.filter ? `Filter by ${s.label}` : undefined}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                {activeFilter === s.filter && s.filter && (
                  <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>
                )}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Notification Banner - Matching Booking Overview Style */}
      <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-5 mb-6 border border-red-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">✉️</div>
            <div>
              <p className="text-sm font-bold text-gray-800">Create New Notification</p>
              <p className="text-xs text-gray-500">Send push, email or SMS notifications to your audience</p>
            </div>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)} 
            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Icon d={ICONS.plus} size={14} /> Create Notification
          </button>
        </div>
      </div>

      {/* Main Content - Matching Booking Overview Theme */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notifications Table - Matching Booking Overview Table Style */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                  <Icon d={ICONS.notifications} size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-base">Notification History</h3>
                  <p className="text-xs text-gray-400">
                    {filtered.length} notification{filtered.length !== 1 ? 's' : ''}
                    {activeFilter !== 'All' ? ` (filtered: ${activeFilter})` : ' total'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {activeFilter !== 'All' && (
                  <button 
                    onClick={() => setActiveFilter('All')} 
                    className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                    aria-label="Clear all filters"
                  >
                    ✕ Clear Filter
                  </button>
                )}
                <button 
                  onClick={handleExport}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
                  aria-label="Export notifications to CSV"
                >
                  <Icon d={ICONS.download} size={13} />
                  Export CSV
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
                    value={search} 
                    onChange={e => setSearch(e.target.value)} 
                    type="text" 
                    placeholder="Search by title, ID or audience..." 
                    className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50"
                    aria-label="Search notifications"
                  />
                </div>
              </div>
              
              {/* Status Filter Buttons - Matching Booking Overview */}
              <div className="flex flex-wrap gap-2">
                {['All', 'Sent', 'Pending', 'Scheduled', 'Draft', 'Failed'].map(f => (
                  <button 
                    key={f} 
                    onClick={() => setActiveFilter(f)} 
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    aria-label={`Filter by ${f}`}
                    aria-pressed={activeFilter === f}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Notification List - Matching Booking Overview Table */}
          <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-3">📭</div>
                <p className="text-sm text-gray-500">No notifications found for the selected filters.</p>
              </div>
            ) : (
              filtered.map(notif => (
                <div key={notif.id} className="px-5 py-4 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => {
                  setSelectedNotification(notif);
                  setShowDetailsModal(true);
                }}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold text-gray-800 truncate">{notif.title}</p>
                        <span className="text-[10px] text-gray-400 font-mono">{notif.id}</span>
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getChannelColor(notif.type)}`}>
                          {notif.type}
                        </span>
                        <span className="text-[10px] text-gray-400">{notif.audience}</span>
                        <span className="text-[10px] text-gray-400">{notif.sentDate}</span>
                        {notif.openRate && notif.openRate !== '-' && (
                          <span className="text-[10px] text-green-600 font-semibold">Open: {notif.openRate}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <StatusBadge status={notif.status} />
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNotification(notif.id);
                        }}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Icon d={ICONS.delete} size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar - Matching Booking Overview Style */}
        <div className="space-y-6">
          {/* Templates */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                <span className="text-lg">📋</span> Notification Templates
              </h3>
            </div>
            <div className="divide-y divide-gray-50 max-h-[300px] overflow-y-auto">
              {templates.map(tpl => (
                <div key={tpl.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-gray-700 truncate">{tpl.name}</p>
                      <p className="text-[10px] text-gray-400">{tpl.type}</p>
                      <p className="text-[10px] text-gray-400">Last used: {tpl.lastUsed}</p>
                    </div>
                    <button 
                      onClick={() => handleUseTemplate(tpl)}
                      className="text-red-500 hover:text-red-700 text-xs font-semibold transition-colors"
                    >
                      Use
                    </button>
                  </div>
                </div>
              ))}
              <div className="px-4 py-3">
                <button 
                  onClick={() => setShowCreateModal(true)} 
                  className="w-full text-center text-xs text-red-600 font-semibold py-1 hover:bg-red-50 rounded-lg transition-colors"
                >
                  + Create New Template
                </button>
              </div>
            </div>
          </div>

          {/* Delivery Stats */}
          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">📊</span>
              <div className="flex-1">
                <p className="text-xs font-bold text-amber-800">Delivery Tracking</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
                    <div className="w-[74%] h-1.5 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-[10px] font-semibold text-green-600">74%</span>
                </div>
                <div className="flex justify-between text-[10px] text-amber-600 mt-2">
                  <span>Delivered: {notifications.filter(n => n.status === 'Sent').length}</span>
                  <span>Failed: {notifications.filter(n => n.status === 'Failed').length}</span>
                  <span>Pending: {notifications.filter(n => n.status === 'Pending' || n.status === 'Scheduled').length}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Insights</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Most used channel</span>
                <span className="font-semibold text-gray-700">Push (45%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Best audience</span>
                <span className="font-semibold text-gray-700">Customers (68%)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Avg. open rate</span>
                <span className="font-semibold text-green-600">74%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total templates</span>
                <span className="font-semibold text-gray-700">{templates.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards - Matching Booking Overview */}
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
        
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #ccc;
        }
      `}</style>
    </div>
  );
};