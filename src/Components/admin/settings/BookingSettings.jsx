// src/components/admin/settings/BookingSettings.jsx
import React, { useState } from 'react';
import { FeatureCard } from '../shared/FeatureCard';

export const BookingSettings = () => {
  const [settings, setSettings] = useState({
    instantBooking: true,
    cancellationAllowed: true,
    reschedulingAllowed: true,
    cancellationWindow: 48,
    maxRescheduleCount: 3,
    timeSlotDuration: 60,
    bufferTime: 15
  });

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: parseInt(value) || value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking Settings saved:', settings);
  };

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📅</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Booking Settings</h3>
            <p className="text-sm text-gray-600 mt-0.5">Customize booking flow including approval process, cancellation rules, and availability settings</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Booking Flow Configuration</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.instantBooking}
                  onChange={() => handleToggle('instantBooking')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Allow instant booking</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.cancellationAllowed}
                  onChange={() => handleToggle('cancellationAllowed')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Enable booking cancellation</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.reschedulingAllowed}
                  onChange={() => handleToggle('reschedulingAllowed')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Allow rescheduling</span>
              </label>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Cancellation & Rescheduling Rules</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Cancellation Window (hours)</label>
                <input 
                  type="number" 
                  name="cancellationWindow"
                  value={settings.cancellationWindow}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Max Reschedule Count</label>
                <input 
                  type="number" 
                  name="maxRescheduleCount"
                  value={settings.maxRescheduleCount}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Time Slot & Availability</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Slot Duration (minutes)</label>
                <input 
                  type="number" 
                  name="timeSlotDuration"
                  value={settings.timeSlotDuration}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Buffer Time (minutes)</label>
                <input 
                  type="number" 
                  name="bufferTime"
                  value={settings.bufferTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              className="px-6 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        <FeatureCard 
          emoji="📊" 
          title="Booking Analytics" 
          accentColor="bg-blue-50"
          points={['Booking trends', 'Peak times', 'Popular services']}
        />
        <FeatureCard 
          emoji="🔄" 
          title="Workflow Automation" 
          accentColor="bg-green-50"
          points={['Auto-confirmation', 'Reminder emails', 'Status updates']}
        />
        <FeatureCard 
          emoji="📅" 
          title="Calendar Management" 
          accentColor="bg-purple-50"
          points={['Vendor availability', 'Time slot management', 'Schedule sync']}
        />
        <FeatureCard 
          emoji="🔔" 
          title="Booking Notifications" 
          accentColor="bg-amber-50"
          points={['Booking alerts', 'Reminder notifications', 'Status changes']}
        />
      </div>
    </div>
  );
};