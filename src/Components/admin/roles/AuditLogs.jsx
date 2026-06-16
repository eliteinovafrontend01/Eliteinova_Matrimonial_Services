// src/components/admin/roles/AuditLogs.jsx
import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const AuditLogs = () => {
  const [logs, setLogs] = useState([
    { id: 1, user: 'John Doe', action: 'Role Created', entity: 'Vendor Manager', details: 'Role with full vendor access', timestamp: '2024-01-15 10:30:00', ip: '192.168.1.1' },
    { id: 2, user: 'Jane Smith', action: 'User Assigned', entity: 'Mike Johnson', details: 'Assigned to Booking Manager role', timestamp: '2024-01-15 11:45:00', ip: '192.168.1.2' },
    { id: 3, user: 'Mike Johnson', action: 'Permission Updated', entity: 'Booking Management', details: 'Added Cancel and Reschedule permissions', timestamp: '2024-01-15 14:20:00', ip: '192.168.1.3' },
    { id: 4, user: 'Sarah Wilson', action: 'Role Deactivated', entity: 'Support Executive', details: 'Temporary deactivation for review', timestamp: '2024-01-15 15:10:00', ip: '192.168.1.4' },
    { id: 5, user: 'David Brown', action: 'Access Restricted', entity: 'Financial Data', details: 'Restricted access to Finance data', timestamp: '2024-01-15 16:30:00', ip: '192.168.1.5' },
  ]);

  const [filterType, setFilterType] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Audit Logs</h2>
            <p className="text-sm text-gray-500 mt-1">Maintain detailed logs of all admin activities for security and transparency</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Export Logs
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6">
          <select 
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
          >
            <option value="All">All Activities</option>
            <option value="Role Created">Role Created</option>
            <option value="User Assigned">User Assigned</option>
            <option value="Permission Updated">Permission Updated</option>
            <option value="Role Deactivated">Role Deactivated</option>
          </select>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
            />
            <span className="text-sm text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">User</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Entity</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Details</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Timestamp</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">IP Address</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{log.user}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      log.action.includes('Created') || log.action.includes('Assigned') 
                        ? 'bg-green-100 text-green-700'
                        : log.action.includes('Updated') 
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{log.entity}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{log.details}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{log.timestamp}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">Showing {logs.length} logs</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 text-gray-600 text-sm rounded-lg hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};