import { useState } from 'react';
import { Icon } from '../../shared/Icon';
import { FeatureCard } from '../../shared/FeatureCard';
import { ICONS } from '../../../../constants/admin/icons';

export const ApproveVerifyProfile = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const verifyProfileData = [
    { id: 'VND001', name: 'LensArt Studio', category: 'Photography', owner: 'Deepak Shah', location: 'Mumbai', experience: '8 years', status: 'Under Review', portfolio: true, kyc: true, license: false, avatarBg: 'bg-gradient-to-br from-pink-400 to-rose-400' },
    { id: 'VND002', name: 'Royal Feast Caterers', category: 'Catering', owner: 'Sunita Reddy', location: 'Delhi', experience: '12 years', status: 'Verified', portfolio: true, kyc: true, license: true, avatarBg: 'bg-gradient-to-br from-orange-400 to-amber-400' },
    { id: 'VND003', name: 'Heritage Mahal', category: 'Wedding Halls', owner: 'Anil Choudhary', location: 'Jaipur', experience: '5 years', status: 'Pending Verification', portfolio: true, kyc: false, license: true, avatarBg: 'bg-gradient-to-br from-blue-400 to-indigo-400' },
    { id: 'VND004', name: 'DJ Rhythm Pro', category: 'Entertainment', owner: 'Vikram Nair', location: 'Bangalore', experience: '6 years', status: 'Rejected', portfolio: false, kyc: true, license: false, avatarBg: 'bg-gradient-to-br from-violet-400 to-purple-400' },
  ];
  
  const statCards = [
    { label: 'Total Profiles', value: '326', icon: '🏢', color: 'border-blue-400', filter: 'All' },
    { label: 'Pending Verification', value: '34', icon: '⏳', color: 'border-amber-400', filter: 'Pending Verification' },
    { label: 'Under Review', value: '28', icon: '🔄', color: 'border-purple-400', filter: 'Under Review' },
    { label: 'Verified & Live', value: '241', icon: '✅', color: 'border-green-400', filter: 'Verified' },
    { label: 'Rejected', value: '12', icon: '❌', color: 'border-red-400', filter: 'Rejected' },
  ];
  
  const filtered = verifyProfileData.filter(v => {
    const matchStatus = activeFilter === 'All' || v.status === activeFilter;
    const matchSearch = !search || 
      v.name.toLowerCase().includes(search.toLowerCase()) || 
      v.category.toLowerCase().includes(search.toLowerCase()) ||
      v.owner.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });
  
  const statusColor = { 
    'Pending Verification': 'bg-amber-50 text-amber-700 border-amber-200', 
    'Under Review': 'bg-blue-50 text-blue-700 border-blue-200', 
    Verified: 'bg-green-50 text-green-700 border-green-200', 
    Rejected: 'bg-red-50 text-red-700 border-red-200' 
  };
  
  const featureCards = [
    { emoji: '👤', title: 'Profile Review', accentColor: 'bg-blue-50', points: ['Business name & category details', 'Contact info & location review', 'Service offerings overview', 'Previous work experience check'] },
    { emoji: '📁', title: 'Document Verification', accentColor: 'bg-green-50', points: ['Business registration certificate', 'Government ID & address proof', 'Licenses & certifications', 'Portfolio images & videos'] },
    { emoji: '🔍', title: 'KYC & Quality Assessment', accentColor: 'bg-purple-50', points: ['Third-party KYC verification', 'Portfolio & experience review', 'Pricing standards assessment', 'Platform quality compliance'] },
    { emoji: '📋', title: 'Audit Logs & Notifications', accentColor: 'bg-amber-50', points: ['Internal admin remarks & notes', 'Full verification audit history', 'Auto-notify on approval/rejection', 'Required update notifications'] }
  ];
  
  return (
    <div>
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">✅</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Approve & Verify Vendor Profile</h3>
            <p className="text-sm text-gray-500 mt-0.5">Review vendor profiles and approve/reject for platform listing</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
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
                <Icon d={ICONS.userCheck} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Vendor Profile Verification Queue</h3>
                <p className="text-xs text-gray-400">{filtered.length} profile{filtered.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `(filtered: ${activeFilter})` : 'total'}</p>
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
                placeholder="Search by vendor name, category or owner..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            {['All','Pending Verification','Under Review','Verified','Rejected'].map(f => (
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
                {['Vendor ID', 'Business Name', 'Category', 'Owner', 'Location', 'Experience', 'Portfolio', 'KYC', 'License', 'Status', 'Actions'].map(h => 
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={11} className="px-4 py-12 text-center text-sm text-gray-400">No profiles found for "{activeFilter}" filter.</td></tr>
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
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{v.owner}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{v.location}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{v.experience}</td>
                    <td className="px-4 py-3 text-center">{v.portfolio ? <span className="text-green-600 text-sm">✓</span> : <span className="text-red-400 text-sm">✗</span>}</td>
                    <td className="px-4 py-3 text-center">{v.kyc ? <span className="text-green-600 text-sm">✓</span> : <span className="text-red-400 text-sm">✗</span>}</td>
                    <td className="px-4 py-3 text-center">{v.license ? <span className="text-green-600 text-sm">✓</span> : <span className="text-red-400 text-sm">✗</span>}</td>
                    <td className="px-4 py-3"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusColor[v.status]}`}>{v.status}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Icon d={ICONS.eye} size={14} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors"><Icon d={ICONS.check} size={14} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"><Icon d={ICONS.x} size={14} /></button>
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