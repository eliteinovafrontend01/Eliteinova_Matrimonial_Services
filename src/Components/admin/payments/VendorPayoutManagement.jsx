// src/components/admin/payments/VendorPayoutManagement.jsx
import { useState, useEffect, useMemo } from 'react';
import { Icon } from '../shared/Icon';
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

const mockPayouts = [
  { id: 'PO001', vendorId: 'VEN001', vendorName: 'ABC Events', bookingId: 'BKG001', amount: 25000, commission: 2500, netAmount: 22500, status: 'Completed', dueDate: '2024-01-20', paidDate: '2024-01-18', method: 'Bank Transfer' },
  { id: 'PO002', vendorId: 'VEN002', vendorName: 'Premier Catering', bookingId: 'BKG002', amount: 45000, commission: 4500, netAmount: 40500, status: 'Pending', dueDate: '2024-01-25', paidDate: null, method: 'UPI' },
  { id: 'PO003', vendorId: 'VEN003', vendorName: 'Grand Palace', bookingId: 'BKG003', amount: 150000, commission: 15000, netAmount: 135000, status: 'Processing', dueDate: '2024-01-22', paidDate: null, method: 'Bank Transfer' },
  { id: 'PO004', vendorId: 'VEN004', vendorName: 'Elite Photography', bookingId: 'BKG006', amount: 35000, commission: 3500, netAmount: 31500, status: 'Pending', dueDate: '2024-01-28', paidDate: null, method: 'UPI' },
  { id: 'PO005', vendorId: 'VEN005', vendorName: 'Melody Music', bookingId: 'BKG007', amount: 28000, commission: 2800, netAmount: 25200, status: 'Completed', dueDate: '2024-01-15', paidDate: '2024-01-14', method: 'Bank Transfer' },
];

