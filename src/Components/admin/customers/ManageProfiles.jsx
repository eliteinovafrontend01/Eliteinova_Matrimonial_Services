import { useState, useMemo } from 'react';
import { Icon } from '../shared/Icon';
import { StatusBadge } from '../shared/StatusBadge';
import { FeatureCard } from '../shared/FeatureCard';
import { profileData } from '../../../data/admin/customers';
import { ICONS } from '../../../constants/admin/icons';

export const ManageProfiles = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [profiles, setProfiles] = useState(profileData);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Calculate real-time stats
  const stats = useMemo(() => {
    const total = profiles.length;
    const active = profiles.filter(p => p.status === 'Active').length;
    const pending = profiles.filter(p => p.status === 'Pending').length;
    const blocked = profiles.filter(p => p.status === 'Blocked').length;
    const verified = profiles.filter(p => p.verified === true).length;
    const updatedToday = profiles.filter(p => p.lastUpdate === '1 day ago' || p.lastUpdate === '2 days ago').length;
    return { total, active, pending, blocked, verified, updatedToday };
  }, [profiles]);

  const statCards = [
    { label: 'Total Profiles', value: stats.total.toLocaleString(), icon: '👥', color: 'border-blue-400', filterValue: 'All' },
    { label: 'Profiles Updated Today', value: stats.updatedToday.toLocaleString(), icon: '✏️', color: 'border-teal-400', filterValue: 'Updated Today' },
    { label: 'KYC Verified', value: stats.verified.toLocaleString(), icon: '🛡️', color: 'border-green-400', filterValue: 'Verified' },
    { label: 'Pending Verification', value: stats.pending.toLocaleString(), icon: '⏳', color: 'border-amber-400', filterValue: 'Pending' },
  ];

  // Filter profiles based on status and search
  const filteredProfiles = useMemo(() => {
    return profiles.filter(p => {
      let matchStatus = true;
      
      if (activeFilter === 'Verified') {
        matchStatus = p.verified === true;
      } else if (activeFilter === 'Pending') {
        matchStatus = p.status === 'Pending';
      } else if (activeFilter === 'Active') {
        matchStatus = p.status === 'Active';
      } else if (activeFilter === 'Blocked') {
        matchStatus = p.status === 'Blocked';
      } else if (activeFilter === 'Updated Today') {
        matchStatus = p.lastUpdate === '1 day ago' || p.lastUpdate === '2 days ago';
      } else if (activeFilter !== 'All') {
        matchStatus = p.status === activeFilter;
      }
      
      const matchSearch = !search || 
        p.name.toLowerCase().includes(search.toLowerCase()) || 
        p.email.toLowerCase().includes(search.toLowerCase()) || 
        p.location.toLowerCase().includes(search.toLowerCase()) ||
        p.phone.includes(search) ||
        p.id.toLowerCase().includes(search.toLowerCase());
      
      return matchStatus && matchSearch;
    });
  }, [profiles, activeFilter, search]);

  // Pagination
  const totalPages = Math.ceil(filteredProfiles.length / itemsPerPage);
  const paginatedProfiles = filteredProfiles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export to CSV
  const handleExportCSV = () => {
    try {
      const exportData = filteredProfiles.map(p => ({
        'Profile ID': p.id,
        'Name': p.name,
        'Email': p.email,
        'Phone': p.phone,
        'Location': p.location,
        'Registered Date': p.registered,
        'Last Update': p.lastUpdate,
        'Status': p.status,
        'Verified': p.verified ? 'Yes' : 'No',
        'Total Bookings': p.bookings
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
      link.download = `profiles_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToastMsg(`Successfully exported ${filteredProfiles.length} profiles!`, 'success');
    } catch (err) {
      showToastMsg('Error exporting data', 'error');
    }
  };

  // View profile details
  const handleViewProfile = (profile) => {
    setSelectedProfile(profile);
    setShowViewModal(true);
  };

  // Edit profile
  const handleEditProfile = (profile) => {
    setEditingProfile({ ...profile });
    setShowEditModal(true);
  };

  // Save edited profile
  const handleSaveEdit = () => {
    if (editingProfile) {
      setProfiles(prev => prev.map(p => 
        p.id === editingProfile.id ? { ...editingProfile, lastUpdate: 'Today' } : p
      ));
      setShowEditModal(false);
      setEditingProfile(null);
      showToastMsg(`Profile ${editingProfile.name} updated successfully!`, 'success');
    }
  };

  // Change profile status
  const handleStatusChange = (profileId, newStatus) => {
    setProfiles(prev => prev.map(p => 
      p.id === profileId ? { ...p, status: newStatus, lastUpdate: 'Today' } : p
    ));
    const profile = profiles.find(p => p.id === profileId);
    if (profile) {
      showToastMsg(`Profile ${profile.name} status changed to ${newStatus}`, 'success');
    }
  };

  // Toggle verification status
  const handleToggleVerification = (profileId, currentStatus) => {
    setProfiles(prev => prev.map(p => 
      p.id === profileId ? { ...p, verified: !currentStatus, lastUpdate: 'Today' } : p
    ));
    const profile = profiles.find(p => p.id === profileId);
    showToastMsg(`${profile?.name} verification ${!currentStatus ? 'approved' : 'revoked'}`, 'success');
  };

  const featureCards = [
    { emoji: '✏️', title: 'Edit & Update Information', accentColor: 'bg-blue-50', points: ['Modify names & contact info', 'Update location details', 'Change profile photo', 'Correct verification records'] },
    { emoji: '🎯', title: 'Personalization Settings', accentColor: 'bg-purple-50', points: ['Tailor vendor recommendations', 'Match budget-based suggestions', 'Date & location-aware results', 'Style preference matching'] },
    { emoji: '🛡️', title: 'Verification Status', accentColor: 'bg-green-50', points: ['Mobile OTP verification', 'KYC / ID proof status', 'Flag unverified accounts', 'Trigger re-verification'] },
    { emoji: '📊', title: 'Activity Tracking', accentColor: 'bg-amber-50', points: ['Profile update history', 'Preference change logs', 'Admin action audit trail', 'Transparency reporting'] }
  ];

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

  // Reset to first page when filter or search changes
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Get preview profile (first profile or selected one)
  const previewProfile = selectedProfile || (profiles[0] || null);

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

      {/* View Profile Modal */}
      {showViewModal && selectedProfile && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowViewModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Profile Details</h3>
                <p className="text-sm text-gray-500">Complete profile information</p>
              </div>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-2xl font-bold">
                  {selectedProfile.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{selectedProfile.name}</h4>
                  <p className="text-sm text-gray-500">{selectedProfile.id}</p>
                  <StatusBadge status={selectedProfile.status} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Email</p>
                  <p className="text-sm font-medium text-gray-700 break-all">{selectedProfile.email}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Phone</p>
                  <p className="text-sm font-medium text-gray-700">{selectedProfile.phone}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Location</p>
                  <p className="text-sm font-medium text-gray-700">{selectedProfile.location}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Registered On</p>
                  <p className="text-sm font-medium text-gray-700">{selectedProfile.registered}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Last Update</p>
                  <p className="text-sm font-medium text-gray-700">{selectedProfile.lastUpdate}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Total Bookings</p>
                  <p className="text-sm font-medium text-gray-700">{selectedProfile.bookings}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Verification Status</p>
                  <p className="text-sm font-medium text-gray-700">{selectedProfile.verified ? '✓ Verified' : 'Unverified'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && editingProfile && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Edit Profile</h3>
              <p className="text-sm text-gray-500">Update profile information</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingProfile.name}
                  onChange={(e) => setEditingProfile({...editingProfile, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editingProfile.email}
                  onChange={(e) => setEditingProfile({...editingProfile, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={editingProfile.phone}
                  onChange={(e) => setEditingProfile({...editingProfile, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editingProfile.location}
                  onChange={(e) => setEditingProfile({...editingProfile, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={editingProfile.status}
                  onChange={(e) => setEditingProfile({...editingProfile, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Inactive">Inactive</option>
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
          <div className="text-4xl">👤</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Manage Profiles</h3>
            <p className="text-sm text-gray-500 mt-0.5">Manage customer profiles, update information, verify KYC, and track activity</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} onClick={() => handleFilterChange(s.filterValue)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${activeFilter === s.filterValue ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-gray-800">{s.value}</p>
                {activeFilter === s.filterValue && <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Main Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.edit} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Customer Profiles</h3>
                <p className="text-xs text-gray-400">{filteredProfiles.length} profile{filteredProfiles.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `(filtered: ${activeFilter === 'Verified' ? 'KYC Verified' : activeFilter === 'Updated Today' ? 'Recently Updated' : activeFilter === 'Pending' ? 'Pending Verification' : activeFilter})` : 'total'}</p>
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
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon d={ICONS.search} size={15} />
              </span>
              <input 
                value={search} 
                onChange={handleSearchChange} 
                type="text" 
                placeholder="Search by name, email, phone or location..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
              {['All','Active','Pending','Blocked','Verified','Updated Today'].map(f => (
                <button key={f} onClick={() => handleFilterChange(f)} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  {f === 'Updated Today' ? '📅 Updated Today' : f}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Profile ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Name</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Email</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Phone</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Location</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Registered</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Last Update</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Verified</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Bookings</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedProfiles.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-12 text-center text-sm text-gray-400">
                    No profiles found for this filter.
                  </td>
                </tr>
              ) : (
                paginatedProfiles.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">{p.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                          {p.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-gray-600 truncate max-w-[180px]" title={p.email}>{p.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-gray-400 whitespace-nowrap">{p.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{p.location}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{p.registered}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{p.lastUpdate}</td>
                    <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleVerification(p.id, p.verified)}
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-colors ${
                          p.verified ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' : 'text-gray-400 bg-gray-50 hover:bg-gray-100'
                        }`}>
                        {p.verified ? '✓ Verified' : 'Unverified'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-xs font-bold text-gray-700 text-center">{p.bookings}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => handleViewProfile(p)} 
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View Details">
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        <button onClick={() => handleEditProfile(p)} 
                          className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"
                          title="Edit Profile">
                          <Icon d={ICONS.edit} size={14} />
                        </button>
                        <select
                          value={p.status}
                          onChange={(e) => handleStatusChange(p.id, e.target.value)}
                          className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-300 cursor-pointer"
                          title="Change Status">
                          <option value="Active">Active</option>
                          <option value="Pending">Pending</option>
                          <option value="Blocked">Blocked</option>
                          <option value="Inactive">Inactive</option>
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
        {filteredProfiles.length > 0 && totalPages > 1 && (
          <div className="px-5 py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProfiles.length)} of {filteredProfiles.length} profiles
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
      
      {/* Profile Preview and Preferences Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
        <div className="xl:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center text-sm">👤</span>
            Customer Profile View
          </h4>
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-xl font-bold mb-2">
              {previewProfile?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <p className="font-bold text-gray-800 text-sm">{previewProfile?.name}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full mt-1 ${previewProfile?.verified ? 'text-green-600 bg-green-50' : 'text-gray-500 bg-gray-50'}`}>
              {previewProfile?.verified ? '✓ Verified' : 'Unverified'}
            </span>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Email', value: previewProfile?.email },
              { label: 'Phone', value: previewProfile?.phone },
              { label: 'Location', value: previewProfile?.location },
              { label: 'Registered', value: previewProfile?.registered },
              { label: 'Total Bookings', value: `${previewProfile?.bookings} bookings` }
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50">
                <span className="text-xs text-gray-400">{f.label}</span>
                <span className="text-xs font-semibold text-gray-700 truncate ml-2">{f.value}</span>
              </div>
            ))}
          </div>
          <button 
            onClick={() => previewProfile && handleEditProfile(previewProfile)}
            className="w-full mt-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5">
            <Icon d={ICONS.edit} size={13} /> Edit Profile
          </button>
        </div>
        
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-sm">⚙️</span>
            Preference Management
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Preferred Services', value: 'Photography, Catering, Decoration', icon: '💍' },
              { label: 'Budget Range', value: '₹5,00,000 – ₹10,00,000', icon: '💰' },
              { label: 'Event Date', value: 'March 2025', icon: '📅' },
              { label: 'Location Preference', value: 'Mumbai & Nearby', icon: '📍' },
              { label: 'Style / Theme', value: 'Traditional with Modern Touches', icon: '🎨' },
              { label: 'Guest Count', value: '300 – 500 guests', icon: '👥' }
            ].map((p, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{p.icon}</span>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{p.label}</span>
                </div>
                <p className="text-xs font-semibold text-gray-700">{p.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs font-bold text-blue-700 mb-1">🔒 Privacy & Data Control</p>
            <p className="text-xs text-blue-600">Customer data is encrypted and handled per platform privacy policy. Profile visibility and data sharing controls are managed per user consent.</p>
          </div>
        </div>
      </div>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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