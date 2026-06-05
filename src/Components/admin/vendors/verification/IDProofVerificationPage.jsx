import { useState, useMemo } from 'react';
import { Icon } from '../../shared/Icon';
import { VerificationBadge } from '../../shared/VerificationBadge';
import { FeatureCard } from '../../shared/FeatureCard';
import { idProofData } from '../../../../data/admin/vendors';
import { ICONS } from '../../../../constants/admin/icons';

export const IDProofVerificationPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [kycRecords, setKycRecords] = useState(idProofData);
  const [selectedRecord, setSelectedRecord] = useState(null);
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
    const total = kycRecords.length;
    const verified = kycRecords.filter(k => k.status === 'Verified').length;
    const pending = kycRecords.filter(k => k.status === 'Pending').length;
    const underReview = kycRecords.filter(k => k.status === 'Under Review').length;
    const rejected = kycRecords.filter(k => k.status === 'Rejected').length;
    return { total, verified, pending, underReview, rejected };
  }, [kycRecords]);

  const statCards = [
    { label: 'Total KYC Records', value: stats.total, icon: '🪪', color: 'border-violet-400', filter: 'All' },
    { label: 'KYC Verified', value: stats.verified, icon: '✅', color: 'border-green-400', filter: 'Verified' },
    { label: 'Pending / Review', value: stats.pending + stats.underReview, icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Rejected / Flagged', value: stats.rejected, icon: '🚫', color: 'border-red-400', filter: 'Rejected' },
  ];

  // Filter records based on status and search
  const filteredRecords = useMemo(() => {
    return kycRecords.filter(k => {
      let matchStatus = true;
      if (activeFilter === 'Pending') {
        matchStatus = k.status === 'Pending' || k.status === 'Under Review';
      } else {
        matchStatus = activeFilter === 'All' || k.status === activeFilter;
      }
      const matchSearch = !search || 
        k.vendor.toLowerCase().includes(search.toLowerCase()) || 
        k.owner.toLowerCase().includes(search.toLowerCase()) ||
        k.idType.toLowerCase().includes(search.toLowerCase()) ||
        k.idNo.toLowerCase().includes(search.toLowerCase()) ||
        k.id.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [kycRecords, activeFilter, search]);

  // Pagination
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage);
  const paginatedRecords = filteredRecords.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export to CSV
  const handleExportCSV = () => {
    try {
      const exportData = filteredRecords.map(k => ({
        'KYC ID': k.id,
        'Vendor Name': k.vendor,
        'Owner Name': k.owner,
        'ID Type': k.idType,
        'ID Number': k.idNo,
        'Date of Birth': k.dob,
        'Photo Match': k.photoMatch ? 'Yes' : 'No',
        'Status': k.status,
        'Submitted Date': k.submittedDate || 'N/A',
        'Verified Date': k.verifiedDate || 'N/A'
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
      link.download = `kyc_records_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToastMsg(`Successfully exported ${filteredRecords.length} KYC records!`, 'success');
    } catch (err) {
      showToastMsg('Error exporting data', 'error');
    }
  };

  // View KYC details
  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setShowViewModal(true);
  };

  // Approve KYC
  const handleApproveRecord = () => {
    if (selectedRecord) {
      setKycRecords(prev => prev.map(k => 
        k.id === selectedRecord.id 
          ? { 
              ...k, 
              status: 'Verified', 
              verifiedDate: new Date().toLocaleDateString(),
              approvedNotes: approveNotes,
              verifiedBy: 'Admin'
            }
          : k
      ));
      setShowApproveModal(false);
      setApproveNotes('');
      showToastMsg(`KYC for ${selectedRecord.vendor} has been approved!`, 'success');
    }
  };

  // Reject KYC
  const handleRejectRecord = () => {
    if (!rejectReason.trim()) {
      showToastMsg('Please provide a reason for rejection', 'warning');
      return;
    }
    
    if (selectedRecord) {
      setKycRecords(prev => prev.map(k => 
        k.id === selectedRecord.id 
          ? { 
              ...k, 
              status: 'Rejected', 
              rejectedDate: new Date().toLocaleDateString(),
              rejectionReason: rejectReason,
              rejectedBy: 'Admin'
            }
          : k
      ));
      setShowRejectModal(false);
      setRejectReason('');
      showToastMsg(`KYC for ${selectedRecord.vendor} has been rejected`, 'warning');
    }
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
    { emoji: '🪪', title: 'Accepted ID Documents', accentColor: 'bg-violet-50', points: ['Aadhaar Card', 'PAN Card', 'Passport', 'Driving License'] },
    { emoji: '🔍', title: 'Document Review Details', accentColor: 'bg-purple-50', points: ['Full name verification', 'ID number validation', 'Date of birth check', 'Photo identity matching'] },
    { emoji: '🤖', title: 'KYC Automation', accentColor: 'bg-indigo-50', points: ['HyperVerge / Signzy integration', 'Automated identity validation', 'Real-time mismatch detection', 'Impersonation prevention'] },
    { emoji: '🚨', title: 'Fraud Detection & Storage', accentColor: 'bg-red-50', points: ['Detect fake or duplicate IDs', 'Flag tampered documents', 'Secure encrypted storage', 'Restricted access controls'] }
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

      {/* View KYC Modal */}
      {showViewModal && selectedRecord && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowViewModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-lg font-bold text-gray-800">KYC Details</h3>
                <p className="text-sm text-gray-500">Complete identity verification information</p>
              </div>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                <div className={`w-16 h-16 rounded-xl ${selectedRecord.avatarBg} flex items-center justify-center text-white text-2xl font-bold`}>
                  {selectedRecord.vendor.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{selectedRecord.vendor}</h4>
                  <p className="text-sm text-gray-500">{selectedRecord.id}</p>
                  <VerificationBadge status={selectedRecord.status} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Owner Name</p>
                  <p className="text-sm font-medium text-gray-700">{selectedRecord.owner}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">ID Type</p>
                  <p className="text-sm font-medium text-gray-700">{selectedRecord.idType}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">ID Number</p>
                  <p className="text-sm font-mono font-medium text-gray-700">{selectedRecord.idNo}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Date of Birth</p>
                  <p className="text-sm font-medium text-gray-700">{selectedRecord.dob}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Photo Match</p>
                  <p className="text-sm font-medium text-gray-700">
                    {selectedRecord.photoMatch ? 
                      <span className="text-green-600 font-semibold">✓ Match</span> : 
                      <span className="text-red-600 font-semibold">✗ Mismatch</span>
                    }
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Submitted Date</p>
                  <p className="text-sm font-medium text-gray-700">{selectedRecord.submittedDate || '2024-01-15'}</p>
                </div>
              </div>
              {selectedRecord.rejectionReason && (
                <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                  <p className="text-xs text-red-600 font-semibold">Rejection Reason</p>
                  <p className="text-sm text-red-700">{selectedRecord.rejectionReason}</p>
                  <p className="text-xs text-red-500 mt-1">Rejected on: {selectedRecord.rejectedDate}</p>
                </div>
              )}
              {selectedRecord.approvedNotes && (
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <p className="text-xs text-green-600 font-semibold">Approval Notes</p>
                  <p className="text-sm text-green-700">{selectedRecord.approvedNotes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approve Modal */}
      {showApproveModal && selectedRecord && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowApproveModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 bg-green-50">
              <h3 className="text-lg font-bold text-green-800">Approve KYC</h3>
              <p className="text-sm text-green-600">Confirm approval for {selectedRecord.vendor}</p>
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
                <p className="text-xs text-green-700">✓ This KYC will be marked as Verified.</p>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowApproveModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
                <button onClick={handleApproveRecord} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Approve KYC</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && selectedRecord && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowRejectModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 bg-red-50">
              <h3 className="text-lg font-bold text-red-800">Reject KYC</h3>
              <p className="text-sm text-red-600">Confirm rejection for {selectedRecord.vendor}</p>
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
                <button onClick={handleRejectRecord} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Reject KYC</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🪪</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Verify: ID Proof</h3>
            <p className="text-sm text-gray-500 mt-0.5">Validate vendor identity through government-issued ID verification & KYC</p>
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
                <Icon d={ICONS.shield} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">ID Proof Verification Queue</h3>
                <p className="text-xs text-gray-400">{filteredRecords.length} record{filteredRecords.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `(filtered: ${activeFilter})` : 'total'}</p>
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
                placeholder="Search by vendor, owner name or ID type..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
              {['All','Verified','Pending','Under Review','Rejected'].map(f => (
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
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">KYC ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Vendor</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Owner Name</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">ID Type</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">ID Number</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Date of Birth</th>
                <th className="px-4 py-3 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Photo Match</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedRecords.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-sm text-gray-400">
                    No KYC records found for "{activeFilter}" filter.
                  </td>
                </tr>
              ) : (
                paginatedRecords.map(k => (
                  <tr key={k.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500 whitespace-nowrap">{k.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${k.avatarBg} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                          {k.vendor.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{k.vendor}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{k.owner}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-violet-50 text-violet-700">{k.idType}</span>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-600">{k.idNo}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{k.dob}</td>
                    <td className="px-4 py-3 text-center">
                      {k.photoMatch ? 
                        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">✅ Match</span> : 
                        <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">❌ Mismatch</span>
                      }
                    </td>
                    <td className="px-4 py-3"><VerificationBadge status={k.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => handleViewRecord(k)} 
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View ID">
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        {(k.status === 'Pending' || k.status === 'Under Review') && (
                          <>
                            <button 
                              onClick={() => {
                                setSelectedRecord(k);
                                setShowApproveModal(true);
                              }} 
                              className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                              title="Approve">
                              <Icon d={ICONS.check} size={14} />
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedRecord(k);
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
        {filteredRecords.length > 0 && totalPages > 1 && (
          <div className="px-5 py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredRecords.length)} of {filteredRecords.length} records
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
      
      {/* KYC Integration Info */}
      <div className="bg-violet-50 rounded-2xl border border-violet-200 p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-xl">🔐</span>
          <div>
            <p className="text-sm font-bold text-violet-800">KYC Integration & Photo Matching</p>
            <p className="text-xs text-violet-600 mt-1">ID verification is powered by third-party KYC providers (HyperVerge / Signzy). Photo identity matching is performed automatically to prevent impersonation. All ID documents are stored with encrypted, restricted access.</p>
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