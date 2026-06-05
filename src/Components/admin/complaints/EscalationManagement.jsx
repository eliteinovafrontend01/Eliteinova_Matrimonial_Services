// src/pages/admin/complaints/EscalationManagement.jsx
import { useState, useMemo } from 'react';

export const EscalationManagement = () => {
  const [escalations, setEscalations] = useState([
    { 
      id: 'ESC001', 
      ticketId: 'TKT005', 
      customer: { name: 'Neha Gupta', email: 'neha@example.com', phone: '+91 98765 43214' }, 
      issue: 'Refund not received after cancellation',
      description: 'Customer cancelled booking 7 days before event, but refund still not processed after 15 days.',
      priority: 'Critical', 
      escalatedBy: { name: 'Rajesh Kumar', role: 'Support Lead', id: 'ADM001' },
      escalatedTo: { name: 'Priya Sharma', role: 'Finance Manager', id: 'ADM002', level: 1 },
      level: 1, 
      status: 'pending', 
      escalatedAt: '2024-01-15 10:30 AM',
      slaDeadline: '2024-01-16 10:30 AM',
      notes: 'Customer very frustrated. Multiple follow-ups made. No response from finance team for 5 days.',
      actions: [],
      resolution: null
    },
    { 
      id: 'ESC002', 
      ticketId: 'TKT008', 
      customer: { name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 98765 43216' }, 
      issue: 'Wrong makeup artist assigned on event day',
      description: 'Different makeup artist arrived than the one booked. Customer refused service.',
      priority: 'High', 
      escalatedBy: { name: 'Amit Patel', role: 'Support Agent', id: 'ADM003' },
      escalatedTo: { name: 'Vendor Manager', role: 'Vendor Management', id: 'ADM004', level: 1 },
      level: 1, 
      status: 'in_review', 
      escalatedAt: '2024-01-14 02:15 PM',
      slaDeadline: '2024-01-15 02:15 PM',
      notes: 'Vendor not cooperating. Customer demands full refund.',
      actions: [
        { action: 'Vendor contacted', date: '2024-01-14 03:00 PM', by: 'Vendor Manager', note: 'Vendor asked for 24 hours to respond' }
      ],
      resolution: null
    },
    { 
      id: 'ESC003', 
      ticketId: 'TKT001', 
      customer: { name: 'Aarav Patel', email: 'aarav@example.com', phone: '+91 98765 43210' }, 
      issue: 'Vendor no-show on event day',
      description: 'Photographer did not show up for wedding. Complete disruption of event.',
      priority: 'Critical', 
      escalatedBy: { name: 'Rajesh Kumar', role: 'Support Lead', id: 'ADM001' },
      escalatedTo: { name: 'Senior Management', role: 'Executive Committee', id: 'ADM005', level: 2 },
      level: 2, 
      status: 'approved', 
      escalatedAt: '2024-01-13 11:00 AM',
      slaDeadline: '2024-01-14 11:00 AM',
      notes: 'Requires management approval for full refund of ₹25,000 plus compensation.',
      actions: [
        { action: 'Escalated to Level 2', date: '2024-01-13 11:00 AM', by: 'Support Lead', note: 'Requires management approval' },
        { action: 'Management Review', date: '2024-01-14 09:00 AM', by: 'Senior Management', note: 'Approved with conditions' }
      ],
      resolution: { type: 'refund', amount: 25000, compensation: 5000, date: '2024-01-14', status: 'approved', notes: 'Full refund plus ₹5,000 compensation approved' }
    },
  ]);

  const [selectedEscalation, setSelectedEscalation] = useState(null);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showResolutionModal, setShowResolutionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  const [newEscalation, setNewEscalation] = useState({ 
    ticketId: '', 
    reason: '', 
    escalateTo: 'Senior Admin',
    additionalInfo: ''
  });
  
  const [actionData, setActionData] = useState({ type: '', note: '' });
  const [resolutionData, setResolutionData] = useState({ 
    type: 'refund', 
    amount: '', 
    compensation: '', 
    notes: '' 
  });

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const escalationLevels = [
    { level: 1, name: 'Level 1 - Department Lead', role: 'Department Manager', sla: '24 hours' },
    { level: 2, name: 'Level 2 - Senior Management', role: 'Senior Management', sla: '48 hours' },
    { level: 3, name: 'Level 3 - Executive Committee', role: 'Executive Committee', sla: '72 hours' }
  ];

  const statusColors = {
    pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    in_review: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    approved: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    resolved: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    rejected: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
  };

  const filteredEscalations = useMemo(() => {
    return escalations.filter(esc => {
      const matchStatus = statusFilter === 'all' || esc.status === statusFilter;
      const matchPriority = priorityFilter === 'all' || esc.priority.toLowerCase() === priorityFilter.toLowerCase();
      const matchSearch = !searchTerm || 
        esc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        esc.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        esc.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        esc.issue.toLowerCase().includes(searchTerm.toLowerCase());
      return matchStatus && matchPriority && matchSearch;
    });
  }, [escalations, statusFilter, priorityFilter, searchTerm]);

  const handleNewEscalation = () => {
    if (!newEscalation.ticketId.trim() || !newEscalation.reason.trim()) {
      showToastMsg('Please fill all required fields', 'warning');
      return;
    }

    const newId = `ESC${String(escalations.length + 1).padStart(3, '0')}`;
    const escalationLevel = escalationLevels.find(l => l.name.includes(newEscalation.escalateTo)) || escalationLevels[0];
    
    const newEsc = {
      id: newId,
      ticketId: newEscalation.ticketId,
      customer: { name: 'Customer Name', email: '', phone: '' }, // Would come from API
      issue: 'Issue description', // Would come from API
      description: newEscalation.additionalInfo,
      priority: 'High',
      escalatedBy: { name: 'Admin User', role: 'Admin', id: 'ADM000' },
      escalatedTo: { name: newEscalation.escalateTo, role: escalationLevel.role, level: escalationLevel.level },
      level: escalationLevel.level,
      status: 'pending',
      escalatedAt: new Date().toLocaleString(),
      slaDeadline: new Date(Date.now() + escalationLevel.level * 24 * 60 * 60 * 1000).toLocaleString(),
      notes: newEscalation.reason,
      actions: [{ action: 'Escalation created', date: new Date().toLocaleString(), by: 'Admin', note: newEscalation.reason }],
      resolution: null
    };
    
    setEscalations([newEsc, ...escalations]);
    setShowEscalateModal(false);
    setNewEscalation({ ticketId: '', reason: '', escalateTo: 'Senior Admin', additionalInfo: '' });
    showToastMsg(`Escalation ${newId} created successfully`, 'success');
  };

  const handleTakeAction = () => {
    if (!selectedEscalation) return;
    
    const newAction = {
      action: actionData.type,
      date: new Date().toLocaleString(),
      by: 'Admin',
      note: actionData.note
    };
    
    setEscalations(prev => prev.map(e => 
      e.id === selectedEscalation.id 
        ? { 
            ...e, 
            actions: [...e.actions, newAction],
            status: actionData.type === 'approve' ? 'approved' : 'in_review'
          }
        : e
    ));
    
    setSelectedEscalation(prev => prev ? {
      ...prev,
      actions: [...prev.actions, newAction],
      status: actionData.type === 'approve' ? 'approved' : 'in_review'
    } : null);
    
    setShowActionModal(false);
    setActionData({ type: '', note: '' });
    showToastMsg(`Action taken: ${actionData.type}`, 'success');
  };

  const handleResolveEscalation = () => {
    if (!selectedEscalation) return;
    
    const resolution = {
      type: resolutionData.type,
      amount: resolutionData.amount,
      compensation: resolutionData.compensation,
      date: new Date().toLocaleDateString(),
      status: 'completed',
      notes: resolutionData.notes,
      resolvedBy: 'Admin',
      resolvedAt: new Date().toLocaleString()
    };
    
    setEscalations(prev => prev.map(e => 
      e.id === selectedEscalation.id 
        ? { 
            ...e, 
            status: 'resolved', 
            resolution: resolution,
            actions: [...e.actions, { action: 'Escalation resolved', date: new Date().toLocaleString(), by: 'Admin', note: resolutionData.notes }]
          }
        : e
    ));
    
    setSelectedEscalation(prev => prev ? {
      ...prev,
      status: 'resolved',
      resolution: resolution,
      actions: [...prev.actions, { action: 'Escalation resolved', date: new Date().toLocaleString(), by: 'Admin', note: resolutionData.notes }]
    } : null);
    
    setShowResolutionModal(false);
    setResolutionData({ type: 'refund', amount: '', compensation: '', notes: '' });
    showToastMsg('Escalation resolved successfully', 'success');
  };

  const handleEscalateFurther = () => {
    if (!selectedEscalation) return;
    
    const nextLevel = selectedEscalation.level + 1;
    const nextLevelData = escalationLevels.find(l => l.level === nextLevel) || escalationLevels[2];
    
    setEscalations(prev => prev.map(e => 
      e.id === selectedEscalation.id 
        ? { 
            ...e, 
            level: nextLevel,
            escalatedTo: { name: nextLevelData.name, role: nextLevelData.role, level: nextLevel },
            status: 'pending',
            slaDeadline: new Date(Date.now() + nextLevel * 24 * 60 * 60 * 1000).toLocaleString(),
            actions: [...e.actions, { action: `Escalated to Level ${nextLevel}`, date: new Date().toLocaleString(), by: 'Admin', note: 'Further escalation required' }]
          }
        : e
    ));
    
    setSelectedEscalation(prev => prev ? {
      ...prev,
      level: nextLevel,
      escalatedTo: { name: nextLevelData.name, role: nextLevelData.role, level: nextLevel },
      status: 'pending',
      slaDeadline: new Date(Date.now() + nextLevel * 24 * 60 * 60 * 1000).toLocaleString(),
      actions: [...prev.actions, { action: `Escalated to Level ${nextLevel}`, date: new Date().toLocaleString(), by: 'Admin', note: 'Further escalation required' }]
    } : null);
    
    showToastMsg(`Escalated to Level ${nextLevel} - ${nextLevelData.name}`, 'success');
  };

  const stats = {
    total: escalations.length,
    pending: escalations.filter(e => e.status === 'pending').length,
    in_review: escalations.filter(e => e.status === 'in_review').length,
    approved: escalations.filter(e => e.status === 'approved').length,
    resolved: escalations.filter(e => e.status === 'resolved').length,
    critical: escalations.filter(e => e.priority === 'Critical').length
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
          <div className="text-4xl">📈</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Escalation Management</h3>
            <p className="text-sm text-gray-500 mt-0.5">Escalate critical or unresolved issues to higher-level admins or management</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-blue-400">
          <p className="text-xs text-gray-400">Total Escalations</p>
          <p className="text-xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-amber-400">
          <p className="text-xs text-gray-400">Pending</p>
          <p className="text-xl font-bold text-amber-600">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-purple-400">
          <p className="text-xs text-gray-400">In Review</p>
          <p className="text-xl font-bold text-purple-600">{stats.in_review}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-green-400">
          <p className="text-xs text-gray-400">Approved</p>
          <p className="text-xl font-bold text-green-600">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-emerald-400">
          <p className="text-xs text-gray-400">Resolved</p>
          <p className="text-xl font-bold text-emerald-600">{stats.resolved}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-red-400">
          <p className="text-xs text-gray-400">Critical</p>
          <p className="text-xl font-bold text-red-600">{stats.critical}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Escalations List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-800 text-sm">Active Escalations</h3>
              <p className="text-xs text-gray-400 mt-1">{filteredEscalations.length} escalations</p>
            </div>
            
            {/* Search and Filters */}
            <div className="p-3 border-b border-gray-100 space-y-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search escalations..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_review">In Review</option>
                  <option value="approved">Approved</option>
                  <option value="resolved">Resolved</option>
                </select>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option value="all">All Priority</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                </select>
              </div>
            </div>

            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
              {filteredEscalations.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <p className="text-gray-400">No escalations found</p>
                </div>
              ) : (
                filteredEscalations.map(esc => (
                  <div 
                    key={esc.id} 
                    onClick={() => setSelectedEscalation(esc)} 
                    className={`p-3 cursor-pointer hover:bg-gray-50 transition-all ${
                      selectedEscalation?.id === esc.id ? 'bg-red-50 border-l-4 border-red-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <span className="text-xs font-mono font-semibold text-gray-800">{esc.id}</span>
                        <p className="text-xs text-gray-500">{esc.ticketId}</p>
                      </div>
                      <div className="flex gap-1">
                        {esc.priority === 'Critical' && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-700">Critical</span>
                        )}
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusColors[esc.status].bg} ${statusColors[esc.status].text}`}>
                          {esc.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 font-medium line-clamp-2">{esc.issue}</p>
                    <p className="text-xs text-gray-400 mt-1">{esc.customer.name}</p>
                    <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                      <span>Level {esc.level}</span>
                      <span>SLA: {esc.slaDeadline.split(' ')[0]}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* New Escalation Button */}
          <button 
            onClick={() => setShowEscalateModal(true)} 
            className="w-full py-2.5 bg-red-600 text-white rounded-xl text-sm font-semibold hover:bg-red-700 transition-colors"
          >
            + New Escalation
          </button>
        </div>

        {/* Escalation Details */}
        <div className="lg:col-span-2">
          {selectedEscalation ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="p-4 border-b border-gray-100 bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{selectedEscalation.id}</span>
                      <span className="text-xs text-gray-500">Ticket: {selectedEscalation.ticketId}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200">Level {selectedEscalation.level}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">Escalated by: {selectedEscalation.escalatedBy.name} ({selectedEscalation.escalatedBy.role})</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold inline-block w-fit ${statusColors[selectedEscalation.status].bg} ${statusColors[selectedEscalation.status].text}`}>
                    {selectedEscalation.status}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4 max-h-[600px] overflow-y-auto">
                {/* Customer Info */}
                <div className="border rounded-xl p-3">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">Customer Information</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-gray-400 text-xs">Name:</span> {selectedEscalation.customer.name}</div>
                    <div><span className="text-gray-400 text-xs">Email:</span> {selectedEscalation.customer.email}</div>
                    <div><span className="text-gray-400 text-xs">Phone:</span> {selectedEscalation.customer.phone}</div>
                    <div><span className="text-gray-400 text-xs">Priority:</span> <span className="text-red-600 font-semibold">{selectedEscalation.priority}</span></div>
                  </div>
                </div>

                {/* Escalation Details */}
                <div className="border rounded-xl p-3">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">Escalation Details</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-400 text-xs">Escalated To:</span> {selectedEscalation.escalatedTo.name} ({selectedEscalation.escalatedTo.role})</div>
                    <div><span className="text-gray-400 text-xs">Escalated On:</span> {selectedEscalation.escalatedAt}</div>
                    <div><span className="text-gray-400 text-xs">SLA Deadline:</span> 
                      <span className={new Date(selectedEscalation.slaDeadline) < new Date() ? 'text-red-500 ml-1' : 'text-green-600 ml-1'}>
                        {selectedEscalation.slaDeadline}
                      </span>
                    </div>
                    <div><span className="text-gray-400 text-xs">Issue:</span> {selectedEscalation.issue}</div>
                    <div><span className="text-gray-400 text-xs">Description:</span> {selectedEscalation.description}</div>
                    <div><span className="text-gray-400 text-xs">Notes:</span> {selectedEscalation.notes}</div>
                  </div>
                </div>

                {/* Actions Timeline */}
                <div className="border rounded-xl p-3">
                  <h4 className="text-xs font-semibold text-gray-700 mb-2">Actions Taken</h4>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {selectedEscalation.actions.map((action, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                        <div className="flex-1">
                          <p className="text-xs font-medium text-gray-700">{action.action}</p>
                          <p className="text-[10px] text-gray-400">{action.date} by {action.by}</p>
                          {action.note && <p className="text-[10px] text-gray-500 mt-0.5">{action.note}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resolution Details */}
                {selectedEscalation.resolution && (
                  <div className="border rounded-xl p-3 bg-green-50 border-green-200">
                    <h4 className="text-xs font-semibold text-green-800 mb-2">Resolution</h4>
                    <div className="space-y-1">
                      <p className="text-sm text-green-700">
                        <span className="font-semibold">Action:</span> {selectedEscalation.resolution.type === 'refund' ? 'Refund Processed' : 'Other Action'}
                      </p>
                      {selectedEscalation.resolution.amount && (
                        <p className="text-sm text-green-700">
                          <span className="font-semibold">Amount:</span> ₹{parseInt(selectedEscalation.resolution.amount).toLocaleString()}
                        </p>
                      )}
                      {selectedEscalation.resolution.compensation && (
                        <p className="text-sm text-green-700">
                          <span className="font-semibold">Compensation:</span> ₹{parseInt(selectedEscalation.resolution.compensation).toLocaleString()}
                        </p>
                      )}
                      <p className="text-sm text-green-700">
                        <span className="font-semibold">Resolved On:</span> {selectedEscalation.resolution.resolvedAt}
                      </p>
                      <p className="text-sm text-green-700">
                        <span className="font-semibold">Notes:</span> {selectedEscalation.resolution.notes}
                      </p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedEscalation.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => setShowActionModal(true)} 
                        className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs hover:bg-purple-700 transition-colors"
                      >
                        Review & Take Action
                      </button>
                      <button 
                        onClick={() => setShowResolutionModal(true)} 
                        className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 transition-colors"
                      >
                        Resolve Escalation
                      </button>
                    </>
                  )}
                  
                  {selectedEscalation.status === 'in_review' && (
                    <button 
                      onClick={() => setShowResolutionModal(true)} 
                      className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs hover:bg-green-700 transition-colors"
                    >
                      Complete Resolution
                    </button>
                  )}
                  
                  {selectedEscalation.status !== 'resolved' && selectedEscalation.level < 3 && (
                    <button 
                      onClick={handleEscalateFurther} 
                      className="px-3 py-1.5 border border-red-600 text-red-600 rounded-lg text-xs hover:bg-red-50 transition-colors"
                    >
                      Escalate to Level {selectedEscalation.level + 1}
                    </button>
                  )}
                  
                  <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs hover:bg-gray-50 transition-colors">
                    View Original Ticket
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-6xl mb-4">📈</div>
              <p className="text-gray-400 mb-2">Select an escalation to view details</p>
              <p className="text-sm text-gray-400">Click on any escalation from the list to review and take action</p>
            </div>
          )}
        </div>
      </div>

      {/* New Escalation Modal */}
      {showEscalateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowEscalateModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Create Escalation</h3>
              <p className="text-sm text-gray-500">Escalate a critical issue to higher management</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Ticket ID *</label>
                <input 
                  type="text" 
                  placeholder="Enter Ticket ID" 
                  value={newEscalation.ticketId} 
                  onChange={e => setNewEscalation({...newEscalation, ticketId: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Escalate To *</label>
                <select 
                  value={newEscalation.escalateTo} 
                  onChange={e => setNewEscalation({...newEscalation, escalateTo: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option>Senior Admin</option>
                  <option>Department Head</option>
                  <option>Finance Manager</option>
                  <option>Senior Management</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Reason for Escalation *</label>
                <textarea 
                  placeholder="Explain why this needs escalation..." 
                  rows="3" 
                  value={newEscalation.reason} 
                  onChange={e => setNewEscalation({...newEscalation, reason: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Additional Information</label>
                <textarea 
                  placeholder="Any additional context or documentation..." 
                  rows="2" 
                  value={newEscalation.additionalInfo} 
                  onChange={e => setNewEscalation({...newEscalation, additionalInfo: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowEscalateModal(false)} 
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleNewEscalation} 
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Create Escalation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Take Action Modal */}
      {showActionModal && selectedEscalation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowActionModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Review Escalation</h3>
              <p className="text-sm text-gray-500">Take action on {selectedEscalation.id}</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Action Type</label>
                <select 
                  value={actionData.type} 
                  onChange={e => setActionData({...actionData, type: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option value="">Select Action</option>
                  <option value="approve">✅ Approve Escalation</option>
                  <option value="investigate">🔍 Mark for Investigation</option>
                  <option value="reject">❌ Reject Escalation</option>
                  <option value="need_info">ℹ️ Request More Information</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Action Notes</label>
                <textarea 
                  placeholder="Add your comments or instructions..." 
                  rows="3" 
                  value={actionData.note} 
                  onChange={e => setActionData({...actionData, note: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowActionModal(false)} 
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleTakeAction} 
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Submit Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resolution Modal */}
      {showResolutionModal && selectedEscalation && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowResolutionModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Resolve Escalation</h3>
              <p className="text-sm text-gray-500">Provide resolution details for {selectedEscalation.id}</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Resolution Type</label>
                <select 
                  value={resolutionData.type} 
                  onChange={e => setResolutionData({...resolutionData, type: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option value="refund">Refund Issued</option>
                  <option value="compensation">Compensation Provided</option>
                  <option value="vendor_action">Vendor Action Taken</option>
                  <option value="customer_satisfied">Customer Satisfied</option>
                  <option value="other">Other Resolution</option>
                </select>
              </div>
              {(resolutionData.type === 'refund' || resolutionData.type === 'compensation') && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Amount (₹)</label>
                    <input 
                      type="number" 
                      placeholder="Enter amount" 
                      value={resolutionData.amount} 
                      onChange={e => setResolutionData({...resolutionData, amount: e.target.value})} 
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Compensation (if any)</label>
                    <input 
                      type="number" 
                      placeholder="Enter compensation amount" 
                      value={resolutionData.compensation} 
                      onChange={e => setResolutionData({...resolutionData, compensation: e.target.value})} 
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Resolution Notes</label>
                <textarea 
                  placeholder="Describe how this escalation was resolved..." 
                  rows="3" 
                  value={resolutionData.notes} 
                  onChange={e => setResolutionData({...resolutionData, notes: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowResolutionModal(false)} 
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleResolveEscalation} 
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Mark Resolved
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
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};