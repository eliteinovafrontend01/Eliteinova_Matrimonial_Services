// src/pages/admin/complaints/NotificationsUpdates.jsx
import { useState, useMemo } from 'react';

export const NotificationsUpdates = () => {
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'sms', 
      recipient: 'Aarav Patel', 
      phone: '+91 98765 43210', 
      template: 'complaint_acknowledgment', 
      status: 'sent', 
      sentAt: '2024-01-15 10:35 AM',
      deliveredAt: '2024-01-15 10:36 AM',
      content: 'Your complaint TKT001 has been registered. We will update you within 24 hours.',
      ticketId: 'TKT001',
      read: true
    },
    { 
      id: 2, 
      type: 'email', 
      recipient: 'Ishita Reddy', 
      email: 'ishita.reddy@example.com', 
      template: 'status_update', 
      status: 'sent', 
      sentAt: '2024-01-15 09:20 AM',
      deliveredAt: '2024-01-15 09:21 AM',
      content: 'Your complaint TKT002 status has been updated to In Progress.',
      ticketId: 'TKT002',
      read: true
    },
    { 
      id: 3, 
      type: 'push', 
      recipient: 'Rohan Deshmukh', 
      device: 'iOS App', 
      template: 'resolution', 
      status: 'delivered', 
      sentAt: '2024-01-14 04:45 PM',
      deliveredAt: '2024-01-14 04:45 PM',
      content: 'Your complaint TKT003 has been resolved. Please share your feedback.',
      ticketId: 'TKT003',
      read: false
    },
    { 
      id: 4, 
      type: 'email', 
      recipient: 'Neha Gupta', 
      email: 'neha.gupta@example.com', 
      template: 'escalation', 
      status: 'pending', 
      sentAt: null,
      deliveredAt: null,
      content: 'Your complaint has been escalated to senior management for priority handling.',
      ticketId: 'TKT004',
      read: false
    },
  ]);

  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [newNotification, setNewNotification] = useState({ 
    type: 'email', 
    recipient: '', 
    recipientName: '',
    subject: '', 
    message: '', 
    ticketId: '',
    template: 'custom'
  });

  const notificationTemplates = [
    { 
      id: 'complaint_acknowledgment', 
      name: 'Complaint Acknowledgment', 
      type: 'email',
      subject: 'We have received your complaint - {ticketId}',
      message: 'Dear {customer},\n\nYour complaint {ticketId} has been successfully registered. Our support team will review your case and provide an update within 24 hours.\n\nThank you for your patience.\n\nBest regards,\nSupport Team',
      variables: ['customer', 'ticketId']
    },
    { 
      id: 'status_update', 
      name: 'Status Update', 
      type: 'email',
      subject: 'Update on your complaint - {ticketId}',
      message: 'Dear {customer},\n\nThe status of your complaint {ticketId} has been updated to {status}.\n\nYou can track the progress in your dashboard.\n\nBest regards,\nSupport Team',
      variables: ['customer', 'ticketId', 'status']
    },
    { 
      id: 'resolution', 
      name: 'Resolution Notification', 
      type: 'email',
      subject: 'Your complaint has been resolved - {ticketId}',
      message: 'Dear {customer},\n\nYour complaint {ticketId} has been resolved.\n\nResolution: {resolution}\n\nPlease let us know if you are satisfied with the resolution by providing your feedback.\n\nBest regards,\nSupport Team',
      variables: ['customer', 'ticketId', 'resolution']
    },
    { 
      id: 'escalation', 
      name: 'Escalation Notification', 
      type: 'email',
      subject: 'Your complaint has been escalated - {ticketId}',
      message: 'Dear {customer},\n\nYour complaint {ticketId} has been escalated to {escalatedTo} for priority handling.\n\nOur senior team will personally look into your case and provide an update soon.\n\nBest regards,\nSupport Team',
      variables: ['customer', 'ticketId', 'escalatedTo']
    },
    { 
      id: 'sms_acknowledgment', 
      name: 'SMS - Complaint Received', 
      type: 'sms',
      subject: '',
      message: 'Your complaint {ticketId} has been received. We will update you within 24 hours. - Support Team',
      variables: ['ticketId']
    },
    { 
      id: 'push_resolution', 
      name: 'Push - Resolution Update', 
      type: 'push',
      subject: 'Complaint Resolved',
      message: 'Your complaint {ticketId} has been resolved. Tap to view details.',
      variables: ['ticketId']
    },
  ];

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const filteredNotifications = useMemo(() => {
    return notifications.filter(notif => {
      const matchType = typeFilter === 'all' || notif.type === typeFilter;
      const matchStatus = statusFilter === 'all' || notif.status === statusFilter;
      const matchSearch = !searchTerm || 
        notif.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (notif.email && notif.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (notif.phone && notif.phone.includes(searchTerm)) ||
        (notif.ticketId && notif.ticketId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        notif.content.toLowerCase().includes(searchTerm.toLowerCase());
      return matchType && matchStatus && matchSearch;
    });
  }, [notifications, typeFilter, statusFilter, searchTerm]);

  const handleSendNotification = () => {
    if (!newNotification.recipient.trim()) {
      showToastMsg('Please enter recipient information', 'warning');
      return;
    }
    if (!newNotification.message.trim()) {
      showToastMsg('Please enter a message', 'warning');
      return;
    }
    if (newNotification.type === 'email' && !newNotification.subject.trim()) {
      showToastMsg('Please enter a subject for email', 'warning');
      return;
    }

    const newId = Math.max(...notifications.map(n => n.id), 0) + 1;
    const now = new Date().toLocaleString();
    
    const newNotif = {
      id: newId,
      type: newNotification.type,
      recipient: newNotification.recipientName || newNotification.recipient,
      [newNotification.type === 'email' ? 'email' : newNotification.type === 'sms' ? 'phone' : 'device']: newNotification.recipient,
      template: newNotification.template,
      status: 'sent',
      sentAt: now,
      deliveredAt: newNotification.type === 'push' ? now : null,
      content: newNotification.message,
      ticketId: newNotification.ticketId || null,
      read: false
    };
    
    if (newNotification.type === 'email') {
      newNotif.subject = newNotification.subject;
    }
    
    setNotifications([newNotif, ...notifications]);
    setShowComposeModal(false);
    setNewNotification({ 
      type: 'email', 
      recipient: '', 
      recipientName: '',
      subject: '', 
      message: '', 
      ticketId: '',
      template: 'custom'
    });
    showToastMsg('Notification sent successfully', 'success');
  };

  const handleApplyTemplate = (template) => {
    setSelectedTemplate(template);
    setNewNotification({
      ...newNotification,
      type: template.type,
      subject: template.subject || '',
      message: template.message,
      template: template.id
    });
    setShowTemplateModal(false);
    showToastMsg(`Template "${template.name}" applied`, 'success');
  };

  const handleResendNotification = (notification) => {
    setNewNotification({
      type: notification.type,
      recipient: notification.email || notification.phone || notification.recipient,
      recipientName: notification.recipient,
      subject: notification.subject || '',
      message: notification.content,
      ticketId: notification.ticketId || '',
      template: notification.template
    });
    setShowComposeModal(true);
    showToastMsg('Loading notification for resend...', 'info');
  };

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    showToastMsg('Notification marked as read', 'success');
  };

  const getTypeIcon = (type) => {
    if (type === 'sms') return '📱';
    if (type === 'email') return '✉️';
    return '🔔';
  };

  const getTypeColor = (type) => {
    if (type === 'sms') return 'bg-blue-100 text-blue-700';
    if (type === 'email') return 'bg-purple-100 text-purple-700';
    return 'bg-green-100 text-green-700';
  };

  const getStatusBadge = (status) => {
    if (status === 'sent' || status === 'delivered') return 'bg-green-100 text-green-700';
    if (status === 'pending') return 'bg-amber-100 text-amber-700';
    if (status === 'failed') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };

  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'sent').length,
    delivered: notifications.filter(n => n.status === 'delivered').length,
    pending: notifications.filter(n => n.status === 'pending').length,
    emails: notifications.filter(n => n.type === 'email').length,
    sms: notifications.filter(n => n.type === 'sms').length,
    push: notifications.filter(n => n.type === 'push').length
  };

  return (
    <div className="p-4 md:p-6">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 
            toast.type === 'warning' ? 'bg-orange-500' : 
            'bg-blue-500'
          } text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔔</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Notifications & Updates</h3>
            <p className="text-sm text-gray-500 mt-0.5">Keep all parties informed about complaint status and resolution updates via SMS, email, or push notifications</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-blue-400">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-green-400">
          <p className="text-xs text-gray-400">Sent/Delivered</p>
          <p className="text-xl font-bold text-green-600">{stats.sent + stats.delivered}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-amber-400">
          <p className="text-xs text-gray-400">Pending</p>
          <p className="text-xl font-bold text-amber-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-purple-400">
          <p className="text-xs text-gray-400">Emails</p>
          <p className="text-xl font-bold">{stats.emails}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-blue-500">
          <p className="text-xs text-gray-400">SMS</p>
          <p className="text-xl font-bold">{stats.sms}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-green-500">
          <p className="text-xs text-gray-400">Push</p>
          <p className="text-xl font-bold">{stats.push}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Templates & Actions */}
        <div className="lg:col-span-1 space-y-4">
          {/* Compose Button */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <button 
              onClick={() => setShowComposeModal(true)} 
              className="w-full py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              ✉️ Compose Notification
            </button>
          </div>

          {/* Templates */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-800 text-sm">Notification Templates</h3>
              <p className="text-xs text-gray-400 mt-0.5">Quick templates for common notifications</p>
            </div>
            <div className="divide-y divide-gray-100 max-h-[400px] overflow-y-auto">
              {notificationTemplates.map(template => (
                <div 
                  key={template.id} 
                  onClick={() => handleApplyTemplate(template)}
                  className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {template.type === 'email' ? '✉️' : template.type === 'sms' ? '📱' : '🔔'}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{template.name}</p>
                      <p className="text-xs text-gray-400">{template.type.toUpperCase()}</p>
                    </div>
                    <button className="text-xs text-red-500">Use</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Tips</h4>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Use templates for faster responses</li>
              <li>• Include ticket ID for easy reference</li>
              <li>• SMS should be under 160 characters</li>
              <li>• Push notifications work best for urgent updates</li>
            </ul>
          </div>
        </div>

        {/* Right Panel - Notifications List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-800 text-sm">Recent Notifications</h3>
              <p className="text-xs text-gray-400 mt-0.5">{filteredNotifications.length} notifications</p>
            </div>

            {/* Filters */}
            <div className="p-3 border-b border-gray-100 space-y-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by recipient, ticket ID, or content..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option value="all">All Types</option>
                  <option value="email">Email</option>
                  <option value="sms">SMS</option>
                  <option value="push">Push</option>
                </select>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option value="all">All Status</option>
                  <option value="sent">Sent</option>
                  <option value="delivered">Delivered</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Notifications List */}
            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-2">🔔</div>
                  <p className="text-gray-400">No notifications found</p>
                </div>
              ) : (
                filteredNotifications.map(notif => (
                  <div 
                    key={notif.id} 
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`}
                    onClick={() => setSelectedNotification(notif)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full ${getTypeColor(notif.type)} flex items-center justify-center text-xl flex-shrink-0`}>
                        {getTypeIcon(notif.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-gray-800">
                              To: {notif.recipient}
                            </p>
                            {!notif.read && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500 text-white">New</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${getStatusBadge(notif.status)}`}>
                              {notif.status}
                            </span>
                            {notif.ticketId && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                {notif.ticketId}
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mb-1">
                          {notif.type === 'email' ? notif.email : notif.type === 'sms' ? notif.phone : notif.device}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">{notif.content}</p>
                        <div className="flex flex-wrap justify-between items-center mt-2 gap-2">
                          <span className="text-[10px] text-gray-400">
                            Template: {notif.template}
                          </span>
                          <div className="flex gap-2">
                            {notif.sentAt && (
                              <span className="text-[10px] text-gray-400">
                                Sent: {notif.sentAt}
                              </span>
                            )}
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleResendNotification(notif);
                              }}
                              className="text-[10px] text-blue-500 hover:text-blue-600"
                            >
                              Resend
                            </button>
                            {!notif.read && (
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkAsRead(notif.id);
                                }}
                                className="text-[10px] text-green-500 hover:text-green-600"
                              >
                                Mark Read
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowComposeModal(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Compose Notification</h3>
              <p className="text-sm text-gray-500">Send updates to customers or vendors</p>
            </div>
            <div className="p-5 space-y-4">
              {/* Notification Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notification Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      value="email" 
                      checked={newNotification.type === 'email'} 
                      onChange={() => setNewNotification({...newNotification, type: 'email'})} 
                      className="w-4 h-4 text-red-600"
                    />
                    <span>✉️ Email</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      value="sms" 
                      checked={newNotification.type === 'sms'} 
                      onChange={() => setNewNotification({...newNotification, type: 'sms'})} 
                      className="w-4 h-4 text-red-600"
                    />
                    <span>📱 SMS</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      value="push" 
                      checked={newNotification.type === 'push'} 
                      onChange={() => setNewNotification({...newNotification, type: 'push'})} 
                      className="w-4 h-4 text-red-600"
                    />
                    <span>🔔 Push</span>
                  </label>
                </div>
              </div>

              {/* Recipient */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  {newNotification.type === 'email' ? 'Email Address' : newNotification.type === 'sms' ? 'Phone Number' : 'Device ID'}
                </label>
                <input 
                  type="text" 
                  placeholder={newNotification.type === 'email' ? 'customer@example.com' : newNotification.type === 'sms' ? '+91 98765 43210' : 'Device token'} 
                  value={newNotification.recipient} 
                  onChange={(e) => setNewNotification({...newNotification, recipient: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* Recipient Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Recipient Name</label>
                <input 
                  type="text" 
                  placeholder="Customer or vendor name" 
                  value={newNotification.recipientName} 
                  onChange={(e) => setNewNotification({...newNotification, recipientName: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* Ticket ID */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Related Ticket ID (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g., TKT001" 
                  value={newNotification.ticketId} 
                  onChange={(e) => setNewNotification({...newNotification, ticketId: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>

              {/* Subject (for email) */}
              {newNotification.type === 'email' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Subject</label>
                  <input 
                    type="text" 
                    placeholder="Email subject" 
                    value={newNotification.subject} 
                    onChange={(e) => setNewNotification({...newNotification, subject: e.target.value})} 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                  />
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Message</label>
                <textarea 
                  placeholder="Type your message here..." 
                  rows="5" 
                  value={newNotification.message} 
                  onChange={(e) => setNewNotification({...newNotification, message: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 resize-none"
                />
                {newNotification.type === 'sms' && (
                  <p className="text-xs text-gray-400 mt-1">
                    Characters: {newNotification.message.length} / 160
                    {newNotification.message.length > 160 && ' (SMS will be split into multiple messages)'}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowComposeModal(false)} 
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSendNotification} 
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Send Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Selection Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowTemplateModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Select Template</h3>
              <p className="text-sm text-gray-500">Choose a template to use</p>
            </div>
            <div className="p-5 max-h-96 overflow-y-auto space-y-2">
              {notificationTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => handleApplyTemplate(template)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <p className="font-semibold text-gray-800 text-sm">{template.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{template.type.toUpperCase()}</p>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-1">{template.message.substring(0, 100)}</p>
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <button 
                onClick={() => setShowTemplateModal(false)} 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Detail Modal */}
      {selectedNotification && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setSelectedNotification(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Notification Details</h3>
                  <p className="text-xs text-gray-500">ID: {selectedNotification.id}</p>
                </div>
                <button 
                  onClick={() => setSelectedNotification(null)} 
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${getTypeColor(selectedNotification.type)} flex items-center justify-center text-xl`}>
                  {getTypeIcon(selectedNotification.type)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{selectedNotification.recipient}</p>
                  <p className="text-xs text-gray-500">
                    {selectedNotification.type === 'email' ? selectedNotification.email : 
                     selectedNotification.type === 'sms' ? selectedNotification.phone : 
                     selectedNotification.device}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-100 pt-3">
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedNotification.content}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                <p className="text-xs"><span className="font-semibold">Status:</span> <span className={`inline-block px-1.5 py-0.5 rounded-full text-[10px] ${getStatusBadge(selectedNotification.status)}`}>{selectedNotification.status}</span></p>
                {selectedNotification.sentAt && <p className="text-xs"><span className="font-semibold">Sent:</span> {selectedNotification.sentAt}</p>}
                {selectedNotification.deliveredAt && <p className="text-xs"><span className="font-semibold">Delivered:</span> {selectedNotification.deliveredAt}</p>}
                {selectedNotification.ticketId && <p className="text-xs"><span className="font-semibold">Ticket ID:</span> {selectedNotification.ticketId}</p>}
                <p className="text-xs"><span className="font-semibold">Template:</span> {selectedNotification.template}</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => handleResendNotification(selectedNotification)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                  Resend
                </button>
                <button 
                  onClick={() => setSelectedNotification(null)} 
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
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