import { useState } from 'react';
import { Icon } from '../../shared/Icon';
import { ICONS } from '../../../../constants/admin/icons';

export const ActionsPage = ({ onSelect }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const actions = [
    { 
      label: 'Approve / Reject Vendor Registration', 
      icon: '📝', 
      gradient: 'from-amber-50 to-orange-50 border-amber-200', 
      iconBg: 'bg-amber-100 text-amber-700', 
      desc: 'Review incoming vendor registration requests, validate submitted documents, and approve or reject applications with proper reasons.', 
      points: ['Registration request review', 'Document verification checklist', 'Approval / rejection actions', 'Automated notification system'],
      status: 'Pending',
      count: 21
    },
    { 
      label: 'Verify Business Details', 
      icon: '✅', 
      gradient: 'from-green-50 to-emerald-50 border-green-200', 
      iconBg: 'bg-green-100 text-green-700', 
      desc: 'Review and verify complete vendor profiles including documents, KYC checks, and service quality assessment before going live.', 
      points: ['Full profile review & validation', 'KYC & identity verification', 'Portfolio quality assessment', 'Audit logs & status tracking'],
      status: 'In Progress',
      count: 34
    },
    { 
      label: 'Manage Vendor Profiles', 
      icon: '⚙️', 
      gradient: 'from-blue-50 to-indigo-50 border-blue-200', 
      iconBg: 'bg-blue-100 text-blue-700', 
      desc: 'Edit, update and control all vendor profile information including services, pricing, availability, and portfolio content.', 
      points: ['Edit services & pricing', 'Portfolio management', 'Availability control', 'Performance & audit logs'],
      status: 'Active',
      count: 271
    },
    { 
      label: 'Activate / Deactivate Vendors', 
      icon: '🔄', 
      gradient: 'from-purple-50 to-violet-50 border-purple-200', 
      iconBg: 'bg-purple-100 text-purple-700', 
      desc: 'Toggle vendor account status between Active, Inactive, and Suspended. Supports bulk actions for efficient management.', 
      points: ['One-click status toggle', 'Bulk activate / deactivate', 'Reason-based deactivation', 'Status change notifications'],
      status: 'Active',
      count: 9
    },
  ];
  
  const statCards = [
    { label: 'Pending Registration', value: '21', icon: '📝', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Profiles Under Review', value: '34', icon: '🔍', color: 'border-blue-400', filter: 'In Progress' },
    { label: 'Active Vendors', value: '271', icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Suspended Accounts', value: '9', icon: '🚫', color: 'border-red-400', filter: 'Suspended' },
  ];
  
  const filteredActions = actions.filter(a => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Pending') return a.status === 'Pending';
    if (activeFilter === 'In Progress') return a.status === 'In Progress';
    if (activeFilter === 'Active') return a.status === 'Active';
    if (activeFilter === 'Suspended') return a.label === 'Activate / Deactivate Vendors';
    return true;
  });
  
  const displayActions = search ? actions.filter(a => 
    a.label.toLowerCase().includes(search.toLowerCase()) || 
    a.desc.toLowerCase().includes(search.toLowerCase())
  ) : filteredActions;
  
  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-slate-50 to-gray-100 border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">⚙️</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Vendor Actions</h3>
            <p className="text-sm text-gray-500 mt-0.5">Manage vendor registrations, profiles, and account status</p>
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
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon d={ICONS.search} size={15} />
            </span>
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              type="text" 
              placeholder="Search by action name or description..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          {['All', 'Pending', 'In Progress', 'Active', 'Suspended'].map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} 
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {f}
            </button>
          ))}
        </div>
        
        {activeFilter !== 'All' && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-gray-500">Filtered by:</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 text-xs font-semibold rounded-full">
              {activeFilter === 'Pending' ? 'Pending Registration' : 
               activeFilter === 'In Progress' ? 'Profiles Under Review' :
               activeFilter === 'Active' ? 'Active Vendors' :
               activeFilter === 'Suspended' ? 'Suspended Accounts' : activeFilter}
              <button onClick={() => setActiveFilter('All')} className="ml-1 hover:text-red-900">✕</button>
            </span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {displayActions.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-400">No actions found for "{search || activeFilter}" filter.</div>
        ) : (
          displayActions.map((item, i) => (
            <div key={i} onClick={() => onSelect(item.label)} 
              className={`bg-gradient-to-br ${item.gradient} border rounded-2xl p-5 cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${item.iconBg}`}>{item.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm leading-tight">{item.label}</h4>
                  {activeFilter !== 'All' && (
                    <p className="text-[10px] font-semibold mt-1" style={{ color: activeFilter === 'Pending' ? '#d97706' : activeFilter === 'In Progress' ? '#3b82f6' : activeFilter === 'Active' ? '#10b981' : '#ef4444' }}>
                      {item.count} {activeFilter === 'Pending' ? 'pending' : activeFilter === 'In Progress' ? 'under review' : activeFilter === 'Active' ? 'active' : 'suspended'}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">{item.desc}</p>
              <ul className="space-y-1.5">
                {item.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0"></span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-1 text-red-600 text-xs font-bold">
                <span>Open Section →</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};