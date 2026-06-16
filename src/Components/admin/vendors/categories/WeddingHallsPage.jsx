// src/components/admin/vendors/categories/WeddingHallsPage.jsx
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
          <thead><tr className="bg-gray-50">{['Vendor ID', 'Venue Name', 'Venue Type', 'Location', 'Rating', 'Bookings', 'Status', 'Verified', 'Actions'].map(h => <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">{h}</th>)}</tr></thead>
          <tbody>
            {filteredVendors.map(v => (
              <tr key={v.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-xs font-mono text-gray-500">{v.id}</td>
                <td className="px-4 py-3"><div className="flex items-center gap-2"><div className={`w-7 h-7 rounded-lg ${v.avatarBg} flex items-center justify-center text-white text-[10px]`}>{v.name[0]}</div><span className="text-sm font-semibold">{v.name}</span></div></td>
                <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${v.tagColor}`}>{v.venueType}</span></td>
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

export const WeddingHallsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const vendors = [
    { id: 'HAL001', name: 'Grand Palace Banquets', venueType: 'Banquet Hall (1500 pax)', location: 'Mumbai', rating: 4.9, bookings: 89, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-blue-400 to-cyan-400', tagColor: 'bg-blue-50 text-blue-700' },
    { id: 'HAL002', name: 'Lakeview Convention', venueType: 'Outdoor + Indoor', location: 'Udaipur', rating: 4.8, bookings: 56, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-cyan-400 to-teal-400', tagColor: 'bg-cyan-50 text-cyan-700' },
    { id: 'HAL003', name: 'Heritage Mahal', venueType: 'Heritage Venue', location: 'Jaipur', rating: 4.7, bookings: 43, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-indigo-400 to-blue-400', tagColor: 'bg-indigo-50 text-indigo-700' },
    { id: 'HAL004', name: 'Serene Gardens', venueType: 'Garden / Outdoor', location: 'Pune', rating: 4.4, bookings: 27, status: 'Pending', verified: false, avatarBg: 'bg-gradient-to-br from-teal-400 to-green-400', tagColor: 'bg-teal-50 text-teal-700' },
  ];

  const filteredVendors = vendors.filter(v => {
    if (activeFilter === 'Active') return v.status === 'Active';
    if (activeFilter === 'Pending') return v.status === 'Pending';
    if (activeFilter === 'Top Rated') return v.rating >= 4.5;
    if (activeFilter === 'Verified') return v.verified === true;
    return true;
  });

  const stats = [
    { label: 'Total Venues', value: '87', icon: '🏛️', color: 'border-blue-400', filter: 'All' },
    { label: 'Active', value: '71', icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Pending Approval', value: '11', icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Premium Venues', value: '24', icon: '👑', color: 'border-purple-400', filter: 'Top Rated' },
  ];

  const featureCards = [
    { emoji: '🏟️', title: 'Capacity & Space Details', accentColor: 'bg-blue-50', points: ['Seating & floating capacity', 'Hall size & number of rooms', 'Parking & stage area info', 'Dining hall specifications'] },
    { emoji: '🏠', title: 'Amenities & Facilities', accentColor: 'bg-cyan-50', points: ['AC, power backup status', 'Decoration support available', 'Accommodation availability', 'Valet parking service'] },
    { emoji: '🖼️', title: 'Gallery & Pricing', accentColor: 'bg-indigo-50', points: ['Review venue images & videos', 'Per-day rental pricing', 'Package deals with services', 'Availability calendar view'] },
    { emoji: '📋', title: 'Approval & Booking Control', accentColor: 'bg-purple-50', points: ['Verify ownership documents', 'License & compliance check', 'Manage event bookings', 'Conflict detection alerts'] },
  ];

  return (
    <div>
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
        <div className="flex items-center gap-4"><div className="text-4xl">🏛️</div><div><h3 className="text-lg font-bold text-gray-800">Wedding Halls</h3><p className="text-sm text-gray-500">Banquet Halls, Convention Centers, Outdoor Venues & Resort Venues</p></div></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div key={i} onClick={() => setActiveFilter(s.filter)} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400' : ''}`}>
            <div className="flex justify-between"><div><p className="text-xs font-semibold text-gray-400 mb-1">{s.label}</p><p className="text-3xl font-bold text-gray-800">{s.value}</p>{activeFilter === s.filter && <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>}</div><div className="text-2xl">{s.icon}</div></div>
          </div>
        ))}
      </div>
      <VendorTable vendors={filteredVendors} title="All Wedding Halls" count={`${filteredVendors.length} venues shown`} activeFilter={activeFilter} onFilter={setActiveFilter} />
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">{featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}</div>
    </div>
  );
};