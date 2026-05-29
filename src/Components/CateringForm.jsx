'use client';

import React, { useState } from "react";
import { ArrowLeft, Utensils, Banknote, X, Pen, Trash2, Upload, Image as ImageIcon, Link as LinkIcon, DollarSign } from "lucide-react";

// Form steps for catering services
const steps = [
  "Vendor Details",
  "Contact Info",
  "Business & Legal",
  "Cuisine & Menu",
  "Capacity & Service",
  "Pricing Details",
  "Hygiene & Quality",
  "Service Coverage",
  "Experience & References",
  "Bank Details",
  "Declaration"
];

// Catering types
const cateringTypes = [
  "Vegetarian",
  "Non-Vegetarian",
  "Both",
  "Jain Food",
  "Continental"
];

// Business types
const businessTypes = [
  "Individual",
  "Proprietorship",
  "Partnership",
  "Private Limited"
];

// Cuisines offered
const cuisines = [
  "South Indian",
  "North Indian",
  "Chinese",
  "Continental",
  "Arabic"
];

// Special menus available
const specialMenus = [
  "Wedding Feast",
  "Reception",
  "Engagement",
  "Sangeet / Mehendi",
  "Buffet",
  "Live Counters"
];

// Service types
const serviceTypes = [
  "Buffet",
  "Banana Leaf Service",
  "Table Service"
];

// Preferred locations
const locations = [
  "Local",
  "Within District",
  "Outstation"
];

