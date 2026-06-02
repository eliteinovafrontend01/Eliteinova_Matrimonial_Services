// src/Components/admin/bookings/SchedulingCalendarPage.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { FeatureCard } from '../shared/FeatureCard';
import { BookingBadge } from '../shared/BookingBadge';
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

// Event Details Modal
const EventDetailsModal = ({ event, onClose, onReschedule }) => {
  if (!event) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Event Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl mb-3">
              {event.type === 'Wedding' ? '💒' : 
               event.type === 'Birthday' ? '🎂' : 
               event.type === 'Corporate' ? '🏢' : 
               event.type === 'Anniversary' ? '💕' : '🎉'}
            </div>
            <h4 className="text-lg font-bold text-gray-800">{event.title}</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Date</span>
              <span className="text-sm font-semibold text-gray-700">{event.date}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Time</span>
              <span className="text-sm font-semibold text-gray-700">{event.time}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Vendor</span>
              <span className="text-sm font-semibold text-gray-700">{event.vendor}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Customer</span>
              <span className="text-sm font-semibold text-gray-700">{event.customer || 'N/A'}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Status</span>
              <BookingBadge status={event.status || 'Confirmed'} />
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Amount</span>
              <span className="text-sm font-semibold text-gray-700">{event.amount || '₹15,000'}</span>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => {
                onClose();
                onReschedule(event);
              }}
              className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Reschedule
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Block Vendor Dates Modal
const BlockVendorModal = ({ vendors, existingBlocks, onBlock, onClose }) => {
  const [selectedVendor, setSelectedVendor] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    onBlock(selectedVendor, startDate, endDate, reason);
    onClose();
  };

  const selectedVendorObj = vendors.find(v => v.name === selectedVendor);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Block Vendor Dates</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Vendor</label>
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            >
              <option value="">Choose a vendor...</option>
              {vendors.map(vendor => (
                <option key={vendor.name} value={vendor.name}>{vendor.name} - {vendor.category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date Range</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                  required
                />
              </div>
              <div>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                  required
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="e.g., Vacation, Holiday, Maintenance, etc."
              required
            />
          </div>
          
          {selectedVendorObj && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-700">
              📍 {selectedVendorObj.location} • ⭐ {selectedVendorObj.rating} • {selectedVendorObj.experience}
            </div>
          )}
          
          {isConfirming && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              ⚠️ Confirm blocking {selectedVendor} from {startDate} to {endDate}
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
              disabled={!selectedVendor || !startDate || !endDate}
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                !selectedVendor || !startDate || !endDate ? 'bg-gray-300 cursor-not-allowed' :
                isConfirming ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isConfirming ? 'Confirm Block' : 'Block Dates'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reschedule Event Modal
const RescheduleModal = ({ event, onReschedule, onClose }) => {
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [reason, setReason] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    onReschedule(event.id, newDate, newTime, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Reschedule Event</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-500 mb-1">Current Event</p>
            <p className="text-sm font-semibold">{event.title}</p>
            <p className="text-xs text-gray-500">{event.date} at {event.time}</p>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Time</label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Reschedule</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="2"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Reason for rescheduling..."
              required
            />
          </div>
          
          {isConfirming && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
              ⚠️ Confirm rescheduling this event to {newDate} at {newTime}
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
              {isConfirming ? 'Confirm Reschedule' : 'Reschedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Vendor Availability View Modal
const VendorAvailabilityModal = ({ vendors, blocks, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Vendor Availability</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {vendors.map(vendor => {
              const vendorBlocks = blocks.filter(b => b.vendor === vendor.name);
              return (
                <div key={vendor.name} className="border border-gray-100 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{vendor.name}</h4>
                      <p className="text-xs text-gray-500">{vendor.category} • {vendor.location}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${vendor.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {vendor.available ? 'Available' : 'Busy'}
                    </span>
                  </div>
                  
                  {vendorBlocks.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-gray-600 mb-2">Blocked Dates:</p>
                      <div className="space-y-1">
                        {vendorBlocks.map((block, idx) => (
                          <div key={idx} className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                            {block.startDate} to {block.endDate} - {block.reason}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-gray-400">⭐ {vendor.rating} • {vendor.experience} • {vendor.completedEvents}+ events</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SchedulingCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [events, setEvents] = useState({});
  const [vendorBlocks, setVendorBlocks] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Vendors data
  const vendors = [
    { name: 'Sarah Photography', category: 'Photography', location: 'Mumbai', rating: 4.8, experience: '8 years', completedEvents: 245, available: true },
    { name: 'Event Masters', category: 'Planning', location: 'Mumbai', rating: 4.9, experience: '10 years', completedEvents: 312, available: true },
    { name: 'Corporate Solutions', category: 'Corporate Events', location: 'Pune', rating: 4.7, experience: '7 years', completedEvents: 189, available: true },
    { name: 'Grand Decor', category: 'Decoration', location: 'Mumbai', rating: 4.6, experience: '6 years', completedEvents: 156, available: true },
    { name: 'Melody Music', category: 'Entertainment', location: 'Mumbai', rating: 4.5, experience: '5 years', completedEvents: 98, available: true },
    { name: 'Royal Catering', category: 'Catering', location: 'Pune', rating: 4.8, experience: '9 years', completedEvents: 278, available: true },
  ];

  // Generate dynamic events for the current month
  const generateEventsForMonth = (year, month) => {
    const eventsMap = {};
    const eventTypes = [
      { title: 'Wedding Ceremony', type: 'Wedding', vendor: 'Sarah Photography', time: '10:00 AM', status: 'Confirmed', amount: '₹85,000' },
      { title: 'Birthday Party', type: 'Birthday', vendor: 'Grand Decor', time: '6:00 PM', status: 'Confirmed', amount: '₹25,000' },
      { title: 'Corporate Conference', type: 'Corporate', vendor: 'Corporate Solutions', time: '9:00 AM', status: 'Confirmed', amount: '₹1,50,000' },
      { title: 'Anniversary Celebration', type: 'Anniversary', vendor: 'Melody Music', time: '7:00 PM', status: 'Pending', amount: '₹40,000' },
      { title: 'Baby Shower', type: 'Birthday', vendor: 'Royal Catering', time: '2:00 PM', status: 'Confirmed', amount: '₹35,000' },
      { title: 'Engagement Party', type: 'Wedding', vendor: 'Event Masters', time: '5:00 PM', status: 'Confirmed', amount: '₹65,000' },
      { title: 'Product Launch', type: 'Corporate', vendor: 'Corporate Solutions', time: '11:00 AM', status: 'Pending', amount: '₹2,00,000' },
      { title: 'Wedding Reception', type: 'Wedding', vendor: 'Sarah Photography', time: '8:00 PM', status: 'Confirmed', amount: '₹95,000' },
      { title: 'Housewarming', type: 'Other', vendor: 'Grand Decor', time: '12:00 PM', status: 'Confirmed', amount: '₹30,000' },
    ];

    // Get random dates in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const usedDates = new Set();

    eventTypes.forEach((event, index) => {
      let day;
      do {
        day = Math.floor(Math.random() * daysInMonth) + 1;
      } while (usedDates.has(day) && usedDates.size < daysInMonth);
      usedDates.add(day);
      
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      const customerNames = ['John & Jane Doe', 'Mike Smith', 'Robert & Lisa', 'Emma Wilson', 'David Brown', 'Sarah Johnson', 'Chris Evans', 'Priya Sharma'];
      
      if (!eventsMap[dateStr]) {
        eventsMap[dateStr] = [];
      }
      
      eventsMap[dateStr].push({
        id: index + 1,
        ...event,
        date: dateStr,
        customer: customerNames[index % customerNames.length],
        day: day
      });
    });

    return eventsMap;
  };

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();
        const generatedEvents = generateEventsForMonth(currentYear, currentMonth);
        setEvents(generatedEvents);
      } catch (err) {
        setError('Failed to load calendar data');
      } finally {
        setIsLoading(false);
      }
    };
    loadEvents();
  }, [currentDate]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
    
    // Add days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) days.push(new Date(year, month, i));
    
    return days;
  };

  const getWeekDays = (date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day;
    const weekDays = [];
    
    for (let i = 0; i < 7; i++) {
      const newDate = new Date(start);
      newDate.setDate(diff + i);
      weekDays.push(newDate);
    }
    
    return weekDays;
  };

  const getDayEvents = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events[dateStr] || [];
  };

  const handleBlockVendor = (vendor, startDate, endDate, reason) => {
    setVendorBlocks([...vendorBlocks, { vendor, startDate, endDate, reason }]);
    showToast(`Vendor ${vendor} blocked from ${startDate} to ${endDate}`, 'success');
  };

  const handleRescheduleEvent = (eventId, newDate, newTime, reason) => {
    let updatedEvents = { ...events };
    let foundEvent = null;
    
    for (let date in updatedEvents) {
      const eventIndex = updatedEvents[date].findIndex(e => e.id === eventId);
      if (eventIndex !== -1) {
        foundEvent = updatedEvents[date][eventIndex];
        updatedEvents[date].splice(eventIndex, 1);
        break;
      }
    }
    
    if (foundEvent) {
      if (!updatedEvents[newDate]) {
        updatedEvents[newDate] = [];
      }
      updatedEvents[newDate].push({ 
        ...foundEvent, 
        date: newDate, 
        time: newTime, 
        rescheduled: true, 
        rescheduleReason: reason 
      });
    }
    
    setEvents(updatedEvents);
    showToast(`Event rescheduled to ${newDate} at ${newTime}`, 'success');
  };

  const changeMonth = (increment) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + increment);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getEventColor = (event) => {
    if (event.status === 'Pending') return 'bg-amber-50 text-amber-700 border-amber-200';
    if (event.type === 'Wedding') return 'bg-pink-50 text-pink-700 border-pink-200';
    if (event.type === 'Corporate') return 'bg-blue-50 text-blue-700 border-blue-200';
    if (event.type === 'Birthday') return 'bg-green-50 text-green-700 border-green-200';
    return 'bg-purple-50 text-purple-700 border-purple-200';
  };

  const statCards = [
    { label: 'Total Events', value: Object.values(events).flat().length, icon: '📅', color: 'border-blue-400' },
    { label: "Today's Events", value: getDayEvents(new Date()).length, icon: '⭐', color: 'border-green-400' },
    { label: 'Pending Events', value: Object.values(events).flat().filter(e => e.status === 'Pending').length, icon: '⏳', color: 'border-amber-400' },
    { label: 'Vendors Available', value: vendors.filter(v => v.available).length, icon: '👥', color: 'border-purple-400' },
  ];

  const featureCards = [
    { emoji: '📅', title: 'Drag & Drop Scheduling', accentColor: 'bg-blue-50', points: ['Easy date rescheduling', 'Visual calendar interface', 'Conflict detection', 'Instant updates'] },
    { emoji: '🚫', title: 'Block Vendor Dates', accentColor: 'bg-red-50', points: ['Mark vendor unavailable', 'Prevent double booking', 'Vacation/holiday blocks', 'Maintenance scheduling'] },
    { emoji: '🔄', title: 'Conflict Resolution', accentColor: 'bg-amber-50', points: ['Automatic conflict detection', 'Alternative suggestions', 'Resource optimization', 'Smart scheduling'] },
    { emoji: '📊', title: 'Resource Utilization', accentColor: 'bg-green-50', points: ['Vendor workload tracking', 'Capacity planning', 'Availability heatmaps', 'Efficiency reports'] }
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  const renderMonthView = () => {
    const days = getDaysInMonth(currentDate);
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => {
            const dayEvents = day ? getDayEvents(day) : [];
            const isToday = day && day.toDateString() === new Date().toDateString();
            
            return (
              <div 
                key={idx} 
                className={`min-h-32 p-2 rounded-lg transition-all ${
                  day ? 'bg-white hover:shadow-md cursor-pointer' : 'bg-gray-50'
                } ${isToday ? 'ring-2 ring-red-400 shadow-md' : 'border border-gray-200'}`}
              >
                {day && (
                  <>
                    <div className={`text-xs font-semibold mb-2 ${isToday ? 'text-red-600' : 'text-gray-600'}`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map((event, i) => (
                        <div 
                          key={i}
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowEventModal(true);
                          }}
                          className={`text-[10px] p-1.5 rounded cursor-pointer transition-colors truncate ${getEventColor(event)}`}
                          title={event.title}
                        >
                          <span className="font-semibold">{event.time}</span> - {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-[10px] text-gray-400 text-center mt-1">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    const hours = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'];

    return (
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-8 gap-1 mb-2">
            <div className="text-xs font-semibold text-gray-500 py-2 text-center">Time</div>
            {weekDays.map((day, idx) => (
              <div key={idx} className="text-center">
                <div className="text-xs font-semibold text-gray-600">{day.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div className="text-xs text-gray-400">{day.getDate()}</div>
              </div>
            ))}
          </div>
          
          {hours.map((hour, hourIdx) => (
            <div key={hourIdx} className="grid grid-cols-8 gap-1 mb-1">
              <div className="text-xs text-gray-400 py-2 text-center">{hour}</div>
              {weekDays.map((day, dayIdx) => {
                const dayEvents = getDayEvents(day);
                const eventAtHour = dayEvents.find(e => e.time.includes(hour.split(' ')[0]));
                return (
                  <div 
                    key={dayIdx} 
                    className="min-h-16 border border-gray-100 rounded p-1 hover:bg-gray-50 transition-colors"
                  >
                    {eventAtHour && (
                      <div 
                        onClick={() => {
                          setSelectedEvent(eventAtHour);
                          setShowEventModal(true);
                        }}
                        className={`text-[10px] p-1 rounded cursor-pointer hover:opacity-80 ${getEventColor(eventAtHour)}`}
                      >
                        {eventAtHour.title}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM'];
    const dayEvents = getDayEvents(currentDate);

    return (
      <div className="space-y-2">
        <div className="text-center mb-4">
          <h4 className="text-lg font-semibold text-gray-800">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </h4>
        </div>
        {hours.map((hour, idx) => {
          const eventAtHour = dayEvents.find(e => e.time.includes(hour.split(' ')[0]));
          return (
            <div key={idx} className="flex gap-3 items-start">
              <div className="w-20 text-xs text-gray-400 pt-2">{hour}</div>
              <div className="flex-1 min-h-16 border border-gray-100 rounded-lg p-2 hover:bg-gray-50 transition-colors">
                {eventAtHour && (
                  <div 
                    onClick={() => {
                      setSelectedEvent(eventAtHour);
                      setShowEventModal(true);
                    }}
                    className={`p-3 rounded-lg cursor-pointer hover:opacity-90 ${getEventColor(eventAtHour)}`}
                  >
                    <div className="font-semibold text-sm">{eventAtHour.title}</div>
                    <div className="text-xs mt-1">Vendor: {eventAtHour.vendor}</div>
                    <div className="text-xs">Customer: {eventAtHour.customer}</div>
                    <div className="text-xs mt-1">Amount: {eventAtHour.amount}</div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

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
      {showEventModal && selectedEvent && (
        <EventDetailsModal 
          event={selectedEvent}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(null);
          }}
          onReschedule={(event) => {
            setShowEventModal(false);
            setSelectedEvent(event);
            setShowRescheduleModal(true);
          }}
        />
      )}

      {showRescheduleModal && selectedEvent && (
        <RescheduleModal 
          event={selectedEvent}
          onReschedule={handleRescheduleEvent}
          onClose={() => {
            setShowRescheduleModal(false);
            setSelectedEvent(null);
          }}
        />
      )}

      {showBlockModal && (
        <BlockVendorModal 
          vendors={vendors}
          existingBlocks={vendorBlocks}
          onBlock={handleBlockVendor}
          onClose={() => setShowBlockModal(false)}
        />
      )}

      {showAvailabilityModal && (
        <VendorAvailabilityModal 
          vendors={vendors}
          blocks={vendorBlocks}
          onClose={() => setShowAvailabilityModal(false)}
        />
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📅</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Scheduling & Calendar Management</h3>
            <p className="text-sm text-gray-500 mt-0.5">Manage event dates and vendor schedules to avoid conflicts and ensure smooth execution</p>
          </div>
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
      
      {/* Calendar Controls */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => changeMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Previous month"
              >
                ←
              </button>
              <h3 className="text-lg font-bold text-gray-800">
                {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
              </h3>
              <button 
                onClick={() => changeMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Next month"
              >
                →
              </button>
              <button 
                onClick={goToToday}
                className="px-3 py-1.5 text-xs font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                Today
              </button>
            </div>
            
            <div className="flex gap-2">
              {['month', 'week', 'day'].map(v => (
                <button 
                  key={v}
                  onClick={() => setView(v)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    view === v ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
              <button 
                onClick={() => setShowBlockModal(true)}
                className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-semibold rounded-lg hover:bg-amber-100 transition-colors"
              >
                Block Vendor Dates
              </button>
              <button 
                onClick={() => setShowAvailabilityModal(true)}
                className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-lg hover:bg-green-100 transition-colors"
              >
                View Availability
              </button>
            </div>
          </div>
        </div>
        
        {/* Calendar View */}
        <div className="p-5">
          {view === 'month' && renderMonthView()}
          {view === 'week' && renderWeekView()}
          {view === 'day' && renderDayView()}
        </div>
        
        {/* Legend */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-pink-100 rounded"></div>
            <span className="text-xs text-gray-600">Wedding</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-100 rounded"></div>
            <span className="text-xs text-gray-600">Corporate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-100 rounded"></div>
            <span className="text-xs text-gray-600">Birthday</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-amber-100 rounded"></div>
            <span className="text-xs text-gray-600">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 ring-2 ring-red-400 bg-white rounded"></div>
            <span className="text-xs text-gray-600">Today</span>
          </div>
          <div className="flex-1 text-right">
            <span className="text-xs text-gray-400">
              Total scheduled: {Object.values(events).flat().length} events
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