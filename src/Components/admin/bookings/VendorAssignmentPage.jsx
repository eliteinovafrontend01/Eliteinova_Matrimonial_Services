// src/Components/admin/bookings/VendorAssignmentPage.jsx
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

// Available Vendors Data
const availableVendorsData = [
  { id: 1, name: 'ABC Events', category: 'Wedding', location: 'Mumbai', rating: 4.8, price: '₹50,000+', available: true, experience: '8 years', completedEvents: 245 },
  { id: 2, name: 'XYZ Decor', category: 'Decoration', location: 'Mumbai', rating: 4.6, price: '₹25,000+', available: true, experience: '6 years', completedEvents: 189 },
  { id: 3, name: 'Premier Catering', category: 'Catering', location: 'Pune', rating: 4.9, price: '₹75,000+', available: false, experience: '10 years', completedEvents: 312 },
  { id: 4, name: 'Elite Photography', category: 'Photography', location: 'Mumbai', rating: 4.7, price: '₹40,000+', available: true, experience: '7 years', completedEvents: 278 },
  { id: 5, name: 'Melody Music', category: 'Entertainment', location: 'Mumbai', rating: 4.5, price: '₹30,000+', available: true, experience: '5 years', completedEvents: 156 },
  { id: 6, name: 'Dream Planners', category: 'Planning', location: 'Pune', rating: 4.9, price: '₹60,000+', available: true, experience: '9 years', completedEvents: 298 },
  { id: 7, name: 'Royal Transport', category: 'Transport', location: 'Mumbai', rating: 4.4, price: '₹15,000+', available: true, experience: '4 years', completedEvents: 98 },
  { id: 8, name: 'Grand Venues', category: 'Venue', location: 'Pune', rating: 4.7, price: '₹1,00,000+', available: false, experience: '12 years', completedEvents: 423 },
];

