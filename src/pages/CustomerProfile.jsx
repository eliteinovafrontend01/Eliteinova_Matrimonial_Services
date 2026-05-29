import React, { useState } from 'react';

const CustomerProfile = () => {
  const [activeSection, setActiveSection] = useState('personal');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: 'Priya Sharma',
    dateOfBirth: '1995-05-15',
    gender: 'Female',
    religion: 'Hindu',
    caste: 'Brahmin',
    mobile: '+91 98765 43210',
    email: 'priya.sharma@example.com',
    address: '123 Marriage Street, Chennai',
    cityDistrict: 'Chennai',
    state: 'Tamil Nadu',
    pinCode: '600001',
  });

  const handleEditChange = (e) => {
    setEditForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    setShowEditModal(false);
  };

  const customerData = {
    id: 'CUST-2024-00456',
    profilePhoto: '',
    personalDetails: {
      fullName: editForm.fullName,
      dateOfBirth: editForm.dateOfBirth,
      age: '28 Years',
      gender: editForm.gender,
      religion: editForm.religion,
      caste: editForm.caste,
      motherTongue: 'Tamil',
      height: '5\'5"',
      weight: '55 kg',
      physicalStatus: 'Normal',
      bodyType: 'Average',
      complexion: 'Fair',
    },
    contactInfo: {
      mobile: editForm.mobile,
      alternateMobile: '+91 87654 32109',
      email: editForm.email,
      address: editForm.address,
      cityDistrict: editForm.cityDistrict,
      state: editForm.state,
      pinCode: editForm.pinCode,
      currentLocation: 'Chennai, Tamil Nadu',
    },
    familyDetails: {
      fatherName: 'Mr. Rajesh Sharma',
      fatherOccupation: 'Business Owner',
      motherName: 'Mrs. Sunita Sharma',
      motherOccupation: 'Homemaker',
      siblings: '1 Brother, 1 Sister',
      familyType: 'Nuclear Family',
      familyStatus: 'Middle Class',
      familyValues: 'Traditional',
    },
    educationCareer: {
      highestEducation: 'M.Tech - Computer Science',
      college: 'Anna University, Chennai',
      occupation: 'Software Engineer',
      company: 'Tech Solutions Pvt Ltd',
      annualIncome: '₹12,00,000',
      workLocation: 'Chennai',
    },
    partnerPreferences: {
      ageRange: '28-32 Years',
      heightRange: '5\'8" - 6\'0"',
      maritalStatus: 'Never Married',
      religion: 'Hindu',
      caste: 'Any',
      education: 'Engineering or Higher',
      occupation: 'Professional',
      location: 'Chennai, Bangalore, Hyderabad',
      annualIncome: '₹10,00,000+',
    },
    hobbiesInterests: {
      hobbies: ['Reading', 'Cooking', 'Travel', 'Music', 'Yoga'],
      interests: ['Technology', 'Photography', 'Food', 'Fitness'],
    },
    servicesInterested: {
      photography: true,
      catering: true,
      weddingHalls: true,
      decorations: true,
      entertainment: false,
      invitation: true,
      styling: true,
    },
  };

  const sections = [
    { id: 'personal', title: 'Personal Details', emoji: '👤' },
    { id: 'contact', title: 'Contact Information', emoji: '📞' },
    { id: 'family', title: 'Family Details', emoji: '👨‍👩‍👧‍👦' },
    { id: 'education', title: 'Education & Career', emoji: '🎓' },
    { id: 'partner', title: 'Partner Preferences', emoji: '💑' },
    { id: 'hobbies', title: 'Hobbies & Interests', emoji: '🎨' },
    { id: 'services', title: 'Wedding Services', emoji: '💒' },
  ];

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

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-red-600 mr-3 rounded-full"></div>
              Personal Details
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <InfoField label="Full Name" value={customerData.personalDetails.fullName} icon="✨" />
                <InfoField label="Date of Birth" value={customerData.personalDetails.dateOfBirth} icon="🎂" />
                <InfoField label="Age" value={customerData.personalDetails.age} icon="📅" />
                <InfoField label="Gender" value={customerData.personalDetails.gender} icon="⚥" />
                <InfoField label="Marital Status" value={customerData.personalDetails.maritalStatus} icon="💍" />
                <InfoField label="Mother Tongue" value={customerData.personalDetails.motherTongue} icon="🗣️" />
              </div>
              <div className="space-y-3">
                <InfoField label="Religion" value={customerData.personalDetails.religion} icon="🕉️" />
                <InfoField label="Caste" value={customerData.personalDetails.caste} icon="👥" />
                <InfoField label="Height" value={customerData.personalDetails.height} icon="📏" />
                <InfoField label="Weight" value={customerData.personalDetails.weight} icon="⚖️" />
                <InfoField label="Body Type" value={customerData.personalDetails.bodyType} icon="💪" />
                <InfoField label="Complexion" value={customerData.personalDetails.complexion} icon="🌟" />
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
                <InfoField label="Mobile Number" value={customerData.contactInfo.mobile} icon="📱" />
                <InfoField label="Alternate Mobile" value={customerData.contactInfo.alternateMobile} icon="📲" />
                <InfoField label="Email ID" value={customerData.contactInfo.email} icon="✉️" />
                <InfoField label="Address" value={customerData.contactInfo.address} icon="🏠" />
              </div>
              <div className="space-y-3">
                <InfoField label="City / District" value={customerData.contactInfo.cityDistrict} icon="🏙️" />
                <InfoField label="State" value={customerData.contactInfo.state} icon="🗺️" />
                <InfoField label="PIN Code" value={customerData.contactInfo.pinCode} icon="📍" />
                <InfoField label="Current Location" value={customerData.contactInfo.currentLocation} icon="🌍" />
              </div>
            </div>
          </div>
        );

      case 'family':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-red-500 mr-3 rounded-full"></div>
              Family Details
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <InfoField label="Father's Name" value={customerData.familyDetails.fatherName} icon="👨" />
                <InfoField label="Father's Occupation" value={customerData.familyDetails.fatherOccupation} icon="💼" />
                <InfoField label="Mother's Name" value={customerData.familyDetails.motherName} icon="👩" />
                <InfoField label="Mother's Occupation" value={customerData.familyDetails.motherOccupation} icon="👗" />
              </div>
              <div className="space-y-3">
                <InfoField label="Siblings" value={customerData.familyDetails.siblings} icon="👫" />
                <InfoField label="Family Type" value={customerData.familyDetails.familyType} icon="🏡" />
                <InfoField label="Family Status" value={customerData.familyDetails.familyStatus} icon="💰" />
                <InfoField label="Family Values" value={customerData.familyDetails.familyValues} icon="💝" />
              </div>
            </div>
          </div>
        );

      case 'education':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-yellow-500 mr-3 rounded-full"></div>
              Education & Career
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <InfoField label="Highest Education" value={customerData.educationCareer.highestEducation} icon="🎓" />
                <InfoField label="College / University" value={customerData.educationCareer.college} icon="🏛️" />
                <InfoField label="Occupation" value={customerData.educationCareer.occupation} icon="💻" />
              </div>
              <div className="space-y-3">
                <InfoField label="Company" value={customerData.educationCareer.company} icon="🏢" />
                <InfoField label="Annual Income" value={customerData.educationCareer.annualIncome} icon="💰" />
                <InfoField label="Work Location" value={customerData.educationCareer.workLocation} icon="📍" />
              </div>
            </div>
          </div>
        );

      case 'partner':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-yellow-500 mr-3 rounded-full"></div>
              Partner Preferences
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <InfoField label="Preferred Age Range" value={customerData.partnerPreferences.ageRange} icon="📊" />
                <InfoField label="Preferred Height Range" value={customerData.partnerPreferences.heightRange} icon="📏" />
                <InfoField label="Marital Status" value={customerData.partnerPreferences.maritalStatus} icon="💍" />
                <InfoField label="Religion" value={customerData.partnerPreferences.religion} icon="🕉️" />
                <InfoField label="Caste" value={customerData.partnerPreferences.caste} icon="👥" />
              </div>
              <div className="space-y-3">
                <InfoField label="Education" value={customerData.partnerPreferences.education} icon="🎓" />
                <InfoField label="Occupation" value={customerData.partnerPreferences.occupation} icon="💼" />
                <InfoField label="Annual Income" value={customerData.partnerPreferences.annualIncome} icon="💰" />
                <InfoField label="Preferred Location" value={customerData.partnerPreferences.location} icon="🌍" />
              </div>
            </div>
          </div>
        );

      case 'hobbies':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-red-500 mr-3 rounded-full"></div>
              Hobbies & Interests
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="bg-white p-2 rounded-lg shadow-sm flex-shrink-0"><span>🎯</span></div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Hobbies</label>
                  <div className="flex flex-wrap gap-2">
                    {customerData.hobbiesInterests.hobbies.map((hobby, i) => (
                      <span key={i} className="inline-flex items-center bg-red-50 text-red-700 text-sm px-3 py-1.5 rounded-full border border-red-200 hover:shadow-md transform hover:scale-105 transition-all duration-300">
                        <span className="mr-1">
                          {hobby === 'Reading' && '📚'}
                          {hobby === 'Cooking' && '🍳'}
                          {hobby === 'Travel' && '✈️'}
                          {hobby === 'Music' && '🎵'}
                          {hobby === 'Yoga' && '🧘'}
                        </span>
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className="bg-white p-2 rounded-lg shadow-sm flex-shrink-0"><span>💫</span></div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {customerData.hobbiesInterests.interests.map((interest, i) => (
                      <span key={i} className="inline-flex items-center bg-yellow-50 text-yellow-700 text-sm px-3 py-1.5 rounded-full border border-yellow-200 hover:shadow-md transform hover:scale-105 transition-all duration-300">
                        <span className="mr-1">
                          {interest === 'Technology' && '💻'}
                          {interest === 'Photography' && '📸'}
                          {interest === 'Food' && '🍜'}
                          {interest === 'Fitness' && '💪'}
                        </span>
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5 flex items-center">
              <div className="w-1.5 h-7 bg-blue-500 mr-3 rounded-full"></div>
              Wedding Services Interested
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(customerData.servicesInterested).map(([service, interested]) => (
                <div key={service} className={`group p-4 rounded-xl border-2 transform hover:scale-105 transition-all duration-300 ${
                  interested
                    ? 'bg-green-50 border-green-300 hover:shadow-lg hover:border-green-400'
                    : 'bg-gray-50 border-gray-200 hover:shadow-md hover:border-gray-300'
                }`}>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-gray-800 capitalize flex items-center gap-2">
                      <span>
                        {service === 'photography' && '📸'}
                        {service === 'catering' && '🍽️'}
                        {service === 'weddingHalls' && '🏰'}
                        {service === 'decorations' && '🎨'}
                        {service === 'entertainment' && '🎭'}
                        {service === 'invitation' && '💌'}
                        {service === 'styling' && '💇'}
                      </span>
                      {service.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    {interested ? (
                      <span className="text-green-600 group-hover:scale-110 transition-transform duration-300">✅</span>
                    ) : (
                      <span className="text-gray-400 group-hover:scale-110 transition-transform duration-300">❌</span>
                    )}
                  </div>
                  <p className={`text-xs mt-2 font-medium ${interested ? 'text-green-600' : 'text-gray-500'}`}>
                    {interested ? '✓ Interested' : '✗ Not Interested'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
            <div className="bg-gradient-to-r from-red-800 to-red-600 px-6 py-4 flex items-center justify-between">
              <h2 className="text-white text-lg font-bold flex items-center gap-2">
                <span>✏️</span> Edit Profile
              </h2>
              <button onClick={() => setShowEditModal(false)} className="text-white/80 hover:text-white text-xl">✕</button>
            </div>
            <div className="px-6 py-5 space-y-4 max-h-[60vh] overflow-y-auto">
              {[
                { name: 'fullName', label: 'Full Name', emoji: '✨' },
                { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', emoji: '🎂' },
                { name: 'gender', label: 'Gender', emoji: '⚥' },
                { name: 'religion', label: 'Religion', emoji: '🕉️' },
                { name: 'caste', label: 'Caste', emoji: '👥' },
                { name: 'mobile', label: 'Mobile Number', emoji: '📱' },
                { name: 'email', label: 'Email ID', emoji: '✉️' },
                { name: 'address', label: 'Address', emoji: '🏠' },
                { name: 'cityDistrict', label: 'City / District', emoji: '🏙️' },
                { name: 'state', label: 'State', emoji: '🗺️' },
                { name: 'pinCode', label: 'PIN Code', emoji: '📍' },
              ].map((field) => (
                <div key={field.name} className="space-y-1">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1">
                    <span>{field.emoji}</span> {field.label}
                  </label>
                  <input
                    type={field.type || 'text'}
                    name={field.name}
                    value={editForm[field.name]}
                    onChange={handleEditChange}
                    className="w-full border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-lg px-3 py-2 text-sm text-gray-800 outline-none transition-all"
                  />
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
              <button onClick={() => setShowEditModal(false)} className="px-5 py-2 rounded-lg border-2 border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-100 transition-all">
                Cancel
              </button>
              <button onClick={handleSave} className="px-5 py-2 rounded-lg bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-all shadow-lg">
                💾 Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-6xl">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Photo */}
            <div className="relative flex-shrink-0">
              <div className="w-36 h-36 rounded-2xl overflow-hidden border-4 border-red-100 shadow-lg bg-gradient-to-br from-red-100 to-red-200">
                {customerData.profilePhoto ? (
                  <img src={customerData.profilePhoto} alt={customerData.personalDetails.fullName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-red-600 text-6xl font-bold">
                    {customerData.personalDetails.fullName.charAt(0)}
                  </div>
                )}
              </div>
              <button
                onClick={() => setShowEditModal(true)}
                className="absolute bottom-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 text-sm"
              >
                ✏️
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-800 mb-1">{customerData.personalDetails.fullName}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-gray-500 text-sm mb-4">
                <span className="flex items-center gap-1"><span>📍</span>{customerData.contactInfo.currentLocation}</span>
                <span className="flex items-center gap-1"><span>💼</span>{customerData.educationCareer.occupation} at {customerData.educationCareer.company}</span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="flex items-center gap-1.5 bg-red-100 text-red-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                  <span>🆔</span> {customerData.id}
                </span>
                {/* <span className="flex items-center gap-1.5 bg-yellow-100 text-yellow-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                  <span>💍</span> {customerData.personalDetails.maritalStatus}
                </span> */}
                <span className="flex items-center gap-1.5 bg-purple-100 text-purple-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                  <span>⚥</span> {customerData.personalDetails.gender}, {customerData.personalDetails.age}
                </span>
                {/* <span className="flex items-center gap-1.5 bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                  <span>🎓</span> {customerData.educationCareer.highestEducation}
                </span> */}
                {/* <span className="flex items-center gap-1.5 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm">
                  <span>💰</span> {customerData.educationCareer.annualIncome}
                </span> */}
              </div>

              {/* Contact Buttons */}
              <div className="flex flex-wrap gap-2 mt-3 justify-center md:justify-start">
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition">
                  <span>📞</span> {customerData.contactInfo.mobile}
                </button>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition">
                  <span>✉️</span> {customerData.contactInfo.email}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation — all 7 sections, exact titles from original code */}
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

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-6">
          {renderSectionContent()}
        </div>

        {/* Quick Actions */}
        {/* <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <div className="w-1.5 h-6 bg-red-600 mr-3 rounded-full"></div>
            Quick Actions
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
              <span className="group-hover:rotate-12 transition-transform">🔍</span> Find Matches
            </button>
            <button className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
              <span className="group-hover:rotate-12 transition-transform">🛍️</span> Browse Vendors
            </button>
            <button className="flex-1 bg-white border-2 border-red-600 text-red-700 py-3 px-4 rounded-xl font-bold hover:bg-red-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
              <span className="group-hover:rotate-12 transition-transform">📅</span> My Events
            </button>
          </div>
        </div> */}

      </div>
    </div>
  );
};

export default CustomerProfile;