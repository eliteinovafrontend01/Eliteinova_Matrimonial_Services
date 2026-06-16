// src/components/admin/roles/AccessRestrictions.jsx
import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const AccessRestrictions = () => {
  const [restrictions, setRestrictions] = useState([
    { id: 1, module: 'Financial Transactions', restricted: true, roles: ['Support Executive', 'Booking Manager'] },
    { id: 2, module: 'KYC Details', restricted: true, roles: ['Support Executive'] },
    { id: 3, module: 'Reports & Analytics', restricted: false, roles: [] },
    { id: 4, module: 'System Settings', restricted: true, roles: ['Support Executive', 'Vendor Manager', 'Booking Manager'] },
    { id: 5, module: 'User Management', restricted: true, roles: ['Support Executive', 'Vendor Manager', 'Booking Manager', 'Finance Admin'] },
  ]);

  const allRoles = ['Super Admin', 'Vendor Manager', 'Booking Manager', 'Support Executive', 'Finance Admin'];

  const toggleRestriction = (moduleId, role) => {
    setRestrictions(restrictions.map(module => {
      if (module.id === moduleId) {
        const roles = module.restricted 
          ? module.roles.includes(role) 
            ? module.roles.filter(r => r !== role)
            : [...module.roles, role]
          : [...module.roles, role];
        return { ...module, roles, restricted: roles.length > 0 };
      }
      return module;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Access Restrictions</h2>
          <p className="text-sm text-gray-500 mt-1">Limit access to sensitive data such as financial transactions, KYC details, and reports</p>
        </div>

        <div className="mt-6 space-y-4">
          {restrictions.map(module => (
            <div key={module.id} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-800">{module.module}</h4>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold mt-1 ${
                    module.restricted ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {module.restricted ? '🔒 Restricted' : '🔓 Open Access'}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                {allRoles.map(role => (
                  <label key={role} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={module.restricted && module.roles.includes(role)}
                      onChange={() => toggleRestriction(module.id, role)}
                      disabled={role === 'Super Admin'}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500 disabled:opacity-50"
                    />
                    <span className={`text-sm ${
                      role === 'Super Admin' ? 'text-gray-400' : 'text-gray-700'
                    }`}>
                      {role}
                      {role === 'Super Admin' && ' (Always Allowed)'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
            Save Access Restrictions
          </button>
        </div>
      </div>

      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Note</h4>
        <p className="text-sm text-yellow-700">
          Super Admin always has full access to all modules. Restrictions apply to other roles only.
        </p>
      </div>
    </div>
  );
};