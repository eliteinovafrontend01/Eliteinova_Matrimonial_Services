// src/components/admin/payments/CommissionTracking.jsx
import { useState, useEffect } from 'react';

const mockCommissions = [
  { id: 'COM001', vendorId: 'VEN001', vendorName: 'ABC Events', bookingId: 'BKG001', transactionAmount: 25000, commissionRate: 10, commissionAmount: 2500, status: 'Settled', date: '2024-01-15' },
  { id: 'COM002', vendorId: 'VEN002', vendorName: 'Premier Catering', bookingId: 'BKG002', transactionAmount: 45000, commissionRate: 10, commissionAmount: 4500, status: 'Pending', date: '2024-01-16' },
  { id: 'COM003', vendorId: 'VEN003', vendorName: 'Grand Palace', bookingId: 'BKG003', transactionAmount: 150000, commissionRate: 10, commissionAmount: 15000, status: 'Settled', date: '2024-01-14' },
  { id: 'COM004', vendorId: 'VEN004', vendorName: 'XYZ Decor', bookingId: 'BKG004', transactionAmount: 35000, commissionRate: 10, commissionAmount: 3500, status: 'Refunded', date: '2024-01-13' },
];

const CommissionSettingsModal = ({ onClose, onSave }) => {
  const [settings, setSettings] = useState({ defaultRate: 10, categories: { Photography: 12, Catering: 10, WeddingHall: 8, Decorations: 10, Entertainment: 15 } });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b"><h3 className="text-lg font-bold">Commission Settings</h3></div>
        <div className="p-5 space-y-4"><div><label className="block text-sm font-semibold">Default Commission Rate (%)</label><input type="number" value={settings.defaultRate} onChange={(e) => setSettings({...settings, defaultRate: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg" /></div><div><label className="block text-sm font-semibold mb-2">Category-wise Rates</label>{Object.entries(settings.categories).map(([cat, rate]) => (<div key={cat} className="flex justify-between items-center mb-2"><span className="text-sm">{cat}</span><input type="number" value={rate} onChange={(e) => setSettings({...settings, categories: {...settings.categories, [cat]: parseInt(e.target.value)}})} className="w-20 p-1 border rounded text-right" />%</div>))}</div></div>
        <div className="p-4 border-t flex gap-3"><button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button><button onClick={() => { onSave(settings); onClose(); }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Save Settings</button></div>
      </div>
    </div>
  );
};

export const CommissionTracking = () => {
  const [commissions, setCommissions] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => { setTimeout(() => setCommissions(mockCommissions), 500); }, []);

  const showToastMsg = (msg) => { setToast({ show: true, message: msg }); setTimeout(() => setToast({ show: false, message: '' }), 3000); };

  const totalCommission = commissions.reduce((sum, c) => sum + (c.status === 'Settled' ? c.commissionAmount : 0), 0);
  const pendingCommission = commissions.filter(c => c.status === 'Pending').reduce((sum, c) => sum + c.commissionAmount, 0);

  return (
    <div>
      {toast.show && <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">{toast.message}</div>}
      {showSettings && <CommissionSettingsModal onClose={() => setShowSettings(false)} onSave={(s) => showToastMsg('Commission settings saved')} />}

      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200">
        <div className="flex justify-between items-center"><div className="flex items-center gap-4"><div className="text-4xl">📈</div><div><h3 className="text-xl font-bold">Commission Tracking</h3><p className="text-sm text-gray-500">Track platform commission on each transaction</p></div></div><button onClick={() => setShowSettings(true)} className="px-4 py-2 border rounded-lg">⚙️ Configure Rates</button></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm"><p className="text-gray-400 text-sm">Total Commission Earned</p><p className="text-2xl font-bold text-green-600">₹{totalCommission.toLocaleString()}</p></div>
        <div className="bg-white rounded-2xl p-5 shadow-sm"><p className="text-gray-400 text-sm">Pending Commission</p><p className="text-2xl font-bold text-amber-600">₹{pendingCommission.toLocaleString()}</p></div>
        <div className="bg-white rounded-2xl p-5 shadow-sm"><p className="text-gray-400 text-sm">Average Commission Rate</p><p className="text-2xl font-bold">10%</p></div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50"><tr>{['Commission ID', 'Vendor', 'Booking', 'Transaction Amount', 'Rate', 'Commission', 'Status', 'Date', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400">{h}</th>)}</tr></thead><tbody className="divide-y">{commissions.map(c => (<tr key={c.id}><td className="px-4 py-3 text-xs font-mono">{c.id}</td><td className="px-4 py-3 font-semibold">{c.vendorName}</td><td className="px-4 py-3 text-xs">{c.bookingId}</td><td className="px-4 py-3">₹{c.transactionAmount.toLocaleString()}</td><td className="px-4 py-3">{c.commissionRate}%</td><td className="px-4 py-3 font-bold text-purple-600">₹{c.commissionAmount.toLocaleString()}</td><td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${c.status === 'Settled' ? 'bg-green-100 text-green-700' : c.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{c.status}</span></td><td className="px-4 py-3 text-xs">{c.date}</td><td className="px-4 py-3">{c.status === 'Pending' && <button className="text-xs text-red-600">Release</button>}</td></tr>))}</tbody></table></div>
      </div>
    </div>
  );
};