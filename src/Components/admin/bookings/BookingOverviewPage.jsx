// src/Components/admin/bookings/BookingOverviewPage.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { BookingBadge } from '../shared/BookingBadge';
import { PaymentBadge } from '../shared/PaymentBadge';
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

// Modal Component for Booking Details
const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Booking Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Booking ID</label>
              <p className="text-sm font-mono text-gray-800">{booking.id}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Status</label>
              <div className="mt-1"><BookingBadge status={booking.status} /></div>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Customer Name</label>
              <p className="text-sm font-semibold text-gray-800">{booking.customer}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Service Type</label>
              <p className="text-sm text-gray-800">{booking.service}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Vendor Assigned</label>
              <p className="text-sm text-gray-800">{booking.vendor}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Payment Status</label>
              <div className="mt-1"><PaymentBadge status={booking.paymentStatus || 'Pending'} /></div>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Booking Date</label>
              <p className="text-sm text-gray-800">{booking.bookingDate}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Event Date</label>
              <p className="text-sm font-semibold text-gray-800">{booking.eventDate}</p>
            </div>
            {booking.amount && (
              <div>
                <label className="text-xs text-gray-400 uppercase font-bold">Amount</label>
                <p className="text-sm font-semibold text-gray-800">₹{booking.amount}</p>
              </div>
            )}
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={() => {
                alert(`Edit functionality will be implemented with backend integration for booking ${booking.id}`);
                onClose();
              }}
              className="w-full px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Edit Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Assign Vendor Modal
