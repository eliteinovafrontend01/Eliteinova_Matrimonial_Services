// src/components/admin/analytics/DashboardOverviewAnalytics.jsx
import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, ComposedChart
} from 'recharts';

// Professional Dashboard Colors
const dashboardColors = {
  users: '#2563EB',        // Blue
  vendors: '#8B5CF6',      // Purple
  bookings: '#F59E0B',     // Amber
  revenue: '#10B981',      // Green
  payment: '#14B8A6',      // Teal
  complaint: '#EF4444',    // Red
  grid: '#E5E7EB',
  text: '#6B7280',
  white: '#FFFFFF'
};

// Category gradient colors for bar chart
const categoryGradient = [
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
  totalUsers: 12480,
  activeVendors: 845,
  totalBookings: 3420,
  totalRevenue: 5280000,
  
  // User growth trend
  userGrowth: [
    { month: 'Jan', users: 8450, vendors: 720 },
    { month: 'Feb', users: 8920, vendors: 748 },
    { month: 'Mar', users: 9380, vendors: 775 },
    { month: 'Apr', users: 10120, vendors: 802 },
    { month: 'May', users: 10850, vendors: 825 },
    { month: 'Jun', users: 11580, vendors: 845 },
  ],
  
  // Booking status distribution
  bookingStatus: [
    { name: 'Completed', value: 2850, percentage: 83.3, color: dashboardColors.revenue },
    { name: 'Confirmed', value: 312, percentage: 9.1, color: dashboardColors.users },
    { name: 'Pending', value: 47, percentage: 1.4, color: dashboardColors.bookings },
    { name: 'Cancelled', value: 211, percentage: 6.2, color: dashboardColors.complaint },
  ],
  
  recentActivities: [
    { id: 1, action: 'New user registered', user: 'Rahul Sharma', time: '2 min ago', type: 'user' },
    { id: 2, action: 'Booking confirmed', user: 'Priya Mehta', time: '15 min ago', type: 'booking' },
    { id: 3, action: 'New vendor registered', user: 'Grand Palace Hotel', time: '1 hour ago', type: 'vendor' },
    { id: 4, action: 'Payment completed', user: 'Amit Kumar', time: '2 hours ago', type: 'payment' },
    { id: 5, action: 'Complaint resolved', user: 'Neha Singh', time: '3 hours ago', type: 'complaint' },
  ],
  
  weeklyData: [
    { day: 'Mon', revenue: 285000, bookings: 42 },
    { day: 'Tue', revenue: 423000, bookings: 58 },
    { day: 'Wed', revenue: 567000, bookings: 72 },
    { day: 'Thu', revenue: 489000, bookings: 65 },
    { day: 'Fri', revenue: 445000, bookings: 61 },
    { day: 'Sat', revenue: 678000, bookings: 85 },
    { day: 'Sun', revenue: 452000, bookings: 54 },
  ],
  
  categoryDistribution: [
    { name: 'Wedding Halls', value: 1250, percentage: 36.5 },
    { name: 'Catering', value: 980, percentage: 28.7 },
    { name: 'Photography', value: 620, percentage: 18.1 },
    { name: 'Decorations', value: 350, percentage: 10.2 },
    { name: 'Entertainment', value: 220, percentage: 6.4 },
  ],
};

