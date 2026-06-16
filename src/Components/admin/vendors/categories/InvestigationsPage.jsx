// src/components/admin/vendors/categories/InvestigationsPage.jsx
import { useState } from 'react';
import { Icon } from '../../shared/Icon';
import { StatusBadge } from '../../shared/StatusBadge';
import { FeatureCard } from '../../shared/FeatureCard';
import { ICONS } from '../../../../constants/admin/icons';

const VendorTable = ({ vendors, title, count, activeFilter = 'All', onFilter }) => {
  const [search, setSearch] = useState('');
  
  const filteredVendors = vendors.filter(v => {
    let matchStatus = true;
    if (activeFilter === 'Active') matchStatus = v.status === 'Active';
    else if (activeFilter === 'Pending') matchStatus = v.status === 'Pending';
    else if (activeFilter === 'Top Rated') matchStatus = v.rating >= 4.5;
    else if (activeFilter === 'Verified') matchStatus = v.verified === true;
    
    const matchSearch = !search || v.name?.toLowerCase().includes(search.toLowerCase()) || v.location?.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600"><Icon d={ICONS.vendors} size={18} /></div><div><h3 className="font-bold text-gray-800 text-base">{title}</h3><p className="text-xs text-gray-400">{count}</p></div></div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg"><Icon d={ICONS.download} size={13} />Export</button>
        </div>
        <div className="flex items-center gap-3 mb-4"><div className="flex-1 relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon d={ICONS.search} size={15} /></span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50" /></div></div>
        <div className="flex items-center gap-2 flex-wrap">{['All', 'Active', 'Pending', 'Top Rated', 'Verified'].map(f => (<button key={f} onClick={() => onFilter(f)} className={`px-3 py-1.5 text-xs font-semibold rounded-xl ${activeFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600'}`}>{f}</button>))}</div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr className="bg-gray-50">{['Agency ID', 'Agency Name', 'Service Type', 'Location', 'Rating', 'Cases', 'Status', 'Verified', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">{h}</th>)}</tr></thead>
          <tbody>
            {filteredVendors.map(v => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-xs font-mono text-gray-500">{v.id}</td>
                <td className="px-4 py-3"><div className="flex items-center gap-2"><div className={`w-7 h-7 rounded-lg ${v.avatarBg} flex items-center justify-center text-white text-[10px]`}>{v.name[0]}</div><span className="text-sm font-semibold">{v.name}</span></div></td>
                <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${v.tagColor}`}>{v.serviceType}</span></td>
                <td className="px-4 py-3 text-xs text-gray-600">{v.location}</td>
                <td className="px-4 py-3"><div className="flex items-center gap-1"><span className="text-amber-400 text-sm">★</span><span className="text-xs font-bold">{v.rating}</span></div></td>
                <td className="px-4 py-3 text-xs font-bold text-center">{v.bookings}</td>
                <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                <td className="px-4 py-3">{v.verified ? <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">✅ Verified</span> : <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">Pending</span>}</td>
                <td className="px-4 py-3"><div className="flex gap-1.5"><button className="p-1.5 rounded-lg hover:bg-blue-50"><Icon d={ICONS.eye} size={14} /></button><button className="p-1.5 rounded-lg hover:bg-amber-50"><Icon d={ICONS.edit} size={14} /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const InvestigationsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const vendors = [
    { id: 'INQ001', name: 'TruthGuard Detectives', serviceType: 'Full Background Verification', location: 'Mumbai', rating: 4.9, bookings: 87, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-slate-500 to-gray-600', tagColor: 'bg-slate-50 text-slate-700' },
    { id: 'INQ002', name: 'Shield Investigations', serviceType: 'Employment & Income Check', location: 'Delhi', rating: 4.7, bookings: 64, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-gray-500 to-slate-500', tagColor: 'bg-gray-100 text-gray-700' },
    { id: 'INQ003', name: 'Family Verify Bureau', serviceType: 'Family Background Checks', location: 'Chennai', rating: 4.6, bookings: 52, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-zinc-500 to-gray-500', tagColor: 'bg-zinc-50 text-zinc-700' },
    { id: 'INQ004', name: 'SafeMatch Inquiry', serviceType: 'Lifestyle & Social Assessment', location: 'Bangalore', rating: 4.5, bookings: 38, status: 'Pending', verified: false, avatarBg: 'bg-gradient-to-br from-neutral-500 to-slate-500', tagColor: 'bg-neutral-100 text-neutral-700' },
  ];

  const filteredVendors = vendors.filter(v => {
    if (activeFilter === 'Active') return v.status === 'Active';
    if (activeFilter === 'Pending') return v.status === 'Pending';
    if (activeFilter === 'Top Rated') return v.rating >= 4.5;
    if (activeFilter === 'Verified') return v.verified === true;
    return true;
  });

  const stats = [
    { label: 'Registered Agencies', value: '18', icon: '🔍', color: 'border-slate-400', filter: 'All' },
    { label: 'Active', value: '14', icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Cases In Progress', value: '23', icon: '🔄', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Completed Cases', value: '312', icon: '📋', color: 'border-blue-400', filter: 'Top Rated' },
  ];

  const featureCards = [
    { emoji: '🗂️', title: 'Service Categories', accentColor: 'bg-slate-50', points: ['Personal background verification', 'Employment & income check', 'Family background checks', 'Lifestyle & social behaviour assessment'] },
    { emoji: '🔒', title: 'Confidential Case Handling', accentColor: 'bg-gray-100', points: ['Secure report access controls', 'Restricted data sharing', 'Encrypted case files', 'Privacy-first procedures'] },
    { emoji: '📋', title: 'Case Status Tracking', accentColor: 'bg-zinc-50', points: ['Requested → In Progress → Done', 'Admin review before delivery', 'Real-time status updates', 'Case closure documentation'] },
    { emoji: '⚖️', title: 'Legal & Privacy Compliance', accentColor: 'bg-neutral-100', points: ['Legal registration verification', 'User consent confirmation', 'Data protection law compliance', 'Agency credibility & license audit'] },
  ];

  return (
    <div>
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200">
        <div className="flex items-center gap-4"><div className="text-4xl">🔍</div><div><h3 className="text-lg font-bold text-gray-800">Pre Matrimonial Investigations</h3><p className="text-sm text-gray-500">Background Checks, Employment Verification, Family Checks & Pre-Matrimonial Investigations</p></div></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} onClick={() => setActiveFilter(s.filter)} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400' : ''}`}>
            <div className="flex justify-between"><div><p className="text-xs font-semibold text-gray-400 mb-1">{s.label}</p><p className="text-3xl font-bold text-gray-800">{s.value}</p>{activeFilter === s.filter && <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>}</div><div className="text-2xl">{s.icon}</div></div>
          </div>
        ))}
      </div>
      <VendorTable vendors={filteredVendors} title="All Investigation Agencies" count={`${filteredVendors.length} agencies shown`} activeFilter={activeFilter} onFilter={setActiveFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">{featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}</div>
    </div>
  );
};