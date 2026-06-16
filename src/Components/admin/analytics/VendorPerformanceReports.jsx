// src/components/admin/analytics/VendorPerformanceReports.jsx
import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line, ComposedChart, PieChart, Pie, Cell, RadarChart, Radar, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis 
} from 'recharts';

// Professional Vendor Performance Color Palette
const vendorColors = {
  revenue: '#2563EB',        // Blue
  bookings: '#14B8A6',       // Teal
  rating: '#F59E0B',         // Amber
  growth: '#8B5CF6',         // Purple
  active: '#22C55E',         // Green
  warning: '#F97316',        // Orange
  danger: '#EF4444',         // Red
  neutral: '#64748B',        // Slate
  grid: '#E5E7EB',
  text: '#6B7280',
  white: '#FFFFFF'
};

// Rating gradient (Green → Red)
const ratingGradient = ['#22C55E', '#84CC16', '#F59E0B', '#F97316', '#EF4444'];

// Response time gradient
const responseGradient = ['#22C55E', '#14B8A6', '#F59E0B', '#EF4444'];

const formatCurrency = (amount) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
};

const mockData = {
  topVendors: [
    { name: 'Grand Palace', bookings: 42, revenue: 425000, rating: 4.8, category: 'Wedding Halls', growth: 15.2, responseTime: 2.5, completionRate: 96 },
    { name: 'Premier Catering', bookings: 38, revenue: 385000, rating: 4.7, category: 'Catering', growth: 12.8, responseTime: 3.2, completionRate: 94 },
    { name: 'Elite Photography', bookings: 31, revenue: 298000, rating: 4.9, category: 'Photography', growth: 18.5, responseTime: 1.8, completionRate: 98 },
    { name: 'Royal Feast', bookings: 28, revenue: 275000, rating: 4.6, category: 'Catering', growth: 10.2, responseTime: 4.1, completionRate: 92 },
    { name: 'Dream Decor', bookings: 25, revenue: 245000, rating: 4.7, category: 'Decorations', growth: 14.3, responseTime: 3.5, completionRate: 95 },
  ],
  vendorGrowth: [
    { month: 'Jan', active: 720, new: 28, revenue: 2850000 },
    { month: 'Feb', active: 748, new: 32, revenue: 3120000 },
    { month: 'Mar', active: 775, new: 35, revenue: 3450000 },
    { month: 'Apr', active: 802, new: 31, revenue: 3780000 },
    { month: 'May', active: 825, new: 29, revenue: 4120000 },
    { month: 'Jun', active: 845, new: 34, revenue: 4450000 },
  ],
  categoryPerformance: [
    { category: 'Wedding Halls', avgRevenue: 185000, totalBookings: 185, avgRating: 4.5, vendorCount: 8 },
    { category: 'Catering', avgRevenue: 125000, totalBookings: 245, avgRating: 4.4, vendorCount: 12 },
    { category: 'Photography', avgRevenue: 85000, totalBookings: 198, avgRating: 4.7, vendorCount: 15 },
    { category: 'Decorations', avgRevenue: 65000, totalBookings: 156, avgRating: 4.6, vendorCount: 10 },
    { category: 'Entertainment', avgRevenue: 55000, totalBookings: 98, avgRating: 4.4, vendorCount: 7 },
  ],
  qualityMetrics: {
    ratings: [
      { name: '5★', value: 45, color: ratingGradient[0] },
      { name: '4★', value: 35, color: ratingGradient[1] },
      { name: '3★', value: 12, color: ratingGradient[2] },
      { name: '2★', value: 5, color: ratingGradient[3] },
      { name: '1★', value: 3, color: ratingGradient[4] },
    ],
    responseTime: [
      { name: '<1hr', value: 32, color: responseGradient[0] },
      { name: '1-3hr', value: 41, color: responseGradient[1] },
      { name: '3-6hr', value: 18, color: responseGradient[2] },
      { name: '>6hr', value: 9, color: responseGradient[3] },
    ],
    completionRate: [
      { name: 'On Time', value: 88, color: vendorColors.active },
      { name: 'Delayed', value: 8, color: vendorColors.rating },
      { name: 'Cancelled', value: 4, color: vendorColors.danger },
    ],
  },
  vendorScorecard: [
    { metric: 'Revenue', value: 85, fullMark: 100 },
    { metric: 'Bookings', value: 78, fullMark: 100 },
    { metric: 'Rating', value: 92, fullMark: 100 },
    { metric: 'Response Time', value: 70, fullMark: 100 },
    { metric: 'Completion Rate', value: 88, fullMark: 100 },
  ],
  categoryShare: [
    { name: 'Wedding Halls', value: 35, color: vendorColors.revenue },
    { name: 'Catering', value: 28, color: vendorColors.bookings },
    { name: 'Photography', value: 18, color: vendorColors.growth },
    { name: 'Decorations', value: 12, color: vendorColors.rating },
    { name: 'Entertainment', value: 7, color: vendorColors.warning },
  ],
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <p className="font-semibold mb-1">{label}</p>
        {payload.map((p, idx) => (
          <p key={idx} style={{ color: p.color }}>
            {p.name}: {p.dataKey === 'revenue' || p.dataKey === 'avgRevenue' 
              ? formatCurrency(p.value) 
              : p.dataKey === 'value' && p.name !== 'Revenue'
                ? `${p.value}%`
                : p.dataKey === 'rating'
                  ? `${p.value}/5`
                  : p.dataKey === 'growth'
                    ? `${p.value}%`
                    : p.dataKey === 'responseTime'
                      ? `${p.value} hrs`
                      : p.dataKey === 'completionRate'
                        ? `${p.value}%`
                        : p.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom label for pie charts
const renderPieLabel = ({ name, percent }) => {
  return `${name} ${(percent * 100).toFixed(0)}%`;
};

// Star rating component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className="text-yellow-500 text-sm">★</span>
      ))}
      {hasHalfStar && <span className="text-yellow-500 text-sm">½</span>}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className="text-gray-300 text-sm">★</span>
      ))}
    </div>
  );
};

