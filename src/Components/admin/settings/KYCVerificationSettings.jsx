// src/components/admin/settings/KYCVerificationSettings.jsx
import React, { useState } from 'react';
import { FeatureCard } from '../shared/FeatureCard';

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
    autoVerify: true,
    manualReview: true
  });

  const handleToggle = (section, key) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section][key]
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('KYC Settings saved:', settings);
  };

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">🪪</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">KYC & Verification Settings</h3>
            <p className="text-sm text-gray-600 mt-0.5">Configure verification processes including ID verification and KYC rules</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Verification Services</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg">
                <input 
                  type="checkbox" 
                  checked={settings.services.hyperverge}
                  onChange={() => handleToggle('services', 'hyperverge')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-700">HyperVerge</span>
                  <p className="text-xs text-gray-500">AI-powered identity verification</p>
                </div>
                <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">Recommended</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg">
                <input 
                  type="checkbox" 
                  checked={settings.services.signzy}
                  onChange={() => handleToggle('services', 'signzy')}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-700">Signzy</span>
                  <p className="text-xs text-gray-500">Digital KYC & onboarding</p>
                </div>
              </label>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Required ID Proofs</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(settings.documents).map(([doc, checked]) => (
                <label key={doc} className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <input 
                    type="checkbox" 
                    checked={checked}
                    onChange={() => handleToggle('documents', doc)}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                  />
                  <span className="text-sm text-gray-600">{doc}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-800 text-sm mb-4">Verification Workflow</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.autoVerify}
                  onChange={() => setSettings(prev => ({ ...prev, autoVerify: !prev.autoVerify }))}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Auto-verify users with valid documents</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.manualReview}
                  onChange={() => setSettings(prev => ({ ...prev, manualReview: !prev.manualReview }))}
                  className="rounded border-gray-300 text-red-600 focus:ring-red-500" 
                />
                <span className="text-sm text-gray-600">Enable manual review for flagged cases</span>
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
          emoji="🔍" 
          title="Identity Verification" 
          accentColor="bg-blue-50"
          points={['Document validation', 'Face matching', 'Live photo capture']}
        />
        <FeatureCard 
          emoji="✅" 
          title="Auto-Verification" 
          accentColor="bg-green-50"
          points={['Instant verification', 'AI-powered checks', 'Fraud detection']}
        />
        <FeatureCard 
          emoji="👤" 
          title="User Verification" 
          accentColor="bg-purple-50"
          points={['Vendor KYC', 'Customer verification', 'Document expiry tracking']}
        />
        <FeatureCard 
          emoji="📊" 
          title="Verification Reports" 
          accentColor="bg-amber-50"
          points={['Verification logs', 'Failed attempts', 'Fraud analytics']}
        />
      </div>
    </div>
  );
};