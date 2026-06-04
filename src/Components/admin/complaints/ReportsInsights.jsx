// src/pages/admin/complaints/ReportsInsights.jsx
import { useState } from 'react';
import { Icon } from '../../../components/admin/shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const ReportsInsights = () => {
  const [reportPeriod, setReportPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState(null);

  const reportData = {
    complaintsByType: [
      { type: 'Service Quality Issues', count: 24, percentage: 34 },
      { type: 'Payment & Refund Issues', count: 18, percentage: 26 },
      { type: 'Booking Disputes', count: 15, percentage: 21 },
      { type: 'Vendor Misconduct', count: 12, percentage: 17 },
      { type: 'Technical Issues', count: 8, percentage: 12 },
    ],
    complaintsByMonth: [
      { month: 'Oct', count: 28, resolved: 22 },
      { month: 'Nov', count: 32, resolved: 25 },
      { month: 'Dec', count: 47, resolved: 38 },
      { month: 'Jan', count: 45, resolved: 30 },
    ],
    vendorPerformance: [
      { vendor: 'LensArt Studio', complaints: 3, resolved: 2, avgResolutionTime: 48, rating: 4.5 },
      { vendor: 'Royal Feast', complaints: 1, resolved: 1, avgResolutionTime: 24, rating: 4.2 },
      { vendor: 'Dream Decor', complaints: 5, resolved: 3, avgResolutionTime: 72, rating: 3.8 },
      { vendor: 'Shutter Stories', complaints: 8, resolved: 4, avgResolutionTime: 96, rating: 2.5 },
      { vendor: 'Grand Palace', complaints: 4, resolved: 4, avgResolutionTime: 36, rating: 4.0 },
    ],
    resolutionMetrics: {
      avgResolutionTime: 52,
      slaCompliance: 78,
      escalationRate: 12,
      customerSatisfaction: 3.8,
    },
    frequentIssues: [
      { issue: 'Vendor no-show', count: 12, category: 'Service Quality' },
      { issue: 'Refund not processed', count: 9, category: 'Payment & Refund' },
      { issue: 'Wrong service delivered', count: 7, category: 'Service Quality' },
      { issue: 'Payment deducted no confirmation', count: 8, category: 'Payment & Refund' },
      { issue: 'Unprofessional vendor behavior', count: 5, category: 'Vendor Misconduct' },
    ],
  };

  const totalComplaints = reportData.complaintsByType.reduce((sum, t) => sum + t.count, 0);

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-rose-50 to-red-50 border border-rose-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📊</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Reports & Insights</h3>
            <p className="text-sm text-gray-500 mt-0.5">Analyze complaint trends, frequent issues, and vendor performance to improve service quality</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end mb-4">
        <div className="bg-white rounded-xl p-1 flex gap-1 border">
          {['week', 'month', 'quarter', 'year'].map(p => (
            <button key={p} onClick={() => setReportPeriod(p)} className={`px-3 py-1 text-xs rounded-lg ${reportPeriod === p ? 'bg-red-600 text-white' : 'text-gray-600'}`}>
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Resolution Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-blue-400">
          <p className="text-xs text-gray-400">Avg Resolution Time</p>
          <p className="text-2xl font-bold text-gray-800">{reportData.resolutionMetrics.avgResolutionTime} hrs</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-green-400">
          <p className="text-xs text-gray-400">SLA Compliance</p>
          <p className="text-2xl font-bold text-gray-800">{reportData.resolutionMetrics.slaCompliance}%</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-amber-400">
          <p className="text-xs text-gray-400">Escalation Rate</p>
          <p className="text-2xl font-bold text-gray-800">{reportData.resolutionMetrics.escalationRate}%</p>
        </div>
        <div className="bg-white rounded-2xl p-4 shadow-sm border-l-4 border-purple-400">
          <p className="text-xs text-gray-400">Customer Satisfaction</p>
          <p className="text-2xl font-bold text-gray-800">⭐ {reportData.resolutionMetrics.customerSatisfaction}/5</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Complaints by Type */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Complaints by Type</h3>
          <div className="space-y-3">
            {reportData.complaintsByType.map(t => (
              <div key={t.type}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{t.type}</span>
                  <span className="font-semibold">{t.count}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${(t.count / totalComplaints) * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t text-center text-sm text-gray-500">Total Complaints: {totalComplaints}</div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="font-semibold text-gray-800 mb-4">Complaint Trends (Monthly)</h3>
          <div className="flex items-end h-40 gap-3">
            {reportData.complaintsByMonth.map(m => (
              <div key={m.month} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col items-center gap-1">
                  <div className="w-full bg-red-100 rounded-t relative" style={{ height: `${(m.count / 50) * 120}px` }}>
                    <div className="absolute -top-5 w-full text-center text-xs font-semibold">{m.count}</div>
                  </div>
                  <div className="w-full bg-green-100 rounded-t relative mt-1" style={{ height: `${(m.resolved / 50) * 80}px` }}>
                    <div className="absolute -top-5 w-full text-center text-xs text-green-600">{m.resolved}</div>
                  </div>
                </div>
                <p className="text-xs mt-2 font-semibold">{m.month}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-4 text-xs">
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded"></div> Received</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded"></div> Resolved</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vendor Performance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-800">Vendor Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs">Vendor</th>
                  <th className="px-3 py-2 text-center text-xs">Complaints</th>
                  <th className="px-3 py-2 text-center text-xs">Resolved</th>
                  <th className="px-3 py-2 text-center text-xs">Avg Time (hrs)</th>
                  <th className="px-3 py-2 text-center text-xs">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reportData.vendorPerformance.map(v => (
                  <tr key={v.vendor} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-xs font-medium">{v.vendor}</td>
                    <td className="px-3 py-2 text-center text-xs">{v.complaints}</td>
                    <td className="px-3 py-2 text-center text-xs">{v.resolved}</td>
                    <td className="px-3 py-2 text-center text-xs">{v.avgResolutionTime}</td>
                    <td className="px-3 py-2 text-center text-xs">⭐ {v.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Frequent Issues */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-semibold text-gray-800">Most Frequent Issues</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {reportData.frequentIssues.map((issue, idx) => (
              <div key={idx} className="p-3 flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-gray-800">{issue.issue}</p>
                  <p className="text-xs text-gray-400">{issue.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-700">{issue.count}</span>
                  <span className="text-xs text-gray-400">complaints</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm flex items-center gap-2">📊 Generate Detailed Report</button>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm flex items-center gap-2">📥 Export Insights</button>
      </div>
    </div>
  );
};