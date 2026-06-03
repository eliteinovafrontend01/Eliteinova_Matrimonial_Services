// src/components/admin/payments/FraudDetectionSecurity.jsx
import { useState, useEffect } from 'react';

const mockSuspiciousActivities = [
  { id: 'SUS001', transactionId: 'TXN1003', amount: 150000, customer: 'Unknown', vendor: 'Grand Palace', reason: 'Multiple failed attempts', riskScore: 85, status: 'Flagged', timestamp: '2024-01-14 10:30:00', ipAddress: '203.45.67.89', actionTaken: 'Blocked transaction' },
  { id: 'SUS002', transactionId: 'TXN1006', amount: 75000, customer: 'Test User', vendor: 'ABC Events', reason: 'Unusual amount pattern', riskScore: 65, status: 'Under Review', timestamp: '2024-01-15 14:20:00', ipAddress: '45.67.89.12', actionTaken: 'Awaiting review' },
  { id: 'SUS003', transactionId: 'TXN1007', amount: 25000, customer: 'Suspicious User', vendor: 'XYZ Decor', reason: 'Mismatched location', riskScore: 92, status: 'Blocked', timestamp: '2024-01-13 09:15:00', ipAddress: '89.12.34.56', actionTaken: 'Blocked and notified admin' },
  { id: 'SUS004', transactionId: 'TXN1008', amount: 50000, customer: 'John Doe', vendor: 'Catering Pro', reason: 'Unusual velocity (5 txns in 10 mins)', riskScore: 78, status: 'Flagged', timestamp: '2024-01-16 08:45:00', ipAddress: '192.168.1.100', actionTaken: 'Monitoring' },
];

