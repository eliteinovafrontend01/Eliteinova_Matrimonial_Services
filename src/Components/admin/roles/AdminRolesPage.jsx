import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { StatusBadge } from '../shared/StatusBadge';
import { FeatureCard } from '../shared/FeatureCard';
import { ICONS } from '../../../constants/admin/icons';

export const AdminRolesPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);

  const rolesData = [
    { id: 'ROLE001', name: 'Super Admin', users: 2, permissions: 'Full Access', status: 'Active', lastModified: '15 Jan 2024', description: 'Complete system access with all privileges' },
    { id: 'ROLE002', name: 'Vendor Manager', users: 4, permissions: 'Vendor Management Only', status: 'Active', lastModified: '20 Feb 2024', description: 'Manage vendor onboarding, verification, and profiles' },
    { id: 'ROLE003', name: 'Booking Manager', users: 6, permissions: 'Booking Management', status: 'Active', lastModified: '10 Mar 2024', description: 'Handle bookings, scheduling, and vendor assignments' },
    { id: 'ROLE004', name: 'Support Executive', users: 8, permissions: 'Customer Support Only', status: 'Active', lastModified: '5 Mar 2024', description: 'Manage customer queries, complaints, and disputes' },
    { id: 'ROLE005', name: 'Finance Admin', users: 3, permissions: 'Payments & Transactions', status: 'Active', lastModified: '12 Apr 2024', description: 'Handle payments, transactions, refunds, and reports' },
  ];

  const permissionModules = [
    { module: 'Customer Management', permissions: ['View', 'Edit', 'Delete', 'Block'] },
    { module: 'Vendor Management', permissions: ['View', 'Edit', 'Verify', 'Approve', 'Deactivate'] },
    { module: 'Booking Management', permissions: ['View', 'Edit', 'Cancel', 'Reschedule'] },
    { module: 'Payments & Transactions', permissions: ['View', 'Process', 'Refund', 'Export'] },
    { module: 'Complaints & Support', permissions: ['View', 'Respond', 'Escalate', 'Resolve'] },
    { module: 'Reports & Analytics', permissions: ['View', 'Export', 'Schedule'] },
  ];

  const statCards = [
    { label: 'Total Roles', value: '8', icon: '👥', color: 'border-blue-400', filter: 'All' },
    { label: 'Active Roles', value: '6', icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Total Admin Users', value: '23', icon: '👤', color: 'border-purple-400', filter: 'All' },
    { label: 'Pending Requests', value: '2', icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
  ];

  const filtered = rolesData.filter(r => {
    const matchStatus = activeFilter === 'All' || r.status === activeFilter;
    const matchSearch = !search || r.name.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const featureCards = [
    { emoji: '👥', title: 'Role Creation & Management', accentColor: 'bg-indigo-50', points: ['Create Super Admin, Manager, Support roles', 'Define custom roles with specific access', 'Clone existing roles for efficiency', 'Role deletion & archiving'] },
    { emoji: '🔐', title: 'Permission-Based Access Control', accentColor: 'bg-purple-50', points: ['Module-level access restrictions', 'Granular permission settings', 'View/Edit/Delete/Approve controls', 'Sensitive data access limits'] },
    { emoji: '👤', title: 'User Assignment', accentColor: 'bg-blue-50', points: ['Assign admin users to roles', 'Manage user responsibilities', 'Track role assignments', 'Revoke access when required'] },
    { emoji: '📊', title: 'Activity Monitoring & Audit', accentColor: 'bg-green-50', points: ['Login history tracking', 'Changes & approvals log', 'Complete audit trail', 'Security & transparency'] }
  ];

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">👥</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Admin Roles & Access Management</h3>
            <p className="text-sm text-gray-500 mt-0.5">Create, configure and manage admin roles with permission-based access control</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} onClick={() => setActiveFilter(s.filter)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-gray-800">{s.value}</p>
                {activeFilter === s.filter && <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600"><Icon d={ICONS.roles} size={18} /></div>
                <div><h3 className="font-bold text-gray-800 text-base">Admin Roles</h3><p className="text-xs text-gray-400">{filtered.length} roles configured</p></div>
              </div>
              <button onClick={() => alert('Create new role')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700">+ Create New Role</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon d={ICONS.search} size={15} /></span>
                <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search roles..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50" />
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {filtered.map(role => (
              <div key={role.id} onClick={() => setSelectedRole(role)} className={`px-5 py-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedRole?.id === role.id ? 'bg-red-50' : ''}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-800">{role.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{role.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[10px] text-gray-400">{role.users} users</span>
                      <span className="text-[10px] text-gray-400">Updated: {role.lastModified}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={role.status} />
                    <p className="text-[10px] text-gray-400 mt-1">{role.permissions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-base flex items-center gap-2"><Icon d={ICONS.shield} size={16} /> Role Permissions</h3>
            {selectedRole ? <p className="text-xs text-gray-500 mt-1">Configuring: <span className="font-semibold text-gray-700">{selectedRole.name}</span></p> : <p className="text-xs text-gray-400 mt-1">Select a role to configure permissions</p>}
          </div>
          {selectedRole ? (
            <div className="p-5 space-y-4">
              {permissionModules.map((module, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-3 last:border-0">
                  <p className="text-xs font-bold text-gray-700 mb-2">{module.module}</p>
                  <div className="flex flex-wrap gap-2">
                    {module.permissions.map((perm, pIdx) => (
                      <label key={pIdx} className="flex items-center gap-1.5">
                        <input type="checkbox" className="rounded border-gray-300 text-red-600 focus:ring-red-500" defaultChecked={perm === 'View'} />
                        <span className="text-[11px] text-gray-600">{perm}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex gap-2 pt-3">
                <button className="flex-1 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700">Save Changes</button>
                <button className="px-3 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50">Reset</button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center"><div className="text-4xl mb-3">🔐</div><p className="text-sm text-gray-400">Select a role from the list to view and edit permissions</p></div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>
    </div>
  );
};