const PayoutSettingsModal = ({ onClose, onSave }) => {
  const [settings, setSettings] = useState({ schedule: 'Weekly', day: 'Monday', minAmount: 1000, method: 'Auto' });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Payout Settings</h3>
          <p className="text-sm text-gray-500">Configure automated vendor payouts</p>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Schedule</label>
            <select value={settings.schedule} onChange={(e) => setSettings({...settings, schedule: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Bi-weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Payout Day</label>
            <select value={settings.day} onChange={(e) => setSettings({...settings, day: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300">
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Minimum Payout Amount</label>
            <input type="number" value={settings.minAmount} onChange={(e) => setSettings({...settings, minAmount: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300" />
            <p className="text-xs text-gray-400 mt-1">Minimum amount required for auto-payout</p>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Default Method</label>
            <select value={settings.method} onChange={(e) => setSettings({...settings, method: e.target.value})} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300">
              <option>Auto (Bank Transfer)</option>
              <option>UPI</option>
              <option>Wallet</option>
            </select>
          </div>
        </div>
        <div className="p-4 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={() => { onSave(settings); onClose(); }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Save Settings</button>
        </div>
      </div>
    </div>
  );
};

const ProcessPayoutModal = ({ payout, onClose, onProcess }) => {
  const [method, setMethod] = useState(payout?.method || 'Bank Transfer');
  const [reference, setReference] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  const handleSubmit = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    onProcess(payout.id, { method, reference });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Process Payout</h3>
          <p className="text-sm text-gray-500">Vendor: {payout?.vendorName}</p>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Gross Amount:</span>
              <span className="font-semibold">{formatCurrency(payout?.amount)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-500">Commission (10%):</span>
              <span className="font-semibold text-red-600">-{formatCurrency(payout?.commission)}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t">
              <span className="font-bold">Net Amount:</span>
              <span className="text-xl font-bold text-green-600">{formatCurrency(payout?.netAmount)}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Payment Method</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300">
              <option>Bank Transfer</option>
              <option>UPI</option>
              <option>Wallet</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Transaction Reference</label>
            <input type="text" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="e.g., TX123456" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300" />
          </div>
          
          {isConfirming && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
              ✓ Confirm processing payout to {payout?.vendorName}
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={handleSubmit} className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            isConfirming ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-red-600 text-white hover:bg-red-700'
          }`}>
            {isConfirming ? 'Confirm Payout' : 'Process Payout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const VendorPayoutManagement = () => {
  const [payouts, setPayouts] = useState([]);
  const [selectedPayout, setSelectedPayout] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showProcessModal, setShowProcessModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
    setIsLoading(true);
    setTimeout(() => { 
      setPayouts(mockPayouts); 
      setIsLoading(false);
    }, 500); 
  }, []);

  const showToastMsg = (message, type = 'success') => { 
    setToast({ show: true, message, type }); 
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); 
  };

  const handleProcessPayout = (id, data) => {
    setPayouts(prev => prev.map(p => p.id === id ? { 
      ...p, 
      status: 'Completed', 
      paidDate: new Date().toISOString().split('T')[0], 
      transactionRef: data.reference, 
      paymentMethod: data.method 
    } : p));
    showToastMsg(`Payout ${id} processed successfully`, 'success');
  };

  const handleSaveSettings = (settings) => { 
    showToastMsg('Payout settings saved successfully', 'success'); 
  };

  const stats = useMemo(() => {
    const pendingPayouts = payouts.filter(p => p.status !== 'Completed');
    const completedPayouts = payouts.filter(p => p.status === 'Completed');
    const processingPayouts = payouts.filter(p => p.status === 'Processing');
    
    return {
      pendingAmount: pendingPayouts.reduce((sum, p) => sum + p.netAmount, 0),
      pendingCount: pendingPayouts.length,
      totalPaid: completedPayouts.reduce((sum, p) => sum + p.netAmount, 0),
      paidCount: completedPayouts.length,
      totalCommission: payouts.reduce((sum, p) => sum + p.commission, 0),
      totalGrossAmount: payouts.reduce((sum, p) => sum + p.amount, 0),
      processingCount: processingPayouts.length,
    };
  }, [payouts]);

  if (isLoading) return (
    <div className="flex justify-center p-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>
  );

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
      
      {showSettings && (
        <PayoutSettingsModal 
          onClose={() => setShowSettings(false)} 
          onSave={handleSaveSettings} 
        />
      )}
      
      {showProcessModal && selectedPayout && (
        <ProcessPayoutModal 
          payout={selectedPayout} 
          onClose={() => setShowProcessModal(false)} 
          onProcess={handleProcessPayout} 
        />
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">💰</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Vendor Payout Management</h3>
              <p className="text-sm text-gray-500 mt-0.5">Manage payments to vendors with commission deductions</p>
            </div>
          </div>
          <button 
            onClick={() => setShowSettings(true)} 
            className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-semibold"
          >
            ⚙️ Settings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Pending Payouts', value: formatCurrency(stats.pendingAmount), subValue: `${stats.pendingCount} pending`, icon: '⏳', color: 'border-amber-400' },
          { label: 'Processing', value: stats.processingCount, subValue: 'in progress', icon: '🔄', color: 'border-blue-400' },
          { label: 'Total Paid', value: formatCurrency(stats.totalPaid), subValue: `${stats.paidCount} vendors`, icon: '✅', color: 'border-green-400' },
          { label: 'Total Commission', value: formatCurrency(stats.totalCommission), subValue: 'earned this month', icon: '💸', color: 'border-purple-400' },
        ].map((s, i) => (
          <div key={i} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} transition-all hover:shadow-md`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                {s.subValue && <p className="text-xs text-gray-400 mt-1">{s.subValue}</p>}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.payment} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Payout Records</h3>
                <p className="text-xs text-gray-400">
                  {payouts.length} payout{payouts.length !== 1 ? 's' : ''} total
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Payout ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Vendor</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Booking</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Gross Amount</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Commission (10%)</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Net Amount</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Due Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {payouts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{p.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center text-white text-[10px] font-bold">
                        {p.vendorName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{p.vendorName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{p.bookingId}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">{formatCurrency(p.amount)}</td>
                  <td className="px-4 py-3 text-sm font-medium text-red-600">-{formatCurrency(p.commission)}</td>
                  <td className="px-4 py-3 text-sm font-bold text-green-600">{formatCurrency(p.netAmount)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      p.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                      p.status === 'Processing' ? 'bg-blue-100 text-blue-700' : 
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{p.dueDate}</td>
                  <td className="px-4 py-3">
                    {p.status !== 'Completed' ? (
                      <button 
                        onClick={() => { setSelectedPayout(p); setShowProcessModal(true); }} 
                        className="px-3 py-1.5 text-xs font-semibold bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Release Payment
                      </button>
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Paid {p.paidDate}</span>
                        <span className="text-xs text-gray-400 font-mono">{p.transactionRef || '-'}</span>
                      </div>
                    )}
                   </td>
                 </tr>
              ))}
              {payouts.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-sm text-gray-400">
                    No payouts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex flex-wrap justify-between items-center gap-2 text-xs">
            <div className="flex gap-4">
              <span className="text-gray-500">
                Completed: <span className="font-semibold text-green-600">{stats.paidCount}</span>
              </span>
              <span className="text-gray-500">
                Processing: <span className="font-semibold text-blue-600">{stats.processingCount}</span>
              </span>
              <span className="text-gray-500">
                Pending: <span className="font-semibold text-amber-600">{stats.pendingCount}</span>
              </span>
            </div>
            <span className="text-gray-400">
              Total Gross Payout: <span className="font-bold text-gray-800">{formatCurrency(stats.totalGrossAmount)}</span>
            </span>
          </div>
        </div>
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