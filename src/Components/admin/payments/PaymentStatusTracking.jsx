// src/components/admin/payments/PaymentStatusTracking.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { PaymentBadge } from '../shared/PaymentBadge';
import { ICONS } from '../../../constants/admin/icons';

const mockPayments = [
  { id: 'PAY001', bookingId: 'BKG001', customer: 'Priya Sharma', amount: 25000, status: 'Paid', dueDate: '2024-01-15', paidDate: '2024-01-15', method: 'UPI', transactionRef: 'TXN1001' },
  { id: 'PAY002', bookingId: 'BKG002', customer: 'Amit Patel', amount: 45000, status: 'Pending', dueDate: '2024-01-20', paidDate: null, method: null, transactionRef: null },
  { id: 'PAY003', bookingId: 'BKG003', customer: 'Neha Gupta', amount: 150000, status: 'Failed', dueDate: '2024-01-10', paidDate: null, method: 'Credit Card', transactionRef: 'TXN1003' },
  { id: 'PAY004', bookingId: 'BKG004', customer: 'Rajesh Kumar', amount: 35000, status: 'Refunded', dueDate: '2024-01-05', paidDate: '2024-01-05', method: 'Wallet', transactionRef: 'TXN1004' },
  { id: 'PAY005', bookingId: 'BKG005', customer: 'Sneha Reddy', amount: 28000, status: 'Partially Paid', dueDate: '2024-01-18', paidDate: '2024-01-12', method: 'UPI', transactionRef: 'TXN1005', paidAmount: 14000 },
];

const PaymentDetailsModal = ({ payment, onClose, onUpdateStatus }) => {
  const [status, setStatus] = useState(payment?.status || '');
  const [note, setNote] = useState('');

  const handleUpdate = () => {
    onUpdateStatus(payment.id, status, note);
    onClose();
  };

  if (!payment) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b"><h3 className="text-lg font-bold">Update Payment Status</h3><p className="text-sm text-gray-500">Booking: {payment.bookingId}</p></div>
        <div className="p-6 space-y-4">
          <div><label className="block text-sm font-semibold mb-2">Current Status</label><PaymentBadge status={payment.status} /></div>
          <div><label className="block text-sm font-semibold mb-2">Change Status</label><select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border rounded-lg"><option value="Paid">Paid</option><option value="Pending">Pending</option><option value="Failed">Failed</option><option value="Refunded">Refunded</option><option value="Partially Paid">Partially Paid</option></select></div>
          <div><label className="block text-sm font-semibold mb-2">Note (Optional)</label><textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} className="w-full p-2 border rounded-lg" placeholder="Add a note about this payment..." /></div>
          <div className="flex gap-3"><button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button><button onClick={handleUpdate} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Update Status</button></div>
        </div>
      </div>
    </div>
  );
};

export const PaymentStatusTracking = () => {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => { setPayments(mockPayments); setIsLoading(false); }, 500);
  }, []);

  const showToastMsg = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleUpdateStatus = (id, newStatus, note) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, status: newStatus, note } : p));
    showToastMsg(`Payment ${id} status updated to ${newStatus}`);
  };

  const filtered = useMemo(() => {
    return payments.filter(p => {
      const matchStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchSearch = !search || p.customer.toLowerCase().includes(search.toLowerCase()) || p.bookingId.toLowerCase().includes(search.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [payments, statusFilter, search]);

  if (isLoading) return <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div></div>;

  const stats = {
    total: payments.length,
    paid: payments.filter(p => p.status === 'Paid').length,
    pending: payments.filter(p => p.status === 'Pending').length,
    failed: payments.filter(p => p.status === 'Failed').length,
    refunded: payments.filter(p => p.status === 'Refunded').length,
    partial: payments.filter(p => p.status === 'Partially Paid').length,
  };

  return (
    <div>
      {toast.show && <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">{toast.message}</div>}
      {showModal && <PaymentDetailsModal payment={selectedPayment} onClose={() => setShowModal(false)} onUpdateStatus={handleUpdateStatus} />}

      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-green-50 to-teal-50 border border-green-200">
        <div className="flex items-center gap-4"><div className="text-4xl">📊</div><div><h3 className="text-xl font-bold">Payment Status Tracking</h3><p className="text-sm text-gray-500">Monitor payment status in real-time</p></div></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {[
          { label: 'Total', value: stats.total, icon: '💳', color: 'border-gray-400' },
          { label: 'Paid', value: stats.paid, icon: '✅', color: 'border-green-400', filter: 'Paid' },
          { label: 'Pending', value: stats.pending, icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
          { label: 'Failed', value: stats.failed, icon: '❌', color: 'border-red-400', filter: 'Failed' },
          { label: 'Refunded', value: stats.refunded, icon: '🔄', color: 'border-purple-400', filter: 'Refunded' },
          { label: 'Partial', value: stats.partial, icon: '🔸', color: 'border-blue-400', filter: 'Partially Paid' },
        ].map((s, i) => (
          <div key={i} onClick={() => s.filter && setStatusFilter(s.filter)} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all ${statusFilter === s.filter ? 'ring-2 ring-red-400' : ''}`}>
            <div className="flex justify-between"><div><p className="text-xs font-semibold text-gray-400">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div><div className="text-2xl">{s.icon}</div></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border">
        <div className="p-5 border-b">
          <div className="flex flex-wrap gap-3"><div className="flex-1 relative"><span className="absolute left-3 top-1/2 -translate-y-1/2"><Icon d={ICONS.search} size={15} /></span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by customer or booking ID..." className="w-full pl-9 pr-4 py-2 border rounded-xl bg-gray-50" /></div></div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50"><tr>{['Booking ID', 'Customer', 'Amount', 'Status', 'Due Date', 'Paid Date', 'Method', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400">{h}</th>)}</tr></thead>
            <tbody className="divide-y">
              {filtered.map(p => (<tr key={p.id} className="hover:bg-gray-50"><td className="px-4 py-3 text-xs font-mono">{p.bookingId}</td><td className="px-4 py-3 text-sm font-semibold">{p.customer}</td><td className="px-4 py-3 font-bold">₹{p.amount.toLocaleString()}{p.paidAmount && <span className="text-xs text-gray-400 ml-1">(Paid: ₹{p.paidAmount})</span>}</td><td className="px-4 py-3"><PaymentBadge status={p.status} /></td><td className="px-4 py-3 text-xs">{p.dueDate}</td><td className="px-4 py-3 text-xs">{p.paidDate || '-'}</td><td className="px-4 py-3 text-xs">{p.method || '-'}</td><td className="px-4 py-3"><button onClick={() => { setSelectedPayment(p); setShowModal(true); }} className="px-3 py-1 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700">Update</button></td></tr>))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};