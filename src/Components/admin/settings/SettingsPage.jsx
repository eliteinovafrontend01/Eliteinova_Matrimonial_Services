// src/components/admin/settings/SettingsPage.jsx
import React, { useState } from 'react';
import { FeatureCard } from '../shared/FeatureCard';
import { settingsSubmenusConfig } from '../../../constants/admin/menuConfig';

export const SettingsPage = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('general');

  const handleCategoryClick = (tabId) => {
    // Map tab IDs to menu submenu labels
    const tabToSubmenuMap = {
      'general': 'General Settings',
      'users': 'User Settings',
      'vendors': 'Vendor Settings',
      'payments': 'Payment Settings',
      'notifications': 'Notification Settings',
      'kyc': 'KYC & Verification Settings',
      'booking': 'Booking Settings',
      'security': 'Security Settings',
      'content': 'Content Management Settings',
      'commission': 'Commission & Pricing Settings'
    };

    // Navigate to the settings subpage
    if (onNavigate) {
      onNavigate('settings', tabToSubmenuMap[tabId]);
    }
  };

  const featureCards = [
    { emoji: '⚙️', title: 'Platform Configuration', accentColor: 'bg-gray-100', points: ['App name, logo & branding', 'Company details & contact', 'Time zone & language settings', 'Regional preferences'] },
    { emoji: '🔌', title: 'API Integrations', accentColor: 'bg-blue-50', points: ['Payment gateway (Razorpay)', 'SMS provider (Twilio)', 'Push notifications (Firebase)', 'KYC services (HyperVerge/Signzy)'] },
    { emoji: '🔒', title: 'Security Settings', accentColor: 'bg-red-50', points: ['Password policies', '2FA enforcement', 'Login attempt limits', 'Session management'] },
    { emoji: '💰', title: 'Pricing & Commission', accentColor: 'bg-amber-50', points: ['Vendor commission settings', 'Subscription plans', 'Service fees', 'Tax (GST) configuration'] }
  ];

  // Get the selected tab's features if any
  const getTabFeatures = (tabId) => {
    const featuresMap = {
      'general': ['App name & logo management', 'Company information', 'Contact details', 'Time zone & language'],
      'users': ['Registration settings', 'OTP verification', 'Profile visibility', 'Login preferences'],
      'vendors': ['Approval workflow', 'Document requirements', 'Commission settings', 'Verification rules'],
      'payments': ['Gateway integration', 'Currency & tax', 'Refund policies', 'Payout management'],
      'notifications': ['SMS gateway', 'Email server', 'Push notifications', 'Alert preferences'],
      'kyc': ['ID verification', 'Document validation', 'Auto-verification', 'Fraud detection'],
      'booking': ['Booking flow', 'Cancellation rules', 'Time slots', 'Availability settings'],
      'security': ['Password policies', '2FA enforcement', 'Access control', 'Security logs'],
      'content': ['Privacy Policy', 'Terms & Conditions', 'About Us', 'FAQs'],
      'commission': ['Commission rates', 'Service fees', 'Subscription plans', 'Revenue tracking']
    };
    return featuresMap[tabId] || ['Configure settings', 'Manage preferences', 'Update rules', 'Save changes'];
  };

  // Get the selected tab data
  const selectedTab = settingsSubmenusConfig.find(tab => tab.id === activeTab);

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-gray-100 to-slate-100 border border-gray-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">⚙️</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Settings & Configuration</h3>
            <p className="text-sm text-gray-500 mt-0.5">Manage platform settings, user preferences, vendor rules, and integrations</p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {settingsSubmenusConfig.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleCategoryClick(tab.id)}
            className={`p-6 rounded-2xl border-2 text-left transition-all hover:shadow-lg group ${
              activeTab === tab.id 
                ? 'border-red-500 bg-red-50 shadow-md' 
                : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-50/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`text-3xl transition-transform group-hover:scale-110 ${activeTab === tab.id ? 'animate-bounce' : ''}`}>
                {tab.icon}
              </div>
              <div className="flex-1">
                <h4 className={`font-bold text-sm ${activeTab === tab.id ? 'text-red-700' : 'text-gray-800'} group-hover:text-red-600`}>
                  {tab.label}
                </h4>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {tab.description}
                </p>
                {activeTab === tab.id && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-red-600 font-semibold">Active</span>
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-gray-400">→</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Tab Detail View */}
      {selectedTab && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <span>{selectedTab.icon}</span>
                {selectedTab.label}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{selectedTab.description}</p>
            </div>
            <button
              onClick={() => handleCategoryClick(selectedTab.id)}
              className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              Configure Now
              <span>→</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            {getTabFeatures(selectedTab.id).map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <span className="text-green-500">✓</span>
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {featureCards.map((c, i) => (
          <div 
            key={i} 
            className={`p-5 rounded-2xl ${c.accentColor} border border-gray-200 hover:shadow-md transition-shadow cursor-pointer`}
            onClick={() => {
              // Map feature card to settings tab
              const cardToTabMap = {
                'Platform Configuration': 'general',
                'API Integrations': 'payments',
                'Security Settings': 'security',
                'Pricing & Commission': 'commission'
              };
              const tabId = cardToTabMap[c.title];
              if (tabId) handleCategoryClick(tabId);
            }}
          >
            <div className="text-3xl mb-2">{c.emoji}</div>
            <h4 className="font-semibold text-gray-800 text-sm mb-2">{c.title}</h4>
            <ul className="space-y-1">
              {c.points.map((point, idx) => (
                <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                  <span className="text-red-500 mt-0.5">•</span>
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-3 text-xs text-red-600 font-semibold flex items-center gap-1">
              Configure <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};