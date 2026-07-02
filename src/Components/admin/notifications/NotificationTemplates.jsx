// src/components/admin/notifications/NotificationTemplates.jsx
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

// Use Template Modal
const UseTemplateModal = ({ template, onUse, onClose }) => {
  const [formData, setFormData] = useState({
    recipient: '',
    subject: template?.name || '',
    message: template?.content || '',
    scheduledDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.recipient.trim()) {
      onUse(template, formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Use Template</h3>
              <p className="text-xs text-gray-500">Send notification using "{template?.name}"</p>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Recipient <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.recipient}
              onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
              placeholder="Enter recipient email or phone number"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows="5"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Variables: {'{{name}}'}, {'{{booking_id}}'}, {'{{event_name}}'}, etc.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Schedule (Optional)
            </label>
            <input
              type="datetime-local"
              value={formData.scheduledDate}
              onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            />
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
              Send Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Create/Edit Template Modal
const TemplateModal = ({ template, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    type: template?.type || 'Email',
    category: template?.category || 'Transactional',
    content: template?.content || '',
    status: template?.status || 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.content.trim()) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">
              {template ? 'Edit Template' : 'Create Template'}
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Template Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Booking Confirmation"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                <option value="Email">Email</option>
                <option value="Push">Push</option>
                <option value="SMS">SMS</option>
                <option value="In-App">In-App</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                <option value="Transactional">Transactional</option>
                <option value="Onboarding">Onboarding</option>
                <option value="Marketing">Marketing</option>
                <option value="Security">Security</option>
                <option value="Reminder">Reminder</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Template Content <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Enter template content with variables like {{name}}, {{booking_id}}, etc."
              rows="5"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Use {'{{variable}}'} for dynamic content
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Draft">Draft</option>
            </select>
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
              {template ? 'Update Template' : 'Create Template'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Template Details Modal
const TemplateDetailsModal = ({ template, onClose }) => {
  if (!template) return null;

  const getTypeColor = (type) => {
    const colors = {
      'Email': 'bg-purple-50 text-purple-700',
      'Push': 'bg-blue-50 text-blue-700',
      'SMS': 'bg-green-50 text-green-700',
      'In-App': 'bg-orange-50 text-orange-700'
    };
    return colors[type] || 'bg-gray-50 text-gray-700';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-50 text-green-700',
      'Inactive': 'bg-gray-50 text-gray-700',
      'Draft': 'bg-amber-50 text-amber-700'
    };
    return colors[status] || 'bg-gray-50 text-gray-700';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Template Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl mb-3">📋</div>
            <h4 className="text-lg font-bold text-gray-800">{template.name}</h4>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getTypeColor(template.type)}`}>
                {template.type}
              </span>
              <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${getStatusColor(template.status)}`}>
                {template.status}
              </span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Template ID</span>
              <span className="text-sm font-mono text-gray-700">#{template.id.toString().padStart(3, '0')}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Category</span>
              <span className="text-sm font-semibold text-gray-700">{template.category}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Usage</span>
              <span className="text-sm font-semibold text-gray-700">{template.usage}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Last Used</span>
              <span className="text-sm font-semibold text-gray-700">{template.lastUsed}</span>
            </div>
            {template.content && (
              <div className="py-2">
                <span className="text-sm text-gray-500">Content</span>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-700 whitespace-pre-wrap">
                  {template.content}
                </div>
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

export const NotificationTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUseModal, setShowUseModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    draft: 0
  });

  // Load templates data
  useEffect(() => {
    const loadTemplates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const sampleTemplates = [
          { id: 1, name: 'Booking Confirmation', type: 'Email', category: 'Transactional', usage: '1,245', lastUsed: '2 hours ago', status: 'Active', content: 'Dear {{name}},\n\nYour booking #{{booking_id}} has been confirmed.\n\nEvent: {{event_name}}\nDate: {{event_date}}\nTime: {{event_time}}\n\nThank you for choosing us!' },
          { id: 2, name: 'Payment Receipt', type: 'Email', category: 'Transactional', usage: '876', lastUsed: '3 hours ago', status: 'Active', content: 'Dear {{name}},\n\nPayment of ₹{{amount}} received for booking #{{booking_id}}.\n\nTransaction ID: {{transaction_id}}\nDate: {{date}}\n\nThank you!' },
          { id: 3, name: 'Welcome Message', type: 'Email', category: 'Onboarding', usage: '234', lastUsed: '1 day ago', status: 'Active', content: 'Welcome {{name}}!\n\nWe are excited to have you on board. Start exploring our services today.' },
          { id: 4, name: 'Vendor Approval', type: 'Push', category: 'Vendor', usage: '56', lastUsed: '2 days ago', status: 'Active', content: 'Congratulations {{vendor_name}}!\n\nYour vendor application has been approved.' },
          { id: 5, name: 'OTP Verification', type: 'SMS', category: 'Security', usage: '3,456', lastUsed: '1 hour ago', status: 'Active', content: 'Your OTP for {{service}} is: {{otp_code}}\nValid for 5 minutes.' },
          { id: 6, name: 'Booking Reminder', type: 'Push', category: 'Reminder', usage: '789', lastUsed: '4 hours ago', status: 'Inactive', content: 'Reminder: Your booking {{booking_id}} is scheduled for tomorrow at {{event_time}}.' },
          { id: 7, name: 'Promotional Offer', type: 'Email', category: 'Marketing', usage: '0', lastUsed: 'Never', status: 'Draft', content: 'Special Offer for {{name}}!\n\nGet {{discount}}% off on all services. Use code: {{promo_code}}' },
          { id: 8, name: 'Password Reset', type: 'SMS', category: 'Security', usage: '432', lastUsed: '5 hours ago', status: 'Active', content: 'Your password reset OTP is: {{otp_code}}\nValid for 10 minutes.' },
        ];
        
        setTemplates(sampleTemplates);
        
        const total = sampleTemplates.length;
        const active = sampleTemplates.filter(t => t.status === 'Active').length;
        const inactive = sampleTemplates.filter(t => t.status === 'Inactive').length;
        const draft = sampleTemplates.filter(t => t.status === 'Draft').length;
        
        setStats({ total, active, inactive, draft });
      } catch (err) {
        setError('Failed to load templates data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTemplates();
  }, []);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Filter templates
  const filteredTemplates = useMemo(() => {
    let filtered = templates;
    
    if (filterType !== 'All') {
      filtered = filtered.filter(t => t.type === filterType);
    }
    
    if (filterStatus !== 'All') {
      filtered = filtered.filter(t => t.status === filterStatus);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [templates, filterType, filterStatus, searchTerm]);

  // Handle create template
  const handleCreateTemplate = (formData) => {
    const newTemplate = {
      id: templates.length + 1,
      name: formData.name,
      type: formData.type,
      category: formData.category,
      content: formData.content,
      usage: '0',
      lastUsed: 'Never',
      status: formData.status
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      total: prev.total + 1,
      active: formData.status === 'Active' ? prev.active + 1 : prev.active,
      inactive: formData.status === 'Inactive' ? prev.inactive + 1 : prev.inactive,
      draft: formData.status === 'Draft' ? prev.draft + 1 : prev.draft
    }));
    
    showToast(`Template "${formData.name}" created successfully!`, 'success');
  };

  // Handle edit template
  const handleEditTemplate = (formData) => {
    setTemplates(prev =>
      prev.map(template =>
        template.id === selectedTemplate.id
          ? {
              ...template,
              name: formData.name,
              type: formData.type,
              category: formData.category,
              content: formData.content,
              status: formData.status
            }
          : template
      )
    );
    
    // Update stats
    const oldStatus = selectedTemplate.status;
    const newStatus = formData.status;
    if (oldStatus !== newStatus) {
      setStats(prev => {
        const updated = { ...prev };
        if (oldStatus === 'Active') updated.active--;
        else if (oldStatus === 'Inactive') updated.inactive--;
        else if (oldStatus === 'Draft') updated.draft--;
        
        if (newStatus === 'Active') updated.active++;
        else if (newStatus === 'Inactive') updated.inactive++;
        else if (newStatus === 'Draft') updated.draft++;
        
        return updated;
      });
    }
    
    showToast(`Template "${formData.name}" updated successfully!`, 'success');
  };

  // Handle delete template
  const handleDeleteTemplate = (templateId) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      const templateToDelete = templates.find(t => t.id === templateId);
      setTemplates(prev => prev.filter(t => t.id !== templateId));
      
      // Update stats
      if (templateToDelete) {
        setStats(prev => {
          const updated = { ...prev, total: prev.total - 1 };
          if (templateToDelete.status === 'Active') updated.active--;
          else if (templateToDelete.status === 'Inactive') updated.inactive--;
          else if (templateToDelete.status === 'Draft') updated.draft--;
          return updated;
        });
      }
      
      showToast('Template deleted successfully!', 'success');
    }
  };

  // Handle use template
  const handleUseTemplate = (template, formData) => {
    // Update usage count
    setTemplates(prev =>
      prev.map(t =>
        t.id === template.id
          ? { 
              ...t, 
              usage: (parseInt(t.usage.replace(/,/g, '')) + 1).toLocaleString(),
              lastUsed: 'Just now'
            }
          : t
      )
    );
    
    // Show success message with details
    showToast(
      `Notification sent to "${formData.recipient}" using template "${template.name}"!`,
      'success'
    );
    
    // Close the use modal
    setShowUseModal(false);
    setSelectedTemplate(null);
  };

  // Get type color
  const getTypeColor = (type) => {
    const colors = {
      'Email': 'bg-purple-50 text-purple-700',
      'Push': 'bg-blue-50 text-blue-700',
      'SMS': 'bg-green-50 text-green-700',
      'In-App': 'bg-orange-50 text-orange-700'
    };
    return colors[type] || 'bg-gray-50 text-gray-700';
  };

  // Get status color
  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-50 text-green-700',
      'Inactive': 'bg-gray-50 text-gray-700',
      'Draft': 'bg-amber-50 text-amber-700'
    };
    return colors[status] || 'bg-gray-50 text-gray-700';
  };

  // Stat cards
  const statCards = [
    { label: 'Total Templates', value: stats.total, icon: '📋', color: 'border-blue-400', filter: 'All' },
    { label: 'Active', value: stats.active, icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Inactive', value: stats.inactive, icon: '⏸️', color: 'border-red-400', filter: 'Inactive' },
    { label: 'Draft', value: stats.draft, icon: '📝', color: 'border-amber-400', filter: 'Draft' },
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

      {/* Modals */}
      {showCreateModal && (
        <TemplateModal 
          onSave={handleCreateTemplate}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {showEditModal && selectedTemplate && (
        <TemplateModal 
          template={selectedTemplate}
          onSave={handleEditTemplate}
          onClose={() => {
            setShowEditModal(false);
            setSelectedTemplate(null);
          }}
        />
      )}

      {showDetailsModal && selectedTemplate && (
        <TemplateDetailsModal 
          template={selectedTemplate}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedTemplate(null);
          }}
        />
      )}

      {showUseModal && selectedTemplate && (
        <UseTemplateModal 
          template={selectedTemplate}
          onUse={handleUseTemplate}
          onClose={() => {
            setShowUseModal(false);
            setSelectedTemplate(null);
          }}
        />
      )}

      {/* Header Section - Matching Booking Overview Theme */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-red-50 to-amber-50 border border-red-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📋</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Notification Templates</h3>
            <p className="text-sm text-gray-500 mt-0.5">Create reusable templates for common messages like booking confirmations, OTPs, and reminders</p>
          </div>
        </div>
      </div>

      {/* Stats Cards - Matching Booking Overview Theme */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div 
            key={i} 
            onClick={() => s.filter && setFilterStatus(s.filter)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} ${s.filter ? 'cursor-pointer' : 'cursor-default'} transition-all duration-200 hover:shadow-md ${s.filter ? 'hover:-translate-y-0.5' : ''} ${filterStatus === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}
            role={s.filter ? "button" : "status"}
            tabIndex={s.filter ? 0 : -1}
            aria-label={s.filter ? `Filter by ${s.label}` : undefined}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                {filterStatus === s.filter && s.filter && (
                  <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>
                )}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters - Matching Booking Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.templates} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Templates</h3>
                <p className="text-xs text-gray-400">
                  {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
                  {filterStatus !== 'All' ? ` (filtered: ${filterStatus})` : ''}
                  {filterType !== 'All' ? ` (type: ${filterType})` : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {(filterStatus !== 'All' || filterType !== 'All') && (
                <button 
                  onClick={() => {
                    setFilterStatus('All');
                    setFilterType('All');
                  }} 
                  className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  ✕ Clear Filters
                </button>
              )}
              <button 
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <Icon d={ICONS.plus} size={13} /> Create Template
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
                  placeholder="Search by name, category or type..." 
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50"
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                <option value="All">All Types</option>
                <option value="Email">Email</option>
                <option value="Push">Push</option>
                <option value="SMS">SMS</option>
                <option value="In-App">In-App</option>
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Template Cards Grid */}
        <div className="p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.length === 0 ? (
              <div className="col-span-full text-center text-sm text-gray-400 py-8">
                No templates found for the selected filters.
              </div>
            ) : (
              filteredTemplates.map((template) => (
                <div 
                  key={template.id} 
                  className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                  onClick={() => {
                    setSelectedTemplate(template);
                    setShowDetailsModal(true);
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 text-sm">{template.name}</h4>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${getTypeColor(template.type)}`}>
                          {template.type}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] font-semibold bg-gray-50 text-gray-700 rounded-full">
                          {template.category}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${getStatusColor(template.status)}`}>
                      {template.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Usage: {template.usage}</span>
                    <span>Last used: {template.lastUsed}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(template);
                        setShowEditModal(true);
                      }}
                      className="flex-1 px-2 py-1.5 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTemplate(template);
                        setShowUseModal(true);
                      }}
                      className="flex-1 px-2 py-1.5 text-xs font-semibold text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors whitespace-nowrap"
                    >
                      Use
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTemplate(template.id);
                      }}
                      className="px-2 py-1.5 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats - Matching Booking Overview Style */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Template Insights</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">Total Templates</p>
            <p className="text-lg font-bold text-blue-600">{stats.total}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Active Templates</p>
            <p className="text-lg font-bold text-green-600">{stats.active}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Inactive Templates</p>
            <p className="text-lg font-bold text-red-600">{stats.inactive}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Draft Templates</p>
            <p className="text-lg font-bold text-amber-600">{stats.draft}</p>
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