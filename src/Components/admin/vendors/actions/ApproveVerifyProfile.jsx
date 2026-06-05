import { useState, useMemo } from 'react';
import { Icon } from '../../shared/Icon';
import { FeatureCard } from '../../shared/FeatureCard';
import { ICONS } from '../../../../constants/admin/icons';

export const ApproveVerifyProfile = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [profiles, setProfiles] = useState([
    { id: 'VND001', name: 'LensArt Studio', category: 'Photography', owner: 'Deepak Shah', location: 'Mumbai', experience: '8 years', status: 'Under Review', portfolio: true, kyc: true, license: false, avatarBg: 'bg-gradient-to-br from-pink-400 to-rose-400', submittedAt: '2024-01-15', description: 'Professional photography services for weddings and events.' },
    { id: 'VND002', name: 'Royal Feast Caterers', category: 'Catering', owner: 'Sunita Reddy', location: 'Delhi', experience: '12 years', status: 'Verified', portfolio: true, kyc: true, license: true, avatarBg: 'bg-gradient-to-br from-orange-400 to-amber-400', submittedAt: '2024-01-10', description: 'Premium catering services for all occasions.' },
    { id: 'VND003', name: 'Heritage Mahal', category: 'Wedding Halls', owner: 'Anil Choudhary', location: 'Jaipur', experience: '5 years', status: 'Pending Verification', portfolio: true, kyc: false, license: true, avatarBg: 'bg-gradient-to-br from-blue-400 to-indigo-400', submittedAt: '2024-01-18', description: 'Luxury wedding venue with traditional ambiance.' },
    { id: 'VND004', name: 'DJ Rhythm Pro', category: 'Entertainment', owner: 'Vikram Nair', location: 'Bangalore', experience: '6 years', status: 'Rejected', portfolio: false, kyc: true, license: false, avatarBg: 'bg-gradient-to-br from-violet-400 to-purple-400', submittedAt: '2024-01-12', description: 'Professional DJ and entertainment services.' },
    { id: 'VND005', name: 'Grand Palace', category: 'Wedding Halls', owner: 'Rajesh Khanna', location: 'Mumbai', experience: '15 years', status: 'Pending Verification', portfolio: true, kyc: true, license: true, avatarBg: 'bg-gradient-to-br from-emerald-400 to-teal-400', submittedAt: '2024-01-20', description: 'Grand venue for weddings and corporate events.' },
  ]);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [approveNotes, setApproveNotes] = useState('');
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
    const pending = profiles.filter(p => p.status === 'Pending Verification').length;
    const underReview = profiles.filter(p => p.status === 'Under Review').length;
    const verified = profiles.filter(p => p.status === 'Verified').length;
    const rejected = profiles.filter(p => p.status === 'Rejected').length;
    return { total, pending, underReview, verified, rejected };
  }, [profiles]);

  const statCards = [
    { label: 'Total Profiles', value: stats.total, icon: '🏢', color: 'border-blue-400', filter: 'All' },
    { label: 'Pending Verification', value: stats.pending, icon: '⏳', color: 'border-amber-400', filter: 'Pending Verification' },
    { label: 'Under Review', value: stats.underReview, icon: '🔄', color: 'border-purple-400', filter: 'Under Review' },
    { label: 'Verified & Live', value: stats.verified, icon: '✅', color: 'border-green-400', filter: 'Verified' },
    { label: 'Rejected', value: stats.rejected, icon: '❌', color: 'border-red-400', filter: 'Rejected' },
  ];

  // Filter profiles based on status and search
  const filteredProfiles = useMemo(() => {
    return profiles.filter(v => {
      const matchStatus = activeFilter === 'All' || v.status === activeFilter;
      const matchSearch = !search || 
        v.name.toLowerCase().includes(search.toLowerCase()) || 
        v.category.toLowerCase().includes(search.toLowerCase()) ||
        v.owner.toLowerCase().includes(search.toLowerCase()) ||
        v.location.toLowerCase().includes(search.toLowerCase()) ||
        v.id.toLowerCase().includes(search.toLowerCase());
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
      const exportData = filteredProfiles.map(v => ({
        'Vendor ID': v.id,
        'Business Name': v.name,
        'Category': v.category,
        'Owner': v.owner,
        'Location': v.location,
        'Experience': v.experience,
        'Portfolio': v.portfolio ? 'Yes' : 'No',
        'KYC': v.kyc ? 'Yes' : 'No',
        'License': v.license ? 'Yes' : 'No',
        'Status': v.status,
        'Submitted Date': v.submittedAt
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
      link.download = `vendor_profiles_export_${new Date().toISOString().split('T')[0]}.csv`;
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

  // Approve profile
  const handleApproveProfile = () => {
    if (selectedProfile) {
      setProfiles(prev => prev.map(p => 
        p.id === selectedProfile.id 
          ? { ...p, status: 'Verified', approvedAt: new Date().toLocaleString(), approvedNotes: approveNotes }
          : p
      ));
      setShowApproveModal(false);
      setApproveNotes('');
      showToastMsg(`${selectedProfile.name} has been approved and verified!`, 'success');
    }
  };

  // Reject profile
  const handleRejectProfile = () => {
    if (!rejectReason.trim()) {
      showToastMsg('Please provide a reason for rejection', 'warning');
      return;
    }
    
    if (selectedProfile) {
      setProfiles(prev => prev.map(p => 
        p.id === selectedProfile.id 
          ? { ...p, status: 'Rejected', rejectedAt: new Date().toLocaleString(), rejectionReason: rejectReason }
          : p
      ));
      setShowRejectModal(false);
      setRejectReason('');
      showToastMsg(`${selectedProfile.name} has been rejected`, 'warning');
    }
  };

  const statusColor = { 
    'Pending Verification': 'bg-amber-50 text-amber-700 border-amber-200', 
    'Under Review': 'bg-blue-50 text-blue-700 border-blue-200', 
    'Verified': 'bg-green-50 text-green-700 border-green-200', 
    'Rejected': 'bg-red-50 text-red-700 border-red-200' 
  };

  const featureCards = [
    { emoji: '👤', title: 'Profile Review', accentColor: 'bg-blue-50', points: ['Business name & category details', 'Contact info & location review', 'Service offerings overview', 'Previous work experience check'] },
    { emoji: '📁', title: 'Document Verification', accentColor: 'bg-green-50', points: ['Business registration certificate', 'Government ID & address proof', 'Licenses & certifications', 'Portfolio images & videos'] },
    { emoji: '🔍', title: 'KYC & Quality Assessment', accentColor: 'bg-purple-50', points: ['Third-party KYC verification', 'Portfolio & experience review', 'Pricing standards assessment', 'Platform quality compliance'] },
    { emoji: '📋', title: 'Audit Logs & Notifications', accentColor: 'bg-amber-50', points: ['Internal admin remarks & notes', 'Full verification audit history', 'Auto-notify on approval/rejection', 'Required update notifications'] }
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

      {/* View Profile Modal */}
      {showViewModal && selectedProfile && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowViewModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Vendor Profile Details</h3>
                <p className="text-sm text-gray-500">Complete vendor information</p>
              </div>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className={`w-16 h-16 rounded-xl ${selectedProfile.avatarBg} flex items-center justify-center text-white text-2xl font-bold`}>
                  {selectedProfile.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{selectedProfile.name}</h4>
                  <p className="text-sm text-gray-500">{selectedProfile.id}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColor[selectedProfile.status]}`}>
                    {selectedProfile.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Category</p>
                  <p className="text-sm font-medium text-gray-700">{selectedProfile.category}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Owner</p>
                  <p className="text-sm font-medium text-gray-700">{selectedProfile.owner}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Location</p>
                  <p className="text-sm font-medium text-gray-700">{selectedProfile.location}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Experience</p>
                  <p className="text-sm font-medium text-gray-700">{selectedProfile.experience}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Submitted On</p>
                  <p className="text-sm font-medium text-gray-700">{selectedProfile.submittedAt}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Description</p>
                  <p className="text-sm font-medium text-gray-700">{selectedProfile.description}</p>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Verification Status</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className={`p-3 rounded-lg ${selectedProfile.portfolio ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className="text-2xl">{selectedProfile.portfolio ? '✓' : '✗'}</p>
                    <p className="text-xs font-semibold">Portfolio</p>
                  </div>
                  <div className={`p-3 rounded-lg ${selectedProfile.kyc ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className="text-2xl">{selectedProfile.kyc ? '✓' : '✗'}</p>
                    <p className="text-xs font-semibold">KYC</p>
                  </div>
                  <div className={`p-3 rounded-lg ${selectedProfile.license ? 'bg-green-50' : 'bg-red-50'}`}>
                    <p className="text-2xl">{selectedProfile.license ? '✓' : '✗'}</p>
                    <p className="text-xs font-semibold">License</p>
                  </div>
                </div>
              </div>
              {selectedProfile.rejectionReason && (
                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <p className="text-xs text-red-600 font-semibold">Rejection Reason</p>
                  <p className="text-sm text-red-700">{selectedProfile.rejectionReason}</p>
                </div>
              )}
              {selectedProfile.approvedNotes && (
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-xs text-green-600 font-semibold">Approval Notes</p>
                  <p className="text-sm text-green-700">{selectedProfile.approvedNotes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && selectedProfile && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowApproveModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 bg-green-50">
              <h3 className="text-lg font-bold text-green-800">Approve Vendor Profile</h3>
              <p className="text-sm text-green-600">Confirm approval for {selectedProfile.name}</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Approval Notes (Optional)</label>
                <textarea
                  value={approveNotes}
                  onChange={(e) => setApproveNotes(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-100"
                  placeholder="Add any notes about this approval..."
                />
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-xs text-green-700">✓ This vendor will be marked as Verified and will go live on the platform immediately.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowApproveModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={handleApproveProfile} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Approve & Verify</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedProfile && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowRejectModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 bg-red-50">
              <h3 className="text-lg font-bold text-red-800">Reject Vendor Profile</h3>
              <p className="text-sm text-red-600">Confirm rejection for {selectedProfile.name}</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Rejection Reason *</label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                  placeholder="Please provide a reason for rejection..."
                />
              </div>
              <div className="bg-red-50 rounded-lg p-3">
                <p className="text-xs text-red-700">⚠️ This action cannot be undone. The vendor will be notified of the rejection reason.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowRejectModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={handleRejectProfile} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Reject Profile</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">✅</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Approve & Verify Vendor Profile</h3>
            <p className="text-sm text-gray-500 mt-0.5">Review vendor profiles and approve/reject for platform listing</p>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
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
                <h3 className="font-bold text-gray-800 text-base">Vendor Profile Verification Queue</h3>
                <p className="text-xs text-gray-400">{filteredProfiles.length} profile{filteredProfiles.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `(filtered: ${activeFilter})` : 'total'}</p>
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
                placeholder="Search by vendor name, category or owner..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
              {['All','Pending Verification','Under Review','Verified','Rejected'].map(f => (
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
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Owner</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Location</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Experience</th>
                <th className="px-4 py-3 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Portfolio</th>
                <th className="px-4 py-3 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">KYC</th>
                <th className="px-4 py-3 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">License</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedProfiles.length === 0 ? (
                <tr>
                  <td colSpan={11} className="px-4 py-12 text-center text-sm text-gray-400">
                    No profiles found for "{activeFilter}" filter.
                  </td>
                </tr>
              ) : (
                paginatedProfiles.map(v => (
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
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{v.owner}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{v.location}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{v.experience}</td>
                    <td className="px-4 py-3 text-center">
                      {v.portfolio ? <span className="text-green-600 text-sm">✓</span> : <span className="text-red-400 text-sm">✗</span>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {v.kyc ? <span className="text-green-600 text-sm">✓</span> : <span className="text-red-400 text-sm">✗</span>}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {v.license ? <span className="text-green-600 text-sm">✓</span> : <span className="text-red-400 text-sm">✗</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusColor[v.status]}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => handleViewProfile(v)} 
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View Details">
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        {v.status !== 'Verified' && v.status !== 'Rejected' && (
                          <>
                            <button 
                              onClick={() => {
                                setSelectedProfile(v);
                                setShowApproveModal(true);
                              }} 
                              className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                              title="Approve">
                              <Icon d={ICONS.check} size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedProfile(v);
                                setShowRejectModal(true);
                              }} 
                              className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                              title="Reject">
                              <Icon d={ICONS.x} size={14} />
                            </button>
                          </>
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