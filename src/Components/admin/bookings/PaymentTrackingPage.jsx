// src/Components/admin/bookings/PaymentTrackingPage.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { PaymentBadge } from '../shared/PaymentBadge';
import { FeatureCard } from '../shared/FeatureCard';
import { allBookingsData } from '../../../data/admin/bookings';
import { ICONS } from '../../../constants/admin/icons';

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

// Payment Details Modal
const PaymentDetailsModal = ({ payment, onClose, onProcessPayment, onProcessRefund }) => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [refundReason, setRefundReason] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showRefundForm, setShowRefundForm] = useState(false);

  if (!payment) return null;

  const balance = payment.amount - payment.paid;

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(paymentAmount);
    if (amount > 0 && amount <= balance) {
      onProcessPayment(payment.id, amount, paymentMethod);
      setShowPaymentForm(false);
      setPaymentAmount('');
      onClose();
    }
  };

  const handleRefundSubmit = (e) => {
    e.preventDefault();
    if (refundReason) {
      onProcessRefund(payment.id, payment.paid, refundReason);
      setShowRefundForm(false);
      setRefundReason('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Payment Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl mb-3">💰</div>
            <h4 className="text-lg font-bold text-gray-800">{payment.customer}</h4>
            <p className="text-xs text-gray-500">Booking ID: {payment.id}</p>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Total Amount</span>
              <span className="text-sm font-bold text-gray-800">{formatCurrency(payment.amount)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Paid Amount</span>
              <span className="text-sm font-bold text-green-600">{formatCurrency(payment.paid)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Balance</span>
              <span className="text-sm font-bold text-red-600">{formatCurrency(balance)}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Payment Status</span>
              <PaymentBadge status={payment.status} />
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-sm text-gray-500">Booking Date</span>
              <span className="text-sm font-semibold text-gray-700">{payment.date}</span>
            </div>
          </div>
          
          {!showPaymentForm && !showRefundForm && (
            <div className="flex gap-3 pt-4">
              {balance > 0 && payment.status !== 'Completed' && (
                <button
                  onClick={() => setShowPaymentForm(true)}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Receive Payment
                </button>
              )}
              {payment.paid > 0 && payment.status !== 'Refunded' && (
                <button
                  onClick={() => setShowRefundForm(true)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Process Refund
                </button>
              )}
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          )}
          
          {showPaymentForm && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Amount</label>
                <input
                  type="number"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                  placeholder={`Max: ${formatCurrency(balance)}`}
                  max={balance}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                >
                  <option>Credit Card</option>
                  <option>Debit Card</option>
                  <option>UPI</option>
                  <option>Net Banking</option>
                  <option>Cash</option>
                </select>
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Process Payment
                </button>
              </div>
            </form>
          )}
          
          {showRefundForm && (
            <form onSubmit={handleRefundSubmit} className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                ⚠️ Refund amount: {formatCurrency(payment.paid)}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Refund Reason</label>
                <textarea
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  rows="3"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
                  placeholder="Reason for refund..."
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowRefundForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Process Refund
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Transaction History Modal
const TransactionHistoryModal = ({ transactions, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Transaction History</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-400">No transactions found</div>
          ) : (
            <div className="space-y-3">
              {transactions.map((tx, idx) => (
                <div key={idx} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-gray-800">{tx.type}</p>
                      <p className="text-xs text-gray-500">{tx.date}</p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      tx.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Method: {tx.method}</p>
                      {tx.receipt && <p className="text-xs text-gray-500">Receipt: {tx.receipt}</p>}
                      {tx.reason && <p className="text-xs text-gray-500">Reason: {tx.reason}</p>}
                    </div>
                    <p className={`text-lg font-bold ${tx.type === 'Payment' ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.type === 'Payment' ? '+' : '-'} {formatCurrency(tx.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const PaymentTrackingPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentsData, setPaymentsData] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const loadPayments = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Generate enriched payment data
        const enrichedPayments = allBookingsData.map((b, index) => {
          const amount = b.amount ? parseInt(b.amount.replace(/[^0-9]/g, '')) : 15000 + (index * 5000);
          let paid = 0;
          let status = 'Pending';
          
          if (b.paymentStatus === 'Completed') {
            paid = amount;
            status = 'Completed';
          } else if (b.paymentStatus === 'Partial') {
            paid = Math.floor(amount * 0.6);
            status = 'Partial';
          } else if (b.paymentStatus === 'Refunded') {
            paid = amount;
            status = 'Refunded';
          } else {
            paid = 0;
            status = 'Pending';
          }
          
          return {
            id: b.id,
            customer: b.customer,
            amount: amount,
            paid: paid,
            status: status,
            date: b.bookingDate,
            paymentMethod: 'Credit Card',
            transactionId: `TXN_${b.id}`,
            dueDate: b.eventDate
          };
        });
        
        setPaymentsData(enrichedPayments);
        
        // Mock transactions
        setTransactions([
          { id: 1, bookingId: 'BK-001', type: 'Payment', amount: 25000, method: 'Credit Card', date: '2024-01-15', status: 'Completed', receipt: 'RCP-001' },
          { id: 2, bookingId: 'BK-002', type: 'Payment', amount: 15000, method: 'UPI', date: '2024-01-16', status: 'Completed', receipt: 'RCP-002' },
          { id: 3, bookingId: 'BK-001', type: 'Refund', amount: 5000, method: 'Credit Card', date: '2024-01-20', status: 'Completed', reason: 'Customer cancellation' },
        ]);
      } catch (err) {
        setError('Failed to load payment data');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPayments();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const stats = useMemo(() => {
    const totalRevenue = paymentsData.reduce((sum, p) => sum + (p.status === 'Completed' ? p.amount : 0), 0);
    const pendingPayments = paymentsData.reduce((sum, p) => sum + (p.amount - p.paid), 0);
    const partialPayments = paymentsData.reduce((sum, p) => sum + (p.status === 'Partial' ? p.paid : 0), 0);
    const todayCollection = paymentsData
      .filter(p => p.date === new Date().toISOString().split('T')[0])
      .reduce((sum, p) => sum + p.paid, 0);
    
    return {
      totalRevenue,
      pendingPayments,
      partialPayments,
      todayCollection,
      completedCount: paymentsData.filter(p => p.status === 'Completed').length,
      pendingCount: paymentsData.filter(p => p.status === 'Pending').length,
      partialCount: paymentsData.filter(p => p.status === 'Partial').length,
      refundedCount: paymentsData.filter(p => p.status === 'Refunded').length
    };
  }, [paymentsData]);

  const filtered = useMemo(() => {
    return paymentsData.filter(p => {
      const matchStatus = activeFilter === 'All' || p.status === activeFilter;
      const matchSearch = !search || 
        p.customer.toLowerCase().includes(search.toLowerCase()) || 
        p.id.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [paymentsData, activeFilter, search]);

  const handleProcessPayment = (bookingId, amount, method) => {
    setPaymentsData(prev => prev.map(p => {
      if (p.id === bookingId) {
        const newPaid = p.paid + amount;
        let newStatus = p.status;
        if (newPaid >= p.amount) {
          newStatus = 'Completed';
        } else if (newPaid > 0) {
          newStatus = 'Partial';
        }
        
        return { ...p, paid: newPaid, status: newStatus };
      }
      return p;
    }));
    showToast(`Payment of ${formatCurrency(amount)} received successfully!`, 'success');
  };

  const handleProcessRefund = (bookingId, amount, reason) => {
    setPaymentsData(prev => prev.map(p => {
      if (p.id === bookingId) {
        return { ...p, paid: 0, status: 'Refunded' };
      }
      return p;
    }));
    showToast(`Refund of ${formatCurrency(amount)} processed successfully!`, 'success');
  };

  const exportToCSV = () => {
    try {
      const exportData = filtered.map(p => ({
        'Booking ID': p.id,
        'Customer Name': p.customer,
        'Total Amount': p.amount,
        'Paid Amount': p.paid,
        'Balance': p.amount - p.paid,
        'Payment Status': p.status,
        'Booking Date': p.date,
        'Due Date': p.dueDate
      }));
      
      const headers = Object.keys(exportData[0] || {});
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
      link.download = `payments_export_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast(`Successfully exported ${filtered.length} transactions!`, 'success');
    } catch (err) {
      showToast('Error exporting data', 'error');
    }
  };

  const statCards = [
    { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), icon: '💰', color: 'border-green-400' },
    { label: 'Pending Payments', value: formatCurrency(stats.pendingPayments), icon: '⏳', color: 'border-amber-400' },
    { label: 'Partial Payments', value: formatCurrency(stats.partialPayments), icon: '🔄', color: 'border-blue-400' },
    { label: "Today's Collection", value: formatCurrency(stats.todayCollection), icon: '📅', color: 'border-purple-400' },
  ];

  const featureCards = [
    { emoji: '💳', title: 'Payment Gateway Integration', accentColor: 'bg-blue-50', points: ['Multiple payment methods', 'Secure transaction processing', 'Automatic reconciliation', 'Fraud detection'] },
    { emoji: '📊', title: 'Financial Analytics', accentColor: 'bg-green-50', points: ['Revenue reports', 'Payment trends', 'Outstanding tracking', 'Collection forecasts'] },
    { emoji: '🔄', title: 'Refund Processing', accentColor: 'bg-red-50', points: ['Automated refunds', 'Partial refund support', 'Status tracking', 'Customer notification'] },
    { emoji: '📑', title: 'Transaction History', accentColor: 'bg-purple-50', points: ['Complete audit trail', 'Export capabilities', 'Search & filter', 'Dispute management'] }
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

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
      {showPaymentModal && selectedPayment && (
        <PaymentDetailsModal 
          payment={selectedPayment}
          onProcessPayment={handleProcessPayment}
          onProcessRefund={handleProcessRefund}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPayment(null);
          }}
        />
      )}

      {showHistoryModal && (
        <TransactionHistoryModal 
          transactions={transactions}
          onClose={() => setShowHistoryModal(false)}
        />
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">💰</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Payment & Transaction Tracking</h3>
            <p className="text-sm text-gray-500 mt-0.5">Monitor payment status across all bookings and process transactions</p>
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
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
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
                <Icon d={ICONS.payment} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Transaction Records</h3>
                <p className="text-xs text-gray-400">
                  {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
                  {activeFilter !== 'All' ? ` (filtered: ${activeFilter})` : ' total'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFilter !== 'All' && (
                <button 
                  onClick={() => setActiveFilter('All')} 
                  className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  ✕ Clear Filter
                </button>
              )}
              <button 
                onClick={() => setShowHistoryModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Icon d={ICONS.history} size={13} /> History
              </button>
              <button 
                onClick={exportToCSV}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <Icon d={ICONS.download} size={13} /> Export
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
                onChange={e => setSearch(e.target.value)} 
                type="text" 
                placeholder="Search by booking ID or customer name..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {['All', 'Pending', 'Partial', 'Completed', 'Refunded'].map(f => (
                <button 
                  key={f} 
                  onClick={() => setActiveFilter(f)} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
                    activeFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Booking ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Customer</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Total Amount</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Paid Amount</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Balance</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Due Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-400">
                    No transactions found for the selected filters.
                  </td>
                </tr>
              ) : (
                filtered.map(p => {
                  const balance = p.amount - p.paid;
                  return (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono text-gray-500">{p.id}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-[10px] font-bold">
                            {p.customer.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{p.customer}</span>
                        </div>
                       </td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-800">{formatCurrency(p.amount)}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-green-600">{formatCurrency(p.paid)}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-red-600">{formatCurrency(balance)}</td>
                      <td className="px-4 py-3"><PaymentBadge status={p.status} /></td>
                      <td className="px-4 py-3 text-xs text-gray-500">{p.dueDate}</td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => {
                            setSelectedPayment(p);
                            setShowPaymentModal(true);
                          }}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View/Process Payment"
                        >
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                       </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Card View */}
        <div className="lg:hidden p-4">
          {filtered.length === 0 ? (
            <div className="text-center text-sm text-gray-400 py-8">
              No transactions found for the selected filters.
            </div>
          ) : (
            filtered.map(p => {
              const balance = p.amount - p.paid;
              return (
                <div key={p.id} className="bg-white border border-gray-100 rounded-xl p-4 mb-3 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-xs font-bold">
                        {p.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 text-sm">{p.customer}</div>
                        <div className="text-xs text-gray-400 font-mono">{p.id}</div>
                      </div>
                    </div>
                    <PaymentBadge status={p.status} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div>
                      <span className="text-gray-400">Total:</span>
                      <span className="text-gray-800 font-bold ml-1">{formatCurrency(p.amount)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Paid:</span>
                      <span className="text-green-600 font-semibold ml-1">{formatCurrency(p.paid)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Balance:</span>
                      <span className="text-red-600 font-semibold ml-1">{formatCurrency(balance)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Due Date:</span>
                      <span className="text-gray-700 ml-1">{p.dueDate}</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => {
                      setSelectedPayment(p);
                      setShowPaymentModal(true);
                    }}
                    className="w-full mt-2 px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              );
            })
          )}
        </div>
        
        {/* Summary Footer */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-wrap justify-between items-center gap-2 text-xs">
            <div className="flex gap-4">
              <span className="text-gray-500">
                Completed: <span className="font-semibold text-green-600">{stats.completedCount}</span>
              </span>
              <span className="text-gray-500">
                Partial: <span className="font-semibold text-blue-600">{stats.partialCount}</span>
              </span>
              <span className="text-gray-500">
                Pending: <span className="font-semibold text-amber-600">{stats.pendingCount}</span>
              </span>
              <span className="text-gray-500">
                Refunded: <span className="font-semibold text-red-600">{stats.refundedCount}</span>
              </span>
            </div>
            <span className="text-gray-400">
              Total Revenue: <span className="font-bold text-gray-800">{formatCurrency(stats.totalRevenue)}</span>
            </span>
          </div>
        </div>
      </div>
      
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