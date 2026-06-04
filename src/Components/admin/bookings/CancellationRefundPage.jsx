// src/Components/admin/bookings/CancellationRefundPage.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { BookingBadge } from '../shared/BookingBadge';
import { PaymentBadge } from '../shared/PaymentBadge';
import { FeatureCard } from '../shared/FeatureCard';
import { ICONS } from '../../../constants/admin/icons';

// Helper function to format currency with appropriate units
const formatCurrency = (amount) => {
  if (amount >= 10000000) { // 1 Crore = 10,000,000
    return `₹${(amount / 10000000).toFixed(2)}Cr`;
  } else if (amount >= 100000) { // 1 Lakh = 100,000
    return `₹${(amount / 100000).toFixed(2)}L`;
  } else if (amount >= 1000) { // 1 Thousand = 1,000
    return `₹${(amount / 1000).toFixed(1)}K`;
  } else {
    return `₹${amount}`;
  }
};

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

// Error Message Component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
    <div className="text-red-600 text-lg font-semibold mb-2">⚠️ Error</div>
    <div className="text-red-500 mb-4">{message}</div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    )}
  </div>
);

// Action Modal (Approve/Reject/Refund)
const ActionModal = ({ request, actionType, onConfirm, onClose }) => {
  const [refundAmount, setRefundAmount] = useState(request?.amount || 0);
  const [remarks, setRemarks] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    onConfirm(request.id, actionType, { refundAmount, remarks });
    onClose();
  };

  const getTitle = () => {
    switch(actionType) {
      case 'approve': return 'Approve Cancellation';
      case 'reject': return 'Reject Cancellation';
      case 'refund': return 'Process Refund';
      default: return 'Action';
    }
  };

  const getButtonText = () => {
    if (isConfirming) return 'Confirm';
    switch(actionType) {
      case 'approve': return 'Approve & Refund';
      case 'reject': return 'Reject Request';
      case 'refund': return 'Process Refund';
      default: return 'Submit';
    }
  };

  const getButtonColor = () => {
    switch(actionType) {
      case 'approve': return 'bg-green-600 hover:bg-green-700';
      case 'reject': return 'bg-red-600 hover:bg-red-700';
      case 'refund': return 'bg-blue-600 hover:bg-blue-700';
      default: return 'bg-red-600 hover:bg-red-700';
    }
  };

  const calculateRefundAmount = () => {
    if (actionType === 'approve') {
      // Calculate refund based on policy (80% refund if within 7 days, etc.)
      const requestDate = new Date(request.requestDate);
      const today = new Date();
      const diffDays = Math.floor((today - requestDate) / (1000 * 60 * 60 * 24));
      if (diffDays <= 7) {
        return Math.floor(request.amount * 0.9);
      } else if (diffDays <= 14) {
        return Math.floor(request.amount * 0.7);
      } else {
        return Math.floor(request.amount * 0.5);
      }
    }
    return request?.amount || 0;
  };

  useEffect(() => {
    if (actionType === 'approve') {
      setRefundAmount(calculateRefundAmount());
    }
  }, [actionType, request]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">{getTitle()}</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Booking ID:</span>
              <span className="font-semibold">{request?.bookingId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Customer:</span>
              <span className="font-semibold">{request?.customer}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Request Date:</span>
              <span className="font-semibold">{request?.requestDate}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Original Amount:</span>
              <span className="font-semibold">{formatCurrency(request?.amount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Reason:</span>
              <span className="font-semibold">{request?.reason}</span>
            </div>
          </div>
          
          {(actionType === 'approve' || actionType === 'refund') && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Refund Amount</label>
              <input
                type="number"
                value={refundAmount}
                onChange={(e) => setRefundAmount(parseFloat(e.target.value))}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                required
              />
              {actionType === 'approve' && (
                <p className="text-xs text-gray-400 mt-1">
                  Calculated based on refund policy (deduction applied)
                </p>
              )}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Remarks</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Add remarks about this action..."
              required
            />
          </div>
          
          {isConfirming && (
            <div className={`rounded-lg p-3 text-sm ${
              actionType === 'approve' ? 'bg-green-50 text-green-700 border border-green-200' :
              actionType === 'reject' ? 'bg-red-50 text-red-700 border border-red-200' :
              'bg-blue-50 text-blue-700 border border-blue-200'
            }`}>
              ⚠️ Please confirm this action. This cannot be undone.
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
              className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${getButtonColor()}`}
            >
              {getButtonText()}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reschedule Modal
const RescheduleModal = ({ request, onReschedule, onClose }) => {
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [reason, setReason] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    onReschedule(request.bookingId, newDate, newTime, reason);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">Reschedule Booking</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
              <Icon d={ICONS.cancel} size={20} />
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Booking ID:</span>
              <span className="font-semibold">{request?.bookingId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Customer:</span>
              <span className="font-semibold">{request?.customer}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Date</label>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">New Time</label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Reschedule</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Reason for rescheduling..."
              required
            />
          </div>
          
          {isConfirming && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
              ⚠️ Confirm rescheduling this booking to {newDate} at {newTime}
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
              {isConfirming ? 'Confirm Reschedule' : 'Reschedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Refund Details Modal
const RefundDetailsModal = ({ refund, onClose }) => {
  if (!refund) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Refund Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl mb-3">💰</div>
            <h4 className="text-lg font-bold text-gray-800">Refund Processed</h4>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Transaction ID</span>
              <span className="text-sm font-mono font-semibold text-gray-700">{refund.transactionId}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Refund Amount</span>
              <span className="text-sm font-bold text-green-600">{formatCurrency(refund.amount)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Refund Date</span>
              <span className="text-sm font-semibold text-gray-700">{refund.date}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Method</span>
              <span className="text-sm font-semibold text-gray-700">{refund.method}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Status</span>
              <span className="text-sm font-semibold text-green-600">Completed</span>
            </div>
            <div className="py-2">
              <span className="text-sm text-gray-500">Remarks</span>
              <p className="text-sm text-gray-700 mt-1">{refund.remarks}</p>
            </div>
          </div>
          
          <div className="pt-4">
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

export const CancellationRefundPage = () => {
  const [activeTab, setActiveTab] = useState('requests');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cancellationRequests, setCancellationRequests] = useState([]);
  const [approvedRefunds, setApprovedRefunds] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Sample cancellation requests
        const sampleRequests = [
          { id: 'REQ-001', bookingId: 'BK-001', customer: 'John Doe', requestDate: '2024-01-20', reason: 'Change of plans - family emergency', amount: 15000, status: 'Pending', refundEligible: true, service: 'Wedding Photography' },
          { id: 'REQ-002', bookingId: 'BK-002', customer: 'Jane Smith', requestDate: '2024-01-21', reason: 'Vendor not available on requested date', amount: 8000, status: 'Approved', refundEligible: true, service: 'Birthday Decoration' },
          { id: 'REQ-003', bookingId: 'BK-003', customer: 'Mike Johnson', requestDate: '2024-01-19', reason: 'Budget constraints - unexpected expenses', amount: 25000, status: 'Pending', refundEligible: false, service: 'Corporate Event' },
          { id: 'REQ-004', bookingId: 'BK-004', customer: 'Sarah Wilson', requestDate: '2024-01-22', reason: 'Venue double booked', amount: 12000, status: 'Pending', refundEligible: true, service: 'Catering Services' },
          { id: 'REQ-005', bookingId: 'BK-005', customer: 'David Brown', requestDate: '2024-01-18', reason: 'Found better deal elsewhere', amount: 35000, status: 'Approved', refundEligible: true, service: 'Wedding Planning' },
        ];
        
        setCancellationRequests(sampleRequests);
        
        // Sample approved refunds
        const sampleRefunds = [
          { id: 'RFD-001', requestId: 'REQ-002', bookingId: 'BK-002', customer: 'Jane Smith', amount: 7200, date: '2024-01-22', method: 'Credit Card', status: 'Completed', remarks: 'Approved - vendor issue' },
          { id: 'RFD-002', requestId: 'REQ-005', bookingId: 'BK-005', customer: 'David Brown', amount: 28000, date: '2024-01-20', method: 'UPI', status: 'Completed', remarks: 'Approved - customer request' },
        ];
        
        setApprovedRefunds(sampleRefunds);
      } catch (err) {
        setError('Failed to load cancellation data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const stats = useMemo(() => {
    const pendingRequests = cancellationRequests.filter(r => r.status === 'Pending').length;
    const approvedCount = cancellationRequests.filter(r => r.status === 'Approved').length;
    const pendingRefunds = cancellationRequests.filter(r => r.status === 'Approved' && r.refundEligible).length;
    const totalRefunded = approvedRefunds.reduce((sum, r) => sum + r.amount, 0);
    
    return {
      pendingRequests,
      approvedCount,
      pendingRefunds,
      totalRefunded
    };
  }, [cancellationRequests, approvedRefunds]);

  const handleApproveRefund = (requestId, action, data) => {
    setCancellationRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        const newRefund = {
          id: `RFD-${Math.floor(Math.random() * 1000)}`,
          requestId: req.id,
          bookingId: req.bookingId,
          customer: req.customer,
          amount: data.refundAmount,
          date: new Date().toISOString().split('T')[0],
          method: 'Original Payment Method',
          status: 'Completed',
          remarks: data.remarks
        };
        setApprovedRefunds(prev => [...prev, newRefund]);
        return { ...req, status: 'Approved' };
      }
      return req;
    }));
    showToast(`Cancellation approved and refund of ${formatCurrency(data.refundAmount)} processed!`, 'success');
  };

  const handleRejectRequest = (requestId, action, data) => {
    setCancellationRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return { ...req, status: 'Rejected' };
      }
      return req;
    }));
    showToast(`Cancellation request rejected`, 'warning');
  };

  const handleProcessRefund = (requestId, action, data) => {
    const request = cancellationRequests.find(r => r.id === requestId);
    if (request) {
      const newRefund = {
        id: `RFD-${Math.floor(Math.random() * 1000)}`,
        requestId: request.id,
        bookingId: request.bookingId,
        customer: request.customer,
        amount: data.refundAmount,
        date: new Date().toISOString().split('T')[0],
        method: 'Original Payment Method',
        status: 'Completed',
        remarks: data.remarks
      };
      setApprovedRefunds(prev => [...prev, newRefund]);
      showToast(`Refund of ${formatCurrency(data.refundAmount)} processed successfully!`, 'success');
    }
  };

  const handleReschedule = (bookingId, newDate, newTime, reason) => {
    showToast(`Booking ${bookingId} rescheduled to ${newDate} at ${newTime}`, 'success');
  };

  const handleViewRefund = (refund) => {
    setSelectedRefund(refund);
    setShowRefundModal(true);
  };

  const statCards = [
    { label: 'Cancellation Requests', value: stats.pendingRequests, icon: '🎫', color: 'border-amber-400' },
    { label: 'Approved Refunds', value: stats.approvedCount, icon: '✅', color: 'border-green-400' },
    { label: 'Pending Refunds', value: stats.pendingRefunds, icon: '⏳', color: 'border-blue-400' },
    { label: 'Total Refunded', value: formatCurrency(stats.totalRefunded), icon: '💰', color: 'border-purple-400' },
  ];

  const featureCards = [
    { emoji: '⚖️', title: 'Refund Policy Engine', accentColor: 'bg-blue-50', points: ['Policy-based calculations', 'Automatic eligibility', 'Fee deduction rules', 'Transparent breakdown'] },
    { emoji: '🔄', title: 'Reschedule Workflow', accentColor: 'bg-green-50', points: ['Date change requests', 'Availability checking', 'Conflict resolution', 'Customer notification'] },
    { emoji: '📝', title: 'Reason Analytics', accentColor: 'bg-purple-50', points: ['Cancellation reason tracking', 'Trend analysis', 'Service improvement', 'Issue identification'] },
    { emoji: '💳', title: 'Automated Refunds', accentColor: 'bg-red-50', points: ['Instant processing', 'Original method return', 'Status tracking', 'Receipt generation'] }
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  const getFilteredRequests = () => {
    if (activeTab === 'requests') {
      return cancellationRequests.filter(r => r.status === 'Pending');
    }
    if (activeTab === 'approved') {
      return cancellationRequests.filter(r => r.status === 'Approved');
    }
    if (activeTab === 'pending-refunds') {
      return cancellationRequests.filter(r => r.status === 'Approved' && r.refundEligible);
    }
    return cancellationRequests;
  };

  const tabs = [
    { id: 'requests', label: 'Cancellation Requests', icon: '🎫', count: stats.pendingRequests },
    { id: 'approved', label: 'Approved Cancellations', icon: '✅', count: stats.approvedCount },
    { id: 'pending-refunds', label: 'Pending Refunds', icon: '⏳', count: stats.pendingRefunds }
  ];

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
      {showActionModal && selectedRequest && (
        <ActionModal 
          request={selectedRequest}
          actionType={actionType}
          onConfirm={(id, type, data) => {
            if (type === 'approve') handleApproveRefund(id, type, data);
            else if (type === 'reject') handleRejectRequest(id, type, data);
            else if (type === 'refund') handleProcessRefund(id, type, data);
          }}
          onClose={() => {
            setShowActionModal(false);
            setSelectedRequest(null);
            setActionType('');
          }}
        />
      )}

      {showRescheduleModal && selectedRequest && (
        <RescheduleModal 
          request={selectedRequest}
          onReschedule={handleReschedule}
          onClose={() => {
            setShowRescheduleModal(false);
            setSelectedRequest(null);
          }}
        />
      )}

      {showRefundModal && selectedRefund && (
        <RefundDetailsModal 
          refund={selectedRefund}
          onClose={() => {
            setShowRefundModal(false);
            setSelectedRefund(null);
          }}
        />
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">❌</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Cancellation & Refund Handling</h3>
            <p className="text-sm text-gray-500 mt-0.5">Manage booking cancellations, rescheduling requests, and initiate refund processes</p>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-gray-800">{s.value}</p>
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
              activeTab === tab.id 
                ? 'bg-white text-red-600 border-b-2 border-red-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <span>{tab.icon}</span> {tab.label}
            {tab.count > 0 && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Request ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Booking ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Customer</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Service</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Request Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Reason</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Amount</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {getFilteredRequests().length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-sm text-gray-400">
                    No {activeTab === 'requests' ? 'cancellation requests' : activeTab === 'approved' ? 'approved cancellations' : 'pending refunds'} found.
                  </td>
                </tr>
              ) : (
                getFilteredRequests().map(req => (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{req.id}</td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{req.bookingId}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-[10px] font-bold">
                          {req.customer.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">{req.customer}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded-lg">{req.service}</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">{req.requestDate}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 max-w-xs truncate" title={req.reason}>
                      {req.reason}
                    </td>
                    <td className="px-4 py-3 text-xs font-bold text-gray-800">{formatCurrency(req.amount)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        req.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                        req.status === 'Approved' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        {req.status === 'Pending' && (
                          <>
                            <button 
                              onClick={() => { 
                                setSelectedRequest(req); 
                                setActionType('approve'); 
                                setShowActionModal(true); 
                              }} 
                              className="px-2 py-1 bg-green-50 text-green-600 text-xs rounded-lg hover:bg-green-100 transition-colors"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => { 
                                setSelectedRequest(req); 
                                setActionType('reject'); 
                                setShowActionModal(true); 
                              }} 
                              className="px-2 py-1 bg-red-50 text-red-600 text-xs rounded-lg hover:bg-red-100 transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        {req.status === 'Approved' && req.refundEligible && (
                          <button 
                            onClick={() => { 
                              setSelectedRequest(req); 
                              setActionType('refund'); 
                              setShowActionModal(true); 
                            }} 
                            className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            Process Refund
                          </button>
                        )}
                        <button 
                          onClick={() => { 
                            setSelectedRequest(req); 
                            setShowRescheduleModal(true); 
                          }} 
                          className="px-2 py-1 bg-amber-50 text-amber-600 text-xs rounded-lg hover:bg-amber-100 transition-colors"
                        >
                          Reschedule
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Summary Footer */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500">
              Total requests: {cancellationRequests.length} | 
              Pending: {stats.pendingRequests} | 
              Approved: {stats.approvedCount}
            </span>
            <span className="text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      
      {/* Approved Refunds Section (shown on approved tab) */}
      {activeTab === 'approved' && approvedRefunds.length > 0 && (
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                <Icon d={ICONS.payment} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Processed Refunds</h3>
                <p className="text-xs text-gray-500">Recently processed refund transactions</p>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Transaction ID</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Booking ID</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Customer</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Amount</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Refund Date</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Status</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {approvedRefunds.map(refund => (
                  <tr key={refund.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{refund.id}</td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{refund.bookingId}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-700">{refund.customer}</td>
                    <td className="px-4 py-3 text-sm font-bold text-green-600">{formatCurrency(refund.amount)}</td>
                    <td className="px-4 py-3 text-xs text-gray-400">{refund.date}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">Completed</span>
                    </td>
                    <td className="px-4 py-3">
                      <button 
                        onClick={() => handleViewRefund(refund)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                        title="View Refund Details"
                      >
                        <Icon d={ICONS.eye} size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
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