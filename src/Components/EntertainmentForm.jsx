'use client';

import React, { useState } from "react";
import { ArrowLeft, Music, Volume2, Upload, Globe, Banknote, X, Pen, Trash2, Link as LinkIcon, Image as ImageIcon, Users, Sparkles, DollarSign } from "lucide-react";

// Form steps based on entertainment details
const steps = [
  "Vendor Details",
  "Contact Info",
  "Business & Legal",
  "Event & Performance",
  "Equipment & Setup",
  "Manpower & Logistics",
  "Service Coverage",
  "Packages & Pricing",
  "Portfolio & Online",
  "Bank Details",
  "Declaration"
];

// Entertainment service types
const serviceTypes = [
  "DJ & Music",
  "Live Band / Orchestra",
  "Classical Music / Nadaswaram",
  "Dance Troupe",
  "MC / Anchor",
  "Celebrity Appearance",
  "Magic Show",
  "Games & Interactive Activities",
  "Sound & Light Systems"
];

// Event types covered
const eventTypes = [
  "Wedding",
  "Reception",
  "Engagement",
  "Sangeet / Mehendi",
  "Pre-Wedding Events",
  "Post-Wedding Events"
];

// Business types
const businessTypes = [
  "Individual",
  "Proprietorship",
  "Partnership",
  "Private Limited"
];

// Preferred locations
const locations = [
  "Local",
  "Within District",
  "Outstation"
];

export default function EntertainmentVendorRegistrationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = React.useRef(null);
  const [formData, setFormData] = useState({
    // Step 1
    vendorName: "",
    contactPerson: "",
    selectedServices: [],
    otherService: "",
    minBudget: "", // Added min budget
    maxBudget: "", // Added max budget
    
    // Step 2
    mobile: "",
    alternateMobile: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    
    // Step 3
    businessType: "",
    gstNumber: "",
    panNumber: "",
    experience: "",
    
    // Step 4
    selectedEvents: [],
    performanceDuration: "",
    customPerformances: "",
    
    // Step 5
    soundSystem: "",
    lightingSetup: "",
    ledEffects: "",
    powerRequirement: "",
    backupEquipment: "",
    
    // Step 6
    teamSize: "",
    uniformProvided: "",
    setupIncluded: "",
    
    // Step 7 - Service Coverage
    preferredLocations: [],
    travelCharges: "",
    noiseRestrictions: "",
    serviceOffers: "",
    performancePhotos: [],
    performanceLinks: [""],
    
    // Step 8
    basicPackage: "",
    premiumPackage: "",
    customCharges: "",
    advanceRequired: "",
    advanceAmount: "",
    overtimeCharges: "",
    
    // Step 9
    website: "",
    instagram: "",
    portfolioLink: "",
    
    // Step 10
    accountName: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
    
    // Step 11
    declaration: false
  });

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => {
      const services = [...prev.selectedServices];
      if (services.includes(service)) {
        return { ...prev, selectedServices: services.filter(s => s !== service) };
      } else {
        return { ...prev, selectedServices: [...services, service] };
      }
    });
  };

  const handleEventToggle = (event) => {
    setFormData(prev => {
      const events = [...prev.selectedEvents];
      if (events.includes(event)) {
        return { ...prev, selectedEvents: events.filter(e => e !== event) };
      } else {
        return { ...prev, selectedEvents: [...events, event] };
      }
    });
  };

  const handleLocationToggle = (location) => {
    setFormData(prev => {
      const locations = [...prev.preferredLocations];
      if (locations.includes(location)) {
        return { ...prev, preferredLocations: locations.filter(l => l !== location) };
      } else {
        return { ...prev, preferredLocations: [...locations, location] };
      }
    });
  };

  // Handle performance photos upload (simulated)
  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    if (files.length + formData.performancePhotos.length > 3) {
      alert("Maximum 3 photos allowed");
      return;
    }
    
    const newPhotos = Array.from(files).map(file => ({
      name: file.name,
      url: URL.createObjectURL(file), // Temporary URL for preview
      size: file.size
    }));
    
    setFormData(prev => ({
      ...prev,
      performancePhotos: [...prev.performancePhotos, ...newPhotos].slice(0, 3) // Limit to 3
    }));
  };

  // Remove a photo
  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      performancePhotos: prev.performancePhotos.filter((_, i) => i !== index)
    }));
  };

  // Handle performance links
  const handlePerformanceLinkChange = (index, value) => {
    setFormData(prev => {
      const newLinks = [...prev.performanceLinks];
      newLinks[index] = value;
      return { ...prev, performanceLinks: newLinks };
    });
  };

  // Add new link field
  const addPerformanceLink = () => {
    if (formData.performanceLinks.length < 5) { // Limit to 5 links
      setFormData(prev => ({
        ...prev,
        performanceLinks: [...prev.performanceLinks, ""]
      }));
    }
  };

  // Remove a link field
  const removePerformanceLink = (index) => {
    if (formData.performanceLinks.length > 1) {
      setFormData(prev => ({
        ...prev,
        performanceLinks: prev.performanceLinks.filter((_, i) => i !== index)
      }));
    }
  };

  // Signature drawing functions (same as photography form)
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#991B1B';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSubmit = () => {
    console.log("Entertainment form submitted:", formData);
    alert("Entertainment Vendor Registration submitted successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-24 sm:p-6 sm:items-center sm:pt-0">
      {/* Main modal container - Positioned lower on mobile */}
      <div className="bg-gradient-to-b from-red-50 to-yellow-50 w-full max-w-md rounded-2xl shadow-2xl flex flex-col border-2 border-red-200 h-[70vh] sm:h-[85vh] mt-4 sm:mt-0">
        
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 rounded-t-2xl flex items-center gap-2 px-4 py-3 shrink-0">
          <button 
            onClick={onClose} 
            className="shrink-0 text-yellow-200 hover:text-yellow-300 hover:scale-110 transition-transform duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="font-pacifico font-semibold text-sm text-yellow-50 truncate flex-1 text-center">
            Entertainment Vendor Registration
          </h2>
          <button 
            onClick={onClose} 
            className="shrink-0 text-yellow-200 hover:text-yellow-300 hover:scale-110 transition-transform duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Indicator */}
        <div className="bg-gradient-to-r from-red-600/90 to-red-700/90 px-4 py-3 shrink-0 overflow-x-auto">
          <div className="flex items-start justify-between min-w-max">
            {steps.map((s, i) => {
              // Split step name into two lines at natural break points
              const splitStepName = () => {
                const words = s.split(' ');
                if (words.length <= 2) return s;
                if (s.includes('&')) {
                  const parts = s.split(' & ');
                  return `${parts[0]}\n& ${parts[1]}`;
                }
                // Try to split after the first word
                return `${words[0]}\n${words.slice(1).join(' ')}`;
              };
              
              return (
                <div key={i} className="flex-1 flex flex-col items-center min-w-[65px] sm:min-w-[75px] px-0.5">
                  {/* Step Number */}
                  <div
                    className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-bold mb-1 ${
                      i <= step
                        ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-red-900 shadow-lg"
                        : "bg-red-800/50 text-yellow-100"
                    }`}
                  >
                    {i + 1}
                  </div>
                  
                  {/* Step Label */}
                  <div className="text-center w-full">
                    <p
                      className={`text-[9px] sm:text-[10px] font-medium leading-tight whitespace-pre-line ${
                        i === step
                          ? "text-yellow-300 font-semibold"
                          : "text-yellow-100/80"
                      }`}
                    >
                      {splitStepName()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-full mx-auto">
            {/* STEP 1: Vendor Details */}
            {step === 0 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  <Music className="inline w-4 h-4 mr-2" />
                  Vendor Basic Details
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Company / Vendor Name *</label>
                  <input 
                    name="vendorName"
                    value={formData.vendorName}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter company or vendor name" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Proprietor / Contact Person Name *</label>
                  <input 
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter proprietor or contact person name" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Type of Entertainment Services *</label>
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {serviceTypes.map(service => (
                        <label key={service} className="flex items-center gap-2 text-sm">
                          <input 
                            type="checkbox" 
                            checked={formData.selectedServices.includes(service)}
                            onChange={() => handleServiceToggle(service)}
                            className="w-4 h-4 accent-red-600" 
                          /> 
                          <span>{service}</span>
                        </label>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <label className="text-sm font-semibold whitespace-nowrap">Other:</label>
                      <input 
                        name="otherService"
                        value={formData.otherService}
                        onChange={handleInputChange}
                        className="input-field flex-1" 
                        placeholder="Specify other service" 
                      />
                    </div>
                  </div>
                </div>

                {/* BUDGET RANGE SECTION - ADDED HERE */}
                <div className="form-group mt-4 pt-2 border-t border-red-200">
                  <label className="form-label flex items-center gap-2">
                    <span>₹ Budget Range (Min - Max) *</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <input 
                        name="minBudget"
                        value={formData.minBudget}
                        onChange={handleInputChange}
                        className="input-field" 
                        placeholder="Min Budget (₹)" 
                        type="number"
                      />
                    </div>
                    <div>
                      <input 
                        name="maxBudget"
                        value={formData.maxBudget}
                        onChange={handleInputChange}
                        className="input-field" 
                        placeholder="Max Budget (₹)" 
                        type="number"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter your typical price range for entertainment services
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2: Contact Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  Contact Information
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input 
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter mobile number" 
                    type="tel"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Alternate Mobile Number</label>
                  <input 
                    name="alternateMobile"
                    value={formData.alternateMobile}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter alternate mobile number" 
                    type="tel"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email ID *</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter email address" 
                    type="email"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Office Address *</label>
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="input-field min-h-[80px]" 
                    placeholder="Enter office address" 
                    rows="3"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">City / District *</label>
                    <input 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter city" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <input 
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter state" 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">PIN Code *</label>
                  <input 
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter PIN code" 
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Business & Legal Details */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  Business & Legal Details
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Business Type *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {businessTypes.map(type => (
                      <label key={type} className="flex items-center gap-2 text-sm">
                        <input 
                          type="radio" 
                          name="businessType" 
                          value={type}
                          checked={formData.businessType === type}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-red-600" 
                        /> 
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">GST Number (if applicable)</label>
                  <input 
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter GST number" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">PAN Number *</label>
                  <input 
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter PAN number" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Years of Experience *</label>
                  <input 
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter years of experience" 
                    type="number"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: Event & Performance Details */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  <Sparkles className="inline w-4 h-4 mr-2" />
                  Event & Performance Details
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Events Covered *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {eventTypes.map(event => (
                      <label key={event} className="flex items-center gap-2 text-sm">
                        <input 
                          type="checkbox" 
                          checked={formData.selectedEvents.includes(event)}
                          onChange={() => handleEventToggle(event)}
                          className="w-4 h-4 accent-red-600" 
                        /> 
                        <span>{event}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Typical Performance Duration (Hours) *</label>
                  <input 
                    name="performanceDuration"
                    value={formData.performanceDuration}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter performance duration in hours" 
                    type="number"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Custom Performances Available *</label>
                  <div className="flex gap-4 text-sm">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="customPerformances" 
                        value="yes"
                        checked={formData.customPerformances === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="customPerformances" 
                        value="no"
                        checked={formData.customPerformances === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      No
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Equipment & Technical Setup */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  <Volume2 className="inline w-4 h-4 mr-2" />
                  Equipment & Technical Setup
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Sound System Provided *</label>
                  <div className="flex gap-4 text-sm">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="soundSystem" 
                        value="yes"
                        checked={formData.soundSystem === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="soundSystem" 
                        value="no"
                        checked={formData.soundSystem === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      No
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Lighting Setup Provided *</label>
                  <div className="flex gap-4 text-sm">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="lightingSetup" 
                        value="yes"
                        checked={formData.lightingSetup === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="lightingSetup" 
                        value="no"
                        checked={formData.lightingSetup === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      No
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">LED / Special Effects *</label>
                  <div className="flex gap-4 text-sm">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="ledEffects" 
                        value="yes"
                        checked={formData.ledEffects === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="ledEffects" 
                        value="no"
                        checked={formData.ledEffects === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      No
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Power Requirement (Watts)</label>
                  <input 
                    name="powerRequirement"
                    value={formData.powerRequirement}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter power requirement in watts" 
                    type="number"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Backup Equipment Available *</label>
                  <div className="flex gap-4 text-sm">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="backupEquipment" 
                        value="yes"
                        checked={formData.backupEquipment === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="backupEquipment" 
                        value="no"
                        checked={formData.backupEquipment === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      No
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: Manpower & Logistics */}
            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  <Users className="inline w-4 h-4 mr-2" />
                  Manpower & Logistics
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Number of Performers / Crew *</label>
                  <input 
                    name="teamSize"
                    value={formData.teamSize}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter number of performers or crew" 
                    type="number"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Uniform / Dress Code Provided *</label>
                  <div className="flex gap-4 text-sm">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="uniformProvided" 
                        value="yes"
                        checked={formData.uniformProvided === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="uniformProvided" 
                        value="no"
                        checked={formData.uniformProvided === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      No
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Setup & Dismantling Included *</label>
                  <div className="flex gap-4 text-sm">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="setupIncluded" 
                        value="yes"
                        checked={formData.setupIncluded === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="setupIncluded" 
                        value="no"
                        checked={formData.setupIncluded === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      No
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: Service Coverage */}
            {step === 6 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  Service Coverage
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Preferred Locations *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {locations.map(location => (
                      <label key={location} className="flex items-center gap-2 text-sm">
                        <input 
                          type="checkbox" 
                          checked={formData.preferredLocations.includes(location)}
                          onChange={() => handleLocationToggle(location)}
                          className="w-4 h-4 accent-red-600" 
                        /> 
                        {location}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Travel / Accommodation Charges Applicable *</label>
                  <div className="flex gap-4 text-sm">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="travelCharges" 
                        value="yes"
                        checked={formData.travelCharges === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="travelCharges" 
                        value="no"
                        checked={formData.travelCharges === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      No
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Noise / Time Restrictions Aware *</label>
                  <div className="flex gap-4 text-sm">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="noiseRestrictions" 
                        value="yes"
                        checked={formData.noiseRestrictions === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="noiseRestrictions" 
                        value="no"
                        checked={formData.noiseRestrictions === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      No
                    </label>
                  </div>
                </div>

                {/* Service Offers Section */}
                <div className="form-group">
                  <label className="form-label flex items-center gap-2">
                    <span className="text-sm">Special Service Offers / Description</span>
                    <span className="text-xs text-gray-500">(Optional)</span>
                  </label>
                  <div className="bg-white rounded-lg border border-red-200 p-3 shadow-sm">
                    <textarea 
                      name="serviceOffers"
                      value={formData.serviceOffers}
                      onChange={handleInputChange}
                      className="w-full h-32 text-sm resize-none focus:outline-none"
                      placeholder="Describe your special offers, unique performances, entertainment packages, or any additional information about your entertainment services. You can write in paragraphs or bullet points as per your preference."
                    />
                  </div>
                </div>

                {/* Photos Section */}
                <div className="form-group">
                  <label className="form-label flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    <span className="text-sm">Performance Photos</span>
                    <span className="text-xs text-gray-500">(Max 3)</span>
                  </label>
                  <div className="bg-white rounded-lg border border-red-200 p-3 shadow-sm">
                    {/* Upload area */}
                    <div className="border-2 border-dashed border-red-200 rounded-lg p-4 text-center mb-3">
                      <input
                        type="file"
                        id="performancePhotos"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <label htmlFor="performancePhotos" className="cursor-pointer flex flex-col items-center">
                        <Upload className="w-8 h-8 text-red-400 mb-2" />
                        <span className="text-sm text-gray-600">Click to upload photos</span>
                        <span className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB each</span>
                      </label>
                    </div>
                    
                    {/* Preview uploaded photos */}
                    {formData.performancePhotos.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Uploaded Photos ({formData.performancePhotos.length}/3)</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {formData.performancePhotos.map((photo, index) => (
                            <div key={index} className="relative group">
                              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                                <img 
                                  src={photo.url} 
                                  alt={photo.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                              <p className="text-xs text-gray-600 truncate mt-1">{photo.name}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Performance Links Section */}
                <div className="form-group">
                  <label className="form-label flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    <span className="text-sm">Performance Links / Portfolio</span>
                    <span className="text-xs text-gray-500">(Optional)</span>
                  </label>
                  <div className="bg-white rounded-lg border border-red-200 p-3 shadow-sm">
                    {formData.performanceLinks.map((link, index) => (
                      <div key={index} className="flex gap-2 mb-2 last:mb-0">
                        <input
                          type="url"
                          value={link}
                          onChange={(e) => handlePerformanceLinkChange(index, e.target.value)}
                          className="input-field flex-1 py-2"
                          placeholder="Enter link to your performance videos, portfolio, etc."
                        />
                        {formData.performanceLinks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePerformanceLink(index)}
                            className="bg-red-100 text-red-600 hover:bg-red-200 rounded-lg px-3 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    {formData.performanceLinks.length < 5 && (
                      <button
                        type="button"
                        onClick={addPerformanceLink}
                        className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                      >
                        <span>+ Add another link</span>
                        <span className="text-gray-500">({5 - formData.performanceLinks.length} remaining)</span>
                      </button>
                    )}
                    
                    <div className="text-xs text-gray-500 mt-3">
                      <p>• Add links to your performance videos, portfolio, or cloud storage</p>
                      <p>• Ensure links are publicly accessible</p>
                      <p>• You can add up to 5 links</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: Packages & Pricing */}
            {step === 7 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  <Banknote className="inline w-4 h-4 mr-2" />
                  Packages & Pricing
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Basic Package (₹) *</label>
                  <input 
                    name="basicPackage"
                    value={formData.basicPackage}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter basic package price" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Premium Package (₹) *</label>
                  <input 
                    name="premiumPackage"
                    value={formData.premiumPackage}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter premium package price" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Custom Event Charges (₹)</label>
                  <input 
                    name="customCharges"
                    value={formData.customCharges}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter custom event charges" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Advance Payment Required *</label>
                  <div className="flex gap-4 text-sm">
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="advanceRequired" 
                        value="yes"
                        checked={formData.advanceRequired === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      Yes
                    </label>
                    <label className="flex items-center gap-2">
                      <input 
                        type="radio" 
                        name="advanceRequired" 
                        value="no"
                        checked={formData.advanceRequired === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      No
                    </label>
                  </div>
                  
                  {formData.advanceRequired === "yes" && (
                    <input 
                      name="advanceAmount"
                      value={formData.advanceAmount}
                      onChange={handleInputChange}
                      className="input-field mt-3" 
                      placeholder="Enter advance % or amount" 
                    />
                  )}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Overtime Charges (if any)</label>
                  <input 
                    name="overtimeCharges"
                    value={formData.overtimeCharges}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter overtime charges" 
                  />
                </div>
              </div>
            )}

            {/* STEP 9: Portfolio & Online Presence */}
            {step === 8 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  <Globe className="inline w-4 h-4 mr-2" />
                  Portfolio & Online Presence
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Website / Portfolio Link</label>
                  <input 
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter website URL" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Instagram / Facebook Page</label>
                  <input 
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter social media handle" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">YouTube / Performance Video Link</label>
                  <input 
                    name="portfolioLink"
                    value={formData.portfolioLink}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter video portfolio link" 
                  />
                </div>
              </div>
            )}

            {/* STEP 10: Bank Details */}
            {step === 9 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  <Banknote className="inline w-4 h-4 mr-2" />
                  Bank Details (For Payments)
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Account Holder Name *</label>
                  <input 
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter account holder name" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Bank Name *</label>
                  <input 
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter bank name" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Account Number *</label>
                  <input 
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter account number" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">IFSC Code *</label>
                  <input 
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter IFSC code" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">UPI ID (Optional)</label>
                  <input 
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter UPI ID" 
                  />
                </div>
              </div>
            )}

            {/* STEP 11: Declaration */}
            {step === 10 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  Declaration
                </h3>
                
                <div className="bg-gradient-to-r from-red-100 to-yellow-50 rounded-lg p-4 border border-red-200">
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                    I hereby declare that the above information is true and correct. 
                    I agree to provide entertainment services professionally for marriage events 
                    as per agreed terms and conditions.
                  </p>
                  
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input 
                        type="checkbox" 
                        name="declaration"
                        checked={formData.declaration}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      />
                      <span className="font-semibold">I accept the terms and conditions *</span>
                    </label>
                    
                    <div className="form-group">
                      <label className="form-label flex items-center gap-2">
                        <Pen className="w-4 h-4" />
                        <span className="text-sm">Vendor Signature *</span>
                      </label>
                      <p className="text-xs text-gray-600 mb-2">Draw your signature in the box below</p>
                      <div className="relative">
                        <canvas
                          ref={canvasRef}
                          width={400}
                          height={120}
                          onMouseDown={startDrawing}
                          onMouseMove={draw}
                          onMouseUp={stopDrawing}
                          onMouseLeave={stopDrawing}
                          onTouchStart={(e) => {
                            e.preventDefault();
                            startDrawing(e);
                          }}
                          onTouchMove={(e) => {
                            e.preventDefault();
                            draw(e);
                          }}
                          onTouchEnd={stopDrawing}
                          className="signature-canvas"
                        />
                        <button
                          type="button"
                          onClick={clearSignature}
                          className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Date *</label>
                      <input 
                        className="input-field" 
                        placeholder="Select date" 
                        type="date"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Place *</label>
                      <input 
                        className="input-field" 
                        placeholder="Enter place" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex gap-3 p-4 border-t border-red-200 bg-gradient-to-r from-red-50 to-yellow-50 shrink-0 rounded-b-2xl">

          {step > 0 && (
            <button 
              className="btn-outline-red text-sm px-4 py-2" 
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          
          <button
            className="btn-primary-red ml-auto text-sm px-4 py-2"
            onClick={() => (step === 10 ? handleSubmit() : setStep(step + 1))}
            disabled={step === 10 && !formData.declaration}
          >
            {step === 10 ? "Submit Registration" : "Continue"}
          </button>
        </div>

      </div>

      <style jsx>{`
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .form-group:last-child {
          margin-bottom: 0;
        }
        
        .form-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: #991B1B;
          padding-left: 0.25rem;
        }
        
        .input-field {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1.5px solid #DC2626;
          border-radius: 0.75rem;
          font-size: 0.875rem;
          background: white;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .input-field:focus {
          outline: none;
          border-color: #B91C1C;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.2);
        }
        
        .input-field::placeholder {
          color: #9CA3AF;
          font-size: 0.875rem;
        }
        
        .btn-primary-red {
          background: linear-gradient(135deg, #DC2626, #B91C1C);
          color: white;
          font-weight: 600;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(220, 38, 38, 0.3);
          min-width: 120px;
        }
        
        .btn-primary-red:hover:not(:disabled) {
          background: linear-gradient(135deg, #B91C1C, #991B1B);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(220, 38, 38, 0.4);
        }
        
        .btn-primary-red:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .btn-outline-red {
          background: transparent;
          color: #DC2626;
          font-weight: 600;
          border: 1.5px solid #DC2626;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 100px;
        }
        
        .btn-outline-red:hover {
          background: #FEE2E2;
          transform: translateY(-2px);
          box-shadow: 0 2px 6px rgba(220, 38, 38, 0.2);
        }
        
        .signature-canvas {
          width: 100%;
          height: 120px;
          border: 1.5px solid #DC2626;
          border-radius: 0.75rem;
          background: white;
          cursor: crosshair;
          touch-action: none;
        }

        /* Custom scrollbar for the content area */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #FEE2E2;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #DC2626;
          border-radius: 3px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #B91C1C;
        }

        /* Responsive adjustments */
        @media (min-width: 640px) {
          .form-group {
            gap: 0.625rem;
            margin-bottom: 1.25rem;
          }
          
          .form-label {
            font-size: 1rem;
          }
          
          .input-field {
            padding: 0.875rem 1.125rem;
            font-size: 1rem;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
            border-radius: 0.875rem;
          }
          
          .input-field:focus {
            box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.2);
          }
          
          .input-field::placeholder {
            font-size: 1rem;
          }
          
          .signature-canvas {
            height: 140px;
            border-radius: 0.875rem;
          }
          
          .btn-primary-red {
            box-shadow: 0 3px 6px rgba(220, 38, 38, 0.3);
            min-width: 140px;
            border-radius: 0.875rem;
          }
          
          .btn-primary-red:hover:not(:disabled) {
            box-shadow: 0 6px 12px rgba(220, 38, 38, 0.4);
          }
          
          .btn-outline-red {
            box-shadow: 0 2px 6px rgba(220, 38, 38, 0.2);
            min-width: 120px;
            border-radius: 0.875rem;
          }
          
          .btn-outline-red:hover {
            box-shadow: 0 4px 8px rgba(220, 38, 38, 0.3);
          }
        }
      `}</style>
    </div>
  );
}