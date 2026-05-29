import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const AdminHeader = ({ sidebarOpen, setSidebarOpen, onLogout }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const notifications = [
    { msg: '3 new vendor registrations pending', time: '5 min ago', color: 'bg-amber-50 text-amber-700' },
    { msg: 'Payment received from Aarav Patel', time: '20 min ago', color: 'bg-green-50 text-green-700' },
    { msg: 'Complaint TKT002 escalated', time: '1 hr ago', color: 'bg-red-50 text-red-700' },
  ];

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
      if (onLogout) onLogout();
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-sm">
      <div className="flex items-center gap-2">
        <button 
          className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 mr-1" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Icon d={ICONS.menu} size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-800">ADMIN PANEL – WEDDING SERVICES</h1>
          <p className="text-xs text-gray-400">{today}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setShowNotifications(!showNotifications)} 
          className="relative p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <Icon d={ICONS.bell} size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          {showNotifications && (
            <div className="absolute right-0 top-10 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 p-4">
              <p className="text-xs font-bold text-gray-700 mb-3">Notifications</p>
              {notifications.map((n, i) => (
                <div key={i} className="mb-2 last:mb-0">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${n.color}`}>{n.msg}</span>
                  <p className="text-[10px] text-gray-400 mt-0.5 pl-1">{n.time}</p>
                </div>
              ))}
            </div>
          )}
        </button>
        
        <button 
          onClick={handleLogout} 
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm"
        >
          <Icon d={ICONS.logout} size={16} />Logout
        </button>
      </div>
    </header>
  );
};