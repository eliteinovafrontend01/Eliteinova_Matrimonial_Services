import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { FeatureCard } from '../shared/FeatureCard';
import { ICONS } from '../../../constants/admin/icons';

export const ComplaintsDisputesPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const complaintsData = [
    { id: 'CMP001', ticketId: 'TKT001', customer: 'Aarav Patel', vendor: 'LensArt Studio', type: 'Service Quality', issue: 'Vendor no-show on event day', priority: 'High', status: 'Open', created: '2 hrs ago', resolution: 'Pending review' },
    { id: 'CMP002', ticketId: 'TKT002', customer: 'Ishita Reddy', vendor: 'Royal Feast', type: 'Payment', issue: 'Payment deducted but booking not confirmed', priority: 'Critical', status: 'In Progress', created: '5 hrs ago', resolution: 'Verifying with payment gateway' },
    { id: 'CMP003', ticketId: 'TKT003', customer: 'Rohan Deshmukh', vendor: 'Dream Decor', type: 'Service Quality', issue: 'Decoration quality below expectations', priority: 'Medium', status: 'Resolved', created: '1 day ago', resolution: 'Partial refund issued' },
    { id: 'CMP004', ticketId: 'TKT004', customer: 'Meera Nair', vendor: 'Shutter Stories', type: 'Technical', issue: 'Cannot upload event photos', priority: 'Low', status: 'Closed', created: '2 days ago', resolution: 'Issue fixed' },
    { id: 'CMP005', ticketId: 'TKT005', customer: 'Neha Gupta', vendor: 'Grand Palace', type: 'Refund', issue: 'Refund not received after cancellation', priority: 'Critical', status: 'Escalated', created: '3 days ago', resolution: 'Escalated to finance team' },
    { id: 'CMP006', ticketId: 'TKT006', customer: 'Vikram Singh', vendor: 'Glam Studio', type: 'Booking Dispute', issue: 'Wrong makeup artist assigned', priority: 'High', status: 'In Progress', created: '1 day ago', resolution: 'Investigating with vendor' },
    { id: 'CMP007', ticketId: 'TKT007', customer: 'Priya Sharma', vendor: "Nawab's Kitchen", type: 'Service Quality', issue: 'Food quality and taste issues', priority: 'Medium', status: 'Open', created: '4 hrs ago', resolution: 'Awaiting vendor response' },
  ];

  const statCards = [
    { label: 'Total Complaints', value: '47', icon: '🎫', color: 'border-blue-400', filter: 'All' },
    { label: 'Open', value: '18', icon: '🟡', color: 'border-amber-400', filter: 'Open' },
    { label: 'In Progress', value: '12', icon: '🔄', color: 'border-purple-400', filter: 'In Progress' },
    { label: 'Resolved', value: '12', icon: '✅', color: 'border-green-400', filter: 'Resolved' },
    { label: 'Escalated', value: '5', icon: '⚠️', color: 'border-red-400', filter: 'Escalated' },
  ];

  const priorityColors = { 
    Critical: 'bg-red-50 text-red-700', 
    High: 'bg-amber-50 text-amber-700', 
    Medium: 'bg-blue-50 text-blue-700', 
    Low: 'bg-gray-50 text-gray-500' 
  };
  
  const statusColors = { 
    Open: 'bg-amber-50 text-amber-700 border-amber-200', 
    'In Progress': 'bg-purple-50 text-purple-700 border-purple-200', 
    Resolved: 'bg-green-50 text-green-700 border-green-200', 
    Escalated: 'bg-red-50 text-red-700 border-red-200', 
    Closed: 'bg-gray-50 text-gray-500 border-gray-200' 
  };

  const filtered = complaintsData.filter(c => {
    const matchStatus = activeFilter === 'All' || c.status === activeFilter;
    const matchSearch = !search || 
      c.customer.toLowerCase().includes(search.toLowerCase()) || 
      c.vendor.toLowerCase().includes(search.toLowerCase()) ||
      c.issue.toLowerCase().includes(search.toLowerCase()) ||
      c.ticketId.toLowerCase().includes(search.toLowerCase()) ||
      c.type.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const featureCards = [
    { emoji: '🎫', title: 'Ticket Management System', accentColor: 'bg-blue-50', points: ['Generate unique ticket IDs', 'Categorize by issue type', 'Track complaint progress', 'Complete communication logs'] },
    { emoji: '⚖️', title: 'Dispute Resolution Workflow', accentColor: 'bg-purple-50', points: ['Investigate issues thoroughly', 'Verify facts & evidence', 'Take appropriate actions', 'Issue warnings or penalties'] },
    { emoji: '📈', title: 'Escalation Management', accentColor: 'bg-amber-50', points: ['Escalate critical issues', 'Route to senior admins', 'Priority-based handling', 'SLA breach monitoring'] },
    { emoji: '📊', title: 'Reports & Insights', accentColor: 'bg-green-50', points: ['Analyze complaint trends', 'Track resolution time', 'Vendor performance issues', 'Improve service quality'] }
  ];

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">⚖️</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Complaints & Disputes Management</h3>
            <p className="text-sm text-gray-500 mt-0.5">Handle customer complaints, vendor disputes and track resolution progress</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} onClick={() => setActiveFilter(s.filter)}
            className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                {activeFilter === s.filter && <p className="text-[9px] text-red-500 font-bold mt-1">● Active Filter</p>}
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
              {activeFilter !== 'All' && <button onClick={() => setActiveFilter('All')} className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100">✕ Clear</button>}
              <button onClick={() => alert('Exporting tickets...')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700">
                <Icon d={ICONS.download} size={13} />Export
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex-1 min-w-[200px] relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon d={ICONS.search} size={15} />
              </span>
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                placeholder="Search by ticket ID, customer, vendor or issue type..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 bg-gray-50" 
              />
            </div>
            {['All','Open','In Progress','Resolved','Escalated','Closed'].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} 
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${activeFilter === f ? 'bg-red-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {filtered.length === 0 ? (
            <div className="px-5 py-12 text-center text-sm text-gray-400">No complaints found for "{activeFilter}" filter.</div>
          ) : filtered.map(c => (
            <div key={c.id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="text-xs font-mono text-gray-400 flex-shrink-0">{c.ticketId}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800">{c.issue}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-gray-500">{c.customer} vs {c.vendor}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">{c.type}</span>
                    <span className="text-xs text-gray-400">{c.created}</span>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${priorityColors[c.priority]}`}>{c.priority}</span>
                <span className={`text-[10px] font-semibold border px-2.5 py-0.5 rounded-full ${statusColors[c.status]}`}>{c.status}</span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button onClick={() => alert(`View ticket ${c.ticketId}`)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500">
                    <Icon d={ICONS.eye} size={14} />
                  </button>
                  <button onClick={() => alert(`Update ticket ${c.ticketId}`)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500">
                    <Icon d={ICONS.edit} size={14} />
                  </button>
                  <button onClick={() => alert(`Escalate ticket ${c.ticketId}`)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-500">
                    <Icon d={ICONS.alert} size={14} />
                  </button>
                </div>
              </div>
              {c.status !== 'Open' && c.status !== 'Closed' && (
                <div className="mt-2 pt-2 border-t border-gray-50">
                  <p className="text-[10px] text-gray-400"><span className="font-semibold">Resolution:</span> {c.resolution}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>
    </div>
  );
};