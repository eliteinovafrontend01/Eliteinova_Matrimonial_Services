// src/components/admin/vendors/categories/CateringPage.jsx
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
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600"><Icon d={ICONS.vendors} size={18} /></div>
            <div><h3 className="font-bold text-gray-800 text-base">{title}</h3><p className="text-xs text-gray-400">{count}</p></div>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg"><Icon d={ICONS.download} size={13} />Export</button>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon d={ICONS.search} size={15} /></span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, location..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50" />
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {['All', 'Active', 'Pending', 'Top Rated', 'Verified'].map(f => (
            <button key={f} onClick={() => onFilter(f)} className={`px-3 py-1.5 text-xs font-semibold rounded-xl ${activeFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600'}`}>{f}</button>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead><tr className="bg-gray-50">{['Vendor ID', 'Business Name', 'Cuisine Type', 'Location', 'Rating', 'Bookings', 'Status', 'Verified', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">{h}</th>)}</tr></thead>
          <tbody>
            {filteredVendors.map(v => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-xs font-mono text-gray-500">{v.id}</td>
                <td className="px-4 py-3"><div className="flex items-center gap-2"><div className={`w-7 h-7 rounded-lg ${v.avatarBg} flex items-center justify-center text-white text-[10px]`}>{v.name[0]}</div><span className="text-sm font-semibold">{v.name}</span></div></td>
                <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${v.tagColor}`}>{v.cuisine}</span></td>
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

export const CateringPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const vendors = [
    { id: 'CAT001', name: 'Royal Feast', cuisine: 'Multi-Cuisine Buffet', location: 'Delhi', rating: 4.8, bookings: 112, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-orange-400 to-amber-400', tagColor: 'bg-orange-50 text-orange-700' },
    { id: 'CAT002', name: 'Spice Garden', cuisine: 'South Indian Cuisine', location: 'Chennai', rating: 4.6, bookings: 78, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-yellow-400 to-orange-400', tagColor: 'bg-yellow-50 text-yellow-700' },
    { id: 'CAT003', name: "Nawab's Kitchen", cuisine: 'Mughlai & North Indian', location: 'Lucknow', rating: 4.5, bookings: 54, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-red-400 to-orange-400', tagColor: 'bg-red-50 text-red-700' },
    { id: 'CAT004', name: 'Continental Bites', cuisine: 'Continental & Fusion', location: 'Mumbai', rating: 4.3, bookings: 29, status: 'Pending', verified: false, avatarBg: 'bg-gradient-to-br from-amber-400 to-yellow-400', tagColor: 'bg-amber-50 text-amber-700' },
  ];

  const filteredVendors = vendors.filter(v => {
    if (activeFilter === 'Active') return v.status === 'Active';
    if (activeFilter === 'Pending') return v.status === 'Pending';
    if (activeFilter === 'Top Rated') return v.rating >= 4.5;
    if (activeFilter === 'Verified') return v.verified === true;
    return true;
  });

  const stats = [
    { label: 'Total Caterers', value: '54', icon: '🍽️', color: 'border-orange-400', filter: 'All' },
    { label: 'Active', value: '41', icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Pending Approval', value: '9', icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Hygiene Certified', value: '38', icon: '🛡️', color: 'border-blue-400', filter: 'Verified' },
  ];

  const featureCards = [
    { emoji: '🍱', title: 'Menu & Package Management', accentColor: 'bg-orange-50', points: ['Veg / non-veg menu options', 'Buffet or plate service tracking', 'Customizable meal plans', 'Special dietary options'] },
    { emoji: '👥', title: 'Pricing & Guest Capacity', accentColor: 'bg-amber-50', points: ['Monitor per-plate pricing', 'Min. guest requirements', 'Max serving capacity', 'Bulk order discount tracking'] },
    { emoji: '🛡️', title: 'Quality & Hygiene Compliance', accentColor: 'bg-green-50', points: ['FSSAI certification check', 'Hygiene audit records', 'Food safety compliance', 'Health inspection reports'] },
    { emoji: '📋', title: 'Vendor Approval & Booking', accentColor: 'bg-blue-50', points: ['Verify licenses & certifications', 'Approve/reject registrations', 'View catering bookings', 'Track special requirements'] },
  ];

  return (
    <div>
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200">
        <div className="flex items-center gap-4"><div className="text-4xl">🍽️</div><div><h3 className="text-lg font-bold text-gray-800">Catering</h3><p className="text-sm text-gray-500">South Indian, North Indian, Continental & Multi-Cuisine Wedding Caterers</p></div></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} onClick={() => setActiveFilter(s.filter)} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400' : ''}`}>
            <div className="flex justify-between"><div><p className="text-xs font-semibold text-gray-400 mb-1">{s.label}</p><p className="text-3xl font-bold text-gray-800">{s.value}</p>{activeFilter === s.filter && <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>}</div><div className="text-2xl">{s.icon}</div></div>
          </div>
        ))}
      </div>
      <VendorTable vendors={filteredVendors} title="All Catering Vendors" count={`${filteredVendors.length} vendors shown`} activeFilter={activeFilter} onFilter={setActiveFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">{featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}</div>
    </div>
  );
};