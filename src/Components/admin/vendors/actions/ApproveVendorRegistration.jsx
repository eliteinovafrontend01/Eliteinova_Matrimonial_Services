import { useState, useMemo } from 'react';
import { Icon } from '../../shared/Icon';
import { FeatureCard } from '../../shared/FeatureCard';
import { ICONS } from '../../../../constants/admin/icons';

export const ApproveVendorRegistration = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [applications, setApplications] = useState([
    { id: 'APP001', name: 'Sunrise Photography', category: 'Photography', contact: 'Arjun Mehta', phone: '+91 98765 43210', email: 'arjun@sunrisephoto.com', location: 'Mumbai', submitted: '20 Mar 2024', status: 'Pending', docs: 4, avatarBg: 'bg-gradient-to-br from-pink-400 to-rose-400', description: 'Professional photography services for weddings and events.', experience: '5 years' },
    { id: 'APP002', name: 'Spice Route Caterers', category: 'Catering', contact: 'Priya Sharma', phone: '+91 87654 32100', email: 'priya@spiceroute.com', location: 'Delhi', submitted: '19 Mar 2024', status: 'Under Review', docs: 5, avatarBg: 'bg-gradient-to-br from-orange-400 to-amber-400', description: 'Authentic Indian catering services.', experience: '8 years' },
    { id: 'APP003', name: 'Elite Banquet Hall', category: 'Wedding Halls', contact: 'Rajesh Verma', phone: '+91 76543 21099', email: 'rajesh@elitebanquet.com', location: 'Jaipur', submitted: '18 Mar 2024', status: 'Pending', docs: 3, avatarBg: 'bg-gradient-to-br from-blue-400 to-cyan-400', description: 'Luxury banquet hall for weddings and events.', experience: '10 years' },
    { id: 'APP004', name: 'Beat Makers DJ', category: 'Entertainment', contact: 'Kiran Rao', phone: '+91 65432 10988', email: 'kiran@beatmakers.com', location: 'Bangalore', submitted: '17 Mar 2024', status: 'Approved', docs: 5, avatarBg: 'bg-gradient-to-br from-violet-400 to-purple-400', description: 'Professional DJ and music entertainment.', experience: '6 years' },
    { id: 'APP005', name: 'Floral Dreams Decor', category: 'Decorations', contact: 'Meena Pillai', phone: '+91 54321 09877', email: 'meena@floraldreams.com', location: 'Chennai', submitted: '16 Mar 2024', status: 'Rejected', docs: 2, avatarBg: 'bg-gradient-to-br from-purple-400 to-pink-400', description: 'Beautiful floral decorations for all occasions.', experience: '4 years' },
  ]);

  const [selectedApplication, setSelectedApplication] = useState(null);
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
    const total = applications.length;
    const pending = applications.filter(a => a.status === 'Pending').length;
    const underReview = applications.filter(a => a.status === 'Under Review').length;
    const approved = applications.filter(a => a.status === 'Approved').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;
    return { total, pending, underReview, approved, rejected };
  }, [applications]);

  const statCards = [
    { label: 'Total Applications', value: stats.total, icon: '📋', color: 'border-blue-400', filter: 'All' },
    { label: 'Pending Review', value: stats.pending, icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Under Review', value: stats.underReview, icon: '🔄', color: 'border-purple-400', filter: 'Under Review' },
    { label: 'Approved', value: stats.approved, icon: '✅', color: 'border-green-400', filter: 'Approved' },
    { label: 'Rejected', value: stats.rejected, icon: '❌', color: 'border-red-400', filter: 'Rejected' },
  ];

  // Filter applications based on status and search
  const filteredApplications = useMemo(() => {
    return applications.filter(a => {
      const matchStatus = activeFilter === 'All' || a.status === activeFilter;
      const matchSearch = !search || 
        a.name.toLowerCase().includes(search.toLowerCase()) || 
        a.category.toLowerCase().includes(search.toLowerCase()) ||
        a.contact.toLowerCase().includes(search.toLowerCase()) ||
        a.location.toLowerCase().includes(search.toLowerCase()) ||
        a.id.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [applications, activeFilter, search]);

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
  const paginatedApplications = filteredApplications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export to CSV
  const handleExportCSV = () => {
    try {
      const exportData = filteredApplications.map(a => ({
        'Application ID': a.id,
        'Business Name': a.name,
        'Category': a.category,
        'Contact Person': a.contact,
        'Phone': a.phone,
        'Email': a.email,
        'Location': a.location,
        'Submitted Date': a.submitted,
        'Status': a.status,
        'Documents': a.docs,
        'Experience': a.experience
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
      link.download = `vendor_applications_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToastMsg(`Successfully exported ${filteredApplications.length} applications!`, 'success');
    } catch (err) {
      showToastMsg('Error exporting data', 'error');
    }
  };

  // View application details
  const handleViewApplication = (app) => {
    setSelectedApplication(app);
    setShowViewModal(true);
  };

  // Approve application
  const handleApproveApplication = () => {
    if (selectedApplication) {
      setApplications(prev => prev.map(a => 
        a.id === selectedApplication.id 
          ? { ...a, status: 'Approved', approvedAt: new Date().toLocaleString(), approvedNotes: approveNotes }
          : a
      ));
      setShowApproveModal(false);
      setApproveNotes('');
      showToastMsg(`${selectedApplication.name} has been approved!`, 'success');
    }
  };

  // Reject application
  const handleRejectApplication = () => {
    if (!rejectReason.trim()) {
      showToastMsg('Please provide a reason for rejection', 'warning');
      return;
    }
    
    if (selectedApplication) {
      setApplications(prev => prev.map(a => 
        a.id === selectedApplication.id 
          ? { ...a, status: 'Rejected', rejectedAt: new Date().toLocaleString(), rejectionReason: rejectReason }
          : a
      ));
      setShowRejectModal(false);
      setRejectReason('');
      showToastMsg(`${selectedApplication.name} has been rejected`, 'warning');
    }
  };

  const statusColor = { 
    'Pending': 'bg-amber-50 text-amber-700 border-amber-200', 
    'Under Review': 'bg-blue-50 text-blue-700 border-blue-200', 
    'Approved': 'bg-green-50 text-green-700 border-green-200', 
    'Rejected': 'bg-red-50 text-red-700 border-red-200' 
  };

  const featureCards = [
    { emoji: '📋', title: 'Registration Request Review', accentColor: 'bg-amber-50', points: ['View all incoming applications', 'Complete business & contact details', 'Submitted document listing', 'Application timestamp tracking'] },
    { emoji: '📁', title: 'Document Verification', accentColor: 'bg-blue-50', points: ['Business registration certificate', 'Government ID & address proof', 'Service portfolio review', 'License validation (if applicable)'] },
    { emoji: '✅', title: 'Approval / Rejection Actions', accentColor: 'bg-green-50', points: ['Approve to activate vendor account', 'Reject with valid stated reasons', 'Request additional documents', 'Trigger re-submission workflows'] },
    { emoji: '🔔', title: 'Notification & Remarks', accentColor: 'bg-purple-50', points: ['Auto-notify via email & SMS', 'In-app status notifications', 'Add internal admin remarks', 'Future reference audit notes'] }
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

      {/* View Application Modal */}
      {showViewModal && selectedApplication && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowViewModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Application Details</h3>
                <p className="text-sm text-gray-500">Complete vendor registration information</p>
              </div>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className={`w-16 h-16 rounded-xl ${selectedApplication.avatarBg} flex items-center justify-center text-white text-2xl font-bold`}>
                  {selectedApplication.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{selectedApplication.name}</h4>
                  <p className="text-sm text-gray-500">{selectedApplication.id}</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusColor[selectedApplication.status]}`}>
                    {selectedApplication.status}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Category</p>
                  <p className="text-sm font-medium text-gray-700">{selectedApplication.category}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Experience</p>
                  <p className="text-sm font-medium text-gray-700">{selectedApplication.experience}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Contact Person</p>
                  <p className="text-sm font-medium text-gray-700">{selectedApplication.contact}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Phone</p>
                  <p className="text-sm font-medium text-gray-700">{selectedApplication.phone}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Email</p>
                  <p className="text-sm font-medium text-gray-700">{selectedApplication.email}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Location</p>
                  <p className="text-sm font-medium text-gray-700">{selectedApplication.location}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Submitted On</p>
                  <p className="text-sm font-medium text-gray-700">{selectedApplication.submitted}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Documents</p>
                  <p className="text-sm font-medium text-gray-700">{selectedApplication.docs} files uploaded</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Business Description</p>
                  <p className="text-sm font-medium text-gray-700">{selectedApplication.description}</p>
                </div>
              </div>
              {selectedApplication.rejectionReason && (
                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <p className="text-xs text-red-600 font-semibold">Rejection Reason</p>
                  <p className="text-sm text-red-700">{selectedApplication.rejectionReason}</p>
                </div>
              )}
              {selectedApplication.approvedNotes && (
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-xs text-green-600 font-semibold">Approval Notes</p>
                  <p className="text-sm text-green-700">{selectedApplication.approvedNotes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && selectedApplication && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowApproveModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 bg-green-50">
              <h3 className="text-lg font-bold text-green-800">Approve Application</h3>
              <p className="text-sm text-green-600">Confirm approval for {selectedApplication.name}</p>
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
                <p className="text-xs text-green-700">✓ This vendor will be approved and can start onboarding.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowApproveModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={handleApproveApplication} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Approve Application</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedApplication && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowRejectModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 bg-red-50">
              <h3 className="text-lg font-bold text-red-800">Reject Application</h3>
              <p className="text-sm text-red-600">Confirm rejection for {selectedApplication.name}</p>
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
                <p className="text-xs text-red-700">⚠️ This action cannot be undone. The vendor will be notified.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowRejectModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={handleRejectApplication} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Reject Application</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📝</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Approve Vendor Registration</h3>
            <p className="text-sm text-gray-500 mt-0.5">Review, verify and approve incoming vendor registration requests</p>
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
                <Icon d={ICONS.document} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Registration Request Review</h3>
                <p className="text-xs text-gray-400">{filteredApplications.length} application{filteredApplications.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `(filtered: ${activeFilter})` : 'total'}</p>
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
                placeholder="Search by business name, category or contact..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
              {['All','Pending','Under Review','Approved','Rejected'].map(f => (
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
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">App. ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Business Name</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Category</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Contact Person</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Location</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Submitted</th>
                <th className="px-4 py-3 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Docs</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedApplications.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-sm text-gray-400">
                    No applications found for "{activeFilter}" filter.
                  </td>
                </tr>
              ) : (
                paginatedApplications.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">{a.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${a.avatarBg} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                          {a.name.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{a.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-red-50 text-red-700">{a.category}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs font-semibold text-gray-700">{a.contact}</div>
                      <div className="text-xs text-gray-400">{a.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600">{a.location}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{a.submitted}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{a.docs} files</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusColor[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => handleViewApplication(a)} 
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View Details">
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        {a.status !== 'Approved' && a.status !== 'Rejected' && (
                          <>
                            <button 
                              onClick={() => {
                                setSelectedApplication(a);
                                setShowApproveModal(true);
                              }} 
                              className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                              title="Approve">
                              <Icon d={ICONS.check} size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedApplication(a);
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
        {filteredApplications.length > 0 && totalPages > 1 && (
          <div className="px-5 py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredApplications.length)} of {filteredApplications.length} applications
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
      
      {/* Document Verification Checklist */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <h4 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-sm">📁</span>
          Document Verification Checklist
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {[
            { doc: 'Business Registration Certificate', icon: '🏢', status: 'Required' },
            { doc: 'Government ID Proof', icon: '🪪', status: 'Required' },
            { doc: 'Address Proof', icon: '📍', status: 'Required' },
            { doc: 'Service Portfolio (Images/Videos)', icon: '🖼️', status: 'Required' },
            { doc: 'Applicable Licenses', icon: '📄', status: 'If Applicable' },
            { doc: 'GST Certificate', icon: '🧾', status: 'Required' }
          ].map((d, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-lg">{d.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-700 truncate">{d.doc}</p>
                <p className="text-[10px] text-gray-400">{d.status}</p>
              </div>
              <span className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0"></span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Notification Info */}
      <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-xl">🔔</span>
          <div>
            <p className="text-sm font-bold text-blue-800">Automated Notification System</p>
            <p className="text-xs text-blue-600 mt-1">Vendors are automatically notified about their application status changes via Email, SMS, and In-App notifications. Admin remarks are included in rejection notifications.</p>
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