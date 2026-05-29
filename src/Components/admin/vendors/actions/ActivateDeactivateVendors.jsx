import { useState } from 'react';
import { Icon } from '../../shared/Icon';
import { StatusBadge } from '../../shared/StatusBadge';
import { FeatureCard } from '../../shared/FeatureCard';
import { ICONS } from '../../../../constants/admin/icons';

export const ActivateDeactivateVendors = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const activateData = [
    { id: 'VND001', name: 'LensArt Studio', category: 'Photography', location: 'Mumbai', lastActive: '1 day ago', reason: '—', status: 'Active', bookings: 124, avatarBg: 'bg-gradient-to-br from-pink-400 to-rose-400' },
    { id: 'VND002', name: 'Spice Route Caterers', category: 'Catering', location: 'Delhi', lastActive: '3 days ago', reason: 'Incomplete Documents', status: 'Inactive', bookings: 44, avatarBg: 'bg-gradient-to-br from-orange-400 to-amber-400' },
    { id: 'VND003', name: 'Heritage Mahal', category: 'Wedding Halls', location: 'Jaipur', lastActive: '7 days ago', reason: 'Policy Violation', status: 'Suspended', bookings: 43, avatarBg: 'bg-gradient-to-br from-blue-400 to-indigo-400' },
    { id: 'VND004', name: 'Beat Makers DJ', category: 'Entertainment', location: 'Bangalore', lastActive: '2 days ago', reason: '—', status: 'Active', bookings: 134, avatarBg: 'bg-gradient-to-br from-violet-400 to-purple-400' },
    { id: 'VND005', name: 'Floral Dreams', category: 'Decorations', location: 'Chennai', lastActive: '14 days ago', reason: 'Low Performance', status: 'Inactive', bookings: 29, avatarBg: 'bg-gradient-to-br from-purple-400 to-pink-400' },
  ];
  
  const statCards = [
    { label: 'Active Vendors', value: '271', icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Inactive Vendors', value: '28', icon: '⏸️', color: 'border-gray-400', filter: 'Inactive' },
    { label: 'Suspended', value: '9', icon: '🚫', color: 'border-red-400', filter: 'Suspended' },
    { label: 'Pending Reactivation', value: '14', icon: '🔄', color: 'border-amber-400', filter: 'Pending Reactivation' },
  ];
  
  const filtered = activateData.filter(v => {
    const matchStatus = activeFilter === 'All' || v.status === activeFilter;
    const matchSearch = !search || 
      v.name.toLowerCase().includes(search.toLowerCase()) || 
      v.category.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });
  
  const statusColor = { 
    Active: 'bg-green-50 text-green-700 border-green-200', 
    Inactive: 'bg-gray-50 text-gray-500 border-gray-200', 
    Suspended: 'bg-red-50 text-red-700 border-red-200' 
  };
  
  const featureCards = [
    { emoji: '🔄', title: 'Status Control', accentColor: 'bg-green-50', points: ['Active: visible, receives bookings', 'Inactive: hidden from users', 'Suspended: restricted access', 'One-click toggle per vendor'] },
    { emoji: '⚡', title: 'Bulk Actions', accentColor: 'bg-blue-50', points: ['Activate multiple vendors at once', 'Bulk deactivation capability', 'Filter before bulk action', 'Efficient mass management'] },
    { emoji: '📋', title: 'Impact & History', accentColor: 'bg-amber-50', points: ['No new bookings when inactive', 'Existing bookings honoured', 'Full activation/deactivation log', 'Timestamps & admin details'] },
    { emoji: '🔔', title: 'Reactivation & Alerts', accentColor: 'bg-purple-50', points: ['Vendor reactivation requests', 'Issue resolution tracking', 'Status change notifications', 'Re-enable after compliance'] }
  ];
  
  return (
    <div>
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-slate-50 to-gray-100 border border-slate-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔄</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Activate / Deactivate Vendors</h3>
            <p className="text-sm text-gray-500 mt-0.5">Toggle vendor account status and manage their platform visibility</p>
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
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.toggle} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Vendor Status Control</h3>
                <p className="text-xs text-gray-400">{filtered.length} vendor{filtered.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `(filtered: ${activeFilter})` : 'total'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFilter !== 'All' && <button onClick={() => setActiveFilter('All')} className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100">✕ Clear Filter</button>}
              <button onClick={() => alert('Exporting...')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700">
                <Icon d={ICONS.download} size={13} />Export
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
                placeholder="Search by vendor name, category or location..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            {['All','Active','Inactive','Suspended'].map(f => (
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
                {['', 'Vendor ID', 'Business Name', 'Category', 'Location', 'Last Active', 'Deactivation Reason', 'Bookings', 'Status', 'Quick Toggle'].map(h => 
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={10} className="px-4 py-12 text-center text-sm text-gray-400">No vendors found for "{activeFilter}" filter.</td></tr>
              ) : (
                filtered.map(v => (
                  <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3"><input type="checkbox" className="rounded border-gray-300" /></td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{v.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${v.avatarBg} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>{v.name[0]}</div>
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{v.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-red-50 text-red-700">{v.category}</span></td>
                    <td className="px-4 py-3 text-xs text-gray-600">{v.location}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{v.lastActive}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{v.reason}</td>
                    <td className="px-4 py-3 text-xs font-bold text-gray-700 text-center">{v.bookings}</td>
                    <td className="px-4 py-3"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusColor[v.status]}`}>{v.status}</span></td>
                    <td className="px-4 py-3">
                      <div className={`w-10 h-5 rounded-full flex items-center cursor-pointer transition-colors ${v.status === 'Active' ? 'bg-green-500 justify-end' : 'bg-gray-300 justify-start'}`}>
                        <div className="w-4 h-4 bg-white rounded-full mx-0.5 shadow"></div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>
    </div>
  );
};