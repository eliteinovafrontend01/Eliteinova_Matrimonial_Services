// src/components/admin/analytics/ConversionGrowthMetrics.jsx
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ComposedChart, ScatterChart, Scatter, XAxis as ScatterXAxis, YAxis as ScatterYAxis, ZAxis } from 'recharts';

// Professional Color Palette for Growth Dashboard
const colors = {
  // Funnel colors (Blue → Green gradient)
  funnel: ['#2563EB', '#3B82F6', '#06B6D4', '#14B8A6', '#10B981'],
  
  // Growth metrics
  visitors: '#2563EB',      // Blue
  leads: '#06B6D4',         // Cyan
  bookings: '#10B981',      // Green
  conversion: '#8B5CF6',    // Purple
  
  // Financial metrics
  revenue: '#059669',       // Emerald
  roas: '#10B981',          // Green
  cost: '#EF4444',          // Red
  cac: '#F97316',           // Orange
  
  // Lead sources (Blue family)
  leadSources: ['#2563EB', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'],
  
  // Traffic sources
  traffic: '#3B82F6',
  engagement: '#06B6D4',
  
  grid: '#E5E7EB',
  text: '#6B7280',
  darkText: '#374151',
  white: '#FFFFFF'
};

const mockData = {
  funnel: [
    { stage: 'Visitors', count: 125000, conversion: 100, color: colors.funnel[0] },
    { stage: 'Leads', count: 18750, conversion: 15, color: colors.funnel[1] },
    { stage: 'Bookings Started', count: 9375, conversion: 50, color: colors.funnel[2] },
    { stage: 'Payment Initiated', count: 6562, conversion: 70, color: colors.funnel[3] },
    { stage: 'Completed Bookings', count: 5250, conversion: 80, color: colors.funnel[4] },
  ],
  monthlyGrowth: [
    { month: 'Jan', visitors: 18500, leads: 2780, bookings: 1480 },
    { month: 'Feb', visitors: 21000, leads: 3150, bookings: 1680 },
    { month: 'Mar', visitors: 23500, leads: 3525, bookings: 1920 },
    { month: 'Apr', visitors: 26500, leads: 4120, bookings: 2250 },
    { month: 'May', visitors: 29800, leads: 4760, bookings: 2680 },
    { month: 'Jun', visitors: 33500, leads: 5520, bookings: 3180 },
  ],
  conversionTrend: [
    { month: 'Jan', rate: 8.0 },
    { month: 'Feb', rate: 8.0 },
    { month: 'Mar', rate: 8.2 },
    { month: 'Apr', rate: 8.5 },
    { month: 'May', rate: 9.0 },
    { month: 'Jun', rate: 9.5 },
  ],
  leadSources: [
    { name: 'Organic Search', leads: 8250, percentage: 44, conversion: 8.5 },
    { name: 'Social Media', leads: 5250, percentage: 28, conversion: 7.2 },
    { name: 'Direct Traffic', leads: 3180, percentage: 17, conversion: 9.8 },
    { name: 'Referrals', leads: 1500, percentage: 8, conversion: 11.2 },
    { name: 'Email Marketing', leads: 570, percentage: 3, conversion: 6.5 },
  ],
  campaignPerformance: [
    { campaign: 'Summer Wedding Sale', impressions: 125000, clicks: 8750, leads: 1312, cost: 25000, revenue: 325000, roas: 13.0 },
    { campaign: 'Festival Special', impressions: 98000, clicks: 6860, leads: 1029, cost: 18500, revenue: 245000, roas: 13.24 },
    { campaign: 'Weekend Flash Sale', impressions: 75000, clicks: 5250, leads: 788, cost: 15000, revenue: 185000, roas: 12.33 },
    { campaign: 'New User Offer', impressions: 112000, clicks: 7840, leads: 1176, cost: 22000, revenue: 275000, roas: 12.5 },
  ],
  cacTrend: [
    { month: 'Jan', cac: 3250 },
    { month: 'Feb', cac: 3150 },
    { month: 'Mar', cac: 3050 },
    { month: 'Apr', cac: 2980 },
    { month: 'May', cac: 2900 },
    { month: 'Jun', cac: 2850 },
  ],
  ltvVsCac: [
    { metric: 'LTV', value: 45800, color: colors.revenue },
    { metric: 'CAC', value: 2850, color: colors.cost },
  ],
  trafficSourceQuality: [
    { name: 'Organic Search', leads: 8250, conversionRate: 8.5 },
    { name: 'Social Media', leads: 5250, conversionRate: 7.2 },
    { name: 'Direct Traffic', leads: 3180, conversionRate: 9.8 },
    { name: 'Referrals', leads: 1500, conversionRate: 11.2 },
    { name: 'Email', leads: 570, conversionRate: 6.5 },
  ],
  keyMetrics: {
    visitorToLeadRate: 15,
    leadToBookingRate: 28,
    overallConversion: 4.2,
    avgOrderValue: 12450,
    customerLifetimeValue: 45800,
    cac: 2850,
  }
};

const formatCurrency = (amount) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
};

