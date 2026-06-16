// src/components/admin/analytics/RevenueFinancialReports.jsx
import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ComposedChart
} from 'recharts';

// Professional Financial Color Palette
const financeTheme = {
  revenue: '#10B981',      // Emerald
  commission: '#2563EB',   // Blue
  payouts: '#8B5CF6',      // Purple
  pending: '#EF4444',      // Red
  processing: '#F59E0B',   // Amber
  growth: '#14B8A6',       // Teal
  upi: '#10B981',          // Green
  card: '#2563EB',         // Blue
  netbanking: '#8B5CF6',   // Purple
  wallet: '#F59E0B',       // Amber
  grid: '#E5E7EB',
  text: '#6B7280',
  white: '#FFFFFF'
};

// Revenue category gradient (Emerald)
const revenueGradient = [
  '#065F46',
  '#047857',
  '#059669',
  '#10B981',
  '#34D399',
  '#6EE7B7'
];

// Commission gradient (Blue)
const commissionGradient = [
  '#1D4ED8',
  '#2563EB',
  '#3B82F6',
  '#60A5FA',
  '#93C5FD'
];

const formatCurrency = (amount) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
};

const mockData = {
  revenue: {
    monthly: [
      { month: 'Jan', revenue: 385000, commission: 57750, payout: 327250 },
      { month: 'Feb', revenue: 402000, commission: 60300, payout: 341700 },
      { month: 'Mar', revenue: 398000, commission: 59700, payout: 338300 },
      { month: 'Apr', revenue: 425000, commission: 63750, payout: 361250 },
      { month: 'May', revenue: 445000, commission: 66750, payout: 378250 },
      { month: 'Jun', revenue: 478000, commission: 71700, payout: 406300 },
    ],
    commissionRate: 15,
  },
  revenueGrowth: [
    { month: 'Jan', growth: 5.2 },
    { month: 'Feb', growth: 8.1 },
    { month: 'Mar', growth: 3.4 },
    { month: 'Apr', growth: 12.8 },
    { month: 'May', growth: 9.5 },
    { month: 'Jun', growth: 15.2 },
  ],
  paymentTrends: [
    { month: 'Jan', upi: 125000, card: 158000, netbanking: 62000, wallet: 40000 },
    { month: 'Feb', upi: 142000, card: 165000, netbanking: 58000, wallet: 37000 },
    { month: 'Mar', upi: 158000, card: 162000, netbanking: 55000, wallet: 23000 },
    { month: 'Apr', upi: 178000, card: 168000, netbanking: 52000, wallet: 27000 },
    { month: 'May', upi: 195000, card: 172000, netbanking: 50000, wallet: 28000 },
    { month: 'Jun', upi: 215000, card: 178000, netbanking: 48000, wallet: 37000 },
  ],
  vendorPayouts: [
    { name: 'Grand Palace', amount: 361250, commission: 63750, status: 'Paid', date: '2024-06-15' },
    { name: 'Premier Catering', amount: 327250, commission: 57750, status: 'Paid', date: '2024-06-14' },
    { name: 'Elite Photography', amount: 253300, commission: 44700, status: 'Pending', date: '2024-06-20' },
    { name: 'Royal Feast', amount: 233750, commission: 41250, status: 'Paid', date: '2024-06-13' },
    { name: 'Dream Decor', amount: 208250, commission: 36750, status: 'Processing', date: '2024-06-18' },
  ],
  topVendorPayouts: [
    { name: 'Grand Palace', amount: 361250 },
    { name: 'Premier Catering', amount: 327250 },
    { name: 'Elite Photography', amount: 253300 },
    { name: 'Royal Feast', amount: 233750 },
    { name: 'Dream Decor', amount: 208250 },
  ],
  revenueByCategory: [
    { name: 'Wedding Halls', revenue: 1425000, commission: 213750, percentage: 34 },
    { name: 'Catering', revenue: 985000, commission: 147750, percentage: 23.5 },
    { name: 'Photography', revenue: 725000, commission: 108750, percentage: 17.3 },
    { name: 'Decorations', revenue: 485000, commission: 72750, percentage: 11.6 },
    { name: 'Entertainment', revenue: 365000, commission: 54750, percentage: 8.7 },
    { name: 'Others', revenue: 195000, commission: 29250, percentage: 4.7 },
  ],
  summary: {
    totalRevenue: 2533000,
    totalCommission: 379950,
    totalPayout: 2153050,
    avgOrderValue: 12450,
    pendingPayouts: 485000,
  }
};

