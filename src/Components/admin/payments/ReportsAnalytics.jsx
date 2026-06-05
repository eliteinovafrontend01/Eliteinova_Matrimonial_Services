// src/components/admin/payments/ReportsAnalytics.jsx
import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, ComposedChart, Line, PieChart, Pie, Cell
} from 'recharts';

// Helper function to format currency
const formatCurrency = (amount) => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)}Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)}L`;
  } else if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount}`;
};

// Color System - Professional Admin Dashboard Colors
const colors = {
  primary: '#2563EB',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
  purple: '#8B5CF6',
  info: '#06B6D4',
  indigo: '#6366F1',
  teal: '#14B8A6',
  orange: '#F97316',
  pink: '#EC4899',
  gray: '#6B7280',
  lightGray: '#E5E7EB',
  darkGray: '#111827'
};

// Mock Data
const mockData = {
  revenue: {
    daily: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      revenue: [28500, 42300, 156700, 89200, 34500, 67800, 45200],
      target: [30000, 45000, 120000, 80000, 35000, 60000, 40000]
    },
    weekly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      revenue: [185000, 220000, 198000, 245000],
      target: [200000, 210000, 220000, 230000]
    },
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      revenue: [385000, 402000, 398000, 425000, 445000, 478000, 492000, 510000, 535000, 562000, 588000, 625000],
      target: [380000, 400000, 410000, 420000, 440000, 460000, 480000, 500000, 520000, 550000, 570000, 600000]
    }
  },
  transactions: {
    weekly: [
      { period: 'Week 1', success: 21, failed: 1 },
      { period: 'Week 2', success: 24, failed: 2 },
      { period: 'Week 3', success: 23, failed: 1 },
      { period: 'Week 4', success: 29, failed: 1 }
    ],
    monthly: [
      { period: 'Jan', success: 40, failed: 2 },
      { period: 'Feb', success: 44, failed: 2 },
      { period: 'Mar', success: 42, failed: 2 },
      { period: 'Apr', success: 48, failed: 2 },
      { period: 'May', success: 50, failed: 2 },
      { period: 'Jun', success: 56, failed: 2 }
    ]
  },
  vendorRevenue: [
    { name: 'Grand Palace', revenue: 350000, category: 'Wedding Halls', bookings: 7 },
    { name: 'Premier Catering', revenue: 245000, category: 'Catering', bookings: 11 },
    { name: 'Royal Feast', revenue: 195000, category: 'Catering', bookings: 8 },
    { name: 'ABC Events', revenue: 185000, category: 'Photography', bookings: 9 },
    { name: 'Elite Photography', revenue: 165000, category: 'Photography', bookings: 8 },
    { name: 'Shutter Stories', revenue: 145000, category: 'Photography', bookings: 7 },
    { name: 'XYZ Decor', revenue: 125000, category: 'Decorations', bookings: 7 },
    { name: 'Melody Music', revenue: 98000, category: 'Entertainment', bookings: 6 }
  ],
  paymentMethods: [
    { name: 'UPI', percentage: 44, amount: 385000, color: colors.primary, trend: '+5%' },
    { name: 'Credit Card', percentage: 28, amount: 245000, color: colors.purple, trend: '+2%' },
    { name: 'Debit Card', percentage: 12, amount: 105000, color: colors.info, trend: '-1%' },
    { name: 'Net Banking', percentage: 10, amount: 87500, color: colors.success, trend: '+3%' },
    { name: 'Wallet', percentage: 6, amount: 52500, color: colors.warning, trend: '-2%' }
  ],
  locations: [
    { city: 'Mumbai', revenue: 425000, percentage: 28 },
    { city: 'Delhi', revenue: 385000, percentage: 25 },
    { city: 'Bangalore', revenue: 295000, percentage: 19 },
    { city: 'Chennai', revenue: 185000, percentage: 12 },
    { city: 'Kolkata', revenue: 145000, percentage: 9 },
    { city: 'Others', revenue: 105000, percentage: 7 }
  ],
  trends: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenue: [385000, 402000, 398000, 425000, 445000, 478000, 492000, 510000, 535000, 562000, 588000, 625000],
    customers: [128, 135, 132, 142, 148, 156, 162, 168, 175, 182, 188, 195]
  }
};

