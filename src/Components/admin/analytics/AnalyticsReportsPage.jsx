import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { FeatureCard } from '../shared/FeatureCard';
import { ICONS } from '../../../constants/admin/icons';

export const AnalyticsReportsPage = () => {
  const [dateRange, setDateRange] = useState('This Month');
  const [activeChart, setActiveChart] = useState('revenue');

  const chartTypes = [
    { id: 'revenue', label: 'Revenue', icon: '💰', type: 'line-area' },
    { id: 'bookings', label: 'Bookings', icon: '📅', type: 'grouped-bar' },
    { id: 'vendors', label: 'Vendors', icon: '👥', type: 'stacked-bar' },
    { id: 'categories', label: 'Categories', icon: '📊', type: 'horizontal-bar' },
    { id: 'complaints', label: 'Complaints', icon: '⚠️', type: 'donut' },
    { id: 'growth', label: 'Growth', icon: '📈', type: 'radial-progress' },
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 425000, bookings: 124, vendors: 28, complaints: 12, growth: 5, target: 400000 },
    { month: 'Feb', revenue: 389000, bookings: 108, vendors: 31, complaints: 8, growth: -2, target: 410000 },
    { month: 'Mar', revenue: 512000, bookings: 156, vendors: 35, complaints: 15, growth: 8, target: 450000 },
    { month: 'Apr', revenue: 478000, bookings: 142, vendors: 38, complaints: 11, growth: 3, target: 470000 },
    { month: 'May', revenue: 623000, bookings: 189, vendors: 42, complaints: 19, growth: 12, target: 500000 },
    { month: 'Jun', revenue: 589000, bookings: 167, vendors: 45, complaints: 14, growth: 7, target: 550000 },
  ];

  const categoryData = [
    { name: 'Photography', bookings: 1847, revenue: 831150, percentage: 22, color: '#f43f5e' },
    { name: 'Catering', bookings: 1562, revenue: 1874400, percentage: 19, color: '#f97316' },
    { name: 'Wedding Halls', bookings: 892, revenue: 3122000, percentage: 11, color: '#3b82f6' },
    { name: 'Entertainment', bookings: 1234, revenue: 3702000, percentage: 15, color: '#8b5cf6' },
    { name: 'Decorations', bookings: 1045, revenue: 679250, percentage: 13, color: '#ec489a' },
    { name: 'Bridal Styling', bookings: 978, revenue: 488000, percentage: 12, color: '#14b8a6' },
  ];

  const vendorPerformance = [
    { name: 'LensArt Studio', category: 'Photography', bookings: 124, rating: 4.9, revenue: 558000, growth: 18 },
    { name: 'Royal Feast', category: 'Catering', bookings: 112, rating: 4.8, revenue: 1344000, growth: 22 },
    { name: 'DJ Rhythm Pro', category: 'Entertainment', bookings: 134, rating: 4.9, revenue: 402000, growth: 15 },
    { name: 'Grand Palace', category: 'Wedding Halls', bookings: 89, rating: 4.9, revenue: 3115000, growth: 12 },
    { name: 'Dream Decor', category: 'Decorations', bookings: 94, rating: 4.8, revenue: 611000, growth: 8 },
    { name: 'Glam Studio', category: 'Bridal Styling', bookings: 203, rating: 4.9, revenue: 365400, growth: 28 },
  ];

  const getMaxRevenue = () => Math.max(...monthlyData.map(d => d.revenue));
  const maxRevenue = getMaxRevenue();

  const featureCards = [
    { emoji: '📈', title: 'Revenue Analytics', accentColor: 'bg-green-50', points: ['Line + Area combination chart', 'Target vs actual comparison', 'Year-over-year trends', 'Monthly revenue breakdown'] },
    { emoji: '📊', title: 'Bookings Analysis', accentColor: 'bg-blue-50', points: ['Grouped bar chart (YoY)', 'Seasonal trend detection', 'Category-wise distribution', 'Peak period identification'] },
    { emoji: '🏆', title: 'Vendor Performance', accentColor: 'bg-amber-50', points: ['Stacked bar visualization', 'New vs active vendors', 'Growth rate tracking', 'Performance metrics'] },
    { emoji: '🎨', title: 'Multi-Chart Dashboard', accentColor: 'bg-purple-50', points: ['Donut chart for complaints', 'Horizontal bars for categories', 'Radial progress for growth', 'Sparkline trend lines'] }
  ];

  // Revenue Chart Component
  const RevenueChart = () => (
    <div>
      <div className="relative h-64 mb-4">
        <svg viewBox="0 0 600 240" className="w-full h-full">
          {[0, 25, 50, 75, 100].map((percent, i) => (
            <g key={i}>
              <line x1="0" y1={240 - (percent / 100) * 200} x2="600" y2={240 - (percent / 100) * 200} stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="4" />
              <text x="585" y={240 - (percent / 100) * 200 - 3} fontSize="8" fill="#94a3b8">
                ₹{(maxRevenue * (percent / 100) / 1000).toFixed(0)}K
              </text>
            </g>
          ))}
          
          <polygon fill="url(#revenueGradient)" points={`0,240 ${monthlyData.map((d, i) => `${(i * 600) / (monthlyData.length - 1)},${240 - (d.revenue / maxRevenue) * 200}`).join(' ')} 600,240`} />
          
          <polyline fill="none" stroke="url(#revenueLineGradient)" strokeWidth="3.5" points={monthlyData.map((d, i) => `${(i * 600) / (monthlyData.length - 1)},${240 - (d.revenue / maxRevenue) * 200}`).join(' ')} />
          
          {monthlyData.map((d, i) => (
            <g key={i}>
              <circle cx={(i * 600) / (monthlyData.length - 1)} cy={240 - (d.revenue / maxRevenue) * 200} r="5" fill="#10b981" stroke="white" strokeWidth="2" />
              <text x={(i * 600) / (monthlyData.length - 1)} y={240 - (d.revenue / maxRevenue) * 200 - 10} fontSize="9" textAnchor="middle" fill="#10b981" fontWeight="bold">
                ₹{(d.revenue / 1000).toFixed(0)}K
              </text>
            </g>
          ))}
          
          <defs>
            <linearGradient id="revenueGradient" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="revenueLineGradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
        </svg>
        <div className="flex justify-between mt-2">
          {monthlyData.map(d => <div key={d.month} className="text-center flex-1"><p className="text-xs font-semibold text-gray-600">{d.month}</p></div>)}
        </div>
      </div>
    </div>
  );

  // Bookings Chart
  const BookingsChart = () => (
    <div className="relative h-80">
      <svg viewBox="0 0 700 280" className="w-full h-full">
        {[0, 50, 100, 150, 200].map((value, i) => (
          <line key={i} x1="40" y1={280 - (value / 200) * 240} x2="680" y2={280 - (value / 200) * 240} stroke="#e2e8f0" strokeWidth="0.5" />
        ))}
        {monthlyData.map((d, idx) => {
          const x = 60 + (idx * 100);
          const barWidth = 35;
          const currentHeight = (d.bookings / 200) * 240;
          return (
            <g key={idx}>
              <rect x={x} y={280 - currentHeight} width={barWidth} height={currentHeight} fill="url(#bookingGradient)" rx="4" />
              <text x={x + barWidth/2} y={280 - currentHeight - 5} fontSize="8" textAnchor="middle" fill="#2563eb" fontWeight="bold">{d.bookings}</text>
              <text x={x + barWidth/2} y={275} fontSize="9" textAnchor="middle" fill="#374151" fontWeight="semibold">{d.month}</text>
            </g>
          );
        })}
        <defs>
          <linearGradient id="bookingGradient" x1="0%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  // Categories Chart
  const CategoriesChart = () => (
    <div className="space-y-4">
      {categoryData.map((cat, idx) => (
        <div key={idx}>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-semibold flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
              {cat.name}
            </span>
            <span className="font-bold text-gray-700">{cat.bookings.toLocaleString()}</span>
          </div>
          <div className="relative h-10 bg-gray-100 rounded-xl overflow-hidden">
            <div className="absolute inset-y-0 left-0 rounded-xl flex items-center justify-end px-3 text-white text-xs font-bold" 
              style={{ width: `${cat.percentage}%`, background: `linear-gradient(90deg, ${cat.color}, ${cat.color}dd)` }}>
              {cat.percentage > 20 && `${cat.percentage}%`}
            </div>
          </div>
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>₹{(cat.revenue / 1000).toFixed(0)}K revenue</span>
            <span>{cat.percentage}% of total</span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderChart = () => {
    switch(activeChart) {
      case 'revenue': return <RevenueChart />;
      case 'bookings': return <BookingsChart />;
      case 'categories': return <CategoriesChart />;
      default: return <RevenueChart />;
    }
  };

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">📊</div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">Analytics & Reports</h3>
              <p className="text-sm text-gray-500 mt-0.5">Interactive multi-chart analytics dashboard</p>
            </div>
          </div>
          <select value={dateRange} onChange={e => setDateRange(e.target.value)} className="px-4 py-2 text-sm border border-gray-200 rounded-xl bg-white">
            <option>This Week</option><option>This Month</option><option>Last 3 Months</option><option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {[
          { label: 'Total Revenue', value: '₹28.45L', icon: '💰', color: 'border-green-400', change: '+12%' },
          { label: 'Total Bookings', value: '10,843', icon: '📅', color: 'border-blue-400', change: '+8%' },
          { label: 'Active Vendors', value: '271', icon: '👥', color: 'border-amber-400', change: '+23' },
          { label: 'Avg. Rating', value: '4.8 ★', icon: '⭐', color: 'border-purple-400', change: '+0.2' },
        ].map((s, i) => (
          <div key={i} className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} hover:shadow-md transition-all`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-gray-400 mb-1">{s.label}</p>
                <p className="text-2xl font-bold text-gray-800">{s.value}</p>
                <p className="text-xs text-green-600 mt-1">↑ {s.change}</p>
              </div>
              <div className="text-3xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="border-b border-gray-100 px-5 pt-4">
          <div className="flex gap-1 overflow-x-auto pb-2">
            {chartTypes.map(chart => (
              <button key={chart.id} onClick={() => setActiveChart(chart.id)} 
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${activeChart === chart.id ? 'bg-red-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}>
                <span>{chart.icon}</span><span>{chart.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="p-6">
          {renderChart()}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b"><h4 className="font-bold text-gray-800">📊 Category Performance</h4></div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="bg-gray-50"><th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Category</th><th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Bookings</th><th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Revenue</th><th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400">Share</th></tr></thead>
              <tbody className="divide-y">
                {categoryData.map((c, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-semibold flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }}></div>{c.name}</td>
                    <td className="px-4 py-3 text-sm">{c.bookings.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm font-semibold">₹{(c.revenue / 1000).toFixed(0)}K</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-16 bg-gray-100 rounded-full h-1.5"><div className="h-1.5 rounded-full" style={{ width: `${c.percentage}%`, backgroundColor: c.color }}></div></div><span className="text-xs text-gray-500">{c.percentage}%</span></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b"><h4 className="font-bold text-gray-800">🏆 Top Performing Vendors</h4></div>
          <div className="space-y-4 p-4">
            {vendorPerformance.slice(0, 5).map((v, i) => (
              <div key={i} className="p-3 hover:bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-100 to-amber-100 flex items-center justify-center text-lg font-bold">{v.name[0]}</div>
                    <div><p className="text-sm font-semibold">{v.name}</p><p className="text-[10px] text-gray-400">{v.category}</p></div>
                  </div>
                  <div className="text-right"><p className="text-sm font-bold">{v.bookings} bookings</p><div className="flex items-center gap-1"><span className="text-amber-400 text-xs">★</span><span className="text-xs font-semibold">{v.rating}</span><span className="text-xs text-green-600 ml-1">+{v.growth}%</span></div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>
    </div>
  );
};