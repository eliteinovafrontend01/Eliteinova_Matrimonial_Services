// src/components/admin/payments/SearchFiltersPayments.jsx
import { useState, useMemo, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { PaymentBadge } from '../shared/PaymentBadge';
import { ICONS } from '../../../constants/admin/icons';

// Helper function to format currency with appropriate units
const formatCurrency = (amount) => {
  if (amount >= 10000000) { // 1 Crore = 10,000,000
    return `₹${(amount / 10000000).toFixed(2)}Cr`;
  } else if (amount >= 100000) { // 1 Lakh = 100,000
    return `₹${(amount / 100000).toFixed(2)}L`;
  } else if (amount >= 1000) { // 1 Thousand = 1,000
    return `₹${(amount / 1000).toFixed(1)}K`;
  } else {
    return `₹${amount}`;
  }
};

const mockData = [
  { id: 'TXN1001', bookingId: 'BKG001', customer: 'Priya Sharma', amount: 25000, status: 'Paid', date: '2024-01-15', method: 'UPI', vendor: 'ABC Events' },
  { id: 'TXN1002', bookingId: 'BKG002', customer: 'Amit Patel', amount: 45000, status: 'Pending', date: '2024-01-16', method: 'Credit Card', vendor: 'Premier Catering' },
  { id: 'TXN1003', bookingId: 'BKG003', customer: 'Neha Gupta', amount: 150000, status: 'Failed', date: '2024-01-14', method: 'Net Banking', vendor: 'Grand Palace' },
  { id: 'TXN1004', bookingId: 'BKG004', customer: 'Rajesh Kumar', amount: 35000, status: 'Refunded', date: '2024-01-13', method: 'Wallet', vendor: 'XYZ Decor' },
  { id: 'TXN1005', bookingId: 'BKG005', customer: 'Sneha Reddy', amount: 28000, status: 'Partially Paid', date: '2024-01-12', method: 'UPI', vendor: 'Melody Music' },
  { id: 'TXN1006', bookingId: 'BKG006', customer: 'Vikram Singh', amount: 75000, status: 'Paid', date: '2024-01-11', method: 'Credit Card', vendor: 'Elite Photography' },
  { id: 'TXN1007', bookingId: 'BKG007', customer: 'Anjali Desai', amount: 120000, status: 'Paid', date: '2024-01-10', method: 'Net Banking', vendor: 'Royal Wedding Halls' },
  { id: 'TXN1008', bookingId: 'BKG008', customer: 'Rahul Mehta', amount: 85000, status: 'Pending', date: '2024-01-09', method: 'UPI', vendor: 'Dream Planners' },
  { id: 'TXN1009', bookingId: 'BKG009', customer: 'Kavita Singh', amount: 95000, status: 'Paid', date: '2024-01-08', method: 'Credit Card', vendor: 'ABC Events' },
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
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => { 
    setIsLoading(true);
    setTimeout(() => { 
      setData(mockData); 
      setIsLoading(false);
    }, 500); 
  }, []);

  const showToastMsg = (message, type = 'success') => { 
    setToast({ show: true, message, type }); 
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); 
  };

  const filtered = useMemo(() => {
    return data.filter(item => {
      if (filters.search && !item.customer.toLowerCase().includes(filters.search.toLowerCase()) && 
          !item.bookingId.toLowerCase().includes(filters.search.toLowerCase()) && 
          !item.id.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.status !== 'All' && item.status !== filters.status) return false;
      if (filters.method !== 'All' && item.method !== filters.method) return false;
      if (filters.vendor && item.vendor !== filters.vendor) return false;
      if (filters.dateFrom && item.date < filters.dateFrom) return false;
      if (filters.dateTo && item.date > filters.dateTo) return false;
      if (filters.minAmount && item.amount < parseFloat(filters.minAmount)) return false;
      if (filters.maxAmount && item.amount > parseFloat(filters.maxAmount)) return false;
      return true;
    });
  }, [data, filters]);

  const clearFilters = () => { 
    setFilters({ search: '', status: 'All', method: 'All', dateFrom: '', dateTo: '', minAmount: '', maxAmount: '', vendor: '' }); 
    showToastMsg('All filters cleared', 'success');
  };

  const hasActiveFilters = filters.search || filters.status !== 'All' || filters.method !== 'All' || 
                          filters.dateFrom || filters.dateTo || filters.minAmount || filters.maxAmount || filters.vendor;

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
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 'bg-orange-500'
          } text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔍</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Search & Filters</h3>
            <p className="text-sm text-gray-500 mt-0.5">Easily filter transactions by date, payment status, vendor, or booking ID</p>
          </div>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-blue-400 transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Matching Transactions</p>
              <p className="text-2xl font-bold text-gray-800">{stats.count}</p>
              <p className="text-xs text-gray-400 mt-1">out of {data.length} total</p>
            </div>
            <div className="text-2xl">📊</div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-green-400 transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Total Amount</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.totalAmount)}</p>
            </div>
            <div className="text-2xl">💰</div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-purple-400 transition-all hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Average Amount</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(stats.avgAmount)}</p>
            </div>
            <div className="text-2xl">📈</div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-100 flex items-center justify-center text-cyan-600">
              ⚙️
            </div>
            <h4 className="font-bold text-gray-800">Advanced Filters</h4>
            {hasActiveFilters && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">
                {filtered.length} results
              </span>
            )}
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)} 
            className="text-sm text-red-600 hover:text-red-700 font-semibold transition-colors"
          >
            {showFilters ? 'Hide Filters ▲' : 'Show Filters ▼'}
          </button>
        </div>
        
        {showFilters && (
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">🔎 Search</label>
                <input 
                  type="text" 
                  placeholder="Customer, Booking ID, TXN ID" 
                  value={filters.search} 
                  onChange={(e) => setFilters({...filters, search: e.target.value})} 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">📊 Payment Status</label>
                <select 
                  value={filters.status} 
                  onChange={(e) => setFilters({...filters, status: e.target.value})} 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
                >
                  {statuses.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">💳 Payment Method</label>
                <select 
                  value={filters.method} 
                  onChange={(e) => setFilters({...filters, method: e.target.value})} 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
                >
                  {methods.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">🏢 Vendor</label>
                <select 
                  value={filters.vendor} 
                  onChange={(e) => setFilters({...filters, vendor: e.target.value})} 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
                >
                  <option value="">All Vendors</option>
                  {vendors.filter(v => v !== 'All').map(v => <option key={v}>{v}</option>)}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">📅 Date From</label>
                <input 
                  type="date" 
                  value={filters.dateFrom} 
                  onChange={(e) => setFilters({...filters, dateFrom: e.target.value})} 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">📅 Date To</label>
                <input 
                  type="date" 
                  value={filters.dateTo} 
                  onChange={(e) => setFilters({...filters, dateTo: e.target.value})} 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">💰 Min Amount</label>
                <input 
                  type="number" 
                  placeholder="Min ₹" 
                  value={filters.minAmount} 
                  onChange={(e) => setFilters({...filters, minAmount: e.target.value})} 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">💰 Max Amount</label>
                <input 
                  type="number" 
                  placeholder="Max ₹" 
                  value={filters.maxAmount} 
                  onChange={(e) => setFilters({...filters, maxAmount: e.target.value})} 
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
              <button 
                onClick={clearFilters} 
                className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors text-sm font-semibold"
              >
                Clear All Filters
              </button>
              <button 
                onClick={() => showToastMsg(`Found ${filtered.length} matching transactions`)} 
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
              <Icon d={ICONS.search} size={16} />
            </div>
            <p className="text-sm text-gray-600">
              Showing <span className="font-bold text-gray-800">{filtered.length}</span> of <span className="font-bold text-gray-800">{data.length}</span> transactions
            </p>
          </div>
          {hasActiveFilters && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">Filtered results</span>
          )}
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Transaction ID</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Booking</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Customer</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Amount</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Method</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Date</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Vendor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{t.id}</td>
                  <td className="px-4 py-3 text-xs font-mono text-gray-500">{t.bookingId}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center text-white text-[10px] font-bold">
                        {t.customer.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{t.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-gray-800">{formatCurrency(t.amount)}</td>
                  <td className="px-4 py-3"><PaymentBadge status={t.status} /></td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-lg">{t.method}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{t.date}</td>
                  <td className="px-4 py-3 text-xs text-gray-600">{t.vendor}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    <div className="text-4xl mb-2">🔍</div>
                    <p>No transactions match your filters.</p>
                    <p className="text-xs mt-1">Try adjusting your search criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
            <div className="flex flex-wrap justify-between items-center gap-2 text-xs">
              <div className="flex gap-4">
                <span className="text-gray-500">
                  Total: <span className="font-semibold text-gray-800">{formatCurrency(stats.totalAmount)}</span>
                </span>
                <span className="text-gray-500">
                  Average: <span className="font-semibold text-gray-800">{formatCurrency(stats.avgAmount)}</span>
                </span>
              </div>
              <span className="text-gray-400">
                Last updated: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};