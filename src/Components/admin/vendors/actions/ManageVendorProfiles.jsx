import { useState, useMemo } from 'react';
import { Icon } from '../../shared/Icon';
import { StatusBadge } from '../../shared/StatusBadge';
import { FeatureCard } from '../../shared/FeatureCard';
import { manageProfileData } from '../../../../data/admin/vendors';
import { ICONS } from '../../../../constants/admin/icons';

export const ManageVendorProfiles = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [vendors, setVendors] = useState(manageProfileData);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [deactivateReason, setDeactivateReason] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Calculate real-time stats
  const stats = useMemo(() => {
    const active = vendors.filter(v => v.status === 'Active').length;
    const inactive = vendors.filter(v => v.status === 'Inactive').length;
    const pending = vendors.filter(v => v.status === 'Pending').length;
    const totalServices = vendors.reduce((sum, v) => sum + (v.services || 0), 0);
    return { active, inactive, pending, totalServices };
  }, [vendors]);

  const statCards = [
    { label: 'Active Vendors', value: stats.active, icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Inactive Vendors', value: stats.inactive, icon: '⏸️', color: 'border-gray-400', filter: 'Inactive' },
    { label: 'Services Listed', value: stats.totalServices.toLocaleString(), icon: '🗂️', color: 'border-purple-400', filter: null },
    { label: 'Pending Verification', value: stats.pending, icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
  ];

  // Filter vendors based on status and search
  const filteredVendors = useMemo(() => {
    return vendors.filter(v => {
      const matchStatus = activeFilter === 'All' || v.status === activeFilter;
      const matchSearch = !search || 
        v.name.toLowerCase().includes(search.toLowerCase()) || 
        v.category.toLowerCase().includes(search.toLowerCase()) ||
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
        'Services': v.services,
        'Last Updated': v.lastUpdated,
        'Rating': v.rating,
        'Total Bookings': v.bookings,
        'Status': v.status,
        'Verified': v.verified ? 'Yes' : 'No'
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
      link.download = `vendors_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToastMsg(`Successfully exported ${filteredVendors.length} vendors!`, 'success');
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

  // Verify vendor
  const handleVerifyVendor = (vendor) => {
    setVendors(prev => prev.map(v => 
      v.id === vendor.id 
        ? { ...v, verified: true, status: 'Active', lastUpdated: new Date().toLocaleDateString() }
        : v
    ));
    showToastMsg(`${vendor.name} has been verified!`, 'success');
  };

  // Deactivate vendor
  const handleDeactivateVendor = () => {
    if (!deactivateReason.trim()) {
      showToastMsg('Please provide a reason for deactivation', 'warning');
      return;
    }
    
    if (selectedVendor) {
      setVendors(prev => prev.map(v => 
        v.id === selectedVendor.id 
          ? { 
              ...v, 
              status: 'Inactive', 
              deactivatedAt: new Date().toLocaleString(),
              deactivationReason: deactivateReason,
              lastUpdated: new Date().toLocaleDateString()
            }
          : v
      ));
      setShowDeactivateModal(false);
      setDeactivateReason('');
      showToastMsg(`${selectedVendor.name} has been deactivated`, 'warning');
    }
  };

  // Activate vendor
  const handleActivateVendor = (vendor) => {
    setVendors(prev => prev.map(v => 
      v.id === vendor.id 
        ? { ...v, status: 'Active', lastUpdated: new Date().toLocaleDateString() }
        : v
    ));
    showToastMsg(`${vendor.name} has been activated!`, 'success');
  };

  const featureCards = [
    { emoji: '✏️', title: 'Edit & Update Profile', accentColor: 'bg-blue-50', points: ['Modify services offered', 'Update pricing & packages', 'Edit business details & contact', 'Change service area & location'] },
    { emoji: '🖼️', title: 'Portfolio Management', accentColor: 'bg-purple-50', points: ['Add/update portfolio images', 'Upload showcase videos', 'Remove outdated content', 'Maintain quality presentation'] },
    { emoji: '📅', title: 'Availability & Service Control', accentColor: 'bg-green-50', points: ['Enable or disable services', 'Update availability schedules', 'Manage concurrent bookings', 'Calendar integration control'] },
    { emoji: '📊', title: 'Performance & Audit Logs', accentColor: 'bg-amber-50', points: ['Track ratings & reviews', 'Monitor completed bookings', 'Maintain admin notes & logs', 'Profile update audit trail'] }
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

      {/* View Vendor Modal */}
      {showViewModal && selectedVendor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowViewModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Vendor Details</h3>
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
                  <h4 className="text-xl font-bold text-gray-800">{selectedVendor.name}</h4>
                  <p className="text-sm text-gray-500">{selectedVendor.id}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge status={selectedVendor.status} />
                    {selectedVendor.verified && (
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">✓ Verified</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Category</p>
                  <p className="text-sm font-medium text-gray-700">{selectedVendor.category}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Services Offered</p>
                  <p className="text-sm font-medium text-gray-700">{selectedVendor.services}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Rating</p>
                  <p className="text-sm font-medium text-gray-700">⭐ {selectedVendor.rating}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Total Bookings</p>
                  <p className="text-sm font-medium text-gray-700">{selectedVendor.bookings}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Last Updated</p>
                  <p className="text-sm font-medium text-gray-700">{selectedVendor.lastUpdated}</p>
                </div>
              </div>
              {selectedVendor.deactivationReason && (
                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <p className="text-xs text-red-600 font-semibold">Deactivation Reason</p>
                  <p className="text-sm text-red-700">{selectedVendor.deactivationReason}</p>
                  <p className="text-xs text-red-500 mt-1">Deactivated on: {selectedVendor.deactivatedAt}</p>
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
              <h3 className="text-lg font-bold text-gray-800">Edit Vendor</h3>
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
                <label className="block text-sm font-semibold text-gray-700 mb-1">Services Count</label>
                <input
                  type="number"
                  value={editingVendor.services}
                  onChange={(e) => setEditingVendor({...editingVendor, services: parseInt(e.target.value)})}
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
                  <option value="Pending">Pending</option>
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

      {/* Deactivate Modal */}
      {showDeactivateModal && selectedVendor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowDeactivateModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 bg-red-50">
              <h3 className="text-lg font-bold text-red-800">Deactivate Vendor</h3>
              <p className="text-sm text-red-600">Confirm deactivation for {selectedVendor.name}</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Reason for Deactivation *</label>
                <textarea
                  value={deactivateReason}
                  onChange={(e) => setDeactivateReason(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                  placeholder="Please provide a reason for deactivation..."
                />
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-xs text-red-700">⚠️ This action will make the vendor inactive. They can be reactivated later.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowDeactivateModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={handleDeactivateVendor} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Deactivate Vendor</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">⚙️</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Manage Vendor Profiles</h3>
            <p className="text-sm text-gray-500 mt-0.5">Edit, update and control all vendor profile information and settings</p>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} onClick={() => s.filter && handleFilterChange(s.filter)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} ${s.filter ? 'cursor-pointer' : 'cursor-default'} transition-all duration-200 hover:shadow-md ${s.filter ? 'hover:-translate-y-0.5' : ''} ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-gray-800">{s.value}</p>
                {activeFilter === s.filter && s.filter && <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>}
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
                <h3 className="font-bold text-gray-800 text-base">All Vendor Profiles</h3>
                <p className="text-xs text-gray-400">{filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `(filtered: ${activeFilter})` : 'total'}</p>
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
                placeholder="Search by vendor name, category or status..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
              {['All','Active','Inactive','Pending'].map(f => (
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
                <th className="px-4 py-3 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Services</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Last Updated</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Rating</th>
                <th className="px-4 py-3 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Bookings</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Verified</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedVendors.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-sm text-gray-400">
                    No vendors found for "{activeFilter}" filter.
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
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs font-bold text-blue-600">{v.services}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{v.lastUpdated}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-amber-400 text-sm">★</span>
                        <span className="text-xs font-bold text-gray-700">{v.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs font-bold text-gray-700">{v.bookings}</span>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                    <td className="px-4 py-3">
                      {v.verified ? 
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">✅ Verified</span> : 
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">Pending</span>
                      }
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => handleViewVendor(v)} 
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View Details">
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        <button 
                          onClick={() => handleEditVendor(v)} 
                          className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"
                          title="Edit Vendor">
                          <Icon d={ICONS.edit} size={14} />
                        </button>
                        {!v.verified && v.status === 'Pending' && (
                          <button 
                            onClick={() => handleVerifyVendor(v)} 
                            className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                            title="Verify Vendor">
                            <Icon d={ICONS.shield} size={14} />
                          </button>
                        )}
                        {v.status === 'Active' && (
                          <button 
                            onClick={() => {
                              setSelectedVendor(v);
                              setShowDeactivateModal(true);
                            }} 
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                            title="Deactivate">
                            <Icon d={ICONS.ban} size={14} />
                          </button>
                        )}
                        {v.status === 'Inactive' && (
                          <button 
                            onClick={() => handleActivateVendor(v)} 
                            className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                            title="Activate">
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
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredVendors.length)} of {filteredVendors.length} vendors
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