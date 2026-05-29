// Invitation & Gifts Vendor Data with Complete Portfolio Images
import digitalinvites from '../assets/digitalinvites.jpg';
import luxurycards from '../assets/luxurycards.jpg';
import printedcards from '../assets/printedcards.jpg';
import customdesigns from '../assets/customdesigns.jpg';
import returngifts from '../assets/returngifts.jpg';
import gifthampers from '../assets/gifthampers.jpg';
import ecogifts from '../assets/ecogifts.jpg';
import luxuryhampers from '../assets/luxuryhampers.jpg';

export const invitationVendors = [
  // DIGITAL INVITES VENDORS
  {
    id: 1,
    name: 'Digital Wedding Cards Co',
    businessName: 'Digital Wedding Cards & E-Invitations',
    businessCategory: 'Digital Invites',
    eventType: 'Digital Invites',
    personName: 'Rajesh Kumar',
    designation: 'Creative Director',
    description: 'Creating stunning digital wedding invitations with interactive features and tracking',
    longDescription: 'Digital Wedding Cards Co specializes in modern, interactive digital invitations that combine beautiful design with cutting-edge technology. With 8+ years of experience, we create personalized e-invitations that include RSVP tracking, guest management, and multimedia elements that make your invitation truly memorable.',
    services: [
      'Wedding Invitation Printing',
      'Digital Invitations / E-Cards',
      'Customized Invitation Design'
    ],
    logo: digitalinvites,
    location: 'Chennai, Tamil Nadu',
    rating: 4.8,
    totalReviews: 156,
    priceRange: '₹5,000 - ₹50,000 per project',
    budgetRange: '₹5,000 - ₹50,000 per project',
    experience: 8,
    businessType: 'Private Limited',
    invitationTypes: ['Digital / Video Invitations', 'Theme-based Cards'],
    printingOptions: ['Digital'],
    giftTypes: [],
    minOrderQuantity: 50,
    giftMinOrder: 0,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'no',
    designApprovalTime: 3,
    printingDeliveryTime: 5,
    giftPreparationTime: 0,
    preferredLocations: ['Local', 'Within State', 'Outstation'],
    availableLocations: ['Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Kerala', 'Maharashtra'],
    hasTravelCharges: 'no',
    advanceRequired: 'yes',
    advanceAmount: '25%',
    balanceTerms: 'Balance on delivery',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43210',
      email: 'contact@digitalweddingcards.com',
      website: 'www.digitalweddingcards.com',
      address: '123 Digital Street, Chennai - 600001'
    },
    whatsappNumber: '+919876543210',
    contactNumber: '+919876543210',
    socialMedia: {
      instagram: '@digitalweddingcards',
      facebook: '/digitalweddingcards',
      youtube: '@digitalweddingcards'
    },
    portfolio: [
      { id: 1, image: digitalinvites, title: 'Animated Wedding E-Invite', description: 'Interactive animation with couple photos' },
      { id: 2, image: digitalinvites, title: 'Save the Date Video', description: 'Cinematic save the date video' },
      { id: 3, image: digitalinvites, title: 'QR Code Integration', description: 'Smart invitations with QR codes' },
    ],
    packages: [
      {
        name: 'Basic Digital Package',
        price: '₹5,000',
        features: ['1 E-Invite Design', 'Mobile Friendly', 'PDF Download', 'Basic Tracking', '2 Revisions']
      },
      {
        name: 'Premium Digital Package',
        price: '₹25,000',
        features: ['5 E-Invite Designs', 'Video Invitation', 'Guest Management', 'RSVP Tracking', 'WhatsApp Integration', 'Unlimited Revisions']
      },
      {
        name: 'Ultimate Digital Suite',
        price: '₹50,000',
        features: ['10+ Designs', 'Custom Animation', 'Website Integration', 'SMS Reminders', 'Analytics Dashboard', 'Priority Support']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Priya Sharma',
        rating: 5,
        date: '2024-01-15',
        comment: 'Amazing digital invitations! Our guests loved the interactive features.',
        avatar: 'https://via.placeholder.com/50'
      },
      {
        id: 2,
        name: 'Arun Kumar',
        rating: 4.5,
        date: '2024-01-05',
        comment: 'Very professional team. The RSVP tracking was super helpful.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 2,
    name: 'E-Invite Masters',
    businessName: 'E-Invite Masters Studio',
    businessCategory: 'Digital Invites',
    eventType: 'Digital Invites',
    personName: 'Priya Sharma',
    designation: 'Digital Designer',
    description: 'Creating beautiful digital invitations with modern designs and user-friendly interfaces',
    longDescription: 'E-Invite Masters Studio combines artistic design with technical expertise to create digital invitations that stand out. Our team specializes in creating immersive digital experiences that capture the essence of your celebration while making guest management effortless.',
    services: ['Digital Invitations / E-Cards', 'Customized Invitation Design'],
    logo: digitalinvites,
    location: 'Coimbatore, Tamil Nadu',
    rating: 4.9,
    totalReviews: 203,
    priceRange: '₹8,000 - ₹75,000 per project',
    budgetRange: '₹8,000 - ₹75,000 per project',
    experience: 6,
    businessType: 'Individual',
    invitationTypes: ['Digital / Video Invitations', 'Theme-based Cards'],
    printingOptions: [],
    giftTypes: [],
    minOrderQuantity: 25,
    giftMinOrder: 0,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'no',
    designApprovalTime: 2,
    printingDeliveryTime: 3,
    giftPreparationTime: 0,
    preferredLocations: ['Local', 'Within State'],
    availableLocations: ['Tamil Nadu', 'Kerala', 'Karnataka'],
    hasTravelCharges: 'no',
    advanceRequired: 'yes',
    advanceAmount: '30%',
    balanceTerms: 'Balance before delivery',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43211',
      email: 'hello@einvitemasters.com',
      website: 'www.einvitemasters.com',
      address: '456 Design Avenue, Coimbatore - 641001'
    },
    whatsappNumber: '+919876543211',
    contactNumber: '+919876543211',
    socialMedia: {
      instagram: '@einvitemasters',
      facebook: '/einvitemasters',
      youtube: '@einvitemasters'
    },
    portfolio: [
      { id: 1, image: digitalinvites, title: '3D Animated Invite', description: 'Stunning 3D animations' },
      { id: 2, image: digitalinvites, title: 'Interactive Wedding Website', description: 'Complete wedding website' },
      { id: 3, image: digitalinvites, title: 'Video Save the Date', description: 'Professional video announcements' },
    ],
    packages: [
      {
        name: 'Essential Digital',
        price: '₹8,000',
        features: ['2 E-Invite Designs', 'Basic Animation', 'Guest List Import', '5 Revisions']
      },
      {
        name: 'Professional Digital',
        price: '₹35,000',
        features: ['5 Designs', 'Full Animation', 'Wedding Website', 'RSVP Management', 'Unlimited Revisions']
      },
      {
        name: 'Enterprise Digital',
        price: '₹75,000',
        features: ['10+ Designs', 'Custom Development', 'Live Streaming', 'SMS Integration', 'Analytics', 'Dedicated Support']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Kavitha R',
        rating: 5,
        date: '2024-02-01',
        comment: 'Absolutely beautiful designs! The team was very responsive.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // LUXURY CARDS VENDORS
  {
    id: 3,
    name: 'Luxury Invitation Studio',
    businessName: 'Luxury Wedding Cards',
    businessCategory: 'Luxury Cards',
    eventType: 'Luxury Cards',
    personName: 'Arun Mehta',
    designation: 'Premium Designer',
    description: 'Premium luxury wedding cards with exquisite materials and craftsmanship',
    longDescription: 'Luxury Invitation Studio creates bespoke wedding invitations that make a statement. Using premium materials like handmade paper, silk ribbons, gold foiling, and intricate laser-cut designs, we craft invitations that are true works of art. Each piece is meticulously handcrafted to reflect the grandeur of your celebration.',
    services: ['Wedding Invitation Printing', 'Customized Invitation Design'],
    logo: luxurycards,
    location: 'Bangalore, Karnataka',
    rating: 4.7,
    totalReviews: 89,
    priceRange: '₹200 - ₹1,000 per card',
    budgetRange: '₹200 - ₹1,000 per card',
    experience: 12,
    businessType: 'Partnership',
    invitationTypes: ['Traditional Cards', 'Premium / Box Invitations'],
    printingOptions: ['Offset', 'Letterpress', 'Foil / Embossing'],
    giftTypes: [],
    minOrderQuantity: 100,
    giftMinOrder: 0,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'yes',
    designApprovalTime: 5,
    printingDeliveryTime: 14,
    giftPreparationTime: 0,
    preferredLocations: ['Local', 'Within State', 'Outstation', 'International'],
    availableLocations: ['Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Delhi', 'Gujarat'],
    hasTravelCharges: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '20%',
    balanceTerms: 'Balance before dispatch',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43212',
      email: 'info@luxuryinvitationstudio.com',
      website: 'www.luxuryinvitationstudio.com',
      address: '789 Luxury Lane, Bangalore - 560001'
    },
    whatsappNumber: '+919876543212',
    contactNumber: '+919876543212',
    socialMedia: {
      instagram: '@luxuryinvitationstudio',
      facebook: '/luxuryinvitationstudio',
      pinterest: '@luxuryinvitationstudio'
    },
    portfolio: [
      { id: 1, image: luxurycards, title: 'Gold Foil Invitation', description: 'Handmade paper with 24K gold foiling' },
      { id: 2, image: luxurycards, title: 'Laser Cut Box Set', description: 'Intricate laser-cut wooden box with invitations' },
      { id: 3, image: luxurycards, title: 'Silk Ribbon Collection', description: 'Invitations with real silk ribbons and wax seals' },
    ],
    packages: [
      {
        name: 'Classic Luxury',
        price: '₹200 per card',
        features: ['Premium Card Stock', 'Gold Foiling', 'Custom Envelopes', 'Minimum 100 cards']
      },
      {
        name: 'Royal Collection',
        price: '₹500 per card',
        features: ['Handmade Paper', 'Multiple Foils', 'Silk Ribbons', 'Wax Seals', 'Custom Boxes']
      },
      {
        name: 'Imperial Suite',
        price: '₹1,000 per card',
        features: ['Leather/Fabric Cover', 'Crystal Embellishments', 'Hand-painted Details', 'Premium Packaging', 'RSVP Cards', 'Thank You Cards']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anand Raj',
        rating: 5,
        date: '2024-01-20',
        comment: 'The quality exceeded our expectations! Every detail was perfect.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 4,
    name: 'Royal Wedding Cards',
    businessName: 'Royal Luxury Invitations',
    businessCategory: 'Luxury Cards',
    eventType: 'Luxury Cards',
    personName: 'Sneha Reddy',
    designation: 'Luxury Card Specialist',
    description: 'Royal themed luxury wedding cards with premium finishes and elegant designs',
    longDescription: 'Royal Wedding Cards brings regal elegance to your wedding invitations. Drawing inspiration from royal weddings and palace aesthetics, we create invitations that feel like treasured heirlooms. Our team of skilled artisans combines traditional craftsmanship with contemporary design.',
    services: ['Wedding Invitation Printing', 'Customized Invitation Design'],
    logo: luxurycards,
    location: 'Hyderabad, Telangana',
    rating: 4.6,
    totalReviews: 67,
    priceRange: '₹300 - ₹1,500 per card',
    budgetRange: '₹300 - ₹1,500 per card',
    experience: 10,
    businessType: 'Private Limited',
    invitationTypes: ['Traditional Cards', 'Theme-based Cards', 'Premium / Box Invitations'],
    printingOptions: ['Foil / Embossing', 'Letterpress'],
    giftTypes: [],
    minOrderQuantity: 50,
    giftMinOrder: 0,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'yes',
    designApprovalTime: 4,
    printingDeliveryTime: 12,
    giftPreparationTime: 0,
    preferredLocations: ['Within State', 'Outstation'],
    availableLocations: ['Telangana', 'Andhra Pradesh', 'Karnataka', 'Maharashtra'],
    hasTravelCharges: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '25%',
    balanceTerms: 'Balance on delivery',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43213',
      email: 'hello@royalweddingcards.com',
      website: 'www.royalweddingcards.com',
      address: '321 Royal Enclave, Hyderabad - 500001'
    },
    whatsappNumber: '+919876543213',
    contactNumber: '+919876543213',
    socialMedia: {
      instagram: '@royalweddingcards',
      facebook: '/royalweddingcards',
      pinterest: '@royalweddingcards'
    },
    portfolio: [
      { id: 1, image: luxurycards, title: 'Royal Scroll Invitation', description: 'Traditional scroll-style invitation' },
      { id: 2, image: luxurycards, title: 'Palatial Box Set', description: 'Multi-layer box with royal motifs' },
      { id: 3, image: luxurycards, title: 'Gold Embossed Cards', description: 'Heavy gold embossing on silk paper' },
    ],
    packages: [
      {
        name: 'Royal Classic',
        price: '₹300 per card',
        features: ['Premium Paper', 'Gold Foiling', 'Custom Envelopes', 'Tassel Details']
      },
      {
        name: 'Maharaja Collection',
        price: '₹800 per card',
        features: ['Silk Paper', 'Multi-color Foiling', 'Box Packaging', 'Wax Seal', 'Information Card']
      },
      {
        name: 'Imperial Legacy',
        price: '₹1,500 per card',
        features: ['Handmade Paper', '24K Gold Details', 'Gemstone Accents', 'Wooden Box', 'Multiple Inserts', 'Personalized Artwork']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Vikram Reddy',
        rating: 4.5,
        date: '2024-01-10',
        comment: 'Beautiful royal designs. Our guests loved the invitations!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // PRINTED CARDS VENDORS
  {
    id: 5,
    name: 'Print Masters',
    businessName: 'Print Masters Invitations',
    businessCategory: 'Printed Cards',
    eventType: 'Printed Cards',
    personName: 'Vikram Singh',
    designation: 'Printing Specialist',
    description: 'High-quality printed wedding cards with various paper options and finishes',
    longDescription: 'Print Masters has been serving the wedding industry for 15+ years with exceptional print quality and competitive pricing. We offer a wide range of paper stocks, printing techniques, and finishing options to bring your vision to life. From traditional to contemporary, we handle all styles with precision.',
    services: ['Wedding Invitation Printing', 'Customized Invitation Design'],
    logo: printedcards,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 234,
    priceRange: '₹50 - ₹500 per card',
    budgetRange: '₹50 - ₹500 per card',
    experience: 15,
    businessType: 'Partnership',
    invitationTypes: ['Traditional Cards', 'Theme-based Cards'],
    printingOptions: ['Offset', 'Digital'],
    giftTypes: [],
    minOrderQuantity: 200,
    giftMinOrder: 0,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'yes',
    designApprovalTime: 3,
    printingDeliveryTime: 10,
    giftPreparationTime: 0,
    preferredLocations: ['Local', 'Within State', 'Outstation'],
    availableLocations: ['Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Kerala', 'Telangana', 'Maharashtra'],
    hasTravelCharges: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '25%',
    balanceTerms: 'Balance before delivery',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43214',
      email: 'info@printmasters.com',
      website: 'www.printmasters.com',
      address: '567 Printers Street, Chennai - 600001'
    },
    whatsappNumber: '+919876543214',
    contactNumber: '+919876543214',
    socialMedia: {
      instagram: '@printmasters',
      facebook: '/printmasters',
      youtube: '@printmasters'
    },
    portfolio: [
      { id: 1, image: printedcards, title: 'Offset Printed Cards', description: 'High-volume offset printing' },
      { id: 2, image: printedcards, title: 'Digital Print Collection', description: 'Quick turnaround digital prints' },
      { id: 3, image: printedcards, title: 'Textured Paper Range', description: 'Various paper textures and weights' },
    ],
    packages: [
      {
        name: 'Economy Print',
        price: '₹50 per card',
        features: ['Standard Paper', 'Single Color', 'Simple Design', 'Minimum 200 cards']
      },
      {
        name: 'Premium Print',
        price: '₹200 per card',
        features: ['Premium Paper', 'Full Color', 'Foil Accents', 'Custom Envelopes', 'Minimum 100 cards']
      },
      {
        name: 'Executive Collection',
        price: '₹500 per card',
        features: ['Luxury Paper', 'Multi-color Printing', 'Foil & Embossing', 'Custom Packaging', 'RSVP Cards', 'Thank You Cards']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Manoj K',
        rating: 5,
        date: '2024-02-05',
        comment: 'Excellent print quality and timely delivery. Highly recommended!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 6,
    name: 'Traditional Prints',
    businessName: 'Traditional Printed Cards',
    businessCategory: 'Printed Cards',
    eventType: 'Printed Cards',
    personName: 'Anjali Nair',
    designation: 'Print Manager',
    description: 'Traditional and contemporary printed wedding cards with excellent print quality',
    longDescription: 'Traditional Prints specializes in culturally authentic wedding invitations that honor tradition while embracing modern printing techniques. With 9+ years of experience, we understand the nuances of different cultural ceremonies and create invitations that perfectly represent your heritage.',
    services: ['Wedding Invitation Printing'],
    logo: printedcards,
    location: 'Kochi, Kerala',
    rating: 4.8,
    totalReviews: 112,
    priceRange: '₹40 - ₹400 per card',
    budgetRange: '₹40 - ₹400 per card',
    experience: 9,
    businessType: 'Proprietorship',
    invitationTypes: ['Traditional Cards', 'Eco-friendly Invitations'],
    printingOptions: ['Offset'],
    giftTypes: [],
    minOrderQuantity: 150,
    giftMinOrder: 0,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'yes',
    designApprovalTime: 4,
    printingDeliveryTime: 8,
    giftPreparationTime: 0,
    preferredLocations: ['Within State'],
    availableLocations: ['Kerala', 'Tamil Nadu', 'Karnataka'],
    hasTravelCharges: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '20%',
    balanceTerms: 'Balance on delivery',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43215',
      email: 'contact@traditionalprints.com',
      website: 'www.traditionalprints.com',
      address: '890 Heritage Road, Kochi - 682001'
    },
    whatsappNumber: '+919876543215',
    contactNumber: '+919876543215',
    socialMedia: {
      instagram: '@traditionalprints',
      facebook: '/traditionalprints'
    },
    portfolio: [
      { id: 1, image: printedcards, title: 'Malayalam Wedding Card', description: 'Traditional Kerala design' },
      { id: 2, image: printedcards, title: 'Tamil Wedding Collection', description: 'Classic Tamil invitation styles' },
      { id: 3, image: printedcards, title: 'Eco-friendly Range', description: 'Seed paper and recycled options' },
    ],
    packages: [
      {
        name: 'Traditional Basic',
        price: '₹40 per card',
        features: ['Standard Paper', 'Single Color Print', 'Traditional Design', 'Minimum 150 cards']
      },
      {
        name: 'Cultural Premium',
        price: '₹150 per card',
        features: ['Premium Paper', 'Multi-color Print', 'Gold Borders', 'Custom Envelopes']
      },
      {
        name: 'Heritage Collection',
        price: '₹400 per card',
        features: ['Handmade Paper', 'Full Color', 'Traditional Motifs', 'Silk Ribbons', 'Wooden Box']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Divya Menon',
        rating: 4.8,
        date: '2024-01-18',
        comment: 'Beautiful traditional designs. Perfect for our Kerala wedding!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // CUSTOM DESIGNS VENDORS
  {
    id: 7,
    name: 'Custom Creations',
    businessName: 'Custom Invitation Designs',
    businessCategory: 'Custom Designs',
    eventType: 'Custom Designs',
    personName: 'Rahul Verma',
    designation: 'Design Head',
    description: 'Fully customized invitation designs created from scratch based on your vision',
    longDescription: 'Custom Creations brings your dream invitation to life through our bespoke design process. We work closely with each couple to understand their story, style, and vision, then create entirely unique designs that reflect their personality. From concept sketches to final artwork, every element is crafted just for you.',
    services: ['Customized Invitation Design', 'Wedding Invitation Printing'],
    logo: customdesigns,
    location: 'Madurai, Tamil Nadu',
    rating: 4.7,
    totalReviews: 78,
    priceRange: '₹10,000 - ₹1,00,000 per project',
    budgetRange: '₹10,000 - ₹1,00,000 per project',
    experience: 11,
    businessType: 'Private Limited',
    invitationTypes: ['Theme-based Cards', 'Premium / Box Invitations', 'Eco-friendly Invitations'],
    printingOptions: ['Digital', 'Foil / Embossing'],
    giftTypes: [],
    minOrderQuantity: 25,
    giftMinOrder: 0,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'yes',
    designApprovalTime: 7,
    printingDeliveryTime: 14,
    giftPreparationTime: 0,
    preferredLocations: ['Local', 'Within State', 'Outstation'],
    availableLocations: ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Maharashtra'],
    hasTravelCharges: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '30%',
    balanceTerms: 'Balance before final print',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43216',
      email: 'studio@customcreations.com',
      website: 'www.customcreations.com',
      address: '123 Design Street, Madurai - 625001'
    },
    whatsappNumber: '+919876543216',
    contactNumber: '+919876543216',
    socialMedia: {
      instagram: '@customcreations',
      facebook: '/customcreations',
      behance: '@customcreations'
    },
    portfolio: [
      { id: 1, image: customdesigns, title: 'Custom Illustration Suite', description: 'Personalized couple illustrations' },
      { id: 2, image: customdesigns, title: 'Storybook Wedding', description: 'Narrative-style invitation book' },
      { id: 3, image: customdesigns, title: 'Map-themed Invitations', description: 'Custom illustrated venue maps' },
    ],
    packages: [
      {
        name: 'Custom Design Basic',
        price: '₹10,000',
        features: ['Initial Consultation', '3 Concept Designs', '5 Revisions', 'Final Artwork']
      },
      {
        name: 'Premium Design Suite',
        price: '₹35,000',
        features: ['Deep Consultation', '5 Concept Designs', 'Unlimited Revisions', 'Full Suite Design', 'Print Management']
      },
      {
        name: 'Ultimate Bespoke',
        price: '₹1,00,000',
        features: ['Complete Creative Direction', 'Custom Illustrations', 'Full Wedding Stationery', 'Premium Printing', 'Packaging Design', 'On-site Consultation']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Neha Gupta',
        rating: 5,
        date: '2024-01-25',
        comment: 'Rahul understood exactly what we wanted! Our invitations were perfect.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 8,
    name: 'Design Studio',
    businessName: 'Design Studio Invitations',
    businessCategory: 'Custom Designs',
    eventType: 'Custom Designs',
    personName: 'Meera Patel',
    designation: 'Creative Designer',
    description: 'Unique custom-designed invitations that tell your personal love story',
    longDescription: 'Design Studio creates emotionally resonant invitations that tell your unique love story. With a background in fine arts and graphic design, Meera brings an artistic perspective to every project. Each invitation suite is crafted to evoke the feelings and memories of your relationship.',
    services: ['Customized Invitation Design'],
    logo: customdesigns,
    location: 'Ahmedabad, Gujarat',
    rating: 4.6,
    totalReviews: 56,
    priceRange: '₹15,000 - ₹1,20,000 per project',
    budgetRange: '₹15,000 - ₹1,20,000 per project',
    experience: 7,
    businessType: 'Individual',
    invitationTypes: ['Theme-based Cards', 'Digital / Video Invitations'],
    printingOptions: ['Letterpress'],
    giftTypes: [],
    minOrderQuantity: 20,
    giftMinOrder: 0,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'yes',
    designApprovalTime: 5,
    printingDeliveryTime: 10,
    giftPreparationTime: 0,
    preferredLocations: ['Within State', 'Outstation'],
    availableLocations: ['Gujarat', 'Maharashtra', 'Rajasthan', 'Madhya Pradesh'],
    hasTravelCharges: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '25%',
    balanceTerms: 'Balance on approval',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43217',
      email: 'meera@designstudio.com',
      website: 'www.designstudio.com',
      address: '456 Creative Hub, Ahmedabad - 380001'
    },
    whatsappNumber: '+919876543217',
    contactNumber: '+919876543217',
    socialMedia: {
      instagram: '@designstudio',
      facebook: '/designstudio',
      pinterest: '@designstudio'
    },
    portfolio: [
      { id: 1, image: customdesigns, title: 'Love Story Timeline', description: 'Visual timeline of relationship' },
      { id: 2, image: customdesigns, title: 'Travel Theme Suite', description: 'Destination wedding story' },
      { id: 3, image: customdesigns, title: 'Botanical Illustrations', description: 'Custom plant and flower art' },
    ],
    packages: [
      {
        name: 'Story Starter',
        price: '₹15,000',
        features: ['Story Consultation', '2 Design Concepts', '4 Revisions', 'Digital Files']
      },
      {
        name: 'Love Narrative',
        price: '₹45,000',
        features: ['In-depth Story Session', '4 Design Concepts', 'Unlimited Revisions', 'Full Suite', 'Print Coordination']
      },
      {
        name: 'Epic Love Story',
        price: '₹1,20,000',
        features: ['Complete Branding', 'Custom Illustrations', 'All Wedding Stationery', 'Premium Printing', 'Custom Packaging', 'Keepsake Box']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Karan Shah',
        rating: 4.7,
        date: '2024-01-08',
        comment: 'Meera captured our story beautifully. The designs were so personal and meaningful.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // RETURN GIFTS VENDORS
  {
    id: 9,
    name: 'Gift Solutions',
    businessName: 'Wedding Return Gifts',
    businessCategory: 'Return Gifts',
    eventType: 'Return Gifts',
    personName: 'Aisha Khan',
    designation: 'Gift Consultant',
    description: 'Beautiful and thoughtful return gifts for wedding guests',
    longDescription: 'Gift Solutions helps couples find the perfect return gifts that guests will truly appreciate. With 8+ years of experience in the gifting industry, we offer a curated selection of thoughtful, high-quality items across various price points. From traditional to contemporary, we have options for every taste and budget.',
    services: ['Wedding Return Gifts', 'Wedding Favors', 'Corporate / Bulk Gifts'],
    logo: returngifts,
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    totalReviews: 178,
    priceRange: '₹200 - ₹2,000 per gift',
    budgetRange: '₹200 - ₹2,000 per gift',
    experience: 8,
    businessType: 'Private Limited',
    invitationTypes: [],
    printingOptions: [],
    giftTypes: ['Traditional Gifts', 'Customized Gifts', 'Edible Gifts'],
    minOrderQuantity: 0,
    giftMinOrder: 100,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'yes',
    designApprovalTime: 0,
    printingDeliveryTime: 0,
    giftPreparationTime: 10,
    preferredLocations: ['Local', 'Within State', 'Outstation'],
    availableLocations: ['Maharashtra', 'Gujarat', 'Karnataka', 'Telangana', 'Delhi NCR'],
    hasTravelCharges: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '25%',
    balanceTerms: 'Balance before dispatch',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43218',
      email: 'info@giftsolutions.com',
      website: 'www.giftsolutions.com',
      address: '789 Gift Street, Mumbai - 400001'
    },
    whatsappNumber: '+919876543218',
    contactNumber: '+919876543218',
    socialMedia: {
      instagram: '@giftsolutions',
      facebook: '/giftsolutions',
      youtube: '@giftsolutions'
    },
    portfolio: [
      { id: 1, image: returngifts, title: 'Traditional Gift Box', description: 'Assorted traditional items' },
      { id: 2, image: returngifts, title: 'Personalized Coasters', description: 'Custom engraved coasters' },
      { id: 3, image: returngifts, title: 'Mini Planters', description: 'Succulent plant favors' },
    ],
    packages: [
      {
        name: 'Essential Favors',
        price: '₹200 per gift',
        features: ['Basic Gift Item', 'Simple Packaging', 'Minimum 100 pieces']
      },
      {
        name: 'Premium Favors',
        price: '₹800 per gift',
        features: ['Premium Gift', 'Custom Branding', 'Elegant Packaging', 'Gift Tag', 'Minimum 50 pieces']
      },
      {
        name: 'Luxury Favors',
        price: '₹2,000 per gift',
        features: ['Luxury Gift Set', 'Full Customization', 'Premium Box', 'Personalized Message', 'Ribbon & Seals', 'Minimum 25 pieces']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Fatima Sheikh',
        rating: 5,
        date: '2024-02-10',
        comment: 'Guests loved the return gifts! Quality was excellent.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 10,
    name: 'Thank You Gifts',
    businessName: 'Thank You Return Gifts',
    businessCategory: 'Return Gifts',
    eventType: 'Return Gifts',
    personName: 'Kabir Malhotra',
    designation: 'Gift Specialist',
    description: 'Elegant return gifts that show appreciation to your wedding guests',
    longDescription: 'Thank You Gifts specializes in creating memorable return gifts that express genuine gratitude. We believe that return gifts should be as special as the wedding itself. Our team helps you select or create gifts that reflect your personality and leave a lasting impression on your guests.',
    services: ['Wedding Return Gifts', 'Wedding Favors'],
    logo: returngifts,
    location: 'Delhi, Delhi',
    rating: 4.8,
    totalReviews: 145,
    priceRange: '₹150 - ₹1,500 per gift',
    budgetRange: '₹150 - ₹1,500 per gift',
    experience: 6,
    businessType: 'Partnership',
    invitationTypes: [],
    printingOptions: [],
    giftTypes: ['Traditional Gifts', 'Eco-friendly Gifts', 'Customized Gifts'],
    minOrderQuantity: 0,
    giftMinOrder: 50,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'yes',
    designApprovalTime: 0,
    printingDeliveryTime: 0,
    giftPreparationTime: 7,
    preferredLocations: ['Local', 'Within State'],
    availableLocations: ['Delhi NCR', 'Uttar Pradesh', 'Haryana', 'Punjab', 'Rajasthan'],
    hasTravelCharges: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '20%',
    balanceTerms: 'Balance on delivery',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43219',
      email: 'hello@thankyougifts.com',
      website: 'www.thankyougifts.com',
      address: '321 Gift Avenue, Delhi - 110001'
    },
    whatsappNumber: '+919876543219',
    contactNumber: '+919876543219',
    socialMedia: {
      instagram: '@thankyougifts',
      facebook: '/thankyougifts'
    },
    portfolio: [
      { id: 1, image: returngifts, title: 'Eco-friendly Seeds', description: 'Seed paper and plant kits' },
      { id: 2, image: returngifts, title: 'Custom Mugs', description: 'Personalized ceramic mugs' },
      { id: 3, image: returngifts, title: 'Mini Hamper', description: 'Assorted goodie boxes' },
    ],
    packages: [
      {
        name: 'Simple Thanks',
        price: '₹150 per gift',
        features: ['Basic Gift', 'Standard Packaging', 'Minimum 100 pieces']
      },
      {
        name: 'Elegant Thanks',
        price: '₹600 per gift',
        features: ['Premium Gift', 'Custom Label', 'Gift Box', 'Thank You Tag', 'Minimum 50 pieces']
      },
      {
        name: 'Royal Thanks',
        price: '₹1,500 per gift',
        features: ['Luxury Gift Set', 'Full Customization', 'Premium Packaging', 'Personalized Note', 'Ribbon', 'Minimum 25 pieces']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Rahul Sharma',
        rating: 4.8,
        date: '2024-01-28',
        comment: 'Great variety and quality. The packaging was beautiful!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // GIFT HAMPERS VENDORS
  {
    id: 11,
    name: 'Hamper House',
    businessName: 'Wedding Gift Hampers',
    businessCategory: 'Gift Hampers',
    eventType: 'Gift Hampers',
    personName: 'Sanjay Gupta',
    designation: 'Hamper Designer',
    description: 'Beautifully curated gift hampers for wedding guests and family',
    longDescription: 'Hamper House creates stunning gift hampers that delight recipients. With 5+ years of experience, we specialize in curating themed hampers that combine premium products in beautiful presentations. From gourmet treats to luxury wellness items, each hamper is thoughtfully assembled.',
    services: ['Hampers & Custom Packaging', 'Wedding Favors'],
    logo: gifthampers,
    location: 'Bangalore, Karnataka',
    rating: 4.7,
    totalReviews: 89,
    priceRange: '₹500 - ₹5,000 per hamper',
    budgetRange: '₹500 - ₹5,000 per hamper',
    experience: 5,
    businessType: 'Proprietorship',
    invitationTypes: [],
    printingOptions: [],
    giftTypes: ['Premium Hampers', 'Edible Gifts'],
    minOrderQuantity: 0,
    giftMinOrder: 20,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'yes',
    designApprovalTime: 0,
    printingDeliveryTime: 0,
    giftPreparationTime: 5,
    preferredLocations: ['Within State'],
    availableLocations: ['Karnataka', 'Tamil Nadu', 'Kerala', 'Andhra Pradesh'],
    hasTravelCharges: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '25%',
    balanceTerms: 'Balance before delivery',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43220',
      email: 'info@hamperhouse.com',
      website: 'www.hamperhouse.com',
      address: '567 Hamper Lane, Bangalore - 560001'
    },
    whatsappNumber: '+919876543220',
    contactNumber: '+919876543220',
    socialMedia: {
      instagram: '@hamperhouse',
      facebook: '/hamperhouse'
    },
    portfolio: [
      { id: 1, image: gifthampers, title: 'Gourmet Hamper', description: 'Premium food and wine' },
      { id: 2, image: gifthampers, title: 'Spa Hamper', description: 'Luxury wellness products' },
      { id: 3, image: gifthampers, title: 'Chocolate Delight', description: 'Assorted premium chocolates' },
    ],
    packages: [
      {
        name: 'Standard Hamper',
        price: '₹500 per hamper',
        features: ['3-4 Items', 'Standard Basket', 'Cellophane Wrap', 'Ribbon', 'Minimum 20 pieces']
      },
      {
        name: 'Premium Hamper',
        price: '₹2,000 per hamper',
        features: ['5-6 Premium Items', 'Elegant Basket/Box', 'Custom Tag', 'Decorative Fill', 'Minimum 15 pieces']
      },
      {
        name: 'Luxury Hamper',
        price: '₹5,000 per hamper',
        features: ['8-10 Luxury Items', 'Designer Hamper', 'Full Customization', 'Personalized Message', 'Premium Wrapping', 'Minimum 10 pieces']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anita Desai',
        rating: 4.7,
        date: '2024-01-15',
        comment: 'Beautiful hampers! Our family guests were very impressed.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 12,
    name: 'Premium Hampers',
    businessName: 'Premium Gift Hampers',
    businessCategory: 'Gift Hampers',
    eventType: 'Gift Hampers',
    personName: 'Neha Joshi',
    designation: 'Premium Hamper Curator',
    description: 'Luxury gift hampers with premium products and elegant packaging',
    longDescription: 'Premium Hampers specializes in creating luxurious gifting experiences for discerning clients. With 7+ years of experience in the luxury gifting space, we source the finest products from around the world and present them in exquisite packaging that makes every hamper a memorable gift.',
    services: ['Hampers & Custom Packaging', 'Wedding Favors', 'Corporate / Bulk Gifts'],
    logo: gifthampers,
    location: 'Pune, Maharashtra',
    rating: 4.8,
    totalReviews: 67,
    priceRange: '₹1,000 - ₹10,000 per hamper',
    budgetRange: '₹1,000 - ₹10,000 per hamper',
    experience: 7,
    businessType: 'Private Limited',
    invitationTypes: [],
    printingOptions: [],
    giftTypes: ['Premium Hampers', 'Edible Gifts', 'Customized Gifts'],
    minOrderQuantity: 0,
    giftMinOrder: 10,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'yes',
    designApprovalTime: 0,
    printingDeliveryTime: 0,
    giftPreparationTime: 7,
    preferredLocations: ['Local', 'Within State', 'Outstation'],
    availableLocations: ['Maharashtra', 'Gujarat', 'Karnataka', 'Telangana', 'Delhi NCR'],
    hasTravelCharges: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '30%',
    balanceTerms: 'Balance on delivery',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43221',
      email: 'hello@premiumhampers.com',
      website: 'www.premiumhampers.com',
      address: '890 Luxury Street, Pune - 411001'
    },
    whatsappNumber: '+919876543221',
    contactNumber: '+919876543221',
    socialMedia: {
      instagram: '@premiumhampers',
      facebook: '/premiumhampers'
    },
    portfolio: [
      { id: 1, image: gifthampers, title: 'Wine & Cheese', description: 'Premium wine and gourmet cheese' },
      { id: 2, image: gifthampers, title: 'International Snacks', description: 'Global gourmet snacks' },
      { id: 3, image: gifthampers, title: 'Luxury Bath Set', description: 'Premium bath products' },
    ],
    packages: [
      {
        name: 'Classic Selection',
        price: '₹1,000 per hamper',
        features: ['4-5 Items', 'Elegant Box', 'Ribbon', 'Gift Card', 'Minimum 15 pieces']
      },
      {
        name: 'Deluxe Collection',
        price: '₹4,000 per hamper',
        features: ['7-8 Premium Items', 'Designer Box/Basket', 'Custom Branding', 'Personalized Note', 'Minimum 10 pieces']
      },
      {
        name: 'Ultimate Luxury',
        price: '₹10,000 per hamper',
        features: ['10-12 Luxury Items', 'Exclusive Hamper', 'Full Customization', 'Premium Packaging', 'Concierge Delivery', 'Minimum 5 pieces']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Vikram Joshi',
        rating: 5,
        date: '2024-02-05',
        comment: 'Exceptional quality and presentation. Worth every penny!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // ECO GIFTS VENDORS
  {
    id: 13,
    name: 'Eco Gifts',
    businessName: 'Eco-Friendly Wedding Gifts',
    businessCategory: 'Eco Gifts',
    eventType: 'Eco Gifts',
    personName: 'Venkatesh Iyer',
    designation: 'Eco Products Manager',
    description: 'Environmentally friendly gift options for eco-conscious weddings',
    longDescription: 'Eco Gifts is committed to helping couples celebrate sustainably. We offer a beautiful range of eco-friendly return gifts and favors that minimize environmental impact without compromising on style or quality. From seed paper to upcycled products, every gift tells a story of sustainability.',
    services: ['Wedding Return Gifts', 'Wedding Favors'],
    logo: ecogifts,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 112,
    priceRange: '₹100 - ₹1,000 per gift',
    budgetRange: '₹100 - ₹1,000 per gift',
    experience: 6,
    businessType: 'Individual',
    invitationTypes: [],
    printingOptions: [],
    giftTypes: ['Eco-friendly Gifts'],
    minOrderQuantity: 0,
    giftMinOrder: 50,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'yes',
    designApprovalTime: 0,
    printingDeliveryTime: 0,
    giftPreparationTime: 5,
    preferredLocations: ['Local', 'Within State'],
    availableLocations: ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh'],
    hasTravelCharges: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '20%',
    balanceTerms: 'Balance before dispatch',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43222',
      email: 'hello@ecogifts.com',
      website: 'www.ecogifts.com',
      address: '123 Green Avenue, Chennai - 600001'
    },
    whatsappNumber: '+919876543222',
    contactNumber: '+919876543222',
    socialMedia: {
      instagram: '@ecogifts',
      facebook: '/ecogifts'
    },
    portfolio: [
      { id: 1, image: ecogifts, title: 'Seed Paper Bookmarks', description: 'Plantable bookmark favors' },
      { id: 2, image: ecogifts, title: 'Bamboo Products', description: 'Eco-friendly bamboo items' },
      { id: 3, image: ecogifts, title: 'Jute Bags', description: 'Custom printed jute bags' },
    ],
    packages: [
      {
        name: 'Green Basic',
        price: '₹100 per gift',
        features: ['1 Eco Product', 'Recycled Packaging', 'Jute Tie', 'Minimum 100 pieces']
      },
      {
        name: 'Sustainable Premium',
        price: '₹400 per gift',
        features: ['2-3 Eco Products', 'Custom Label', 'Eco-friendly Box', 'Seed Paper Tag', 'Minimum 50 pieces']
      },
      {
        name: 'Zero Waste Luxury',
        price: '₹1,000 per gift',
        features: ['4-5 Sustainable Items', 'Bamboo Box', 'Full Customization', 'Personalized Message', 'Compostable Wrap', 'Minimum 25 pieces']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Priya Venkatesh',
        rating: 5,
        date: '2024-01-20',
        comment: 'Perfect for our eco-friendly wedding! Guests loved the plantable bookmarks.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 14,
    name: 'Green Gifts',
    businessName: 'Green Wedding Gifts',
    businessCategory: 'Eco Gifts',
    eventType: 'Eco Gifts',
    personName: 'Radha Krishnan',
    designation: 'Sustainable Gift Expert',
    description: 'Sustainable and eco-friendly gift options with minimal environmental impact',
    longDescription: 'Green Gifts is dedicated to promoting sustainable gifting practices. With 4+ years of experience, we work with local artisans and eco-friendly manufacturers to create beautiful gifts that are kind to the planet. Our products are ethically sourced and plastic-free.',
    services: ['Wedding Return Gifts', 'Hampers & Custom Packaging'],
    logo: ecogifts,
    location: 'Kanyakumari, Tamil Nadu',
    rating: 4.8,
    totalReviews: 78,
    priceRange: '₹150 - ₹1,200 per gift',
    budgetRange: '₹150 - ₹1,200 per gift',
    experience: 4,
    businessType: 'Proprietorship',
    invitationTypes: [],
    printingOptions: [],
    giftTypes: ['Eco-friendly Gifts', 'Traditional Gifts'],
    minOrderQuantity: 0,
    giftMinOrder: 30,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'yes',
    designApprovalTime: 0,
    printingDeliveryTime: 0,
    giftPreparationTime: 6,
    preferredLocations: ['Local'],
    availableLocations: ['Tamil Nadu', 'Kerala'],
    hasTravelCharges: 'no',
    advanceRequired: 'yes',
    advanceAmount: '15%',
    balanceTerms: 'Balance on delivery',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43223',
      email: 'contact@greengifts.com',
      website: 'www.greengifts.com',
      address: '456 Green Street, Kanyakumari - 629001'
    },
    whatsappNumber: '+919876543223',
    contactNumber: '+919876543223',
    socialMedia: {
      instagram: '@greengifts',
      facebook: '/greengifts'
    },
    portfolio: [
      { id: 1, image: ecogifts, title: 'Coconut Shell Bowls', description: 'Handcrafted coconut bowls' },
      { id: 2, image: ecogifts, title: 'Metal Straw Sets', description: 'Stainless steel straws with case' },
      { id: 3, image: ecogifts, title: 'Cloth Bags', description: 'Custom printed cloth bags' },
    ],
    packages: [
      {
        name: 'Eco Starter',
        price: '₹150 per gift',
        features: ['1 Eco Item', 'Recycled Box', 'Natural Fiber Tie', 'Minimum 50 pieces']
      },
      {
        name: 'Green Premium',
        price: '₹500 per gift',
        features: ['2-3 Items', 'Custom Printing', 'Eco Box', 'Plantable Tag', 'Minimum 30 pieces']
      },
      {
        name: 'Sustainable Luxury',
        price: '₹1,200 per gift',
        features: ['4-5 Premium Items', 'Bamboo Box', 'Full Customization', 'Handwritten Tag', 'Zero Plastic', 'Minimum 20 pieces']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Lakshmi Nair',
        rating: 4.8,
        date: '2024-01-05',
        comment: 'Beautiful sustainable gifts. Our guests appreciated the eco-friendly approach.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // LUXURY HAMPERS VENDORS
  {
    id: 15,
    name: 'Luxury Hampers',
    businessName: 'Luxury Wedding Hampers',
    businessCategory: 'Luxury Hampers',
    eventType: 'Luxury Hampers',
    personName: 'Pooja Mehta',
    designation: 'Luxury Hamper Curator',
    description: 'Ultra-premium luxury hampers for VIP guests and family members',
    longDescription: 'Luxury Hampers creates the finest gifting experiences for discerning clients. With 9+ years of experience in luxury gifting, we source the world\'s most coveted brands and products to create hampers that exude sophistication and elegance. Perfect for VIP guests, family members, and corporate partners.',
    services: ['Hampers & Custom Packaging', 'Corporate / Bulk Gifts'],
    logo: luxuryhampers,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 89,
    priceRange: '₹5,000 - ₹50,000 per hamper',
    budgetRange: '₹5,000 - ₹50,000 per hamper',
    experience: 9,
    businessType: 'Private Limited',
    invitationTypes: [],
    printingOptions: [],
    giftTypes: ['Premium Hampers', 'Customized Gifts'],
    minOrderQuantity: 0,
    giftMinOrder: 5,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'yes',
    designApprovalTime: 0,
    printingDeliveryTime: 0,
    giftPreparationTime: 8,
    preferredLocations: ['Local', 'Within State', 'Outstation'],
    availableLocations: ['Tamil Nadu', 'Karnataka', 'Telangana', 'Maharashtra', 'Delhi NCR', 'Gujarat'],
    hasTravelCharges: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '30%',
    balanceTerms: 'Balance before delivery',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43224',
      email: 'pooja@luxuryhampers.com',
      website: 'www.luxuryhampers.com',
      address: '789 Luxury Avenue, Chennai - 600001'
    },
    whatsappNumber: '+919876543224',
    contactNumber: '+919876543224',
    socialMedia: {
      instagram: '@luxuryhampers',
      facebook: '/luxuryhampers',
      youtube: '@luxuryhampers'
    },
    portfolio: [
      { id: 1, image: luxuryhampers, title: 'Champagne & Caviar', description: 'Premium champagne and caviar set' },
      { id: 2, image: luxuryhampers, title: 'International Cheese Board', description: 'World\'s finest cheeses' },
      { id: 3, image: luxuryhampers, title: 'Single Malt Collection', description: 'Premium Scotch whiskeys' },
    ],
    packages: [
      {
        name: 'Executive Luxury',
        price: '₹5,000 per hamper',
        features: ['4-5 Premium Items', 'Designer Box', 'Ribbon', 'Gift Card', 'Minimum 10 pieces']
      },
      {
        name: 'Royal Collection',
        price: '₹20,000 per hamper',
        features: ['8-10 Luxury Items', 'Premium Hamper', 'Gold Foil Branding', 'Personalized Message', 'Velvet Packaging', 'Minimum 5 pieces']
      },
      {
        name: 'Maharaja Suite',
        price: '₹50,000 per hamper',
        features: ['12-15 Ultra-luxury Items', 'Exclusive Designer Hamper', 'Full Customization', 'Hand-delivered', 'Certificate of Authenticity', 'Minimum 3 pieces']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Rajeev Menon',
        rating: 5,
        date: '2024-02-08',
        comment: 'Absolutely stunning hampers! Our VIP guests were blown away.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 16,
    name: 'Royal Hampers',
    businessName: 'Royal Luxury Hampers',
    businessCategory: 'Luxury Hampers',
    eventType: 'Luxury Hampers',
    personName: 'David Wilson',
    designation: 'Royal Hamper Specialist',
    description: 'Royal themed luxury hampers with premium international brands',
    longDescription: 'Royal Hampers brings the grandeur of royal gifting to modern weddings. With 12+ years of experience in international luxury gifting, we curate hampers that feature the world\'s most prestigious brands and products. Each hamper is designed to make recipients feel truly special.',
    services: ['Hampers & Custom Packaging'],
    logo: luxuryhampers,
    location: 'Coimbatore, Tamil Nadu',
    rating: 4.7,
    totalReviews: 56,
    priceRange: '₹10,000 - ₹1,00,000 per hamper',
    budgetRange: '₹10,000 - ₹1,00,000 per hamper',
    experience: 12,
    businessType: 'Partnership',
    invitationTypes: [],
    printingOptions: [],
    giftTypes: ['Premium Hampers'],
    minOrderQuantity: 0,
    giftMinOrder: 3,
    customizationAvailable: 'yes',
    brandingAvailable: 'yes',
    packingIncluded: 'yes',
    designApprovalTime: 0,
    printingDeliveryTime: 0,
    giftPreparationTime: 10,
    preferredLocations: ['Within State', 'Outstation', 'International'],
    availableLocations: ['Tamil Nadu', 'Karnataka', 'Kerala', 'Telangana', 'Maharashtra', 'Delhi NCR', 'Gujarat', 'International'],
    hasTravelCharges: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '25%',
    balanceTerms: 'Balance on delivery',
    hasGST: 'yes',
    contact: {
      phone: '+91 98765 43225',
      email: 'david@royalhampers.com',
      website: 'www.royalhampers.com',
      address: '321 Royal Street, Coimbatore - 641001'
    },
    whatsappNumber: '+919876543225',
    contactNumber: '+919876543225',
    socialMedia: {
      instagram: '@royalhampers',
      facebook: '/royalhampers'
    },
    portfolio: [
      { id: 1, image: luxuryhampers, title: 'Royal Wedding Hamper', description: 'Specially curated for wedding VIPs' },
      { id: 2, image: luxuryhampers, title: 'International Brand Collection', description: 'Global luxury brands' },
      { id: 3, image: luxuryhampers, title: 'Vintage Wine Selection', description: 'Rare vintage wines' },
    ],
    packages: [
      {
        name: 'Royal Silver',
        price: '₹10,000 per hamper',
        features: ['5-6 International Products', 'Elegant Wooden Box', 'Gold Stamping', 'Royal Seal', 'Minimum 5 pieces']
      },
      {
        name: 'Royal Gold',
        price: '₹40,000 per hamper',
        features: ['10-12 Luxury Items', 'Handcrafted Hamper', 'Custom Branding', 'Leather Accents', 'Personalized Letter', 'Minimum 3 pieces']
      },
      {
        name: 'Royal Platinum',
        price: '₹1,00,000 per hamper',
        features: ['15-20 Ultra-premium Items', 'Exclusive Designer Piece', 'Full Customization', 'Hand-delivered', 'Certificate of Royalty', 'Minimum 2 pieces']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anand Kumar',
        rating: 4.8,
        date: '2024-01-12',
        comment: 'Exceptional quality and presentation. Truly royal treatment!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  }
];