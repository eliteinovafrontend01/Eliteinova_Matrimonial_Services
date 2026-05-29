import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import matrimonyBanner from '../assets/Matrimonybanner.jpg'; 
import banner1 from '../assets/bgban.jpg';
import banner2 from '../assets/bgban2.jpg';
import verification from '../assets/verification.jpg';
import maritalStatus from '../assets/maritalStatus.jpg';
import criminalCheck from '../assets/criminalCheck.jpg';
import educationVerification from '../assets/educationVerification.jpg';
import employmentCheck from '../assets/employmentCheck.jpg';
import financialCheck from '../assets/financialCheck.jpg';
import familyBackground from '../assets/familyBackground.jpg';
import socialMediaCheck from '../assets/socialMediaCheck.jpg';
import VendorDetails from '../Components/VendorDetails';
import { backgroundInvestigationVendors } from '../data/backgroundInvestigationsData';

// Import images - add these to your assets folder
const detective1 = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
const detective2 = "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80";

const BackgroundInvestigationsPage = () => {
  const navigate = useNavigate();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showVendorDetails, setShowVendorDetails] = useState(false);
  
  // New filter states based on investigation form
  const [selectedServices, setSelectedServices] = useState([]);
  const [experience, setExperience] = useState('');
  const [licenseVerified, setLicenseVerified] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [preferredStates, setPreferredStates] = useState([]);
  const [hasTravelCharges, setHasTravelCharges] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [turnaroundTime, setTurnaroundTime] = useState('');
  const [reportFormat, setReportFormat] = useState('');
  
  // Filter navigation
  const [currentFilterPage, setCurrentFilterPage] = useState(0);
  const [currentMobileFilterPage, setCurrentMobileFilterPage] = useState(0);
  const [showMobileFilterDrawer, setShowMobileFilterDrawer] = useState(false);

  // Use the imported vendors data
  const agencies = backgroundInvestigationVendors;

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
      image: banner1,
      title: "Background Verification Services",
      subtitle: "Ensure Trust and Safety in Matrimony"
    },
    {
      id: 2,
      image: banner2,
      title: "Professional Detective Agencies",
      subtitle: "Comprehensive Background Checks"
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

  const investigationServices = [
    { 
      name: 'Identity Verification', 
      image: verification,
      description: 'Verify identity documents and personal details'
    },
    { 
      name: 'Marital Status Check', 
      image: maritalStatus,
      description: 'Verify current marital status and history'
    },
    { 
      name: 'Criminal Record Check', 
      image: criminalCheck,
      description: 'Check criminal records and legal history'
    },
    { 
      name: 'Education Verification', 
      image: educationVerification,
      description: 'Verify educational qualifications and certificates'
    },
    { 
      name: 'Employment Verification', 
      image: employmentCheck,
      description: 'Verify employment history and current job status'
    },
    { 
      name: 'Financial Background', 
      image: financialCheck,
      description: 'Check financial history and stability'
    },
    { 
      name: 'Family Background', 
      image: familyBackground,
      description: 'Investigate family history and reputation'
    },
    { 
      name: 'Social Media Screening', 
      image: socialMediaCheck,
      description: 'Analyze social media presence and activities'
    },
  ];

  const verificationServices = [
    "Identity Verification",
    "Marital Status Verification",
    "Divorce / Separation Check",
    "Family Background Check",
    "Residential Verification",
    "Education Verification",
    "Employment / Business Verification",
    "Financial Background (Non-banking)",
    "Criminal Record Check",
    "Court Case / Litigation Check",
    "Social Reputation Check",
    "Social Media Screening"
  ];

  const entityTypes = [
    "Proprietorship",
    "Partnership",
    "LLP",
    "Private Limited"
  ];

  const businessTypes = [
    "Proprietorship",
    "Partnership",
    "LLP",
    "Private Limited"
  ];

  const reportFormats = [
    "Digital Report",
    "Physical Certificate",
    "Both",
    "Online Dashboard"
  ];

  const turnaroundOptions = [
    "1-3 days",
    "4-7 days",
    "8-14 days",
    "15-30 days"
  ];

  const experienceOptions = [
    "5+ years",
    "10+ years", 
    "15+ years",
    "20+ years"
  ];

  const states = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Delhi', 'Gujarat', 'West Bengal'];
  const districts = {
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy', 'Kanyakumari', 'Tirunelveli'],
    'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam'],
    'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum'],
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    'Delhi': ['New Delhi', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar'],
    'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri', 'Asansol']
  };

  const handleServiceClick = (serviceName) => {
    setSelectedService(serviceName);
    
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        const vendorSection = document.querySelector('.vendor-profiles');
        if (vendorSection) {
          vendorSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleServiceToggle = (service) => {
    setSelectedServices(prev => {
      if (prev.includes(service)) {
        return prev.filter(s => s !== service);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleStateToggle = (state) => {
    setPreferredStates(prev => {
      if (prev.includes(state)) {
        return prev.filter(s => s !== state);
      } else {
        return [...prev, state];
      }
    });
  };

  const handleViewDetails = (vendorId) => {
    const vendor = agencies.find(v => v.id === vendorId);
    if (vendor) {
      setSelectedVendor(vendor);
      setShowVendorDetails(true);
    }
  };

  // Filter agencies based on all selections
  const filteredAgencies = agencies.filter(agency => {
    // Basic filters
    if (selectedService && !agency.services.includes(selectedService) && !agency.selectedServices?.includes(selectedService)) return false;
    if (selectedState && !agency.location.includes(selectedState)) return false;
    if (selectedDistrict && !agency.location.includes(selectedDistrict)) return false;
    if (selectedLocation && !agency.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
    
    // Budget filter
    if (minBudget || maxBudget) {
      const minPrice = parseInt(minBudget) || 0;
      const maxPrice = parseInt(maxBudget) || Infinity;
      const agencyMinPrice = parseInt(agency.priceRange.replace(/[^0-9]/g, '').split('-')[0]) || 0;
      if (agencyMinPrice < minPrice || agencyMinPrice > maxPrice) return false;
    }
    
    // Search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        agency.name.toLowerCase().includes(query) ||
        agency.businessName.toLowerCase().includes(query) ||
        agency.description.toLowerCase().includes(query) ||
        agency.services.some(service => service.toLowerCase().includes(query))
      );
    }
    
    // Service types filter
    if (selectedServices.length > 0) {
      if (!agency.selectedServices && !agency.services) return false;
      const agencyServices = agency.selectedServices || agency.services;
      const hasMatchingService = selectedServices.some(service => 
        agencyServices.includes(service)
      );
      if (!hasMatchingService) return false;
    }
    
    // Experience filter
    if (experience) {
      const expValue = parseInt(experience) || 0;
      if (agency.yearsExperience < expValue) return false;
    }
    
    // License verified filter
    if (licenseVerified === 'yes') {
      if (!agency.licenseNumber) return false;
    }
    
    // Team size filter
    if (teamSize) {
      const minTeam = parseInt(teamSize) || 0;
      if (agency.teamSize < minTeam) return false;
    }
    
    // Preferred states filter
    if (preferredStates.length > 0) {
      if (!agency.preferredStates) return false;
      const hasMatchingState = preferredStates.some(state => 
        agency.preferredStates.includes(state)
      );
      if (!hasMatchingState) return false;
    }
    
    // Travel charges filter
    if (hasTravelCharges && agency.hasTravelCharges !== hasTravelCharges) return false;
    
    // Business type filter
    if (businessType && agency.businessType !== businessType) return false;
    
    // Turnaround time filter
    if (turnaroundTime && agency.turnaroundTime !== turnaroundTime) return false;
    
    // Report format filter
    if (reportFormat && agency.reportFormat !== reportFormat) return false;
    
    return true;
  });

  // Desktop filter pages
  const filterPages = [
    {
      title: "Agency Details",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Type of Entity</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            >
              <option value="">All Types</option>
              {entityTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Year of Establishment</label>
            <input
              type="number"
              placeholder="YYYY"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1"> ₹ Budget Range (Min - Max) </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
                className="w-1/2 px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                className="w-1/2 px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "License & Legal",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">License Verified</label>
            <div className="flex gap-3 text-xs">
              <label className="flex items-center gap-1">
                <input 
                  type="radio" 
                  name="licenseVerified" 
                  value="yes"
                  checked={licenseVerified === "yes"}
                  onChange={(e) => setLicenseVerified(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600" 
                /> 
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input 
                  type="radio" 
                  name="licenseVerified" 
                  value="no"
                  checked={licenseVerified === "no"}
                  onChange={(e) => setLicenseVerified(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600" 
                /> 
                No
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">State(s) of Operation</label>
            <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto p-1 border border-red-100 rounded-md">
              {states.map(state => (
                <label key={state} className="flex items-center gap-1 text-xs">
                  <input 
                    type="checkbox" 
                    checked={preferredStates.includes(state)}
                    onChange={() => handleStateToggle(state)}
                    className="w-3.5 h-3.5 accent-red-600" 
                  /> 
                  {state}
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Office Location",
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
            <label className="block text-xs font-bold text-gray-700 mb-1">District / City</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs disabled:bg-gray-100 disabled:text-gray-500"
            >
              <option value="">All Districts</option>
              {selectedState && districts[selectedState]?.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>
      )
    },
    {
      title: "Services Offered",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Matrimonial Verification Checks </label>
            <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto p-1 border border-red-100 rounded-md">
              {verificationServices.map(service => (
                <label key={service} className="flex items-center gap-1 text-xs">
                  <input 
                    type="checkbox" 
                    checked={selectedServices.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="w-3.5 h-3.5 accent-red-600" 
                  /> 
                  <span className="truncate">{service.length > 15 ? service.substring(0, 15) + '...' : service}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Cities / Regions Covered</label>
            <input
              type="text"
              placeholder="Enter cities covered"
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            />
          </div>
        </div>
      )
    },
    {
      title: "Operational Capability",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Number of Field Investigators</label>
            <input
              type="number"
              placeholder="Min investigators"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Average Turnaround Time</label>
            <select
              value={turnaroundTime}
              onChange={(e) => setTurnaroundTime(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            >
              <option value="">Any Timeline</option>
              {turnaroundOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Years of Experience in Matrimonial Verification</label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            >
              <option value="">Any Experience</option>
              {experienceOptions.map(option => (
                <option key={option} value={option.replace('+', '')}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        </div>

        
      )
    }
  ];

  // Mobile filter pages
  const mobileFilterPages = [
    {
      title: "Agency Details",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Type of Entity</label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            >
              <option value="">All Types</option>
              {entityTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Year of Establishment</label>
            <input
              type="number"
              placeholder="YYYY"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">₹ Budget Range (Min - Max) </label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
                className="w-1/2 px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                className="w-1/2 px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
              />
            </div>
          </div>
        </div>
      )
    },
    {
      title: "License & Legal",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">License Verified</label>
            <div className="flex gap-3 text-xs">
              <label className="flex items-center gap-1">
                <input 
                  type="radio" 
                  name="licenseVerifiedMobile" 
                  value="yes"
                  checked={licenseVerified === "yes"}
                  onChange={(e) => setLicenseVerified(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600" 
                /> 
                Yes
              </label>
              <label className="flex items-center gap-1">
                <input 
                  type="radio" 
                  name="licenseVerifiedMobile" 
                  value="no"
                  checked={licenseVerified === "no"}
                  onChange={(e) => setLicenseVerified(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600" 
                /> 
                No
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">State(s) of Operation</label>
            <div className="grid grid-cols-2 gap-1.5 max-h-32 overflow-y-auto p-1 border border-red-100 rounded-md">
              {states.slice(0, 8).map(state => (
                <label key={state} className="flex items-center gap-1 text-xs">
                  <input 
                    type="checkbox" 
                    checked={preferredStates.includes(state)}
                    onChange={() => handleStateToggle(state)}
                    className="w-3.5 h-3.5 accent-red-600" 
                  /> 
                  {state}
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Office Location",
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
            <label className="block text-xs font-bold text-gray-700 mb-1">District / City</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs disabled:bg-gray-100 disabled:text-gray-500"
            >
              <option value="">All Districts</option>
              {selectedState && districts[selectedState]?.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>
      )
    },
    {
      title: "Services",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Verification Services</label>
            <div className="grid grid-cols-2 gap-1.5 max-h-40 overflow-y-auto p-1 border border-red-100 rounded-md">
              {verificationServices.slice(0, 8).map(service => (
                <label key={service} className="flex items-center gap-1 text-xs">
                  <input 
                    type="checkbox" 
                    checked={selectedServices.includes(service)}
                    onChange={() => handleServiceToggle(service)}
                    className="w-3.5 h-3.5 accent-red-600" 
                  /> 
                  <span className="truncate">{service.split(' ')[0]}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Cities Covered</label>
            <input
              type="text"
              placeholder="Enter cities"
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            />
          </div>
        </div>
      )
    },
    {
      title: "Operational",
      content: (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Field Investigators</label>
            <input
              type="number"
              placeholder="Min investigators"
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Turnaround Time</label>
            <select
              value={turnaroundTime}
              onChange={(e) => setTurnaroundTime(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            >
              <option value="">Any</option>
              {turnaroundOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Years of Experience in Matrimonial Verification </label>
            <select
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            >
              <option value="">Any</option>
              {experienceOptions.map(option => (
                <option key={option} value={option.replace('+', '')}>{option}</option>
              ))}
            </select>
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
    console.log('Filtering...', filteredAgencies.length);
    setShowMobileFilterDrawer(false);
    setShowMobileFilter(false);
    
    // Scroll to agency section after applying filters
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
    setSelectedService('');
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedLocation('');
    setSearchQuery('');
    setSelectedServices([]);
    setExperience('');
    setLicenseVerified('');
    setTeamSize('');
    setPreferredStates([]);
    setHasTravelCharges('');
    setBusinessType('');
    setTurnaroundTime('');
    setReportFormat('');
    setCurrentFilterPage(0);
    setCurrentMobileFilterPage(0);
    setShowMobileFilterDrawer(false);
    setShowMobileFilter(false);
  };

  const handleFilterButtonClick = () => {
    if (window.location.pathname === '/background-investigations') {
      const filterSection = document.getElementById('filter-section');
      if (filterSection) {
        filterSection.scrollIntoView({ behavior: 'smooth' });
      }
      if (window.innerWidth < 1024) {
        setShowMobileFilterDrawer(true);
      }
    } else {
      navigate('/background-investigations?openFilter=true');
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

  // Function to handle agency registration
  const handleAgencyRegistration = () => {
    const event = new CustomEvent('openVendorForm', { 
      detail: { formType: 'background-investigations' } 
    });
    window.dispatchEvent(event);
    localStorage.setItem('openVendorForm', 'background-investigations');
    window.location.href = '/?openForm=background-investigations';
  };

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (minBudget) count++;
    if (maxBudget) count++;
    if (selectedService) count++;
    if (selectedState) count++;
    if (selectedDistrict) count++;
    if (selectedLocation) count++;
    if (searchQuery) count++;
    if (selectedServices.length > 0) count++;
    if (experience) count++;
    if (licenseVerified) count++;
    if (teamSize) count++;
    if (preferredStates.length > 0) count++;
    if (hasTravelCharges) count++;
    if (businessType) count++;
    if (turnaroundTime) count++;
    if (reportFormat) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50">
      {/* Google Fonts */}
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
            {/* Investigation Services */}
            <section className="py-2 md:py-3">
              <h2 className="text-sm md:text-lg font-bold text-center text-red-800 mb-1 md:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Our Background Investigation Services
              </h2>
              
              {/* Mobile: Horizontal Scroll */}
              <div className="md:hidden overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex space-x-1 px-1 min-w-max">
                  {investigationServices.map((service) => (
                    <div key={service.name} className="flex flex-col items-center group flex-shrink-0 w-14">
                      <button 
                        onClick={() => handleServiceClick(service.name)}
                        className="relative block w-12 h-12 mx-auto focus:outline-none"
                      >
                        <div className={`w-full h-full rounded-full border ${selectedService === service.name ? 'border-yellow-500' : 'border-amber-700'} overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm hover:shadow transition-all duration-300 p-0.5`}>
                          <img 
                            src={service.image}
                            alt={service.name} 
                            className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-yellow-400 transition-all duration-300"></div>
                      </button>
                      <h3 className="mt-0.5 text-center font-medium text-gray-800 text-[7px] px-0.5 leading-tight line-clamp-2">
                        {service.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Desktop: Grid */}
              <div className="hidden md:grid grid-cols-4 md:grid-cols-8 gap-1 md:gap-1.5 px-1">
                {investigationServices.map((service) => (
                  <div key={service.name} className="flex flex-col items-center group">
                    <button 
                      onClick={() => handleServiceClick(service.name)}
                      className="relative block w-full aspect-square max-w-[60px] md:max-w-[65px] mx-auto focus:outline-none"
                    >
                      <div className={`w-full h-full rounded-full border ${selectedService === service.name ? 'border-yellow-500' : 'border-amber-700'} overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm hover:shadow transition-all duration-300 p-0.5`}>
                        <img 
                          src={service.image}
                          alt={service.name} 
                          className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-yellow-400 transition-all duration-300"></div>
                    </button>
                    <h3 className="mt-1 text-center font-medium text-gray-800 text-[10px] md:text-xs px-0.5 leading-tight line-clamp-2">
                      {service.name}
                    </h3>
                  </div>
                ))}
              </div>

              {selectedService && (
                <div className="text-center mt-1 md:mt-2">
                  <button
                    onClick={() => setSelectedService('')}
                    className="inline-flex items-center text-red-600 hover:text-red-800 text-[9px] md:text-xs font-medium"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Clear "{selectedService}" filter
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
                        {filteredAgencies.length}
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

            {/* Search Bar */}
            <section className="py-1 md:py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search detective agencies, services, or locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </section>

            {/* Mobile: Agency Count & Applied Filters */}
            <div className="lg:hidden">
              <section className="py-1 md:py-2">
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-md shadow p-2 mb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-2">
                      <h3 className="text-xs font-bold text-white leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {selectedService ? `${filteredAgencies.length} ${selectedService} Agencies` : `${filteredAgencies.length} Detective Agencies`}
                      </h3>
                      <p className="text-yellow-200 mt-0.5 text-[9px] leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {selectedService ? `Showing results for "${selectedService}"` : 'Professional background investigation services'}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="bg-white/20 px-1.5 py-0.5 rounded mb-0.5">
                        <span className="text-white font-medium text-[8px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Price Range:</span>
                        <span className="text-yellow-300 ml-0.5 text-[8px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>₹7,000 - ₹80,000</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Applied Filters Tags */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedService && (
                    <span className="inline-flex items-center bg-red-100 text-red-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Service: {selectedService}
                      <button onClick={() => setSelectedService('')} className="ml-0.5 text-red-500 hover:text-red-700">×</button>
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
                  {searchQuery && (
                    <span className="inline-flex items-center bg-purple-100 text-purple-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Search: {searchQuery}
                      <button onClick={() => setSearchQuery('')} className="ml-0.5 text-purple-500 hover:text-purple-700">×</button>
                    </span>
                  )}
                  {selectedServices.length > 0 && (
                    <span className="inline-flex items-center bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Services: {selectedServices.length}
                      <button onClick={() => setSelectedServices([])} className="ml-0.5 text-blue-500 hover:text-blue-700">×</button>
                    </span>
                  )}
                  {experience && (
                    <span className="inline-flex items-center bg-indigo-100 text-indigo-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Estd: {experience}
                      <button onClick={() => setExperience('')} className="ml-0.5 text-indigo-500 hover:text-indigo-700">×</button>
                    </span>
                  )}
                  {businessType && (
                    <span className="inline-flex items-center bg-pink-100 text-pink-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Business: {businessType}
                      <button onClick={() => setBusinessType('')} className="ml-0.5 text-pink-500 hover:text-pink-700">×</button>
                    </span>
                  )}
                  {turnaroundTime && (
                    <span className="inline-flex items-center bg-teal-100 text-teal-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Turnaround: {turnaroundTime}
                      <button onClick={() => setTurnaroundTime('')} className="ml-0.5 text-teal-500 hover:text-teal-700">×</button>
                    </span>
                  )}
                  {getActiveFilterCount() > 5 && (
                    <span className="inline-flex items-center bg-gray-100 text-gray-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      +{getActiveFilterCount() - 5} more
                    </span>
                  )}
                </div>
              </section>
            </div>

            {/* Desktop: Agency Count */}
            <div className="hidden lg:block mb-4">
              <section className="py-2">
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {selectedService ? `${filteredAgencies.length} ${selectedService} Agencies` : `${filteredAgencies.length} Detective Agencies`}
                      </h3>
                      <p className="text-yellow-200 mt-1 text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {selectedService ? `Showing results for "${selectedService}"` : 'Professional background investigation services'}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="bg-white/20 px-3 py-1.5 rounded">
                        <span className="text-white font-medium text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Price Range:</span>
                        <span className="text-yellow-300 ml-1.5 font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>₹7,000 - ₹80,000</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedService && (
                      <span className="inline-flex items-center bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Service: {selectedService}
                        <button onClick={() => setSelectedService('')} className="ml-1 text-red-500 hover:text-red-700">×</button>
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
                    {searchQuery && (
                      <span className="inline-flex items-center bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Search: {searchQuery}
                        <button onClick={() => setSearchQuery('')} className="ml-1 text-purple-500 hover:text-purple-700">×</button>
                      </span>
                    )}
                    {selectedServices.length > 0 && (
                      <span className="inline-flex items-center bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Services: {selectedServices.length}
                        <button onClick={() => setSelectedServices([])} className="ml-1 text-blue-500 hover:text-blue-700">×</button>
                      </span>
                    )}
                    {experience && (
                      <span className="inline-flex items-center bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Estd: {experience}
                        <button onClick={() => setExperience('')} className="ml-1 text-indigo-500 hover:text-indigo-700">×</button>
                      </span>
                    )}
                    {businessType && (
                      <span className="inline-flex items-center bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Business: {businessType}
                        <button onClick={() => setBusinessType('')} className="ml-1 text-pink-500 hover:text-pink-700">×</button>
                      </span>
                    )}
                    {turnaroundTime && (
                      <span className="inline-flex items-center bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Turnaround: {turnaroundTime}
                        <button onClick={() => setTurnaroundTime('')} className="ml-1 text-teal-500 hover:text-teal-700">×</button>
                      </span>
                    )}
                    {getActiveFilterCount() > 5 && (
                      <span className="inline-flex items-center bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        +{getActiveFilterCount() - 5} more
                      </span>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Agency Profiles */}
            <section className="py-1 md:py-2 vendor-profiles vendor-card">
              {filteredAgencies.length > 0 ? (
                <div className="space-y-2 md:space-y-4">
                  {filteredAgencies.map((agency) => (
                    <div key={agency.id} className="bg-white rounded-md shadow border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      
                      {/* DESKTOP VIEW */}
                      <div className="hidden md:flex md:flex-row w-full h-[280px]">
                        {/* Left Box - Image */}
                        <div className="w-[22%] p-0 flex items-stretch h-full">
                          <div className="w-full h-full overflow-hidden">
                            <img 
                              src={agency.logo} 
                              alt={agency.businessName} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Middle Box - Business Details */}
                        <div className="w-[43%] p-4 bg-white border-r border-gray-200 h-full overflow-y-auto">
                          {/* Title with Star Rating */}
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold text-red-800 pr-2 vendor-name" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
                              {agency.businessName}
                            </h3>
                            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full flex-shrink-0">
                              <span className="text-yellow-700 font-bold mr-0.5 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{agency.rating}</span>
                              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </div>

                          {/* Business Category */}
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                              {agency.serviceType}
                            </span>
                          </div>
                          
                          {/* Budget */}
                          <div className="text-red-700 font-bold text-base mb-3 price-tag" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.01em' }}>
                            <span className="font-semibold text-gray-600 mr-1.5 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Budget:</span>
                            {agency.priceRange}
                          </div>
                          
                          {/* Location */}
                          <div className="text-gray-600 flex items-start text-sm mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            <svg className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="leading-tight font-medium">{agency.location}</span>
                          </div>
                          
                          {/* Contact Details - Only business info, no personal */}
                          <div className="space-y-1.5 text-sm">
                            <div className="flex items-start">
                              <span className="text-gray-600 font-semibold w-24 flex-shrink-0 contact-label" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Experience:</span>
                              <span className="text-gray-800 leading-tight font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{agency.yearsExperience} years</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-gray-600 font-semibold w-24 flex-shrink-0 contact-label" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>License:</span>
                              <span className="text-gray-800 leading-tight font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{agency.licenseNumber}</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-gray-600 font-semibold w-24 flex-shrink-0 contact-label" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Business Type:</span>
                              <span className="text-gray-800 leading-tight font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{agency.businessType}</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Box - Description and Services */}
                        <div className="w-[35%] p-4 bg-white relative h-full overflow-y-auto">
                          {/* Description */}
                          <p className="text-gray-700 mb-3 text-sm leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: '1.5' }}>
                            {agency.description}
                          </p>
                          
                          {/* Services Offered */}
                          <h4 className="font-bold text-red-700 mb-2 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.01em' }}>
                            Services Offered
                          </h4>
                          <ul className="space-y-1.5 mb-3">
                            {(agency.services || agency.selectedServices || []).slice(0, 4).map((service, index) => (
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

                          {/* View Details Button */}
                          <div className="mt-3">
                            <button 
                              onClick={() => handleViewDetails(agency.id)}
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
                                src={agency.logo} 
                                alt={agency.businessName} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Right Box - Business Details */}
                          <div className="w-3/5 p-1.5 bg-white">
                            {/* Title with Star Rating */}
                            <div className="flex items-start justify-between mb-0.5">
                              <h3 className="text-xs font-bold text-red-800 leading-tight line-clamp-2 pr-1">{agency.businessName}</h3>
                              <div className="flex items-center bg-yellow-100 px-1.5 py-0.5 rounded-full flex-shrink-0">
                                <span className="text-yellow-700 font-bold mr-0.5 text-[10px]">{agency.rating}</span>
                                <svg className="w-2.5 h-2.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                            </div>

                            {/* Budget below title */}
                            <p className="text-red-700 font-bold text-xs mb-1">{agency.priceRange}</p>
                            
                            {/* Business Category */}
                            <span className="inline-block px-1.5 py-0.5 bg-red-100 text-red-700 rounded-full text-[10px] font-medium mb-1">
                              {agency.serviceType}
                            </span>
                            
                            {/* Location */}
                            <div className="text-gray-600 flex items-start text-[10px] mb-1">
                              <svg className="w-2.5 h-2.5 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="leading-tight">{agency.location}</span>
                            </div>
                            
                            {/* Contact Details - Only business info, no personal */}
                            <div className="space-y-0.5 text-[10px]">
                              <div className="flex items-start">
                                <span className="text-gray-600 font-bold w-16 flex-shrink-0">Experience:</span>
                                <span className="text-gray-800 leading-tight">{agency.yearsExperience} years</span>
                              </div>
                              <div className="flex items-start">
                                <span className="text-gray-600 font-bold w-16 flex-shrink-0">License:</span>
                                <span className="text-gray-800 leading-tight">{agency.licenseNumber}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Section - Full Width Description and Services */}
                        <div className="w-full p-2 bg-white relative pb-10">
                          {/* Description */}
                          <p className="text-gray-700 mb-2 text-xs leading-relaxed">{agency.description}</p>
                          
                          {/* Services Offered */}
                          <h4 className="font-bold text-red-700 mb-1.5 text-sm">Services Offered</h4>
                          <ul className="space-y-0.5 mb-1">
                            {(agency.services || agency.selectedServices || []).map((service, index) => (
                              <li key={index} className="flex items-start">
                                <svg className="w-3 h-3 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 text-xs leading-tight">{service}</span>
                              </li>
                            ))}
                          </ul>

                          {/* View Details Button in Right Bottom Corner */}
                          <div className="absolute bottom-2 right-2">
                            <button 
                              onClick={() => handleViewDetails(agency.id)}
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
                  <h3 className="text-xs md:text-base font-bold text-gray-700 mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>No Agencies Found</h3>
                  <p className="text-gray-600 mb-2 text-[10px] md:text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Try adjusting your filter criteria to find more agencies</p>
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

            {/* Register Agency Button */}
            <section className="py-2 md:py-4 text-center">
              <div className="bg-gradient-to-r from-red-50 to-yellow-50 rounded-lg shadow border border-red-200 p-4 md:p-6">
                <h2 className="text-sm md:text-lg font-bold text-red-800 mb-2">Are You a Detective Agency?</h2>
                <p className="text-gray-700 text-xs md:text-sm mb-4">Join our platform and connect with customers looking for background verification services</p>
                <button
                  onClick={handleAgencyRegistration}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 px-6 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Register Your Agency
                </button>
              </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-2 md:py-4">
              <h2 className="text-sm md:text-lg font-bold text-center text-red-800 mb-1.5 md:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Why Choose Our Background Verification Services?
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 md:gap-2">
                <div className="bg-white p-1.5 md:p-3 rounded-md shadow border border-red-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-0.5 md:mb-2 mx-auto">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[9px] md:text-sm text-red-700 mb-0.5 md:mb-0.5 text-center">Confidential</h3>
                  <p className="text-gray-600 text-[8px] md:text-xs text-center leading-tight">100% confidential and secure investigations</p>
                </div>
                
                <div className="bg-white p-1.5 md:p-3 rounded-md shadow border border-yellow-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center mb-0.5 md:mb-2 mx-auto">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[9px] md:text-sm text-red-700 mb-0.5 md:mb-0.5 text-center">Fast Turnaround</h3>
                  <p className="text-gray-600 text-[8px] md:text-xs text-center leading-tight">Quick and efficient background checks</p>
                </div>
                
                <div className="bg-white p-1.5 md:p-3 rounded-md shadow border border-red-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-0.5 md:mb-2 mx-auto">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[9px] md:text-sm text-red-700 mb-0.5 md:mb-0.5 text-center">Professional Team</h3>
                  <p className="text-gray-600 text-[8px] md:text-xs text-center leading-tight">Experienced investigators and verifiers</p>
                </div>
                
                <div className="bg-white p-1.5 md:p-3 rounded-md shadow border border-yellow-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center mb-0.5 md:mb-2 mx-auto">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[9px] md:text-sm text-red-700 mb-0.5 md:mb-0.5 text-center">Verified Agencies</h3>
                  <p className="text-gray-600 text-[8px] md:text-xs text-center leading-tight">All agencies are licensed and verified</p>
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
                    {filteredAgencies.length}
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
        category="background-investigations"
      />
    </div>
  );
};

export default BackgroundInvestigationsPage;