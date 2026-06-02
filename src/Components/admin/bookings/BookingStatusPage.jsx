// src/Components/admin/bookings/BookingStatusPage.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { BookingBadge } from '../shared/BookingBadge';
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

// Status History Modal - Clean design without black background
const StatusHistoryModal = ({ booking, onClose }) => {
  if (!booking || !booking.statusHistory) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Status History</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4 pb-4 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-800">Booking ID: {booking.id}</p>
            <p className="text-sm text-gray-600">Customer: {booking.customer}</p>
            <p className="text-sm text-gray-600">Service: {booking.service}</p>
          </div>
          
          <div className="space-y-4">
            {booking.statusHistory.map((history, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    history.status === 'Completed' ? 'bg-green-100' :
                    history.status === 'Cancelled' ? 'bg-red-100' :
                    history.status === 'Confirmed' ? 'bg-green-100' :
                    history.status === 'In Progress' ? 'bg-purple-100' :
                    'bg-amber-100'
                  }`}>
                    <span className="text-lg">
                      {history.status === 'Pending' ? '⏳' :
                       history.status === 'Confirmed' ? '✅' :
                       history.status === 'In Progress' ? '🔄' :
                       history.status === 'Completed' ? '🎉' : '❌'}
                    </span>
                  </div>
                  {index < booking.statusHistory.length - 1 && (
                    <div className="w-0.5 h-12 bg-gray-200 mx-auto"></div>
                  )}
                </div>
                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <BookingBadge status={history.status} />
                    <span className="text-xs text-gray-400">{history.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{history.remarks || 'No remarks provided'}</p>
                  <p className="text-xs text-gray-400">Updated by: {history.updatedBy || 'System'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Bulk Update Modal - Clean design
const BulkUpdateModal = ({ selectedBookings, selectedBookingsList, onUpdate, onClose }) => {
  const [newStatus, setNewStatus] = useState('');
  const [remarks, setRemarks] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    onUpdate(selectedBookings, newStatus, remarks);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Bulk Status Update</h3>
          <p className="text-sm text-gray-500">Updating {selectedBookings.size} booking(s)</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
            ℹ️ This will update the status for all selected bookings simultaneously.
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Status</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            >
              <option value="">Select status...</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Remarks (Optional)</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Add remarks for this bulk update..."
            />
          </div>
          
          {isConfirming && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              ⚠️ This action will update {selectedBookings.size} bookings. This cannot be undone.
            </div>
          )}
          
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
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isConfirming 
                  ? 'bg-red-700 text-white hover:bg-red-800' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isConfirming ? 'Confirm Update' : 'Update All'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Update Status Modal - Clean design
const UpdateStatusModal = ({ booking, onUpdate, onViewHistory, onClose }) => {
  const [newStatus, setNewStatus] = useState(booking?.status || '');
  const [remarks, setRemarks] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    onUpdate(booking.id, newStatus, remarks);
    onClose();
  };

  const getRecommendedStatus = () => {
    switch(booking?.status) {
      case 'Pending': return 'Confirmed';
      case 'Confirmed': return 'In Progress';
      case 'In Progress': return 'Completed';
      default: return null;
    }
  };

  const recommendedStatus = getRecommendedStatus();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Update Booking Status</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Booking ID</p>
              <p className="text-sm font-mono font-semibold">{booking?.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Event Date</p>
              <p className="text-sm font-semibold">{booking?.eventDate}</p>
            </div>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Customer</p>
            <p className="text-sm font-semibold">{booking?.customer}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Service</p>
            <p className="text-sm">{booking?.service}</p>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Current Status</p>
            <BookingBadge status={booking?.status} />
          </div>
          
          {recommendedStatus && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-xs text-green-700">
              💡 Recommended: Move to <strong>{recommendedStatus}</strong>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Status</label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            >
              <option value="Pending">⏳ Pending</option>
              <option value="Confirmed">✅ Confirmed</option>
              <option value="In Progress">🔄 In Progress</option>
              <option value="Completed">🎉 Completed</option>
              <option value="Cancelled">❌ Cancelled</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Remarks (Optional)</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Add remarks about this status update..."
            />
          </div>
          
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => onViewHistory(booking)}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View History
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isConfirming 
                  ? 'bg-red-700 text-white hover:bg-red-800' 
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isConfirming ? 'Confirm Update' : 'Update Status'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Status Timeline Component
const StatusTimeline = ({ bookings }) => {
  const statusFlow = ['Pending', 'Confirmed', 'In Progress', 'Completed'];
  
  const getStatusCount = (status) => {
    return bookings.filter(b => b.status === status).length;
  };

  const getConversionRate = (fromStatus, toStatus) => {
    const fromCount = getStatusCount(fromStatus);
    const toCount = getStatusCount(toStatus);
    if (fromCount === 0) return 0;
    return Math.round((toCount / fromCount) * 100);
  };

  const totalBookings = bookings.length;
  const cancelledCount = getStatusCount('Cancelled');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      <h4 className="font-bold text-gray-800 text-base mb-6 flex items-center gap-2">
        <span className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-lg">📊</span>
        Status Pipeline & Analytics
      </h4>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-8">
          {statusFlow.map((status, index) => (
            <div key={status} className="flex-1 text-center relative">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 shadow-lg ${
                status === 'Pending' ? 'bg-amber-100 ring-4 ring-amber-200' :
                status === 'Confirmed' ? 'bg-green-100 ring-4 ring-green-200' :
                status === 'In Progress' ? 'bg-purple-100 ring-4 ring-purple-200' : 
                'bg-emerald-100 ring-4 ring-emerald-200'
              }`}>
                <span className="text-3xl">
                  {status === 'Pending' ? '⏳' : 
                   status === 'Confirmed' ? '✅' : 
                   status === 'In Progress' ? '🔄' : '🎉'}
                </span>
              </div>
              <p className="font-bold text-sm mt-2">{status}</p>
              <p className="text-2xl font-bold text-gray-800">{getStatusCount(status)}</p>
              <p className="text-xs text-gray-400 mt-1">
                {totalBookings > 0 ? ((getStatusCount(status) / totalBookings) * 100).toFixed(1) : 0}%
              </p>
              
              {index < statusFlow.length - 1 && (
                <>
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 -z-10"></div>
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-1 rounded-full text-xs font-bold text-gray-600 whitespace-nowrap shadow-sm">
                    {getConversionRate(status, statusFlow[index + 1])}% CR
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Cancelled Bookings:</span>
            <span className="text-lg font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg">
              {cancelledCount}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Overall Completion Rate:</span>
            <span className="text-lg font-bold text-green-600 bg-green-50 px-3 py-1 rounded-lg">
              {getConversionRate('Pending', 'Completed')}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BookingStatusPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedBookings, setSelectedBookings] = useState(new Set());
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Load bookings (simulate API call)
  useEffect(() => {
    const loadBookings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        // Add status history to each booking
        const bookingsWithHistory = allBookingsData.map(booking => ({
          ...booking,
          statusHistory: [
            { 
              status: 'Pending', 
              date: booking.bookingDate, 
              remarks: 'Booking created successfully', 
              updatedBy: 'Customer' 
            },
            ...(booking.status !== 'Pending' ? [{ 
              status: booking.status, 
              date: new Date().toISOString().split('T')[0], 
              remarks: `Status updated to ${booking.status}`,
              updatedBy: 'Admin' 
            }] : [])
          ]
        }));
        setBookings(bookingsWithHistory);
      } catch (err) {
        setError('Failed to load bookings. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBookings();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const statusCounts = useMemo(() => ({
    Pending: bookings.filter(b => b.status === 'Pending').length,
    Confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    'In Progress': bookings.filter(b => b.status === 'In Progress').length,
    Completed: bookings.filter(b => b.status === 'Completed').length,
    Cancelled: bookings.filter(b => b.status === 'Cancelled').length,
  }), [bookings]);

  const filtered = useMemo(() => {
    return bookings.filter(b => {
      const matchStatus = activeFilter === 'All' || b.status === activeFilter;
      const matchSearch = !search || 
        b.customer.toLowerCase().includes(search.toLowerCase()) || 
        b.id.toLowerCase().includes(search.toLowerCase()) ||
        b.service.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [bookings, activeFilter, search]);

  const handleUpdateStatus = (bookingId, newStatus, remarks) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => {
        if (booking.id === bookingId) {
          const newHistory = {
            status: newStatus,
            date: new Date().toISOString().split('T')[0],
            remarks: remarks || `Status updated from ${booking.status} to ${newStatus}`,
            updatedBy: 'Admin'
          };
          
          return {
            ...booking,
            status: newStatus,
            statusHistory: [...(booking.statusHistory || []), newHistory]
          };
        }
        return booking;
      })
    );
    showToast(`Booking ${bookingId} status updated to ${newStatus}!`, 'success');
  };

  const handleBulkUpdate = (bookingsToUpdate, newStatus, remarks) => {
    const bookingIds = Array.from(bookingsToUpdate);
    setBookings(prevBookings => 
      prevBookings.map(booking => {
        if (bookingIds.includes(booking.id)) {
          const newHistory = {
            status: newStatus,
            date: new Date().toISOString().split('T')[0],
            remarks: remarks || `Bulk status updated from ${booking.status} to ${newStatus}`,
            updatedBy: 'Admin (Bulk)'
          };
          
          return {
            ...booking,
            status: newStatus,
            statusHistory: [...(booking.statusHistory || []), newHistory]
          };
        }
        return booking;
      })
    );
    showToast(`Updated ${bookingIds.length} bookings to ${newStatus}!`, 'success');
    setSelectedBookings(new Set());
  };

  const toggleBulkSelection = (bookingId) => {
    setSelectedBookings(prev => {
      const newSet = new Set(prev);
      if (newSet.has(bookingId)) {
        newSet.delete(bookingId);
      } else {
        newSet.add(bookingId);
      }
      return newSet;
    });
  };

  const toggleSelectAll = () => {
    if (selectedBookings.size === filtered.length) {
      setSelectedBookings(new Set());
    } else {
      setSelectedBookings(new Set(filtered.map(b => b.id)));
    }
  };

  const statCards = [
    { label: 'Pending', value: statusCounts.Pending, icon: '⏳', color: 'border-amber-400', filter: 'Pending', bg: 'bg-amber-50' },
    { label: 'Confirmed', value: statusCounts.Confirmed, icon: '✅', color: 'border-green-400', filter: 'Confirmed', bg: 'bg-green-50' },
    { label: 'In Progress', value: statusCounts['In Progress'], icon: '🔄', color: 'border-purple-400', filter: 'In Progress', bg: 'bg-purple-50' },
    { label: 'Completed', value: statusCounts.Completed, icon: '🎉', color: 'border-emerald-400', filter: 'Completed', bg: 'bg-emerald-50' },
    { label: 'Cancelled', value: statusCounts.Cancelled, icon: '❌', color: 'border-red-400', filter: 'Cancelled', bg: 'bg-red-50' },
  ];

  const featureCards = [
    { emoji: '🔄', title: 'Workflow Automation', accentColor: 'bg-blue-50', points: ['Auto-update status based on events', 'Trigger notifications on change', 'SLA-based escalations', 'Status change history'] },
    { emoji: '📊', title: 'Status Analytics', accentColor: 'bg-green-50', points: ['View status distribution', 'Track conversion rates', 'Identify bottlenecks', 'Performance metrics'] },
    { emoji: '⚡', title: 'Bulk Operations', accentColor: 'bg-purple-50', points: ['Update multiple bookings', 'Batch status changes', 'Mass notifications', 'Efficient management'] },
    { emoji: '📝', title: 'Audit Trail', accentColor: 'bg-amber-50', points: ['Complete status history', 'User action tracking', 'Timestamp records', 'Change justification'] }
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
      {showStatusModal && (
        <UpdateStatusModal 
          booking={selectedBooking}
          onUpdate={handleUpdateStatus}
          onViewHistory={(booking) => {
            setShowStatusModal(false);
            setSelectedBooking(booking);
            setShowHistoryModal(true);
          }}
          onClose={() => {
            setShowStatusModal(false);
            setSelectedBooking(null);
          }}
        />
      )}

      {showHistoryModal && (
        <StatusHistoryModal 
          booking={selectedBooking}
          onClose={() => {
            setShowHistoryModal(false);
            setSelectedBooking(null);
          }}
        />
      )}

      {showBulkModal && (
        <BulkUpdateModal 
          selectedBookings={selectedBookings}
          selectedBookingsList={Array.from(selectedBookings)}
          onUpdate={handleBulkUpdate}
          onClose={() => {
            setShowBulkModal(false);
          }}
        />
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔄</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Booking Status Management</h3>
            <p className="text-sm text-gray-500 mt-0.5">Track and update booking status across the workflow pipeline</p>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} 
            onClick={() => setActiveFilter(s.filter)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-gray-800">{s.value}</p>
                {activeFilter === s.filter && (
                  <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>
                )}
              </div>
              <div className="text-3xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Status Timeline & Analytics */}
      <StatusTimeline bookings={bookings} />
      
      {/* Bookings Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.status} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Booking Status Management</h3>
                <p className="text-xs text-gray-400">
                  {filtered.length} booking{filtered.length !== 1 ? 's' : ''} 
                  {activeFilter !== 'All' ? ` — ${activeFilter}` : ' all statuses'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFilter !== 'All' && (
                <button 
                  onClick={() => setActiveFilter('All')} 
                  className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  ✕ Clear Filter
                </button>
              )}
              {selectedBookings.size > 0 && (
                <button 
                  onClick={() => setShowBulkModal(true)} 
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Icon d={ICONS.bulk} size={13} />
                  Update {selectedBookings.size} Selected
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon d={ICONS.search} size={15} />
              </span>
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                type="text" 
                placeholder="Search by booking ID, customer name, or service..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left w-10">
                  <input
                    type="checkbox"
                    checked={selectedBookings.size === filtered.length && filtered.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Booking ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Service</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Event Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Current Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Last Updated</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-400">
                    No bookings found for the selected filters.
                  </td>
                </tr>
              ) : (
                filtered.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedBookings.has(b.id)}
                        onChange={() => toggleBulkSelection(b.id)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                        disabled={b.status === 'Completed' || b.status === 'Cancelled'}
                      />
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{b.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-[10px] font-bold">
                          {b.customer.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{b.customer}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded-lg">{b.service}</span>
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold text-gray-700">{b.eventDate}</td>
                    <td className="px-4 py-3"><BookingBadge status={b.status} /></td>
                    <td className="px-4 py-3 text-xs text-gray-400">
                      {b.statusHistory?.[b.statusHistory.length - 1]?.date || b.bookingDate}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setSelectedBooking(b);
                            setShowStatusModal(true);
                          }}
                          className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg hover:bg-amber-100 transition-colors"
                        >
                          Update Status
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBooking(b);
                            setShowHistoryModal(true);
                          }}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
                          title="View History"
                        >
                          📜
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Summary Footer */}
        {selectedBookings.size > 0 && (
          <div className="px-5 py-3 bg-blue-50 border-t border-blue-100">
            <p className="text-sm text-blue-700">
              ✓ {selectedBookings.size} booking(s) selected for bulk update
            </p>
          </div>
        )}
      </div>
      
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
      `}</style>
    </div>
  );
};