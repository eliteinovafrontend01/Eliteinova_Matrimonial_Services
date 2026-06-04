// src/components/admin/payments/ReportsAnalytics.jsx
import { useState, useEffect } from 'react';
import { Icon } from '../shared/Icon';
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

// Comprehensive Mock Data
const mockData = {
  // Revenue Data
  revenue: {
    daily: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      revenue: [28500, 42300, 156700, 89200, 34500, 67800, 45200],
      target: [30000, 45000, 120000, 80000, 35000, 60000, 40000],
      growth: [-5, -6, +30, +11, -1, +13, +13]
    },
    weekly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      revenue: [185000, 220000, 198000, 245000],
      target: [200000, 210000, 220000, 230000],
      growth: [-7.5, +4.8, -10, +6.5]
    },
    monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      revenue: [385000, 402000, 398000, 425000, 445000, 478000, 492000, 510000, 535000, 562000, 588000, 625000],
      target: [380000, 400000, 410000, 420000, 440000, 460000, 480000, 500000, 520000, 550000, 570000, 600000],
      growth: [+1.3, +0.5, -2.9, +1.2, +3.3, +7.4, +2.9, +3.7, +4.9, +5.0, +4.6, +6.3]
    }
  },
  
  // Transaction Data
  transactions: {
    daily: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], count: [4, 6, 12, 7, 5, 8, 6], success: [4, 5, 11, 7, 4, 8, 6], failed: [0, 1, 1, 0, 1, 0, 0] },
    weekly: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], count: [22, 26, 24, 30], success: [21, 24, 23, 29], failed: [1, 2, 1, 1] },
    monthly: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], count: [42, 46, 44, 50, 52, 58], success: [40, 44, 42, 48, 50, 56], failed: [2, 2, 2, 2, 2, 2] }
  },
  
  // Vendor Performance
  vendors: [
    { id: 1, name: 'Grand Palace', category: 'Wedding Halls', revenue: 350000, commission: 35000, bookings: 7, rating: 4.8, growth: '+15%', status: 'Top Performer' },
    { id: 2, name: 'Premier Catering', category: 'Catering', revenue: 245000, commission: 24500, bookings: 11, rating: 4.7, growth: '+8%', status: 'High Volume' },
    { id: 3, name: 'ABC Events', category: 'Photography', revenue: 185000, commission: 18500, bookings: 9, rating: 4.9, growth: '+22%', status: 'Rising Star' },
    { id: 4, name: 'Elite Photography', category: 'Photography', revenue: 165000, commission: 16500, bookings: 8, rating: 4.6, growth: '+5%', status: 'Stable' },
    { id: 5, name: 'XYZ Decor', category: 'Decorations', revenue: 125000, commission: 12500, bookings: 7, rating: 4.5, growth: '-2%', status: 'Needs Attention' },
    { id: 6, name: 'Melody Music', category: 'Entertainment', revenue: 98000, commission: 9800, bookings: 6, rating: 4.7, growth: '+12%', status: 'Growing' },
    { id: 7, name: 'Royal Feast', category: 'Catering', revenue: 195000, commission: 19500, bookings: 8, rating: 4.8, growth: '+18%', status: 'Top Performer' },
    { id: 8, name: 'Shutter Stories', category: 'Photography', revenue: 145000, commission: 14500, bookings: 7, rating: 4.4, growth: '+3%', status: 'Stable' }
  ],
  
  // Payment Methods Distribution
  paymentMethods: {
    current: [
      { name: 'UPI', percentage: 44, amount: 385000, color: '#ef4444', trend: '+5%' },
      { name: 'Credit Card', percentage: 28, amount: 245000, color: '#f97316', trend: '+2%' },
      { name: 'Debit Card', percentage: 12, amount: 105000, color: '#eab308', trend: '-1%' },
      { name: 'Net Banking', percentage: 10, amount: 87500, color: '#22c55e', trend: '+3%' },
      { name: 'Wallet', percentage: 6, amount: 52500, color: '#06b6d4', trend: '-2%' }
    ],
    historical: [
      { month: 'Jan', UPI: 35, Card: 42, NetBanking: 15, Wallet: 8 },
      { month: 'Feb', UPI: 38, Card: 40, NetBanking: 14, Wallet: 8 },
      { month: 'Mar', UPI: 40, Card: 38, NetBanking: 13, Wallet: 9 },
      { month: 'Apr', UPI: 42, Card: 35, NetBanking: 12, Wallet: 11 },
      { month: 'May', UPI: 44, Card: 32, NetBanking: 11, Wallet: 13 },
      { month: 'Jun', UPI: 44, Card: 28, NetBanking: 10, Wallet: 18 }
    ]
  },
  
  // Geographic Distribution
  locations: [
    { city: 'Mumbai', revenue: 425000, percentage: 28, bookings: 45 },
    { city: 'Delhi', revenue: 385000, percentage: 25, bookings: 42 },
    { city: 'Bangalore', revenue: 295000, percentage: 19, bookings: 38 },
    { city: 'Chennai', revenue: 185000, percentage: 12, bookings: 25 },
    { city: 'Kolkata', revenue: 145000, percentage: 9, bookings: 20 },
    { city: 'Others', revenue: 105000, percentage: 7, bookings: 18 }
  ],
  
  // Customer Segments
  segments: [
    { name: 'Wedding', revenue: 850000, percentage: 55, bookings: 85, avgValue: 10000 },
    { name: 'Corporate', revenue: 385000, percentage: 25, bookings: 42, avgValue: 9167 },
    { name: 'Birthday', revenue: 185000, percentage: 12, bookings: 65, avgValue: 2846 },
    { name: 'Anniversary', revenue: 85000, percentage: 5, bookings: 28, avgValue: 3036 },
    { name: 'Other', revenue: 45000, percentage: 3, bookings: 20, avgValue: 2250 }
  ],
  
  // Monthly Trends
  trends: {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    revenue: [385000, 402000, 398000, 425000, 445000, 478000, 492000, 510000, 535000, 562000, 588000, 625000],
    customers: [128, 135, 132, 142, 148, 156, 162, 168, 175, 182, 188, 195],
    avgOrderValue: [3008, 2978, 3015, 2993, 3007, 3064, 3037, 3036, 3057, 3088, 3128, 3205]
  }
};

