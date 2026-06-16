// src/components/admin/analytics/BookingAnalytics.jsx
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ComposedChart } from 'recharts';

// Professional Dashboard Color Palette
const chartColors = {
  primary: '#2563EB',      // Blue - Bookings/Volume
  success: '#10B981',      // Emerald - Revenue/Money
  warning: '#F59E0B',      // Amber - Pending
  danger: '#EF4444',       // Red - Cancelled/Issues
  purple: '#8B5CF6',       // Purple - Growth/Conversion
  cyan: '#06B6D4',         // Cyan - Activity
  indigo: '#6366F1',       // Indigo - Lead Time
  teal: '#14B8A6',         // Teal - Vendors
  pink: '#EC4899',         // Pink - Weekend
  grid: '#E5E7EB',
  text: '#6B7280',
  darkText: '#374151',
  white: '#FFFFFF',
};

// Blue gradient for categories
const categoryColors = [
  '#2563EB',
  '#3B82F6', 
  '#60A5FA',
  '#93C5FD',
  '#BFDBFE'
];

// Day colors (weekend stands out)
const dayColors = {
  'Monday': '#93C5FD',
  'Tuesday': '#60A5FA',
  'Wednesday': '#3B82F6',
  'Thursday': '#2563EB',
  'Friday': '#1D4ED8',
  'Saturday': '#8B5CF6',
  'Sunday': '#EC4899'
};

const formatCurrency = (amount) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
};

const mockData = {
  totalBookings: 3420,
  bookingsByCategory: [
    { name: 'Wedding Halls', value: 1250, revenue: 4250000, percentage: 36.5 },
    { name: 'Catering', value: 980, revenue: 2850000, percentage: 28.7 },
    { name: 'Photography', value: 620, revenue: 1850000, percentage: 18.1 },
    { name: 'Decorations', value: 350, revenue: 980000, percentage: 10.2 },
    { name: 'Entertainment', value: 220, revenue: 650000, percentage: 6.4 },
  ],
  monthlyTrends: [
    { month: 'Jan', bookings: 245, revenue: 2850000, avgValue: 11633 },
    { month: 'Feb', bookings: 268, revenue: 3120000, avgValue: 11642 },
    { month: 'Mar', bookings: 285, revenue: 3450000, avgValue: 12105 },
    { month: 'Apr', bookings: 302, revenue: 3780000, avgValue: 12517 },
    { month: 'May', bookings: 318, revenue: 4120000, avgValue: 12956 },
    { month: 'Jun', bookings: 335, revenue: 4450000, avgValue: 13284 },
  ],
  peakPeriods: {
    days: [
      { day: 'Monday', bookings: 385 },
      { day: 'Tuesday', bookings: 412 },
      { day: 'Wednesday', bookings: 456 },
      { day: 'Thursday', bookings: 425 },
      { day: 'Friday', bookings: 398 },
      { day: 'Saturday', bookings: 678 },
      { day: 'Sunday', bookings: 666 },
    ],
    seasons: [
      { season: 'Winter (Nov-Feb)', bookings: 1245, revenue: 15800000 },
      { season: 'Summer (Mar-Jun)', bookings: 1098, revenue: 14200000 },
      { season: 'Monsoon (Jul-Sep)', bookings: 567, revenue: 7200000 },
      { season: 'Autumn (Oct)', bookings: 510, revenue: 6500000 },
    ],
  },
  bookingStatus: [
    { name: 'Completed', value: 2850, percentage: 83.3 },
    { name: 'Pending', value: 342, percentage: 10.0 },
    { name: 'Cancelled', value: 228, percentage: 6.7 },
  ],
  leadTime: [
    { leadTime: '0-7 days', bookings: 245, percentage: 7.2 },
    { leadTime: '8-30 days', bookings: 856, percentage: 25 },
    { leadTime: '31-60 days', bookings: 1250, percentage: 36.5 },
    { leadTime: '61-90 days', bookings: 720, percentage: 21.1 },
    { leadTime: '90+ days', bookings: 349, percentage: 10.2 },
  ],
  revenueByCategory: [
    { name: 'Wedding Halls', amount: 4250000, percentage: 38 },
    { name: 'Catering', amount: 2850000, percentage: 25.5 },
    { name: 'Photography', amount: 1850000, percentage: 16.5 },
    { name: 'Decorations', amount: 980000, percentage: 8.8 },
    { name: 'Entertainment', amount: 650000, percentage: 5.8 },
  ],
  topVendors: [
    { name: 'Grand Palace', bookings: 42, revenue: 425000, rating: 4.8 },
    { name: 'Premier Catering', bookings: 38, revenue: 385000, rating: 4.7 },
    { name: 'Elite Photography', bookings: 31, revenue: 298000, rating: 4.9 },
    { name: 'Royal Feast', bookings: 28, revenue: 275000, rating: 4.6 },
    { name: 'Dream Decor', bookings: 25, revenue: 245000, rating: 4.7 },
  ],
  conversionFunnel: [
    { stage: 'Enquiry', count: 8450, conversion: 100 },
    { stage: 'Quoted', count: 6750, conversion: 80 },
    { stage: 'Confirmed', count: 4850, conversion: 72 },
    { stage: 'Completed', count: 3420, conversion: 71 },
  ],
  monthlyGrowth: [
    { month: 'Jan', growth: 5.2 },
    { month: 'Feb', growth: 8.1 },
    { month: 'Mar', growth: 6.3 },
    { month: 'Apr', growth: 12.4 },
    { month: 'May', growth: 10.8 },
    { month: 'Jun', growth: 15.2 },
  ],
};

