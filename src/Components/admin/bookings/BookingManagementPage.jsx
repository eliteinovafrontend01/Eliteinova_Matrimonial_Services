import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { BookingBadge } from '../shared/BookingBadge';
import { PaymentBadge } from '../shared/PaymentBadge';
import { FeatureCard } from '../shared/FeatureCard';
import { ICONS } from '../../../constants/admin/icons';

export const BookingManagementPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const bookingsData = [
    { id: 'BK001', customer: 'Aarav Patel', service: 'Photography', vendor: 'LensArt Studio', bookingDate: '10 Jan 2024', eventDate: '15 Mar 2024', location: 'Mumbai', amount: '₹45,000', status: 'Completed', payment: 'Paid' },
    { id: 'BK002', customer: 'Ishita Reddy', service: 'Catering', vendor: 'Royal Feast', bookingDate: '20 Feb 2024', eventDate: '25 Apr 2024', location: 'Delhi', amount: '₹1,20,000', status: 'Confirmed', payment: 'Partial' },
    { id: 'BK003', customer: 'Rohan Deshmukh', service: 'Decorations', vendor: 'Dream Decor', bookingDate: '1 Mar 2024', eventDate: '10 May 2024', location: 'Chennai', amount: '₹65,000', status: 'Pending', payment: 'Pending' },
    { id: 'BK004', customer: 'Neha Gupta', service: 'Wedding Halls', vendor: 'Grand Palace', bookingDate: '5 Apr 2024', eventDate: '20 Jun 2024', location: 'Bangalore', amount: '₹3,50,000', status: 'In Progress', payment: 'Paid' },
    { id: 'BK005', customer: 'Vikram Singh', service: 'Bridal Styling', vendor: 'Glam Studio', bookingDate: '12 Apr 2024', eventDate: '5 Jul 2024', location: 'Pune', amount: '₹18,000', status: 'Cancelled', payment: 'Refunded' },
    { id: 'BK006', customer: 'Meera Nair', service: 'Photography', vendor: 'Shutter Stories', bookingDate: '18 Apr 2024', eventDate: '12 Aug 2024', location: 'Hyderabad', amount: '₹55,000', status: 'Confirmed', payment: 'Paid' },
    { id: 'BK007', customer: 'Arjun Mehta', service: 'Entertainment', vendor: 'DJ Rhythm Pro', bookingDate: '22 Apr 2024', eventDate: '1 Sep 2024', location: 'Mumbai', amount: '₹30,000', status: 'Pending', payment: 'Pending' },
    { id: 'BK008', customer: 'Priya Sharma', service: 'Catering', vendor: "Nawab's Kitchen", bookingDate: '28 Apr 2024', eventDate: '15 Sep 2024', location: 'Lucknow', amount: '₹2,10,000', status: 'In Progress', payment: 'Partial' },
  ];

  const statCards = [
    { label: 'Total Bookings', value: '10,843', icon: '📋', color: 'border-blue-400', filter: 'All' },
    { label: 'Pending', value: '47', icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Confirmed', value: '312', icon: '✅', color: 'border-green-400', filter: 'Confirmed' },
    { label: 'In Progress', value: '845', icon: '🔄', color: 'border-purple-400', filter: 'In Progress' },
    { label: 'Completed', value: '7,436', icon: '🎉', color: 'border-emerald-400', filter: 'Completed' },
    { label: 'Cancelled', value: '203', icon: '❌', color: 'border-red-400', filter: 'Cancelled' },
  ];

  const filtered = bookingsData.filter(b => {
    const matchStatus = activeFilter === 'All' || b.status === activeFilter;
    const matchSearch = !search || 
      b.customer.toLowerCase().includes(search.toLowerCase()) || 
      b.vendor.toLowerCase().includes(search.toLowerCase()) || 
      b.service.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const featureCards = [
    { emoji: '📊', title: 'Booking Overview Dashboard', accentColor: 'bg-blue-50', points: ['View all bookings with key details', 'Customer name & service type', 'Vendor assignment tracking', 'Booking date & event date view'] },
    { emoji: '🔄', title: 'Status Management', accentColor: 'bg-amber-50', points: ['Update booking status in real-time', 'Track Pending → Confirmed → In Progress → Completed', 'Handle cancellations properly', 'Automated status notifications'] },
    { emoji: '👥', title: 'Vendor Assignment', accentColor: 'bg-green-50', points: ['Assign vendors based on availability', 'Location & service requirement matching', 'Conflict-free scheduling', 'Calendar management integration'] },
    { emoji: '💰', title: 'Payment & Refund Tracking', accentColor: 'bg-purple-50', points: ['Monitor paid/partial/pending status', 'Refund processing for cancellations', 'Invoice & billing management', 'Complete transaction history'] }
  ];

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📅</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Booking Management</h3>
            <p className="text-sm text-gray-500 mt-0.5">View, manage and track all vendor bookings with centralized dashboard controls</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} onClick={() => setActiveFilter(s.filter)}
            className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                {activeFilter === s.filter && <p className="text-[9px] text-red-500 font-bold mt-1">● Active</p>}
              </div>
              <div className="text-xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <Icon d={ICONS.booking} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Booking Overview</h3>
                <p className="text-xs text-gray-400">{filtered.length} booking{filtered.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `— ${activeFilter}` : 'across all services'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFilter !== 'All' && <button onClick={() => setActiveFilter('All')} className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100">✕ Clear</button>}
              <button onClick={() => alert('Exporting bookings...')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700">
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
                type="text" 
                placeholder="Search by customer, vendor, service or location..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 bg-gray-50" 
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
                {['Booking ID','Customer','Service','Vendor','Location','Booking Date','Event Date','Amount','Status','Payment','Actions'].map(h => 
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={11} className="px-4 py-12 text-center text-sm text-gray-400">No bookings found for "{activeFilter}" filter. </td></tr>
              ) : filtered.map(b => (
                <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{b.id}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">{b.customer}</td>
                  <td className="px-4 py-3"><span className="text-xs font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded-lg">{b.service}</span></td>
                  <td className="px-4 py-3 text-xs text-gray-600 whitespace-nowrap">{b.vendor}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">{b.location}</td>
                  <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{b.bookingDate}</td>
                  <td className="px-4 py-3 text-xs font-semibold text-gray-700 whitespace-nowrap">{b.eventDate}</td>
                  <td className="px-4 py-3 text-xs font-bold text-gray-800">{b.amount}</td>
                  <td className="px-4 py-3"><BookingBadge status={b.status} /></td>
                  <td className="px-4 py-3"><PaymentBadge status={b.payment} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => alert(`View booking ${b.id}`)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500">
                        <Icon d={ICONS.eye} size={14} />
                      </button>
                      <button onClick={() => alert(`Edit booking ${b.id}`)} className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500">
                        <Icon d={ICONS.edit} size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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