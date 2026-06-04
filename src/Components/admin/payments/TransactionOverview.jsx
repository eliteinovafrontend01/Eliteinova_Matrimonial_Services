// src/components/admin/payments/TransactionOverview.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { PaymentBadge } from '../shared/PaymentBadge';
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

// Mock transaction data
const mockTransactions = [
  { id: 'TXN1001', bookingId: 'BKG001', customerName: 'Priya Sharma', serviceType: 'Wedding Photography', vendor: 'ABC Events', amount: 25000, paymentMethod: 'UPI', transactionDate: '2024-01-15', status: 'Paid', razorpayId: 'pay_xyz123' },
  { id: 'TXN1002', bookingId: 'BKG002', customerName: 'Amit Patel', serviceType: 'Catering', vendor: 'Premier Catering', amount: 45000, paymentMethod: 'Credit Card', transactionDate: '2024-01-16', status: 'Pending', razorpayId: null },
  { id: 'TXN1003', bookingId: 'BKG003', customerName: 'Neha Gupta', serviceType: 'Wedding Hall', vendor: 'Grand Palace', amount: 150000, paymentMethod: 'Net Banking', transactionDate: '2024-01-14', status: 'Failed', razorpayId: 'pay_failed456' },
  { id: 'TXN1004', bookingId: 'BKG004', customerName: 'Rajesh Kumar', serviceType: 'Decorations', vendor: 'XYZ Decor', amount: 35000, paymentMethod: 'Wallet', transactionDate: '2024-01-13', status: 'Refunded', razorpayId: 'pay_refund789' },
  { id: 'TXN1005', bookingId: 'BKG005', customerName: 'Sneha Reddy', serviceType: 'Entertainment', vendor: 'Melody Music', amount: 28000, paymentMethod: 'UPI', transactionDate: '2024-01-12', status: 'Partially Paid', razorpayId: 'pay_partial111' },
];

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
    <div className="text-red-600 text-lg font-semibold mb-2">⚠️ Error</div>
    <div className="text-red-500 mb-4">{message}</div>
    {onRetry && (
      <button onClick={onRetry} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
        Retry
      </button>
    )}
  </div>
);

