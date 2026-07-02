// src/components/admin/settings/KYCVerificationSettings.jsx
import React, { useState } from 'react';

export const KYCVerificationSettings = () => {
  const [settings, setSettings] = useState({
    services: {
      hyperverge: true,
      signzy: false
    },
    documents: {
      'Aadhaar Card': true,
      'PAN Card': true,
      'Passport': false,
      'Voter ID': false
    },
    vendorKYC: true,
    userKYC: true
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleServiceToggle = (service) => {
    setSettings(prev => ({
      ...prev,
      services: {
        ...prev.services,
        [service]: !prev.services[service]
      }
    }));
    setSuccess(false);
    setError(null);
  };

  const handleDocToggle = (doc) => {
    setSettings(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [doc]: !prev.documents[doc]
      }
    }));
    setSuccess(false);
    setError(null);
  };

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
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
      
      console.log('KYC Settings saved:', settings);
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
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🪪</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">KYC & Verification Settings</h3>
            <p className="text-sm text-gray-600 mt-0.5">Configure verification processes including ID verification requirements, vendor and user KYC rules, and integration with verification services</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-6">
          {/* Integration with Verification Services */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Integration with Verification Services</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input 
                  type="checkbox" 
                  checked={settings.services.hyperverge}
                  onChange={() => handleServiceToggle('hyperverge')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-700">HyperVerge</span>
                  <p className="text-xs text-gray-500">AI-powered identity verification</p>
                </div>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Recommended</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <input 
                  type="checkbox" 
                  checked={settings.services.signzy}
                  onChange={() => handleServiceToggle('signzy')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-700">Signzy</span>
                  <p className="text-xs text-gray-500">Digital KYC & onboarding</p>
                </div>
              </label>
            </div>
          </div>

          {/* ID Verification Requirements */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">ID Verification Requirements</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(settings.documents).map(([doc, checked]) => (
                <label key={doc} className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={checked}
                    onChange={() => handleDocToggle(doc)}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                  />
                  <span className="text-sm text-gray-600">{doc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Vendor and User KYC Rules */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Vendor and User KYC Rules</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.vendorKYC}
                  onChange={() => handleToggle('vendorKYC')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Require KYC verification for vendors</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.userKYC}
                  onChange={() => handleToggle('userKYC')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Require KYC verification for users</span>
              </label>
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
                  services: {
                    hyperverge: true,
                    signzy: false
                  },
                  documents: {
                    'Aadhaar Card': true,
                    'PAN Card': true,
                    'Passport': false,
                    'Voter ID': false
                  },
                  vendorKYC: true,
                  userKYC: true
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
          <div className="text-2xl mb-2">🔍</div>
          <h4 className="font-semibold text-gray-800 text-sm">Identity Verification</h4>
          <p className="text-xs text-gray-500 mt-1">Document validation & face matching</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
          <div className="text-2xl mb-2">✅</div>
          <h4 className="font-semibold text-gray-800 text-sm">Verification Services</h4>
          <p className="text-xs text-gray-500 mt-1">HyperVerge & Signzy integration</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
          <div className="text-2xl mb-2">👤</div>
          <h4 className="font-semibold text-gray-800 text-sm">KYC Rules</h4>
          <p className="text-xs text-gray-500 mt-1">Vendor & user verification rules</p>
        </div>
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
          <div className="text-2xl mb-2">📊</div>
          <h4 className="font-semibold text-gray-800 text-sm">Verification Reports</h4>
          <p className="text-xs text-gray-500 mt-1">Verification logs & analytics</p>
        </div>
      </div>
    </div>
  );
};