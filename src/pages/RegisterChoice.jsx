import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VendorLoginForm from './VendorLoginForm';
import CustomerRegistrationForm from '../Components/CustomerRegistrationForm'; // ADD THIS IMPORT

const RegisterChoice = () => {
  const navigate = useNavigate();
  const [showVendorLogin, setShowVendorLogin] = useState(false);
  const [showCustomerRegForm, setShowCustomerRegForm] = useState(false); // ADD THIS STATE

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-red-800 mb-3" style={{ fontFamily: 'Pacifico, cursive' }}>
            Join Eliteinova Matrimonial
          </h1>
          <p className="text-gray-600 text-lg">
            Choose your registration type to get started
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-yellow-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Choice Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Customer Registration Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-transparent hover:border-red-300 transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center">Customer Registration</h2>
              <p className="text-center text-red-100 mt-2">Find your perfect life partner</p>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                {[
                  'Create your matrimonial profile',
                  'Browse verified profiles',
                  'Find compatible matches',
                  'Access wedding service vendors',
                  'Plan your perfect wedding',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* UPDATED: Open modal instead of navigate */}
              <button
                onClick={() => setShowCustomerRegForm(true)}
                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Register as Customer
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/customer-login')}
                  className="text-red-600 font-semibold hover:text-red-800"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>

          {/* Vendor Registration Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-transparent hover:border-yellow-400 transition-all duration-300 transform hover:scale-105">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 text-red-900">
              <div className="flex items-center justify-center mb-4">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-center">Vendor Registration</h2>
              <p className="text-center text-red-800 mt-2">Grow your wedding services business</p>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6">
                {[
                  'List your wedding services',
                  'Reach thousands of customers',
                  'Showcase your portfolio',
                  'Get direct bookings',
                  'Expand your business',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Register Button - Navigates to existing vendor-login page */}
              <button
                onClick={() => navigate('/vendor-login')}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 py-4 px-6 rounded-xl font-bold text-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Register as Vendor
              </button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <button
                  onClick={() => setShowVendorLogin(true)}
                  className="text-yellow-700 font-semibold hover:text-yellow-900"
                >
                  Login here
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

export default RegisterChoice;