// Growth indicator component
const GrowthIndicator = ({ value }) => {
  const isPositive = value > 0;
  return (
    <div className={`flex items-center gap-1 text-xs font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
      {isPositive ? '↑' : '↓'} {Math.abs(value)}%
    </div>
  );
};

export const VendorPerformanceReports = () => {
  const [viewType, setViewType] = useState('top');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-200">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Vendor Performance Reports</h3>
            <p className="text-sm text-gray-500 mt-1">Track vendor performance based on bookings, ratings, and revenue</p>
          </div>
          <div className="flex gap-2 bg-white rounded-lg p-1">
            {['top', 'growth', 'category'].map(type => (
              <button 
                key={type} 
                onClick={() => setViewType(type)} 
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  viewType === type ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {type === 'top' ? '🏆 Top Performers' : type === 'growth' ? '📈 Growth Trends' : '📊 Category Analysis'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {viewType === 'top' && (
        <>
          {/* Enhanced Top Vendors Table with more columns */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5 border-b border-gray-100">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <span className="text-xl">🏆</span> Top Performing Vendors
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <th className="px-5 py-3">Vendor</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3 text-right">Revenue</th>
                    <th className="px-5 py-3 text-right">Bookings</th>
                    <th className="px-5 py-3 text-center">Rating</th>
                    <th className="px-5 py-3 text-center">Growth</th>
                    <th className="px-5 py-3 text-center">Response</th>
                    <th className="px-5 py-3 text-center">Completion</th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.topVendors.map(vendor => (
                    <tr key={vendor.name} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3">
                        <div>
                          <p className="font-semibold text-gray-800">{vendor.name}</p>
                          <p className="text-xs text-gray-400">{vendor.category}</p>
                        </div>
                       </td>
                      <td className="px-5 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{vendor.category}</span>
                       </td>
                      <td className="px-5 py-3 text-right font-bold text-green-600">{formatCurrency(vendor.revenue)}</td>
                      <td className="px-5 py-3 text-right font-medium text-gray-700">{vendor.bookings}</td>
                      <td className="px-5 py-3 text-center">
                        <StarRating rating={vendor.rating} />
                        <p className="text-xs text-gray-500 mt-1">{vendor.rating}/5</p>
                       </td>
                      <td className="px-5 py-3 text-center">
                        <GrowthIndicator value={vendor.growth} />
                       </td>
                      <td className="px-5 py-3 text-center">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          vendor.responseTime <= 2 ? 'bg-green-100 text-green-700' :
                          vendor.responseTime <= 3 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {vendor.responseTime}h
                        </span>
                       </td>
                      <td className="px-5 py-3 text-center">
                        <div className="flex items-center gap-1">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${vendor.completionRate}%` }}></div>
                          </div>
                          <span className="text-xs font-semibold">{vendor.completionRate}%</span>
                        </div>
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Revenue & Bookings Comparison - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Comparison - Horizontal Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">💰</span> Revenue by Vendor
              </h4>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={mockData.topVendors} layout="vertical" margin={{ left: 100, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={vendorColors.grid} />
                  <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: vendorColors.text, fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fill: vendorColors.text, fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" name="Revenue" fill={vendorColors.revenue} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Bookings Comparison - Horizontal Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">📅</span> Bookings by Vendor
              </h4>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={mockData.topVendors} layout="vertical" margin={{ left: 100, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={vendorColors.grid} />
                  <XAxis type="number" tick={{ fill: vendorColors.text, fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fill: vendorColors.text, fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="bookings" name="Bookings" fill={vendorColors.bookings} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Metrics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Growth Rate Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">📈</span> Growth Rate by Vendor
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData.topVendors} layout="vertical" margin={{ left: 100, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={vendorColors.grid} />
                  <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fill: vendorColors.text, fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fill: vendorColors.text, fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="growth" name="Growth Rate" fill={vendorColors.growth} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Response Time Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">⏱️</span> Response Time (Hours)
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData.topVendors} layout="vertical" margin={{ left: 100, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={vendorColors.grid} />
                  <XAxis type="number" tick={{ fill: vendorColors.text, fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fill: vendorColors.text, fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="responseTime" name="Response Time" fill={vendorColors.warning} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Completion Rate Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">✅</span> Completion Rate
              </h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData.topVendors} layout="vertical" margin={{ left: 100, right: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={vendorColors.grid} />
                  <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fill: vendorColors.text, fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={100} tick={{ fill: vendorColors.text, fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="completionRate" name="Completion Rate" fill={vendorColors.active} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Vendor Scorecard - Radar Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">📡</span> Overall Vendor Performance Scorecard
            </h4>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={mockData.vendorScorecard} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                <PolarGrid stroke={vendorColors.grid} />
                <PolarAngleAxis dataKey="metric" tick={{ fill: vendorColors.text, fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: vendorColors.text, fontSize: 10 }} />
                <Radar name="Vendor Score" dataKey="value" stroke={vendorColors.growth} fill={vendorColors.growth} fillOpacity={0.3} />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {viewType === 'growth' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-gray-800 flex items-center gap-2">
              <span className="text-xl">📈</span> Vendor Growth & Revenue Trends
            </h4>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: vendorColors.revenue }}></div>
                <span className="text-gray-500">Active Vendors</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: vendorColors.active }}></div>
                <span className="text-gray-500">New Vendors</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: vendorColors.rating }}></div>
                <span className="text-gray-500">Revenue</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={mockData.vendorGrowth} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={vendorColors.grid} />
              <XAxis dataKey="month" tick={{ fill: vendorColors.text, fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fill: vendorColors.text, fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: vendorColors.text, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar yAxisId="left" dataKey="active" name="Active Vendors" fill={vendorColors.revenue} radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="new" name="New Registrations" fill={vendorColors.active} radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="revenue" name="Total Revenue" stroke={vendorColors.rating} strokeWidth={3} dot={{ r: 5, fill: vendorColors.rating }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}

      {viewType === 'category' && (
        <>
          {/* Category-wise Performance - Composed Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <span className="text-xl">🏷️</span> Category-wise Performance
              </h4>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: vendorColors.bookings }}></div>
                  <span className="text-gray-500">Total Bookings</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: vendorColors.growth }}></div>
                  <span className="text-gray-500">Avg Revenue</span>
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={380}>
              <ComposedChart data={mockData.categoryPerformance} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={vendorColors.grid} />
                <XAxis dataKey="category" tick={{ fill: vendorColors.text, fontSize: 11, angle: -15, textAnchor: 'end' }} height={60} />
                <YAxis yAxisId="left" tick={{ fill: vendorColors.text, fontSize: 12 }} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: vendorColors.text, fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar yAxisId="left" dataKey="totalBookings" name="Total Bookings" fill={vendorColors.bookings} radius={[4, 4, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="avgRevenue" name="Avg Revenue per Vendor" stroke={vendorColors.growth} strokeWidth={3} dot={{ r: 5, fill: vendorColors.growth }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Category Share & Vendor Count */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Share - Donut Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">🥧</span> Revenue Share by Category
              </h4>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={mockData.categoryShare}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                    label={renderPieLabel}
                    labelLine={{ stroke: vendorColors.text, strokeWidth: 1.5 }}
                  >
                    {mockData.categoryShare.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke={vendorColors.white} strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-100 flex-wrap">
                {mockData.categoryShare.map((category, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }}></div>
                    <span className="text-xs text-gray-600">{category.name}</span>
                    <span className="text-xs font-bold">{category.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Performance Summary Cards */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">📊</span> Category Summary
              </h4>
              <div className="space-y-3">
                {mockData.categoryPerformance.map((category, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-800">{category.category}</span>
                      <span className="text-xs text-gray-500">{category.vendorCount} vendors</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <p className="text-xs text-gray-400">Bookings</p>
                        <p className="text-sm font-bold text-gray-700">{category.totalBookings}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Avg Revenue</p>
                        <p className="text-sm font-bold text-green-600">{formatCurrency(category.avgRevenue)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Rating</p>
                        <div className="flex items-center justify-center gap-0.5">
                          <span className="text-yellow-500 text-xs">★</span>
                          <span className="text-sm font-bold">{category.avgRating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Response Time & Completion Rate - Donut Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Response Time Distribution - Donut Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">⏱️</span> Response Time Distribution
              </h4>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={mockData.qualityMetrics.responseTime}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                    label={renderPieLabel}
                    labelLine={{ stroke: vendorColors.text, strokeWidth: 1.5 }}
                  >
                    {mockData.qualityMetrics.responseTime.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke={vendorColors.white} strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-3 mt-4 pt-3 border-t border-gray-100">
                {mockData.qualityMetrics.responseTime.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs text-gray-600">{item.name}</span>
                    <span className="text-xs font-bold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Completion Rate - Donut Chart */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-xl">✅</span> Overall Completion Rate
              </h4>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={mockData.qualityMetrics.completionRate}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                    label={renderPieLabel}
                    labelLine={{ stroke: vendorColors.text, strokeWidth: 1.5 }}
                  >
                    {mockData.qualityMetrics.completionRate.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke={vendorColors.white} strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-100">
                {mockData.qualityMetrics.completionRate.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs text-gray-600">{item.name}</span>
                    <span className="text-xs font-bold">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Vendor Ratings Distribution */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">⭐</span> Vendor Ratings Distribution
            </h4>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={mockData.qualityMetrics.ratings}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  nameKey="name"
                  label={renderPieLabel}
                  labelLine={{ stroke: vendorColors.text, strokeWidth: 1.5 }}
                >
                  {mockData.qualityMetrics.ratings.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke={vendorColors.white} strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-100">
              {mockData.qualityMetrics.ratings.map((rating, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: rating.color }}></div>
                  <span className="text-xs text-gray-600">{rating.name}</span>
                  <span className="text-xs font-bold">{rating.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};