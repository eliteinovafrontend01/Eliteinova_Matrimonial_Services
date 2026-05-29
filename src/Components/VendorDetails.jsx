import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

// Configuration for WhatsApp numbers
const WHATSAPP_CONFIG = {
  OFFICE_NUMBER: '+917397260093', // Office number for notifications
};

const VendorDetails = ({ isOpen, onClose, vendor, category }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);
  const [showAllPortfolio, setShowAllPortfolio] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isSendingWhatsApp, setIsSendingWhatsApp] = useState(false);
  const [enquiryStatus, setEnquiryStatus] = useState(null);

  // Enquiry form states
  const [step, setStep] = useState(1);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const simulatedOTPRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    eventDate: '',
    eventTime: '',
    budget: '',
    serviceTypes: [],
    preferredLocation: '',
  });

  // Store enquiry ID for tracking
  const [enquiryId, setEnquiryId] = useState(null);

  // Get available locations from vendor data
  const availableLocations = useMemo(() => {
    if (vendor && vendor.availableLocations) {
      return vendor.availableLocations;
    }
    return ['Chennai', 'Coimbatore', 'Madurai', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune', 'Ahmedabad', 'Kochi'];
  }, [vendor]);

  // Get service types from vendor data
  const serviceTypes = useMemo(() => {
    if (vendor && vendor.services) {
      return vendor.services;
    }
    return ['Wedding Photography', 'Candid Photography', 'Pre-wedding Shoot', 'Event Coverage', 'Cinematic Video'];
  }, [vendor]);

  // Handle service type selection
  const handleServiceTypeChange = useCallback((service) => {
    setFormData(prev => {
      const currentServices = [...prev.serviceTypes];
      if (currentServices.includes(service)) {
        return { ...prev, serviceTypes: currentServices.filter(s => s !== service) };
      } else {
        return { ...prev, serviceTypes: [...currentServices, service] };
      }
    });
  }, []);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen || showEnquiryModal || showSuccessMessage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, showEnquiryModal, showSuccessMessage]);

  // Reset state when vendor changes
  useEffect(() => {
    if (isOpen) {
      setSelectedImage(null);
      setShowEnquiryModal(false);
      setShowAllPortfolio(false);
      setShowAllReviews(false);
      setShowSuccessMessage(false);
      setIsSendingWhatsApp(false);
      setEnquiryStatus(null);
      setEnquiryId(null);
      setStep(1);
      setPhoneVerified(false);
      setOtpSent(false);
      setOtp('');
      setVerificationError('');
      setFormData({
        name: '',
        phoneNumber: '',
        address: '',
        eventDate: '',
        eventTime: '',
        budget: '',
        serviceTypes: [],
        preferredLocation: '',
      });
    }
  }, [isOpen, vendor]);

  // Generate unique enquiry ID
  const generateEnquiryId = useCallback(() => {
    return 'ENQ-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  }, []);

  // Function to send WhatsApp message
  const sendWhatsAppMessage = useCallback(async (phoneNumber, message) => {
    const formattedNumber = phoneNumber.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }, []);

  // Handle interest submission
  const handleInterestSubmit = useCallback(async () => {
    setIsSendingWhatsApp(true);
    
    try {
      const newEnquiryId = generateEnquiryId();
      setEnquiryId(newEnquiryId);
      
      console.log('Interest submitted for vendor:', vendor.businessName || vendor.name);
      console.log('Customer details:', formData);
      console.log('Enquiry ID:', newEnquiryId);
      
      const vendorPhone = vendor.whatsappNumber || vendor.phone || vendor.contactNumber;
      
      if (!vendorPhone) {
        console.error('Vendor WhatsApp number not found');
      }

      const eventDateObj = new Date(formData.eventDate);
      const formattedDate = eventDateObj.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const selectedServicesText = formData.serviceTypes.length > 0 
        ? formData.serviceTypes.join(', ') 
        : 'Not specified';

      // Send notification to office
      const officeMessage = `🏢 *NEW ENQUIRY RECEIVED*\n\n` +
        `*Enquiry ID:* ${newEnquiryId}\n` +
        `*Vendor:* ${vendor.businessName || vendor.name}\n` +
        `*Category:* ${category}\n` +
        `*Customer:* ${formData.name}\n` +
        `*Phone:* ${formData.phoneNumber}\n` +
        `*Address:* ${formData.address}\n` +
        `*Time:* ${new Date().toLocaleString()}\n\n` +
        `*Event Details:*\n` +
        `📅 Date: ${formattedDate}\n` +
        `⏰ Time: ${formData.eventTime}\n` +
        `💰 Budget: ₹${formData.budget}\n` +
        `📍 Preferred Location: ${formData.preferredLocation}\n` +
        `📋 Services Requested: ${selectedServicesText}\n\n` +
        `*Please respond:*\n` +
        `✅ *ACCEPT* - Reply with "ACCEPT ${newEnquiryId}"\n` +
        `❌ *DECLINE* - Reply with "DECLINE ${newEnquiryId}"\n\n` +
        `This will determine if the enquiry is forwarded to the vendor.`;

      await sendWhatsAppMessage(WHATSAPP_CONFIG.OFFICE_NUMBER, officeMessage);

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Send event details to vendor
      if (vendorPhone) {
        const vendorMessage = `🎉 *NEW EVENT ENQUIRY*\n\n` +
          `*Enquiry ID:* ${newEnquiryId}\n\n` +
          `*Event Details:*\n` +
          `📅 Date: ${formattedDate}\n` +
          `⏰ Time: ${formData.eventTime}\n` +
          `💰 Budget: ₹${formData.budget}\n` +
          `📍 Preferred Location: ${formData.preferredLocation}\n` +
          `📋 Services Requested: ${selectedServicesText}\n\n` +
          `*Please respond:*\n` +
          `✅ *ACCEPT* - Reply with "ACCEPT ${newEnquiryId}" to get customer contact details\n` +
          `❌ *DECLINE* - Reply with "DECLINE ${newEnquiryId}" to reject this enquiry\n\n` +
          `*Note:* Customer contact details will only be shared after you accept.`;

        await sendWhatsAppMessage(vendorPhone, vendorMessage);
      }

      setEnquiryStatus('pending');
      setShowEnquiryModal(false);
      setShowSuccessMessage(true);
      
    } catch (error) {
      console.error('Error sending WhatsApp messages:', error);
    } finally {
      setIsSendingWhatsApp(false);
    }
  }, [formData, vendor, category, sendWhatsAppMessage, generateEnquiryId]);

  // Handle office accepting the enquiry
  const handleOfficeAccept = useCallback(() => {
    console.log('Office accepted enquiry:', enquiryId);
    setEnquiryStatus('office_accepted');
    
    const selectedServicesText = formData.serviceTypes.length > 0 
      ? formData.serviceTypes.join(', ') 
      : 'Not specified';

    if (vendor?.whatsappNumber) {
      const contactMessage = `✅ *ENQUIRY APPROVED - CUSTOMER CONTACT DETAILS*\n\n` +
        `*Enquiry ID:* ${enquiryId}\n\n` +
        `*Customer Information:*\n` +
        `👤 Name: ${formData.name}\n` +
        `📞 Phone: ${formData.phoneNumber}\n` +
        `📍 Address: ${formData.address}\n\n` +
        `*Event Details:*\n` +
        `📅 Date: ${formData.eventDate}\n` +
        `⏰ Time: ${formData.eventTime}\n` +
        `💰 Budget: ₹${formData.budget}\n` +
        `📍 Preferred Location: ${formData.preferredLocation}\n` +
        `📋 Services Requested: ${selectedServicesText}\n\n` +
        `Please contact the customer to proceed with the booking.`;

      sendWhatsAppMessage(vendor.whatsappNumber, contactMessage);
    }
    
    if (formData?.phoneNumber) {
      const customerMessage = `✅ *ENQUIRY ACCEPTED*\n\n` +
        `Good news! Your enquiry has been accepted. ${vendor?.businessName || vendor?.name} will contact you shortly.\n\n` +
        `*Enquiry ID:* ${enquiryId}`;
      
      sendWhatsAppMessage(formData.phoneNumber, customerMessage);
    }
  }, [enquiryId, vendor, formData, sendWhatsAppMessage]);

  // Handle office declining the enquiry
  const handleOfficeDecline = useCallback(() => {
    console.log('Office declined enquiry:', enquiryId);
    setEnquiryStatus('office_declined');
    
    if (vendor?.whatsappNumber) {
      const declineMessage = `❌ *ENQUIRY DECLINED*\n\n` +
        `*Enquiry ID:* ${enquiryId}\n\n` +
        `This enquiry has been declined by our team. Please ignore this request.`;
      
      sendWhatsAppMessage(vendor.whatsappNumber, declineMessage);
    }
    
    if (formData?.phoneNumber) {
      const customerMessage = `❌ *ENQUIRY UPDATE*\n\n` +
        `We regret to inform you that your enquiry could not be processed at this time. We'll help you find another vendor.`;
      
      sendWhatsAppMessage(formData.phoneNumber, customerMessage);
    }
  }, [enquiryId, vendor, formData, sendWhatsAppMessage]);

  // Handle vendor accepting the enquiry
  const handleVendorAccept = useCallback(() => {
    console.log('Vendor accepted enquiry:', enquiryId);
    setEnquiryStatus('vendor_accepted');
    
    const selectedServicesText = formData.serviceTypes.length > 0 
      ? formData.serviceTypes.join(', ') 
      : 'Not specified';

    if (vendor?.whatsappNumber) {
      const contactMessage = `📞 *CUSTOMER CONTACT DETAILS*\n\n` +
        `*Enquiry ID:* ${enquiryId}\n\n` +
        `*Customer Information:*\n` +
        `👤 Name: ${formData.name}\n` +
        `📞 Phone: ${formData.phoneNumber}\n` +
        `📍 Address: ${formData.address}\n\n` +
        `*Event Details:*\n` +
        `📅 Date: ${formData.eventDate}\n` +
        `⏰ Time: ${formData.eventTime}\n` +
        `💰 Budget: ₹${formData.budget}\n` +
        `📍 Preferred Location: ${formData.preferredLocation}\n` +
        `📋 Services Requested: ${selectedServicesText}\n\n` +
        `Please contact the customer to proceed with the booking.`;

      sendWhatsAppMessage(vendor.whatsappNumber, contactMessage);
    }
    
    const officeMessage = `✅ *VENDOR ACCEPTED ENQUIRY*\n\n` +
      `*Enquiry ID:* ${enquiryId}\n` +
      `*Vendor:* ${vendor?.businessName || vendor?.name}\n\n` +
      `The vendor has accepted the enquiry and will contact the customer.`;
    
    sendWhatsAppMessage(WHATSAPP_CONFIG.OFFICE_NUMBER, officeMessage);
    
    if (formData?.phoneNumber) {
      const customerMessage = `✅ *ENQUIRY ACCEPTED*\n\n` +
        `Good news! ${vendor?.businessName || vendor?.name} has accepted your enquiry and will contact you shortly.\n\n` +
        `*Enquiry ID:* ${enquiryId}`;
      
      sendWhatsAppMessage(formData.phoneNumber, customerMessage);
    }
  }, [enquiryId, vendor, formData, sendWhatsAppMessage]);

  // Handle vendor declining the enquiry
  const handleVendorDecline = useCallback(() => {
    console.log('Vendor declined enquiry:', enquiryId);
    setEnquiryStatus('vendor_declined');
    
    const declineMessage = `❌ *VENDOR DECLINED ENQUIRY*\n\n` +
      `*Enquiry ID:* ${enquiryId}\n` +
      `*Vendor:* ${vendor?.businessName || vendor?.name}\n\n` +
      `The vendor has declined this enquiry.`;
    
    sendWhatsAppMessage(WHATSAPP_CONFIG.OFFICE_NUMBER, declineMessage);
    
    if (formData?.phoneNumber) {
      const customerMessage = `❌ *ENQUIRY UPDATE*\n\n` +
        `We regret to inform you that ${vendor?.businessName || vendor?.name} has declined your enquiry. We'll help you find another vendor.`;
      
      sendWhatsAppMessage(formData.phoneNumber, customerMessage);
    }
  }, [enquiryId, vendor, formData, sendWhatsAppMessage]);

  // Handle opening enquiry modal
  const handleOpenEnquiry = useCallback(() => {
    setShowEnquiryModal(true);
  }, []);

  // Handle closing enquiry modal
  const handleCloseEnquiry = useCallback(() => {
    setShowEnquiryModal(false);
    setStep(1);
    setPhoneVerified(false);
    setOtpSent(false);
    setOtp('');
    setVerificationError('');
    setFormData({
      name: '',
      phoneNumber: '',
      address: '',
      eventDate: '',
      eventTime: '',
      budget: '',
      serviceTypes: [],
      preferredLocation: '',
    });
  }, []);

  // Handle success message close
  const handleCloseSuccess = useCallback(() => {
    setShowSuccessMessage(false);
  }, []);

  // Enquiry form handlers
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handlePhoneChange = useCallback((e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData(prev => ({ ...prev, phoneNumber: value }));
  }, []);

  const handleSendOTP = useCallback(async () => {
    if (!formData.phoneNumber || formData.phoneNumber.length !== 10) {
      setVerificationError('Please enter a valid 10-digit phone number');
      return;
    }

    setOtpLoading(true);
    setVerificationError('');
    setOtp('');

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const generated = String(Math.floor(1000 + Math.random() * 9000));
      simulatedOTPRef.current = generated;
      console.log(`[DEV ONLY] OTP for ${formData.phoneNumber}: ${generated}`);
      setOtpSent(true);
    } catch (error) {
      setVerificationError('Failed to send OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  }, [formData.phoneNumber]);

  const handleVerifyOTP = useCallback(async () => {
    if (!otp || otp.length !== 4) {
      setVerificationError('Please enter a valid 4-digit OTP');
      return;
    }

    setOtpLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 600));

      if (otp === simulatedOTPRef.current) {
        setPhoneVerified(true);
        setVerificationError('');
        simulatedOTPRef.current = null;
      } else {
        setVerificationError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setVerificationError('Verification failed. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  }, [otp]);

  const handleResendOTP = useCallback(() => {
    setOtp('');
    setVerificationError('');
    handleSendOTP();
  }, [handleSendOTP]);

  const handleOtpChange = useCallback((e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setOtp(value);
  }, []);

  const isStep1Valid = useCallback(() => {
    return formData.name.trim() !== '' &&
           formData.address.trim() !== '' &&
           formData.phoneNumber.length === 10;
  }, [formData.name, formData.address, formData.phoneNumber]);

  const isStep2Valid = useCallback(() => {
    return formData.eventDate !== '' &&
           formData.eventTime !== '' &&
           formData.budget !== '' &&
           Number(formData.budget) > 0 &&
           formData.serviceTypes.length > 0 &&
           formData.preferredLocation !== '';
  }, [formData.eventDate, formData.eventTime, formData.budget, formData.serviceTypes, formData.preferredLocation]);

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  if (!isOpen || !vendor) return null;

  // SIMPLIFIED IMAGE HANDLER
  const getImageUrl = (image) => {
    // If it's a string, return it directly
    if (typeof image === 'string') {
      return image;
    }
    
    // If it's an imported asset (most common case)
    if (image && typeof image === 'object') {
      // In Create React App and Vite, imported images become objects with a src property
      if (image.src) {
        return image.src;
      }
      // If it's a default export
      if (image.default) {
        return image.default;
      }
    }
    
    // Log what we received for debugging
    console.log('Unknown image format:', image);
    
    // Fallback
    return 'https://via.placeholder.com/300x300?text=Image+Not+Found';
  };

  // Image lightbox component
  const ImageModal = ({ image, title, onCloseImage }) => {
    const imageUrl = getImageUrl(image);
    
    return createPortal(
      <div
        className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
        onClick={onCloseImage}
      >
        <div className="relative w-full max-w-4xl max-h-[90vh] flex items-center" onClick={e => e.stopPropagation()}>
          <button 
            onClick={onCloseImage} 
            className="absolute -top-12 right-0 text-white hover:text-yellow-300 transition-colors z-10"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            onError={(e) => {
              console.error('Failed to load image:', imageUrl);
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
            }}
          />
          {title && (
            <p className="absolute -bottom-8 left-0 right-0 text-white text-center text-sm bg-black/50 py-2 px-4 rounded-lg">
              {title}
            </p>
          )}
        </div>
      </div>,
      document.body
    );
  };

  // Success Message Modal
  const SuccessModal = () =>
    createPortal(
      <>
        <div
          className="fixed inset-0 bg-black/65 z-[9994]"
          onClick={handleCloseSuccess}
        />
        <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-bold">Enquiry Sent!</h3>
              <p className="text-green-100 text-sm mt-1">Enquiry ID: {enquiryId}</p>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4 text-center">
                Your enquiry has been sent successfully. The vendor will contact you after approval.
              </p>
              
              {/* Demo buttons for testing */}
              <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-700 font-medium mb-2">Demo Actions (Testing Only):</p>
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={handleOfficeAccept}
                    className="flex-1 bg-green-500 text-white text-xs py-2 rounded hover:bg-green-600"
                  >
                    Office Accept
                  </button>
                  <button
                    onClick={handleOfficeDecline}
                    className="flex-1 bg-red-500 text-white text-xs py-2 rounded hover:bg-red-600"
                  >
                    Office Decline
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleVendorAccept}
                    className="flex-1 bg-blue-500 text-white text-xs py-2 rounded hover:bg-blue-600"
                  >
                    Vendor Accept
                  </button>
                  <button
                    onClick={handleVendorDecline}
                    className="flex-1 bg-orange-500 text-white text-xs py-2 rounded hover:bg-orange-600"
                  >
                    Vendor Decline
                  </button>
                </div>
              </div>
              
              <div className="mb-4 p-2 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <span className="font-semibold">Status:</span>{' '}
                  <span className={
                    enquiryStatus === 'office_accepted' ? 'text-green-600' :
                    enquiryStatus === 'office_declined' ? 'text-red-600' :
                    enquiryStatus === 'vendor_accepted' ? 'text-blue-600' :
                    enquiryStatus === 'vendor_declined' ? 'text-orange-600' :
                    'text-yellow-600'
                  }>
                    {enquiryStatus || 'pending'}
                  </span>
                </p>
              </div>
              
              <button
                onClick={handleCloseSuccess}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-300"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </>,
      document.body
    );

  const modalContent = (
    <>
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/65 z-[9990]"
        onClick={onClose}
      />

      {/* Image lightbox */}
      {selectedImage && (
        <ImageModal
          image={selectedImage.image}
          title={selectedImage.title}
          onCloseImage={() => setSelectedImage(null)}
        />
      )}

      {/* Enquiry Modal */}
      {showEnquiryModal && createPortal(
        <>
          <div
            className="fixed inset-0 bg-black/65 z-[9992]"
            onClick={handleCloseEnquiry}
          />
          <div className="fixed inset-0 z-[9993] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh] w-full max-w-lg">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-600 to-yellow-500 rounded-t-2xl px-4 py-3 flex items-center justify-between">
                <h3 className="text-white font-bold text-base">
                  {step === 1 ? 'Contact Information' : 'Event Details'}
                </h3>
                <button
                  onClick={handleCloseEnquiry}
                  className="text-white hover:text-yellow-200 transition-colors p-1"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Step Indicator */}
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className={`flex items-center ${step === 1 ? 'text-red-600' : 'text-green-600'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === 1 ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                    }`}>
                      {step > 1 ? '✓' : '1'}
                    </div>
                    <span className="ml-2 text-xs font-medium">Contact Info</span>
                  </div>
                  <div className={`flex-1 h-0.5 mx-3 ${step === 2 ? 'bg-red-600' : 'bg-gray-200'}`} />
                  <div className={`flex items-center ${step === 2 ? 'text-red-600' : 'text-gray-400'}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      step === 2 ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>2</div>
                    <span className="ml-2 text-xs font-medium">Event Details</span>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="overflow-y-auto flex-1 p-4">
                {step === 1 ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your complete address"
                        rows="3"
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <div className="flex gap-2">
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handlePhoneChange}
                          placeholder="Enter 10-digit mobile number"
                          maxLength="10"
                          disabled={phoneVerified || otpSent}
                          className="flex-1 px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-100"
                        />
                        {!phoneVerified && !otpSent && (
                          <button
                            onClick={handleSendOTP}
                            disabled={otpLoading || formData.phoneNumber.length !== 10}
                            className="px-4 py-2.5 bg-gradient-to-r from-red-600 to-yellow-600 text-white text-sm font-medium rounded-lg hover:from-red-700 hover:to-yellow-700 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {otpLoading ? 'Sending...' : 'Send OTP'}
                          </button>
                        )}
                      </div>
                    </div>

                    {otpSent && !phoneVerified && (
                      <div className="space-y-3">
                        <p className="text-xs text-gray-500">
                          OTP sent to <strong>+91 {formData.phoneNumber}</strong>.{' '}
                          <span className="text-gray-400">(Check browser console for dev OTP)</span>
                        </p>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={otp}
                              onChange={handleOtpChange}
                              placeholder="Enter 4-digit OTP"
                              maxLength="4"
                              className="flex-1 px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 tracking-widest text-center font-mono text-lg"
                            />
                            <button
                              onClick={handleVerifyOTP}
                              disabled={otpLoading || otp.length !== 4}
                              className="px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {otpLoading ? 'Verifying...' : 'Verify'}
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={handleResendOTP}
                          disabled={otpLoading}
                          className="text-xs text-red-600 hover:text-red-700 disabled:opacity-50"
                        >
                          Resend OTP
                        </button>
                      </div>
                    )}

                    {phoneVerified && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-green-700">Phone number verified successfully!</span>
                      </div>
                    )}

                    {verificationError && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                        <p className="text-xs text-red-600">{verificationError}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
                        <input
                          type="date"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleChange}
                          min={today}
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Event Time *</label>
                        <input
                          type="time"
                          name="eventTime"
                          value={formData.eventTime}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Budget (₹) *</label>
                      <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        placeholder="Enter your budget"
                        min="1"
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Location *</label>
                      <select
                        name="preferredLocation"
                        value={formData.preferredLocation}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="">Select preferred location</option>
                        {availableLocations.map(location => (
                          <option key={location} value={location}>{location}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Services Required * (Select multiple)</label>
                      <div className="space-y-2 max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3">
                        {serviceTypes.map(service => (
                          <div key={service} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`service-${service}`}
                              checked={formData.serviceTypes.includes(service)}
                              onChange={() => handleServiceTypeChange(service)}
                              className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <label htmlFor={`service-${service}`} className="ml-2 text-sm text-gray-700">
                              {service}
                            </label>
                          </div>
                        ))}
                      </div>
                      {formData.serviceTypes.length === 0 && (
                        <p className="text-xs text-red-500 mt-1">Please select at least one service</p>
                      )}
                    </div>

                    {formData.serviceTypes.length > 0 && (
                      <div className="bg-blue-50 p-2 rounded-lg">
                        <p className="text-xs text-blue-700">
                          <span className="font-semibold">Selected: </span>
                          {formData.serviceTypes.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer Buttons */}
              <div className="flex-shrink-0 p-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl">
                {step === 1 ? (
                  <div className="flex gap-3">
                    <button
                      onClick={handleCloseEnquiry}
                      className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => isStep1Valid() && setStep(2)}
                      disabled={!isStep1Valid()}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                        isStep1Valid()
                          ? 'bg-gradient-to-r from-red-600 to-yellow-600 text-white hover:from-red-700 hover:to-yellow-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleInterestSubmit}
                      disabled={!isStep2Valid() || isSendingWhatsApp}
                      className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-300 ${
                        isStep2Valid() && !isSendingWhatsApp
                          ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isSendingWhatsApp ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                          Submit Enquiry
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>,
        document.body
      )}

      {/* Success Modal */}
      {showSuccessMessage && <SuccessModal />}

      {/* Main Vendor Details Modal */}
      <div
        className="fixed inset-0 z-[9991] flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="pointer-events-auto bg-white w-full max-w-2xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Sticky Header */}
          <div className="bg-gradient-to-r from-red-600 to-yellow-500 rounded-t-2xl px-4 py-3 flex items-center justify-between flex-shrink-0">
            <button 
              onClick={onClose} 
              className="text-white hover:text-yellow-200 transition-colors p-1"
              aria-label="Go back"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            
            <h1 className="text-white font-bold text-base sm:text-lg px-2 text-center flex-1 line-clamp-2">
              {vendor.businessName || vendor.name}
            </h1>
            
            <button 
              onClick={onClose} 
              className="text-white hover:text-yellow-200 transition-colors p-1"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable body - Vendor Details */}
          <div className="overflow-y-auto flex-1 bg-gradient-to-b from-red-50 to-yellow-50 rounded-b-2xl">
            <div className="p-4 space-y-4">
              {/* Hero Section */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative h-44 bg-gradient-to-r from-red-100 to-yellow-100">
                  <img
                    src={getImageUrl(vendor.logo)}
                    alt={vendor.businessName || vendor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x200?text=' + encodeURIComponent(vendor.businessName || vendor.name);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                        <div>
                          <h2 className="text-lg sm:text-xl font-bold text-white mb-1 line-clamp-2">
                            {vendor.businessName || vendor.name}
                          </h2>
                          <div className="flex flex-wrap items-center gap-2">
                            <div className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                              <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span className="text-white text-sm font-bold">{vendor.rating}</span>
                            </div>
                            <span className="text-white/90 text-xs sm:text-sm line-clamp-1">
                              {vendor.location || 'Location not specified'}
                            </span>
                            {vendor.budgetRange && (
                              <div className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                                <svg className="w-3.5 h-3.5 text-yellow-300 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-white text-xs font-semibold">{vendor.budgetRange}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={handleOpenEnquiry}
                          className="bg-gradient-to-r from-red-600 to-yellow-600 text-white px-4 py-2.5 sm:py-2 rounded-lg text-sm font-bold hover:from-red-700 hover:to-yellow-700 transition-all duration-300 shadow-md w-full sm:w-auto"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="flex justify-around items-center gap-4">
                  <div className="text-center flex-1">
                    <p className="text-xs text-gray-500">Experience</p>
                    <p className="font-bold text-red-700 text-sm sm:text-base">{vendor.experience || 0}+ Years</p>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <div className="text-center flex-1">
                    <p className="text-xs text-gray-500">Team</p>
                    <p className="font-bold text-red-700 text-sm sm:text-base">{vendor.teamMembers || 1} Members</p>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="text-base sm:text-lg font-bold text-red-800 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  About
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {vendor.longDescription || vendor.description || 'No description available.'}
                </p>
              </div>

              {/* Available Locations */}
              <div className="bg-white rounded-xl shadow-md p-4">
                <h3 className="text-base sm:text-lg font-bold text-red-800 mb-2 flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Available Locations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {vendor.availableLocations?.map((location, index) => (
                    <span key={index} className="bg-gradient-to-r from-red-50 to-yellow-50 border border-red-200 rounded-full px-3 py-1.5 text-xs font-medium text-gray-700">
                      {location}
                    </span>
                  ))}
                </div>
              </div>

              {/* Equipment - Photography specific */}
              {category === 'photography' && vendor.cameraModels && (
                <div className="bg-white rounded-xl shadow-md p-4">
                  <h3 className="text-base sm:text-lg font-bold text-red-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Equipment
                  </h3>
                  <p className="text-sm text-gray-700">{vendor.cameraModels}</p>
                  {vendor.videoEquipment && (
                    <p className="text-sm text-gray-700 mt-2">
                      <span className="font-semibold">Video:</span> {vendor.videoEquipment}
                    </p>
                  )}
                </div>
              )}

              {/* Services */}
              {vendor.services && vendor.services.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-4">
                  <h3 className="text-base sm:text-lg font-bold text-red-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Services Offered
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {vendor.services.map((service, index) => (
                      <span key={index} className="bg-gradient-to-r from-red-50 to-yellow-50 border border-red-200 rounded-full px-3 py-1.5 text-xs font-medium text-gray-700">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Portfolio */}
              {vendor.portfolio && vendor.portfolio.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-4">
                  <h3 className="text-base sm:text-lg font-bold text-red-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Portfolio ({vendor.portfolio.length})
                  </h3>

                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {vendor.portfolio.slice(0, 3).map((item) => {
                      const imageUrl = getImageUrl(item.image);
                      
                      return (
                        <div 
                          key={item.id} 
                          className="relative rounded-lg overflow-hidden cursor-pointer aspect-square group" 
                          onClick={() => setSelectedImage({
                            image: imageUrl,
                            title: item.title
                          })}
                        >
                          <img 
                            src={imageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => { 
                              console.error('Failed to load portfolio image:', imageUrl);
                              e.target.onerror = null; 
                              e.target.src = 'https://via.placeholder.com/300x300?text=Image+Not+Found'; 
                            }} 
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <p className="text-white text-xs p-1.5 truncate w-full bg-gradient-to-t from-black/70 to-transparent">
                              {item.title}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {showAllPortfolio && vendor.portfolio.length > 3 && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {vendor.portfolio.slice(3).map((item) => {
                        const imageUrl = getImageUrl(item.image);
                        
                        return (
                          <div 
                            key={item.id} 
                            className="relative rounded-lg overflow-hidden cursor-pointer aspect-square group" 
                            onClick={() => setSelectedImage({
                              image: imageUrl,
                              title: item.title
                            })}
                          >
                            <img 
                              src={imageUrl} 
                              alt={item.title} 
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                              onError={(e) => { 
                                e.target.onerror = null; 
                                e.target.src = 'https://via.placeholder.com/300x300?text=Image+Not+Found'; 
                              }} 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                              <p className="text-white text-xs p-1.5 truncate w-full bg-gradient-to-t from-black/70 to-transparent">
                                {item.title}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {!showAllPortfolio && vendor.portfolio.length > 3 && (
                    <button 
                      onClick={() => setShowAllPortfolio(true)}
                      className="mt-3 w-full bg-gradient-to-r from-red-500 to-yellow-500 text-white py-2.5 rounded-lg font-bold text-sm hover:from-red-600 hover:to-yellow-600 transition-all duration-300 flex items-center justify-center"
                    >
                      <span>+{vendor.portfolio.length - 3} more photos</span>
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}

                  {showAllPortfolio && vendor.portfolio.length > 3 && (
                    <button 
                      onClick={() => setShowAllPortfolio(false)}
                      className="mt-3 w-full bg-gray-100 text-gray-700 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Show less
                    </button>
                  )}
                </div>
              )}

              {/* Reviews */}
              {vendor.reviews && vendor.reviews.length > 0 && (
                <div className="bg-white rounded-xl shadow-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base sm:text-lg font-bold text-red-800 flex items-center">
                      <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      Reviews
                    </h3>
                    <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                      <span className="text-yellow-700 font-bold text-sm mr-1">{vendor.rating}</span>
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {(showAllReviews ? vendor.reviews : vendor.reviews.slice(0, 2)).map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-3 last:border-0">
                        <div className="flex items-start">
                          <img 
                            src={review.avatar || 'https://via.placeholder.com/40'} 
                            alt={review.name} 
                            className="w-8 h-8 rounded-full mr-3 border border-red-200 flex-shrink-0" 
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-semibold text-gray-800 text-sm truncate pr-2">{review.name}</h4>
                              <span className="text-xs text-gray-400 flex-shrink-0">{review.date}</span>
                            </div>
                            <div className="flex items-center mb-1">
                              {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-3 h-3 ${i < Math.floor(review.rating) ? 'text-yellow-500' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <p className="text-xs text-gray-600 break-words">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {vendor.reviews.length > 2 && (
                    <button 
                      onClick={() => setShowAllReviews(!showAllReviews)} 
                      className="w-full mt-3 text-xs text-red-600 font-medium hover:text-red-700 flex items-center justify-center py-2"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showAllReviews ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                      {showAllReviews ? 'Show less' : `View all ${vendor.reviews.length} reviews`}
                    </button>
                  )}
                </div>
              )}

              {/* Delivery Timeline */}
              {vendor.photoDelivery && (
                <div className="bg-white rounded-xl shadow-md p-4">
                  <h3 className="text-base sm:text-lg font-bold text-red-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Delivery Timeline
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-red-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-600">Photos</p>
                      <p className="font-bold text-red-700 text-sm">{vendor.photoDelivery} Days</p>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-600">Videos</p>
                      <p className="font-bold text-yellow-700 text-sm">{vendor.videoDelivery || 'N/A'}</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-2 text-center">
                      <p className="text-xs text-gray-600">Album</p>
                      <p className="font-bold text-orange-700 text-sm">{vendor.albumDelivery || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Small Enquiry Button at Bottom */}
          <div className="flex-shrink-0 p-3 bg-white border-t border-gray-200 rounded-b-2xl flex justify-end">
            <button
              onClick={handleOpenEnquiry}
              className="bg-gradient-to-r from-red-600 to-yellow-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:from-red-700 hover:to-yellow-700 transition-all duration-300 shadow-sm flex items-center"
            >
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Quick Enquiry
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default VendorDetails;