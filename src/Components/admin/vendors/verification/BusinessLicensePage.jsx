import { useState } from 'react';
import { Icon } from '../../shared/Icon';
import { VerificationBadge } from '../../shared/VerificationBadge';
import { FeatureCard } from '../../shared/FeatureCard';
import { businessLicenseData } from '../../../../data/admin/vendors';
import { ICONS } from '../../../../constants/admin/icons';

export const BusinessLicensePage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const statCards = [
    { label: 'Total Submissions', value: '298', icon: '📄', color: 'border-blue-400', filter: 'All' },
    { label: 'Verified', value: '241', icon: '✅', color: 'border-green-400', filter: 'Verified' },
    { label: 'Expired / Invalid', value: '14', icon: '⚠️', color: 'border-orange-400', filter: 'Expired' },
    { label: 'Pending Review', value: '27', icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
  ];
  
  const filtered = businessLicenseData.filter(l => {
    const matchStatus = activeFilter === 'All' || l.status === activeFilter;
    const matchSearch = !search || 
      l.vendor.toLowerCase().includes(search.toLowerCase()) || 
      l.category.toLowerCase().includes(search.toLowerCase()) ||
      l.regNo.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });
  
  const featureCards = [
    { emoji: '📄', title: 'License Document Review', accentColor: 'bg-emerald-50', points: ['Business name validation', 'Registration number check', 'Issuing authority verification', 'Validity & expiry date review'] },
    { emoji: '🔍', title: 'Authenticity Check', accentColor: 'bg-teal-50', points: ['Cross-check with official records', 'Detect tampered documents', 'Verify issuing authority', 'Confirm legitimacy of registration'] },
    { emoji: '⏰', title: 'Expiry & Renewal Tracking', accentColor: 'bg-orange-50', points: ['Monitor license validity dates', 'Alerts for upcoming expiry', 'Track renewal submissions', 'Auto-notify vendors for renewal'] },
    { emoji: '🔒', title: 'Compliance & Storage', accentColor: 'bg-blue-50', points: ['Restrict non-compliant vendors', 'Secure document storage', 'Access-controlled file system', 'Full audit trail of actions'] }
  ];
  
  return (
    <div>
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🏢</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Verify: Business License</h3>
            <p className="text-sm text-gray-500 mt-0.5">Validate vendor business registration and legal operating status</p>
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
                <h3 className="font-bold text-gray-800 text-base">Business License Verification</h3>
                <p className="text-xs text-gray-400">{filtered.length} license{filtered.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `(filtered: ${activeFilter})` : 'total'}</p>
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
                placeholder="Search by vendor, registration number or status..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            {['All','Verified','Expired','Pending','Under Review','Rejected'].map(f => (
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
                {['License ID', 'Vendor', 'Category', 'Reg. Number', 'Issuing Authority', 'Validity / Expiry', 'Status', 'Actions'].map(h => 
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="px-4 py-12 text-center text-sm text-gray-400">No licenses found for "{activeFilter}" filter. </td></tr>
              ) : (
                filtered.map(l => (
                  <tr key={l.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{l.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${l.avatarBg} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>{l.vendor[0]}</div>
                        <span className="text-sm font-semibold text-gray-700">{l.vendor}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-red-50 text-red-700">{l.category}</span></td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-600">{l.regNo}</td>
                    <td className="px-4 py-3 text-xs text-gray-600">{l.issuer}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-gray-700">{l.validity}</td>
                    <td className="px-4 py-3"><VerificationBadge status={l.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="View Document"><Icon d={ICONS.eye} size={14} /></button>
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
      
      <div className="bg-orange-50 rounded-2xl border border-orange-200 p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="text-sm font-bold text-orange-800">Expiry & Renewal Alerts</p>
            <p className="text-xs text-orange-600 mt-1">2 vendor licenses have expired and 5 licenses are expiring within the next 30 days. Vendors have been notified to renew and re-upload updated documents.</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>
    </div>
  );
};