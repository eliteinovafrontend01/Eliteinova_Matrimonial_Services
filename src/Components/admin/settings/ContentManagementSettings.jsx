// src/components/admin/settings/ContentManagementSettings.jsx
import React, { useState } from 'react';
import { FeatureCard } from '../shared/FeatureCard';

export const ContentManagementSettings = () => {
  const [pages, setPages] = useState({
    privacy: 'Privacy Policy content goes here...',
    terms: 'Terms & Conditions content goes here...',
    about: 'About Us content goes here...',
    faqs: 'FAQ content goes here...'
  });

  const [activePage, setActivePage] = useState('privacy');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPages(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Content settings saved:', pages);
  };

  const pageOptions = [
    { id: 'privacy', label: 'Privacy Policy', icon: '🔐' },
    { id: 'terms', label: 'Terms & Conditions', icon: '📜' },
    { id: 'about', label: 'About Us', icon: 'ℹ️' },
    { id: 'faqs', label: 'FAQs', icon: '❓' }
  ];

  return (
    <div>
      <div className="rounded-2xl p-6 mb-6 bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📄</div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Content Management Settings</h3>
            <p className="text-sm text-gray-600 mt-0.5">Update static pages including Privacy Policy, Terms & Conditions, About Us, and FAQs</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {pageOptions.map(page => (
                <button 
                  key={page.id}
                  type="button"
                  onClick={() => setActivePage(page.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${activePage === page.id ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <span>{page.icon}</span>
                  {page.label}
                </button>
              ))}
            </div>
            
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                {pageOptions.find(p => p.id === activePage)?.label}
              </label>
              <textarea 
                name={activePage}
                value={pages[activePage]}
                onChange={handleChange}
                rows="10"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono"
              />
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
          emoji="🔐" 
          title="Privacy Policy" 
          accentColor="bg-blue-50"
          points={['Data collection', 'User rights', 'Cookie policy']}
        />
        <FeatureCard 
          emoji="📜" 
          title="Terms & Conditions" 
          accentColor="bg-purple-50"
          points={['User agreement', 'Liability terms', 'Service rules']}
        />
        <FeatureCard 
          emoji="ℹ️" 
          title="About Us" 
          accentColor="bg-green-50"
          points={['Company info', 'Mission & vision', 'Team members']}
        />
        <FeatureCard 
          emoji="❓" 
          title="FAQ Management" 
          accentColor="bg-amber-50"
          points={['Add new FAQs', 'Organize categories', 'Search functionality']}
        />
      </div>
    </div>
  );
};