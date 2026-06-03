// src/components/admin/payments/MultiplePaymentMethods.jsx
import { useState, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: '📱', description: 'Google Pay, PhonePe, Paytm, etc.', status: 'Active', transactions: 1254, volume: '₹45,20,000' },
  { id: 'card', name: 'Credit/Debit Cards', icon: '💳', description: 'Visa, Mastercard, RuPay, Amex', status: 'Active', transactions: 892, volume: '₹32,15,000' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦', description: 'All major banks supported', status: 'Active', transactions: 456, volume: '₹18,30,000' },
  { id: 'wallet', name: 'Digital Wallets', icon: '👛', description: 'Paytm Wallet, Amazon Pay, etc.', status: 'Active', transactions: 234, volume: '₹8,75,000' },
  { id: 'cod', name: 'Cash on Delivery', icon: '💵', description: 'Pay at the time of service', status: 'Limited', transactions: 67, volume: '₹2,45,000' },
];

const MethodConfigModal = ({ method, onClose, onSave }) => {
  const [config, setConfig] = useState({
    enabled: true,
    processingFee: 1.5,
    minAmount: 10,
    maxAmount: 500000,
    currencies: ['INR'],
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b"><h3 className="text-lg font-bold">Configure {method?.name}</h3></div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between"><label className="font-semibold">Enable Method</label><input type="checkbox" checked={config.enabled} onChange={(e) => setConfig({...config, enabled: e.target.checked})} className="w-5 h-5" /></div>
          <div><label className="block font-semibold mb-1">Processing Fee (%)</label><input type="number" step="0.1" value={config.processingFee} onChange={(e) => setConfig({...config, processingFee: parseFloat(e.target.value)})} className="w-full p-2 border rounded-lg" /></div>
          <div className="grid grid-cols-2 gap-3"><div><label className="block font-semibold mb-1">Min Amount (₹)</label><input type="number" value={config.minAmount} onChange={(e) => setConfig({...config, minAmount: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg" /></div><div><label className="block font-semibold mb-1">Max Amount (₹)</label><input type="number" value={config.maxAmount} onChange={(e) => setConfig({...config, maxAmount: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg" /></div></div>
          <div className="flex gap-3 pt-2"><button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button><button onClick={() => { onSave(method.id, config); onClose(); }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Save Configuration</button></div>
        </div>
      </div>
    </div>
  );
};

export const MultiplePaymentMethods = () => {
  const [methods, setMethods] = useState(paymentMethods);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToastMsg = (msg) => { setToast({ show: true, message: msg }); setTimeout(() => setToast({ show: false, message: '' }), 3000); };

  const handleSaveConfig = (methodId, config) => {
    setMethods(prev => prev.map(m => m.id === methodId ? { ...m, config, status: config.enabled ? 'Active' : 'Disabled' } : m));
    showToastMsg(`${methods.find(m => m.id === methodId)?.name} configuration updated`);
  };

  const handleToggleStatus = (methodId) => {
    setMethods(prev => prev.map(m => m.id === methodId ? { ...m, status: m.status === 'Active' ? 'Disabled' : 'Active' } : m));
    showToastMsg(`Payment method ${methods.find(m => m.id === methodId)?.name} ${methods.find(m => m.id === methodId)?.status === 'Active' ? 'disabled' : 'enabled'}`);
  };

  return (
    <div>
      {toast.show && <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">{toast.message}</div>}
      {showModal && <MethodConfigModal method={selectedMethod} onClose={() => setShowModal(false)} onSave={handleSaveConfig} />}

      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
        <div className="flex items-center gap-4"><div className="text-4xl">💳</div><div><h3 className="text-xl font-bold">Multiple Payment Methods</h3><p className="text-sm text-gray-500">Support various payment options for customer convenience</p></div></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {methods.map(method => (
          <div key={method.id} className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-2xl">{method.icon}</div><div><h4 className="font-bold text-gray-800">{method.name}</h4><p className="text-xs text-gray-400">{method.description}</p></div></div><span className={`px-2 py-1 text-xs rounded-full ${method.status === 'Active' ? 'bg-green-100 text-green-700' : method.status === 'Limited' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>{method.status}</span></div>
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm"><div><p className="text-gray-400">Transactions</p><p className="font-semibold">{method.transactions.toLocaleString()}</p></div><div><p className="text-gray-400">Volume</p><p className="font-semibold">{method.volume}</p></div></div>
            <div className="flex gap-2"><button onClick={() => { setSelectedMethod(method); setShowModal(true); }} className="flex-1 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Configure</button><button onClick={() => handleToggleStatus(method.id)} className={`flex-1 py-2 text-sm rounded-lg ${method.status === 'Active' ? 'border border-red-200 text-red-600 hover:bg-red-50' : 'bg-red-600 text-white hover:bg-red-700'}`}>{method.status === 'Active' ? 'Disable' : 'Enable'}</button></div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-center gap-3"><div className="text-2xl">ℹ️</div><div><p className="font-semibold">Payment Gateway Integration Status</p><p className="text-sm text-gray-600">All active payment methods are integrated with Razorpay gateway. Transaction fees vary by method.</p></div></div>
      </div>
    </div>
  );
};