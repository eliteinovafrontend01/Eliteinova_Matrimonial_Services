import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export default function PreMatrimonialVerification({ openVendorForm }) {
  const [flippedCard, setFlippedCard] = useState(null);
  const [hovered, setHovered] = useState(false);
  const scrollRef = useRef(null);
  const animRef = useRef(null);
  const posRef = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const step = () => {
      if (!hovered) {
        posRef.current += 0.5;
        if (posRef.current >= el.scrollWidth / 2) posRef.current = 0;
        el.scrollLeft = posRef.current;
      }
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animRef.current);
  }, [hovered]);

  // Animation observers for scroll-triggered animations
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

  const verificationCategories = [
    {
      number: "01",
      title: "Identity & Character Verification",
      points: ["Name, age, photo authenticity", "Aadhaar / Passport / ID proof validation"],
      color: "from-red-500 to-rose-500",
      bg: "bg-red-50",
      border: "border-red-200",
    },
    {
      number: "02",
      title: "Family Background",
      points: ["Family reputation and status", "Parents' details and social standing"],
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    {
      number: "03",
      title: "Education Verification",
      points: ["Degree certificates", "College/university authenticity"],
      color: "from-red-600 to-amber-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
    {
      number: "04",
      title: "Employment & Income",
      points: ["Job role, company details", "Salary verification"],
      color: "from-amber-600 to-yellow-500",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    {
      number: "05",
      title: "Financial Status",
      points: ["Assets, liabilities, loans", "Business credibility (if self-employed)"],
      color: "from-rose-500 to-red-500",
      bg: "bg-rose-50",
      border: "border-rose-200",
    },
    {
      number: "06",
      title: "Marital Status",
      points: ["Confirm unmarried / divorced / widowed", "Check for hidden marriages"],
      color: "from-red-700 to-rose-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
    {
      number: "07",
      title: "Criminal Background",
      points: ["Police records (if any)", "Court cases", "Any Previous Marriage"],
      color: "from-amber-700 to-red-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    {
      number: "08",
      title: "Social Reputation",
      points: ["Behavior in society", "Habits (drinking, smoking, etc.)"],
      color: "from-orange-500 to-amber-500",
      bg: "bg-orange-50",
      border: "border-orange-200",
    },
    {
      number: "09",
      title: "Online Presence",
      points: ["Social media activity", "Consistency of profile information"],
      color: "from-red-500 to-amber-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
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
    {
      step: "01",
      title: "Request Consultation",
      desc: "Families share the details requiring verification through our secure platform.",
    },
    {
      step: "02",
      title: "Professional Review",
      desc: "Our team evaluates the information and plans the appropriate verification process.",
    },
    {
      step: "03",
      title: "Discreet Investigation",
      desc: "Verification is conducted carefully and confidentially with utmost professionalism.",
    },
    {
      step: "04",
      title: "Detailed Report",
      desc: "A comprehensive confidential report is shared with verified findings and insights.",
    },
  ];

  const whyChooseItems = [
    "Professional and discreet process",
    "Reliable verification methods",
    "Strict confidentiality and privacy",
    "Support for families and individuals",
    "Trusted matrimonial support services",
  ];

  const navLinks = [
    { label: "About Verification", id: "about-verification" },
    { label: "What is Checked", id: "what-checked" },
    { label: "Our Services", id: "our-services" },
    { label: "Verification Process", id: "verification-process" },
    { label: "Why Choose Us", id: "why-choose" },
    { label: "Register Now", id: "register-now" },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-amber-50">

      {/* Hero Section - No Banner, Styled Hero Instead */}
      <div className="relative bg-gradient-to-br from-red-800 via-red-700 to-amber-700 overflow-hidden">
        {/* Decorative background patterns with animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-300 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-300 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <div className="text-center">
            {/* Badge with animation */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-yellow-200 text-xs font-semibold mb-3 backdrop-blur-sm animate-bounce-in">
              <svg className="w-3 h-3 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Trust & Transparency ✦ EliteInova Exclusive
            </div>

            {/* Title with fade up animation */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight animate-fade-up">
              Pre-Matrimonial
              <span className="block text-yellow-300 animate-slide-up">Verification Services</span>
            </h1>

            <p className="text-sm md:text-base text-white/80 max-w-2xl mx-auto mb-4 animate-fade-up animation-delay-200">
              Trusted verification for confident marriages. We help families and individuals verify important details before proceeding with a matrimonial alliance.
            </p>

            {/* Stats Row with staggered animation */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-4">
              {[
                { value: "100%", label: "Confidential" },
                { value: "9+", label: "Verification Types" },
                { value: "24/7", label: "Support" },
              ].map((stat, i) => (
                <div key={i} className="text-center animate-scale-up" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="text-xl md:text-2xl font-bold text-yellow-300 animate-count-up">{stat.value}</div>
                  <div className="text-white/70 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons with hover animation */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => scrollToSection("register-now")}
                className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-amber-500 text-red-900 font-bold text-sm rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 animate-pulse-gentle"
              >
                Get Verified Now
              </button>
              <button
                onClick={() => scrollToSection("about-verification")}
                className="px-6 py-2 bg-white/10 border border-white/30 text-white font-semibold text-sm rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 backdrop-blur-sm animate-fade-up animation-delay-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40L1440 40L1440 0C1200 30 960 40 720 30C480 20 240 10 0 20L0 40Z" fill="#fef9f0" />
          </svg>
        </div>
      </div>

      {/* Sticky Quick Nav */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm overflow-hidden">
        <div className="container mx-auto px-4 py-2.5">
          <div
            ref={scrollRef}
            className="flex items-center space-x-2 overflow-hidden select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {[...Array(2)].flatMap(() => navLinks).map((link, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(link.id)}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-200 bg-red-50/50 text-red-600 text-xs sm:text-sm font-medium hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 whitespace-nowrap hover:scale-105"
              >
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full flex-shrink-0 animate-pulse"></span>
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="relative max-w-7xl mx-auto">

            {/* ─── PORTAL — all 3 in ONE ROW, original card size kept, only section mb reduced ─── */}
        {/* REDUCED: mb-16→mb-8 */}
        <section id="portal-access" className="mb-8 scroll-mt-20">
          {/* REDUCED: mb-10→mb-6 */}
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

          {/* ALL 3 in one row — original card internals unchanged */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Vendor Portal — original card size */}
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

            {/* Customer Portal — original card size */}
            <div className="group relative fade-up animation-delay-200">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-red-100">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-500 rounded-t-2xl animate-slide-right" />
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

            {/* Matrimony Portal — original card size */}
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

          {/* ─── ABOUT VERIFICATION ─── */}
          <section id="about-verification" className="mb-20 scroll-mt-20">
            <div className="text-center mb-10 fade-up">
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-amber-600 mb-3 animate-slide-up">✦ Trust & Transparency ✦</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-800 via-red-600 to-amber-700 bg-clip-text text-transparent mb-4 animate-fade-up">
                Pre-Matrimonial Verification Services
              </h2>
              <p className="text-lg md:text-xl text-amber-700 font-medium animate-fade-up animation-delay-100">Trusted Verification for Confident Marriages</p>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-500 animate-slide-right" />
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-500 animate-slide-left" />
              </div>
            </div>

            {/* Description Card */}
            <div className="relative max-w-4xl mx-auto mb-12 fade-up animation-delay-100">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-amber-500/10 rounded-3xl blur-2xl animate-pulse" />
              <div
                className="relative bg-white rounded-3xl p-8 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #fffdf9 100%)",
                  boxShadow: "0 4px 24px rgba(185,28,28,0.08), 0 1px 4px rgba(0,0,0,0.04)",
                  border: "1px solid rgba(185,28,28,0.1)",
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 rounded-t-3xl animate-slide-right" />
                <div className="space-y-5">
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed hover:translate-x-1 transition-transform duration-300">
                    At <span className="font-semibold text-red-800">EliteInova</span>, we understand that marriage is one of the most important decisions in life. Trust and transparency are essential when choosing a life partner.
                  </p>
                  <p className="text-gray-700 text-base md:text-lg leading-relaxed hover:translate-x-1 transition-transform duration-300">
                    Our Pre-Matrimonial Verification Services help families and individuals verify important details before proceeding with a matrimonial alliance. Through professional investigation and careful verification, we help ensure that the information provided is accurate and reliable.
                  </p>
                  <p className="text-gray-700 text-base md:text-lg font-medium hover:translate-x-1 transition-transform duration-300">
                    Our goal is to give you peace of mind and confidence while making such an important life decision.
                  </p>
                </div>
              </div>
            </div>

            {/* Why Verification is Important */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100 fade-left animation-delay-100 hover:shadow-xl transition-all duration-300">
                <h4 className="font-bold text-gray-800 mb-4 text-lg">Why Pre-Matrimonial Verification is Important</h4>
                <p className="text-gray-600 mb-4 text-sm">
                  In today's digital world, profiles can sometimes be incomplete or misleading. Verification helps confirm key details such as identity, career, and personal background.
                </p>
                <ul className="space-y-2">
                  {["Verify authenticity of matrimonial profiles", "Avoid misinformation or hidden details", "Build trust between families", "Make informed marriage decisions"].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm hover:translate-x-1 transition-transform duration-300">
                      <span className="text-red-500 font-bold mt-0.5 animate-pulse">✓</span>
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-gray-500 italic border-t border-red-100 pt-4">
                  EliteInova provides confidential and professional verification support to protect the interests of both individuals and families.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl p-6 border border-red-200 fade-right animation-delay-100 hover:shadow-xl transition-all duration-300">
                <h4 className="font-bold text-gray-800 mb-4 text-lg">Key Benefits</h4>
                <div className="space-y-3">
                  {["Build trust before marriage commitment", "Ensure transparency in matrimonial alliances", "Protect family interests and reputation", "Make confident, informed decisions"].map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 hover:translate-x-1 transition-transform duration-300">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold mt-0.5 flex-shrink-0 animate-scale-up">
                        {i + 1}
                      </div>
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ─── WHAT IS CHECKED ─── */}
          <section id="what-checked" className="mb-20 scroll-mt-20">
            <div className="text-center mb-10 fade-up">
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-amber-600 mb-3 animate-slide-up">✦ Comprehensive Checks ✦</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-800 via-red-600 to-amber-700 bg-clip-text text-transparent mb-4 animate-fade-up">
                What is Pre-Matrimonial Verification?
              </h2>
              <p className="text-gray-500 text-sm max-w-2xl mx-auto animate-fade-up animation-delay-100">
                A background check done before marriage to confirm that the prospective bride/groom is genuine, trustworthy, and matches the details they've provided.
              </p>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-500 animate-slide-right" />
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-500 animate-slide-left" />
              </div>
            </div>

            {/* 9 category cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {verificationCategories.map((item, index) => (
                <div
                  key={index}
                  className={`group relative ${item.bg} rounded-2xl p-5 border ${item.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 fade-up`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      {item.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-bold text-gray-800 text-sm mb-2 group-hover:text-red-700 transition-colors">{item.title}</h5>
                      <ul className="space-y-1">
                        {item.points.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-xs text-gray-600 group-hover:translate-x-1 transition-transform duration-300">
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

            {/* Why Important + Suggestions side by side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <div className="bg-gradient-to-br from-red-600 to-amber-600 rounded-2xl p-6 text-white shadow-xl fade-left animate-gradient-x">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 animate-pulse">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-base">Why It's Important</h4>
                </div>
                <ul className="space-y-2.5">
                  {["Avoid fake profiles and scams", "Ensure transparency before marriage", "Protect family reputation", "Build trust between both parties"].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-sm text-white/90 hover:translate-x-1 transition-transform duration-300">
                      <div className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center flex-shrink-0 animate-scale-up">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-red-100 shadow-lg fade-right">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-amber-500 flex items-center justify-center flex-shrink-0 animate-spin-slow">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 text-base">Suggestions</h4>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Option 1", title: "Self Verification", points: ["Check documents manually", "Talk to references (friends, colleagues)", "Verify social media"], tag: "bg-green-100 text-green-700" },
                    { label: "Option 2", title: "Professional Agencies", points: ["Private detective agencies", "Matrimonial verification services"], tag: "bg-amber-100 text-amber-700" },
                    { label: "Option 3", title: "Through Matrimony Apps", points: ["Some platforms offer verified badges", "AI-based profile verification"], tag: "bg-red-100 text-red-700" },
                  ].map((opt, idx) => (
                    <div key={idx} className="flex gap-3 hover:translate-x-1 transition-transform duration-300">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold whitespace-nowrap h-fit mt-0.5 ${opt.tag} animate-pulse`}>{opt.label}</span>
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

            {/* Eliteinova Premium Feature Tip */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 via-red-50 to-amber-50 shadow-lg fade-up">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-red-500 to-amber-400 animate-slide-right" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" />
              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg animate-rotate">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-full tracking-wide uppercase animate-bounce-gentle">Eliteinova Exclusive</span>
                      <h4 className="font-bold text-gray-800 text-base">Premium Verification Features</h4>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">Eliteinova offers exclusive premium verification tools to give families complete peace of mind:</p>
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { icon: "🔐", title: "Verified Profile Badge", desc: "Instantly identify trusted and verified profiles", bg: "bg-red-100 border-red-200", textColor: "text-red-800" },
                        { icon: "📄", title: "Document Verification System", desc: "Secure digital verification of all submitted documents", bg: "bg-amber-100 border-amber-200", textColor: "text-amber-800" },
                        { icon: "🕵️", title: "Background Check Service", desc: "Exclusive to Gold & Diamond members", bg: "bg-red-100 border-red-200", textColor: "text-red-800" },
                        { icon: "🤖", title: "AI Fraud Detection", desc: "Advanced AI-powered screening for suspicious profiles", bg: "bg-amber-100 border-amber-200", textColor: "text-amber-800" },
                      ].map((feature, idx) => (
                        <div key={idx} className={`rounded-xl p-3.5 border ${feature.bg} hover:scale-105 transition-all duration-300 fade-up`} style={{ animationDelay: `${idx * 0.1}s` }}>
                          <div className="text-xl leading-none animate-bounce-gentle">{feature.icon}</div>
                          <p className={`text-xs font-bold ${feature.textColor} mt-1`}>{feature.title}</p>
                          <p className="text-xs text-gray-500 leading-snug">{feature.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── OUR SERVICES ─── */}
          <section id="our-services" className="mb-20 scroll-mt-20">
            <div className="text-center mb-10 fade-up">
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-amber-600 mb-3 animate-slide-up">✦ What We Offer ✦</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-800 via-red-600 to-amber-700 bg-clip-text text-transparent mb-4 animate-fade-up">
                Our Pre-Matrimonial Verification Services
              </h2>
              <div className="flex items-center justify-center gap-3 mt-2">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-500 animate-slide-right" />
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-500 animate-slide-left" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {verificationServices.map((service, index) => (
                <div key={index} className="group relative fade-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">{service.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── VERIFICATION PROCESS ─── */}
          <section id="verification-process" className="mb-20 scroll-mt-20">
            <div className="text-center mb-10 fade-up">
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-amber-600 mb-3 animate-slide-up">✦ How It Works ✦</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-800 via-red-600 to-amber-700 bg-clip-text text-transparent mb-4 animate-fade-up">
                Our Verification Process
              </h2>
              <div className="flex items-center justify-center gap-3 mt-2">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-500 animate-slide-right" />
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-500 animate-slide-left" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {verificationProcess.map((step, index) => (
                <div key={index} className="relative fade-up" style={{ animationDelay: `${index * 0.15}s` }}>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center text-white font-bold text-lg mb-4 animate-pulse">
                      {step.step}
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">{step.title}</h4>
                    <p className="text-gray-500 text-sm">{step.desc}</p>
                  </div>
                  {index < verificationProcess.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 animate-bounce-gentle">
                      <svg className="w-6 h-6 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Privacy & Confidentiality */}
            <div className="bg-gradient-to-r from-red-600 to-amber-600 rounded-3xl p-8 md:p-10 text-white fade-up">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 animate-rotate">
                  <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 animate-fade-up">Privacy & Confidentiality</h3>
                <p className="text-white/90 mb-4 animate-fade-up animation-delay-100">
                  At EliteInova, privacy is taken very seriously. All verification processes are handled with strict confidentiality and professional ethics.
                </p>
                <p className="text-white/90 animate-fade-up animation-delay-200">
                  Information collected during the process is shared only with the authorized client and is never disclosed publicly.
                </p>
              </div>
            </div>
          </section>

          {/* ─── WHY CHOOSE US ─── */}
          <section id="why-choose" className="mb-20 scroll-mt-20">
            <div className="text-center mb-10 fade-up">
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-amber-600 mb-3 animate-slide-up">✦ Why Choose Us ✦</p>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-red-800 via-red-600 to-amber-700 bg-clip-text text-transparent mb-4 animate-fade-up">
                Why Choose EliteInova for Verification?
              </h2>
              <div className="flex items-center justify-center gap-3 mt-2">
                <div className="h-px w-20 bg-gradient-to-r from-transparent to-red-500 animate-slide-right" />
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="h-px w-20 bg-gradient-to-l from-transparent to-red-500 animate-slide-left" />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-xl border border-red-100 max-w-3xl mx-auto fade-up hover:shadow-2xl transition-all duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {whyChooseItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 group hover:translate-x-1 transition-all duration-300 fade-left" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-r from-red-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 animate-scale-up group-hover:scale-110 transition-transform duration-300">✓</div>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-600 mt-6 pt-6 border-t border-red-100 text-sm animate-fade-up animation-delay-200">
                Our services are designed to provide clarity and confidence before making a lifelong commitment.
              </p>
            </div>
          </section>

          {/* ─── REGISTER NOW / VENDOR FORM CTA ─── */}
          <section id="register-now" className="scroll-mt-20">
            <div
              className="relative rounded-3xl overflow-hidden fade-up"
              style={{ background: "linear-gradient(135deg, #7f1d1d 0%, #b91c1c 40%, #92400e 100%)" }}
            >
              {/* Decorative dots */}
              <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 1px)", backgroundSize: "24px 24px" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
              <div className="relative p-10 md:p-14 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-yellow-200 text-sm font-semibold mb-6 backdrop-blur-sm animate-bounce-gentle">
                  <span className="animate-ping w-2 h-2 bg-yellow-400 rounded-full"></span>
                  Register Your Verification Service
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-up">
                  Are You a Verification Professional?
                </h2>
                <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8 animate-fade-up animation-delay-100">
                  Join EliteInova as a background verification vendor and help families make confident matrimonial decisions. Register your service today.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => openVendorForm && openVendorForm("background-investigations")}
                    className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-red-900 font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg animate-scale-up"
                  >
                    Register as Vendor
                  </button>
                  <Link
                    to="/background-investigations"
                    className="px-8 py-4 bg-white/10 border border-white/30 text-white font-semibold rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-300 text-lg backdrop-blur-sm animate-scale-up animation-delay-200"
                  >
                    Browse Vendors
                  </Link>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        /* Animation Keyframes */
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideRight {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        
        @keyframes slideLeft {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes pulseGentle {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradientX {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        /* Animation Classes */
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-up.animated {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-left {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-left.animated {
          opacity: 1;
          transform: translateX(0);
        }
        
        .fade-right {
          opacity: 0;
          transform: translateX(30px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-right.animated {
          opacity: 1;
          transform: translateX(0);
        }
        
        .scale-in {
          opacity: 0;
          transform: scale(0.8);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .scale-in.animated {
          opacity: 1;
          transform: scale(1);
        }
        
        .animate-fade-up {
          animation: fadeUp 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        .animate-slide-right {
          animation: slideRight 0.5s ease-out forwards;
        }
        
        .animate-slide-left {
          animation: slideLeft 0.5s ease-out forwards;
        }
        
        .animate-scale-up {
          animation: scaleUp 0.5s ease-out forwards;
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        .animate-pulse-gentle {
          animation: pulseGentle 2s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-rotate {
          animation: rotate 4s linear infinite;
        }
        
        .animate-count-up {
          animation: countUp 0.8s ease-out forwards;
        }
        
        .animate-gradient-x {
          animation: gradientX 3s ease infinite;
          background-size: 200% 200%;
        }
        
        .animate-bounce-gentle {
          animation: pulseGentle 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: rotate 3s linear infinite;
        }
        
        /* Animation Delays */
        .animation-delay-100 { animation-delay: 0.1s; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-300 { animation-delay: 0.3s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
      `}</style>
    </div>
  );
}