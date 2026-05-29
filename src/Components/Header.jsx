'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import CustomerRegistrationForm from '../Components/CustomerRegistrationForm'; // ADD THIS IMPORT

const Header = ({ onOpenVendorForm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCustomerRegForm, setShowCustomerRegForm] = useState(false); // ADD THIS STATE
  const dropdownRef = useRef(null);
  const vendorDropdownRef = useRef(null);
  const menuRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const activeMenu = location.pathname.substring(1) || 'HOME';

  // Authentication states - check both customer and vendor login
  const [userType, setUserType] = useState(null); // 'customer' or 'vendor'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Check for stored login status on component mount
  useEffect(() => {
    const customerLoggedIn = localStorage.getItem('customerLoggedIn');
    const vendorLoggedIn = localStorage.getItem('vendorLoggedIn');
    
    if (customerLoggedIn === 'true') {
      setIsLoggedIn(true);
      setUserType('customer');
      const customerData = JSON.parse(localStorage.getItem('customerData') || '{}');
      setUserData(customerData);
    } else if (vendorLoggedIn === 'true') {
      setIsLoggedIn(true);
      setUserType('vendor');
      const vendorData = JSON.parse(localStorage.getItem('vendorData') || '{}');
      setUserData(vendorData);
    }
  }, []);

  const menuItems = [
    { name: 'HOME', path: '/' },
    { 
      name: 'CUSTOMER LOGIN', 
      path: '/customer-login',
      hasDropdown: true,
      dropdownType: 'customer',
      submenus: [
        { name: 'Photography', path: '/photography', type: 'page' },
        { name: 'Catering & Foods', path: '/catering', type: 'page' },
        { name: 'Mandapam & Wedding Halls', path: '/wedding-halls', type: 'page' },
        { name: 'Decorations', path: '/decorations', type: 'page' },
        { name: 'Entertainment & Events', path: '/entertainment', type: 'page' },
        { name: 'Invitation & Gifts', path: '/invitation', type: 'page' },
        { name: 'Bridal & Groom Styling', path: '/styling', type: 'page' },
        { name: 'Bride & Groom Background Investigations', path: '/background-investigations', type: 'page' },
      ]
    },
     { name: 'PRE MATRIMONIAL VERIFICATION', path: '/pre-matrimonial-verification', type: 'page' },
    { 
      name: 'VENDOR LOGIN', 
      path: '/vendor-login',
      hasDropdown: true,
      dropdownType: 'vendor',
      submenus: [
        { name: 'Photography Vendor Form', path: '/photography-vendor', formType: 'photography', type: 'form' },
        { name: 'Catering & Foods Vendor Form', path: '/catering-vendor', formType: 'catering', type: 'form' },
        { name: 'Wedding Halls Vendor Form', path: '/wedding-halls-vendor', formType: 'wedding-halls', type: 'form' },
        { name: 'Decorations Vendor Form', path: '/decorations-vendor', formType: 'decorations', type: 'form' },
        { name: 'Entertainment Vendor Form', path: '/entertainment-vendor', formType: 'entertainment', type: 'form' },
        { name: 'Invitation & Gifts Vendor Form', path: '/invitation-vendor', formType: 'invitation', type: 'form' },
        { name: 'Styling Vendor Form', path: '/styling-vendor', formType: 'styling', type: 'form' },
        { name: 'Background Investigations Form', path: '/background-investigations-vendor', formType: 'background-investigations', type: 'form' },
      ]
    },
    { name: 'OFFICE PANNEL', path: '/office-panel' },
    { name: 'ADMIN PANNEL', path: '/admin-panel' },
    { name: 'HELP & SUPPORT', path: '/help-support' },
    { name: 'ABOUT US', path: '/about-us' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isInsideCustomerDropdown = dropdownRef.current?.contains(event.target);
      const isInsideVendorDropdown = vendorDropdownRef.current?.contains(event.target);
      const isInsideProfileDropdown = profileDropdownRef.current?.contains(event.target);
      const isCustomerDropdownButton = event.target.closest('button')?.textContent?.includes('CUSTOMER LOGIN');
      const isVendorDropdownButton = event.target.closest('button')?.textContent?.includes('VENDOR LOGIN');
      
      if (!isInsideCustomerDropdown && !isCustomerDropdownButton && activeDropdown === 'CUSTOMER LOGIN') {
        setActiveDropdown(null);
      }
      
      if (!isInsideVendorDropdown && !isVendorDropdownButton && activeDropdown === 'VENDOR LOGIN') {
        setActiveDropdown(null);
      }

      if (!isInsideProfileDropdown && !event.target.closest('.profile-icon-button')) {
        setShowProfileDropdown(false);
      }
      
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setMobileDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [activeDropdown]);

  const handleMenuClick = (item) => {
    if (item.hasDropdown) {
      if (activeDropdown === item.name) {
        setActiveDropdown(null);
      } else {
        setActiveDropdown(item.name);
      }
      setIsMenuOpen(false);
      if (window.innerWidth < 1024) {
        if (mobileDropdownOpen === item.dropdownType) {
          setMobileDropdownOpen(null);
        } else {
          setMobileDropdownOpen(item.dropdownType);
        }
      }
    } else {
      setActiveDropdown(null);
      setMobileDropdownOpen(null);
      setIsMenuOpen(false);
      navigate(item.path);
    }
  };

  const handleSubmenuClick = (item) => {
    if (item.type === 'form' && item.formType && onOpenVendorForm) {
      onOpenVendorForm(item.formType);
      setActiveDropdown(null);
      setMobileDropdownOpen(null);
      setIsMenuOpen(false);
    } else {
      navigate(item.path);
      setActiveDropdown(null);
      setMobileDropdownOpen(null);
      setIsMenuOpen(false);
    }
  };

  const handleVendorLoginClick = () => {
    navigate('/vendor-login');
    setActiveDropdown(null);
    setMobileDropdownOpen(null);
    setIsMenuOpen(false);
  };

  const handleCustomerLoginClick = () => {
    navigate('/customer-login');
    setActiveDropdown(null);
    setMobileDropdownOpen(null);
    setIsMenuOpen(false);
  };

  const handleMouseEnter = (itemName) => {
    if (window.innerWidth >= 1024) {
      setActiveDropdown(itemName);
    }
  };

  const handleMouseLeave = (itemName) => {
    if (window.innerWidth >= 1024) {
      setTimeout(() => {
        if (activeDropdown === itemName) {
          const dropdownElement = itemName === 'CUSTOMER LOGIN' ? dropdownRef.current : vendorDropdownRef.current;
          if (!dropdownElement?.contains(document.activeElement) && 
              !dropdownElement?.matches(':hover')) {
            setActiveDropdown(null);
          }
        }
      }, 300);
    }
  };

  const handleDropdownMouseEnter = (dropdownType) => {
    if (window.innerWidth >= 1024) {
      if (dropdownType === 'customer') {
        setActiveDropdown('CUSTOMER LOGIN');
      } else if (dropdownType === 'vendor') {
        setActiveDropdown('VENDOR LOGIN');
      }
    }
  };

  const handleDropdownMouseLeave = (dropdownType) => {
    if (window.innerWidth >= 1024) {
      setTimeout(() => {
        const mainButton = document.querySelector(`button:contains("${dropdownType === 'customer' ? 'CUSTOMER LOGIN' : 'VENDOR LOGIN'}")`);
        if (!mainButton?.matches(':hover') && 
            !(dropdownType === 'customer' ? dropdownRef.current : vendorDropdownRef.current)?.matches(':hover')) {
          setActiveDropdown(null);
        }
      }, 300);
    }
  };

  const toggleMobileDropdown = (dropdownType) => {
    if (mobileDropdownOpen === dropdownType) {
      setMobileDropdownOpen(null);
    } else {
      setMobileDropdownOpen(dropdownType);
    }
  };

  const isActiveMenu = (item) => {
    const currentPath = location.pathname;
    if (item.hasDropdown) {
      return item.submenus.some(submenu => submenu.path === currentPath) || 
             item.path === currentPath;
    }
    return item.path === currentPath || (item.path === '/' && currentPath === '');
  };

  const isActiveSubmenu = (path) => {
    return location.pathname === path;
  };

  const getDropdownRef = (dropdownType) => {
    return dropdownType === 'customer' ? dropdownRef : vendorDropdownRef;
  };

  // Handle profile icon click
  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  // Navigate to appropriate profile
  const handleViewProfile = () => {
    if (userType === 'customer') {
      navigate('/customer-profile');
    } else if (userType === 'vendor') {
      navigate(`/vendor-profile/${userData?.id || 'VEN-2024-00123'}`);
    }
    setShowProfileDropdown(false);
    setIsMenuOpen(false);
  };

  // Handle logout
  const handleLogout = () => {
    if (userType === 'customer') {
      localStorage.removeItem('customerLoggedIn');
      localStorage.removeItem('customerData');
    } else if (userType === 'vendor') {
      localStorage.removeItem('vendorLoggedIn');
      localStorage.removeItem('vendorData');
    }
    setIsLoggedIn(false);
    setUserType(null);
    setUserData(null);
    setShowProfileDropdown(false);
    navigate('/');
  };

  // Handle login button click
  const handleLoginClick = () => {
    navigate('/login-choice');
    setActiveDropdown(null);
    setMobileDropdownOpen(null);
    setIsMenuOpen(false);
  };

  // Handle register button click - Navigate to register choice page
  const handleRegisterClick = () => {
    navigate('/register-choice'); // Navigate to register choice page
    setActiveDropdown(null);
    setMobileDropdownOpen(null);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 shadow-lg w-full">
      {/* Top decorative strip */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 w-full"></div>
      
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row: Logo, Heading, and Auth Buttons */}
          <div className="flex items-center justify-between py-3 border-b border-yellow-500/30">
            {/* Logo and Heading - LEFT */}
            <div className="flex items-center space-x-3">
              <Link 
                to="/" 
                className="flex items-center space-x-3" 
                onClick={() => {
                  setActiveDropdown(null);
                  setMobileDropdownOpen(null);
                  setIsMenuOpen(false);
                }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-lg border-3 border-yellow-300 overflow-hidden flex-shrink-0">
                  <img 
                    src={logo} 
                    alt="Eliteinova Logo" 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23F59E0B'/%3E%3Cstop offset='100%25' stop-color='%23D97706'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='32' cy='32' r='30' fill='url(%23grad)'/%3E%3Ctext x='32' y='38' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' font-weight='bold' fill='%23DC2626'%3EE%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                
                <div className="text-yellow-50">
                  <h1 className="font-bold text-lg sm:text-xl md:text-2xl leading-tight text-yellow-300" style={{ fontFamily: 'Pacifico, cursive' }}>
                    Eliteinova Wedding Services
                  </h1>
                  <p className="text-yellow-200 text-xs md:text-sm" style={{ fontFamily: 'Pacifico, cursive' }}>
                    Eliteinova Tech Pvt Ltd
                  </p>
                </div>
              </Link>
            </div>

            {/* Auth Buttons - RIGHT (Conditional based on login status) */}
            <div className="hidden lg:flex items-center space-x-4">
              {!isLoggedIn ? (
                <>
                  {/* Login Button */}
                  <button
                    onClick={handleLoginClick}
                    className="px-5 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 font-bold text-sm rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105"
                  >
                    LOGIN
                  </button>
                  
                  {/* Register Button - UPDATED */}
                  <button
                    onClick={handleRegisterClick}
                    className="px-5 py-2 bg-gradient-to-r from-white to-gray-100 text-red-700 font-bold text-sm rounded-lg shadow-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-300 transform hover:scale-105 border border-yellow-500"
                  >
                    REGISTER
                  </button>
                </>
              ) : (
                /* Profile Icon with Dropdown (Only show when logged in) */
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={handleProfileClick}
                    className="profile-icon-button p-2 rounded-full hover:bg-red-800 transition-all duration-300"
                    title="My Profile"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center border-2 border-yellow-300 shadow-md relative">
                      <svg className="w-5 h-5 text-red-900" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  </button>
                  
                  {/* Profile Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <p className="text-sm font-bold text-gray-800">
                          {userData?.name || (userType === 'customer' ? 'Customer' : 'Vendor')}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {userData?.email || 'user@example.com'}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-2 bg-red-50 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {userType === 'customer' ? 'Customer Account' : 'Vendor Account'}
                        </span>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-1">
                        <button
                          onClick={handleViewProfile}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-300 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          View Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-all duration-300 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-yellow-50 p-2 rounded-lg hover:bg-red-800 flex-shrink-0"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setActiveDropdown(null);
                setMobileDropdownOpen(null);
              }}
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Menu Row */}
          <div className="py-1">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center justify-center space-x-1">
              {menuItems.map((item) => (
                <div 
                  key={item.name} 
                  className="relative h-full group"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={() => handleMouseLeave(item.name)}
                >
                  {item.hasDropdown ? (
                    <div 
                      ref={getDropdownRef(item.dropdownType)}
                      className="relative h-full"
                      onMouseEnter={() => handleDropdownMouseEnter(item.dropdownType)}
                      onMouseLeave={() => handleDropdownMouseLeave(item.dropdownType)}
                    >
                      <button
                        onClick={() => handleMenuClick(item)}
                        className={`px-3 py-1.5 rounded transition-all duration-300 font-medium text-sm whitespace-nowrap text-center flex items-center gap-1 min-w-[140px] h-full ${
                          (isActiveMenu(item) || activeDropdown === item.name)
                            ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 shadow-md'
                            : 'text-yellow-50 hover:bg-red-800 hover:text-yellow-200'
                        }`}
                      >
                        {item.name}
                        <svg 
                          className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      
                      {activeDropdown === item.name && (
                        <div 
                          className="absolute top-full left-0 mt-0 w-72 bg-white rounded-b-lg shadow-2xl border border-gray-200 py-2 z-50 animate-dropdown-slide"
                          onMouseEnter={() => handleDropdownMouseEnter(item.dropdownType)}
                          onMouseLeave={() => handleDropdownMouseLeave(item.dropdownType)}
                        >
                          <button
                            onClick={() => {
                              if (item.dropdownType === 'vendor') {
                                handleVendorLoginClick();
                              } else if (item.dropdownType === 'customer') {
                                handleCustomerLoginClick();
                              } else {
                                navigate(item.path);
                                setActiveDropdown(null);
                              }
                            }}
                            className={`w-full text-left px-4 py-3 transition-all duration-300 font-medium border-b border-gray-100 ${
                              isActiveSubmenu(item.path)
                                ? 'bg-red-50 text-red-700'
                                : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                            }`}
                          >
                            <span className="font-bold">
                              {item.dropdownType === 'customer' ? 'Customer Login Page' : 'Vendor Login Page'}
                            </span>
                          </button>
                          
                          {item.submenus.map((submenu) => (
                            <button
                              key={submenu.name}
                              onClick={() => handleSubmenuClick(submenu)}
                              className={`w-full text-left px-4 py-3 transition-all duration-300 font-medium ${
                                isActiveSubmenu(submenu.path)
                                  ? 'bg-red-50 text-red-700'
                                  : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                              }`}
                            >
                              {submenu.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => handleMenuClick(item)}
                      className={`px-3 py-1.5 rounded transition-all duration-300 font-medium text-sm whitespace-nowrap text-center min-w-[140px] block ${
                        isActiveMenu(item)
                          ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 shadow-md'
                          : 'text-yellow-50 hover:bg-red-800 hover:text-yellow-200'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
              <div ref={menuRef} className="lg:hidden bg-gradient-to-b from-red-700 to-red-800 rounded-lg shadow-xl border border-yellow-500/30 p-4">
                <div className="flex flex-col space-y-2">
                  {/* Mobile Auth Section */}
                  <div className="pb-3 border-b border-yellow-500/20">
                    {!isLoggedIn ? (
                      <div className="flex flex-col space-y-3">
                        {/* Mobile Login Button */}
                        <button
                          onClick={handleLoginClick}
                          className="w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300"
                        >
                          LOGIN
                        </button>
                        
                        {/* Mobile Register Button - UPDATED */}
                        <button
                          onClick={handleRegisterClick}
                          className="w-full px-4 py-3 bg-gradient-to-r from-white to-gray-100 text-red-700 font-bold rounded-lg shadow-lg hover:from-gray-100 hover:to-gray-200 transition-all duration-300 border border-yellow-500"
                        >
                          REGISTER
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Mobile Profile Info */}
                        <button
                          onClick={handleProfileClick}
                          className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg hover:from-yellow-500/30 hover:to-yellow-600/30 transition-all duration-300"
                        >
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center border-2 border-yellow-300 relative">
                            <svg className="w-6 h-6 text-red-900" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-yellow-50">
                              {userData?.name || 'My Profile'}
                            </div>
                            <div className="text-xs text-yellow-200">
                              {userType === 'customer' ? 'Customer Account' : 'Vendor Account'}
                            </div>
                          </div>
                        </button>
                        
                        {/* Mobile Profile Actions */}
                        <div className="mt-2 space-y-1">
                          <button
                            onClick={handleViewProfile}
                            className="w-full px-4 py-2 text-sm text-yellow-100 hover:text-white hover:bg-red-600 rounded-md transition-all duration-300 text-left flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            View Profile
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full px-4 py-2 text-sm text-yellow-100 hover:text-white hover:bg-red-600 rounded-md transition-all duration-300 text-left flex items-center gap-2"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                          </button>
                        </div>
                      </>
                    )}
                  </div>

                  {menuItems.map((item) => (
                    <div key={item.name}>
                      {item.hasDropdown ? (
                        <div className="border-b border-yellow-500/20 pb-2">
                          <button
                            onClick={() => {
                              if (window.innerWidth < 1024) {
                                toggleMobileDropdown(item.dropdownType);
                              }
                            }}
                            className={`w-full px-4 py-3 rounded text-center transition-all duration-300 font-medium flex items-center justify-between ${
                              (isActiveMenu(item) || mobileDropdownOpen === item.dropdownType)
                                ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900'
                                : 'text-yellow-100 hover:bg-red-600'
                            }`}
                          >
                            {item.name}
                            <svg 
                              className={`w-4 h-4 transition-transform duration-300 ${mobileDropdownOpen === item.dropdownType ? 'rotate-180' : ''}`} 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                          
                          {mobileDropdownOpen === item.dropdownType && (
                            <div className="mt-2 space-y-1 bg-white rounded-lg p-2 shadow-lg">
                              <button
                                onClick={() => {
                                  if (item.dropdownType === 'vendor') {
                                    handleVendorLoginClick();
                                  } else if (item.dropdownType === 'customer') {
                                    handleCustomerLoginClick();
                                  } else {
                                    navigate(item.path);
                                    setMobileDropdownOpen(null);
                                    setIsMenuOpen(false);
                                  }
                                }}
                                className={`block w-full text-left px-4 py-2.5 rounded transition-all duration-300 font-medium ${
                                  isActiveSubmenu(item.path)
                                    ? 'bg-red-50 text-red-700'
                                    : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                                }`}
                              >
                                <span className="font-bold">
                                  {item.dropdownType === 'customer' ? 'Customer Login Page' : 'Vendor Login Page'}
                                </span>
                              </button>
                              
                              {item.submenus.map((submenu) => (
                                <button
                                  key={submenu.name}
                                  onClick={() => handleSubmenuClick(submenu)}
                                  className={`block w-full text-left px-4 py-2.5 rounded transition-all duration-300 font-medium ${
                                    isActiveSubmenu(submenu.path)
                                      ? 'bg-red-50 text-red-700'
                                      : 'text-gray-700 hover:bg-red-50 hover:text-red-700'
                                  }`}
                                >
                                  {submenu.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to={item.path}
                          onClick={() => handleMenuClick(item)}
                          className={`px-4 py-3 rounded text-center transition-all duration-300 font-medium block ${
                            isActiveMenu(item)
                              ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900'
                              : 'text-yellow-100 hover:bg-red-600'
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom decorative strip */}
      <div className="h-1 bg-gradient-to-r from-yellow-400 via-red-600 to-yellow-400 w-full"></div>

      {/* ADD CUSTOMER REGISTRATION MODAL HERE */}
      {showCustomerRegForm && (
        <CustomerRegistrationForm 
          isOpen={showCustomerRegForm}
          onClose={() => setShowCustomerRegForm(false)}
        />
      )}

      <style jsx>{`
        @keyframes dropdown-slide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-dropdown-slide {
          animation: dropdown-slide 0.2s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default Header;