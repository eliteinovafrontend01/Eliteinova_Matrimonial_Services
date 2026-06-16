// src/components/admin/roles/RoleEditingDeactivation.jsx
import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { StatusBadge } from '../shared/StatusBadge';
import { ICONS } from '../../../constants/admin/icons';

export const RoleEditingDeactivation = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Admin', users: 2, status: 'Active', created: '15 Jan 2024', description: 'Complete system access' },
    { id: 2, name: 'Vendor Manager', users: 4, status: 'Active', created: '20 Feb 2024', description: 'Manage vendor operations' },
    { id: 3, name: 'Booking Manager', users: 6, status: 'Active', created: '10 Mar 2024', description: 'Handle bookings' },
    { id: 4, name: 'Support Executive', users: 8, status: 'Active', created: '5 Mar 2024', description: 'Customer support' },
    { id: 5, name: 'Finance Admin', users: 3, status: 'Active', created: '12 Apr 2024', description: 'Financial operations' },
  ]);

  const [editingRole, setEditingRole] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditRole = (role) => {
    setEditingRole({...role});
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setRoles(roles.map(role => 
      role.id === editingRole.id ? editingRole : role
    ));
    setShowEditModal(false);
    setEditingRole(null);
  };

  const handleToggleStatus = (roleId) => {
    setRoles(roles.map(role => 
      role.id === roleId 
        ? { ...role, status: role.status === 'Active' ? 'Inactive' : 'Active' }
        : role
    ));
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Role Editing & Deactivation</h2>
          <p className="text-sm text-gray-500 mt-1">Modify or deactivate roles and revoke access when required</p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Role Name</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Description</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Users</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Created</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map(role => (
                <tr key={role.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-gray-800">{role.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{role.description}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{role.users}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={role.status} />
                      <button
                        onClick={() => handleToggleStatus(role.id)}
                        className={`text-xs ${
                          role.status === 'Active' ? 'text-red-600' : 'text-green-600'
                        } hover:underline`}
                      >
                        {role.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">{role.created}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditRole(role)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteRole(role.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && editingRole && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Edit Role</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Role Name</label>
                <input
                  type="text"
                  value={editingRole.name}
                  onChange={(e) => setEditingRole({...editingRole, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingRole.description}
                  onChange={(e) => setEditingRole({...editingRole, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  rows="3"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveEdit}
                className="flex-1 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingRole(null);
                }}
                className="flex-1 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};