const StatCard = ({ title, value, change, icon }) => (
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</span>
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    {change !== undefined && (
      <div className={`text-xs font-semibold mt-1 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? `↑ +${change}%` : `↓ ${Math.abs(change)}%`}
      </div>
    )}
  </div>
);

// Custom Tooltip for Charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p, idx) => (
          <p key={idx} style={{ color: p.color }}>
            {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
            {p.dataKey === 'percentage' && '%'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Fixed: Proper label renderer for pie charts
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  // Shorten long names
  let displayName = name;
  if (name === 'Wedding Halls') displayName = 'Halls';
  if (name === 'Entertainment') displayName = 'Events';
  
  return (
    <text 
      x={x} 
      y={y} 
      fill="#6B7280"
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize="11"
      fontWeight="500"
    >
      {`${displayName} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Simpler label for inside donut charts
const renderInsideLabel = ({ percent }) => {
  return `${(percent * 100).toFixed(0)}%`;
};

export const BookingAnalytics = () => {
  const [period, setPeriod] = useState('6months');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl p-5 border border-green-200">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Booking Analytics</h3>
            <p className="text-sm text-gray-500 mt-1">Monitor booking trends, category-wise distribution, and peak periods</p>
          </div>
          <div className="flex gap-2 bg-white rounded-lg p-1">
            {['3months', '6months', '1year'].map(p => (
              <button 
                key={p} 
                onClick={() => setPeriod(p)} 
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  period === p ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {p === '3months' ? 'Last 3 Months' : p === '6months' ? 'Last 6 Months' : 'This Year'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard title="Total Bookings" value={mockData.totalBookings.toLocaleString()} change={12.8} icon="📅" />
        <StatCard title="Avg Order Value" value={formatCurrency(12450)} change={8.5} icon="💰" />
        <StatCard title="Completion Rate" value="83.3%" change={-2.1} icon="✅" />
        <StatCard title="Cancellation Rate" value="6.7%" change={1.2} icon="❌" />
      </div>

      {/* Monthly Trends - Line Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <span className="text-xl">📈</span> Monthly Booking Trends
          </h4>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.primary }}></div>
              <span className="text-gray-500">Bookings</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: chartColors.success }}></div>
              <span className="text-gray-500">Revenue</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={380}>
          <LineChart data={mockData.monthlyTrends} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis dataKey="month" tick={{ fill: chartColors.text, fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fill: chartColors.text, fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: chartColors.text, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="bookings" name="Total Bookings" stroke={chartColors.primary} strokeWidth={3} dot={{ r: 5, fill: chartColors.primary }} activeDot={{ r: 7 }} />
            <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue" stroke={chartColors.success} strokeWidth={3} dot={{ r: 5, fill: chartColors.success }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Growth Rate */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">📊</span> Monthly Growth Rate
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockData.monthlyGrowth} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis dataKey="month" tick={{ fill: chartColors.text, fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `${v}%`} tick={{ fill: chartColors.text, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="growth" name="Growth Rate" fill={chartColors.purple} radius={[4, 4, 0, 0]}>
              {mockData.monthlyGrowth.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.growth >= 0 ? chartColors.success : chartColors.danger} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category-wise Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span> Category-wise Bookings
          </h4>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={mockData.bookingsByCategory} layout="vertical" margin={{ left: 100, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis type="number" tick={{ fill: chartColors.text, fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fill: chartColors.text, fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Number of Bookings" radius={[0, 4, 4, 0]}>
                {mockData.bookingsByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Category */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">💰</span> Revenue by Category
          </h4>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={mockData.revenueByCategory} layout="vertical" margin={{ left: 100, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: chartColors.text, fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fill: chartColors.text, fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="amount" name="Revenue" fill={chartColors.success} radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Booking Status - Donut Chart with Fixed Labels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">✅</span> Booking Status Distribution
          </h4>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={mockData.bookingStatus}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                label={renderCustomizedLabel}
                labelLine={{ stroke: chartColors.text, strokeWidth: 1.5 }}
              >
                {mockData.bookingStatus.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.name === 'Completed' ? chartColors.success : entry.name === 'Pending' ? chartColors.warning : chartColors.danger} 
                    stroke={chartColors.white} 
                    strokeWidth={2} 
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value.toLocaleString()} (${mockData.bookingStatus.find(s => s.name === name)?.percentage}%)`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4 pt-3 border-t border-gray-100">
            {mockData.bookingStatus.map((status, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.name === 'Completed' ? chartColors.success : status.name === 'Pending' ? chartColors.warning : chartColors.danger }}></div>
                <span className="text-xs text-gray-600">{status.name}</span>
                <span className="text-xs font-bold">{status.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">🎯</span> Booking Conversion Funnel
          </h4>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={mockData.conversionFunnel} layout="vertical" margin={{ left: 80 }}>
              <XAxis type="number" tick={{ fill: chartColors.text, fontSize: 12 }} />
              <YAxis type="category" dataKey="stage" width={80} tick={{ fill: chartColors.text, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Number of Bookings" fill={chartColors.indigo} radius={[0, 4, 4, 0]}>
                {mockData.conversionFunnel.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={[chartColors.primary, chartColors.cyan, chartColors.success, chartColors.teal][index]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4 pt-3 border-t border-gray-100 text-xs">
            {mockData.conversionFunnel.map((stage, idx) => (
              <div key={idx} className="text-center">
                <span className="text-gray-500">{stage.stage}</span>
                <span className="font-bold text-gray-800 ml-1">{stage.conversion}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Peak Days of Week */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📆</span> Peak Days of Week
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData.peakPeriods.days} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="day" tick={{ fill: chartColors.text, fontSize: 12 }} />
              <YAxis tick={{ fill: chartColors.text, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="bookings" name="Bookings" radius={[4, 4, 0, 0]}>
                {mockData.peakPeriods.days.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={dayColors[entry.day] || chartColors.primary} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Seasonal Trends */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">🌤️</span> Seasonal Trends
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={mockData.peakPeriods.seasons} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis dataKey="season" tick={{ fill: chartColors.text, fontSize: 11, angle: -15, textAnchor: 'end' }} height={60} />
              <YAxis yAxisId="left" tick={{ fill: chartColors.text, fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => formatCurrency(v)} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="bookings" name="Total Bookings" fill={chartColors.cyan} radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue" stroke={chartColors.purple} strokeWidth={3} dot={{ r: 5 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Vendors */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">🏆</span> Top Performing Vendors
        </h4>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={mockData.topVendors} layout="vertical" margin={{ left: 100 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: chartColors.text, fontSize: 11 }} />
            <YAxis type="category" dataKey="name" width={100} tick={{ fill: chartColors.text, fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" name="Revenue" fill={chartColors.teal} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Lead Time Analysis - Gradient Area Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">⏰</span> Booking Lead Time Analysis
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockData.leadTime} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <defs>
              <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColors.indigo} stopOpacity={0.4}/>
                <stop offset="95%" stopColor={chartColors.indigo} stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
            <XAxis dataKey="leadTime" tick={{ fill: chartColors.text, fontSize: 12 }} />
            <YAxis tick={{ fill: chartColors.text, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="bookings" name="Number of Bookings" stroke={chartColors.indigo} strokeWidth={3} fill="url(#leadGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};