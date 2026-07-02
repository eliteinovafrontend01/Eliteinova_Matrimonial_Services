// src/components/admin/settings/ContentManagementSettings.jsx
import React, { useState } from 'react';

export const ContentManagementSettings = () => {
  const [pages, setPages] = useState({
    privacy: 'Privacy Policy content goes here...',
    terms: 'Terms & Conditions content goes here...',
    about: 'About Us content goes here...',
    faqs: 'FAQ content goes here...'
  });

  const [activePage, setActivePage] = useState('privacy');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPages(prev => ({ ...prev, [name]: value }));
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
      
      console.log('Content settings saved:', pages);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('Failed to save content. Please try again.');
      console.error('Error saving content:', err);
    } finally {
      setLoading(false);
    }
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
          {/* Page Navigation */}
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              {pageOptions.map(page => (
                <button 
                  key={page.id}
                  type="button"
                  onClick={() => setActivePage(page.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${
                    activePage === page.id 
                      ? 'bg-red-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{page.icon}</span>
                  {page.label}
                </button>
              ))}
            </div>
            
            {/* Page Content Editor */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">
                {pageOptions.find(p => p.id === activePage)?.label} <span className="text-red-500">*</span>
              </label>
              <textarea 
                name={activePage}
                value={pages[activePage]}
                onChange={handleChange}
                rows="12"
                required
                placeholder={`Enter ${pageOptions.find(p => p.id === activePage)?.label} content...`}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono resize-y"
              />
              <p className="text-xs text-gray-400 mt-1">
                {pages[activePage].length} characters
              </p>
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
              <p className="text-sm text-green-600">✓ Content saved successfully!</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button 
              type="button"
              onClick={() => {
                setPages({
                  privacy: 'Privacy Policy content goes here...',
                  terms: 'Terms & Conditions content goes here...',
                  about: 'About Us content goes here...',
                  faqs: 'FAQ content goes here...'
                });
                setSuccess(false);
                setError(null);
              }}
              className="px-6 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
            >
              Reset All
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
                'Save All Changes'
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
          <div className="text-2xl mb-2">🔐</div>
          <h4 className="font-semibold text-gray-800 text-sm">Privacy Policy</h4>
          <p className="text-xs text-gray-500 mt-1">Data collection & user rights</p>
        </div>
        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
          <div className="text-2xl mb-2">📜</div>
          <h4 className="font-semibold text-gray-800 text-sm">Terms & Conditions</h4>
          <p className="text-xs text-gray-500 mt-1">User agreement & service rules</p>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
          <div className="text-2xl mb-2">ℹ️</div>
          <h4 className="font-semibold text-gray-800 text-sm">About Us</h4>
          <p className="text-xs text-gray-500 mt-1">Company info & mission</p>
        </div>
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
          <div className="text-2xl mb-2">❓</div>
          <h4 className="font-semibold text-gray-800 text-sm">FAQs</h4>
          <p className="text-xs text-gray-500 mt-1">Frequently asked questions</p>
        </div>
      </div>
    </div>
  );
};