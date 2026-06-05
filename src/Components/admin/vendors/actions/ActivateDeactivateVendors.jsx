import { useState, useMemo } from 'react';
import { Icon } from '../../shared/Icon';
import { StatusBadge } from '../../shared/StatusBadge';
import { FeatureCard } from '../../shared/FeatureCard';
import { ICONS } from '../../../../constants/admin/icons';

export const ActivateDeactivateVendors = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [vendors, setVendors] = useState([
    { id: 'VND001', name: 'LensArt Studio', category: 'Photography', location: 'Mumbai', lastActive: '1 day ago', reason: '—', status: 'Active', bookings: 124, avatarBg: 'bg-gradient-to-br from-pink-400 to-rose-400', email: 'contact@lensart.com', phone: '+91 98765 43210' },
    { id: 'VND002', name: 'Spice Route Caterers', category: 'Catering', location: 'Delhi', lastActive: '3 days ago', reason: 'Incomplete Documents', status: 'Inactive', bookings: 44, avatarBg: 'bg-gradient-to-br from-orange-400 to-amber-400', email: 'info@spiceroute.com', phone: '+91 87654 32100' },
    { id: 'VND003', name: 'Heritage Mahal', category: 'Wedding Halls', location: 'Jaipur', lastActive: '7 days ago', reason: 'Policy Violation', status: 'Suspended', bookings: 43, avatarBg: 'bg-gradient-to-br from-blue-400 to-indigo-400', email: 'heritage@mahal.com', phone: '+91 76543 21099' },
    { id: 'VND004', name: 'Beat Makers DJ', category: 'Entertainment', location: 'Bangalore', lastActive: '2 days ago', reason: '—', status: 'Active', bookings: 134, avatarBg: 'bg-gradient-to-br from-violet-400 to-purple-400', email: 'info@beatmakers.com', phone: '+91 65432 10988' },
    { id: 'VND005', name: 'Floral Dreams', category: 'Decorations', location: 'Chennai', lastActive: '14 days ago', reason: 'Low Performance', status: 'Inactive', bookings: 29, avatarBg: 'bg-gradient-to-br from-purple-400 to-pink-400', email: 'floral@dreams.com', phone: '+91 54321 09877' },
  ]);

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusReason, setStatusReason] = useState('');
  const [selectedVendors, setSelectedVendors] = useState([]);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkAction, setBulkAction] = useState('');
  const [bulkReason, setBulkReason] = useState('');
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
    const suspended = vendors.filter(v => v.status === 'Suspended').length;
    return { active, inactive, suspended };
  }, [vendors]);

  const statCards = [
    { label: 'Active Vendors', value: stats.active, icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Inactive Vendors', value: stats.inactive, icon: '⏸️', color: 'border-gray-400', filter: 'Inactive' },
    { label: 'Suspended', value: stats.suspended, icon: '🚫', color: 'border-red-400', filter: 'Suspended' },
    { label: 'Total Vendors', value: vendors.length, icon: '🏢', color: 'border-blue-400', filter: 'All' },
  ];

  // Filter vendors based on status and search
  const filteredVendors = useMemo(() => {
    return vendors.filter(v => {
      const matchStatus = activeFilter === 'All' || v.status === activeFilter;
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
        'Last Active': v.lastActive,
        'Deactivation Reason': v.reason !== '—' ? v.reason : '',
        'Total Bookings': v.bookings,
        'Status': v.status,
        'Email': v.email,
        'Phone': v.phone
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
      link.download = `vendors_status_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToastMsg(`Successfully exported ${filteredVendors.length} vendors!`, 'success');
    } catch (err) {
      showToastMsg('Error exporting data', 'error');
    }
  };

  // Toggle single vendor status
  const handleToggleStatus = (vendor, newStatusValue) => {
    setSelectedVendor(vendor);
    setNewStatus(newStatusValue);
    setShowStatusModal(true);
  };

  // Confirm status change
  const handleConfirmStatusChange = () => {
    if (selectedVendor) {
      let updatedReason = '';
      if (newStatus === 'Inactive') {
        updatedReason = statusReason || 'Manual deactivation';
      } else if (newStatus === 'Active') {
        updatedReason = '—';
      } else if (newStatus === 'Suspended') {
        updatedReason = statusReason || 'Policy violation';
      }

      setVendors(prev => prev.map(v => 
        v.id === selectedVendor.id 
          ? { 
              ...v, 
              status: newStatus, 
              reason: updatedReason,
              lastActive: new Date().toLocaleDateString(),
              statusChangedAt: new Date().toLocaleString()
            }
          : v
      ));
      
      setShowStatusModal(false);
      setStatusReason('');
      setNewStatus('');
      setSelectedVendor(null);
      showToastMsg(`${selectedVendor.name} status changed to ${newStatus}`, 'success');
    }
  };

  // Handle select all checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedVendors(paginatedVendors.map(v => v.id));
    } else {
      setSelectedVendors([]);
    }
  };

  // Handle single checkbox select
  const handleSelectVendor = (vendorId) => {
    if (selectedVendors.includes(vendorId)) {
      setSelectedVendors(prev => prev.filter(id => id !== vendorId));
    } else {
      setSelectedVendors(prev => [...prev, vendorId]);
    }
  };

  // Bulk action
  const handleBulkAction = () => {
    if (selectedVendors.length === 0) {
      showToastMsg('Please select at least one vendor', 'warning');
      return;
    }
    setShowBulkModal(true);
  };

  // Confirm bulk action
  const handleConfirmBulkAction = () => {
    const action = bulkAction;
    const reason = bulkReason;

    setVendors(prev => prev.map(v => {
      if (selectedVendors.includes(v.id)) {
        let updatedReason = '';
        if (action === 'deactivate') {
          updatedReason = reason || 'Bulk deactivation';
        } else if (action === 'activate') {
          updatedReason = '—';
        } else if (action === 'suspend') {
          updatedReason = reason || 'Bulk suspension';
        }
        
        return { 
          ...v, 
          status: action === 'activate' ? 'Active' : action === 'deactivate' ? 'Inactive' : 'Suspended',
          reason: updatedReason,
          lastActive: new Date().toLocaleDateString(),
          statusChangedAt: new Date().toLocaleString()
        };
      }
      return v;
    }));

    setShowBulkModal(false);
    setSelectedVendors([]);
    setBulkAction('');
    setBulkReason('');
    showToastMsg(`Bulk ${action} completed for ${selectedVendors.length} vendors`, 'success');
  };

  const statusColor = { 
    Active: 'bg-green-50 text-green-700 border-green-200', 
    Inactive: 'bg-gray-50 text-gray-500 border-gray-200', 
    Suspended: 'bg-red-50 text-red-700 border-red-200' 
  };

  const featureCards = [
    { emoji: '🔄', title: 'Status Control', accentColor: 'bg-green-50', points: ['Active: visible, receives bookings', 'Inactive: hidden from users', 'Suspended: restricted access', 'One-click toggle per vendor'] },
    { emoji: '⚡', title: 'Bulk Actions', accentColor: 'bg-blue-50', points: ['Activate multiple vendors at once', 'Bulk deactivation capability', 'Filter before bulk action', 'Efficient mass management'] },
    { emoji: '📋', title: 'Impact & History', accentColor: 'bg-amber-50', points: ['No new bookings when inactive', 'Existing bookings honoured', 'Full activation/deactivation log', 'Timestamps & admin details'] },
    { emoji: '🔔', title: 'Reactivation & Alerts', accentColor: 'bg-purple-50', points: ['Vendor reactivation requests', 'Issue resolution tracking', 'Status change notifications', 'Re-enable after compliance'] }
  ];

  // Reset to first page when filter or search changes
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    setSelectedVendors([]);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
    setSelectedVendors([]);
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

      {/* Status Change Modal */}
      {showStatusModal && selectedVendor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowStatusModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className={`p-4 border-b ${newStatus === 'Active' ? 'bg-green-50' : newStatus === 'Inactive' ? 'bg-gray-50' : 'bg-red-50'}`}>
              <h3 className={`text-lg font-bold ${newStatus === 'Active' ? 'text-green-800' : newStatus === 'Inactive' ? 'text-gray-800' : 'text-red-800'}`}>
                {newStatus === 'Active' ? 'Activate Vendor' : newStatus === 'Inactive' ? 'Deactivate Vendor' : 'Suspend Vendor'}
              </h3>
              <p className={`text-sm ${newStatus === 'Active' ? 'text-green-600' : newStatus === 'Inactive' ? 'text-gray-600' : 'text-red-600'}`}>
                {selectedVendor.name}
              </p>
            </div>
            <div className="p-5 space-y-4">
              {(newStatus === 'Inactive' || newStatus === 'Suspended') && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Reason *</label>
                  <textarea
                    value={statusReason}
                    onChange={(e) => setStatusReason(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                    placeholder={`Please provide a reason for ${newStatus === 'Inactive' ? 'deactivation' : 'suspension'}...`}
                  />
                </div>
              )}
              <div className={`rounded-lg p-3 ${newStatus === 'Active' ? 'bg-green-50' : newStatus === 'Inactive' ? 'bg-gray-50' : 'bg-red-50'}`}>
                <p className={`text-xs ${newStatus === 'Active' ? 'text-green-700' : newStatus === 'Inactive' ? 'text-gray-700' : 'text-red-700'}`}>
                  {newStatus === 'Active' 
                    ? '✓ This vendor will be able to receive new bookings.' 
                    : newStatus === 'Inactive' 
                    ? '⚠️ This vendor will be hidden from customer searches.' 
                    : '⚠️ This vendor will be restricted from platform access.'}
                </p>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowStatusModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={handleConfirmStatusChange} className={`flex-1 px-4 py-2 rounded-lg text-white ${
                  newStatus === 'Active' ? 'bg-green-600 hover:bg-green-700' : 
                  newStatus === 'Inactive' ? 'bg-gray-600 hover:bg-gray-700' : 
                  'bg-red-600 hover:bg-red-700'
                }`}>
                  Confirm {newStatus}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Action Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowBulkModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Bulk Action</h3>
              <p className="text-sm text-gray-500">Apply action to {selectedVendors.length} vendor(s)</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Select Action</label>
                <select
                  value={bulkAction}
                  onChange={(e) => setBulkAction(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option value="">Choose action...</option>
                  <option value="activate">Activate All</option>
                  <option value="deactivate">Deactivate All</option>
                  <option value="suspend">Suspend All</option>
                </select>
              </div>
              {(bulkAction === 'deactivate' || bulkAction === 'suspend') && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Reason</label>
                  <textarea
                    value={bulkReason}
                    onChange={(e) => setBulkReason(e.target.value)}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                    placeholder="Provide a reason for this bulk action..."
                  />
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowBulkModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={handleConfirmBulkAction} disabled={!bulkAction} className={`flex-1 px-4 py-2 rounded-lg text-white ${!bulkAction ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}>
                  Apply to {selectedVendors.length} Vendor(s)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-slate-50 to-gray-100 border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔄</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Activate / Deactivate Vendors</h3>
            <p className="text-sm text-gray-500 mt-0.5">Toggle vendor account status and manage their platform visibility</p>
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
                <Icon d={ICONS.toggle} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Vendor Status Control</h3>
                <p className="text-xs text-gray-400">{filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `(filtered: ${activeFilter})` : 'total'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedVendors.length > 0 && (
                <button onClick={handleBulkAction} className="text-xs bg-red-600 text-white font-semibold px-3 py-1.5 rounded-lg hover:bg-red-700">
                  Bulk Action ({selectedVendors.length})
                </button>
              )}
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
                placeholder="Search by vendor name, category or location..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
              {['All','Active','Inactive','Suspended'].map(f => (
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
                <th className="px-4 py-3 text-center w-10">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={paginatedVendors.length > 0 && selectedVendors.length === paginatedVendors.length}
                    className="rounded border-gray-300 cursor-pointer"
                  />
                </th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Vendor ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Business Name</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Category</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Location</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Last Active</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Deactivation Reason</th>
                <th className="px-4 py-3 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Bookings</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Quick Toggle</th>
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
                    <td className="px-4 py-3 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedVendors.includes(v.id)}
                        onChange={() => handleSelectVendor(v.id)}
                        className="rounded border-gray-300 cursor-pointer"
                      />
                    </td>
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
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{v.location}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{v.lastActive}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{v.reason !== '—' ? v.reason : '-'}</td>
                    <td className="px-4 py-3 text-center text-xs font-bold text-gray-700">{v.bookings}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusColor[v.status]}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {v.status === 'Active' && (
                          <>
                            <button 
                              onClick={() => handleToggleStatus(v, 'Inactive')}
                              className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                              title="Deactivate">
                              Deactivate
                            </button>
                            <button 
                              onClick={() => handleToggleStatus(v, 'Suspended')}
                              className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                              title="Suspend">
                              Suspend
                            </button>
                          </>
                        )}
                        {(v.status === 'Inactive' || v.status === 'Suspended') && (
                          <button 
                            onClick={() => handleToggleStatus(v, 'Active')}
                            className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                            title="Activate">
                            Activate
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