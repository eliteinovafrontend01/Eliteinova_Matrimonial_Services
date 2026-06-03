// src/components/admin/payments/TransactionHistoryLogs.jsx
import { useState, useEffect } from 'react';

const mockLogs = [
  { id: 'LOG001', timestamp: '2024-01-15 10:30:00', action: 'Payment Created', user: 'system', entityType: 'Transaction', entityId: 'TXN1001', details: 'Payment of ₹25,000 created for booking BKG001', ipAddress: '192.168.1.1' },
  { id: 'LOG002', timestamp: '2024-01-15 10:31:00', action: 'Payment Completed', user: 'Razorpay', entityType: 'Transaction', entityId: 'TXN1001', details: 'Payment successful via UPI', ipAddress: 'webhook.razorpay.com' },
  { id: 'LOG003', timestamp: '2024-01-15 10:35:00', action: 'Commission Calculated', user: 'system', entityType: 'Commission', entityId: 'COM001', details: 'Commission of ₹2,500 calculated (10%)', ipAddress: 'system' },
  { id: 'LOG004', timestamp: '2024-01-14 15:20:00', action: 'Refund Processed', user: 'admin@eventplan.com', entityType: 'Refund', entityId: 'REF001', details: 'Full refund of ₹35,000 processed', ipAddress: '103.58.12.34' },
];

const LogDetailsModal = ({ log, onClose }) => {
  if (!log) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b"><h3 className="text-lg font-bold">Log Details</h3></div>
        <div className="p-5 space-y-2"><p><span className="font-semibold">Timestamp:</span> {log.timestamp}</p><p><span className="font-semibold">Action:</span> {log.action}</p><p><span className="font-semibold">User:</span> {log.user}</p><p><span className="font-semibold">Entity:</span> {log.entityType} - {log.entityId}</p><p><span className="font-semibold">Details:</span> {log.details}</p><p><span className="font-semibold">IP Address:</span> {log.ipAddress}</p></div>
        <div className="p-4 border-t"><button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Close</button></div>
      </div>
    </div>
  );
};

export const TransactionHistoryLogs = () => {
  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [selectedLog, setSelectedLog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { setTimeout(() => setLogs(mockLogs), 500); }, []);

  const filtered = logs.filter(l => {
    const matchAction = actionFilter === 'All' || l.action === actionFilter;
    const matchSearch = !search || l.details.toLowerCase().includes(search.toLowerCase()) || l.entityId.toLowerCase().includes(search.toLowerCase());
    return matchAction && matchSearch;
  });

  const actions = ['All', ...new Set(logs.map(l => l.action))];

  return (
    <div>
      {showModal && <LogDetailsModal log={selectedLog} onClose={() => setShowModal(false)} />}

      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200">
        <div className="flex items-center gap-4"><div className="text-4xl">📜</div><div><h3 className="text-xl font-bold">Transaction History & Logs</h3><p className="text-sm text-gray-500">Complete audit trail of all payment activities</p></div></div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b flex flex-wrap gap-3"><div className="flex-1"><input type="text" placeholder="Search logs..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-2 border rounded-lg" /></div><select value={actionFilter} onChange={(e) => setActionFilter(e.target.value)} className="p-2 border rounded-lg">{actions.map(a => (<option key={a} value={a}>{a}</option>))}</select></div>
        <div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-50"><tr>{['Timestamp', 'Action', 'User', 'Entity', 'Details', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400">{h}</th>)}</tr></thead><tbody className="divide-y font-mono text-xs">{filtered.map(l => (<tr key={l.id} className="hover:bg-gray-50"><td className="px-4 py-3">{l.timestamp}</td><td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-gray-100">{l.action}</span></td><td className="px-4 py-3">{l.user}</td><td className="px-4 py-3">{l.entityType}<br/>{l.entityId}</td><td className="px-4 py-3 max-w-md truncate">{l.details}</td><td className="px-4 py-3"><button onClick={() => { setSelectedLog(l); setShowModal(true); }} className="text-blue-600">View</button></td></tr>))}</tbody></table></div>
        <div className="p-4 border-t bg-gray-50"><p className="text-xs text-gray-400">📊 Total {filtered.length} log entries | Last 30 days retention</p></div>
      </div>
    </div>
  );
};