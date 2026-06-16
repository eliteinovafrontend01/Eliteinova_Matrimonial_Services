// src/components/admin/analytics/CustomReportsGeneration.jsx
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, ComposedChart, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

// Professional Report Colors
const reportColors = {
  bookings: '#2563EB',     // Blue
  revenue: '#10B981',      // Green
  customers: '#06B6D4',    // Cyan
  avgOrder: '#8B5CF6',     // Purple
  vendors: '#7C3AED',      // Purple
  locations: '#14B8A6',    // Teal
  categories: '#3B82F6',   // Blue
  warning: '#F59E0B',
  danger: '#EF4444',
  grid: '#E5E7EB',
  text: '#6B7280',
  white: '#FFFFFF'
};

// Category gradient colors
const categoryGradient = ['#1D4ED8', '#2563EB', '#3B82F6', '#60A5FA', '#93C5FD'];
const locationGradient = ['#0F766E', '#0D9488', '#14B8A6', '#2DD4BF', '#5EEAD4', '#99F6E4'];
const vendorGradient = ['#6D28D9', '#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD'];

const formatCurrency = (amount) => {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)}Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)}L`;
  if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
  return `₹${amount}`;
};

// Mock data for different report types
const mockData = {
  locations: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'],
  vendors: ['Grand Palace', 'Premier Catering', 'Elite Photography', 'Royal Feast', 'Dream Decor', 'Melody Music', 'Shutter Stories', 'ABC Events'],
  categories: ['Wedding Halls', 'Catering', 'Photography', 'Decorations', 'Entertainment', 'Invitations', 'Bridal Styling'],
  
  // Category performance data
  categoryData: [
    { name: 'Wedding Halls', bookings: 1250, revenue: 4250000, avgValue: 34000 },
    { name: 'Catering', bookings: 980, revenue: 2850000, avgValue: 29082 },
    { name: 'Photography', bookings: 620, revenue: 1850000, avgValue: 29839 },
    { name: 'Decorations', bookings: 350, revenue: 980000, avgValue: 28000 },
    { name: 'Entertainment', bookings: 220, revenue: 650000, avgValue: 29545 },
  ],
  
  // Location performance data
  locationData: [
    { name: 'Mumbai', bookings: 425, revenue: 15800000, avgValue: 37176 },
    { name: 'Delhi', bookings: 385, revenue: 14200000, avgValue: 36883 },
    { name: 'Bangalore', bookings: 295, revenue: 10800000, avgValue: 36610 },
    { name: 'Chennai', bookings: 185, revenue: 6800000, avgValue: 36757 },
    { name: 'Kolkata', bookings: 145, revenue: 5300000, avgValue: 36552 },
  ],
  
  // Vendor performance data
  vendorData: [
    { name: 'Grand Palace', bookings: 42, revenue: 425000, avgValue: 10119 },
    { name: 'Premier Catering', bookings: 38, revenue: 385000, avgValue: 10132 },
    { name: 'Elite Photography', bookings: 31, revenue: 298000, avgValue: 9613 },
    { name: 'Royal Feast', bookings: 28, revenue: 275000, avgValue: 9821 },
    { name: 'Dream Decor', bookings: 25, revenue: 245000, avgValue: 9800 },
  ],
  
  // Revenue trend data
  revenueTrend: [
    { month: 'Jan', revenue: 2850000, bookings: 245 },
    { month: 'Feb', revenue: 3120000, bookings: 268 },
    { month: 'Mar', revenue: 3450000, bookings: 285 },
    { month: 'Apr', revenue: 3780000, bookings: 302 },
    { month: 'May', revenue: 4120000, bookings: 318 },
    { month: 'Jun', revenue: 4450000, bookings: 335 },
  ],
  
  // Booking trend data
  bookingTrend: [
    { month: 'Jan', bookings: 245, revenue: 2850000 },
    { month: 'Feb', bookings: 268, revenue: 3120000 },
    { month: 'Mar', bookings: 285, revenue: 3450000 },
    { month: 'Apr', bookings: 302, revenue: 3780000 },
    { month: 'May', bookings: 318, revenue: 4120000 },
    { month: 'Jun', bookings: 335, revenue: 4450000 },
  ],
};

export const CustomReportsGeneration = () => {
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-06-30' });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState('all');
  const [reportType, setReportType] = useState('overview');
  const [reportData, setReportData] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const generateReport = () => {
    setGenerating(true);
    setTimeout(() => {
      let data;
      let chartType = 'composed';
      let summary = {
        totalBookings: 1250,
        totalRevenue: 18500000,
        avgOrderValue: 14800,
        totalCustomers: 985,
      };
      
      // Determine report data based on filters
      if (selectedCategory !== 'all') {
        data = mockData.categoryData.filter(c => c.name === selectedCategory);
        chartType = 'category';
        summary = {
          totalBookings: data[0]?.bookings || 0,
          totalRevenue: data[0]?.revenue || 0,
          avgOrderValue: data[0]?.avgValue || 0,
          totalCustomers: Math.round((data[0]?.bookings || 0) * 0.8),
        };
      } else if (selectedLocation !== 'all') {
        data = mockData.locationData.filter(l => l.name === selectedLocation);
        chartType = 'location';
        summary = {
          totalBookings: data[0]?.bookings || 0,
          totalRevenue: data[0]?.revenue || 0,
          avgOrderValue: data[0]?.avgValue || 0,
          totalCustomers: Math.round((data[0]?.bookings || 0) * 0.85),
        };
      } else if (selectedVendor !== 'all') {
        data = mockData.vendorData.filter(v => v.name === selectedVendor);
        chartType = 'vendor';
        summary = {
          totalBookings: data[0]?.bookings || 0,
          totalRevenue: data[0]?.revenue || 0,
          avgOrderValue: data[0]?.avgValue || 0,
          totalCustomers: Math.round((data[0]?.bookings || 0) * 0.9),
        };
      } else {
        data = mockData.revenueTrend;
        chartType = 'composed';
      }
      
      const mockReport = {
        summary,
        data: data || mockData.revenueTrend,
        chartType,
        filters: { dateRange, selectedCategory, selectedLocation, selectedVendor, reportType },
      };
      setReportData(mockReport);
      setGenerating(false);
      showToast('Report generated successfully!', 'success');
    }, 1500);
  };

  const exportReport = (format) => {
    showToast(`Exporting report as ${format.toUpperCase()}...`, 'success');
  };

  // Render appropriate chart based on report type
  const renderChart = () => {
    if (!reportData) return null;
    
    if (reportData.chartType === 'composed') {
      return (
        <ComposedChart data={reportData.data}>
          <CartesianGrid strokeDasharray="3 3" stroke={reportColors.grid} />
          <XAxis dataKey="month" tick={{ fill: reportColors.text, fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fill: reportColors.text, fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => formatCurrency(v)} />
          <Tooltip formatter={(value, name) => name === 'revenue' ? formatCurrency(value) : value} />
          <Legend />
          <Bar yAxisId="left" dataKey="bookings" name="Bookings" fill={reportColors.bookings} radius={[4, 4, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="revenue" name="Revenue" stroke={reportColors.revenue} strokeWidth={3} dot={{ r: 5, fill: reportColors.revenue }} />
        </ComposedChart>
      );
    }
    
    if (reportData.chartType === 'category') {
      return (
        <BarChart data={reportData.data} layout="vertical" margin={{ left: 120 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={reportColors.grid} />
          <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} />
          <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Bar dataKey="revenue" name="Revenue" fill={reportColors.categories} radius={[0, 4, 4, 0]} />
        </BarChart>
      );
    }
    
    if (reportData.chartType === 'location') {
      return (
        <BarChart data={reportData.data} layout="vertical" margin={{ left: 100 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={reportColors.grid} />
          <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} />
          <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Bar dataKey="revenue" name="Revenue" fill={reportColors.locations} radius={[0, 4, 4, 0]} />
        </BarChart>
      );
    }
    
    if (reportData.chartType === 'vendor') {
      return (
        <BarChart data={reportData.data} layout="vertical" margin={{ left: 120 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={reportColors.grid} />
          <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} />
          <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Bar dataKey="revenue" name="Revenue" fill={reportColors.vendors} radius={[0, 4, 4, 0]} />
        </BarChart>
      );
    }
    
    // Default - Revenue Trend with Area
    return (
      <AreaChart data={reportData.data}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={reportColors.revenue} stopOpacity={0.3}/>
            <stop offset="95%" stopColor={reportColors.revenue} stopOpacity={0.02}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={reportColors.grid} />
        <XAxis dataKey="month" tick={{ fill: reportColors.text, fontSize: 12 }} />
        <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: reportColors.text, fontSize: 12 }} />
        <Tooltip formatter={(value) => formatCurrency(value)} />
        <Area type="monotone" dataKey="revenue" name="Revenue" stroke={reportColors.revenue} strokeWidth={3} fill="url(#revenueGradient)" />
      </AreaChart>
    );
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-2xl">🔧</span> Custom Reports Generation
        </h3>
        <p className="text-sm text-gray-500 mt-1">Generate professional reports with customizable filters and export options</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">🎯</span> Report Filters
        </h4>
        
        {/* Report Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Report Type</label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'overview', label: '📊 Overview Report' },
              { id: 'revenue', label: '💰 Revenue Report' },
              { id: 'bookings', label: '📅 Bookings Report' },
              { id: 'category', label: '🏷️ Category Report' },
              { id: 'location', label: '📍 Location Report' },
              { id: 'vendor', label: '🏪 Vendor Report' },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setReportType(type.id)}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  reportType === type.id
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Filter Grid - Fixed spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Date Range</label>
            <div className="flex items-center gap-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
              />
              <span className="text-gray-400 font-medium">to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="flex-1 px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
              />
            </div>
          </div>

          {/* Service Category Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            >
              <option value="all">All Categories</option>
              {mockData.categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            >
              <option value="all">All Locations</option>
              {mockData.locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          {/* Vendor Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Vendor</label>
            <select
              value={selectedVendor}
              onChange={(e) => setSelectedVendor(e.target.value)}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            >
              <option value="all">All Vendors</option>
              {mockData.vendors.map(vendor => (
                <option key={vendor} value={vendor}>{vendor}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={generateReport}
            disabled={generating}
            className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2 shadow-sm"
          >
            {generating ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>📊 Generate Report</>
            )}
          </button>
          {reportData && (
            <div className="flex gap-2">
              <button onClick={() => exportReport('csv')} className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2 bg-white">
                📝 CSV
              </button>
              <button onClick={() => exportReport('excel')} className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2 bg-white">
                📊 Excel
              </button>
              <button onClick={() => exportReport('pdf')} className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2 bg-white">
                📄 PDF
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Report Results */}
      {reportData && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Total Bookings</span>
                <span className="text-2xl">📅</span>
              </div>
              <div className="text-2xl font-bold text-blue-600">{reportData.summary.totalBookings.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Total Revenue</span>
                <span className="text-2xl">💰</span>
              </div>
              <div className="text-2xl font-bold text-green-600">{formatCurrency(reportData.summary.totalRevenue)}</div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Avg Order Value</span>
                <span className="text-2xl">💎</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">{formatCurrency(reportData.summary.avgOrderValue)}</div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Total Customers</span>
                <span className="text-2xl">👥</span>
              </div>
              <div className="text-2xl font-bold text-cyan-600">{reportData.summary.totalCustomers.toLocaleString()}</div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">📈</span> Report Data Visualization
            </h4>
            <ResponsiveContainer width="100%" height={400}>
              {renderChart()}
            </ResponsiveContainer>
          </div>

          {/* Applied Filters */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h5 className="text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2">
              <span>🔍</span> Applied Filters:
            </h5>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-white rounded-md text-xs text-gray-600 border border-gray-200">
                📅 {dateRange.start} to {dateRange.end}
              </span>
              <span className="px-2 py-1 bg-white rounded-md text-xs text-gray-600 border border-gray-200">
                📊 {reportType === 'overview' ? 'Overview' : reportType === 'revenue' ? 'Revenue' : reportType === 'bookings' ? 'Bookings' : reportType === 'category' ? 'Category' : reportType === 'location' ? 'Location' : 'Vendor'} Report
              </span>
              {selectedCategory !== 'all' && (
                <span className="px-2 py-1 bg-white rounded-md text-xs text-gray-600 border border-gray-200">
                  🏷️ {selectedCategory}
                </span>
              )}
              {selectedLocation !== 'all' && (
                <span className="px-2 py-1 bg-white rounded-md text-xs text-gray-600 border border-gray-200">
                  📍 {selectedLocation}
                </span>
              )}
              {selectedVendor !== 'all' && (
                <span className="px-2 py-1 bg-white rounded-md text-xs text-gray-600 border border-gray-200">
                  🏢 {selectedVendor}
                </span>
              )}
            </div>
          </div>
        </>
      )}

      {!reportData && !generating && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">No Report Generated Yet</h4>
          <p className="text-sm text-gray-400">Select report type and filters, then click "Generate Report"</p>
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