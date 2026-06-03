// src/components/admin/payments/VendorPayoutManagement.jsx
import { useState, useEffect } from 'react';

const mockPayouts = [
  { id: 'PO001', vendorId: 'VEN001', vendorName: 'ABC Events', bookingId: 'BKG001', amount: 25000, commission: 2500, netAmount: 22500, status: 'Completed', dueDate: '2024-01-20', paidDate: '2024-01-18', method: 'Bank Transfer' },
  { id: 'PO002', vendorId: 'VEN002', vendorName: 'Premier Catering', bookingId: 'BKG002', amount: 45000, commission: 4500, netAmount: 40500, status: 'Pending', dueDate: '2024-01-25', paidDate: null, method: 'UPI' },
  { id: 'PO003', vendorId: 'VEN003', vendorName: 'Grand Palace', bookingId: 'BKG003', amount: 150000, commission: 15000, netAmount: 135000, status: 'Processing', dueDate: '2024-01-22', paidDate: null, method: 'Bank Transfer' },
];

const PayoutSettingsModal = ({ onClose, onSave }) => {
  const [settings, setSettings] = useState({ schedule: 'Weekly', day: 'Monday', minAmount: 1000, method: 'Auto' });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b"><h3 className="text-lg font-bold">Payout Settings</h3></div>
        <div className="p-5 space-y-4"><div><label className="block text-sm font-semibold">Schedule</label><select value={settings.schedule} onChange={(e) => setSettings({...settings, schedule: e.target.value})} className="w-full p-2 border rounded-lg"><option>Daily</option><option>Weekly</option><option>Bi-weekly</option><option>Monthly</option></select></div><div><label className="block text-sm font-semibold">Payout Day</label><select value={settings.day} onChange={(e) => setSettings({...settings, day: e.target.value})} className="w-full p-2 border rounded-lg"><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option></select></div><div><label className="block text-sm font-semibold">Minimum Payout Amount (₹)</label><input type="number" value={settings.minAmount} onChange={(e) => setSettings({...settings, minAmount: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg" /></div></div>
        <div className="p-4 border-t flex gap-3"><button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button><button onClick={() => { onSave(settings); onClose(); }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Save Settings</button></div>
      </div>
    </div>
  );
};

const ProcessPayoutModal = ({ payout, onClose, onProcess }) => {
  const [method, setMethod] = useState(payout?.method || 'Bank Transfer');
  const [reference, setReference] = useState('');

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b"><h3 className="text-lg font-bold">Process Payout</h3><p className="text-sm text-gray-500">Vendor: {payout?.vendorName}</p></div>
        <div className="p-5 space-y-4"><div><label className="block text-sm font-semibold">Amount</label><p className="text-xl font-bold text-green-600">₹{payout?.netAmount.toLocaleString()}</p></div><div><label className="block text-sm font-semibold">Payment Method</label><select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full p-2 border rounded-lg"><option>Bank Transfer</option><option>UPI</option><option>Wallet</option></select></div><div><label className="block text-sm font-semibold">Transaction Reference</label><input type="text" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="TX123456" className="w-full p-2 border rounded-lg" /></div></div>
        <div className="p-4 border-t flex gap-3"><button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button><button onClick={() => { onProcess(payout.id, { method, reference }); onClose(); }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Process Payout</button></div>
      </div>
    </div>
  );
};

export const VendorPayoutManagement = () => {
  const [payouts, setPayouts] = useState([]);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => { setTimeout(() => setPayouts(mockPayouts), 500); }, []);

  const showToastMsg = (msg) => { setToast({ show: true, message: msg }); setTimeout(() => setToast({ show: false, message: '' }), 3000); };

  const handleProcessPayout = (id, data) => {
    setPayouts(prev => prev.map(p => p.id === id ? { ...p, status: 'Completed', paidDate: new Date().toISOString().split('T')[0], transactionRef: data.reference, paymentMethod: data.method } : p));
    showToastMsg(`Payout ${id} processed successfully`);
  };

  const handleSaveSettings = (settings) => { showToastMsg('Payout settings saved'); };

  const pendingAmount = payouts.filter(p => p.status !== 'Completed').reduce((sum, p) => sum + p.netAmount, 0);
  const totalPaid = payouts.filter(p => p.status === 'Completed').reduce((sum, p) => sum + p.netAmount, 0);

  return (
    <div>
      {toast.show && <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">{toast.message}</div>}
      {showSettings && <PayoutSettingsModal onClose={() => setShowSettings(false)} onSave={handleSaveSettings} />}
      {showProcessModal && <ProcessPayoutModal payout={selectedPayout} onClose={() => setShowProcessModal(false)} onProcess={handleProcessPayout} />}

      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
        <div className="flex justify-between items-center"><div className="flex items-center gap-4"><div className="text-4xl">💰</div><div><h3 className="text-xl font-bold">Vendor Payout Management</h3><p className="text-sm text-gray-500">Manage payments to vendors with commission deductions</p></div></div><button onClick={() => setShowSettings(true)} className="px-4 py-2 border rounded-lg">⚙️ Settings</button></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm"><p className="text-gray-400 text-sm">Pending Payouts</p><p className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</p><p className="text-xs text-amber-600 mt-1">{payouts.filter(p => p.status === 'Pending').length} pending</p></div>
        <div className="bg-white rounded-2xl p-5 shadow-sm"><p className="text-gray-400 text-sm">Total Paid</p><p className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString()}</p></div>
        <div className="bg-white rounded-2xl p-5 shadow-sm"><p className="text-gray-400 text-sm">Total Commission</p><p className="text-2xl font-bold text-purple-600">₹{payouts.reduce((sum, p) => sum + p.commission, 0).toLocaleString()}</p></div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50"><tr>{['Payout ID', 'Vendor', 'Booking', 'Gross Amount', 'Commission (10%)', 'Net Amount', 'Status', 'Due Date', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400">{h}</th>)}</tr></thead><tbody className="divide-y">{payouts.map(p => (<tr key={p.id}><td className="px-4 py-3 text-xs font-mono">{p.id}</td><td className="px-4 py-3 font-semibold">{p.vendorName}</td><td className="px-4 py-3 text-xs">{p.bookingId}</td><td className="px-4 py-3">₹{p.amount.toLocaleString()}</td><td className="px-4 py-3 text-red-500">-₹{p.commission.toLocaleString()}</td><td className="px-4 py-3 font-bold text-green-600">₹{p.netAmount.toLocaleString()}</td><td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${p.status === 'Completed' ? 'bg-green-100 text-green-700' : p.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{p.status}</span></td><td className="px-4 py-3 text-xs">{p.dueDate}</td><td className="px-4 py-3">{p.status !== 'Completed' && <button onClick={() => { setSelectedPayout(p); setShowProcessModal(true); }} className="px-3 py-1 text-xs bg-red-600 text-white rounded">Release</button>}{p.status === 'Completed' && <span className="text-xs text-gray-400">Paid {p.paidDate}</span>}</td></tr>))}</tbody></table></div>
      </div>
    </div>
  );
};