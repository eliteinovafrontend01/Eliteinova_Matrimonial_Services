import { useState, useMemo } from 'react';
import { Icon } from '../shared/Icon';
import { BookingBadge } from '../shared/BookingBadge';
import { PaymentBadge } from '../shared/PaymentBadge';
import { FeatureCard } from '../shared/FeatureCard';
import { allBookingsData } from '../../../data/admin/bookings';
import { ICONS } from '../../../constants/admin/icons';

export const TrackBookingHistory = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [bookings, setBookings] = useState(allBookingsData);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Calculate real-time stats
  const stats = useMemo(() => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'Pending').length;
    const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
    const inProgress = bookings.filter(b => b.status === 'In Progress').length;
    const completed = bookings.filter(b => b.status === 'Completed').length;
    const cancelled = bookings.filter(b => b.status === 'Cancelled').length;
    return { total, pending, confirmed, inProgress, completed, cancelled };
  }, [bookings]);

  const statCards = [
    { label: 'Total Bookings', value: stats.total.toLocaleString(), icon: '📋', color: 'border-blue-400', filter: 'All' },
    { label: 'Pending', value: stats.pending.toLocaleString(), icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Confirmed', value: stats.confirmed.toLocaleString(), icon: '✅', color: 'border-green-400', filter: 'Confirmed' },
    { label: 'In Progress', value: stats.inProgress.toLocaleString(), icon: '🔄', color: 'border-purple-400', filter: 'In Progress' },
    { label: 'Cancelled', value: stats.cancelled.toLocaleString(), icon: '❌', color: 'border-red-400', filter: 'Cancelled' },
  ];

  // Filter bookings based on status and search
  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchStatus = activeFilter === 'All' || b.status === activeFilter;
      const matchSearch = !search || 
        b.customer.toLowerCase().includes(search.toLowerCase()) || 
        b.vendor.toLowerCase().includes(search.toLowerCase()) || 
        b.service.toLowerCase().includes(search.toLowerCase()) ||
        b.id.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [bookings, activeFilter, search]);

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export to CSV
  const handleExportCSV = () => {
    try {
      const exportData = filteredBookings.map(b => ({
        'Booking ID': b.id,
        'Customer': b.customer,
        'Service': b.service,
        'Vendor': b.vendor,
        'Booking Date': b.bookingDate,
        'Event Date': b.eventDate,
        'Status': b.status,
        'Payment': b.payment,
        'Amount': b.amount
      }));

      const headers = Object.keys(exportData[0]);
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

      showToastMsg(`Successfully exported ${filteredBookings.length} bookings!`, 'success');
    } catch (err) {
      showToastMsg('Error exporting data', 'error');
    }
  };

  // View booking details
  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowViewModal(true);
  };

  // Edit booking
  const handleEditBooking = (booking) => {
    setEditingBooking({ ...booking });
    setShowEditModal(true);
  };

  // Save edited booking
  const handleSaveEdit = () => {
    if (editingBooking) {
      setBookings(prev => prev.map(b => 
        b.id === editingBooking.id ? editingBooking : b
      ));
      setShowEditModal(false);
      setEditingBooking(null);
      showToastMsg(`Booking ${editingBooking.id} updated successfully!`, 'success');
    }
  };

  // Change booking status
  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(prev => prev.map(b => 
      b.id === bookingId ? { ...b, status: newStatus } : b
    ));
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
      showToastMsg(`Booking ${booking.id} status changed to ${newStatus}`, 'success');
    }
  };

  const featureCards = [
    { emoji: '📍', title: 'Vendor Assignment Tracking', accentColor: 'bg-amber-50', points: ['See assigned vendor per booking', 'Track performance & delivery', 'Rate vendor post-completion', 'Switch vendor if needed'] },
    { emoji: '💳', title: 'Payment & Transaction Info', accentColor: 'bg-green-50', points: ['Check paid/partial/pending status', 'View full transaction details', 'Track refund processing', 'Invoice access per booking'] },
    { emoji: '🔄', title: 'Cancellation & Reschedule', accentColor: 'bg-red-50', points: ['Handle cancellation requests', 'Process reschedule requests', 'Manage refund workflows', 'Update booking records'] },
    { emoji: '📅', title: 'Booking Timeline', accentColor: 'bg-blue-50', points: ['View creation timestamp', 'Track updates & changes', 'Confirmation milestones', 'Completion sign-off log'] }
  ];

  // Reset to first page when filter or search changes
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="p-4 md:p-6">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 
            toast.type === 'error' ? 'bg-red-500' : 
            'bg-orange-500'
          } text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* View Booking Modal */}
      {showViewModal && selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowViewModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Booking Details</h3>
                <p className="text-sm text-gray-500">Complete booking information</p>
              </div>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{selectedBooking.id}</h4>
                  <p className="text-sm text-gray-500">Booking ID</p>
                </div>
                <BookingBadge status={selectedBooking.status} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Customer</p>
                  <p className="text-sm font-medium text-gray-700">{selectedBooking.customer}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Service</p>
                  <p className="text-sm font-medium text-gray-700">{selectedBooking.service}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Vendor</p>
                  <p className="text-sm font-medium text-gray-700">{selectedBooking.vendor}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Payment Status</p>
                  <PaymentBadge status={selectedBooking.payment} />
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Booking Date</p>
                  <p className="text-sm font-medium text-gray-700">{selectedBooking.bookingDate}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Event Date</p>
                  <p className="text-sm font-medium text-gray-700">{selectedBooking.eventDate}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Amount</p>
                  <p className="text-sm font-bold text-gray-800">{selectedBooking.amount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Booking Modal */}
      {showEditModal && editingBooking && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Edit Booking</h3>
              <p className="text-sm text-gray-500">Update booking information</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={editingBooking.customer}
                  onChange={(e) => setEditingBooking({...editingBooking, customer: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Service</label>
                <input
                  type="text"
                  value={editingBooking.service}
                  onChange={(e) => setEditingBooking({...editingBooking, service: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Vendor</label>
                <input
                  type="text"
                  value={editingBooking.vendor}
                  onChange={(e) => setEditingBooking({...editingBooking, vendor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Event Date</label>
                <input
                  type="date"
                  value={editingBooking.eventDate}
                  onChange={(e) => setEditingBooking({...editingBooking, eventDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={editingBooking.status}
                  onChange={(e) => setEditingBooking({...editingBooking, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Status</label>
                <select
                  value={editingBooking.payment}
                  onChange={(e) => setEditingBooking({...editingBooking, payment: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option value="Pending">Pending</option>
                  <option value="Partial">Partial</option>
                  <option value="Completed">Completed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowEditModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleSaveEdit} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📅</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Track Booking History</h3>
            <p className="text-sm text-gray-500 mt-0.5">View and manage all bookings with complete history, vendor assignment, and payment status</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} onClick={() => handleFilterChange(s.filter)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-gray-800">{s.value}</p>
                {activeFilter === s.filter && <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>}
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
                <h3 className="font-bold text-gray-800 text-base">Complete Booking Overview</h3>
                <p className="text-xs text-gray-400">{filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `— ${activeFilter}` : 'across all services'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFilter !== 'All' && (
                <button onClick={() => handleFilterChange('All')} 
                  className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  ✕ Clear Filter
                </button>
              )}
              <button onClick={handleExportCSV} 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors">
                <Icon d={ICONS.download} size={13} />Export
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative min-w-48">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon d={ICONS.search} size={15} />
              </span>
              <input 
                value={search} 
                onChange={handleSearchChange} 
                type="text" 
                placeholder="Search by customer, vendor, service or booking ID..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
              {['All','Pending','Confirmed','In Progress','Completed','Cancelled'].map(f => (
                <button key={f} onClick={() => handleFilterChange(f)} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Booking ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Customer</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Service</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Vendor Assigned</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Booking Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Event Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Payment</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Amount</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-sm text-gray-400">
                    No bookings found for "{activeFilter}" filter.
                  </td>
                </tr>
              ) : (
                paginatedBookings.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">{b.id}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">{b.customer}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded-lg">{b.service}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{b.vendor}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{b.bookingDate}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">{b.eventDate}</td>
                    <td className="px-4 py-3"><BookingBadge status={b.status} /></td>
                    <td className="px-4 py-3"><PaymentBadge status={b.payment} /></td>
                    <td className="px-4 py-3 text-xs font-bold text-gray-800 whitespace-nowrap">{b.amount}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => handleViewBooking(b)} 
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View Details">
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        <button onClick={() => handleEditBooking(b)} 
                          className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"
                          title="Edit Booking">
                          <Icon d={ICONS.edit} size={14} />
                        </button>
                        <select
                          value={b.status}
                          onChange={(e) => handleStatusChange(b.id, e.target.value)}
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-300 cursor-pointer"
                          title="Change Status">
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredBookings.length > 0 && totalPages > 1 && (
          <div className="px-5 py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredBookings.length)} of {filteredBookings.length} bookings
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`w-7 h-7 text-xs rounded-lg font-semibold transition-colors ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                ←
              </button>
              
              {getPageNumbers().map((page, idx) => (
                <button
                  key={idx}
                  onClick={() => typeof page === 'number' && setCurrentPage(page)}
                  disabled={page === '...'}
                  className={`w-7 h-7 text-xs rounded-lg font-semibold transition-colors ${
                    currentPage === page ? 'bg-red-600 text-white' : 
                    page === '...' ? 'cursor-default text-gray-400' : 'text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className={`w-7 h-7 text-xs rounded-lg font-semibold transition-colors ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slideIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};