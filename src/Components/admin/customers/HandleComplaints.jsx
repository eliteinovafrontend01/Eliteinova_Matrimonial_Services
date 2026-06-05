import { useState, useMemo } from 'react';
import { Icon } from '../shared/Icon';
import { FeatureCard } from '../shared/FeatureCard';
import { customerComplaintsData } from '../../../data/admin/customers';
import { ICONS } from '../../../constants/admin/icons';

export const HandleComplaints = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [complaints, setComplaints] = useState(customerComplaintsData);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Calculate real-time stats
  const stats = useMemo(() => {
    const open = complaints.filter(c => c.status === 'Open').length;
    const inProgress = complaints.filter(c => c.status === 'In Progress').length;
    const resolved = complaints.filter(c => c.status === 'Resolved').length;
    const escalated = complaints.filter(c => c.status === 'Escalated').length;
    return { open, inProgress, resolved, escalated };
  }, [complaints]);

  const statCards = [
    { label: 'Open Tickets', value: stats.open, icon: '🎫', color: 'border-red-400', filter: 'Open' },
    { label: 'In Progress', value: stats.inProgress, icon: '🔄', color: 'border-amber-400', filter: 'In Progress' },
    { label: 'Resolved Today', value: stats.resolved, icon: '✅', color: 'border-green-400', filter: 'Resolved' },
    { label: 'Escalated', value: stats.escalated, icon: '⚠️', color: 'border-purple-400', filter: 'Escalated' },
  ];

  // Filter complaints based on status and search
  const filteredComplaints = useMemo(() => {
    return complaints.filter(t => {
      const matchStatus = activeFilter === 'All' || t.status === activeFilter;
      const matchSearch = !search || 
        t.id.toLowerCase().includes(search.toLowerCase()) || 
        t.customer.toLowerCase().includes(search.toLowerCase()) || 
        t.issue.toLowerCase().includes(search.toLowerCase()) ||
        t.type.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [complaints, activeFilter, search]);

  // Pagination
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export to CSV
  const handleExportCSV = () => {
    try {
      const exportData = filteredComplaints.map(t => ({
        'Ticket ID': t.id,
        'Customer': t.customer,
        'Issue': t.issue,
        'Type': t.type,
        'Priority': t.priority,
        'Status': t.status,
        'Created': t.created,
        'Last Updated': t.lastUpdated || t.created
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
      link.download = `complaints_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToastMsg(`Successfully exported ${filteredComplaints.length} tickets!`, 'success');
    } catch (err) {
      showToastMsg('Error exporting data', 'error');
    }
  };

  // View complaint details
  const handleViewComplaint = (complaint) => {
    setSelectedComplaint(complaint);
    setShowViewModal(true);
  };

  // Edit complaint
  const handleEditComplaint = (complaint) => {
    setEditingComplaint({ ...complaint });
    setShowEditModal(true);
  };

  // Save edited complaint
  const handleSaveEdit = () => {
    if (editingComplaint) {
      setComplaints(prev => prev.map(c => 
        c.id === editingComplaint.id ? { ...editingComplaint, lastUpdated: new Date().toLocaleDateString() } : c
      ));
      setShowEditModal(false);
      setEditingComplaint(null);
      showToastMsg(`Ticket ${editingComplaint.id} updated successfully!`, 'success');
    }
  };

  // Change complaint status
  const handleStatusChange = (complaintId, newStatus) => {
    setComplaints(prev => prev.map(c => 
      c.id === complaintId ? { ...c, status: newStatus, lastUpdated: new Date().toLocaleDateString() } : c
    ));
    const complaint = complaints.find(c => c.id === complaintId);
    if (complaint) {
      showToastMsg(`Ticket ${complaint.id} status changed to ${newStatus}`, 'success');
    }
  };

  // Send reply to customer
  const handleSendReply = () => {
    if (!replyMessage.trim()) {
      showToastMsg('Please enter a reply message', 'warning');
      return;
    }
    
    setComplaints(prev => prev.map(c => 
      c.id === selectedComplaint?.id ? { 
        ...c, 
        status: 'In Progress',
        lastUpdated: new Date().toLocaleDateString(),
        reply: replyMessage,
        replyDate: new Date().toLocaleString()
      } : c
    ));
    
    setShowReplyModal(false);
    setReplyMessage('');
    showToastMsg(`Reply sent for ticket ${selectedComplaint?.id}`, 'success');
  };

  // Escalate complaint
  const handleEscalate = (complaintId) => {
    setComplaints(prev => prev.map(c => 
      c.id === complaintId ? { ...c, status: 'Escalated', escalatedAt: new Date().toLocaleString(), lastUpdated: new Date().toLocaleDateString() } : c
    ));
    const complaint = complaints.find(c => c.id === complaintId);
    showToastMsg(`Ticket ${complaint?.id} has been escalated`, 'warning');
  };

  // Resolve complaint
  const handleResolve = (complaintId) => {
    setComplaints(prev => prev.map(c => 
      c.id === complaintId ? { ...c, status: 'Resolved', resolvedAt: new Date().toLocaleString(), lastUpdated: new Date().toLocaleDateString() } : c
    ));
    const complaint = complaints.find(c => c.id === complaintId);
    showToastMsg(`Ticket ${complaint?.id} has been resolved`, 'success');
  };

  const pColor = { 
    High: 'text-amber-600 bg-amber-50', 
    Critical: 'text-red-600 bg-red-50', 
    Medium: 'text-blue-600 bg-blue-50', 
    Low: 'text-gray-500 bg-gray-50' 
  };
  
  const sColor = { 
    Open: 'text-red-700 bg-red-50 border-red-200', 
    'In Progress': 'text-purple-700 bg-purple-50 border-purple-200', 
    Resolved: 'text-green-700 bg-green-50 border-green-200', 
    Escalated: 'text-amber-700 bg-amber-50 border-amber-200' 
  };
  
  const featureCards = [
    { emoji: '⚖️', title: 'Dispute Management', accentColor: 'bg-red-50', points: ['Customer vs vendor conflicts', 'Evidence review & logs', 'Fair resolution enforcement', 'Outcome documentation'] },
    { emoji: '🔍', title: 'Compliance Monitoring', accentColor: 'bg-blue-50', points: ['Policy violation detection', 'Terms of service enforcement', 'User behaviour audits', 'Blacklist management'] },
    { emoji: '🛡️', title: 'KYC & Verification Checks', accentColor: 'bg-green-50', points: ['OTP & ID proof review', 'Fake account detection', 'Document authenticity check', 'Re-verification triggers'] },
    { emoji: '🚨', title: 'Escalation Handling', accentColor: 'bg-purple-50', points: ['Route to senior admins', 'Priority flagging system', 'SLA breach monitoring', 'Management notifications'] }
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

      {/* View Complaint Modal */}
      {showViewModal && selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowViewModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Ticket Details</h3>
                <p className="text-sm text-gray-500">Complete complaint information</p>
              </div>
              <button onClick={() => setShowViewModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{selectedComplaint.id}</h4>
                  <p className="text-sm text-gray-500">Ticket ID</p>
                </div>
                <span className={`text-[11px] font-semibold border px-2.5 py-0.5 rounded-full ${sColor[selectedComplaint.status]}`}>
                  {selectedComplaint.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Customer</p>
                  <p className="text-sm font-medium text-gray-700">{selectedComplaint.customer}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Issue Type</p>
                  <p className="text-sm font-medium text-gray-700">{selectedComplaint.type}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Priority</p>
                  <p className={`text-sm font-bold ${selectedComplaint.priority === 'Critical' ? 'text-red-600' : selectedComplaint.priority === 'High' ? 'text-amber-600' : 'text-blue-600'}`}>
                    {selectedComplaint.priority}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Created On</p>
                  <p className="text-sm font-medium text-gray-700">{selectedComplaint.created}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 col-span-2">
                  <p className="text-xs text-gray-400 uppercase font-semibold">Issue Description</p>
                  <p className="text-sm font-medium text-gray-700 mt-1">{selectedComplaint.issue}</p>
                </div>
                {selectedComplaint.reply && (
                  <div className="bg-blue-50 rounded-lg p-3 col-span-2">
                    <p className="text-xs text-gray-500 uppercase font-semibold">Admin Reply</p>
                    <p className="text-sm font-medium text-gray-700 mt-1">{selectedComplaint.reply}</p>
                    <p className="text-xs text-gray-400 mt-1">Sent on: {selectedComplaint.replyDate}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Complaint Modal */}
      {showEditModal && editingComplaint && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowEditModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Edit Ticket</h3>
              <p className="text-sm text-gray-500">Update ticket information</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Issue Description</label>
                <textarea
                  value={editingComplaint.issue}
                  onChange={(e) => setEditingComplaint({...editingComplaint, issue: e.target.value})}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
                <select
                  value={editingComplaint.priority}
                  onChange={(e) => setEditingComplaint({...editingComplaint, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={editingComplaint.status}
                  onChange={(e) => setEditingComplaint({...editingComplaint, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Escalated">Escalated</option>
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

      {/* Reply Modal */}
      {showReplyModal && selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowReplyModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Reply to Customer</h3>
              <p className="text-sm text-gray-500">Ticket: {selectedComplaint.id}</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Your Reply</label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                  placeholder="Type your response here..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowReplyModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleSendReply} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Send Reply</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🎫</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Handle Complaints</h3>
            <p className="text-sm text-gray-500 mt-0.5">Manage customer complaints, track resolution progress, and ensure timely responses</p>
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
                <Icon d={ICONS.complaints} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Support Ticket Management</h3>
                <p className="text-xs text-gray-400">{filteredComplaints.length} ticket{filteredComplaints.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `— ${activeFilter}` : 'all tickets'}</p>
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
                placeholder="Search tickets by ID, customer name or issue type..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
              {['All','Open','In Progress','Resolved','Escalated'].map(f => (
                <button key={f} onClick={() => handleFilterChange(f)} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-gray-50">
          {paginatedComplaints.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-gray-400">No tickets found for this filter.</div>
          ) : (
            paginatedComplaints.map(t => (
              <div key={t.id} className="px-5 py-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                <span className="text-xs font-mono text-gray-400 flex-shrink-0">{t.id}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{t.issue}</p>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-xs text-gray-400">{t.customer}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{t.type}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{t.created}</span>
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${pColor[t.priority]}`}>{t.priority}</span>
                <span className={`text-[11px] font-semibold border px-2.5 py-0.5 rounded-full ${sColor[t.status]}`}>{t.status}</span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button 
                    onClick={() => handleViewComplaint(t)} 
                    className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                    title="View Details">
                    <Icon d={ICONS.eye} size={14} />
                  </button>
                  <button 
                    onClick={() => handleEditComplaint(t)} 
                    className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"
                    title="Edit Ticket">
                    <Icon d={ICONS.edit} size={14} />
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedComplaint(t);
                      setShowReplyModal(true);
                    }} 
                    className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                    title="Reply">
                    <Icon d={ICONS.message} size={14} />
                  </button>
                  {t.status !== 'Escalated' && t.status !== 'Resolved' && (
                    <button 
                      onClick={() => handleEscalate(t.id)} 
                      className="p-1.5 rounded-lg hover:bg-purple-50 text-purple-500 transition-colors"
                      title="Escalate">
                      ⚠️
                    </button>
                  )}
                  {t.status !== 'Resolved' && t.status !== 'Escalated' && (
                    <button 
                      onClick={() => handleResolve(t.id)} 
                      className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                      title="Resolve">
                      ✅
                    </button>
                  )}
                  <select
                    value={t.status}
                    onChange={(e) => handleStatusChange(t.id, e.target.value)}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-red-300 cursor-pointer"
                    title="Change Status">
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Escalated">Escalated</option>
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Pagination */}
        {filteredComplaints.length > 0 && totalPages > 1 && (
          <div className="px-5 py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-gray-400">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredComplaints.length)} of {filteredComplaints.length} tickets
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