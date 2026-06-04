// src/pages/admin/complaints/AdminActions.jsx
import { useState } from 'react';
import { Icon } from '../../../components/admin/shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const AdminActions = () => {
  const [vendors, setVendors] = useState([
    { id: 'VEN001', name: 'LensArt Studio', email: 'contact@lensart.com', rating: 4.5, status: 'active', warnings: 1, penalties: 0, complaints: 3, totalRefunds: 5000 },
    { id: 'VEN002', name: 'Royal Feast', email: 'info@royalfeast.com', rating: 4.2, status: 'active', warnings: 0, penalties: 0, complaints: 1, totalRefunds: 0 },
    { id: 'VEN003', name: 'Dream Decor', email: 'hello@dreamdecor.com', rating: 3.8, status: 'warning', warnings: 2, penalties: 1, complaints: 5, totalRefunds: 15000 },
    { id: 'VEN004', name: 'Shutter Stories', email: 'studio@shutterstories.com', rating: 2.5, status: 'suspended', warnings: 3, penalties: 2, complaints: 8, totalRefunds: 25000 },
  ]);

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [actionType, setActionType] = useState('');
  const [actionAmount, setActionAmount] = useState('');
  const [actionReason, setActionReason] = useState('');
  const [showActionModal, setShowActionModal] = useState(false);
  const [showCompensationModal, setShowCompensationModal] = useState(false);

  const handleVendorAction = () => {
    if (!selectedVendor) return;
    let updates = {};
    switch (actionType) {
      case 'warning':
        updates = { warnings: selectedVendor.warnings + 1, status: selectedVendor.warnings + 1 >= 2 ? 'warning' : 'active' };
        break;
      case 'penalty':
        updates = { penalties: selectedVendor.penalties + 1, status: selectedVendor.penalties + 1 >= 2 ? 'suspended' : 'warning' };
        break;
      case 'suspend':
        updates = { status: 'suspended' };
        break;
      case 'activate':
        updates = { status: 'active' };
        break;
    }
    setVendors(prev => prev.map(v => v.id === selectedVendor.id ? { ...v, ...updates } : v));
    setShowActionModal(false);
    setActionType('');
    setActionReason('');
  };

  const handleCompensation = () => {
    if (!selectedVendor || !actionAmount) return;
    setVendors(prev => prev.map(v => v.id === selectedVendor.id ? { ...v, totalRefunds: v.totalRefunds + parseInt(actionAmount) } : v));
    setShowCompensationModal(false);
    setActionAmount('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'warning': return 'bg-amber-100 text-amber-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🛡️</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Admin Actions</h3>
            <p className="text-sm text-gray-500 mt-0.5">Approve refunds or compensation, issue warnings or penalties to vendors, suspend or deactivate accounts if required</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Vendor Management</h3>
            <div className="space-y-2">
              {vendors.map(vendor => (
                <div key={vendor.id} onClick={() => setSelectedVendor(vendor)} className={`p-3 rounded-xl cursor-pointer transition-all ${selectedVendor?.id === vendor.id ? 'bg-red-50 border-l-4 border-red-500' : 'hover:bg-gray-50'}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{vendor.name}</p>
                      <p className="text-xs text-gray-400">{vendor.id}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(vendor.status)}`}>{vendor.status}</span>
                  </div>
                  <div className="flex gap-3 mt-2 text-xs text-gray-500">
                    <span>⚠️ {vendor.warnings} warnings</span>
                    <span>💰 {vendor.penalties} penalties</span>
                    <span>📋 {vendor.complaints} complaints</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {selectedVendor ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{selectedVendor.name}</h3>
                    <p className="text-sm text-gray-500">{selectedVendor.email}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-amber-500">⭐ {selectedVendor.rating}</div>
                    <p className="text-xs text-gray-400">Vendor Rating</p>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-5">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-2xl font-bold text-gray-800">{selectedVendor.complaints}</p>
                    <p className="text-xs text-gray-400">Total Complaints</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-2xl font-bold text-gray-800">{selectedVendor.warnings}</p>
                    <p className="text-xs text-gray-400">Warnings Issued</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-2xl font-bold text-gray-800">{selectedVendor.penalties}</p>
                    <p className="text-xs text-gray-400">Penalties Applied</p>
                  </div>
                </div>

                <div className="border rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">💰 Refund & Compensation Summary</h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-red-600">₹{selectedVendor.totalRefunds.toLocaleString()}</p>
                      <p className="text-xs text-gray-400">Total refunds processed</p>
                    </div>
                    <button onClick={() => setShowCompensationModal(true)} className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm">Approve Compensation</button>
                  </div>
                </div>

                <div className="border rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">⚖️ Vendor Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => { setActionType('warning'); setShowActionModal(true); }} className="px-3 py-2 border border-amber-500 text-amber-600 rounded-lg text-sm hover:bg-amber-50">Issue Warning</button>
                    <button onClick={() => { setActionType('penalty'); setShowActionModal(true); }} className="px-3 py-2 border border-red-500 text-red-600 rounded-lg text-sm hover:bg-red-50">Apply Penalty</button>
                    {selectedVendor.status !== 'suspended' ? (
                      <button onClick={() => { setActionType('suspend'); setShowActionModal(true); }} className="px-3 py-2 bg-red-600 text-white rounded-lg text-sm">Suspend Account</button>
                    ) : (
                      <button onClick={() => { setActionType('activate'); setShowActionModal(true); }} className="px-3 py-2 bg-green-600 text-white rounded-lg text-sm">Activate Account</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
              <div className="text-5xl mb-3">🛡️</div>
              <p className="text-gray-400">Select a vendor to perform admin actions</p>
            </div>
          )}
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && selectedVendor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={() => setShowActionModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b">
              <h3 className="text-lg font-bold">{actionType === 'warning' ? 'Issue Warning' : actionType === 'penalty' ? 'Apply Penalty' : actionType === 'suspend' ? 'Suspend Account' : 'Activate Account'}</h3>
            </div>
            <div className="p-5">
              <textarea placeholder="Reason for this action..." rows="3" value={actionReason} onChange={(e) => setActionReason(e.target.value)} className="w-full px-3 py-2 border rounded-lg mb-4"></textarea>
              <div className="flex gap-3">
                <button onClick={() => setShowActionModal(false)} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
                <button onClick={handleVendorAction} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg">Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compensation Modal */}
      {showCompensationModal && selectedVendor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={() => setShowCompensationModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b">
              <h3 className="text-lg font-bold">Approve Refund / Compensation</h3>
            </div>
            <div className="p-5 space-y-4">
              <input type="number" placeholder="Amount (₹)" value={actionAmount} onChange={(e) => setActionAmount(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              <textarea placeholder="Reason for compensation..." rows="2" className="w-full px-3 py-2 border rounded-lg"></textarea>
              <div className="flex gap-3">
                <button onClick={() => setShowCompensationModal(false)} className="flex-1 px-4 py-2 border rounded-lg">Cancel</button>
                <button onClick={handleCompensation} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg">Approve</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};