// Date Range Picker Component
const DateRangePicker = ({ range, setRange }) => (
  <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
    <button onClick={() => setRange('week')} className={`px-4 py-1.5 text-sm rounded-md transition-all ${range === 'week' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>
      📅 This Week
    </button>
    <button onClick={() => setRange('month')} className={`px-4 py-1.5 text-sm rounded-md transition-all ${range === 'month' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>
      📆 This Month
    </button>
    <button onClick={() => setRange('quarter')} className={`px-4 py-1.5 text-sm rounded-md transition-all ${range === 'quarter' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>
      📊 Last 3 Months
    </button>
    <button onClick={() => setRange('year')} className={`px-4 py-1.5 text-sm rounded-md transition-all ${range === 'year' ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}>
      🗓️ This Year
    </button>
  </div>
);

// Revenue Chart Component
const RevenueChart = ({ data, target }) => {
  const values = data.values || data.revenue;
  const targetValues = target || data.target;
  
  if (!values || values.length === 0) {
    return <div className="text-center py-8 text-gray-400">No revenue data available</div>;
  }
  
  const maxValue = Math.max(...values, ...(targetValues || []));
  
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-xs font-medium text-gray-600">Actual Revenue</span>
        </div>
        {targetValues && (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-blue-400 rounded-full"></div>
            <span className="text-xs font-medium text-gray-600">Target</span>
          </div>
        )}
      </div>
      <div className="flex items-end gap-2 h-72 pt-4">
        {data.labels.map((label, i) => {
          const height = maxValue > 0 ? (values[i] / maxValue) * 250 : 0;
          const targetHeight = targetValues ? (targetValues[i] / maxValue) * 250 : 0;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full relative group">
                <div className="relative" style={{ height: `${Math.max(height, targetHeight)}px` }}>
                  {targetValues && (
                    <div 
                      className="absolute w-px bg-blue-400"
                      style={{ height: `${targetHeight}px`, bottom: 0, left: '50%' }}
                    >
                      <div className="w-2 h-2 bg-blue-400 rounded-full absolute -top-1 -left-1"></div>
                    </div>
                  )}
                  <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t transition-all duration-300 hover:opacity-90 cursor-pointer"
                    style={{ height: `${height}px` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {formatCurrency(values[i])}
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500 font-medium">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Transaction Chart Component
const TransactionChart = ({ data }) => {
  const maxValue = Math.max(...data.count);
  
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded"></div><span className="text-xs font-medium text-gray-600">Successful</span></div>
        <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-400 rounded"></div><span className="text-xs font-medium text-gray-600">Failed</span></div>
      </div>
      <div className="flex items-end gap-2 h-72 pt-4">
        {data.labels.map((label, i) => {
          const successHeight = (data.success[i] / maxValue) * 250;
          const failedHeight = (data.failed[i] / maxValue) * 250;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex flex-col items-center gap-1">
                <div 
                  className="w-full bg-green-500 rounded-t transition-all duration-300 hover:opacity-90 relative group"
                  style={{ height: `${successHeight}px` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                    {data.success[i]} successful
                  </div>
                </div>
                <div 
                  className="w-full bg-red-400 rounded-t transition-all duration-300 hover:opacity-90 relative group"
                  style={{ height: `${failedHeight}px` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-0.5 rounded whitespace-nowrap">
                    {data.failed[i]} failed
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500 font-medium">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Donut Chart Component
const DonutChart = ({ data }) => {
  let currentAngle = 0;
  const total = data.reduce((sum, item) => sum + item.percentage, 0);
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {data.map((item, i) => {
            const angle = (item.percentage / total) * 360;
            const startAngle = currentAngle;
            const endAngle = currentAngle + angle;
            currentAngle = endAngle;
            
            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            
            const x1 = 50 + 35 * Math.cos(startRad);
            const y1 = 50 + 35 * Math.sin(startRad);
            const x2 = 50 + 35 * Math.cos(endRad);
            const y2 = 50 + 35 * Math.sin(endRad);
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            return (
              <path
                key={i}
                d={`M 50 50 L ${x1} ${y1} A 35 35 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={item.color}
                className="transition-all duration-300 cursor-pointer hover:opacity-80"
                stroke="white"
                strokeWidth="1.5"
              />
            );
          })}
          <circle cx="50" cy="50" r="20" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-2xl font-bold text-gray-800">{total}%</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-xs text-gray-600">{item.name}</span>
            <span className="text-xs font-bold text-gray-800">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Line Chart Component for Trends
const LineChart = ({ data, lines }) => {
  const maxValue = Math.max(...Object.values(lines).flat());
  const colors = ['#ef4444', '#3b82f6', '#22c55e'];
  const names = ['Revenue (₹L)', 'Customers', 'Avg Order Value'];
  
  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        {Object.entries(lines).map(([key, values], idx) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-3 h-0.5 bg-${idx === 0 ? 'red' : idx === 1 ? 'blue' : 'green'}-500`} style={{ backgroundColor: colors[idx] }}></div>
            <span className="text-xs font-medium text-gray-600">{names[idx]}</span>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 800 200" className="w-full h-48">
        {Object.entries(lines).map(([key, values], lineIdx) => {
          const points = values.map((value, i) => {
            const x = (i / (values.length - 1)) * 780 + 10;
            const y = 190 - (value / maxValue) * 170;
            return `${x},${y}`;
          }).join(' ');
          
          return (
            <g key={key}>
              <polyline
                points={points}
                fill="none"
                stroke={colors[lineIdx]}
                strokeWidth="2"
                className="transition-all"
              />
              {values.map((value, i) => {
                const x = (i / (values.length - 1)) * 780 + 10;
                const y = 190 - (value / maxValue) * 170;
                const displayValue = lineIdx === 0 ? formatCurrency(value * 1000) : lineIdx === 1 ? value : formatCurrency(value);
                return (
                  <g key={`${key}-${i}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r="3"
                      fill={colors[lineIdx]}
                      className="cursor-pointer hover:r-5 transition-all"
                    />
                    <title>{displayValue}</title>
                  </g>
                );
              })}
            </g>
          );
        })}
        {/* X-axis labels */}
        {data.map((label, i) => {
          const x = (i / (data.length - 1)) * 780 + 10;
          return (
            <text key={`label-${i}`} x={x} y="195" textAnchor="middle" className="text-xs fill-gray-400">
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// Main Component
export const ReportsAnalytics = () => {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('overview');
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  const getRevenueData = () => {
    switch(dateRange) {
      case 'week': return mockData.revenue.daily;
      case 'month': return mockData.revenue.weekly;
      case 'quarter': return { 
        labels: mockData.revenue.monthly.labels.slice(0, 3), 
        revenue: mockData.revenue.monthly.revenue.slice(0, 3), 
        target: mockData.revenue.monthly.target.slice(0, 3) 
      };
      default: return mockData.revenue.monthly;
    }
  };
  
  const getTransactionData = () => {
    switch(dateRange) {
      case 'week': return mockData.transactions.daily;
      case 'month': return mockData.transactions.weekly;
      default: return mockData.transactions.monthly;
    }
  };
  
  const revenueData = getRevenueData();
  const transactionData = getTransactionData();
  
  const totalRevenue = revenueData.revenue?.reduce((a,b) => a + b, 0) || 0;
  const totalTransactions = transactionData.count?.reduce((a,b) => a + b, 0) || 0;
  const avgTransaction = totalTransactions > 0 ? Math.round(totalRevenue / totalTransactions) : 0;
  const successRate = Math.round((transactionData.success?.reduce((a,b) => a + b, 0) / totalTransactions) * 100) || 0;
  
  const showToastMsg = (message, type = 'success') => { 
    setToast({ show: true, message, type }); 
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000); 
  };
  
  const handleExport = (format) => { 
    showToastMsg(`Exporting ${reportType} report as ${format.toUpperCase()}`, 'success'); 
    setShowExportMenu(false); 
  };
  
  // Top vendors by revenue
  const topVendors = [...mockData.vendors].sort((a,b) => b.revenue - a.revenue).slice(0, 5);
  
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
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <div className="text-4xl">📊</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Reports & Analytics Dashboard</h3>
              <p className="text-sm text-gray-500 mt-0.5">Comprehensive financial reports, revenue summaries, vendor earnings, and payment trends</p>
            </div>
          </div>
          <div className="relative">
            <button onClick={() => setShowExportMenu(!showExportMenu)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 text-sm font-semibold">
              📥 Export Report
            </button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 z-10 overflow-hidden">
                <button onClick={() => handleExport('pdf')} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm transition-colors">📄 PDF Document</button>
                <button onClick={() => handleExport('excel')} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm transition-colors">📊 Excel Spreadsheet</button>
                <button onClick={() => handleExport('csv')} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm transition-colors">📝 CSV File</button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Report Type Tabs */}
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
      
      {/* KPI Cards - Always Visible */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-red-500 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalRevenue)}</p>
              <p className="text-xs text-green-600 mt-1">↑ +12.5% vs last period</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-blue-500 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Transactions</p>
              <p className="text-2xl font-bold text-gray-800">{totalTransactions}</p>
              <p className="text-xs text-green-600 mt-1">↑ +8.3% vs last period</p>
            </div>
            <div className="text-3xl">🔄</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-green-500 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Average Order Value</p>
              <p className="text-2xl font-bold text-gray-800">{formatCurrency(avgTransaction)}</p>
              <p className="text-xs text-green-600 mt-1">↑ +4.2% vs last period</p>
            </div>
            <div className="text-3xl">📊</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-purple-500 transition-all hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-gray-800">{successRate}%</p>
              <p className="text-xs text-green-600 mt-1">↑ +2.1% vs last period</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>
      </div>
      
      {/* Overview Dashboard */}
      {reportType === 'overview' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
              <span className="text-2xl">📈</span> Revenue & Growth Trends
            </h4>
            <LineChart 
              data={mockData.trends.months.slice(0, dateRange === 'year' ? 12 : 6)} 
              lines={{
                revenue: mockData.trends.revenue.slice(0, dateRange === 'year' ? 12 : 6),
                customers: mockData.trends.customers.slice(0, dateRange === 'year' ? 12 : 6).map(c => c * 100),
                avgOrderValue: mockData.trends.avgOrderValue.slice(0, dateRange === 'year' ? 12 : 6)
              }}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🏆</span> Top Performing Vendors
              </h4>
              <div className="space-y-3">
                {topVendors.map((vendor, i) => (
                  <div key={vendor.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-gray-400 w-6">#{i+1}</span>
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{vendor.name}</p>
                        <p className="text-xs text-gray-400">{vendor.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{formatCurrency(vendor.revenue)}</p>
                      <p className="text-xs text-gray-400">{vendor.bookings} bookings</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">🌍</span> Revenue by Location
              </h4>
              <div className="space-y-3">
                {mockData.locations.map(loc => (
                  <div key={loc.city}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{loc.city}</span>
                      <span className="font-semibold text-gray-800">{formatCurrency(loc.revenue)} ({loc.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all" style={{ width: `${loc.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
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
          <RevenueChart data={{ labels: revenueData.labels, revenue: revenueData.revenue }} target={revenueData.target} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-500">Highest Revenue</p>
              <p className="font-bold text-green-600">{formatCurrency(Math.max(...revenueData.revenue))}</p>
              <p className="text-xs text-gray-500 mt-1">{revenueData.labels[revenueData.revenue.indexOf(Math.max(...revenueData.revenue))]}</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-xs text-gray-500">Lowest Revenue</p>
              <p className="font-bold text-red-600">{formatCurrency(Math.min(...revenueData.revenue))}</p>
              <p className="text-xs text-gray-500 mt-1">{revenueData.labels[revenueData.revenue.indexOf(Math.min(...revenueData.revenue))]}</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-500">Average Revenue</p>
              <p className="font-bold text-blue-600">{formatCurrency(Math.round(revenueData.revenue.reduce((a,b)=>a+b,0)/revenueData.revenue.length))}</p>
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
          <TransactionChart data={transactionData} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-100">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-gray-500">Success Rate</p>
              <p className="font-bold text-green-600">{successRate}%</p>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <p className="text-xs text-gray-500">Failed Transactions</p>
              <p className="font-bold text-red-600">{transactionData.failed?.reduce((a,b)=>a+b,0) || 0}</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-gray-500">Total Transactions</p>
              <p className="font-bold text-blue-600">{totalTransactions}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Vendors Report */}
      {reportType === 'vendors' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h4 className="font-bold text-gray-800 text-lg mb-4 flex items-center gap-2">
            <span className="text-2xl">🏢</span> Vendor Performance
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200">
                <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3">Vendor</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3 text-right">Revenue</th>
                  <th className="pb-3 text-right">Commission</th>
                  <th className="pb-3 text-right">Bookings</th>
                  <th className="pb-3 text-right">Rating</th>
                  <th className="pb-3 text-right">Growth</th>
                </tr>
              </thead>
              <tbody>
                {mockData.vendors.map(vendor => (
                  <tr key={vendor.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 font-semibold text-gray-800">{vendor.name}</td>
                    <td className="py-3 text-sm text-gray-600">{vendor.category}</td>
                    <td className="py-3 text-right font-bold text-green-600">{formatCurrency(vendor.revenue)}</td>
                    <td className="py-3 text-right text-red-500">{formatCurrency(vendor.commission)}</td>
                    <td className="py-3 text-right text-gray-700">{vendor.bookings}</td>
                    <td className="py-3 text-right"><span className="text-yellow-500">★</span> {vendor.rating}</td>
                    <td className="py-3 text-right"><span className={vendor.growth.startsWith('+') ? 'text-green-600 font-semibold' : 'text-red-600'}>{vendor.growth}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Payments Report */}
      {reportType === 'payments' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">💳</span> Payment Method Distribution
            </h4>
            <DonutChart data={mockData.paymentMethods.current} />
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span> Payment Trends Over Time
            </h4>
            <div className="space-y-3">
              {mockData.paymentMethods.historical.slice(-6).map((month, i) => (
                <div key={i} className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold text-gray-700">{month.month}</span>
                    <span className="text-xs text-gray-500">UPI: {month.UPI}% | Card: {month.Card}% | NB: {month.NetBanking}% | Wallet: {month.Wallet}%</span>
                  </div>
                  <div className="flex h-2 rounded-full overflow-hidden">
                    <div className="bg-red-500" style={{ width: `${month.UPI}%` }}></div>
                    <div className="bg-orange-500" style={{ width: `${month.Card}%` }}></div>
                    <div className="bg-green-500" style={{ width: `${month.NetBanking}%` }}></div>
                    <div className="bg-cyan-500" style={{ width: `${month.Wallet}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
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
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📅</span>
                  <p className="font-semibold text-gray-800">Best Performing Day</p>
                </div>
                <p className="text-sm text-gray-600">Wednesday generates the highest revenue with an average of <span className="font-semibold">{formatCurrency(156700)}</span>, which is 45% higher than the weekly average.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🏆</span>
                  <p className="font-semibold text-gray-800">Top Vendor Performance</p>
                </div>
                <p className="text-sm text-gray-600">Grand Palace leads with <span className="font-semibold">{formatCurrency(350000)}</span> revenue, contributing 15% of total platform revenue. Weddings category is the strongest segment.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">💳</span>
                  <p className="font-semibold text-gray-800">Payment Method Adoption</p>
                </div>
                <p className="text-sm text-gray-600">UPI has grown 44% adoption rate (+9% YoY), while card payments decreased by 14%. Focus on UPI-first payment experience.</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Actionable Recommendations
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🚀</span>
                  <p className="font-semibold text-gray-800">Boost Mid-Week Sales</p>
                </div>
                <p className="text-sm text-gray-600">Launch "Wednesdays Wedding Special" campaign to capitalize on highest revenue day. Offer 5% discount on Wednesday bookings.</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🏢</span>
                  <p className="font-semibold text-gray-800">Vendor Incentive Program</p>
                </div>
                <p className="text-sm text-gray-600">Top 3 vendors should receive priority support and reduced commission rates to maintain quality.</p>
              </div>
              <div className="p-4 bg-teal-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📱</span>
                  <p className="font-semibold text-gray-800">Optimize Mobile Payments</p>
                </div>
                <p className="text-sm text-gray-600">Since 44% of payments are via UPI, ensure seamless mobile checkout experience. Add more UPI apps integration.</p>
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