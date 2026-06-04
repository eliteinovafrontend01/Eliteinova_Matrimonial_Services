// src/pages/admin/complaints/StatusTracking.jsx
import { useState, useMemo } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const StatusTracking = () => {
  const [complaints, setComplaints] = useState([
    { id: 'CMP001', ticketId: 'TKT001', customer: 'Aarav Patel', issue: 'Vendor no-show on event day', status: 'Open', priority: 'High', created: '2024-01-15 10:30', lastUpdate: '2024-01-15 10:30', history: [{ status: 'Open', timestamp: '2024-01-15 10:30', note: 'Complaint registered' }] },
    { id: 'CMP002', ticketId: 'TKT002', customer: 'Ishita Reddy', issue: 'Payment deducted but booking not confirmed', status: 'In Progress', priority: 'Critical', created: '2024-01-14 09:15', lastUpdate: '2024-01-15 14:20', history: [{ status: 'Open', timestamp: '2024-01-14 09:15', note: 'Complaint registered' }, { status: 'In Progress', timestamp: '2024-01-15 14:20', note: 'Verified with payment gateway' }] },
    { id: 'CMP003', ticketId: 'TKT003', customer: 'Rohan Deshmukh', issue: 'Decoration quality below expectations', status: 'Resolved', priority: 'Medium', created: '2024-01-13 16:45', lastUpdate: '2024-01-14 11:30', history: [{ status: 'Open', timestamp: '2024-01-13 16:45', note: 'Complaint registered' }, { status: 'In Progress', timestamp: '2024-01-14 09:00', note: 'Contacted vendor' }, { status: 'Resolved', timestamp: '2024-01-14 11:30', note: 'Partial refund issued' }] },
    { id: 'CMP004', ticketId: 'TKT004', customer: 'Neha Gupta', issue: 'Refund not received after cancellation', status: 'Escalated', priority: 'Critical', created: '2024-01-11 08:00', lastUpdate: '2024-01-15 09:00', history: [{ status: 'Open', timestamp: '2024-01-11 08:00', note: 'Complaint registered' }, { status: 'In Progress', timestamp: '2024-01-12 10:00', note: 'Finance team notified' }, { status: 'Escalated', timestamp: '2024-01-15 09:00', note: 'Escalated to senior management' }] },
    { id: 'CMP005', ticketId: 'TKT005', customer: 'Vikram Singh', issue: 'Wrong makeup artist assigned', status: 'Closed', priority: 'High', created: '2024-01-10 13:20', lastUpdate: '2024-01-13 17:00', history: [{ status: 'Open', timestamp: '2024-01-10 13:20', note: 'Complaint registered' }, { status: 'In Progress', timestamp: '2024-01-11 11:00', note: 'Vendor responded' }, { status: 'Resolved', timestamp: '2024-01-12 15:00', note: 'Replacement arranged' }, { status: 'Closed', timestamp: '2024-01-13 17:00', note: 'Customer confirmed satisfaction' }] },
  ]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedComplaintForNote, setSelectedComplaintForNote] = useState(null);
  const [statusNote, setStatusNote] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const statusColors = {
    Open: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    'In Progress': { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', dot: 'bg-purple-500' },
    Resolved: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
    Escalated: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
    Closed: { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200', dot: 'bg-gray-400' }
  };

  const statusOrder = ['Open', 'In Progress', 'Escalated', 'Resolved', 'Closed'];
  const priorityColors = {
    Critical: 'bg-red-100 text-red-700',
    High: 'bg-orange-100 text-orange-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-green-100 text-green-700'
  };

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const filteredComplaints = useMemo(() => {
    return complaints.filter(c => {
      const matchStatus = statusFilter === 'All' || c.status === statusFilter;
      const matchSearch = !search || 
        c.customer.toLowerCase().includes(search.toLowerCase()) || 
        c.ticketId.toLowerCase().includes(search.toLowerCase()) || 
        c.issue.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [complaints, statusFilter, search]);

  const handleStatusChange = (complaintId, newStatus, note = '') => {
    const updateNote = note || `Status changed from previous status to ${newStatus}`;
    
    setComplaints(prev => prev.map(c => {
      if (c.id === complaintId) {
        const newHistory = [...c.history, { 
          status: newStatus, 
          timestamp: new Date().toLocaleString(), 
          note: updateNote 
        }];
        return { 
          ...c, 
          status: newStatus, 
          lastUpdate: new Date().toLocaleString(), 
          history: newHistory 
        };
      }
      return c;
    }));
    
    showToastMsg(`Status updated to ${newStatus}`, 'success');
  };

  const handleAddNote = (complaintId, note) => {
    if (!note.trim()) {
      showToastMsg('Please enter a note', 'warning');
      return;
    }

    const complaint = complaints.find(c => c.id === complaintId);
    if (complaint) {
      const newHistory = [...complaint.history, {
        status: complaint.status,
        timestamp: new Date().toLocaleString(),
        note: `Note: ${note.trim()}`
      }];
      
      setComplaints(prev => prev.map(c => 
        c.id === complaintId 
          ? { ...c, history: newHistory, lastUpdate: new Date().toLocaleString() }
          : c
      ));
      
      setStatusNote('');
      setShowNoteModal(false);
      showToastMsg('Note added successfully', 'success');
    }
  };

  const getProgressPercentage = (currentStatus) => {
    const index = statusOrder.indexOf(currentStatus);
    if (index === -1) return 0;
    // For closed status, show 100%
    if (currentStatus === 'Closed') return 100;
    // For other statuses, calculate percentage based on position
    return ((index + 1) / statusOrder.length) * 100;
  };

  const statCards = [
    { label: 'All', value: complaints.length, icon: '📊', color: 'bg-gray-50' },
    { label: 'Open', value: complaints.filter(c => c.status === 'Open').length, icon: '🟡', color: 'bg-amber-50' },
    { label: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length, icon: '🔄', color: 'bg-purple-50' },
    { label: 'Escalated', value: complaints.filter(c => c.status === 'Escalated').length, icon: '⚠️', color: 'bg-red-50' },
    { label: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length, icon: '✅', color: 'bg-green-50' },
    { label: 'Closed', value: complaints.filter(c => c.status === 'Closed').length, icon: '📌', color: 'bg-gray-100' },
  ];

  const getStatusBadgeClass = (status) => {
    return `${statusColors[status]?.bg || 'bg-gray-50'} ${statusColors[status]?.text || 'text-gray-700'}`;
  };

  return (
    <div className="p-4 md:p-6">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 
            toast.type === 'warning' ? 'bg-orange-500' : 
            'bg-blue-500'
          } text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📊</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Status Tracking</h3>
            <p className="text-sm text-gray-500 mt-0.5">Monitor complaint progress: Open → In Progress → Escalated → Resolved → Closed</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-6">
        {statCards.map((s, i) => (
          <div 
            key={i} 
            onClick={() => setStatusFilter(s.label)}
            className={`bg-white rounded-xl p-3 shadow-sm text-center cursor-pointer transition-all hover:shadow-md ${
              statusFilter === s.label ? 'ring-2 ring-red-400 shadow-md' : ''
            }`}
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <p className="text-xl font-bold text-gray-800">{s.value}</p>
            <p className="text-xs text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.complaints} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Complaint Status Overview</h3>
                <p className="text-xs text-gray-400">{filteredComplaints.length} complaints found</p>
              </div>
            </div>
            {statusFilter !== 'All' && (
              <button 
                onClick={() => setStatusFilter('All')} 
                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <span>✕</span> Clear Filter
              </button>
            )}
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              placeholder="Search by customer, ticket ID, or issue..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            />
          </div>
        </div>

        {/* Complaints List */}
        <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
          {filteredComplaints.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-4xl mb-2">🔍</div>
              <p className="text-gray-400">No complaints found</p>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your search or filter</p>
            </div>
          ) : (
            filteredComplaints.map(complaint => (
              <div key={complaint.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                        {complaint.ticketId}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priorityColors[complaint.priority]}`}>
                        {complaint.priority}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{complaint.issue}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {complaint.customer} • Created: {complaint.created}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusBadgeClass(complaint.status)}`}>
                      {complaint.status}
                    </span>
                    <button 
                      onClick={() => { 
                        setSelectedComplaint(complaint); 
                        setShowTimelineModal(true); 
                      }} 
                      className="text-xs text-blue-500 hover:text-blue-600 hover:underline whitespace-nowrap"
                    >
                      View Timeline
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                    {statusOrder.map((status, idx) => (
                      <span key={idx} className={complaint.status === status ? 'font-semibold text-gray-600' : ''}>
                        {status}
                      </span>
                    ))}
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${getProgressPercentage(complaint.status)}%`,
                        background: 'linear-gradient(90deg, #f59e0b, #8b5cf6, #ef4444, #10b981)'
                      }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <select
                    value={complaint.status}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      if (newStatus !== complaint.status) {
                        handleStatusChange(complaint.id, newStatus);
                      }
                    }}
                    className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-red-100"
                  >
                    {statusOrder.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => {
                      setSelectedComplaintForNote(complaint);
                      setShowNoteModal(true);
                    }}
                    className="text-xs text-purple-600 hover:text-purple-700 px-2 py-1 rounded hover:bg-purple-50 transition-colors"
                  >
                    + Add Note
                  </button>
                  
                  <span className="text-[10px] text-gray-400 ml-auto">
                    Last update: {complaint.lastUpdate}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Timeline Modal */}
      {showTimelineModal && selectedComplaint && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowTimelineModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-gray-800">Status Timeline</h3>
                <p className="text-xs text-gray-400">{selectedComplaint.ticketId} - {selectedComplaint.customer}</p>
              </div>
              <button 
                onClick={() => setShowTimelineModal(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-5">
              <div className="relative pl-6 border-l-2 border-gray-200 space-y-5">
                {selectedComplaint.history.map((event, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[1.85rem] w-3 h-3 rounded-full ${statusColors[event.status]?.dot || 'bg-gray-400'} ring-4 ring-white`}></div>
                    <div className="bg-gray-50 rounded-lg p-3 hover:shadow-sm transition-shadow">
                      <div className="flex justify-between items-start mb-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getStatusBadgeClass(event.status)}`}>
                          {event.status}
                        </span>
                        <span className="text-[10px] text-gray-400">{event.timestamp}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{event.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showNoteModal && selectedComplaintForNote && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowNoteModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Add Note</h3>
              <p className="text-sm text-gray-500">
                {selectedComplaintForNote.ticketId} - {selectedComplaintForNote.customer}
              </p>
            </div>
            <div className="p-6">
              <textarea
                value={statusNote}
                onChange={(e) => setStatusNote(e.target.value)}
                placeholder="Enter your note here..."
                rows="4"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 resize-none"
              />
              <div className="flex gap-3 mt-4">
                <button 
                  onClick={() => {
                    setShowNoteModal(false);
                    setStatusNote('');
                  }} 
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleAddNote(selectedComplaintForNote.id, statusNote)} 
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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