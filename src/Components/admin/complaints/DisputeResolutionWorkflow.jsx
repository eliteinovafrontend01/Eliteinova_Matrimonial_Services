// src/pages/admin/complaints/DisputeResolutionWorkflow.jsx
import { useState, useMemo } from 'react';

export const DisputeResolutionWorkflow = () => {
  const [activeDisputes, setActiveDisputes] = useState([
    { 
      id: 'DSP001', 
      ticketId: 'TKT001', 
      customer: { name: 'Aarav Patel', email: 'aarav@example.com', phone: '+91 98765 43210' }, 
      vendor: { name: 'LensArt Studio', email: 'contact@lensart.com', phone: '+91 98765 43211' }, 
      issue: 'Vendor no-show on event day',
      description: 'The vendor did not show up for the scheduled wedding photography session. Customer waited for 2 hours.',
      amount: 25000, 
      status: 'investigating', 
      priority: 'High',
      createdDate: '2024-01-15',
      evidence: [
        { name: 'chat_screenshot.png', type: 'image', size: '1.2 MB', url: '#' }, 
        { name: 'booking_confirmation.pdf', type: 'pdf', size: '245 KB', url: '#' }
      ], 
      timeline: [
        { action: 'Dispute registered', date: '2024-01-15 10:30 AM', by: 'Customer' },
        { action: 'Investigation started', date: '2024-01-15 11:00 AM', by: 'Support Team' }
      ],
      resolution: null
    },
    { 
      id: 'DSP002', 
      ticketId: 'TKT002', 
      customer: { name: 'Ishita Reddy', email: 'ishita@example.com', phone: '+91 98765 43212' }, 
      vendor: { name: 'Royal Feast', email: 'info@royalfeast.com', phone: '+91 98765 43213' }, 
      issue: 'Payment deducted but booking not confirmed',
      description: 'Amount deducted from customer account but booking status shows pending. Transaction ID: TXN123456',
      amount: 45000, 
      status: 'verification', 
      priority: 'Critical',
      createdDate: '2024-01-14',
      evidence: [
        { name: 'payment_screenshot.jpg', type: 'image', size: '856 KB', url: '#' }
      ], 
      timeline: [
        { action: 'Dispute registered', date: '2024-01-14 09:15 AM', by: 'Customer' },
        { action: 'Payment verification initiated', date: '2024-01-14 10:00 AM', by: 'Finance Team' }
      ],
      resolution: null
    },
    { 
      id: 'DSP003', 
      ticketId: 'TKT003', 
      customer: { name: 'Neha Gupta', email: 'neha@example.com', phone: '+91 98765 43214' }, 
      vendor: { name: 'Grand Palace', email: 'events@grandpalace.com', phone: '+91 98765 43215' }, 
      issue: 'Refund not received after cancellation',
      description: 'Customer cancelled booking 7 days before event as per policy, but refund not processed yet.',
      amount: 75000, 
      status: 'action_taken', 
      priority: 'High',
      createdDate: '2024-01-10',
      evidence: [
        { name: 'cancellation_email.pdf', type: 'pdf', size: '120 KB', url: '#' }
      ], 
      timeline: [
        { action: 'Dispute registered', date: '2024-01-10 02:20 PM', by: 'Customer' },
        { action: 'Cancellation verified', date: '2024-01-11 09:00 AM', by: 'Support Team' },
        { action: 'Refund processed', date: '2024-01-14 11:30 AM', by: 'Finance Team' }
      ],
      resolution: { type: 'refund', amount: 75000, date: '2024-01-14', status: 'processed' }
    },
  ]);

  const [selectedDispute, setSelectedDispute] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionNote, setActionNote] = useState('');
  const [actionAmount, setActionAmount] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const statusSteps = [
    { key: 'investigating', label: 'Investigate Issues', icon: '🔍', color: 'bg-blue-100 text-blue-700' },
    { key: 'verification', label: 'Verify Facts', icon: '✅', color: 'bg-purple-100 text-purple-700' },
    { key: 'verified', label: 'Evidence Confirmed', icon: '📋', color: 'bg-amber-100 text-amber-700' },
    { key: 'action_taken', label: 'Take Action', icon: '⚖️', color: 'bg-green-100 text-green-700' },
    { key: 'resolved', label: 'Resolved', icon: '🎉', color: 'bg-emerald-100 text-emerald-700' },
  ];

  const statusColors = {
    investigating: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    verification: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    verified: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    action_taken: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
    resolved: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' }
  };

  const priorityColors = {
    Critical: 'bg-red-100 text-red-700',
    High: 'bg-orange-100 text-orange-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Low: 'bg-green-100 text-green-700'
  };

  const filteredDisputes = useMemo(() => {
    return activeDisputes.filter(dispute => {
      const matchStatus = statusFilter === 'all' || dispute.status === statusFilter;
      const matchSearch = !searchTerm || 
        dispute.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dispute.ticketId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dispute.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dispute.vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dispute.issue.toLowerCase().includes(searchTerm.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [activeDisputes, statusFilter, searchTerm]);

  const handleTakeAction = () => {
    if (!selectedDispute || !actionType) {
      showToastMsg('Please select an action type', 'warning');
      return;
    }

    const newAction = { 
      type: actionType, 
      note: actionNote, 
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      amount: actionAmount,
      status: 'completed'
    };

    let newStatus = 'action_taken';
    let resolutionData = null;

    if (actionType === 'refund') {
      resolutionData = { type: 'refund', amount: actionAmount || selectedDispute.amount, date: new Date().toLocaleDateString(), status: 'processed' };
      showToastMsg(`Refund of ₹${(actionAmount || selectedDispute.amount).toLocaleString()} approved`, 'success');
    } else if (actionType === 'vendor_warning') {
      showToastMsg(`Warning issued to ${selectedDispute.vendor.name}`, 'success');
    } else if (actionType === 'vendor_penalty') {
      showToastMsg(`Penalty of ₹${actionAmount} applied to vendor`, 'success');
      resolutionData = { type: 'penalty', amount: actionAmount, date: new Date().toLocaleDateString(), status: 'applied' };
    } else if (actionType === 'suspend') {
      showToastMsg(`Vendor account suspension initiated`, 'warning');
    }

    setActiveDisputes(prev => prev.map(d => 
      d.id === selectedDispute.id 
        ? { 
            ...d, 
            actions: [...(d.actions || []), newAction], 
            status: newStatus,
            resolution: resolutionData || d.resolution,
            timeline: [...d.timeline, { action: `${actionType.replace('_', ' ')}: ${actionNote || 'Action taken'}`, date: new Date().toLocaleString(), by: 'Admin' }]
          }
        : d
    ));

    setSelectedDispute(prev => prev ? {
      ...prev,
      actions: [...(prev.actions || []), newAction],
      status: newStatus,
      resolution: resolutionData || prev.resolution,
      timeline: [...prev.timeline, { action: `${actionType.replace('_', ' ')}: ${actionNote || 'Action taken'}`, date: new Date().toLocaleString(), by: 'Admin' }]
    } : null);

    setShowActionModal(false);
    setActionType('');
    setActionNote('');
    setActionAmount('');
  };

  const handleVerifyFacts = (disputeId) => {
    setActiveDisputes(prev => prev.map(d => 
      d.id === disputeId 
        ? { 
            ...d, 
            status: 'verified',
            timeline: [...d.timeline, { action: 'Facts verified and evidence confirmed', date: new Date().toLocaleString(), by: 'Admin' }]
          }
        : d
    ));
    
    setSelectedDispute(prev => prev ? {
      ...prev,
      status: 'verified',
      timeline: [...prev.timeline, { action: 'Facts verified and evidence confirmed', date: new Date().toLocaleString(), by: 'Admin' }]
    } : null);
    
    showToastMsg('Facts verified successfully', 'success');
  };

  const handleMarkResolved = (disputeId) => {
    setActiveDisputes(prev => prev.map(d => 
      d.id === disputeId 
        ? { 
            ...d, 
            status: 'resolved',
            timeline: [...d.timeline, { action: 'Dispute marked as resolved', date: new Date().toLocaleString(), by: 'Admin' }]
          }
        : d
    ));
    
    setSelectedDispute(prev => prev ? {
      ...prev,
      status: 'resolved',
      timeline: [...prev.timeline, { action: 'Dispute marked as resolved', date: new Date().toLocaleString(), by: 'Admin' }]
    } : null);
    
    showToastMsg('Dispute marked as resolved', 'success');
  };

  const handleDownloadEvidence = (evidence) => {
    showToastMsg(`Downloading ${evidence.name}...`, 'info');
    // In real implementation, trigger actual download
  };

  const getCurrentStepIndex = (status) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  const stats = {
    total: activeDisputes.length,
    investigating: activeDisputes.filter(d => d.status === 'investigating').length,
    verification: activeDisputes.filter(d => d.status === 'verification').length,
    action_taken: activeDisputes.filter(d => d.status === 'action_taken').length,
    resolved: activeDisputes.filter(d => d.status === 'resolved').length,
    totalAmount: activeDisputes.reduce((sum, d) => sum + d.amount, 0)
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
          <div className="text-4xl">⚖️</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Dispute Resolution Workflow</h3>
            <p className="text-sm text-gray-500 mt-0.5">Investigate issues, verify facts, and take appropriate action such as refunds, vendor warnings, or penalties</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-blue-400">
          <p className="text-xs text-gray-400">Total Disputes</p>
          <p className="text-xl font-bold">{stats.total}</p>
          <p className="text-xs text-gray-400">₹{stats.totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-blue-500">
          <p className="text-xs text-gray-400">Investigating</p>
          <p className="text-xl font-bold text-blue-600">{stats.investigating}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-purple-500">
          <p className="text-xs text-gray-400">Verification</p>
          <p className="text-xl font-bold text-purple-600">{stats.verification}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-green-500">
          <p className="text-xs text-gray-400">Action Taken</p>
          <p className="text-xl font-bold text-green-600">{stats.action_taken}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-emerald-500">
          <p className="text-xs text-gray-400">Resolved</p>
          <p className="text-xl font-bold text-emerald-600">{stats.resolved}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Disputes List */}
          <div className="border-r border-gray-100">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-800 text-sm">Active Disputes</h3>
              <p className="text-xs text-gray-400 mt-1">{filteredDisputes.length} disputes</p>
            </div>
            
            {/* Search and Filter */}
            <div className="p-3 border-b border-gray-100 space-y-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search disputes..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
              >
                <option value="all">All Status</option>
                <option value="investigating">Investigating</option>
                <option value="verification">Verification</option>
                <option value="verified">Verified</option>
                <option value="action_taken">Action Taken</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
              {filteredDisputes.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-2">🔍</div>
                  <p className="text-gray-400">No disputes found</p>
                </div>
              ) : (
                filteredDisputes.map(dispute => (
                  <div 
                    key={dispute.id} 
                    onClick={() => setSelectedDispute(dispute)} 
                    className={`p-3 cursor-pointer hover:bg-gray-50 transition-all ${
                      selectedDispute?.id === dispute.id ? 'bg-red-50 border-l-4 border-red-500' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <span className="text-xs font-mono font-semibold text-gray-800">{dispute.id}</span>
                        <p className="text-xs text-gray-500 mt-0.5">{dispute.ticketId}</p>
                      </div>
                      <div className="flex gap-1">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${priorityColors[dispute.priority]}`}>
                          {dispute.priority}
                        </span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusColors[dispute.status].bg} ${statusColors[dispute.status].text}`}>
                          {dispute.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-700 font-medium line-clamp-2">{dispute.issue}</p>
                    <p className="text-xs text-gray-400 mt-1">{dispute.customer.name} vs {dispute.vendor.name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs font-semibold text-gray-700">₹{dispute.amount.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-400">{dispute.createdDate}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Dispute Details */}
          <div className="lg:col-span-2 flex flex-col">
            {selectedDispute ? (
              <>
                {/* Header */}
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">Dispute: {selectedDispute.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[selectedDispute.status].bg} ${statusColors[selectedDispute.status].text}`}>
                          {selectedDispute.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">Ticket: {selectedDispute.ticketId}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold inline-block w-fit ${priorityColors[selectedDispute.priority]}`}>
                      {selectedDispute.priority} Priority
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Workflow Steps */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-xs font-semibold text-gray-700 mb-3">Resolution Workflow</h4>
                    <div className="flex justify-between">
                      {statusSteps.map((step, idx) => {
                        const currentStepIndex = getCurrentStepIndex(selectedDispute.status);
                        const isCompleted = idx <= currentStepIndex;
                        const isCurrent = step.key === selectedDispute.status;
                        
                        return (
                          <div key={idx} className="flex-1 text-center">
                            <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-sm transition-all ${
                              isCompleted ? 'bg-green-500 text-white' : 
                              isCurrent ? `${step.color} ring-2 ring-offset-2 ring-red-400` : 'bg-gray-200 text-gray-400'
                            }`}>
                              {step.icon}
                            </div>
                            <p className="text-[10px] font-semibold mt-1">{step.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Parties Involved */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="border rounded-xl p-3">
                      <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                        <span>👤</span> Customer Details
                      </h4>
                      <p className="text-sm font-medium text-gray-800">{selectedDispute.customer.name}</p>
                      <p className="text-xs text-gray-500">{selectedDispute.customer.email}</p>
                      <p className="text-xs text-gray-500">{selectedDispute.customer.phone}</p>
                    </div>
                    <div className="border rounded-xl p-3">
                      <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                        <span>🏢</span> Vendor Details
                      </h4>
                      <p className="text-sm font-medium text-gray-800">{selectedDispute.vendor.name}</p>
                      <p className="text-xs text-gray-500">{selectedDispute.vendor.email}</p>
                      <p className="text-xs text-gray-500">{selectedDispute.vendor.phone}</p>
                    </div>
                  </div>

                  {/* Issue Description */}
                  <div className="border rounded-xl p-3">
                    <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <span>⚠️</span> Issue Description
                    </h4>
                    <p className="text-sm text-gray-600">{selectedDispute.description}</p>
                    <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between text-xs">
                      <span className="text-gray-400">Amount: <span className="font-semibold text-gray-700">₹{selectedDispute.amount.toLocaleString()}</span></span>
                      <span className="text-gray-400">Created: {selectedDispute.createdDate}</span>
                    </div>
                  </div>

                  {/* Evidence */}
                  <div className="border rounded-xl p-3">
                    <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <span>📎</span> Evidence ({selectedDispute.evidence.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedDispute.evidence.map((ev, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{ev.type === 'pdf' ? '📄' : '🖼️'}</span>
                            <div>
                              <p className="text-xs font-medium text-gray-700">{ev.name}</p>
                              <p className="text-[10px] text-gray-400">{ev.size}</p>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleDownloadEvidence(ev)}
                            className="text-xs text-blue-500 hover:text-blue-600"
                          >
                            Download
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="border rounded-xl p-3">
                    <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                      <span>📅</span> Timeline
                    </h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {selectedDispute.timeline.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5"></div>
                          <div className="flex-1">
                            <p className="text-xs font-medium text-gray-700">{item.action}</p>
                            <p className="text-[10px] text-gray-400">{item.date} by {item.by}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Resolution Details */}
                  {selectedDispute.resolution && (
                    <div className="border rounded-xl p-3 bg-green-50 border-green-200">
                      <h4 className="text-xs font-semibold text-green-800 mb-2 flex items-center gap-1">
                        <span>🎉</span> Resolution Details
                      </h4>
                      <div className="space-y-1">
                        <p className="text-sm text-green-700">
                          <span className="font-semibold">Action:</span> {selectedDispute.resolution.type === 'refund' ? 'Refund Processed' : 'Penalty Applied'}
                        </p>
                        <p className="text-sm text-green-700">
                          <span className="font-semibold">Amount:</span> ₹{selectedDispute.resolution.amount?.toLocaleString()}
                        </p>
                        <p className="text-sm text-green-700">
                          <span className="font-semibold">Date:</span> {selectedDispute.resolution.date}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="p-4 border-t border-gray-100 bg-gray-50">
                  <div className="flex flex-wrap gap-2">
                    {selectedDispute.status === 'verification' && (
                      <button 
                        onClick={() => handleVerifyFacts(selectedDispute.id)} 
                        className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs hover:bg-purple-700 transition-colors"
                      >
                        ✅ Verify Facts
                      </button>
                    )}
                    
                    {(selectedDispute.status === 'investigating' || selectedDispute.status === 'verified') && (
                      <button 
                        onClick={() => setShowActionModal(true)} 
                        className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs hover:bg-red-700 transition-colors"
                      >
                        ⚖️ Take Action
                      </button>
                    )}
                    
                    {selectedDispute.status === 'action_taken' && (
                      <button 
                        onClick={() => handleMarkResolved(selectedDispute.id)} 
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs hover:bg-emerald-700 transition-colors"
                      >
                        🎉 Mark Resolved
                      </button>
                    )}
                    
                    <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs hover:bg-gray-50 transition-colors">
                      💬 Contact Parties
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-12 text-center">
                <div>
                  <div className="text-6xl mb-4">⚖️</div>
                  <p className="text-gray-400 mb-2">Select a dispute to manage resolution workflow</p>
                  <p className="text-sm text-gray-400">Click on any dispute from the list to view details and take action</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && selectedDispute && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowActionModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Take Action</h3>
              <p className="text-sm text-gray-500">Resolve dispute for {selectedDispute.id}</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Action Type</label>
                <select 
                  value={actionType} 
                  onChange={(e) => setActionType(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                >
                  <option value="">Select Action</option>
                  <option value="refund">💰 Approve Refund / Compensation</option>
                  <option value="vendor_warning">⚠️ Issue Warning to Vendor</option>
                  <option value="vendor_penalty">📊 Apply Penalty to Vendor</option>
                  <option value="suspend">🚫 Suspend Vendor Account</option>
                </select>
              </div>
              
              {(actionType === 'refund' || actionType === 'vendor_penalty') && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    {actionType === 'refund' ? 'Refund Amount' : 'Penalty Amount'}
                  </label>
                  <input
                    type="number"
                    value={actionAmount}
                    onChange={(e) => setActionAmount(e.target.value)}
                    placeholder={`Enter amount in ₹`}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Max: ₹{selectedDispute.amount.toLocaleString()}
                  </p>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Action Notes</label>
                <textarea 
                  placeholder="Provide justification..." 
                  rows="3" 
                  value={actionNote} 
                  onChange={(e) => setActionNote(e.target.value)} 
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
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Confirm Action
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