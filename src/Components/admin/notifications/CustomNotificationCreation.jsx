// src/components/admin/notifications/CustomNotificationCreation.jsx
import React, { useState } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
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

// Preview Modal
const PreviewModal = ({ formData, onClose, onSend }) => {
  const getTypeIcon = (type) => {
    const icons = {
      'Push': '📱',
      'Email': '📧',
      'SMS': '💬',
      'In-App': '🔔'
    };
    return icons[type] || '📨';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Preview Notification</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl mb-3">{getTypeIcon(formData.type)}</div>
            <h4 className="text-lg font-bold text-gray-800">{formData.title || 'No Title'}</h4>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-700">{formData.message || 'No message content'}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Channel</span>
              <span className="text-sm font-semibold text-gray-700">{formData.type}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Audience</span>
              <span className="text-sm font-semibold text-gray-700">{formData.audience}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Schedule</span>
              <span className="text-sm font-semibold text-gray-700">
                {formData.schedule === 'Now' ? 'Send Now' : `Scheduled: ${formData.scheduledDate || 'Not set'}`}
              </span>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSend}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Confirm Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CustomNotificationCreation = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'Push',
    audience: 'All Users',
    schedule: 'Now',
    scheduledDate: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    if (formData.message.length > 500) {
      newErrors.message = 'Message must be less than 500 characters';
    }
    if (formData.schedule === 'Later' && !formData.scheduledDate) {
      newErrors.scheduledDate = 'Please select a date and time';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handlePreview = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowPreview(true);
    }
  };

  const handleSend = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Prepare data for backend
      const notificationData = {
        id: `NOT${String(Date.now()).slice(-6)}`,
        title: formData.title,
        message: formData.message,
        type: formData.type,
        audience: formData.audience,
        status: formData.schedule === 'Now' ? 'Sent' : 'Scheduled',
        sentDate: formData.schedule === 'Now' ? new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Scheduled',
        scheduledDate: formData.schedule === 'Later' ? formData.scheduledDate : null,
        createdAt: new Date().toISOString()
      };
      
      // Here you would make your API call
      // await api.createNotification(notificationData);
      
      console.log('Notification Data:', notificationData);
      
      setShowPreview(false);
      showToast(`Notification "${formData.title}" sent successfully!`, 'success');
      
      // Reset form
      setFormData({
        title: '',
        message: '',
        type: 'Push',
        audience: 'All Users',
        schedule: 'Now',
        scheduledDate: '',
      });
    } catch (error) {
      showToast('Failed to send notification. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveDraft = () => {
    if (validateForm()) {
      const draftData = {
        ...formData,
        id: `DRAFT${String(Date.now()).slice(-6)}`,
        status: 'Draft',
        createdAt: new Date().toISOString()
      };
      
      // Here you would save draft to backend
      // await api.saveDraft(draftData);
      
      console.log('Draft saved:', draftData);
      showToast('Draft saved successfully!', 'success');
    }
  };

  const handleClearForm = () => {
    if (window.confirm('Are you sure you want to clear all fields?')) {
      setFormData({
        title: '',
        message: '',
        type: 'Push',
        audience: 'All Users',
        schedule: 'Now',
        scheduledDate: '',
      });
      setErrors({});
    }
  };

  if (isLoading) return <LoadingSpinner />;

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

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal 
          formData={formData}
          onClose={() => setShowPreview(false)}
          onSend={handleSend}
        />
      )}

      {/* Header Section - Matching Booking Overview Theme */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-red-50 to-amber-50 border border-red-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">✏️</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Custom Notification Creation</h3>
            <p className="text-sm text-gray-500 mt-0.5">Create and send custom messages for promotions, offers, or announcements</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form - Matching Booking Overview Table Style */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <form onSubmit={handlePreview}>
              <div className="space-y-5">
                {/* Title Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Notification Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter notification title"
                    className={`w-full px-4 py-2 border ${errors.title ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50 transition-colors`}
                    maxLength={100}
                  />
                  {errors.title && (
                    <p className="text-xs text-red-500 mt-1">{errors.title}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {formData.title.length}/100 characters
                  </p>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Message Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your notification message here..."
                    rows="5"
                    className={`w-full px-4 py-2 border ${errors.message ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50 transition-colors resize-none`}
                    maxLength={500}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {formData.message.length}/500 characters
                  </p>
                </div>

                {/* Type and Audience */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Notification Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50 transition-colors"
                    >
                      <option value="Push">📱 Push Notification</option>
                      <option value="Email">📧 Email</option>
                      <option value="SMS">💬 SMS</option>
                      <option value="In-App">🔔 In-App Notification</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Audience
                    </label>
                    <select
                      name="audience"
                      value={formData.audience}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50 transition-colors"
                    >
                      <option value="All Users">🌍 All Users</option>
                      <option value="Customers">👤 Customers Only</option>
                      <option value="Vendors">🏪 Vendors Only</option>
                      <option value="Selected Users">🎯 Selected Users</option>
                    </select>
                  </div>
                </div>

                {/* Schedule */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Schedule
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="schedule"
                        value="Now"
                        checked={formData.schedule === 'Now'}
                        onChange={handleChange}
                        className="w-4 h-4 text-red-600 focus:ring-red-500"
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
                        className="w-4 h-4 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">Schedule Later</span>
                    </label>
                  </div>
                </div>

                {/* Scheduled Date */}
                {formData.schedule === 'Later' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Scheduled Date & Time <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      name="scheduledDate"
                      value={formData.scheduledDate}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.scheduledDate ? 'border-red-300' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50 transition-colors`}
                    />
                    {errors.scheduledDate && (
                      <p className="text-xs text-red-500 mt-1">{errors.scheduledDate}</p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 min-w-[120px] px-4 py-2.5 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Icon d={ICONS.eye} size={16} />
                    Preview & Send
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="px-4 py-2.5 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <Icon d={ICONS.save} size={16} />
                    Save Draft
                  </button>
                  <button
                    type="button"
                    onClick={handleClearForm}
                    className="px-4 py-2.5 border border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-colors flex items-center gap-2"
                  >
                    <Icon d={ICONS.cancel} size={16} />
                    Clear
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Quick Tips */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                <span className="text-lg">💡</span> Quick Tips
              </h4>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-sm mt-0.5">✓</span>
                <span className="text-sm text-gray-600">Keep messages clear and concise</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-sm mt-0.5">✓</span>
                <span className="text-sm text-gray-600">Include a call-to-action when possible</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-sm mt-0.5">✓</span>
                <span className="text-sm text-gray-600">Test your notification before sending</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-sm mt-0.5">✓</span>
                <span className="text-sm text-gray-600">Personalize messages for better engagement</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500 text-sm mt-0.5">✓</span>
                <span className="text-sm text-gray-600">Use emojis to increase open rates</span>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-5 border border-red-200">
            <p className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
              <span className="text-lg">👁️</span> Live Preview
            </p>
            <div className="p-4 bg-white rounded-xl border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{formData.type === 'Push' ? '📱' : formData.type === 'Email' ? '📧' : formData.type === 'SMS' ? '💬' : '🔔'}</span>
                <p className="text-xs font-semibold text-gray-500 truncate">
                  {formData.title || 'Notification Title'}
                </p>
              </div>
              <p className="text-sm text-gray-700 line-clamp-3">
                {formData.message || 'Your message will appear here...'}
              </p>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                <span className="text-[10px] font-semibold text-gray-400">To: {formData.audience}</span>
                <span className="text-[10px] text-gray-300">•</span>
                <span className="text-[10px] font-semibold text-gray-400">{formData.type}</span>
                {formData.schedule === 'Later' && (
                  <>
                    <span className="text-[10px] text-gray-300">•</span>
                    <span className="text-[10px] font-semibold text-amber-600">Scheduled</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Channel Stats */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Channel Performance</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Push Notifications</span>
                <span className="font-semibold text-gray-700">45% open rate</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Email</span>
                <span className="font-semibold text-gray-700">38% open rate</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">SMS</span>
                <span className="font-semibold text-gray-700">92% open rate</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">In-App</span>
                <span className="font-semibold text-gray-700">68% open rate</span>
              </div>
            </div>
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
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};