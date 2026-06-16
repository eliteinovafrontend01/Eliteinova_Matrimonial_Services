// src/components/admin/analytics/ComplaintSupportReports.jsx
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ComposedChart } from 'recharts';

// Professional Color Palette for Complaint Dashboard
const colors = {
  // Complaint metrics
  complaints: '#EF4444',     // Red - New complaints
  resolved: '#10B981',       // Green - Resolved issues
  pending: '#F59E0B',        // Amber - Pending
  progress: '#3B82F6',       // Blue - In progress
  
  // Time metrics
  resolutionTime: '#8B5CF6', // Purple - Resolution time
  satisfaction: '#14B8A6',   // Teal - Customer satisfaction
  
  // Priority colors
  urgent: '#DC2626',         // Dark Red
  high: '#F97316',           // Orange
  medium: '#F59E0B',         // Amber
  low: '#10B981',            // Green
  
  // Category gradients
  categoryColors: [
    '#DC2626',  // Payment Issues (most severe)
    '#EA580C',
    '#F97316',
    '#FB923C',
    '#FDBA74',
    '#FED7AA'
  ],
  
  // Resolution time gradient (fast to slow)
  resolutionGradient: [
    '#10B981',  // <6 hours - Fast
    '#22C55E',
    '#F59E0B',
    '#F97316',
    '#EF4444'   // >48 hours - Slow
  ],
  
  // Satisfaction gradient (excellent to terrible)
  satisfactionGradient: [
    '#10B981',  // Excellent
    '#34D399',  // Good
    '#F59E0B',  // Average
    '#F97316',  // Poor
    '#EF4444'   // Terrible
  ],
  
  // Status colors
  statusColors: {
    Resolved: '#10B981',
    Pending: '#F59E0B',
    'In Progress': '#3B82F6'
  },
  
  grid: '#E5E7EB',
  text: '#6B7280',
  darkText: '#374151',
  white: '#FFFFFF'
};

const mockData = {
  complaints: {
    total: 342,
    resolved: 285,
    pending: 42,
    inProgress: 15,
    resolutionRate: 83.3,
    avgResolutionTime: 28.5,
  },
  monthlyTrends: [
    { month: 'Jan', received: 45, resolved: 38, pending: 7 },
    { month: 'Feb', received: 52, resolved: 44, pending: 8 },
    { month: 'Mar', received: 48, resolved: 42, pending: 6 },
    { month: 'Apr', received: 56, resolved: 48, pending: 8 },
    { month: 'May', received: 62, resolved: 54, pending: 8 },
    { month: 'Jun', received: 79, resolved: 59, pending: 20 },
  ],
  resolutionRateTrend: [
    { month: 'Jan', rate: 84.4 },
    { month: 'Feb', rate: 84.6 },
    { month: 'Mar', rate: 87.5 },
    { month: 'Apr', rate: 85.7 },
    { month: 'May', rate: 87.1 },
    { month: 'Jun', rate: 74.7 },
  ],
  issuesByCategory: [
    { name: 'Payment Issues', count: 98, percentage: 28.7, avgTime: 32.5, resolved: 82 },
    { name: 'Vendor Disputes', count: 76, percentage: 22.2, avgTime: 45.2, resolved: 62 },
    { name: 'Booking Cancellation', count: 65, percentage: 19, avgTime: 24.8, resolved: 58 },
    { name: 'Quality Concerns', count: 54, percentage: 15.8, avgTime: 38.6, resolved: 42 },
    { name: 'Delivery Delays', count: 32, percentage: 9.4, avgTime: 28.3, resolved: 26 },
    { name: 'Other', count: 17, percentage: 5, avgTime: 18.5, resolved: 15 },
  ],
  resolutionTimes: [
    { name: '< 6 hours', count: 28, percentage: 9.8 },
    { name: '6-12 hours', count: 52, percentage: 18.2 },
    { name: '12-24 hours', count: 85, percentage: 29.8 },
    { name: '24-48 hours', count: 68, percentage: 23.9 },
    { name: '> 48 hours', count: 52, percentage: 18.2 },
  ],
  complaintStatus: [
    { name: 'Resolved', value: 285, percentage: 83.3 },
    { name: 'Pending', value: 42, percentage: 12.3 },
    { name: 'In Progress', value: 15, percentage: 4.4 },
  ],
  priorityDistribution: [
    { name: 'Urgent', value: 68, percentage: 19.9 },
    { name: 'High', value: 95, percentage: 27.8 },
    { name: 'Medium', value: 112, percentage: 32.7 },
    { name: 'Low', value: 67, percentage: 19.6 },
  ],
  recentComplaints: [
    { id: 'CMP001', customer: 'Rahul Sharma', issue: 'Payment Issues', status: 'Resolved', date: '2024-06-15', priority: 'High' },
    { id: 'CMP002', customer: 'Priya Mehta', issue: 'Vendor Disputes', status: 'In Progress', date: '2024-06-14', priority: 'Urgent' },
    { id: 'CMP003', customer: 'Amit Kumar', issue: 'Booking Cancellation', status: 'Pending', date: '2024-06-13', priority: 'Medium' },
    { id: 'CMP004', customer: 'Neha Singh', issue: 'Quality Concerns', status: 'Resolved', date: '2024-06-12', priority: 'High' },
    { id: 'CMP005', customer: 'Vikram Patel', issue: 'Delivery Delays', status: 'In Progress', date: '2024-06-11', priority: 'Medium' },
  ],
  satisfactionRatings: [
    { name: 'Excellent', count: 142, percentage: 42.5 },
    { name: 'Good', count: 98, percentage: 29.3 },
    { name: 'Average', count: 52, percentage: 15.6 },
    { name: 'Poor', count: 28, percentage: 8.4 },
    { name: 'Terrible', count: 14, percentage: 4.2 },
  ],
};

