// src/data/stylingData.js
import bridalmakeup from '../assets/bridalmakeup.jpg';
import bridalaccessories from '../assets/bridalaccessories.jpg';
import hairstyling from '../assets/hairstyling.jpg';
import mehendiart from '../assets/mehendiart.jpg';
import traditionalattire from '../assets/traditionalattire.jpg';
import groommakeup from '../assets/groommakeup.jpg';
import groomhairstyling from '../assets/groomhairstyling.jpg';
import accessoriesfinishing from '../assets/accessoriesfinishing.jpg';
import commercial from '../assets/groomattire.jpg';

export const stylingVendors = [
  // Bridal Makeup (4 vendors)
  {
    id: 1,
    name: 'Glow Bridal Studio',
    businessName: 'Glow Bridal Makeup & Styling',
    businessCategory: 'Bridal Makeup',
    serviceType: 'Bridal Makeup',
    personName: 'Priya Sharma',
    designation: 'Lead Makeup Artist',
    description: 'Specializing in bridal makeup with 8+ years of experience. Creating timeless looks for modern brides.',
    longDescription: 'Glow Bridal Studio has been transforming brides into their most beautiful selves for over 8 years. We specialize in creating customized looks that enhance natural beauty while ensuring long-lasting perfection for your special day. Our team uses premium products and techniques to deliver flawless results.',
    services: ['Airbrush Makeup', 'Traditional Bridal Look', 'Contemporary Styles', 'Makeup for Events'],
    bridalStyles: ['Airbrush Makeup', 'Traditional'],
    groomServices: [],
    productBrands: ['MAC', 'HUDA Beauty'],
    logo: bridalmakeup,
    location: 'Chennai, Tamil Nadu',
    availableLocations: ['Chennai', 'Coimbatore', 'Bangalore', 'Hyderabad'],
    rating: 4.9,
    totalReviews: 245,
    budgetRange: '₹25,000 - ₹1,50,000',
    priceRange: '₹25,000 - ₹1,50,000',
    experience: 8,
    businessType: 'Studio/Salon',
    teamSize: 5,
    ownKit: 'Yes',
    backupArtist: 'Yes',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543201',
    contactNumber: '+919876543201',
    contact: {
      phone: '+91 98765 43201',
      email: 'info@glowbridal.com',
      website: 'www.glowbridal.com',
      address: '123 Beauty Street, Chennai - 600001'
    },
    socialMedia: {
      instagram: '@glowbridalstudio',
      facebook: '/glowbridal'
    },
    portfolio: [
      { id: 1, image: bridalmakeup, title: 'Bridal Makeup' },
      { id: 2, image: bridalmakeup, title: 'Engagement Look' },
      { id: 3, image: bridalmakeup, title: 'Engagement Look' }
    ],
    packages: [
      {
        name: 'Basic Bridal Package',
        price: '₹25,000',
        features: ['Bridal Makeup', 'Trial Session', 'Touch-up Kit', '1 Artist']
      },
      {
        name: 'Premium Bridal Package',
        price: '₹75,000',
        features: ['Bridal Makeup', 'Engagement Makeup', 'Reception Look', '2 Trials', '2 Artists', 'Touch-up Kit']
      },
      {
        name: 'Luxury Bridal Package',
        price: '₹1,50,000',
        features: ['Complete Wedding Week', 'All Events Coverage', 'Mother/Groom Makeup', 'Unlimited Trials', '3 Artists', 'Premium Products']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anita R',
        rating: 5,
        date: '2024-02-10',
        comment: 'Priya did an amazing job for my wedding! I felt like a princess.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 2,
    name: 'Royal Beauty Hub',
    businessName: 'Royal Bridal Makeup Artists',
    businessCategory: 'Bridal Makeup',
    serviceType: 'Bridal Makeup',
    personName: 'Anjali Mehta',
    designation: 'Creative Director',
    description: 'Creating timeless bridal looks with international quality products',
    longDescription: 'Royal Beauty Hub is a premier bridal makeup destination with 12+ years of experience. We specialize in creating stunning looks that blend traditional elegance with contemporary trends. Our team of expert artists uses only the finest international products.',
    services: ['Bridal Makeup', 'Engagement Makeup', 'Reception Look', 'Trial Sessions'],
    bridalStyles: ['HD Makeup', 'Celebrity / Theme-based'],
    groomServices: [],
    productBrands: ['Bobbi Brown', 'Kryolan'],
    logo: bridalmakeup,
    location: 'Coimbatore, Tamil Nadu',
    availableLocations: ['Coimbatore', 'Chennai', 'Bangalore', 'Mysore', 'Ooty', 'Kodaikanal'],
    rating: 4.8,
    totalReviews: 189,
    budgetRange: '₹30,000 - ₹2,00,000',
    priceRange: '₹30,000 - ₹2,00,000',
    experience: 12,
    businessType: 'Partnership',
    teamSize: 8,
    ownKit: 'Yes',
    backupArtist: 'Yes',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543202',
    contactNumber: '+919876543202',
    contact: {
      phone: '+91 98765 43202',
      email: 'contact@royalbeauty.com',
      website: 'www.royalbeauty.com',
      address: '456 Royal Avenue, Coimbatore - 641001'
    },
    socialMedia: {
      instagram: '@royalbeautyhub',
      facebook: '/royalbeauty'
    },
    portfolio: [
      { id: 1, image: bridalmakeup, title: 'Bridal Makeup' },
      { id: 2, image: bridalmakeup, title: 'Celebrity Look' },
      { id: 3, image: bridalmakeup, title: 'Celebrity Look' }
    ],
    packages: [
      {
        name: 'Royal Package',
        price: '₹30,000',
        features: ['Bridal Makeup', 'HD Finish', 'Trial Session', '1 Artist']
      },
      {
        name: 'Queen Package',
        price: '₹1,00,000',
        features: ['Bridal + Engagement', 'HD Finish', '2 Trials', '2 Artists']
      },
      {
        name: 'Empress Package',
        price: '₹2,00,000',
        features: ['Full Wedding Coverage', 'Celebrity Stylist', 'Premium Products', '3 Artists', 'Mother/Groom']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Kavita M',
        rating: 5,
        date: '2024-01-15',
        comment: 'Anjali understood exactly what I wanted. The makeup lasted all day!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 3,
    name: 'Bridal Elegance',
    businessName: 'Bridal Elegance Makeup Studio',
    businessCategory: 'Bridal Makeup',
    serviceType: 'Bridal Makeup',
    personName: 'Divya Krishnan',
    designation: 'Senior Makeup Artist',
    description: 'Specializing in natural and elegant bridal looks',
    longDescription: 'Bridal Elegance focuses on enhancing natural beauty with subtle, sophisticated makeup. With 7 years of experience, we specialize in creating looks that make you look like the best version of yourself, not someone else.',
    services: ['Natural Makeup', 'Soft Glam', 'Traditional Looks', 'Airbrush Finish'],
    bridalStyles: ['Natural / Minimal', 'Airbrush Makeup'],
    groomServices: [],
    productBrands: ['MAC', 'Bobbi Brown'],
    logo: bridalmakeup,
    location: 'Bangalore, Karnataka',
    availableLocations: ['Bangalore', 'Mysore', 'Chennai', 'Hyderabad'],
    rating: 4.9,
    totalReviews: 156,
    budgetRange: '₹20,000 - ₹1,20,000',
    priceRange: '₹20,000 - ₹1,20,000',
    experience: 7,
    businessType: 'Individual Artist',
    teamSize: 3,
    ownKit: 'Yes',
    backupArtist: 'Yes',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543203',
    contactNumber: '+919876543203',
    contact: {
      phone: '+91 98765 43203',
      email: 'divya@bridalelegance.com',
      website: 'www.bridalelegance.com',
      address: '789 MG Road, Bangalore - 560001'
    },
    socialMedia: {
      instagram: '@bridalelegance',
      facebook: '/bridalelegance'
    },
    portfolio: [
      { id: 1, image: bridalmakeup, title: 'Natural Bridal' },
      { id: 2, image: bridalmakeup, title: 'Soft Glam' },
      { id: 2, image: bridalmakeup, title: 'Soft Glam' }
    ],
    packages: [
      {
        name: 'Natural Glow',
        price: '₹20,000',
        features: ['Bridal Makeup', 'Natural Finish', 'Trial', '1 Artist']
      },
      {
        name: 'Elegant Bride',
        price: '₹60,000',
        features: ['Bridal + Reception', 'Airbrush Option', '2 Trials', '2 Artists']
      },
      {
        name: 'Complete Package',
        price: '₹1,20,000',
        features: ['All Wedding Events', 'Family Makeup (2)', 'Premium Products', '3 Artists']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Priya S',
        rating: 5,
        date: '2024-01-20',
        comment: 'Divya made me look naturally beautiful. Exactly what I wanted!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 4,
    name: 'Makeup by Meera',
    businessName: 'Meera\'s Bridal Studio',
    businessCategory: 'Bridal Makeup',
    serviceType: 'Bridal Makeup',
    personName: 'Meera Nair',
    designation: 'Celebrity Makeup Artist',
    description: 'Celebrity makeup artist specializing in destination weddings',
    longDescription: 'With 10+ years in the industry and experience with celebrities, Meera brings red-carpet quality to your wedding day. Specializing in destination weddings and high-end editorial looks.',
    services: ['Celebrity Style Makeup', 'Destination Weddings', 'Editorial Looks', 'Bridal Consultations'],
    bridalStyles: ['Celebrity / Theme-based', 'HD Makeup'],
    groomServices: [],
    productBrands: ['Kryolan', 'HUDA Beauty', 'MAC'],
    logo: bridalmakeup,
    location: 'Kochi, Kerala',
    availableLocations: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Chennai', 'Bangalore', 'Mumbai'],
    rating: 4.9,
    totalReviews: 312,
    budgetRange: '₹50,000 - ₹3,00,000',
    priceRange: '₹50,000 - ₹3,00,000',
    experience: 10,
    businessType: 'Individual Artist',
    teamSize: 6,
    ownKit: 'Yes',
    backupArtist: 'Yes',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543204',
    contactNumber: '+919876543204',
    contact: {
      phone: '+91 98765 43204',
      email: 'meera@makeupbymeera.com',
      website: 'www.makeupbymeera.com',
      address: '123 Marine Drive, Kochi - 682001'
    },
    socialMedia: {
      instagram: '@makeupbymeera',
      facebook: '/makeupbymeera'
    },
    portfolio: [
      { id: 1, image: bridalmakeup, title: 'Celebrity Bride' },
      { id: 2, image: bridalmakeup, title: 'Destination Wedding' },
      { id: 3, image: bridalmakeup, title: 'Destination Wedding' }
    ],
    packages: [
      {
        name: 'Signature Look',
        price: '₹50,000',
        features: ['Bridal Makeup', 'HD Finish', 'Trial', '1 Artist']
      },
      {
        name: 'Destination Bride',
        price: '₹1,50,000',
        features: ['Bridal + Reception', 'Travel Included', '2 Artists', 'Premium Products']
      },
      {
        name: 'Celebrity Package',
        price: '₹3,00,000',
        features: ['Full Wedding Coverage', 'Celebrity Stylist', 'Travel & Stay', '3 Artists', 'Family Package']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Lakshmi R',
        rating: 5,
        date: '2024-02-05',
        comment: 'Meera flew to Goa for our wedding. Absolutely flawless work!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Bridal Accessories (2 vendors)
  {
    id: 5,
    name: 'Queen Accessories',
    businessName: 'Queen Bridal Accessories',
    businessCategory: 'Bridal Accessories',
    serviceType: 'Bridal Accessories',
    personName: 'Meera Reddy',
    designation: 'Accessories Designer',
    description: 'Exquisite bridal accessories including jewelry and ornaments',
    longDescription: 'Queen Accessories offers handcrafted bridal jewelry and accessories that add the perfect finishing touch to your wedding look. From traditional temple jewelry to contemporary designs, we have something for every bride.',
    services: ['Bridal Jewelry Sets', 'Hair Accessories', 'Maang Tikka', 'Traditional Ornaments'],
    bridalStyles: [],
    groomServices: [],
    productBrands: ['Other Premium Brands'],
    logo: bridalaccessories,
    location: 'Chennai, Tamil Nadu',
    availableLocations: ['Chennai', 'Coimbatore', 'Bangalore', 'Hyderabad'],
    rating: 4.7,
    totalReviews: 134,
    budgetRange: '₹15,000 - ₹2,00,000',
    priceRange: '₹15,000 - ₹2,00,000',
    experience: 6,
    businessType: 'Proprietorship',
    teamSize: 3,
    ownKit: 'Yes',
    backupArtist: 'No',
    hygieneKits: 'Yes',
    patchTest: 'No',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543205',
    contactNumber: '+919876543205',
    contact: {
      phone: '+91 98765 43205',
      email: 'meera@queenaccessories.com',
      website: 'www.queenaccessories.com',
      address: '123 T Nagar, Chennai - 600017'
    },
    socialMedia: {
      instagram: '@queenaccessories',
      facebook: '/queenaccessories'
    },
    portfolio: [
      { id: 1, image: bridalaccessories, title: 'Temple Jewelry' },
      { id: 2, image: bridalaccessories, title: 'Contemporary Sets' },
      { id: 3, image: bridalaccessories, title: 'Contemporary Sets' }
    ],
    packages: [
      {
        name: 'Essential Set',
        price: '₹15,000',
        features: ['Necklace', 'Earrings', 'Maang Tikka', 'Bangles']
      },
      {
        name: 'Deluxe Collection',
        price: '₹75,000',
        features: ['Full Jewelry Set', 'Hair Accessories', 'Waist Belt', 'Custom Design']
      },
      {
        name: 'Premium Heirloom',
        price: '₹2,00,000',
        features: ['Complete Bridal Set', 'Custom Made', 'Gold Plated', 'Presentation Box']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Ananya V',
        rating: 5,
        date: '2024-01-10',
        comment: 'The jewelry was absolutely stunning! Received so many compliments.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 6,
    name: 'Royal Ornaments',
    businessName: 'Royal Bridal Ornaments',
    businessCategory: 'Bridal Accessories',
    serviceType: 'Bridal Accessories',
    personName: 'Sneha Nair',
    designation: 'Jewelry Consultant',
    description: 'Premium bridal accessories with traditional and contemporary designs',
    longDescription: 'Royal Ornaments specializes in high-quality bridal accessories that blend traditional craftsmanship with modern aesthetics. With 10 years of experience, we help brides find the perfect pieces to complete their wedding look.',
    services: ['Temple Jewelry', 'Kundan Sets', 'Pearl Accessories', 'Custom Designs'],
    bridalStyles: [],
    groomServices: [],
    productBrands: ['Other Premium Brands'],
    logo: bridalaccessories,
    location: 'Madurai, Tamil Nadu',
    availableLocations: ['Madurai', 'Chennai', 'Coimbatore', 'Tirunelveli', 'Kanyakumari'],
    rating: 4.8,
    totalReviews: 112,
    budgetRange: '₹20,000 - ₹3,00,000',
    priceRange: '₹20,000 - ₹3,00,000',
    experience: 10,
    businessType: 'Individual Artist',
    teamSize: 2,
    ownKit: 'Yes',
    backupArtist: 'No',
    hygieneKits: 'Yes',
    patchTest: 'No',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543206',
    contactNumber: '+919876543206',
    contact: {
      phone: '+91 98765 43206',
      email: 'sneha@royalornaments.com',
      website: 'www.royalornaments.com',
      address: '456 North Street, Madurai - 625001'
    },
    socialMedia: {
      instagram: '@royalornaments',
      facebook: '/royalornaments'
    },
    portfolio: [
      { id: 1, image: bridalaccessories, title: 'Kundan Set' },
      { id: 2, image: bridalaccessories, title: 'Temple Jewelry' },
      { id: 3, image: bridalaccessories, title: 'Temple Jewelry' }
    ],
    packages: [
      {
        name: 'Traditional Set',
        price: '₹20,000',
        features: ['Necklace', 'Earrings', 'Bangles', 'Vanki']
      },
      {
        name: 'Grand Collection',
        price: '₹1,00,000',
        features: ['Complete Bridal Set', 'Hair Ornaments', 'Waist Belt', 'Anklets']
      },
      {
        name: 'Royal Collection',
        price: '₹3,00,000',
        features: ['Premium Kundan Set', 'Matching Accessories', 'Custom Design', 'Gift Box']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Meenakshi S',
        rating: 5,
        date: '2023-12-15',
        comment: 'Beautiful craftsmanship. The temple jewelry was perfect for my wedding.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Hair Styling (2 vendors)
  {
    id: 7,
    name: 'Locks & Curls',
    businessName: 'Locks & Curls Hair Studio',
    businessCategory: 'Hair Styling',
    serviceType: 'Hair Styling',
    personName: 'Aisha Kapoor',
    designation: 'Lead Hair Stylist',
    description: 'Creating beautiful bridal hairstyles for all occasions',
    longDescription: 'Locks & Curls specializes in creating stunning bridal hairstyles that complement your look and last all day. From traditional braids to modern updos, we create styles that make you feel beautiful and confident.',
    services: ['Bridal Hairstyles', 'Hair Extensions', 'Flower Decorations', 'Traditional Plaits'],
    bridalStyles: ['Traditional'],
    groomServices: ['Hairstyling'],
    productBrands: ['MAC', 'HUDA Beauty'],
    logo: hairstyling,
    location: 'Bangalore, Karnataka',
    availableLocations: ['Bangalore', 'Mysore', 'Chennai', 'Hyderabad'],
    rating: 4.9,
    totalReviews: 178,
    budgetRange: '₹10,000 - ₹50,000',
    priceRange: '₹10,000 - ₹50,000',
    experience: 7,
    businessType: 'Studio/Salon',
    teamSize: 4,
    ownKit: 'Yes',
    backupArtist: 'Yes',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543207',
    contactNumber: '+919876543207',
    contact: {
      phone: '+91 98765 43207',
      email: 'aisha@locksandcurls.com',
      website: 'www.locksandcurls.com',
      address: '789 Indiranagar, Bangalore - 560038'
    },
    socialMedia: {
      instagram: '@locksandcurls',
      facebook: '/locksandcurls'
    },
    portfolio: [
      { id: 1, image: hairstyling, title: 'Bridal Updo' },
      { id: 2, image: hairstyling, title: 'Traditional Braid' },
      { id: 3, image: hairstyling, title: 'Traditional Braid' }
    ],
    packages: [
      {
        name: 'Basic Styling',
        price: '₹10,000',
        features: ['Trial Session', 'Wedding Hair Styling', '1 Artist']
      },
      {
        name: 'Premium Package',
        price: '₹25,000',
        features: ['Trial + Wedding', 'Hair Extensions', 'Flower Decoration', '1 Artist']
      },
      {
        name: 'Luxury Package',
        price: '₹50,000',
        features: ['Multiple Events', 'Hair Extensions', 'Bridal Party (3)', '2 Artists']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Shreya K',
        rating: 5,
        date: '2024-02-01',
        comment: 'Aisha created the most beautiful braid for my wedding. It stayed perfect all day!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 8,
    name: 'Crown Glory',
    businessName: 'Crown Glory Hair Design',
    businessCategory: 'Hair Styling',
    serviceType: 'Hair Styling',
    personName: 'Fatima Khan',
    designation: 'Hair Designer',
    description: 'Specialized in traditional and contemporary wedding hairstyles',
    longDescription: 'Crown Glory brings 9 years of expertise in creating stunning wedding hairstyles. Whether you want a classic South Indian look or a modern fusion style, we create the perfect hairdo for your special day.',
    services: ['Modern Hairstyles', 'Traditional Buns', 'Hair Accessories', 'Pre-wedding Hair Care'],
    bridalStyles: ['Natural / Minimal'],
    groomServices: ['Hairstyling'],
    productBrands: ['Bobbi Brown'],
    logo: hairstyling,
    location: 'Hyderabad, Telangana',
    availableLocations: ['Hyderabad', 'Secunderabad', 'Warangal', 'Bangalore'],
    rating: 4.8,
    totalReviews: 145,
    budgetRange: '₹12,000 - ₹60,000',
    priceRange: '₹12,000 - ₹60,000',
    experience: 9,
    businessType: 'Individual Artist',
    teamSize: 2,
    ownKit: 'Yes',
    backupArtist: 'No',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543208',
    contactNumber: '+919876543208',
    contact: {
      phone: '+91 98765 43208',
      email: 'fatima@crownglory.com',
      website: 'www.crownglory.com',
      address: '123 Banjara Hills, Hyderabad - 500034'
    },
    socialMedia: {
      instagram: '@crownglory',
      facebook: '/crownglory'
    },
    portfolio: [
      { id: 1, image: hairstyling, title: 'Modern Updo' },
      { id: 2, image: hairstyling, title: 'Traditional Bun' },
      { id: 3, image: hairstyling, title: 'Traditional Bun' }
    ],
    packages: [
      {
        name: 'Essential',
        price: '₹12,000',
        features: ['Wedding Hairstyle', 'Trial', '1 Artist']
      },
      {
        name: 'Deluxe',
        price: '₹30,000',
        features: ['Wedding + Reception', 'Hair Accessories', '2 Trials', '1 Artist']
      },
      {
        name: 'Premium',
        price: '₹60,000',
        features: ['All Events', 'Bridal Party (2)', 'Extensions', '2 Artists']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Zara B',
        rating: 5,
        date: '2024-01-05',
        comment: 'Fatima created exactly the look I wanted. Highly professional!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Mehendi Art (2 vendors)
  {
    id: 9,
    name: 'Henna Expressions',
    businessName: 'Henna Expressions Studio',
    businessCategory: 'Mehendi Art',
    serviceType: 'Mehendi Art',
    personName: 'Zara Ahmed',
    designation: 'Mehendi Artist',
    description: 'Traditional and contemporary mehendi designs for weddings',
    longDescription: 'Henna Expressions creates intricate mehendi designs that range from traditional Indian patterns to modern Arabic styles. With 5 years of experience, we specialize in creating personalized designs that tell your unique story.',
    services: ['Bridal Mehendi', 'Arabic Designs', 'Rajasthani Patterns', 'Custom Designs'],
    bridalStyles: [],
    groomServices: [],
    productBrands: ['Other Premium Brands'],
    logo: mehendiart,
    location: 'Chennai, Tamil Nadu',
    availableLocations: ['Chennai', 'Coimbatore', 'Bangalore', 'Hyderabad'],
    rating: 4.7,
    totalReviews: 98,
    budgetRange: '₹5,000 - ₹30,000',
    priceRange: '₹5,000 - ₹30,000',
    experience: 5,
    businessType: 'Individual Artist',
    teamSize: 2,
    ownKit: 'Yes',
    backupArtist: 'No',
    hygieneKits: 'Yes',
    patchTest: 'No',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'No',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543209',
    contactNumber: '+919876543209',
    contact: {
      phone: '+91 98765 43209',
      email: 'zara@hennaexpressions.com',
      website: 'www.hennaexpressions.com',
      address: '456 Mylapore, Chennai - 600004'
    },
    socialMedia: {
      instagram: '@hennaexpressions',
      facebook: '/hennaexpressions'
    },
    portfolio: [
      { id: 1, image: mehendiart, title: 'Bridal Mehendi' },
      { id: 2, image: mehendiart, title: 'Arabic Design' },
      { id: 3, image: mehendiart, title: 'Arabic Design' }
    ],
    packages: [
      {
        name: 'Basic',
        price: '₹5,000',
        features: ['Both Hands', 'Simple Design', 'Natural Henna']
      },
      {
        name: 'Deluxe',
        price: '₹15,000',
        features: ['Full Hands & Feet', 'Arabic/Indian Mix', 'Color Addition', '2 Artists']
      },
      {
        name: 'Bridal Special',
        price: '₹30,000',
        features: ['Full Bridal Set', 'Custom Design', 'Groom Design', 'Family Members (2)', '3 Artists']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Divya R',
        rating: 5,
        date: '2024-01-20',
        comment: 'Zara did an amazing job on my bridal mehendi. The design was perfect!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 10,
    name: 'Bridal Henna Art',
    businessName: 'Bridal Henna Artists',
    businessCategory: 'Mehendi Art',
    serviceType: 'Mehendi Art',
    personName: 'Kabir Singh',
    designation: 'Lead Artist',
    description: 'Creating intricate mehendi designs that tell your love story',
    longDescription: 'With 8 years of experience, Bridal Henna Art specializes in creating personalized mehendi designs that incorporate elements of your love story. From traditional to contemporary, we create art that you\'ll treasure.',
    services: ['Full Hand Designs', 'Feet Mehendi', 'Groom Design', 'Guest Mehendi'],
    bridalStyles: [],
    groomServices: [],
    productBrands: ['Other Premium Brands'],
    logo: mehendiart,
    location: 'Coimbatore, Tamil Nadu',
    availableLocations: ['Coimbatore', 'Chennai', 'Ooty', 'Kodaikanal', 'Pollachi'],
    rating: 4.8,
    totalReviews: 87,
    budgetRange: '₹8,000 - ₹40,000',
    priceRange: '₹8,000 - ₹40,000',
    experience: 8,
    businessType: 'Individual Artist',
    teamSize: 3,
    ownKit: 'Yes',
    backupArtist: 'Yes',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543210',
    contactNumber: '+919876543210',
    contact: {
      phone: '+91 98765 43210',
      email: 'kabir@bridalhenna.com',
      website: 'www.bridalhenna.com',
      address: '789 RS Puram, Coimbatore - 641002'
    },
    socialMedia: {
      instagram: '@bridalhennaart',
      facebook: '/bridalhennaart'
    },
    portfolio: [
      { id: 1, image: mehendiart, title: 'Bridal Set' },
      { id: 2, image: mehendiart, title: 'Custom Design' },
      { id: 3, image: mehendiart, title: 'Custom Design' }
    ],
    packages: [
      {
        name: 'Essential',
        price: '₹8,000',
        features: ['Full Hands', 'Traditional Design', 'Natural Henna']
      },
      {
        name: 'Premium',
        price: '₹20,000',
        features: ['Full Hands & Feet', 'Custom Design', 'Color Addition', 'Groom Design']
      },
      {
        name: 'Royal',
        price: '₹40,000',
        features: ['Complete Bridal', 'Family Package (4)', 'Custom Story Design', 'Premium Henna', '3 Artists']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Lavanya K',
        rating: 5,
        date: '2023-12-10',
        comment: 'Kabir incorporated our love story into the design. It was so special!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Traditional Attire Styling (2 vendors)
  {
    id: 11,
    name: 'Traditional Elegance',
    businessName: 'Traditional Elegance Styling',
    businessCategory: 'Traditional Attire Styling',
    serviceType: 'Traditional Attire Styling',
    personName: 'Lakshmi Iyer',
    designation: 'Traditional Stylist',
    description: 'Specializing in South Indian traditional wedding looks',
    longDescription: 'Traditional Elegance brings 15 years of expertise in South Indian traditional styling. From Kanjeevaram saree draping to temple jewelry placement, we ensure you look perfect in every traditional aspect.',
    services: ['Traditional Attire Draping', 'Temple Jewelry', 'Classic Makeup', 'Traditional Hairstyles'],
    bridalStyles: ['Traditional'],
    groomServices: ['Costume Draping'],
    productBrands: ['Other Premium Brands'],
    logo: traditionalattire,
    location: 'Chennai, Tamil Nadu',
    availableLocations: ['Chennai', 'Coimbatore', 'Bangalore', 'Hyderabad', 'Madurai'],
    rating: 4.9,
    totalReviews: 234,
    budgetRange: '₹35,000 - ₹2,50,000',
    priceRange: '₹35,000 - ₹2,50,000',
    experience: 15,
    businessType: 'Proprietorship',
    teamSize: 4,
    ownKit: 'Yes',
    backupArtist: 'Yes',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543211',
    contactNumber: '+919876543211',
    contact: {
      phone: '+91 98765 43211',
      email: 'lakshmi@traditionalelegance.com',
      website: 'www.traditionalelegance.com',
      address: '123 Alwarpet, Chennai - 600018'
    },
    socialMedia: {
      instagram: '@traditionalelegance',
      facebook: '/traditionalelegance'
    },
    portfolio: [
      { id: 1, image: traditionalattire, title: 'Iyer Bride' },
      { id: 2, image: traditionalattire, title: 'Kanjeevaram Draping' },
      { id: 3, image: traditionalattire, title: 'Kanjeevaram Draping' }
    ],
    packages: [
      {
        name: 'Traditional Bride',
        price: '₹35,000',
        features: ['Saree Draping', 'Jewelry Styling', 'Traditional Makeup', 'Hairstyle']
      },
      {
        name: 'Classic Package',
        price: '₹1,20,000',
        features: ['Complete Bridal Styling', 'Trial Session', 'Family Styling (2)', 'Traditional Accessories']
      },
      {
        name: 'Heritage Package',
        price: '₹2,50,000',
        features: ['Full Wedding Week', 'All Traditional Events', 'Family Package', 'Premium Stylists', 'Documentation']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Shruti V',
        rating: 5,
        date: '2024-02-10',
        comment: 'Lakshmi made sure every detail of my traditional look was perfect. Felt like a true South Indian bride!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 12,
    name: 'Heritage Looks',
    businessName: 'Heritage Wedding Styling',
    businessCategory: 'Traditional Attire Styling',
    serviceType: 'Traditional Attire Styling',
    personName: 'Radha Krishnan',
    designation: 'Traditional Consultant',
    description: 'Preserving and presenting traditional wedding styles with modern comfort',
    longDescription: 'Heritage Looks specializes in bringing traditional wedding styles to life while ensuring modern comfort. With 12 years of experience, we help brides and grooms look their best while honoring their cultural heritage.',
    services: ['Regional Traditional Styles', 'Antique Jewelry', 'Cultural Attire', 'Traditional Accessories'],
    bridalStyles: ['Traditional'],
    groomServices: ['Costume Draping'],
    productBrands: ['Other Premium Brands'],
    logo: traditionalattire,
    location: 'Kanyakumari, Tamil Nadu',
    availableLocations: ['Kanyakumari', 'Nagercoil', 'Tirunelveli', 'Thoothukudi', 'Madurai'],
    rating: 4.8,
    totalReviews: 167,
    budgetRange: '₹40,000 - ₹3,00,000',
    priceRange: '₹40,000 - ₹3,00,000',
    experience: 12,
    businessType: 'Individual Artist',
    teamSize: 3,
    ownKit: 'Yes',
    backupArtist: 'Yes',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543212',
    contactNumber: '+919876543212',
    contact: {
      phone: '+91 98765 43212',
      email: 'radha@heritagelooks.com',
      website: 'www.heritagelooks.com',
      address: '456 Beach Road, Kanyakumari - 629702'
    },
    socialMedia: {
      instagram: '@heritagelooks',
      facebook: '/heritagelooks'
    },
    portfolio: [
      { id: 1, image: traditionalattire, title: 'Nair Bride' },
      { id: 2, image: traditionalattire, title: 'Traditional Groom' },
      { id: 3, image: traditionalattire, title: 'Traditional Groom' }
    ],
    packages: [
      {
        name: 'Regional Bride',
        price: '₹40,000',
        features: ['Traditional Styling', 'Jewelry Consultation', 'Hair & Makeup']
      },
      {
        name: 'Couple Package',
        price: '₹1,50,000',
        features: ['Bride & Groom Styling', 'Trial Session', 'Family Coordination', 'Premium Accessories']
      },
      {
        name: 'Royal Package',
        price: '₹3,00,000',
        features: ['Complete Traditional Look', 'Antique Jewelry Rental', 'Family Package', 'Documentation', 'Premium Stylists']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Gayathri N',
        rating: 5,
        date: '2024-01-15',
        comment: 'Radha helped me achieve the perfect traditional look. Highly recommended!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Groom Makeup (2 vendors)
  {
    id: 13,
    name: 'Gentleman Grooming',
    businessName: 'Gentleman Grooming Studio',
    businessCategory: 'Groom Makeup',
    serviceType: 'Groom Makeup',
    personName: 'Rahul Verma',
    designation: 'Groom Stylist',
    description: 'Professional grooming services for modern grooms',
    longDescription: 'Gentleman Grooming specializes in making grooms look their best on their wedding day. With 6 years of experience, we provide professional makeup and grooming services that look natural and photograph beautifully.',
    services: ['Groom Makeup', 'Beard Styling', 'Hair Grooming', 'Traditional Attire Styling'],
    bridalStyles: [],
    groomServices: ['Makeup', 'Beard / Grooming'],
    productBrands: ['MAC', 'Other Premium Brands'],
    logo: groommakeup,
    location: 'Bangalore, Karnataka',
    availableLocations: ['Bangalore', 'Mysore', 'Chennai', 'Hyderabad'],
    rating: 4.7,
    totalReviews: 89,
    budgetRange: '₹15,000 - ₹80,000',
    priceRange: '₹15,000 - ₹80,000',
    experience: 6,
    businessType: 'Studio/Salon',
    teamSize: 3,
    ownKit: 'Yes',
    backupArtist: 'Yes',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543213',
    contactNumber: '+919876543213',
    contact: {
      phone: '+91 98765 43213',
      email: 'rahul@gentlemangrooming.com',
      website: 'www.gentlemangrooming.com',
      address: '789 Koramangala, Bangalore - 560095'
    },
    socialMedia: {
      instagram: '@gentlemangrooming',
      facebook: '/gentlemangrooming'
    },
    portfolio: [
      { id: 1, image: groommakeup, title: 'Groom Makeup' },
      { id: 2, image: groommakeup, title: 'Beard Styling' },
      { id: 3, image: groommakeup, title: 'Beard Styling' }
    ],
    packages: [
      {
        name: 'Essential Groom',
        price: '₹15,000',
        features: ['Makeup', 'Beard Grooming', 'Trial']
      },
      {
        name: 'Premium Groom',
        price: '₹40,000',
        features: ['Makeup', 'Beard Styling', 'Hair Styling', 'Trial', 'Touch-up Kit']
      },
      {
        name: 'Groom Party',
        price: '₹80,000',
        features: ['Groom + 3 Members', 'Complete Grooming', 'Travel Included', 'Premium Products']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Arjun M',
        rating: 5,
        date: '2024-01-20',
        comment: 'Rahul made me look great without looking like I was wearing makeup. Perfect!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 14,
    name: 'Dapper Grooms',
    businessName: 'Dapper Groom Styling',
    businessCategory: 'Groom Makeup',
    serviceType: 'Groom Makeup',
    personName: 'Arun Kumar',
    designation: 'Style Consultant',
    description: 'Transforming grooms into stylish gentlemen for their wedding day',
    longDescription: 'Dapper Grooms specializes in creating polished, camera-ready looks for grooms. With 8 years of experience, we understand what works for different face shapes, skin tones, and wedding themes.',
    services: ['Complete Groom Package', 'Suit Styling', 'Traditional Look', 'Accessory Consultation'],
    bridalStyles: [],
    groomServices: ['Makeup', 'Beard / Grooming'],
    productBrands: ['Bobbi Brown', 'Kryolan'],
    logo: groommakeup,
    location: 'Hyderabad, Telangana',
    availableLocations: ['Hyderabad', 'Secunderabad', 'Warangal', 'Bangalore'],
    rating: 4.6,
    totalReviews: 76,
    budgetRange: '₹20,000 - ₹1,00,000',
    priceRange: '₹20,000 - ₹1,00,000',
    experience: 8,
    businessType: 'Individual Artist',
    teamSize: 2,
    ownKit: 'Yes',
    backupArtist: 'No',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543214',
    contactNumber: '+919876543214',
    contact: {
      phone: '+91 98765 43214',
      email: 'arun@dappergrooms.com',
      website: 'www.dappergrooms.com',
      address: '123 Jubilee Hills, Hyderabad - 500033'
    },
    socialMedia: {
      instagram: '@dappergrooms',
      facebook: '/dappergrooms'
    },
    portfolio: [
      { id: 1, image: groommakeup, title: 'Groom Look' },
      { id: 2, image: groommakeup, title: 'Traditional Groom' },
      { id: 3, image: groommakeup, title: 'Traditional Groom' }
    ],
    packages: [
      {
        name: 'Signature Groom',
        price: '₹20,000',
        features: ['Makeup', 'Beard Styling', 'Hair', 'Trial']
      },
      {
        name: 'Royal Groom',
        price: '₹50,000',
        features: ['Complete Grooming', 'Suit Styling', 'Accessory Consult', 'Touch-up Kit']
      },
      {
        name: 'Wedding Party',
        price: '₹1,00,000',
        features: ['Groom + 4 Members', 'Complete Package', 'Travel', 'Premium Products']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Karthik R',
        rating: 5,
        date: '2023-12-05',
        comment: 'Arun helped me look my best. The makeup was so natural!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Groom Hair Styling (2 vendors)
  {
    id: 15,
    name: 'Dapper Hair Studio',
    businessName: 'Dapper Groom Hair Styling',
    businessCategory: 'Groom Hair Styling',
    serviceType: 'Groom Hair Styling',
    personName: 'Arjun Singh',
    designation: 'Hair Specialist',
    description: 'Expert groom hair styling and grooming services',
    longDescription: 'Dapper Hair Studio specializes in creating the perfect hairstyle for grooms. Whether you want a classic look or something modern, we ensure your hair looks perfect throughout your wedding day.',
    services: ['Modern Hairstyles', 'Traditional Looks', 'Hair Color', 'Beard Shaping'],
    bridalStyles: [],
    groomServices: ['Hairstyling', 'Beard / Grooming'],
    productBrands: ['HUDA Beauty', 'Other Premium Brands'],
    logo: groomhairstyling,
    location: 'Hyderabad, Telangana',
    availableLocations: ['Hyderabad', 'Secunderabad', 'Warangal', 'Bangalore'],
    rating: 4.8,
    totalReviews: 67,
    budgetRange: '₹8,000 - ₹40,000',
    priceRange: '₹8,000 - ₹40,000',
    experience: 5,
    businessType: 'Individual Artist',
    teamSize: 2,
    ownKit: 'Yes',
    backupArtist: 'No',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543215',
    contactNumber: '+919876543215',
    contact: {
      phone: '+91 98765 43215',
      email: 'arjun@dapperhairstudio.com',
      website: 'www.dapperhairstudio.com',
      address: '456 Gachibowli, Hyderabad - 500032'
    },
    socialMedia: {
      instagram: '@dapperhairstudio',
      facebook: '/dapperhairstudio'
    },
    portfolio: [
      { id: 1, image: groomhairstyling, title: 'Modern Groom' },
      { id: 2, image: groomhairstyling, title: 'Traditional Look' },
      { id: 3, image: groomhairstyling, title: 'Traditional Look' }
    ],
    packages: [
      {
        name: 'Basic',
        price: '₹8,000',
        features: ['Hair Styling', 'Beard Grooming', 'Trial']
      },
      {
        name: 'Premium',
        price: '₹20,000',
        features: ['Hair Styling', 'Beard Shaping', 'Hair Color', 'Touch-up']
      },
      {
        name: 'Wedding Party',
        price: '₹40,000',
        features: ['Groom + 3 Members', 'Complete Grooming', 'Travel']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Siddharth P',
        rating: 5,
        date: '2024-01-10',
        comment: 'Arjun created the perfect hairstyle for my wedding. Highly skilled!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 16,
    name: 'Style Cuts',
    businessName: 'Style Cuts Grooming',
    businessCategory: 'Groom Hair Styling',
    serviceType: 'Groom Hair Styling',
    personName: 'Vikram Seth',
    designation: 'Creative Stylist',
    description: 'Modern and traditional hairstyles for grooms and wedding parties',
    longDescription: 'Style Cuts brings 7 years of expertise in creating stunning hairstyles for grooms. We specialize in looks that photograph beautifully and last through all your wedding events.',
    services: ['Contemporary Cuts', 'Classic Styles', 'Beard Grooming', 'Hair Treatments'],
    bridalStyles: [],
    groomServices: ['Hairstyling', 'Beard / Grooming'],
    productBrands: ['MAC', 'Other Premium Brands'],
    logo: groomhairstyling,
    location: 'Chennai, Tamil Nadu',
    availableLocations: ['Chennai', 'Coimbatore', 'Bangalore', 'Hyderabad'],
    rating: 4.7,
    totalReviews: 54,
    budgetRange: '₹7,000 - ₹35,000',
    priceRange: '₹7,000 - ₹35,000',
    experience: 7,
    businessType: 'Studio/Salon',
    teamSize: 4,
    ownKit: 'Yes',
    backupArtist: 'Yes',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543216',
    contactNumber: '+919876543216',
    contact: {
      phone: '+91 98765 43216',
      email: 'vikram@stylecuts.com',
      website: 'www.stylecuts.com',
      address: '789 Anna Nagar, Chennai - 600040'
    },
    socialMedia: {
      instagram: '@stylecuts',
      facebook: '/stylecuts'
    },
    portfolio: [
      { id: 1, image: groomhairstyling, title: 'Contemporary Style' },
      { id: 2, image: groomhairstyling, title: 'Classic Groom' },
      { id: 3, image: groomhairstyling, title: 'Classic Groom' }
    ],
    packages: [
      {
        name: 'Essential',
        price: '₹7,000',
        features: ['Haircut', 'Styling', 'Beard Grooming']
      },
      {
        name: 'Premium',
        price: '₹18,000',
        features: ['Hair Styling', 'Beard Design', 'Trial', 'Touch-up']
      },
      {
        name: 'Groom Party',
        price: '₹35,000',
        features: ['Groom + 3', 'Complete Grooming', 'Travel', 'Premium Products']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Rohan M',
        rating: 5,
        date: '2023-11-20',
        comment: 'Vikram gave me a fantastic haircut and style for my wedding. Great service!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Groom Accessories (2 vendors)
  {
    id: 17,
    name: 'Royal Groom Accessories',
    businessName: 'Royal Accessories for Grooms',
    businessCategory: 'Groom Accessories',
    serviceType: 'Groom Accessories',
    personName: 'Vikram Patel',
    designation: 'Accessory Consultant',
    description: 'Premium groom accessories and finishing touches for weddings',
    longDescription: 'Royal Groom Accessories specializes in providing high-quality accessories that complete the groom\'s look. With 9 years of experience, we help grooms find the perfect finishing touches for their wedding day.',
    services: ['Turban & Safa', 'Brooches', 'Cufflinks', 'Traditional Accessories'],
    bridalStyles: [],
    groomServices: [],
    productBrands: ['Other Premium Brands'],
    logo: accessoriesfinishing,
    location: 'Mumbai, Maharashtra',
    availableLocations: ['Mumbai', 'Pune', 'Nashik', 'Nagpur', 'Aurangabad'],
    rating: 4.6,
    totalReviews: 78,
    budgetRange: '₹10,000 - ₹75,000',
    priceRange: '₹10,000 - ₹75,000',
    experience: 9,
    businessType: 'Proprietorship',
    teamSize: 3,
    ownKit: 'Yes',
    backupArtist: 'No',
    hygieneKits: 'Yes',
    patchTest: 'No',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543217',
    contactNumber: '+919876543217',
    contact: {
      phone: '+91 98765 43217',
      email: 'vikram@royalgroom.com',
      website: 'www.royalgroom.com',
      address: '123 Bandra West, Mumbai - 400050'
    },
    socialMedia: {
      instagram: '@royalgroomacc',
      facebook: '/royalgroom'
    },
    portfolio: [
      { id: 1, image: accessoriesfinishing, title: 'Turban Collection' },
      { id: 2, image: accessoriesfinishing, title: 'Brooches' },
      { id: 3, image: accessoriesfinishing, title: 'Brooches' }
    ],
    packages: [
      {
        name: 'Essential Set',
        price: '₹10,000',
        features: ['Brooch', 'Cufflinks', 'Pocket Square']
      },
      {
        name: 'Deluxe Set',
        price: '₹35,000',
        features: ['Turban/Safa', 'Full Brooch Set', 'Cufflinks', 'Shoe Accessories']
      },
      {
        name: 'Royal Collection',
        price: '₹75,000',
        features: ['Complete Accessory Set', 'Custom Design', 'Premium Materials', 'Gift Box']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Neel M',
        rating: 5,
        date: '2024-01-05',
        comment: 'The turban was absolutely stunning. Quality was excellent!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 18,
    name: 'Grooming Essentials',
    businessName: 'Essential Groom Accessories',
    businessCategory: 'Groom Accessories',
    serviceType: 'Groom Accessories',
    personName: 'Rajesh Khanna',
    designation: 'Style Advisor',
    description: 'Complete accessory solutions for modern grooms',
    longDescription: 'Grooming Essentials offers a comprehensive range of accessories for modern grooms. With 11 years of experience, we help you find the perfect pieces to complement your wedding attire.',
    services: ['Wedding Sets', 'Custom Accessories', 'Matching Sets', 'Rental Options'],
    bridalStyles: [],
    groomServices: [],
    productBrands: ['Other Premium Brands'],
    logo: accessoriesfinishing,
    location: 'Delhi, Delhi',
    availableLocations: ['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad'],
    rating: 4.7,
    totalReviews: 92,
    budgetRange: '₹12,000 - ₹80,000',
    priceRange: '₹12,000 - ₹80,000',
    experience: 11,
    businessType: 'Partnership',
    teamSize: 4,
    ownKit: 'Yes',
    backupArtist: 'Yes',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543218',
    contactNumber: '+919876543218',
    contact: {
      phone: '+91 98765 43218',
      email: 'rajesh@groomingessentials.com',
      website: 'www.groomingessentials.com',
      address: '456 Connaught Place, Delhi - 110001'
    },
    socialMedia: {
      instagram: '@groomingessentials',
      facebook: '/groomingessentials'
    },
    portfolio: [
      { id: 1, image: accessoriesfinishing, title: 'Wedding Set' },
      { id: 2, image: accessoriesfinishing, title: 'Custom Accessories' },
      { id: 3, image: accessoriesfinishing, title: 'Custom Accessories' }
    ],
    packages: [
      {
        name: 'Starter Set',
        price: '₹12,000',
        features: ['Brooch', 'Cufflinks', 'Tie Pin']
      },
      {
        name: 'Complete Set',
        price: '₹35,000',
        features: ['Full Accessory Set', 'Turban/Safa', 'Matching Pieces', 'Gift Box']
      },
      {
        name: 'Premium Collection',
        price: '₹80,000',
        features: ['Designer Set', 'Custom Made', 'Premium Materials', 'Bridal Accessory Match']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Arjun S',
        rating: 5,
        date: '2023-12-15',
        comment: 'Great selection and quality. Found everything I needed for my wedding.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Groom Attire Styling (2 vendors)
  {
    id: 19,
    name: 'Elite Groom Styling',
    businessName: 'Elite Groom Attire Styling',
    businessCategory: 'Groom Attire Styling',
    serviceType: 'Groom Attire Styling',
    personName: 'Karan Malhotra',
    designation: 'Style Consultant',
    description: 'Complete groom attire styling and coordination for weddings',
    longDescription: 'Elite Groom Styling specializes in creating the perfect look for modern grooms. With 10 years of experience, we help you choose and style the perfect attire for all your wedding events.',
    services: ['Sherwani Styling', 'Suit Selection', 'Traditional Attire', 'Color Coordination'],
    bridalStyles: [],
    groomServices: ['Costume Draping'],
    productBrands: ['Other Premium Brands'],
    logo: commercial,
    location: 'Delhi, Delhi',
    availableLocations: ['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad'],
    rating: 4.7,
    totalReviews: 112,
    budgetRange: '₹20,000 - ₹1,50,000',
    priceRange: '₹20,000 - ₹1,50,000',
    experience: 10,
    businessType: 'Private Limited',
    teamSize: 5,
    ownKit: 'Yes',
    backupArtist: 'Yes',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543219',
    contactNumber: '+919876543219',
    contact: {
      phone: '+91 98765 43219',
      email: 'karan@elitegroom.com',
      website: 'www.elitegroom.com',
      address: '789 South Extension, Delhi - 110049'
    },
    socialMedia: {
      instagram: '@elitegroom',
      facebook: '/elitegroom'
    },
    portfolio: [
      { id: 1, image: commercial, title: 'Sherwani Styling' },
      { id: 2, image: commercial, title: 'Suit Selection' },
      { id: 3, image: commercial, title: 'Suit Selection' }
    ],
    packages: [
      {
        name: 'Consultation',
        price: '₹20,000',
        features: ['Style Consultation', 'Attire Selection', 'Color Advice']
      },
      {
        name: 'Complete Styling',
        price: '₹70,000',
        features: ['All Events Styling', 'Accessory Coordination', 'Draping Service', 'Trial']
      },
      {
        name: 'Wedding Party',
        price: '₹1,50,000',
        features: ['Groom + 4 Members', 'Complete Styling', 'Custom Recommendations', 'Premium Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Vikram S',
        rating: 5,
        date: '2024-01-25',
        comment: 'Karan helped me pick the perfect sherwani. Great advice and service!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 20,
    name: 'Royal Groom Wear',
    businessName: 'Royal Groom Styling Studio',
    businessCategory: 'Groom Attire Styling',
    serviceType: 'Groom Attire Styling',
    personName: 'Amit Shah',
    designation: 'Fashion Director',
    description: 'Luxury grooming and styling for discerning grooms',
    longDescription: 'Royal Groom Wear brings 15 years of luxury styling experience to discerning grooms. We specialize in creating sophisticated looks that make you feel like royalty on your wedding day.',
    services: ['Bespoke Sherwanis', 'Designer Suits', 'Indo-Western Fusion', 'Complete Look'],
    bridalStyles: [],
    groomServices: ['Costume Draping'],
    productBrands: ['Other Premium Brands'],
    logo: commercial,
    location: 'Mumbai, Maharashtra',
    availableLocations: ['Mumbai', 'Pune', 'Nashik', 'Nagpur', 'Aurangabad'],
    rating: 4.9,
    totalReviews: 145,
    budgetRange: '₹30,000 - ₹2,50,000',
    priceRange: '₹30,000 - ₹2,50,000',
    experience: 15,
    businessType: 'Partnership',
    teamSize: 6,
    ownKit: 'Yes',
    backupArtist: 'Yes',
    hygieneKits: 'Yes',
    patchTest: 'Yes',
    travelCharges: 'Yes',
    advanceRequired: 'Yes',
    hasGST: 'Yes',
    hasPAN: 'Yes',
    whatsappNumber: '+919876543220',
    contactNumber: '+919876543220',
    contact: {
      phone: '+91 98765 43220',
      email: 'amit@royalgroomwear.com',
      website: 'www.royalgroomwear.com',
      address: '123 Colaba, Mumbai - 400005'
    },
    socialMedia: {
      instagram: '@royalgroomwear',
      facebook: '/royalgroomwear'
    },
    portfolio: [
      { id: 1, image: commercial, title: 'Bespoke Sherwani' },
      { id: 2, image: commercial, title: 'Designer Suit' },
      { id: 3, image: commercial, title: 'Designer Suit' }
    ],
    packages: [
      {
        name: 'Classic',
        price: '₹30,000',
        features: ['Style Consultation', 'Attire Selection', 'Accessory Advice']
      },
      {
        name: 'Premium',
        price: '₹1,20,000',
        features: ['All Events Styling', 'Custom Fittings', 'Accessory Set', 'Personal Shopper']
      },
      {
        name: 'Royal',
        price: '₹2,50,000',
        features: ['Bespoke Sherwani', 'Complete Wedding Package', 'Family Coordination', 'Concierge Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Rahul M',
        rating: 5,
        date: '2024-02-01',
        comment: 'Amit helped me create the perfect look. The sherwani was absolutely stunning!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  }
];