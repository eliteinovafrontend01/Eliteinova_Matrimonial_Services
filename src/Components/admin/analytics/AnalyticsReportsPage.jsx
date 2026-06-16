// src/Components/admin/analytics/AnalyticsReportsPage.jsx
import { useState, useEffect } from 'react';
import { Icon } from '../shared/Icon';
import { DashboardOverviewAnalytics } from './DashboardOverviewAnalytics';
import { UserCustomerInsights } from './UserCustomerInsights';
import { VendorPerformanceReports } from './VendorPerformanceReports';
import { BookingAnalytics } from './BookingAnalytics';
import { RevenueFinancialReports } from './RevenueFinancialReports';
import { ComplaintSupportReports } from './ComplaintSupportReports';
import { ConversionGrowthMetrics } from './ConversionGrowthMetrics';
import { CustomReportsGeneration } from './CustomReportsGeneration';

export const AnalyticsReportsPage = ({ initialTab = 'overview' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [dateRange, setDateRange] = useState('6months');

  // Update activeTab when initialTab prop changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const statCards = [
    { label: 'Total Revenue', value: '₹52.8L', change: '+18.7%', icon: '💰', color: 'border-green-400', tabId: 'revenue' },
    { label: 'Total Bookings', value: '3,420', change: '+15.2%', icon: '📅', color: 'border-blue-400', tabId: 'bookings' },
    { label: 'Active Users', value: '9,865', change: '+12.5%', icon: '👥', color: 'border-purple-400', tabId: 'customers' },
    { label: 'Active Vendors', value: '845', change: '+8.3%', icon: '🏪', color: 'border-amber-400', tabId: 'vendors' },
    { label: 'Conversion Rate', value: '4.2%', change: '+0.8%', icon: '📊', color: 'border-indigo-400', tabId: 'conversion' },
    { label: 'Resolution Rate', value: '83.3%', change: '+5.2%', icon: '✅', color: 'border-emerald-400', tabId: 'complaints' },
  ];

  const tabs = [
    { id: 'overview', label: '📊 Dashboard Overview', component: DashboardOverviewAnalytics },
    { id: 'customers', label: '👥 User & Customer Insights', component: UserCustomerInsights },
    { id: 'vendors', label: '🏪 Vendor Performance', component: VendorPerformanceReports },
    { id: 'bookings', label: '📅 Booking Analytics', component: BookingAnalytics },
    { id: 'revenue', label: '💰 Revenue & Financial', component: RevenueFinancialReports },
    { id: 'complaints', label: '📞 Complaint & Support', component: ComplaintSupportReports },
    { id: 'conversion', label: '📈 Conversion & Growth', component: ConversionGrowthMetrics },
    { id: 'custom', label: '🔧 Custom Reports', component: CustomReportsGeneration },
  ];

  const featureCards = [
    { emoji: '📊', title: 'Real-time Analytics Dashboard', accentColor: 'bg-blue-50', points: ['Live metrics tracking', 'Key performance indicators (KPIs)', 'Revenue & booking trends', 'User activity monitoring'] },
    { emoji: '📈', title: 'Advanced Reporting Tools', accentColor: 'bg-green-50', points: ['Custom date range selection', 'Multi-dimensional data analysis', 'Export reports in CSV/Excel/PDF', 'Schedule automated reports'] },
    { emoji: '🎯', title: 'Performance Insights', accentColor: 'bg-purple-50', points: ['Vendor performance tracking', 'Customer behavior analysis', 'Category-wise breakdown', 'Peak period identification'] },
    { emoji: '🔍', title: 'Data Visualization', accentColor: 'bg-amber-50', points: ['Interactive charts & graphs', 'Heat maps for trends', 'Comparative analysis', 'Predictive analytics'] }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || tabs[0].component;

  const handleExportReport = () => {
    alert(`Exporting report for ${dateRange} range...`);
  };

  return (
    <div>
      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">📊</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Reports & Analytics Dashboard</h3>
              <p className="text-sm text-gray-500 mt-0.5">Comprehensive financial reports, revenue summaries, and payment trends analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-100 bg-white"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">This Year</option>
            </select>
            <button 
              onClick={handleExportReport}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div 
            key={i} 
            onClick={() => setActiveTab(s.tabId)}
            className={`bg-white rounded-2xl p-4 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
              activeTab === s.tabId ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-xl font-bold text-gray-800">{s.value}</p>
                <p className={`text-[10px] font-semibold mt-1 ${s.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                  {s.change}
                </p>
                {activeTab === s.tabId && <p className="text-[9px] text-red-500 font-bold mt-1">● Active</p>}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        {/* Tabs Header */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-base">
                  {tabs.find(t => t.id === activeTab)?.label || 'Analytics Dashboard'}
                </h3>
                <p className="text-xs text-gray-400">
                  Real-time insights and performance metrics
                </p>
              </div>
            </div>
            {activeTab !== 'overview' && (
              <button 
                onClick={() => setActiveTab('overview')} 
                className="text-xs text-red-600 font-semibold px-2 py-1 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
              >
                ✕ Back to Overview
              </button>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="overflow-x-auto -mx-1 px-1">
            <div className="flex gap-1.5 min-w-max">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-red-600 text-white shadow-md'
                      : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Component Content */}
        <div className="p-5">
          <ActiveComponent />
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {featureCards.map((c, i) => (
          <div key={i} className={`${c.accentColor} rounded-2xl p-4 border border-opacity-50 transition-all hover:shadow-md`}>
            <div className="flex items-start justify-between mb-3">
              <div className="text-3xl">{c.emoji}</div>
              <div className="w-6 h-6 rounded-full bg-white/60 flex items-center justify-center text-gray-400 text-xs">📌</div>
            </div>
            <h3 className="font-bold text-gray-800 text-sm mb-2">{c.title}</h3>
            <ul className="space-y-1.5">
              {c.points.map((point, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-gray-600">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <button className="mt-3 text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors">
              Explore <span>→</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};