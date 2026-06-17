// src/components/admin/roles/AccessRestrictions.jsx
import { useState, useEffect, useMemo } from 'react';
import { Icon } from '../shared/Icon';
import { StatusBadge } from '../shared/StatusBadge';
import { ICONS } from '../../../constants/admin/icons';

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

export const AccessRestrictions = () => {
  const [restrictions, setRestrictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [hasChanges, setHasChanges] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const allRoles = ['Super Admin', 'Vendor Manager', 'Booking Manager', 'Support Executive', 'Finance Admin'];

  // Load restrictions data
  useEffect(() => {
    const loadRestrictions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        const mockRestrictions = [
          { id: 1, module: 'Financial Transactions', restricted: true, roles: ['Support Executive', 'Booking Manager'] },
          { id: 2, module: 'KYC Details', restricted: true, roles: ['Support Executive'] },
          { id: 3, module: 'Reports & Analytics', restricted: false, roles: [] },
          { id: 4, module: 'System Settings', restricted: true, roles: ['Support Executive', 'Vendor Manager', 'Booking Manager'] },
          { id: 5, module: 'User Management', restricted: true, roles: ['Support Executive', 'Vendor Manager', 'Booking Manager', 'Finance Admin'] },
          { id: 6, module: 'Payment Processing', restricted: true, roles: ['Support Executive', 'Booking Manager', 'Vendor Manager'] },
          { id: 7, module: 'Customer Data Export', restricted: false, roles: [] },
          { id: 8, module: 'Vendor Ratings & Reviews', restricted: false, roles: [] },
        ];
        setRestrictions(mockRestrictions);
      } catch (err) {
        setError('Failed to load access restrictions. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRestrictions();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const toggleRestriction = (moduleId, role) => {
    setRestrictions(prevRestrictions => 
      prevRestrictions.map(module => {
        if (module.id === moduleId) {
          const roles = module.restricted 
            ? module.roles.includes(role) 
              ? module.roles.filter(r => r !== role)
              : [...module.roles, role]
            : [...module.roles, role];
          const restricted = roles.length > 0;
          return { ...module, roles, restricted };
        }
        return module;
      })
    );
    setHasChanges(true);
  };

  const toggleModuleRestriction = (moduleId) => {
    setRestrictions(prevRestrictions =>
      prevRestrictions.map(module => {
        if (module.id === moduleId) {
          const restricted = !module.restricted;
          return { 
            ...module, 
            restricted,
            roles: restricted ? ['Support Executive', 'Booking Manager'] : []
          };
        }
        return module;
      })
    );
    setHasChanges(true);
  };

  const handleSaveRestrictions = () => {
    const restrictedCount = restrictions.filter(r => r.restricted).length;
    showToast(`Access restrictions saved successfully! ${restrictedCount} modules restricted.`, 'success');
    setHasChanges(false);
  };

  const handleResetRestrictions = () => {
    if (window.confirm('Reset all access restrictions to default settings?')) {
      const defaultRestrictions = [
        { id: 1, module: 'Financial Transactions', restricted: true, roles: ['Support Executive', 'Booking Manager'] },
        { id: 2, module: 'KYC Details', restricted: true, roles: ['Support Executive'] },
        { id: 3, module: 'Reports & Analytics', restricted: false, roles: [] },
        { id: 4, module: 'System Settings', restricted: true, roles: ['Support Executive', 'Vendor Manager', 'Booking Manager'] },
        { id: 5, module: 'User Management', restricted: true, roles: ['Support Executive', 'Vendor Manager', 'Booking Manager', 'Finance Admin'] },
        { id: 6, module: 'Payment Processing', restricted: true, roles: ['Support Executive', 'Booking Manager', 'Vendor Manager'] },
        { id: 7, module: 'Customer Data Export', restricted: false, roles: [] },
        { id: 8, module: 'Vendor Ratings & Reviews', restricted: false, roles: [] },
      ];
      setRestrictions(defaultRestrictions);
      setHasChanges(false);
      showToast('Restrictions reset to default!', 'success');
    }
  };

  // Calculate statistics
  const stats = useMemo(() => {
    const total = restrictions.length;
    const restricted = restrictions.filter(r => r.restricted).length;
    const open = total - restricted;
    
    const roleRestrictions = {};
    allRoles.forEach(role => {
      roleRestrictions[role] = restrictions.filter(r => r.roles.includes(role)).length;
    });
    
    return { total, restricted, open, roleRestrictions };
  }, [restrictions, allRoles]);

  // Filter restrictions
  const filteredRestrictions = useMemo(() => {
    if (!searchTerm) return restrictions;
    return restrictions.filter(module => 
      module.module.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.roles.some(role => role.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [restrictions, searchTerm]);

  // Stat Cards
  const statCards = [
    { label: 'Total Modules', value: stats.total || 0, icon: '📋', color: 'border-blue-400', filter: 'All' },
    { label: 'Restricted', value: stats.restricted || 0, icon: '🔒', color: 'border-red-400', filter: 'Restricted' },
    { label: 'Open Access', value: stats.open || 0, icon: '🔓', color: 'border-green-400', filter: 'Open' },
    { label: 'Restriction Rate', value: stats.total > 0 ? `${Math.round((stats.restricted / stats.total) * 100)}%` : '0%', icon: '📊', color: 'border-purple-400', filter: null },
  ];

  const getRoleIcon = (role) => {
    const icons = {
      'Super Admin': '👑',
      'Vendor Manager': '🏢',
      'Booking Manager': '📅',
      'Support Executive': '💬',
      'Finance Admin': '💰'
    };
    return icons[role] || '👤';
  };

  const getRoleColor = (role) => {
    const colors = {
      'Super Admin': 'bg-purple-100 text-purple-700 border-purple-200',
      'Vendor Manager': 'bg-blue-100 text-blue-700 border-blue-200',
      'Booking Manager': 'bg-green-100 text-green-700 border-green-200',
      'Support Executive': 'bg-orange-100 text-orange-700 border-orange-200',
      'Finance Admin': 'bg-red-100 text-red-700 border-red-200'
    };
    return colors[role] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStatusColor = (restricted) => {
    return restricted ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200';
  };

  if (isLoading && restrictions.length === 0) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={() => window.location.reload()} />;

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

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Access Restrictions</h2>
            <p className="text-sm text-gray-500 mt-1">Limit access to sensitive data such as financial transactions, KYC details, and reports</p>
          </div>
          {hasChanges && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full">
              <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
              Unsaved Changes
            </span>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {statCards.map((s, i) => (
            <div key={i} 
              onClick={() => s.filter && setActiveFilter(s.filter)}
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

        {/* Role-wise Restriction Summary */}
        <div className="mb-6 p-4 bg-gray-50 rounded-xl">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Restrictions by Role</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {allRoles.map(role => (
              <div key={role} className="bg-white rounded-lg p-3 text-center border border-gray-200">
                <div className="text-2xl mb-1">{getRoleIcon(role)}</div>
                <p className="text-xs font-semibold text-gray-700">{role}</p>
                <p className="text-lg font-bold text-gray-800">{stats.roleRestrictions[role] || 0}</p>
                <p className="text-[10px] text-gray-400">restricted modules</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon d={ICONS.search} size={15} />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search modules or roles..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        {/* Restrictions List */}
        <div className="space-y-4">
          {filteredRestrictions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🔍</div>
              <p className="text-sm text-gray-400">No modules or roles found matching your search</p>
            </div>
          ) : (
            filteredRestrictions.map(module => (
              <div key={module.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h4 className="font-semibold text-gray-800">{module.module}</h4>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(module.restricted)}`}>
                      {module.restricted ? '🔒 Restricted' : '🔓 Open Access'}
                    </span>
                    <button
                      onClick={() => toggleModuleRestriction(module.id)}
                      className={`text-xs font-semibold px-2 py-1 rounded-lg transition-colors ${
                        module.restricted 
                          ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      {module.restricted ? 'Remove Restriction' : 'Add Restriction'}
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {module.roles.length} role{module.roles.length !== 1 ? 's' : ''} restricted
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {allRoles.map(role => {
                    const isChecked = module.restricted && module.roles.includes(role);
                    const isDisabled = role === 'Super Admin';
                    
                    return (
                      <label 
                        key={role} 
                        className={`flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-lg border transition-all ${
                          isChecked 
                            ? `${getRoleColor(role)} border-opacity-50` 
                            : isDisabled
                            ? 'bg-gray-50 text-gray-400 border-gray-200 opacity-60 cursor-not-allowed'
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleRestriction(module.id, role)}
                          disabled={isDisabled}
                          className="rounded border-gray-300 text-red-600 focus:ring-red-500 disabled:opacity-50"
                        />
                        <span className="flex items-center gap-1 text-sm font-medium">
                          <span>{getRoleIcon(role)}</span>
                          {role}
                          {isDisabled && <span className="text-[10px] text-gray-400 ml-1">(Always Allowed)</span>}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
          <button 
            onClick={handleSaveRestrictions}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <Icon d={ICONS.save} size={16} />
            Save Restrictions
          </button>
          <button 
            onClick={handleResetRestrictions}
            className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Icon d={ICONS.reset} size={16} />
            Reset to Default
          </button>
          <button 
            onClick={() => {
              const allRestricted = restrictions.every(r => r.restricted);
              if (allRestricted) {
                showToast('All modules are already restricted!', 'info');
                return;
              }
              setRestrictions(prev => 
                prev.map(module => ({
                  ...module,
                  restricted: true,
                  roles: ['Support Executive', 'Booking Manager', 'Vendor Manager']
                }))
              );
              setHasChanges(true);
              showToast('All modules restricted successfully!', 'success');
            }}
            className="px-6 py-2 border border-red-300 text-red-700 font-semibold rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
          >
            <Icon d={ICONS.lock} size={16} />
            Restrict All
          </button>
          <button 
            onClick={() => {
              const allOpen = restrictions.every(r => !r.restricted);
              if (allOpen) {
                showToast('All modules already have open access!', 'info');
                return;
              }
              setRestrictions(prev => 
                prev.map(module => ({
                  ...module,
                  restricted: false,
                  roles: []
                }))
              );
              setHasChanges(true);
              showToast('All modules set to open access!', 'success');
            }}
            className="px-6 py-2 border border-green-300 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors flex items-center gap-2"
          >
            <Icon d={ICONS.unlock} size={16} />
            Open All
          </button>
        </div>
      </div>

      {/* Important Note */}
      <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
        <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Note</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-yellow-700">
              <strong>Super Admin</strong> always has full access to all modules. Restrictions apply to other roles only.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-sm text-yellow-700">🔒</span>
            <div>
              <p className="text-sm text-yellow-700">
                <strong>Best Practice:</strong> Restrict sensitive modules like Financial Transactions, KYC Details, and User Management to only essential roles.
              </p>
            </div>
          </div>
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
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};