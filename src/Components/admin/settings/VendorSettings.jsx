// src/components/admin/settings/VendorSettings.jsx
import React, { useState } from 'react';

export const VendorSettings = () => {
  const [settings, setSettings] = useState({
    approvalMethod: 'manual',
    documents: {
      'Business Registration Certificate': true,
      'Government ID Proof': true,
      'Address Proof': true,
      'GST Certificate': true
    },
    commissionPercentage: 15
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleRadioChange = (value) => {
    setSettings(prev => ({ ...prev, approvalMethod: value }));
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: parseFloat(value) || value }));
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
      
      console.log('Vendor Settings saved:', settings);
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
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🏢</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Vendor Settings</h3>
            <p className="text-sm text-gray-600 mt-0.5">Manage vendor-related configurations including registration approval, required documents, and commission settings</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-6">
          {/* Vendor Registration Approval */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Vendor Registration Approval</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="approval" 
                  value="manual"
                  checked={settings.approvalMethod === 'manual'}
                  onChange={() => handleRadioChange('manual')}
                  className="text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Manual approval required</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="approval" 
                  value="auto"
                  checked={settings.approvalMethod === 'auto'}
                  onChange={() => handleRadioChange('auto')}
                  className="text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Auto-approve new vendors</span>
              </label>
            </div>
          </div>

          {/* Required Documents for Verification */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Required Documents for Verification</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.keys(settings.documents).map(doc => (
                <label key={doc} className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={settings.documents[doc]}
                    onChange={() => handleDocToggle(doc)}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                  />
                  <span className="text-sm text-gray-600">{doc}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Commission Percentage Settings */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Commission Percentage Settings</h4>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Commission Percentage (%) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-4">
                <input 
                  type="number" 
                  name="commissionPercentage"
                  value={settings.commissionPercentage}
                  onChange={handleChange}
                  required
                  min="0"
                  max="100"
                  step="0.5"
                  className="w-32 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <span className="text-sm text-gray-500">% of each booking</span>
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
                  approvalMethod: 'manual',
                  documents: {
                    'Business Registration Certificate': true,
                    'Government ID Proof': true,
                    'Address Proof': true,
                    'GST Certificate': true
                  },
                  commissionPercentage: 15
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
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
          <div className="text-2xl mb-2">✅</div>
          <h4 className="font-semibold text-gray-800 text-sm">Verification Process</h4>
          <p className="text-xs text-gray-500 mt-1">Document verification & approval workflow</p>
        </div>
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
          <div className="text-2xl mb-2">💰</div>
          <h4 className="font-semibold text-gray-800 text-sm">Commission Settings</h4>
          <p className="text-xs text-gray-500 mt-1">Commission percentage management</p>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <div className="text-2xl mb-2">📋</div>
          <h4 className="font-semibold text-gray-800 text-sm">Vendor Dashboard</h4>
          <p className="text-xs text-gray-500 mt-1">Analytics & performance tracking</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
          <div className="text-2xl mb-2">⭐</div>
          <h4 className="font-semibold text-gray-800 text-sm">Vendor Ratings</h4>
          <p className="text-xs text-gray-500 mt-1">Rating system & review management</p>
        </div>
      </div>
    </div>
  );
};