// src/Components/admin/bookings/BookingSearchPage.jsx
import { useState, useEffect } from 'react';
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

// Saved Filters Modal
const SavedFiltersModal = ({ savedFilters, onLoadFilter, onDeleteFilter, onSaveFilter, onClose }) => {
  const [filterName, setFilterName] = useState('');
  const [showSaveForm, setShowSaveForm] = useState(false);

  const handleSaveFilter = () => {
    if (filterName.trim()) {
      onSaveFilter(filterName);
      setFilterName('');
      setShowSaveForm(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Saved Filters</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {savedFilters.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-3">💾</div>
              <p className="text-sm text-gray-500">No saved filters yet</p>
              <p className="text-xs text-gray-400 mt-1">Save your search criteria for quick access</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {savedFilters.map((filter, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-semibold text-sm text-gray-800">{filter.name}</p>
                    <p className="text-xs text-gray-400">Saved on {filter.date}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => onLoadFilter(filter)}
                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100 transition-colors"
                    >
                      Load
                    </button>
                    <button
                      onClick={() => onDeleteFilter(idx)}
                      className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded hover:bg-red-100 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!showSaveForm ? (
            <button
              onClick={() => setShowSaveForm(true)}
              className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              + Save Current Filter
            </button>
          ) : (
            <div className="mt-4 space-y-3">
              <input
                type="text"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="Enter filter name..."
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSaveForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveFilter}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Export Modal
const ExportModal = ({ results, onExport, onClose }) => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [includeColumns, setIncludeColumns] = useState({
    id: true,
    customer: true,
    service: true,
    vendor: true,
    eventDate: true,
    status: true,
    paymentStatus: true,
    amount: true,
    bookingDate: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onExport(results, exportFormat, includeColumns);
    onClose();
  };

  const columns = [
    { key: 'id', label: 'Booking ID' },
    { key: 'customer', label: 'Customer Name' },
    { key: 'service', label: 'Service Type' },
    { key: 'vendor', label: 'Vendor' },
    { key: 'eventDate', label: 'Event Date' },
    { key: 'status', label: 'Status' },
    { key: 'paymentStatus', label: 'Payment Status' },
    { key: 'amount', label: 'Amount' },
    { key: 'bookingDate', label: 'Booking Date' }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Export Results</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Export Format</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="csv"
                  checked={exportFormat === 'csv'}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="text-red-600"
                />
                <span className="text-sm">CSV</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="excel"
                  checked={exportFormat === 'excel'}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="text-red-600"
                />
                <span className="text-sm">Excel</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="pdf"
                  checked={exportFormat === 'pdf'}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="text-red-600"
                />
                <span className="text-sm">PDF</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Include Columns</label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {columns.map(col => (
                <label key={col.key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeColumns[col.key]}
                    onChange={(e) => setIncludeColumns({ ...includeColumns, [col.key]: e.target.checked })}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <span className="text-sm text-gray-700">{col.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
            📊 Exporting {results.length} record(s)
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
              Export
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Booking Details Modal
const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Booking Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-base font-bold">
              {booking.customer.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="font-semibold text-gray-800">{booking.customer}</p>
              <p className="text-xs text-gray-400">Booking ID: {booking.id}</p>
            </div>
            <div className="ml-auto">
              <BookingBadge status={booking.status} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Service Type</label>
              <p className="text-sm font-semibold text-gray-800">{booking.service}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Vendor</label>
              <p className="text-sm text-gray-800">{booking.vendor}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Event Date</label>
              <p className="text-sm font-semibold text-gray-800">{booking.eventDate}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Booking Date</label>
              <p className="text-sm text-gray-800">{booking.bookingDate}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Payment Status</label>
              <PaymentBadge status={booking.paymentStatus || 'Pending'} />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Amount</label>
              <p className="text-sm font-semibold text-gray-800">{booking.amount || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const BookingSearchPage = () => {
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    bookingId: '',
    customerName: '',
    vendor: '',
    serviceCategory: '',
    status: '',
    paymentStatus: ''
  });
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [showSavedFilters, setShowSavedFilters] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [savedFilters, setSavedFilters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Load saved filters from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bookingSearchFilters');
    if (saved) {
      setSavedFilters(JSON.parse(saved));
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      let filtered = [...allBookingsData];
      
      // Filter by date range
      if (filters.dateRange.start && filters.dateRange.end) {
        const startDate = new Date(filters.dateRange.start);
        const endDate = new Date(filters.dateRange.end);
        filtered = filtered.filter(b => {
          const bookingDate = new Date(b.bookingDate);
          return bookingDate >= startDate && bookingDate <= endDate;
        });
      }
      
      // Filter by booking ID
      if (filters.bookingId) {
        filtered = filtered.filter(b => 
          b.id.toLowerCase().includes(filters.bookingId.toLowerCase())
        );
      }
      
      // Filter by customer name
      if (filters.customerName) {
        filtered = filtered.filter(b => 
          b.customer.toLowerCase().includes(filters.customerName.toLowerCase())
        );
      }
      
      // Filter by vendor
      if (filters.vendor) {
        filtered = filtered.filter(b => 
          b.vendor.toLowerCase().includes(filters.vendor.toLowerCase())
        );
      }
      
      // Filter by service category
      if (filters.serviceCategory) {
        filtered = filtered.filter(b => 
          b.service === filters.serviceCategory
        );
      }
      
      // Filter by status
      if (filters.status) {
        filtered = filtered.filter(b => 
          b.status === filters.status
        );
      }
      
      // Filter by payment status
      if (filters.paymentStatus) {
        filtered = filtered.filter(b => 
          (b.paymentStatus || 'Pending') === filters.paymentStatus
        );
      }
      
      setResults(filtered);
      setSearched(true);
      setIsLoading(false);
      showToast(`Found ${filtered.length} booking(s) matching your criteria`, 'success');
    }, 500);
  };
  
  const handleClear = () => {
    setFilters({
      dateRange: { start: '', end: '' },
      bookingId: '',
      customerName: '',
      vendor: '',
      serviceCategory: '',
      status: '',
      paymentStatus: ''
    });
    setResults([]);
    setSearched(false);
    showToast('All filters cleared', 'success');
  };
  
  const handleSaveFilter = (filterName) => {
    const newFilter = {
      name: filterName,
      filters: { ...filters },
      date: new Date().toISOString().split('T')[0]
    };
    const updatedFilters = [...savedFilters, newFilter];
    setSavedFilters(updatedFilters);
    localStorage.setItem('bookingSearchFilters', JSON.stringify(updatedFilters));
    showToast(`Filter "${filterName}" saved successfully!`, 'success');
  };
  
  const handleLoadFilter = (filter) => {
    setFilters(filter.filters);
    showToast(`Loaded filter: ${filter.name}`, 'success');
    setShowSavedFilters(false);
  };
  
  const handleDeleteFilter = (index) => {
    const updatedFilters = savedFilters.filter((_, i) => i !== index);
    setSavedFilters(updatedFilters);
    localStorage.setItem('bookingSearchFilters', JSON.stringify(updatedFilters));
    showToast('Filter deleted successfully!', 'success');
  };
  
  const handleExport = (results, format, columns) => {
    if (format === 'csv') {
      const selectedColumns = Object.keys(columns).filter(key => columns[key]);
      const exportData = results.map(booking => {
        const row = {};
        selectedColumns.forEach(col => {
          if (col === 'paymentStatus') {
            row[col] = booking.paymentStatus || 'Pending';
          } else if (col === 'amount') {
            row[col] = booking.amount || 'N/A';
          } else {
            row[col] = booking[col];
          }
        });
        return row;
      });
      
      const headers = selectedColumns.map(col => {
        const labels = {
          id: 'Booking ID',
          customer: 'Customer Name',
          service: 'Service Type',
          vendor: 'Vendor',
          eventDate: 'Event Date',
          status: 'Status',
          paymentStatus: 'Payment Status',
          amount: 'Amount',
          bookingDate: 'Booking Date'
        };
        return labels[col];
      });
      
      const csvRows = [
        headers.join(','),
        ...exportData.map(row => 
          selectedColumns.map(col => `"${(row[col] || '').toString().replace(/"/g, '""')}"`).join(',')
        )
      ];
      
      const csvString = csvRows.join('\n');
      const blob = new Blob([csvString], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `booking_search_results_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast(`Exported ${results.length} records successfully!`, 'success');
    } else {
      showToast(`${format.toUpperCase()} export will be available soon!`, 'info');
    }
  };
  
  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const serviceOptions = ['All Categories', 'Wedding', 'Birthday', 'Corporate Event', 'Anniversary', 'Baby Shower', 'Other'];
  const statusOptions = ['All Status', 'Pending', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'];
  const paymentOptions = ['All Payment Status', 'Pending', 'Partial', 'Completed', 'Refunded'];

  const featureCards = [
    { emoji: '🔍', title: 'Advanced Search Engine', accentColor: 'bg-blue-50', points: ['Full-text search', 'Fuzzy matching', 'Auto-suggestions', 'Search history'] },
    { emoji: '💾', title: 'Saved Filters', accentColor: 'bg-green-50', points: ['Save search criteria', 'Quick reload', 'Share with team', 'Scheduled reports'] },
    { emoji: '📊', title: 'Export Capabilities', accentColor: 'bg-purple-50', points: ['CSV/Excel export', 'PDF reports', 'Custom columns', 'Batch export'] },
    { emoji: '🎯', title: 'Smart Suggestions', accentColor: 'bg-amber-50', points: ['Recent searches', 'Popular filters', 'Intelligent defaults', 'Pattern recognition'] }
  ];

  return (
    <div>
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 
            toast.type === 'info' ? 'bg-blue-500' : 'bg-orange-500'
          } text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Modals */}
      {showSavedFilters && (
        <SavedFiltersModal 
          savedFilters={savedFilters}
          onSaveFilter={handleSaveFilter}
          onLoadFilter={handleLoadFilter}
          onDeleteFilter={handleDeleteFilter}
          onClose={() => setShowSavedFilters(false)}
        />
      )}

      {showExportModal && (
        <ExportModal 
          results={results}
          onExport={handleExport}
          onClose={() => setShowExportModal(false)}
        />
      )}

      {showDetailsModal && selectedBooking && (
        <BookingDetailsModal 
          booking={selectedBooking}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedBooking(null);
          }}
        />
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Search & Filters</h3>
            <p className="text-sm text-gray-500 mt-0.5">Easily find bookings using advanced filters and search criteria</p>
          </div>
        </div>
      </div>
      
      {/* Search Filters Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.search} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Search Filters</h3>
                <p className="text-xs text-gray-400">Narrow down bookings with specific criteria</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowSavedFilters(true)} 
                className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                💾 Saved Filters
              </button>
              <button 
                onClick={handleClear} 
                className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Date Range</label>
              <div className="flex gap-2">
                <input 
                  type="date" 
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300" 
                  value={filters.dateRange.start}
                  onChange={e => setFilters({...filters, dateRange: {...filters.dateRange, start: e.target.value}})} 
                />
                <input 
                  type="date" 
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                  value={filters.dateRange.end}
                  onChange={e => setFilters({...filters, dateRange: {...filters.dateRange, end: e.target.value}})} 
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Booking ID</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300" 
                placeholder="Enter booking ID"
                value={filters.bookingId} 
                onChange={e => setFilters({...filters, bookingId: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Customer Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300" 
                placeholder="Enter customer name"
                value={filters.customerName} 
                onChange={e => setFilters({...filters, customerName: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Vendor</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300" 
                placeholder="Enter vendor name"
                value={filters.vendor} 
                onChange={e => setFilters({...filters, vendor: e.target.value})} 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Service Category</label>
              <select 
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                value={filters.serviceCategory}
                onChange={e => setFilters({...filters, serviceCategory: e.target.value})}
              >
                {serviceOptions.map(option => (
                  <option key={option} value={option === 'All Categories' ? '' : option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
              <select 
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                value={filters.status}
                onChange={e => setFilters({...filters, status: e.target.value})}
              >
                {statusOptions.map(option => (
                  <option key={option} value={option === 'All Status' ? '' : option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Payment Status</label>
              <select 
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                value={filters.paymentStatus}
                onChange={e => setFilters({...filters, paymentStatus: e.target.value})}
              >
                {paymentOptions.map(option => (
                  <option key={option} value={option === 'All Payment Status' ? '' : option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
            <button 
              onClick={handleClear} 
              className="px-4 py-2 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
            <button 
              onClick={handleSearch} 
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Icon d={ICONS.search} size={16} /> Search Bookings
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Search Results */}
      {searched && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h3 className="font-bold text-gray-800 text-base">Search Results</h3>
              <p className="text-xs text-gray-400">{results.length} booking{results.length !== 1 ? 's' : ''} found</p>
            </div>
            {results.length > 0 && (
              <button 
                onClick={() => setShowExportModal(true)}
                className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1"
              >
                <Icon d={ICONS.download} size={13} /> Export Results
              </button>
            )}
          </div>
          
          {isLoading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
              <p className="text-sm text-gray-400 mt-2">Searching...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-3">🔍</div>
              <p className="text-sm text-gray-500">No bookings found matching your criteria</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or clear all filters</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Booking ID</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Customer</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Service</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Vendor</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Event Date</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Payment</th>
                    <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {results.map(b => (
                    <tr key={b.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
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
                      <td className="px-4 py-3 text-xs text-gray-600">{b.vendor}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-700">{b.eventDate}</td>
                      <td className="px-4 py-3"><BookingBadge status={b.status} /></td>
                      <td className="px-4 py-3"><PaymentBadge status={b.paymentStatus || 'Pending'} /></td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => handleViewBooking(b)}
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
          
          {/* Results Summary */}
          {results.length > 0 && (
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">
                  Showing {results.length} of {results.length} results
                </span>
                <span className="text-gray-400">
                  Last searched: {new Date().toLocaleString()}
                </span>
              </div>
            </div>
          )}
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
      `}</style>
    </div>
  );
};