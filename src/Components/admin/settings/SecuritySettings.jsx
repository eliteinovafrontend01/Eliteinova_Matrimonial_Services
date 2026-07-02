// src/components/admin/settings/SecuritySettings.jsx
import React, { useState } from 'react';
import { FeatureCard } from '../shared/FeatureCard';

export const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    strongPassword: true,
    passwordExpiry: true,
    twoFactorAuth: false,
    loginAttempts: true,
    sessionTimeout: 30,
    maxAttempts: 5
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
    console.log('Security Settings saved:', settings);
  };

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔒</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Security Settings</h3>
            <p className="text-sm text-gray-600 mt-0.5">Ensure platform safety with password policies, access control, and login attempt limits</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Password Policies</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.strongPassword}
                  onChange={() => handleToggle('strongPassword')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Require strong password (min 8 chars, mix of letters/numbers/symbols)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.passwordExpiry}
                  onChange={() => handleToggle('passwordExpiry')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Password expiry (90 days)</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.twoFactorAuth}
                  onChange={() => handleToggle('twoFactorAuth')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Enforce 2FA for admin accounts</span>
              </label>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Login Attempt & Session Management</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Session Timeout (minutes)</label>
                <input 
                  type="number" 
                  name="sessionTimeout"
                  value={settings.sessionTimeout}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Max Login Attempts</label>
                <input 
                  type="number" 
                  name="maxAttempts"
                  value={settings.maxAttempts}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.loginAttempts}
                  onChange={() => handleToggle('loginAttempts')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Enable login attempt limits</span>
              </label>
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
          emoji="🔐" 
          title="Authentication" 
          accentColor="bg-blue-50"
          points={['2FA setup', 'OTP verification', 'SSO integration']}
        />
        <FeatureCard 
          emoji="🛡️" 
          title="Threat Protection" 
          accentColor="bg-red-50"
          points={['Brute force protection', 'IP blocking', 'Rate limiting']}
        />
        <FeatureCard 
          emoji="📊" 
          title="Security Logs" 
          accentColor="bg-purple-50"
          points={['Login history', 'Failed attempts', 'Security alerts']}
        />
        <FeatureCard 
          emoji="👥" 
          title="Access Control" 
          accentColor="bg-green-50"
          points={['Role-based access', 'Permission management', 'Admin privileges']}
        />
      </div>
    </div>
  );
};