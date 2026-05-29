'use client';

import React, { useState } from "react";
import { ArrowLeft, User, Phone, Users, Briefcase, Heart, Calendar, Package, FileText, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// Form steps
const steps = [
  "Personal Details",
  "Contact Info",
  "Family Details",
  "Education & Career",
  "Bride/Groom Details",
  "Event Details",
  "Services",
  "Package",
  "Declaration"
];

// Dropdown options
const genderOptions = ['Male', 'Female', 'Other'];
const maritalStatusOptions = ['Never Married', 'Divorced', 'Widowed', 'Awaiting Divorce'];
const religionOptions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist', 'Jain', 'Other'];
const motherTongueOptions = ['Tamil', 'Telugu', 'Hindi', 'Malayalam', 'Kannada', 'English', 'Other'];
const bodyTypeOptions = ['Slim', 'Average', 'Athletic', 'Heavy'];
const complexionOptions = ['Fair', 'Wheatish', 'Dark'];
const stateOptions = ['Tamil Nadu', 'Karnataka', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Other'];
const familyTypeOptions = ['Nuclear Family', 'Joint Family'];
const familyStatusOptions = ['Lower Middle Class', 'Middle Class', 'Upper Middle Class', 'Rich'];
const familyValuesOptions = ['Traditional', 'Moderate', 'Liberal'];
const packageOptions = ['Basic Package', 'Standard Package', 'Premium Package', 'Custom Package'];
const budgetOptions = ['Below ₹50,000', '₹50,000 – ₹1,00,000', '₹1,00,000 – ₹3,00,000', 'Above ₹3,00,000'];

// Wedding services
const weddingServices = [
  { id: 'weddingPlanner', label: 'Wedding Planner' },
  { id: 'photographyVideography', label: 'Photography & Videography' },
  { id: 'cateringServices', label: 'Catering Services' },
  { id: 'makeupArtist', label: 'Makeup Artist' },
  { id: 'decorationStageDesign', label: 'Decoration & Stage Design' },
  { id: 'invitationDesign', label: 'Invitation Design & Printing' },
  { id: 'djMusicBand', label: 'DJ / Music Band' },
  { id: 'honeymoonPlanning', label: 'Honeymoon Planning' }
];

export default function CustomerRegistrationForm({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const canvasRef = React.useRef(null);
  
  const [formData, setFormData] = useState({
    // Step 1: Personal Details
    fullName: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    religion: '',
    caste: '',
    motherTongue: '',
    height: '',
    weight: '',
    bodyType: '',
    complexion: '',
    
    // Step 2: Contact Information
    mobile: '',
    alternateMobile: '',
    email: '',
    address: '',
    cityDistrict: '',
    state: '',
    pinCode: '',
    
    // Step 3: Family Details
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    siblings: '',
    familyType: '',
    familyStatus: '',
    familyValues: '',
    
    // Step 4: Education & Career
    highestEducation: '',
    college: '',
    occupation: '',
    company: '',
    annualIncome: '',
    workLocation: '',
    
    // Step 5: Bride/Groom Details
    brideGroomName: '',
    age: '',
    religionBrideGroom: '',
    casteSubcaste: '',
    occupationBrideGroom: '',
    educationBrideGroom: '',
    
    // Step 6: Marriage Event Details
    weddingDate: '',
    weddingVenue: '',
    city: '',
    expectedGuests: '',
    
    // Step 7: Wedding Event Services
    weddingPlanner: false,
    photographyVideography: false,
    cateringServices: false,
    makeupArtist: false,
    decorationStageDesign: false,
    invitationDesign: false,
    djMusicBand: false,
    honeymoonPlanning: false,
    
    // Step 8: Package & Budget
    packageSelection: '',
    budgetRange: '',
    specialRequirements: '',
    
    // Step 9: Declaration
    declaration: false,
    signatureData: '',
    declarationDate: '',
    declarationPlace: '',
    
    // Password
    password: '',
    confirmPassword: '',
  });

  // Initialize canvas for signature
  React.useEffect(() => {
    if (step === 8 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      ctx.strokeStyle = '#991B1B';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [step]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleServiceToggle = (serviceId) => {
    setFormData(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  // Signature pad functions
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
    
    const ctx = canvas.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      const canvas = canvasRef.current;
      setFormData(prev => ({
        ...prev,
        signatureData: canvas?.toDataURL() || ''
      }));
    }
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    setFormData(prev => ({ ...prev, signatureData: '' }));
  };

  const handleSubmit = () => {
    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!formData.declaration) {
      alert('Please confirm the declaration!');
      return;
    }
    
    if (!hasSignature) {
      alert('Please provide your signature!');
      return;
    }
    
    // Store customer data
    const customerData = {
      id: `CUST-2024-${Math.floor(Math.random() * 10000).toString().padStart(5, '0')}`,
      name: formData.fullName,
      email: formData.email,
      mobile: formData.mobile,
      ...formData
    };
    
    localStorage.setItem('customerData', JSON.stringify(customerData));
    localStorage.setItem('customerLoggedIn', 'true');
    
    alert('Registration completed successfully!');
    onClose();
    navigate('/customer-profile');
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 pt-24 sm:p-6 sm:items-center sm:pt-0">
      {/* Main modal container */}
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
            Customer Registration
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
                if (s.includes('&')) {
                  const parts = s.split(' & ');
                  return `${parts[0]}\n& ${parts[1]}`;
                }
                return `${words[0]}\n${words.slice(1).join(' ')}`;
              };
              
              return (
                <div key={i} className="flex-1 flex flex-col items-center min-w-[65px] sm:min-w-[75px] px-0.5">
                  <div
                    className={`w-8 h-8 rounded-full text-sm flex items-center justify-center font-bold mb-1 ${
                      i <= step
                        ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-red-900 shadow-lg ring-2 ring-yellow-300"
                        : "bg-red-800/70 text-yellow-100"
                    }`}
                  >
                    {i + 1}
                  </div>
                  
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
            
            {/* STEP 1: Personal Details */}
            {step === 0 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-xs sm:text-sm mb-3">
                  <User className="inline w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Personal Details
                </h3>
                
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Date of Birth *</label>
                  <input 
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="input-field" 
                    type="date"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Gender *</label>
                    <select 
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select</option>
                      {genderOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Marital Status *</label>
                    <select 
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select</option>
                      {maritalStatusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Religion *</label>
                    <select 
                      name="religion"
                      value={formData.religion}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select</option>
                      {religionOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Caste/Subcaste</label>
                    <input 
                      name="caste"
                      value={formData.caste}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter caste"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Mother Tongue</label>
                    <select 
                      name="motherTongue"
                      value={formData.motherTongue}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="">Select</option>
                      {motherTongueOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Body Type</label>
                    <select 
                      name="bodyType"
                      value={formData.bodyType}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="">Select</option>
                      {bodyTypeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="form-group">
                    <label className="form-label">Height</label>
                    <input 
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="e.g., 5ft 5in"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Weight (kg)</label>
                    <input 
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="input-field" 
                      type="number"
                      placeholder="Enter weight"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Complexion</label>
                    <select 
                      name="complexion"
                      value={formData.complexion}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="">Select</option>
                      {complexionOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Contact Information */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-xs sm:text-sm mb-3">
                  <Phone className="inline w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Contact Information
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Mobile Number *</label>
                    <input 
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="input-field" 
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Alternate Mobile</label>
                    <input 
                      name="alternateMobile"
                      value={formData.alternateMobile}
                      onChange={handleInputChange}
                      className="input-field" 
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Email ID *</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field" 
                    type="email"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Address *</label>
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="input-field min-h-[60px] sm:min-h-[80px]" 
                    placeholder="Enter your complete address"
                    rows="3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">City/District *</label>
                    <input 
                      name="cityDistrict"
                      value={formData.cityDistrict}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter city/district"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <select 
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select</option>
                      {stateOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">PIN Code *</label>
                  <input 
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="Enter 6-digit PIN code"
                    required
                  />
                </div>
              </div>
            )}

            {/* STEP 3: Family Details */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-xs sm:text-sm mb-3">
                  <Users className="inline w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Family Details
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Father's Name</label>
                    <input 
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter father's name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Father's Occupation</label>
                    <input 
                      name="fatherOccupation"
                      value={formData.fatherOccupation}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter occupation"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Mother's Name</label>
                    <input 
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter mother's name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Mother's Occupation</label>
                    <input 
                      name="motherOccupation"
                      value={formData.motherOccupation}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter occupation"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Number of Siblings</label>
                  <input 
                    name="siblings"
                    value={formData.siblings}
                    onChange={handleInputChange}
                    className="input-field" 
                    placeholder="e.g., 1 brother, 1 sister"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Family Type</label>
                    <select 
                      name="familyType"
                      value={formData.familyType}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="">Select</option>
                      {familyTypeOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Family Status</label>
                    <select 
                      name="familyStatus"
                      value={formData.familyStatus}
                      onChange={handleInputChange}
                      className="input-field"
                    >
                      <option value="">Select</option>
                      {familyStatusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Family Values</label>
                  <select 
                    name="familyValues"
                    value={formData.familyValues}
                    onChange={handleInputChange}
                    className="input-field"
                  >
                    <option value="">Select</option>
                    {familyValuesOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* STEP 4: Education & Career */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-xs sm:text-sm mb-3">
                  <Briefcase className="inline w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Education & Career
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Highest Education *</label>
                    <input 
                      name="highestEducation"
                      value={formData.highestEducation}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="e.g., B.Tech, MBA"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">College/University</label>
                    <input 
                      name="college"
                      value={formData.college}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter college name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Occupation *</label>
                    <input 
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="e.g., Software Engineer"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Company/Organization</label>
                    <input 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter company name"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Annual Income</label>
                    <input 
                      name="annualIncome"
                      value={formData.annualIncome}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="e.g., ₹5,00,000"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Work Location</label>
                    <input 
                      name="workLocation"
                      value={formData.workLocation}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="e.g., Chennai"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Bride/Groom Details */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-xs sm:text-sm mb-3">
                  <Heart className="inline w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Bride/Groom Details
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Name of Bride/Groom *</label>
                    <input 
                      name="brideGroomName"
                      value={formData.brideGroomName}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Age *</label>
                    <input 
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="input-field" 
                      type="number"
                      placeholder="Enter age"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Religion *</label>
                    <input 
                      name="religionBrideGroom"
                      value={formData.religionBrideGroom}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter religion"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Caste/Subcaste</label>
                    <input 
                      name="casteSubcaste"
                      value={formData.casteSubcaste}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter caste"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Occupation *</label>
                    <input 
                      name="occupationBrideGroom"
                      value={formData.occupationBrideGroom}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter occupation"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Education *</label>
                    <input 
                      name="educationBrideGroom"
                      value={formData.educationBrideGroom}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter education"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: Marriage Event Details */}
            {step === 5 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-xs sm:text-sm mb-3">
                  <Calendar className="inline w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Marriage Event Details
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Wedding Date *</label>
                    <input 
                      name="weddingDate"
                      value={formData.weddingDate}
                      onChange={handleInputChange}
                      className="input-field" 
                      type="date"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="input-field" 
                      placeholder="Enter city name"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Wedding Venue *</label>
                  <textarea 
                    name="weddingVenue"
                    value={formData.weddingVenue}
                    onChange={handleInputChange}
                    className="input-field min-h-[60px] sm:min-h-[80px]" 
                    placeholder="Enter complete venue address"
                    rows="3"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Expected Number of Guests *</label>
                  <input 
                    name="expectedGuests"
                    value={formData.expectedGuests}
                    onChange={handleInputChange}
                    className="input-field" 
                    type="number"
                    placeholder="Enter approximate count"
                    required
                  />
                </div>
              </div>
            )}

            {/* STEP 7: Wedding Event Services */}
            {step === 6 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-xs sm:text-sm mb-3">
                  Wedding Event Services
                </h3>
                <p className="text-xs text-gray-600 text-center mb-4">Select the optional add-on services you require</p>
                
                <div className="space-y-3">
                  {weddingServices.map(service => (
                    <label key={service.id} className="flex items-center gap-2 text-xs sm:text-sm bg-white p-3 rounded-lg border border-red-200 hover:border-red-400 transition-colors cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData[service.id]}
                        onChange={() => handleServiceToggle(service.id)}
                        className="w-4 h-4 accent-red-600" 
                      /> 
                      <span>{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 8: Package & Budget Selection */}
            {step === 7 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-xs sm:text-sm mb-3">
                  <Package className="inline w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Package & Budget Selection
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Package Selection *</label>
                    <select 
                      name="packageSelection"
                      value={formData.packageSelection}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select</option>
                      {packageOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">Budget Range *</label>
                    <select 
                      name="budgetRange"
                      value={formData.budgetRange}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    >
                      <option value="">Select</option>
                      {budgetOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Special Requirements</label>
                  <textarea 
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    className="input-field min-h-[80px] sm:min-h-[100px]" 
                    placeholder="Please mention any special requirements, preferences, or additional details you would like us to know..."
                    rows="4"
                  />
                </div>
              </div>
            )}

            {/* STEP 9: Declaration */}
            {step === 8 && (
              <div className="space-y-4">
                <h3 className="text-red-800 font-bold text-center text-xs sm:text-sm mb-3">
                  <FileText className="inline w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Declaration & Signature
                </h3>
                
                <div className="bg-gradient-to-r from-red-100 to-yellow-50 rounded-lg p-3 sm:p-4 border border-red-200">
                  <p className="text-xs sm:text-sm text-gray-700 mb-3 leading-relaxed">
                    I hereby declare that all the information provided by me in this registration form is true, 
                    accurate, and complete to the best of my knowledge. I understand that any false information 
                    may result in the cancellation of my registration and services.
                  </p>
                  
                  <label className="flex items-center gap-2 text-xs sm:text-sm mb-4">
                    <input 
                      type="checkbox" 
                      name="declaration"
                      checked={formData.declaration}
                      onChange={handleInputChange}
                      className="w-4 h-4 accent-red-600" 
                    />
                    <span className="font-semibold">I confirm that the above information provided is true and correct. *</span>
                  </label>
                  
                  <div className="form-group">
                    <label className="form-label">Signature *</label>
                    <p className="text-[10px] sm:text-xs text-gray-600 mb-2">Draw your signature in the box below</p>
                    <div className="relative">
                      <canvas
                        ref={canvasRef}
                        width={400}
                        height={100}
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
                        className="absolute top-1 sm:top-2 right-1 sm:right-2 bg-red-600 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs hover:bg-red-700 transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="form-group">
                      <label className="form-label">Date *</label>
                      <input 
                        name="declarationDate"
                        value={formData.declarationDate}
                        onChange={handleInputChange}
                        className="input-field" 
                        type="date"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Place *</label>
                      <input 
                        name="declarationPlace"
                        value={formData.declarationPlace}
                        onChange={handleInputChange}
                        className="input-field" 
                        placeholder="Enter place"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Password Section */}
                <div className="border-t border-red-200 pt-4 mt-4">
                  <h4 className="text-sm font-bold text-red-800 mb-3">Create Your Account Password</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="form-group">
                      <label className="form-label">Password *</label>
                      <input 
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="input-field" 
                        type="password"
                        placeholder="Enter password"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label className="form-label">Confirm Password *</label>
                      <input 
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="input-field" 
                        type="password"
                        placeholder="Re-enter password"
                        required
                      />
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-2">Password should be at least 8 characters long</p>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* FOOTER */}
        <div className="flex gap-2 sm:gap-3 p-3 sm:p-4 border-t border-red-200 bg-gradient-to-r from-red-50 to-yellow-50 shrink-0 rounded-b-2xl">
          {step > 0 && (
            <button 
              className="btn-outline-red text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2" 
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
          
          <button
            className="btn-primary-red ml-auto text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2"
            onClick={() => (step === 8 ? handleSubmit() : setStep(step + 1))}
            disabled={step === 8 && (!formData.declaration || !hasSignature)}
          >
            {step === 8 ? "Complete Registration" : "Continue"}
          </button>
        </div>

      </div>

      <style jsx>{`
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          margin-bottom: 0.75rem;
        }
        
        .form-group:last-child {
          margin-bottom: 0;
        }
        
        .form-label {
          font-size: 0.6875rem;
          font-weight: 600;
          color: #991B1B;
          padding-left: 0.25rem;
        }
        
        .input-field {
          width: 100%;
          padding: 0.5rem 0.75rem;
          border: 1.5px solid #DC2626;
          border-radius: 0.5rem;
          font-size: 0.6875rem;
          background: white;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .input-field:focus {
          outline: none;
          border-color: #B91C1C;
          box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
        }
        
        .input-field::placeholder {
          color: #9CA3AF;
          font-size: 0.6875rem;
        }
        
        .btn-primary-red {
          background: linear-gradient(135deg, #DC2626, #B91C1C);
          color: white;
          font-weight: 600;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(220, 38, 38, 0.3);
          min-width: 100px;
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
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 80px;
        }
        
        .btn-outline-red:hover {
          background: #FEE2E2;
          transform: translateY(-2px);
          box-shadow: 0 2px 6px rgba(220, 38, 38, 0.2);
        }
        
        .signature-canvas {
          width: 100%;
          height: 100px;
          border: 1.5px solid #DC2626;
          border-radius: 0.5rem;
          background: white;
          cursor: crosshair;
          touch-action: none;
        }

        .overflow-y-auto::-webkit-scrollbar {
          width: 5px;
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
            gap: 0.625rem;
            margin-bottom: 1.25rem;
          }
          
          .form-label {
            font-size: 0.875rem;
          }
          
          .input-field {
            padding: 0.875rem 1.125rem;
            font-size: 0.875rem;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
            border-radius: 0.875rem;
          }
          
          .input-field:focus {
            box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.2);
          }
          
          .input-field::placeholder {
            font-size: 0.875rem;
          }
          
          .signature-canvas {
            height: 120px;
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