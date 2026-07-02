// src/components/admin/notifications/UserPreferencesControl.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Icon } from '../shared/Icon';
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

// Edit User Preferences Modal
const EditPreferencesModal = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    channels: user?.channels || ['Email'],
    categories: user?.categories || ['Booking'],
    status: user?.status || 'Opted-in'
  });

  const channelOptions = ['Email', 'Push', 'SMS', 'In-App'];
  const categoryOptions = ['Booking', 'Payments', 'Vendor', 'Promotions', 'Security', 'All'];

  const handleChannelToggle = (channel) => {
    setFormData(prev => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter(c => c !== channel)
        : [...prev.channels, channel]
    }));
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Edit Preferences</h3>
              <p className="text-xs text-gray-500">{user?.user} • {user?.email}</p>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
              Categories <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    formData.categories.includes(category)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            >
              <option value="Opted-in">Opted-in</option>
              <option value="Opted-out">Opted-out</option>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// User Details Modal
const UserDetailsModal = ({ user, onClose }) => {
  if (!user) return null;

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
          <h3 className="text-lg font-bold text-gray-800">User Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-2xl font-bold mx-auto">
              {user.user.split(' ').map(n => n[0]).join('')}
            </div>
            <h4 className="text-lg font-bold text-gray-800 mt-3">{user.user}</h4>
            <p className="text-sm text-gray-500">{user.email}</p>
            <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
              user.status === 'Opted-in' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {user.status}
            </span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">User ID</span>
              <span className="text-sm font-mono text-gray-700">#{user.id.toString().padStart(3, '0')}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Channels</span>
              <div className="flex gap-1.5 flex-wrap justify-end">
                {user.channels.map((channel) => (
                  <span key={channel} className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${getChannelColor(channel)}`}>
                    {channel}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-500">Categories</span>
              <div className="flex gap-1.5 flex-wrap justify-end">
                {user.categories.map((category) => (
                  <span key={category} className="px-2 py-0.5 text-[10px] font-semibold bg-gray-50 text-gray-700 rounded-full">
                    {category}
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

// Global Settings Modal
const GlobalSettingsModal = ({ onSave, onClose }) => {
  const [settings, setSettings] = useState({
    defaultChannels: ['Email', 'Push'],
    defaultCategories: ['Booking', 'Payments'],
    allowOptOut: true,
    requireConsent: true,
    sendReminders: false
  });

  const channelOptions = ['Email', 'Push', 'SMS', 'In-App'];
  const categoryOptions = ['Booking', 'Payments', 'Vendor', 'Promotions', 'Security', 'All'];

  const handleChannelToggle = (channel) => {
    setSettings(prev => ({
      ...prev,
      defaultChannels: prev.defaultChannels.includes(channel)
        ? prev.defaultChannels.filter(c => c !== channel)
        : [...prev.defaultChannels, channel]
    }));
  };

  const handleCategoryToggle = (category) => {
    setSettings(prev => ({
      ...prev,
      defaultCategories: prev.defaultCategories.includes(category)
        ? prev.defaultCategories.filter(c => c !== category)
        : [...prev.defaultCategories, category]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(settings);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Global Settings</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Default Channels</label>
            <div className="flex flex-wrap gap-2">
              {channelOptions.map(channel => (
                <button
                  key={channel}
                  type="button"
                  onClick={() => handleChannelToggle(channel)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    settings.defaultChannels.includes(channel)
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">Default Categories</label>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryToggle(category)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    settings.defaultCategories.includes(category)
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.allowOptOut}
                onChange={(e) => setSettings({ ...settings, allowOptOut: e.target.checked })}
                className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">Allow users to opt-out</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.requireConsent}
                onChange={(e) => setSettings({ ...settings, requireConsent: e.target.checked })}
                className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">Require consent for notifications</span>
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.sendReminders}
                onChange={(e) => setSettings({ ...settings, sendReminders: e.target.checked })}
                className="w-4 h-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">Send preference reminders</span>
            </label>
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
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const UserPreferencesControl = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showGlobalSettings, setShowGlobalSettings] = useState(false);
  const [stats, setStats] = useState({
    optedIn: 0,
    optedOut: 0,
    total: 0,
    optInRate: 0
  });

  // Load users data
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const sampleUsers = [
          { id: 1, user: 'Priya Sharma', email: 'priya.sharma@email.com', channels: ['Email', 'Push'], categories: ['Booking', 'Promotions'], status: 'Opted-in' },
          { id: 2, user: 'Amit Patel', email: 'amit.patel@email.com', channels: ['SMS', 'Email'], categories: ['Vendor', 'Payments'], status: 'Opted-in' },
          { id: 3, user: 'Sneha Reddy', email: 'sneha.reddy@email.com', channels: ['Push'], categories: ['Booking'], status: 'Opted-out' },
          { id: 4, user: 'Vikram Singh', email: 'vikram.singh@email.com', channels: ['Email', 'Push', 'SMS'], categories: ['All'], status: 'Opted-in' },
          { id: 5, user: 'Neha Jain', email: 'neha.jain@email.com', channels: ['Email', 'In-App'], categories: ['Booking', 'Payments', 'Security'], status: 'Opted-in' },
          { id: 6, user: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', channels: ['SMS'], categories: ['Vendor'], status: 'Opted-out' },
        ];
        
        setUsers(sampleUsers);
        
        const total = sampleUsers.length;
        const optedIn = sampleUsers.filter(u => u.status === 'Opted-in').length;
        const optedOut = sampleUsers.filter(u => u.status === 'Opted-out').length;
        const optInRate = total > 0 ? Math.round((optedIn / total) * 100) : 0;
        
        setStats({ optedIn, optedOut, total, optInRate });
      } catch (err) {
        setError('Failed to load user preferences data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadUsers();
  }, []);

  // Show toast notification
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Filter users
  const filteredUsers = useMemo(() => {
    let filtered = users;
    
    if (filterStatus !== 'All') {
      filtered = filtered.filter(u => u.status === filterStatus);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(u => 
        u.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  }, [users, filterStatus, searchTerm]);

  // Handle edit preferences
  const handleEditPreferences = (userId, formData) => {
    setUsers(prev =>
      prev.map(user =>
        user.id === userId
          ? { ...user, channels: formData.channels, categories: formData.categories, status: formData.status }
          : user
      )
    );
    
    const user = users.find(u => u.id === userId);
    if (user && user.status !== formData.status) {
      setStats(prev => {
        const updated = { ...prev };
        if (formData.status === 'Opted-in') {
          updated.optedIn++;
          updated.optedOut--;
        } else {
          updated.optedIn--;
          updated.optedOut++;
        }
        updated.optInRate = Math.round((updated.optedIn / updated.total) * 100);
        return updated;
      });
    }
    
    showToast(`Preferences for "${user?.user}" updated successfully!`, 'success');
  };

  // Handle toggle status
  const handleToggleStatus = (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    const newStatus = user.status === 'Opted-in' ? 'Opted-out' : 'Opted-in';
    
    setUsers(prev =>
      prev.map(u =>
        u.id === userId ? { ...u, status: newStatus } : u
      )
    );
    
    // Update stats
    setStats(prev => {
      const updated = { ...prev };
      if (newStatus === 'Opted-in') {
        updated.optedIn++;
        updated.optedOut--;
      } else {
        updated.optedIn--;
        updated.optedOut++;
      }
      updated.optInRate = Math.round((updated.optedIn / updated.total) * 100);
      return updated;
    });
    
    showToast(`User "${user.user}" ${newStatus} successfully!`, 'success');
  };

  // Handle global settings save
  const handleGlobalSettingsSave = (settings) => {
    showToast('Global settings saved successfully!', 'success');
    console.log('Global settings:', settings);
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    if (window.confirm(`Are you sure you want to ${action}?`)) {
      showToast(`Action "${action}" completed successfully!`, 'success');
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
    { label: 'Total Users', value: stats.total, icon: '👤', color: 'border-blue-400', filter: 'All' },
    { label: 'Opted-in', value: stats.optedIn, icon: '✅', color: 'border-green-400', filter: 'Opted-in' },
    { label: 'Opted-out', value: stats.optedOut, icon: '❌', color: 'border-red-400', filter: 'Opted-out' },
    { label: 'Opt-in Rate', value: `${stats.optInRate}%`, icon: '📊', color: 'border-purple-400', filter: null },
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
      {showEditModal && selectedUser && (
        <EditPreferencesModal 
          user={selectedUser}
          onSave={handleEditPreferences}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showDetailsModal && selectedUser && (
        <UserDetailsModal 
          user={selectedUser}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showGlobalSettings && (
        <GlobalSettingsModal 
          onSave={handleGlobalSettingsSave}
          onClose={() => setShowGlobalSettings(false)}
        />
      )}

      {/* Header Section - Matching Booking Overview Theme */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-red-50 to-amber-50 border border-red-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">⚙️</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">User Preferences Control</h3>
            <p className="text-sm text-gray-500 mt-0.5">Allow users to manage their notification preferences (opt-in/opt-out)</p>
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
                <Icon d={ICONS.users} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">User Preferences</h3>
                <p className="text-xs text-gray-400">
                  {filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}
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
                onClick={() => setShowGlobalSettings(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <Icon d={ICONS.settings} size={13} /> Global Settings
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
                  placeholder="Search by user name or email..." 
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              >
                <option value="All">All Preferences</option>
                <option value="Opted-in">Opted-in</option>
                <option value="Opted-out">Opted-out</option>
              </select>
            </div>

            {/* Status Filter Buttons - Matching Booking Overview */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Opted-in', 'Opted-out'].map(f => (
                <button 
                  key={f} 
                  onClick={() => setFilterStatus(f)} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
                    filterStatus === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {f === 'All' ? 'All' : f}
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
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Channels</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Categories</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-12 text-center text-sm text-gray-400">
                    No users found for the selected filters.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                          {user.user.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{user.user}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{user.email}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5 flex-wrap">
                        {user.channels.map((channel) => (
                          <span key={channel} className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${getChannelColor(channel)}`}>
                            {channel}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5 flex-wrap">
                        {user.categories.map((category) => (
                          <span key={category} className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-gray-50 text-gray-700">
                            {category}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${
                        user.status === 'Opted-in' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => {
                            setSelectedUser(user);
                            setShowDetailsModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View Details"
                        >
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedUser(user);
                            setShowEditModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"
                          title="Edit Preferences"
                        >
                          <Icon d={ICONS.edit} size={14} />
                        </button>
                        <button 
                          onClick={() => handleToggleStatus(user.id)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            user.status === 'Opted-in' 
                              ? 'hover:bg-gray-50 text-gray-500' 
                              : 'hover:bg-green-50 text-green-500'
                          }`}
                          title={user.status === 'Opted-in' ? 'Opt-out' : 'Opt-in'}
                        >
                          {user.status === 'Opted-in' ? (
                            <Icon d={ICONS.cancel} size={14} />
                          ) : (
                            <Icon d={ICONS.check} size={14} />
                          )}
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
          {filteredUsers.length === 0 ? (
            <div className="text-center text-sm text-gray-400 py-8">
              No users found for the selected filters.
            </div>
          ) : (
            filteredUsers.map((user) => (
              <div key={user.id} className="bg-white border border-gray-100 rounded-xl p-4 mb-3 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-xs font-bold">
                      {user.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800 text-sm">{user.user}</div>
                      <div className="text-xs text-gray-400">{user.email}</div>
                    </div>
                  </div>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${
                    user.status === 'Opted-in' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {user.status}
                  </span>
                </div>
                
                <div className="space-y-2 mb-3 text-xs">
                  <div>
                    <span className="text-gray-400">Channels:</span>
                    <div className="flex gap-1.5 flex-wrap mt-1">
                      {user.channels.map((channel) => (
                        <span key={channel} className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${getChannelColor(channel)}`}>
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-400">Categories:</span>
                    <div className="flex gap-1.5 flex-wrap mt-1">
                      {user.categories.map((category) => (
                        <span key={category} className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-gray-50 text-gray-700">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-50">
                  <button 
                    onClick={() => {
                      setSelectedUser(user);
                      setShowDetailsModal(true);
                    }}
                    className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                    title="View Details"
                  >
                    <Icon d={ICONS.eye} size={14} />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedUser(user);
                      setShowEditModal(true);
                    }}
                    className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"
                    title="Edit Preferences"
                  >
                    <Icon d={ICONS.edit} size={14} />
                  </button>
                  <button 
                    onClick={() => handleToggleStatus(user.id)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      user.status === 'Opted-in' 
                        ? 'hover:bg-gray-50 text-gray-500' 
                        : 'hover:bg-green-50 text-green-500'
                    }`}
                    title={user.status === 'Opted-in' ? 'Opt-out' : 'Opt-in'}
                  >
                    {user.status === 'Opted-in' ? (
                      <Icon d={ICONS.cancel} size={14} />
                    ) : (
                      <Icon d={ICONS.check} size={14} />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions & Stats - Matching Booking Overview Style */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-5 border border-red-200">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📊</div>
            <div>
              <p className="text-sm font-bold text-gray-800">Preference Statistics</p>
              <p className="text-xs text-gray-500">Opt-in rate: {stats.optInRate}% • Opt-out rate: {100 - stats.optInRate}%</p>
            </div>
          </div>
          <div className="mt-3 h-2 bg-gray-200 rounded-full">
            <div className={`h-2 rounded-full ${stats.optInRate >= 50 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${stats.optInRate}%` }}></div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Opted-in: {stats.optInRate}%</span>
            <span>Opted-out: {100 - stats.optInRate}%</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <button 
              onClick={() => handleBulkAction('Update all user preferences')}
              className="w-full text-left px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-all"
            >
              🔄 Update all user preferences
            </button>
            <button 
              onClick={() => handleBulkAction('Send email preference reminder to users')}
              className="w-full text-left px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-all"
            >
              📧 Email preference reminder to users
            </button>
            <button 
              onClick={() => handleBulkAction('Export preference report')}
              className="w-full text-left px-3 py-2 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-all"
            >
              📊 Export preference report
            </button>
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