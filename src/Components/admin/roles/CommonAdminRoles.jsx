// src/components/admin/roles/CommonAdminRoles.jsx
import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { StatusBadge } from '../shared/StatusBadge';
import { ICONS } from '../../../constants/admin/icons';

export const CommonAdminRoles = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const commonRoles = [
    {
      id: 'super-admin',
      name: 'Super Admin',
      icon: '👑',
      description: 'Full access to all modules and settings',
      users: 2,
      status: 'Active',
      permissions: ['All Modules - Full Access', 'System Settings', 'User Management', 'Role Management'],
      responsibilities: ['System administration', 'User management', 'Role configuration', 'Security oversight']
    },
    {
      id: 'vendor-manager',
      name: 'Vendor Manager',
      icon: '🏢',
      description: 'Manages vendor onboarding, verification, and profiles',
      users: 4,
      status: 'Active',
      permissions: ['Vendor Management', 'Vendor Verification', 'Profile Management', 'Vendor Reports'],
      responsibilities: ['Vendor onboarding', 'Profile verification', 'Vendor performance monitoring', 'Compliance checks']
    },
    {
      id: 'booking-manager',
      name: 'Booking Manager',
      icon: '📅',
      description: 'Handles bookings, scheduling, and vendor assignments',
      users: 6,
      status: 'Active',
      permissions: ['Booking Management', 'Scheduling', 'Vendor Assignment', 'Booking Reports'],
      responsibilities: ['Booking coordination', 'Schedule management', 'Vendor allocation', 'Customer booking support']
    },
    {
      id: 'support-executive',
      name: 'Support Executive',
      icon: '💬',
      description: 'Manages customer queries, complaints, and disputes',
      users: 8,
      status: 'Active',
      permissions: ['Customer Support', 'Complaint Management', 'Dispute Resolution', 'Support Reports'],
      responsibilities: ['Customer query handling', 'Complaint resolution', 'Dispute mediation', 'Customer satisfaction']
    },
    {
      id: 'finance-admin',
      name: 'Finance Admin',
      icon: '💰',
      description: 'Handles payments, transactions, refunds, and reports',
      users: 3,
      status: 'Active',
      permissions: ['Payments', 'Transactions', 'Refunds', 'Financial Reports', 'Revenue Management'],
      responsibilities: ['Payment processing', 'Transaction monitoring', 'Refund handling', 'Financial reporting']
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Common Admin Roles</h2>
          <p className="text-sm text-gray-500 mt-1">Standard admin roles with predefined permissions and responsibilities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
          {commonRoles.map(role => (
            <div
              key={role.id}
              onClick={() => setSelectedRole(selectedRole?.id === role.id ? null : role)}
              className={`border rounded-xl p-4 cursor-pointer transition-all ${
                selectedRole?.id === role.id 
                  ? 'border-red-500 shadow-md bg-red-50' 
                  : 'border-gray-200 hover:shadow-md hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{role.icon}</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">{role.name}</h4>
                    <StatusBadge status={role.status} />
                  </div>
                </div>
                <span className="text-sm text-gray-500">{role.users} users</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{role.description}</p>
              {selectedRole?.id === role.id && (
                <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
                  <div>
                    <h5 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Permissions</h5>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((perm, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-lg">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Responsibilities</h5>
                    <ul className="text-sm text-gray-600 space-y-0.5">
                      {role.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <span className="text-green-500">✓</span>
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};