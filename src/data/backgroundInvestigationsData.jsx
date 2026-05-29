// Import images for background investigation agencies
import detective1 from '../assets/educationVerification.jpg';
import detective2 from '../assets/employmentCheck.jpg';

// Sample detective agencies data
export const backgroundInvestigationVendors = [
  {
    id: 1,
    name: 'SecureVerify Investigations',
    businessName: 'SecureVerify Private Detectives',
    businessCategory: 'Background Investigations',
    serviceType: 'Comprehensive Background Check',
    personName: 'Rajesh Kumar',
    designation: 'Chief Investigator',
    description: 'Professional detective agency with 15+ years experience in matrimonial background verification',
    longDescription: 'SecureVerify Investigations has been a trusted name in background verification for over 15 years. We specialize in matrimonial background checks, identity verification, and comprehensive investigation services. Our team of experienced investigators uses modern techniques and extensive networks to deliver accurate and timely results. We understand the sensitivity of matrimonial investigations and handle every case with utmost confidentiality and professionalism.',
    services: ['Identity Verification', 'Marital Status Check', 'Criminal Record Check', 'Education Verification', 'Employment Verification'],
    logo: detective1,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 156,
    priceRange: '₹15,000 - ₹50,000',
    licenseNumber: 'DET-TN-2023001',
    yearsExperience: 15,
    teamSize: 12,
    businessType: 'Private Limited',
    turnaroundTime: '4-7 days',
    reportFormat: 'Both',
    preferredStates: ['Tamil Nadu', 'Karnataka'],
    hasTravelCharges: 'yes',
    selectedServices: ['Identity Verification', 'Marital Status Check', 'Criminal Record Check', 'Education Verification'],
    contact: {
      phone: '+91 98765 43210',
      email: 'info@secureverify.com',
      website: 'www.secureverify.com',
      address: '123 Investigation Street, Chennai - 600001'
    },
    whatsappNumber: '+919876543210',
    contactNumber: '+919876543210',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/secureverify',
      facebook: 'https://facebook.com/secureverify',
      twitter: 'https://twitter.com/secureverify'
    },
    availableLocations: ['Chennai', 'Coimbatore', 'Madurai', 'Bangalore', 'Hyderabad'],
    coverage: 'Pan India with focus on South India',
    certifications: ['ISO 27001', 'CII Certified', 'ASIS International Member'],
    languages: ['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada'],
    establishedYear: 2008,
    gstNumber: '33ABCDE1234F1Z5',
    panNumber: 'ABCDE1234F',
    accreditation: ['Private Detective License - Tamil Nadu', 'Private Detective License - Karnataka'],
    sampleReports: true,
    digitalReports: true,
    physicalReports: true,
    packages: [
      {
        name: 'Basic Verification',
        price: '₹15,000',
        features: ['Identity Verification', 'Marital Status Check', 'Digital Report', '3 Days Turnaround']
      },
      {
        name: 'Standard Package',
        price: '₹30,000',
        features: ['Identity Verification', 'Marital Status Check', 'Criminal Record Check', 'Education Verification', 'Digital + Physical Report', '5 Days Turnaround']
      },
      {
        name: 'Comprehensive Package',
        price: '₹50,000',
        features: ['All Services Included', 'Family Background', 'Financial Check', 'Employment Verification', 'Social Media Screening', 'Priority 4 Days Turnaround']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Suresh K',
        rating: 5,
        date: '2024-02-15',
        comment: 'Very professional and thorough investigation. Helped us make an informed decision for our family.',
        avatar: 'https://via.placeholder.com/50'
      },
      {
        id: 2,
        name: 'Lakshmi N',
        rating: 4.8,
        date: '2024-01-20',
        comment: 'Timely delivery and accurate information. Highly recommended for matrimonial verification.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 2,
    name: 'MatrimonySafe Agency',
    businessName: 'MatrimonySafe Background Checks',
    businessCategory: 'Background Investigations',
    serviceType: 'Marital Status Verification',
    personName: 'Priya Sharma',
    designation: 'Lead Investigator',
    description: 'Specialized in matrimonial background verification with focus on authenticity and confidentiality',
    longDescription: 'MatrimonySafe Agency is dedicated exclusively to matrimonial background verification. With 12+ years of specialized experience, we understand the unique requirements of families seeking verification for matrimonial alliances. Our approach combines traditional investigation methods with modern technology to ensure comprehensive and accurate results. We pride ourselves on our discretion, attention to detail, and commitment to helping families make informed decisions.',
    services: ['Marital Status Check', 'Family Background', 'Social Media Screening', 'Residential Verification', 'Reputation Check'],
    logo: detective2,
    location: 'Bangalore, Karnataka',
    rating: 4.8,
    totalReviews: 203,
    priceRange: '₹12,000 - ₹45,000',
    licenseNumber: 'DET-KA-2023002',
    yearsExperience: 12,
    teamSize: 8,
    businessType: 'Proprietorship',
    turnaroundTime: '4-7 days',
    reportFormat: 'Digital Report',
    preferredStates: ['Karnataka', 'Tamil Nadu'],
    hasTravelCharges: 'yes',
    selectedServices: ['Marital Status Check', 'Family Background', 'Social Media Screening', 'Residential Verification'],
    contact: {
      phone: '+91 98765 43211',
      email: 'contact@matrimonysafe.com',
      website: 'www.matrimonysafe.com',
      address: '456 Safety Avenue, Bangalore - 560001'
    },
    whatsappNumber: '+919876543211',
    contactNumber: '+919876543211',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/matrimonysafe',
      facebook: 'https://facebook.com/matrimonysafe',
      instagram: 'https://instagram.com/matrimonysafe'
    },
    availableLocations: ['Bangalore', 'Mysore', 'Chennai', 'Hyderabad'],
    coverage: 'Karnataka, Tamil Nadu, Andhra Pradesh',
    certifications: ['Private Detective License - Karnataka'],
    languages: ['English', 'Hindi', 'Kannada', 'Tamil'],
    establishedYear: 2012,
    gstNumber: '29ABCDE1234F1Z5',
    panNumber: 'ABCDE5678F',
    accreditation: ['Private Detective License - Karnataka', 'Member - Indian Association of Private Detectives'],
    sampleReports: true,
    digitalReports: true,
    physicalReports: false,
    packages: [
      {
        name: 'Essential Check',
        price: '₹12,000',
        features: ['Marital Status Verification', 'Basic Family Background', 'Digital Report', '5 Days Turnaround']
      },
      {
        name: 'Advanced Check',
        price: '₹25,000',
        features: ['Marital Status', 'Comprehensive Family Background', 'Social Media Screening', 'Residential Verification', 'Digital Report', '4 Days Turnaround']
      },
      {
        name: 'Premium Alliance Check',
        price: '₹45,000',
        features: ['Complete Background', 'Extended Family Network', 'Social Reputation', 'Neighborhood Check', 'Priority 3 Days Turnaround']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anand R',
        rating: 4.9,
        date: '2024-02-05',
        comment: 'Excellent service for our son\'s matrimonial verification. Very thorough and professional.',
        avatar: 'https://via.placeholder.com/50'
      },
      {
        id: 2,
        name: 'Meera S',
        rating: 4.7,
        date: '2024-01-12',
        comment: 'Detailed report and great communication throughout the process.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 3,
    name: 'TruthFinders Detective Agency',
    businessName: 'TruthFinders Investigation Services',
    businessCategory: 'Background Investigations',
    serviceType: 'Complete Background Verification',
    personName: 'Arun Mehta',
    designation: 'Director',
    description: 'Comprehensive background verification services with nationwide network of investigators',
    longDescription: 'TruthFinders Detective Agency is one of India\'s leading investigation firms with a nationwide network of over 200 investigators. We provide comprehensive background verification services for matrimonial, employment, and corporate purposes. Our team includes former law enforcement officers, legal experts, and certified investigators who bring unparalleled expertise to every case. We leverage technology and a vast network to deliver accurate, timely, and legally admissible reports.',
    services: ['Employment Verification', 'Financial Background', 'Court Case Check', 'Social Reputation Check', 'Criminal Record Check'],
    logo: detective1,
    location: 'Hyderabad, Telangana',
    rating: 4.7,
    totalReviews: 312,
    priceRange: '₹20,000 - ₹75,000',
    licenseNumber: 'DET-TG-2023003',
    yearsExperience: 18,
    teamSize: 25,
    businessType: 'Private Limited',
    turnaroundTime: '8-14 days',
    reportFormat: 'Both',
    preferredStates: ['Telangana', 'Andhra Pradesh', 'Maharashtra'],
    hasTravelCharges: 'yes',
    selectedServices: ['Employment Verification', 'Financial Background', 'Court Case Check', 'Social Reputation Check'],
    contact: {
      phone: '+91 98765 43212',
      email: 'info@truthfinders.com',
      website: 'www.truthfinders.com',
      address: '789 Truth Towers, Hyderabad - 500001'
    },
    whatsappNumber: '+919876543212',
    contactNumber: '+919876543212',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/truthfinders',
      facebook: 'https://facebook.com/truthfinders',
      youtube: 'https://youtube.com/truthfinders'
    },
    availableLocations: ['Hyderabad', 'Secunderabad', 'Warangal', 'Vijayawada', 'Visakhapatnam', 'Mumbai', 'Pune'],
    coverage: 'Pan India with focus on South and West India',
    certifications: ['ISO 9001:2015', 'CII Member', 'NASSCOM Member'],
    languages: ['English', 'Hindi', 'Telugu', 'Marathi', 'Urdu'],
    establishedYear: 2006,
    gstNumber: '36ABCDE1234F1Z5',
    panNumber: 'ABCDE9101F',
    accreditation: ['Private Detective License - Telangana', 'Private Detective License - Andhra Pradesh', 'Private Detective License - Maharashtra'],
    sampleReports: true,
    digitalReports: true,
    physicalReports: true,
    packages: [
      {
        name: 'Standard Verification',
        price: '₹20,000',
        features: ['Employment Verification', 'Financial Background Check', 'Digital Report', '10 Days Turnaround']
      },
      {
        name: 'Comprehensive Check',
        price: '₹45,000',
        features: ['Employment Verification', 'Financial Background', 'Court Case Check', 'Social Reputation', 'Criminal Record', 'Digital + Physical Report', '8 Days Turnaround']
      },
      {
        name: 'Executive Alliance Check',
        price: '₹75,000',
        features: ['Complete Background Check', 'Extended Family Network', 'Business Verification', 'Asset Verification', 'Priority 6 Days Turnaround']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Vikram S',
        rating: 4.8,
        date: '2024-02-10',
        comment: 'Very comprehensive report. They left no stone unturned.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 4,
    name: 'SafeMatch Investigators',
    businessName: 'SafeMatch Matrimonial Verification',
    businessCategory: 'Background Investigations',
    serviceType: 'Matrimonial Verification',
    personName: 'Sneha Reddy',
    designation: 'Verification Specialist',
    description: 'Dedicated to ensuring safe and verified matrimonial matches through thorough background checks',
    longDescription: 'SafeMatch Investigators is a specialized matrimonial verification agency founded by women investigators who understand the concerns of families. With 10 years of focused experience, we provide empathetic yet thorough verification services. Our approach combines traditional investigation with modern screening techniques to ensure families have complete peace of mind. We handle each case with sensitivity and maintain strict confidentiality throughout the process.',
    services: ['Identity Documents', 'Education Certificates', 'Employment Records', 'Family History', 'Neighborhood Verification'],
    logo: detective2,
    location: 'Coimbatore, Tamil Nadu',
    rating: 4.8,
    totalReviews: 178,
    priceRange: '₹10,000 - ₹40,000',
    licenseNumber: 'DET-TN-2023004',
    yearsExperience: 10,
    teamSize: 6,
    businessType: 'Partnership',
    turnaroundTime: '4-7 days',
    reportFormat: 'Digital Report',
    preferredStates: ['Tamil Nadu'],
    hasTravelCharges: 'no',
    selectedServices: ['Identity Verification', 'Education Verification', 'Employment Verification', 'Family Background'],
    contact: {
      phone: '+91 98765 43213',
      email: 'info@safematch.com',
      website: 'www.safematch.com',
      address: '321 Safety Street, Coimbatore - 641001'
    },
    whatsappNumber: '+919876543213',
    contactNumber: '+919876543213',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/safematch',
      facebook: 'https://facebook.com/safematch',
      instagram: 'https://instagram.com/safematch'
    },
    availableLocations: ['Coimbatore', 'Chennai', 'Salem', 'Erode', 'Tirupur'],
    coverage: 'Tamil Nadu',
    certifications: ['Private Detective License - Tamil Nadu', 'Women Entrepreneur Certified'],
    languages: ['English', 'Tamil', 'Malayalam'],
    establishedYear: 2014,
    gstNumber: '33FGHIJ5678K1L9',
    panNumber: 'FGHIJ5678K',
    accreditation: ['Private Detective License - Tamil Nadu', 'Member - Tamil Nadu Private Detectives Association'],
    sampleReports: true,
    digitalReports: true,
    physicalReports: false,
    packages: [
      {
        name: 'Basic Verification',
        price: '₹10,000',
        features: ['Identity Verification', 'Education Certificate Check', 'Digital Report', '5 Days Turnaround']
      },
      {
        name: 'Family Check',
        price: '₹20,000',
        features: ['Identity Verification', 'Education Check', 'Employment Records', 'Family History', 'Digital Report', '4 Days Turnaround']
      },
      {
        name: 'Complete Alliance Check',
        price: '₹40,000',
        features: ['Full Background Check', 'Extended Family Network', 'Neighborhood Verification', 'Social Standing', 'Priority 3 Days Turnaround']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Kavitha M',
        rating: 5,
        date: '2024-01-28',
        comment: 'Very thorough and sensitive handling of our family\'s verification needs.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 5,
    name: 'AuthentiCheck Bureau',
    businessName: 'AuthentiCheck Verification Bureau',
    businessCategory: 'Background Investigations',
    serviceType: 'Document Verification',
    personName: 'Vikram Singh',
    designation: 'Verification Head',
    description: 'Specializing in document authentication and identity verification for matrimonial purposes',
    longDescription: 'AuthentiCheck Bureau is a premier document verification agency with expertise in authenticating educational certificates, identity documents, and professional credentials. With 14 years of experience, we have developed proprietary systems to detect fraudulent documents and verify authenticity through official channels. We work with educational institutions, employers, and government databases to ensure the highest level of accuracy in our verifications.',
    services: ['Document Verification', 'Certificate Authentication', 'Address Verification', 'Photo ID Check', 'Education Verification'],
    logo: detective1,
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    totalReviews: 245,
    priceRange: '₹8,000 - ₹35,000',
    licenseNumber: 'DET-MH-2023005',
    yearsExperience: 14,
    teamSize: 18,
    businessType: 'Private Limited',
    turnaroundTime: '1-3 days',
    reportFormat: 'Online Dashboard',
    preferredStates: ['Maharashtra', 'Gujarat'],
    hasTravelCharges: 'yes',
    selectedServices: ['Identity Verification', 'Residential Verification', 'Employment Verification'],
    contact: {
      phone: '+91 98765 43214',
      email: 'verify@authenticheck.com',
      website: 'www.authenticheck.com',
      address: '567 Verification Plaza, Mumbai - 400001'
    },
    whatsappNumber: '+919876543214',
    contactNumber: '+919876543214',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/authenticheck',
      facebook: 'https://facebook.com/authenticheck',
      twitter: 'https://twitter.com/authenticheck'
    },
    availableLocations: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Ahmedabad', 'Surat'],
    coverage: 'Maharashtra, Gujarat, Goa',
    certifications: ['ISO 27001:2013', 'PCI DSS Compliant', 'MSME Registered'],
    languages: ['English', 'Hindi', 'Marathi', 'Gujarati'],
    establishedYear: 2010,
    gstNumber: '27KLMNO9012P3Q7',
    panNumber: 'KLMNO9012P',
    accreditation: ['Private Detective License - Maharashtra', 'Private Detective License - Gujarat', 'Member - Association of Private Detectives'],
    sampleReports: true,
    digitalReports: true,
    physicalReports: false,
    packages: [
      {
        name: 'Express Verification',
        price: '₹8,000',
        features: ['Document Verification', 'Online Dashboard Access', '24 Hours Turnaround']
      },
      {
        name: 'Comprehensive Document Check',
        price: '₹18,000',
        features: ['Document Verification', 'Certificate Authentication', 'Address Verification', 'Photo ID Check', 'Online Dashboard', '48 Hours Turnaround']
      },
      {
        name: 'Complete Identity Package',
        price: '₹35,000',
        features: ['Full Document Verification', 'Education Verification', 'Employment Verification', 'Address History', 'Priority 24 Hours Turnaround']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Rajiv M',
        rating: 5,
        date: '2024-02-08',
        comment: 'Fastest verification service I\'ve used. Very accurate and professional.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 6,
    name: 'FamilyTrust Investigators',
    businessName: 'FamilyTrust Background Services',
    businessCategory: 'Background Investigations',
    serviceType: 'Family Background Check',
    personName: 'Anjali Nair',
    designation: 'Family Investigation Specialist',
    description: 'Focus on family background, social standing, and reputation verification for matrimonial matches',
    longDescription: 'FamilyTrust Investigators specializes in understanding the nuances of family backgrounds, social standing, and community reputation. With 8 years of focused experience, we help families make informed decisions by providing detailed insights into prospective alliances. Our investigators are trained to gather information sensitively without causing any embarrassment to the families involved. We understand the cultural context and importance of family reputation in matrimonial decisions.',
    services: ['Family History', 'Social Standing', 'Community Reputation', 'Caste Verification', 'Family Network'],
    logo: detective2,
    location: 'Kochi, Kerala',
    rating: 4.6,
    totalReviews: 98,
    priceRange: '₹15,000 - ₹60,000',
    licenseNumber: 'DET-KL-2023006',
    yearsExperience: 8,
    teamSize: 7,
    businessType: 'Proprietorship',
    turnaroundTime: '8-14 days',
    reportFormat: 'Physical Certificate',
    preferredStates: ['Kerala'],
    hasTravelCharges: 'no',
    selectedServices: ['Family Background', 'Social Reputation Check', 'Marital Status Check'],
    contact: {
      phone: '+91 98765 43215',
      email: 'contact@familytrust.in',
      website: 'www.familytrust.in',
      address: '890 Trust Lane, Kochi - 682001'
    },
    whatsappNumber: '+919876543215',
    contactNumber: '+919876543215',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/familytrust',
      facebook: 'https://facebook.com/familytrust'
    },
    availableLocations: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam'],
    coverage: 'Kerala',
    certifications: ['Private Detective License - Kerala'],
    languages: ['English', 'Malayalam', 'Tamil'],
    establishedYear: 2016,
    gstNumber: '32PQRST3456U7V8',
    panNumber: 'PQRST3456U',
    accreditation: ['Private Detective License - Kerala', 'Member - Kerala Private Detectives Association'],
    sampleReports: true,
    digitalReports: false,
    physicalReports: true,
    packages: [
      {
        name: 'Family Background Check',
        price: '₹15,000',
        features: ['Family History', 'Social Standing Assessment', 'Physical Report', '10 Days Turnaround']
      },
      {
        name: 'Community Reputation Check',
        price: '₹30,000',
        features: ['Family History', 'Community Reputation', 'Social Standing', 'Extended Family Network', 'Physical Report', '8 Days Turnaround']
      },
      {
        name: 'Complete Family Profile',
        price: '₹60,000',
        features: ['Comprehensive Family Background', 'Extended Network', 'Community Standing', 'Historical Verification', 'Priority 7 Days Turnaround']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'George M',
        rating: 4.7,
        date: '2024-01-15',
        comment: 'Very detailed family background report. Helped us make an informed decision.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 7,
    name: 'LegalEagle Detectives',
    businessName: 'LegalEagle Investigation Agency',
    businessCategory: 'Background Investigations',
    serviceType: 'Legal & Criminal Check',
    personName: 'Rahul Verma',
    designation: 'Legal Investigator',
    description: 'Specialized in legal and criminal background checks with access to legal databases',
    longDescription: 'LegalEagle Detectives is a specialized agency focusing on legal and criminal background verification. With 20 years of experience, our team includes former judges, lawyers, and law enforcement officers who understand the legal system inside out. We have exclusive access to legal databases and court records across India. Our reports are legally admissible and provide comprehensive information about criminal history, pending cases, and legal disputes.',
    services: ['Criminal Records', 'Court Cases', 'Litigation History', 'Police Records', 'Legal Disputes'],
    logo: detective1,
    location: 'Delhi, Delhi',
    rating: 4.9,
    totalReviews: 187,
    priceRange: '₹25,000 - ₹80,000',
    licenseNumber: 'DET-DL-2023007',
    yearsExperience: 20,
    teamSize: 15,
    businessType: 'LLP',
    turnaroundTime: '8-14 days',
    reportFormat: 'Both',
    preferredStates: ['Delhi', 'Maharashtra'],
    hasTravelCharges: 'yes',
    selectedServices: ['Criminal Record Check', 'Court Case / Litigation Check', 'Social Reputation Check'],
    contact: {
      phone: '+91 98765 43216',
      email: 'info@legaleagle.in',
      website: 'www.legaleagle.in',
      address: '123 Legal Chambers, New Delhi - 110001'
    },
    whatsappNumber: '+919876543216',
    contactNumber: '+919876543216',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/legaleagle',
      facebook: 'https://facebook.com/legaleagle'
    },
    availableLocations: ['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Mumbai', 'Pune'],
    coverage: 'North India, Maharashtra',
    certifications: ['ISO 9001:2015', 'Legal Process Outsourcing Certified'],
    languages: ['English', 'Hindi', 'Punjabi'],
    establishedYear: 2004,
    gstNumber: '07WXYZ6789A1B2',
    panNumber: 'WXYZ6789A',
    accreditation: ['Private Detective License - Delhi', 'Private Detective License - Maharashtra', 'Member - All India Private Detectives Association'],
    sampleReports: true,
    digitalReports: true,
    physicalReports: true,
    packages: [
      {
        name: 'Criminal Record Check',
        price: '₹25,000',
        features: ['Criminal Records Search', 'Police Verification', 'Digital Report', '10 Days Turnaround']
      },
      {
        name: 'Legal History Check',
        price: '₹45,000',
        features: ['Criminal Records', 'Court Cases Search', 'Litigation History', 'Digital + Physical Report', '8 Days Turnaround']
      },
      {
        name: 'Comprehensive Legal Verification',
        price: '₹80,000',
        features: ['Full Criminal Check', 'All Court Cases', 'Legal Disputes', 'Property Litigation', 'Priority 7 Days Turnaround']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Amit K',
        rating: 5,
        date: '2024-02-01',
        comment: 'Very thorough legal background check. They found cases that other agencies missed.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 8,
    name: 'FinCheck Investigators',
    businessName: 'FinCheck Financial Verification',
    businessCategory: 'Background Investigations',
    serviceType: 'Financial Background Verification',
    personName: 'Meera Patel',
    designation: 'Financial Investigator',
    description: 'Comprehensive financial background verification including assets, liabilities, and income sources',
    longDescription: 'FinCheck Investigators specializes in financial background verification for matrimonial alliances. With 11 years of experience, we help families verify the financial stability and integrity of prospective matches. Our services include income verification, asset verification, liability assessment, and financial behavior analysis. We work with financial institutions, employers, and public records to provide accurate financial profiles.',
    services: ['Income Verification', 'Asset Verification', 'Loan History', 'Financial Stability', 'Credit Assessment'],
    logo: detective2,
    location: 'Ahmedabad, Gujarat',
    rating: 4.7,
    totalReviews: 134,
    priceRange: '₹18,000 - ₹65,000',
    licenseNumber: 'DET-GJ-2023008',
    yearsExperience: 11,
    teamSize: 9,
    businessType: 'Private Limited',
    turnaroundTime: '4-7 days',
    reportFormat: 'Digital Report',
    preferredStates: ['Gujarat', 'Maharashtra'],
    hasTravelCharges: 'yes',
    selectedServices: ['Financial Background', 'Employment Verification'],
    contact: {
      phone: '+91 98765 43217',
      email: 'info@fincheck.in',
      website: 'www.fincheck.in',
      address: '456 Finance Street, Ahmedabad - 380001'
    },
    whatsappNumber: '+919876543217',
    contactNumber: '+919876543217',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/fincheck',
      facebook: 'https://facebook.com/fincheck'
    },
    availableLocations: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Mumbai', 'Pune'],
    coverage: 'Gujarat, Maharashtra',
    certifications: ['Certified Financial Investigator', 'ISO 27001 Certified'],
    languages: ['English', 'Hindi', 'Gujarati', 'Marathi'],
    establishedYear: 2013,
    gstNumber: '24LMNOP1234Q5R6',
    panNumber: 'LMNOP1234Q',
    accreditation: ['Private Detective License - Gujarat', 'Private Detective License - Maharashtra'],
    sampleReports: true,
    digitalReports: true,
    physicalReports: false,
    packages: [
      {
        name: 'Income Verification',
        price: '₹18,000',
        features: ['Income Verification', 'Employment Check', 'Digital Report', '5 Days Turnaround']
      },
      {
        name: 'Asset Check',
        price: '₹35,000',
        features: ['Income Verification', 'Asset Verification', 'Loan History', 'Digital Report', '4 Days Turnaround']
      },
      {
        name: 'Complete Financial Profile',
        price: '₹65,000',
        features: ['Full Financial Background', 'Asset & Liability Assessment', 'Credit History', 'Financial Behavior', 'Priority 3 Days Turnaround']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Sanjay P',
        rating: 4.8,
        date: '2024-01-22',
        comment: 'Very detailed financial report. Gave us complete peace of mind.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 9,
    name: 'SocialWatch Bureau',
    businessName: 'SocialWatch Online Screening',
    businessCategory: 'Background Investigations',
    serviceType: 'Social Media Screening',
    personName: 'Aisha Khan',
    designation: 'Digital Investigator',
    description: 'Specialized in social media and online presence screening for comprehensive background checks',
    longDescription: 'SocialWatch Bureau is a modern investigation agency specializing in digital footprint analysis and social media screening. With 9 years of experience, we help families understand the online presence and digital reputation of prospective matches. Our team of digital investigators uses advanced tools to analyze social media activity, online behavior, and digital history while respecting privacy boundaries. We provide insights into character, interests, and online conduct that traditional background checks might miss.',
    services: ['Social Media Analysis', 'Online Reputation', 'Digital Footprint', 'Cyber Background', 'Internet History'],
    logo: detective1,
    location: 'Pune, Maharashtra',
    rating: 4.8,
    totalReviews: 156,
    priceRange: '₹12,000 - ₹45,000',
    licenseNumber: 'DET-MH-2023009',
    yearsExperience: 9,
    teamSize: 11,
    businessType: 'Partnership',
    turnaroundTime: '1-3 days',
    reportFormat: 'Online Dashboard',
    preferredStates: ['Maharashtra', 'Karnataka'],
    hasTravelCharges: 'yes',
    selectedServices: ['Social Media Screening', 'Social Reputation Check'],
    contact: {
      phone: '+91 98765 43218',
      email: 'hello@socialwatch.in',
      website: 'www.socialwatch.in',
      address: '789 Digital Plaza, Pune - 411001'
    },
    whatsappNumber: '+919876543218',
    contactNumber: '+919876543218',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/socialwatch',
      facebook: 'https://facebook.com/socialwatch',
      instagram: 'https://instagram.com/socialwatch',
      twitter: 'https://twitter.com/socialwatch'
    },
    availableLocations: ['Pune', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad'],
    coverage: 'Pan India - Online Services',
    certifications: ['Digital Forensics Certified', 'Cyber Security Certified'],
    languages: ['English', 'Hindi', 'Marathi', 'Kannada'],
    establishedYear: 2015,
    gstNumber: '27ABCDE1234F1Z5',
    panNumber: 'ABCDE1234F',
    accreditation: ['Private Detective License - Maharashtra', 'Member - Cyber Security Association'],
    sampleReports: true,
    digitalReports: true,
    physicalReports: false,
    packages: [
      {
        name: 'Social Media Scan',
        price: '₹12,000',
        features: ['Social Media Analysis', 'Online Reputation Check', 'Digital Dashboard', '48 Hours Turnaround']
      },
      {
        name: 'Digital Footprint Check',
        price: '₹25,000',
        features: ['Social Media Analysis', 'Online Reputation', 'Digital History', 'Internet Presence', 'Digital Dashboard', '3 Days Turnaround']
      },
      {
        name: 'Complete Cyber Profile',
        price: '₹45,000',
        features: ['Comprehensive Digital Analysis', 'Historical Data', 'Privacy Assessment', 'Risk Analysis', 'Priority 24 Hours Turnaround']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Rohan M',
        rating: 4.9,
        date: '2024-02-12',
        comment: 'Very insightful digital report. Found things we would never have known.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 10,
    name: 'EducationVerify Agency',
    businessName: 'EducationVerify Certification Bureau',
    businessCategory: 'Background Investigations',
    serviceType: 'Education Verification',
    personName: 'Kabir Malhotra',
    designation: 'Education Verification Specialist',
    description: 'Thorough verification of educational qualifications, certificates, and academic records',
    longDescription: 'EducationVerify Agency is a specialized verification service focusing exclusively on educational credentials. With 13 years of experience, we have established direct verification channels with universities, boards, and educational institutions across India. Our team of verification specialists is trained to detect fake degrees, forged certificates, and fraudulent academic claims. We provide detailed reports that include verification with original institutions, year of passing, percentage/grade verification, and any discrepancies found.',
    services: ['Degree Verification', 'Certificate Authentication', 'Academic Records', 'Institute Verification', 'Transcript Analysis'],
    logo: detective2,
    location: 'Kolkata, West Bengal',
    rating: 4.7,
    totalReviews: 167,
    priceRange: '₹7,000 - ₹30,000',
    licenseNumber: 'DET-WB-2023010',
    yearsExperience: 13,
    teamSize: 14,
    businessType: 'Proprietorship',
    turnaroundTime: '4-7 days',
    reportFormat: 'Both',
    preferredStates: ['West Bengal'],
    hasTravelCharges: 'no',
    selectedServices: ['Education Verification', 'Identity Verification'],
    contact: {
      phone: '+91 98765 43219',
      email: 'verify@educationverify.com',
      website: 'www.educationverify.com',
      address: '123 Education Road, Kolkata - 700001'
    },
    whatsappNumber: '+919876543219',
    contactNumber: '+919876543219',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/educationverify',
      facebook: 'https://facebook.com/educationverify'
    },
    availableLocations: ['Kolkata', 'Howrah', 'Siliguri', 'Durgapur', 'Asansol'],
    coverage: 'West Bengal, Pan India through network',
    certifications: ['Educational Verification Specialist', 'ISO 9001 Certified'],
    languages: ['English', 'Hindi', 'Bengali'],
    establishedYear: 2011,
    gstNumber: '19QRSTU5678V9W0',
    panNumber: 'QRSTU5678V',
    accreditation: ['Private Detective License - West Bengal', 'Member - Indian Education Verification Association'],
    sampleReports: true,
    digitalReports: true,
    physicalReports: true,
    packages: [
      {
        name: 'Single Degree Verification',
        price: '₹7,000',
        features: ['Degree Verification', 'Institute Confirmation', 'Digital Report', '5 Days Turnaround']
      },
      {
        name: 'Multiple Degree Check',
        price: '₹15,000',
        features: ['Multiple Degrees Verification', 'Transcript Analysis', 'Digital + Physical Report', '4 Days Turnaround']
      },
      {
        name: 'Complete Academic Profile',
        price: '₹30,000',
        features: ['All Educational Credentials', 'Complete Academic History', 'Institution Verification', 'Priority 3 Days Turnaround']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Sourav G',
        rating: 4.8,
        date: '2024-01-18',
        comment: 'Very thorough education verification. They verified directly with my university.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 11,
    name: 'EmploymentCheck Bureau',
    businessName: 'EmploymentCheck Verification Services',
    businessCategory: 'Background Investigations',
    serviceType: 'Employment Verification',
    personName: 'Sanjay Gupta',
    designation: 'Employment Verification Head',
    description: 'Detailed employment history and current job status verification with employer contacts',
    longDescription: 'EmploymentCheck Bureau is a specialized agency dedicated to employment verification services. With 12 years of experience, we have developed a comprehensive methodology for verifying employment history, current job status, salary details, and professional references. We work directly with HR departments, managers, and colleagues to ensure the accuracy of employment claims. Our reports include employment dates, job titles, responsibilities, performance, and reasons for leaving previous positions.',
    services: ['Employment History', 'Current Employment', 'Salary Verification', 'Job Role Verification', 'Reference Check'],
    logo: detective1,
    location: 'Bengaluru, Karnataka',
    rating: 4.8,
    totalReviews: 198,
    priceRange: '₹10,000 - ₹40,000',
    licenseNumber: 'DET-KA-2023011',
    yearsExperience: 12,
    teamSize: 16,
    businessType: 'Private Limited',
    turnaroundTime: '4-7 days',
    reportFormat: 'Digital Report',
    preferredStates: ['Karnataka', 'Tamil Nadu'],
    hasTravelCharges: 'yes',
    selectedServices: ['Employment Verification', 'Financial Background'],
    contact: {
      phone: '+91 98765 43220',
      email: 'info@employmentcheck.com',
      website: 'www.employmentcheck.com',
      address: '456 Corporate Avenue, Bengaluru - 560001'
    },
    whatsappNumber: '+919876543220',
    contactNumber: '+919876543220',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/employmentcheck',
      facebook: 'https://facebook.com/employmentcheck'
    },
    availableLocations: ['Bengaluru', 'Chennai', 'Hyderabad', 'Mumbai', 'Delhi', 'Pune'],
    coverage: 'Pan India',
    certifications: ['ISO 9001:2015', 'HR Certification'],
    languages: ['English', 'Hindi', 'Kannada', 'Tamil'],
    establishedYear: 2012,
    gstNumber: '29IJKLM9012N3O4',
    panNumber: 'IJKLM9012N',
    accreditation: ['Private Detective License - Karnataka', 'Member - HR Verification Association'],
    sampleReports: true,
    digitalReports: true,
    physicalReports: false,
    packages: [
      {
        name: 'Current Employment Check',
        price: '₹10,000',
        features: ['Current Employment Verification', 'Salary Confirmation', 'Digital Report', '5 Days Turnaround']
      },
      {
        name: 'Employment History Check',
        price: '₹20,000',
        features: ['Complete Employment History', 'Salary Verification', 'Reference Check', 'Digital Report', '4 Days Turnaround']
      },
      {
        name: 'Executive Background Check',
        price: '₹40,000',
        features: ['Full Employment History', 'Salary Details', 'Performance Assessment', 'Reference Check', 'Priority 3 Days Turnaround']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Divya S',
        rating: 4.9,
        date: '2024-02-05',
        comment: 'Very detailed employment report. They verified with all my previous employers.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 12,
    name: 'ResidentialVerify Agency',
    businessName: 'ResidentialVerify Location Services',
    businessCategory: 'Background Investigations',
    serviceType: 'Residential Verification',
    personName: 'Neha Joshi',
    designation: 'Residential Investigation Specialist',
    description: 'Thorough residential address verification and neighborhood background checks',
    longDescription: 'ResidentialVerify Agency specializes in verifying residential addresses and neighborhood backgrounds. With 7 years of experience, we conduct physical verification of addresses, neighborhood checks, and community standing assessment. Our team visits the location, interacts with neighbors, and documents the living conditions, neighborhood quality, and community reputation. We provide photographic evidence and detailed reports about the residential environment.',
    services: ['Address Verification', 'Residence History', 'Neighborhood Check', 'Property Verification', 'Community Assessment'],
    logo: detective2,
    location: 'Chennai, Tamil Nadu',
    rating: 4.6,
    totalReviews: 89,
    priceRange: '₹8,000 - ₹35,000',
    licenseNumber: 'DET-TN-2023012',
    yearsExperience: 7,
    teamSize: 8,
    businessType: 'Individual',
    turnaroundTime: '1-3 days',
    reportFormat: 'Digital Report',
    preferredStates: ['Tamil Nadu'],
    hasTravelCharges: 'no',
    selectedServices: ['Residential Verification', 'Identity Verification'],
    contact: {
      phone: '+91 98765 43221',
      email: 'contact@residentialverify.com',
      website: 'www.residentialverify.com',
      address: '789 Home Street, Chennai - 600001'
    },
    whatsappNumber: '+919876543221',
    contactNumber: '+919876543221',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/residentialverify',
      facebook: 'https://facebook.com/residentialverify'
    },
    availableLocations: ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy'],
    coverage: 'Tamil Nadu',
    certifications: ['Private Detective License - Tamil Nadu'],
    languages: ['English', 'Tamil'],
    establishedYear: 2017,
    gstNumber: '33VWXYZ1234A5B6',
    panNumber: 'VWXYZ1234A',
    accreditation: ['Private Detective License - Tamil Nadu'],
    sampleReports: true,
    digitalReports: true,
    physicalReports: false,
    packages: [
      {
        name: 'Address Verification',
        price: '₹8,000',
        features: ['Address Verification', 'Photographic Evidence', 'Digital Report', '2 Days Turnaround']
      },
      {
        name: 'Neighborhood Check',
        price: '₹18,000',
        features: ['Address Verification', 'Neighborhood Assessment', 'Community Check', 'Digital Report', '3 Days Turnaround']
      },
      {
        name: 'Complete Residential Profile',
        price: '₹35,000',
        features: ['Address History', 'Neighborhood Check', 'Community Standing', 'Property Verification', 'Priority 2 Days Turnaround']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Murali K',
        rating: 4.7,
        date: '2024-01-10',
        comment: 'Very thorough residential verification. They provided photos and neighbor feedback.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  }
];