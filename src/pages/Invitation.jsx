import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import digitalinvites from '../assets/digitalinvites.jpg';
import luxurycards from '../assets/luxurycards.jpg';
import printedcards from '../assets/printedcards.jpg';
import customdesigns from '../assets/customdesigns.jpg';
import returngifts from '../assets/returngifts.jpg';
import gifthampers from '../assets/gifthampers.jpg';
import ecogifts from '../assets/ecogifts.jpg';
import luxuryhampers from '../assets/luxuryhampers.jpg';
import invitationbanner1 from '../assets/inbanner1.jpg';
import invitationbanner2 from '../assets/inbanner2.jpg';
import matrimonyBanner from '../assets/Matrimonybanner.jpg';
import VendorDetails from '../Components/VendorDetails';
import { invitationVendors } from '../data/invitationData';

const Invitation = () => {
  const navigate = useNavigate();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  // Basic filter states
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  
  // Extended filter states matching registration form - EXACT MATCH
  const [selectedServices, setSelectedServices] = useState([]);
  const [otherService, setOtherService] = useState('');
  const [selectedInvitationTypes, setSelectedInvitationTypes] = useState([]);
  const [selectedPrintingOptions, setSelectedPrintingOptions] = useState([]);
  const [selectedGiftTypes, setSelectedGiftTypes] = useState([]);
  const [businessType, setBusinessType] = useState('');
  const [experience, setExperience] = useState('');
  const [minOrderQuantity, setMinOrderQuantity] = useState('');
  const [giftMinOrder, setGiftMinOrder] = useState('');
  const [customizationAvailable, setCustomizationAvailable] = useState('');
  const [brandingAvailable, setBrandingAvailable] = useState('');
  const [packingIncluded, setPackingIncluded] = useState('');
  const [designApprovalTime, setDesignApprovalTime] = useState('');
  const [printingDeliveryTime, setPrintingDeliveryTime] = useState('');
  const [giftPreparationTime, setGiftPreparationTime] = useState('');
  const [preferredLocations, setPreferredLocations] = useState([]);
  const [hasTravelCharges, setHasTravelCharges] = useState('');
  const [advanceRequired, setAdvanceRequired] = useState('');
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [balanceTerms, setBalanceTerms] = useState('');
  const [hasGST, setHasGST] = useState('');
  
  // Filter navigation
  const [currentFilterPage, setCurrentFilterPage] = useState(0);
  const [currentMobileFilterPage, setCurrentMobileFilterPage] = useState(0);
  const [showMobileFilterDrawer, setShowMobileFilterDrawer] = useState(false);

  // Vendor details modal state
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showVendorDetails, setShowVendorDetails] = useState(false);

  // Use imported vendors data
  const vendors = invitationVendors;

  // Check if there's a filter parameter in the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const openFilter = urlParams.get('openFilter');
    
    if (openFilter === 'true') {
      setTimeout(() => {
        const filterSection = document.getElementById('filter-section');
        if (filterSection) {
          filterSection.scrollIntoView({ behavior: 'smooth' });
        }
        if (window.innerWidth < 1024) {
          setShowMobileFilterDrawer(true);
        }
      }, 500);
    }
  }, []);

  const banners = [
    {
      id: 1,
      image: invitationbanner1,
      title: "Invitation & Gifts",
      subtitle: "Make Your First Impression Count"
    },
    {
      id: 2,
      image: invitationbanner2,
      title: "Exquisite Invitations",
      subtitle: "Set the Tone for Your Special Day"
    }
  ];

  const mainCategories = [
    { name: 'Photography', path: '/photography' },
    { name: 'Catering & Foods', path: '/catering' },
    { name: 'Wedding Halls', path: '/wedding-halls' },
    { name: 'Decorations', path: '/decorations' },
    { name: 'Entertainment', path: '/entertainment' },
    { name: 'Invitation & Gifts', path: '/invitation' },
    { name: 'Bridal Styling', path: '/styling' },
    { name: 'Background Investigations', path: '/background-investigations' },
  ];

  const invitationCategories = [
    { name: 'Digital Invites', image: digitalinvites },
    { name: 'Luxury Cards', image: luxurycards },
    { name: 'Printed Cards', image: printedcards },
    { name: 'Custom Designs', image: customdesigns },
    { name: 'Return Gifts', image: returngifts },
    { name: 'Gift Hampers', image: gifthampers },
    { name: 'Eco Gifts', image: ecogifts },
    { name: 'Luxury Hampers', image: luxuryhampers },
  ];

  const eventTypes = [
    'Digital Invites',
    'Luxury Cards',
    'Printed Cards',
    'Custom Designs',
    'Return Gifts',
    'Gift Hampers',
    'Eco Gifts',
    'Luxury Hampers'
  ];

  // Filter options from registration form - EXACT MATCH
  const serviceTypes = [
    "Wedding Invitation Printing",
    "Digital Invitations / E-Cards",
    "Customized Invitation Design",
    "Wedding Return Gifts",
    "Wedding Favors",
    "Corporate / Bulk Gifts",
    "Hampers & Custom Packaging"
  ];

  const invitationTypes = [
    "Traditional Cards",
    "Theme-based Cards",
    "Premium / Box Invitations",
    "Eco-friendly Invitations",
    "Digital / Video Invitations"
  ];

  const printingOptions = [
    "Offset",
    "Digital",
    "Letterpress",
    "Foil / Embossing"
  ];

  const giftTypes = [
    "Traditional Gifts",
    "Customized Gifts",
    "Eco-friendly Gifts",
    "Edible Gifts",
    "Premium Hampers"
  ];

  const businessTypes = [
    "Individual",
    "Proprietorship",
    "Partnership",
    "Private Limited"
  ];

  const locations = [
    "Local",
    "Within State",
    "Outstation",
    "International"
  ];

  const states = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Delhi'];
  const districts = {
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy', 'Kanyakumari', 'Tirunelveli'],
    'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam'],
    'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum'],
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    'Delhi': ['New Delhi', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi']
  };

  const handleCategoryClick = (categoryName) => {
    let eventType = categoryName;
    
    switch(categoryName) {
      case 'Digital Invites':
        eventType = 'Digital Invites';
        break;
      case 'Luxury Cards':
        eventType = 'Luxury Cards';
        break;
      case 'Printed Cards':
        eventType = 'Printed Cards';
        break;
      case 'Custom Designs':
        eventType = 'Custom Designs';
        break;
      case 'Return Gifts':
        eventType = 'Return Gifts';
        break;
      case 'Gift Hampers':
        eventType = 'Gift Hampers';
        break;
      case 'Eco Gifts':
        eventType = 'Eco Gifts';
        break;
      case 'Luxury Hampers':
        eventType = 'Luxury Hampers';
        break;
      default:
        eventType = categoryName;
    }
    
    setSelectedEvent(eventType);
    
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        const vendorSection = document.querySelector('.vendor-profiles');
        if (vendorSection) {
          vendorSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // Toggle functions for multi-select filters
  const handleServiceToggle = (service) => {
    setSelectedServices(prev => {
      if (prev.includes(service)) {
        return prev.filter(s => s !== service);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleInvitationTypeToggle = (type) => {
    setSelectedInvitationTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handlePrintingOptionToggle = (option) => {
    setSelectedPrintingOptions(prev => {
      if (prev.includes(option)) {
        return prev.filter(o => o !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  const handleGiftTypeToggle = (type) => {
    setSelectedGiftTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };

  const handleLocationToggle = (location) => {
    setPreferredLocations(prev => {
      if (prev.includes(location)) {
        return prev.filter(l => l !== location);
      } else {
        return [...prev, location];
      }
    });
  };

  // Enhanced filter function
  const filteredVendors = vendors.filter(vendor => {
    // Basic filters
    if (selectedEvent && vendor.eventType !== selectedEvent) return false;
    if (selectedState && !vendor.location.includes(selectedState)) return false;
    if (selectedDistrict && !vendor.location.includes(selectedDistrict)) return false;
    if (selectedLocation && !vendor.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
    
    // Budget filter
    if (minBudget || maxBudget) {
      const minPrice = parseInt(minBudget) || 0;
      const maxPrice = parseInt(maxBudget) || Infinity;
      const vendorMinPrice = parseInt(vendor.priceRange.replace(/[^0-9]/g, '').split('-')[0]) || 0;
      if (vendorMinPrice < minPrice || vendorMinPrice > maxPrice) return false;
    }
    
    // Service types filter
    if (selectedServices.length > 0) {
      if (!vendor.services) return false;
      const hasMatchingService = selectedServices.some(service => 
        vendor.services.includes(service)
      );
      if (!hasMatchingService) return false;
    }
    
    // Other service filter
    if (otherService) {
      // This would need custom logic based on how other service is stored
    }
    
    // Invitation types filter
    if (selectedInvitationTypes.length > 0) {
      if (!vendor.invitationTypes) return false;
      const hasMatchingType = selectedInvitationTypes.some(type => 
        vendor.invitationTypes.includes(type)
      );
      if (!hasMatchingType) return false;
    }
    
    // Printing options filter
    if (selectedPrintingOptions.length > 0) {
      if (!vendor.printingOptions) return false;
      const hasMatchingPrint = selectedPrintingOptions.some(option => 
        vendor.printingOptions.includes(option)
      );
      if (!hasMatchingPrint) return false;
    }
    
    // Gift types filter
    if (selectedGiftTypes.length > 0) {
      if (!vendor.giftTypes) return false;
      const hasMatchingGift = selectedGiftTypes.some(type => 
        vendor.giftTypes.includes(type)
      );
      if (!hasMatchingGift) return false;
    }
    
    // Business type filter
    if (businessType && vendor.businessType !== businessType) return false;
    
    // Experience filter
    if (experience) {
      const minExperience = parseInt(experience) || 0;
      if (vendor.experience < minExperience) return false;
    }
    
    // Order quantity filters
    if (minOrderQuantity) {
      const minQty = parseInt(minOrderQuantity) || 0;
      if (vendor.minOrderQuantity < minQty) return false;
    }
    
    if (giftMinOrder) {
      const minGiftQty = parseInt(giftMinOrder) || 0;
      if (vendor.giftMinOrder < minGiftQty) return false;
    }
    
    // Customization filter
    if (customizationAvailable && vendor.customizationAvailable !== customizationAvailable) return false;
    
    // Branding filter
    if (brandingAvailable && vendor.brandingAvailable !== brandingAvailable) return false;
    
    // Packing filter
    if (packingIncluded && vendor.packingIncluded !== packingIncluded) return false;
    
    // Timeline filters
    if (designApprovalTime) {
      const maxDays = parseInt(designApprovalTime) || Infinity;
      if (vendor.designApprovalTime > maxDays) return false;
    }
    
    if (printingDeliveryTime) {
      const maxDays = parseInt(printingDeliveryTime) || Infinity;
      if (vendor.printingDeliveryTime > maxDays) return false;
    }
    
    if (giftPreparationTime) {
      const maxDays = parseInt(giftPreparationTime) || Infinity;
      if (vendor.giftPreparationTime > maxDays) return false;
    }
    
    // Location preferences filter
    if (preferredLocations.length > 0) {
      if (!vendor.preferredLocations) return false;
      const hasMatchingLocation = preferredLocations.some(location => 
        vendor.preferredLocations.includes(location)
      );
      if (!hasMatchingLocation) return false;
    }
    
    // Travel charges filter
    if (hasTravelCharges && vendor.hasTravelCharges !== hasTravelCharges) return false;
    
    // Advance payment filter
    if (advanceRequired && vendor.advanceRequired !== advanceRequired) return false;
    
    // Advance amount filter
    if (advanceAmount) {
      // This would need custom logic for percentage vs amount
    }
    
    // Balance terms filter
    if (balanceTerms) {
      // This would need custom logic for text search
    }
    
    // GST filter
    if (hasGST && vendor.hasGST !== hasGST) return false;
    
    return true;
  });

  // Desktop Filter Pages - EXACTLY MATCHING FORM STRUCTURE AND HEADINGS
  const filterPages = [
    // PAGE 1: Vendor Details
    {
      title: "Vendor Details",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Type of Services Provided</label>
            <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto p-1 border border-red-100 rounded-md">
              {serviceTypes.map(service => (
                <label key={service} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedServices.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="w-3.5 h-3.5 accent-red-600"
                  />
                  <span className="truncate">{service}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">₹ Budget Range (Min - Max)</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min Budget"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
                className="w-1/2 px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
              />
              <input
                type="number"
                placeholder="Max Budget"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                className="w-1/2 px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
              />
            </div>
          </div>
        </div>
      )
    },

    // PAGE 3: Business & Legal
    {
      title: "Business & Legal",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Business Type</label>
            <div className="grid grid-cols-2 gap-1.5">
              {businessTypes.map(type => (
                <label key={type} className="flex items-center gap-2 text-xs">
                  <input
                    type="radio"
                    name="businessType"
                    value={type}
                    checked={businessType === type}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-3.5 h-3.5 accent-red-600"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Years of Experience</label>
            <input
              type="number"
              placeholder="Enter years"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            />
          </div>
        </div>
      )
    },

    // PAGE 4: Invitation Details
    {
      title: "Invitation Details",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Invitation Types Offered</label>
            <div className="grid grid-cols-1 gap-1.5 max-h-32 overflow-y-auto p-1 border border-red-100 rounded-md">
              {invitationTypes.map(type => (
                <label key={type} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedInvitationTypes.includes(type)}
                    onChange={() => handleInvitationTypeToggle(type)}
                    className="w-3.5 h-3.5 accent-red-600"
                  />
                  <span className="truncate">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Printing Options</label>
            <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto p-1 border border-red-100 rounded-md">
              {printingOptions.map(option => (
                <label key={option} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedPrintingOptions.includes(option)}
                    onChange={() => handlePrintingOptionToggle(option)}
                    className="w-3.5 h-3.5 accent-red-600"
                  />
                  <span className="truncate">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Customization Available</label>
            <div className="flex gap-3 text-xs">
              <label className="flex items-center gap-1">
                <input 
                  type="radio" 
                  name="customizationAvailable" 
                  value="yes"
                  checked={customizationAvailable === "yes"}
                  onChange={(e) => setCustomizationAvailable(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600" 
                /> 
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input 
                  type="radio" 
                  name="customizationAvailable" 
                  value="no"
                  checked={customizationAvailable === "no"}
                  onChange={(e) => setCustomizationAvailable(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600" 
                /> 
                No
              </label>
            </div>
          </div>
        </div>
      )
    },

    // PAGE 5: Gift & Return Gifts
    {
      title: "Gift & Return Gifts",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Types of Gifts Offered</label>
            <div className="grid grid-cols-1 gap-1.5 max-h-32 overflow-y-auto p-1 border border-red-100 rounded-md">
              {giftTypes.map(type => (
                <label key={type} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedGiftTypes.includes(type)}
                    onChange={() => handleGiftTypeToggle(type)}
                    className="w-3.5 h-3.5 accent-red-600"
                  />
                  <span className="truncate">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Branding / Name Printing Available</label>
            <div className="flex gap-3 text-xs">
              <label className="flex items-center gap-1">
                <input 
                  type="radio" 
                  name="brandingAvailable" 
                  value="yes"
                  checked={brandingAvailable === "yes"}
                  onChange={(e) => setBrandingAvailable(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600" 
                /> 
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input 
                  type="radio" 
                  name="brandingAvailable" 
                  value="no"
                  checked={brandingAvailable === "no"}
                  onChange={(e) => setBrandingAvailable(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600" 
                /> 
                No
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Packing & Wrapping Included</label>
            <div className="flex gap-3 text-xs">
              <label className="flex items-center gap-1">
                <input 
                  type="radio" 
                  name="packingIncluded" 
                  value="yes"
                  checked={packingIncluded === "yes"}
                  onChange={(e) => setPackingIncluded(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600" 
                /> 
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input 
                  type="radio" 
                  name="packingIncluded" 
                  value="no"
                  checked={packingIncluded === "no"}
                  onChange={(e) => setPackingIncluded(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600" 
                /> 
                No
              </label>
            </div>
          </div>
        </div>
      )
    },

    // PAGE 6: Pricing & Payment Terms
    {
      title: "Pricing & Payment Terms",
      content: (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Invitation Min Price</label>
              <input
                type="number"
                placeholder="Min price"
                className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Invitation Max Price</label>
              <input
                type="number"
                placeholder="Max price"
                className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Gift Min Price</label>
              <input
                type="number"
                placeholder="Min price"
                className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Gift Max Price</label>
              <input
                type="number"
                placeholder="Max price"
                className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Advance Payment Required</label>
            <div className="flex gap-3 text-xs">
              <label className="flex items-center gap-1">
                <input 
                  type="radio" 
                  name="advanceRequired" 
                  value="yes"
                  checked={advanceRequired === "yes"}
                  onChange={(e) => setAdvanceRequired(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600" 
                /> 
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input 
                  type="radio" 
                  name="advanceRequired" 
                  value="no"
                  checked={advanceRequired === "no"}
                  onChange={(e) => setAdvanceRequired(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600" 
                /> 
                No
              </label>
            </div>
          </div>

          {advanceRequired === "yes" && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Advance % / Amount</label>
              <input
                type="text"
                placeholder="Enter advance amount or percentage"
                value={advanceAmount}
                onChange={(e) => setAdvanceAmount(e.target.value)}
                className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
              />
            </div>
          )}
        </div>
      )
    },

    // PAGE 7: Delivery Timeline
    {
      title: "Delivery Timeline",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Design Approval (Days)</label>
            <input
              type="number"
              placeholder="Enter number of days"
              value={designApprovalTime}
              onChange={(e) => setDesignApprovalTime(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Printing & Delivery (Days)</label>
            <input
              type="number"
              placeholder="Enter number of days"
              value={printingDeliveryTime}
              onChange={(e) => setPrintingDeliveryTime(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Gift Preparation (Days)</label>
            <input
              type="number"
              placeholder="Enter number of days"
              value={giftPreparationTime}
              onChange={(e) => setGiftPreparationTime(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            />
          </div>
        </div>
      )
    },

    // PAGE 8: Service Coverage
    {
      title: "Service Coverage",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">State</label>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedDistrict('');
              }}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            >
              <option value="">All States</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">City / District</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs disabled:bg-gray-100"
            >
              <option value="">All Districts</option>
              {selectedState && districts[selectedState]?.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Service Coverage Locations</label>
            <div className="grid grid-cols-2 gap-1.5">
              {locations.map(location => (
                <label key={location} className="flex items-center gap-2 text-xs">
                  <input 
                    type="checkbox" 
                    checked={preferredLocations.includes(location)}
                    onChange={() => handleLocationToggle(location)}
                    className="w-3.5 h-3.5 accent-red-600" 
                  /> 
                  {location}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Travel Charges Applicable</label>
            <div className="flex gap-3 text-xs">
              <label className="flex items-center gap-1">
                <input 
                  type="radio" 
                  name="hasTravelCharges" 
                  value="yes"
                  checked={hasTravelCharges === "yes"}
                  onChange={(e) => setHasTravelCharges(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600" 
                /> 
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input 
                  type="radio" 
                  name="hasTravelCharges" 
                  value="no"
                  checked={hasTravelCharges === "no"}
                  onChange={(e) => setHasTravelCharges(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600" 
                /> 
                No
              </label>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Mobile Filter Pages - EXACTLY MATCHING FORM STRUCTURE AND HEADINGS (with smaller font sizes)
  const mobileFilterPages = [
    // PAGE 1: Vendor Details
    {
      title: "Vendor Details",
      content: (
        <div className="space-y-2">
          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Type of Services Provided</label>
            <div className="grid grid-cols-1 gap-1 max-h-28 overflow-y-auto p-1 border border-red-100 rounded">
              {serviceTypes.map(service => (
                <label key={service} className="flex items-center gap-1.5 text-xs">
                  <input type="checkbox" checked={selectedServices.includes(service)} onChange={() => handleServiceToggle(service)} className="w-3.5 h-3.5 accent-red-600" />
                  <span className="truncate">{service}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">₹ Budget Range (Min - Max)</label>
            <div className="flex gap-1">
              <input type="number" placeholder="Min Budget" value={minBudget} onChange={(e) => setMinBudget(e.target.value)} className="w-1/2 px-2 py-1.5 text-xs border border-red-300 rounded" />
              <input type="number" placeholder="Max Budget" value={maxBudget} onChange={(e) => setMaxBudget(e.target.value)} className="w-1/2 px-2 py-1.5 text-xs border border-red-300 rounded" />
            </div>
          </div>
        </div>
      )
    },

    // PAGE 3: Business & Legal
    {
      title: "Business & Legal",
      content: (
        <div className="space-y-2">
          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Business Type</label>
            <div className="grid grid-cols-2 gap-1">
              {businessTypes.map(type => (
                <label key={type} className="flex items-center gap-1.5 text-xs">
                  <input type="radio" name="mobileBusinessType" value={type} checked={businessType === type} onChange={(e) => setBusinessType(e.target.value)} className="w-3.5 h-3.5 accent-red-600" />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Years of Experience</label>
            <input type="number" placeholder="Enter years" value={experience} onChange={(e) => setExperience(e.target.value)} className="w-full px-2 py-1.5 text-xs border border-red-300 rounded" />
          </div>
        </div>
      )
    },

    // PAGE 4: Invitation Details
    {
      title: "Invitation Details",
      content: (
        <div className="space-y-2">
          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Invitation Types Offered</label>
            <div className="grid grid-cols-1 gap-1 max-h-24 overflow-y-auto p-1 border border-red-100 rounded">
              {invitationTypes.map(type => (
                <label key={type} className="flex items-center gap-1.5 text-xs">
                  <input type="checkbox" checked={selectedInvitationTypes.includes(type)} onChange={() => handleInvitationTypeToggle(type)} className="w-3.5 h-3.5 accent-red-600" />
                  <span className="truncate">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Printing Options</label>
            <div className="grid grid-cols-2 gap-1 max-h-24 overflow-y-auto p-1 border border-red-100 rounded">
              {printingOptions.map(option => (
                <label key={option} className="flex items-center gap-1.5 text-xs">
                  <input type="checkbox" checked={selectedPrintingOptions.includes(option)} onChange={() => handlePrintingOptionToggle(option)} className="w-3.5 h-3.5 accent-red-600" />
                  <span className="truncate">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Customization Available</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-1.5 text-xs">
                <input type="radio" name="mobileCustomizationAvailable" value="yes" checked={customizationAvailable === "yes"} onChange={(e) => setCustomizationAvailable(e.target.value)} className="w-3.5 h-3.5 accent-red-600" />
                Yes
              </label>
              <label className="flex items-center gap-1.5 text-xs">
                <input type="radio" name="mobileCustomizationAvailable" value="no" checked={customizationAvailable === "no"} onChange={(e) => setCustomizationAvailable(e.target.value)} className="w-3.5 h-3.5 accent-red-600" />
                No
              </label>
            </div>
          </div>
        </div>
      )
    },

    // PAGE 5: Gift & Return Gifts
    {
      title: "Gift & Return Gifts",
      content: (
        <div className="space-y-2">
          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Types of Gifts Offered</label>
            <div className="grid grid-cols-1 gap-1 max-h-24 overflow-y-auto p-1 border border-red-100 rounded">
              {giftTypes.map(type => (
                <label key={type} className="flex items-center gap-1.5 text-xs">
                  <input type="checkbox" checked={selectedGiftTypes.includes(type)} onChange={() => handleGiftTypeToggle(type)} className="w-3.5 h-3.5 accent-red-600" />
                  <span className="truncate">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Branding / Name Printing Available</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-1.5 text-xs"><input type="radio" name="mobileBrandingAvailable" value="yes" checked={brandingAvailable === "yes"} onChange={(e) => setBrandingAvailable(e.target.value)} className="w-3.5 h-3.5 accent-red-600" />Yes</label>
              <label className="flex items-center gap-1.5 text-xs"><input type="radio" name="mobileBrandingAvailable" value="no" checked={brandingAvailable === "no"} onChange={(e) => setBrandingAvailable(e.target.value)} className="w-3.5 h-3.5 accent-red-600" />No</label>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Packing & Wrapping Included</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-1.5 text-xs"><input type="radio" name="mobilePackingIncluded" value="yes" checked={packingIncluded === "yes"} onChange={(e) => setPackingIncluded(e.target.value)} className="w-3.5 h-3.5 accent-red-600" />Yes</label>
              <label className="flex items-center gap-1.5 text-xs"><input type="radio" name="mobilePackingIncluded" value="no" checked={packingIncluded === "no"} onChange={(e) => setPackingIncluded(e.target.value)} className="w-3.5 h-3.5 accent-red-600" />No</label>
            </div>
          </div>
        </div>
      )
    },

    // PAGE 6: Pricing & Payment Terms
    {
      title: "Pricing & Payment Terms",
      content: (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-1">
            <div>
              <label className="block text-[10px] font-bold text-gray-700 mb-1">Invitation Min Price</label>
              <input type="number" placeholder="Min" className="w-full px-2 py-1.5 text-xs border border-red-300 rounded" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-700 mb-1">Invitation Max Price</label>
              <input type="number" placeholder="Max" className="w-full px-2 py-1.5 text-xs border border-red-300 rounded" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1">
            <div>
              <label className="block text-[10px] font-bold text-gray-700 mb-1">Gift Min Price</label>
              <input type="number" placeholder="Min" className="w-full px-2 py-1.5 text-xs border border-red-300 rounded" />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-700 mb-1">Gift Max Price</label>
              <input type="number" placeholder="Max" className="w-full px-2 py-1.5 text-xs border border-red-300 rounded" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Advance Payment Required</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-1.5 text-xs"><input type="radio" name="mobileAdvanceRequired" value="yes" checked={advanceRequired === "yes"} onChange={(e) => setAdvanceRequired(e.target.value)} className="w-3.5 h-3.5 accent-red-600" />Yes</label>
              <label className="flex items-center gap-1.5 text-xs"><input type="radio" name="mobileAdvanceRequired" value="no" checked={advanceRequired === "no"} onChange={(e) => setAdvanceRequired(e.target.value)} className="w-3.5 h-3.5 accent-red-600" />No</label>
            </div>
          </div>

          {advanceRequired === "yes" && (
            <div>
              <label className="block text-[10px] font-bold text-gray-700 mb-1">Advance % / Amount</label>
              <input type="text" placeholder="Enter advance amount or percentage" value={advanceAmount} onChange={(e) => setAdvanceAmount(e.target.value)} className="w-full px-2 py-1.5 text-xs border border-red-300 rounded" />
            </div>
          )}
        </div>
      )
    },

    // PAGE 7: Delivery Timeline
    {
      title: "Delivery Timeline",
      content: (
        <div className="space-y-2">
          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Design Approval (Days)</label>
            <input type="number" placeholder="Enter number of days" value={designApprovalTime} onChange={(e) => setDesignApprovalTime(e.target.value)} className="w-full px-2 py-1.5 text-xs border border-red-300 rounded" />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Printing & Delivery (Days)</label>
            <input type="number" placeholder="Enter number of days" value={printingDeliveryTime} onChange={(e) => setPrintingDeliveryTime(e.target.value)} className="w-full px-2 py-1.5 text-xs border border-red-300 rounded" />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Gift Preparation (Days)</label>
            <input type="number" placeholder="Enter number of days" value={giftPreparationTime} onChange={(e) => setGiftPreparationTime(e.target.value)} className="w-full px-2 py-1.5 text-xs border border-red-300 rounded" />
          </div>
        </div>
      )
    },

    // PAGE 8: Service Coverage
    {
      title: "Service Coverage",
      content: (
        <div className="space-y-2">
          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">State</label>
            <select value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(''); }} className="w-full px-2 py-1.5 text-xs border border-red-300 rounded">
              <option value="">All States</option>
              {states.map((state) => <option key={state} value={state}>{state}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">City / District</label>
            <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} disabled={!selectedState} className="w-full px-2 py-1.5 text-xs border border-red-300 rounded disabled:bg-gray-100">
              <option value="">All Districts</option>
              {selectedState && districts[selectedState]?.map((district) => <option key={district} value={district}>{district}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Service Coverage Locations</label>
            <div className="grid grid-cols-2 gap-1">
              {locations.map(location => (
                <label key={location} className="flex items-center gap-1.5 text-xs">
                  <input type="checkbox" checked={preferredLocations.includes(location)} onChange={() => handleLocationToggle(location)} className="w-3.5 h-3.5 accent-red-600" />
                  {location}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Travel Charges Applicable</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-1.5 text-xs"><input type="radio" name="mobileHasTravelCharges" value="yes" checked={hasTravelCharges === "yes"} onChange={(e) => setHasTravelCharges(e.target.value)} className="w-3.5 h-3.5 accent-red-600" />Yes</label>
              <label className="flex items-center gap-1.5 text-xs"><input type="radio" name="mobileHasTravelCharges" value="no" checked={hasTravelCharges === "no"} onChange={(e) => setHasTravelCharges(e.target.value)} className="w-3.5 h-3.5 accent-red-600" />No</label>
            </div>
          </div>
        </div>
      )
    }
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

  const goToBanner = (index) => {
    setCurrentBannerIndex(index);
  };

  const handleFilter = () => {
    console.log('Filtering...', filteredVendors.length);
    setShowMobileFilterDrawer(false);
    
    setTimeout(() => {
      const vendorSection = document.querySelector('.vendor-profiles');
      if (vendorSection) {
        vendorSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleReset = () => {
    setMinBudget('');
    setMaxBudget('');
    setSelectedEvent('');
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedLocation('');
    setSelectedServices([]);
    setOtherService('');
    setSelectedInvitationTypes([]);
    setSelectedPrintingOptions([]);
    setSelectedGiftTypes([]);
    setBusinessType('');
    setExperience('');
    setMinOrderQuantity('');
    setGiftMinOrder('');
    setCustomizationAvailable('');
    setBrandingAvailable('');
    setPackingIncluded('');
    setDesignApprovalTime('');
    setPrintingDeliveryTime('');
    setGiftPreparationTime('');
    setPreferredLocations([]);
    setHasTravelCharges('');
    setAdvanceRequired('');
    setAdvanceAmount('');
    setBalanceTerms('');
    setHasGST('');
    setCurrentFilterPage(0);
    setCurrentMobileFilterPage(0);
    setShowMobileFilterDrawer(false);
  };

  const handleFilterButtonClick = () => {
    if (window.location.pathname === '/invitation') {
      const filterSection = document.getElementById('filter-section');
      if (filterSection) {
        filterSection.scrollIntoView({ behavior: 'smooth' });
      }
      if (window.innerWidth < 1024) {
        setShowMobileFilterDrawer(true);
      }
    } else {
      navigate('/invitation?openFilter=true');
    }
  };

  const nextFilterPage = () => {
    if (currentFilterPage < filterPages.length - 1) {
      setCurrentFilterPage(currentFilterPage + 1);
    }
  };

  const prevFilterPage = () => {
    if (currentFilterPage > 0) {
      setCurrentFilterPage(currentFilterPage - 1);
    }
  };

  const nextMobileFilterPage = () => {
    if (currentMobileFilterPage < mobileFilterPages.length - 1) {
      setCurrentMobileFilterPage(currentMobileFilterPage + 1);
    }
  };

  const prevMobileFilterPage = () => {
    if (currentMobileFilterPage > 0) {
      setCurrentMobileFilterPage(currentMobileFilterPage - 1);
    }
  };

  // Handle view details
  const handleViewDetails = (vendorId) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor) {
      setSelectedVendor(vendor);
      setShowVendorDetails(true);
    }
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (minBudget) count++;
    if (maxBudget) count++;
    if (selectedEvent) count++;
    if (selectedState) count++;
    if (selectedDistrict) count++;
    if (selectedLocation) count++;
    if (selectedServices.length > 0) count++;
    if (otherService) count++;
    if (selectedInvitationTypes.length > 0) count++;
    if (selectedPrintingOptions.length > 0) count++;
    if (selectedGiftTypes.length > 0) count++;
    if (businessType) count++;
    if (experience) count++;
    if (minOrderQuantity) count++;
    if (giftMinOrder) count++;
    if (customizationAvailable) count++;
    if (brandingAvailable) count++;
    if (packingIncluded) count++;
    if (designApprovalTime) count++;
    if (printingDeliveryTime) count++;
    if (giftPreparationTime) count++;
    if (preferredLocations.length > 0) count++;
    if (hasTravelCharges) count++;
    if (advanceRequired) count++;
    if (advanceAmount) count++;
    if (balanceTerms) count++;
    if (hasGST) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50">
      {/* Add Pacifico and Plus Jakarta Sans fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      
      {/* Global font style */}
      <style jsx>{`
        .vendor-card {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .vendor-card h3, .vendor-card .vendor-name {
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .vendor-card .price-tag {
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .vendor-card .service-item {
          font-weight: 500;
        }
        .vendor-card .contact-label {
          font-weight: 600;
          color: #4B5563;
        }
      `}</style>
      
      {/* Floating Filter Button with Badge */}
      <button
        onClick={handleFilterButtonClick}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-red-600 to-red-700 text-white p-3 rounded-full shadow-lg hover:from-red-700 hover:to-red-800 hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center lg:hidden"
        aria-label="Open Filters"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        {getActiveFilterCount() > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-500 text-red-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {getActiveFilterCount()}
          </span>
        )}
      </button>

      {/* Banner Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[200px] xs:h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[550px] w-full">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentBannerIndex 
                  ? 'opacity-100 z-10 pointer-events-auto' 
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-500/5 to-yellow-500/5">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  style={{
                    objectPosition: 'center center',
                  }}
                />
              </div>
            </div>
          ))}

          {/* Navigation Buttons */}
          <button
            onClick={() => goToBanner(currentBannerIndex === 0 ? banners.length - 1 : currentBannerIndex - 1)}
            className="absolute left-1 xs:left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 active:bg-black/80 p-1.5 xs:p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-300 z-20 touch-manipulation"
            aria-label="Previous banner"
          >
            <svg 
              className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => goToBanner(currentBannerIndex === banners.length - 1 ? 0 : currentBannerIndex + 1)}
            className="absolute right-1 xs:right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 active:bg-black/80 p-1.5 xs:p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-300 z-20 touch-manipulation"
            aria-label="Next banner"
          >
            <svg 
              className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToBanner(index)}
                className={`w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentBannerIndex 
                    ? 'bg-white scale-110' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Categories Navigation */}
      <div className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 shadow-md py-2 md:py-4">
        <div className="container mx-auto px-2 md:px-4">
          <h3 className="text-white text-xs sm:text-sm md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Browse All Wedding Services
          </h3>
          <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-1 scrollbar-hide gap-1 md:gap-2">
            {mainCategories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="flex-shrink-0 transition-all duration-300"
              >
                <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-1 md:py-2.5 px-2 md:px-5 rounded-md shadow hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] text-[10px] md:text-sm whitespace-nowrap border border-white/20 hover:border-yellow-300">
                  {category.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content with Filter Sidebar */}
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-3 lg:py-4">
        <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
          {/* Main Content Area */}
          <div className="lg:flex-1 lg:max-w-[calc(100%-320px)]">
            {/* Invitation Categories */}
            <section className="py-2 md:py-3">
              <h2 className="text-sm md:text-lg font-bold text-center text-red-800 mb-1 md:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Our Invitation & Gift Categories
              </h2>
              
              {/* Mobile: Horizontal Scroll */}
              <div className="md:hidden overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex space-x-1 px-1 min-w-max">
                  {invitationCategories.map((category) => (
                    <div key={category.name} className="flex flex-col items-center group flex-shrink-0 w-14">
                      <button 
                        onClick={() => handleCategoryClick(category.name)}
                        className="relative block w-12 h-12 mx-auto focus:outline-none"
                      >
                        <div className={`w-full h-full rounded-full border ${selectedEvent && selectedEvent.includes(category.name.split(' ')[0]) ? 'border-yellow-500' : 'border-amber-700'} overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm hover:shadow transition-all duration-300 p-0.5`}>
                          <img 
                            src={category.image}
                            alt={category.name} 
                            className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-yellow-400 transition-all duration-300"></div>
                      </button>
                      <h3 className="mt-0.5 text-center font-medium text-gray-800 text-[7px] px-0.5 leading-tight line-clamp-2">
                        {category.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Desktop: Grid */}
              <div className="hidden md:grid grid-cols-4 md:grid-cols-8 gap-1 md:gap-1.5 px-1">
                {invitationCategories.map((category) => (
                  <div key={category.name} className="flex flex-col items-center group">
                    <button 
                      onClick={() => handleCategoryClick(category.name)}
                      className="relative block w-full aspect-square max-w-[65px] md:max-w-[70px] mx-auto focus:outline-none"
                    >
                      <div className={`w-full h-full rounded-full border ${selectedEvent && selectedEvent.includes(category.name.split(' ')[0]) ? 'border-yellow-500' : 'border-amber-700'} overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm hover:shadow transition-all duration-300 p-0.5`}>
                        <img 
                          src={category.image}
                          alt={category.name} 
                          className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-yellow-400 transition-all duration-300"></div>
                    </button>
                    <h3 className="mt-1 text-center font-medium text-gray-800 text-[10px] md:text-xs px-0.5 leading-tight line-clamp-2">
                      {category.name}
                    </h3>
                  </div>
                ))}
              </div>

              {selectedEvent && (
                <div className="text-center mt-1 md:mt-2">
                  <button
                    onClick={() => setSelectedEvent('')}
                    className="inline-flex items-center text-red-600 hover:text-red-800 text-[9px] md:text-xs font-medium"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Clear "{selectedEvent}" filter
                  </button>
                </div>
              )}
            </section>

            {/* Mobile Matrimony Card */}
            <div className="md:hidden mb-3 mt-2">
              <div className="bg-white rounded-md shadow-lg border-2 border-red-300 overflow-hidden max-w-[95%] mx-auto">
                <div className="flex h-28">
                  <div className="w-2/5 relative overflow-hidden">
                    <img
                      src={matrimonyBanner || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"}
                      alt="Eliteinova Matrimony"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="w-3/5 p-2 bg-gradient-to-r from-red-50 to-yellow-50 flex flex-col justify-center">
                    <h2 className="text-sm font-bold text-red-600 mb-1 leading-tight" style={{ fontFamily: "'Pacifico', cursive" }}>
                      Eliteinova Matrimony
                    </h2>
                    <h3 className="text-xs font-bold text-yellow-500 mb-1.5 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Find Your Perfect Partner
                    </h3>
                    <a 
                      href="https://eliteinovamatrimony.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-red-600 to-red-700 text-white py-1.5 px-2 rounded-md hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-sm hover:shadow-md text-[9px] font-bold flex items-center justify-center"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Register Now
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobile Filters - Below Matrimony Card */}
              <div className="mt-2 bg-white rounded-md shadow border border-red-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-2 py-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-bold text-white flex items-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      Filter
                    </h3>
                    <span className="text-[8px] bg-white/20 text-white px-1.5 py-0.5 rounded-full">
                      {currentMobileFilterPage + 1}/{mobileFilterPages.length}
                    </span>
                  </div>
                </div>

                <div className="p-2">
                  {/* Filter Content */}
                  {mobileFilterPages[currentMobileFilterPage].content}

                  {/* Pagination Buttons */}
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={prevMobileFilterPage}
                      disabled={currentMobileFilterPage === 0}
                      className={`px-2 py-0.5 text-[8px] font-medium rounded ${
                        currentMobileFilterPage === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      Prev
                    </button>
                    <button
                      onClick={nextMobileFilterPage}
                      disabled={currentMobileFilterPage === mobileFilterPages.length - 1}
                      className={`px-2 py-0.5 text-[8px] font-medium rounded ${
                        currentMobileFilterPage === mobileFilterPages.length - 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      Next
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1 mt-2 pt-1.5 border-t border-gray-200">
                    <button
                      onClick={handleFilter}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-1 px-1.5 rounded font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-sm text-[9px]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Apply
                      <span className="ml-1 bg-white/30 px-1 py-0.5 rounded text-[7px]">
                        {filteredVendors.length}
                      </span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 py-1 px-1.5 rounded font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-sm text-[9px]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Vendor Count & Applied Filters */}
            <div className="lg:hidden">
              <section className="py-1 md:py-2">
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-md shadow p-2 mb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-2">
                      <h3 className="text-xs font-bold text-white leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {selectedEvent ? `${filteredVendors.length} ${selectedEvent} Vendors` : `${filteredVendors.length} Invitation & Gift Vendors`}
                      </h3>
                      <p className="text-yellow-200 mt-0.5 text-[9px] leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {selectedEvent ? `Showing results for "${selectedEvent}"` : 'Browse our professional invitation & gift vendors'}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="bg-white/20 px-1.5 py-0.5 rounded mb-0.5">
                        <span className="text-white font-medium text-[8px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Price Range:</span>
                        <span className="text-yellow-300 ml-0.5 text-[8px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>₹40 - ₹1,00,000</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Applied Filters Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedEvent && (
                    <span className="inline-flex items-center bg-red-100 text-red-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Service: {selectedEvent}
                      <button onClick={() => setSelectedEvent('')} className="ml-0.5 text-red-500 hover:text-red-700">×</button>
                    </span>
                  )}
                  {selectedState && (
                    <span className="inline-flex items-center bg-yellow-100 text-yellow-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      State: {selectedState}
                      <button onClick={() => setSelectedState('')} className="ml-0.5 text-yellow-500 hover:text-yellow-700">×</button>
                    </span>
                  )}
                  {(minBudget || maxBudget) && (
                    <span className="inline-flex items-center bg-green-100 text-green-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Budget: {minBudget || '0'} - {maxBudget || '∞'}
                      <button onClick={() => { setMinBudget(''); setMaxBudget(''); }} className="ml-0.5 text-green-500 hover:text-green-700">×</button>
                    </span>
                  )}
                  {selectedServices.length > 0 && (
                    <span className="inline-flex items-center bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Services: {selectedServices.length}
                      <button onClick={() => setSelectedServices([])} className="ml-0.5 text-blue-500 hover:text-blue-700">×</button>
                    </span>
                  )}
                  {getActiveFilterCount() > 3 && (
                    <span className="inline-flex items-center bg-gray-100 text-gray-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      +{getActiveFilterCount() - 3} more
                    </span>
                  )}
                </div>
              </section>
            </div>

            {/* Desktop: Vendor Count */}
            <div className="hidden lg:block mb-4">
              <section className="py-2">
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {selectedEvent ? `${filteredVendors.length} ${selectedEvent} Vendors` : `${filteredVendors.length} Invitation & Gift Vendors`}
                      </h3>
                      <p className="text-yellow-200 mt-1 text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {selectedEvent ? `Showing results for "${selectedEvent}"` : 'Browse our professional invitation & gift vendors'}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="bg-white/20 px-3 py-1.5 rounded">
                        <span className="text-white font-medium text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Price Range:</span>
                        <span className="text-yellow-300 ml-1.5 font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>₹40 - ₹1,00,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedEvent && (
                      <span className="inline-flex items-center bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Service: {selectedEvent}
                        <button onClick={() => setSelectedEvent('')} className="ml-1 text-red-500 hover:text-red-700">×</button>
                      </span>
                    )}
                    {selectedState && (
                      <span className="inline-flex items-center bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        State: {selectedState}
                        <button onClick={() => setSelectedState('')} className="ml-1 text-yellow-500 hover:text-yellow-700">×</button>
                      </span>
                    )}
                    {(minBudget || maxBudget) && (
                      <span className="inline-flex items-center bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Budget: {minBudget || '0'} - {maxBudget || '∞'}
                        <button onClick={() => { setMinBudget(''); setMaxBudget(''); }} className="ml-1 text-green-500 hover:text-green-700">×</button>
                      </span>
                    )}
                    {selectedServices.length > 0 && (
                      <span className="inline-flex items-center bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Services: {selectedServices.length}
                        <button onClick={() => setSelectedServices([])} className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                      </span>
                    )}
                    {getActiveFilterCount() > 3 && (
                      <span className="inline-flex items-center bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        +{getActiveFilterCount() - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Vendor Profiles */}
            <section className="py-1 md:py-2 vendor-profiles vendor-card">
              {filteredVendors.length > 0 ? (
                <div className="space-y-2 md:space-y-4">
                  {filteredVendors.map((vendor) => (
                    <div key={vendor.id} className="bg-white rounded-md shadow border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      
                      {/* DESKTOP VIEW - FIXED HEIGHT [280px] */}
                      <div className="hidden md:flex md:flex-row w-full h-[280px]">
                        {/* Left Box - Image */}
                        <div className="w-[22%] p-0 flex items-stretch h-full">
                          <div className="w-full h-full overflow-hidden">
                            <img 
                              src={vendor.logo} 
                              alt={vendor.businessName} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Middle Box - Business Details */}
                        <div className="w-[43%] p-4 bg-white border-r border-gray-200 h-full overflow-y-auto">
                          {/* Title with Star Rating */}
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold text-red-800 pr-2 vendor-name" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
                              {vendor.businessName}
                            </h3>
                            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full flex-shrink-0">
                              <span className="text-yellow-700 font-bold mr-0.5 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{vendor.rating}</span>
                              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </div>

                          {/* Business Category */}
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                              {vendor.businessCategory}
                            </span>
                          </div>
                          
                          {/* Budget */}
                          <div className="text-red-700 font-bold text-base mb-3 price-tag" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.01em' }}>
                            <span className="font-semibold text-gray-600 mr-1.5 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Budget:</span>
                            {vendor.priceRange}
                          </div>
                          
                          {/* Location */}
                          <div className="text-gray-600 flex items-start text-sm mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            <svg className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="leading-tight font-medium">{vendor.location}</span>
                          </div>
                          
                          {/* Contact Details */}
                          <div className="space-y-1.5 text-sm">
                            <div className="flex items-start">
                              <span className="text-gray-600 font-semibold w-24 flex-shrink-0 contact-label" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Name:</span>
                              <span className="text-gray-800 leading-tight font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{vendor.personName}</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-gray-600 font-semibold w-24 flex-shrink-0 contact-label" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Role:</span>
                              <span className="text-gray-800 leading-tight font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{vendor.designation}</span>
                            </div>
                            {vendor.experience && (
                              <div className="flex items-start">
                                <span className="text-gray-600 font-semibold w-24 flex-shrink-0 contact-label" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Experience:</span>
                                <span className="text-gray-800 leading-tight font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{vendor.experience} years</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right Box - Description and Services */}
                        <div className="w-[35%] p-4 bg-white relative h-full overflow-y-auto">
                          {/* Description */}
                          <p className="text-gray-700 mb-3 text-sm leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: '1.5' }}>
                            {vendor.description}
                          </p>
                          
                          {/* Services Offered */}
                          <h4 className="font-bold text-red-700 mb-2 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.01em' }}>
                            Services Offered
                          </h4>
                          <ul className="space-y-1.5 mb-3">
                            {vendor.services.map((service, index) => (
                              <li key={index} className="flex items-start">
                                <svg className="w-4 h-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 text-sm leading-tight service-item" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}>
                                  {service}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {/* Additional Info Badges */}
                          <div className="flex flex-wrap gap-1 mb-3">
                            {vendor.minOrderQuantity > 0 && (
                              <span className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                                Min Qty: {vendor.minOrderQuantity}
                              </span>
                            )}
                            {vendor.giftMinOrder > 0 && (
                              <span className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full">
                                Gift Min: {vendor.giftMinOrder}
                              </span>
                            )}
                            {vendor.customizationAvailable === 'yes' && (
                              <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                                Customizable
                              </span>
                            )}
                          </div>

                          {/* View Details Button */}
                          <div className="mt-3">
                            <button 
                              onClick={() => handleViewDetails(vendor.id)}
                              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 px-3 rounded-md font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow hover:shadow-md flex items-center justify-center text-sm" 
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              <span>View Details</span>
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* MOBILE VIEW */}
                      <div className="md:hidden flex flex-col w-full">
                        {/* Top Section - Image and Details Side by Side */}
                        <div className="flex border-b border-gray-200">
                          {/* Left Box - Image ONLY */}
                          <div className="w-2/5 p-1.5 flex items-center justify-center bg-gradient-to-br from-red-50 to-yellow-50 border-r border-gray-200">
                            <div className="w-full aspect-square rounded-md overflow-hidden border border-white shadow-sm">
                              <img 
                                src={vendor.logo} 
                                alt={vendor.businessName} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Right Box - Business Details */}
                          <div className="w-3/5 p-1.5 bg-white">
                            {/* Title with Star Rating */}
                            <div className="flex items-start justify-between mb-0.5">
                              <h3 className="text-xs font-bold text-red-800 leading-tight line-clamp-2 pr-1">{vendor.businessName}</h3>
                              <div className="flex items-center bg-yellow-100 px-1.5 py-0.5 rounded-full flex-shrink-0">
                                <span className="text-yellow-700 font-bold mr-0.5 text-[10px]">{vendor.rating}</span>
                                <svg className="w-2.5 h-2.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                            </div>

                            {/* Budget below title */}
                            <p className="text-red-700 font-bold text-xs mb-1">{vendor.priceRange}</p>
                            
                            {/* Business Category */}
                            <span className="inline-block px-1.5 py-0.5 bg-red-100 text-red-700 rounded-full text-[10px] font-medium mb-1">
                              {vendor.businessCategory}
                            </span>
                            
                            {/* Location */}
                            <div className="text-gray-600 flex items-start text-[10px] mb-1">
                              <svg className="w-2.5 h-2.5 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="leading-tight">{vendor.location}</span>
                            </div>
                            
                            {/* Contact Details */}
                            <div className="space-y-0.5 text-[10px]">
                              <div className="flex items-start">
                                <span className="text-gray-600 font-bold w-16 flex-shrink-0">Name:</span>
                                <span className="text-gray-800 leading-tight">{vendor.personName}</span>
                              </div>
                              <div className="flex items-start">
                                <span className="text-gray-600 font-bold w-16 flex-shrink-0">Role:</span>
                                <span className="text-gray-800 leading-tight">{vendor.designation}</span>
                              </div>
                              {vendor.experience && (
                                <div className="flex items-start">
                                  <span className="text-gray-600 font-bold w-16 flex-shrink-0">Exp:</span>
                                  <span className="text-gray-800 leading-tight">{vendor.experience} years</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Bottom Section - Full Width Description and Services */}
                        <div className="w-full p-2 bg-white relative pb-10">
                          {/* Description */}
                          <p className="text-gray-700 mb-2 text-xs leading-relaxed">{vendor.description}</p>
                          
                          {/* Services Offered */}
                          <h4 className="font-bold text-red-700 mb-1.5 text-sm">Services Offered</h4>
                          <ul className="space-y-0.5 mb-2">
                            {vendor.services.map((service, index) => (
                              <li key={index} className="flex items-start">
                                <svg className="w-3 h-3 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 text-xs leading-tight">{service}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Additional Info Badges */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {vendor.minOrderQuantity > 0 && (
                              <span className="bg-blue-50 text-blue-700 text-[9px] px-1.5 py-0.5 rounded-full">
                                Min Qty: {vendor.minOrderQuantity}
                              </span>
                            )}
                            {vendor.giftMinOrder > 0 && (
                              <span className="bg-purple-50 text-purple-700 text-[9px] px-1.5 py-0.5 rounded-full">
                                Gift Min: {vendor.giftMinOrder}
                              </span>
                            )}
                            {vendor.customizationAvailable === 'yes' && (
                              <span className="bg-green-50 text-green-700 text-[9px] px-1.5 py-0.5 rounded-full">
                                Customizable
                              </span>
                            )}
                          </div>

                          {/* View Details Button in Right Bottom Corner */}
                          <div className="absolute bottom-2 right-2">
                            <button 
                              onClick={() => handleViewDetails(vendor.id)}
                              className="bg-gradient-to-r from-red-600 to-red-700 text-white py-1.5 px-3 rounded-md font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow hover:shadow-md flex items-center justify-center text-xs"
                            >
                              <span>View Details</span>
                              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-md shadow p-3 md:p-4 text-center">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-400 mx-auto mb-1.5 md:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xs md:text-base font-bold text-gray-700 mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>No Vendors Found</h3>
                  <p className="text-gray-600 mb-2 text-[10px] md:text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Try adjusting your filter criteria to find more vendors</p>
                  <button 
                    onClick={handleReset}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white py-1 md:py-1.5 px-2.5 md:px-3 rounded-md font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow hover:shadow-md text-xs"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </section>

            {/* Why Choose Us Section */}
            <section className="py-2 md:py-4">
              <h2 className="text-sm md:text-lg font-bold text-center text-red-800 mb-1.5 md:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Why Choose Our Invitation & Gift Services?
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 md:gap-2">
                <div className="bg-white p-1.5 md:p-3 rounded-md shadow border border-red-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-0.5 md:mb-2 mx-auto">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[9px] md:text-sm text-red-700 mb-0.5 md:mb-0.5 text-center">Creative Designs</h3>
                  <p className="text-gray-600 text-[8px] md:text-xs text-center leading-tight">Unique and personalized invitation designs</p>
                </div>
                
                <div className="bg-white p-1.5 md:p-3 rounded-md shadow border border-yellow-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center mb-0.5 md:mb-2 mx-auto">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[9px] md:text-sm text-red-700 mb-0.5 md:mb-0.5 text-center">Quick Delivery</h3>
                  <p className="text-gray-600 text-[8px] md:text-xs text-center leading-tight">Fast printing and delivery services</p>
                </div>
                
                <div className="bg-white p-1.5 md:p-3 rounded-md shadow border border-red-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-0.5 md:mb-2 mx-auto">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[9px] md:text-sm text-red-700 mb-0.5 md:mb-0.5 text-center">Premium Quality</h3>
                  <p className="text-gray-600 text-[8px] md:text-xs text-center leading-tight">High-quality materials and printing</p>
                </div>
                
                <div className="bg-white p-1.5 md:p-3 rounded-md shadow border border-yellow-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center mb-0.5 md:mb-2 mx-auto">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[9px] md:text-sm text-red-700 mb-0.5 md:mb-0.5 text-center">Affordable Prices</h3>
                  <p className="text-gray-600 text-[8px] md:text-xs text-center leading-tight">Competitive pricing with no hidden costs</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar - Filter Section - Desktop Only - WITH PAGINATION */}
          <div id="filter-section" className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-20 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-4">
              
              {/* Matrimony Registration Box */}
              <div className="bg-white rounded-lg shadow-lg border-2 border-red-300 overflow-hidden mt-2">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={matrimonyBanner}
                    alt="Eliteinova Matrimony"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80";
                    }}
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-2xl font-bold text-red-600 mb-1 text-center" style={{ fontFamily: "'Pacifico', cursive" }}>
                    Eliteinova Matrimony
                  </h2>
                  <h3 className="text-lg font-bold text-yellow-500 mb-4 text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Find Your Perfect Partner
                  </h3>
                  <a 
                    href="https://eliteinovamatrimony.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-md font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg text-base flex items-center justify-center"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Register Now
                  </a>
                  <p className="text-gray-500 text-xs text-center mt-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Redirects to eliteinovamatrimony.com
                  </p>
                </div>
              </div>

              {/* Filter Container with Pagination */}
              <div className="bg-white rounded-lg shadow-lg border border-red-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-red-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {filterPages[currentFilterPage].title}
                  </h3>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    {currentFilterPage + 1}/{filterPages.length}
                  </span>
                </div>

                {/* Filter Content */}
                {filterPages[currentFilterPage].content}

                {/* Pagination Buttons */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={prevFilterPage}
                    disabled={currentFilterPage === 0}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                      currentFilterPage === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextFilterPage}
                    disabled={currentFilterPage === filterPages.length - 1}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                      currentFilterPage === filterPages.length - 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    Next
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4 pt-3 border-t border-gray-200">
                  <button
                    onClick={handleFilter}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 px-3 rounded-md font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-sm hover:shadow-md text-sm"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Apply Filter
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 py-2.5 px-3 rounded-md font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-sm hover:shadow-md text-sm"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilterDrawer && (
        <div className="lg:hidden fixed inset-0 z-[9999] bg-black/50 flex items-end justify-center">
          <div className="bg-white w-full rounded-t-2xl max-h-[70vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 px-3 py-2 border-b border-gray-200 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-sm font-bold text-red-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {mobileFilterPages[currentMobileFilterPage].title}
                </h3>
                <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full mt-0.5 inline-block">
                  {currentMobileFilterPage + 1}/{mobileFilterPages.length}
                </span>
              </div>
              <button
                onClick={() => setShowMobileFilterDrawer(false)}
                className="text-gray-500 hover:text-red-700 p-1"
                aria-label="Close filter"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Filter Content */}
            <div className="px-3 py-2 space-y-2">
              {mobileFilterPages[currentMobileFilterPage].content}

              {/* Pagination Buttons */}
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={prevMobileFilterPage}
                  disabled={currentMobileFilterPage === 0}
                  className={`px-3 py-1 text-[9px] font-medium rounded ${
                    currentMobileFilterPage === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={nextMobileFilterPage}
                  disabled={currentMobileFilterPage === mobileFilterPages.length - 1}
                  className={`px-3 py-1 text-[9px] font-medium rounded ${
                    currentMobileFilterPage === mobileFilterPages.length - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  Next
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 pb-1 border-t border-gray-200 mt-2">
                <button
                  onClick={handleFilter}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-2 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-sm text-xs flex items-center justify-center"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Apply
                  <span className="ml-1 bg-white/30 px-1 py-0.5 rounded text-[8px]">
                    {filteredVendors.length}
                  </span>
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 py-2 px-2 rounded-lg font-bold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-sm text-xs"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vendor Details Modal */}
      <VendorDetails
        isOpen={showVendorDetails}
        onClose={() => {
          setShowVendorDetails(false);
          setSelectedVendor(null);
        }}
        vendor={selectedVendor}
        category="invitation"
      />
    </div>
  );
};

export default Invitation;