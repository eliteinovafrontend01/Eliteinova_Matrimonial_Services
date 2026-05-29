import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { StatusBadge } from '../shared/StatusBadge';
import { FeatureCard } from '../shared/FeatureCard';
import { profileData } from '../../../data/admin/customers';
import { ICONS } from '../../../constants/admin/icons';

export const ManageProfiles = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const statCards = [
    { label: 'Total Profiles', value: '4,821', icon: '👥', color: 'border-blue-400', filterValue: 'All' },
    { label: 'Profiles Updated Today', value: '128', icon: '✏️', color: 'border-teal-400', filterValue: 'Updated Today' },
    { label: 'KYC Verified', value: '3,904', icon: '🛡️', color: 'border-green-400', filterValue: 'Verified' },
    { label: 'Pending Verification', value: '384', icon: '⏳', color: 'border-amber-400', filterValue: 'Pending' },
  ];
  
  const filtered = profileData.filter(p => {
    let matchStatus = true;
    
    if (activeFilter === 'Verified') {
      matchStatus = p.verified === true;
    } else if (activeFilter === 'Pending') {
      matchStatus = p.status === 'Pending';
    } else if (activeFilter === 'Active') {
      matchStatus = p.status === 'Active';
    } else if (activeFilter === 'Blocked') {
      matchStatus = p.status === 'Blocked';
    } else if (activeFilter === 'Updated Today') {
      matchStatus = p.lastUpdate === '1 day ago' || p.lastUpdate === '2 days ago';
    } else if (activeFilter !== 'All') {
      matchStatus = p.status === activeFilter;
    }
    
    const matchSearch = !search || 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.email.toLowerCase().includes(search.toLowerCase()) || 
      p.location.toLowerCase().includes(search.toLowerCase());
    
    return matchStatus && matchSearch;
  });
  
  const featureCards = [
    { emoji: '✏️', title: 'Edit & Update Information', accentColor: 'bg-blue-50', points: ['Modify names & contact info', 'Update location details', 'Change profile photo', 'Correct verification records'] },
    { emoji: '🎯', title: 'Personalization Settings', accentColor: 'bg-purple-50', points: ['Tailor vendor recommendations', 'Match budget-based suggestions', 'Date & location-aware results', 'Style preference matching'] },
    { emoji: '🛡️', title: 'Verification Status', accentColor: 'bg-green-50', points: ['Mobile OTP verification', 'KYC / ID proof status', 'Flag unverified accounts', 'Trigger re-verification'] },
    { emoji: '📊', title: 'Activity Tracking', accentColor: 'bg-amber-50', points: ['Profile update history', 'Preference change logs', 'Admin action audit trail', 'Transparency reporting'] }
  ];
  
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
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
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.edit} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Customer Profiles</h3>
                <p className="text-xs text-gray-400">{filtered.length} profile{filtered.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `(filtered: ${activeFilter === 'Verified' ? 'KYC Verified' : activeFilter === 'Updated Today' ? 'Recently Updated' : activeFilter === 'Pending' ? 'Pending Verification' : activeFilter})` : 'total'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFilter !== 'All' && <button onClick={() => setActiveFilter('All')} className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">✕ Clear Filter</button>}
              <button onClick={() => alert('Exporting profiles...')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors">
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
                placeholder="Search by name, email, phone or location..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            {['All','Active','Pending','Blocked','Verified','Updated Today'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} 
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                {f === 'Updated Today' ? '📅 Updated Today' : f}
              </button>
            ))}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Customer ID','Name','Contact','Location','Registered','Last Update','Status','Verified','Bookings','Actions'].map(h => 
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={10} className="px-4 py-12 text-center text-sm text-gray-400">No profiles found for this filter.</td></tr>
              ) : (
                filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{p.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                          {p.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-gray-600">{p.email}</div>
                      <div className="text-xs text-gray-400">{p.phone}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{p.location}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{p.registered}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{p.lastUpdate}</td>
                    <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                    <td className="px-4 py-3">
                      {p.verified ? 
                        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">✓ Verified</span> : 
                        <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">Unverified</span>
                      }
                    </td>
                    <td className="px-4 py-3 text-xs font-bold text-gray-700 text-center">{p.bookings}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors">
                          <Icon d={ICONS.edit} size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors">
                          <Icon d={ICONS.eye} size={14} />
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
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-6">
        <div className="xl:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-purple-50 flex items-center justify-center text-sm">👤</span>
            Customer Profile View
          </h4>
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-amber-400 flex items-center justify-center text-white text-xl font-bold mb-2">AP</div>
            <p className="font-bold text-gray-800 text-sm">Aarav Patel</p>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full mt-1">✓ Verified</span>
          </div>
          <div className="space-y-2">
            {[
              { label: 'Email', value: 'aarav.patel@email.com' },
              { label: 'Phone', value: '+91 98765 43210' },
              { label: 'Location', value: 'Mumbai, Maharashtra' },
              { label: 'Registered', value: '12 Jan 2024' },
              { label: 'Total Bookings', value: '3 bookings' }
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-50">
                <span className="text-xs text-gray-400">{f.label}</span>
                <span className="text-xs font-semibold text-gray-700">{f.value}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 bg-red-600 text-white text-xs font-semibold rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-1.5">
            <Icon d={ICONS.edit} size={13} /> Edit Profile
          </button>
        </div>
        
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-50 flex items-center justify-center text-sm">⚙️</span>
            Preference Management
          </h4>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Preferred Services', value: 'Photography, Catering, Decoration', icon: '💍' },
              { label: 'Budget Range', value: '₹5,00,000 – ₹10,00,000', icon: '💰' },
              { label: 'Event Date', value: 'March 2025', icon: '📅' },
              { label: 'Location Preference', value: 'Mumbai & Nearby', icon: '📍' },
              { label: 'Style / Theme', value: 'Traditional with Modern Touches', icon: '🎨' },
              { label: 'Guest Count', value: '300 – 500 guests', icon: '👥' }
            ].map((p, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{p.icon}</span>
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{p.label}</span>
                </div>
                <p className="text-xs font-semibold text-gray-700">{p.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs font-bold text-blue-700 mb-1">🔒 Privacy & Data Control</p>
            <p className="text-xs text-blue-600">Customer data is encrypted and handled per platform privacy policy. Profile visibility and data sharing controls are managed per user consent.</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>
    </div>
  );
};