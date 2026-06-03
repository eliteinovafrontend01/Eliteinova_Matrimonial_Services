// src/components/admin/payments/RefundManagement.jsx
import { useState, useEffect } from 'react';
import { PaymentBadge } from '../shared/PaymentBadge';

const mockRefunds = [
  { id: 'REF001', bookingId: 'BKG004', customer: 'Rajesh Kumar', originalAmount: 35000, refundAmount: 35000, reason: 'Customer cancellation', status: 'Completed', requestedDate: '2024-01-13', processedDate: '2024-01-14', method: 'Original Payment Method' },
  { id: 'REF002', bookingId: 'BKG006', customer: 'Deepa Nair', originalAmount: 28000, refundAmount: 14000, reason: 'Partial service not delivered', status: 'Processing', requestedDate: '2024-01-15', processedDate: null, method: 'UPI' },
  { id: 'REF003', bookingId: 'BKG007', customer: 'Manish Singh', originalAmount: 55000, refundAmount: 27500, reason: 'Vendor cancellation', status: 'Pending', requestedDate: '2024-01-16', processedDate: null, method: 'Credit Card' },
];

const ProcessRefundModal = ({ refund, onClose, onProcess }) => {
  const [amount, setAmount] = useState(refund?.originalAmount || '');
  const [reason, setReason] = useState(refund?.reason || '');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    onProcess(refund.id, { amount: parseFloat(amount), reason, notes });
    onClose();
  };

  if (!refund) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b"><h3 className="text-lg font-bold">Process Refund</h3><p className="text-sm text-gray-500">Booking: {refund.bookingId}</p></div>
        <div className="p-5 space-y-4"><div><label className="block text-sm font-semibold mb-1">Refund Amount</label><input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-2 border rounded-lg" /><p className="text-xs text-gray-400 mt-1">Max refund: ₹{refund.originalAmount}</p></div><div><label className="block text-sm font-semibold mb-1">Reason</label><input type="text" value={reason} onChange={(e) => setReason(e.target.value)} className="w-full p-2 border rounded-lg" /></div><div><label className="block text-sm font-semibold mb-1">Internal Notes</label><textarea rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2 border rounded-lg" placeholder="Add internal notes for audit..." /></div></div>
        <div className="p-4 border-t flex gap-3"><button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button><button onClick={handleSubmit} className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg">Process Refund</button></div>
      </div>
    </div>
  );
};

export const RefundManagement = () => {
  const [refunds, setRefunds] = useState([]);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('All');
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => { setTimeout(() => setRefunds(mockRefunds), 500); }, []);

  const showToastMsg = (msg) => { setToast({ show: true, message: msg }); setTimeout(() => setToast({ show: false, message: '' }), 3000); };

  const handleProcessRefund = (id, data) => {
    setRefunds(prev => prev.map(r => r.id === id ? { ...r, refundAmount: data.amount, reason: data.reason, status: 'Completed', processedDate: new Date().toISOString().split('T')[0], notes: data.notes } : r));
    showToastMsg(`Refund ${id} processed successfully`);
  };

  const filteredRefunds = refunds.filter(r => filter === 'All' || r.status === filter);

  return (
    <div>
      {toast.show && <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">{toast.message}</div>}
      {showModal && <ProcessRefundModal refund={selectedRefund} onClose={() => setShowModal(false)} onProcess={handleProcessRefund} />}

      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200">
        <div className="flex items-center gap-4"><div className="text-4xl">🔄</div><div><h3 className="text-xl font-bold">Refund Management</h3><p className="text-sm text-gray-500">Process full or partial refunds for cancellations</p></div></div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b flex flex-wrap justify-between gap-3"><div className="flex gap-2">{['All', 'Pending', 'Processing', 'Completed'].map(f => (<button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 text-xs rounded-full ${filter === f ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>{f}</button>))}</div></div>
        <div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50"><tr>{['Refund ID', 'Booking', 'Customer', 'Original', 'Refund Amount', 'Reason', 'Status', 'Requested', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400">{h}</th>)}</tr></thead><tbody className="divide-y">{filteredRefunds.map(r => (<tr key={r.id}><td className="px-4 py-3 text-xs font-mono">{r.id}</td><td className="px-4 py-3 text-xs">{r.bookingId}</td><td className="px-4 py-3 font-semibold">{r.customer}</td><td className="px-4 py-3">₹{r.originalAmount.toLocaleString()}</td><td className="px-4 py-3 font-bold text-amber-600">₹{r.refundAmount.toLocaleString()}</td><td className="px-4 py-3 text-xs max-w-[200px] truncate">{r.reason}</td><td className="px-4 py-3"><PaymentBadge status={r.status} /></td><td className="px-4 py-3 text-xs">{r.requestedDate}</td><td className="px-4 py-3">{r.status === 'Pending' && <button onClick={() => { setSelectedRefund(r); setShowModal(true); }} className="px-3 py-1 text-xs bg-amber-600 text-white rounded">Process</button>}{r.status === 'Completed' && <span className="text-xs text-green-600">✓ Processed on {r.processedDate}</span>}</td></tr>))}</tbody></table></div>
      </div>
    </div>
  );
};