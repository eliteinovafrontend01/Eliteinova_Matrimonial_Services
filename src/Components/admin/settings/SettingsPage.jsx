import { useState } from 'react';
import { Icon } from '../shared/Icon';
import { FeatureCard } from '../shared/FeatureCard';
import { ICONS } from '../../../constants/admin/icons';

export const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  
  const tabs = [
    { id: 'general', label: 'General Settings', icon: '⚙️' },
    { id: 'users', label: 'User Settings', icon: '👥' },
    { id: 'vendors', label: 'Vendor Settings', icon: '🏢' },
    { id: 'payments', label: 'Payment Settings', icon: '💰' },
    { id: 'notifications', label: 'Notification Settings', icon: '🔔' },
    { id: 'security', label: 'Security Settings', icon: '🔒' },
  ];

  const featureCards = [
    { emoji: '⚙️', title: 'Platform Configuration', accentColor: 'bg-gray-100', points: ['App name, logo & branding', 'Company details & contact', 'Time zone & language settings', 'Regional preferences'] },
    { emoji: '🔌', title: 'API Integrations', accentColor: 'bg-blue-50', points: ['Payment gateway (Razorpay)', 'SMS provider (Twilio)', 'Push notifications (Firebase)', 'KYC services (HyperVerge/Signzy)'] },
    { emoji: '🔒', title: 'Security Settings', accentColor: 'bg-red-50', points: ['Password policies', '2FA enforcement', 'Login attempt limits', 'Session management'] },
    { emoji: '💰', title: 'Pricing & Commission', accentColor: 'bg-amber-50', points: ['Vendor commission settings', 'Subscription plans', 'Service fees', 'Tax (GST) configuration'] }
  ];

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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 overflow-x-auto">
          <div className="flex gap-1 p-2 min-w-max">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id ? 'bg-red-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-gray-800 text-sm mb-4">Platform Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">App Name</label><input type="text" defaultValue="Wedding Services Platform" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Company Name</label><input type="text" defaultValue="Wedding Services Pvt Ltd" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Contact Email</label><input type="email" defaultValue="support@weddingservices.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">Contact Phone</label><input type="text" defaultValue="+91 98765 43210" className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm" /></div>
                </div>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700">Save Changes</button>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div><h4 className="font-bold text-gray-800 text-sm mb-4">Registration & Login Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3"><input type="checkbox" defaultChecked className="rounded border-gray-300" /><span className="text-sm text-gray-600">Allow new user registration</span></label>
                  <label className="flex items-center gap-3"><input type="checkbox" defaultChecked className="rounded border-gray-300" /><span className="text-sm text-gray-600">Enable OTP verification via SMS (Twilio)</span></label>
                </div>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700">Save Changes</button>
            </div>
          )}

          {activeTab === 'vendors' && (
            <div className="space-y-6">
              <div><h4 className="font-bold text-gray-800 text-sm mb-4">Vendor Registration</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3"><input type="radio" name="approval" defaultChecked className="text-red-600" /><span className="text-sm text-gray-600">Manual approval required</span></label>
                  <label className="flex items-center gap-3"><input type="radio" name="approval" className="text-red-600" /><span className="text-sm text-gray-600">Auto-approve new vendors</span></label>
                </div>
              </div>
              <div><h4 className="font-bold text-gray-800 text-sm mb-4">Required Documents</h4>
                <div className="space-y-2">
                  {['Business Registration Certificate', 'Government ID Proof', 'Address Proof', 'GST Certificate'].map(doc => (
                    <label key={doc} className="flex items-center gap-3"><input type="checkbox" defaultChecked className="rounded border-gray-300" /><span className="text-sm text-gray-600">{doc}</span></label>
                  ))}
                </div>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700">Save Changes</button>
            </div>
          )}

          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div><h4 className="font-bold text-gray-800 text-sm mb-4">Payment Gateways</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"><div className="flex items-center gap-2"><span className="text-lg">💰</span><span className="text-sm font-semibold">Razorpay</span></div><span className="text-xs text-green-600">Connected</span><button className="text-xs text-red-600">Configure</button></div>
                </div>
              </div>
              <div><h4 className="font-bold text-gray-800 text-sm mb-4">Currency & Tax</h4>
                <div className="grid grid-cols-2 gap-4"><div><label className="block text-xs font-semibold text-gray-600 mb-1">Currency</label><select className="w-full px-3 py-2 border rounded-lg text-sm"><option>INR (₹)</option></select></div><div><label className="block text-xs font-semibold text-gray-600 mb-1">GST Rate (%)</label><input type="number" defaultValue="18" className="w-full px-3 py-2 border rounded-lg text-sm" /></div></div>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700">Save Changes</button>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div><h4 className="font-bold text-gray-800 text-sm mb-4">Email Server</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">SMTP Host</label><input type="text" placeholder="smtp.gmail.com" className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                  <div><label className="block text-xs font-semibold text-gray-600 mb-1">SMTP Port</label><input type="text" placeholder="587" className="w-full px-3 py-2 border rounded-lg text-sm" /></div>
                </div>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700">Save & Test</button>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <div><h4 className="font-bold text-gray-800 text-sm mb-4">Password Policies</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3"><input type="checkbox" defaultChecked /><span className="text-sm text-gray-600">Require strong password (min 8 chars, mix of letters/numbers/symbols)</span></label>
                  <label className="flex items-center gap-3"><input type="checkbox" defaultChecked /><span className="text-sm text-gray-600">Password expiry (90 days)</span></label>
                  <label className="flex items-center gap-3"><input type="checkbox" /><span className="text-sm text-gray-600">Enforce 2FA for admin accounts</span></label>
                </div>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700">Save Changes</button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {featureCards.map((c, i) => <FeatureCard key={i} {...c} />)}
      </div>
    </div>
  );
};