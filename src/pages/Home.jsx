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
  const navigate = useNavigate();

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

  const banners = [
    { id: 1, image: banner2 },
    { id: 2, image: banner3 },
    { id: 3, image: banner4 },
    { id: 4, image: banner5 },
    // { id: 5, image: banner5 },
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

  // Handle card touch — only flip if touch did NOT start on a button
  const handleCardTouchStart = (e) => {
    touchOnButton.current = e.target.closest('button') !== null;
  };

  const handleCardTouchEnd = (e, index) => {
    // If touch started on a button, let the button handle it — don't flip
    if (touchOnButton.current) return;
    e.preventDefault();
    setFlippedCard(flippedCard === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50">

      {/* ─── BANNER ─── - NO ANIMATIONS ADDED */}
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

      <main className="container mx-auto px-4 md:px-6 py-4 md:py-6 mt-2 md:mt-4">

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
          {/* Mobile hint */}
          <p className="text-xs text-gray-400 mt-2 md:hidden animate-fade-up animation-delay-200">Tap card to flip • Tap button to view</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative cursor-pointer fade-up"
              style={{ perspective: '1000px', height: '280px', animationDelay: `${index * 0.05}s` }}
              // Desktop: hover to flip
              onMouseEnter={() => setFlippedCard(index)}
              onMouseLeave={() => setFlippedCard(null)}
              // Mobile: track if touch started on button
              onTouchStart={handleCardTouchStart}
              onTouchEnd={(e) => handleCardTouchEnd(e, index)}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                transformStyle: 'preserve-3d',
                transition: 'transform 0.65s cubic-bezier(0.4,0,0.2,1)',
                transform: flippedCard === index ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}>

                {/* ── FRONT ── */}
                <div style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}>
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full flex flex-col overflow-hidden border border-gray-100">
                    <div className="flex-1 overflow-hidden">
                      <img src={category.image} alt={category.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"; }} />
                    </div>
                    <div className="p-3 bg-white">
                      <h3 className="text-center font-semibold text-gray-800 text-xs md:text-sm leading-tight mb-2 line-clamp-2">{category.name}</h3>
                      <button
                        onTouchEnd={(e) => { e.stopPropagation(); window.scrollTo(0,0); navigate(category.path); }}
                        onClick={(e) => { e.stopPropagation(); window.scrollTo(0,0); navigate(category.path); }}
                        className="w-full py-1.5 bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-bold rounded-lg hover:from-red-700 hover:to-amber-700 transition-all duration-300 flex items-center justify-center gap-1 hover:scale-105"
                      >
                        View Services
                        <svg className="w-3 h-3 animate-bounce-gentle" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                      </button>
                    </div>
                  </div>
                </div>

                {/* ── BACK ── */}
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
                        onTouchEnd={(e) => { e.stopPropagation(); window.scrollTo(0,0); navigate(category.path); }}
                        onClick={(e) => { e.stopPropagation(); window.scrollTo(0,0); navigate(category.path); }}
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

      {/* ─── WHY CHOOSE ELITEINOVA ─── */}
      <section className="py-8 md:py-12 mt-2" style={{ background: "linear-gradient(135deg, #fffbf0 0%, #fff8ee 50%, #fffdf5 100%)" }}>
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
              <h3 className="text-lg font-bold text-gray-900 mb-2">Eliteinova Wedding Services</h3>
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
        
        /* Animation Classes */
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
        }
        
        .fade-up.animated {
          animation: fadeUp 0.6s ease-out forwards;
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
        
        .animate-pulse-gentle {
          animation: pulseGentle 2s ease-in-out infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .animate-bounce-gentle {
          animation: pulseGentle 2s ease-in-out infinite;
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
};

export default Home;