import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { PaymentBadge } from '../shared/PaymentBadge';
import { FeatureCard } from '../shared/FeatureCard';
import { ICONS } from '../../../constants/admin/icons';

export const PaymentsTransactionsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const transactionsData = [
    { id: 'TXN001', bookingId: 'BK001', customer: 'Aarav Patel', vendor: 'LensArt Studio', service: 'Photography', amount: '₹45,000', date: '10 Jan 2024', method: 'UPI', status: 'Paid', commission: '₹4,500', payout: '₹40,500' },
    { id: 'TXN002', bookingId: 'BK002', customer: 'Ishita Reddy', vendor: 'Royal Feast', service: 'Catering', amount: '₹1,20,000', date: '20 Feb 2024', method: 'Credit Card', status: 'Partial', commission: '₹6,000', payout: '₹54,000' },
    { id: 'TXN003', bookingId: 'BK003', customer: 'Rohan Deshmukh', vendor: 'Dream Decor', service: 'Decorations', amount: '₹65,000', date: '1 Mar 2024', method: 'Net Banking', status: 'Pending', commission: '₹0', payout: '₹0' },
    { id: 'TXN004', bookingId: 'BK004', customer: 'Neha Gupta', vendor: 'Grand Palace', service: 'Wedding Halls', amount: '₹3,50,000', date: '5 Apr 2024', method: 'UPI', status: 'Paid', commission: '₹35,000', payout: '₹3,15,000' },
    { id: 'TXN005', bookingId: 'BK005', customer: 'Vikram Singh', vendor: 'Glam Studio', service: 'Bridal Styling', amount: '₹18,000', date: '12 Apr 2024', method: 'PhonePe', status: 'Refunded', commission: '₹0', payout: '₹0' },
    { id: 'TXN006', bookingId: 'BK006', customer: 'Meera Nair', vendor: 'Shutter Stories', service: 'Photography', amount: '₹55,000', date: '18 Apr 2024', method: 'Credit Card', status: 'Paid', commission: '₹5,500', payout: '₹49,500' },
    { id: 'TXN007', bookingId: 'BK007', customer: 'Arjun Mehta', vendor: 'DJ Rhythm Pro', service: 'Entertainment', amount: '₹30,000', date: '22 Apr 2024', method: 'Google Pay', status: 'Pending', commission: '₹0', payout: '₹0' },
    { id: 'TXN008', bookingId: 'BK008', customer: 'Priya Sharma', vendor: "Nawab's Kitchen", service: 'Catering', amount: '₹2,10,000', date: '28 Apr 2024', method: 'Net Banking', status: 'Partial', commission: '₹10,500', payout: '₹1,89,000' },
  ];

  const statCards = [
    { label: 'Total Revenue', value: '₹8,93,000', icon: '💰', color: 'border-green-400', filter: 'All' },
    { label: 'Commission Earned', value: '₹61,500', icon: '🏦', color: 'border-blue-400', filter: 'All' },
    { label: 'Pending', value: '₹95,000', icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Paid', value: '₹7,80,000', icon: '✅', color: 'border-emerald-400', filter: 'Paid' },
    { label: 'Refunded', value: '₹18,000', icon: '🔄', color: 'border-red-400', filter: 'Refunded' },
  ];

  const filtered = transactionsData.filter(t => {
    const matchStatus = activeFilter === 'All' || t.status === activeFilter;
    const matchSearch = !search || 
      t.customer.toLowerCase().includes(search.toLowerCase()) || 
      t.vendor.toLowerCase().includes(search.toLowerCase()) ||
      t.bookingId.toLowerCase().includes(search.toLowerCase()) ||
      t.service.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const featureCards = [
    { emoji: '💳', title: 'Multiple Payment Methods', accentColor: 'bg-purple-50', points: ['UPI (Google Pay, PhonePe)', 'Credit/Debit Cards', 'Net Banking', 'Digital Wallets'] },
    { emoji: '🏦', title: 'Vendor Payout Management', accentColor: 'bg-blue-50', points: ['Manage vendor payments', 'Commission deduction tracking', 'Payout schedule management', 'Real-time payout status'] },
    { emoji: '📊', title: 'Commission Tracking', accentColor: 'bg-green-50', points: ['Auto-calculate platform commission', 'Track per transaction', 'Generate commission reports', 'Revenue analytics'] },
    { emoji: '🔒', title: 'Fraud Detection & Security', accentColor: 'bg-red-50', points: ['Monitor suspicious transactions', 'Secure payment processing', 'Payment gateway integration', 'Transaction audit logs'] }
  ];

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">💰</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Payments & Transactions</h3>
            <p className="text-sm text-gray-500 mt-0.5">Track all payments, vendor payouts, commissions and transaction history</p>
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
                <p className="text-xl font-bold text-gray-800">{s.value}</p>
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
                <Icon d={ICONS.payments} size={18} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">Transaction Overview</h3>
                <p className="text-xs text-gray-400">{filtered.length} transaction{filtered.length !== 1 ? 's' : ''} {activeFilter !== 'All' ? `— ${activeFilter}` : 'all transactions'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeFilter !== 'All' && <button onClick={() => setActiveFilter('All')} className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100">✕ Clear</button>}
              <button onClick={() => alert('Exporting transactions...')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700">
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
                placeholder="Search by customer, vendor, service or booking ID..." 
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 bg-gray-50" 
              />
            </div>
            {['All','Paid','Pending','Partial','Refunded'].map(f => (
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
                {['TXN ID','Booking ID','Customer','Vendor','Service','Amount','Date','Method','Status','Commission','Payout','Actions'].map(h => 
                  <th key={h} className="px-3 py-3 text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={12} className="px-4 py-12 text-center text-sm text-gray-400">No transactions found for "{activeFilter}" filter. </td></tr>
              ) : filtered.map(t => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-3 text-xs font-mono text-gray-500">{t.id}</td>
                  <td className="px-3 py-3 text-xs font-mono text-gray-500">{t.bookingId}</td>
                  <td className="px-3 py-3 text-sm font-semibold text-gray-700 whitespace-nowrap">{t.customer}</td>
                  <td className="px-3 py-3 text-xs text-gray-600 whitespace-nowrap">{t.vendor}</td>
                  <td className="px-3 py-3"><span className="text-xs font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded-lg">{t.service}</span></td>
                  <td className="px-3 py-3 text-xs font-bold text-gray-800">{t.amount}</td>
                  <td className="px-3 py-3 text-xs text-gray-400 whitespace-nowrap">{t.date}</td>
                  <td className="px-3 py-3 text-xs text-gray-600">{t.method}</td>
                  <td className="px-3 py-3"><PaymentBadge status={t.status} /></td>
                  <td className="px-3 py-3 text-xs text-green-600 font-semibold">{t.commission}</td>
                  <td className="px-3 py-3 text-xs font-semibold text-gray-700">{t.payout}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => alert(`View transaction ${t.id}`)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500">
                        <Icon d={ICONS.eye} size={14} />
                      </button>
                      <button onClick={() => alert(`Receipt for ${t.id}`)} className="p-1.5 rounded-lg hover:bg-green-50 text-green-500">
                        <Icon d={ICONS.download} size={14} />
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