import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VendorLoginForm from './VendorLoginForm';

// import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import banner4 from '../assets/banner4.png';
import banner5 from '../assets/banner5.png';
import photography from '../assets/photography.jpg';
import catering from '../assets/catering.jpg';
import weddinghalls from '../assets/weddinghalls.jpg';
import decoration from '../assets/decoration.jpg';
import invitation from '../assets/invitation.jpg';
import makeup from '../assets/makeup.jpg';
import entertainment from '../assets/entertainment.jpg';

const Home = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showVendorLogin, setShowVendorLogin] = useState(false);
  const [flippedCard, setFlippedCard] = useState(null);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hovered2, setHovered2] = useState(false);
  const navigate = useNavigate();

  // Auto-scroll refs for nav bars
  const scrollRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);

  const scrollRef2 = useRef(null);
  const animRef2 = useRef(null);
  const posRef2 = useRef(0);

  // Track whether a touch started on a button (to allow button taps through)
  const touchOnButton = useRef(false);

  // Animation observer for scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const fadeElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Auto-scroll for sticky nav bar
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const step = () => {
      if (!hovered) {
        posRef.current += 0.6;
        if (posRef.current >= el.scrollWidth / 2) posRef.current = 0;
        el.scrollLeft = posRef.current;
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [hovered]);

  // Auto-scroll for service categories bar
  useEffect(() => {
    const el = scrollRef2.current;
    if (!el) return;
    const step = () => {
      if (!hovered2) {
        posRef2.current += 0.5;
        if (posRef2.current >= el.scrollWidth / 2) posRef2.current = 0;
        el.scrollLeft = posRef2.current;
      }
      animRef2.current = requestAnimationFrame(step);
    };
    animRef2.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef2.current);
  }, [hovered2]);

  const banners = [
    { id: 1, image: banner2 },
    { id: 2, image: banner3 },
    { id: 3, image: banner4 },
    { id: 4, image: banner5 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const goToBanner = (index) => setCurrentBannerIndex(index);

  const categories = [
    { name: 'Photography', path: '/photography', image: photography, subcategories: ['Wedding Photography', 'Event Photography', 'Videography', 'Editing & Album Services', 'Fashion & Lifestyle', 'Commercial Photography', 'Religious & Cultural', 'Kids & Special Shoots'] },
    { name: 'Catering & Foods', path: '/catering', image: catering, subcategories: ['Traditional Catering', 'Vegetarian Catering', 'Non-Vegetarian Catering', 'Multi-cuisine Catering', 'Buffet Catering', 'Live Counter Catering', 'Theme-Based Catering', 'Snack & Beverage Catering'] },
    { name: 'Wedding Halls', path: '/wedding-halls', image: weddinghalls, subcategories: ['AC Wedding Halls', 'Non AC Wedding Halls', 'Luxury Wedding Halls', 'Mini Wedding Halls', 'Event Halls', 'Convention & Banquet Halls', 'Party & Reception Hall', 'Outdoor / Open-Air'] },
    { name: 'Decorations', path: '/decorations', image: decoration, subcategories: ['Wedding Decoration', 'Stage Decoration', 'Mandap Decoration', 'Reception Decoration', 'Event Decoration', 'Floral Decoration', 'Theme-Based Decoration', 'Lighting & Ambience'] },
    { name: 'Entertainment', path: '/entertainment', image: entertainment, subcategories: ['Wedding MCs', 'DJ & Remix', 'Dance Shows', 'Live Music', 'Photo Booths', 'LED Effects', 'Kids Entertainment'] },
    { name: 'Invitation & Gifts', path: '/invitation', image: invitation, subcategories: ['Digital Invites', 'Luxury Cards', 'Printed Cards', 'Custom Designs', 'Return Gifts', 'Eco Gifts', 'Gift Hampers', 'Luxury Hampers'] },
    { name: 'Bridal Styling', path: '/styling', image: makeup, subcategories: ['Bridal Makeup', 'Bridal Accessories', 'Hair Styling', 'Mehendi Art', 'Traditional Attire Styling', 'Groom Makeup', 'Groom Hair Styling', 'Groom Accessories'] },
    { name: 'Pre-Matrimonial Verification', path: '/background-investigations', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', subcategories: ['Identity & Character Verification', 'Marital Status Check', 'Criminal Record Check', 'Education Verification', 'Employment Verification', 'Financial Background', 'Family Background', 'Social Media Screening'] },
  ];

  const verificationServices = [
    {
      title: "Identity and Character Verification",
      desc: "Authenticate personal details including name, age, marital status, and government ID verification.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
        </svg>
      ),
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "Employment Verification",
      desc: "Confirm professional details including company, designation, salary range, and employment history.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: "from-red-500 to-rose-500",
    },
    {
      title: "Education Verification",
      desc: "Verify academic qualifications, degrees, and educational institutions mentioned in the profile.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
        </svg>
      ),
      color: "from-amber-500 to-yellow-500",
    },
    {
      title: "Family Background",
      desc: "Basic verification of family background, reputation, and social standing where required.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Social & Lifestyle",
      desc: "General insights into lifestyle, habits, and social reputation to ensure complete transparency.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "from-emerald-500 to-green-500",
    },
    {
      title: "Address Verification",
      desc: "Confirmation of residential address and location details for added security and peace of mind.",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: "from-blue-500 to-indigo-500",
    },
  ];

  const verificationProcess = [
    { step: "01", title: "Request Consultation", desc: "Families share the details requiring verification through our secure platform." },
    { step: "02", title: "Professional Review", desc: "Our team evaluates the information and plans the appropriate verification process." },
    { step: "03", title: "Discreet Investigation", desc: "Verification is conducted carefully and confidentially with utmost professionalism." },
    { step: "04", title: "Detailed Report", desc: "A comprehensive confidential report is shared with verified findings and insights." }
  ];

  // Handle card touch — only flip if touch did NOT start on a button
  const handleCardTouchStart = (e) => {
    touchOnButton.current = e.target.closest('button') !== null;
  };

  const handleCardTouchEnd = (e, index) => {
    if (touchOnButton.current) return;
    e.preventDefault();
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50">

      {/* ─── BANNER ─── */}
      <section className="relative w-full overflow-hidden bg-gray-100">
        <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[700px] w-full">
          {banners.map((banner, index) => (
            <div key={banner.id} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentBannerIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <img src={banner.image} alt={`Banner ${banner.id}`} className="w-full h-full object-contain md:object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"; }} />
              </div>
            </div>
          ))}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {banners.map((_, index) => (
              <button key={index} onClick={() => goToBanner(index)}
                className={`rounded-full transition-all duration-300 ${index === currentBannerIndex ? 'bg-yellow-500 w-6 h-2 sm:w-8 sm:h-2.5' : 'bg-white/90 w-3 h-3 sm:w-4 sm:h-4'}`} />
            ))}
          </div>
          <button onClick={() => goToBanner(currentBannerIndex === 0 ? banners.length - 1 : currentBannerIndex - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 sm:p-3 rounded-full z-20">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button onClick={() => goToBanner(currentBannerIndex === banners.length - 1 ? 0 : currentBannerIndex + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 sm:p-3 rounded-full z-20">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </section>

      {/* ─── SERVICE CATEGORIES AUTO-SCROLL BAR ─── */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-2.5">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="flex-shrink-0">
              <button className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-red-200 bg-red-50 text-red-600 text-[10px] sm:text-sm font-semibold whitespace-nowrap">
                <span>🔀</span>
                <span className="hidden xs:inline sm:inline">Service Categories</span>
                <span className="sm:hidden">Services</span>
              </button>
            </div>
            <div className="flex-shrink-0 w-3 sm:w-6 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
            <div
              ref={scrollRef2}
              className="flex items-center gap-1 sm:gap-2 overflow-hidden select-none flex-1"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              onMouseEnter={() => setHovered2(true)}
              onMouseLeave={() => setHovered2(false)}
              onTouchStart={() => setHovered2(true)}
              onTouchEnd={() => setTimeout(() => setHovered2(false), 1000)}
            >
              {[...Array(2)].flatMap(() => [
                "Wedding Photography", "Catering", "Wedding Halls", "Decorations",
                "Bridal Styling", "Entertainment", "Invitation Cards", "Pre-Matrimonial Investigations",
              ]).map((label, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const el = document.getElementById(label.toLowerCase().replace(/\s+/g, '-'));
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="inline-flex items-center px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-gray-200 bg-white text-gray-700 text-[10px] sm:text-sm font-medium whitespace-nowrap hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200 cursor-pointer flex-shrink-0"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex-shrink-0 w-3 sm:w-6 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
            <div className="flex-shrink-0">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-red-200 bg-red-50 text-red-600 text-[10px] sm:text-sm font-semibold whitespace-nowrap hover:bg-red-100 transition-all"
              >
                8 Services
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── STICKY QUICK NAV BAR ─── */}
      <div className="sticky top-[64px] z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm overflow-hidden">
        <div className="container mx-auto px-4 py-3">
          <div
            ref={scrollRef}
            className="flex items-center space-x-2 overflow-hidden select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={() => setHovered(true)}
            onTouchEnd={() => setTimeout(() => setHovered(false), 1000)}
          >
            {[...Array(2)].flatMap(() => [
              { label: "Celebrate Your Wedding", id: "celebrate-wedding" },
              { label: "Service Categories", id: "our-categories" },
              { label: "Pre-Matrimonial Investigations", id: "background-verification" },
              { label: "Portal Access", id: "portal-access" },
              { label: "Why Choose Us", id: "why-choose" },
            ]).map((link, i) => (
              <button
                key={i}
                onClick={() => {
                  const el = document.getElementById(link.id);
                  if (el) {
                    const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - 100;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                  }
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-200 bg-red-50/50 text-red-600 text-xs sm:text-sm font-medium hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full"></span>
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 md:px-6 py-4 md:py-6 mt-2 md:mt-4">

        {/* ─── FLOATING PRE-MATRIMONIAL INVESTIGATIONS BUTTON ─── */}
        <div className="flex justify-end mb-4 sm:mb-6">
          <button
            onClick={() => {
              const el = document.getElementById('background-verification');
              if (el) {
                const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - 100;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              }
            }}
            className="group relative inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-2.5 sm:py-3.5 bg-gradient-to-r from-red-700 to-amber-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden border border-red-300"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10 flex items-center gap-2 sm:gap-3">
              <div className="relative">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></span>
              </div>
              <span className="font-bold text-sm sm:text-base whitespace-nowrap">
                Pre-Matrimonial Investigations for Bride and Groom
              </span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </button>
        </div>

        {/* ─── PORTAL ─── */}
        <section id="portal-access" className="mb-8 scroll-mt-20">
          <div className="text-center mb-6 fade-up">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-amber-600 mb-3 animate-slide-up">✦ Access Your Account ✦</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-800 via-red-600 to-amber-700 bg-clip-text text-transparent mb-4 animate-fade-up">
              Portal Login & Registration
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-red-500 animate-slide-right" />
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-red-500 animate-slide-left" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">

            {/* Vendor Portal */}
            <div className="group relative fade-up animation-delay-100">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-amber-100">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-t-2xl animate-slide-right" />
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <svg className="w-7 h-7 text-white animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-amber-600 transition-colors">Vendor Portal</h3>
                    <p className="text-gray-500 text-sm">Partner services & business access</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setShowVendorLogin(true)}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Login
                  </button>
                  <button onClick={() => navigate('/vendor-login')}
                    className="flex-1 px-4 py-2.5 bg-amber-50 text-amber-700 text-sm font-semibold rounded-xl border border-amber-200 hover:bg-amber-100 hover:scale-105 transition-all duration-300">
                    Register
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Portal */}
            <div className="group relative fade-up animation-delay-200">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-red-100">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-t-2xl animate-slide-right" />
                <div className="absolute -top-3 right-6 px-3 py-1 bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold rounded-full shadow-lg animate-pulse-gentle">Popular</div>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <svg className="w-7 h-7 text-white animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-600 transition-colors">Customer Portal</h3>
                    <p className="text-gray-500 text-sm">Access your profile & matches</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => navigate('/customer-login')}
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Login
                  </button>
                  <button onClick={() => navigate('/register-choice')}
                    className="flex-1 px-4 py-2.5 bg-red-50 text-red-700 text-sm font-semibold rounded-xl border border-red-200 hover:bg-red-100 hover:scale-105 transition-all duration-300">
                    Register
                  </button>
                </div>
              </div>
            </div>

            {/* Matrimony Portal */}
            <div className="group relative fade-up animation-delay-300">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-pink-100">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-rose-600 rounded-t-2xl animate-slide-right" />
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <svg className="w-7 h-7 text-white animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-pink-600 transition-colors">Matrimony Portal</h3>
                    <p className="text-gray-500 text-sm">Find your perfect life partner</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a href="https://eliteinovamatrimony.com/" target="_blank" rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 text-center">
                    Login
                  </a>
                  <a href="https://eliteinovamatrimony.com/" target="_blank" rel="noopener noreferrer"
                    className="flex-1 px-4 py-2.5 bg-pink-50 text-pink-700 text-sm font-semibold rounded-xl border border-pink-200 hover:bg-pink-100 hover:scale-105 transition-all duration-300 text-center">
                    Register
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ELITEINOVA WEDDING SERVICES HEADING ─── */}
        <div className="text-center mb-4 md:mb-5 fade-up">
          <p className="text-xs md:text-sm font-semibold tracking-[0.3em] uppercase text-amber-600 mb-2 md:mb-3 animate-slide-up">✦ Complete Wedding Solutions ✦</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4 animate-fade-up"
            style={{ background: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 40%, #92400e 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
            EliteInova Wedding Services
          </h2>
          <p className="text-base md:text-lg text-amber-700 font-medium mb-3 animate-fade-up animation-delay-100">Complete Wedding Solutions for Your Special Day</p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 md:w-20 animate-slide-right" style={{ background: "linear-gradient(to right, transparent, #b91c1c)" }} />
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-red-700 animate-bounce-gentle"><path d="M12 2C9 6 4 8 4 12s3.5 6 8 9c4.5-3 8-5 8-9s-5-6-8-10z" fill="currentColor" opacity="0.7" /></svg>
              <div className="w-1 h-1 rounded-full bg-amber-500 animate-pulse" />
            </div>
            <div className="h-px w-12 md:w-20 animate-slide-left" style={{ background: "linear-gradient(to left, transparent, #b91c1c)" }} />
          </div>
        </div>

        {/* ─── ELITEINOVA WEDDING SERVICES CARD ─── */}
        <div className="relative max-w-4xl mx-auto mb-6 md:mb-8 fade-up animation-delay-100">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-amber-500/10 rounded-3xl blur-2xl animate-pulse" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500"
            style={{ background: "linear-gradient(135deg, #ffffff 0%, #fffdf9 100%)", boxShadow: "0 4px 24px rgba(185,28,28,0.08)", border: "1px solid rgba(185,28,28,0.1)" }}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 rounded-t-3xl animate-slide-right" />
            <div className="text-center space-y-3 md:space-y-4">
              <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed hover:translate-x-1 transition-transform duration-300">
                At <span className="font-semibold" style={{ color: "#9b1c1c" }}>EliteInova</span>, we go beyond matchmaking. We help you create a beautiful and memorable wedding experience with our complete range of professional wedding services.
              </p>
              <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed hover:translate-x-1 transition-transform duration-300">
                From photography to catering, bridal styling to mandap decoration, we connect you with trusted professionals who make every moment of your celebration unforgettable.
              </p>
              <p className="text-gray-700 text-sm md:text-base lg:text-lg font-medium hover:translate-x-1 transition-transform duration-300">Our goal is simple — to make your wedding planning smooth, elegant, and stress-free.</p>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 pt-2">
                {['✓ Trusted Vendors', '✓ Quality Assured', '✓ Stress-Free Planning'].map((tag, i) => (
                  <span key={i} className="px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-red-50 to-amber-50 rounded-full text-xs md:text-sm font-medium text-red-700 border border-red-200 hover:scale-105 transition-all duration-300 animate-scale-up" style={{ animationDelay: `${i * 0.1}s` }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── CELEBRATE YOUR WEDDING ─── */}
        <section id="celebrate-wedding" className="mb-8 scroll-mt-20">
          <div className="text-center mb-5 fade-up">
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-amber-600 mb-3 animate-slide-up">✦ Your Special Day ✦</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-800 via-red-600 to-amber-700 bg-clip-text text-transparent mb-4 animate-fade-up">
              Celebrate Your Wedding with EliteInova
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-red-500 animate-slide-right" />
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-red-500 animate-slide-left" />
            </div>
          </div>
          <div className="relative max-w-4xl mx-auto fade-up animation-delay-100">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 via-red-100/50 to-amber-100/50 rounded-3xl blur-3xl -z-10 animate-pulse" />
            <div className="relative bg-white rounded-3xl p-8 md:p-10 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500"
              style={{ border: "1px solid rgba(185,28,28,0.1)", boxShadow: "0 4px 24px rgba(185,28,28,0.08)" }}>
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-red-500 to-amber-500 rounded-t-3xl animate-slide-right" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
              <div className="text-center space-y-4">
                <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed hover:translate-x-1 transition-transform duration-300">
                  Your wedding is one of the most important celebrations of your life. With{' '}
                  <span className="font-bold" style={{ background: "linear-gradient(to right, #b91c1c, #d97706)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    EliteInova Wedding Services
                  </span>
                  , you receive professional support, creative ideas, and trusted vendors to make your wedding truly unforgettable.
                </p>
                <p className="text-gray-700 text-sm md:text-base lg:text-lg leading-relaxed hover:translate-x-1 transition-transform duration-300">
                  From the first consultation to the final celebration, our team ensures every detail is handled with care, creativity, and elegance.
                </p>
                <p className="text-gray-700 text-sm md:text-base lg:text-lg font-semibold hover:translate-x-1 transition-transform duration-300">
                  Let us help you create a wedding day that you and your family will cherish forever.
                </p>
                <div className="flex flex-wrap justify-center gap-2 md:gap-3 pt-1">
                  {['✓ Professional Support', '✓ Trusted Vendors', '✓ Unforgettable Memories'].map((tag, i) => (
                    <span key={i} className="px-4 py-1.5 bg-white rounded-full text-xs md:text-sm font-medium text-red-700 border border-red-200 hover:scale-105 transition-all duration-300 animate-scale-up" style={{ animationDelay: `${i * 0.1}s` }}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {showVendorLogin && <VendorLoginForm onClose={() => setShowVendorLogin(false)} showRegisterOptions={true} />}
      </main>

      {/* ─── OUR CATEGORIES — FLIP CARDS ─── */}
      <section id="our-categories" className="container mx-auto px-3 md:px-4 py-5 md:py-8">
        <div className="text-center mb-5 md:mb-7 fade-up">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-amber-600 mb-3 animate-slide-up">✦ Our Collections ✦</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-800 via-red-600 to-amber-700 bg-clip-text text-transparent mb-4 animate-fade-up">
            Service Categories
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-red-500 animate-slide-right" />
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-red-500 animate-slide-left" />
          </div>
          <p className="text-xs text-gray-400 mt-2 md:hidden animate-fade-up animation-delay-200">Tap card to flip • Tap button to view</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative cursor-pointer fade-up"
              style={{ perspective: '1000px', height: '280px', animationDelay: `${index * 0.05}s` }}
              onMouseEnter={() => setFlippedCard(index)}
              onMouseLeave={() => setFlippedCard(null)}
              onTouchStart={handleCardTouchStart}
              onTouchEnd={(e) => handleCardTouchEnd(e, index)}
            >
              <div style={{
                position: 'relative', width: '100%', height: '100%',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1)',
                transform: flippedCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}>
                {/* FRONT */}
                <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col overflow-hidden border border-gray-100">
                    <div className="flex-1 overflow-hidden">
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"; }} />
                    </div>
                    <div className="p-3 bg-white">
                      <h3 className="text-center font-semibold text-gray-800 text-xs md:text-sm leading-tight mb-2 line-clamp-2">{category.name}</h3>
                      <button
                        onTouchEnd={(e) => { e.stopPropagation(); window.scrollTo(0, 0); navigate(category.path); }}
                        onClick={(e) => { e.stopPropagation(); window.scrollTo(0, 0); navigate(category.path); }}
                        className="w-full py-1.5 bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-bold rounded-lg hover:from-red-700 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-1 hover:scale-105"
                      >
                        View Services
                        <svg className="w-3 h-3 animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
                {/* BACK */}
                <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', position: 'absolute', inset: 0, transform: 'rotateY(180deg)' }}>
                  <div className="relative bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl h-full border-2 border-red-200 flex flex-col shadow-xl overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-amber-400 to-red-500 animate-slide-right" />
                    <div className="flex-1 p-3 pt-4 flex flex-col overflow-hidden">
                      <div className="flex items-center gap-2 mb-2 pb-2 border-b border-red-200">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center flex-shrink-0 animate-pulse">
                          <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                          </svg>
                        </div>
                        <h4 className="font-bold text-red-800 text-xs leading-tight line-clamp-2">{category.name}</h4>
                      </div>
                      <ul className="space-y-1 overflow-y-auto flex-1 custom-scrollbar pr-0.5">
                        {category.subcategories.map((sub, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs group/item hover:translate-x-1 transition-transform duration-300">
                            <span className="text-amber-500 flex-shrink-0 mt-0.5 animate-pulse">✦</span>
                            <span className="text-gray-700 leading-tight">{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 pt-0">
                      <button
                        onTouchEnd={(e) => { e.stopPropagation(); window.scrollTo(0, 0); navigate(category.path); }}
                        onClick={(e) => { e.stopPropagation(); window.scrollTo(0, 0); navigate(category.path); }}
                        className="w-full py-1.5 bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-bold rounded-lg hover:from-red-700 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-1.5 hover:scale-105"
                      >
                        View All Services
                        <svg className="w-3 h-3 animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── PRE-MATRIMONIAL INVESTIGATIONS SECTION ─── */}
      <section id="background-verification" className="container mx-auto px-4 md:px-6 py-8 md:py-12 scroll-mt-20">

        {/* Section Header */}
        <div className="text-center mb-8 fade-up">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-amber-600 mb-3 animate-slide-up">✦ Trust & Transparency ✦</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-800 via-red-600 to-amber-700 bg-clip-text text-transparent mb-2 animate-fade-up">
            Pre-Matrimonial Investigations Services
          </h2>
          <p className="text-lg md:text-xl text-amber-700 font-medium mb-4 animate-fade-up animation-delay-100">
            Trusted Verification for Confident Marriages
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-red-500 animate-slide-right" />
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <div className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-red-500 animate-slide-left" />
          </div>
        </div>

        {/* Main Description Card */}
        <div className="relative max-w-4xl mx-auto mb-10 fade-up animation-delay-100">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-amber-500/10 rounded-3xl blur-2xl animate-pulse" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500"
            style={{ background: "linear-gradient(135deg, #ffffff 0%, #fffdf9 100%)", boxShadow: "0 4px 24px rgba(185,28,28,0.08)", border: "1px solid rgba(185,28,28,0.1)" }}>
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 rounded-t-3xl animate-slide-right" />
            <div className="space-y-4">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed hover:translate-x-1 transition-transform duration-300">
                At <span className="font-semibold" style={{ color: "#9b1c1c" }}>EliteInova</span>, we understand that marriage is one of the most important decisions in life. Trust and transparency are essential when choosing a life partner.
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed hover:translate-x-1 transition-transform duration-300">
                Our Pre-Matrimonial Investigations Services help families and individuals verify important details before proceeding with a matrimonial alliance. Through professional investigation and careful verification, we help ensure that the information provided is accurate and reliable.
              </p>
              <p className="text-gray-700 text-base md:text-lg font-semibold hover:translate-x-1 transition-transform duration-300">
                Our goal is to give you peace of mind and confidence while making such an important life decision.
              </p>
            </div>
          </div>
        </div>

        {/* Why Verification is Important */}
        <div className="mb-10 fade-up animation-delay-200">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6 animate-fade-up">
            Why Pre-Matrimonial Investigations is Important
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              <p className="text-gray-600 mb-4">
                In today's digital world, profiles and information can sometimes be incomplete or misleading. Pre-Matrimonial Investigations helps confirm key details such as identity, career, and personal background.
              </p>
              <p className="text-gray-600 font-medium mb-3">This process helps families:</p>
              <ul className="space-y-2">
                {["Verify authenticity of matrimonial profiles", "Avoid misinformation or hidden details", "Build trust between families", "Make informed marriage decisions"].map((item, index) => (
                  <li key={index} className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300">
                    <span className="text-red-500 font-bold">✓</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-500 italic">
                EliteInova provides confidential and professional verification support to protect the interests of both individuals and families.
              </p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl p-6 border border-red-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
              <h4 className="font-bold text-gray-800 mb-4">Key Benefits</h4>
              <div className="space-y-3">
                {["Build trust before marriage commitment", "Ensure transparency in matrimonial alliances", "Protect family interests and reputation", "Make confident, informed decisions"].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold mt-0.5 flex-shrink-0 animate-pulse-gentle" style={{ animationDelay: `${index * 0.2}s` }}>
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* What is Pre-Matrimonial Investigations */}
        <div className="mb-10 fade-up animation-delay-100">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 animate-fade-up">What is Pre-Matrimonial Investigations?</h3>
            <p className="text-gray-500 text-sm max-w-2xl mx-auto">
              Pre-Matrimonial Investigations is a background check done before marriage to confirm that the prospective bride/groom is genuine, trustworthy, and matches the details they've provided. It's becoming very common, especially in online matrimony platforms, to avoid fraud, hidden facts, or future disputes.
            </p>
          </div>

          {/* What is Checked Grid */}
          <div className="mb-8">
            <h4 className="text-lg font-bold text-center text-gray-800 mb-5 flex items-center justify-center gap-2 animate-fade-up">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              What is Checked in Pre-Matrimonial Investigations?
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                { number: "01", title: "Identity and Character Verification", points: ["Name, age, photo authenticity", "Aadhaar / Passport / ID proof validation"], color: "from-red-500 to-rose-500", bg: "bg-red-50", border: "border-red-200" },
                { number: "02", title: "Family Background", points: ["Family reputation and status", "Parents' details and social standing"], color: "from-amber-500 to-orange-500", bg: "bg-amber-50", border: "border-amber-200" },
                { number: "03", title: "Education Verification", points: ["Degree certificates", "College/university authenticity"], color: "from-red-600 to-amber-600", bg: "bg-red-50", border: "border-red-200" },
                { number: "04", title: "Employment & Income", points: ["Job role, company details", "Salary verification"], color: "from-amber-600 to-yellow-500", bg: "bg-amber-50", border: "border-amber-200" },
                { number: "05", title: "Financial Status", points: ["Assets, liabilities, loans", "Business credibility (if self-employed)"], color: "from-rose-500 to-red-500", bg: "bg-rose-50", border: "border-rose-200" },
                { number: "06", title: "Marital Status", points: ["Confirm unmarried / divorced / widowed", "Check for hidden marriages"], color: "from-red-700 to-rose-600", bg: "bg-red-50", border: "border-red-200" },
                { number: "07", title: "Criminal Background", points: ["Police records (if any)", "Court cases", "Any Previous Marriage"], color: "from-amber-700 to-red-600", bg: "bg-amber-50", border: "border-amber-200" },
                { number: "08", title: "Social Reputation", points: ["Behavior in society", "Habits (drinking, smoking, etc.)"], color: "from-orange-500 to-amber-500", bg: "bg-orange-50", border: "border-orange-200" },
                { number: "09", title: "Online Presence", points: ["Social media activity", "Consistency of profile information"], color: "from-red-500 to-amber-600", bg: "bg-red-50", border: "border-red-200" },
              ].map((item, index) => (
                <div key={index} className={`group relative ${item.bg} rounded-2xl p-5 border ${item.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 fade-up`} style={{ animationDelay: `${index * 0.06}s` }}>
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      {item.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-gray-800 text-sm mb-2 group-hover:text-red-700 transition-colors">{item.title}</h5>
                      <ul className="space-y-1">
                        {item.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs text-gray-600">
                            <span className="text-amber-500 flex-shrink-0 mt-0.5">▸</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Why Important + Suggestions side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 max-w-5xl mx-auto">
            {/* Why It's Important */}
            <div className="bg-gradient-to-br from-red-600 to-amber-600 rounded-2xl p-6 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 fade-up">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="font-bold text-base">Why It's Important</h4>
              </div>
              <ul className="space-y-2.5">
                {["Avoid fake profiles and scams", "Ensure transparency before marriage", "Protect family reputation", "Build trust between both parties"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-sm text-white/90 hover:translate-x-1 transition-transform duration-300">
                    <div className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Suggestions */}
            <div className="bg-white rounded-2xl p-6 border border-red-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 fade-up animation-delay-100">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-800 text-base">Suggestions</h4>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Option 1", title: "Self Verification", points: ["Check documents manually", "Talk to references (friends, colleagues)", "Verify social media"], tag: "bg-green-100 text-green-700" },
                  { label: "Option 2", title: "Professional Agencies", points: ["Private detective agencies", "Matrimonial verification services"], tag: "bg-amber-100 text-amber-700" },
                  { label: "Option 3", title: "Through Matrimony Apps", points: ["Some platforms offer verified badges", "AI-based profile verification"], tag: "bg-red-100 text-red-700" },
                ].map((opt, idx) => (
                  <div key={idx} className="flex gap-3 hover:translate-x-1 transition-transform duration-300">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold whitespace-nowrap h-fit mt-0.5 ${opt.tag}`}>{opt.label}</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mb-1">{opt.title}</p>
                      <ul className="space-y-0.5">
                        {opt.points.map((p, i) => (
                          <li key={i} className="text-xs text-gray-500 flex items-start gap-1">
                            <span className="text-amber-400 flex-shrink-0">•</span>{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* EliteInova Premium Feature Tip */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 via-red-50 to-amber-50 shadow-lg max-w-5xl mx-auto fade-up animation-delay-200 hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 animate-slide-right" />
            <div className="p-6">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 animate-bounce-gentle">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-full tracking-wide uppercase animate-pulse-gentle">EliteInova Exclusive</span>
                    <h4 className="font-bold text-gray-800 text-base">Premium Verification Features</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">EliteInova offers exclusive premium verification tools to give families complete peace of mind:</p>
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      { icon: "🔐", title: "Verified Profile Badge", desc: "Instantly identify trusted and verified profiles", bg: "bg-red-100 border-red-200", textColor: "text-red-800" },
                      { icon: "📄", title: "Document Verification System", desc: "Secure digital verification of all submitted documents", bg: "bg-amber-100 border-amber-200", textColor: "text-amber-800" },
                      { icon: "🕵️", title: "Background Check Service", desc: "Exclusive to Gold & Diamond members", bg: "bg-red-100 border-red-200", textColor: "text-red-800" },
                      { icon: "🤖", title: "AI Fraud Detection", desc: "Advanced AI-powered screening for suspicious profiles", bg: "bg-amber-100 border-amber-200", textColor: "text-amber-800" },
                    ].map((feature, idx) => (
                      <div key={idx} className={`rounded-xl p-3.5 border ${feature.bg} flex flex-col gap-1.5 hover:scale-105 transition-all duration-300 animate-scale-up`} style={{ animationDelay: `${idx * 0.1}s` }}>
                        <div className="text-xl leading-none">{feature.icon}</div>
                        <p className={`text-xs font-bold ${feature.textColor}`}>{feature.title}</p>
                        <p className="text-xs text-gray-500 leading-snug">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our Pre-Matrimonial Services Grid */}
        <div className="mb-10 fade-up">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6 animate-fade-up">
            Our Pre-Matrimonial Investigations Services
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {verificationServices.map((service, index) => (
              <div key={index} className="group relative fade-up" style={{ animationDelay: `${index * 0.08}s` }}>
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full border border-gray-100">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">{service.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verification Process */}
        <div className="mb-10 fade-up animation-delay-100">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6 animate-fade-up">Our Verification Process</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {verificationProcess.map((step, index) => (
              <div key={index} className="relative fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100 h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg mb-4 animate-pulse-gentle">
                    {step.step}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{step.title}</h4>
                  <p className="text-gray-500 text-sm">{step.desc}</p>
                </div>
                {index < verificationProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Privacy & Confidentiality */}
        <div className="bg-gradient-to-r from-red-600 to-amber-600 rounded-3xl p-8 md:p-10 text-white mb-10 max-w-5xl mx-auto fade-up animation-delay-200 hover:shadow-2xl transition-all duration-500">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 animate-fade-up">Privacy & Confidentiality</h3>
            <p className="text-white/90 mb-4 hover:translate-x-1 transition-transform duration-300">
              At EliteInova, privacy is taken very seriously. All verification processes are handled with strict confidentiality and professional ethics.
            </p>
            <p className="text-white/90 hover:translate-x-1 transition-transform duration-300">
              Information collected during the process is shared only with the authorized client and is never disclosed publicly.
            </p>
          </div>
        </div>

        {/* Why Choose EliteInova for Verification */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-red-100 max-w-5xl mx-auto fade-up animation-delay-100 hover:shadow-2xl transition-all duration-500">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-6 animate-fade-up">
            Why Choose EliteInova for Verification?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {["Professional and discreet process", "Reliable verification methods", "Strict confidentiality and privacy", "Support for families and individuals", "Trusted matrimonial support services"].map((item, index) => (
              <div key={index} className="flex items-center gap-2 hover:translate-x-1 transition-transform duration-300 animate-scale-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">✓</div>
                <span className="text-gray-700 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 mt-6 pt-6 border-t border-red-100">
            Our services are designed to provide clarity and confidence before making a lifelong commitment.
          </p>
        </div>
      </section>

      {/* ─── WHY CHOOSE ELITEINOVA ─── */}
      <section id="why-choose" className="py-8 md:py-12 mt-2" style={{ background: "linear-gradient(135deg, #fffbf0 0%, #fff8ee 50%, #fffdf5 100%)" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-7 md:mb-10 fade-up">
            <span className="text-yellow-500 text-sm font-semibold tracking-widest uppercase animate-slide-up">✦ Why Choose Us ✦</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-red-700 mt-3 mb-4 animate-fade-up" style={{ fontFamily: "'Georgia', serif" }}>Why Choose EliteInova?</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 md:w-24 bg-red-200 rounded-full animate-slide-right" />
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <div className="h-px w-16 md:w-24 bg-red-200 rounded-full animate-slide-left" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {[
              { gradient: "linear-gradient(135deg, #f97316 0%, #dc2626 100%)", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />, title: "Verified Profiles", desc: "All profiles are thoroughly verified for authenticity and reliability" },
              { gradient: "linear-gradient(135deg, #dc2626 0%, #f97316 100%)", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />, title: "Privacy Protected", desc: "Your personal data is secure with advanced encryption technology" },
              { gradient: "linear-gradient(135deg, #f59e0b 0%, #f97316 100%)", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />, title: "Expert Matchmaking", desc: "Professional assistance using advanced algorithms for perfect matches" },
              { gradient: "linear-gradient(135deg, #ec4899 0%, #dc2626 100%)", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />, title: "24/7 Support", desc: "Round-the-clock customer support for all your queries and concerns" },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 md:p-8 flex flex-col items-center text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 group fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300" style={{ background: item.gradient }}>
                  <svg className="w-7 h-7 text-white animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24">{item.icon}</svg>
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMING SOON MODAL ─── */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-up">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-scale-up">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-gentle"><span className="text-3xl">💒</span></div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h1>
              <h3 className="text-lg font-bold text-gray-900 mb-2">EliteInova Wedding Services</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Our dedicated wedding service page is coming soon!</p>
            </div>
            <div className="space-y-2 mb-6">
              {['Wedding planning and coordination', 'Vendor management and bookings', 'Photography and videography services', 'Catering and venue arrangements', 'Complete wedding event management'].map((item, i) => (
                <div key={i} className="flex items-start gap-2 hover:translate-x-1 transition-transform duration-300"><span className="text-green-500 text-sm mt-0.5 animate-pulse">✓</span><span className="text-gray-700 text-sm">{item}</span></div>
              ))}
            </div>
            <button onClick={() => setShowComingSoon(false)}
              className="w-full px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-colors font-medium hover:scale-105 transition-all duration-300">
              Got it
            </button>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e0; border-radius: 4px; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes slideLeft {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulseGentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .fade-up { opacity: 0; transform: translateY(30px); }
        .fade-up.animated { animation: fadeUp 0.6s ease-out forwards; }

        .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
        .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
        .animate-slide-right { animation: slideRight 0.5s ease-out forwards; }
        .animate-slide-left { animation: slideLeft 0.5s ease-out forwards; }
        .animate-scale-up { animation: scaleUp 0.5s ease-out forwards; }
        .animate-pulse-gentle { animation: pulseGentle 2s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s infinite; }
        .animate-bounce-gentle { animation: pulseGentle 2s ease-in-out infinite; }

        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
};

export default Home;