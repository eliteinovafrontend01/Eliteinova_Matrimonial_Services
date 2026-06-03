// src/components/admin/payments/SearchFiltersPayments.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { PaymentBadge } from '../shared/PaymentBadge';
import { ICONS } from '../../../constants/admin/icons';

const mockData = [
  { id: 'TXN1001', bookingId: 'BKG001', customer: 'Priya Sharma', amount: 25000, status: 'Paid', date: '2024-01-15', method: 'UPI', vendor: 'ABC Events' },
  { id: 'TXN1002', bookingId: 'BKG002', customer: 'Amit Patel', amount: 45000, status: 'Pending', date: '2024-01-16', method: 'Credit Card', vendor: 'Premier Catering' },
  { id: 'TXN1003', bookingId: 'BKG003', customer: 'Neha Gupta', amount: 150000, status: 'Failed', date: '2024-01-14', method: 'Net Banking', vendor: 'Grand Palace' },
  { id: 'TXN1004', bookingId: 'BKG004', customer: 'Rajesh Kumar', amount: 35000, status: 'Refunded', date: '2024-01-13', method: 'Wallet', vendor: 'XYZ Decor' },
  { id: 'TXN1005', bookingId: 'BKG005', customer: 'Sneha Reddy', amount: 28000, status: 'Partially Paid', date: '2024-01-12', method: 'UPI', vendor: 'Melody Music' },
  { id: 'TXN1006', bookingId: 'BKG006', customer: 'Vikram Singh', amount: 75000, status: 'Paid', date: '2024-01-11', method: 'Credit Card', vendor: 'Elite Photography' },
  { id: 'TXN1007', bookingId: 'BKG007', customer: 'Anjali Desai', amount: 120000, status: 'Paid', date: '2024-01-10', method: 'Net Banking', vendor: 'Royal Wedding Halls' },
];

