// src/components/admin/settings/NotificationSettings.jsx
import React, { useState } from 'react';

export const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: 'admin@weddingservices.com',
    smtpPass: '••••••••',
    smsProvider: 'twilio',
    pushProvider: 'firebase'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
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
      
      console.log('Notification Settings saved:', settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save settings. Please try again.');
      console.error('Error saving settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Simulate test connection - Replace with actual test
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Connection test failed. Please check your settings.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🔔</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Notification Settings</h3>
            <p className="text-sm text-gray-600 mt-0.5">Manage notification services including SMS gateway setup, email server configuration, and push notification integration</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-6">
          {/* Email Server Configuration */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Email Server Configuration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  SMTP Host <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="smtpHost"
                  value={settings.smtpHost}
                  onChange={handleChange}
                  required
                  placeholder="Enter SMTP host"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  SMTP Port <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="smtpPort"
                  value={settings.smtpPort}
                  onChange={handleChange}
                  required
                  placeholder="Enter SMTP port"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  SMTP Username <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="smtpUser"
                  value={settings.smtpUser}
                  onChange={handleChange}
                  required
                  placeholder="Enter SMTP username"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  SMTP Password <span className="text-red-500">*</span>
                </label>
                <input 
                  type="password" 
                  name="smtpPass"
                  value={settings.smtpPass}
                  onChange={handleChange}
                  required
                  placeholder="Enter SMTP password"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                />
              </div>
            </div>
          </div>

          {/* SMS Gateway Setup */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">SMS Gateway Setup</h4>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                SMS Provider <span className="text-red-500">*</span>
              </label>
              <select 
                name="smsProvider"
                value={settings.smsProvider}
                onChange={handleChange}
                required
                className="w-full md:w-64 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="twilio">Twilio</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">Twilio is the configured SMS provider</p>
            </div>
          </div>

          {/* Push Notification Integration */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Push Notification Integration</h4>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Push Notification Provider <span className="text-red-500">*</span>
              </label>
              <select 
                name="pushProvider"
                value={settings.pushProvider}
                onChange={handleChange}
                required
                className="w-full md:w-64 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="firebase">Firebase</option>
              </select>
              <p className="text-xs text-gray-400 mt-1">Firebase is the configured push notification provider</p>
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
                  smtpHost: 'smtp.gmail.com',
                  smtpPort: '587',
                  smtpUser: 'admin@weddingservices.com',
                  smtpPass: '••••••••',
                  smsProvider: 'twilio',
                  pushProvider: 'firebase'
                });
                setSuccess(false);
                setError(null);
              }}
              className="px-6 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
            >
              Reset
            </button>
            <button 
              type="button"
              onClick={handleTestConnection}
              disabled={loading}
              className="px-6 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test Connection
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
          <div className="text-2xl mb-2">📧</div>
          <h4 className="font-semibold text-gray-800 text-sm">Email Notifications</h4>
          <p className="text-xs text-gray-500 mt-1">SMTP server configuration</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
          <div className="text-2xl mb-2">📱</div>
          <h4 className="font-semibold text-gray-800 text-sm">SMS Notifications</h4>
          <p className="text-xs text-gray-500 mt-1">Twilio SMS gateway setup</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
          <div className="text-2xl mb-2">🔔</div>
          <h4 className="font-semibold text-gray-800 text-sm">Push Notifications</h4>
          <p className="text-xs text-gray-500 mt-1">Firebase push integration</p>
        </div>
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
          <div className="text-2xl mb-2">📊</div>
          <h4 className="font-semibold text-gray-800 text-sm">Analytics & Tracking</h4>
          <p className="text-xs text-gray-500 mt-1">Delivery & performance tracking</p>
        </div>
      </div>
    </div>
  );
};