const TransactionDetailsModal = ({ transaction, onClose }) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Transaction Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg"><Icon d={ICONS.cancel} size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-xs text-gray-400 font-bold">Transaction ID</label><p className="font-mono text-sm">{transaction.id}</p></div>
            <div><label className="text-xs text-gray-400 font-bold">Booking ID</label><p className="font-mono text-sm">{transaction.bookingId}</p></div>
            <div><label className="text-xs text-gray-400 font-bold">Customer</label><p className="font-semibold">{transaction.customerName}</p></div>
            <div><label className="text-xs text-gray-400 font-bold">Service</label><p>{transaction.serviceType}</p></div>
            <div><label className="text-xs text-gray-400 font-bold">Vendor</label><p>{transaction.vendor}</p></div>
            <div><label className="text-xs text-gray-400 font-bold">Amount</label><p className="text-lg font-bold text-green-600">{formatCurrency(transaction.amount)}</p></div>
            <div><label className="text-xs text-gray-400 font-bold">Payment Method</label><p>{transaction.paymentMethod}</p></div>
            <div><label className="text-xs text-gray-400 font-bold">Status</label><PaymentBadge status={transaction.status} /></div>
            <div><label className="text-xs text-gray-400 font-bold">Date</label><p>{transaction.transactionDate}</p></div>
            {transaction.razorpayId && <div><label className="text-xs text-gray-400 font-bold">Razorpay ID</label><p className="font-mono text-xs">{transaction.razorpayId}</p></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TransactionOverview = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const itemsPerPage = 10;

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await new Promise(r => setTimeout(r, 500));
        setTransactions(mockTransactions);
      } catch (err) {
        setError('Failed to load transactions');
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

  const filtered = useMemo(() => {
    return transactions.filter(t => {
      const matchStatus = statusFilter === 'All' || t.status === statusFilter;
      const matchSearch = !search || 
        t.customerName.toLowerCase().includes(search.toLowerCase()) ||
        t.bookingId.toLowerCase().includes(search.toLowerCase()) ||
        t.serviceType.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [transactions, statusFilter, search]);

  const paginatedData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
  };

  const exportToCSV = () => {
    const headers = ['Transaction ID', 'Booking ID', 'Customer', 'Service', 'Vendor', 'Amount', 'Payment Method', 'Status', 'Date'];
    const rows = filtered.map(t => [t.id, t.bookingId, t.customerName, t.serviceType, t.vendor, t.amount, t.paymentMethod, t.status, t.transactionDate]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported successfully!');
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  const stats = {
    total: transactions.length,
    paid: transactions.filter(t => t.status === 'Paid').length,
    pending: transactions.filter(t => t.status === 'Pending').length,
    failed: transactions.filter(t => t.status === 'Failed').length,
    refunded: transactions.filter(t => t.status === 'Refunded').length,
    revenue: transactions.reduce((sum, t) => sum + (t.status === 'Paid' ? t.amount : 0), 0),
  };

  return (
    <div>
      {toast.show && <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">{toast.message}</div>}
      {showDetailsModal && <TransactionDetailsModal transaction={selectedTransaction} onClose={() => setShowDetailsModal(false)} />}
      
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">💰</div>
          <div><h3 className="text-xl font-bold text-gray-800">Transaction Overview</h3><p className="text-sm text-gray-500">View all payment transactions with detailed information</p></div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {[
          { label: 'Total Transactions', value: stats.total, icon: '💳', color: 'border-blue-400' },
          { label: 'Paid', value: stats.paid, icon: '✅', color: 'border-green-400', filter: 'Paid' },
          { label: 'Pending', value: stats.pending, icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
          { label: 'Failed', value: stats.failed, icon: '❌', color: 'border-red-400', filter: 'Failed' },
          { label: 'Refunded', value: stats.refunded, icon: '🔄', color: 'border-purple-400', filter: 'Refunded' },
          { label: 'Revenue', value: formatCurrency(stats.revenue), icon: '💰', color: 'border-emerald-400' },
        ].map((s, i) => (
          <div key={i} onClick={() => s.filter && setStatusFilter(s.filter)} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} ${s.filter ? 'cursor-pointer' : ''} transition-all hover:shadow-md ${statusFilter === s.filter ? 'ring-2 ring-red-400' : ''}`}>
            <div className="flex justify-between"><div><p className="text-xs font-semibold text-gray-400">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div><div className="text-2xl">{s.icon}</div></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap justify-between gap-4 mb-4">
            <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center"><Icon d={ICONS.booking} size={18} /></div><div><h3 className="font-bold">All Transactions</h3><p className="text-xs text-gray-400">{filtered.length} transactions found</p></div></div>
            <button onClick={exportToCSV} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg"><Icon d={ICONS.download} size={13} /> Export CSV</button>
          </div>
          <div className="flex flex-wrap gap-3 mb-3"><div className="flex-1 relative"><span className="absolute left-3 top-1/2 -translate-y-1/2"><Icon d={ICONS.search} size={15} /></span><input value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} placeholder="Search by customer, booking ID, service..." className="w-full pl-9 pr-4 py-2 text-sm border rounded-xl bg-gray-50" /></div></div>
          <div className="flex flex-wrap gap-2">{['All', 'Paid', 'Pending', 'Failed', 'Refunded', 'Partially Paid'].map(f => (<button key={f} onClick={() => { setStatusFilter(f); setCurrentPage(1); }} className={`px-3 py-1.5 text-xs font-semibold rounded-xl ${statusFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>{f}</button>))}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50"><tr>{['ID', 'Booking', 'Customer', 'Service', 'Vendor', 'Amount', 'Method', 'Status', 'Date', 'Actions'].map(h => (<th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400">{h}</th>))}</tr></thead>
            <tbody className="divide-y">
              {paginatedData.map(t => (<tr key={t.id} className="hover:bg-gray-50"><td className="px-4 py-3 text-xs font-mono">{t.id}</td><td className="px-4 py-3 text-xs font-mono">{t.bookingId}</td><td className="px-4 py-3 text-sm font-semibold">{t.customerName}</td><td className="px-4 py-3 text-xs">{t.serviceType}</td><td className="px-4 py-3 text-xs">{t.vendor}</td><td className="px-4 py-3 text-sm font-bold">{formatCurrency(t.amount)}</td><td className="px-4 py-3 text-xs">{t.paymentMethod}</td><td className="px-4 py-3"><PaymentBadge status={t.status} /></td><td className="px-4 py-3 text-xs">{t.transactionDate}</td><td className="px-4 py-3"><button onClick={() => handleViewDetails(t)} className="p-1.5 rounded-lg hover:bg-blue-50"><Icon d={ICONS.eye} size={14} /></button></td></tr>))}
              {paginatedData.length === 0 && <tr><td colSpan={10} className="text-center py-8 text-gray-400">No transactions found</td></tr>}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && <div className="px-5 py-3 border-t flex justify-between"><p className="text-xs text-gray-400">Page {currentPage} of {totalPages}</p><div className="flex gap-1"><button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p-1)} className="px-3 py-1 text-sm border rounded">Previous</button><button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p+1)} className="px-3 py-1 text-sm border rounded">Next</button></div></div>}
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