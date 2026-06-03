// src/components/admin/payments/PaymentsTransactionsPage.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { PaymentBadge } from '../shared/PaymentBadge';
import { FeatureCard } from '../shared/FeatureCard';
import { ICONS } from '../../../constants/admin/icons';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

// Transaction Details Modal
const TransactionDetailsModal = ({ transaction, onClose }) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Transaction Details</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Transaction ID</label>
              <p className="text-sm font-mono text-gray-800">{transaction.id}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Booking ID</label>
              <p className="text-sm font-mono text-gray-800">{transaction.bookingId}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Customer Name</label>
              <p className="text-sm font-semibold text-gray-800">{transaction.customer}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Service Type</label>
              <p className="text-sm text-gray-800">{transaction.service}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Vendor</label>
              <p className="text-sm text-gray-800">{transaction.vendor}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Payment Method</label>
              <p className="text-sm text-gray-800">{transaction.method}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Amount</label>
              <p className="text-lg font-bold text-green-600">{transaction.amount}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Status</label>
              <div className="mt-1"><PaymentBadge status={transaction.status} /></div>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Commission</label>
              <p className="text-sm text-gray-800">{transaction.commission}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Vendor Payout</label>
              <p className="text-sm font-semibold text-gray-800">{transaction.payout}</p>
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase font-bold">Transaction Date</label>
              <p className="text-sm text-gray-800">{transaction.date}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Receipt Modal
