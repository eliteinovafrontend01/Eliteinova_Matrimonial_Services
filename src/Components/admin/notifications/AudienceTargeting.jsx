// src/components/admin/notifications/AudienceTargeting.jsx
import React, { useState, useMemo, useEffect } from 'react';
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

// User Selection Modal
const UserSelectionModal = ({ users, selectedUsers, onToggleUser, onSelectAll, onClearAll, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || user.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [users, searchTerm, filterType]);

  const allSelected = filteredUsers.length > 0 && filteredUsers.every(user => selectedUsers.includes(user.id));

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Select Users</h3>
              <p className="text-xs text-gray-400">{selectedUsers.length} users selected</p>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Search and Filter */}
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[200px] relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon d={ICONS.search} size={15} />
              </span>
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            >
              <option value="All">All Types</option>
              <option value="Customer">Customers</option>
              <option value="Vendor">Vendors</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={onSelectAll}
              className="px-3 py-1 text-xs font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
            >
              Select All ({filteredUsers.length})
            </button>
            <button
              onClick={onClearAll}
              className="px-3 py-1 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* User List */}
          <div className="border border-gray-100 rounded-xl overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            filteredUsers.forEach(user => onToggleUser(user.id));
                          } else {
                            filteredUsers.forEach(user => {
                              if (selectedUsers.includes(user.id)) {
                                onToggleUser(user.id);
                              }
                            });
                          }
                        }}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">User</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Type</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Bookings</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-4 py-8 text-center text-sm text-gray-400">
                        No users found matching your search
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => onToggleUser(user.id)}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => {}}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm font-medium text-gray-800">{user.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            user.type === 'Customer' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                          }`}>
                            {user.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{user.bookings}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            user.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AudienceTargeting = () => {
  const [selectedAudience, setSelectedAudience] = useState('All Users');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Statistics
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    customers: 0,
    vendors: 0,
    totalBookings: 0
  });

  // Load users data
  useEffect(() => {
    const loadUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const sampleUsers = [
          { id: 1, name: 'Priya Sharma', email: 'priya.sharma@email.com', type: 'Customer', bookings: 12, status: 'Active' },
          { id: 2, name: 'Amit Patel', email: 'amit.patel@email.com', type: 'Vendor', bookings: 45, status: 'Active' },
          { id: 3, name: 'Sneha Reddy', email: 'sneha.reddy@email.com', type: 'Customer', bookings: 3, status: 'Inactive' },
          { id: 4, name: 'Vikram Singh', email: 'vikram.singh@email.com', type: 'Vendor', bookings: 28, status: 'Active' },
          { id: 5, name: 'Neha Jain', email: 'neha.jain@email.com', type: 'Customer', bookings: 7, status: 'Active' },
          { id: 6, name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', type: 'Vendor', bookings: 15, status: 'Active' },
          { id: 7, name: 'Pooja Mehta', email: 'pooja.mehta@email.com', type: 'Customer', bookings: 9, status: 'Active' },
          { id: 8, name: 'Sunil Rao', email: 'sunil.rao@email.com', type: 'Vendor', bookings: 32, status: 'Inactive' },
          { id: 9, name: 'Ananya Gupta', email: 'ananya.gupta@email.com', type: 'Customer', bookings: 2, status: 'Active' },
          { id: 10, name: 'Deepak Verma', email: 'deepak.verma@email.com', type: 'Vendor', bookings: 18, status: 'Active' },
        ];
        
        setUsers(sampleUsers);
        setStats({
          totalUsers: sampleUsers.length,
          activeUsers: sampleUsers.filter(u => u.status === 'Active').length,
          customers: sampleUsers.filter(u => u.type === 'Customer').length,
          vendors: sampleUsers.filter(u => u.type === 'Vendor').length,
          totalBookings: sampleUsers.reduce((sum, u) => sum + u.bookings, 0)
        });
      } catch (err) {
        setError('Failed to load users data. Please try again.');
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

  // Audience groups configuration
  const audienceGroups = useMemo(() => {
    return [
      { 
        id: 'all', 
        name: 'All Users', 
        icon: '🌍', 
        count: stats.totalUsers.toLocaleString(), 
        description: 'All registered users on the platform',
        filter: 'All'
      },
      { 
        id: 'customers', 
        name: 'Customers Only', 
        icon: '👤', 
        count: stats.customers.toLocaleString(), 
        description: 'Users who have made at least one booking',
        filter: 'Customers'
      },
      { 
        id: 'vendors', 
        name: 'Vendors Only', 
        icon: '🏪', 
        count: stats.vendors.toLocaleString(), 
        description: 'All registered vendors and service providers',
        filter: 'Vendors'
      },
      { 
        id: 'selected', 
        name: 'Selected Users', 
        icon: '🎯', 
        count: selectedUsers.length.toString(), 
        description: 'Manually selected users',
        filter: 'Selected'
      },
    ];
  }, [stats, selectedUsers]);

  // Get users based on selected audience
  const getFilteredUsers = useMemo(() => {
    if (selectedAudience === 'All Users') {
      return users;
    } else if (selectedAudience === 'Customers Only') {
      return users.filter(u => u.type === 'Customer');
    } else if (selectedAudience === 'Vendors Only') {
      return users.filter(u => u.type === 'Vendor');
    } else if (selectedAudience === 'Selected Users') {
      return users.filter(u => selectedUsers.includes(u.id));
    }
    return users;
  }, [selectedAudience, users, selectedUsers]);

  // Handle audience selection
  const handleAudienceSelect = (groupId) => {
    const group = audienceGroups.find(g => g.id === groupId);
    if (group) {
      setSelectedAudience(group.name);
      // If switching to a predefined group, clear selected users
      if (groupId !== 'selected') {
        setSelectedUsers([]);
      } else {
        // If switching to selected users, open the modal
        setShowUserModal(true);
      }
    }
  };

  // Toggle user selection
  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  // Select all users
  const selectAllUsers = () => {
    const allUserIds = users.map(u => u.id);
    setSelectedUsers(allUserIds);
  };

  // Clear all selected users
  const clearAllUsers = () => {
    setSelectedUsers([]);
  };

  // Send notification to selected audience
  const handleSendNotification = () => {
    const audienceName = selectedAudience;
    const userCount = getFilteredUsers.length;
    
    if (selectedAudience === 'Selected Users' && selectedUsers.length === 0) {
      showToast('Please select at least one user to send notification.', 'error');
      return;
    }
    
    showToast(
      `Sending notification to ${userCount} ${audienceName.toLowerCase()}! (Demo)`,
      'success'
    );
    
    // Here you would integrate with your backend API
    // await api.sendNotification({
    //   audience: audienceName,
    //   userIds: selectedAudience === 'Selected Users' ? selectedUsers : undefined,
    //   type: 'Push',
    //   title: 'Your Notification Title',
    //   message: 'Your Notification Message'
    // });
  };

  // Export audience data
  const handleExport = () => {
    try {
      const exportData = getFilteredUsers.map(user => ({
        'Name': user.name,
        'Email': user.email,
        'Type': user.type,
        'Bookings': user.bookings,
        'Status': user.status
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
      link.download = `audience_export_${selectedAudience.toLowerCase().replace(/\s/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast(`Successfully exported ${getFilteredUsers.length} users!`, 'success');
    } catch (err) {
      showToast('Error exporting data', 'error');
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div>
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 
            toast.type === 'info' ? 'bg-blue-500' : 'bg-red-500'
          } text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* User Selection Modal */}
      {showUserModal && (
        <UserSelectionModal
          users={users}
          selectedUsers={selectedUsers}
          onToggleUser={toggleUserSelection}
          onSelectAll={selectAllUsers}
          onClearAll={clearAllUsers}
          onClose={() => setShowUserModal(false)}
        />
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-red-50 to-amber-50 border border-red-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🎯</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Audience Targeting</h3>
            <p className="text-sm text-gray-500 mt-0.5">Send notifications to specific groups: all users, customers only, vendors only, or selected users</p>
          </div>
        </div>
      </div>

      {/* Audience Groups - 4 Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {audienceGroups.map((group) => (
          <div
            key={group.id}
            onClick={() => handleAudienceSelect(group.id)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${
              selectedAudience === group.name ? 'border-red-400 ring-2 ring-offset-1 ring-red-400 shadow-md' : 'border-gray-200'
            } cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                  {group.name}
                </p>
                <p className="text-2xl font-bold text-gray-800">{group.count}</p>
                {selectedAudience === group.name && (
                  <p className="text-[10px] text-red-500 font-bold mt-1">● Active</p>
                )}
              </div>
              <div className="text-2xl">{group.icon}</div>
            </div>
            <p className="text-[10px] text-gray-400 mt-2">{group.description}</p>
          </div>
        ))}
      </div>

      {/* Audience Preview Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.users} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Audience Preview</h3>
                <p className="text-xs text-gray-400">
                  {getFilteredUsers.length} users in {selectedAudience.toLowerCase()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedAudience === 'Selected Users' && (
                <button
                  onClick={() => setShowUserModal(true)}
                  className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  Manage Selection
                </button>
              )}
              <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <Icon d={ICONS.download} size={13} />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Bookings</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {getFilteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-12 text-center text-sm text-gray-400">
                    No users found for this audience group.
                    {selectedAudience === 'Selected Users' && (
                      <button
                        onClick={() => setShowUserModal(true)}
                        className="ml-2 text-red-600 font-semibold hover:underline"
                      >
                        Select users now
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                getFilteredUsers.slice(0, 5).map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${
                        user.type === 'Customer' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {user.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{user.bookings}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${
                        user.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-700'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {getFilteredUsers.length > 5 && (
            <div className="px-4 py-3 border-t border-gray-100 text-center text-xs text-gray-400">
              Showing 5 of {getFilteredUsers.length} users
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Send Notification Banner */}
        <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-5 border border-red-200">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">📨</div>
              <div>
                <p className="text-sm font-bold text-gray-800">Send Notification</p>
                <p className="text-xs text-gray-500">
                  To {selectedAudience} ({getFilteredUsers.length} users)
                </p>
              </div>
            </div>
            <button
              onClick={handleSendNotification}
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Send Now
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Audience Insights</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">Total Users</p>
              <p className="text-lg font-bold text-gray-800">{stats.totalUsers}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Users</p>
              <p className="text-lg font-bold text-green-600">{stats.activeUsers}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Customers</p>
              <p className="text-lg font-bold text-blue-600">{stats.customers}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Vendors</p>
              <p className="text-lg font-bold text-amber-600">{stats.vendors}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-500">Total Bookings</p>
              <p className="text-lg font-bold text-purple-600">{stats.totalBookings}</p>
            </div>
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
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #ccc;
        }
      `}</style>
    </div>
  );
};