const StatCard = ({ title, value, subtitle, icon }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all">
    <div className="flex items-center justify-between mb-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{title}</span>
      <span className="text-2xl">{icon}</span>
    </div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
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
            {p.dataKey === 'avgTime' && ' hours'}
            {p.dataKey === 'rate' && '%'}
            {p.dataKey === 'percentage' && '%'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom label renderer for pie charts
const renderPieLabel = ({ name, percent }) => {
  return `${name} ${(percent * 100).toFixed(0)}%`;
};

export const ComplaintSupportReports = () => {
  const [filter, setFilter] = useState('monthly');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-5 border border-red-200">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Complaint & Support Reports</h3>
            <p className="text-sm text-gray-500 mt-1">Track complaints, resolution time, and common issues to improve service quality</p>
          </div>
          <div className="flex gap-2 bg-white rounded-lg p-1">
            {['weekly', 'monthly', 'quarterly'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)} 
                className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                  filter === f ? 'bg-red-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {f === 'weekly' ? 'Weekly' : f === 'monthly' ? 'Monthly' : 'Quarterly'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard title="Total Complaints" value={mockData.complaints.total} subtitle="All time" icon="📝" />
        <StatCard title="Resolved" value={mockData.complaints.resolved} subtitle={`${mockData.complaints.resolutionRate}% rate`} icon="✅" />
        <StatCard title="Pending" value={mockData.complaints.pending} subtitle="Awaiting action" icon="⏳" />
        <StatCard title="In Progress" value={mockData.complaints.inProgress} subtitle="Being addressed" icon="🔄" />
        <StatCard title="Avg Resolution" value={`${mockData.complaints.avgResolutionTime}h`} subtitle="per complaint" icon="⏱️" />
      </div>

      {/* Complaint Trends - Multi Line Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <span className="text-xl">📈</span> Complaint Trends
          </h4>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.complaints }}></div>
              <span className="text-gray-500">Received</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.resolved }}></div>
              <span className="text-gray-500">Resolved</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.pending }}></div>
              <span className="text-gray-500">Pending</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={mockData.monthlyTrends} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis dataKey="month" tick={{ fill: colors.text, fontSize: 12 }} />
            <YAxis tick={{ fill: colors.text, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="received" name="Complaints Received" stroke={colors.complaints} strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
            <Line type="monotone" dataKey="resolved" name="Complaints Resolved" stroke={colors.resolved} strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
            <Line type="monotone" dataKey="pending" name="Pending" stroke={colors.pending} strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Resolution Rate Trend */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">📊</span> Complaint Resolution Rate Trend
        </h4>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={mockData.resolutionRateTrend} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <defs>
              <linearGradient id="resolutionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.resolved} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={colors.resolved} stopOpacity={0.02}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis dataKey="month" tick={{ fill: colors.text, fontSize: 12 }} />
            <YAxis tickFormatter={(v) => `${v}%`} tick={{ fill: colors.text, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="rate" name="Resolution Rate" stroke={colors.resolved} strokeWidth={3} fill="url(#resolutionGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Issues Breakdown & Resolution Time Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues by Category - Horizontal Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">🔍</span> Issues by Category
          </h4>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={mockData.issuesByCategory} layout="vertical" margin={{ left: 130, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis type="number" tick={{ fill: colors.text, fontSize: 11 }} />
              <YAxis type="category" dataKey="name" width={130} tick={{ fill: colors.text, fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Number of Complaints" radius={[0, 4, 4, 0]}>
                {mockData.issuesByCategory.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors.categoryColors[index % colors.categoryColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Resolution Time Distribution - Vertical Bar Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">⏰</span> Resolution Time Distribution
          </h4>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={mockData.resolutionTimes} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
              <XAxis dataKey="name" tick={{ fill: colors.text, fontSize: 11 }} />
              <YAxis tick={{ fill: colors.text, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Number of Complaints" radius={[4, 4, 0, 0]}>
                {mockData.resolutionTimes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors.resolutionGradient[index % colors.resolutionGradient.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-100 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.resolutionGradient[0] }}></div>
              <span className="text-gray-500">Fast</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.resolutionGradient[2] }}></div>
              <span className="text-gray-500">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.resolutionGradient[4] }}></div>
              <span className="text-gray-500">Slow</span>
            </div>
          </div>
        </div>
      </div>

      {/* Complaint Status & Priority Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Complaint Status Distribution - Donut Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span> Complaint Status Distribution
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockData.complaintStatus}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                label={renderPieLabel}
                labelLine={{ stroke: colors.text, strokeWidth: 1.5 }}
              >
                {mockData.complaintStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors.statusColors[entry.name]} stroke={colors.white} strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} (${mockData.complaintStatus.find(s => s.name === name)?.percentage}%)`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4 pt-3 border-t border-gray-100">
            {mockData.complaintStatus.map((status, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.statusColors[status.name] }}></div>
                <span className="text-xs text-gray-600">{status.name}</span>
                <span className="text-xs font-bold">{status.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Priority Distribution - Donut Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-xl">⚠️</span> Priority Distribution
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockData.priorityDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                nameKey="name"
                label={renderPieLabel}
                labelLine={{ stroke: colors.text, strokeWidth: 1.5 }}
              >
                {mockData.priorityDistribution.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={
                      entry.name === 'Urgent' ? colors.urgent :
                      entry.name === 'High' ? colors.high :
                      entry.name === 'Medium' ? colors.medium : colors.low
                    } 
                    stroke={colors.white} 
                    strokeWidth={2} 
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} (${mockData.priorityDistribution.find(p => p.name === name)?.percentage}%)`, name]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-100 flex-wrap">
            {mockData.priorityDistribution.map((priority, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ 
                    backgroundColor: 
                      priority.name === 'Urgent' ? colors.urgent :
                      priority.name === 'High' ? colors.high :
                      priority.name === 'Medium' ? colors.medium : colors.low
                  }} 
                />
                <span className="text-xs text-gray-600">{priority.name}</span>
                <span className="text-xs font-bold">{priority.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Average Resolution Time by Issue Type - Horizontal Bar Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">⏱️</span> Average Resolution Time by Issue Type
        </h4>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={mockData.issuesByCategory} layout="vertical" margin={{ left: 130, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis type="number" label={{ value: 'Hours', position: 'insideBottom', offset: -5 }} tick={{ fill: colors.text, fontSize: 11 }} />
            <YAxis type="category" dataKey="name" width={130} tick={{ fill: colors.text, fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="avgTime" name="Average Resolution Time" fill={colors.resolutionTime} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Customer Satisfaction Ratings - Horizontal Bar Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span className="text-xl">⭐</span> Customer Satisfaction Ratings
        </h4>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={mockData.satisfactionRatings} layout="vertical" margin={{ left: 80, right: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
            <XAxis type="number" tickFormatter={(v) => `${v}%`} tick={{ fill: colors.text, fontSize: 11 }} />
            <YAxis type="category" dataKey="name" width={80} tick={{ fill: colors.text, fontSize: 12 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="percentage" name="Percentage of Customers" radius={[0, 4, 4, 0]}>
              {mockData.satisfactionRatings.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors.satisfactionGradient[index % colors.satisfactionGradient.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-gray-100 text-xs flex-wrap">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.satisfactionGradient[0] }}></div>
            <span className="text-gray-500">Excellent → Good</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.satisfactionGradient[2] }}></div>
            <span className="text-gray-500">Average</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.satisfactionGradient[4] }}></div>
            <span className="text-gray-500">Poor → Terrible</span>
          </div>
        </div>
      </div>

      {/* Recent Complaints Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h4 className="font-bold text-gray-800 flex items-center gap-2">
            <span className="text-xl">📋</span> Recent Complaints
          </h4>
          <button className="text-red-600 text-sm hover:text-red-700 font-medium transition-colors">View All →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-5 py-3">ID</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Issue Type</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Priority</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockData.recentComplaints.map(complaint => (
                <tr key={complaint.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-sm font-mono text-gray-600">{complaint.id}</td>
                  <td className="px-5 py-3 font-medium text-gray-800">{complaint.customer}</td>
                  <td className="px-5 py-3 text-sm text-gray-500">{complaint.issue}</td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      complaint.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                      complaint.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>{complaint.status}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                      complaint.priority === 'Urgent' ? 'bg-red-100 text-red-700' :
                      complaint.priority === 'High' ? 'bg-orange-100 text-orange-700' : 
                      complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                    }`}>{complaint.priority}</span>
                  </td>
                  <td className="px-5 py-3 text-sm text-gray-500">{complaint.date}</td>
                  <td className="px-5 py-3">
                    <button className="text-red-600 text-sm hover:text-red-700 font-medium transition-colors">View →</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};