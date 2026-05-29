import { useState } from 'react';
import { Icon } from '../../shared/Icon';
import { StatusBadge } from '../../shared/StatusBadge';
import { VerificationBadge } from '../../shared/VerificationBadge';
import { FeatureCard } from '../../shared/FeatureCard';
import { ICONS } from '../../../../constants/admin/icons';

// Vendor Table Component
const VendorTable = ({ vendors, title, count, activeFilter = 'All', onFilter, filterOptions = [] }) => {
  const [search, setSearch] = useState('');
  const [localFilter, setLocalFilter] = useState(activeFilter);
  
  const currentFilter = activeFilter !== undefined ? activeFilter : localFilter;
  
  const handleFilterChange = (filter) => {
    setLocalFilter(filter);
    if (onFilter) onFilter(filter);
  };
  
  const filteredVendors = vendors.filter(v => {
    let matchStatus = true;
    if (currentFilter === 'Active') {
      matchStatus = v.status === 'Active';
    } else if (currentFilter === 'Pending') {
      matchStatus = v.status === 'Pending';
    } else if (currentFilter === 'Top Rated') {
      matchStatus = v.rating >= 4.5;
    } else if (currentFilter === 'Verified') {
      matchStatus = v.verified === true;
    } else if (currentFilter === 'Inactive') {
      matchStatus = v.status === 'Inactive';
    } else if (currentFilter === 'Suspended') {
      matchStatus = v.status === 'Suspended';
    } else if (currentFilter === 'Under Review') {
      matchStatus = v.status === 'Under Review';
    } else if (currentFilter === 'Rejected') {
      matchStatus = v.status === 'Rejected';
    }
    
    const matchSearch = !search || 
      v.name?.toLowerCase().includes(search.toLowerCase()) || 
      v.location?.toLowerCase().includes(search.toLowerCase()) ||
      v.specialization?.toLowerCase().includes(search.toLowerCase()) ||
      v.category?.toLowerCase().includes(search.toLowerCase()) ||
      v.owner?.toLowerCase().includes(search.toLowerCase());
    
    return matchStatus && matchSearch;
  });

  const filterButtons = filterOptions.length > 0 ? filterOptions : ['All', 'Active', 'Pending', 'Top Rated', 'Verified'];
  
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
          <button onClick={() => alert('Exporting...')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700">
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
              placeholder="Search by name, location, category or status..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-semibold rounded-xl hover:bg-gray-50">
            <Icon d={ICONS.filter} size={14} />Advanced
          </button>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          {filterButtons.map(f => (
            <button key={f} onClick={() => handleFilterChange(f)} 
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${currentFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {['Vendor ID', 'Business Name', 'Category/Specialization', 'Location', 'Rating', 'Bookings', 'Status', 'Verified', 'Actions'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredVendors.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-sm text-gray-400">
                  No vendors found for "{currentFilter}" filter.
                </td>
              </tr>
            ) : (
              filteredVendors.map(v => (
                <tr key={v.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{v.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg ${v.avatarBg || 'bg-gradient-to-br from-gray-400 to-gray-500'} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>
                        {v.name?.[0] || 'V'}
                      </div>
                      <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{v.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-lg ${v.tagColor || 'bg-gray-50 text-gray-700'}`}>
                      {v.specialization || v.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">{v.location}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400 text-sm">★</span>
                      <span className="text-xs font-bold text-gray-700">{v.rating || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs font-bold text-gray-700 text-center">{v.bookings || 0}</td>
                  <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                  <td className="px-4 py-3">
                    {v.verified ? 
                      <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">✅ Verified</span> : 
                      <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">Pending</span>
                    }
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="View">
                        <Icon d={ICONS.eye} size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors" title="Edit">
                        <Icon d={ICONS.edit} size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 transition-colors" title="Verify">
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
    </div>
  );
};

// Category Page Builder
const CategoryPage = ({ emoji, title, badge, gradient, stats, vendors, featureCards }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const handleFilter = (filterValue) => {
    setActiveFilter(filterValue);
  };
  
  const filteredVendors = vendors.filter(v => {
    let matchFilter = true;
    if (activeFilter === 'Active') {
      matchFilter = v.status === 'Active';
    } else if (activeFilter === 'Pending') {
      matchFilter = v.status === 'Pending';
    } else if (activeFilter === 'Top Rated') {
      matchFilter = v.rating >= 4.5;
    } else if (activeFilter === 'Verified') {
      matchFilter = v.verified === true;
    }
    return matchFilter;
  });
  
  const enhancedStats = stats.map(stat => {
    let filterValue = 'All';
    if (stat.label === 'Active') filterValue = 'Active';
    else if (stat.label === 'Pending Approval') filterValue = 'Pending';
    else if (stat.label === 'Top Rated (4.5+)') filterValue = 'Top Rated';
    else if (stat.label === 'Verified') filterValue = 'Verified';
    return {
      ...stat,
      filterValue,
      onClick: () => handleFilter(filterValue)
    };
  });
  
  return (
    <div>
      <div className={`rounded-2xl p-5 mb-6 bg-gradient-to-r ${gradient} border`}>
        <div className="flex items-center gap-4">
          <div className="text-4xl">{emoji}</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{badge}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {enhancedStats.map((s, i) => (
          <div key={i} onClick={s.onClick}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${activeFilter === s.filterValue ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-gray-800">{s.value}</p>
                {activeFilter === s.filterValue && (
                  <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>
                )}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>
      
      <VendorTable 
        vendors={filteredVendors} 
        title={`All ${title} Vendors`} 
        count={`${filteredVendors.length} vendors shown`}
        activeFilter={activeFilter}
        onFilter={setActiveFilter}
        filterOptions={['All', 'Active', 'Pending', 'Top Rated', 'Verified']}
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>
    </div>
  );
};

// Photography Page
export const PhotographyPage = () => (
  <CategoryPage
    emoji="📸" title="Photography"
    badge="Wedding, Candid, Traditional & Pre-wedding Photography Vendors"
    gradient="from-pink-50 to-red-50 border-pink-200"
    stats={[
      { label: 'Total Photographers', value: '67', icon: '📸', color: 'border-pink-400' },
      { label: 'Active', value: '54', icon: '✅', color: 'border-green-400' },
      { label: 'Pending Approval', value: '8', icon: '⏳', color: 'border-amber-400' },
      { label: 'Top Rated (4.5+)', value: '31', icon: '⭐', color: 'border-purple-400' },
    ]}
    vendors={[
      { id: 'PHO001', name: 'LensArt Studio', specialization: 'Candid & Traditional', location: 'Mumbai', rating: 4.9, bookings: 124, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-pink-400 to-red-400', tagColor: 'bg-pink-50 text-pink-700' },
      { id: 'PHO002', name: 'Shutter Stories', specialization: 'Pre-Wedding Shoots', location: 'Delhi', rating: 4.7, bookings: 89, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-rose-400 to-pink-400', tagColor: 'bg-rose-50 text-rose-700' },
      { id: 'PHO003', name: 'Golden Moments', specialization: 'Full-Day Coverage', location: 'Bangalore', rating: 4.5, bookings: 67, status: 'Pending', verified: false, avatarBg: 'bg-gradient-to-br from-amber-400 to-orange-400', tagColor: 'bg-amber-50 text-amber-700' },
      { id: 'PHO004', name: 'Pixel Perfect Co.', specialization: 'Drone & Aerial', location: 'Chennai', rating: 4.8, bookings: 45, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-purple-400 to-pink-400', tagColor: 'bg-purple-50 text-purple-700' },
    ]}
    featureCards={[
      { emoji: '🖼️', title: 'Portfolio Management', accentColor: 'bg-pink-50', points: ['Review sample photos & albums', 'Check video reels & past work', 'Approve portfolio quality', 'Flag low-quality submissions'] },
      { emoji: '📦', title: 'Service Packages & Pricing', accentColor: 'bg-rose-50', points: ['Basic, premium & full-day packages', 'Monitor pricing per package', 'Track included services', 'Update pricing on request'] },
      { emoji: '📅', title: 'Availability Tracking', accentColor: 'bg-purple-50', points: ['Check date-wise availability', 'Avoid booking conflicts', 'Manage concurrent bookings', 'Calendar view per vendor'] },
      { emoji: '⭐', title: 'Ratings & Reviews Monitoring', accentColor: 'bg-amber-50', points: ['Track customer feedback & stars', 'Highlight top performers', 'View assigned event bookings', 'Monitor service delivery status'] },
    ]}
  />
);

// Catering Page
export const CateringPage = () => (
  <CategoryPage
    emoji="🍽️" title="Catering"
    badge="South Indian, North Indian, Continental & Multi-Cuisine Wedding Caterers"
    gradient="from-orange-50 to-amber-50 border-orange-200"
    stats={[
      { label: 'Total Caterers', value: '54', icon: '🍽️', color: 'border-orange-400' },
      { label: 'Active', value: '41', icon: '✅', color: 'border-green-400' },
      { label: 'Pending Approval', value: '9', icon: '⏳', color: 'border-amber-400' },
      { label: 'Hygiene Certified', value: '38', icon: '🛡️', color: 'border-blue-400' },
    ]}
    vendors={[
      { id: 'CAT001', name: 'Royal Feast', specialization: 'Multi-Cuisine Buffet', location: 'Delhi', rating: 4.8, bookings: 112, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-orange-400 to-amber-400', tagColor: 'bg-orange-50 text-orange-700' },
      { id: 'CAT002', name: 'Spice Garden', specialization: 'South Indian Cuisine', location: 'Chennai', rating: 4.6, bookings: 78, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-yellow-400 to-orange-400', tagColor: 'bg-yellow-50 text-yellow-700' },
      { id: 'CAT003', name: "Nawab's Kitchen", specialization: 'Mughal & North Indian', location: 'Lucknow', rating: 4.5, bookings: 54, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-red-400 to-orange-400', tagColor: 'bg-red-50 text-red-700' },
      { id: 'CAT004', name: 'Continental Bites', specialization: 'Continental & Fusion', location: 'Mumbai', rating: 4.3, bookings: 29, status: 'Pending', verified: false, avatarBg: 'bg-gradient-to-br from-amber-400 to-yellow-400', tagColor: 'bg-amber-50 text-amber-700' },
    ]}
    featureCards={[
      { emoji: '🍱', title: 'Menu & Package Management', accentColor: 'bg-orange-50', points: ['Veg / non-veg menu options', 'Buffet or plate service tracking', 'Customizable meal plans', 'Special dietary options'] },
      { emoji: '👥', title: 'Pricing & Guest Capacity', accentColor: 'bg-amber-50', points: ['Monitor per-plate pricing', 'Min. guest requirements', 'Max serving capacity per vendor', 'Bulk order discount tracking'] },
      { emoji: '🛡️', title: 'Quality & Hygiene Compliance', accentColor: 'bg-green-50', points: ['FSSAI certification check', 'Hygiene audit records', 'Food safety compliance', 'Health inspection reports'] },
      { emoji: '📋', title: 'Vendor Approval & Booking', accentColor: 'bg-blue-50', points: ['Verify licenses & certifications', 'Approve/reject registrations', 'View catering bookings', 'Track special requirements'] },
    ]}
  />
);

// Wedding Halls Page
export const WeddingHallsPage = () => (
  <CategoryPage
    emoji="🏛️" title="Wedding Halls"
    badge="Banquet Halls, Convention Centers, Outdoor Venues & Resort Venues"
    gradient="from-blue-50 to-cyan-50 border-blue-200"
    stats={[
      { label: 'Total Venues', value: '87', icon: '🏛️', color: 'border-blue-400' },
      { label: 'Active', value: '71', icon: '✅', color: 'border-green-400' },
      { label: 'Pending Approval', value: '11', icon: '⏳', color: 'border-amber-400' },
      { label: 'Premium Venues', value: '24', icon: '👑', color: 'border-purple-400' },
    ]}
    vendors={[
      { id: 'HAL001', name: 'Grand Palace Banquets', specialization: 'Banquet Hall (1500 pax)', location: 'Mumbai', rating: 4.9, bookings: 89, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-blue-400 to-cyan-400', tagColor: 'bg-blue-50 text-blue-700' },
      { id: 'HAL002', name: 'Lakeview Convention', specialization: 'Outdoor + Indoor Venue', location: 'Udaipur', rating: 4.8, bookings: 56, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-cyan-400 to-teal-400', tagColor: 'bg-cyan-50 text-cyan-700' },
      { id: 'HAL003', name: 'Heritage Mahal', specialization: 'Heritage Venue', location: 'Jaipur', rating: 4.7, bookings: 43, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-indigo-400 to-blue-400', tagColor: 'bg-indigo-50 text-indigo-700' },
      { id: 'HAL004', name: 'Serene Gardens', specialization: 'Garden / Outdoor', location: 'Pune', rating: 4.4, bookings: 27, status: 'Pending', verified: false, avatarBg: 'bg-gradient-to-br from-teal-400 to-green-400', tagColor: 'bg-teal-50 text-teal-700' },
    ]}
    featureCards={[
      { emoji: '🏟️', title: 'Capacity & Space Details', accentColor: 'bg-blue-50', points: ['Seating & floating capacity', 'Hall size & number of rooms', 'Parking & stage area info', 'Dining hall specifications'] },
      { emoji: '🏠', title: 'Amenities & Facilities', accentColor: 'bg-cyan-50', points: ['AC, power backup status', 'Decoration support available', 'Accommodation availability', 'Valet parking service'] },
      { emoji: '🖼️', title: 'Gallery & Pricing', accentColor: 'bg-indigo-50', points: ['Review venue images & videos', 'Per-day rental pricing', 'Package deals with services', 'Availability calendar view'] },
      { emoji: '📋', title: 'Approval & Booking Control', accentColor: 'bg-purple-50', points: ['Verify ownership documents', 'License & compliance check', 'Manage event bookings', 'Conflict detection alerts'] },
    ]}
  />
);

// Entertainment Page
export const EntertainmentPage = () => (
  <CategoryPage
    emoji="🎶" title="Entertainment & Events"
    badge="DJs, Live Bands, Emcees, Dancers, Musicians & Event Coordinators"
    gradient="from-violet-50 to-purple-50 border-violet-200"
    stats={[
      { label: 'Total Entertainers', value: '42', icon: '🎶', color: 'border-violet-400' },
      { label: 'Active', value: '33', icon: '✅', color: 'border-green-400' },
      { label: 'Pending Approval', value: '6', icon: '⏳', color: 'border-amber-400' },
      { label: 'Featured Artists', value: '12', icon: '🌟', color: 'border-purple-400' },
    ]}
    vendors={[
      { id: 'ENT001', name: 'DJ Rhythm Pro', specialization: 'DJ & Sound Setup', location: 'Mumbai', rating: 4.9, bookings: 134, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-violet-400 to-purple-400', tagColor: 'bg-violet-50 text-violet-700' },
      { id: 'ENT002', name: 'Melody Live Band', specialization: 'Live Band & Singers', location: 'Delhi', rating: 4.7, bookings: 67, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-purple-400 to-pink-400', tagColor: 'bg-purple-50 text-purple-700' },
      { id: 'ENT003', name: 'StarHost Events', specialization: 'Emcee & Event Host', location: 'Bangalore', rating: 4.6, bookings: 89, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-fuchsia-400 to-violet-400', tagColor: 'bg-fuchsia-50 text-fuchsia-700' },
      { id: 'ENT004', name: 'Cultural Beats', specialization: 'Folk & Classical Dance', location: 'Chennai', rating: 4.4, bookings: 34, status: 'Pending', verified: false, avatarBg: 'bg-gradient-to-br from-pink-400 to-purple-400', tagColor: 'bg-pink-50 text-pink-700' },
    ]}
    featureCards={[
      { emoji: '🎬', title: 'Performance Portfolio', accentColor: 'bg-violet-50', points: ['Review video & audio samples', 'Past event highlights', 'Setlist & repertoire review', 'Stage presence assessment'] },
      { emoji: '🔊', title: 'Equipment & Setup Details', accentColor: 'bg-purple-50', points: ['Sound system specifications', 'Lighting & stage setup', 'Special effects equipment', 'Technical rider review'] },
      { emoji: '🗂️', title: 'Service Categories', accentColor: 'bg-fuchsia-50', points: ['DJ services & sound setups', 'Live band & vocal acts', 'Cultural & folk performances', 'Celebrity appearances'] },
      { emoji: '📅', title: 'Booking & Availability', accentColor: 'bg-pink-50', points: ['Date-wise availability check', 'Hourly or full-event booking', 'Custom entertainment plans', 'Conflict-free scheduling'] },
    ]}
  />
);

// Decorations Page
export const DecorationsPage = () => (
  <CategoryPage
    emoji="🎊" title="Decorations"
    badge="Wedding Stage, Floral Décor, Mandap Setup, Reception Themes & Custom Concepts"
    gradient="from-purple-50 to-pink-50 border-purple-200"
    stats={[
      { label: 'Total Decorators', value: '48', icon: '🎊', color: 'border-purple-400' },
      { label: 'Active', value: '37', icon: '✅', color: 'border-green-400' },
      { label: 'Pending Approval', value: '7', icon: '⏳', color: 'border-amber-400' },
      { label: 'Theme Specialists', value: '19', icon: '🎨', color: 'border-pink-400' },
    ]}
    vendors={[
      { id: 'DEC001', name: 'Dream Decor Co.', specialization: 'Floral & Traditional', location: 'Bangalore', rating: 4.8, bookings: 94, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-purple-400 to-pink-400', tagColor: 'bg-purple-50 text-purple-700' },
      { id: 'DEC002', name: 'Royal Setups', specialization: 'Royal & Mandap Setup', location: 'Jaipur', rating: 4.7, bookings: 72, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-pink-400 to-rose-400', tagColor: 'bg-pink-50 text-pink-700' },
      { id: 'DEC003', name: 'Bloom & Blossom', specialization: 'Garden & Floral Themes', location: 'Mumbai', rating: 4.6, bookings: 58, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-rose-400 to-pink-400', tagColor: 'bg-rose-50 text-rose-700' },
      { id: 'DEC004', name: 'Modern Deco Hub', specialization: 'Contemporary & Fusion', location: 'Hyderabad', rating: 4.3, bookings: 31, status: 'Pending', verified: false, avatarBg: 'bg-gradient-to-br from-violet-400 to-purple-400', tagColor: 'bg-violet-50 text-violet-700' },
    ]}
    featureCards={[
      { emoji: '🎨', title: 'Theme & Style Management', accentColor: 'bg-purple-50', points: ['Traditional & modern themes', 'Floral, royal, beach concepts', 'Custom-designed mandap themes', 'Reception & stage setups'] },
      { emoji: '🖼️', title: 'Portfolio & Gallery', accentColor: 'bg-pink-50', points: ['Images & videos of past events', 'Theme-wise categorization', 'Before & after comparisons', 'Assess creativity & quality'] },
      { emoji: '💰', title: 'Package & Pricing Details', accentColor: 'bg-rose-50', points: ['Pricing by event type', 'Venue size-based packages', 'Customization cost tracking', 'Material quality standards'] },
      { emoji: '✅', title: 'Quality Control & Approval', accentColor: 'bg-fuchsia-50', points: ['Design standards review', 'Timely setup verification', 'Vendor approval workflow', 'Performance-based status updates'] },
    ]}
  />
);

// Invitations Page
export const InvitationsPage = () => (
  <CategoryPage
    emoji="🎁" title="Invitations & Gifting"
    badge="Printed Cards, Digital Invites, Return Gifts, Customized Hampers & Souvenirs"
    gradient="from-rose-50 to-pink-50 border-rose-200"
    stats={[
      { label: 'Total Vendors', value: '35', icon: '🎁', color: 'border-rose-400' },
      { label: 'Active', value: '27', icon: '✅', color: 'border-green-400' },
      { label: 'Pending Approval', value: '5', icon: '⏳', color: 'border-amber-400' },
      { label: 'Digital Invite Providers', value: '14', icon: '📱', color: 'border-blue-400' },
    ]}
    vendors={[
      { id: 'INV001', name: 'Artisan Cards Studio', specialization: 'Printed Invitations', location: 'Delhi', rating: 4.8, bookings: 78, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-rose-400 to-pink-400', tagColor: 'bg-rose-50 text-rose-700' },
      { id: 'INV002', name: 'DigiInvite Pro', specialization: 'Digital / E-Invitations', location: 'Bangalore', rating: 4.7, bookings: 145, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-pink-400 to-fuchsia-400', tagColor: 'bg-pink-50 text-pink-700' },
      { id: 'INV003', name: 'Gift Hamper World', specialization: 'Custom Gift Hampers', location: 'Mumbai', rating: 4.6, bookings: 62, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-amber-400 to-orange-400', tagColor: 'bg-amber-50 text-amber-700' },
      { id: 'INV004', name: 'Return Gifts Hub', specialization: 'Return Gifts & Souvenirs', location: 'Chennai', rating: 4.4, bookings: 39, status: 'Pending', verified: false, avatarBg: 'bg-gradient-to-br from-orange-400 to-red-400', tagColor: 'bg-orange-50 text-orange-700' },
    ]}
    featureCards={[
      { emoji: '🗂️', title: 'Service Categories', accentColor: 'bg-rose-50', points: ['Printed wedding invitations', 'Digital / E-invitations', 'Customized gift hampers', 'Return gifts & souvenirs'] },
      { emoji: '✏️', title: 'Customization Options', accentColor: 'bg-pink-50', points: ['Custom card designs & templates', 'Theme-based invitations', 'Branded packaging options', 'Tailored gift selections'] },
      { emoji: '📦', title: 'Order & Delivery Management', accentColor: 'bg-fuchsia-50', points: ['Track order processing', 'Production timeline monitoring', 'Delivery schedule tracking', 'Timely fulfillment assurance'] },
      { emoji: '🛡️', title: 'Quality Assurance', accentColor: 'bg-amber-50', points: ['Material & print quality check', 'Packaging standards review', 'Presentation assessment', 'Vendor verification process'] },
    ]}
  />
);

// Bridal Makeup Page
export const BridalMakeupPage = () => (
  <CategoryPage
    emoji="💄" title="Groom & Bridal Styling"
    badge="Bridal Makeup, Groom Styling, Hairstyling, Saree Draping & Pre-Wedding Looks"
    gradient="from-amber-50 to-yellow-50 border-amber-200"
    stats={[
      { label: 'Total Stylists', value: '39', icon: '💄', color: 'border-amber-400' },
      { label: 'Active', value: '31', icon: '✅', color: 'border-green-400' },
      { label: 'Pending Approval', value: '5', icon: '⏳', color: 'border-yellow-400' },
      { label: 'Certified Artists', value: '24', icon: '🏅', color: 'border-pink-400' },
    ]}
    vendors={[
      { id: 'BRI001', name: 'Glam Bridal Studio', specialization: 'Bridal Makeup & Hair', location: 'Mumbai', rating: 4.9, bookings: 203, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-amber-400 to-yellow-400', tagColor: 'bg-amber-50 text-amber-700' },
      { id: 'BRI002', name: 'Groom Style Co.', specialization: 'Groom Grooming & Styling', location: 'Delhi', rating: 4.7, bookings: 98, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-yellow-400 to-amber-400', tagColor: 'bg-yellow-50 text-yellow-700' },
      { id: 'BRI003', name: 'Saree Drape Masters', specialization: 'Saree Draping & Dressing', location: 'Chennai', rating: 4.6, bookings: 71, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-orange-400 to-amber-400', tagColor: 'bg-orange-50 text-orange-700' },
      { id: 'BRI004', name: 'Pre-Wed Looks Studio', specialization: 'Pre-Wedding Styling', location: 'Bangalore', rating: 4.5, bookings: 48, status: 'Pending', verified: false, avatarBg: 'bg-gradient-to-br from-pink-400 to-amber-400', tagColor: 'bg-pink-50 text-pink-700' },
    ]}
    featureCards={[
      { emoji: '🗂️', title: 'Service Categories', accentColor: 'bg-amber-50', points: ['Bridal makeup & hair styling', 'Groom grooming & styling', 'Pre-wedding look packages', 'Saree draping & dressing assistance'] },
      { emoji: '🖼️', title: 'Portfolio & Gallery', accentColor: 'bg-yellow-50', points: ['Before & after photo review', 'Wedding day look samples', 'Style & technique assessment', 'Video portfolio review'] },
      { emoji: '💄', title: 'Products & Brand Details', accentColor: 'bg-orange-50', points: ['Premium cosmetics used', 'Brand compliance monitoring', 'Skin-safe product assurance', 'Customer preference matching'] },
      { emoji: '📦', title: 'Packages & Scheduling', accentColor: 'bg-pink-50', points: ['Engagement & wedding packages', 'Reception look add-ons', 'Complete bridal packages', 'Appointment & date scheduling'] },
    ]}
  />
);

// Investigations Page
export const InvestigationsPage = () => (
  <CategoryPage
    emoji="🔍" title="Pre Matrimonial Investigations"
    badge="Background Checks, Employment Verification, Family Checks & Pre-Matrimonial Investigations"
    gradient="from-slate-50 to-gray-50 border-slate-200"
    stats={[
      { label: 'Registered Agencies', value: '18', icon: '🔍', color: 'border-slate-400' },
      { label: 'Active', value: '14', icon: '✅', color: 'border-green-400' },
      { label: 'Cases In Progress', value: '23', icon: '🔄', color: 'border-amber-400' },
      { label: 'Completed Cases', value: '312', icon: '📋', color: 'border-blue-400' },
    ]}
    vendors={[
      { id: 'INQ001', name: 'TruthGuard Detectives', specialization: 'Full Background Verification', location: 'Mumbai', rating: 4.9, bookings: 87, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-slate-500 to-gray-600', tagColor: 'bg-slate-50 text-slate-700' },
      { id: 'INQ002', name: 'Shield Investigations', specialization: 'Employment & Income Check', location: 'Delhi', rating: 4.7, bookings: 64, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-gray-500 to-slate-500', tagColor: 'bg-gray-100 text-gray-700' },
      { id: 'INQ003', name: 'Family Verify Bureau', specialization: 'Family Background Checks', location: 'Chennai', rating: 4.6, bookings: 52, status: 'Active', verified: true, avatarBg: 'bg-gradient-to-br from-zinc-500 to-gray-500', tagColor: 'bg-zinc-50 text-zinc-700' },
      { id: 'INQ004', name: 'SafeMatch Inquiry', specialization: 'Lifestyle & Social Assessment', location: 'Bangalore', rating: 4.5, bookings: 38, status: 'Pending', verified: false, avatarBg: 'bg-gradient-to-br from-neutral-500 to-slate-500', tagColor: 'bg-neutral-100 text-neutral-700' },
    ]}
    featureCards={[
      { emoji: '🗂️', title: 'Service Categories', accentColor: 'bg-slate-50', points: ['Personal background verification', 'Employment & income check', 'Family background checks', 'Lifestyle & social behaviour assessment'] },
      { emoji: '🔒', title: 'Confidential Case Handling', accentColor: 'bg-gray-100', points: ['Secure report access controls', 'Restricted data sharing', 'Encrypted case files', 'Privacy-first procedures'] },
      { emoji: '📋', title: 'Case Status Tracking', accentColor: 'bg-zinc-50', points: ['Requested → In Progress → Done', 'Admin review before delivery', 'Real-time status updates', 'Case closure documentation'] },
      { emoji: '⚖️', title: 'Legal & Privacy Compliance', accentColor: 'bg-neutral-100', points: ['Legal registration verification', 'User consent confirmation', 'Data protection law compliance', 'Agency credibility & license audit'] },
    ]}
  />
);

// Export all category pages
export const CATEGORY_PAGES = {
  'Photography': PhotographyPage,
  'Catering': CateringPage,
  'Wedding Halls': WeddingHallsPage,
  'Entertainment & Events': EntertainmentPage,
  'Decorations': DecorationsPage,
  'Invitations & Gifting': InvitationsPage,
  'Groom & Bridal Styling': BridalMakeupPage,
  'Pre Matrimonial Investigations': InvestigationsPage,
};