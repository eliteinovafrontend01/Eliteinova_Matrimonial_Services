import { useState } from 'react';
import { StatusBadge } from '../shared/StatusBadge';
import { FeatureCard } from '../shared/FeatureCard';
import { allVendorsData } from '../../../data/admin/vendors';

export const VendorOverview = ({ onSelectCategory }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  
  const statCards = [
    { label: 'Total Vendors', value: '326', icon: '🏢', color: 'border-amber-400', filter: 'All' },
    { label: 'Active Vendors', value: '271', icon: '✅', color: 'border-green-400', filter: 'Active' },
    { label: 'Pending Approval', value: '48', icon: '⏳', color: 'border-blue-400', filter: 'Pending' },
    { label: 'Verified Vendors', value: '241', icon: '🛡️', color: 'border-purple-400', filter: 'Verified' },
  ];
  
  const filteredVendors = allVendorsData.filter(v => {
    if (activeFilter === 'Active') return v.status === 'Active';
    if (activeFilter === 'Pending') return v.status === 'Pending';
    if (activeFilter === 'Verified') return v.verified === true;
    if (activeFilter === 'Top Rated') return v.rating >= 4.5;
    return true;
  });
  
  const categories = [
    { label: 'Photography', count: 67, icon: '📸', color: 'from-pink-50 to-red-50 border-pink-200' },
    { label: 'Catering', count: 54, icon: '🍽️', color: 'from-orange-50 to-amber-50 border-orange-200' },
    { label: 'Wedding Halls', count: 87, icon: '🏛️', color: 'from-blue-50 to-cyan-50 border-blue-200' },
    { label: 'Entertainment & Events', count: 42, icon: '🎶', color: 'from-violet-50 to-purple-50 border-violet-200' },
    { label: 'Decorations', count: 48, icon: '🎊', color: 'from-purple-50 to-pink-50 border-purple-200' },
    { label: 'Invitations & Gifting', count: 35, icon: '🎁', color: 'from-rose-50 to-pink-50 border-rose-200' },
    { label: 'Groom & Bridal Styling', count: 39, icon: '💄', color: 'from-amber-50 to-yellow-50 border-amber-200' },
    { label: 'Pre Matrimonial Investigations', count: 18, icon: '🔍', color: 'from-slate-50 to-gray-50 border-slate-200' },
  ];
  
  const featureCards = [
    { emoji: '📋', title: 'Vendor Approval Process', accentColor: 'bg-amber-50', points: ['Review new registrations', 'Approve or reject applications', 'Request additional documents', 'Send approval notifications'] },
    { emoji: '✅', title: 'Verification & Compliance', accentColor: 'bg-green-50', points: ['Business license verification', 'GST details check', 'KYC document review', 'Assign verified badge'] },
    { emoji: '📈', title: 'Performance Monitoring', accentColor: 'bg-blue-50', points: ['Track ratings & reviews', 'Monitor completed bookings', 'Customer feedback analysis', 'Performance improvement alerts'] },
    { emoji: '⚙️', title: 'Availability & Service Control', accentColor: 'bg-purple-50', points: ['Enable or disable services', 'Manage vendor availability', 'Suspend underperforming vendors', 'Reactivate after review'] }
  ];
  
  return (
    <div>
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
      
      <p className="text-sm text-gray-500 mb-4">Click a category below or select from the sidebar to manage vendors by service type.</p>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 mb-6">
        {categories.map((c, i) => (
          <div key={i} onClick={() => onSelectCategory(c.label)} 
            className={`bg-gradient-to-br ${c.color} border rounded-2xl p-4 text-center cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5`}>
            <div className="text-2xl mb-1">{c.icon}</div>
            <p className="text-lg font-bold text-gray-800">{c.count}</p>
            <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider leading-tight">{c.label}</p>
          </div>
        ))}
      </div>
      
      {activeFilter !== 'All' && filteredVendors.length > 0 && (
        <div className="mt-6">
          <h4 className="font-bold text-gray-800 mb-3">
            {activeFilter === 'Active' ? 'Active Vendors' : 
             activeFilter === 'Pending' ? 'Pending Approval Vendors' :
             activeFilter === 'Verified' ? 'Verified Vendors' :
             activeFilter === 'Top Rated' ? 'Top Rated Vendors (4.5+)' : 'Filtered Vendors'}
          </h4>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Vendor Name</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Category</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Location</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Rating</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Status</th>
                  <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.slice(0, 5).map(v => (
                  <tr key={v.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-semibold">{v.name}</td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-lg bg-gray-100">{v.category}</span></td>
                    <td className="px-4 py-3 text-xs">{v.location}</td>
                    <td className="px-4 py-3"><span className="text-amber-400">★</span> {v.rating}</td>
                    <td className="px-4 py-3"><StatusBadge status={v.status} /></td>
                    <td className="px-4 py-3"><button className="text-blue-500 hover:bg-blue-50 p-1 rounded">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>
    </div>
  );
};