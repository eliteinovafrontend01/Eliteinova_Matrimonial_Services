import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { StatusBadge } from '../shared/StatusBadge';
import { FeatureCard } from '../shared/FeatureCard';
import { sampleCustomers } from '../../../data/admin/customers';
import { ICONS } from '../../../constants/admin/icons';

export const CustomerManagementPage = ({ onSelect }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const statCards = [
    { label: 'Total Registered', value: '4,821', icon: '👥', color: 'border-blue-400', filter: 'All' },
    { label: 'Active Users', value: '4,102', icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Pending Verification', value: '384', icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Blocked Accounts', value: '335', icon: '🚫', color: 'border-red-400', filter: 'Blocked' },
  ];
  
  const filtered = sampleCustomers.filter(c => {
    const matchStatus = activeFilter === 'All' || c.status === activeFilter;
    const matchSearch = !search || 
      c.name.toLowerCase().includes(search.toLowerCase()) || 
      c.email.toLowerCase().includes(search.toLowerCase()) || 
      c.location.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });
  
  const featureCards = [
    { emoji: '🔍', title: 'Advanced Search & Filters', accentColor: 'bg-blue-50', points: ['Filter by name, mobile, email', 'Filter by location & date range', 'Filter by account status', 'Quick keyword search'] },
    { emoji: '👤', title: 'Profile Access', accentColor: 'bg-purple-50', points: ['View personal info & preferences', 'Access full booking history', 'View activity & audit logs', 'Communication records'] },
    { emoji: '🔒', title: 'Account Status Management', accentColor: 'bg-green-50', points: ['Activate or deactivate accounts', 'Block suspicious users', 'Policy-based enforcement', 'Reinstatement workflows'] },
    { emoji: '📤', title: 'Export Data', accentColor: 'bg-amber-50', points: ['Download as CSV or Excel', 'Filter before export', 'Scheduled report exports', 'Analytics-ready format'] }
  ];
  
  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">👥</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Customer Management</h3>
            <p className="text-sm text-gray-500 mt-0.5">Manage all registered customers, bookings, profiles and support issues</p>
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
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.customers} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">All Registered Customers</h3>
                <p className="text-xs text-gray-400">{filtered.length} customer{filtered.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `(filtered: ${activeFilter})` : 'total'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFilter !== 'All' && <button onClick={() => setActiveFilter('All')} className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">✕ Clear Filter</button>}
              <button onClick={() => alert('Exporting CSV...')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors">
                <Icon d={ICONS.download} size={13} />Export CSV
              </button>
            </div>
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
                placeholder="Search by name, email, phone or location..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            {['All','Active','Pending','Blocked','Inactive'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} 
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Customer ID','Name','Contact','Location','Registered','Status','Verified','Bookings','Actions'].map(h => 
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center text-sm text-gray-400">No customers found for this filter.</td>
                </tr>
              ) : (
                filtered.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{c.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                          {c.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-gray-600">{c.email}</div>
                      <div className="text-xs text-gray-400">{c.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{c.location}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{c.registered}</td>
                    <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                    <td className="px-4 py-3">
                      {c.verified ? 
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">✓ Verified</span> : 
                        <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">Unverified</span>
                      }
                    </td>
                    <td className="px-4 py-3 text-xs font-bold text-gray-700 text-center">{c.bookings}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => onSelect(c.name)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors">
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        <button onClick={() => alert(`Editing ${c.name}`)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors">
                          <Icon d={ICONS.edit} size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>
    </div>
  );
};