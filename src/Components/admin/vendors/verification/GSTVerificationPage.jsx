import { useState } from 'react';
import { Icon } from '../../shared/Icon';
import { VerificationBadge } from '../../shared/VerificationBadge';
import { FeatureCard } from '../../shared/FeatureCard';
import { gstData } from '../../../../data/admin/vendors';
import { ICONS } from '../../../../constants/admin/icons';

export const GSTVerificationPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const statCards = [
    { label: 'Total Submissions', value: '289', icon: '🧾', color: 'border-cyan-400', filter: 'All' },
    { label: 'GST Verified', value: '231', icon: '✅', color: 'border-green-400', filter: 'Verified' },
    { label: 'Pending Validation', value: '29', icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Invalid / Rejected', value: '8', icon: '❌', color: 'border-red-400', filter: 'Invalid' },
  ];
  
  const filtered = gstData.filter(g => {
    const matchStatus = activeFilter === 'All' || g.status === activeFilter;
    const matchSearch = !search || 
      g.vendor.toLowerCase().includes(search.toLowerCase()) || 
      g.category.toLowerCase().includes(search.toLowerCase()) ||
      g.gstin.toLowerCase().includes(search.toLowerCase()) ||
      g.bizName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });
  
  const featureCards = [
    { emoji: '🧾', title: 'GST Details Review', accentColor: 'bg-cyan-50', points: ['GSTIN number validation', 'Registered business name check', 'Business type verification', 'Registered address confirmation'] },
    { emoji: '🔗', title: 'Government API Validation', accentColor: 'bg-sky-50', points: ['Auto-validate GSTIN via API', 'Real-time GST portal lookup', 'Detect invalid GSTINs instantly', 'Flag mismatched information'] },
    { emoji: '📄', title: 'Document Upload Review', accentColor: 'bg-blue-50', points: ['Manual GST certificate review', 'Uploaded document validation', 'Cross-check with GSTIN data', 'Request corrections or re-upload'] },
    { emoji: '🔒', title: 'Compliance & Fraud Detection', accentColor: 'bg-indigo-50', points: ['Identify duplicate GSTINs', 'Prevent fake tax registrations', 'Secure sensitive data handling', 'Full audit & history logs'] }
  ];
  
  return (
    <div>
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-cyan-50 to-sky-50 border border-cyan-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🧾</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Verify: GST Details</h3>
            <p className="text-sm text-gray-500 mt-0.5">Validate vendor GSTIN and ensure tax compliance for all operations</p>
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
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.document} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">GST Verification Queue</h3>
                <p className="text-xs text-gray-400">{filtered.length} record{filtered.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `(filtered: ${activeFilter})` : 'total'}</p>
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
                placeholder="Search by vendor, GSTIN or business name..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            {['All','Verified','Pending','Under Review','Invalid'].map(f => (
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
                {['GST ID', 'Vendor', 'Category', 'GSTIN', 'Registered Business', 'Type', 'Address', 'Status', 'Actions'].map(h => 
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-12 text-center text-sm text-gray-400">No GST records found for "{activeFilter}" filter.</td></tr>
              ) : (
                filtered.map(g => (
                  <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{g.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${g.avatarBg} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>{g.vendor[0]}</div>
                        <span className="text-sm font-semibold text-gray-700">{g.vendor}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-red-50 text-red-700">{g.category}</span></td>
                    <td className="px-4 py-3 text-xs font-mono font-bold text-gray-700">{g.gstin}</td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{g.bizName}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{g.bizType}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{g.address}</td>
                    <td className="px-4 py-3"><VerificationBadge status={g.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="View"><Icon d={ICONS.eye} size={14} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors" title="Approve"><Icon d={ICONS.check} size={14} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors" title="Reject"><Icon d={ICONS.x} size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-cyan-50 rounded-2xl border border-cyan-200 p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-xl">🔗</span>
          <div>
            <p className="text-sm font-bold text-cyan-800">Government GST API Integration</p>
            <p className="text-xs text-cyan-600 mt-1">GSTIN numbers are automatically validated against official government GST portal records via API integration. Mismatches are flagged instantly for admin review and vendor correction.</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>
    </div>
  );
};