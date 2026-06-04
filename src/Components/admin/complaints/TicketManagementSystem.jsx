// src/pages/admin/complaints/TicketManagementSystem.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

export const TicketManagementSystem = () => {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [newTicket, setNewTicket] = useState({ 
    customer: '', 
    vendor: '', 
    type: '', 
    description: '', 
    priority: 'Medium' 
  });
  const [errors, setErrors] = useState({});

  // Initial tickets data
  const initialTickets = [
    { id: 'TKT001', complaintId: 'CMP001', customer: 'Aarav Patel', vendor: 'LensArt Studio', type: 'Service Quality', status: 'Open', priority: 'High', created: '2024-01-15', updated: '2024-01-15', assignedTo: 'Support Team A', description: 'Vendor no-show on event day' },
    { id: 'TKT002', complaintId: 'CMP002', customer: 'Ishita Reddy', vendor: 'Royal Feast', type: 'Payment', status: 'In Progress', priority: 'Critical', created: '2024-01-14', updated: '2024-01-15', assignedTo: 'Finance Team', description: 'Payment deducted but booking not confirmed' },
    { id: 'TKT003', complaintId: 'CMP003', customer: 'Rohan Deshmukh', vendor: 'Dream Decor', type: 'Service Quality', status: 'Resolved', priority: 'Medium', created: '2024-01-13', updated: '2024-01-14', assignedTo: 'Support Team B', description: 'Decoration quality below expectations' },
    { id: 'TKT004', complaintId: 'CMP004', customer: 'Meera Nair', vendor: 'Shutter Stories', type: 'Technical', status: 'Closed', priority: 'Low', created: '2024-01-12', updated: '2024-01-14', assignedTo: 'Tech Support', description: 'Cannot upload event photos' },
    { id: 'TKT005', complaintId: 'CMP005', customer: 'Neha Gupta', vendor: 'Grand Palace', type: 'Refund', status: 'Escalated', priority: 'Critical', created: '2024-01-11', updated: '2024-01-15', assignedTo: 'Escalation Team', description: 'Refund not received after cancellation' },
    { id: 'TKT006', complaintId: 'CMP006', customer: 'Vikram Singh', vendor: 'Glam Studio', type: 'Booking Dispute', status: 'In Progress', priority: 'High', created: '2024-01-10', updated: '2024-01-13', assignedTo: 'Support Team A', description: 'Wrong makeup artist assigned' },
    { id: 'TKT007', complaintId: 'CMP007', customer: 'Priya Sharma', vendor: "Nawab's Kitchen", type: 'Service Quality', status: 'Open', priority: 'Medium', created: '2024-01-09', updated: '2024-01-12', assignedTo: 'Unassigned', description: 'Food quality and taste issues' },
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setTickets(initialTickets);
      setIsLoading(false);
    }, 500);
  }, []);

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const statusColors = {
    Open: 'bg-amber-50 text-amber-700 border-amber-200',
    'In Progress': 'bg-purple-50 text-purple-700 border-purple-200',
    Resolved: 'bg-green-50 text-green-700 border-green-200',
    Escalated: 'bg-red-50 text-red-700 border-red-200',
    Closed: 'bg-gray-50 text-gray-500 border-gray-200'
  };

  const priorityColors = {
    Critical: 'bg-red-50 text-red-700',
    High: 'bg-amber-50 text-amber-700',
    Medium: 'bg-blue-50 text-blue-700',
    Low: 'bg-gray-50 text-gray-500'
  };

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      const matchStatus = statusFilter === 'All' || ticket.status === statusFilter;
      const matchSearch = !search || 
        ticket.id.toLowerCase().includes(search.toLowerCase()) ||
        ticket.customer.toLowerCase().includes(search.toLowerCase()) ||
        ticket.vendor.toLowerCase().includes(search.toLowerCase()) ||
        ticket.type.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [tickets, statusFilter, search]);

  const stats = useMemo(() => ({
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open').length,
    inProgress: tickets.filter(t => t.status === 'In Progress').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
    escalated: tickets.filter(t => t.status === 'Escalated').length,
    closed: tickets.filter(t => t.status === 'Closed').length,
  }), [tickets]);

  const statCards = [
    { label: 'Total Tickets', value: stats.total, icon: '🎫', color: 'border-blue-400', filter: 'All' },
    { label: 'Open', value: stats.open, icon: '🟡', color: 'border-amber-400', filter: 'Open' },
    { label: 'In Progress', value: stats.inProgress, icon: '🔄', color: 'border-purple-400', filter: 'In Progress' },
    { label: 'Resolved', value: stats.resolved, icon: '✅', color: 'border-green-400', filter: 'Resolved' },
    { label: 'Escalated', value: stats.escalated, icon: '⚠️', color: 'border-red-400', filter: 'Escalated' },
  ];

  const handleStatusUpdate = (ticketId, newStatus) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, updated: new Date().toISOString().split('T')[0] } 
        : ticket
    ));
    showToastMsg(`Ticket ${ticketId} status updated to ${newStatus}`, 'success');
  };

  const handleAssign = (ticketId, assignedTo) => {
    if (assignedTo && assignedTo.trim()) {
      setTickets(prev => prev.map(ticket => 
        ticket.id === ticketId 
          ? { ...ticket, assignedTo, updated: new Date().toISOString().split('T')[0] } 
          : ticket
      ));
      showToastMsg(`Ticket ${ticketId} assigned to ${assignedTo}`, 'success');
      setShowAssignModal(false);
      setSelectedTicket(null);
    }
  };

  const generateTicketId = () => {
    const maxNum = Math.max(...tickets.map(t => parseInt(t.id.replace('TKT', ''))), 0);
    const nextNum = maxNum + 1;
    return `TKT${String(nextNum).padStart(3, '0')}`;
  };

  const generateComplaintId = () => {
    const maxNum = Math.max(...tickets.map(t => parseInt(t.complaintId.replace('CMP', ''))), 0);
    const nextNum = maxNum + 1;
    return `CMP${String(nextNum).padStart(3, '0')}`;
  };

  const validateCreateForm = () => {
    const newErrors = {};
    if (!newTicket.customer.trim()) newErrors.customer = 'Customer name is required';
    if (!newTicket.type) newErrors.type = 'Issue type is required';
    if (!newTicket.description.trim()) newErrors.description = 'Description is required';
    else if (newTicket.description.trim().length < 10) newErrors.description = 'Description must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateTicket = () => {
    if (!validateCreateForm()) {
      showToastMsg('Please fill all required fields', 'warning');
      return;
    }

    const newId = generateTicketId();
    const complaintId = generateComplaintId();
    const newTicketObj = {
      id: newId,
      complaintId,
      customer: newTicket.customer,
      vendor: newTicket.vendor || 'Pending Assignment',
      type: newTicket.type,
      status: 'Open',
      priority: newTicket.priority,
      created: new Date().toISOString().split('T')[0],
      updated: new Date().toISOString().split('T')[0],
      assignedTo: 'Unassigned',
      description: newTicket.description,
    };
    setTickets(prev => [newTicketObj, ...prev]);
    setNewTicket({ customer: '', vendor: '', type: '', description: '', priority: 'Medium' });
    setErrors({});
    setShowCreateModal(false);
    showToastMsg(`Ticket ${newId} created successfully!`, 'success');
  };

  const handleResetFilters = () => {
    setStatusFilter('All');
    setSearch('');
    showToastMsg('Filters reset', 'info');
  };

  const exportToCSV = () => {
    const headers = ['Ticket ID', 'Complaint ID', 'Customer', 'Vendor', 'Type', 'Status', 'Priority', 'Assigned To', 'Created', 'Updated'];
    const rows = filteredTickets.map(t => [
      t.id, t.complaintId, t.customer, t.vendor, t.type, t.status, t.priority, t.assignedTo, t.created, t.updated
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tickets_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToastMsg(`Exported ${filteredTickets.length} tickets successfully`, 'success');
  };

  const getTicketStatusCount = (status) => {
    return tickets.filter(t => t.status === status).length;
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 
            toast.type === 'warning' ? 'bg-orange-500' : 
            toast.type === 'info' ? 'bg-blue-500' : 
            'bg-red-500'
          } text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🎫</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Ticket Management System</h3>
              <p className="text-sm text-gray-500 mt-0.5">Generate and manage support tickets with unique IDs for each complaint</p>
            </div>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Icon d={ICONS.plus} size={16} /> New Ticket
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} 
            onClick={() => setStatusFilter(s.filter)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${statusFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                {statusFilter === s.filter && s.filter !== 'All' && (
                  <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>
                )}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.complaints} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Support Tickets</h3>
                <p className="text-xs text-gray-400">{filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''} found</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {statusFilter !== 'All' && (
                <button onClick={handleResetFilters} className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  ✕ Clear Filter
                </button>
              )}
              <button onClick={exportToCSV} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors">
                <Icon d={ICONS.download} size={13} /> Export CSV
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px] relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon d={ICONS.search} size={15} />
              </span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by ticket ID, customer, or vendor..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 bg-gray-50"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', 'Open', 'In Progress', 'Resolved', 'Escalated', 'Closed'].map(f => (
                <button key={f} onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${statusFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Ticket ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Customer</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Vendor</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Type</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Priority</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Assigned To</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Updated</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredTickets.map(ticket => (
                <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="text-xs font-mono font-semibold text-gray-700">{ticket.id}</span>
                      <span className="text-[10px] text-gray-400">{ticket.complaintId}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-rose-400 to-red-400 flex items-center justify-center text-white text-[10px] font-bold">
                        {ticket.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{ticket.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{ticket.vendor}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{ticket.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${priorityColors[ticket.priority]}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={ticket.status}
                      onChange={(e) => handleStatusUpdate(ticket.id, e.target.value)}
                      className={`text-[10px] font-semibold border px-2 py-0.5 rounded-full focus:outline-none cursor-pointer ${statusColors[ticket.status]}`}
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                      <option>Escalated</option>
                      <option>Closed</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs text-gray-500">{ticket.assignedTo}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{ticket.updated}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => { setSelectedTicket(ticket); setShowDetailModal(true); }} 
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                        title="View Details"
                      >
                        <Icon d={ICONS.eye} size={14} />
                      </button>
                      <button 
                        onClick={() => { setSelectedTicket(ticket); setShowAssignModal(true); }} 
                        className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                        title="Assign Ticket"
                      >
                        <Icon d={ICONS.userCheck} size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-sm text-gray-400">
                    No tickets found for "{statusFilter}" filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-wrap justify-between items-center gap-2 text-xs">
            <div className="flex gap-4">
              <span className="text-gray-500">Open: <span className="font-semibold text-amber-600">{getTicketStatusCount('Open')}</span></span>
              <span className="text-gray-500">In Progress: <span className="font-semibold text-purple-600">{getTicketStatusCount('In Progress')}</span></span>
              <span className="text-gray-500">Resolved: <span className="font-semibold text-green-600">{getTicketStatusCount('Resolved')}</span></span>
              <span className="text-gray-500">Escalated: <span className="font-semibold text-red-600">{getTicketStatusCount('Escalated')}</span></span>
              <span className="text-gray-500">Closed: <span className="font-semibold text-gray-600">{getTicketStatusCount('Closed')}</span></span>
            </div>
            <span className="text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/20" onClick={() => setShowCreateModal(false)}>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 rounded-t-2xl">
              <h3 className="text-lg font-bold text-gray-800">Create New Support Ticket</h3>
              <p className="text-sm text-gray-500">Fill in the details to create a new ticket</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter customer name" 
                  value={newTicket.customer} 
                  onChange={e => setNewTicket({...newTicket, customer: e.target.value})} 
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 ${errors.customer ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                />
                {errors.customer && <p className="text-xs text-red-500 mt-1">{errors.customer}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Vendor Name</label>
                <input 
                  type="text" 
                  placeholder="Enter vendor name (optional)" 
                  value={newTicket.vendor} 
                  onChange={e => setNewTicket({...newTicket, vendor: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Issue Type *</label>
                <select 
                  value={newTicket.type} 
                  onChange={e => setNewTicket({...newTicket, type: e.target.value})} 
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 ${errors.type ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                >
                  <option value="">Select Issue Type</option>
                  <option>Service Quality</option>
                  <option>Payment & Refund</option>
                  <option>Vendor Misconduct</option>
                  <option>Booking Disputes</option>
                  <option>Technical Issues</option>
                </select>
                {errors.type && <p className="text-xs text-red-500 mt-1">{errors.type}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
                <select 
                  value={newTicket.priority} 
                  onChange={e => setNewTicket({...newTicket, priority: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Issue Description *</label>
                <textarea 
                  placeholder="Describe the issue in detail..." 
                  rows="4" 
                  value={newTicket.description} 
                  onChange={e => setNewTicket({...newTicket, description: e.target.value})} 
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 ${errors.description ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                />
                {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
                <p className="text-xs text-gray-400 mt-1">Minimum 10 characters</p>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button onClick={handleCreateTicket} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Create Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Ticket Modal */}
      {showAssignModal && selectedTicket && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/20" onClick={() => setShowAssignModal(false)}>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Assign Ticket</h3>
              <p className="text-sm text-gray-500">Ticket: {selectedTicket.id} - {selectedTicket.customer}</p>
            </div>
            <div className="p-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Assign To</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  id="assignInput"
                  placeholder="Enter team or person name" 
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div className="mt-4 flex gap-3">
                <button onClick={() => setShowAssignModal(false)} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50">
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    const assignInput = document.getElementById('assignInput');
                    if (assignInput && assignInput.value.trim()) {
                      handleAssign(selectedTicket.id, assignInput.value.trim());
                    } else {
                      showToastMsg('Please enter a name to assign', 'warning');
                    }
                  }} 
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedTicket && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/20" onClick={() => setShowDetailModal(false)}>
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center rounded-t-2xl">
              <h3 className="font-bold text-gray-800 text-lg">Ticket Details: {selectedTicket.id}</h3>
              <button onClick={() => setShowDetailModal(false)} className="p-1 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">Complaint ID</label>
                  <p className="text-sm font-mono text-gray-800">{selectedTicket.complaintId}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">Ticket ID</label>
                  <p className="text-sm font-mono text-gray-800">{selectedTicket.id}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">Customer</label>
                  <p className="text-sm font-semibold text-gray-800">{selectedTicket.customer}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">Vendor</label>
                  <p className="text-sm text-gray-800">{selectedTicket.vendor}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">Issue Type</label>
                  <p className="text-sm"><span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{selectedTicket.type}</span></p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">Priority</label>
                  <p className="text-sm"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${priorityColors[selectedTicket.priority]}`}>{selectedTicket.priority}</span></p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">Status</label>
                  <p className="text-sm"><span className={`text-[10px] font-semibold border px-2 py-0.5 rounded-full ${statusColors[selectedTicket.status]}`}>{selectedTicket.status}</span></p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">Assigned To</label>
                  <p className="text-sm text-gray-800">{selectedTicket.assignedTo}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">Created</label>
                  <p className="text-sm text-gray-800">{selectedTicket.created}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-bold">Last Updated</label>
                  <p className="text-sm text-gray-800">{selectedTicket.updated}</p>
                </div>
              </div>
              
              <div className="pt-2">
                <label className="text-xs text-gray-400 uppercase font-bold">Description</label>
                <p className="text-sm text-gray-700 mt-1 p-3 bg-gray-50 rounded-lg">{selectedTicket.description}</p>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button onClick={() => setShowDetailModal(false)} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Close
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