import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { BookingBadge } from '../shared/BookingBadge';
import { PaymentBadge } from '../shared/PaymentBadge';
import { FeatureCard } from '../shared/FeatureCard';
import { allBookingsData } from '../../../data/admin/bookings';
import { ICONS } from '../../../constants/admin/icons';

export const TrackBookingHistory = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  
  const statCards = [
    { label: 'Total Bookings', value: '10,843', icon: '📋', color: 'border-blue-400', filter: 'All' },
    { label: 'Pending', value: '47', icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Confirmed', value: '312', icon: '✅', color: 'border-green-400', filter: 'Confirmed' },
    { label: 'In Progress', value: '845', icon: '🔄', color: 'border-purple-400', filter: 'In Progress' },
    { label: 'Cancelled', value: '203', icon: '❌', color: 'border-red-400', filter: 'Cancelled' },
  ];
  
  const filtered = allBookingsData.filter(b => {
    const matchStatus = activeFilter === 'All' || b.status === activeFilter;
    const matchSearch = !search || 
      b.customer.toLowerCase().includes(search.toLowerCase()) || 
      b.vendor.toLowerCase().includes(search.toLowerCase()) || 
      b.service.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });
  
  const featureCards = [
    { emoji: '📍', title: 'Vendor Assignment Tracking', accentColor: 'bg-amber-50', points: ['See assigned vendor per booking', 'Track performance & delivery', 'Rate vendor post-completion', 'Switch vendor if needed'] },
    { emoji: '💳', title: 'Payment & Transaction Info', accentColor: 'bg-green-50', points: ['Check paid/partial/pending status', 'View full transaction details', 'Track refund processing', 'Invoice access per booking'] },
    { emoji: '🔄', title: 'Cancellation & Reschedule', accentColor: 'bg-red-50', points: ['Handle cancellation requests', 'Process reschedule requests', 'Manage refund workflows', 'Update booking records'] },
    { emoji: '📅', title: 'Booking Timeline', accentColor: 'bg-blue-50', points: ['View creation timestamp', 'Track updates & changes', 'Confirmation milestones', 'Completion sign-off log'] }
  ];
  
  return (
    <div>
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
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.booking} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Complete Booking Overview</h3>
                <p className="text-xs text-gray-400">{filtered.length} booking{filtered.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `— ${activeFilter}` : 'across all services'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFilter !== 'All' && <button onClick={() => setActiveFilter('All')} className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">✕ Clear Filter</button>}
              <button onClick={() => alert('Exporting bookings...')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors">
                <Icon d={ICONS.download} size={13} />Export
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex-1 relative min-w-48">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Icon d={ICONS.search} size={15} />
              </span>
              <input 
                value={search} 
                onChange={e => setSearch(e.target.value)} 
                type="text" 
                placeholder="Search by customer, vendor, service or booking ID..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 focus:border-red-300 bg-gray-50" 
              />
            </div>
            {['All','Pending','Confirmed','In Progress','Completed','Cancelled'].map(f => (
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
                {['Booking ID','Customer','Service','Vendor Assigned','Booking Date','Event Date','Status','Payment','Amount','Actions'].map(h => 
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-12 text-center text-sm text-gray-400">No bookings found for "{activeFilter}" filter.</td>
                </tr>
              ) : (
                filtered.map(b => (
                  <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">{b.id}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">{b.customer}</td>
                    <td className="px-4 py-3"><span className="text-xs font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded-lg">{b.service}</span></td>
                    <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{b.vendor}</td>
                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{b.bookingDate}</td>
                    <td className="px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">{b.eventDate}</td>
                    <td className="px-4 py-3"><BookingBadge status={b.status} /></td>
                    <td className="px-4 py-3"><PaymentBadge status={b.payment} /></td>
                    <td className="px-4 py-3 text-xs font-bold text-gray-800 whitespace-nowrap">{b.amount}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors">
                          <Icon d={ICONS.eye} size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors">
                          <Icon d={ICONS.edit} size={14} />
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>
    </div>
  );
};