const StatCard = ({ title, value, change, icon, color }) => (
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

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p, idx) => (
          <p key={idx} style={{ color: p.color }}>
            {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
            {p.dataKey === 'rate' && '%'}
            {p.dataKey === 'roas' && 'x'}
            {p.dataKey === 'conversionRate' && '%'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const ConversionGrowthMetrics = () => {
  const [period, setPeriod] = useState('6months');

  const avgROAS = (mockData.campaignPerformance.reduce((sum, c) => sum + c.roas, 0) / mockData.campaignPerformance.length).toFixed(1);
  const ltvToCacRatio = Math.round(mockData.keyMetrics.customerLifetimeValue / mockData.keyMetrics.cac);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5 border border-blue-200">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Conversion & Growth Metrics</h3>
            <p className="text-sm text-gray-500 mt-1">Measure platform growth, conversion rates, and marketing effectiveness</p>
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

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Overall Conversion" value={`${mockData.keyMetrics.overallConversion}%`} change={0.8} icon="📊" />
        <StatCard title="Visitor to Lead" value={`${mockData.keyMetrics.visitorToLeadRate}%`} change={1.2} icon="👥" />
        <StatCard title="Lead to Booking" value={`${mockData.keyMetrics.leadToBookingRate}%`} change={2.5} icon="📅" />
        <StatCard title="Avg Order Value" value={formatCurrency(mockData.keyMetrics.avgOrderValue)} change={5.3} icon="💰" />
        <StatCard title="Customer LTV" value={formatCurrency(mockData.keyMetrics.customerLifetimeValue)} change={8.2} icon="💎" />
      </div>

      {/* Conversion Funnel - Horizontal Bar Chart (Funnel Style) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">📊</span> Conversion Funnel
        </h4>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={mockData.funnel} layout="vertical" margin={{ left: 120, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis type="number" tick={{ fill: colors.text, fontSize: 12 }} />
            <YAxis type="category" dataKey="stage" width={120} tick={{ fill: colors.text, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" name="Users" radius={[0, 4, 4, 0]}>
              {mockData.funnel.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-5 gap-4 mt-4 pt-4 border-t border-gray-100">
          {mockData.funnel.map((stage, idx) => (
            <div key={idx} className="text-center">
              <p className="text-xs text-gray-500">{stage.stage}</p>
              <p className="text-lg font-bold text-gray-800">{stage.conversion}%</p>
              <p className="text-xs text-gray-400">conversion</p>
            </div>
          ))}
        </div>
      </div>

      {/* Growth Trends - Separate Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Growth (Visitors + Leads + Bookings) */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="text-xl">📈</span> Traffic Growth
            </h4>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.visitors }}></div>
                <span className="text-gray-500">Visitors</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.leads }}></div>
                <span className="text-gray-500">Leads</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.bookings }}></div>
                <span className="text-gray-500">Bookings</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={mockData.monthlyGrowth} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis dataKey="month" tick={{ fill: colors.text, fontSize: 12 }} />
              <YAxis tick={{ fill: colors.text, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line type="monotone" dataKey="visitors" name="Visitors" stroke={colors.visitors} strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="leads" name="Leads" stroke={colors.leads} strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="bookings" name="Bookings" stroke={colors.bookings} strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Rate Trend */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span> Conversion Rate Trend
          </h4>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={mockData.conversionTrend} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <defs>
                <linearGradient id="conversionGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={colors.conversion} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={colors.conversion} stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis dataKey="month" tick={{ fill: colors.text, fontSize: 12 }} />
              <YAxis tickFormatter={(v) => `${v}%`} tick={{ fill: colors.text, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="rate" name="Conversion Rate" stroke={colors.conversion} strokeWidth={3} fill="url(#conversionGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Lead Sources - Horizontal Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">🎯</span> Lead Sources
          </h4>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={mockData.leadSources} layout="vertical" margin={{ left: 120, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis type="number" tick={{ fill: colors.text, fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={120} tick={{ fill: colors.text, fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="leads" name="Number of Leads" radius={[0, 4, 4, 0]}>
                {mockData.leadSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors.leadSources[index % colors.leadSources.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Source Quality - Scatter Plot */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">🔍</span> Traffic Source Quality
          </h4>
          <ResponsiveContainer width="100%" height={350}>
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <ScatterXAxis dataKey="leads" name="Leads" tick={{ fill: colors.text, fontSize: 11 }} />
              <ScatterYAxis dataKey="conversionRate" name="Conversion Rate" tickFormatter={(v) => `${v}%`} tick={{ fill: colors.text, fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Scatter data={mockData.trafficSourceQuality} fill={colors.engagement} shape="circle">
                {mockData.trafficSourceQuality.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors.leadSources[index % colors.leadSources.length]} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Campaign Performance - ROAS Bar Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">📢</span> Campaign ROAS Performance
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockData.campaignPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis dataKey="campaign" tick={{ fill: colors.text, fontSize: 11, angle: -15, textAnchor: 'end' }} height={60} />
            <YAxis tickFormatter={(v) => `${v}x`} tick={{ fill: colors.text, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="roas" name="ROAS (Return on Ad Spend)" fill={colors.roas} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue vs Cost - Grouped Bar Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">💰</span> Revenue vs Cost by Campaign
        </h4>
        <div className="flex justify-end gap-4 mb-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.revenue }}></div>
            <span className="text-gray-500">Revenue</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.cost }}></div>
            <span className="text-gray-500">Cost</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={mockData.campaignPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis dataKey="campaign" tick={{ fill: colors.text, fontSize: 11, angle: -15, textAnchor: 'end' }} height={60} />
            <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: colors.text, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="revenue" name="Revenue" fill={colors.revenue} radius={[4, 4, 0, 0]} />
            <Bar dataKey="cost" name="Cost" fill={colors.cost} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* CAC Trend & LTV vs CAC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CAC Trend */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">💰</span> Customer Acquisition Cost Trend
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData.cacTrend} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis dataKey="month" tick={{ fill: colors.text, fontSize: 12 }} />
              <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: colors.text, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="cac" name="CAC" stroke={colors.cac} strokeWidth={3} dot={{ r: 5, fill: colors.cac }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* LTV vs CAC */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span> LTV vs CAC Ratio
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData.ltvVsCac} layout="vertical" margin={{ left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: colors.text, fontSize: 12 }} />
              <YAxis type="category" dataKey="metric" width={60} tick={{ fill: colors.text, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {mockData.ltvVsCac.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="text-center mt-4 pt-3 border-t border-gray-100">
            <p className="text-sm text-gray-600">LTV to CAC Ratio</p>
            <p className="text-2xl font-bold text-green-600">{ltvToCacRatio}:1</p>
            <p className="text-xs text-gray-400 mt-1">Healthy ratio is above 3:1</p>
          </div>
        </div>
      </div>

      {/* Campaign Performance Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <span className="text-xl">📋</span> Campaign Performance Details
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-5 py-3">Campaign</th>
                <th className="px-5 py-3 text-right">Impressions</th>
                <th className="px-5 py-3 text-right">Clicks</th>
                <th className="px-5 py-3 text-right">Leads</th>
                <th className="px-5 py-3 text-right">Cost</th>
                <th className="px-5 py-3 text-right">Revenue</th>
                <th className="px-5 py-3 text-center">ROAS</th>
              </tr>
            </thead>
            <tbody>
              {mockData.campaignPerformance.map((campaign, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-semibold text-gray-800">{campaign.campaign}</td>
                  <td className="px-5 py-3 text-right text-gray-600">{campaign.impressions.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right text-gray-600">{campaign.clicks.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right text-gray-600">{campaign.leads.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right text-orange-600">{formatCurrency(campaign.cost)}</td>
                  <td className="px-5 py-3 text-right text-green-600">{formatCurrency(campaign.revenue)}</td>
                  <td className="px-5 py-3 text-center">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">{campaign.roas}x</span>
                   </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 text-center">
          <p className="text-sm text-gray-600 mb-1">Customer Acquisition Cost</p>
          <p className="text-2xl font-bold text-blue-600">{formatCurrency(mockData.keyMetrics.cac)}</p>
          <p className="text-xs text-gray-500 mt-1">↓ 12% from last quarter</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 text-center">
          <p className="text-sm text-gray-600 mb-1">Customer LTV to CAC Ratio</p>
          <p className="text-2xl font-bold text-green-600">{ltvToCacRatio}:1</p>
          <p className="text-xs text-gray-500 mt-1">Healthy ratio {'>'} 3:1</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 text-center">
          <p className="text-sm text-gray-600 mb-1">Average ROAS</p>
          <p className="text-2xl font-bold text-purple-600">{avgROAS}x</p>
          <p className="text-xs text-gray-500 mt-1">across all campaigns</p>
        </div>
      </div>
    </div>
  );
};