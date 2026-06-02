import React, { useState } from 'react';

// ─── placeholder image paths (keep your own imports in real app) ───
const vendorLogo = '';
const companyLogo = ''; // Your company logo
const sampleWork1 = '';
const sampleWork2 = '';
const sampleWork3 = '';
const sampleWork4 = '';

const VendorProfile = () => {
  const [activeSection, setActiveSection] = useState('basic');
  const [showFullDetails, setShowFullDetails] = useState(false);

  // ── vendor data ──
  const vendorData = {
    id: 'VEN-2024-00123',
    basicDetails: {
      logo: vendorLogo,
      businessName: 'Capture Moments Wedding Photography',
      ownerName: 'Rajesh Kumar',
      designation: 'Lead Photographer & Owner',
      typeOfService: [
        'Wedding Photography',
        'Candid Photography',
        'Videography',
        'Pre-Wedding Shoot',
        'Drone Coverage',
      ],
      yearsOfExperience: '8 Years',
      businessType: 'Proprietorship',
    },
    contactInfo: {
      mobile: '+91 98765 43210',
      alternateMobile: '+91 87654 32109',
      email: 'capturemoments@example.com',
      officeAddress: '123 Wedding Street, Photography Nagar',
      cityDistrict: 'Chennai',
      state: 'Tamil Nadu',
      pinCode: '600001',
      currentLocation: 'Chennai, Tamil Nadu',
      website: 'www.capturemoments.com',
    },
    businessLegal: {
      gstNumber: '27ABCDE1234F1Z5',
      panNumber: 'ABCDE1234F',
      yearsOfExperience: '8 Years',
    },
    equipmentTeam: {
      cameraModels: ['Canon EOS R5', 'Sony A7III', 'Nikon D850'],
      videoEquipment: ['DJI Ronin-S', 'Sony PXW-FS7', 'DJI Mavic 3 Pro'],
      teamMembers: '8 Members',
      backupEquipment: 'Yes',
    },
    serviceCoverage: {
      preferredLocations: ['Local', 'Within State', 'Outstation'],
      travelCharges: 'Yes (Negotiable)',
    },
    packagesPricing: {
      basicWeddingPackage: '₹50,000',
      fullWeddingPackage: '₹1,20,000',
      candidPhotography: '₹25,000',
      videography: '₹75,000',
      albumCharges: '₹15,000 (Separate)',
    },
    deliveryTimeline: {
      photoDelivery: '15 Days',
      videoDelivery: '30 Days',
      albumDelivery: '45 Days',
    },
    portfolio: {
      website: 'www.capturemoments.com/portfolio',
      instagram: '@capturemoments_weddings',
      facebook: '/CaptureMomentsWeddings',
      driveLink: 'drive.google.com/sample-work',
    },
    bankDetails: {
      accountHolder: 'Rajesh Kumar',
      bankName: 'State Bank of India',
      accountNumber: '123456789012',
      ifscCode: 'SBIN0001234',
      upiId: 'capturemoments@upi',
    },
    declaration: {
      signature: 'Rajesh Kumar',
      date: '2024-01-15',
      place: 'Chennai',
    },
    workPhotos: [sampleWork1, sampleWork2, sampleWork3, sampleWork4],
  };

  const sections = [
    { id: 'basic', title: 'Basic Details', emoji: '👤' },
    { id: 'contact', title: 'Contact Info', emoji: '📞' },
    { id: 'legal', title: 'Legal Details', emoji: '📋' },
    { id: 'equipment', title: 'Equipment', emoji: '📷' },
    { id: 'coverage', title: 'Coverage', emoji: '🗺️' },
    { id: 'pricing', title: 'Pricing', emoji: '💰' },
    { id: 'delivery', title: 'Timeline', emoji: '⏰' },
    { id: 'portfolio', title: 'Portfolio', emoji: '🎨' },
    { id: 'bank', title: 'Bank Info', emoji: '🏦' },
    { id: 'declaration', title: 'Declaration', emoji: '✍️' },
  ];

  // Function to go to next section
  const goToNextSection = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  // Function to go to previous section
  const goToPreviousSection = () => {
    const currentIndex = sections.findIndex(s => s.id === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  // InfoField component matching CustomerProfile theme
  const InfoField = ({ label, value, icon }) => (
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
      <div className="bg-white p-2 rounded-lg shadow-sm flex-shrink-0">
        <span className="text-base">{icon}</span>
      </div>
      <div className="flex-1 min-w-0">
        <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
          {label}
        </label>
        <div className="p-2 text-sm text-gray-800 bg-white rounded-lg border border-gray-200 font-medium">
          {value || 'Not specified'}
        </div>
      </div>
    </div>
  );

  // ── section renderers ──
  const renderSectionContent = (sectionId = activeSection) => {
    switch (sectionId) {
      case 'basic':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-red-600 mr-3 rounded-full"></div>
              Basic Details
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <InfoField label="Business Name" value={vendorData.basicDetails.businessName} icon="🏢" />
                <InfoField label="Owner Name" value={vendorData.basicDetails.ownerName} icon="👨‍💼" />
                <InfoField label="Designation" value={vendorData.basicDetails.designation} icon="✨" />
                <InfoField label="Business Type" value={vendorData.basicDetails.businessType} icon="🏛️" />
              </div>
              <div className="space-y-3">
                <InfoField label="Years of Experience" value={vendorData.basicDetails.yearsOfExperience} icon="📅" />
                <InfoField label="Type of Service" value={vendorData.basicDetails.typeOfService.join(', ')} icon="📸" />
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-yellow-500 mr-3 rounded-full"></div>
              Contact Information
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <InfoField label="Mobile Number" value={vendorData.contactInfo.mobile} icon="📱" />
                <InfoField label="Alternate Mobile" value={vendorData.contactInfo.alternateMobile} icon="📲" />
                <InfoField label="Email ID" value={vendorData.contactInfo.email} icon="✉️" />
                <InfoField label="Office Address" value={vendorData.contactInfo.officeAddress} icon="🏠" />
              </div>
              <div className="space-y-3">
                <InfoField label="City / District" value={vendorData.contactInfo.cityDistrict} icon="🏙️" />
                <InfoField label="State" value={vendorData.contactInfo.state} icon="🗺️" />
                <InfoField label="PIN Code" value={vendorData.contactInfo.pinCode} icon="📍" />
                <InfoField label="Current Location" value={vendorData.contactInfo.currentLocation} icon="🌍" />
                <InfoField label="Website" value={vendorData.contactInfo.website} icon="🌐" />
              </div>
            </div>
          </div>
        );

      case 'legal':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-red-500 mr-3 rounded-full"></div>
              Legal Details
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <InfoField label="GST Number" value={vendorData.businessLegal.gstNumber} icon="📄" />
                <InfoField label="PAN Number" value={vendorData.businessLegal.panNumber} icon="🆔" />
                <InfoField label="Years of Experience" value={vendorData.businessLegal.yearsOfExperience} icon="📅" />
              </div>
            </div>
          </div>
        );

      case 'equipment':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-yellow-500 mr-3 rounded-full"></div>
              Equipment & Team
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <InfoField label="Camera Models" value={vendorData.equipmentTeam.cameraModels.join(', ')} icon="📷" />
                <InfoField label="Video Equipment" value={vendorData.equipmentTeam.videoEquipment.join(', ')} icon="🎥" />
              </div>
              <div className="space-y-3">
                <InfoField label="Team Members" value={vendorData.equipmentTeam.teamMembers} icon="👥" />
                <InfoField label="Backup Equipment" value={vendorData.equipmentTeam.backupEquipment} icon="🔄" />
              </div>
            </div>
          </div>
        );

      case 'coverage':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-yellow-500 mr-3 rounded-full"></div>
              Service Coverage
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <InfoField label="Preferred Locations" value={vendorData.serviceCoverage.preferredLocations.join(', ')} icon="🗺️" />
                <InfoField label="Travel Charges" value={vendorData.serviceCoverage.travelCharges} icon="🚗" />
              </div>
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-yellow-500 mr-3 rounded-full"></div>
              Packages & Pricing
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <InfoField label="Basic Wedding Package" value={vendorData.packagesPricing.basicWeddingPackage} icon="💎" />
                <InfoField label="Full Wedding Package" value={vendorData.packagesPricing.fullWeddingPackage} icon="👑" />
                <InfoField label="Candid Photography" value={vendorData.packagesPricing.candidPhotography} icon="📸" />
              </div>
              <div className="space-y-3">
                <InfoField label="Videography" value={vendorData.packagesPricing.videography} icon="🎬" />
                <InfoField label="Album Charges" value={vendorData.packagesPricing.albumCharges} icon="📖" />
              </div>
            </div>
          </div>
        );

      case 'delivery':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-yellow-500 mr-3 rounded-full"></div>
              Delivery Timeline
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <InfoField label="Photo Delivery" value={vendorData.deliveryTimeline.photoDelivery} icon="📸" />
                <InfoField label="Video Delivery" value={vendorData.deliveryTimeline.videoDelivery} icon="🎥" />
                <InfoField label="Album Delivery" value={vendorData.deliveryTimeline.albumDelivery} icon="📚" />
              </div>
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-red-500 mr-3 rounded-full"></div>
              Portfolio & Social Media
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <InfoField label="Website" value={vendorData.portfolio.website} icon="🌐" />
                <InfoField label="Instagram" value={vendorData.portfolio.instagram} icon="📱" />
                <InfoField label="Facebook" value={vendorData.portfolio.facebook} icon="👍" />
                <InfoField label="Google Drive Link" value={vendorData.portfolio.driveLink} icon="☁️" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Sample Work Photos</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-24 bg-gradient-to-br from-red-50 to-amber-50 rounded-xl border-2 border-dashed border-red-200 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
                    <span className="text-2xl mb-1">📷</span>
                    <span className="text-xs text-amber-600 font-semibold">Sample {i}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'bank':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-blue-500 mr-3 rounded-full"></div>
              Bank Information
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <InfoField label="Account Holder Name" value={vendorData.bankDetails.accountHolder} icon="👤" />
                <InfoField label="Bank Name" value={vendorData.bankDetails.bankName} icon="🏦" />
                <InfoField label="Account Number" value={vendorData.bankDetails.accountNumber} icon="💳" />
                <InfoField label="IFSC Code" value={vendorData.bankDetails.ifscCode} icon="🔢" />
                <InfoField label="UPI ID" value={vendorData.bankDetails.upiId} icon="📱" />
              </div>
            </div>
          </div>
        );

      case 'declaration':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-red-500 mr-3 rounded-full"></div>
              Declaration
            </h2>
            <div className="bg-gradient-to-br from-red-50 to-amber-50 rounded-2xl p-6 border border-red-200">
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                I hereby declare that the above information is true and correct. I agree to provide photography services professionally for marriage events as per agreed terms and conditions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-red-200">
                <InfoField label="Vendor Signature" value={vendorData.declaration.signature} icon="✍️" />
                <InfoField label="Date" value={vendorData.declaration.date} icon="📅" />
                <InfoField label="Place" value={vendorData.declaration.place} icon="📍" />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Render all sections for full details view
  const renderAllSections = () => {
    return sections.map((section, index) => (
      <div key={section.id} className={`${index !== sections.length - 1 ? 'mb-8' : 'mb-6'}`}>
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          {renderSectionContent(section.id)}
        </div>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-6xl">

        {/* Profile Card - Matching CustomerProfile theme */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Logo / Photo */}
            <div className="relative flex-shrink-0">
              <div className="w-36 h-36 rounded-2xl overflow-hidden border-4 border-red-100 shadow-lg bg-gradient-to-br from-red-100 to-amber-100 flex items-center justify-center">
                {vendorData.basicDetails.logo ? (
                  <img src={vendorData.basicDetails.logo} alt={vendorData.basicDetails.businessName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-red-600 text-5xl font-bold">
                    {vendorData.basicDetails.businessName.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-1">{vendorData.basicDetails.businessName}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-500 text-sm mb-4">
                <span className="flex items-center gap-1"><span>📍</span>{vendorData.contactInfo.currentLocation}</span>
                <span className="flex items-center gap-1"><span>⭐</span>{vendorData.basicDetails.yearsOfExperience}</span>
                <span className="flex items-center gap-1"><span>🏛️</span>{vendorData.basicDetails.businessType}</span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="flex items-center gap-1.5 bg-red-100 text-red-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                  <span>🆔</span> {vendorData.id}
                </span>
                <span className="flex items-center gap-1.5 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                  <span>👨‍💼</span> {vendorData.basicDetails.ownerName}
                </span>
                <span className="flex items-center gap-1.5 bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                  <span>✨</span> {vendorData.basicDetails.designation}
                </span>
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition">
                  <span>📞</span> {vendorData.contactInfo.mobile}
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition">
                  <span>✉️</span> {vendorData.contactInfo.email}
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition">
                  <span>🌐</span> {vendorData.contactInfo.website}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full View Toggle Button - Matching CustomerProfile style */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowFullDetails(prev => !prev)}
            className="inline-flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-5 py-2.5 text-gray-700 text-sm font-semibold hover:bg-gray-50 shadow-sm transition-all"
          >
            {showFullDetails ? (
              <>
                <span>←</span> Normal View
              </>
            ) : (
              <>
                <span>👁️</span> Full View
              </>
            )}
          </button>
        </div>

        {/* Tab Navigation - Matching CustomerProfile theme */}
        {!showFullDetails && (
          <div className="bg-white rounded-2xl shadow-sm p-2 mb-6 border border-gray-200">
            <div className="flex overflow-x-auto gap-1">
              {sections.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition whitespace-nowrap ${
                    activeSection === tab.id
                      ? 'bg-red-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{tab.emoji}</span>
                  {tab.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content or Full Details */}
        {!showFullDetails ? (
          <>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
              {renderSectionContent()}
              
              {/* Navigation Buttons */}
              <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center">
                <button
                  onClick={goToPreviousSection}
                  disabled={activeSection === sections[0].id}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                    activeSection === sections[0].id
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-red-600 border border-red-200 hover:bg-red-50'
                  }`}
                >
                  ← Back
                </button>

                <div className="flex gap-1.5">
                  {sections.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSection(sections[i].id)}
                      className={`h-1.5 rounded-full transition-all ${
                        sections.findIndex(s => s.id === activeSection) === i
                          ? 'w-5 bg-red-600'
                          : 'w-1.5 bg-red-200'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={goToNextSection}
                  disabled={activeSection === sections[sections.length - 1].id}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm text-white transition-all ${
                    activeSection === sections[sections.length - 1].id
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Contact Cards - Matching CustomerProfile style */}
            <ContactCards vendorData={vendorData} companyLogo={companyLogo} />
          </>
        ) : (
          <>
            <div className="mb-6">
              {renderAllSections()}
            </div>
            <ContactCards vendorData={vendorData} companyLogo={companyLogo} />
          </>
        )}

      </div>
    </div>
  );
};

// Contact Cards Component - Matching CustomerProfile theme
const ContactCards = ({ vendorData, companyLogo }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
      <div className="w-1.5 h-6 bg-red-600 mr-3 rounded-full"></div>
      Vendor Contact Details
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Primary Address */}
      <div className="space-y-3">
        <InfoField label="Primary Mobile" value={vendorData.contactInfo.mobile} icon="📞" />
        <InfoField label="Alternate Mobile" value={vendorData.contactInfo.alternateMobile} icon="📲" />
        <InfoField label="Email ID" value={vendorData.contactInfo.email} icon="✉️" />
      </div>

      {/* Secondary Address */}
      <div className="space-y-3">
        <InfoField label="Office Address" value={vendorData.contactInfo.officeAddress} icon="🏢" />
        <InfoField label="City / District" value={vendorData.contactInfo.cityDistrict} icon="🏙️" />
        <InfoField label="State / PIN Code" value={`${vendorData.contactInfo.state} - ${vendorData.contactInfo.pinCode}`} icon="📍" />
      </div>
    </div>

    {/* Enquiry Section */}
    <div className="mt-6 pt-4 border-t border-gray-200">
      <h3 className="text-md font-bold text-gray-800 mb-3 flex items-center">
        <span className="mr-2">💼</span> For Enquiry - Eliteinova
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <InfoField label="Support Number" value="+91 99999 88888" icon="📱" />
        <InfoField label="Support Email" value="support@eliteinova.com" icon="✉️" />
        <InfoField label="Working Hours" value="Mon-Sat: 9AM-7PM" icon="🕒" />
        <InfoField label="Office Address" value="123 Elite Plaza, Chennai - 600001" icon="📍" />
      </div>
    </div>
  </div>
);

// InfoField component matching CustomerProfile theme
const InfoField = ({ label, value, icon }) => (
  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
    <div className="bg-white p-2 rounded-lg shadow-sm flex-shrink-0">
      <span className="text-base">{icon}</span>
    </div>
    <div className="flex-1 min-w-0">
      <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
        {label}
      </label>
      <div className="p-2 text-sm text-gray-800 bg-white rounded-lg border border-gray-200 font-medium break-all">
        {value || 'Not specified'}
      </div>
    </div>
  </div>
);

export default VendorProfile;