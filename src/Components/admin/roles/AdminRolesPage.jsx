// src/components/admin/roles/AdminRolesPage.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { StatusBadge } from '../shared/StatusBadge';
import { FeatureCard } from '../shared/FeatureCard';
import { ICONS } from '../../../constants/admin/icons';

// Import all submenu components
import { RoleCreationManagement } from './RoleCreationManagement';
import { PermissionBasedAccessControl } from './PermissionBasedAccessControl';
import { CustomRoleConfiguration } from './CustomRoleConfiguration';
import { UserAssignment } from './UserAssignment';
import { AccessRestrictions } from './AccessRestrictions';
import { ActivityMonitoring } from './ActivityMonitoring';
import { AuditLogs } from './AuditLogs';
import { SecureAuthentication } from './SecureAuthentication';
import { RoleEditingDeactivation } from './RoleEditingDeactivation';
import { CommonAdminRoles } from './CommonAdminRoles';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

// Error Message Component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
    <div className="text-red-600 text-lg font-semibold mb-2">⚠️ Error</div>
    <div className="text-red-500 mb-4">{message}</div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    )}
  </div>
);

// Create Role Modal
const CreateRoleModal = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'Active',
    permissions: []
  });

  const [permissionModules] = useState([
    { module: 'Customer Management', permissions: ['View', 'Edit', 'Delete', 'Block'] },
    { module: 'Vendor Management', permissions: ['View', 'Edit', 'Verify', 'Approve', 'Deactivate'] },
    { module: 'Booking Management', permissions: ['View', 'Edit', 'Cancel', 'Reschedule'] },
    { module: 'Payments & Transactions', permissions: ['View', 'Process', 'Refund', 'Export'] },
    { module: 'Complaints & Support', permissions: ['View', 'Respond', 'Escalate', 'Resolve'] },
    { module: 'Reports & Analytics', permissions: ['View', 'Export', 'Schedule'] },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePermission = (moduleName, permission) => {
    const key = `${moduleName}-${permission}`;
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(key)
        ? prev.permissions.filter(p => p !== key)
        : [...prev.permissions, key]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave({
        ...formData,
        id: `ROLE${Date.now()}`,
        users: 0,
        lastModified: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Create New Role</h3>
          <p className="text-xs text-gray-500 mt-1">Configure a new admin role with specific permissions</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Role Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Enter role name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Enter role description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Permissions</label>
            <div className="space-y-3 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-lg">
              {permissionModules.map((module, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-2 last:border-0">
                  <p className="text-xs font-bold text-gray-700 mb-1.5">{module.module}</p>
                  <div className="flex flex-wrap gap-2">
                    {module.permissions.map((perm, pIdx) => {
                      const key = `${module.module}-${perm}`;
                      return (
                        <label key={pIdx} className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 px-1.5 py-0.5 rounded transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.permissions.includes(key)}
                            onChange={() => togglePermission(module.module, perm)}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <span className="text-[11px] text-gray-600">{perm}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Create Role
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Edit Role Modal
const EditRoleModal = ({ role, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    status: role?.status || 'Active',
    permissions: role?.permissions || []
  });

  const [permissionModules] = useState([
    { module: 'Customer Management', permissions: ['View', 'Edit', 'Delete', 'Block'] },
    { module: 'Vendor Management', permissions: ['View', 'Edit', 'Verify', 'Approve', 'Deactivate'] },
    { module: 'Booking Management', permissions: ['View', 'Edit', 'Cancel', 'Reschedule'] },
    { module: 'Payments & Transactions', permissions: ['View', 'Process', 'Refund', 'Export'] },
    { module: 'Complaints & Support', permissions: ['View', 'Respond', 'Escalate', 'Resolve'] },
    { module: 'Reports & Analytics', permissions: ['View', 'Export', 'Schedule'] },
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePermission = (moduleName, permission) => {
    const key = `${moduleName}-${permission}`;
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(key)
        ? prev.permissions.filter(p => p !== key)
        : [...prev.permissions, key]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(role.id, {
        ...formData,
        lastModified: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Edit Role</h3>
          <p className="text-xs text-gray-500 mt-1">Modify role details and permissions</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Role Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Enter role name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="2"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
              placeholder="Enter role description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Permissions</label>
            <div className="space-y-3 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-lg">
              {permissionModules.map((module, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-2 last:border-0">
                  <p className="text-xs font-bold text-gray-700 mb-1.5">{module.module}</p>
                  <div className="flex flex-wrap gap-2">
                    {module.permissions.map((perm, pIdx) => {
                      const key = `${module.module}-${perm}`;
                      return (
                        <label key={pIdx} className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 px-1.5 py-0.5 rounded transition-colors">
                          <input
                            type="checkbox"
                            checked={formData.permissions.includes(key)}
                            onChange={() => togglePermission(module.module, perm)}
                            className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                          />
                          <span className="text-[11px] text-gray-600">{perm}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`px-4 py-3 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-orange-500'
      } text-white flex items-center gap-3`}>
        <span>{message}</span>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          ✕
        </button>
      </div>
    </div>
  );
};

export const AdminRolesPage = ({ activeSubmenu }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Toast notification
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Load roles data (simulate API call)
  useEffect(() => {
    const loadRoles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        // Initial mock data
        const mockRoles = [
          { id: 'ROLE001', name: 'Super Admin', users: 2, permissions: ['Full Access'], status: 'Active', lastModified: '15 Jan 2024', description: 'Complete system access with all privileges' },
          { id: 'ROLE002', name: 'Vendor Manager', users: 4, permissions: ['Vendor Management Only'], status: 'Active', lastModified: '20 Feb 2024', description: 'Manage vendor onboarding, verification, and profiles' },
          { id: 'ROLE003', name: 'Booking Manager', users: 6, permissions: ['Booking Management'], status: 'Active', lastModified: '10 Mar 2024', description: 'Handle bookings, scheduling, and vendor assignments' },
          { id: 'ROLE004', name: 'Support Executive', users: 8, permissions: ['Customer Support Only'], status: 'Active', lastModified: '5 Mar 2024', description: 'Manage customer queries, complaints, and disputes' },
          { id: 'ROLE005', name: 'Finance Admin', users: 3, permissions: ['Payments & Transactions'], status: 'Active', lastModified: '12 Apr 2024', description: 'Handle payments, transactions, refunds, and reports' },
        ];
        setRoles(mockRoles);
      } catch (err) {
        setError('Failed to load roles. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRoles();
  }, []);

  // Calculate stats
  const stats = useMemo(() => {
    const total = roles.length;
    const active = roles.filter(r => r.status === 'Active').length;
    const inactive = roles.filter(r => r.status === 'Inactive').length;
    const totalUsers = roles.reduce((sum, r) => sum + (r.users || 0), 0);
    
    return { total, active, inactive, totalUsers };
  }, [roles]);

  // Memoized filter logic
  const filtered = useMemo(() => {
    try {
      return roles.filter(role => {
        const matchStatus = activeFilter === 'All' || role.status === activeFilter;
        const matchSearch = !search || 
          role.name.toLowerCase().includes(search.toLowerCase()) || 
          role.description.toLowerCase().includes(search.toLowerCase()) ||
          role.id.toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchSearch;
      });
    } catch (err) {
      setError('Error filtering roles');
      return [];
    }
  }, [roles, activeFilter, search]);

  // Helper functions
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // CRUD Operations
  const handleCreateRole = (newRole) => {
    setRoles(prev => [...prev, newRole]);
    showToast(`Role "${newRole.name}" created successfully!`, 'success');
  };

  const handleEditRole = (role) => {
    setSelectedRole(role);
    setShowEditModal(true);
  };

  const handleSaveEdit = (roleId, updatedData) => {
    setRoles(prevRoles => 
      prevRoles.map(role => 
        role.id === roleId 
          ? { ...role, ...updatedData }
          : role
      )
    );
    setSelectedRole(null);
    showToast(`Role updated successfully!`, 'success');
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      setRoles(prevRoles => prevRoles.filter(role => role.id !== roleId));
      if (selectedRole?.id === roleId) {
        setSelectedRole(null);
      }
      showToast('Role deleted successfully!', 'success');
    }
  };

  const handleCloneRole = (role) => {
    const clonedRole = {
      ...role,
      id: `ROLE${Date.now()}`,
      name: `${role.name} (Clone)`,
      users: 0,
      lastModified: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setRoles(prev => [...prev, clonedRole]);
    showToast(`Role "${clonedRole.name}" cloned successfully!`, 'success');
  };

  const handleToggleStatus = (roleId) => {
    setRoles(prevRoles => 
      prevRoles.map(role => 
        role.id === roleId 
          ? { ...role, status: role.status === 'Active' ? 'Inactive' : 'Active', lastModified: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) }
          : role
      )
    );
    showToast('Role status updated successfully!', 'success');
  };

  // Render specific component based on activeSubmenu
  const renderContent = () => {
    switch(activeSubmenu) {
      case 'Role Creation & Management':
        return <RoleCreationManagement />;
      case 'Permission-Based Access Control':
        return <PermissionBasedAccessControl />;
      case 'Custom Role Configuration':
        return <CustomRoleConfiguration />;
      case 'User Assignment':
        return <UserAssignment />;
      case 'Access Restrictions':
        return <AccessRestrictions />;
      case 'Activity Monitoring':
        return <ActivityMonitoring />;
      case 'Audit Logs':
        return <AuditLogs />;
      case 'Secure Authentication':
        return <SecureAuthentication />;
      case 'Role Editing & Deactivation':
        return <RoleEditingDeactivation />;
      case 'Common Admin Roles':
        return <CommonAdminRoles />;
      default:
        return <DefaultAdminRolesView 
          roles={roles}
          filtered={filtered}
          stats={stats}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          search={search}
          setSearch={setSearch}
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          isLoading={isLoading}
          error={error}
          onEdit={handleEditRole}
          onDelete={handleDeleteRole}
          onClone={handleCloneRole}
          onToggleStatus={handleToggleStatus}
          onCreate={() => setShowCreateModal(true)}
        />;
    }
  };

  if (isLoading && roles.length === 0) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

  return (
    <div>
      {/* Toast Notification */}
      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast({ show: false, message: '', type: 'success' })}
        />
      )}

      {/* Create Role Modal */}
      {showCreateModal && (
        <CreateRoleModal 
          onSave={handleCreateRole}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {/* Edit Role Modal */}
      {showEditModal && selectedRole && (
        <EditRoleModal 
          role={selectedRole}
          onSave={handleSaveEdit}
          onClose={() => {
            setShowEditModal(false);
            setSelectedRole(null);
          }}
        />
      )}

      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">👥</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Admin Roles & Access Management</h3>
            <p className="text-sm text-gray-500 mt-0.5">Create, configure and manage admin roles with permission-based access control</p>
            {activeSubmenu && (
              <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                Viewing: {activeSubmenu}
              </span>
            )}
          </div>
        </div>
      </div>

      {renderContent()}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        <FeatureCard 
          emoji="👥" 
          title="Role Creation & Management" 
          accentColor="bg-indigo-50" 
          points={['Create Super Admin, Manager, Support roles', 'Define custom roles with specific access', 'Clone existing roles for efficiency', 'Role deletion & archiving']}
        />
        <FeatureCard 
          emoji="🔐" 
          title="Permission-Based Access Control" 
          accentColor="bg-purple-50" 
          points={['Module-level access restrictions', 'Granular permission settings', 'View/Edit/Delete/Approve controls', 'Sensitive data access limits']}
        />
        <FeatureCard 
          emoji="👤" 
          title="User Assignment" 
          accentColor="bg-blue-50" 
          points={['Assign admin users to roles', 'Manage user responsibilities', 'Track role assignments', 'Revoke access when required']}
        />
        <FeatureCard 
          emoji="📊" 
          title="Activity Monitoring & Audit" 
          accentColor="bg-green-50" 
          points={['Login history tracking', 'Changes & approvals log', 'Complete audit trail', 'Security & transparency']}
        />
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

// Default view component
const DefaultAdminRolesView = ({ 
  roles, 
  filtered, 
  stats, 
  activeFilter, 
  setActiveFilter, 
  search, 
  setSearch, 
  selectedRole, 
  setSelectedRole,
  isLoading,
  error,
  onEdit,
  onDelete,
  onClone,
  onToggleStatus,
  onCreate
}) => {
  const permissionModules = [
    { module: 'Customer Management', permissions: ['View', 'Edit', 'Delete', 'Block'] },
    { module: 'Vendor Management', permissions: ['View', 'Edit', 'Verify', 'Approve', 'Deactivate'] },
    { module: 'Booking Management', permissions: ['View', 'Edit', 'Cancel', 'Reschedule'] },
    { module: 'Payments & Transactions', permissions: ['View', 'Process', 'Refund', 'Export'] },
    { module: 'Complaints & Support', permissions: ['View', 'Respond', 'Escalate', 'Resolve'] },
    { module: 'Reports & Analytics', permissions: ['View', 'Export', 'Schedule'] },
  ];

  const statCards = [
    { label: 'Total Roles', value: stats.total || 0, icon: '👥', color: 'border-blue-400', filter: 'All' },
    { label: 'Active Roles', value: stats.active || 0, icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Inactive Roles', value: stats.inactive || 0, icon: '⏸️', color: 'border-gray-400', filter: 'Inactive' },
    { label: 'Total Admin Users', value: stats.totalUsers || 0, icon: '👤', color: 'border-purple-400', filter: 'All' },
  ];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} onClick={() => s.filter && setActiveFilter(s.filter)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} ${s.filter ? 'cursor-pointer' : 'cursor-default'} transition-all duration-200 hover:shadow-md ${s.filter ? 'hover:-translate-y-0.5' : ''} ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-gray-800">{s.value}</p>
                {activeFilter === s.filter && s.filter && (
                  <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>
                )}
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
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                  <Icon d={ICONS.roles} size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-base">Admin Roles</h3>
                  <p className="text-xs text-gray-400">{filtered.length} roles configured</p>
                </div>
              </div>
              <button 
                onClick={onCreate} 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <span className="text-lg leading-none">+</span> Create New Role
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Icon d={ICONS.search} size={15} />
                </span>
                <input 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                  type="text" 
                  placeholder="Search roles..." 
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all" 
                />
              </div>
              {activeFilter !== 'All' && (
                <button 
                  onClick={() => setActiveFilter('All')} 
                  className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors whitespace-nowrap"
                >
                  ✕ Clear Filter
                </button>
              )}
            </div>
          </div>
          <div className="divide-y divide-gray-50 max-h-[500px] overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map(role => (
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
                      <div className="flex items-center gap-1 mt-1 justify-end">
                        <button 
                          onClick={(e) => { e.stopPropagation(); onEdit(role); }} 
                          className="text-blue-600 hover:text-blue-800 text-[10px] font-semibold"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onClone(role); }} 
                          className="text-green-600 hover:text-green-800 text-[10px] font-semibold"
                        >
                          Clone
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onToggleStatus(role.id); }} 
                          className={`${role.status === 'Active' ? 'text-orange-600' : 'text-green-600'} hover:opacity-80 text-[10px] font-semibold`}
                        >
                          {role.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); onDelete(role.id); }} 
                          className="text-red-600 hover:text-red-800 text-[10px] font-semibold"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-sm text-gray-400">No roles found matching your search</p>
                {search && (
                  <button 
                    onClick={() => setSearch('')} 
                    className="mt-2 text-xs text-red-600 hover:text-red-700"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 text-base flex items-center gap-2">
              <Icon d={ICONS.shield} size={16} /> Role Permissions
            </h3>
            {selectedRole ? (
              <p className="text-xs text-gray-500 mt-1">Configuring: <span className="font-semibold text-gray-700">{selectedRole.name}</span></p>
            ) : (
              <p className="text-xs text-gray-400 mt-1">Select a role to configure permissions</p>
            )}
          </div>
          {selectedRole ? (
            <div className="p-5 space-y-4 max-h-[500px] overflow-y-auto">
              {permissionModules.map((module, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-3 last:border-0">
                  <p className="text-xs font-bold text-gray-700 mb-2">{module.module}</p>
                  <div className="flex flex-wrap gap-2">
                    {module.permissions.map((perm, pIdx) => (
                      <label key={pIdx} className="flex items-center gap-1.5 cursor-pointer hover:bg-gray-50 px-1.5 py-0.5 rounded transition-colors">
                        <input 
                          type="checkbox" 
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                          defaultChecked={perm === 'View' || perm === 'Edit'} 
                        />
                        <span className="text-[11px] text-gray-600">{perm}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex gap-2 pt-3">
                <button className="flex-1 py-2 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors">
                  Save Changes
                </button>
                <button className="px-3 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                  Reset
                </button>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-4xl mb-3">🔐</div>
              <p className="text-sm text-gray-400">Select a role from the list to view and edit permissions</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};