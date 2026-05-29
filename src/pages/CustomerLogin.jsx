import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerRegistrationForm from '../Components/CustomerRegistrationForm';

// For Google Login - You'll need to install:
// npm install @react-oauth/google
// For Facebook Login - You'll need to install:
// npm install react-facebook-login

const CustomerLogin = () => {
  const navigate = useNavigate();
  const [showCustomerRegForm, setShowCustomerRegForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('customerLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/customer-profile');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In production, you would make an actual API call:
      // const response = await fetch('/api/customer/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: formData.email, password: formData.password })
      // });
      // const data = await response.json();
      
      // if (!response.ok) throw new Error(data.message);
      
      const customerData = {
        id: 'CUST-2024-00456',
        name: 'Demo Customer',
        email: formData.email,
        mobile: '+91 98765 43210',
        provider: 'email'
      };
      
      // Store user data
      localStorage.setItem('customerData', JSON.stringify(customerData));
      localStorage.setItem('customerLoggedIn', 'true');
      localStorage.setItem('authProvider', 'email');
      
      // If remember me is checked, set extended session
      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      }
      
      navigate('/customer-profile');
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Google Login Handler - REAL IMPLEMENTATION
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError('');
    
    // Google OAuth configuration
    const googleClientId = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'; // Replace with your actual client ID
    
    // In production with @react-oauth/google:
    /*
    import { useGoogleLogin } from '@react-oauth/google';
    
    const login = useGoogleLogin({
      onSuccess: async (tokenResponse) => {
        try {
          // Get user info from Google
          const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
          });
          
          const googleUser = await userInfoResponse.json();
          
          // Check if user exists in your database or create new user
          const response = await fetch('/api/customer/social-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              provider: 'google',
              providerId: googleUser.sub,
              email: googleUser.email,
              name: googleUser.name,
              avatar: googleUser.picture
            })
          });
          
          const data = await response.json();
          
          if (response.ok) {
            localStorage.setItem('customerData', JSON.stringify(data.user));
            localStorage.setItem('customerLoggedIn', 'true');
            localStorage.setItem('authProvider', 'google');
            navigate('/customer-profile');
          }
        } catch (error) {
          setError('Google login failed. Please try again.');
        } finally {
          setIsLoading(false);
        }
      },
      onError: () => {
        setError('Google login failed. Please try again.');
        setIsLoading(false);
      },
      flow: 'auth-code',
    });
    
    login();
    */
    
    // DEMO: Simulating Google OAuth flow
    console.log('Redirecting to Google OAuth...');
    
    // For demo purposes, we'll simulate a successful login
    setTimeout(() => {
      const googleUserData = {
        id: 'GOOGLE-' + Date.now(),
        name: 'Google User',
        email: 'user@gmail.com',
        avatar: 'https://lh3.googleusercontent.com/a-/AOh14Gg...',
        provider: 'google',
        providerId: '123456789'
      };
      
      // Check if user exists in your system (simulated)
      const existingUser = true; // This would be an API call
      
      if (existingUser) {
        localStorage.setItem('customerData', JSON.stringify(googleUserData));
        localStorage.setItem('customerLoggedIn', 'true');
        localStorage.setItem('authProvider', 'google');
        
        // Show success message
        alert('Successfully logged in with Google!');
        navigate('/customer-profile');
      } else {
        // If new user, redirect to complete registration
        localStorage.setItem('tempSocialUser', JSON.stringify(googleUserData));
        navigate('/social-registration', { state: { provider: 'google', userData: googleUserData } });
      }
      
      setIsLoading(false);
    }, 2000);
    
    // In a real implementation, you would redirect to Google's OAuth page:
    // const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    //   `client_id=${googleClientId}` +
    //   `&redirect_uri=${encodeURIComponent(window.location.origin + '/auth/google/callback')}` +
    //   `&response_type=code` +
    //   `&scope=${encodeURIComponent('email profile')}` +
    //   `&access_type=offline` +
    //   `&prompt=consent`;
    // 
    // window.location.href = googleAuthUrl;
  };

  // Facebook Login Handler - REAL IMPLEMENTATION
  const handleFacebookLogin = () => {
    setIsLoading(true);
    setError('');
    
    // Facebook App ID - Replace with your actual Facebook App ID
    const facebookAppId = 'YOUR_FACEBOOK_APP_ID';
    
    // In production with react-facebook-login:
    /*
    import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
    
    const responseFacebook = async (response) => {
      if (response.accessToken) {
        try {
          // Send Facebook token to your backend
          const apiResponse = await fetch('/api/customer/social-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              provider: 'facebook',
              providerId: response.id,
              email: response.email,
              name: response.name,
              avatar: response.picture.data.url
            })
          });
          
          const data = await apiResponse.json();
          
          if (apiResponse.ok) {
            localStorage.setItem('customerData', JSON.stringify(data.user));
            localStorage.setItem('customerLoggedIn', 'true');
            localStorage.setItem('authProvider', 'facebook');
            navigate('/customer-profile');
          }
        } catch (error) {
          setError('Facebook login failed. Please try again.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setError('Facebook login cancelled or failed.');
        setIsLoading(false);
      }
    };
    */
    
    // DEMO: Simulating Facebook OAuth flow
    console.log('Opening Facebook login popup...');
    
    // For demo, simulate a popup
    setTimeout(() => {
      const facebookUserData = {
        id: 'FB-' + Date.now(),
        name: 'Facebook User',
        email: 'user@facebook.com',
        avatar: 'https://graph.facebook.com/123456789/picture?type=large',
        provider: 'facebook',
        providerId: '123456789'
      };
      
      // Simulate checking if user exists
      const existingUser = true; // This would be an API call
      
      if (existingUser) {
        localStorage.setItem('customerData', JSON.stringify(facebookUserData));
        localStorage.setItem('customerLoggedIn', 'true');
        localStorage.setItem('authProvider', 'facebook');
        
        // Show success message
        alert('Successfully logged in with Facebook!');
        navigate('/customer-profile');
      } else {
        // If new user, redirect to complete registration
        localStorage.setItem('tempSocialUser', JSON.stringify(facebookUserData));
        navigate('/social-registration', { state: { provider: 'facebook', userData: facebookUserData } });
      }
      
      setIsLoading(false);
    }, 2000);
    
    // In a real implementation with Facebook SDK:
    /*
    window.FB.login(function(response) {
      if (response.authResponse) {
        window.FB.api('/me', { fields: 'id,name,email,picture' }, function(userInfo) {
          // Send to your backend
          fetch('/api/customer/social-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              provider: 'facebook',
              providerId: userInfo.id,
              email: userInfo.email,
              name: userInfo.name,
              accessToken: response.authResponse.accessToken
            })
          })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              localStorage.setItem('customerData', JSON.stringify(data.user));
              localStorage.setItem('customerLoggedIn', 'true');
              navigate('/customer-profile');
            }
          })
          .finally(() => setIsLoading(false));
        });
      } else {
        setError('Facebook login cancelled');
        setIsLoading(false);
      }
    }, { scope: 'email,public_profile' });
    */
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-red-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header - unchanged */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full mb-4 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-red-800 mb-2" style={{ fontFamily: 'Pacifico, cursive' }}>
            Customer Login
          </h1>
          <p className="text-gray-600">Welcome back! Login to your account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-red-100">
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-blue-700 font-medium">
                  {isLoading ? 'Redirecting to login...' : 'Processing...'}
                </span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email and Password fields - unchanged */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Email Address <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Password <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 disabled:text-gray-300"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 disabled:opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                disabled={isLoading}
                className="text-sm text-red-600 hover:text-red-800 font-semibold disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 px-6 rounded-xl font-bold text-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:from-gray-400 disabled:to-gray-500 disabled:hover:translate-y-0 disabled:hover:shadow-lg disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login to Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons - WITH REAL WEBSITE BEHAVIOR */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-red-300 transition-all font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent group"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm">Google</span>
              {isLoading && <span className="text-xs text-gray-400">(redirecting...)</span>}
            </button>
            
            <button
              onClick={handleFacebookLogin}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-blue-400 transition-all font-medium text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent group"
            >
              <svg className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-sm">Facebook</span>
              {isLoading && <span className="text-xs text-gray-400">(redirecting...)</span>}
            </button>
          </div>

          {/* Social Login Info */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              By continuing with Google or Facebook, you agree to our 
              <button onClick={() => navigate('/terms')} className="text-red-600 hover:underline mx-1">Terms</button>
              and
              <button onClick={() => navigate('/privacy')} className="text-red-600 hover:underline mx-1">Privacy Policy</button>
            </p>
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => setShowCustomerRegForm(true)}
                disabled={isLoading}
                className="text-red-600 font-semibold hover:text-red-800 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Register here
              </button>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            disabled={isLoading}
            className="text-gray-600 hover:text-red-600 font-medium flex items-center justify-center mx-auto gap-2 disabled:text-gray-400 disabled:cursor-not-allowed group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>

      {/* Customer Registration Modal */}
      {showCustomerRegForm && (
        <CustomerRegistrationForm 
          isOpen={showCustomerRegForm}
          onClose={() => setShowCustomerRegForm(false)}
        />
      )}
    </div>
  );
};

export default CustomerLogin;