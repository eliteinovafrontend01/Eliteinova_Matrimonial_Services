import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { FeatureCard } from '../shared/FeatureCard';
import { customerComplaintsData } from '../../../data/admin/customers';
import { ICONS } from '../../../constants/admin/icons';

export const HandleComplaints = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const statCards = [
    { label: 'Open Tickets', value: '47', icon: '🎫', color: 'border-red-400', filter: 'Open' },
    { label: 'In Progress', value: '23', icon: '🔄', color: 'border-amber-400', filter: 'In Progress' },
    { label: 'Resolved Today', value: '18', icon: '✅', color: 'border-green-400', filter: 'Resolved' },
    { label: 'Escalated', value: '5', icon: '⚠️', color: 'border-purple-400', filter: 'Escalated' },
  ];
  
  const filtered = customerComplaintsData.filter(t => {
    const matchStatus = activeFilter === 'All' || t.status === activeFilter;
    const matchSearch = !search || 
      t.id.toLowerCase().includes(search.toLowerCase()) || 
      t.customer.toLowerCase().includes(search.toLowerCase()) || 
      t.issue.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });
  
  const pColor = { 
    High: 'text-amber-600 bg-amber-50', 
    Critical: 'text-red-600 bg-red-50', 
    Medium: 'text-blue-600 bg-blue-50', 
    Low: 'text-gray-500 bg-gray-50' 
  };
  
  const sColor = { 
    Open: 'text-red-700 bg-red-50 border-red-200', 
    'In Progress': 'text-purple-700 bg-purple-50 border-purple-200', 
    Resolved: 'text-green-700 bg-green-50 border-green-200', 
    Escalated: 'text-amber-700 bg-amber-50 border-amber-200' 
  };
  
  const featureCards = [
    { emoji: '⚖️', title: 'Dispute Management', accentColor: 'bg-red-50', points: ['Customer vs vendor conflicts', 'Evidence review & logs', 'Fair resolution enforcement', 'Outcome documentation'] },
    { emoji: '🔍', title: 'Compliance Monitoring', accentColor: 'bg-blue-50', points: ['Policy violation detection', 'Terms of service enforcement', 'User behaviour audits', 'Blacklist management'] },
    { emoji: '🛡️', title: 'KYC & Verification Checks', accentColor: 'bg-green-50', points: ['OTP & ID proof review', 'Fake account detection', 'Document authenticity check', 'Re-verification triggers'] },
    { emoji: '🚨', title: 'Escalation Handling', accentColor: 'bg-purple-50', points: ['Route to senior admins', 'Priority flagging system', 'SLA breach monitoring', 'Management notifications'] }
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
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.complaints} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Support Ticket Management</h3>
                <p className="text-xs text-gray-400">{filtered.length} ticket{filtered.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `— ${activeFilter}` : 'all tickets'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFilter !== 'All' && <button onClick={() => setActiveFilter('All')} className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">✕ Clear Filter</button>}
              <button onClick={() => alert('Exporting tickets...')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors">
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
                placeholder="Search tickets by ID, customer name or issue type..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            {['All','Open','In Progress','Resolved','Escalated'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} 
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>
        
        <div className="divide-y divide-gray-50">
          {filtered.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-gray-400">No tickets found for this filter.</div>
          ) : (
            filtered.map(t => (
              <div key={t.id} className="px-5 py-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
                <span className="text-xs font-mono text-gray-400 flex-shrink-0">{t.id}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{t.issue}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">{t.customer}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{t.type}</span>
                    <span className="text-gray-300">·</span>
                    <span className="text-xs text-gray-400">{t.created}</span>
                  </div>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${pColor[t.priority]}`}>{t.priority}</span>
                <span className={`text-[11px] font-semibold border px-2.5 py-0.5 rounded-full ${sColor[t.status]}`}>{t.status}</span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors">
                    <Icon d={ICONS.eye} size={14} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors">
                    <Icon d={ICONS.edit} size={14} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>
    </div>
  );
};