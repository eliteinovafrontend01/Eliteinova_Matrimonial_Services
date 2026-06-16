// src/components/admin/roles/UserAssignment.jsx
import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { StatusBadge } from '../shared/StatusBadge';
import { ICONS } from '../../../constants/admin/icons';

export const UserAssignment = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Super Admin', status: 'Active', assigned: '15 Jan 2024' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Vendor Manager', status: 'Active', assigned: '20 Feb 2024' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Booking Manager', status: 'Inactive', assigned: '10 Mar 2024' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Support Executive', status: 'Active', assigned: '5 Mar 2024' },
    { id: 5, name: 'David Brown', email: 'david@example.com', role: 'Finance Admin', status: 'Active', assigned: '12 Apr 2024' },
  ]);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newAssignment, setNewAssignment] = useState({ email: '', role: '' });

  const roles = ['Super Admin', 'Vendor Manager', 'Booking Manager', 'Support Executive', 'Finance Admin'];

  const handleAssignRole = () => {
    if (newAssignment.email && newAssignment.role) {
      const newUser = {
        id: users.length + 1,
        name: newAssignment.email.split('@')[0],
        email: newAssignment.email,
        role: newAssignment.role,
        status: 'Active',
        assigned: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      };
      setUsers([...users, newUser]);
      setNewAssignment({ email: '', role: '' });
      setShowAssignModal(false);
    }
  };

  const handleRevokeAccess = (userId) => {
    if (window.confirm('Are you sure you want to revoke access for this user?')) {
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: 'Inactive' } : user
      ));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">User Assignment</h2>
            <p className="text-sm text-gray-500 mt-1">Assign admin users to roles and manage their responsibilities</p>
          </div>
          <button 
            onClick={() => setShowAssignModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            <Icon d={ICONS.add} size={16} />
            Assign User
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-800">{users.length}</p>
          </div>
          <div className="bg-green-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">Active Users</p>
            <p className="text-2xl font-bold text-gray-800">{users.filter(u => u.status === 'Active').length}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <p className="text-sm text-gray-600">Unique Roles</p>
            <p className="text-2xl font-bold text-gray-800">{new Set(users.map(u => u.role)).size}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">User</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Role</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Assigned</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-semibold text-gray-800">{user.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg">{user.role}</span>
                  </td>
                  <td className="py-3 px-4"><StatusBadge status={user.status} /></td>
                  <td className="py-3 px-4 text-sm text-gray-500">{user.assigned}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleRevokeAccess(user.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Revoke
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign User Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Assign User to Role</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">User Email</label>
                <input
                  type="email"
                  value={newAssignment.email}
                  onChange={(e) => setNewAssignment({...newAssignment, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Enter user email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Role</label>
                <select
                  value={newAssignment.role}
                  onChange={(e) => setNewAssignment({...newAssignment, role: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Select role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAssignRole}
                className="flex-1 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Assign Role
              </button>
              <button
                onClick={() => setShowAssignModal(false)}
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