// src/components/admin/notifications/SchedulingNotifications.jsx
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

// Create/Edit Schedule Modal
const ScheduleModal = ({ schedule, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: schedule?.title || '',
    audience: schedule?.audience || 'All Users',
    scheduledDate: schedule?.scheduled || '',
    frequency: schedule?.frequency || 'One-time',
    status: schedule?.status || 'Scheduled'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.scheduledDate) {
      onSave(formData);
      onClose();
    }
  };

  const audienceOptions = ['All Users', 'Customers', 'Vendors', 'Selected Users'];
  const frequencyOptions = ['One-time', 'Daily', 'Weekly', 'Monthly', 'Yearly'];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">
              {schedule ? 'Edit Schedule' : 'New Schedule'}
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notification Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Weekly Newsletter"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Audience <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.audience}
              onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            >
              {audienceOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Scheduled Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              value={formData.scheduledDate}
              onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Frequency <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            >
              {frequencyOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Pending">Pending</option>
              <option value="Sent">Sent</option>
              <option value="Failed">Failed</option>
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
              {schedule ? 'Update Schedule' : 'Create Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Schedule Details Modal
const ScheduleDetailsModal = ({ schedule, onClose }) => {
  if (!schedule) return null;

  const getFrequencyColor = (frequency) => {
    const colors = {
      'Daily': 'bg-blue-50 text-blue-700',
      'Weekly': 'bg-purple-50 text-purple-700',
      'Monthly': 'bg-green-50 text-green-700',
      'Yearly': 'bg-amber-50 text-amber-700',
      'One-time': 'bg-gray-50 text-gray-700'
    };
    return colors[frequency] || 'bg-gray-50 text-gray-700';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Schedule Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl mb-3">📅</div>
            <h4 className="text-lg font-bold text-gray-800">{schedule.title}</h4>
            <StatusBadge status={schedule.status} />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Schedule ID</span>
              <span className="text-sm font-mono text-gray-700">#{schedule.id.toString().padStart(3, '0')}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Audience</span>
              <span className="text-sm font-semibold text-gray-700">{schedule.audience}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Scheduled Date</span>
              <span className="text-sm font-semibold text-gray-700">{schedule.scheduled}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Frequency</span>
              <span className={`text-sm font-semibold px-2 py-0.5 rounded-full ${getFrequencyColor(schedule.frequency)}`}>
                {schedule.frequency}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Status</span>
              <StatusBadge status={schedule.status} />
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

export const SchedulingNotifications = () => {
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [stats, setStats] = useState({
    scheduled: 0,
    sentToday: 0,
    pending: 0,
    recurring: 0
  });

  // Load schedules data
  useEffect(() => {
    const loadSchedules = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const sampleSchedules = [
          { id: 1, title: 'Weekly Newsletter', audience: 'All Users', scheduled: '2024-03-20 10:00 AM', status: 'Scheduled', frequency: 'Weekly' },
          { id: 2, title: 'Payment Reminder', audience: 'Customers', scheduled: '2024-03-18 09:00 AM', status: 'Scheduled', frequency: 'Daily' },
          { id: 3, title: 'Vendor Payout Notice', audience: 'Vendors', scheduled: '2024-03-19 02:00 PM', status: 'Pending', frequency: 'Monthly' },
          { id: 4, title: 'Holiday Offer', audience: 'Selected Users', scheduled: '2024-03-25 08:00 AM', status: 'Scheduled', frequency: 'One-time' },
          { id: 5, title: 'Booking Reminder', audience: 'Customers', scheduled: '2024-03-15 11:00 AM', status: 'Sent', frequency: 'Daily' },
          { id: 6, title: 'Promotional Campaign', audience: 'All Users', scheduled: '2024-03-30 12:00 PM', status: 'Scheduled', frequency: 'One-time' },
          { id: 7, title: 'Monthly Report', audience: 'Vendors', scheduled: '2024-03-22 08:00 AM', status: 'Pending', frequency: 'Monthly' },
          { id: 8, title: 'System Update Notice', audience: 'All Users', scheduled: '2024-03-26 06:00 PM', status: 'Scheduled', frequency: 'One-time' },
        ];
        
        setSchedules(sampleSchedules);
        
        const scheduled = sampleSchedules.filter(s => s.status === 'Scheduled').length;
        const sentToday = sampleSchedules.filter(s => s.status === 'Sent').length;
        const pending = sampleSchedules.filter(s => s.status === 'Pending').length;
        const recurring = sampleSchedules.filter(s => s.frequency !== 'One-time').length;
        
        setStats({ scheduled, sentToday, pending, recurring });
      } catch (err) {
        setError('Failed to load schedules data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadSchedules();
  }, []);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Filter schedules
  const filteredSchedules = useMemo(() => {
    let filtered = schedules;
    
    if (filterStatus !== 'All') {
      filtered = filtered.filter(s => s.status === filterStatus);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.audience.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [schedules, filterStatus, searchTerm]);

  // Handle create schedule
  const handleCreateSchedule = (formData) => {
    const newSchedule = {
      id: schedules.length + 1,
      title: formData.title,
      audience: formData.audience,
      scheduled: formData.scheduledDate,
      frequency: formData.frequency,
      status: formData.status
    };
    
    setSchedules(prev => [...prev, newSchedule]);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      scheduled: formData.status === 'Scheduled' ? prev.scheduled + 1 : prev.scheduled,
      pending: formData.status === 'Pending' ? prev.pending + 1 : prev.pending,
      sentToday: formData.status === 'Sent' ? prev.sentToday + 1 : prev.sentToday,
      recurring: formData.frequency !== 'One-time' ? prev.recurring + 1 : prev.recurring
    }));
    
    showToast(`Schedule "${formData.title}" created successfully!`, 'success');
    setShowCreateModal(false);
  };

  // Handle edit schedule
  const handleEditSchedule = (formData) => {
    setSchedules(prev =>
      prev.map(schedule =>
        schedule.id === selectedSchedule.id
          ? {
              ...schedule,
              title: formData.title,
              audience: formData.audience,
              scheduled: formData.scheduledDate,
              frequency: formData.frequency,
              status: formData.status
            }
          : schedule
      )
    );
    
    // Update stats
    const oldStatus = selectedSchedule.status;
    const newStatus = formData.status;
    const oldFrequency = selectedSchedule.frequency;
    const newFrequency = formData.frequency;
    
    setStats(prev => {
      const updated = { ...prev };
      
      // Update status counts
      if (oldStatus === 'Scheduled') updated.scheduled--;
      else if (oldStatus === 'Pending') updated.pending--;
      else if (oldStatus === 'Sent') updated.sentToday--;
      
      if (newStatus === 'Scheduled') updated.scheduled++;
      else if (newStatus === 'Pending') updated.pending++;
      else if (newStatus === 'Sent') updated.sentToday++;
      
      // Update recurring count
      if (oldFrequency !== 'One-time') updated.recurring--;
      if (newFrequency !== 'One-time') updated.recurring++;
      
      return updated;
    });
    
    showToast(`Schedule "${formData.title}" updated successfully!`, 'success');
    setShowEditModal(false);
    setSelectedSchedule(null);
  };

  // Handle cancel schedule
  const handleCancelSchedule = (scheduleId) => {
    if (window.confirm('Are you sure you want to cancel this schedule?')) {
      const scheduleToCancel = schedules.find(s => s.id === scheduleId);
      setSchedules(prev => prev.filter(s => s.id !== scheduleId));
      
      // Update stats
      if (scheduleToCancel) {
        setStats(prev => {
          const updated = { ...prev };
          if (scheduleToCancel.status === 'Scheduled') updated.scheduled--;
          else if (scheduleToCancel.status === 'Pending') updated.pending--;
          else if (scheduleToCancel.status === 'Sent') updated.sentToday--;
          if (scheduleToCancel.frequency !== 'One-time') updated.recurring--;
          return updated;
        });
      }
      
      showToast('Schedule cancelled successfully!', 'success');
    }
  };

  // Get frequency color
  const getFrequencyColor = (frequency) => {
    const colors = {
      'Daily': 'bg-blue-50 text-blue-700',
      'Weekly': 'bg-purple-50 text-purple-700',
      'Monthly': 'bg-green-50 text-green-700',
      'Yearly': 'bg-amber-50 text-amber-700',
      'One-time': 'bg-gray-50 text-gray-700'
    };
    return colors[frequency] || 'bg-gray-50 text-gray-700';
  };

  // Stat cards
  const statCards = [
    { label: 'Scheduled', value: stats.scheduled, icon: '📅', color: 'border-blue-400', filter: 'Scheduled' },
    { label: 'Sent Today', value: stats.sentToday, icon: '✅', color: 'border-green-400', filter: 'Sent' },
    { label: 'Pending', value: stats.pending, icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Recurring', value: stats.recurring, icon: '🔄', color: 'border-purple-400', filter: null },
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
        <ScheduleModal 
          onSave={handleCreateSchedule}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {showEditModal && selectedSchedule && (
        <ScheduleModal 
          schedule={selectedSchedule}
          onSave={handleEditSchedule}
          onClose={() => {
            setShowEditModal(false);
            setSelectedSchedule(null);
          }}
        />
      )}

      {showDetailsModal && selectedSchedule && (
        <ScheduleDetailsModal 
          schedule={selectedSchedule}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedSchedule(null);
          }}
        />
      )}

      {/* Header Section - Matching Booking Overview Theme */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-red-50 to-amber-50 border border-red-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📅</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Scheduling Notifications</h3>
            <p className="text-sm text-gray-500 mt-0.5">Schedule notifications to be sent at specific dates and times</p>
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
                <Icon d={ICONS.calendar} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Scheduled Notifications</h3>
                <p className="text-xs text-gray-400">
                  {filteredSchedules.length} notification{filteredSchedules.length !== 1 ? 's' : ''} scheduled
                  {filterStatus !== 'All' ? ` (filtered: ${filterStatus})` : ''}
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
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <Icon d={ICONS.plus} size={13} /> New Schedule
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
                  placeholder="Search by title or audience..." 
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                <option value="All">All Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Pending">Pending</option>
                <option value="Sent">Sent</option>
                <option value="Failed">Failed</option>
              </select>
            </div>

            {/* Status Filter Buttons - Matching Booking Overview */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Scheduled', 'Pending', 'Sent', 'Failed'].map(f => (
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
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Notification</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Audience</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Scheduled Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Frequency</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredSchedules.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-12 text-center text-sm text-gray-400">
                    No schedules found for the selected filters.
                  </td>
                </tr>
              ) : (
                filteredSchedules.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{schedule.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{schedule.audience}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{schedule.scheduled}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${getFrequencyColor(schedule.frequency)}`}>
                        {schedule.frequency}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={schedule.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => {
                            setSelectedSchedule(schedule);
                            setShowDetailsModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View Details"
                        >
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedSchedule(schedule);
                            setShowEditModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"
                          title="Edit Schedule"
                        >
                          <Icon d={ICONS.edit} size={14} />
                        </button>
                        <button 
                          onClick={() => handleCancelSchedule(schedule.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                          title="Cancel Schedule"
                        >
                          <Icon d={ICONS.cancel} size={14} />
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
          {filteredSchedules.length === 0 ? (
            <div className="text-center text-sm text-gray-400 py-8">
              No schedules found for the selected filters.
            </div>
          ) : (
            filteredSchedules.map((schedule) => (
              <div key={schedule.id} className="bg-white border border-gray-100 rounded-xl p-4 mb-3 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">{schedule.title}</div>
                    <div className="text-xs text-gray-400">#{schedule.id.toString().padStart(3, '0')}</div>
                  </div>
                  <StatusBadge status={schedule.status} />
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div>
                    <span className="text-gray-400">Audience:</span>
                    <span className="text-gray-700 ml-1">{schedule.audience}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Frequency:</span>
                    <span className={`ml-1 font-medium ${getFrequencyColor(schedule.frequency)}`}>
                      {schedule.frequency}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-400">Scheduled:</span>
                    <span className="text-gray-700 ml-1">{schedule.scheduled}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-50">
                  <button 
                    onClick={() => {
                      setSelectedSchedule(schedule);
                      setShowDetailsModal(true);
                    }}
                    className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                    title="View Details"
                  >
                    <Icon d={ICONS.eye} size={14} />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedSchedule(schedule);
                      setShowEditModal(true);
                    }}
                    className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"
                    title="Edit Schedule"
                  >
                    <Icon d={ICONS.edit} size={14} />
                  </button>
                  <button 
                    onClick={() => handleCancelSchedule(schedule.id)}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                    title="Cancel Schedule"
                  >
                    <Icon d={ICONS.cancel} size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Stats - Matching Booking Overview Style */}
      <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Schedule Insights</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">Scheduled</p>
            <p className="text-lg font-bold text-blue-600">{stats.scheduled}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Sent Today</p>
            <p className="text-lg font-bold text-green-600">{stats.sentToday}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Pending</p>
            <p className="text-lg font-bold text-amber-600">{stats.pending}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Recurring</p>
            <p className="text-lg font-bold text-purple-600">{stats.recurring}</p>
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