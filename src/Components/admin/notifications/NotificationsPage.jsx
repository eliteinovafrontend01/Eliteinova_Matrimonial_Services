import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { StatusBadge } from '../shared/StatusBadge';
import { FeatureCard } from '../shared/FeatureCard';
import { ICONS } from '../../../constants/admin/icons';

export const NotificationsPage = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');

  const notificationsData = [
    { id: 'NOT001', title: 'Welcome to Wedding Services', type: 'Email', audience: 'All Users', status: 'Sent', sentDate: '15 Mar 2024', openRate: '68%' },
    { id: 'NOT002', title: 'Booking Confirmation', type: 'Push', audience: 'Customers', status: 'Sent', sentDate: '16 Mar 2024', openRate: '92%' },
    { id: 'NOT003', title: 'Vendor Approval', type: 'SMS', audience: 'Vendors', status: 'Pending', sentDate: 'Scheduled', openRate: '-' },
    { id: 'NOT004', title: 'Payment Success', type: 'Email', audience: 'All Users', status: 'Sent', sentDate: '17 Mar 2024', openRate: '75%' },
    { id: 'NOT005', title: 'Summer Offer 2024', type: 'Push', audience: 'Selected Users', status: 'Draft', sentDate: '-', openRate: '-' },
  ];

  const templates = [
    { id: 'TPL001', name: 'Booking Confirmation', type: 'Email', lastUsed: '2 days ago' },
    { id: 'TPL002', name: 'Payment Receipt', type: 'Email', lastUsed: '3 days ago' },
    { id: 'TPL003', name: 'Vendor Approval', type: 'Push/SMS', lastUsed: '5 days ago' },
    { id: 'TPL004', name: 'Welcome Message', type: 'Email', lastUsed: '1 week ago' },
  ];

  const statCards = [
    { label: 'Total Sent', value: '12,847', icon: '📨', color: 'border-blue-400', filter: 'Sent' },
    { label: 'Pending', value: '47', icon: '⏳', color: 'border-amber-400', filter: 'Pending' },
    { label: 'Open Rate', value: '74%', icon: '👁️', color: 'border-green-400', filter: 'All' },
    { label: 'Failed', value: '23', icon: '❌', color: 'border-red-400', filter: 'Failed' },
  ];

  const filtered = notificationsData.filter(n => {
    const matchStatus = activeFilter === 'All' || n.status === activeFilter;
    const matchSearch = !search || n.title.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const featureCards = [
    { emoji: '📱', title: 'Multi-Channel Notifications', accentColor: 'bg-orange-50', points: ['Push Notifications (Mobile App)', 'SMS (OTP & alerts via Twilio)', 'Email Notifications', 'In-app notifications'] },
    { emoji: '⚡', title: 'Event-Based Triggers', accentColor: 'bg-amber-50', points: ['User registration & verification', 'Booking confirmation & updates', 'Payment success or failure', 'Vendor approval or rejection'] },
    { emoji: '🎯', title: 'Audience Targeting', accentColor: 'bg-green-50', points: ['All users', 'Customers only', 'Vendors only', 'Selected users'] },
    { emoji: '📅', title: 'Scheduling & Templates', accentColor: 'bg-blue-50', points: ['Schedule notifications', 'Reusable templates', 'Real-time alerts', 'User preferences control'] }
  ];

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔔</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Notification Management</h3>
            <p className="text-sm text-gray-500 mt-0.5">Send, schedule and manage multi-channel notifications across the platform</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {statCards.map((s, i) => (
          <div key={i} onClick={() => setActiveFilter(s.filter)}
            className={`bg-white rounded-2xl p-5 shadow-sm border-l-4 ${s.color} cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${activeFilter === s.filter ? 'ring-2 ring-offset-1 ring-red-400 shadow-md' : ''}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{s.label}</p>
                <p className="text-3xl font-bold text-gray-800">{s.value}</p>
                {activeFilter === s.filter && <p className="text-[10px] text-red-500 font-bold mt-1">● Active Filter</p>}
              </div>
              <div className="text-2xl">{s.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-2xl p-5 mb-6 border border-red-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">✉️</div>
            <div><p className="text-sm font-bold text-gray-800">Create New Notification</p><p className="text-xs text-gray-500">Send push, email or SMS notifications to your audience</p></div>
          </div>
          <button onClick={() => alert('Create notification wizard')} className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700">+ Create Notification</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center text-red-600"><Icon d={ICONS.notifications} size={18} /></div>
                <div><h3 className="font-bold text-gray-800 text-base">Notification History</h3><p className="text-xs text-gray-400">{filtered.length} notifications</p></div>
              </div>
              <button onClick={() => alert('Exporting...')} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg"><Icon d={ICONS.download} size={13} />Export</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Icon d={ICONS.search} size={15} /></span>
                <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search notifications..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50" />
              </div>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {filtered.map(notif => (
              <div key={notif.id} className="px-5 py-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{notif.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${notif.type === 'Email' ? 'bg-blue-50 text-blue-700' : notif.type === 'Push' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{notif.type}</span>
                      <span className="text-[10px] text-gray-400">{notif.audience}</span>
                      <span className="text-[10px] text-gray-400">{notif.sentDate}</span>
                      {notif.openRate !== '-' && <span className="text-[10px] text-green-600">Open: {notif.openRate}</span>}
                    </div>
                  </div>
                  <StatusBadge status={notif.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100"><h3 className="font-bold text-gray-800 text-sm flex items-center gap-2"><span className="text-lg">📋</span> Notification Templates</h3></div>
            <div className="divide-y divide-gray-50">
              {templates.map(tpl => (
                <div key={tpl.id} className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div><p className="text-xs font-semibold text-gray-700">{tpl.name}</p><p className="text-[10px] text-gray-400">{tpl.type}</p></div>
                    <button className="text-red-500 text-xs font-semibold">Use</button>
                  </div>
                </div>
              ))}
              <div className="px-4 py-3"><button className="w-full text-center text-xs text-red-600 font-semibold py-1">+ Create New Template</button></div>
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl border border-amber-200 p-4">
            <div className="flex items-start gap-3">
              <span className="text-xl">📊</span>
              <div>
                <p className="text-xs font-bold text-amber-800">Delivery Tracking</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full"><div className="w-[74%] h-1.5 bg-green-500 rounded-full"></div></div>
                  <span className="text-[10px] font-semibold text-green-600">74%</span>
                </div>
                <p className="text-[10px] text-amber-600 mt-2">Delivered: 9,507 | Failed: 23 | Pending: 47</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>
    </div>
  );
};