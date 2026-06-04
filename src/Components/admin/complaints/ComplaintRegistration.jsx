// src/pages/admin/complaints/ComplaintRegistration.jsx
import { useState, useRef } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const ComplaintRegistration = () => {
  const [formData, setFormData] = useState({
    complainantType: 'customer',
    name: '',
    email: '',
    phone: '',
    bookingId: '',
    vendorName: '',
    complaintType: 'service_quality',
    subject: '',
    description: '',
    attachments: [],
    preferredContact: 'email',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [ticketId, setTicketId] = useState(null);
  const fileInputRef = useRef(null);

  const complaintTypes = [
    { value: 'service_quality', label: 'Service Quality Issues' },
    { value: 'payment_refund', label: 'Payment & Refund Issues' },
    { value: 'vendor_misconduct', label: 'Vendor Misconduct' },
    { value: 'booking_dispute', label: 'Booking Disputes' },
    { value: 'technical', label: 'Technical Issues' },
    { value: 'other', label: 'Other' },
  ];

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';
    
    // Email validation
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    
    // Phone validation (if provided)
    if (formData.phone && !/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Booking ID validation
    if (!formData.bookingId.trim()) newErrors.bookingId = 'Booking ID is required';
    
    // Subject validation
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    else if (formData.subject.trim().length < 5) newErrors.subject = 'Subject must be at least 5 characters';
    
    // Description validation
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.trim().length < 20) newErrors.description = 'Please provide more details (minimum 20 characters)';
    
    // File validation
    const totalSize = formData.attachments.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > 10 * 1024 * 1024) {
      newErrors.attachments = 'Total attachment size cannot exceed 10MB';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const isValidType = validTypes.includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB per file
      
      if (!isValidType) {
        showToastMsg(`${file.name} has invalid file type`, 'warning');
      }
      if (!isValidSize) {
        showToastMsg(`${file.name} exceeds 5MB limit`, 'warning');
      }
      return isValidType && isValidSize;
    });
    
    setFormData(prev => ({ 
      ...prev, 
      attachments: [...prev.attachments, ...validFiles] 
    }));
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const generateTicketId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `TKT${year}${month}${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToastMsg('Please fix the errors before submitting', 'warning');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const newTicketId = generateTicketId();
    setTicketId(newTicketId);
    setSubmitSuccess(true);
    showToastMsg(`Complaint registered successfully! Ticket ID: ${newTicketId}`, 'success');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        complainantType: 'customer',
        name: '',
        email: '',
        phone: '',
        bookingId: '',
        vendorName: '',
        complaintType: 'service_quality',
        subject: '',
        description: '',
        attachments: [],
        preferredContact: 'email',
      });
      setSubmitSuccess(false);
      setTicketId(null);
      setIsSubmitting(false);
    }, 3000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
      setFormData({
        complainantType: 'customer',
        name: '',
        email: '',
        phone: '',
        bookingId: '',
        vendorName: '',
        complaintType: 'service_quality',
        subject: '',
        description: '',
        attachments: [],
        preferredContact: 'email',
      });
      setErrors({});
      setTicketId(null);
      setSubmitSuccess(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      showToastMsg('Form reset successfully', 'info');
    }
  };

  const getComplaintTypeLabel = (value) => {
    const type = complaintTypes.find(t => t.value === value);
    return type ? type.label : value;
  };

  return (
    <div>
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
          <div className="text-4xl">📝</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Complaint Registration</h3>
            <p className="text-sm text-gray-500 mt-0.5">Allow customers and vendors to raise complaints related to bookings, services, payments, or behavior</p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {submitSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-2xl p-5 animate-slide-in">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-2xl">
              ✓
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-green-800 text-lg">Complaint Registered Successfully!</h4>
              <p className="text-sm text-green-700 mt-1">
                Your complaint has been submitted. A support ticket has been created.
              </p>
              <div className="mt-3 bg-green-100 rounded-lg p-3">
                <p className="text-xs text-green-800 font-mono">
                  Ticket ID: <span className="font-bold text-base">{ticketId}</span>
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Please save this ticket ID for future reference. Our support team will contact you shortly.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setSubmitSuccess(false)}
              className="text-green-600 hover:text-green-800"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Complainant Details */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span className="text-amber-500">👤</span> Complainant Details
              </h4>

              <div className="flex gap-4 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="complainantType"
                    value="customer"
                    checked={formData.complainantType === 'customer'}
                    onChange={handleChange}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Customer</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="complainantType"
                    value="vendor"
                    checked={formData.complainantType === 'vendor'}
                    onChange={handleChange}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">Vendor</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 transition-colors ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                  placeholder="Enter your full name"
                />
                {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 transition-colors ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 transition-colors ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                  placeholder="+91 98765 43210"
                />
                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                <p className="text-xs text-gray-400 mt-1">Optional but recommended for quick contact</p>
              </div>
            </div>

            {/* Booking & Complaint Details */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800 pb-2 border-b border-gray-100 flex items-center gap-2">
                <span className="text-amber-500">⚠️</span> Complaint Details
              </h4>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Booking ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="bookingId"
                  value={formData.bookingId}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 transition-colors ${errors.bookingId ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                  placeholder="e.g., BK-2024-001234"
                />
                {errors.bookingId && <p className="text-xs text-red-500 mt-1">{errors.bookingId}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Vendor Name</label>
                <input
                  type="text"
                  name="vendorName"
                  value={formData.vendorName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 transition-colors"
                  placeholder="Vendor associated with this complaint"
                />
                <p className="text-xs text-gray-400 mt-1">If applicable, specify the vendor name</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Complaint Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="complaintType"
                  value={formData.complaintType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 transition-colors"
                >
                  {complaintTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 transition-colors ${errors.subject ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                  placeholder="Brief summary of your complaint"
                />
                {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
              </div>
            </div>

            {/* Description */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 transition-colors ${errors.description ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                placeholder="Please provide detailed information about your complaint. Include relevant dates, amounts, and any previous communication."
              />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
              <p className="text-xs text-gray-400 mt-1">
                Minimum 20 characters. The more details you provide, the faster we can resolve your issue.
              </p>
            </div>

            {/* Attachments */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Supporting Documents</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-amber-400 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept="image/*,.pdf,.doc,.docx"
                />
                <label htmlFor="file-upload" className="cursor-pointer block">
                  <div className="text-4xl mb-2">📎</div>
                  <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400 mt-1">Images, PDF, or Documents (Max 5MB per file, 10MB total)</p>
                  <p className="text-xs text-gray-400">Supported formats: JPG, PNG, PDF, DOC, DOCX</p>
                </label>
              </div>
              {errors.attachments && <p className="text-xs text-red-500 mt-2">{errors.attachments}</p>}
              
              {formData.attachments.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Uploaded Files ({formData.attachments.length})</p>
                  <div className="flex flex-wrap gap-2">
                    {formData.attachments.map((file, idx) => (
                      <div key={idx} className="bg-gray-100 rounded-lg px-3 py-1.5 text-xs flex items-center gap-2">
                        <span>📄 {file.name}</span>
                        <span className="text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
                        <button type="button" onClick={() => removeAttachment(idx)} className="text-red-500 hover:text-red-700 transition-colors">✕</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Preferred Contact */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Contact Method</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="email"
                    checked={formData.preferredContact === 'email'}
                    onChange={handleChange}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">📧 Email</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="phone"
                    checked={formData.preferredContact === 'phone'}
                    onChange={handleChange}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">📞 Phone</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="whatsapp"
                    checked={formData.preferredContact === 'whatsapp'}
                    onChange={handleChange}
                    className="w-4 h-4 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">💬 WhatsApp</span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Reset Form
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>Submit Complaint</>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Information Box */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl">ℹ️</div>
          <div>
            <h5 className="font-semibold text-blue-800 text-sm">What happens after submission?</h5>
            <ul className="text-xs text-blue-700 mt-2 space-y-1">
              <li>• A unique ticket ID will be generated for your complaint</li>
              <li>• Our support team will review your complaint within 24 hours</li>
              <li>• You will receive updates via your preferred contact method</li>
              <li>• Resolution time typically takes 3-5 business days depending on complexity</li>
            </ul>
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