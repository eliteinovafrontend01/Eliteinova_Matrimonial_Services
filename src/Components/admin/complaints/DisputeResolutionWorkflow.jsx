// src/pages/admin/complaints/DisputeResolutionWorkflow.jsx
import { useState } from 'react';
import { Icon } from '../../../components/admin/shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const DisputeResolutionWorkflow = () => {
  const [activeDisputes, setActiveDisputes] = useState([
    { id: 'DSP001', ticketId: 'TKT001', customer: 'Aarav Patel', vendor: 'LensArt Studio', issue: 'Vendor no-show', amount: 25000, status: 'investigating', evidence: ['chat_screenshot.png', 'booking_confirmation.pdf'], actions: [] },
    { id: 'DSP002', ticketId: 'TKT002', customer: 'Ishita Reddy', vendor: 'Royal Feast', issue: 'Payment deducted but no confirmation', amount: 45000, status: 'verification', evidence: ['payment_screenshot.jpg'], actions: [] },
    { id: 'DSP003', ticketId: 'TKT003', customer: 'Neha Gupta', vendor: 'Grand Palace', issue: 'Refund not received', amount: 75000, status: 'action_taken', evidence: ['cancellation_email.pdf'], actions: [{ type: 'refund', status: 'processed', date: '2024-01-14' }] },
  ]);

  const [selectedDispute, setSelectedDispute] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionNote, setActionNote] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);

  const handleTakeAction = () => {
    if (!selectedDispute || !actionType) return;
    const newAction = { type: actionType, note: actionNote, date: new Date().toLocaleDateString(), status: 'pending' };
    setActiveDisputes(prev => prev.map(d => 
      d.id === selectedDispute.id 
        ? { ...d, actions: [...d.actions, newAction], status: actionType === 'refund' ? 'refund_approved' : 'warning_issued' }
        : d
    ));
    setShowActionModal(false);
    setActionType('');
    setActionNote('');
  };

  const handleVerifyFacts = (disputeId) => {
    setActiveDisputes(prev => prev.map(d => 
      d.id === disputeId ? { ...d, status: 'verified' } : d
    ));
  };

  const statusSteps = [
    { key: 'investigating', label: 'Investigate Issues', icon: '🔍', color: 'bg-blue-100 text-blue-700' },
    { key: 'verification', label: 'Verify Facts', icon: '✅', color: 'bg-purple-100 text-purple-700' },
    { key: 'verified', label: 'Evidence Confirmed', icon: '📋', color: 'bg-amber-100 text-amber-700' },
    { key: 'action_taken', label: 'Take Action', icon: '⚖️', color: 'bg-green-100 text-green-700' },
  ];

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">⚖️</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Dispute Resolution Workflow</h3>
            <p className="text-sm text-gray-500 mt-0.5">Investigate issues, verify facts, and take appropriate action such as refunds, vendor warnings, or penalties</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          {activeDisputes.map(dispute => (
            <div key={dispute.id} onClick={() => setSelectedDispute(dispute)} className={`bg-white rounded-xl p-4 shadow-sm border cursor-pointer transition-all ${selectedDispute?.id === dispute.id ? 'border-red-400 ring-2 ring-red-100' : 'border-gray-100'}`}>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono font-semibold text-gray-500">{dispute.id}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${dispute.status === 'investigating' ? 'bg-blue-100' : dispute.status === 'verification' ? 'bg-purple-100' : 'bg-green-100'}`}>{dispute.status}</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">{dispute.issue}</p>
              <p className="text-xs text-gray-500 mt-1">{dispute.customer} vs {dispute.vendor}</p>
              <p className="text-xs font-semibold text-gray-700 mt-1">Amount: ₹{dispute.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedDispute ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gray-50">
                <h3 className="font-bold text-gray-800">Dispute Resolution: {selectedDispute.id}</h3>
                <p className="text-sm text-gray-500">{selectedDispute.issue}</p>
              </div>

              <div className="p-5 space-y-5">
                {/* Workflow Steps */}
                <div className="flex justify-between">
                  {statusSteps.map((step, idx) => {
                    const isCompleted = selectedDispute.status === step.key || 
                      (step.key === 'investigating' && selectedDispute.status !== 'investigating') ||
                      (step.key === 'verification' && (selectedDispute.status === 'verified' || selectedDispute.status === 'action_taken')) ||
                      (step.key === 'verified' && selectedDispute.status === 'action_taken');
                    return (
                      <div key={idx} className="flex-1 text-center">
                        <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-sm ${isCompleted ? 'bg-green-500 text-white' : step.color}`}>{step.icon}</div>
                        <p className="text-[10px] font-semibold mt-1">{step.label}</p>
                      </div>
                    );
                  })}
                </div>

                {/* Evidence */}
                <div className="border rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">📎 Evidence Submitted</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDispute.evidence.map((ev, idx) => (
                      <button key={idx} onClick={() => setShowEvidenceModal(true)} className="bg-gray-100 rounded-lg px-3 py-1.5 text-xs flex items-center gap-1">📄 {ev}</button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="border rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">📝 Actions Taken</h4>
                  {selectedDispute.actions.length > 0 ? selectedDispute.actions.map((action, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-2 mb-2 text-sm">
                      <span className="font-semibold">{action.type === 'refund' ? '💰 Refund' : '⚠️ Warning'}</span> - {action.status} on {action.date}
                      {action.note && <p className="text-xs text-gray-500 mt-1">{action.note}</p>}
                    </div>
                  )) : <p className="text-sm text-gray-400">No actions taken yet</p>}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button onClick={() => handleVerifyFacts(selectedDispute.id)} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700">Verify Facts</button>
                  <button onClick={() => setShowActionModal(true)} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700">Take Action</button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm">Contact Parties</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-5xl mb-3">⚖️</div>
              <p className="text-gray-400">Select a dispute to manage resolution workflow</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && selectedDispute && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={() => setShowActionModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Take Action</h3>
            </div>
            <div className="p-5 space-y-4">
              <select value={actionType} onChange={(e) => setActionType(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
                <option value="">Select Action</option>
                <option value="refund">Approve Refund / Compensation</option>
                <option value="vendor_warning">Issue Warning to Vendor</option>
                <option value="vendor_penalty">Apply Penalty to Vendor</option>
                <option value="suspend">Suspend Vendor Account</option>
              </select>
              <textarea placeholder="Action notes / Justification..." rows="3" value={actionNote} onChange={(e) => setActionNote(e.target.value)} className="w-full px-3 py-2 border rounded-lg"></textarea>
              <div className="flex gap-3">
                <button onClick={() => setShowActionModal(false)} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
                <button onClick={handleTakeAction} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Confirm Action</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Evidence Modal */}
      {showEvidenceModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={() => setShowEvidenceModal(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b flex justify-between">
              <h3 className="font-bold">Evidence Documents</h3>
              <button onClick={() => setShowEvidenceModal(false)}>✕</button>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4">
                {selectedDispute?.evidence.map((ev, idx) => (
                  <div key={idx} className="border rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">📄</div>
                    <p className="text-sm font-mono">{ev}</p>
                    <button className="mt-2 text-xs text-blue-500">Download</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};