// Custom Stat Card with fixed colors
const StatCard = ({ title, value, icon, change, color }) => (
  <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer">
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-semibold text-gray-500">{title}</span>
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-gray-800">{value}</span>
      {change && (
        <span className={`text-xs font-semibold ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? `↑ +${change}%` : `↓ ${Math.abs(change)}%`}
        </span>
      )}
    </div>
    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3">
      <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(100, Math.abs(change || 0))}%`, backgroundColor: color }}></div>
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
            {p.name}: {p.dataKey === 'revenue' ? formatCurrency(p.value) : p.value.toLocaleString()}
            {p.dataKey === 'percentage' && '%'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom label for pie chart
const renderPieLabel = ({ name, percent }) => {
  return `${name} ${(percent * 100).toFixed(0)}%`;
};

export const DashboardOverviewAnalytics = () => {
  const [dateRange, setDateRange] = useState('week');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 border border-indigo-200">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Real-time Dashboard Overview</h3>
            <p className="text-sm text-gray-500 mt-1">Key metrics, platform growth, and recent activities at a glance</p>
          </div>
          <div className="flex gap-2 bg-white rounded-lg p-1">
            {['day', 'week', 'month'].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  dateRange === range ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {range === 'day' ? 'Today' : range === 'week' ? 'This Week' : 'This Month'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Users" value={mockData.totalUsers.toLocaleString()} icon="👥" change={12.5} color={dashboardColors.users} />
        <StatCard title="Active Vendors" value={mockData.activeVendors.toLocaleString()} icon="🏪" change={8.3} color={dashboardColors.vendors} />
        <StatCard title="Total Bookings" value={mockData.totalBookings.toLocaleString()} icon="📅" change={15.2} color={dashboardColors.bookings} />
        <StatCard title="Total Revenue" value={formatCurrency(mockData.totalRevenue)} icon="💰" change={18.7} color={dashboardColors.revenue} />
      </div>

      {/* Row 2: Platform Growth Trend */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <span className="text-xl">📈</span> Platform Growth Trend
          </h4>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dashboardColors.users }}></div>
              <span className="text-gray-500">Users</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dashboardColors.vendors }}></div>
              <span className="text-gray-500">Vendors</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={mockData.userGrowth} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={dashboardColors.grid} />
            <XAxis dataKey="month" tick={{ fill: dashboardColors.text, fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fill: dashboardColors.text, fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: dashboardColors.text, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="users" name="Total Users" stroke={dashboardColors.users} strokeWidth={3} dot={{ r: 5, fill: dashboardColors.users }} activeDot={{ r: 7 }} />
            <Line yAxisId="right" type="monotone" dataKey="vendors" name="Active Vendors" stroke={dashboardColors.vendors} strokeWidth={3} dot={{ r: 5, fill: dashboardColors.vendors }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Row 3: Revenue & Booking Trend - Composed Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <span className="text-xl">💰</span> Revenue & Booking Trend
          </h4>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dashboardColors.revenue }}></div>
              <span className="text-gray-500">Revenue (Area)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dashboardColors.bookings }}></div>
              <span className="text-gray-500">Bookings (Line)</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={mockData.weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={dashboardColors.revenue} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={dashboardColors.revenue} stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={dashboardColors.grid} />
            <XAxis dataKey="day" tick={{ fill: dashboardColors.text, fontSize: 12 }} />
            <YAxis yAxisId="left" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: dashboardColors.text, fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: dashboardColors.text, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="revenue" name="Revenue" stroke={dashboardColors.revenue} strokeWidth={2} fill="url(#revenueGradient)" />
            <Line yAxisId="right" type="monotone" dataKey="bookings" name="Bookings" stroke={dashboardColors.bookings} strokeWidth={3} dot={{ r: 5, fill: dashboardColors.bookings }} activeDot={{ r: 7 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Row 4: Two Column Layout - Booking Status & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Status Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">✅</span> Booking Status Distribution
          </h4>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={mockData.bookingStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                label={renderPieLabel}
                labelLine={{ stroke: dashboardColors.text, strokeWidth: 1.5 }}
              >
                {mockData.bookingStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={dashboardColors.white} strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value.toLocaleString()} (${mockData.bookingStatus.find(s => s.name === name)?.percentage}%)`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-100 flex-wrap">
            {mockData.bookingStatus.map((status, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }}></div>
                <span className="text-xs text-gray-600">{status.name}</span>
                <span className="text-xs font-bold">{status.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings by Category - Horizontal Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span> Bookings by Category
          </h4>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={mockData.categoryDistribution} layout="vertical" margin={{ left: 100, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={dashboardColors.grid} />
              <XAxis type="number" tick={{ fill: dashboardColors.text, fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={100} tick={{ fill: dashboardColors.text, fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Number of Bookings" radius={[0, 4, 4, 0]}>
                {mockData.categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={categoryGradient[index % categoryGradient.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-100 text-xs flex-wrap">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryGradient[0] }}></div>
              <span className="text-gray-500">Highest</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryGradient[2] }}></div>
              <span className="text-gray-500">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryGradient[4] }}></div>
              <span className="text-gray-500">Lowest</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 5: Recent Activities */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-5 border-b border-gray-100">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <span className="text-xl">🕐</span> Recent Activities
          </h4>
        </div>
        <div className="divide-y divide-gray-100">
          {mockData.recentActivities.map(activity => (
            <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  activity.type === 'user' ? 'bg-blue-100' :
                  activity.type === 'booking' ? 'bg-green-100' :
                  activity.type === 'vendor' ? 'bg-purple-100' :
                  activity.type === 'payment' ? 'bg-teal-100' : 'bg-red-100'
                }`}>
                  {activity.type === 'user' && '👤'}
                  {activity.type === 'booking' && '📅'}
                  {activity.type === 'vendor' && '🏪'}
                  {activity.type === 'payment' && '💳'}
                  {activity.type === 'complaint' && '📞'}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
              <button className="text-red-600 text-sm hover:text-red-700 font-medium transition-colors">View Details →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};