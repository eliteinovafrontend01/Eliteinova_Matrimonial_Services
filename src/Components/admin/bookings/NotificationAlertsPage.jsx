// src/Components/admin/bookings/NotificationAlertsPage.jsx
import { useState, useEffect } from 'react';
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

// Edit Template Modal
const EditTemplateModal = ({ template, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: template?.title || '',
    type: template?.type || '',
    template: template?.template || '',
    channels: template?.channels || []
  });

  const channelOptions = ['email', 'sms', 'push', 'whatsapp'];

  const handleChannelToggle = (channel) => {
    if (formData.channels.includes(channel)) {
      setFormData({
        ...formData,
        channels: formData.channels.filter(c => c !== channel)
      });
    } else {
      setFormData({
        ...formData,
        channels: [...formData.channels, channel]
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(template.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Edit Template</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Template Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Template Type</label>
            <input
              type="text"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Unique identifier for the template</p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Template Content</label>
            <textarea
              value={formData.template}
              onChange={(e) => setFormData({ ...formData, template: e.target.value })}
              rows="4"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Available variables: {'{booking_id}'}, {'{customer_name}'}, {'{event_date}'}, {'{event_time}'}, {'{amount}'}, {'{vendor_name}'}
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Channels</label>
            <div className="flex flex-wrap gap-3">
              {channelOptions.map(ch => (
                <label key={ch} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.channels.includes(ch)}
                    onChange={() => handleChannelToggle(ch)}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm capitalize">{ch}</span>
                </label>
              ))}
            </div>
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
              Save Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Send Notification Modal
const SendNotificationModal = ({ onSend, onClose }) => {
  const [channel, setChannel] = useState('email');
  const [recipientType, setRecipientType] = useState('all_customers');
  const [specificBooking, setSpecificBooking] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const bookings = allBookingsData;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    
    const notificationData = {
      id: Date.now(),
      channel,
      recipientType,
      specificBooking: recipientType === 'specific_booking' ? specificBooking : null,
      subject,
      message,
      scheduleDate: scheduleDate || null,
      status: scheduleDate ? 'Scheduled' : 'Sent',
      sentAt: scheduleDate || new Date().toISOString(),
      opens: 0,
      clicks: 0
    };
    
    onSend(notificationData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Send Notification</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Channel</label>
            <div className="grid grid-cols-2 gap-2">
              {['email', 'sms', 'push', 'whatsapp'].map(ch => (
                <label key={ch} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="channel"
                    value={ch}
                    checked={channel === ch}
                    onChange={(e) => setChannel(e.target.value)}
                    className="text-red-600"
                  />
                  <span className="text-sm capitalize">{ch}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Recipient</label>
            <select
              value={recipientType}
              onChange={(e) => setRecipientType(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            >
              <option value="all_customers">All Customers</option>
              <option value="all_vendors">All Vendors</option>
              <option value="specific_booking">Specific Booking</option>
            </select>
          </div>
          
          {recipientType === 'specific_booking' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Select Booking</label>
              <select
                value={specificBooking}
                onChange={(e) => setSpecificBooking(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                required
              >
                <option value="">Choose a booking...</option>
                {bookings.map(booking => (
                  <option key={booking.id} value={booking.id}>
                    {booking.id} - {booking.customer} - {booking.service}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Enter subject"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="5"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Enter your message here..."
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Tip: Use {'{customer_name}'}, {'{booking_id}'}, {'{event_date}'} for personalization
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Schedule (Optional)</label>
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            />
          </div>
          
          {isConfirming && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
              📧 Confirm sending this notification to {recipientType === 'all_customers' ? 'all customers' : 
                recipientType === 'all_vendors' ? 'all vendors' : `booking ${specificBooking}`}
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

// Notification History Modal
const NotificationHistoryModal = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Notification Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl mb-3">
              {notification.channel === 'email' ? '📧' : 
               notification.channel === 'sms' ? '💬' : 
               notification.channel === 'push' ? '📱' : '💚'}
            </div>
            <h4 className="text-lg font-bold text-gray-800">{notification.subject}</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Channel</span>
              <span className="text-sm font-semibold text-gray-700 capitalize">{notification.channel}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Recipient Type</span>
              <span className="text-sm font-semibold text-gray-700">
                {notification.recipientType === 'all_customers' ? 'All Customers' :
                 notification.recipientType === 'all_vendors' ? 'All Vendors' :
                 `Booking ${notification.specificBooking}`}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Status</span>
              <span className={`text-sm font-semibold ${notification.status === 'Sent' ? 'text-green-600' : 'text-blue-600'}`}>
                {notification.status}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Sent At</span>
              <span className="text-sm font-semibold text-gray-700">
                {new Date(notification.sentAt).toLocaleString()}
              </span>
            </div>
            {notification.scheduleDate && (
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm text-gray-500">Scheduled For</span>
                <span className="text-sm font-semibold text-gray-700">
                  {new Date(notification.scheduleDate).toLocaleString()}
                </span>
              </div>
            )}
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Opens</span>
              <span className="text-sm font-semibold text-gray-700">{notification.opens}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Clicks</span>
              <span className="text-sm font-semibold text-gray-700">{notification.clicks}</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs font-semibold text-gray-600 mb-2">Message:</p>
            <p className="text-sm text-gray-700">{notification.message}</p>
          </div>
          
          <div className="pt-4">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Channel Settings Modal
const ChannelSettingsModal = ({ settings, onSave, onClose }) => {
  const [channelSettings, setChannelSettings] = useState(settings);

  const handleToggle = (channel) => {
    setChannelSettings({
      ...channelSettings,
      [channel]: {
        ...channelSettings[channel],
        enabled: !channelSettings[channel].enabled
      }
    });
  };

  const handleApiKeyChange = (channel, value) => {
    setChannelSettings({
      ...channelSettings,
      [channel]: {
        ...channelSettings[channel],
        apiKey: value
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(channelSettings);
    onClose();
  };

  const channels = [
    { key: 'email', name: 'Email Notifications', icon: '📧', desc: 'Send via email', placeholder: 'SMTP API Key' },
    { key: 'sms', name: 'SMS Notifications', icon: '💬', desc: 'Send via text message', placeholder: 'Twilio API Key' },
    { key: 'push', name: 'Push Notifications', icon: '📱', desc: 'Mobile app alerts', placeholder: 'Firebase API Key' },
    { key: 'whatsapp', name: 'WhatsApp Notifications', icon: '💚', desc: 'WhatsApp Business API', placeholder: 'WhatsApp API Key' }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Channel Settings</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {channels.map(ch => (
            <div key={ch.key} className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ch.icon}</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{ch.name}</p>
                    <p className="text-xs text-gray-400">{ch.desc}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={channelSettings[ch.key]?.enabled || false}
                    onChange={() => handleToggle(ch.key)}
                  />
                  <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>
              
              {channelSettings[ch.key]?.enabled && (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">API Key / Configuration</label>
                  <input
                    type="password"
                    value={channelSettings[ch.key]?.apiKey || ''}
                    onChange={(e) => handleApiKeyChange(ch.key, e.target.value)}
                    placeholder={ch.placeholder}
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                  />
                </div>
              )}
            </div>
          ))}
          
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
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const NotificationAlertsPage = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [showSendModal, setShowSendModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [channelSettings, setChannelSettings] = useState({
    email: { enabled: true, apiKey: '' },
    sms: { enabled: true, apiKey: '' },
    push: { enabled: false, apiKey: '' },
    whatsapp: { enabled: false, apiKey: '' }
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sample templates
        const sampleTemplates = [
          { id: 1, type: 'booking_confirmation', title: 'Booking Confirmation', template: 'Dear {customer_name}, your booking #{booking_id} has been confirmed for {event_date}. Thank you for choosing us!', channels: ['email', 'sms'] },
          { id: 2, type: 'reminder', title: 'Event Reminder', template: 'Reminder: Your event is scheduled for {event_date} at {event_time}. Please be ready.', channels: ['email', 'sms', 'push'] },
          { id: 3, type: 'payment_reminder', title: 'Payment Reminder', template: 'Payment of ₹{amount} is due for booking #{booking_id}. Please complete payment at earliest.', channels: ['email', 'whatsapp'] },
          { id: 4, type: 'vendor_assigned', title: 'Vendor Assigned', template: 'Great news! Vendor {vendor_name} has been assigned to your booking #{booking_id}.', channels: ['sms', 'push'] },
          { id: 5, type: 'event_completed', title: 'Event Completed', template: 'Your event has been successfully completed! Please share your feedback.', channels: ['email', 'sms'] },
        ];
        
        setTemplates(sampleTemplates);
        
        // Sample notification history
        const sampleHistory = [
          { id: 1, channel: 'email', recipientType: 'all_customers', subject: 'Special Offer', message: 'Get 20% off on your next booking!', status: 'Sent', sentAt: '2024-01-20T10:30:00', opens: 245, clicks: 89 },
          { id: 2, channel: 'sms', recipientType: 'specific_booking', specificBooking: 'BK-001', subject: 'Booking Confirmation', message: 'Your booking BK-001 is confirmed', status: 'Sent', sentAt: '2024-01-21T14:20:00', opens: 1, clicks: 0 },
          { id: 3, channel: 'whatsapp', recipientType: 'all_vendors', subject: 'New Booking Alert', message: 'New booking available for assignment', status: 'Sent', sentAt: '2024-01-22T09:15:00', opens: 12, clicks: 5 },
        ];
        
        setNotificationHistory(sampleHistory);
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

  const handleSaveTemplate = (templateId, updatedData) => {
    setTemplates(prev => prev.map(t => 
      t.id === templateId ? { ...t, ...updatedData } : t
    ));
    showToast(`Template "${updatedData.title}" updated successfully!`, 'success');
  };

  const handleSendNotification = (notificationData) => {
    setNotificationHistory(prev => [notificationData, ...prev]);
    showToast(`Notification sent successfully via ${notificationData.channel}!`, 'success');
  };

  const handleSendTest = (template) => {
    showToast(`Test notification sent for template "${template.title}"`, 'success');
  };

  const handleSaveSettings = (settings) => {
    setChannelSettings(settings);
    showToast('Channel settings saved successfully!', 'success');
  };

  const statCards = [
    { label: 'Total Sent', value: notificationHistory.length, icon: '📧', color: 'border-blue-400' },
    { label: 'Templates', value: templates.length, icon: '📝', color: 'border-green-400' },
    { label: 'Avg. Open Rate', value: '68%', icon: '👁️', color: 'border-purple-400' },
    { label: 'Active Channels', value: Object.values(channelSettings).filter(c => c.enabled).length, icon: '🔌', color: 'border-amber-400' },
  ];

  const featureCards = [
    { emoji: '📧', title: 'Multi-Channel Delivery', accentColor: 'bg-blue-50', points: ['Email integration', 'SMS gateway', 'Push notifications', 'WhatsApp Business API'] },
    { emoji: '⏰', title: 'Scheduled Alerts', accentColor: 'bg-green-50', points: ['Set reminder times', 'Recurring notifications', 'Time zone aware', 'Delivery tracking'] },
    { emoji: '📝', title: 'Template Management', accentColor: 'bg-purple-50', points: ['Custom templates', 'Dynamic variables', 'A/B testing', 'Performance analytics'] },
    { emoji: '📊', title: 'Analytics Dashboard', accentColor: 'bg-amber-50', points: ['Delivery rates', 'Open rates', 'Click tracking', 'Campaign ROI'] }
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
      {showSendModal && (
        <SendNotificationModal 
          onSend={handleSendNotification}
          onClose={() => setShowSendModal(false)}
        />
      )}

      {showEditModal && selectedTemplate && (
        <EditTemplateModal 
          template={selectedTemplate}
          onSave={handleSaveTemplate}
          onClose={() => {
            setShowEditModal(false);
            setSelectedTemplate(null);
          }}
        />
      )}

      {showSettingsModal && (
        <ChannelSettingsModal 
          settings={channelSettings}
          onSave={handleSaveSettings}
          onClose={() => setShowSettingsModal(false)}
        />
      )}

      {showHistoryModal && selectedNotification && (
        <NotificationHistoryModal 
          notification={selectedNotification}
          onClose={() => {
            setShowHistoryModal(false);
            setSelectedNotification(null);
          }}
        />
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🔔</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Notifications & Alerts</h3>
              <p className="text-sm text-gray-500 mt-0.5">Send booking confirmations, reminders, and updates via multiple channels</p>
            </div>
          </div>
          <button 
            onClick={() => setShowSendModal(true)} 
            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Icon d={ICONS.send} size={14} /> Send Notification
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
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
        {[
          { id: 'templates', label: 'Notification Templates', icon: '📝' },
          { id: 'history', label: 'Notification History', icon: '📜' },
          { id: 'settings', label: 'Channel Settings', icon: '⚙️' }
        ].map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)} 
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === tab.id ? 'bg-white text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>
      
      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map(t => (
            <div key={t.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">{t.title}</h4>
                  <p className="text-xs text-gray-400 mt-0.5 font-mono">{t.type}</p>
                </div>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Active</span>
              </div>
              <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded-lg mb-3 line-clamp-2">
                {t.template}
              </p>
              <div className="flex flex-wrap gap-1 mb-3">
                {t.channels.map(ch => (
                  <span key={ch} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full capitalize">{ch}</span>
                ))}
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setSelectedTemplate(t);
                    setShowEditModal(true);
                  }}
                  className="flex-1 px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleSendTest(t)}
                  className="flex-1 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Send Test
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {notificationHistory.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-3">📜</div>
              <p className="text-sm text-gray-500">No notification history available</p>
              <p className="text-xs text-gray-400 mt-1">Send notifications to see them here</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Channel</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Subject</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Recipient</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sent At</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {notificationHistory.map(notif => (
                    <tr key={notif.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                      <td className="px-4 py-3">
                        <span className="text-xl">
                          {notif.channel === 'email' ? '📧' : 
                           notif.channel === 'sms' ? '💬' : 
                           notif.channel === 'push' ? '📱' : '💚'}
                        </span>
                        <span className="ml-2 text-xs capitalize">{notif.channel}</span>
                       </td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{notif.subject} </td>
                      <td className="px-4 py-3 text-xs text-gray-500">
                        {notif.recipientType === 'all_customers' ? 'All Customers' :
                         notif.recipientType === 'all_vendors' ? 'All Vendors' :
                         `Booking ${notif.specificBooking}`}
                       </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          notif.status === 'Sent' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {notif.status}
                        </span>
                       </td>
                      <td className="px-4 py-3 text-xs text-gray-400">
                        {new Date(notif.sentAt).toLocaleString()}
                       </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => {
                            setSelectedNotification(notif);
                            setShowHistoryModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View Details"
                        >
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                       </td>
                     </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {notificationHistory.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">
                  Total notifications: {notificationHistory.length}
                </span>
                <span className="text-gray-400">
                  Last 30 days
                </span>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h4 className="font-bold text-gray-800 text-base">Channel Configuration</h4>
              <p className="text-xs text-gray-400 mt-1">Configure notification channels and API settings</p>
            </div>
            <button 
              onClick={() => setShowSettingsModal(true)}
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Configure Channels
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(channelSettings).map(([key, setting]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    {key === 'email' ? '📧' : 
                     key === 'sms' ? '💬' : 
                     key === 'push' ? '📱' : '💚'}
                  </span>
                  <div>
                    <p className="font-semibold text-sm text-gray-800 capitalize">{key} Notifications</p>
                    <p className="text-xs text-gray-400">
                      {setting.enabled ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full ${setting.enabled ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-xs text-blue-700">
              💡 Tip: Configure API keys in the channel settings to enable real notifications. 
              Test notifications can be sent without configuration.
            </p>
          </div>
        </div>
      )}
      
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