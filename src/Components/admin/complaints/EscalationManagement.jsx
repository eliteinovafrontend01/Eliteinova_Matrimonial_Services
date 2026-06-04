// src/pages/admin/complaints/EscalationManagement.jsx
import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const EscalationManagement = () => {
  const [escalations, setEscalations] = useState([
    { id: 'ESC001', ticketId: 'TKT005', customer: 'Neha Gupta', issue: 'Refund not received after cancellation', priority: 'Critical', escalatedBy: 'Support Lead', escalatedTo: 'Finance Manager', level: 1, status: 'pending', escalatedAt: '2024-01-15', slaDeadline: '2024-01-16', notes: 'Customer very frustrated. No response from finance team.' },
    { id: 'ESC002', ticketId: 'TKT008', customer: 'Vikram Singh', issue: 'Wrong makeup artist assigned on event day', priority: 'High', escalatedBy: 'Support Agent', escalatedTo: 'Vendor Manager', level: 1, status: 'in_review', escalatedAt: '2024-01-14', slaDeadline: '2024-01-15', notes: 'Vendor not cooperating' },
    { id: 'ESC003', ticketId: 'TKT001', customer: 'Aarav Patel', issue: 'Vendor no-show', priority: 'Critical', escalatedBy: 'Support Lead', escalatedTo: 'Senior Management', level: 2, status: 'approved', escalatedAt: '2024-01-13', slaDeadline: '2024-01-14', notes: 'Requires management approval for full refund', resolution: 'Full refund approved on 2024-01-14' },
  ]);

  const [selectedEscalation, setSelectedEscalation] = useState(null);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [newEscalation, setNewEscalation] = useState({ ticketId: '', reason: '', escalateTo: 'Senior Admin' });
  const [resolutionNote, setResolutionNote] = useState('');

  const handleEscalate = () => {
    const newId = `ESC${String(escalations.length + 1).padStart(3, '0')}`;
    const newEsc = {
      id: newId,
      ticketId: newEscalation.ticketId,
      customer: 'Customer Name',
      issue: 'Issue description',
      priority: 'High',
      escalatedBy: 'Admin',
      escalatedTo: newEscalation.escalateTo,
      level: 1,
      status: 'pending',
      escalatedAt: new Date().toISOString().split('T')[0],
      slaDeadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: newEscalation.reason
    };
    setEscalations([newEsc, ...escalations]);
    setShowEscalateModal(false);
    setNewEscalation({ ticketId: '', reason: '', escalateTo: 'Senior Admin' });
  };

  const handleResolveEscalation = (id) => {
    setEscalations(prev => prev.map(e => 
      e.id === id ? { ...e, status: 'resolved', resolution: resolutionNote, resolvedAt: new Date().toISOString().split('T')[0] } : e
    ));
    setResolutionNote('');
    setSelectedEscalation(null);
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-100 text-amber-700',
      in_review: 'bg-purple-100 text-purple-700',
      approved: 'bg-green-100 text-green-700',
      resolved: 'bg-blue-100 text-blue-700',
      rejected: 'bg-red-100 text-red-700'
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📈</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Escalation Management</h3>
            <p className="text-sm text-gray-500 mt-0.5">Escalate critical or unresolved issues to higher-level admins or management</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4">
            <button onClick={() => setShowEscalateModal(true)} className="w-full py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700">
              + New Escalation
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-3 bg-gray-50 border-b">
              <h3 className="font-semibold text-sm">Active Escalations</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {escalations.filter(e => e.status !== 'resolved').map(esc => (
                <div key={esc.id} onClick={() => setSelectedEscalation(esc)} className={`p-3 cursor-pointer hover:bg-gray-50 ${selectedEscalation?.id === esc.id ? 'bg-red-50' : ''}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-mono font-semibold">{esc.id}</p>
                      <p className="text-sm font-medium text-gray-800">{esc.ticketId}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{esc.customer}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusBadge(esc.status)}`}>{esc.status}</span>
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-gray-400">
                    <span>Level {esc.level}</span>
                    <span>SLA: {esc.slaDeadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedEscalation ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-gray-800">{selectedEscalation.id}</h3>
                    <p className="text-sm text-gray-500">Ticket: {selectedEscalation.ticketId}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadge(selectedEscalation.status)}`}>{selectedEscalation.status}</span>
                </div>
              </div>

              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div><span className="text-gray-400">Customer:</span> {selectedEscalation.customer}</div>
                  <div><span className="text-gray-400">Priority:</span> <span className="text-red-600 font-semibold">{selectedEscalation.priority}</span></div>
                  <div><span className="text-gray-400">Escalated By:</span> {selectedEscalation.escalatedBy}</div>
                  <div><span className="text-gray-400">Escalated To:</span> {selectedEscalation.escalatedTo}</div>
                  <div><span className="text-gray-400">Escalated On:</span> {selectedEscalation.escalatedAt}</div>
                  <div><span className="text-gray-400">SLA Deadline:</span> <span className={new Date(selectedEscalation.slaDeadline) < new Date() ? 'text-red-500' : 'text-green-600'}>{selectedEscalation.slaDeadline}</span></div>
                </div>

                <div className="border rounded-xl p-3">
                  <h4 className="text-sm font-semibold mb-1">Issue Summary</h4>
                  <p className="text-sm text-gray-600">{selectedEscalation.issue}</p>
                  <p className="text-xs text-gray-500 mt-2">Notes: {selectedEscalation.notes}</p>
                </div>

                {selectedEscalation.resolution && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-3">
                    <h4 className="text-sm font-semibold text-green-700">Resolution</h4>
                    <p className="text-sm text-green-600">{selectedEscalation.resolution}</p>
                    <p className="text-xs text-green-500 mt-1">Resolved on: {selectedEscalation.resolvedAt}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  {selectedEscalation.status === 'pending' && (
                    <button onClick={() => handleResolveEscalation(selectedEscalation.id)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm">Mark as Resolved</button>
                  )}
                  {selectedEscalation.status !== 'resolved' && (
                    <button className="px-4 py-2 border border-red-600 text-red-600 rounded-lg text-sm">Escalate Further</button>
                  )}
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">View Ticket</button>
                </div>

                {selectedEscalation.status === 'pending' && (
                  <div className="mt-3">
                    <textarea placeholder="Add resolution notes..." rows="2" value={resolutionNote} onChange={(e) => setResolutionNote(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm"></textarea>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-5xl mb-3">📈</div>
              <p className="text-gray-400">Select an escalation to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Escalate Modal */}
      {showEscalateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={() => setShowEscalateModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b">
              <h3 className="text-lg font-bold">Escalate Issue</h3>
            </div>
            <div className="p-5 space-y-4">
              <input type="text" placeholder="Ticket ID" value={newEscalation.ticketId} onChange={e => setNewEscalation({...newEscalation, ticketId: e.target.value})} className="w-full px-3 py-2 border rounded-lg" />
              <select value={newEscalation.escalateTo} onChange={e => setNewEscalation({...newEscalation, escalateTo: e.target.value})} className="w-full px-3 py-2 border rounded-lg">
                <option>Senior Admin</option>
                <option>Department Head</option>
                <option>Finance Manager</option>
                <option>Senior Management</option>
              </select>
              <textarea placeholder="Reason for escalation..." rows="3" value={newEscalation.reason} onChange={e => setNewEscalation({...newEscalation, reason: e.target.value})} className="w-full px-3 py-2 border rounded-lg"></textarea>
              <div className="flex gap-3">
                <button onClick={() => setShowEscalateModal(false)} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
                <button onClick={handleEscalate} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Escalate</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};