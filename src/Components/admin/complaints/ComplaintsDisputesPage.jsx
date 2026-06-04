// src/pages/admin/complaints/ComplaintsDisputesPage.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../../../components/admin/shared/Icon';
import { FeatureCard } from '../../../components/admin/shared/FeatureCard';
import { ICONS } from '../../../constants/admin/icons';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

// View Ticket Modal
const ViewTicketModal = ({ ticket, onClose }) => {
  if (!ticket) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Ticket Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Ticket ID</label>
              <p className="text-sm font-mono text-gray-800">{ticket.ticketId}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Status</label>
              <p className="mt-1"><span className={`text-xs font-semibold border px-2.5 py-0.5 rounded-full ${statusColors[ticket.status]}`}>{ticket.status}</span></p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Customer</label>
              <p className="text-sm font-semibold text-gray-800">{ticket.customer}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Vendor</label>
              <p className="text-sm text-gray-800">{ticket.vendor}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Type</label>
              <p className="text-sm"><span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{ticket.type}</span></p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Priority</label>
              <p className="text-sm"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${priorityColors[ticket.priority]}`}>{ticket.priority}</span></p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Created</label>
              <p className="text-sm text-gray-800">{ticket.created}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Last Updated</label>
              <p className="text-sm text-gray-800">{ticket.lastUpdated || ticket.created}</p>
            </div>
          </div>
          
          <div className="pt-2">
            <label className="text-xs text-gray-400 uppercase font-bold">Issue Description</label>
            <p className="text-sm text-gray-700 mt-1 p-3 bg-gray-50 rounded-lg">{ticket.issue}</p>
          </div>
          
          <div className="pt-2">
            <label className="text-xs text-gray-400 uppercase font-bold">Resolution / Notes</label>
            <p className="text-sm text-gray-700 mt-1 p-3 bg-gray-50 rounded-lg">{ticket.resolution}</p>
          </div>
          
          <div className="pt-4 border-t border-gray-100">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Update Ticket Modal
const UpdateTicketModal = ({ ticket, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    status: ticket?.status || 'Open',
    resolution: ticket?.resolution || '',
    notes: ''
  });
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    onUpdate(ticket.id, formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Update Ticket</h3>
          <p className="text-sm text-gray-500">Ticket: {ticket?.ticketId}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Escalated">Escalated</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Resolution / Action Taken</label>
            <textarea
              value={formData.resolution}
              onChange={(e) => setFormData({...formData, resolution: e.target.value})}
              rows="3"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Describe the resolution or action taken..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Internal Notes (Optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              rows="2"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Add internal notes..."
            />
          </div>
          
          {isConfirming && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
              ✓ Confirm updating ticket #{ticket?.ticketId}
            </div>
          )}
          
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isConfirming ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-amber-500 text-white hover:bg-amber-600'
              }`}
            >
              {isConfirming ? 'Confirm Update' : 'Update Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Escalate Ticket Modal
const EscalateTicketModal = ({ ticket, onEscalate, onClose }) => {
  const [reason, setReason] = useState('');
  const [escalateTo, setEscalateTo] = useState('Senior Admin');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    onEscalate(ticket.id, { reason, escalateTo });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-red-600">Escalate Ticket</h3>
          <p className="text-sm text-gray-500">Ticket: {ticket?.ticketId}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            ⚠️ Escalation will notify senior management and mark this ticket as high priority.
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Escalate To</label>
            <select
              value={escalateTo}
              onChange={(e) => setEscalateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            >
              <option value="Senior Admin">Senior Admin</option>
              <option value="Operations Manager">Operations Manager</option>
              <option value="Vendor Relations Team">Vendor Relations Team</option>
              <option value="Legal Team">Legal Team</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Escalation</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Explain why this needs escalation..."
              required
            />
          </div>
          
          {isConfirming && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
              ⚠️ Confirm escalating ticket #{ticket?.ticketId} to {escalateTo}
            </div>
          )}
          
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isConfirming ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isConfirming ? 'Confirm Escalation' : 'Escalate Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add Complaint Modal
const AddComplaintModal = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    customer: '',
    vendor: '',
    type: 'Service Quality',
    issue: '',
    priority: 'Medium'
  });
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    
    const newComplaint = {
      id: `CMP${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      ticketId: `TKT${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
      ...formData,
      status: 'Open',
      created: 'Just now',
      resolution: 'Pending review',
      lastUpdated: new Date().toLocaleString()
    };
    
    onAdd(newComplaint);
    onClose();
  };

  const complaintTypes = ['Service Quality', 'Payment', 'Refund', 'Technical', 'Booking Dispute', 'Vendor Behavior', 'Other'];
  const priorities = ['Critical', 'High', 'Medium', 'Low'];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white p-4 border-b rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Register New Complaint</h3>
          <p className="text-sm text-gray-500">Create a new support ticket</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name *</label>
            <input
              type="text"
              value={formData.customer}
              onChange={(e) => setFormData({...formData, customer: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Vendor Name *</label>
            <input
              type="text"
              value={formData.vendor}
              onChange={(e) => setFormData({...formData, vendor: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Complaint Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            >
              {complaintTypes.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            >
              {priorities.map(priority => <option key={priority} value={priority}>{priority}</option>)}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Description *</label>
            <textarea
              value={formData.issue}
              onChange={(e) => setFormData({...formData, issue: e.target.value})}
              rows="4"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Describe the issue in detail..."
              required
            />
          </div>
          
          {isConfirming && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
              ✓ Confirm registering this complaint
            </div>
          )}
          
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                isConfirming ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              {isConfirming ? 'Confirm' : 'Register Complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export CSV Function
const exportToCSV = (data, filename) => {
  const headers = ['Ticket ID', 'Customer', 'Vendor', 'Type', 'Issue', 'Priority', 'Status', 'Created', 'Resolution'];
  const rows = data.map(c => [
    c.ticketId, c.customer, c.vendor, c.type, c.issue, c.priority, c.status, c.created, c.resolution
  ]);
  
  const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};

const priorityColors = { 
  Critical: 'bg-red-50 text-red-700', 
  High: 'bg-amber-50 text-amber-700', 
  Medium: 'bg-blue-50 text-blue-700', 
  Low: 'bg-gray-50 text-gray-500' 
};

const statusColors = { 
  Open: 'bg-amber-50 text-amber-700 border-amber-200', 
  'In Progress': 'bg-purple-50 text-purple-700 border-purple-200', 
  Resolved: 'bg-green-50 text-green-700 border-green-200', 
  Escalated: 'bg-red-50 text-red-700 border-red-200', 
  Closed: 'bg-gray-50 text-gray-500 border-gray-200' 
};

export const ComplaintsDisputesPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Initial complaints data
  const initialComplaints = [
    { id: 'CMP001', ticketId: 'TKT001', customer: 'Aarav Patel', vendor: 'LensArt Studio', type: 'Service Quality', issue: 'Vendor no-show on event day', priority: 'High', status: 'Open', created: '2 hrs ago', resolution: 'Pending review', lastUpdated: '2 hrs ago' },
    { id: 'CMP002', ticketId: 'TKT002', customer: 'Ishita Reddy', vendor: 'Royal Feast', type: 'Payment', issue: 'Payment deducted but booking not confirmed', priority: 'Critical', status: 'In Progress', created: '5 hrs ago', resolution: 'Verifying with payment gateway', lastUpdated: '3 hrs ago' },
    { id: 'CMP003', ticketId: 'TKT003', customer: 'Rohan Deshmukh', vendor: 'Dream Decor', type: 'Service Quality', issue: 'Decoration quality below expectations', priority: 'Medium', status: 'Resolved', created: '1 day ago', resolution: 'Partial refund issued', lastUpdated: '1 day ago' },
    { id: 'CMP004', ticketId: 'TKT004', customer: 'Meera Nair', vendor: 'Shutter Stories', type: 'Technical', issue: 'Cannot upload event photos', priority: 'Low', status: 'Closed', created: '2 days ago', resolution: 'Issue fixed', lastUpdated: '2 days ago' },
    { id: 'CMP005', ticketId: 'TKT005', customer: 'Neha Gupta', vendor: 'Grand Palace', type: 'Refund', issue: 'Refund not received after cancellation', priority: 'Critical', status: 'Escalated', created: '3 days ago', resolution: 'Escalated to finance team', lastUpdated: '1 day ago' },
    { id: 'CMP006', ticketId: 'TKT006', customer: 'Vikram Singh', vendor: 'Glam Studio', type: 'Booking Dispute', issue: 'Wrong makeup artist assigned', priority: 'High', status: 'In Progress', created: '1 day ago', resolution: 'Investigating with vendor', lastUpdated: '1 day ago' },
    { id: 'CMP007', ticketId: 'TKT007', customer: 'Priya Sharma', vendor: "Nawab's Kitchen", type: 'Service Quality', issue: 'Food quality and taste issues', priority: 'Medium', status: 'Open', created: '4 hrs ago', resolution: 'Awaiting vendor response', lastUpdated: '4 hrs ago' },
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setComplaints(initialComplaints);
      setIsLoading(false);
    }, 500);
  }, []);

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const stats = useMemo(() => ({
    total: complaints.length,
    open: complaints.filter(c => c.status === 'Open').length,
    inProgress: complaints.filter(c => c.status === 'In Progress').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
    escalated: complaints.filter(c => c.status === 'Escalated').length,
  }), [complaints]);

  const statCards = [
    { label: 'Total Complaints', value: stats.total, icon: '🎫', color: 'border-blue-400', filter: 'All' },
    { label: 'Open', value: stats.open, icon: '🟡', color: 'border-amber-400', filter: 'Open' },
    { label: 'In Progress', value: stats.inProgress, icon: '🔄', color: 'border-purple-400', filter: 'In Progress' },
    { label: 'Resolved', value: stats.resolved, icon: '✅', color: 'border-green-400', filter: 'Resolved' },
    { label: 'Escalated', value: stats.escalated, icon: '⚠️', color: 'border-red-400', filter: 'Escalated' },
  ];

  const filtered = useMemo(() => {
    return complaints.filter(c => {
      const matchStatus = activeFilter === 'All' || c.status === activeFilter;
      const matchSearch = !search || 
        c.customer.toLowerCase().includes(search.toLowerCase()) || 
        c.vendor.toLowerCase().includes(search.toLowerCase()) ||
        c.issue.toLowerCase().includes(search.toLowerCase()) ||
        c.ticketId.toLowerCase().includes(search.toLowerCase()) ||
        c.type.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [complaints, activeFilter, search]);

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowViewModal(true);
  };

  const handleUpdateTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowUpdateModal(true);
  };

  const handleEscalateTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowEscalateModal(true);
  };

  const handleSaveUpdate = (ticketId, updateData) => {
    setComplaints(prev => prev.map(c => 
      c.id === ticketId 
        ? { ...c, ...updateData, lastUpdated: new Date().toLocaleString() }
        : c
    ));
    showToastMsg(`Ticket ${ticketId} updated successfully`, 'success');
  };

  const handleEscalate = (ticketId, escalateData) => {
    setComplaints(prev => prev.map(c => 
      c.id === ticketId 
        ? { ...c, status: 'Escalated', priority: 'Critical', resolution: `Escalated to ${escalateData.escalateTo}: ${escalateData.reason}`, lastUpdated: new Date().toLocaleString() }
        : c
    ));
    showToastMsg(`Ticket ${ticketId} escalated to ${escalateData.escalateTo}`, 'warning');
  };

  const handleAddComplaint = (newComplaint) => {
    setComplaints(prev => [newComplaint, ...prev]);
    showToastMsg(`Ticket ${newComplaint.ticketId} registered successfully`, 'success');
  };

  const handleExport = () => {
    exportToCSV(filtered, 'complaints_export');
    showToastMsg(`Exported ${filtered.length} complaints successfully`, 'success');
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-orange-500'
          } text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Modals */}
      {showViewModal && selectedTicket && (
        <ViewTicketModal ticket={selectedTicket} onClose={() => { setShowViewModal(false); setSelectedTicket(null); }} />
      )}
      {showUpdateModal && selectedTicket && (
        <UpdateTicketModal ticket={selectedTicket} onUpdate={handleSaveUpdate} onClose={() => { setShowUpdateModal(false); setSelectedTicket(null); }} />
      )}
      {showEscalateModal && selectedTicket && (
        <EscalateTicketModal ticket={selectedTicket} onEscalate={handleEscalate} onClose={() => { setShowEscalateModal(false); setSelectedTicket(null); }} />
      )}
      {showAddModal && (
        <AddComplaintModal onAdd={handleAddComplaint} onClose={() => setShowAddModal(false)} />
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">⚖️</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Complaints & Disputes Management</h3>
              <p className="text-sm text-gray-500 mt-0.5">Handle customer complaints, vendor disputes and track resolution progress</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddModal(true)} 
            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Icon d={ICONS.plus} size={16} /> New Complaint
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} onClick={() => setActiveFilter(s.filter)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                {activeFilter === s.filter && s.filter !== 'All' && <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.complaints} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Support Ticket Management</h3>
                <p className="text-xs text-gray-400">{filtered.length} ticket{filtered.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `— ${activeFilter}` : 'all tickets'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFilter !== 'All' && (
                <button onClick={() => setActiveFilter('All')} className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  ✕ Clear Filter
                </button>
              )}
              <button onClick={handleExport} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors">
                <Icon d={ICONS.download} size={13} /> Export
              </button>
            </div>
          </div>
          
          {/* Search and Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon d={ICONS.search} size={15} />
              </span>
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Search by ticket ID, customer, vendor or issue type..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {['All','Open','In Progress','Resolved','Escalated','Closed'].map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="divide-y divide-gray-50">
          {filtered.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-gray-400">
              No complaints found for "{activeFilter}" filter.
            </div>
          ) : filtered.map(c => (
            <div key={c.id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-xs font-mono text-gray-400 flex-shrink-0">{c.ticketId}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{c.issue}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-gray-500">{c.customer} vs {c.vendor}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{c.type}</span>
                    <span className="text-xs text-gray-400">{c.created}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${priorityColors[c.priority]}`}>{c.priority}</span>
                <span className={`text-[10px] font-semibold border px-2.5 py-0.5 rounded-full ${statusColors[c.status]}`}>{c.status}</span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => handleViewTicket(c)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="View Details">
                    <Icon d={ICONS.eye} size={14} />
                  </button>
                  <button onClick={() => handleUpdateTicket(c)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors" title="Update Ticket">
                    <Icon d={ICONS.edit} size={14} />
                  </button>
                  {c.status !== 'Escalated' && c.status !== 'Resolved' && c.status !== 'Closed' && (
                    <button onClick={() => handleEscalateTicket(c)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Escalate Ticket">
                      <Icon d={ICONS.alert} size={14} />
                    </button>
                  )}
                </div>
              </div>
              {c.status !== 'Open' && c.status !== 'Closed' && c.resolution !== 'Pending review' && (
                <div className="mt-2 pt-2 border-t border-gray-50">
                  <p className="text-[10px] text-gray-400"><span className="font-semibold">Resolution:</span> {c.resolution}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Footer */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-wrap justify-between items-center gap-2 text-xs">
            <div className="flex gap-4">
              <span className="text-gray-500">
                Open: <span className="font-semibold text-amber-600">{stats.open}</span>
              </span>
              <span className="text-gray-500">
                In Progress: <span className="font-semibold text-purple-600">{stats.inProgress}</span>
              </span>
              <span className="text-gray-500">
                Resolved: <span className="font-semibold text-green-600">{stats.resolved}</span>
              </span>
              <span className="text-gray-500">
                Escalated: <span className="font-semibold text-red-600">{stats.escalated}</span>
              </span>
            </div>
            <span className="text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <FeatureCard emoji="🎫" title="Ticket Management System" accentColor="bg-blue-50" points={['Generate unique ticket IDs', 'Categorize by issue type', 'Track complaint progress', 'Complete communication logs']} />
        <FeatureCard emoji="⚖️" title="Dispute Resolution Workflow" accentColor="bg-purple-50" points={['Investigate issues thoroughly', 'Verify facts & evidence', 'Take appropriate actions', 'Issue warnings or penalties']} />
        <FeatureCard emoji="📈" title="Escalation Management" accentColor="bg-amber-50" points={['Escalate critical issues', 'Route to senior admins', 'Priority-based handling', 'SLA breach monitoring']} />
        <FeatureCard emoji="📊" title="Reports & Insights" accentColor="bg-green-50" points={['Analyze complaint trends', 'Track resolution time', 'Vendor performance issues', 'Improve service quality']} />
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
      `}</style>
    </div>
  );
};