export const SearchFiltersPayments = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({ 
    search: '', 
    status: 'All', 
    method: 'All', 
    dateFrom: '', 
    dateTo: '', 
    minAmount: '', 
    maxAmount: '',
    vendor: ''
  });
  const [showFilters, setShowFilters] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => { 
    setIsLoading(true);
    setTimeout(() => { 
      setData(mockData); 
      setIsLoading(false);
    }, 500); 
  }, []);

  const showToastMsg = (msg) => { 
    setToast({ show: true, message: msg }); 
    setTimeout(() => setToast({ show: false, message: '' }), 3000); 
  };

  const filtered = useMemo(() => {
    return data.filter(item => {
      if (filters.search && !item.customer.toLowerCase().includes(filters.search.toLowerCase()) && !item.bookingId.toLowerCase().includes(filters.search.toLowerCase()) && !item.id.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.status !== 'All' && item.status !== filters.status) return false;
      if (filters.method !== 'All' && item.method !== filters.method) return false;
      if (filters.vendor && !item.vendor.toLowerCase().includes(filters.vendor.toLowerCase())) return false;
      if (filters.dateFrom && item.date < filters.dateFrom) return false;
      if (filters.dateTo && item.date > filters.dateTo) return false;
      if (filters.minAmount && item.amount < parseFloat(filters.minAmount)) return false;
      if (filters.maxAmount && item.amount > parseFloat(filters.maxAmount)) return false;
      return true;
    });
  }, [data, filters]);

  const clearFilters = () => { 
    setFilters({ search: '', status: 'All', method: 'All', dateFrom: '', dateTo: '', minAmount: '', maxAmount: '', vendor: '' }); 
    showToastMsg('All filters cleared');
  };

  const hasActiveFilters = filters.search || filters.status !== 'All' || filters.method !== 'All' || filters.dateFrom || filters.dateTo || filters.minAmount || filters.maxAmount || filters.vendor;

  const statuses = ['All', 'Paid', 'Pending', 'Failed', 'Refunded', 'Partially Paid'];
  const methods = ['All', 'UPI', 'Credit Card', 'Net Banking', 'Wallet'];
  const vendors = ['All', ...new Set(data.map(d => d.vendor))];

  const getTotalStats = () => ({
    totalAmount: filtered.reduce((sum, t) => sum + t.amount, 0),
    avgAmount: filtered.length ? Math.round(filtered.reduce((sum, t) => sum + t.amount, 0) / filtered.length) : 0,
    count: filtered.length
  });

  const stats = getTotalStats();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div>
      {toast.show && <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-slide-in">{toast.message}</div>}

      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔍</div>
          <div><h3 className="text-xl font-bold">Search & Filters</h3><p className="text-sm text-gray-500">Easily filter transactions by date, payment status, vendor, or booking ID</p></div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center"><p className="text-xs text-gray-400">Matching Transactions</p><p className="text-2xl font-bold">{stats.count}</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center"><p className="text-xs text-gray-400">Total Amount</p><p className="text-2xl font-bold">₹{(stats.totalAmount / 1000).toFixed(0)}K</p></div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center"><p className="text-xs text-gray-400">Average Amount</p><p className="text-2xl font-bold">₹{stats.avgAmount.toLocaleString()}</p></div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border mb-6">
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-3"><span className="text-lg">⚙️</span><h4 className="font-semibold">Advanced Filters</h4>{hasActiveFilters && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">{filtered.length} results</span>}</div>
          <button onClick={() => setShowFilters(!showFilters)} className="text-sm text-red-600 hover:text-red-700">{showFilters ? 'Hide Filters ▲' : 'Show Filters ▼'}</button>
        </div>
        
        {showFilters && (
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div><label className="block text-sm font-semibold mb-1">🔎 Search</label><input type="text" placeholder="Customer, Booking ID, TXN ID" value={filters.search} onChange={(e) => setFilters({...filters, search: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300" /></div>
              <div><label className="block text-sm font-semibold mb-1">📊 Payment Status</label><select value={filters.status} onChange={(e) => setFilters({...filters, status: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100">{statuses.map(s => <option key={s}>{s}</option>)}</select></div>
              <div><label className="block text-sm font-semibold mb-1">💳 Payment Method</label><select value={filters.method} onChange={(e) => setFilters({...filters, method: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg">{methods.map(m => <option key={m}>{m}</option>)}</select></div>
              <div><label className="block text-sm font-semibold mb-1">🏢 Vendor</label><select value={filters.vendor} onChange={(e) => setFilters({...filters, vendor: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg"><option value="">All Vendors</option>{vendors.filter(v => v !== 'All').map(v => <option key={v}>{v}</option>)}</select></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div><label className="block text-sm font-semibold mb-1">📅 Date From</label><input type="date" value={filters.dateFrom} onChange={(e) => setFilters({...filters, dateFrom: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg" /></div>
              <div><label className="block text-sm font-semibold mb-1">📅 Date To</label><input type="date" value={filters.dateTo} onChange={(e) => setFilters({...filters, dateTo: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg" /></div>
              <div><label className="block text-sm font-semibold mb-1">💰 Min Amount (₹)</label><input type="number" placeholder="Min ₹" value={filters.minAmount} onChange={(e) => setFilters({...filters, minAmount: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg" /></div>
              <div><label className="block text-sm font-semibold mb-1">💰 Max Amount (₹)</label><input type="number" placeholder="Max ₹" value={filters.maxAmount} onChange={(e) => setFilters({...filters, maxAmount: e.target.value})} className="w-full p-2 border border-gray-200 rounded-lg" /></div>
            </div>
            
            <div className="flex justify-end gap-3 pt-2 border-t">
              <button onClick={clearFilters} className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">Clear All Filters</button>
              <button onClick={() => showToastMsg(`Found ${filtered.length} matching transactions`)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Apply Filters</button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
          <p className="text-sm text-gray-600">Showing <span className="font-semibold">{filtered.length}</span> of <span className="font-semibold">{data.length}</span> transactions</p>
          {hasActiveFilters && <span className="text-xs text-gray-400">Filtered results</span>}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {['Transaction ID', 'Booking', 'Customer', 'Amount', 'Status', 'Method', 'Date', 'Vendor'].map(h => <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{t.id}</td>
                  <td className="px-4 py-3 text-xs font-mono">{t.bookingId}</td>
                  <td className="px-4 py-3 text-sm font-semibold text-gray-700">{t.customer}</td>
                  <td className="px-4 py-3 font-bold text-gray-800">₹{t.amount.toLocaleString()}</td>
                  <td className="px-4 py-3"><PaymentBadge status={t.status} /></td>
                  <td className="px-4 py-3 text-xs text-gray-500">{t.method}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">{t.date}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{t.vendor}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="text-center py-12 text-gray-400">No transactions match your filters. Try adjusting your search criteria.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in { animation: slideIn 0.3s ease-out; }
      `}</style>
    </div>
  );
};