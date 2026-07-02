// src/components/admin/settings/PaymentSettings.jsx
import React, { useState } from 'react';

export const PaymentSettings = () => {
  const [settings, setSettings] = useState({
    gateways: {
      razorpay: true,
      stripe: false,
      paypal: false
    },
    currency: 'INR',
    taxRate: 18,
    refundPolicy: '7-days'
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleGatewayToggle = (gateway) => {
    setSettings(prev => ({
      ...prev,
      gateways: {
        ...prev.gateways,
        [gateway]: !prev.gateways[gateway]
      }
    }));
    setSuccess(false);
    setError(null);
  };

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
      
      console.log('Payment Settings saved:', settings);
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
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">💰</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Payment Settings</h3>
            <p className="text-sm text-gray-600 mt-0.5">Configure payment gateways, currency settings, tax configuration, and refund policies</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-6">
          {/* Payment Gateways */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Payment Gateways</h4>
            <div className="space-y-3">
              {Object.entries(settings.gateways).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">
                      {key === 'razorpay' && '💳'}
                      {key === 'stripe' && '⚡'}
                      {key === 'paypal' && '🅿️'}
                    </span>
                    <span className="text-sm font-semibold text-gray-700 capitalize">{key}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${value ? 'text-green-600 bg-green-50' : 'text-gray-400 bg-gray-100'}`}>
                      {value ? 'Connected' : 'Disconnected'}
                    </span>
                    <button 
                      type="button"
                      onClick={() => handleGatewayToggle(key)}
                      className={`px-3 py-1 text-xs rounded-lg transition-colors ${value ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                    >
                      {value ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Currency & Tax Configuration */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Currency & Tax Configuration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Currency <span className="text-red-500">*</span>
                </label>
                <select 
                  name="currency"
                  value={settings.currency}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  GST Rate (%) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  name="taxRate"
                  value={settings.taxRate}
                  onChange={handleChange}
                  required
                  min="0"
                  max="100"
                  step="0.5"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                />
              </div>
            </div>
          </div>

          {/* Refund Policies */}
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Refund Policies</h4>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                Refund Policy <span className="text-red-500">*</span>
              </label>
              <select 
                name="refundPolicy"
                value={settings.refundPolicy}
                onChange={handleChange}
                required
                className="w-full md:w-64 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="7-days">7 Days</option>
                <option value="14-days">14 Days</option>
                <option value="30-days">30 Days</option>
                <option value="non-refundable">Non-Refundable</option>
              </select>
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
                  gateways: {
                    razorpay: true,
                    stripe: false,
                    paypal: false
                  },
                  currency: 'INR',
                  taxRate: 18,
                  refundPolicy: '7-days'
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
          <div className="text-2xl mb-2">💳</div>
          <h4 className="font-semibold text-gray-800 text-sm">Gateway Integration</h4>
          <p className="text-xs text-gray-500 mt-1">Razorpay & other payment gateways</p>
        </div>
        <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
          <div className="text-2xl mb-2">🔄</div>
          <h4 className="font-semibold text-gray-800 text-sm">Refund Management</h4>
          <p className="text-xs text-gray-500 mt-1">Refund policies & processing</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
          <div className="text-2xl mb-2">📊</div>
          <h4 className="font-semibold text-gray-800 text-sm">Financial Reports</h4>
          <p className="text-xs text-gray-500 mt-1">Revenue analytics & tax reports</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
          <div className="text-2xl mb-2">💰</div>
          <h4 className="font-semibold text-gray-800 text-sm">Payout Settings</h4>
          <p className="text-xs text-gray-500 mt-1">Vendor payouts & settlements</p>
        </div>
      </div>
    </div>
  );
};