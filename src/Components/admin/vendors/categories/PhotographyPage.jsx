// src/components/admin/vendors/categories/PhotographyPage.jsx
import { useState } from 'react';
import { Icon } from '../../shared/Icon';
import { StatusBadge } from '../../shared/StatusBadge';
import { FeatureCard } from '../../shared/FeatureCard';
import { ICONS } from '../../../../constants/admin/icons';

// Vendor Table Component
const VendorTable = ({ vendors, title, count, activeFilter = 'All', onFilter }) => {
  const [search, setSearch] = useState('');
  
  const filteredVendors = vendors.filter(v => {
    let matchStatus = true;
    if (activeFilter === 'Active') {
      matchStatus = v.status === 'Active';
    } else if (activeFilter === 'Pending') {
      matchStatus = v.status === 'Pending';
    } else if (activeFilter === 'Top Rated') {
      matchStatus = v.rating >= 4.5;
    } else if (activeFilter === 'Verified') {
      matchStatus = v.verified === true;
    }
    
    const matchSearch = !search || 
      v.name?.toLowerCase().includes(search.toLowerCase()) || 
      v.location?.toLowerCase().includes(search.toLowerCase()) ||
      v.specialization?.toLowerCase().includes(search.toLowerCase());
    
    return matchStatus && matchSearch;
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
              <Icon d={ICONS.vendors} size={18} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-base">{title}</h3>
              <p className="text-xs text-gray-400">{count}</p>
            </div>
          </div>
          <button 
            onClick={() => alert('Exporting vendor list...')} 
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            <Icon d={ICONS.download} size={13} />Export
          </button>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon d={ICONS.search} size={15} />
            </span>
            <input 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              type="text" 
              placeholder="Search by name, location, specialization or status..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          {['All', 'Active', 'Pending', 'Top Rated', 'Verified'].map(f => (
            <button 
              key={f} 
              onClick={() => onFilter(f)} 
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === f ? 'bg-red-600 text-white shadow-sm' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Vendor ID', 'Business Name', 'Specialization', 'Location', 'Rating', 'Bookings', 'Status', 'Verified', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredVendors.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-sm text-gray-400">
                  No vendors found for "{activeFilter}" filter.
                </td>
              </tr>
            ) : (
              filteredVendors.map(v => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{v.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg ${v.avatarBg} flex items-center justify-center text-white text-[10px] font-bold`}>
                        {v.name?.[0]}
                      </div>
                      <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{v.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${v.tagColor}`}>
                      {v.specialization}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{v.location}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400 text-sm">★</span>
                      <span className="text-xs font-bold text-gray-700">{v.rating}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-gray-700 text-center">{v.bookings}</td>
                  <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                  <td className="px-4 py-3">
                    {v.verified ? 
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">✅ Verified</span> : 
                      <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">Pending</span>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => alert(`View vendor ${v.id}`)} 
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" 
                        title="View"
                      >
                        <Icon d={ICONS.eye} size={14} />
                      </button>
                      <button 
                        onClick={() => alert(`Edit vendor ${v.id}`)} 
                        className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors" 
                        title="Edit"
                      >
                        <Icon d={ICONS.edit} size={14} />
                      </button>
                      <button 
                        onClick={() => alert(`Verify vendor ${v.id}`)} 
                        className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors" 
                        title="Verify"
                      >
                        <Icon d={ICONS.shield} size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {filteredVendors.length > 0 && (
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">
            Showing {filteredVendors.length} of {vendors.length} vendors
          </p>
        </div>
      )}
    </div>
  );
};

export const PhotographyPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const vendors = [
    { 
      id: 'PHO001', 
      name: 'LensArt Studio', 
      specialization: 'Candid & Traditional', 
      location: 'Mumbai', 
      rating: 4.9, 
      bookings: 124, 
      status: 'Active', 
      verified: true, 
      avatarBg: 'bg-gradient-to-br from-pink-400 to-red-400', 
      tagColor: 'bg-pink-50 text-pink-700' 
    },
    { 
      id: 'PHO002', 
      name: 'Shutter Stories', 
      specialization: 'Pre-Wedding Shoots', 
      location: 'Delhi', 
      rating: 4.7, 
      bookings: 89, 
      status: 'Active', 
      verified: true, 
      avatarBg: 'bg-gradient-to-br from-rose-400 to-pink-400', 
      tagColor: 'bg-rose-50 text-rose-700' 
    },
    { 
      id: 'PHO003', 
      name: 'Golden Moments', 
      specialization: 'Full-Day Coverage', 
      location: 'Bangalore', 
      rating: 4.5, 
      bookings: 67, 
      status: 'Pending', 
      verified: false, 
      avatarBg: 'bg-gradient-to-br from-amber-400 to-orange-400', 
      tagColor: 'bg-amber-50 text-amber-700' 
    },
    { 
      id: 'PHO004', 
      name: 'Pixel Perfect Co.', 
      specialization: 'Drone & Aerial', 
      location: 'Chennai', 
      rating: 4.8, 
      bookings: 45, 
      status: 'Active', 
      verified: true, 
      avatarBg: 'bg-gradient-to-br from-purple-400 to-pink-400', 
      tagColor: 'bg-purple-50 text-purple-700' 
    },
  ];

  const filteredVendors = vendors.filter(v => {
    if (activeFilter === 'Active') return v.status === 'Active';
    if (activeFilter === 'Pending') return v.status === 'Pending';
    if (activeFilter === 'Top Rated') return v.rating >= 4.5;
    if (activeFilter === 'Verified') return v.verified === true;
    return true;
  });

  const stats = [
    { label: 'Total Photographers', value: '67', icon: '📸', color: 'border-pink-400', filter: 'All' },
    { label: 'Active', value: '54', icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Pending Approval', value: '8', icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Top Rated (4.5+)', value: '31', icon: '⭐', color: 'border-purple-400', filter: 'Top Rated' },
  ];

  const featureCards = [
    { 
      emoji: '🖼️', 
      title: 'Portfolio Management', 
      accentColor: 'bg-pink-50', 
      points: ['Review sample photos & albums', 'Check video reels & past work', 'Approve portfolio quality', 'Flag low-quality submissions'] 
    },
    { 
      emoji: '📦', 
      title: 'Service Packages & Pricing', 
      accentColor: 'bg-rose-50', 
      points: ['Basic, premium & full-day packages', 'Monitor pricing per package', 'Track included services', 'Update pricing on request'] 
    },
    { 
      emoji: '📅', 
      title: 'Availability Tracking', 
      accentColor: 'bg-purple-50', 
      points: ['Check date-wise availability', 'Avoid booking conflicts', 'Manage concurrent bookings', 'Calendar view per vendor'] 
    },
    { 
      emoji: '⭐', 
      title: 'Ratings & Reviews Monitoring', 
      accentColor: 'bg-amber-50', 
      points: ['Track customer feedback & stars', 'Highlight top performers', 'View assigned event bookings', 'Monitor service delivery status'] 
    },
  ];

  return (
    <div>
      {/* Header Section */}
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-pink-50 to-red-50 border border-pink-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📸</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Photography</h3>
            <p className="text-sm text-gray-500 mt-0.5">Wedding, Candid, Traditional & Pre-wedding Photography Vendors</p>
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <div 
            key={i} 
            onClick={() => setActiveFilter(s.filter)} 
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}
          >
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
      
      {/* Vendor Table */}
      <VendorTable 
        vendors={filteredVendors} 
        title="All Photography Vendors" 
        count={`${filteredVendors.length} vendors shown`} 
        activeFilter={activeFilter} 
        onFilter={setActiveFilter} 
      />
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {featureCards.map((c, i) => (
          <FeatureCard 
            key={i} 
            emoji={c.emoji} 
            title={c.title} 
            accentColor={c.accentColor} 
            points={c.points} 
          />
        ))}
      </div>
    </div>
  );
};