const SecuritySettingsModal = ({ onClose, onSave }) => {
  const [settings, setSettings] = useState({ 
    maxAmountPerTx: 200000, 
    maxAttemptsPerDay: 3, 
    velocityCheck: true, 
    ipWhitelist: ['127.0.0.1'], 
    emailAlerts: true,
    riskThreshold: 70
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b"><h3 className="text-lg font-bold">Security Settings</h3></div>
        <div className="p-5 space-y-4">
          <div><label className="block text-sm font-semibold mb-1">Max Amount per Transaction (₹)</label><input type="number" value={settings.maxAmountPerTx} onChange={(e) => setSettings({...settings, maxAmountPerTx: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-semibold mb-1">Max Failed Attempts per Day</label><input type="number" value={settings.maxAttemptsPerDay} onChange={(e) => setSettings({...settings, maxAttemptsPerDay: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg" /></div>
          <div><label className="block text-sm font-semibold mb-1">Risk Score Threshold</label><input type="number" value={settings.riskThreshold} onChange={(e) => setSettings({...settings, riskThreshold: parseInt(e.target.value)})} className="w-full p-2 border rounded-lg" /><p className="text-xs text-gray-400">Activities above this score will be automatically flagged</p></div>
          <div className="flex items-center justify-between"><label className="text-sm font-semibold">Velocity Check</label><input type="checkbox" checked={settings.velocityCheck} onChange={(e) => setSettings({...settings, velocityCheck: e.target.checked})} className="w-5 h-5" /></div>
          <div className="flex items-center justify-between"><label className="text-sm font-semibold">Email Alerts for Suspicious Activity</label><input type="checkbox" checked={settings.emailAlerts} onChange={(e) => setSettings({...settings, emailAlerts: e.target.checked})} className="w-5 h-5" /></div>
        </div>
        <div className="p-4 border-t flex gap-3"><button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button><button onClick={() => { onSave(settings); onClose(); }} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Save Settings</button></div>
      </div>
    </div>
  );
};

const ActivityDetailsModal = ({ activity, onClose, onResolve }) => {
  const [action, setAction] = useState(activity?.actionTaken || '');

  if (!activity) return null;

  const handleResolve = () => { onResolve(activity.id, action); onClose(); };

  const getRiskColor = (score) => {
    if (score >= 80) return 'bg-red-100 text-red-700';
    if (score >= 60) return 'bg-amber-100 text-amber-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b"><h3 className="text-lg font-bold">Suspicious Activity Details</h3></div>
        <div className="p-5 space-y-3">
          <div className="flex justify-between items-center"><span className="font-semibold">Risk Score:</span><span className={`px-2 py-1 rounded-full text-sm ${getRiskColor(activity.riskScore)}`}>{activity.riskScore}</span></div>
          <div className="border-t pt-2"><p><span className="font-semibold">Transaction ID:</span> {activity.transactionId}</p><p><span className="font-semibold">Amount:</span> ₹{activity.amount.toLocaleString()}</p><p><span className="font-semibold">Customer:</span> {activity.customer}</p><p><span className="font-semibold">Vendor:</span> {activity.vendor}</p></div>
          <div><p><span className="font-semibold">Reason:</span> {activity.reason}</p><p><span className="font-semibold">IP Address:</span> {activity.ipAddress}</p><p><span className="font-semibold">Timestamp:</span> {activity.timestamp}</p></div>
          <div><label className="block text-sm font-semibold mb-1">Action Taken</label><select value={action} onChange={(e) => setAction(e.target.value)} className="w-full p-2 border rounded-lg"><option>Block transaction</option><option>Flag for review</option><option>Allow transaction</option><option>Contact customer for verification</option><option>Add to blacklist</option></select></div>
        </div>
        <div className="p-4 border-t flex gap-3"><button onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg">Close</button><button onClick={handleResolve} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Resolve & Log</button></div>
      </div>
    </div>
  );
};

export const FraudDetectionSecurity = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [filter, setFilter] = useState('All');
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => { 
    setTimeout(() => setActivities(mockSuspiciousActivities), 500); 
  }, []);

  const showToastMsg = (msg) => { 
    setToast({ show: true, message: msg }); 
    setTimeout(() => setToast({ show: false, message: '' }), 3000); 
  };

  const handleResolve = (id, action) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, status: 'Resolved', actionTaken: action } : a));
    showToastMsg(`Activity ${id} resolved with action: ${action}`);
  };

  const filtered = activities.filter(a => filter === 'All' || a.status === filter);
  
  const stats = {
    total: activities.length,
    flagged: activities.filter(a => a.status === 'Flagged').length,
    underReview: activities.filter(a => a.status === 'Under Review').length,
    blocked: activities.filter(a => a.status === 'Blocked').length,
    resolved: activities.filter(a => a.status === 'Resolved').length,
    avgRisk: Math.round(activities.reduce((sum, a) => sum + a.riskScore, 0) / activities.length),
  };

  const getRiskBadge = (score) => {
    if (score >= 80) return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 font-bold">HIGH</span>;
    if (score >= 60) return <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-700 font-bold">MEDIUM</span>;
    return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 font-bold">LOW</span>;
  };

  return (
    <div>
      {toast.show && <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">{toast.message}</div>}
      {showModal && <ActivityDetailsModal activity={selectedActivity} onClose={() => setShowModal(false)} onResolve={handleResolve} />}
      {showSettings && <SecuritySettingsModal onClose={() => setShowSettings(false)} onSave={(s) => showToastMsg('Security settings saved')} />}

      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-red-50 to-orange-50 border border-red-200">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center gap-4"><div className="text-4xl">🛡️</div><div><h3 className="text-xl font-bold">Fraud Detection & Security</h3><p className="text-sm text-gray-500">Monitor suspicious transactions and ensure secure payment processing</p></div></div>
          <button onClick={() => setShowSettings(true)} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-white transition-colors flex items-center gap-2">⚙️ Security Settings</button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Total Flagged', value: stats.total, icon: '🚨', color: 'border-gray-400' },
          { label: 'Flagged', value: stats.flagged, icon: '⚠️', color: 'border-yellow-400', filter: 'Flagged' },
          { label: 'Under Review', value: stats.underReview, icon: '🔍', color: 'border-blue-400', filter: 'Under Review' },
          { label: 'Blocked', value: stats.blocked, icon: '🚫', color: 'border-red-400', filter: 'Blocked' },
          { label: 'Avg Risk Score', value: stats.avgRisk, icon: '📊', color: 'border-purple-400' },
        ].map((s, i) => (
          <div key={i} onClick={() => s.filter && setFilter(s.filter)} className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${s.color} ${s.filter ? 'cursor-pointer hover:shadow-md transition-all' : ''} ${filter === s.filter ? 'ring-2 ring-red-400' : ''}`}>
            <div className="flex justify-between items-center"><div><p className="text-xs font-semibold text-gray-400">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div><div className="text-2xl">{s.icon}</div></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b flex flex-wrap gap-2">
          {['All', 'Flagged', 'Under Review', 'Blocked', 'Resolved'].map(f => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${filter === f ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{f}</button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {['ID', 'Transaction', 'Amount', 'Risk Score', 'Reason', 'Status', 'Timestamp', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(a => (
                <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{a.id}</td>
                  <td className="px-4 py-3 text-xs font-mono">{a.transactionId}</td>
                  <td className="px-4 py-3 font-semibold">₹{a.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">{getRiskBadge(a.riskScore)}</td>
                  <td className="px-4 py-3 text-xs max-w-[200px] truncate">{a.reason}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 text-xs rounded-full ${a.status === 'Blocked' ? 'bg-red-100 text-red-700' : a.status === 'Under Review' ? 'bg-amber-100 text-amber-700' : a.status === 'Flagged' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{a.status}</span></td>
                  <td className="px-4 py-3 text-xs">{a.timestamp}</td>
                  <td className="px-4 py-3">
                    {a.status !== 'Resolved' ? (
                      <button onClick={() => { setSelectedActivity(a); setShowModal(true); }} className="px-3 py-1 text-xs bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">Review</button>
                    ) : (
                      <span className="text-xs text-green-600">✓ Resolved</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-8 text-gray-400">No suspicious activities found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slideIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};