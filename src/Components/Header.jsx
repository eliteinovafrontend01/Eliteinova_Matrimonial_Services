'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ChevronDownIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  BellIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import logo from '../assets/logo.png';
import CustomerRegistrationForm from '../Components/CustomerRegistrationForm';

const Header = ({ onOpenVendorForm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showStaffMenu, setShowStaffMenu] = useState(false);
  const [showCustomerRegForm, setShowCustomerRegForm] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef(null);
  const vendorDropdownRef = useRef(null);
  const menuRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const staffMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [userType, setUserType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const customerLoggedIn = localStorage.getItem('customerLoggedIn');
    const vendorLoggedIn = localStorage.getItem('vendorLoggedIn');
    if (customerLoggedIn === 'true') {
      setIsLoggedIn(true);
      setUserType('customer');
      setUserData(JSON.parse(localStorage.getItem('customerData') || '{}'));
    } else if (vendorLoggedIn === 'true') {
      setIsLoggedIn(true);
      setUserType('vendor');
      setUserData(JSON.parse(localStorage.getItem('vendorData') || '{}'));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Main nav items (no Office/Admin Panel here)
  const mainNavItems = [
    { name: 'Home', path: '/' },
    {
      name: 'Customer Login',
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
        { name: 'Background Investigations', path: '/background-investigations', type: 'page' },
      ],
    },
    { name: 'Pre Matrimonial', path: '/pre-matrimonial-verification' },
    {
      name: 'Vendor Login',
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
      ],
    },
    { name: 'Help & Support', path: '/help-support' },
    { name: 'About Us', path: 'https://www.eliteinovamatrimony.com/aboutus', external: true },
  ];

  // Staff menu items (Office Panel + Admin Panel) — shown in desktop hamburger only
  const staffItems = [
    { name: 'Office Login', path: '/office-panel' },
    { name: 'Admin Login', path: '/admin-panel' },
  ];

  // Click-outside handler
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        if (activeDropdown === 'Customer Login') setActiveDropdown(null);
      }
      if (vendorDropdownRef.current && !vendorDropdownRef.current.contains(e.target)) {
        if (activeDropdown === 'Vendor Login') setActiveDropdown(null);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
      if (staffMenuRef.current && !staffMenuRef.current.contains(e.target)) {
        setShowStaffMenu(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
        setMobileDropdownOpen(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  const handleSubmenuClick = (item) => {
    if (item.type === 'form' && item.formType && onOpenVendorForm) {
      onOpenVendorForm(item.formType);
    } else {
      navigate(item.path);
    }
    setActiveDropdown(null);
    setMobileDropdownOpen(null);
    setIsMenuOpen(false);
  };

  const isActivePath = (path) => location.pathname === path;
  const isActiveMenu = (item) => {
    if (item.hasDropdown) return item.submenus?.some(s => s.path === location.pathname) || location.pathname === item.path;
    return location.pathname === item.path || (item.path === '/' && location.pathname === '/');
  };

  const handleProfileClick = () => setShowProfileDropdown(!showProfileDropdown);

  const handleViewProfile = () => {
    navigate(userType === 'vendor' ? `/vendor-profile/${userData?.id || 'VEN-2024-00123'}` : '/customer-profile');
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem(userType === 'customer' ? 'customerLoggedIn' : 'vendorLoggedIn');
    localStorage.removeItem(userType === 'customer' ? 'customerData' : 'vendorData');
    setIsLoggedIn(false);
    setUserType(null);
    setUserData(null);
    setShowProfileDropdown(false);
    navigate('/');
  };

  const getInitials = (name) => (name ? name.charAt(0).toUpperCase() : 'U');

  const getDropdownRef = (type) => (type === 'customer' ? dropdownRef : vendorDropdownRef);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        {/* Top decorative strip - matching first code's style */}
        <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400" />

        <nav
          className={`bg-gradient-to-r from-red-700 via-red-600 to-red-500 text-white transition-all duration-500 ${scrolled ? 'shadow-2xl' : 'shadow-md'}`}
          style={{ overflow: 'visible' }}
        >
          <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-4 py-3">

            {/* ── Logo (styling from first code) ── */}
            <Link to="/" className="flex items-center space-x-3 group flex-shrink-0" onClick={() => setIsMenuOpen(false)}>
              <img
                src={logo}
                alt="Eliteinova Matrimony Logo"
                className="w-[65px] h-[65px] rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300 ring-2 ring-yellow-400/50"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='65' height='65' viewBox='0 0 65 65'%3E%3Ccircle cx='32.5' cy='32.5' r='30' fill='%23F59E0B'/%3E%3Ctext x='32.5' y='42' text-anchor='middle' font-size='28' font-weight='bold' fill='%23DC2626'%3EE%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="leading-tight">
                <div className="font-pacifico text-3xl bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent leading-none">
                  Elite<span className="text-2xl">inova</span> <span className="text-lg">Matrimonial Services</span>
                </div>
                <div className="text-sm font-normal text-yellow-100/80 mt-0.5">
                  Eliteinova Tech Pvt Ltd
                </div>
              </div>
            </Link>

            {/* ── Desktop Nav Links (styling from first code) ── */}
            <ul className="hidden lg:flex items-center gap-0 font-semibold text-[13.5px] tracking-wide flex-wrap justify-center flex-1 px-4">
              {mainNavItems.map((item) => (
                <li key={item.name} className="relative group">
                  {item.hasDropdown ? (
                    <div
                      ref={getDropdownRef(item.dropdownType)}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setTimeout(() => setActiveDropdown(d => d === item.name ? null : d), 200)}
                    >
                      <button
                        onClick={() => setActiveDropdown(d => d === item.name ? null : item.name)}
                        className={`relative py-2 px-1 transition-all duration-200 whitespace-nowrap flex items-center gap-1 ${
                          isActiveMenu(item) || activeDropdown === item.name
                            ? 'text-yellow-400 font-bold'
                            : 'text-white hover:text-yellow-300'
                        }`}
                      >
                        {item.name}
                        <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full ${isActiveMenu(item) ? 'w-full' : 'w-0'}`} />
                      </button>

                      {activeDropdown === item.name && (
                        <div
                          className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-1.5 z-50"
                          style={{ animation: 'dropDown 0.18s ease-out' }}
                          onMouseEnter={() => setActiveDropdown(item.name)}
                          onMouseLeave={() => setTimeout(() => setActiveDropdown(d => d === item.name ? null : d), 200)}
                        >
                          <button
                            onClick={() => { navigate(item.path); setActiveDropdown(null); }}
                            className="w-full text-left px-4 py-2.5 text-sm font-semibold text-red-700 hover:bg-red-50 border-b border-gray-100 transition-colors"
                          >
                            {item.dropdownType === 'customer' ? 'Customer Login Page' : 'Vendor Login Page'}
                          </button>
                          {item.submenus.map((sub) => (
                            <button
                              key={sub.name}
                              onClick={() => handleSubmenuClick(sub)}
                              className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                isActivePath(sub.path) ? 'bg-red-50 text-red-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-red-700'
                              }`}
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : item.external ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative py-2 px-1 transition-all duration-200 whitespace-nowrap block ${
                        isActiveMenu(item) ? 'text-yellow-400 font-bold' : 'text-white hover:text-yellow-300'
                      }`}
                    >
                      {item.name}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full ${isActiveMenu(item) ? 'w-full' : 'w-0'}`} />
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className={`relative py-2 px-1 transition-all duration-200 whitespace-nowrap block ${
                        isActiveMenu(item) ? 'text-yellow-400 font-bold' : 'text-white hover:text-yellow-300'
                      }`}
                    >
                      {item.name}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full ${isActiveMenu(item) ? 'w-full' : 'w-0'}`} />
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            {/* ── Desktop Right: Auth + Staff Hamburger (styling from first code) ── */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              {/* Auth buttons / profile */}
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  {userType === 'customer' && (
                    <div className="flex gap-3">
                      <button
                        onClick={() => navigate('/notifications')}
                        className="relative p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
                      >
                        <BellIcon className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center animate-pulse">3</span>
                      </button>
                      <button
                        onClick={() => navigate('/messages')}
                        className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
                      >
                        <ChatBubbleLeftRightIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  {/* User Dropdown - styled like first code */}
                  <div className="relative" ref={profileDropdownRef}>
                    <button
                      onClick={handleProfileClick}
                      className={`flex items-center gap-2 rounded-full pl-1 pr-4 py-1 border-2 transition-all duration-300 ${
                        userType === 'vendor'
                          ? 'bg-yellow-400/20 border-yellow-400 hover:border-yellow-500'
                          : 'bg-white/10 border-yellow-400/30 hover:border-yellow-400'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shadow-lg relative ${
                        userType === 'vendor' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' : 'bg-gradient-to-br from-yellow-400 to-yellow-500'
                      }`}>
                        {getInitials(userData?.name)}
                        {userType === 'vendor' && <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />}
                      </div>
                      <span className="font-semibold text-white text-sm">
                        {userType === 'vendor' ? 'Vendor' : `Hi, ${userData?.name?.split(' ')[0] || 'User'}`}
                      </span>
                      <ChevronDownIcon className={`w-4 h-4 text-yellow-300 transition-transform duration-300 ${showProfileDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showProfileDropdown && (
                      <div className="absolute top-full right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-[9999] animate-fadeIn">
                        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-bold relative ${
                            userType === 'vendor' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' : 'bg-gradient-to-br from-yellow-400 to-yellow-500'
                          }`}>
                            {getInitials(userData?.name)}
                            {userType === 'vendor' && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm">{userData?.name || (userType === 'customer' ? 'Customer' : 'Vendor')}</p>
                            <p className="text-xs text-gray-500">{userData?.email || ''}</p>
                          </div>
                        </div>

                        <button onClick={handleViewProfile} className="w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700 font-medium text-sm transition-colors flex items-center gap-3">
                          <UserIcon className="w-5 h-5" />
                          <span>My Profile</span>
                        </button>

                        <button onClick={handleLogout} className="w-full px-4 py-3 text-left hover:bg-red-50 text-red-600 font-medium text-sm transition-colors flex items-center gap-3 border-t border-gray-100">
                          <span>🚪</span>
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/register-choice')}
                    className="px-4 py-2.5 text-sm bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:scale-105 flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <UserPlusIcon className="w-4 h-4" />
                    Register
                  </button>

                  <button
                    onClick={() => navigate('/login-choice')}
                    className="px-4 py-2.5 text-sm bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:scale-105 whitespace-nowrap"
                  >
                    Login
                  </button>

                  {/* Staff Access Dropdown - matching first code's style */}
                  <div className="relative" ref={staffMenuRef}>
                    <button
                      onClick={() => setShowStaffMenu(!showStaffMenu)}
                      className="p-2.5 bg-white/10 border border-yellow-400/50 text-white rounded-full font-bold hover:bg-white/20 transition-all duration-300 flex items-center gap-1"
                      title="Staff Access"
                    >
                      <Bars3Icon className="w-4 h-4" />
                      <ChevronDownIcon className={`w-3.5 h-3.5 transition-transform duration-300 ${showStaffMenu ? 'rotate-180' : ''}`} />
                    </button>

                    {showStaffMenu && (
                      <div
                        className="absolute mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 animate-fadeIn"
                        style={{ right: 0, top: '100%', zIndex: 9999 }}
                      >
                        <p className="px-4 py-2 text-xs text-gray-400 uppercase tracking-wider font-semibold border-b border-gray-100">
                          Staff Access
                        </p>
                        {staffItems.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => { navigate(item.path); setShowStaffMenu(false); }}
                            className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3 ${
                              isActivePath(item.path)
                                ? 'bg-red-50 text-red-700 font-medium'
                                : 'text-gray-700 hover:bg-yellow-50'
                            }`}
                          >
                            <ShieldCheckIcon className="w-5 h-5 text-yellow-600" />
                            <span className="text-sm font-medium">{item.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ── Mobile Menu Toggle ── */}
            <button
              className="lg:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <XMarkIcon className="w-5 h-5" /> : <Bars3Icon className="w-5 h-5" />}
            </button>
          </div>

          {/* ── Mobile Menu (styling from first code) ── */}
          <div
            className={`lg:hidden transition-all duration-500 ease-in-out bg-gradient-to-b from-red-700 via-red-600 to-red-500 ${
              isMenuOpen ? 'block' : 'hidden'
            }`}
            style={{ maxHeight: '100vh', overflowY: 'auto' }}
          >
            <div className="px-6 py-6 space-y-3 pb-10">
              {mainNavItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setMobileDropdownOpen(d => d === item.dropdownType ? null : item.dropdownType)}
                        className={`w-full flex justify-between items-center py-3 text-base font-semibold transition-all duration-300 border-l-4 pl-5 ${
                          mobileDropdownOpen === item.dropdownType
                            ? 'text-yellow-400 border-yellow-400 bg-white/10 rounded-r-xl'
                            : 'text-white border-transparent hover:text-yellow-300 hover:border-yellow-300 hover:bg-white/5'
                        }`}
                      >
                        {item.name}
                        <ChevronDownIcon className={`w-4 h-4 transition-transform ${mobileDropdownOpen === item.dropdownType ? 'rotate-180' : ''}`} />
                      </button>

                      {mobileDropdownOpen === item.dropdownType && (
                        <div className="ml-4 mt-1 rounded-xl overflow-hidden">
                          <button
                            onClick={() => { navigate(item.path); setIsMenuOpen(false); setMobileDropdownOpen(null); }}
                            className="w-full text-left px-4 py-3 text-sm font-semibold text-yellow-300 border-b border-white/20 hover:bg-white/10 transition-colors"
                          >
                            {item.dropdownType === 'customer' ? 'Customer Login Page' : 'Vendor Login Page'}
                          </button>
                          {item.submenus.map((sub) => (
                            <button
                              key={sub.name}
                              onClick={() => { handleSubmenuClick(sub); setIsMenuOpen(false); }}
                              className="w-full text-left px-4 py-2.5 text-sm text-white/80 hover:bg-white/10 hover:text-yellow-300 transition-colors border-b border-white/10 last:border-0"
                            >
                              {sub.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : item.external ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-3 text-base font-semibold transition-all duration-300 border-l-4 pl-5 ${
                        isActiveMenu(item)
                          ? 'text-yellow-400 border-yellow-400 bg-white/10 rounded-r-xl'
                          : 'text-white border-transparent hover:text-yellow-300 hover:border-yellow-300 hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-3 text-base font-semibold transition-all duration-300 border-l-4 pl-5 ${
                        isActiveMenu(item)
                          ? 'text-yellow-400 border-yellow-400 bg-white/10 rounded-r-xl'
                          : 'text-white border-transparent hover:text-yellow-300 hover:border-yellow-300 hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile profile section if logged in - styled like first code */}
              {isLoggedIn && (
                <div className="pt-4 border-t border-white/20 space-y-3">
                  <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg relative ${
                      userType === 'vendor' ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' : 'bg-gradient-to-br from-yellow-400 to-yellow-500'
                    }`}>
                      {getInitials(userData?.name)}
                      {userType === 'vendor' && <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />}
                    </div>
                    <div>
                      <p className="font-bold text-white">{userData?.name || (userType === 'customer' ? 'Customer' : 'Vendor')}</p>
                      <p className="text-sm text-yellow-100">{userType === 'vendor' ? 'Vendor Account' : 'Customer Account'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => { handleViewProfile(); setIsMenuOpen(false); }}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-red-900 rounded-2xl font-bold hover:scale-105 transition-all shadow-lg"
                    >
                      <UserIcon className="w-5 h-5" />
                      My Profile
                    </button>
                    <button
                      onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                      className="px-4 py-3 rounded-2xl font-bold border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-red-900 transition-all"
                    >
                      Logout
                    </button>
                  </div>

                  {userType === 'customer' && (
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => navigate('/notifications')}
                        className="relative p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white flex flex-col items-center gap-1"
                      >
                        <BellIcon className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center animate-pulse">3</span>
                        <span className="text-xs">Alerts</span>
                      </button>
                      <button
                        onClick={() => navigate('/messages')}
                        className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white flex flex-col items-center gap-1"
                      >
                        <ChatBubbleLeftRightIcon className="w-5 h-5" />
                        <span className="text-xs">Messages</span>
                      </button>
                      <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white flex flex-col items-center gap-1">
                        <HeartIcon className="w-5 h-5" />
                        <span className="text-xs">Matches</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* Spacer - matching first code's approach */}
      <div className="h-20" />

      {/* Customer Registration Modal */}
      {showCustomerRegForm && (
        <CustomerRegistrationForm isOpen={showCustomerRegForm} onClose={() => setShowCustomerRegForm(false)} />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dropDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
        .font-pacifico { font-family: 'Pacifico', cursive; }
      `}</style>
    </>
  );
};

export default Header;