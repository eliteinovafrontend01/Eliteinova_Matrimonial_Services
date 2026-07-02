// src/components/admin/settings/CommissionPricingSettings.jsx
import React, { useState } from 'react';

export const CommissionPricingSettings = () => {
  const [settings, setSettings] = useState({
    commissionPercentage: 15,
    serviceFee: 2.5,
    subscriptionPlans: {
      silver: { price: 299, commission: 15, features: ['Basic listing', '10 bookings/month'] },
      gold: { price: 499, commission: 12, features: ['Featured listing', '50 bookings/month', 'Priority support'] },
      diamond: { price: 799, commission: 10, features: ['Premium listing', 'Unlimited bookings', 'Dedicated support', 'Verified badge'] }
    }
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: parseFloat(value) || value }));
    setSuccess(false);
    setError(null);
  };

  const handlePlanChange = (plan, field, value) => {
    setSettings(prev => ({
      ...prev,
      subscriptionPlans: {
        ...prev.subscriptionPlans,
        [plan]: {
          ...prev.subscriptionPlans[plan],
          [field]: parseFloat(value) || value
        }
      }
    }));
    setSuccess(false);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Commission settings saved:', settings);
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
          <div className="text-4xl">💎</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Commission & Pricing Settings</h3>
            <p className="text-sm text-gray-600 mt-0.5">Set platform charges including vendor commission, service fees, and subscription plans</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Platform Charges</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Vendor Commission (%) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  name="commissionPercentage"
                  value={settings.commissionPercentage}
                  onChange={handleChange}
                  required
                  min="0"
                  max="100"
                  step="0.5"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">
                  Service Fee (%) <span className="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  name="serviceFee"
                  value={settings.serviceFee}
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

          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Subscription Plans</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(settings.subscriptionPlans).map(([plan, data]) => (
                <div key={plan} className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-bold text-gray-800 capitalize text-lg mb-3">{plan}</h5>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Price (₹) <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="number" 
                        value={data.price}
                        onChange={(e) => handlePlanChange(plan, 'price', e.target.value)}
                        required
                        min="0"
                        step="1"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Commission (%) <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="number" 
                        value={data.commission}
                        onChange={(e) => handlePlanChange(plan, 'commission', e.target.value)}
                        required
                        min="0"
                        max="100"
                        step="0.5"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">Features</label>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {data.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <span className="text-green-500">✓</span> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">✓ Settings saved successfully!</p>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button 
              type="button"
              onClick={() => {
                setSettings({
                  commissionPercentage: 15,
                  serviceFee: 2.5,
                  subscriptionPlans: {
                    silver: { price: 299, commission: 15, features: ['Basic listing', '10 bookings/month'] },
                    gold: { price: 499, commission: 12, features: ['Featured listing', '50 bookings/month', 'Priority support'] },
                    diamond: { price: 799, commission: 10, features: ['Premium listing', 'Unlimited bookings', 'Dedicated support', 'Verified badge'] }
                  }
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
    </div>
  );
};