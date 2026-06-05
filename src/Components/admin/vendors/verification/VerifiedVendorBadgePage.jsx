import { useState, useMemo } from 'react';
import { Icon } from '../../shared/Icon';
import { StatusBadge } from '../../shared/StatusBadge';
import { FeatureCard } from '../../shared/FeatureCard';
import { verifiedVendorsData } from '../../../../data/admin/vendors';
import { ICONS } from '../../../../constants/admin/icons';

export const VerifiedVendorBadgePage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [vendors, setVendors] = useState(verifiedVendorsData);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [revokeReason, setRevokeReason] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Calculate real-time stats
  const stats = useMemo(() => {
    const total = vendors.length;
    const active = vendors.filter(v => v.status === 'Active').length;
    const inactive = vendors.filter(v => v.status === 'Inactive').length;
    const suspended = vendors.filter(v => v.status === 'Suspended').length;
    const reverificationNeeded = vendors.filter(v => v.reverificationNeeded === true).length;
    return { total, active, inactive, suspended, reverificationNeeded };
  }, [vendors]);

  const statCards = [
    { label: 'Total Verified Vendors', value: stats.total, icon: '✅', color: 'border-green-400', filter: 'All' },
    { label: 'Badges Assigned', value: stats.active, icon: '🏅', color: 'border-blue-400', filter: 'Active' },
    { label: 'Re-verification Needed', value: stats.reverificationNeeded, icon: '🔄', color: 'border-amber-400', filter: 'Re-verification Needed' },
    { label: 'Suspended (Badge Revoked)', value: stats.suspended, icon: '⛔', color: 'border-red-400', filter: 'Suspended' },
  ];

  // Filter vendors based on status and search
  const filteredVendors = useMemo(() => {
    return vendors.filter(v => {
      let matchStatus = true;
      if (activeFilter === 'Re-verification Needed') {
        matchStatus = v.reverificationNeeded === true;
      } else {
        matchStatus = activeFilter === 'All' || v.status === activeFilter;
      }
      const matchSearch = !search || 
        v.name.toLowerCase().includes(search.toLowerCase()) || 
        v.category.toLowerCase().includes(search.toLowerCase()) ||
        v.location.toLowerCase().includes(search.toLowerCase()) ||
        v.id.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [vendors, activeFilter, search]);

  // Pagination
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const paginatedVendors = filteredVendors.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export to CSV
  const handleExportCSV = () => {
    try {
      const exportData = filteredVendors.map(v => ({
        'Vendor ID': v.id,
        'Business Name': v.name,
        'Category': v.category,
        'Location': v.location,
        'Contact': v.contact,
        'Verified On': v.verifiedOn,
        'Rating': v.rating,
        'Total Bookings': v.bookings,
        'Status': v.status,
        'Reverification Needed': v.reverificationNeeded ? 'Yes' : 'No'
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
      link.download = `verified_vendors_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToastMsg(`Successfully exported ${filteredVendors.length} verified vendors!`, 'success');
    } catch (err) {
      showToastMsg('Error exporting data', 'error');
    }
  };

  // View vendor details
  const handleViewVendor = (vendor) => {
    setSelectedVendor(vendor);
    setShowViewModal(true);
  };

  // Edit vendor
  const handleEditVendor = (vendor) => {
    setEditingVendor({ ...vendor });
    setShowEditModal(true);
  };

  // Save edited vendor
  const handleSaveEdit = () => {
    if (editingVendor) {
      setVendors(prev => prev.map(v => 
        v.id === editingVendor.id 
          ? { ...editingVendor, lastUpdated: new Date().toLocaleDateString() }
          : v
      ));
      setShowEditModal(false);
      setEditingVendor(null);
      showToastMsg(`Vendor ${editingVendor.name} updated successfully!`, 'success');
    }
  };

  // Revoke/Suspend vendor badge
  const handleRevokeBadge = () => {
    if (!revokeReason.trim()) {
      showToastMsg('Please provide a reason for revoking the badge', 'warning');
      return;
    }
    
    if (selectedVendor) {
      setVendors(prev => prev.map(v => 
        v.id === selectedVendor.id 
          ? { 
              ...v, 
              status: 'Suspended', 
              badgeRevokedAt: new Date().toLocaleString(),
              badgeRevokeReason: revokeReason,
              lastUpdated: new Date().toLocaleDateString()
            }
          : v
      ));
      setShowRevokeModal(false);
      setRevokeReason('');
      showToastMsg(`Verified badge for ${selectedVendor.name} has been revoked`, 'warning');
    }
  };

  // Reactivate vendor badge
  const handleReactivateBadge = (vendor) => {
    setVendors(prev => prev.map(v => 
      v.id === vendor.id 
        ? { 
            ...v, 
            status: 'Active', 
            badgeReactivatedAt: new Date().toLocaleString(),
            lastUpdated: new Date().toLocaleDateString(),
            badgeRevokeReason: null
          }
        : v
    ));
    showToastMsg(`Verified badge for ${vendor.name} has been reactivated!`, 'success');
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

  const featureCards = [
    { emoji: '✅', title: 'Verified Vendor Listing', accentColor: 'bg-green-50', points: ['Complete list of approved vendors', 'Business name, category & location', 'Contact info & verification date', 'Verified badge display'] },
    { emoji: '📊', title: 'Performance Insights', accentColor: 'bg-blue-50', points: ['Customer ratings & reviews', 'Total completed bookings', 'Service quality metrics', 'Booking trend analysis'] },
    { emoji: '⚡', title: 'Quick Actions', accentColor: 'bg-amber-50', points: ['Deactivate or suspend vendor', 'View verification documents', 'Edit vendor profile details', 'Revoke verified badge'] },
    { emoji: '🔄', title: 'Compliance & Re-verification', accentColor: 'bg-purple-50', points: ['Monitor document expiry dates', 'Re-verification alerts for admins', 'Notify vendors for renewal', 'Export verified vendor reports'] }
  ];

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

      {/* View Vendor Modal */}
      {showViewModal && selectedVendor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowViewModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Verified Vendor Details</h3>
                <p className="text-sm text-gray-500">Complete vendor information</p>
              </div>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className={`w-16 h-16 rounded-xl ${selectedVendor.avatarBg} flex items-center justify-center text-white text-2xl font-bold`}>
                  {selectedVendor.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-bold text-gray-800">{selectedVendor.name}</h4>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">✅ Verified</span>
                  </div>
                  <p className="text-sm text-gray-500">{selectedVendor.id}</p>
                  <StatusBadge status={selectedVendor.status} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Category</p>
                  <p className="text-sm font-medium text-gray-700">{selectedVendor.category}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Location</p>
                  <p className="text-sm font-medium text-gray-700">{selectedVendor.location}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Contact</p>
                  <p className="text-sm font-medium text-gray-700">{selectedVendor.contact}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Verified On</p>
                  <p className="text-sm font-medium text-gray-700">{selectedVendor.verifiedOn}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Rating</p>
                  <p className="text-sm font-medium text-gray-700">⭐ {selectedVendor.rating} / 5.0</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Total Bookings</p>
                  <p className="text-sm font-medium text-gray-700">{selectedVendor.bookings}</p>
                </div>
              </div>
              {selectedVendor.badgeRevokeReason && (
                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <p className="text-xs text-red-600 font-semibold">Badge Revocation Reason</p>
                  <p className="text-sm text-red-700">{selectedVendor.badgeRevokeReason}</p>
                  <p className="text-xs text-red-500 mt-1">Revoked on: {selectedVendor.badgeRevokedAt}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Vendor Modal */}
      {showEditModal && editingVendor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Edit Verified Vendor</h3>
              <p className="text-sm text-gray-500">Update vendor information</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Business Name</label>
                <input
                  type="text"
                  value={editingVendor.name}
                  onChange={(e) => setEditingVendor({...editingVendor, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={editingVendor.category}
                  onChange={(e) => setEditingVendor({...editingVendor, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editingVendor.location}
                  onChange={(e) => setEditingVendor({...editingVendor, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Contact</label>
                <input
                  type="text"
                  value={editingVendor.contact}
                  onChange={(e) => setEditingVendor({...editingVendor, contact: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={editingVendor.status}
                  onChange={(e) => setEditingVendor({...editingVendor, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowEditModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={handleSaveEdit} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Revoke Badge Modal */}
      {showRevokeModal && selectedVendor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowRevokeModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 bg-red-50">
              <h3 className="text-lg font-bold text-red-800">Revoke Verified Badge</h3>
              <p className="text-sm text-red-600">Confirm revocation for {selectedVendor.name}</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Reason for Revocation *</label>
                <textarea
                  value={revokeReason}
                  onChange={(e) => setRevokeReason(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                  placeholder="Please provide a reason for revoking the verified badge..."
                />
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-xs text-red-700">⚠️ This action will remove the verified badge from this vendor and suspend their account.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowRevokeModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={handleRevokeBadge} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Revoke Badge</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">✅</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Assign: ✅ Verified Vendor Badge</h3>
            <p className="text-sm text-gray-500 mt-0.5">View all approved, verified vendors with trust badges and performance insights</p>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.userCheck} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Verified Vendor Listing</h3>
                <p className="text-xs text-gray-400">{filteredVendors.length} verified vendor{filteredVendors.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `(filtered: ${activeFilter})` : 'total'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFilter !== 'All' && (
                <button onClick={() => handleFilterChange('All')} 
                  className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100">
                  ✕ Clear Filter
                </button>
              )}
              <button onClick={handleExportCSV} 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700">
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
                placeholder="Search verified vendors by name, category or location..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
              {['All','Active','Inactive','Suspended','Re-verification Needed'].map(f => (
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
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Vendor ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Business Name</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Category</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Location</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Contact</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Verified On</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Rating</th>
                <th className="px-4 py-3 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Bookings</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Badge</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedVendors.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-12 text-center text-sm text-gray-400">
                    No verified vendors found for "{activeFilter}" filter.
                  </td>
                </tr>
              ) : (
                paginatedVendors.map(v => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">{v.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${v.avatarBg} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                          {v.name.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{v.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-red-50 text-red-700">{v.category}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{v.location}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{v.contact}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{v.verifiedOn}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400 text-sm">★</span>
                        <span className="text-xs font-bold text-gray-700">{v.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-xs font-bold text-gray-700">{v.bookings}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">✅ Verified</span>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => handleViewVendor(v)} 
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View Profile">
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        <button 
                          onClick={() => handleEditVendor(v)} 
                          className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"
                          title="Edit">
                          <Icon d={ICONS.edit} size={14} />
                        </button>
                        {v.status === 'Active' && (
                          <button 
                            onClick={() => {
                              setSelectedVendor(v);
                              setShowRevokeModal(true);
                            }} 
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                            title="Revoke Badge">
                            <Icon d={ICONS.ban} size={14} />
                          </button>
                        )}
                        {v.status === 'Suspended' && (
                          <button 
                            onClick={() => handleReactivateBadge(v)} 
                            className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                            title="Reactivate Badge">
                            <Icon d={ICONS.check} size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {filteredVendors.length > 0 && totalPages > 1 && (
          <div className="px-5 py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredVendors.length)} of {filteredVendors.length} verified vendors
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
      
      {/* Re-verification Alerts */}
      <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-xl">🔔</span>
          <div>
            <p className="text-sm font-bold text-amber-800">Re-verification Alerts</p>
            <p className="text-xs text-amber-600 mt-1">
              {stats.reverificationNeeded} verified vendors have documents (Business License, GST, or ID Proof) expiring within 60 days. 
              Admins have been alerted and vendors notified to submit updated documents for re-verification.
            </p>
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