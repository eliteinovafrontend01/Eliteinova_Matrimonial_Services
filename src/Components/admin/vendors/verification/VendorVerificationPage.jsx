import { useState } from 'react';
import { Icon } from '../../shared/Icon';
import { FeatureCard } from '../../shared/FeatureCard';
import { ICONS } from '../../../../constants/admin/icons';

export const VendorVerificationPage = ({ onSelect }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const verificationItems = [
    { 
      label: 'Verify: Business License', 
      icon: '🏢', 
      gradient: 'from-emerald-50 to-teal-50 border-emerald-200', 
      iconBg: 'bg-emerald-100 text-emerald-700', 
      desc: 'Validate vendor business registration certificates and ensure all vendors operate with valid legal licenses.', 
      points: ['Business name & reg. number check', 'Issuing authority verification', 'Validity & expiry tracking', 'Renewal alerts & compliance'],
      status: 'Expiring',
      count: 14
    },
    { 
      label: 'Verify: GST Details', 
      icon: '🧾', 
      gradient: 'from-cyan-50 to-sky-50 border-cyan-200', 
      iconBg: 'bg-cyan-100 text-cyan-700', 
      desc: 'Validate GSTIN numbers and ensure vendors meet tax compliance requirements before receiving bookings or payments.', 
      points: ['GSTIN number validation', 'Government API auto-check', 'Business type & address verify', 'Fraud detection for fake GSTs'],
      status: 'Pending',
      count: 29
    },
    { 
      label: 'Verify: ID Proof', 
      icon: '🪪', 
      gradient: 'from-violet-50 to-purple-50 border-violet-200', 
      iconBg: 'bg-violet-100 text-violet-700', 
      desc: 'Perform identity verification using government-issued ID documents with KYC integration and photo matching.', 
      points: ['Aadhaar, PAN, Passport, DL', 'Photo identity matching', 'KYC via HyperVerge / Signzy', 'Fraud & impersonation detection'],
      status: 'Pending',
      count: 38
    },
    { 
      label: 'Assign: ✅ Verified Vendor Badge', 
      icon: '🏅', 
      gradient: 'from-green-50 to-teal-50 border-green-200', 
      iconBg: 'bg-green-100 text-green-700', 
      desc: 'View all approved verified vendors, assign trust badges, monitor performance, and manage re-verification alerts.', 
      points: ['Verified vendor listing', 'Badge assignment & revocation', 'Re-verification expiry alerts', 'Performance insights & export'],
      status: 'Completed',
      count: 241
    },
  ];
  
  const statCards = [
    { label: 'Fully Verified', value: '241', icon: '✅', color: 'border-green-400', filter: 'Completed' },
    { label: 'Pending Verification', value: '67', icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Documents Expiring', value: '14', icon: '⚠️', color: 'border-orange-400', filter: 'Expiring' },
    { label: 'Rejected', value: '12', icon: '❌', color: 'border-red-400', filter: 'Rejected' },
  ];
  
  const filteredItems = verificationItems.filter(i => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Pending') return i.status === 'Pending';
    if (activeFilter === 'Completed') return i.status === 'Completed';
    if (activeFilter === 'Expiring') return i.status === 'Expiring';
    if (activeFilter === 'Rejected') return i.label === 'Verify: ID Proof';
    return true;
  });
  
  const displayItems = search ? verificationItems.filter(i => 
    i.label.toLowerCase().includes(search.toLowerCase()) || 
    i.desc.toLowerCase().includes(search.toLowerCase())
  ) : filteredItems;
  
  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔐</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Vendor Verification</h3>
            <p className="text-sm text-gray-500 mt-0.5">Verify vendor documents, GST, ID proof and assign verified badges</p>
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
              placeholder="Search by verification type or description..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          {['All', 'Pending', 'Completed', 'Expiring', 'Rejected'].map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} 
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {f}
            </button>
          ))}
        </div>
        
        {activeFilter !== 'All' && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-gray-500">Filtered by:</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 text-xs font-semibold rounded-full">
              {activeFilter === 'Pending' ? 'Pending Verification' : 
               activeFilter === 'Completed' ? 'Fully Verified' :
               activeFilter === 'Expiring' ? 'Documents Expiring' :
               activeFilter === 'Rejected' ? 'Rejected' : activeFilter}
              <button onClick={() => setActiveFilter('All')} className="ml-1 hover:text-red-900">✕</button>
            </span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {displayItems.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-400">No verification items found for "{search || activeFilter}" filter.</div>
        ) : (
          displayItems.map((item, i) => (
            <div key={i} onClick={() => onSelect(item.label)} 
              className={`bg-gradient-to-br ${item.gradient} border rounded-2xl p-5 cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${item.iconBg}`}>{item.icon}</div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-sm leading-tight">{item.label}</h4>
                  {activeFilter !== 'All' && (
                    <p className="text-[10px] font-semibold mt-1" style={{ color: activeFilter === 'Pending' ? '#f59e0b' : activeFilter === 'Completed' ? '#10b981' : activeFilter === 'Expiring' ? '#f97316' : '#ef4444' }}>
                      {item.count} {activeFilter === 'Pending' ? 'pending verification' : activeFilter === 'Completed' ? 'verified' : activeFilter === 'Expiring' ? 'expiring soon' : 'rejected'}
                    </p>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">{item.desc}</p>
              <ul className="space-y-1.5">
                {item.points.map((pt, j) => (
                  <li key={j} className="flex items-start gap-2 text-xs text-gray-600">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-1 text-blue-600 text-xs font-bold">
                <span>Open Section →</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};