// src/components/admin/roles/SecureAuthentication.jsx
import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { ICONS } from '../../../constants/admin/icons';

export const SecureAuthentication = () => {
  const [settings, setSettings] = useState({
    passwordPolicy: {
      minLength: 8,
      requireSpecialChar: true,
      requireNumber: true,
      requireUppercase: true,
    },
    mfaEnabled: false,
    sessionTimeout: 30,
    loginAttempts: 5,
  });

  const [showMFASetup, setShowMFASetup] = useState(false);

  const handleToggleMFA = () => {
    setSettings({...settings, mfaEnabled: !settings.mfaEnabled});
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Secure Authentication</h2>
          <p className="text-sm text-gray-500 mt-1">Enable secure login features such as password protection and optional multi-factor authentication (MFA)</p>
        </div>

        <div className="mt-6 space-y-6">
          {/* Password Policy */}
          <div className="border border-gray-200 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-3">🔐 Password Policy</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Minimum Length</span>
                <select 
                  value={settings.passwordPolicy.minLength}
                  onChange={(e) => setSettings({
                    ...settings,
                    passwordPolicy: {...settings.passwordPolicy, minLength: parseInt(e.target.value)}
                  })}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                >
                  {[6, 8, 10, 12].map(num => (
                    <option key={num} value={num}>{num} characters</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.passwordPolicy.requireSpecialChar}
                  onChange={(e) => setSettings({
                    ...settings,
                    passwordPolicy: {...settings.passwordPolicy, requireSpecialChar: e.target.checked}
                  })}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-gray-600">Require special character</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.passwordPolicy.requireNumber}
                  onChange={(e) => setSettings({
                    ...settings,
                    passwordPolicy: {...settings.passwordPolicy, requireNumber: e.target.checked}
                  })}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-gray-600">Require number</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={settings.passwordPolicy.requireUppercase}
                  onChange={(e) => setSettings({
                    ...settings,
                    passwordPolicy: {...settings.passwordPolicy, requireUppercase: e.target.checked}
                  })}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <span className="text-sm text-gray-600">Require uppercase letter</span>
              </div>
            </div>
          </div>

          {/* MFA Settings */}
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-800">🔑 Multi-Factor Authentication (MFA)</h4>
                <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to admin accounts</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-sm ${settings.mfaEnabled ? 'text-green-600' : 'text-gray-400'}`}>
                  {settings.mfaEnabled ? 'Enabled' : 'Disabled'}
                </span>
                <button
                  onClick={handleToggleMFA}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.mfaEnabled ? 'bg-red-600' : 'bg-gray-300'
                  }`}
                >
                  <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                    settings.mfaEnabled ? 'translate-x-6' : ''
                  }`} />
                </button>
              </div>
            </div>
            {settings.mfaEnabled && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-700">✅ MFA is enabled. Users will be required to verify their identity using an authenticator app.</p>
              </div>
            )}
          </div>

          {/* Session Settings */}
          <div className="border border-gray-200 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-3">⏱️ Session Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Session Timeout (minutes)</span>
                <input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                  className="w-20 px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Max Login Attempts</span>
                <input
                  type="number"
                  value={settings.loginAttempts}
                  onChange={(e) => setSettings({...settings, loginAttempts: parseInt(e.target.value)})}
                  className="w-20 px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors">
            Save Authentication Settings
          </button>
        </div>
      </div>
    </div>
  );
};