// src/components/admin/settings/SecuritySettings.jsx
import React, { useState } from 'react';

export const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    strongPassword: true,
    passwordExpiry: true,
    twoFactorAuth: false,
    loginAttempts: true,
    maxAttempts: 5
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    setSuccess(false);
    setError(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: parseInt(value) || value }));
    setSuccess(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Simulate API call - Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Security Settings saved:', settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save settings. Please try again.');
      console.error('Error saving settings:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔒</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Security Settings</h3>
            <p className="text-sm text-gray-600 mt-0.5">Ensure platform safety with password policies, admin access control, and login attempt limits</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-6">
          {/* Password Policies */}
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
            </div>
          </div>

          {/* Admin Access Control */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Admin Access Control</h4>
            <div className="space-y-3">
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

          {/* Login Attempt Limits */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Login Attempt Limits</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.loginAttempts}
                  onChange={() => handleToggle('loginAttempts')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Enable login attempt limits</span>
              </label>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Max Login Attempts <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  name="maxAttempts"
                  value={settings.maxAttempts}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full md:w-64 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">✓ Settings saved successfully!</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button 
              type="button"
              onClick={() => {
                setSettings({
                  strongPassword: true,
                  passwordExpiry: true,
                  twoFactorAuth: false,
                  loginAttempts: true,
                  maxAttempts: 5
                });
                setSuccess(false);
                setError(null);
              }}
              className="px-6 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
            >
              Reset
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <div className="text-2xl mb-2">🔐</div>
          <h4 className="font-semibold text-gray-800 text-sm">Password Policies</h4>
          <p className="text-xs text-gray-500 mt-1">Strong password & expiry rules</p>
        </div>
        <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
          <div className="text-2xl mb-2">🛡️</div>
          <h4 className="font-semibold text-gray-800 text-sm">Admin Access Control</h4>
          <p className="text-xs text-gray-500 mt-1">2FA & admin account security</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
          <div className="text-2xl mb-2">📊</div>
          <h4 className="font-semibold text-gray-800 text-sm">Login Attempt Limits</h4>
          <p className="text-xs text-gray-500 mt-1">Brute force protection</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
          <div className="text-2xl mb-2">👥</div>
          <h4 className="font-semibold text-gray-800 text-sm">Security Monitoring</h4>
          <p className="text-xs text-gray-500 mt-1">Login history & security alerts</p>
        </div>
      </div>
    </div>
  );
};