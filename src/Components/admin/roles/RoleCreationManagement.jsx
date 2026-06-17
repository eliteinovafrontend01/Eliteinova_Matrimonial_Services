// src/Components/admin/roles/RoleCreationManagement.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { StatusBadge } from '../shared/StatusBadge';
import { ICONS } from '../../../constants/admin/icons';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
  </div>
);

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
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-orange-500'
      } text-white flex items-center gap-3 min-w-[280px]`}>
        <span>{message}</span>
        <button onClick={onClose} className="text-white hover:text-gray-200 ml-auto">
          ✕
        </button>
      </div>
    </div>
  );
};

// Edit Role Modal
const EditRoleModal = ({ role, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: role?.name || '',
    description: role?.description || '',
    status: role?.status || 'Active'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(role.id, formData);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Edit Role</h3>
          <p className="text-xs text-gray-500 mt-1">Modify role details</p>
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
              rows="3"
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

// Create Role Modal
const CreateRoleModal = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    description: '', 
    status: 'Active' 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave({
        ...formData,
        id: Date.now(),
        users: 0,
        created: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-800">Create New Role</h3>
          <p className="text-xs text-gray-500 mt-1">Configure a new admin role</p>
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
              rows="3"
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

export const RoleCreationManagement = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  
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
          { id: 1, name: 'Super Admin', users: 2, status: 'Active', created: '15 Jan 2024', description: 'Complete system access with all privileges' },
          { id: 2, name: 'Vendor Manager', users: 4, status: 'Active', created: '20 Feb 2024', description: 'Manage vendor onboarding, verification, and profiles' },
          { id: 3, name: 'Booking Manager', users: 6, status: 'Active', created: '10 Mar 2024', description: 'Handle bookings, scheduling, and vendor assignments' },
          { id: 4, name: 'Support Executive', users: 8, status: 'Active', created: '5 Mar 2024', description: 'Manage customer queries, complaints, and disputes' },
          { id: 5, name: 'Finance Admin', users: 3, status: 'Active', created: '12 Apr 2024', description: 'Handle payments, transactions, refunds, and reports' },
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

  // Filter roles based on search and filter
  const filteredRoles = useMemo(() => {
    try {
      return roles.filter(role => {
        const matchStatus = activeFilter === 'All' || role.status === activeFilter;
        const matchSearch = !search || 
          role.name.toLowerCase().includes(search.toLowerCase()) || 
          role.description.toLowerCase().includes(search.toLowerCase());
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
    showToast(`Role "${updatedData.name}" updated successfully!`, 'success');
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role? This action cannot be undone.')) {
      const roleToDelete = roles.find(r => r.id === roleId);
      setRoles(prevRoles => prevRoles.filter(role => role.id !== roleId));
      if (selectedRole?.id === roleId) {
        setSelectedRole(null);
      }
      showToast(`Role "${roleToDelete?.name}" deleted successfully!`, 'success');
    }
  };

  const handleCloneRole = (role) => {
    const clonedRole = {
      ...role,
      id: Date.now(),
      name: `${role.name} (Clone)`,
      users: 0,
      created: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setRoles(prev => [...prev, clonedRole]);
    showToast(`Role "${clonedRole.name}" cloned successfully!`, 'success');
  };

  const handleToggleStatus = (roleId) => {
    setRoles(prevRoles => 
      prevRoles.map(role => 
        role.id === roleId 
          ? { ...role, status: role.status === 'Active' ? 'Inactive' : 'Active' }
          : role
      )
    );
    showToast('Role status updated successfully!', 'success');
  };

  // Stat cards
  const statCards = [
    { label: 'Total Roles', value: stats.total || 0, icon: '👥', color: 'border-blue-400', filter: 'All' },
    { label: 'Active Roles', value: stats.active || 0, icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Inactive Roles', value: stats.inactive || 0, icon: '⏸️', color: 'border-gray-400', filter: 'Inactive' },
    { label: 'Total Users', value: stats.totalUsers || 0, icon: '👤', color: 'border-purple-400', filter: 'All' },
  ];

  if (isLoading && roles.length === 0) return <LoadingSpinner />;
  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
      <div className="text-red-600 text-lg font-semibold mb-2">⚠️ Error</div>
      <div className="text-red-500 mb-4">{error}</div>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
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

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
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

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {statCards.map((s, i) => (
            <div key={i} 
              onClick={() => s.filter && setActiveFilter(s.filter)}
              className={`bg-white rounded-xl p-4 shadow-sm border-l-4 ${s.color} ${s.filter ? 'cursor-pointer' : 'cursor-default'} transition-all duration-200 hover:shadow-md ${s.filter ? 'hover:-translate-y-0.5' : ''} ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                  {activeFilter === s.filter && s.filter && (
                    <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>
                  )}
                </div>
                <div className="text-2xl">{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="flex-1 min-w-[200px] relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon d={ICONS.search} size={15} />
            </span>
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              type="text" 
              placeholder="Search roles by name or description..." 
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
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {filteredRoles.length} role{filteredRoles.length !== 1 ? 's' : ''} found
          </span>
        </div>

        {/* Roles Table */}
        <div className="overflow-x-auto">
          {filteredRoles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm text-gray-400">No roles found matching your criteria</p>
              {(search || activeFilter !== 'All') && (
                <button 
                  onClick={() => {
                    setSearch('');
                    setActiveFilter('All');
                  }} 
                  className="mt-2 text-xs text-red-600 hover:text-red-700"
                >
                  Clear all filters
                </button>
              )}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Role Name</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Description</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Users</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Created</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map(role => (
                  <tr key={role.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-gray-800">{role.name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">{role.description}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{role.users}</td>
                    <td className="py-3 px-4"><StatusBadge status={role.status} /></td>
                    <td className="py-3 px-4 text-sm text-gray-500">{role.created}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button 
                          onClick={() => handleEditRole(role)}
                          className="text-blue-600 hover:text-blue-800 text-xs font-semibold px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleToggleStatus(role.id)}
                          className={`${role.status === 'Active' ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'} text-xs font-semibold px-2 py-1 rounded hover:bg-gray-50 transition-colors`}
                        >
                          {role.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                        <button 
                          onClick={() => handleCloneRole(role)}
                          className="text-green-600 hover:text-green-800 text-xs font-semibold px-2 py-1 rounded hover:bg-green-50 transition-colors"
                        >
                          Clone
                        </button>
                        <button 
                          onClick={() => handleDeleteRole(role.id)}
                          className="text-red-600 hover:text-red-800 text-xs font-semibold px-2 py-1 rounded hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer with role count */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
          <p className="text-xs text-gray-400">
            Showing {filteredRoles.length} of {roles.length} roles
          </p>
          {roles.length > 0 && (
            <p className="text-xs text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          )}
        </div>
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