export default function CateringVendorRegistrationModal({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = React.useRef(null);
  const [formData, setFormData] = useState({
    // Step 1
    companyName: "",
    contactPerson: "",
    selectedCateringTypes: [],
    otherCateringType: "",
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
    fssaiNumber: "",
    experience: "",
    
    // Step 4
    selectedCuisines: [],
    otherCuisine: "",
    selectedMenus: [],
    
    // Step 5
    minCapacity: "",
    maxCapacity: "",
    serviceType: "",
    servingStaff: "",
    uniformedStaff: "",
    
    // Step 6
    priceMin: "",
    priceMax: "",
    advanceRequired: "",
    advancePercent: "",
    paymentTerms: "",
    
    // Step 7
    fssaiCompliance: "",
    preparationLocation: "",
    waterSource: "",
    wasteManagement: "",
    
    // Step 8
    preferredLocations: [],
    transportCharges: "",
    serviceOffers: "",
    workPhotos: [],
    workLinks: [""],
    
    // Step 9
    weddingsCatered: "",
    references: "",
    
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

  const handleCateringTypeToggle = (type) => {
    setFormData(prev => {
      const types = [...prev.selectedCateringTypes];
      if (types.includes(type)) {
        return { ...prev, selectedCateringTypes: types.filter(t => t !== type) };
      } else {
        return { ...prev, selectedCateringTypes: [...types, type] };
      }
    });
  };

  const handleCuisineToggle = (cuisine) => {
    setFormData(prev => {
      const cuisines = [...prev.selectedCuisines];
      if (cuisines.includes(cuisine)) {
        return { ...prev, selectedCuisines: cuisines.filter(c => c !== cuisine) };
      } else {
        return { ...prev, selectedCuisines: [...cuisines, cuisine] };
      }
    });
  };

  const handleMenuToggle = (menu) => {
    setFormData(prev => {
      const menus = [...prev.selectedMenus];
      if (menus.includes(menu)) {
        return { ...prev, selectedMenus: menus.filter(m => m !== menu) };
      } else {
        return { ...prev, selectedMenus: [...menus, menu] };
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

  // Handle work photos upload (simulated)
  const handlePhotoUpload = (e) => {
    const files = e.target.files;
    if (files.length + formData.workPhotos.length > 3) {
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
      workPhotos: [...prev.workPhotos, ...newPhotos].slice(0, 3) // Limit to 3
    }));
  };

  // Remove a photo
  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      workPhotos: prev.workPhotos.filter((_, i) => i !== index)
    }));
  };

  // Handle work links
  const handleWorkLinkChange = (index, value) => {
    setFormData(prev => {
      const newLinks = [...prev.workLinks];
      newLinks[index] = value;
      return { ...prev, workLinks: newLinks };
    });
  };

  // Add new link field
  const addWorkLink = () => {
    if (formData.workLinks.length < 5) { // Limit to 5 links
      setFormData(prev => ({
        ...prev,
        workLinks: [...prev.workLinks, ""]
      }));
    }
  };

  // Remove a link field
  const removeWorkLink = (index) => {
    if (formData.workLinks.length > 1) {
      setFormData(prev => ({
        ...prev,
        workLinks: prev.workLinks.filter((_, i) => i !== index)
      }));
    }
  };

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
    console.log("Form submitted:", formData);
    alert("Registration submitted successfully!");
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
            Catering Vendor Registration
          </h2>
          <button 
            onClick={onClose} 
            className="shrink-0 text-yellow-200 hover:text-yellow-300 hover:scale-110 transition-transform duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Indicator - SIMPLE TWO ROW VERSION */}
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
            className={`w-8 h-8 rounded-full text-sm flex items-center justify-center font-bold mb-1 ${
              i <= step
                ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-red-900 shadow-lg ring-2 ring-yellow-300"
                : "bg-red-800/70 text-yellow-100"
            }`}
          >
            {i + 1}
          </div>
          
          {/* Step Label */}
          <div className="text-center w-full">
            <p
              className={`text-[10px] sm:text-xs font-medium leading-tight whitespace-pre-line ${
                i === step
                  ? "text-yellow-300 font-bold"
                  : "text-yellow-100/90"
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
                  <Utensils className="inline w-4 h-4 mr-2" />
                  Vendor Basic Details
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Catering Company / Vendor Name *</label>
                  <input 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter catering company name" 
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
                  <label className="form-label">Type of Catering *</label>
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {cateringTypes.map(type => (
                        <label key={type} className="flex items-center gap-2 text-sm">
                          <input 
                            type="checkbox" 
                            checked={formData.selectedCateringTypes.includes(type)}
                            onChange={() => handleCateringTypeToggle(type)}
                            className="w-4 h-4 accent-red-600" 
                          /> 
                          <span>{type}</span>
                        </label>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-3">
                      <label className="text-sm font-semibold whitespace-nowrap">Other:</label>
                      <input 
                        name="otherCateringType"
                        value={formData.otherCateringType}
                        onChange={handleInputChange}
                        className="input-field flex-1" 
                        placeholder="Specify other catering type" 
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
                    Enter your typical price range for catering services
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
                  <label className="form-label">FSSAI License Number *</label>
                  <input 
                    name="fssaiNumber"
                    value={formData.fssaiNumber}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter FSSAI license number" 
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

            {/* STEP 4: Cuisine & Menu Details */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  <Utensils className="inline w-4 h-4 mr-2" />
                  Cuisine & Menu Details
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Cuisines Offered *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cuisines.map(cuisine => (
                      <label key={cuisine} className="flex items-center gap-2 text-sm">
                        <input 
                          type="checkbox" 
                          checked={formData.selectedCuisines.includes(cuisine)}
                          onChange={() => handleCuisineToggle(cuisine)}
                          className="w-4 h-4 accent-red-600" 
                        /> 
                        <span>{cuisine}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <label className="text-sm font-semibold whitespace-nowrap">Other:</label>
                    <input 
                      name="otherCuisine"
                      value={formData.otherCuisine}
                      onChange={handleInputChange}
                      className="input-field flex-1" 
                      placeholder="Specify other cuisine" 
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Special Menus Available *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {specialMenus.map(menu => (
                      <label key={menu} className="flex items-center gap-2 text-sm">
                        <input 
                          type="checkbox" 
                          checked={formData.selectedMenus.includes(menu)}
                          onChange={() => handleMenuToggle(menu)}
                          className="w-4 h-4 accent-red-600" 
                        /> 
                        <span>{menu}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Capacity & Service Details */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  Capacity & Service Details
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Minimum Plate Capacity *</label>
                    <input 
                      name="minCapacity"
                      value={formData.minCapacity}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter minimum capacity" 
                      type="number"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Maximum Plate Capacity *</label>
                    <input 
                      name="maxCapacity"
                      value={formData.maxCapacity}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter maximum capacity" 
                      type="number"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Service Type *</label>
                  <div className="grid grid-cols-1 gap-2">
                    {serviceTypes.map(type => (
                      <label key={type} className="flex items-center gap-2 text-sm">
                        <input 
                          type="radio" 
                          name="serviceType" 
                          value={type}
                          checked={formData.serviceType === type}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-red-600" 
                        /> 
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Serving Staff Provided *</label>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-2 text-sm">
                        <input 
                          type="radio" 
                          name="servingStaff" 
                          value="yes"
                          checked={formData.servingStaff === "yes"}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-red-600" 
                        /> 
                        Yes
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input 
                          type="radio" 
                          name="servingStaff" 
                          value="no"
                          checked={formData.servingStaff === "no"}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-red-600" 
                        /> 
                        No
                      </label>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Uniformed Staff *</label>
                    <div className="flex gap-3">
                      <label className="flex items-center gap-2 text-sm">
                        <input 
                          type="radio" 
                          name="uniformedStaff" 
                          value="yes"
                          checked={formData.uniformedStaff === "yes"}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-red-600" 
                        /> 
                        Yes
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input 
                          type="radio" 
                          name="uniformedStaff" 
                          value="no"
                          checked={formData.uniformedStaff === "no"}
                          onChange={handleInputChange}
                          className="w-4 h-4 accent-red-600" 
                        /> 
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: Pricing Details */}
            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  <Banknote className="inline w-4 h-4 mr-2" />
                  Pricing Details
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Price per Plate (₹) From *</label>
                    <input 
                      name="priceMin"
                      value={formData.priceMin}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Min price" 
                      type="number"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Price per Plate (₹) To *</label>
                    <input 
                      name="priceMax"
                      value={formData.priceMax}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Max price" 
                      type="number"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Advance Payment Required *</label>
                  <div className="flex gap-3 mb-2">
                    <label className="flex items-center gap-2 text-sm">
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
                    <label className="flex items-center gap-2 text-sm">
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
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-semibold whitespace-nowrap">If Yes, %:</label>
                      <input 
                        name="advancePercent"
                        value={formData.advancePercent}
                        onChange={handleInputChange}
                        className="input-field flex-1" 
                        placeholder="Enter percentage" 
                      />
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label className="form-label">Balance Payment Terms</label>
                  <input 
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter payment terms" 
                  />
                </div>
              </div>
            )}

            {/* STEP 7: Hygiene & Quality Assurance */}
            {step === 6 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  Hygiene & Quality Assurance
                </h3>
                
                <div className="form-group">
                  <label className="form-label">FSSAI Compliance *</label>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input 
                        type="radio" 
                        name="fssaiCompliance" 
                        value="yes"
                        checked={formData.fssaiCompliance === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input 
                        type="radio" 
                        name="fssaiCompliance" 
                        value="no"
                        checked={formData.fssaiCompliance === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      No
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Food Preparation Location *</label>
                  <input 
                    name="preparationLocation"
                    value={formData.preparationLocation}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter preparation location" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Water Source (RO / Mineral) *</label>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input 
                        type="radio" 
                        name="waterSource" 
                        value="yes"
                        checked={formData.waterSource === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input 
                        type="radio" 
                        name="waterSource" 
                        value="no"
                        checked={formData.waterSource === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      No
                    </label>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Waste Management Arranged *</label>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input 
                        type="radio" 
                        name="wasteManagement" 
                        value="yes"
                        checked={formData.wasteManagement === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input 
                        type="radio" 
                        name="wasteManagement" 
                        value="no"
                        checked={formData.wasteManagement === "no"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      No
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: Service Coverage */}
            {step === 7 && (
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
                        <span>{location}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Transportation Charges Applicable *</label>
                  <div className="flex gap-3">
                    <label className="flex items-center gap-2 text-sm">
                      <input 
                        type="radio" 
                        name="transportCharges" 
                        value="yes"
                        checked={formData.transportCharges === "yes"}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <input 
                        type="radio" 
                        name="transportCharges" 
                        value="no"
                        checked={formData.transportCharges === "no"}
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
                      placeholder="Describe your special offers, unique services, or any additional information about your catering services."
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      You can write in paragraphs or bullet points as per your preference
                    </p>
                  </div>
                </div>

                {/* Photos Section */}
                <div className="form-group">
                  <label className="form-label flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    <span className="text-sm">Work Photos / Sample Food Images</span>
                    <span className="text-xs text-gray-500">(Max 3)</span>
                  </label>
                  <div className="bg-white rounded-lg border border-red-200 p-3 shadow-sm">
                    {/* Upload area */}
                    <div className="border-2 border-dashed border-red-200 rounded-lg p-4 text-center mb-3">
                      <input
                        type="file"
                        id="workPhotos"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <label htmlFor="workPhotos" className="cursor-pointer flex flex-col items-center">
                        <Upload className="w-8 h-8 text-red-400 mb-2" />
                        <span className="text-sm text-gray-600">Click to upload photos</span>
                        <span className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB each</span>
                      </label>
                    </div>
                    
                    {/* Preview uploaded photos */}
                    {formData.workPhotos.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Uploaded Photos ({formData.workPhotos.length}/3)</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {formData.workPhotos.map((photo, index) => (
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

                {/* Work Links Section */}
                <div className="form-group">
                  <label className="form-label flex items-center gap-2">
                    <LinkIcon className="w-4 h-4" />
                    <span className="text-sm">Work Links / Portfolio</span>
                    <span className="text-xs text-gray-500">(Optional)</span>
                  </label>
                  <div className="bg-white rounded-lg border border-red-200 p-3 shadow-sm">
                    {formData.workLinks.map((link, index) => (
                      <div key={index} className="flex gap-2 mb-2 last:mb-0">
                        <input
                          type="url"
                          value={link}
                          onChange={(e) => handleWorkLinkChange(index, e.target.value)}
                          className="input-field flex-1 py-2"
                          placeholder="Enter link to your work (Google Drive, Dropbox, etc.)"
                        />
                        {formData.workLinks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeWorkLink(index)}
                            className="bg-red-100 text-red-600 hover:bg-red-200 rounded-lg px-3 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    
                    {formData.workLinks.length < 5 && (
                      <button
                        type="button"
                        onClick={addWorkLink}
                        className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                      >
                        <span>+ Add another link</span>
                        <span className="text-gray-500">({5 - formData.workLinks.length} remaining)</span>
                      </button>
                    )}
                    
                    <div className="text-xs text-gray-500 mt-3">
                      <p>• Add links to your portfolio, Google Drive, or cloud storage</p>
                      <p>• Ensure links are publicly accessible</p>
                      <p>• You can add up to 5 links</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 9: Previous Experience & References */}
            {step === 8 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm mb-3">
                  Previous Experience & References
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Number of Weddings Catered *</label>
                  <input 
                    name="weddingsCatered"
                    value={formData.weddingsCatered}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter number of weddings catered" 
                    type="number"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Major Clients / References (if any)</label>
                  <textarea 
                    name="references"
                    value={formData.references}
                    onChange={handleInputChange}
                    className="input-field min-h-[100px]" 
                    placeholder="Enter client names or references" 
                    rows="4"
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
                    I agree to provide catering services for marriage functions as per 
                    agreed menu, quality, hygiene standards, and terms.
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