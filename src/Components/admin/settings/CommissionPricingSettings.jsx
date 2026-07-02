// src/components/admin/settings/CommissionPricingSettings.jsx
import React, { useState } from 'react';
import { FeatureCard } from '../shared/FeatureCard';

export const CommissionPricingSettings = () => {
  const [settings, setSettings] = useState({
    commissionPercentage: 15,
    serviceFee: 2.5,
    subscriptionPlans: {
      silver: { price: 499, commission: 15, features: ['Basic listing', '10 bookings/month'] },
      gold: { price: 999, commission: 12, features: ['Featured listing', '50 bookings/month', 'Priority support'] },
      diamond: { price: 1999, commission: 10, features: ['Premium listing', 'Unlimited bookings', 'Dedicated support', 'Verified badge'] }
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: parseFloat(value) || value }));
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Commission settings saved:', settings);
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
                <label className="block text-xs font-semibold text-gray-600 mb-1">Vendor Commission (%)</label>
                <input 
                  type="number" 
                  name="commissionPercentage"
                  value={settings.commissionPercentage}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Service Fee (%)</label>
                <input 
                  type="number" 
                  name="serviceFee"
                  value={settings.serviceFee}
                  onChange={handleChange}
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
                  <h5 className="font-bold text-gray-800 capitalize mb-2">{plan}</h5>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Price (₹)</label>
                      <input 
                        type="number" 
                        value={data.price}
                        onChange={(e) => handlePlanChange(plan, 'price', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Commission (%)</label>
                      <input 
                        type="number" 
                        value={data.commission}
                        onChange={(e) => handlePlanChange(plan, 'commission', e.target.value)}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-600 mb-1">Features</label>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {data.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <span>✓</span> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
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
          emoji="💰" 
          title="Commission Structure" 
          accentColor="bg-blue-50"
          points={['Flexible commission', 'Tiered pricing', 'Promotional discounts']}
        />
        <FeatureCard 
          emoji="📊" 
          title="Revenue Analytics" 
          accentColor="bg-green-50"
          points={['Commission tracking', 'Revenue reports', 'Payout summaries']}
        />
        <FeatureCard 
          emoji="💎" 
          title="Subscription Plans" 
          accentColor="bg-purple-50"
          points={['Multiple tiers', 'Feature management', 'Upgrade/downgrade']}
        />
        <FeatureCard 
          emoji="📈" 
          title="Pricing Optimization" 
          accentColor="bg-amber-50"
          points={['Market analysis', 'Competitor pricing', 'Dynamic pricing']}
        />
      </div>
    </div>
  );
};