// src/components/admin/roles/PermissionBasedAccessControl.jsx
import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const PermissionBasedAccessControl = () => {
  const [modules, setModules] = useState([
    { 
      id: 1, 
      name: 'Customer Management', 
      permissions: ['View', 'Edit', 'Delete', 'Block'],
      enabled: ['View', 'Edit']
    },
    { 
      id: 2, 
      name: 'Vendor Management', 
      permissions: ['View', 'Edit', 'Verify', 'Approve', 'Deactivate'],
      enabled: ['View', 'Edit', 'Verify']
    },
    { 
      id: 3, 
      name: 'Booking Management', 
      permissions: ['View', 'Edit', 'Cancel', 'Reschedule'],
      enabled: ['View', 'Edit']
    },
    { 
      id: 4, 
      name: 'Payments & Transactions', 
      permissions: ['View', 'Process', 'Refund', 'Export'],
      enabled: ['View']
    },
    { 
      id: 5, 
      name: 'Complaints & Support', 
      permissions: ['View', 'Respond', 'Escalate', 'Resolve'],
      enabled: ['View', 'Respond']
    },
    { 
      id: 6, 
      name: 'Reports & Analytics', 
      permissions: ['View', 'Export', 'Schedule'],
      enabled: ['View']
    },
  ]);

  const [selectedRole, setSelectedRole] = useState('Super Admin');
  const roles = ['Super Admin', 'Vendor Manager', 'Booking Manager', 'Support Executive', 'Finance Admin'];

  const togglePermission = (moduleId, permission) => {
    setModules(modules.map(module => {
      if (module.id === moduleId) {
        const enabled = module.enabled.includes(permission)
          ? module.enabled.filter(p => p !== permission)
          : [...module.enabled, permission];
        return { ...module, enabled };
      }
      return module;
    }));
  };

  const getPermissionStatus = (module, permission) => {
    return module.enabled.includes(permission);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Permission-Based Access Control</h2>
            <p className="text-sm text-gray-500 mt-1">Configure module-level access permissions for admin roles</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Role:</span>
            <select 
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
            >
              {roles.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {modules.map(module => (
            <div key={module.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">{module.name}</h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">
                    {module.enabled.length}/{module.permissions.length} enabled
                  </span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${(module.enabled.length / module.permissions.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {module.permissions.map(permission => (
                  <label key={permission} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={getPermissionStatus(module, permission)}
                      onChange={() => togglePermission(module.id, permission)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">{permission}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
          <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
            Save Permissions
          </button>
          <button className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
            Reset to Default
          </button>
        </div>
      </div>

      <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
        <h4 className="font-semibold text-blue-800 mb-2">💡 Permission Guidelines</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>View:</strong> Read-only access to module data</li>
          <li>• <strong>Edit:</strong> Modify existing records and entries</li>
          <li>• <strong>Delete:</strong> Remove records from the system</li>
          <li>• <strong>Approve/Verify:</strong> Validate and confirm actions</li>
          <li>• <strong>Export:</strong> Generate and download reports</li>
        </ul>
      </div>
    </div>
  );
};