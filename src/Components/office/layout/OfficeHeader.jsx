import { useState } from 'react';
import { Icon } from '../../admin/shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const OfficeHeader = ({ sidebarOpen, setSidebarOpen, onLogout }) => {
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      alert('Logged out successfully!');
      if (onLogout) onLogout();
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-sm">
      
      {/* Left — mirrors AdminHeader layout exactly */}
      <div className="flex items-center gap-2">
        <button
          className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 mr-1"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Icon d={ICONS.menu} size={20} />
        </button>
        <div>
          <h1 className="text-lg font-bold text-gray-800">OFFICE PANEL – WEDDING SERVICES</h1>
          <p className="text-xs text-gray-400">{today}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Read-only badge — office specific */}
        <span className="hidden sm:inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          Limited Access
        </span>

        {/* Logout — same as AdminHeader */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm"
        >
          <Icon d={ICONS.logout} size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};