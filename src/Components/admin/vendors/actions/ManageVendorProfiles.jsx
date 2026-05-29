import { useState } from 'react';
import { Icon } from '../../shared/Icon';
import { StatusBadge } from '../../shared/StatusBadge';
import { FeatureCard } from '../../shared/FeatureCard';
import { manageProfileData } from '../../../../data/admin/vendors';
import { ICONS } from '../../../../constants/admin/icons';

export const ManageVendorProfiles = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const statCards = [
    { label: 'Profiles Updated Today', value: '23', icon: '✏️', color: 'border-blue-400', filter: 'All' },
    { label: 'Active Vendors', value: '271', icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Services Listed', value: '1,204', icon: '🗂️', color: 'border-purple-400', filter: 'All' },
    { label: 'Pending Doc Updates', value: '18', icon: '📋', color: 'border-amber-400', filter: 'Pending' },
  ];
  
  const filtered = manageProfileData.filter(v => {
    const matchStatus = activeFilter === 'All' || v.status === activeFilter;
    const matchSearch = !search || 
      v.name.toLowerCase().includes(search.toLowerCase()) || 
      v.category.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });
  
  const featureCards = [
    { emoji: '✏️', title: 'Edit & Update Profile', accentColor: 'bg-blue-50', points: ['Modify services offered', 'Update pricing & packages', 'Edit business details & contact', 'Change service area & location'] },
    { emoji: '🖼️', title: 'Portfolio Management', accentColor: 'bg-purple-50', points: ['Add/update portfolio images', 'Upload showcase videos', 'Remove outdated content', 'Maintain quality presentation'] },
    { emoji: '📅', title: 'Availability & Service Control', accentColor: 'bg-green-50', points: ['Enable or disable services', 'Update availability schedules', 'Manage concurrent bookings', 'Calendar integration control'] },
    { emoji: '📊', title: 'Performance & Audit Logs', accentColor: 'bg-amber-50', points: ['Track ratings & reviews', 'Monitor completed bookings', 'Maintain admin notes & logs', 'Profile update audit trail'] }
  ];
  
  return (
    <div>
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">⚙️</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Manage Vendor Profiles</h3>
            <p className="text-sm text-gray-500 mt-0.5">Edit, update and control all vendor profile information and settings</p>
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
                <Icon d={ICONS.edit} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">All Vendor Profiles</h3>
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
                placeholder="Search by vendor name, category or status..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            {['All','Active','Inactive','Pending'].map(f => (
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
                {['Vendor ID', 'Business Name', 'Category', 'Services', 'Last Updated', 'Rating', 'Bookings', 'Status', 'Verified', 'Actions'].map(h => 
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
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{v.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${v.avatarBg} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>{v.name[0]}</div>
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{v.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-red-50 text-red-700">{v.category}</span></td>
                    <td className="px-4 py-3 text-xs font-bold text-center text-blue-600">{v.services}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{v.lastUpdated}</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-1"><span className="text-amber-400 text-sm">★</span><span className="text-xs font-bold text-gray-700">{v.rating}</span></div></td>
                    <td className="px-4 py-3 text-xs font-bold text-gray-700 text-center">{v.bookings}</td>
                    <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                    <td className="px-4 py-3">{v.verified ? <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">✅ Verified</span> : <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">Pending</span>}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="View"><Icon d={ICONS.eye} size={14} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors" title="Edit"><Icon d={ICONS.edit} size={14} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors" title="Verify"><Icon d={ICONS.shield} size={14} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Deactivate"><Icon d={ICONS.ban} size={14} /></button>
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