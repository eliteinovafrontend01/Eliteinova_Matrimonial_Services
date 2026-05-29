import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import banner images from assets
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import banner4 from '../assets/banner4.png';
import banner5 from '../assets/banner5.png';

// Import category images
import photographyImage from '../assets/photography.jpg';
import cateringImage from '../assets/catering.jpg';
import weddinghallsImage from '../assets/weddinghalls.jpg';
import decorationImage from '../assets/decoration.jpg';
import invitationImage from '../assets/invitation.jpg';
import makeupImage from '../assets/makeup.jpg';
import entertainmentImage from '../assets/entertainment.jpg';
import backgroundInvestigationImage from '../assets/entertainment.jpg';

// Import icons for benefits section
import { 
  Users,
  Shield,
  Star,
  TrendingUp,
  CreditCard,
  Headphones,
  CheckCircle,
  User,
  ArrowRight
} from 'lucide-react';

const VendorLogin = ({ onOpenVendorForm }) => {
  const navigate = useNavigate();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [activeButton, setActiveButton] = useState(null);

  // Banner images data
  const banners = [
    {
      id: 1,
      image: banner1,
    },
    {
      id: 2,
      image: banner2,
    },
    {
      id: 3,
      image: banner3,
    },
    {
      id: 4,
      image: banner4,
    },
    {
      id: 5,
      image: banner5,
    },
  ];

  // Auto change banner every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  // Manual banner navigation
  const goToBanner = (index) => {
    setCurrentBannerIndex(index);
  };

  const vendorCategories = [
    {
      id: 'photography',
      name: 'Photography',
      description: 'Wedding Photography & Videography Services',
      image: photographyImage,
      formPath: '/register/photography'
    },
    {
      id: 'catering',
      name: 'Catering & Foods',
      description: 'Food Catering & Banquet Services',
      image: cateringImage,
      formPath: '/register/catering'
    },
    {
      id: 'wedding-halls',
      name: 'Mandapam & Wedding Halls',
      description: 'Venue & Mandapam Services',
      image: weddinghallsImage,
      formPath: '/register/wedding-halls'
    },
    {
      id: 'decorations',
      name: 'Decorations',
      description: 'Wedding Decoration & Floral Services',
      image: decorationImage,
      formPath: '/register/decorations'
    },
    {
      id: 'entertainment',
      name: 'Entertainment & Events',
      description: 'DJ, Music & Entertainment Services',
      image: entertainmentImage,
      formPath: '/register/entertainment'
    },
    {
      id: 'invitation',
      name: 'Invitation & Gifts',
      description: 'Invitation Cards & Gift Services',
      image: invitationImage,
      formPath: '/register/invitation'
    },
    {
      id: 'styling',
      name: 'Bridal & Groom Styling',
      description: 'Makeup & Styling Services',
      image: makeupImage,
      formPath: '/register/styling'
    },
    {
      id: 'background-investigations',
      name: 'Background Investigations',
      description: 'Pre-wedding Verification Services',
      image: backgroundInvestigationImage || 'https://images.unsplash.com/photo-1550592704-6c76defa9985?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      formPath: '/register/background-investigations'
    }
  ];

  const benefits = [
    { 
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />, 
      title: 'Wide Reach',
      text: 'Connect with thousands of wedding customers' 
    },
    { 
      icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6" />, 
      title: 'Verified Status',
      text: 'Get verified badge & build trust' 
    },
    { 
      icon: <Star className="w-5 h-5 sm:w-6 sm:h-6" />, 
      title: 'Premium Listing',
      text: 'Featured listings & priority placement' 
    },
    { 
      icon: <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />, 
      title: 'Business Growth',
      text: 'Increase bookings & revenue' 
    },
    { 
      icon: <CreditCard className="w-5 h-5 sm:w-6 sm:h-6" />, 
      title: 'Easy Payments',
      text: 'Secure & timely payment processing' 
    },
    { 
      icon: <Headphones className="w-5 h-5 sm:w-6 sm:h-6" />, 
      title: '24/7 Support',
      text: 'Dedicated vendor support team' 
    },
  ];

  const handleCategoryClick = (category) => {
    setActiveButton(category.id);
    
    // Navigate to the specific form page
    if (category.formPath) {
      navigate(category.formPath);
    }
    
    // If onOpenVendorForm prop is provided (for modal), use it
    if (onOpenVendorForm) {
      onOpenVendorForm(category.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50">
      {/* Banner Section - Same style as photography page */}
      <section className="relative w-full overflow-hidden bg-gray-100">
        <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[700px] w-full">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentBannerIndex 
                  ? 'opacity-100 z-10 pointer-events-auto' 
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                <img
                  src={banner.image}
                  alt={`Banner ${banner.id}`}
                  className="w-full h-full object-contain md:object-cover"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
                  }}
                />
              </div>
            </div>
          ))}

          {/* Banner Navigation Dots */}
          <div className="absolute bottom-4 sm:bottom-5 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:space-x-3 md:space-x-4 z-20">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToBanner(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentBannerIndex
                    ? 'bg-yellow-500 w-6 h-2 sm:w-8 sm:h-2.5 md:w-10 md:h-3'
                    : 'bg-white/90 hover:bg-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5'
                }`}
                aria-label={`Go to banner ${index + 1}`}
              />
            ))}
          </div>

          {/* Previous/Next Buttons */}
          <button
            onClick={() => goToBanner(currentBannerIndex === 0 ? banners.length - 1 : currentBannerIndex - 1)}
            className="absolute left-3 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 z-20"
            aria-label="Previous banner"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => goToBanner(currentBannerIndex === banners.length - 1 ? 0 : currentBannerIndex + 1)}
            className="absolute right-3 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/60 p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 z-20"
            aria-label="Next banner"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Main Content Container - Match photography page layout */}
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-3 lg:py-4">
        <div className="max-w-6xl mx-auto">
          {/* Category Selection Section */}
          <div className="bg-white rounded-md shadow border border-gray-200 p-4 md:p-6 mb-4 md:mb-6">
            {/* Category Selection Heading */}
            <div className="mb-4 md:mb-6 text-center">
              <h3 className="text-sm md:text-lg lg:text-xl font-bold text-red-800 mb-1 md:mb-2">
                Select Your Service Category
              </h3>
              <p className="text-gray-600 text-xs md:text-sm">
                Click on your service category to register as a vendor
              </p>
            </div>

            {/* Categories Grid - 8 Categories (2x4 on mobile, 4x2 on desktop) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {vendorCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  onMouseEnter={() => setActiveButton(category.id)}
                  onMouseLeave={() => setActiveButton(null)}
                  className={`
                    group relative bg-white rounded-md border border-gray-200 
                    hover:border-red-300 hover:shadow-md transition-all duration-300 
                    overflow-hidden h-full flex flex-col
                    ${activeButton === category.id ? 'ring-1 ring-red-500 border-red-300 shadow-md' : ''}
                  `}
                >
                  {/* Image Container */}
                  <div className="relative h-32 md:h-36 w-full overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/400x300/ef4444/ffffff?text=${encodeURIComponent(category.name)}`;
                      }}
                    />
                    {/* Dark Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-3 md:p-4 flex-grow flex flex-col">
                    <div className="mb-2">
                      <h3 className="font-bold text-xs md:text-sm text-red-800 mb-1 text-center line-clamp-2">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-[10px] md:text-xs text-center leading-tight">
                        {category.description}
                      </p>
                    </div>
                    
                    {/* Spacer to push button to bottom */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-center mt-2 pt-2 border-t border-gray-100">
                        <span className="text-red-600 font-medium text-[10px] md:text-xs flex items-center gap-1">
                          Click to Register
                          <ArrowRight className="w-3 h-3 text-red-600 group-hover:translate-x-0.5 transition-transform duration-300" />
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Note */}
            <div className="mt-4 md:mt-6 pt-3 border-t border-gray-200">
              <p className="text-center text-gray-500 text-xs">
                Can't find your category? <button className="text-red-600 font-medium hover:underline">Contact us</button>
              </p>
            </div>
          </div>

          {/* Vendor Registration Portal Section */}
          <section className="py-2 md:py-3">
            <div className="bg-white rounded-md shadow border border-red-200 p-4 md:p-6">
              {/* Vendor Registration Portal Heading */}
              <h2 className="text-sm md:text-lg lg:text-xl font-bold text-red-800 mb-3 md:mb-4 text-center">
                Vendor Registration Portal
              </h2>
              <p className="text-gray-700 text-xs md:text-sm lg:text-base mb-4 md:mb-6 max-w-4xl mx-auto text-center">
                Join our network of trusted wedding service providers. Register your business to start receiving booking requests from couples planning their special day.
              </p>
              
              {/* Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-4 md:mb-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-gradient-to-br from-red-50 to-yellow-50 p-3 md:p-4 rounded-md border border-red-200 flex items-start space-x-3 md:space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-r from-red-500 to-yellow-500 rounded-md flex items-center justify-center">
                      <div className="text-white">
                        {benefit.icon}
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-red-700 text-xs md:text-sm mb-1">{benefit.title}</h3>
                      <p className="text-gray-600 text-[10px] md:text-xs">{benefit.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Register Section */}
          <section className="py-2 md:py-3">
            <h2 className="text-sm md:text-lg font-bold text-center text-red-800 mb-3 md:mb-4">
              Why Register With Us?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-white p-3 md:p-4 rounded-md shadow border border-red-100 hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-2 md:mb-3 mx-auto">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="font-bold text-xs md:text-sm text-red-700 mb-1 text-center">Quick Registration</h3>
                <p className="text-gray-600 text-[10px] md:text-xs text-center leading-tight">Simple 10-minute registration process</p>
              </div>
              
              <div className="bg-white p-3 md:p-4 rounded-md shadow border border-yellow-100 hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center mb-2 md:mb-3 mx-auto">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="font-bold text-xs md:text-sm text-red-700 mb-1 text-center">Direct Customers</h3>
                <p className="text-gray-600 text-[10px] md:text-xs text-center leading-tight">Get direct leads from verified customers</p>
              </div>
              
              <div className="bg-white p-3 md:p-4 rounded-md shadow border border-red-100 hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-2 md:mb-3 mx-auto">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="font-bold text-xs md:text-sm text-red-700 mb-1 text-center">Secure Platform</h3>
                <p className="text-gray-600 text-[10px] md:text-xs text-center leading-tight">Safe & secure transaction handling</p>
              </div>
              
              <div className="bg-white p-3 md:p-4 rounded-md shadow border border-yellow-100 hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center mb-2 md:mb-3 mx-auto">
                  <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h3 className="font-bold text-xs md:text-sm text-red-700 mb-1 text-center">Business Analytics</h3>
                <p className="text-gray-600 text-[10px] md:text-xs text-center leading-tight">Track performance & insights dashboard</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-3 md:py-4">
            <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-md shadow-lg p-4 md:p-6 text-center">
              <h2 className="text-sm md:text-lg lg:text-xl font-bold text-white mb-2 md:mb-3">
                Ready to Grow Your Wedding Business?
              </h2>
              <p className="text-yellow-100 text-xs md:text-sm mb-3 md:mb-4">
                Join thousands of successful vendors who are already part of our platform
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 font-bold rounded-md hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow hover:shadow-md text-xs md:text-sm">
                  Start Registration Now
                </button>
                <button className="px-4 py-2 bg-white text-red-600 border border-white font-bold rounded-md hover:bg-red-50 transition-all duration-300 shadow hover:shadow-md text-xs md:text-sm">
                  Learn More
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default VendorLogin;