// Custom Stat Card with financial colors
const StatCard = ({ title, value, subtitle, icon, color, trend }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</span>
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
    {trend && (
      <div className={`text-xs font-semibold mt-2 ${trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {trend >= 0 ? `↑ +${trend}%` : `↓ ${Math.abs(trend)}%`}
      </div>
    )}
    <div className="w-full bg-gray-100 rounded-full h-1 mt-3">
      <div className="h-1 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, Math.abs(trend || 0))}%`, backgroundColor: color }}></div>
    </div>
  </div>
);

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p, idx) => (
          <p key={idx} style={{ color: p.color }}>
            {p.name}: {p.dataKey === 'revenue' || p.dataKey === 'commission' || p.dataKey === 'payout' || p.dataKey === 'amount' 
              ? formatCurrency(p.value) 
              : p.dataKey === 'growth' 
                ? `${p.value}%` 
                : p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const RevenueFinancialReports = () => {
  const [viewType, setViewType] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-5 border border-emerald-200">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Revenue & Financial Reports</h3>
            <p className="text-sm text-gray-500 mt-1">Analyze financial data including revenue, commission, and payouts</p>
          </div>
          <div className="flex gap-2 bg-white rounded-lg p-1">
            {['overview', 'commission', 'payouts'].map(type => (
              <button 
                key={type} 
                onClick={() => setViewType(type)} 
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  viewType === type ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {type === 'overview' ? '📊 Overview' : type === 'commission' ? '💰 Commission' : '💸 Payouts'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Revenue" 
          value={formatCurrency(mockData.summary.totalRevenue)} 
          subtitle="Platform earnings" 
          icon="💰" 
          color={financeTheme.revenue} 
          trend={15.2} 
        />
        <StatCard 
          title="Commission Earned" 
          value={formatCurrency(mockData.summary.totalCommission)} 
          subtitle={`@ ${mockData.revenue.commissionRate}% rate`} 
          icon="📈" 
          color={financeTheme.commission} 
          trend={12.8} 
        />
        <StatCard 
          title="Vendor Payouts" 
          value={formatCurrency(mockData.summary.totalPayout)} 
          subtitle="Total paid to vendors" 
          icon="💸" 
          color={financeTheme.payouts} 
          trend={18.3} 
        />
        <StatCard 
          title="Pending Payouts" 
          value={formatCurrency(mockData.summary.pendingPayouts)} 
          subtitle="Awaiting processing" 
          icon="⏳" 
          color={financeTheme.pending} 
          trend={-5.2} 
        />
      </div>

      {viewType === 'overview' && (
        <>
          {/* Revenue Trend Analysis - Area + Lines */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <span className="text-xl">📈</span> Revenue Trend Analysis
              </h4>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: financeTheme.revenue }}></div>
                  <span className="text-gray-500">Revenue (Area)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: financeTheme.commission }}></div>
                  <span className="text-gray-500">Commission</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: financeTheme.payouts }}></div>
                  <span className="text-gray-500">Payout</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={380}>
              <ComposedChart data={mockData.revenue.monthly} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={financeTheme.revenue} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={financeTheme.revenue} stopOpacity={0.02}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={financeTheme.grid} />
                <XAxis dataKey="month" tick={{ fill: financeTheme.text, fontSize: 12 }} />
                <YAxis yAxisId="left" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: financeTheme.text, fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: financeTheme.text, fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area yAxisId="left" type="monotone" dataKey="revenue" name="Total Revenue" stroke={financeTheme.revenue} strokeWidth={2} fill="url(#revenueGradient)" />
                <Line yAxisId="right" type="monotone" dataKey="commission" name="Commission" stroke={financeTheme.commission} strokeWidth={3} dot={{ r: 5, fill: financeTheme.commission }} />
                <Line yAxisId="right" type="monotone" dataKey="payout" name="Vendor Payout" stroke={financeTheme.payouts} strokeWidth={3} dot={{ r: 5, fill: financeTheme.payouts }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Growth Trend */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">📊</span> Revenue Growth Rate
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockData.revenueGrowth} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={financeTheme.grid} />
                <XAxis dataKey="month" tick={{ fill: financeTheme.text, fontSize: 12 }} />
                <YAxis tickFormatter={(v) => `${v}%`} tick={{ fill: financeTheme.text, fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="growth" name="Revenue Growth" stroke={financeTheme.growth} strokeWidth={3} dot={{ r: 6, fill: financeTheme.growth }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue by Category - Horizontal Bar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">🏷️</span> Revenue by Category
              </h4>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={mockData.revenueByCategory} layout="vertical" margin={{ left: 110, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={financeTheme.grid} />
                  <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: financeTheme.text, fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={110} tick={{ fill: financeTheme.text, fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" name="Revenue" radius={[0, 4, 4, 0]}>
                    {mockData.revenueByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={revenueGradient[index % revenueGradient.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue vs Commission by Category */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">💳</span> Revenue vs Commission by Category
              </h4>
              <div className="flex justify-end gap-4 mb-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: financeTheme.revenue }}></div>
                  <span className="text-gray-500">Revenue</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: financeTheme.commission }}></div>
                  <span className="text-gray-500">Commission</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={mockData.revenueByCategory.slice(0, 5)} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={financeTheme.grid} />
                  <XAxis dataKey="name" tick={{ fill: financeTheme.text, fontSize: 11, angle: -15, textAnchor: 'end' }} height={60} />
                  <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: financeTheme.text, fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="revenue" name="Revenue" fill={financeTheme.revenue} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="commission" name="Commission" fill={financeTheme.commission} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {viewType === 'commission' && (
        <>
          {/* Payment Method Trends */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <span className="text-xl">💳</span> Payment Method Trends
              </h4>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: financeTheme.upi }}></div>
                  <span className="text-gray-500">UPI</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: financeTheme.card }}></div>
                  <span className="text-gray-500">Card</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: financeTheme.netbanking }}></div>
                  <span className="text-gray-500">Net Banking</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: financeTheme.wallet }}></div>
                  <span className="text-gray-500">Wallet</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={380}>
              <AreaChart data={mockData.paymentTrends} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={financeTheme.grid} />
                <XAxis dataKey="month" tick={{ fill: financeTheme.text, fontSize: 12 }} />
                <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: financeTheme.text, fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="upi" name="UPI" stackId="1" stroke={financeTheme.upi} fill={`${financeTheme.upi}30`} />
                <Area type="monotone" dataKey="card" name="Credit/Debit Card" stackId="1" stroke={financeTheme.card} fill={`${financeTheme.card}30`} />
                <Area type="monotone" dataKey="netbanking" name="Net Banking" stackId="1" stroke={financeTheme.netbanking} fill={`${financeTheme.netbanking}30`} />
                <Area type="monotone" dataKey="wallet" name="Wallet" stackId="1" stroke={financeTheme.wallet} fill={`${financeTheme.wallet}30`} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Commission Breakdown by Category */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">💰</span> Commission Breakdown by Category
            </h4>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={mockData.revenueByCategory} layout="vertical" margin={{ left: 110, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={financeTheme.grid} />
                <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: financeTheme.text, fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={110} tick={{ fill: financeTheme.text, fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="commission" name="Commission Earned" radius={[0, 4, 4, 0]}>
                  {mockData.revenueByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={commissionGradient[index % commissionGradient.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {viewType === 'payouts' && (
        <>
          {/* Top Vendor Payouts */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">🏆</span> Top Vendor Payouts
            </h4>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={mockData.topVendorPayouts} layout="vertical" margin={{ left: 130, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={financeTheme.grid} />
                <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: financeTheme.text, fontSize: 11 }} />
                <YAxis type="category" dataKey="name" width={130} tick={{ fill: financeTheme.text, fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="amount" name="Payout Amount" fill={financeTheme.payouts} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Vendor Payouts Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <span className="text-xl">📋</span> Vendor Payout Schedule
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <th className="px-5 py-3">Vendor</th>
                    <th className="px-5 py-3 text-right">Payout Amount</th>
                    <th className="px-5 py-3 text-right">Commission</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Expected Date</th>
                    <th className="px-5 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.vendorPayouts.map((vendor, idx) => (
                    <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 font-semibold text-gray-800">{vendor.name}</td>
                      <td className="px-5 py-3 text-right font-bold text-green-600">{formatCurrency(vendor.amount)}</td>
                      <td className="px-5 py-3 text-right text-gray-600">{formatCurrency(vendor.commission)}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          vendor.status === 'Paid' ? 'bg-green-100 text-green-700' :
                          vendor.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}>{vendor.status}</span>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-500">{vendor.date}</td>
                      <td className="px-5 py-3">
                        <button className="text-red-600 text-sm hover:text-red-700 font-medium transition-colors">View Details →</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payout Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-xl p-5 text-center border border-green-200">
              <p className="text-xs text-gray-500 mb-1">Total Paid</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(mockData.summary.totalPayout - mockData.summary.pendingPayouts)}</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-5 text-center border border-yellow-200">
              <p className="text-xs text-gray-500 mb-1">Processing</p>
              <p className="text-2xl font-bold text-yellow-600">{formatCurrency(195000)}</p>
            </div>
            <div className="bg-red-50 rounded-xl p-5 text-center border border-red-200">
              <p className="text-xs text-gray-500 mb-1">Pending</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(mockData.summary.pendingPayouts - 195000)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};