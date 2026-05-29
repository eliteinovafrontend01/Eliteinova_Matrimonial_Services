'use client';

import React, { useState } from "react";
import { ArrowLeft, Search, FileText, Shield, Building, User, MapPin, Phone, Mail, Globe, Banknote, X, Pen, Trash2, Upload, Check, DollarSign } from "lucide-react";

const steps = [
  "Agency Details",
  "License & Legal",
  "Office & Contact",
  "Services Offered",
  "Operational Capability",
  "Experience & References",
  "Compliance Declaration",
  "Documents Upload",
  "Bank Details",
  "Declaration"
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

export default function BackgroundInvestigationsForm({ isOpen, onClose }) {
  const [step, setStep] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = React.useRef(null);
  
  const [formData, setFormData] = useState({
    // Step 1
    agencyName: "",
    entityType: "",
    yearEstablishment: "",
    registrationNumber: "",
    gstNumber: "",
    panNumber: "",
    minBudget: "", // Added min budget
    maxBudget: "", // Added max budget
    
    // Step 2
    detectiveLicense: "",
    issuingAuthority: "",
    statesOperation: "",
    licenseValidityFrom: "",
    licenseValidityTo: "",
    
    // Step 3
    registeredOffice: "",
    branchOffice: "",
    city: "",
    state: "",
    pincode: "",
    
    // Step 4
    contactName: "",
    designation: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    
    // Step 5
    selectedServices: [],
    citiesCovered: "",
    fieldInvestigators: "",
    turnaroundTime: "",
    languagesSupported: "",
    
    // Step 6
    yearsExperience: "",
    existingClients: "",
    referenceContact: "",
    
    // Step 7
    complianceLegal: false,
    complianceEthical: false,
    complianceConfidentiality: false,
    complianceLegalMethods: false,
    
    // Step 8
    uploadedDocuments: [],
    
    // Step 9
    bankName: "",
    accountName: "",
    accountNumber: "",
    ifscCode: "",
    
    // Step 10
    declaration: false,
    authorizedSignatory: "",
    date: "",
    place: ""
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

  const handleFileUpload = (e) => {
    const files = e.target.files;
    const newDocs = Array.from(files).map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file)
    }));
    
    setFormData(prev => ({
      ...prev,
      uploadedDocuments: [...prev.uploadedDocuments, ...newDocs]
    }));
  };

  const removeDocument = (index) => {
    setFormData(prev => ({
      ...prev,
      uploadedDocuments: prev.uploadedDocuments.filter((_, i) => i !== index)
    }));
  };

  const requiredDocuments = [
    "Agency Registration Certificate",
    "Detective License",
    "PAN Card",
    "GST Certificate (if applicable)",
    "Address Proof of Office",
    "ID Proof of Authorized Signatory"
  ];

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
    alert("Agency registration submitted successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-24 sm:p-6 sm:items-center sm:pt-0">
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
            Background Verification Agency Registration
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
              const splitStepName = () => {
                const words = s.split(' ');
                if (words.length <= 2) return s;
                return `${words[0]}\n${words.slice(1).join(' ')}`;
              };
              
              return (
                <div key={i} className="flex-1 flex flex-col items-center min-w-[65px] sm:min-w-[75px] px-0.5">
                  <div className={`w-8 h-8 rounded-full text-sm flex items-center justify-center font-bold mb-1 ${
                    i <= step ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-red-900 shadow-lg ring-2 ring-yellow-300" : "bg-red-800/70 text-yellow-100"
                  }`}>
                    {i + 1}
                  </div>
                  <div className="text-center w-full">
                    <p className={`text-[10px] sm:text-xs font-medium leading-tight whitespace-pre-line ${
                      i === step ? "text-yellow-300 font-bold" : "text-yellow-100/90"
                    }`}>
                      {splitStepName()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-full mx-auto">
            
            {/* STEP 1: Agency Details */}
            {step === 0 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm sm:text-base mb-4">
                  <Building className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Agency Basic Details
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Registered Agency Name *</label>
                  <input 
                    name="agencyName"
                    value={formData.agencyName}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter registered agency name" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Type of Entity *</label>
                  <div className="grid grid-cols-2 gap-3">
                    {entityTypes.map(type => (
                      <label key={type} className="flex items-center gap-2 text-xs sm:text-sm">
                        <input 
                          type="radio" 
                          name="entityType" 
                          value={type}
                          checked={formData.entityType === type}
                          onChange={handleInputChange}
                          className="w-4 h-4 sm:w-5 sm:h-5 accent-red-600" 
                        /> 
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Year of Establishment *</label>
                  <input 
                    name="yearEstablishment"
                    value={formData.yearEstablishment}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="YYYY" 
                    type="number"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Registration Number (if applicable)</label>
                  <input 
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter registration number" 
                  />
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
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Enter your typical price range for background verification services
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2: License & Legal Details */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm sm:text-base mb-4">
                  <Shield className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  License & Legal Details
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Private Detective License Number *</label>
                  <input 
                    name="detectiveLicense"
                    value={formData.detectiveLicense}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter license number" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Issuing Authority *</label>
                  <input 
                    name="issuingAuthority"
                    value={formData.issuingAuthority}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter issuing authority" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">State(s) of Operation *</label>
                  <input 
                    name="statesOperation"
                    value={formData.statesOperation}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter states (comma separated)" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">License Validity From *</label>
                  <input 
                    name="licenseValidityFrom"
                    value={formData.licenseValidityFrom}
                    onChange={handleInputChange}
                    className="input-field" 
                    type="date"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">License Validity To *</label>
                  <input 
                    name="licenseValidityTo"
                    value={formData.licenseValidityTo}
                    onChange={handleInputChange}
                    className="input-field" 
                    type="date"
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Office Address */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm sm:text-base mb-4">
                  <MapPin className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Office Address Details
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Registered Office Address *</label>
                  <textarea 
                    name="registeredOffice"
                    value={formData.registeredOffice}
                    onChange={handleInputChange}
                    className="input-field min-h-[80px] sm:min-h-[100px]" 
                    placeholder="Enter registered office address" 
                    rows="4"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Branch Office Address (if any)</label>
                  <textarea 
                    name="branchOffice"
                    value={formData.branchOffice}
                    onChange={handleInputChange}
                    className="input-field min-h-[80px] sm:min-h-[100px]" 
                    placeholder="Enter branch office address" 
                    rows="4"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">District / City *</label>
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

            {/* STEP 4: Contact Person Details */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm sm:text-base mb-4">
                  <User className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Contact Person Details
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter full name" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Designation *</label>
                  <input 
                    name="designation"
                    value={formData.designation}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter designation" 
                  />
                </div>
                
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
                  <label className="form-label">Alternate Contact Number</label>
                  <input 
                    name="alternateMobile"
                    value={formData.alternateMobile}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter alternate number" 
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
              </div>
            )}

            {/* STEP 5: Services Offered */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm sm:text-base mb-4">
                  <Search className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Background Verification Services
                </h3>
                
                <div className="form-group">
                  <label className="form-label mb-3">Matrimonial Verification Checks *</label>
                  <div className="space-y-2">
                    {verificationServices.map(service => (
                      <label key={service} className="flex items-center gap-3 text-sm p-2 hover:bg-red-50 rounded-lg transition-colors">
                        <input 
                          type="checkbox" 
                          checked={formData.selectedServices.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                          className="w-4 h-4 sm:w-5 sm:h-5 accent-red-600 flex-shrink-0" 
                        /> 
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Cities / Regions Covered *</label>
                  <input 
                    name="citiesCovered"
                    value={formData.citiesCovered}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter cities/regions covered" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Number of Field Investigators</label>
                  <input 
                    name="fieldInvestigators"
                    value={formData.fieldInvestigators}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter number" 
                    type="number"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Average Turnaround Time *</label>
                  <input 
                    name="turnaroundTime"
                    value={formData.turnaroundTime}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="e.g., 3-5 days" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Languages Supported</label>
                  <input 
                    name="languagesSupported"
                    value={formData.languagesSupported}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter languages supported" 
                  />
                </div>
              </div>
            )}

            {/* STEP 6: Experience & References */}
            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm sm:text-base mb-4">
                  <FileText className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Experience & References
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Years of Experience in Matrimonial Verification *</label>
                  <input 
                    name="yearsExperience"
                    value={formData.yearsExperience}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter years of experience" 
                    type="number"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Existing Clients (Matrimony Apps/Bureaus)</label>
                  <textarea 
                    name="existingClients"
                    value={formData.existingClients}
                    onChange={handleInputChange}
                    className="input-field min-h-[80px] sm:min-h-[100px]" 
                    placeholder="List existing clients or platforms you work with" 
                    rows="4"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Reference Contact (Optional)</label>
                  <input 
                    name="referenceContact"
                    value={formData.referenceContact}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Name and contact of reference" 
                  />
                </div>
              </div>
            )}

            {/* STEP 7: Compliance Declaration */}
            {step === 6 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm sm:text-base mb-4">
                  <Shield className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Compliance & Confidentiality
                </h3>
                
                <div className="bg-gradient-to-r from-red-100 to-yellow-50 rounded-lg p-4 sm:p-5 border border-red-200">
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 text-sm">
                      <input 
                        type="checkbox" 
                        name="complianceLegal"
                        checked={formData.complianceLegal}
                        onChange={handleInputChange}
                        className="w-4 h-4 sm:w-5 sm:h-5 accent-red-600 mt-1 flex-shrink-0" 
                      />
                      <span>We comply with all applicable local and national laws</span>
                    </label>
                    
                    <label className="flex items-start gap-3 text-sm">
                      <input 
                        type="checkbox" 
                        name="complianceEthical"
                        checked={formData.complianceEthical}
                        onChange={handleInputChange}
                        className="w-4 h-4 sm:w-5 sm:h-5 accent-red-600 mt-1 flex-shrink-0" 
                      />
                      <span>We follow ethical investigation practices</span>
                    </label>
                    
                    <label className="flex items-start gap-3 text-sm">
                      <input 
                        type="checkbox" 
                        name="complianceConfidentiality"
                        checked={formData.complianceConfidentiality}
                        onChange={handleInputChange}
                        className="w-4 h-4 sm:w-5 sm:h-5 accent-red-600 mt-1 flex-shrink-0" 
                      />
                      <span>We ensure complete confidentiality and data protection</span>
                    </label>
                    
                    <label className="flex items-start gap-3 text-sm">
                      <input 
                        type="checkbox" 
                        name="complianceLegalMethods"
                        checked={formData.complianceLegalMethods}
                        onChange={handleInputChange}
                        className="w-4 h-4 sm:w-5 sm:h-5 accent-red-600 mt-1 flex-shrink-0" 
                      />
                      <span>We do not use illegal surveillance or methods</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8: Documents Upload */}
            {step === 7 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm sm:text-base mb-4">
                  <Upload className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Documents to be Attached
                </h3>
                
                <div className="bg-gradient-to-r from-red-100 to-yellow-50 rounded-lg p-4 sm:p-5 border border-red-200">
                  <div className="space-y-3 mb-4">
                    <p className="text-sm font-semibold text-red-700 mb-2">Required Documents:</p>
                    {requiredDocuments.map((doc, index) => (
                      <div key={index} className="flex items-center gap-3 text-sm">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                        <span>{doc}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Upload Documents</label>
                    <div className="border-2 border-dashed border-red-200 rounded-lg p-4 sm:p-5 text-center">
                      <input
                        type="file"
                        id="documentUpload"
                        accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="documentUpload" className="cursor-pointer flex flex-col items-center">
                        <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-red-400 mb-2 sm:mb-3" />
                        <span className="text-sm sm:text-base text-gray-600">Click to upload documents</span>
                        <span className="text-xs sm:text-sm text-gray-500 mt-1">PDF, JPG, PNG, DOC up to 10MB each</span>
                      </label>
                    </div>
                    
                    {formData.uploadedDocuments.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-3">
                          Uploaded Documents ({formData.uploadedDocuments.length})
                        </h4>
                        <div className="space-y-2">
                          {formData.uploadedDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg border border-red-100">
                              <div className="flex items-center gap-3">
                                <FileText className="w-5 h-5 text-red-600" />
                                <div>
                                  <p className="text-sm font-medium truncate max-w-[200px]">{doc.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {(doc.size / 1024).toFixed(1)} KB
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeDocument(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 9: Bank Details */}
            {step === 8 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm sm:text-base mb-4">
                  <Banknote className="inline w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Bank Details (Optional)
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Bank Name</label>
                  <input 
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter bank name" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Account Holder Name</label>
                  <input 
                    name="accountName"
                    value={formData.accountName}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter account holder name" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Account Number</label>
                  <input 
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter account number" 
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">IFSC Code</label>
                  <input 
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter IFSC code" 
                  />
                </div>
              </div>
            )}

            {/* STEP 10: Declaration */}
            {step === 9 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-sm sm:text-base mb-4">
                  Declaration
                </h3>
                
                <div className="bg-gradient-to-r from-red-100 to-yellow-50 rounded-lg p-4 sm:p-5 border border-red-200">
                  <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                    I hereby declare that the information provided above is true and correct. 
                    I understand that providing false or misleading information may result in 
                    rejection or termination of registration.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="form-group">
                      <label className="form-label">Authorized Signatory Name *</label>
                      <input 
                        name="authorizedSignatory"
                        value={formData.authorizedSignatory}
                        onChange={handleInputChange}
                        className="input-field" 
                        placeholder="Enter authorized signatory name" 
                      />
                    </div>
                    
                    <label className="flex items-center gap-3 text-sm sm:text-base">
                      <input 
                        type="checkbox" 
                        name="declaration"
                        checked={formData.declaration}
                        onChange={handleInputChange}
                        className="w-4 h-4 sm:w-5 sm:h-5 accent-red-600" 
                      />
                      <span className="font-semibold">I accept the terms and conditions *</span>
                    </label>
                    
                    <div className="form-group">
                      <label className="form-label flex items-center gap-2">
                        <Pen className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">Authorized Signature *</span>
                      </label>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3">Draw your signature in the box below</p>
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
                          className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm hover:bg-red-700 transition-colors"
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Date *</label>
                      <input 
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="input-field" 
                        type="date"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Place *</label>
                      <input 
                        name="place"
                        value={formData.place}
                        onChange={handleInputChange}
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

        {/* Footer */}
        <div className="flex gap-2 sm:gap-3 p-3 sm:p-4 border-t border-red-200 bg-gradient-to-r from-red-50 to-yellow-50 shrink-0 rounded-b-2xl">
          {step > 0 && (
            <button 
              className="btn-outline-red text-sm px-4 sm:px-5 py-2 sm:py-2.5" 
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          
          <button
            className="btn-primary-red ml-auto text-sm px-4 sm:px-5 py-2 sm:py-2.5"
            onClick={() => (step === 9 ? handleSubmit() : setStep(step + 1))}
            disabled={step === 9 && !formData.declaration}
          >
            {step === 9 ? "Submit Registration" : "Continue"}
          </button>
        </div>

        <style jsx>{`
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1.25rem;
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
            box-shadow: 0 3px 6px rgba(220, 38, 38, 0.3);
            min-width: 120px;
          }
          
          .btn-primary-red:hover:not(:disabled) {
            background: linear-gradient(135deg, #B91C1C, #991B1B);
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(220, 38, 38, 0.4);
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
            box-shadow: 0 3px 6px rgba(220, 38, 38, 0.2);
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
          
          @media (min-width: 640px) {
            .form-group {
              gap: 0.75rem;
              margin-bottom: 1.5rem;
            }
            
            .form-label {
              font-size: 1rem;
            }
            
            .input-field {
              padding: 1rem 1.25rem;
              font-size: 1rem;
              box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
              border-radius: 1rem;
            }
            
            .input-field:focus {
              box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.2);
            }
            
            .input-field::placeholder {
              font-size: 1rem;
            }
            
            .signature-canvas {
              height: 140px;
              border-radius: 1rem;
            }
            
            .btn-primary-red {
              box-shadow: 0 4px 8px rgba(220, 38, 38, 0.3);
              min-width: 140px;
              border-radius: 1rem;
            }
            
            .btn-primary-red:hover:not(:disabled) {
              box-shadow: 0 8px 16px rgba(220, 38, 38, 0.4);
            }
            
            .btn-outline-red {
              box-shadow: 0 3px 6px rgba(220, 38, 38, 0.2);
              min-width: 120px;
              border-radius: 1rem;
            }
            
            .btn-outline-red:hover {
              box-shadow: 0 6px 12px rgba(220, 38, 38, 0.3);
            }
          }
        `}</style>
      </div>
    </div>
  );
}