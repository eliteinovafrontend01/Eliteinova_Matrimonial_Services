import { useState } from 'react';
import { Icon } from '../../shared/Icon';
import { FeatureCard } from '../../shared/FeatureCard';
import { ICONS } from '../../../../constants/admin/icons';

export const ApproveVendorRegistration = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const applicationData = [
    { id: 'APP001', name: 'Sunrise Photography', category: 'Photography', contact: 'Arjun Mehta', phone: '+91 98765 43210', location: 'Mumbai', submitted: '20 Mar 2024', status: 'Pending', docs: 4, avatarBg: 'bg-gradient-to-br from-pink-400 to-rose-400' },
    { id: 'APP002', name: 'Spice Route Caterers', category: 'Catering', contact: 'Priya Sharma', phone: '+91 87654 32100', location: 'Delhi', submitted: '19 Mar 2024', status: 'Under Review', docs: 5, avatarBg: 'bg-gradient-to-br from-orange-400 to-amber-400' },
    { id: 'APP003', name: 'Elite Banquet Hall', category: 'Wedding Halls', contact: 'Rajesh Verma', phone: '+91 76543 21099', location: 'Jaipur', submitted: '18 Mar 2024', status: 'Pending', docs: 3, avatarBg: 'bg-gradient-to-br from-blue-400 to-cyan-400' },
    { id: 'APP004', name: 'Beat Makers DJ', category: 'Entertainment', contact: 'Kiran Rao', phone: '+91 65432 10988', location: 'Bangalore', submitted: '17 Mar 2024', status: 'Approved', docs: 5, avatarBg: 'bg-gradient-to-br from-violet-400 to-purple-400' },
    { id: 'APP005', name: 'Floral Dreams Decor', category: 'Decorations', contact: 'Meena Pillai', phone: '+91 54321 09877', location: 'Chennai', submitted: '16 Mar 2024', status: 'Rejected', docs: 2, avatarBg: 'bg-gradient-to-br from-purple-400 to-pink-400' },
  ];
  
  const statCards = [
    { label: 'Total Applications', value: '48', icon: '📋', color: 'border-blue-400', filter: 'All' },
    { label: 'Pending Review', value: '21', icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Under Review', value: '12', icon: '🔄', color: 'border-purple-400', filter: 'Under Review' },
    { label: 'Approved', value: '11', icon: '✅', color: 'border-green-400', filter: 'Approved' },
    { label: 'Rejected', value: '4', icon: '❌', color: 'border-red-400', filter: 'Rejected' },
  ];
  
  const filteredApps = applicationData.filter(a => {
    const matchStatus = activeFilter === 'All' || a.status === activeFilter;
    const matchSearch = !search || 
      a.name.toLowerCase().includes(search.toLowerCase()) || 
      a.category.toLowerCase().includes(search.toLowerCase()) ||
      a.contact.toLowerCase().includes(search.toLowerCase()) ||
      a.location.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });
  
  const statusColor = { 
    Pending: 'bg-amber-50 text-amber-700 border-amber-200', 
    'Under Review': 'bg-blue-50 text-blue-700 border-blue-200', 
    Approved: 'bg-green-50 text-green-700 border-green-200', 
    Rejected: 'bg-red-50 text-red-700 border-red-200' 
  };
  
  const featureCards = [
    { emoji: '📋', title: 'Registration Request Review', accentColor: 'bg-amber-50', points: ['View all incoming applications', 'Complete business & contact details', 'Submitted document listing', 'Application timestamp tracking'] },
    { emoji: '📁', title: 'Document Verification', accentColor: 'bg-blue-50', points: ['Business registration certificate', 'Government ID & address proof', 'Service portfolio review', 'License validation (if applicable)'] },
    { emoji: '✅', title: 'Approval / Rejection Actions', accentColor: 'bg-green-50', points: ['Approve to activate vendor account', 'Reject with valid stated reasons', 'Request additional documents', 'Trigger re-submission workflows'] },
    { emoji: '🔔', title: 'Notification & Remarks', accentColor: 'bg-purple-50', points: ['Auto-notify via email & SMS', 'In-app status notifications', 'Add internal admin remarks', 'Future reference audit notes'] }
  ];
  
  return (
    <div>
      <div className="rounded-2xl p-5 mb-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📝</div>
          <div>
            <h3 className="text-lg font-bold text-gray-800">Approve Vendor Registration</h3>
            <p className="text-sm text-gray-500 mt-0.5">Review, verify and approve incoming vendor registration requests</p>
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
                <Icon d={ICONS.document} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Registration Request Review</h3>
                <p className="text-xs text-gray-400">{filteredApps.length} application{filteredApps.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `(filtered: ${activeFilter})` : 'total'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFilter !== 'All' && <button onClick={() => setActiveFilter('All')} className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100">✕ Clear Filter</button>}
              <button onClick={() => alert('Exporting data...')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700">
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
                placeholder="Search by business name, category or contact..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            {['All','Pending','Under Review','Approved','Rejected'].map(f => (
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
                {['App. ID', 'Business Name', 'Category', 'Contact Person', 'Location', 'Submitted', 'Docs', 'Status', 'Actions'].map(h => 
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredApps.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-12 text-center text-sm text-gray-400">No applications found for "{activeFilter}" filter.</td></tr>
              ) : (
                filteredApps.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{a.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg ${a.avatarBg} flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0`}>{a.name[0]}</div>
                        <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{a.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className="text-xs font-semibold px-2 py-0.5 rounded-lg bg-red-50 text-red-700">{a.category}</span></td>
                    <td className="px-4 py-3"><div className="text-xs font-semibold text-gray-700">{a.contact}</div><div className="text-xs text-gray-400">{a.phone}</div></td>
                    <td className="px-4 py-3 text-xs text-gray-600">{a.location}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{a.submitted}</td>
                    <td className="px-4 py-3 text-center"><span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{a.docs} files</span></td>
                    <td className="px-4 py-3"><span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusColor[a.status]}`}>{a.status}</span></td>
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
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6">
        <h4 className="font-bold text-gray-800 text-sm mb-4 flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-sm">📁</span>
          Document Verification Checklist
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {[
            { doc: 'Business Registration Certificate', icon: '🏢', status: 'Required' },
            { doc: 'Government ID Proof', icon: '🪪', status: 'Required' },
            { doc: 'Address Proof', icon: '📍', status: 'Required' },
            { doc: 'Service Portfolio (Images/Videos)', icon: '🖼️', status: 'Required' },
            { doc: 'Applicable Licenses', icon: '📄', status: 'If Applicable' },
            { doc: 'GST Certificate', icon: '🧾', status: 'Required' }
          ].map((d, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-lg">{d.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-700 truncate">{d.doc}</p>
                <p className="text-[10px] text-gray-400">{d.status}</p>
              </div>
              <span className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0"></span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-xl">🔔</span>
          <div>
            <p className="text-sm font-bold text-blue-800">Automated Notification System</p>
            <p className="text-xs text-blue-600 mt-1">Vendors are automatically notified about their application status changes via Email, SMS, and In-App notifications. Admin remarks are included in rejection notifications.</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>
    </div>
  );
};