const AssignVendorModal = ({ booking, vendors, onAssign, onClose }) => {
  const [selectedVendor, setSelectedVendor] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedVendor) {
      onAssign(booking.id, selectedVendor, notes);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Assign Vendor</h3>
          <p className="text-sm text-gray-500">Booking: {booking?.id}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Vendor</label>
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            >
              <option value="">Choose a vendor...</option>
              {vendors.map(vendor => (
                <option key={vendor} value={vendor}>{vendor}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Add any additional notes..."
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Assign Vendor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Cancel Booking Modal
const CancelBookingModal = ({ booking, onCancel, onClose }) => {
  const [reason, setReason] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    onCancel(booking.id, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-red-600">Cancel Booking</h3>
          <p className="text-sm text-gray-500">Booking: {booking?.id}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            ⚠️ Warning: This action cannot be undone. The booking will be permanently cancelled.
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cancellation Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Please provide a reason for cancellation..."
              required
            />
          </div>
          
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              No, Keep Booking
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isConfirming 
                  ? 'bg-red-700 text-white hover:bg-red-800' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isConfirming ? 'Confirm Cancellation' : 'Cancel Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Booking Modal
const EditBookingModal = ({ booking, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    customer: booking?.customer || '',
    service: booking?.service || '',
    vendor: booking?.vendor || '',
    eventDate: booking?.eventDate || '',
    status: booking?.status || '',
    paymentStatus: booking?.paymentStatus || 'Pending'
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
  const statusOptions = ['Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'];
  const paymentOptions = ['Pending', 'Partial', 'Completed', 'Refunded'];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Edit Booking</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name</label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            >
              {serviceOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Vendor</label>
            <input
              type="text"
              name="vendor"
              value={formData.vendor}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date</label>
            <input
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Booking Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            >
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Status</label>
            <select
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            >
              {paymentOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
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
              className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Mobile Booking Card Component
const MobileBookingCard = ({ booking, onSelect, onEdit, onAssignVendor, onCancel }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-4 mb-3 shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-xs font-bold">
          {booking.customer.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <div className="font-semibold text-gray-800 text-sm">{booking.customer}</div>
          <div className="text-xs text-gray-400 font-mono">{booking.id}</div>
        </div>
      </div>
      <BookingBadge status={booking.status} />
    </div>
    
    <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
      <div>
        <span className="text-gray-400">Service:</span>
        <span className="text-gray-700 font-medium ml-1">{booking.service}</span>
      </div>
      <div>
        <span className="text-gray-400">Vendor:</span>
        <span className="text-gray-700 ml-1">{booking.vendor}</span>
      </div>
      <div>
        <span className="text-gray-400">Booking Date:</span>
        <span className="text-gray-700 ml-1">{booking.bookingDate}</span>
      </div>
      <div>
        <span className="text-gray-400">Event Date:</span>
        <span className="text-gray-700 font-semibold ml-1">{booking.eventDate}</span>
      </div>
      <div>
        <span className="text-gray-400">Payment:</span>
        <span className="ml-1">
          <PaymentBadge status={booking.paymentStatus || 'Pending'} />
        </span>
      </div>
    </div>
    
    <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-50">
      <button onClick={() => onSelect(booking)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="View Details">
        <Icon d={ICONS.eye} size={14} />
      </button>
      <button onClick={() => onEdit(booking)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors" title="Edit Booking">
        <Icon d={ICONS.edit} size={14} />
      </button>
      <button onClick={() => onAssignVendor(booking)} className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors" title="Assign Vendor">
        <Icon d={ICONS.userCheck} size={14} />
      </button>
      {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
        <button onClick={() => onCancel(booking)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Cancel Booking">
          <Icon d={ICONS.cancel} size={14} />
        </button>
      )}
    </div>
  </div>
);

export const BookingOverviewPage = ({ onSelect }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showDateFilter, setShowDateFilter] = useState(false);
  const [bookings, setBookings] = useState([]);
  
  // Modal states
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Toast notification
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  const itemsPerPage = 10;
  
  // Available vendors list (would come from backend)
  const availableVendors = ['ABC Events', 'XYZ Decor', 'Premier Catering', 'Elite Photography', 'Melody Music', 'Dream Planners'];
  
  // Load bookings (simulate API call)
  useEffect(() => {
    const loadBookings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setBookings(allBookingsData);
      } catch (err) {
        setError('Failed to load bookings. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBookings();
  }, []);
  
  // Calculate stats
  const stats = useMemo(() => {
    const total = bookings.length;
    const today = bookings.filter(b => b.bookingDate === new Date().toISOString().split('T')[0]).length;
    const pending = bookings.filter(b => b.status === 'Pending').length;
    const completed = bookings.filter(b => b.status === 'Completed').length;
    const cancelled = bookings.filter(b => b.status === 'Cancelled').length;
    const revenue = bookings.reduce((sum, b) => sum + (parseFloat(b.amount) || 0), 0);
    
    return { total, today, pending, completed, cancelled, revenue };
  }, [bookings]);
  
  // Memoized filter logic
  const filtered = useMemo(() => {
    try {
      return bookings.filter(booking => {
        const matchStatus = activeFilter === 'All' || booking.status === activeFilter;
        
        const matchSearch = !search || 
          booking.customer.toLowerCase().includes(search.toLowerCase()) || 
          booking.vendor.toLowerCase().includes(search.toLowerCase()) || 
          booking.service.toLowerCase().includes(search.toLowerCase()) ||
          booking.id.toLowerCase().includes(search.toLowerCase());
        
        let matchDateRange = true;
        if (dateRange.start) {
          const bookingDate = new Date(booking.bookingDate);
          const startDate = new Date(dateRange.start);
          matchDateRange = bookingDate >= startDate;
          
          if (matchDateRange && dateRange.end) {
            const endDate = new Date(dateRange.end);
            matchDateRange = bookingDate <= endDate;
          }
        }
        
        return matchStatus && matchSearch && matchDateRange;
      });
    } catch (err) {
      setError('Error filtering bookings');
      return [];
    }
  }, [bookings, activeFilter, search, dateRange]);
  
  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Helper functions
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };
  
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };
  
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };
  
  const handleDateRangeChange = (type, value) => {
    setDateRange(prev => ({ ...prev, [type]: value }));
    setCurrentPage(1);
  };
  
  const clearDateFilter = () => {
    setDateRange({ start: '', end: '' });
    setShowDateFilter(false);
  };
  
  // CRUD Operations
  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };
  
  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setShowEditModal(true);
  };
  
  const handleSaveEdit = (bookingId, updatedData) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, ...updatedData }
          : booking
      )
    );
    showToast(`Booking ${bookingId} updated successfully!`, 'success');
  };
  
  const handleAssignVendor = (booking) => {
    setSelectedBooking(booking);
    setShowAssignModal(true);
  };
  
  const handleAssignVendorSubmit = (bookingId, vendor, notes) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, vendor, notes }
          : booking
      )
    );
    showToast(`Vendor assigned to booking ${bookingId} successfully!`, 'success');
  };
  
  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };
  
  const handleCancelBookingSubmit = (bookingId, reason) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'Cancelled', cancellationReason: reason, cancellationDate: new Date().toISOString().split('T')[0] }
          : booking
      )
    );
    showToast(`Booking ${bookingId} has been cancelled.`, 'warning');
  };
  
  const exportToCSV = () => {
    try {
      const exportData = filtered.map(booking => ({
        'Booking ID': booking.id,
        'Customer Name': booking.customer,
        'Service': booking.service,
        'Vendor': booking.vendor,
        'Booking Date': booking.bookingDate,
        'Event Date': booking.eventDate,
        'Status': booking.status,
        'Payment Status': booking.paymentStatus || 'Pending',
        'Amount': booking.amount || 'N/A'
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
      link.download = `bookings_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast(`Successfully exported ${filtered.length} bookings!`, 'success');
    } catch (err) {
      setError('Error exporting data');
    }
  };
  
  const statCards = [
    { label: 'Total Bookings', value: stats.total.toLocaleString(), icon: '📋', color: 'border-blue-400', filter: 'All' },
    { label: "Today's Bookings", value: stats.today.toString(), icon: '📅', color: 'border-green-400', filter: 'Today' },
    { label: 'Pending Bookings', value: stats.pending.toLocaleString(), icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Completed Bookings', value: stats.completed.toLocaleString(), icon: '✅', color: 'border-emerald-400', filter: 'Completed' },
    { label: 'Cancelled Bookings', value: stats.cancelled.toLocaleString(), icon: '❌', color: 'border-red-400', filter: 'Cancelled' },
    { label: 'Revenue Generated', value: `₹${(stats.revenue / 10000000).toFixed(2)}Cr`, icon: '💰', color: 'border-purple-400', filter: null },
  ];
  
  const featureCards = [
    { emoji: '🔍', title: 'Advanced Search & Filters', accentColor: 'bg-blue-50', points: ['Filter by customer, vendor, service', 'Filter by date range & status', 'Filter by payment status', 'Quick booking ID search'] },
    { emoji: '👤', title: 'Customer Details', accentColor: 'bg-purple-50', points: ['View customer personal info', 'Access booking history', 'View past interactions', 'Communication records'] },
    { emoji: '🔒', title: 'Booking Status Management', accentColor: 'bg-green-50', points: ['Update booking workflow', 'Bulk status updates', 'Add remarks & notes', 'Status change tracking'] },
    { emoji: '📤', title: 'Export Data', accentColor: 'bg-amber-50', points: ['Download as CSV or Excel', 'Filter before export', 'Scheduled report exports', 'Analytics-ready format'] }
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
      
      {/* Modals - No black background, just clean blur/white backdrop */}
      {showDetailsModal && (
        <BookingDetailsModal booking={selectedBooking} onClose={() => setShowDetailsModal(false)} />
      )}
      {showAssignModal && (
        <AssignVendorModal 
          booking={selectedBooking} 
          vendors={availableVendors}
          onAssign={handleAssignVendorSubmit}
          onClose={() => setShowAssignModal(false)} 
        />
      )}
      {showCancelModal && (
        <CancelBookingModal 
          booking={selectedBooking} 
          onCancel={handleCancelBookingSubmit}
          onClose={() => setShowCancelModal(false)} 
        />
      )}
      {showEditModal && (
        <EditBookingModal 
          booking={selectedBooking} 
          onSave={handleSaveEdit}
          onClose={() => setShowEditModal(false)} 
        />
      )}
      
      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📋</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Booking Overview</h3>
            <p className="text-sm text-gray-500 mt-0.5">View all bookings in a centralized dashboard with key details</p>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} 
            onClick={() => s.filter && handleFilterChange(s.filter)}
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
      
      {/* Main Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.booking} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">All Bookings</h3>
                <p className="text-xs text-gray-400">
                  {filtered.length} booking{filtered.length !== 1 ? 's' : ''} 
                  {activeFilter !== 'All' ? ` (filtered: ${activeFilter})` : ' total'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFilter !== 'All' && (
                <button 
                  onClick={() => handleFilterChange('All')} 
                  className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  aria-label="Clear all filters"
                >
                  ✕ Clear Filter
                </button>
              )}
              <button 
                onClick={exportToCSV} 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
                aria-label="Export bookings to CSV"
              >
                <Icon d={ICONS.download} size={13} />
                Export CSV
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
                  value={search} 
                  onChange={handleSearch} 
                  type="text" 
                  placeholder="Search by customer, vendor, service or booking ID..." 
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50"
                  aria-label="Search bookings"
                />
              </div>
              <button
                onClick={() => setShowDateFilter(!showDateFilter)}
                className={`px-3 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1 ${showDateFilter ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                📅 {showDateFilter ? 'Hide' : 'Show'} Date Filter
              </button>
            </div>
            
            {/* Date Range Filter */}
            {showDateFilter && (
              <div className="flex flex-wrap items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="text-xs font-semibold text-gray-600">Booking Date Range:</div>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => handleDateRangeChange('start', e.target.value)}
                    className="px-2 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-300"
                    aria-label="Start date"
                  />
                  <span className="text-gray-400">to</span>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => handleDateRangeChange('end', e.target.value)}
                    className="px-2 py-1 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-300"
                    aria-label="End date"
                  />
                  {(dateRange.start || dateRange.end) && (
                    <button
                      onClick={clearDateFilter}
                      className="text-xs text-red-600 hover:text-red-700"
                      aria-label="Clear date filter"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {/* Status Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map(f => (
                <button 
                  key={f} 
                  onClick={() => handleFilterChange(f)} 
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
        
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Booking ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Customer Name</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Service</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Vendor</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Booking Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Event Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Payment</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-sm text-gray-400">
                    No bookings found for the selected filters.
                  </td>
                </tr>
              ) : (
                paginatedData.map(booking => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{booking.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                          {booking.customer.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{booking.customer}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded-lg">{booking.service}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{booking.vendor}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{booking.bookingDate}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">{booking.eventDate}</td>
                    <td className="px-4 py-3"><BookingBadge status={booking.status} /></td>
                    <td className="px-4 py-3"><PaymentBadge status={booking.paymentStatus || 'Pending'} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => handleViewDetails(booking)} 
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          aria-label={`View details for booking ${booking.id}`}
                          title="View Details"
                        >
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        <button 
                          onClick={() => handleEditBooking(booking)} 
                          className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"
                          aria-label={`Edit booking ${booking.id}`}
                          title="Edit Booking"
                        >
                          <Icon d={ICONS.edit} size={14} />
                        </button>
                        <button 
                          onClick={() => handleAssignVendor(booking)} 
                          className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                          aria-label={`Assign vendor for booking ${booking.id}`}
                          title="Assign Vendor"
                        >
                          <Icon d={ICONS.userCheck} size={14} />
                        </button>
                        {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                          <button 
                            onClick={() => handleCancelBooking(booking)} 
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                            aria-label={`Cancel booking ${booking.id}`}
                            title="Cancel Booking"
                          >
                            <Icon d={ICONS.cancel} size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Card View */}
        <div className="lg:hidden p-4">
          {paginatedData.length === 0 ? (
            <div className="text-center text-sm text-gray-400 py-8">
              No bookings found for the selected filters.
            </div>
          ) : (
            paginatedData.map(booking => (
              <MobileBookingCard 
                key={booking.id} 
                booking={booking} 
                onSelect={handleViewDetails}
                onEdit={handleEditBooking}
                onAssignVendor={handleAssignVendor}
                onCancel={handleCancelBooking}
              />
            ))
          )}
        </div>
        
        {/* Pagination */}
        <div className="px-5 py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-gray-400">
            Showing {paginatedData.length} of {filtered.length} bookings
            {activeFilter !== 'All' && ` (filtered by ${activeFilter})`}
          </p>
          
          {totalPages > 1 && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`w-7 h-7 text-xs rounded-lg font-semibold transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
                aria-label="Previous page"
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
                    className={`w-7 h-7 text-xs rounded-lg font-semibold transition-colors ${currentPage === pageNum ? 'bg-red-600 text-white' : 'text-gray-500 hover:bg-gray-100'} ${typeof pageNum !== 'number' ? 'cursor-default' : ''}`}
                    aria-label={`Page ${pageNum}`}
                    aria-current={currentPage === pageNum ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`w-7 h-7 text-xs rounded-lg font-semibold transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
                aria-label="Next page"
              >
                →
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {featureCards.map((card, i) => (
          <FeatureCard key={i} {...card} />
        ))}
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