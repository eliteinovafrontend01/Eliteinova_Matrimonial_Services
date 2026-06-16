// src/components/admin/analytics/DataExportOptions.jsx
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { Icon } from '../shared/Icon';

// Professional Export Colors
const exportColors = {
  bookings: '#F59E0B',   // Amber
  users: '#2563EB',      // Blue
  vendors: '#8B5CF6',    // Purple
  payments: '#10B981',   // Green
  complaints: '#EF4444', // Red
  
  csv: '#10B981',        // Green
  excel: '#2563EB',      // Blue
  pdf: '#EF4444',        // Red
  json: '#8B5CF6',       // Purple
  
  exportActivity: '#06B6D4', // Cyan
  storage: '#14B8A6',        // Teal
  
  grid: '#E5E7EB',
  text: '#6B7280',
  white: '#FFFFFF'
};

// Format colors for different formats
const formatColors = {
  csv: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700', radio: 'text-green-600' },
  excel: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700', radio: 'text-blue-600' },
  pdf: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700', radio: 'text-red-600' },
  json: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-700', radio: 'text-purple-600' },
};

// Data type colors
const dataTypeColors = {
  bookings: { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-700', icon: '📅' },
  users: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-700', icon: '👥' },
  vendors: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-700', icon: '🏪' },
  payments: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-700', icon: '💰' },
  complaints: { bg: 'bg-red-50', border: 'border-red-500', text: 'text-red-700', icon: '📞' },
};

// Mock data for charts
const mockData = {
  dataVolume: [
    { name: 'Bookings', count: 12500, size: 156, color: exportColors.bookings },
    { name: 'Users', count: 9840, size: 98, color: exportColors.users },
    { name: 'Vendors', count: 845, size: 42, color: exportColors.vendors },
    { name: 'Payments', count: 5600, size: 112, color: exportColors.payments },
    { name: 'Complaints', count: 342, size: 28, color: exportColors.complaints },
  ],
  exportActivity: [
    { day: 'Mon', exports: 15 },
    { day: 'Tue', exports: 22 },
    { day: 'Wed', exports: 18 },
    { day: 'Thu', exports: 30 },
    { day: 'Fri', exports: 28 },
    { day: 'Sat', exports: 12 },
    { day: 'Sun', exports: 8 },
  ],
  formatDistribution: [
    { name: 'CSV', percentage: 45, count: 450, color: exportColors.csv },
    { name: 'Excel', percentage: 30, count: 300, color: exportColors.excel },
    { name: 'PDF', percentage: 15, count: 150, color: exportColors.pdf },
    { name: 'JSON', percentage: 10, count: 100, color: exportColors.json },
  ],
  storageUsage: [
    { name: 'Reports', size: 45, color: exportColors.users },
    { name: 'Analytics', size: 28, color: exportColors.exportActivity },
    { name: 'Payments', size: 18, color: exportColors.payments },
    { name: 'Users', size: 9, color: exportColors.vendors },
  ],
  formatComparison: [
    { format: 'CSV', size: 2, time: 2, color: exportColors.csv },
    { format: 'Excel', size: 8, time: 4, color: exportColors.excel },
    { format: 'PDF', size: 5, time: 3, color: exportColors.pdf },
    { format: 'JSON', size: 1, time: 1, color: exportColors.json },
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
            {p.name}: {p.dataKey === 'count' ? p.value.toLocaleString() : p.value}
            {p.dataKey === 'percentage' && '%'}
            {p.dataKey === 'size' && ' MB'}
            {p.dataKey === 'time' && ' sec'}
            {p.dataKey === 'exports' && ' exports'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const DataExportOptions = () => {
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedData, setSelectedData] = useState({
    bookings: true,
    users: true,
    vendors: true,
    payments: true,
    complaints: false,
  });
  const [toast, setToast] = useState({ show: false, message: '' });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleExport = () => {
    const selectedCount = Object.values(selectedData).filter(v => v).length;
    showToast(`Exporting ${selectedCount} data types as ${selectedFormat.toUpperCase()}...`);
  };

  const exportFormats = [
    { id: 'csv', label: 'CSV', icon: '📝', description: 'Comma Separated Values - Best for Excel' },
    { id: 'excel', label: 'Excel', icon: '📊', description: 'Microsoft Excel Format - Includes formatting' },
    { id: 'pdf', label: 'PDF', icon: '📄', description: 'PDF Document - Best for printing' },
    { id: 'json', label: 'JSON', icon: '🔧', description: 'JSON Format - For developers' },
  ];

  const dataTypes = [
    { id: 'bookings', label: 'Bookings Data', icon: '📅', description: 'All booking records with details' },
    { id: 'users', label: 'Users Data', icon: '👥', description: 'Customer information and profiles' },
    { id: 'vendors', label: 'Vendors Data', icon: '🏪', description: 'Vendor profiles and performance' },
    { id: 'payments', label: 'Payments Data', icon: '💰', description: 'Transaction and payment records' },
    { id: 'complaints', label: 'Complaints Data', icon: '📞', description: 'Support tickets and resolutions' },
  ];

  // Calculate estimated rows and size
  const getEstimatedRows = () => {
    let rows = 0;
    if (selectedData.bookings) rows += 12500;
    if (selectedData.users) rows += 9840;
    if (selectedData.vendors) rows += 845;
    if (selectedData.payments) rows += 5600;
    if (selectedData.complaints) rows += 342;
    return rows.toLocaleString();
  };

  const getEstimatedSize = () => {
    let size = 0;
    if (selectedData.bookings) size += 156;
    if (selectedData.users) size += 98;
    if (selectedData.vendors) size += 42;
    if (selectedData.payments) size += 112;
    if (selectedData.complaints) size += 28;
    
    if (selectedFormat === 'excel') size = size * 1.5;
    if (selectedFormat === 'pdf') size = size * 1.2;
    if (selectedFormat === 'json') size = size * 0.8;
    
    if (size > 1024) return `${(size / 1024).toFixed(1)} GB`;
    return `${size.toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className="bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg">
            {toast.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📥</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Data Export Options</h3>
            <p className="text-sm text-gray-500 mt-0.5">Export platform data in multiple formats for external analysis</p>
          </div>
        </div>
      </div>

      {/* Charts Section - Data Volume & Export Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Volume by Module */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span> Data Volume by Module
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData.dataVolume} layout="vertical" margin={{ left: 80 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={exportColors.grid} />
              <XAxis type="number" tick={{ fill: exportColors.text, fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={80} tick={{ fill: exportColors.text, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Number of Records" radius={[0, 4, 4, 0]}>
                {mockData.dataVolume.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-100 text-xs flex-wrap">
            {mockData.dataVolume.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-gray-500">{item.name}</span>
                <span className="font-bold">{item.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Export Activity Trend */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📈</span> Export Activity Trend
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={mockData.exportActivity} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <defs>
                <linearGradient id="activityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={exportColors.exportActivity} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={exportColors.exportActivity} stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={exportColors.grid} />
              <XAxis dataKey="day" tick={{ fill: exportColors.text, fontSize: 12 }} />
              <YAxis tick={{ fill: exportColors.text, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="exports" name="Exports" stroke={exportColors.exportActivity} strokeWidth={3} fill="url(#activityGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Format Distribution & Storage Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Export Format Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span> Export Format Distribution
          </h4>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={mockData.formatDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="percentage"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: exportColors.text, strokeWidth: 1.5 }}
              >
                {mockData.formatDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={exportColors.white} strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4 pt-3 border-t border-gray-100">
            {mockData.formatDistribution.map((format, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: format.color }}></div>
                <span className="text-xs text-gray-600">{format.name}</span>
                <span className="text-xs font-bold">{format.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Storage Usage */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">💾</span> Storage Usage by Category
          </h4>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={mockData.storageUsage}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="size"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: exportColors.text, strokeWidth: 1.5 }}
              >
                {mockData.storageUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={exportColors.white} strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-100 flex-wrap">
            {mockData.storageUsage.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-xs text-gray-600">{item.name}</span>
                <span className="text-xs font-bold">{item.size}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Format Comparison */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">⚖️</span> Format Comparison (Size vs Export Time)
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockData.formatComparison} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={exportColors.grid} />
            <XAxis dataKey="format" tick={{ fill: exportColors.text, fontSize: 12 }} />
            <YAxis yAxisId="left" label={{ value: 'Size (MB)', angle: -90, position: 'insideLeft' }} tick={{ fill: exportColors.text, fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Time (seconds)', angle: 90, position: 'insideRight' }} tick={{ fill: exportColors.text, fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar yAxisId="left" dataKey="size" name="File Size (MB)" fill={exportColors.bookings} radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="time" name="Export Time (sec)" fill={exportColors.complaints} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Main Export Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Format Selection */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">📄</span> Export Format
            </h4>
            <div className="space-y-2">
              {exportFormats.map(format => (
                <label
                  key={format.id}
                  className={`flex items-center p-3 rounded-xl cursor-pointer transition-all border ${
                    selectedFormat === format.id
                      ? `${formatColors[format.id].border} ${formatColors[format.id].bg}`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={format.id}
                    checked={selectedFormat === format.id}
                    onChange={(e) => setSelectedFormat(e.target.value)}
                    className={`mr-3 ${formatColors[format.id].radio} focus:ring-${format.id === 'csv' ? 'green' : format.id === 'excel' ? 'blue' : format.id === 'pdf' ? 'red' : 'purple'}-500`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{format.icon}</span>
                      <span className={`font-semibold ${selectedFormat === format.id ? formatColors[format.id].text : 'text-gray-800'}`}>{format.label}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{format.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">📅</span> Date Range
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Start Date</label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">End Date</label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-100 focus:border-red-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Data Selection */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-xl">📊</span> Select Data to Export
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {dataTypes.map(type => (
                <label
                  key={type.id}
                  className={`flex items-start p-3 rounded-xl cursor-pointer transition-all border ${
                    selectedData[type.id]
                      ? `${dataTypeColors[type.id].border} ${dataTypeColors[type.id].bg}`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedData[type.id]}
                    onChange={(e) => setSelectedData({ ...selectedData, [type.id]: e.target.checked })}
                    className={`mt-1 mr-3 rounded ${dataTypeColors[type.id].text} focus:ring-${type.id === 'bookings' ? 'amber' : type.id === 'users' ? 'blue' : type.id === 'vendors' ? 'purple' : type.id === 'payments' ? 'green' : 'red'}-500`}
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{type.icon}</span>
                      <span className={`font-semibold ${selectedData[type.id] ? dataTypeColors[type.id].text : 'text-gray-800'}`}>{type.label}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{type.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Export Summary & Action */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-5">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-xl">📋</span> Export Summary
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">Estimated Rows</p>
                <p className="text-xl font-bold text-blue-600">{getEstimatedRows()}</p>
              </div>
              <div className="bg-white rounded-lg p-3 text-center">
                <p className="text-xs text-gray-500">Estimated File Size</p>
                <p className="text-xl font-bold text-green-600">{getEstimatedSize()}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Format:</span>
                <span className={`font-semibold ${formatColors[selectedFormat].text}`}>
                  {exportFormats.find(f => f.id === selectedFormat)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Data Types:</span>
                <span className="font-semibold">{Object.values(selectedData).filter(v => v).length} selected</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Date Range:</span>
                <span className="font-semibold">
                  {dateRange.start && dateRange.end 
                    ? `${dateRange.start} to ${dateRange.end}`
                    : 'All time'}
                </span>
              </div>
            </div>
            <button
              onClick={handleExport}
              className="w-full py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-all flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Data
            </button>
          </div>
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