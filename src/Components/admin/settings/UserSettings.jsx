// src/components/admin/settings/UserSettings.jsx
import React, { useState } from 'react';

export const UserSettings = () => {
  const [settings, setSettings] = useState({
    allowRegistration: true,
    otpVerification: true,
    profileVisibility: 'public'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    setSuccess(false);
    setError(null);
  };

  const handleSelect = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
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
      
      console.log('User Settings saved:', settings);
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
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">👥</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">User Settings</h3>
            <p className="text-sm text-gray-600 mt-0.5">Configure customer-related options including registration, login, and profile settings</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-6">
          {/* Registration & Login Settings */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Registration & Login Settings</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.allowRegistration}
                  onChange={() => handleToggle('allowRegistration')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Allow new user registration</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.otpVerification}
                  onChange={() => handleToggle('otpVerification')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Enable OTP verification via SMS (Twilio)</span>
              </label>
            </div>
          </div>

          {/* Profile Settings */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Profile Settings</h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Profile Visibility <span className="text-red-500">*</span>
                </label>
                <select 
                  name="profileVisibility"
                  value={settings.profileVisibility}
                  onChange={handleSelect}
                  required
                  className="w-64 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="vendor-only">Vendor Only</option>
                </select>
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
                  allowRegistration: true,
                  otpVerification: true,
                  profileVisibility: 'public'
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
        <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
          <div className="text-2xl mb-2">🔐</div>
          <h4 className="font-semibold text-gray-800 text-sm">Login Security</h4>
          <p className="text-xs text-gray-500 mt-1">OTP verification & 2FA enforcement</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <div className="text-2xl mb-2">📱</div>
          <h4 className="font-semibold text-gray-800 text-sm">Social Login</h4>
          <p className="text-xs text-gray-500 mt-1">Google & Facebook integration</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
          <div className="text-2xl mb-2">👤</div>
          <h4 className="font-semibold text-gray-800 text-sm">Profile Management</h4>
          <p className="text-xs text-gray-500 mt-1">Visibility controls & privacy settings</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
          <div className="text-2xl mb-2">📧</div>
          <h4 className="font-semibold text-gray-800 text-sm">Email Settings</h4>
          <p className="text-xs text-gray-500 mt-1">Email verification & preferences</p>
        </div>
      </div>
    </div>
  );
};