// src/components/admin/payments/CommissionTracking.jsx
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

const mockCommissions = [
  { id: 'COM001', vendorId: 'VEN001', vendorName: 'ABC Events', bookingId: 'BKG001', transactionAmount: 25000, commissionRate: 10, commissionAmount: 2500, status: 'Settled', date: '2024-01-15' },
  { id: 'COM002', vendorId: 'VEN002', vendorName: 'Premier Catering', bookingId: 'BKG002', transactionAmount: 45000, commissionRate: 10, commissionAmount: 4500, status: 'Pending', date: '2024-01-16' },
  { id: 'COM003', vendorId: 'VEN003', vendorName: 'Grand Palace', bookingId: 'BKG003', transactionAmount: 150000, commissionRate: 10, commissionAmount: 15000, status: 'Settled', date: '2024-01-14' },
  { id: 'COM004', vendorId: 'VEN004', vendorName: 'XYZ Decor', bookingId: 'BKG004', transactionAmount: 35000, commissionRate: 10, commissionAmount: 3500, status: 'Refunded', date: '2024-01-13' },
  { id: 'COM005', vendorId: 'VEN005', vendorName: 'Elite Photography', bookingId: 'BKG006', transactionAmount: 28000, commissionRate: 12, commissionAmount: 3360, status: 'Pending', date: '2024-01-17' },
  { id: 'COM006', vendorId: 'VEN006', vendorName: 'Melody Music', bookingId: 'BKG007', transactionAmount: 32000, commissionRate: 15, commissionAmount: 4800, status: 'Settled', date: '2024-01-12' },
];

const CommissionSettingsModal = ({ onClose, onSave }) => {
  const [settings, setSettings] = useState({ 
    defaultRate: 10, 
    categories: { 
      Photography: 12, 
      Catering: 10, 
      WeddingHall: 8, 
      Decorations: 10, 
      Entertainment: 15 
    } 
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Commission Settings</h3>
          <p className="text-sm text-gray-500">Configure commission rates for vendors</p>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Default Commission Rate (%)</label>
            <input 
              type="number" 
              value={settings.defaultRate} 
              onChange={(e) => setSettings({...settings, defaultRate: parseInt(e.target.value)})} 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
            />
            <p className="text-xs text-gray-400 mt-1">Applied when no category-specific rate exists</p>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-2">Category-wise Rates</label>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {Object.entries(settings.categories).map(([cat, rate]) => (
                <div key={cat} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">{cat}</span>
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      value={rate} 
                      onChange={(e) => setSettings({...settings, categories: {...settings.categories, [cat]: parseInt(e.target.value)}})} 
                      className="w-20 p-1 border rounded text-right focus:ring-2 focus:ring-red-100 focus:border-red-300"
                    />
                    <span className="text-sm">%</span>
                  </div>
                </div>
              ))}
            </div>
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