// KPI Card Component with Sparkline
const KPICard = ({ title, value, change, icon, color, sparklineData }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</span>
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="flex items-baseline gap-2 mb-2">
      <span className="text-2xl font-bold text-gray-800">{value}</span>
      <span className={`text-xs font-semibold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? `↑ +${change}%` : `↓ ${change}%`}
      </span>
    </div>
    {sparklineData && (
      <ResponsiveContainer width="100%" height={30}>
        <AreaChart data={sparklineData}>
          <Area type="monotone" dataKey="value" stroke={color} fill={`${color}20`} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    )}
  </div>
);

// Date Range Picker
const DateRangePicker = ({ range, setRange }) => (
  <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
    {['week', 'month', 'quarter', 'year'].map(r => (
      <button
        key={r}
        onClick={() => setRange(r)}
        className={`px-4 py-1.5 text-sm rounded-md transition-all ${
          range === r ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'
        }`}
      >
        {r === 'week' ? '📅 This Week' : r === 'month' ? '📆 This Month' : r === 'quarter' ? '📊 Last 3 Months' : '🗓️ This Year'}
      </button>
    ))}
  </div>
);

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <p className="font-semibold">{label}</p>
        {payload.map((p, idx) => (
          <p key={idx} style={{ color: p.color }}>
            {p.name}: {typeof p.value === 'number' ? formatCurrency(p.value) : p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom Label for Pie Chart - optimized for larger size
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  // Shorten names for better fit
  let displayName = name;
  if (name === 'Credit Card') displayName = 'Credit';
  if (name === 'Debit Card') displayName = 'Debit';
  if (name === 'Net Banking') displayName = 'Net Bank';
  
  return (
    <text 
      x={x} 
      y={y} 
      fill={colors.gray}
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize="11"
      fontWeight="500"
    >
      {`${displayName} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Main Component
export const ReportsAnalytics = () => {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('overview');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const getRevenueData = () => {
    switch(dateRange) {
      case 'week': return mockData.revenue.daily;
      case 'month': return mockData.revenue.weekly;
      case 'quarter': return { labels: mockData.revenue.monthly.labels.slice(0, 3), revenue: mockData.revenue.monthly.revenue.slice(0, 3), target: mockData.revenue.monthly.target.slice(0, 3) };
      default: return mockData.revenue.monthly;
    }
  };

  const revenueData = getRevenueData();
  const chartData = revenueData.labels.map((label, i) => ({
    period: label,
    revenue: revenueData.revenue[i],
    target: revenueData.target[i]
  }));

  const transactionData = dateRange === 'month' ? mockData.transactions.monthly : mockData.transactions.weekly;
  const totalRevenue = revenueData.revenue.reduce((a, b) => a + b, 0);
  const totalTransactions = transactionData.reduce((a, b) => a + b.success + b.failed, 0);
  const successRate = Math.round((transactionData.reduce((a, b) => a + b.success, 0) / totalTransactions) * 100);

  const handleExport = (format) => {
    showToastMsg(`Exporting ${reportType} report as ${format.toUpperCase()}`, 'success');
    setShowExportMenu(false);
  };

  return (
    <div className="p-4 md:p-6">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${toast.type === 'success' ? 'bg-green-500' : 'bg-orange-500'} text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <div className="text-4xl">📊</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Reports & Analytics Dashboard</h3>
              <p className="text-sm text-gray-500 mt-0.5">Comprehensive financial reports, revenue summaries, and payment trends</p>
            </div>
          </div>
          <div className="relative">
            <button onClick={() => setShowExportMenu(!showExportMenu)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-semibold">
              📥 Export Report
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-10 overflow-hidden">
                <button onClick={() => handleExport('pdf')} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">📄 PDF</button>
                <button onClick={() => handleExport('excel')} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">📊 Excel</button>
                <button onClick={() => handleExport('csv')} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">📝 CSV</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'overview', label: '📈 Overview' },
            { id: 'revenue', label: '💰 Revenue' },
            { id: 'transactions', label: '🔄 Transactions' },
            { id: 'vendors', label: '🏢 Vendors' },
            { id: 'payments', label: '💳 Payments' },
            { id: 'insights', label: '🎯 Insights' }
          ].map(type => (
            <button key={type.id} onClick={() => setReportType(type.id)}
              className={`px-4 py-1.5 text-sm rounded-md transition-all ${reportType === type.id ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>
              {type.label}
            </button>
          ))}
        </div>
        <DateRangePicker range={dateRange} setRange={setDateRange} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard title="Total Revenue" value={formatCurrency(totalRevenue)} change={12.5} icon="💰" color={colors.primary} 
          sparklineData={mockData.trends.revenue.slice(-6).map((v, i) => ({ name: i, value: v }))} />
        <KPICard title="Transactions" value={totalTransactions} change={8.3} icon="🔄" color={colors.success}
          sparklineData={mockData.trends.customers.slice(-6).map((v, i) => ({ name: i, value: v * 100 }))} />
        <KPICard title="Avg Order Value" value={formatCurrency(Math.round(totalRevenue / totalTransactions))} change={4.2} icon="📊" color={colors.purple} />
        <KPICard title="Success Rate" value={`${successRate}%`} change={2.1} icon="✅" color={colors.success} />
      </div>

      {/* Overview Dashboard */}
      {reportType === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
              <span className="text-2xl">📈</span> Revenue Trend with Target
            </h4>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.lightGray} />
                <XAxis dataKey="period" tick={{ fill: colors.gray, fontSize: 12 }} />
                <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: colors.gray, fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke={colors.primary} fill={`${colors.primary}20`} strokeWidth={2} />
                <Area type="monotone" dataKey="target" name="Target" stroke={colors.warning} fill={`${colors.warning}20`} strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏆</span> Top Vendors by Revenue
              </h4>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockData.vendorRevenue.slice(0, 6)} layout="vertical" margin={{ left: 80 }}>
                  <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: colors.gray, fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" tick={{ fill: colors.gray, fontSize: 11 }} width={100} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="revenue" name="Revenue" fill={colors.indigo} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🌍</span> Revenue by Location
              </h4>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={mockData.locations} layout="vertical" margin={{ left: 80 }}>
                  <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: colors.gray, fontSize: 11 }} />
                  <YAxis type="category" dataKey="city" tick={{ fill: colors.gray, fontSize: 11 }} width={80} />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="revenue" name="Revenue" fill={colors.info} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Revenue Report */}
      {reportType === 'revenue' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
            <span className="text-2xl">💰</span> Revenue Analysis
          </h4>
          <ResponsiveContainer width="100%" height={450}>
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.lightGray} />
              <XAxis dataKey="period" tick={{ fill: colors.gray, fontSize: 12 }} />
              <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: colors.gray, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue" fill={colors.primary} radius={[4, 4, 0, 0]} />
              <Line type="monotone" dataKey="target" name="Target" stroke={colors.warning} strokeWidth={2} strokeDasharray="5 5" dot={{ fill: colors.warning, r: 4 }} />
            </ComposedChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-500">Highest Revenue</p>
              <p className="font-bold text-green-600">{formatCurrency(Math.max(...revenueData.revenue))}</p>
              <p className="text-xs text-gray-500">{revenueData.labels[revenueData.revenue.indexOf(Math.max(...revenueData.revenue))]}</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-xs text-gray-500">Lowest Revenue</p>
              <p className="font-bold text-red-600">{formatCurrency(Math.min(...revenueData.revenue))}</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-500">Average Revenue</p>
              <p className="font-bold text-blue-600">{formatCurrency(Math.round(totalRevenue / revenueData.revenue.length))}</p>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Report */}
      {reportType === 'transactions' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
            <span className="text-2xl">🔄</span> Transaction Analysis
          </h4>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={transactionData}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.lightGray} />
              <XAxis dataKey="period" tick={{ fill: colors.gray, fontSize: 12 }} />
              <YAxis tick={{ fill: colors.gray, fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="success" name="Successful" stackId="a" fill={colors.success} radius={[4, 0, 0, 4]} />
              <Bar dataKey="failed" name="Failed" stackId="a" fill={colors.danger} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Vendors Report */}
      {reportType === 'vendors' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b">
            <h4 className="font-bold text-gray-800 text-lg flex items-center gap-2">
              <span className="text-2xl">🏢</span> Vendor Performance
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Vendor</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-right">Revenue</th>
                  <th className="px-6 py-4 text-right">Bookings</th>
                  <th className="px-6 py-4 text-right">Rating</th>
                </tr>
              </thead>
              <tbody>
                {mockData.vendorRevenue.map(vendor => (
                  <tr key={vendor.name} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">{vendor.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{vendor.category}</td>
                    <td className="px-6 py-4 text-right font-bold text-green-600">{formatCurrency(vendor.revenue)}</td>
                    <td className="px-6 py-4 text-right text-gray-700">{vendor.bookings}</td>
                    <td className="px-6 py-4 text-right"><span className="text-yellow-500">★</span> 4.5</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payments Report - Increased Pie Chart Size */}
      {reportType === 'payments' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">💳</span> Payment Method Distribution
            </h4>
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={450}>
                <PieChart>
                  <Pie
                    data={mockData.paymentMethods}
                    cx="50%"
                    cy="45%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={3}
                    dataKey="percentage"
                    label={renderCustomizedLabel}
                    labelLine={{ stroke: colors.gray, strokeWidth: 1.5 }}
                  >
                    {mockData.paymentMethods.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2.5} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legend below the chart */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 pt-3 border-t border-gray-100">
              {mockData.paymentMethods.map((method, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: method.color }}></div>
                  <span className="text-xs text-gray-600">{method.name}</span>
                  <span className="text-xs font-bold text-gray-800">{method.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span> Payment Method Trends
            </h4>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={mockData.paymentMethods} layout="vertical" margin={{ left: 90 }}>
                <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fill: colors.gray, fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fill: colors.gray, fontSize: 12 }} width={90} />
                <Tooltip formatter={(value) => `${value}%`} />
                <Bar dataKey="percentage" name="Percentage" fill={colors.primary} radius={[0, 4, 4, 0]}>
                  {mockData.paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Insights Report */}
      {reportType === 'insights' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">💡</span> Key Business Insights
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="font-semibold text-gray-800 mb-1">📅 Best Performing Day</p>
                <p className="text-sm text-gray-600">Wednesday generates the highest revenue with <strong>{formatCurrency(156700)}</strong>, 45% above weekly average.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <p className="font-semibold text-gray-800 mb-1">🏆 Top Vendor</p>
                <p className="text-sm text-gray-600">Grand Palace leads with <strong>{formatCurrency(350000)}</strong> revenue, contributing 15% of total platform revenue.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <p className="font-semibold text-gray-800 mb-1">💳 Payment Trend</p>
                <p className="text-sm text-gray-600">UPI has grown to 44% adoption (+9% YoY), becoming the preferred payment method.</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Recommendations
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl">
                <p className="font-semibold text-gray-800 mb-1">🚀 Boost Mid-Week Sales</p>
                <p className="text-sm text-gray-600">Launch "Wednesday Wedding Special" campaign with 5% discount.</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-xl">
                <p className="font-semibold text-gray-800 mb-1">🏢 Vendor Incentive Program</p>
                <p className="text-sm text-gray-600">Top 3 vendors should receive priority support and reduced commission.</p>
              </div>
              <div className="p-4 bg-teal-50 rounded-xl">
                <p className="font-semibold text-gray-800 mb-1">📱 Optimize Mobile Payments</p>
                <p className="text-sm text-gray-600">With 44% UPI usage, enhance mobile checkout experience.</p>
              </div>
            </div>
          </div>
        </div>
      )}

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