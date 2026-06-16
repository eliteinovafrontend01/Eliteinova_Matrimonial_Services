// src/Components/admin/roles/RoleCreationManagement.jsx
import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { StatusBadge } from '../shared/StatusBadge';
import { ICONS } from '../../../constants/admin/icons';

export const RoleCreationManagement = () => {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Super Admin', users: 2, status: 'Active', created: '15 Jan 2024', description: 'Complete system access' },
    { id: 2, name: 'Vendor Manager', users: 4, status: 'Active', created: '20 Feb 2024', description: 'Manage vendor operations' },
    { id: 3, name: 'Booking Manager', users: 6, status: 'Active', created: '10 Mar 2024', description: 'Handle bookings' },
    { id: 4, name: 'Support Executive', users: 8, status: 'Active', created: '5 Mar 2024', description: 'Customer support' },
    { id: 5, name: 'Finance Admin', users: 3, status: 'Inactive', created: '12 Apr 2024', description: 'Financial operations' },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', description: '', status: 'Active' });

  const handleCreateRole = () => {
    if (newRole.name.trim()) {
      setRoles([...roles, { 
        id: roles.length + 1, 
        ...newRole, 
        users: 0,
        created: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      }]);
      setNewRole({ name: '', description: '', status: 'Active' });
      setShowCreateModal(false);
    }
  };

  const handleDeleteRole = (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== id));
    }
  };

  const handleCloneRole = (role) => {
    const clonedRole = {
      ...role,
      id: roles.length + 1,
      name: `${role.name} (Clone)`,
      users: 0,
      created: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setRoles([...roles, clonedRole]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Role Creation & Management</h2>
            <p className="text-sm text-gray-500 mt-1">Create and manage admin roles with specific access levels</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            <Icon d={ICONS.add} size={16} />
            Create New Role
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">Total Roles</p>
            <p className="text-2xl font-bold text-gray-800">{roles.length}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">Active Roles</p>
            <p className="text-2xl font-bold text-gray-800">{roles.filter(r => r.status === 'Active').length}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-800">{roles.reduce((sum, r) => sum + r.users, 0)}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
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
                  <td className="py-3 px-4"><StatusBadge status={role.status} /></td>
                  <td className="py-3 px-4 text-sm text-gray-500">{role.created}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                      <button 
                        onClick={() => handleCloneRole(role)}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        Clone
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

      {/* Create Role Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Create New Role</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Role Name</label>
                <input
                  type="text"
                  value={newRole.name}
                  onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter role name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  rows="3"
                  placeholder="Enter role description"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                <select
                  value={newRole.status}
                  onChange={(e) => setNewRole({...newRole, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreateRole}
                className="flex-1 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Create Role
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
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