// Assign Vendor Modal
const AssignVendorModal = ({ booking, vendors, filters, onFiltersChange, onAssign, onClose }) => {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [assignmentNotes, setAssignmentNotes] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const filteredVendors = vendors.filter(v => {
    if (filters.category && v.category !== filters.category) return false;
    if (filters.location && v.location !== filters.location) return false;
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      if (v.rating < minRating) return false;
    }
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    onAssign(booking.id, selectedVendor, assignmentNotes);
    onClose();
  };

  const categoryOptions = ['All', 'Wedding', 'Decoration', 'Catering', 'Photography', 'Entertainment', 'Planning', 'Transport', 'Venue'];
  const locationOptions = ['All', 'Mumbai', 'Pune', 'Delhi', 'Bangalore'];
  const ratingOptions = ['All', '4.0+', '4.5+', '4.8+'];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Assign Vendor</h3>
              <p className="text-xs text-gray-500 mt-1">Booking ID: {booking?.id}</p>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {/* Booking Details */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
            <p className="text-xs font-semibold text-gray-600 mb-3">Booking Details</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <span className="text-gray-500 text-xs">Customer</span>
                <p className="font-semibold text-gray-800">{booking?.customer}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Service</span>
                <p className="font-semibold text-gray-800">{booking?.service}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Event Date</span>
                <p className="font-semibold text-gray-800">{booking?.eventDate}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Location</span>
                <p className="font-semibold text-gray-800">Mumbai</p>
              </div>
            </div>
          </div>
          
          {/* Filters */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">Filter Vendors</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select 
                value={filters.category}
                onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat === 'All' ? '' : cat}>{cat}</option>
                ))}
              </select>
              <select 
                value={filters.location}
                onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                {locationOptions.map(loc => (
                  <option key={loc} value={loc === 'All' ? '' : loc}>{loc}</option>
                ))}
              </select>
              <select 
                value={filters.rating}
                onChange={(e) => onFiltersChange({ ...filters, rating: e.target.value })}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                {ratingOptions.map(r => (
                  <option key={r} value={r === 'All' ? '' : r.replace('+', '')}>{r}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Vendors List */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <p className="text-sm font-semibold text-gray-700">Available Vendors</p>
              <p className="text-xs text-gray-500">{filteredVendors.length} vendors found</p>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {filteredVendors.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-400">No vendors found with selected filters</p>
                </div>
              ) : (
                filteredVendors.map(vendor => (
                  <div 
                    key={vendor.id}
                    onClick={() => setSelectedVendor(vendor)}
                    className={`border rounded-xl p-4 cursor-pointer transition-all ${
                      selectedVendor?.id === vendor.id ? 'border-red-400 bg-red-50 shadow-md' : 'border-gray-100 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-gray-800">{vendor.name}</p>
                          {vendor.available && (
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Available</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{vendor.category} • {vendor.location}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <span className="text-amber-600">★ {vendor.rating}</span>
                          <span className="text-gray-500">{vendor.price}</span>
                          <span className="text-gray-500">{vendor.experience}</span>
                          <span className="text-gray-500">{vendor.completedEvents}+ events</span>
                        </div>
                      </div>
                      {selectedVendor?.id === vendor.id && (
                        <div className="text-red-500 text-xl">✓</div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Assignment Notes */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Assignment Notes (Optional)</label>
            <textarea
              value={assignmentNotes}
              onChange={(e) => setAssignmentNotes(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Add any notes about this vendor assignment..."
            />
          </div>
          
          {isConfirming && selectedVendor && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700 mb-4">
              ⚠️ Confirm assignment of <strong>{selectedVendor.name}</strong> to booking <strong>{booking?.id}</strong>
            </div>
          )}
          
          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              disabled={!selectedVendor}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                !selectedVendor ? 'bg-gray-300 cursor-not-allowed' :
                isConfirming ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {!selectedVendor ? 'Select a Vendor' : (isConfirming ? 'Confirm Assignment' : 'Assign Vendor')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Vendor Details Modal
const VendorDetailsModal = ({ vendor, onClose }) => {
  if (!vendor) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Vendor Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
              {vendor.name.charAt(0)}
            </div>
            <h4 className="text-xl font-bold text-gray-800">{vendor.name}</h4>
            <p className="text-sm text-gray-500">{vendor.category}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Location</span>
              <span className="text-sm font-semibold text-gray-700">{vendor.location}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Rating</span>
              <span className="text-sm font-semibold text-amber-600">★ {vendor.rating}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Price Range</span>
              <span className="text-sm font-semibold text-gray-700">{vendor.price}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Experience</span>
              <span className="text-sm font-semibold text-gray-700">{vendor.experience}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Events Completed</span>
              <span className="text-sm font-semibold text-gray-700">{vendor.completedEvents}+</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Status</span>
              <span className={`text-sm font-semibold ${vendor.available ? 'text-green-600' : 'text-red-600'}`}>
                {vendor.available ? 'Available' : 'Not Available'}
              </span>
            </div>
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

export const VendorAssignmentPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [filters, setFilters] = useState({ category: '', location: '', rating: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [vendors] = useState(availableVendorsData);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

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

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const pendingBookings = useMemo(() => {
    return bookings.filter(b => b.status === 'Pending' || b.status === 'Confirmed');
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    return pendingBookings.filter(b => {
      const matchSearch = !search || 
        b.id.toLowerCase().includes(search.toLowerCase()) || 
        b.customer.toLowerCase().includes(search.toLowerCase());
      return matchSearch;
    });
  }, [pendingBookings, search]);

  const handleAssignVendor = (bookingId, vendor, notes) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, vendor: vendor.name, vendorId: vendor.id, vendorAssignmentNotes: notes }
          : booking
      )
    );
    showToast(`Vendor ${vendor.name} assigned to booking ${bookingId}!`, 'success');
  };

  const handleReplaceVendor = (bookingId, vendor, notes) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId
          ? { 
              ...booking, 
              vendor: vendor.name, 
              vendorId: vendor.id, 
              vendorAssignmentNotes: notes,
              vendorReplacedAt: new Date().toISOString().split('T')[0]
            }
          : booking
      )
    );
    showToast(`Vendor replaced with ${vendor.name} for booking ${bookingId}!`, 'success');
  };

  const statCards = [
    { label: 'Pending Assignments', value: pendingBookings.filter(b => !b.vendor).length, icon: '⏳', color: 'border-amber-400', filter: 'Unassigned' },
    { label: 'Available Vendors', value: vendors.filter(v => v.available).length, icon: '👥', color: 'border-green-400', filter: null },
    { label: 'Total Assignments', value: bookings.filter(b => b.vendor).length, icon: '✅', color: 'border-blue-400', filter: 'Assigned' },
    { label: 'Vendor Capacity', value: `${Math.round((bookings.filter(b => b.vendor).length / (vendors.length * 5)) * 100)}%`, icon: '📊', color: 'border-purple-400', filter: null },
  ];

  const featureCards = [
    { emoji: '📍', title: 'Location-Based Matching', accentColor: 'bg-blue-50', points: ['Find vendors near event venue', 'Reduce travel costs', 'Local expertise advantage', 'Quick response times'] },
    { emoji: '⭐', title: 'Rating & Performance', accentColor: 'bg-amber-50', points: ['View vendor ratings', 'Check completion rate', 'Read customer reviews', 'Performance metrics'] },
    { emoji: '📅', title: 'Availability Check', accentColor: 'bg-green-50', points: ['Real-time availability', 'Calendar integration', 'Conflict prevention', 'Booking confirmation'] },
    { emoji: '🔄', title: 'Replacement Workflow', accentColor: 'bg-purple-50', points: ['Easy vendor replacement', 'Automatic notifications', 'Seamless transition', 'History preservation'] }
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
      {showAssignModal && (
        <AssignVendorModal 
          booking={selectedBooking}
          vendors={vendors}
          filters={filters}
          onFiltersChange={setFilters}
          onAssign={(bookingId, vendor, notes) => {
            if (selectedBooking?.vendor) {
              handleReplaceVendor(bookingId, vendor, notes);
            } else {
              handleAssignVendor(bookingId, vendor, notes);
            }
          }}
          onClose={() => {
            setShowAssignModal(false);
            setSelectedBooking(null);
            setFilters({ category: '', location: '', rating: '' });
          }}
        />
      )}

      {showVendorModal && (
        <VendorDetailsModal 
          vendor={selectedVendor}
          onClose={() => {
            setShowVendorModal(false);
            setSelectedVendor(null);
          }}
        />
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">👥</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Vendor Assignment</h3>
            <p className="text-sm text-gray-500 mt-0.5">Assign or change vendors based on availability, location, and service requirements</p>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div 
            key={i} 
            onClick={() => s.filter && setActiveFilter(s.filter)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} ${s.filter ? 'cursor-pointer' : 'cursor-default'} transition-all duration-200 hover:shadow-md ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-gray-800">{s.value}</p>
                {activeFilter === s.filter && s.filter && (
                  <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>
                )}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.vendor} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Bookings Requiring Vendor Assignment</h3>
                <p className="text-xs text-gray-400">
                  {filteredBookings.length} booking{filteredBookings.length !== 1 ? 's' : ''} 
                  {activeFilter !== 'All' ? ` — ${activeFilter}` : ' total'}
                </p>
              </div>
            </div>
            {activeFilter !== 'All' && (
              <button 
                onClick={() => setActiveFilter('All')} 
                className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                ✕ Clear Filter
              </button>
            )}
          </div>
          
          {/* Search */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon d={ICONS.search} size={15} />
              </span>
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                type="text" 
                placeholder="Search by booking ID or customer name..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
          </div>
        </div>
        
        {/* Bookings Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Booking ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Customer</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Service</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Location</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Event Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Current Vendor</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-400">
                    No bookings found for the selected filters.
                   </td>
                 </tr>
              ) : (
                filteredBookings.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
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
                    <td className="px-4 py-3 text-xs text-gray-600">Mumbai</td>
                    <td className="px-4 py-3 text-xs font-semibold text-gray-700">{b.eventDate}</td>
                    <td className="px-4 py-3">
                      {b.vendor ? (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-green-600 font-semibold">{b.vendor}</span>
                          <button
                            onClick={() => {
                              const vendor = vendors.find(v => v.name === b.vendor);
                              if (vendor) {
                                setSelectedVendor(vendor);
                                setShowVendorModal(true);
                              }
                            }}
                            className="text-blue-500 hover:text-blue-700 text-xs"
                            title="View Vendor Details"
                          >
                            ℹ️
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-amber-600 font-semibold">Not Assigned</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <BookingBadge status={b.status} />
                    </td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => {
                          setSelectedBooking(b);
                          setShowAssignModal(true);
                        }}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                          b.vendor 
                            ? 'bg-amber-50 text-amber-700 hover:bg-amber-100' 
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        {b.vendor ? 'Replace Vendor' : 'Assign Vendor'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Summary */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">
              Unassigned: {pendingBookings.filter(b => !b.vendor).length} | 
              Assigned: {pendingBookings.filter(b => b.vendor).length}
            </span>
            <span className="text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
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