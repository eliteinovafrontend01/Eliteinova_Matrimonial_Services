// src/components/admin/analytics/UserCustomerInsights.jsx
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, ComposedChart, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

// Professional User Insights Color Palette
const customerInsightTheme = {
  users: '#2563EB',        // Blue
  active: '#10B981',       // Green
  demographics: '#8B5CF6', // Purple
  retention: '#14B8A6',    // Teal
  preference: '#F59E0B',   // Amber
  satisfaction: '#EC4899', // Pink
  registered: '#2563EB',
  session: '#F59E0B',
  grid: '#E5E7EB',
  text: '#6B7280',
  white: '#FFFFFF'
};

// Age gradient (Purple)
const ageGradient = [
  '#5B21B6',
  '#7C3AED',
  '#8B5CF6',
  '#A78BFA',
  '#C4B5FD'
];

// Location gradient (Blue)
const locationGradient = [
  '#1D4ED8',
  '#2563EB',
  '#3B82F6',
  '#60A5FA',
  '#93C5FD',
  '#BFDBFE'
];

// Funnel colors
const funnelColors = [
  '#2563EB',
  '#3B82F6',
  '#10B981',
  '#14B8A6',
  '#8B5CF6'
];

const mockData = {
  registrations: [
    { month: 'Jan', new: 1250, active: 8450 },
    { month: 'Feb', new: 1320, active: 8920 },
    { month: 'Mar', new: 1480, active: 9380 },
    { month: 'Apr', new: 1560, active: 10120 },
    { month: 'May', new: 1680, active: 10850 },
    { month: 'Jun', new: 1820, active: 11580 },
  ],
  demographics: {
    ageGroups: [
      { name: '26-35', percentage: 42, count: 5242 },
      { name: '36-45', percentage: 25, count: 3120 },
      { name: '18-25', percentage: 18, count: 2246 },
      { name: '46-60', percentage: 10, count: 1248 },
      { name: '60+', percentage: 5, count: 624 },
    ],
    locations: [
      { name: 'Mumbai', users: 3240, percentage: 26 },
      { name: 'Delhi', users: 2980, percentage: 24 },
      { name: 'Bangalore', users: 2450, percentage: 19.6 },
      { name: 'Chennai', users: 1860, percentage: 14.9 },
      { name: 'Kolkata', users: 1240, percentage: 9.9 },
      { name: 'Others', users: 710, percentage: 5.7 },
    ],
    preferences: [
      { name: 'Wedding Halls', preference: 38, bookings: 1298 },
      { name: 'Catering', preference: 28, bookings: 958 },
      { name: 'Photography', preference: 18, bookings: 615 },
      { name: 'Decorations', preference: 10, bookings: 342 },
      { name: 'Entertainment', preference: 6, bookings: 207 },
    ],
  },
  retentionData: [
    { month: 'Jan', retention: 72, returning: 6084 },
    { month: 'Feb', retention: 74, returning: 6580 },
    { month: 'Mar', retention: 76, returning: 7128 },
    { month: 'Apr', retention: 78, returning: 7894 },
    { month: 'May', retention: 79, returning: 8572 },
    { month: 'Jun', retention: 81, returning: 9380 },
  ],
  acquisitionSources: [
    { name: 'Organic Search', percentage: 35, count: 4368, color: '#10B981' },
    { name: 'Google Ads', percentage: 25, count: 3120, color: '#2563EB' },
    { name: 'Facebook', percentage: 18, count: 2246, color: '#8B5CF6' },
    { name: 'Instagram', percentage: 12, count: 1498, color: '#EC4899' },
    { name: 'Referral', percentage: 6, count: 749, color: '#F59E0B' },
    { name: 'Direct', percentage: 4, count: 499, color: '#6B7280' },
  ],
  customerFunnel: [
    { stage: 'Visitors', count: 125000, conversion: 100 },
    { stage: 'Registrations', count: 18750, conversion: 15 },
    { stage: 'Bookings', count: 9375, conversion: 50 },
    { stage: 'Payments', count: 6562, conversion: 70 },
    { stage: 'Repeat Customers', count: 3281, conversion: 50 },
  ],
  activityHeatmap: [
    { time: 'Morning', mon: 65, tue: 72, wed: 78, thu: 82, fri: 85, sat: 92, sun: 88 },
    { time: 'Afternoon', mon: 85, tue: 88, wed: 92, thu: 89, fri: 86, sat: 78, sun: 75 },
    { time: 'Evening', mon: 92, tue: 95, wed: 96, thu: 94, fri: 92, sat: 88, sun: 85 },
    { time: 'Night', mon: 45, tue: 48, wed: 52, thu: 50, fri: 55, sat: 68, sun: 62 },
  ],
};

