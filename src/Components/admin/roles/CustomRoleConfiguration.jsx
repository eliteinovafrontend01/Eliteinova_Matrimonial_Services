// src/components/admin/roles/CustomRoleConfiguration.jsx
import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const CustomRoleConfiguration = () => {
  const [customRoles, setCustomRoles] = useState([
    { id: 1, name: 'Regional Manager', modules: ['Customer Management', 'Vendor Management', 'Reports'], level: 'Intermediate' },
    { id: 2, name: 'Operations Lead', modules: ['Booking Management', 'Payments', 'Support'], level: 'Advanced' },
  ]);

  const [showConfigModal, setShowConfigModal] = useState(false);
  const [newCustomRole, setNewCustomRole] = useState({ name: '', modules: [], level: 'Basic' });

  const availableModules = [
    'Customer Management',
    'Vendor Management',
    'Booking Management',
    'Payments & Transactions',
    'Complaints & Support',
    'Reports & Analytics',
    'System Settings',
    'User Management'
  ];

  const handleModuleToggle = (module) => {
    setNewCustomRole(prev => ({
      ...prev,
      modules: prev.modules.includes(module)
        ? prev.modules.filter(m => m !== module)
        : [...prev.modules, module]
    }));
  };

  const handleCreateCustomRole = () => {
    if (newCustomRole.name && newCustomRole.modules.length > 0) {
      setCustomRoles([...customRoles, { 
        id: customRoles.length + 1, 
        ...newCustomRole 
      }]);
      setNewCustomRole({ name: '', modules: [], level: 'Basic' });
      setShowConfigModal(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Custom Role Configuration</h2>
            <p className="text-sm text-gray-500 mt-1">Define custom roles with specific access levels based on business requirements</p>
          </div>
          <button 
            onClick={() => setShowConfigModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            <Icon d={ICONS.add} size={16} />
            Create Custom Role
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {customRoles.map(role => (
            <div key={role.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">{role.name}</h4>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${
                    role.level === 'Advanced' ? 'bg-red-100 text-red-700' :
                    role.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {role.level}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                  <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {role.modules.map(module => (
                  <span key={module} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                    {module}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Configure Custom Role</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Role Name</label>
                <input
                  type="text"
                  value={newCustomRole.name}
                  onChange={(e) => setNewCustomRole({...newCustomRole, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                  placeholder="Enter role name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Access Level</label>
                <select
                  value={newCustomRole.level}
                  onChange={(e) => setNewCustomRole({...newCustomRole, level: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                >
                  <option value="Basic">Basic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Modules</label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {availableModules.map(module => (
                    <label key={module} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newCustomRole.modules.includes(module)}
                        onChange={() => handleModuleToggle(module)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">{module}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreateCustomRole}
                className="flex-1 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Create Custom Role
              </button>
              <button
                onClick={() => setShowConfigModal(false)}
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