const ReleaseCommissionModal = ({ commission, onClose, onRelease }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }
    onRelease(commission.id, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-800">Release Commission</h3>
          <p className="text-sm text-gray-500">Vendor: {commission?.vendorName}</p>
        </div>
        <div className="p-5 space-y-4">
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Transaction Amount:</span>
              <span className="font-semibold">{formatCurrency(commission?.transactionAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Commission Rate:</span>
              <span className="font-semibold">{commission?.commissionRate}%</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t">
              <span className="font-bold">Commission Amount:</span>
              <span className="text-xl font-bold text-purple-600">{formatCurrency(commission?.commissionAmount)}</span>
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Notes (Optional)</label>
            <textarea 
              value={notes} 
              onChange={(e) => setNotes(e.target.value)} 
              rows="3" 
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Add any notes about this commission release..."
            />
          </div>
          
          {isConfirming && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm text-green-700">
              ✓ Confirm releasing commission to {commission?.vendorName}
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">Cancel</button>
          <button onClick={handleSubmit} className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
            isConfirming ? 'bg-red-700 text-white hover:bg-red-800' : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}>
            {isConfirming ? 'Confirm Release' : 'Release Commission'}
          </button>
        </div>
      </div>
    </div>
  );
};

export const CommissionTracking = () => {
  const [commissions, setCommissions] = useState([]);
  const [selectedCommission, setSelectedCommission] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showReleaseModal, setShowReleaseModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => { 
    setIsLoading(true);
    setTimeout(() => { 
      setCommissions(mockCommissions); 
      setIsLoading(false);
    }, 500); 
  }, []);

  const showToastMsg = (message, type = 'success') => { 
    setToast({ show: true, message, type }); 
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); 
  };

  const handleReleaseCommission = (id, notes) => {
    setCommissions(prev => prev.map(c => 
      c.id === id ? { ...c, status: 'Settled', settledDate: new Date().toISOString().split('T')[0], notes } : c
    ));
    showToastMsg(`Commission for ${commissions.find(c => c.id === id)?.vendorName} released successfully`, 'success');
  };

  const handleSaveSettings = (settings) => { 
    showToastMsg('Commission settings saved successfully', 'success'); 
  };

  const stats = useMemo(() => {
    const settledCommissions = commissions.filter(c => c.status === 'Settled');
    const pendingCommissions = commissions.filter(c => c.status === 'Pending');
    const refundedCommissions = commissions.filter(c => c.status === 'Refunded');
    
    const avgRate = commissions.reduce((sum, c) => sum + c.commissionRate, 0) / commissions.length;
    
    return {
      totalCommission: settledCommissions.reduce((sum, c) => sum + c.commissionAmount, 0),
      pendingCommission: pendingCommissions.reduce((sum, c) => sum + c.commissionAmount, 0),
      refundedCommission: refundedCommissions.reduce((sum, c) => sum + c.commissionAmount, 0),
      pendingCount: pendingCommissions.length,
      settledCount: settledCommissions.length,
      avgRate: avgRate.toFixed(1),
      totalTransactionAmount: commissions.reduce((sum, c) => sum + c.transactionAmount, 0),
    };
  }, [commissions]);

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
        <CommissionSettingsModal 
          onClose={() => setShowSettings(false)} 
          onSave={handleSaveSettings} 
        />
      )}
      
      {showReleaseModal && selectedCommission && (
        <ReleaseCommissionModal 
          commission={selectedCommission} 
          onClose={() => setShowReleaseModal(false)} 
          onRelease={handleReleaseCommission} 
        />
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">📈</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Commission Tracking</h3>
              <p className="text-sm text-gray-500 mt-0.5">Track platform commission on each transaction</p>
            </div>
          </div>
          <button 
            onClick={() => setShowSettings(true)} 
            className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-semibold"
          >
            ⚙️ Configure Rates
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Commission Earned', value: formatCurrency(stats.totalCommission), subValue: `${stats.settledCount} settlements`, icon: '💰', color: 'border-green-400' },
          { label: 'Pending Commission', value: formatCurrency(stats.pendingCommission), subValue: `${stats.pendingCount} pending`, icon: '⏳', color: 'border-amber-400' },
          { label: 'Average Commission Rate', value: `${stats.avgRate}%`, subValue: 'across all vendors', icon: '📊', color: 'border-purple-400' },
          { label: 'Total Transaction Value', value: formatCurrency(stats.totalTransactionAmount), subValue: 'platform-wide', icon: '💳', color: 'border-blue-400' },
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
              <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Icon d={ICONS.payment} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Commission Records</h3>
                <p className="text-xs text-gray-400">
                  {commissions.length} commission{commissions.length !== 1 ? 's' : ''} total
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Commission ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Vendor</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Booking ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Transaction Amount</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Commission Rate</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Commission Amount</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {commissions.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{c.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-violet-400 flex items-center justify-center text-white text-[10px] font-bold">
                        {c.vendorName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{c.vendorName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{c.bookingId}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-700">{formatCurrency(c.transactionAmount)}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-lg">{c.commissionRate}%</span>
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-purple-600">{formatCurrency(c.commissionAmount)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      c.status === 'Settled' ? 'bg-green-100 text-green-700' : 
                      c.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {c.status}
                    </span>
                   </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{c.date}</td>
                  <td className="px-4 py-3">
                    {c.status === 'Pending' && (
                      <button 
                        onClick={() => { setSelectedCommission(c); setShowReleaseModal(true); }} 
                        className="px-3 py-1.5 text-xs font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Release Commission
                      </button>
                    )}
                    {c.status === 'Settled' && (
                      <span className="text-xs text-gray-400">Released</span>
                    )}
                    {c.status === 'Refunded' && (
                      <span className="text-xs text-red-400">Refunded</span>
                    )}
                   </td>
                 </tr>
              ))}
              {commissions.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-sm text-gray-400">
                    No commission records found
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
                Settled: <span className="font-semibold text-green-600">{stats.settledCount}</span>
              </span>
              <span className="text-gray-500">
                Pending: <span className="font-semibold text-amber-600">{stats.pendingCount}</span>
              </span>
            </div>
            <span className="text-gray-400">
              Total Platform Commission: <span className="font-bold text-purple-600">{formatCurrency(stats.totalCommission)}</span>
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