const StatCard = ({ title, value, subtitle, icon, color, trend }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</span>
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
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
            {p.name}: {p.dataKey === 'percentage' || p.dataKey === 'preference' || p.dataKey === 'retention' 
              ? `${p.value}%` 
              : p.value.toLocaleString()}
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

export const UserCustomerInsights = () => {
  const [filter, setFilter] = useState('monthly');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">User & Customer Insights</h3>
            <p className="text-sm text-gray-500 mt-1">Analyze customer behavior, demographics, preferences, and acquisition</p>
          </div>
          <div className="flex gap-2 bg-white rounded-lg p-1">
            {['daily', 'weekly', 'monthly'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)} 
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  filter === f ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {f === 'daily' ? 'Daily' : f === 'weekly' ? 'Weekly' : 'Monthly'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Registered" value={12480} subtitle="+18.5% from last month" icon="👥" color={customerInsightTheme.registered} trend={18.5} />
        <StatCard title="Active Users" value={9865} subtitle="79% of total users" icon="🟢" color={customerInsightTheme.active} trend={12.3} />
        <StatCard title="Avg. Session Duration" value="8.5m" subtitle="minutes per user" icon="⏱️" color={customerInsightTheme.session} trend={5.2} />
        <StatCard title="Customer Satisfaction" value="4.6/5" subtitle="out of 5 stars" icon="⭐" color={customerInsightTheme.satisfaction} trend={8.7} />
      </div>

      {/* User Growth Trend - Composed Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <span className="text-xl">📈</span> User Growth Trend
          </h4>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: customerInsightTheme.users }}></div>
              <span className="text-gray-500">New Registrations</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: customerInsightTheme.active }}></div>
              <span className="text-gray-500">Active Users</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={mockData.registrations} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={customerInsightTheme.grid} />
            <XAxis dataKey="month" tick={{ fill: customerInsightTheme.text, fontSize: 12 }} />
            <YAxis yAxisId="left" tick={{ fill: customerInsightTheme.text, fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: customerInsightTheme.text, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="new" name="New Registrations" fill={customerInsightTheme.users} radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="active" name="Active Users" stroke={customerInsightTheme.active} strokeWidth={3} dot={{ r: 5, fill: customerInsightTheme.active }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Age & Location Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution - Horizontal Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">👥</span> Age Distribution
          </h4>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={mockData.demographics.ageGroups} layout="vertical" margin={{ left: 60, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={customerInsightTheme.grid} />
              <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fill: customerInsightTheme.text, fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={60} tick={{ fill: customerInsightTheme.text, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="percentage" name="Percentage" radius={[0, 4, 4, 0]}>
                {mockData.demographics.ageGroups.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={ageGradient[index % ageGradient.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Distribution by Location - Horizontal Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📍</span> User Distribution by Location
          </h4>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={mockData.demographics.locations} layout="vertical" margin={{ left: 80, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={customerInsightTheme.grid} />
              <XAxis type="number" tick={{ fill: customerInsightTheme.text, fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={80} tick={{ fill: customerInsightTheme.text, fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="users" name="Number of Users" radius={[0, 4, 4, 0]}>
                {mockData.demographics.locations.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={locationGradient[index % locationGradient.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Service Preferences - Composed Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <span className="text-xl">🎯</span> Service Preferences
          </h4>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: customerInsightTheme.preference }}></div>
              <span className="text-gray-500">Preference %</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: customerInsightTheme.users }}></div>
              <span className="text-gray-500">Bookings</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={380}>
          <ComposedChart data={mockData.demographics.preferences} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={customerInsightTheme.grid} />
            <XAxis dataKey="name" tick={{ fill: customerInsightTheme.text, fontSize: 11, angle: -15, textAnchor: 'end' }} height={60} />
            <YAxis yAxisId="left" tick={{ fill: customerInsightTheme.text, fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: customerInsightTheme.text, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="bookings" name="Total Bookings" fill={customerInsightTheme.users} radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="preference" name="Preference %" stroke={customerInsightTheme.preference} strokeWidth={3} dot={{ r: 5, fill: customerInsightTheme.preference }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Acquisition Sources - Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📢</span> User Acquisition Sources
          </h4>
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={mockData.acquisitionSources}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="percentage"
                nameKey="name"
                label={renderPieLabel}
                labelLine={{ stroke: customerInsightTheme.text, strokeWidth: 1.5 }}
              >
                {mockData.acquisitionSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={customerInsightTheme.white} strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-3 mt-4 pt-3 border-t border-gray-100 flex-wrap">
            {mockData.acquisitionSources.map((source, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: source.color }}></div>
                <span className="text-xs text-gray-600">{source.name}</span>
                <span className="text-xs font-bold">{source.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Journey Funnel */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">🎯</span> Customer Journey Funnel
          </h4>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={mockData.customerFunnel} layout="vertical" margin={{ left: 100 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={customerInsightTheme.grid} />
              <XAxis type="number" tick={{ fill: customerInsightTheme.text, fontSize: 11 }} />
              <YAxis type="category" dataKey="stage" width={100} tick={{ fill: customerInsightTheme.text, fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Number of Users" radius={[0, 4, 4, 0]}>
                {mockData.customerFunnel.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={funnelColors[index % funnelColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-100 text-xs">
            {mockData.customerFunnel.map((stage, idx) => (
              <div key={idx} className="text-center">
                <span className="text-gray-500">{stage.stage}</span>
                <span className="font-bold text-gray-800 ml-1">{stage.conversion}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Retention - Area + Line Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <span className="text-xl">🔄</span> Customer Retention Rate
          </h4>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: customerInsightTheme.retention }}></div>
              <span className="text-gray-500">Retention Rate</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: customerInsightTheme.demographics }}></div>
              <span className="text-gray-500">Returning Users</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <ComposedChart data={mockData.retentionData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <defs>
              <linearGradient id="retentionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={customerInsightTheme.retention} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={customerInsightTheme.retention} stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={customerInsightTheme.grid} />
            <XAxis dataKey="month" tick={{ fill: customerInsightTheme.text, fontSize: 12 }} />
            <YAxis yAxisId="left" tickFormatter={(v) => `${v}%`} tick={{ fill: customerInsightTheme.text, fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" tick={{ fill: customerInsightTheme.text, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="retention" name="Retention Rate %" stroke={customerInsightTheme.retention} strokeWidth={2} fill="url(#retentionGradient)" />
            <Line yAxisId="right" type="monotone" dataKey="returning" name="Returning Users" stroke={customerInsightTheme.demographics} strokeWidth={3} dot={{ r: 5, fill: customerInsightTheme.demographics }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};