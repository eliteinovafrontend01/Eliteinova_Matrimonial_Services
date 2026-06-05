// src/pages/admin/complaints/AdminActions.jsx
import { useState, useMemo } from 'react';

export const AdminActions = () => {
  const [vendors, setVendors] = useState([
    { 
      id: 'VEN001', 
      name: 'LensArt Studio', 
      email: 'contact@lensart.com', 
      phone: '+91 98765 43211',
      rating: 4.5, 
      status: 'active', 
      warnings: 1, 
      penalties: 0, 
      complaints: 3, 
      totalRefunds: 5000,
      totalCompensation: 0,
      joinedDate: '2023-01-15',
      lastAction: null,
      actionHistory: [
        { type: 'warning', reason: 'Late delivery', date: '2024-01-10', by: 'Admin' }
      ]
    },
    { 
      id: 'VEN002', 
      name: 'Royal Feast', 
      email: 'info@royalfeast.com', 
      phone: '+91 98765 43213',
      rating: 4.2, 
      status: 'active', 
      warnings: 0, 
      penalties: 0, 
      complaints: 1, 
      totalRefunds: 0,
      totalCompensation: 0,
      joinedDate: '2023-03-20',
      lastAction: null,
      actionHistory: []
    },
    { 
      id: 'VEN003', 
      name: 'Dream Decor', 
      email: 'hello@dreamdecor.com', 
      phone: '+91 98765 43215',
      rating: 3.8, 
      status: 'warning', 
      warnings: 2, 
      penalties: 1, 
      complaints: 5, 
      totalRefunds: 15000,
      totalCompensation: 5000,
      joinedDate: '2022-11-10',
      lastAction: { type: 'penalty', amount: 10000, date: '2024-01-05', reason: 'Poor service quality' },
      actionHistory: [
        { type: 'warning', reason: 'Poor decoration quality', date: '2023-12-01', by: 'Admin' },
        { type: 'warning', reason: 'Late arrival', date: '2023-12-15', by: 'Admin' },
        { type: 'penalty', reason: 'Customer complaint unresolved', date: '2024-01-05', by: 'Admin', amount: 10000 }
      ]
    },
    { 
      id: 'VEN004', 
      name: 'Shutter Stories', 
      email: 'studio@shutterstories.com', 
      phone: '+91 98765 43217',
      rating: 2.5, 
      status: 'suspended', 
      warnings: 3, 
      penalties: 2, 
      complaints: 8, 
      totalRefunds: 25000,
      totalCompensation: 10000,
      joinedDate: '2022-08-05',
      lastAction: { type: 'suspended', date: '2024-01-10', reason: 'Repeated violations and customer complaints' },
      actionHistory: [
        { type: 'warning', reason: 'No-show', date: '2023-10-10', by: 'Admin' },
        { type: 'warning', reason: 'Quality issues', date: '2023-11-15', by: 'Admin' },
        { type: 'penalty', reason: 'Multiple complaints', date: '2023-12-01', by: 'Admin', amount: 5000 },
        { type: 'warning', reason: 'Final warning', date: '2023-12-20', by: 'Admin' },
        { type: 'penalty', reason: 'Failed to improve', date: '2024-01-05', by: 'Admin', amount: 15000 },
        { type: 'suspended', reason: 'Repeated violations', date: '2024-01-10', by: 'Admin' }
      ]
    },
  ]);

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionAmount, setActionAmount] = useState('');
  const [actionReason, setActionReason] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [showCompensationModal, setShowCompensationModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const filteredVendors = useMemo(() => {
    return vendors.filter(vendor => {
      const matchStatus = statusFilter === 'all' || vendor.status === statusFilter;
      const matchSearch = !searchTerm || 
        vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [vendors, statusFilter, searchTerm]);

  const handleVendorAction = () => {
    if (!selectedVendor) return;
    if (!actionReason.trim()) {
      showToastMsg('Please provide a reason for this action', 'warning');
      return;
    }

    let updates = {};
    let actionRecord = {
      type: actionType,
      reason: actionReason,
      date: new Date().toLocaleString(),
      by: 'Admin',
      amount: actionType === 'penalty' ? parseInt(actionAmount) : null
    };

    switch (actionType) {
      case 'warning':
        updates = { 
          warnings: selectedVendor.warnings + 1, 
          status: selectedVendor.warnings + 1 >= 2 ? 'warning' : 'active',
          lastAction: actionRecord
        };
        showToastMsg(`Warning issued to ${selectedVendor.name}`, 'warning');
        break;
      case 'penalty':
        if (!actionAmount || parseInt(actionAmount) <= 0) {
          showToastMsg('Please enter a valid penalty amount', 'warning');
          return;
        }
        updates = { 
          penalties: selectedVendor.penalties + 1, 
          status: selectedVendor.penalties + 1 >= 2 ? 'suspended' : 'warning',
          lastAction: actionRecord
        };
        showToastMsg(`Penalty of ₹${parseInt(actionAmount).toLocaleString()} applied to ${selectedVendor.name}`, 'success');
        break;
      case 'suspend':
        updates = { status: 'suspended', lastAction: actionRecord };
        showToastMsg(`${selectedVendor.name} has been suspended`, 'warning');
        break;
      case 'activate':
        updates = { status: 'active', lastAction: actionRecord };
        showToastMsg(`${selectedVendor.name} has been activated`, 'success');
        break;
    }

    setVendors(prev => prev.map(v => 
      v.id === selectedVendor.id 
        ? { 
            ...v, 
            ...updates, 
            actionHistory: [actionRecord, ...v.actionHistory]
          } 
        : v
    ));

    setSelectedVendor(prev => prev ? {
      ...prev,
      ...updates,
      actionHistory: [actionRecord, ...prev.actionHistory]
    } : null);

    setShowActionModal(false);
    setActionType('');
    setActionAmount('');
    setActionReason('');
  };

  const handleCompensation = () => {
    if (!selectedVendor) return;
    if (!actionAmount || parseInt(actionAmount) <= 0) {
      showToastMsg('Please enter a valid compensation amount', 'warning');
      return;
    }
    if (!actionReason.trim()) {
      showToastMsg('Please provide a reason for compensation', 'warning');
      return;
    }

    const compensationRecord = {
      type: 'compensation',
      amount: parseInt(actionAmount),
      reason: actionReason,
      date: new Date().toLocaleString(),
      by: 'Admin'
    };

    setVendors(prev => prev.map(v => 
      v.id === selectedVendor.id 
        ? { 
            ...v, 
            totalCompensation: v.totalCompensation + parseInt(actionAmount),
            totalRefunds: v.totalRefunds + parseInt(actionAmount),
            actionHistory: [compensationRecord, ...v.actionHistory],
            lastAction: compensationRecord
          } 
        : v
    ));

    setSelectedVendor(prev => prev ? {
      ...prev,
      totalCompensation: prev.totalCompensation + parseInt(actionAmount),
      totalRefunds: prev.totalRefunds + parseInt(actionAmount),
      actionHistory: [compensationRecord, ...prev.actionHistory],
      lastAction: compensationRecord
    } : null);

    setShowCompensationModal(false);
    setActionAmount('');
    setActionReason('');
    showToastMsg(`Compensation of ₹${parseInt(actionAmount).toLocaleString()} approved`, 'success');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
      case 'warning': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
      case 'suspended': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  const stats = {
    total: vendors.length,
    active: vendors.filter(v => v.status === 'active').length,
    warning: vendors.filter(v => v.status === 'warning').length,
    suspended: vendors.filter(v => v.status === 'suspended').length,
    totalPenalties: vendors.reduce((sum, v) => sum + v.penalties, 0),
    totalRefunds: vendors.reduce((sum, v) => sum + v.totalRefunds, 0)
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
          <div className="text-4xl">🛡️</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Admin Actions</h3>
            <p className="text-sm text-gray-500 mt-0.5">Approve refunds or compensation, issue warnings or penalties to vendors, suspend or deactivate accounts if required</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-blue-400">
          <p className="text-xs text-gray-400">Total Vendors</p>
          <p className="text-xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-green-400">
          <p className="text-xs text-gray-400">Active</p>
          <p className="text-xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-amber-400">
          <p className="text-xs text-gray-400">Warning</p>
          <p className="text-xl font-bold text-amber-600">{stats.warning}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-red-400">
          <p className="text-xs text-gray-400">Suspended</p>
          <p className="text-xl font-bold text-red-600">{stats.suspended}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-purple-400">
          <p className="text-xs text-gray-400">Total Penalties</p>
          <p className="text-xl font-bold">{stats.totalPenalties}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm border-l-4 border-orange-400">
          <p className="text-xs text-gray-400">Total Refunds</p>
          <p className="text-xl font-bold">₹{stats.totalRefunds.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vendors List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-semibold text-gray-800 text-sm">Vendor Management</h3>
              <p className="text-xs text-gray-400 mt-1">{filteredVendors.length} vendors</p>
            </div>

            {/* Search and Filter */}
            <div className="p-3 border-b border-gray-100 space-y-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search vendors..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-1.5 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="warning">Warning</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div className="divide-y divide-gray-100 max-h-[500px] overflow-y-auto">
              {filteredVendors.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-2">🛡️</div>
                  <p className="text-gray-400">No vendors found</p>
                </div>
              ) : (
                filteredVendors.map(vendor => {
                  const statusColor = getStatusColor(vendor.status);
                  return (
                    <div 
                      key={vendor.id} 
                      onClick={() => setSelectedVendor(vendor)} 
                      className={`p-3 cursor-pointer hover:bg-gray-50 transition-all ${
                        selectedVendor?.id === vendor.id ? 'bg-red-50 border-l-4 border-red-500' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <p className="font-medium text-gray-800 text-sm">{vendor.name}</p>
                          <p className="text-xs text-gray-400">{vendor.id}</p>
                        </div>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusColor.bg} ${statusColor.text}`}>
                          {vendor.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-1 text-[10px] text-gray-500">
                        <span>⭐ {vendor.rating}</span>
                        <span>⚠️ {vendor.warnings}</span>
                        <span>💰 {vendor.penalties}</span>
                        <span>📋 {vendor.complaints}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Vendor Details */}
        <div className="lg:col-span-2">
          {selectedVendor ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{selectedVendor.name}</h3>
                    <p className="text-sm text-gray-500">{selectedVendor.email}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{selectedVendor.phone}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-500">⭐ {selectedVendor.rating}</div>
                    <p className="text-xs text-gray-400">Vendor Rating</p>
                    <p className="text-[10px] text-gray-400">Joined: {selectedVendor.joinedDate}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-5">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-gray-800">{selectedVendor.complaints}</p>
                    <p className="text-xs text-gray-400">Total Complaints</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-amber-600">{selectedVendor.warnings}</p>
                    <p className="text-xs text-gray-400">Warnings Issued</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-red-600">{selectedVendor.penalties}</p>
                    <p className="text-xs text-gray-400">Penalties Applied</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-green-600">₹{selectedVendor.totalRefunds.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Total Refunds</p>
                  </div>
                </div>

                {/* Last Action */}
                {selectedVendor.lastAction && (
                  <div className="border rounded-xl p-3 bg-blue-50 border-blue-200">
                    <h4 className="text-xs font-semibold text-blue-800 mb-1">Last Action</h4>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-blue-700">
                          {selectedVendor.lastAction.type === 'warning' ? '⚠️ Warning' : 
                           selectedVendor.lastAction.type === 'penalty' ? '💰 Penalty' : 
                           selectedVendor.lastAction.type === 'suspended' ? '🚫 Suspended' : 
                           selectedVendor.lastAction.type === 'compensation' ? '💵 Compensation' : '✅ Activated'}
                        </p>
                        {selectedVendor.lastAction.amount && (
                          <p className="text-xs text-blue-600">Amount: ₹{selectedVendor.lastAction.amount.toLocaleString()}</p>
                        )}
                        <p className="text-xs text-blue-600 mt-0.5">{selectedVendor.lastAction.reason}</p>
                      </div>
                      <p className="text-[10px] text-blue-500">{selectedVendor.lastAction.date}</p>
                    </div>
                  </div>
                )}

                {/* Compensation Summary */}
                <div className="border rounded-xl p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-sm font-semibold text-gray-700">💰 Refund & Compensation Summary</h4>
                    <button 
                      onClick={() => setShowHistoryModal(true)} 
                      className="text-xs text-blue-500 hover:text-blue-600"
                    >
                      View Full History →
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-red-600">₹{selectedVendor.totalRefunds.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Total refunds processed</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">₹{selectedVendor.totalCompensation.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Total compensation paid</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowCompensationModal(true)} 
                    className="mt-3 w-full px-4 py-2 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition-colors"
                  >
                    + Approve Compensation / Refund
                  </button>
                </div>

                {/* Vendor Actions */}
                <div className="border rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">⚖️ Vendor Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => { setActionType('warning'); setShowActionModal(true); }} 
                      className="px-3 py-2 border border-amber-500 text-amber-600 rounded-lg text-sm hover:bg-amber-50 transition-colors"
                    >
                      ⚠️ Issue Warning
                    </button>
                    <button 
                      onClick={() => { setActionType('penalty'); setShowActionModal(true); }} 
                      className="px-3 py-2 border border-red-500 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors"
                    >
                      💰 Apply Penalty
                    </button>
                    {selectedVendor.status !== 'suspended' ? (
                      <button 
                        onClick={() => { setActionType('suspend'); setShowActionModal(true); }} 
                        className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                      >
                        🚫 Suspend Account
                      </button>
                    ) : (
                      <button 
                        onClick={() => { setActionType('activate'); setShowActionModal(true); }} 
                        className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                      >
                        ✅ Activate Account
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Stats Note */}
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-500">
                    {selectedVendor.warnings >= 2 ? '⚠️ Vendor has received multiple warnings' : 
                     selectedVendor.penalties >= 2 ? '⚠️ Vendor has received multiple penalties' : 
                     '✅ Vendor is in good standing'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-6xl mb-4">🛡️</div>
              <p className="text-gray-400 mb-2">Select a vendor to perform admin actions</p>
              <p className="text-sm text-gray-400">Click on any vendor from the list to manage warnings, penalties, and compensation</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Modal (Warning/Penalty/Suspend/Activate) */}
      {showActionModal && selectedVendor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowActionModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">
                {actionType === 'warning' ? '⚠️ Issue Warning' : 
                 actionType === 'penalty' ? '💰 Apply Penalty' : 
                 actionType === 'suspend' ? '🚫 Suspend Account' : '✅ Activate Account'}
              </h3>
              <p className="text-sm text-gray-500">Vendor: {selectedVendor.name}</p>
            </div>
            <div className="p-5 space-y-4">
              {actionType === 'penalty' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Penalty Amount (₹)</label>
                  <input 
                    type="number" 
                    placeholder="Enter penalty amount" 
                    value={actionAmount} 
                    onChange={(e) => setActionAmount(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Reason for Action</label>
                <textarea 
                  placeholder="Provide detailed reason for this action..." 
                  rows="3" 
                  value={actionReason} 
                  onChange={(e) => setActionReason(e.target.value)} 
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
                  onClick={handleVendorAction} 
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Confirm Action
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compensation Modal */}
      {showCompensationModal && selectedVendor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowCompensationModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Approve Refund / Compensation</h3>
              <p className="text-sm text-gray-500">Vendor: {selectedVendor.name}</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Amount (₹)</label>
                <input 
                  type="number" 
                  placeholder="Enter amount" 
                  value={actionAmount} 
                  onChange={(e) => setActionAmount(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Reason for Compensation</label>
                <textarea 
                  placeholder="Provide reason for this compensation..." 
                  rows="3" 
                  value={actionReason} 
                  onChange={(e) => setActionReason(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 resize-none"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowCompensationModal(false)} 
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCompensation} 
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Approve Compensation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && selectedVendor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowHistoryModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Action History</h3>
                <p className="text-sm text-gray-500">{selectedVendor.name} - {selectedVendor.id}</p>
              </div>
              <button 
                onClick={() => setShowHistoryModal(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-5 space-y-3">
              {selectedVendor.actionHistory.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400">No actions recorded yet</p>
                </div>
              ) : (
                selectedVendor.actionHistory.map((action, idx) => (
                  <div key={idx} className="border rounded-xl p-3 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">
                          {action.type === 'warning' ? '⚠️' : 
                           action.type === 'penalty' ? '💰' : 
                           action.type === 'suspended' ? '🚫' : 
                           action.type === 'compensation' ? '💵' : '✅'}
                        </span>
                        <span className="text-sm font-semibold text-gray-800">
                          {action.type === 'warning' ? 'Warning Issued' : 
                           action.type === 'penalty' ? 'Penalty Applied' : 
                           action.type === 'suspended' ? 'Account Suspended' : 
                           action.type === 'compensation' ? 'Compensation Approved' : 'Account Activated'}
                        </span>
                      </div>
                      <span className="text-[10px] text-gray-400">{action.date}</span>
                    </div>
                    {action.amount && (
                      <p className="text-sm text-gray-600 mt-1">Amount: ₹{action.amount.toLocaleString()}</p>
                    )}
                    <p className="text-sm text-gray-600 mt-1">Reason: {action.reason}</p>
                    <p className="text-xs text-gray-400 mt-2">By: {action.by}</p>
                  </div>
                ))
              )}
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