const ReceiptModal = ({ transaction, onClose }) => {
  if (!transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold">Payment Receipt</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <Icon d={ICONS.cancel} size={20} />
          </button>
        </div>
        <div className="p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">EVENTPLAN</h1>
            <p className="text-gray-500">123 Event Street, Mumbai - 400001</p>
            <p className="text-gray-500">GST: 27AAACA1234A1Z</p>
          </div>
          
          <div className="border-t border-b py-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400">Receipt No:</p>
                <p className="font-semibold">{transaction.id}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Date:</p>
                <p className="font-semibold">{transaction.date}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Customer Name:</p>
                <p className="font-semibold">{transaction.customer}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Booking ID:</p>
                <p className="font-semibold">{transaction.bookingId}</p>
              </div>
            </div>
          </div>
          
          <table className="w-full mb-4">
            <thead className="border-b">
              <tr className="text-left text-xs text-gray-400">
                <th className="py-2">Description</th>
                <th className="py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">{transaction.service} by {transaction.vendor}</td>
                <td className="py-2 text-right">{transaction.amount}</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 text-gray-600">Platform Fee (10%)</td>
                <td className="py-2 text-right text-red-500">{transaction.commission}</td>
              </tr>
              <tr className="font-bold">
                <td className="py-2">Total Paid</td>
                <td className="py-2 text-right text-green-600">{transaction.amount}</td>
              </tr>
            </tbody>
          </table>
          
          <div className="text-center text-sm text-gray-500 pt-4 border-t">
            <p>Thank you for choosing EVENTPLAN!</p>
            <p className="text-xs mt-1">This is a system generated receipt</p>
          </div>
        </div>
        <div className="p-4 border-t flex gap-3">
          <button onClick={handlePrint} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">
            🖨️ Print Receipt
          </button>
          <button onClick={onClose} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const PaymentsTransactionsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const transactionsData = [
    { id: 'TXN001', bookingId: 'BK001', customer: 'Aarav Patel', vendor: 'LensArt Studio', service: 'Photography', amount: '₹45,000', amountNum: 45000, date: '10 Jan 2024', method: 'UPI', status: 'Paid', commission: '₹4,500', payout: '₹40,500' },
    { id: 'TXN002', bookingId: 'BK002', customer: 'Ishita Reddy', vendor: 'Royal Feast', service: 'Catering', amount: '₹1,20,000', amountNum: 120000, date: '20 Feb 2024', method: 'Credit Card', status: 'Partial', commission: '₹6,000', payout: '₹54,000' },
    { id: 'TXN003', bookingId: 'BK003', customer: 'Rohan Deshmukh', vendor: 'Dream Decor', service: 'Decorations', amount: '₹65,000', amountNum: 65000, date: '1 Mar 2024', method: 'Net Banking', status: 'Pending', commission: '₹0', payout: '₹0' },
    { id: 'TXN004', bookingId: 'BK004', customer: 'Neha Gupta', vendor: 'Grand Palace', service: 'Wedding Halls', amount: '₹3,50,000', amountNum: 350000, date: '5 Apr 2024', method: 'UPI', status: 'Paid', commission: '₹35,000', payout: '₹3,15,000' },
    { id: 'TXN005', bookingId: 'BK005', customer: 'Vikram Singh', vendor: 'Glam Studio', service: 'Bridal Styling', amount: '₹18,000', amountNum: 18000, date: '12 Apr 2024', method: 'PhonePe', status: 'Refunded', commission: '₹0', payout: '₹0' },
    { id: 'TXN006', bookingId: 'BK006', customer: 'Meera Nair', vendor: 'Shutter Stories', service: 'Photography', amount: '₹55,000', amountNum: 55000, date: '18 Apr 2024', method: 'Credit Card', status: 'Paid', commission: '₹5,500', payout: '₹49,500' },
    { id: 'TXN007', bookingId: 'BK007', customer: 'Arjun Mehta', vendor: 'DJ Rhythm Pro', service: 'Entertainment', amount: '₹30,000', amountNum: 30000, date: '22 Apr 2024', method: 'Google Pay', status: 'Pending', commission: '₹0', payout: '₹0' },
    { id: 'TXN008', bookingId: 'BK008', customer: 'Priya Sharma', vendor: "Nawab's Kitchen", service: 'Catering', amount: '₹2,10,000', amountNum: 210000, date: '28 Apr 2024', method: 'Net Banking', status: 'Partial', commission: '₹10,500', payout: '₹1,89,000' },
  ];

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleExport = () => {
    try {
      const exportData = filtered.map(t => ({
        'Transaction ID': t.id,
        'Booking ID': t.bookingId,
        'Customer': t.customer,
        'Vendor': t.vendor,
        'Service': t.service,
        'Amount': t.amount,
        'Date': t.date,
        'Payment Method': t.method,
        'Status': t.status,
        'Commission': t.commission,
        'Payout': t.payout
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
      link.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast(`Successfully exported ${filtered.length} transactions!`, 'success');
    } catch (err) {
      showToast('Error exporting data', 'error');
    }
  };

  const filtered = useMemo(() => {
    return transactionsData.filter(t => {
      const matchStatus = activeFilter === 'All' || t.status === activeFilter;
      const matchSearch = !search || 
        t.customer.toLowerCase().includes(search.toLowerCase()) || 
        t.vendor.toLowerCase().includes(search.toLowerCase()) ||
        t.bookingId.toLowerCase().includes(search.toLowerCase()) ||
        t.service.toLowerCase().includes(search.toLowerCase()) ||
        t.id.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [transactionsData, activeFilter, search]);

  const stats = {
    totalRevenue: transactionsData.reduce((sum, t) => sum + (t.status !== 'Refunded' ? t.amountNum : 0), 0),
    totalCommission: transactionsData.reduce((sum, t) => sum + (t.status === 'Paid' ? parseInt(t.commission.replace(/[^0-9]/g, '')) : 0), 0),
    pendingAmount: transactionsData.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amountNum, 0),
    paidAmount: transactionsData.filter(t => t.status === 'Paid').reduce((sum, t) => sum + t.amountNum, 0),
    refundedAmount: transactionsData.filter(t => t.status === 'Refunded').reduce((sum, t) => sum + t.amountNum, 0),
  };

  const statCards = [
    { label: 'Total Revenue', value: `₹${(stats.totalRevenue / 100000).toFixed(2)}L`, icon: '💰', color: 'border-green-400', filter: 'All' },
    { label: 'Commission Earned', value: `₹${(stats.totalCommission / 1000).toFixed(1)}K`, icon: '🏦', color: 'border-blue-400', filter: 'All' },
    { label: 'Pending', value: `₹${(stats.pendingAmount / 1000).toFixed(1)}K`, icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Paid', value: `₹${(stats.paidAmount / 100000).toFixed(2)}L`, icon: '✅', color: 'border-emerald-400', filter: 'Paid' },
    { label: 'Refunded', value: `₹${(stats.refundedAmount / 1000).toFixed(1)}K`, icon: '🔄', color: 'border-red-400', filter: 'Refunded' },
  ];

  const featureCards = [
    { emoji: '💳', title: 'Multiple Payment Methods', accentColor: 'bg-purple-50', points: ['UPI (Google Pay, PhonePe)', 'Credit/Debit Cards', 'Net Banking', 'Digital Wallets'] },
    { emoji: '🏦', title: 'Vendor Payout Management', accentColor: 'bg-blue-50', points: ['Manage vendor payments', 'Commission deduction tracking', 'Payout schedule management', 'Real-time payout status'] },
    { emoji: '📊', title: 'Commission Tracking', accentColor: 'bg-green-50', points: ['Auto-calculate platform commission', 'Track per transaction', 'Generate commission reports', 'Revenue analytics'] },
    { emoji: '🔒', title: 'Fraud Detection & Security', accentColor: 'bg-red-50', points: ['Monitor suspicious transactions', 'Secure payment processing', 'Payment gateway integration', 'Transaction audit logs'] }
  ];

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Modals */}
      {showDetailsModal && (
        <TransactionDetailsModal 
          transaction={selectedTransaction} 
          onClose={() => setShowDetailsModal(false)} 
        />
      )}
      {showReceiptModal && (
        <ReceiptModal 
          transaction={selectedTransaction} 
          onClose={() => setShowReceiptModal(false)} 
        />
      )}

      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">💰</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Payments & Transactions</h3>
            <p className="text-sm text-gray-500 mt-0.5">Track all payments, vendor payouts, commissions and transaction history</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} onClick={() => setActiveFilter(s.filter)}
            className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-xl font-bold text-gray-800">{s.value}</p>
                {activeFilter === s.filter && s.filter !== 'All' && (
                  <p className="text-[9px] text-red-500 font-bold mt-1">● Active Filter</p>
                )}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.payments} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Transaction Overview</h3>
                <p className="text-xs text-gray-400">{filtered.length} transaction{filtered.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `— ${activeFilter}` : 'all transactions'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFilter !== 'All' && (
                <button onClick={() => setActiveFilter('All')} className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100">
                  ✕ Clear
                </button>
              )}
              <button onClick={handleExport} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700">
                <Icon d={ICONS.download} size={13} /> Export CSV
              </button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex-1 min-w-[200px] relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon d={ICONS.search} size={15} />
                </span>
                <input 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                  placeholder="Search by customer, vendor, service or booking ID..." 
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 bg-gray-50" 
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {['All','Paid','Pending','Partial','Refunded'].map(f => (
                <button key={f} onClick={() => setActiveFilter(f)} 
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['TXN ID','Booking ID','Customer','Vendor','Service','Amount','Date','Method','Status','Commission','Payout','Actions'].map(h => 
                  <th key={h} className="px-3 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={12} className="px-4 py-12 text-center text-sm text-gray-400">
                    No transactions found for "{activeFilter}" filter.
                  </td>
                </tr>
              ) : (
                filtered.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-3 text-xs font-mono text-gray-500">{t.id}</td>
                    <td className="px-3 py-3 text-xs font-mono text-gray-500">{t.bookingId}</td>
                    <td className="px-3 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">{t.customer}</td>
                    <td className="px-3 py-3 text-xs text-gray-600 whitespace-nowrap">{t.vendor}</td>
                    <td className="px-3 py-3"><span className="text-xs font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded-lg">{t.service}</span></td>
                    <td className="px-3 py-3 text-xs font-bold text-gray-800">{t.amount}</td>
                    <td className="px-3 py-3 text-xs text-gray-400 whitespace-nowrap">{t.date}</td>
                    <td className="px-3 py-3 text-xs text-gray-600">{t.method}</td>
                    <td className="px-3 py-3"><PaymentBadge status={t.status} /></td>
                    <td className="px-3 py-3 text-xs text-green-600 font-semibold">{t.commission}</td>
                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">{t.payout}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-1.5">
                        <button 
                          onClick={() => {
                            setSelectedTransaction(t);
                            setShowDetailsModal(true);
                          }} 
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                          title="View Details"
                        >
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedTransaction(t);
                            setShowReceiptModal(true);
                          }} 
                          className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors"
                          title="Download Receipt"
                        >
                          <Icon d={ICONS.download} size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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