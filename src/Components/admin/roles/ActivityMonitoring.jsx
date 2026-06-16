// src/components/admin/roles/ActivityMonitoring.jsx
import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const ActivityMonitoring = () => {
  const [activities, setActivities] = useState([
    { id: 1, user: 'John Doe', action: 'Login', module: 'System', timestamp: '2024-01-15 10:30:00', status: 'Success' },
    { id: 2, user: 'Jane Smith', action: 'Vendor Approval', module: 'Vendor Management', timestamp: '2024-01-15 11:45:00', status: 'Success' },
    { id: 3, user: 'Mike Johnson', action: 'Booking Update', module: 'Booking Management', timestamp: '2024-01-15 14:20:00', status: 'Success' },
    { id: 4, user: 'Sarah Wilson', action: 'Complaint Resolved', module: 'Support', timestamp: '2024-01-15 15:10:00', status: 'Success' },
    { id: 5, user: 'David Brown', action: 'Payment Processing', module: 'Payments', timestamp: '2024-01-15 16:30:00', status: 'Failed' },
    { id: 6, user: 'John Doe', action: 'Role Update', module: 'User Management', timestamp: '2024-01-15 17:00:00', status: 'Success' },
  ]);

  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredActivities = activities.filter(activity => {
    const matchFilter = filter === 'All' || activity.status === filter;
    const matchSearch = !search || 
      activity.user.toLowerCase().includes(search.toLowerCase()) ||
      activity.action.toLowerCase().includes(search.toLowerCase()) ||
      activity.module.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Activity Monitoring</h2>
          <p className="text-sm text-gray-500 mt-1">Track admin actions including login history, changes made, approvals, and updates</p>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-4">
          <div className="flex-1 min-w-[200px] relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Icon d={ICONS.search} size={15} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search activities..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex gap-2">
            {['All', 'Success', 'Failed'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${
                  filter === status 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">User</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Action</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Module</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Timestamp</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map(activity => (
                <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{activity.user}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{activity.action}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{activity.module}</td>
                  <td className="py-3 px-4 text-sm text-gray-500">{activity.timestamp}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      activity.status === 'Success' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {activity.status}
                    </span>
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