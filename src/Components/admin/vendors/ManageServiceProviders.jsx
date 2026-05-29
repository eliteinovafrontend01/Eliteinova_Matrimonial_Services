import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const ManageServiceProvidersPage = ({ onSelect }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const categories = [
    { id: 'CAT001', label: 'Photography', count: 67, activeCount: 54, pendingCount: 8, icon: '📸', color: 'from-pink-50 to-red-50 border-pink-200', desc: 'Wedding, Candid, Traditional & Pre-wedding', status: 'Active', lastUpdated: '2 days ago', growth: '+15%', rating: 4.7 },
    { id: 'CAT002', label: 'Catering', count: 54, activeCount: 41, pendingCount: 9, icon: '🍽️', color: 'from-orange-50 to-amber-50 border-orange-200', desc: 'Multi-Cuisine, South & North Indian Caterers', status: 'Active', lastUpdated: '5 days ago', growth: '+12%', rating: 4.6 },
    { id: 'CAT003', label: 'Wedding Halls', count: 87, activeCount: 71, pendingCount: 11, icon: '🏛️', color: 'from-blue-50 to-cyan-50 border-blue-200', desc: 'Banquet Halls, Venues & Convention Centers', status: 'Active', lastUpdated: '1 day ago', growth: '+8%', rating: 4.8 },
    { id: 'CAT004', label: 'Entertainment & Events', count: 42, activeCount: 33, pendingCount: 6, icon: '🎶', color: 'from-violet-50 to-purple-50 border-violet-200', desc: 'DJs, Live Bands, Emcees & Dancers', status: 'Active', lastUpdated: '3 days ago', growth: '+18%', rating: 4.7 },
    { id: 'CAT005', label: 'Decorations', count: 48, activeCount: 37, pendingCount: 7, icon: '🎊', color: 'from-purple-50 to-pink-50 border-purple-200', desc: 'Stage, Floral, Mandap & Reception Themes', status: 'Pending', lastUpdated: '1 day ago', growth: '+10%', rating: 4.6 },
    { id: 'CAT006', label: 'Invitations & Gifting', count: 35, activeCount: 27, pendingCount: 5, icon: '🎁', color: 'from-rose-50 to-pink-50 border-rose-200', desc: 'Printed Cards, Digital Invites & Hampers', status: 'Active', lastUpdated: '7 days ago', growth: '+14%', rating: 4.5 },
    { id: 'CAT007', label: 'Groom & Bridal Styling', count: 39, activeCount: 31, pendingCount: 5, icon: '💄', color: 'from-amber-50 to-yellow-50 border-amber-200', desc: 'Bridal Makeup, Groom Styling & Hairstyling', status: 'Active', lastUpdated: '2 days ago', growth: '+22%', rating: 4.8 },
    { id: 'CAT008', label: 'Pre Matrimonial Investigations', count: 18, activeCount: 14, pendingCount: 3, icon: '🔍', color: 'from-slate-50 to-gray-50 border-slate-200', desc: 'Background Checks & Employment Verification', status: 'Pending', lastUpdated: '4 days ago', growth: '+5%', rating: 4.4 },
  ];
  
  const totalVendors = categories.reduce((sum, cat) => sum + cat.count, 0);
  const totalActive = categories.reduce((sum, cat) => sum + cat.activeCount, 0);
  const totalPending = categories.reduce((sum, cat) => sum + cat.pendingCount, 0);
  const totalCategories = categories.length;
  const recentlyUpdated = categories.filter(c => c.lastUpdated === '1 day ago' || c.lastUpdated === '2 days ago').length;
  
  const statCards = [
    { label: 'Total Vendors', value: totalVendors, icon: '🏢', color: 'border-amber-400', filterValue: 'All' },
    { label: 'Active Vendors', value: totalActive, icon: '✅', color: 'border-green-400', filterValue: 'Active' },
    { label: 'Total Categories', value: totalCategories, icon: '🗂️', color: 'border-blue-400', filterValue: 'AllCategories' },
    { label: 'Updated Today', value: recentlyUpdated, icon: '📅', color: 'border-teal-400', filterValue: 'Updated Today' },
    { label: 'Pending Approval', value: totalPending, icon: '⏳', color: 'border-red-400', filterValue: 'Pending' },
  ];
  
  const filteredCategories = categories.filter(c => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'AllCategories') return true;
    if (activeFilter === 'Active') return c.status === 'Active';
    if (activeFilter === 'Pending') return c.status === 'Pending';
    if (activeFilter === 'Updated Today') {
      return c.lastUpdated === '1 day ago' || c.lastUpdated === '2 days ago';
    }
    return true;
  });
  
  const displayCategories = search ? categories.filter(c => 
    c.label.toLowerCase().includes(search.toLowerCase()) || 
    c.desc.toLowerCase().includes(search.toLowerCase())
  ) : filteredCategories;
  
  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🏪</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Manage Service Providers</h3>
            <p className="text-sm text-gray-500 mt-0.5">Select a service category below to manage vendors by type</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} onClick={() => setActiveFilter(s.filterValue)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${activeFilter === s.filterValue ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-gray-800">{s.value}</p>
                {activeFilter === s.filterValue && <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>}
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
              placeholder="Search by category name or description..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <button onClick={() => setActiveFilter('All')} 
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === 'All' ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            🏢 All Vendors
          </button>
          <button onClick={() => setActiveFilter('Active')} 
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === 'Active' ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            ✅ Active
          </button>
          <button onClick={() => setActiveFilter('AllCategories')} 
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === 'AllCategories' ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            🗂️ All Categories
          </button>
          <button onClick={() => setActiveFilter('Updated Today')} 
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === 'Updated Today' ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            📅 Updated Today
          </button>
          <button onClick={() => setActiveFilter('Pending')} 
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === 'Pending' ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            ⏳ Pending Approval
          </button>
        </div>
        
        {activeFilter !== 'All' && activeFilter !== 'AllCategories' && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-gray-500">Filtered by:</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 text-xs font-semibold rounded-full">
              {activeFilter === 'Updated Today' ? '📅 Recently Updated Categories' : 
               activeFilter === 'Active' ? '✅ Active Categories' : 
               activeFilter === 'Pending' ? '⏳ Pending Categories' : activeFilter}
              <button onClick={() => setActiveFilter('All')} className="ml-1 hover:text-red-900">✕</button>
            </span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {displayCategories.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="text-5xl mb-3">🔍</div>
            <p className="text-gray-400 text-sm">No categories found for "{search || activeFilter}" filter.</p>
            <button onClick={() => { setActiveFilter('All'); setSearch(''); }} 
              className="mt-3 text-red-600 text-xs font-semibold hover:underline">
              Clear all filters
            </button>
          </div>
        ) : (
          displayCategories.map((c, i) => (
            <div key={c.id} onClick={() => onSelect(c.label)} 
              className={`bg-gradient-to-br ${c.color} border rounded-2xl p-5 cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 group`}>
              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl">{c.icon}</div>
                <div className="flex items-center gap-1">
                  {c.rating && (
                    <div className="flex items-center gap-0.5 bg-white/50 rounded-full px-2 py-0.5">
                      <span className="text-amber-500 text-xs">★</span>
                      <span className="text-[10px] font-bold text-gray-700">{c.rating}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mb-2">
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-gray-800">{c.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{c.count}</p>
                </div>
                <p className="text-[10px] text-gray-400 -mt-1">vendors</p>
              </div>
              
              <p className="text-[11px] text-gray-500 leading-tight mb-3">{c.desc}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-[9px] text-gray-500">{c.activeCount} active</span>
                  </div>
                  {c.pendingCount > 0 && (
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <span className="text-[9px] text-gray-500">{c.pendingCount} pending</span>
                    </div>
                  )}
                </div>
                <div className="text-red-600 text-xs font-semibold group-hover:translate-x-1 transition-transform">
                  Manage →
                </div>
              </div>
              
              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between">
                {c.growth && (
                  <span className="text-[10px] font-semibold text-green-600">{c.growth} growth</span>
                )}
                {c.lastUpdated && (
                  <span className="text-[9px] text-gray-400 flex items-center gap-1">
                    <span>🕐</span> {c.lastUpdated}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};