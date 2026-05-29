import React, { useState, useMemo } from 'react';

/**
 * OfficePanelComplaintsPage
 * 
 * Wrapper around the shared ComplaintsDisputesPage logic,
 * but DATA is hard-filtered to the past 3 months.
 * 
 * Strategy:
 *  - Accepts the same `allComplaints` data source (prop or internal fetch)
 *  - Filters entries where createdAt >= 3 months ago before rendering
 *  - Shows a read-only banner so office staff know the scope
 */

const THREE_MONTHS_AGO = (() => {
  const d = new Date();
  d.setMonth(d.getMonth() - 3);
  return d;
})();

const isWithinThreeMonths = (dateString) => {
  const date = new Date(dateString);
  return date >= THREE_MONTHS_AGO;
};

// ---------- Inline mock data (replace with your real API/store) ----------
const MOCK_COMPLAINTS = [
  {
    id: 'CMP-1041',
    customer: 'Priya Sharma',
    subject: 'Vendor no-show on wedding day',
    category: 'Vendor Issue',
    status: 'Open',
    priority: 'High',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
  },
  {
    id: 'CMP-1040',
    customer: 'Rahul Menon',
    subject: 'Refund not processed after cancellation',
    category: 'Payment',
    status: 'In Progress',
    priority: 'Medium',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
  },
  {
    id: 'CMP-1038',
    customer: 'Anita Verma',
    subject: 'Wrong catering menu delivered',
    category: 'Service Quality',
    status: 'Resolved',
    priority: 'Low',
    createdAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(), // 55 days ago
  },
  {
    id: 'CMP-1010',
    customer: 'Suresh Kumar',
    subject: 'Photographer arrived 3 hours late',
    category: 'Vendor Issue',
    status: 'Resolved',
    priority: 'Medium',
    createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000).toISOString(), // 100 days ago — OUTSIDE 3 months
  },
  {
    id: 'CMP-0998',
    customer: 'Deepa Nair',
    subject: 'Decoration did not match booking',
    category: 'Service Quality',
    status: 'Closed',
    priority: 'Low',
    createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(), // 200 days ago — OUTSIDE 3 months
  },
];
// -------------------------------------------------------------------------

const STATUS_COLORS = {
  Open: 'bg-red-100 text-red-700',
  'In Progress': 'bg-yellow-100 text-yellow-700',
  Resolved: 'bg-green-100 text-green-700',
  Closed: 'bg-gray-100 text-gray-500',
};

const PRIORITY_COLORS = {
  High: 'text-red-600 font-semibold',
  Medium: 'text-yellow-600 font-semibold',
  Low: 'text-green-600',
};

export const OfficePanelComplaintsPage = ({ complaints = MOCK_COMPLAINTS }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // ✅ Core filter: only past 3 months
  const recentComplaints = useMemo(
    () => complaints.filter(c => isWithinThreeMonths(c.createdAt)),
    [complaints]
  );

  const filtered = useMemo(() => {
    return recentComplaints.filter(c => {
      const matchSearch =
        c.customer.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase()) ||
        c.subject.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || c.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [recentComplaints, search, statusFilter]);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="space-y-5">
      {/* Scope Banner */}
      <div className="flex items-center gap-3 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
        <span className="text-rose-500 text-lg">🗓️</span>
        <p className="text-sm text-rose-700 font-medium">
          Showing complaints from the <strong>past 3 months only</strong> (since{' '}
          {THREE_MONTHS_AGO.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}).
          Contact the Super Admin for older records.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {['Open', 'In Progress', 'Resolved', 'Closed'].map(s => {
          const count = recentComplaints.filter(c => c.status === s).length;
          return (
            <div key={s} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <p className="text-2xl font-bold text-gray-800">{count}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s}</p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search by ID, customer, or subject..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-48 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
        />
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300"
        >
          {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {['ID', 'Customer', 'Subject', 'Category', 'Priority', 'Status', 'Date'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-gray-400">
                  No complaints found for the selected filters.
                </td>
              </tr>
            ) : (
              filtered.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{c.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{c.customer}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-48 truncate">{c.subject}</td>
                  <td className="px-4 py-3 text-gray-500">{c.category}</td>
                  <td className={`px-4 py-3 text-xs ${PRIORITY_COLORS[c.priority]}`}>{c.priority}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[c.status]}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{formatDate(c.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-400 text-right">
        Showing {filtered.length} of {recentComplaints.length} complaints (past 3 months)
      </p>
    </div>
  );
};