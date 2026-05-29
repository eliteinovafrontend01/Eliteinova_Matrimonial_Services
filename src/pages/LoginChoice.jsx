import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VendorLoginForm from './VendorLoginForm';
import CustomerRegistrationForm from '../Components/CustomerRegistrationForm'; // ADD THIS IMPORT

const LoginChoice = () => {
  const navigate = useNavigate();
  const [showVendorLogin, setShowVendorLogin] = useState(false);
  const [showCustomerRegForm, setShowCustomerRegForm] = useState(false); // ADD THIS STATE

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-red-800 mb-3" style={{ fontFamily: 'Pacifico, cursive' }}>
            Welcome Back!
          </h1>
          <p className="text-gray-600 text-lg">
            Choose your account type to login
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Choice Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Customer Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-transparent hover:border-red-300 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            onClick={() => navigate('/customer-login')}
          >
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white">
              <div className="flex items-center justify-center mb-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-14 h-14 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center">Customer Login</h2>
              <p className="text-center text-red-100 mt-2">Access your matrimonial profile</p>
            </div>

            <div className="p-8">
              <div className="space-y-3 mb-6">
                {[
                  'View your profile',
                  'Browse matches',
                  'Contact vendors',
                  'Manage events',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                Login as Customer
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{' '}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCustomerRegForm(true); // CHANGED: Open modal instead of navigate
                  }}
                  className="text-red-600 font-semibold hover:text-red-800"
                >
                  Register here
                </button>
              </p>
            </div>
          </div>

          {/* Vendor Login Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-transparent hover:border-yellow-400 transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-8 text-red-900">
              <div className="flex items-center justify-center mb-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-14 h-14 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center">Vendor Login</h2>
              <p className="text-center text-red-800 mt-2">Access your business dashboard</p>
            </div>

            <div className="p-8">
              <div className="space-y-3 mb-6">
                {[
                  'Manage your services',
                  'View bookings',
                  'Update portfolio',
                  'Track inquiries',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center">
                    <svg className="w-5 h-5 text-yellow-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Login Button - Opens modal */}
              <button 
                onClick={() => setShowVendorLogin(true)}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 py-4 px-6 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Login as Vendor
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{' '}
                <button
                  onClick={() => navigate('/vendor-login')}
                  className="text-yellow-700 font-semibold hover:text-yellow-900"
                >
                  Register here
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-red-600 font-medium flex items-center justify-center mx-auto gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>

        {/* Vendor Login Modal */}
        {showVendorLogin && (
          <VendorLoginForm 
            onClose={() => setShowVendorLogin(false)}
            showRegisterOptions={true}
          />
        )}

        {/* ADD CUSTOMER REGISTRATION MODAL HERE */}
        {showCustomerRegForm && (
          <CustomerRegistrationForm 
            isOpen={showCustomerRegForm}
            onClose={() => setShowCustomerRegForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LoginChoice;