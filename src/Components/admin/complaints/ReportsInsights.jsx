// src/pages/admin/complaints/ReportsInsights.jsx
import { useState, useMemo } from 'react';

export const ReportsInsights = () => {
  const [reportPeriod, setReportPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('json');
  const [showDetailedModal, setShowDetailedModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [chartHover, setChartHover] = useState(null);

  const showToastMsg = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // Monthly stacked bar chart data
  const monthlyData = {
    today: [
      { period: 'Today', resolved: 5, pending: 3, total: 8 },
    ],
    week: [
      { period: 'Mon', resolved: 8, pending: 4, total: 12 },
      { period: 'Tue', resolved: 10, pending: 5, total: 15 },
      { period: 'Wed', resolved: 14, pending: 4, total: 18 },
      { period: 'Thu', resolved: 11, pending: 3, total: 14 },
      { period: 'Fri', resolved: 15, pending: 5, total: 20 },
      { period: 'Sat', resolved: 7, pending: 3, total: 10 },
      { period: 'Sun', resolved: 4, pending: 2, total: 6 },
    ],
    month: [
      { period: 'Week 1', resolved: 22, pending: 6, total: 28 },
      { period: 'Week 2', resolved: 25, pending: 7, total: 32 },
      { period: 'Week 3', resolved: 28, pending: 7, total: 35 },
      { period: 'Week 4', resolved: 24, pending: 6, total: 30 },
    ],
    '3months': [
      { period: 'Month 1 (Nov)', resolved: 70, pending: 15, total: 85 },
      { period: 'Month 2 (Dec)', resolved: 78, pending: 14, total: 92 },
      { period: 'Month 3 (Jan)', resolved: 72, pending: 16, total: 88 },
    ],
    year: [
      { period: 'Jan', resolved: 70, pending: 15, total: 85 },
      { period: 'Feb', resolved: 65, pending: 13, total: 78 },
      { period: 'Mar', resolved: 78, pending: 14, total: 92 },
      { period: 'Apr', resolved: 72, pending: 16, total: 88 },
      { period: 'May', resolved: 80, pending: 15, total: 95 },
      { period: 'Jun', resolved: 85, pending: 17, total: 102 },
      { period: 'Jul', resolved: 82, pending: 16, total: 98 },
      { period: 'Aug', resolved: 88, pending: 17, total: 105 },
      { period: 'Sep', resolved: 92, pending: 18, total: 110 },
      { period: 'Oct', resolved: 95, pending: 20, total: 115 },
      { period: 'Nov', resolved: 90, pending: 18, total: 108 },
      { period: 'Dec', resolved: 100, pending: 20, total: 120 },
    ],
  };

  const complaintsByType = [
    { type: 'Service Quality Issues', count: 24, percentage: 34, trend: '+5%', color: '#ef4444' },
    { type: 'Payment & Refund Issues', count: 18, percentage: 26, trend: '+12%', color: '#f59e0b' },
    { type: 'Booking Disputes', count: 15, percentage: 21, trend: '-3%', color: '#8b5cf6' },
    { type: 'Vendor Misconduct', count: 12, percentage: 17, trend: '+8%', color: '#ec4899' },
    { type: 'Technical Issues', count: 8, percentage: 12, trend: '-2%', color: '#06b6d4' },
  ];

  const vendorPerformance = [
    { id: 1, vendor: 'LensArt Studio', complaints: 3, resolved: 2, pending: 1, avgResolutionTime: 48, rating: 4.5, slaBreaches: 1, compensation: 5000 },
    { id: 2, vendor: 'Royal Feast', complaints: 1, resolved: 1, pending: 0, avgResolutionTime: 24, rating: 4.2, slaBreaches: 0, compensation: 0 },
    { id: 3, vendor: 'Dream Decor', complaints: 5, resolved: 3, pending: 2, avgResolutionTime: 72, rating: 3.8, slaBreaches: 2, compensation: 15000 },
    { id: 4, vendor: 'Shutter Stories', complaints: 8, resolved: 4, pending: 4, avgResolutionTime: 96, rating: 2.5, slaBreaches: 4, compensation: 25000 },
    { id: 5, vendor: 'Grand Palace', complaints: 4, resolved: 4, pending: 0, avgResolutionTime: 36, rating: 4.0, slaBreaches: 1, compensation: 0 },
    { id: 6, vendor: 'EventPlanners Inc', complaints: 2, resolved: 2, pending: 0, avgResolutionTime: 28, rating: 4.8, slaBreaches: 0, compensation: 0 },
  ];

  const frequentIssues = [
    { issue: 'Vendor no-show', count: 12, category: 'Service Quality', trend: '+15%', severity: 'high' },
    { issue: 'Refund not processed', count: 9, category: 'Payment & Refund', trend: '+8%', severity: 'critical' },
    { issue: 'Wrong service delivered', count: 7, category: 'Service Quality', trend: '-2%', severity: 'high' },
    { issue: 'Payment deducted no confirmation', count: 8, category: 'Payment & Refund', trend: '+20%', severity: 'critical' },
    { issue: 'Unprofessional vendor behavior', count: 5, category: 'Vendor Misconduct', trend: '+5%', severity: 'medium' },
    { issue: 'Poor quality service', count: 6, category: 'Service Quality', trend: '-5%', severity: 'medium' },
  ];

  const currentData = monthlyData[reportPeriod];
  
  // Calculate KPI metrics
  const totalComplaints = currentData.reduce((sum, d) => sum + d.total, 0);
  const totalResolved = currentData.reduce((sum, d) => sum + d.resolved, 0);
  const totalPending = currentData.reduce((sum, d) => sum + d.pending, 0);
  const resolutionRate = totalComplaints > 0 ? Math.round((totalResolved / totalComplaints) * 100) : 0;
  
  // Calculate trends (compare with previous period)
  const getTrend = () => {
    if (currentData.length < 2) return { complaints: 0, resolved: 0, pending: 0 };
    const lastPeriod = currentData[currentData.length - 1];
    const previousPeriod = currentData[currentData.length - 2];
    return {
      complaints: lastPeriod.total - previousPeriod.total,
      resolved: lastPeriod.resolved - previousPeriod.resolved,
      pending: lastPeriod.pending - previousPeriod.pending,
    };
  };
  
  const trend = getTrend();

  const getMaxTotal = () => {
    return Math.max(...currentData.map(d => d.total), 0);
  };

  const getPeriodLabel = () => {
    switch(reportPeriod) {
      case 'today': return 'Today';
      case 'week': return 'This Week';
      case 'month': return 'This Month';
      case '3months': return 'Last 3 Months';
      case 'year': return 'This Year';
      default: return 'This Month';
    }
  };

  const handleExport = () => {
    let filename = `complaints_report_${reportPeriod}_${new Date().toISOString().split('T')[0]}`;
    
    switch(exportFormat) {
      case 'json':
        const exportData = {
          period: reportPeriod,
          generatedAt: new Date().toISOString(),
          kpi: { totalComplaints, totalResolved, totalPending, resolutionRate },
          monthlyData: currentData,
          complaintsByType,
          vendorPerformance,
          frequentIssues,
        };
        const jsonBlob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const jsonUrl = URL.createObjectURL(jsonBlob);
        const jsonLink = document.createElement('a');
        jsonLink.href = jsonUrl;
        jsonLink.download = `${filename}.json`;
        jsonLink.click();
        URL.revokeObjectURL(jsonUrl);
        break;
        
      case 'csv':
        let csvContent = "Period,Resolved,Pending,Total,Resolution Rate\n";
        currentData.forEach(d => {
          const rate = d.total > 0 ? Math.round((d.resolved / d.total) * 100) : 0;
          csvContent += `"${d.period}",${d.resolved},${d.pending},${d.total},${rate}%\n`;
        });
        const csvBlob = new Blob([csvContent], { type: 'text/csv' });
        const csvUrl = URL.createObjectURL(csvBlob);
        const csvLink = document.createElement('a');
        csvLink.href = csvUrl;
        csvLink.download = `${filename}.csv`;
        csvLink.click();
        URL.revokeObjectURL(csvUrl);
        break;
        
      case 'pdf':
        showToastMsg('PDF export would be implemented with a PDF library', 'info');
        break;
    }
    
    setShowExportModal(false);
    showToastMsg(`Report exported as ${exportFormat.toUpperCase()}`, 'success');
  };

  const handleGenerateDetailedReport = () => {
    setShowDetailedModal(true);
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'critical': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 md:p-6">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div className={`px-4 py-3 rounded-lg shadow-lg ${
            toast.type === 'success' ? 'bg-green-500' : 
            toast.type === 'warning' ? 'bg-orange-500' : 
            'bg-blue-500'
          } text-white`}>
            {toast.message}
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📊</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Reports & Insights</h3>
            <p className="text-sm text-gray-500 mt-0.5">Analyze complaint trends, resolution status, and vendor performance</p>
          </div>
        </div>
      </div>

      {/* Period Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="bg-white rounded-xl p-1 flex gap-1 border shadow-sm">
          {['today', 'week', 'month', '3months', 'year'].map(p => (
            <button 
              key={p} 
              onClick={() => setReportPeriod(p)} 
              className={`px-4 py-1.5 text-sm rounded-lg transition-all ${
                reportPeriod === p ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {p === '3months' ? '3 Months' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleGenerateDetailedReport}
            className="px-4 py-1.5 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            📊 Generate Detailed Report
          </button>
          <button 
            onClick={() => setShowExportModal(true)}
            className="px-4 py-1.5 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            📥 Export Insights
          </button>
        </div>
      </div>

      {/* KPI Cards - Top Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Total Complaints</p>
              <p className="text-3xl font-bold text-gray-800 mt-1">{totalComplaints}</p>
              <p className="text-xs text-gray-500 mt-1">
                {trend.complaints !== 0 && (
                  <span className={trend.complaints > 0 ? 'text-red-500' : 'text-green-500'}>
                    {trend.complaints > 0 ? `+${trend.complaints}` : trend.complaints} vs last period
                  </span>
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
              📋
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Resolved</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{totalResolved}</p>
              <p className="text-xs text-gray-500 mt-1">
                {trend.resolved !== 0 && (
                  <span className={trend.resolved > 0 ? 'text-green-500' : 'text-red-500'}>
                    {trend.resolved > 0 ? `+${trend.resolved}` : trend.resolved} vs last period
                  </span>
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
              ✅
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-orange-500 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Pending</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">{totalPending}</p>
              <p className="text-xs text-gray-500 mt-1">
                {trend.pending !== 0 && (
                  <span className={trend.pending > 0 ? 'text-red-500' : 'text-green-500'}>
                    {trend.pending > 0 ? `+${trend.pending}` : trend.pending} vs last period
                  </span>
                )}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
              ⏳
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide">Resolution Rate</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">{resolutionRate}%</p>
              <p className="text-xs text-gray-500 mt-1">
                {totalResolved} of {totalComplaints} resolved
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
              🎯
            </div>
          </div>
        </div>
      </div>

      {/* Stacked Bar Chart - Main Visualization */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-md transition-shadow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h3 className="font-semibold text-gray-800 text-lg">Complaint Status Overview</h3>
            <p className="text-xs text-gray-400 mt-0.5">Stacked breakdown of resolved vs pending complaints</p>
          </div>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-600">Resolved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-xs text-gray-600">Pending</span>
            </div>
          </div>
        </div>

        {/* Horizontal Stacked Bar Chart */}
        <div className="space-y-4">
          {currentData.map((item, idx) => {
            const resolvedPercent = (item.resolved / getMaxTotal()) * 100;
            const pendingPercent = (item.pending / getMaxTotal()) * 100;
            const totalPercent = resolvedPercent + pendingPercent;
            
            return (
              <div key={idx} className="group">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">{item.period}</span>
                  <div className="flex gap-3">
                    <span className="text-green-600">✓ {item.resolved}</span>
                    <span className="text-orange-500">⏳ {item.pending}</span>
                    <span className="text-gray-500 font-semibold">Total: {item.total}</span>
                  </div>
                </div>
                <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                  {/* Resolved Bar (Green) */}
                  <div 
                    className="absolute left-0 top-0 h-full bg-green-500 transition-all duration-500 hover:bg-green-600 cursor-pointer flex items-center justify-end pr-2"
                    style={{ width: `${resolvedPercent}%` }}
                    onMouseEnter={() => setChartHover({ type: 'resolved', period: item.period, value: item.resolved, percent: (item.resolved / item.total) * 100 })}
                    onMouseLeave={() => setChartHover(null)}
                  >
                    {resolvedPercent > 15 && (
                      <span className="text-white text-xs font-medium">{item.resolved}</span>
                    )}
                  </div>
                  
                  {/* Pending Bar (Orange) */}
                  <div 
                    className="absolute left-0 top-0 h-full bg-orange-500 transition-all duration-500 hover:bg-orange-600 cursor-pointer flex items-center justify-end pr-2"
                    style={{ left: `${resolvedPercent}%`, width: `${pendingPercent}%` }}
                    onMouseEnter={() => setChartHover({ type: 'pending', period: item.period, value: item.pending, percent: (item.pending / item.total) * 100 })}
                    onMouseLeave={() => setChartHover(null)}
                  >
                    {pendingPercent > 15 && (
                      <span className="text-white text-xs font-medium">{item.pending}</span>
                    )}
                  </div>
                </div>
                
                {/* Resolution Rate Badge */}
                <div className="text-right mt-1">
                  <span className="text-[10px] text-gray-400">
                    Resolution rate: {item.total > 0 ? Math.round((item.resolved / item.total) * 100) : 0}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex justify-between text-xs text-gray-500">
            <span>0</span>
            <span>{Math.round(getMaxTotal() * 0.25)}</span>
            <span>{Math.round(getMaxTotal() * 0.5)}</span>
            <span>{Math.round(getMaxTotal() * 0.75)}</span>
            <span>{getMaxTotal()}</span>
          </div>
          <div className="text-center text-xs text-gray-400 mt-2">
            Number of Complaints →
          </div>
        </div>
      </div>

      {/* Hover Tooltip */}
      {chartHover && (
        <div className="fixed pointer-events-none z-50 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg" style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}>
          {chartHover.type === 'resolved' ? '✅ Resolved' : '⏳ Pending'}: {chartHover.value} complaints ({Math.round(chartHover.percent)}%)
        </div>
      )}

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Complaints by Type - Donut Chart Alternative */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-800 mb-4">Complaints by Category</h3>
          <div className="space-y-3">
            {complaintsByType.map(t => (
              <div key={t.type}>
                <div className="flex justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }}></div>
                    <span className="text-gray-700">{t.type}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{t.count} ({t.percentage}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ width: `${t.percentage}%`, backgroundColor: t.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <p className="text-xs text-gray-400">Total complaints analyzed: {complaintsByType.reduce((sum, t) => sum + t.count, 0)}</p>
          </div>
        </div>

        {/* Key Metrics Summary */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <h3 className="font-semibold text-gray-800 mb-4">Key Performance Indicators</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>SLA Compliance</span>
                <span className="font-semibold">78%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '78%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">Target: 90%</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Average Resolution Time</span>
                <span className="font-semibold">52 hours</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">Target: 48 hours</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Escalation Rate</span>
                <span className="font-semibold">12%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: '12%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">Target: &lt;10%</p>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Customer Satisfaction</span>
                <span className="font-semibold">⭐ 3.8/5</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '76%' }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">Target: 4.2+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Vendor Performance Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow mb-6">
        <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
          <h3 className="font-semibold text-gray-800">Vendor Performance</h3>
          <p className="text-xs text-gray-400 mt-0.5">Ranked by complaint volume and resolution rate</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Vendor</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Complaints</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Resolved</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Pending</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Resolution Rate</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Avg Time</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vendorPerformance.map(v => {
                const resolutionRate = Math.round((v.resolved / v.complaints) * 100);
                return (
                  <tr 
                    key={v.id} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedVendor(v)}
                  >
                    <td className="px-4 py-3 text-sm font-medium text-gray-800">{v.vendor}</td>
                    <td className="px-4 py-3 text-center text-sm">{v.complaints}</td>
                    <td className="px-4 py-3 text-center text-sm text-green-600">{v.resolved}</td>
                    <td className="px-4 py-3 text-center text-sm text-orange-500">{v.pending}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-12 bg-gray-200 rounded-full h-1.5">
                          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${resolutionRate}%` }}></div>
                        </div>
                        <span className="text-xs font-medium">{resolutionRate}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-sm">{v.avgResolutionTime}h</td>
                    <td className="px-4 py-3 text-center text-sm">⭐ {v.rating}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Frequent Issues */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
          <h3 className="font-semibold text-gray-800">Most Frequent Issues</h3>
          <p className="text-xs text-gray-400 mt-0.5">Top issues requiring immediate attention</p>
        </div>
        <div className="divide-y divide-gray-100">
          {frequentIssues.map((issue, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium text-gray-800">{issue.issue}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${getSeverityColor(issue.severity)}`}>
                      {issue.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{issue.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">{issue.count}</p>
                  <p className="text-xs text-gray-400">complaints</p>
                </div>
              </div>
              <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${(issue.count / 12) * 100}%` }}
                />
              </div>
              <div className="mt-2 text-right">
                <span className={`text-xs ${issue.trend.startsWith('+') ? 'text-red-500' : 'text-green-500'}`}>
                  {issue.trend} vs last period
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowExportModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Export Report</h3>
              <p className="text-sm text-gray-500">Choose export format</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Export Format</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setExportFormat('json')}
                    className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                      exportFormat === 'json' ? 'bg-red-600 text-white border-red-600' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    JSON
                  </button>
                  <button
                    onClick={() => setExportFormat('csv')}
                    className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                      exportFormat === 'csv' ? 'bg-red-600 text-white border-red-600' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    CSV
                  </button>
                  <button
                    onClick={() => setExportFormat('pdf')}
                    className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                      exportFormat === 'pdf' ? 'bg-red-600 text-white border-red-600' : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    PDF
                  </button>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setShowExportModal(false)} 
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleExport} 
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Export Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Report Modal */}
      {showDetailedModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setShowDetailedModal(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Detailed Report</h3>
                <p className="text-sm text-gray-500">Comprehensive analysis for {getPeriodLabel()}</p>
              </div>
              <button 
                onClick={() => setShowDetailedModal(false)} 
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Executive Summary */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Executive Summary</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                  <div>
                    <p className="text-xs text-blue-600">Total Complaints</p>
                    <p className="text-xl font-bold text-blue-800">{totalComplaints}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600">Resolved</p>
                    <p className="text-xl font-bold text-green-600">{totalResolved}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600">Pending</p>
                    <p className="text-xl font-bold text-orange-600">{totalPending}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600">Resolution Rate</p>
                    <p className="text-xl font-bold text-purple-600">{resolutionRate}%</p>
                  </div>
                </div>
              </div>

              {/* Monthly Breakdown */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3">Monthly Breakdown</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left">Period</th>
                        <th className="px-3 py-2 text-center">Resolved</th>
                        <th className="px-3 py-2 text-center">Pending</th>
                        <th className="px-3 py-2 text-center">Total</th>
                        <th className="px-3 py-2 text-center">Resolution Rate</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {currentData.map((item, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-3 py-2 font-medium">{item.period}</td>
                          <td className="px-3 py-2 text-center text-green-600">{item.resolved}</td>
                          <td className="px-3 py-2 text-center text-orange-500">{item.pending}</td>
                          <td className="px-3 py-2 text-center font-semibold">{item.total}</td>
                          <td className="px-3 py-2 text-center">
                            <span className="px-2 py-1 rounded-full bg-gray-100 text-xs">
                              {Math.round((item.resolved / item.total) * 100)}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-2">📋 Recommendations</h4>
                <ul className="text-sm text-amber-700 space-y-1">
                  <li>• Focus on reducing {complaintsByType[0].type} complaints through quality checks</li>
                  <li>• Review vendor {vendorPerformance.sort((a,b) => b.complaints - a.complaints)[0]?.vendor} performance</li>
                  <li>• Implement automated payment verification to reduce payment-related complaints</li>
                  <li>• Enhance vendor onboarding process and background verification</li>
                  <li>• Target improving resolution rate to 85% by next quarter</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vendor Details Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/50" onClick={() => setSelectedVendor(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Vendor Performance Details</h3>
              <p className="text-sm text-gray-500">{selectedVendor.vendor}</p>
            </div>
            <div className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-400">Total Complaints</p>
                  <p className="text-xl font-bold text-gray-800">{selectedVendor.complaints}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-400">Resolution Rate</p>
                  <p className="text-xl font-bold text-green-600">{Math.round((selectedVendor.resolved / selectedVendor.complaints) * 100)}%</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-400">Avg Resolution Time</p>
                  <p className="text-xl font-bold text-gray-800">{selectedVendor.avgResolutionTime}h</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 text-center">
                  <p className="text-xs text-gray-400">SLA Breaches</p>
                  <p className="text-xl font-bold text-red-600">{selectedVendor.slaBreaches}</p>
                </div>
              </div>
              <div className="border-t pt-3">
                <p className="text-sm"><span className="font-semibold">Rating:</span> ⭐ {selectedVendor.rating}/5.0</p>
                <p className="text-sm"><span className="font-semibold">Total Compensation:</span> ₹{selectedVendor.compensation.toLocaleString()}</p>
                <p className="text-sm"><span className="font-semibold">Pending Complaints:</span> {selectedVendor.pending}</p>
              </div>
              <button 
                onClick={() => setSelectedVendor(null)}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};