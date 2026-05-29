import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VendorLoginForm = ({ onClose, showRegisterOptions = false }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    vendorId: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showServiceForms, setShowServiceForms] = useState(false);
  const [loading, setLoading] = useState(false);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simple validation
      if (!loginData.vendorId || !loginData.email || !loginData.password) {
        throw new Error('Please fill in all fields');
      }

      // Check if vendor exists in localStorage
      const vendors = JSON.parse(localStorage.getItem('vendors') || '[]');
      const vendor = vendors.find(v => 
        (v.id === loginData.vendorId || v.vendorId === loginData.vendorId) && 
        v.email === loginData.email
      );

      // For demo purposes, check if it's the current vendor from registration
      const currentVendorData = JSON.parse(localStorage.getItem('vendorData') || '{}');
      const isCurrentVendor = currentVendorData.id === loginData.vendorId || 
                             currentVendorData.vendorId === loginData.vendorId;

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      let vendorToLogin = null;
      
      if (vendor) {
        vendorToLogin = vendor;
      } else if (isCurrentVendor) {
        vendorToLogin = currentVendorData;
      } else {
        // For DEMO PURPOSES ONLY: If no vendor found, create a dummy vendor
        // Remove this in production
        vendorToLogin = {
          id: loginData.vendorId,
          vendorId: loginData.vendorId,
          email: loginData.email,
          name: `Vendor ${loginData.vendorId}`,
          category: 'Wedding Services',
          phone: 'Not provided',
          location: 'India',
          experience: '5+ Years',
          rating: 4.5,
          totalReviews: 50,
          verified: true,
          about: 'Professional wedding service provider',
          services: [
            { id: 1, name: 'Basic Service Package', price: '₹50,000+' }
          ],
          portfolio: [],
          reviews: []
        };
        
        // Store dummy vendor for future logins
        const updatedVendors = [...vendors, vendorToLogin];
        localStorage.setItem('vendors', JSON.stringify(updatedVendors));
      }

      // Set vendor as logged in
      localStorage.setItem('vendorLoggedIn', 'true');
      localStorage.setItem('currentVendor', JSON.stringify(vendorToLogin));
      
      // Generate a unique vendor profile URL
      const vendorId = vendorToLogin.id || vendorToLogin.vendorId || 'demo-vendor';
      const vendorSlug = vendorId.toLowerCase().replace(/\s+/g, '-');
      
      // Navigate to vendor profile
      navigate(`/vendor-profile/${vendorSlug}`);
      
      // Close modal if it's open
      if (onClose) {
        onClose();
      }

    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // FIXED: Navigate to specific registration page instead of vendor-login
  const handleServiceFormClick = (formType) => {
    // Store the selected form type
    localStorage.setItem('selectedVendorForm', formType);
    
    // Navigate to specific registration page based on form type
    switch(formType) {
      case 'photography':
        navigate('/register/photography');
        break;
      case 'catering':
        navigate('/register/catering');
        break;
      case 'wedding-halls':
        navigate('/register/wedding-halls');
        break;
      case 'decorations':
        navigate('/register/decorations');
        break;
      case 'entertainment':
        navigate('/register/entertainment');
        break;
      case 'styling':
        navigate('/register/styling');
        break;
      case 'invitation':
        navigate('/register/invitation');
        break;
      case 'matchproof':
        navigate('/register/matchproof');
        break;
      default:
        // Fallback to general vendor registration
        navigate('/vendor-registration');
    }
    
    // Close modal if it's open
    if (onClose) onClose();
  };

  // Handle click outside modal to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  // Demo login for testing
  const handleDemoLogin = () => {
    setLoginData({
      vendorId: 'VEN001',
      email: 'vendor@example.com',
      password: 'demo123'
    });
  };

  // Direct vendor profile navigation for testing (debug button)
  const handleTestVendorProfile = () => {
    const testVendorData = {
      id: 'VEN001',
      vendorId: 'VEN001',
      basicDetails: {
        logo: '',
        businessName: 'Capture Moments Wedding Photography',
        ownerName: 'Rajesh Kumar',
        designation: 'Lead Photographer & Owner',
        typeOfService: ['Wedding Photography', 'Candid Photography', 'Videography'],
        yearsOfExperience: '8 Years',
        businessType: 'Proprietorship'
      },
      contactInfo: {
        mobile: '+91 98765 43210',
        alternateMobile: '+91 87654 32109',
        email: 'capturemoments@example.com',
        officeAddress: '123 Wedding Street, Photography Nagar',
        cityDistrict: 'Chennai',
        state: 'Tamil Nadu',
        pinCode: '600001',
        currentLocation: 'Chennai, Tamil Nadu',
        website: 'www.capturemoments.com'
      },
      // ... other sections
    };
    
    localStorage.setItem('vendorLoggedIn', 'true');
    localStorage.setItem('currentVendor', JSON.stringify(testVendorData));
    navigate('/vendor-profile/VEN001');
    if (onClose) onClose();
  };

  // Service categories with icons and colors - REMOVED GIFTS, ADDED MATCHPROOF
  const serviceCategories = [
    { name: 'Photography', formType: 'photography', icon: '📸', color: 'from-blue-50 to-blue-100', border: 'border-blue-200' },
    { name: 'Catering', formType: 'catering', icon: '🍽️', color: 'from-green-50 to-green-100', border: 'border-green-200' },
    { name: 'Wedding Halls', formType: 'wedding-halls', icon: '🏛️', color: 'from-purple-50 to-purple-100', border: 'border-purple-200' },
    { name: 'Decorations', formType: 'decorations', icon: '🎨', color: 'from-pink-50 to-pink-100', border: 'border-pink-200' },
    { name: 'Entertainment', formType: 'entertainment', icon: '🎤', color: 'from-orange-50 to-orange-100', border: 'border-orange-200' },
    { name: 'Styling', formType: 'styling', icon: '💇', color: 'from-teal-50 to-teal-100', border: 'border-teal-200' },
    { name: 'Invitation', formType: 'invitation', icon: '💌', color: 'from-red-50 to-red-100', border: 'border-red-200' },
    { name: 'Matchproof Investigations', formType: 'matchproof', icon: '🔍', color: 'from-gray-50 to-gray-100', border: 'border-gray-200' },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-yellow-700">Vendor Login</h2>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {!showServiceForms ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Vendor ID <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="vendorId"
                    value={loginData.vendorId}
                    onChange={handleChange}
                    placeholder="Enter your Vendor ID"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">For demo: Use VEN001 or any ID</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleChange}
                    placeholder="Enter your registered email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Password <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 outline-none transition-all"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                {/* Demo Login Button */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleDemoLogin}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-all text-sm border border-gray-300"
                  >
                    Fill Demo Credentials
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 py-3 px-6 rounded-xl font-bold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </>
                  ) : (
                    'Login to Vendor Dashboard'
                  )}
                </button>

                {/* DEBUG BUTTON (remove in production) */}
                <button
                  type="button"
                  onClick={handleTestVendorProfile}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all text-sm"
                >
                  Test Vendor Profile (Debug)
                </button>

                <div className="text-center text-sm text-gray-500 pt-2">
                  <p>For demo: Use any credentials or click "Fill Demo Credentials"</p>
                </div>

                {showRegisterOptions && (
                  <div className="text-center pt-4 border-t">
                    <p className="text-gray-600 text-sm mb-2">New Vendor?</p>
                    <button
                      type="button"
                      onClick={() => setShowServiceForms(true)}
                      className="text-yellow-700 hover:text-yellow-900 font-medium"
                    >
                      Register Your Services Here
                    </button>
                  </div>
                )}
              </div>
            </form>
          ) : (
            /* Service Registration Options - FIXED NAVIGATION */
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">Register Your Services</h3>
                <p className="text-sm text-gray-600">Select your service category to register as a vendor</p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {serviceCategories.map((service, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleServiceFormClick(service.formType)}
                    className={`p-4 bg-gradient-to-br ${service.color} ${service.border} rounded-lg hover:shadow-md transition-all text-center group hover:scale-105 transform duration-200`}
                  >
                    <div className="text-2xl mb-2">{service.icon}</div>
                    <div className="font-medium text-gray-800 group-hover:text-gray-900">
                      {service.name}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">Click to register</p>
                  </button>
                ))}
              </div>

              <div className="text-center text-sm text-gray-500 mb-4">
                <p>You will be redirected to the specific registration form</p>
              </div>

              <button
                onClick={() => setShowServiceForms(false)}
                className="w-full text-gray-600 hover:text-yellow-700 text-sm font-medium flex items-center justify-center gap-2 py-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorLoginForm;