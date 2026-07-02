// src/components/admin/notifications/EventBasedNotifications.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '../shared/Icon';
import { StatusBadge } from '../shared/StatusBadge';
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

// Add/Edit Event Modal
const EventModal = ({ event, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    event: event?.event || '',
    trigger: event?.trigger || '',
    channels: event?.channels || ['Email'],
    template: event?.template || '',
    status: event?.status || 'Active'
  });

  const channelOptions = ['Email', 'Push', 'SMS', 'In-App'];

  const handleChannelToggle = (channel) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">
              {event ? 'Edit Event' : 'Add New Event'}
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.event}
              onChange={(e) => setFormData({ ...formData, event: e.target.value })}
              placeholder="e.g., User Registration"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Trigger <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.trigger}
              onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
              placeholder="e.g., On sign up"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Channels <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {channelOptions.map(channel => (
                <button
                  key={channel}
                  type="button"
                  onClick={() => handleChannelToggle(channel)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    formData.channels.includes(channel)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {channel}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Template <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.template}
              onChange={(e) => setFormData({ ...formData, template: e.target.value })}
              placeholder="e.g., Welcome Template"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
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
              {event ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Event Details Modal
const EventDetailsModal = ({ event, onClose }) => {
  if (!event) return null;

  const getChannelColor = (channel) => {
    const colors = {
      'Email': 'bg-purple-50 text-purple-700',
      'Push': 'bg-blue-50 text-blue-700',
      'SMS': 'bg-green-50 text-green-700',
      'In-App': 'bg-orange-50 text-orange-700'
    };
    return colors[channel] || 'bg-gray-50 text-gray-700';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Event Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl mb-3">⚡</div>
            <h4 className="text-lg font-bold text-gray-800">{event.event}</h4>
            <StatusBadge status={event.status} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Event ID</span>
              <span className="text-sm font-mono text-gray-700">{event.id}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Trigger</span>
              <span className="text-sm font-semibold text-gray-700">{event.trigger}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Template</span>
              <span className="text-sm font-semibold text-gray-700">{event.template}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Channels</span>
              <div className="flex gap-1.5 flex-wrap justify-end">
                {event.channels.split(', ').map((channel) => (
                  <span key={channel} className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${getChannelColor(channel)}`}>
                    {channel}
                  </span>
                ))}
              </div>
            </div>
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

export const EventBasedNotifications = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    triggersPerDay: 0
  });

  // Load events data
  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const sampleEvents = [
          { id: 'EVT001', event: 'User Registration', trigger: 'On sign up', channels: 'Email, Push', template: 'Welcome Template', status: 'Active' },
          { id: 'EVT002', event: 'Booking Confirmation', trigger: 'After payment', channels: 'Email, SMS, Push', template: 'Booking Confirmation', status: 'Active' },
          { id: 'EVT003', event: 'Payment Success', trigger: 'On payment completion', channels: 'Email, Push', template: 'Payment Receipt', status: 'Active' },
          { id: 'EVT004', event: 'Payment Failure', trigger: 'On payment error', channels: 'Email, SMS', template: 'Payment Failure', status: 'Active' },
          { id: 'EVT005', event: 'Vendor Approval', trigger: 'On admin approval', channels: 'Email, Push', template: 'Vendor Welcome', status: 'Active' },
          { id: 'EVT006', event: 'Vendor Rejection', trigger: 'On admin rejection', channels: 'Email', template: 'Vendor Rejection', status: 'Inactive' },
          { id: 'EVT007', event: 'Complaint Status Update', trigger: 'On status change', channels: 'Email, Push', template: 'Complaint Update', status: 'Active' },
          { id: 'EVT008', event: 'Booking Reminder', trigger: '24hrs before', channels: 'Push, SMS', template: 'Booking Reminder', status: 'Active' },
        ];
        
        setEvents(sampleEvents);
        
        const total = sampleEvents.length;
        const active = sampleEvents.filter(e => e.status === 'Active').length;
        const inactive = sampleEvents.filter(e => e.status === 'Inactive').length;
        
        setStats({
          total,
          active,
          inactive,
          triggersPerDay: Math.floor(Math.random() * 2000 + 1500)
        });
      } catch (err) {
        setError('Failed to load events data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadEvents();
  }, []);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Filter events
  const filteredEvents = useMemo(() => {
    let filtered = events;
    
    if (filterStatus !== 'All') {
      filtered = filtered.filter(e => e.status === filterStatus);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(e => 
        e.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.trigger.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [events, filterStatus, searchTerm]);

  // Handle add event
  const handleAddEvent = (formData) => {
    const newEvent = {
      id: `EVT${String(events.length + 1).padStart(3, '0')}`,
      event: formData.event,
      trigger: formData.trigger,
      channels: formData.channels.join(', '),
      template: formData.template,
      status: formData.status
    };
    
    setEvents(prev => [...prev, newEvent]);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      total: prev.total + 1,
      active: formData.status === 'Active' ? prev.active + 1 : prev.active,
      inactive: formData.status === 'Inactive' ? prev.inactive + 1 : prev.inactive
    }));
    
    showToast(`Event "${formData.event}" created successfully!`, 'success');
  };

  // Handle edit event
  const handleEditEvent = (formData) => {
    setEvents(prev => 
      prev.map(event => 
        event.id === selectedEvent.id
          ? {
              ...event,
              event: formData.event,
              trigger: formData.trigger,
              channels: formData.channels.join(', '),
              template: formData.template,
              status: formData.status
            }
          : event
      )
    );
    
    // Update stats
    const oldStatus = selectedEvent.status;
    const newStatus = formData.status;
    if (oldStatus !== newStatus) {
      setStats(prev => ({
        ...prev,
        active: newStatus === 'Active' ? prev.active + 1 : prev.active - 1,
        inactive: newStatus === 'Inactive' ? prev.inactive + 1 : prev.inactive - 1
      }));
    }
    
    showToast(`Event "${formData.event}" updated successfully!`, 'success');
  };

  // Handle delete event
  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      const eventToDelete = events.find(e => e.id === eventId);
      setEvents(prev => prev.filter(e => e.id !== eventId));
      
      // Update stats
      if (eventToDelete) {
        setStats(prev => ({
          ...prev,
          total: prev.total - 1,
          active: eventToDelete.status === 'Active' ? prev.active - 1 : prev.active,
          inactive: eventToDelete.status === 'Inactive' ? prev.inactive - 1 : prev.inactive
        }));
      }
      
      showToast('Event deleted successfully!', 'success');
    }
  };

  // Handle toggle status
  const handleToggleStatus = (eventId) => {
    setEvents(prev =>
      prev.map(event =>
        event.id === eventId
          ? { ...event, status: event.status === 'Active' ? 'Inactive' : 'Active' }
          : event
      )
    );
    
    const event = events.find(e => e.id === eventId);
    if (event) {
      const newStatus = event.status === 'Active' ? 'Inactive' : 'Active';
      setStats(prev => ({
        ...prev,
        active: newStatus === 'Active' ? prev.active + 1 : prev.active - 1,
        inactive: newStatus === 'Inactive' ? prev.inactive + 1 : prev.inactive - 1
      }));
      showToast(`Event status changed to ${newStatus}`, 'info');
    }
  };

  // Get channel color
  const getChannelColor = (channel) => {
    const colors = {
      'Email': 'bg-purple-50 text-purple-700',
      'Push': 'bg-blue-50 text-blue-700',
      'SMS': 'bg-green-50 text-green-700',
      'In-App': 'bg-orange-50 text-orange-700'
    };
    return colors[channel] || 'bg-gray-50 text-gray-700';
  };

  // Stat cards
  const statCards = [
    { label: 'Total Events', value: stats.total, icon: '📋', color: 'border-blue-400', filter: 'All' },
    { label: 'Active Events', value: stats.active, icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Inactive Events', value: stats.inactive, icon: '⏸️', color: 'border-red-400', filter: 'Inactive' },
    { label: 'Triggers / Day', value: `~${stats.triggersPerDay.toLocaleString()}`, icon: '⚡', color: 'border-purple-400', filter: null },
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
      {showAddModal && (
        <EventModal 
          onSave={handleAddEvent}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {showEditModal && selectedEvent && (
        <EventModal 
          event={selectedEvent}
          onSave={handleEditEvent}
          onClose={() => {
            setShowEditModal(false);
            setSelectedEvent(null);
          }}
        />
      )}

      {showDetailsModal && selectedEvent && (
        <EventDetailsModal 
          event={selectedEvent}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedEvent(null);
          }}
        />
      )}

      {/* Header Section - Matching Booking Overview Theme */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-red-50 to-amber-50 border border-red-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">⚡</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Event-Based Notifications</h3>
            <p className="text-sm text-gray-500 mt-0.5">Automatically trigger notifications for key activities across the platform</p>
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

      {/* Main Table Section - Matching Booking Overview Theme */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.events} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Event Triggers Configuration</h3>
                <p className="text-xs text-gray-400">
                  {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''}
                  {filterStatus !== 'All' ? ` (filtered: ${filterStatus})` : ' total'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {filterStatus !== 'All' && (
                <button 
                  onClick={() => setFilterStatus('All')} 
                  className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  ✕ Clear Filter
                </button>
              )}
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <Icon d={ICONS.plus} size={13} /> Add Event
              </button>
            </div>
          </div>

          {/* Search and Filters - Matching Booking Overview */}
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
                  placeholder="Search by event name, ID, template or trigger..." 
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50"
                />
              </div>
            </div>

            {/* Status Filter Buttons - Matching Booking Overview */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Active', 'Inactive'].map(f => (
                <button 
                  key={f} 
                  onClick={() => setFilterStatus(f)} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
                    filterStatus === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
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
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Event</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Trigger</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Channels</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Template</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center text-sm text-gray-400">
                    No events found for the selected filters.
                  </td>
                </tr>
              ) : (
                filteredEvents.map((event) => (
                  <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{event.id}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{event.event}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{event.trigger}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5 flex-wrap">
                        {event.channels.split(', ').map((channel) => (
                          <span key={channel} className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${getChannelColor(channel)}`}>
                            {channel}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{event.template}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={event.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => {
                            setSelectedEvent(event);
                            setShowDetailsModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View Details"
                        >
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        <button 
                          onClick={() => {
                            const channelArray = event.channels.split(', ');
                            setSelectedEvent({ ...event, channels: channelArray });
                            setShowEditModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"
                          title="Edit Event"
                        >
                          <Icon d={ICONS.edit} size={14} />
                        </button>
                        <button 
                          onClick={() => handleToggleStatus(event.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            event.status === 'Active' 
                              ? 'hover:bg-gray-50 text-gray-500' 
                              : 'hover:bg-green-50 text-green-500'
                          }`}
                          title={event.status === 'Active' ? 'Deactivate' : 'Activate'}
                        >
                          {event.status === 'Active' ? (
                            <Icon d={ICONS.pause} size={14} />
                          ) : (
                            <Icon d={ICONS.play} size={14} />
                          )}
                        </button>
                        <button 
                          onClick={() => handleDeleteEvent(event.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                          title="Delete Event"
                        >
                          <Icon d={ICONS.delete} size={14} />
                        </button>
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
          {filteredEvents.length === 0 ? (
            <div className="text-center text-sm text-gray-400 py-8">
              No events found for the selected filters.
            </div>
          ) : (
            filteredEvents.map((event) => (
              <div key={event.id} className="bg-white border border-gray-100 rounded-xl p-4 mb-3 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{event.event}</div>
                    <div className="text-xs text-gray-400 font-mono">{event.id}</div>
                  </div>
                  <StatusBadge status={event.status} />
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div>
                    <span className="text-gray-400">Trigger:</span>
                    <span className="text-gray-700 ml-1">{event.trigger}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Template:</span>
                    <span className="text-gray-700 ml-1">{event.template}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">Channels:</span>
                    <div className="flex gap-1.5 flex-wrap mt-1">
                      {event.channels.split(', ').map((channel) => (
                        <span key={channel} className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${getChannelColor(channel)}`}>
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-50">
                  <button 
                    onClick={() => {
                      setSelectedEvent(event);
                      setShowDetailsModal(true);
                    }}
                    className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                    title="View Details"
                  >
                    <Icon d={ICONS.eye} size={14} />
                  </button>
                  <button 
                    onClick={() => {
                      const channelArray = event.channels.split(', ');
                      setSelectedEvent({ ...event, channels: channelArray });
                      setShowEditModal(true);
                    }}
                    className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"
                    title="Edit Event"
                  >
                    <Icon d={ICONS.edit} size={14} />
                  </button>
                  <button 
                    onClick={() => handleToggleStatus(event.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      event.status === 'Active' 
                        ? 'hover:bg-gray-50 text-gray-500' 
                        : 'hover:bg-green-50 text-green-500'
                    }`}
                    title={event.status === 'Active' ? 'Deactivate' : 'Activate'}
                  >
                    {event.status === 'Active' ? (
                      <Icon d={ICONS.pause} size={14} />
                    ) : (
                      <Icon d={ICONS.play} size={14} />
                    )}
                  </button>
                  <button 
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                    title="Delete Event"
                  >
                    <Icon d={ICONS.delete} size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Stats - Matching Booking Overview Style */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Event Insights</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">Total Events</p>
            <p className="text-lg font-bold text-gray-800">{stats.total}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Active Events</p>
            <p className="text-lg font-bold text-green-600">{stats.active}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Inactive Events</p>
            <p className="text-lg font-bold text-red-600">{stats.inactive}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Triggers/Day</p>
            <p className="text-lg font-bold text-purple-600">~{stats.triggersPerDay.toLocaleString()}</p>
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