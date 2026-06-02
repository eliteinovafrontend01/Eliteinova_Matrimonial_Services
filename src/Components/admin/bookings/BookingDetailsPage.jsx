// src/Components/admin/bookings/BookingDetailsPage.jsx
import { useState, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { BookingBadge } from '../shared/BookingBadge';
import { PaymentBadge } from '../shared/PaymentBadge';
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

// Edit Booking Modal
const EditBookingModal = ({ booking, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    customer: booking?.customer || '',
    email: booking?.email || '',
    phone: booking?.phone || '',
    address: booking?.address || '',
    service: booking?.service || '',
    vendor: booking?.vendor || '',
    eventDate: booking?.eventDate || '',
    eventTime: booking?.eventTime || '6:00 PM onwards',
    venue: booking?.venue || '',
    duration: booking?.duration || '6 hours',
    amount: booking?.amount || '',
    paymentStatus: booking?.paymentStatus || 'Pending',
    paymentMethod: booking?.paymentMethod || 'Credit Card',
    transactionId: booking?.transactionId || '',
    specialRequirements: booking?.specialRequirements || '',
    adminNotes: booking?.adminNotes || '',
    customerNotes: booking?.customerNotes || ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(booking.id, formData);
    onClose();
  };

  const serviceOptions = ['Wedding', 'Birthday', 'Corporate Event', 'Anniversary', 'Baby Shower', 'Other'];
  const paymentOptions = ['Pending', 'Partial', 'Completed', 'Refunded'];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Edit Booking</h3>
          <p className="text-xs text-gray-500 mt-1">Booking ID: {booking?.id}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 text-sm border-b pb-2">Customer Information</h4>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Customer Name</label>
                <input
                  type="text"
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
            </div>
            
            {/* Event Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 text-sm border-b pb-2">Event Information</h4>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Event Type</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                >
                  {serviceOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Event Date</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Event Time</label>
                <input
                  type="text"
                  name="eventTime"
                  value={formData.eventTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Venue</label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
            </div>
            
            {/* Vendor Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 text-sm border-b pb-2">Vendor Information</h4>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Assigned Vendor</label>
                <input
                  type="text"
                  name="vendor"
                  value={formData.vendor}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Vendor Contact</label>
                <input
                  type="text"
                  name="vendorContact"
                  value={formData.vendorContact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                  placeholder="+91 99887 66554"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Vendor Email</label>
                <input
                  type="email"
                  name="vendorEmail"
                  value={formData.vendorEmail}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                  placeholder="vendor@example.com"
                />
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-700 text-sm border-b pb-2">Payment Information</h4>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Total Amount</label>
                <input
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                  placeholder="₹15,000"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Payment Status</label>
                <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                >
                  {paymentOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Payment Method</label>
                <input
                  type="text"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Transaction ID</label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
            </div>
          </div>
          
          {/* Notes Section */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700 text-sm border-b pb-2">Notes & Requirements</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Special Requirements</label>
                <textarea
                  name="specialRequirements"
                  value={formData.specialRequirements}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                  placeholder="Need extra lighting equipment, prefer traditional poses for photoshoot"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Admin Notes</label>
                <textarea
                  name="adminNotes"
                  value={formData.adminNotes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                  placeholder="Customer requested early arrival for setup"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Customer Notes</label>
                <textarea
                  name="customerNotes"
                  value={formData.customerNotes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                  placeholder="Looking forward to the event!"
                />
              </div>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Document Upload Modal
const DocumentUploadModal = ({ booking, onUpload, onClose }) => {
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState('contract');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onUpload(booking.id, {
        name: documentName,
        type: documentType,
        file: file.name,
        date: new Date().toISOString().split('T')[0]
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Upload Document</h3>
          <p className="text-xs text-gray-500 mt-1">Booking: {booking?.id}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Document Name</label>
            <input
              type="text"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
              placeholder="e.g., Contract Agreement"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Document Type</label>
            <select
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            >
              <option value="contract">Contract</option>
              <option value="invoice">Invoice</option>
              <option value="receipt">Receipt</option>
              <option value="requirement">Requirements</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Choose File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
            <p className="text-xs text-gray-400 mt-1">Supported formats: PDF, DOC, JPG, PNG (Max 5MB)</p>
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
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Document Viewer Modal
const DocumentViewerModal = ({ document, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-gray-800">{document.name}</h3>
            <p className="text-xs text-gray-500">Uploaded on {document.date}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <div className="text-6xl mb-4">
              {document.type === 'contract' ? '📄' : 
               document.type === 'invoice' ? '💰' : 
               document.type === 'receipt' ? '🧾' : 
               document.type === 'requirement' ? '📝' : '📎'}
            </div>
            <p className="text-sm text-gray-600 mb-4">{document.name}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => alert(`Downloading ${document.name}`)}
                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
              >
                Download
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BookingDetailsPage = ({ bookingId, onBack }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [booking, setBooking] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const tabs = [
    { id: 'details', label: 'Booking Details', icon: '📋' },
    { id: 'timeline', label: 'Timeline & Logs', icon: '⏱️' },
    { id: 'documents', label: 'Documents', icon: '📎' }
  ];

  useEffect(() => {
    const loadBooking = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundBooking = allBookingsData.find(b => b.id === bookingId) || allBookingsData[0];
        
        // Enrich booking data
        const enrichedBooking = {
          ...foundBooking,
          email: 'customer@example.com',
          phone: '+91 98765 43210',
          address: 'Mumbai, Maharashtra',
          eventTime: '6:00 PM onwards',
          venue: 'Grand Plaza Hotel, Mumbai',
          duration: '6 hours',
          amount: foundBooking.amount || '₹15,000',
          paymentMethod: 'Credit Card',
          transactionId: 'TXN_2024_001234',
          vendorContact: '+91 99887 66554',
          vendorEmail: 'vendor@example.com',
          vendorRating: '4.8',
          paidAmount: '₹12,500',
          balance: '₹2,500',
          specialRequirements: 'Need extra lighting equipment, prefer traditional poses for photoshoot',
          adminNotes: 'Customer requested early arrival for setup. VIP guest list attached.',
          customerNotes: 'Looking forward to the event! Please confirm all arrangements.'
        };
        
        setBooking(enrichedBooking);
        
        // Mock timeline data
        setTimeline([
          { date: '2024-01-15 10:30', action: 'Booking Created', user: 'Customer', details: 'New booking request submitted', icon: '📅' },
          { date: '2024-01-15 14:20', action: 'Vendor Assigned', user: 'Admin', details: 'Assigned to Wedding Planners Inc.', icon: '👥' },
          { date: '2024-01-16 09:15', action: 'Payment Received', user: 'System', details: 'Advance payment of ₹10,000 received', icon: '💰' },
          { date: '2024-01-16 11:00', action: 'Status Updated', user: 'Admin', details: 'Status changed from Pending to Confirmed', icon: '🔄' },
          { date: '2024-01-20 15:30', action: 'Requirements Shared', user: 'Customer', details: 'Customer shared special requirements document', icon: '📝' },
        ]);
        
        // Mock documents data
        setDocuments([
          { id: 1, name: 'Contract Agreement', type: 'contract', date: '2024-01-16', size: '2.4 MB' },
          { id: 2, name: 'Event Requirements', type: 'requirement', date: '2024-01-18', size: '1.1 MB' },
          { id: 3, name: 'Payment Receipt', type: 'receipt', date: '2024-01-20', size: '856 KB' },
        ]);
      } catch (err) {
        setError('Failed to load booking details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBooking();
  }, [bookingId]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleSaveEdit = (bookingId, updatedData) => {
    setBooking(prev => ({ ...prev, ...updatedData }));
    showToast(`Booking ${bookingId} updated successfully!`, 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    showToast('PDF download started...', 'success');
  };

  const handleUploadDocument = (bookingId, docData) => {
    const newDoc = {
      id: documents.length + 1,
      ...docData,
      size: '1.2 MB'
    };
    setDocuments([...documents, newDoc]);
    showToast('Document uploaded successfully!', 'success');
  };

  const handleDeleteDocument = (docId) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
    showToast('Document deleted successfully!', 'success');
  };

  const getDocumentIcon = (type) => {
    switch(type) {
      case 'contract': return '📄';
      case 'invoice': return '💰';
      case 'receipt': return '🧾';
      case 'requirement': return '📝';
      default: return '📎';
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;
  if (!booking) return null;

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
      {showEditModal && (
        <EditBookingModal 
          booking={booking}
          onSave={handleSaveEdit}
          onClose={() => setShowEditModal(false)}
        />
      )}
      
      {showUploadModal && (
        <DocumentUploadModal 
          booking={booking}
          onUpload={handleUploadDocument}
          onClose={() => setShowUploadModal(false)}
        />
      )}
      
      {selectedDocument && (
        <DocumentViewerModal 
          document={selectedDocument}
          onClose={() => setSelectedDocument(null)}
        />
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack} 
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-white/50 rounded-lg"
              title="Go Back"
            >
              ← Back
            </button>
            <div className="text-4xl">📄</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Detailed Booking View</h3>
              <p className="text-sm text-gray-500 mt-0.5">Booking ID: {booking.id}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleDownloadPDF}
              className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              <Icon d={ICONS.download} size={13} /> PDF
            </button>
            <button 
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"
            >
              <Icon d={ICONS.printer} size={13} /> Print
            </button>
            <button 
              onClick={() => setShowEditModal(true)}
              className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1"
            >
              <Icon d={ICONS.edit} size={13} /> Edit Booking
            </button>
          </div>
        </div>
      </div>
      
      {/* Status Badge */}
      <div className="mb-6">
        <BookingBadge status={booking.status} size="large" />
      </div>
      
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-white text-red-600 border-b-2 border-red-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>
      
      {activeTab === 'details' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center text-sm">👤</span>
              Customer Information
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-base font-bold">
                  {booking.customer.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{booking.customer}</p>
                  <p className="text-xs text-gray-400">Customer since 2023</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between py-1">
                  <span className="text-xs text-gray-400">Email</span>
                  <span className="text-xs font-semibold text-gray-700">{booking.email}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-xs text-gray-400">Phone</span>
                  <span className="text-xs font-semibold text-gray-700">{booking.phone}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-xs text-gray-400">Address</span>
                  <span className="text-xs font-semibold text-gray-700">{booking.address}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Event Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center text-sm">🎉</span>
              Event Information
            </h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-400">Event Type</p>
                  <p className="text-sm font-semibold text-gray-700">{booking.service}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Event Date</p>
                  <p className="text-sm font-semibold text-gray-700">{booking.eventDate}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Event Time</p>
                  <p className="text-sm font-semibold text-gray-700">{booking.eventTime}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Duration</p>
                  <p className="text-sm font-semibold text-gray-700">{booking.duration}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400">Venue</p>
                <p className="text-sm font-semibold text-gray-700">{booking.venue}</p>
              </div>
            </div>
          </div>
          
          {/* Vendor Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center text-sm">🚚</span>
              Vendor Information
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between py-1">
                <span className="text-xs text-gray-400">Assigned Vendor</span>
                <span className="text-sm font-semibold text-gray-700">{booking.vendor}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-xs text-gray-400">Contact</span>
                <span className="text-sm font-semibold text-gray-700">{booking.vendorContact}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-xs text-gray-400">Email</span>
                <span className="text-sm font-semibold text-gray-700">{booking.vendorEmail}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-xs text-gray-400">Rating</span>
                <span className="text-sm font-semibold text-amber-600">★★★★☆ {booking.vendorRating}</span>
              </div>
            </div>
          </div>
          
          {/* Payment Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
            <h4 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-sm">💰</span>
              Payment Information
            </h4>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4 pb-2 border-b">
                <div>
                  <p className="text-xs text-gray-400">Total Amount</p>
                  <p className="text-xl font-bold text-gray-800">{booking.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Paid Amount</p>
                  <p className="text-xl font-bold text-green-600">{booking.paidAmount}</p>
                </div>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-xs text-gray-400">Balance</span>
                <span className="text-sm font-semibold text-red-600">{booking.balance}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-xs text-gray-400">Payment Status</span>
                <PaymentBadge status={booking.paymentStatus || 'Pending'} />
              </div>
              <div className="flex justify-between py-1">
                <span className="text-xs text-gray-400">Payment Method</span>
                <span className="text-sm font-semibold text-gray-700">{booking.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-xs text-gray-400">Transaction ID</span>
                <span className="text-xs font-mono text-gray-500">{booking.transactionId}</span>
              </div>
            </div>
          </div>
          
          {/* Notes Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-red-50 flex items-center justify-center text-sm">📝</span>
              Notes & Requirements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-600 mb-2">🎯 Special Requirements</p>
                <p className="text-xs text-gray-500">{booking.specialRequirements}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-600 mb-2">📋 Admin Notes</p>
                <p className="text-xs text-gray-500">{booking.adminNotes}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs font-semibold text-gray-600 mb-2">💬 Customer Notes</p>
                <p className="text-xs text-gray-500">{booking.customerNotes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'timeline' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-4">
            {timeline.map((event, i) => (
              <div key={i} className="flex items-start gap-3 group hover:bg-gray-50 p-3 rounded-xl transition-colors">
                <div className="flex-shrink-0 w-28">
                  <p className="text-xs font-semibold text-gray-600">{event.date}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-sm">
                    {event.icon}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-0.5 h-12 bg-gray-200 mx-auto mt-2"></div>
                  )}
                </div>
                <div className="flex-grow bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-gray-800">{event.action}</p>
                    <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">By: {event.user}</span>
                  </div>
                  <p className="text-sm text-gray-600">{event.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'documents' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-gray-800 text-base">Documents</h4>
            <button 
              onClick={() => setShowUploadModal(true)}
              className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1"
            >
              <Icon d={ICONS.upload} size={13} /> Upload Document
            </button>
          </div>
          
          {documents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📎</div>
              <p className="text-sm text-gray-500 mb-4">No documents uploaded yet</p>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl hover:bg-red-700 transition-colors"
              >
                Upload Your First Document
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map(doc => (
                <div key={doc.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{getDocumentIcon(doc.type)}</div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setSelectedDocument(doc)}
                        className="p-1 hover:bg-blue-50 rounded-lg text-blue-500 transition-colors"
                        title="View Document"
                      >
                       View
                      </button>
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="p-1 hover:bg-red-50 rounded-lg text-red-500 transition-colors"
                        title="Delete Document"
                      >
                       Delete
                      </button>
                    </div>
                  </div>
                  <h5 className="font-semibold text-gray-800 text-sm mb-1">{doc.name}</h5>
                  <p className="text-xs text-gray-400 mb-2 capitalize">{doc.type} • {doc.size}</p>
                  <p className="text-xs text-gray-400">Uploaded: {doc.date}</p>
                </div>
              ))}
            </div>
          )}
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
        
        @media print {
          .fixed,
          button:not(.print-ignore) {
            display: none !important;
          }
          body {
            background: white;
          }
          .rounded-2xl,
          .bg-white {
            box-shadow: none !important;
            border: 1px solid #e5e7eb !important;
          }
        }
      `}</style>
    </div>
  );
};