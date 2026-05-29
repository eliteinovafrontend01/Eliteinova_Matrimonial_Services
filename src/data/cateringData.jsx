// Import assets
import traditional from '../assets/traditional.jpg';
import specialcatering from '../assets/specialcatering.jpg';
import snackscatering from '../assets/snackscatering.jpg';
import buffet from '../assets/buffet.jpg';
import livecounter from '../assets/livecounter.jpg';
import nonveg from '../assets/nonveg.jpg';
import veg from '../assets/veg.jpg';
import multicuisine from '../assets/multicuisine.jpg';
import themebased from '../assets/themebased.jpg';
import eventbased from '../assets/eventbased.jpg';

export const cateringVendors = [
  // Traditional Catering Vendors
  {
    id: 1,
    name: 'Traditional Tastes',
    businessName: 'Traditional Tastes Catering Service',
    businessCategory: 'Traditional Catering',
    eventType: 'Traditional Catering',
    personName: 'Rajeshwari Iyer',
    designation: 'Head Chef',
    description: 'Authentic traditional Indian cuisine with family recipes passed down for generations',
    longDescription: 'Traditional Tastes has been serving authentic Indian cuisine for over 15 years. Our family recipes have been passed down through generations, ensuring that every dish captures the true essence of traditional cooking. From South Indian feasts to North Indian delicacies, we bring the taste of tradition to your special events.',
    services: ['South Indian Meals', 'North Indian Thali', 'Wedding Banquets', 'Traditional Sweets'],
    logo: traditional,
    location: 'Chennai, Tamil Nadu',
    rating: 4.8,
    totalReviews: 156,
    budgetRange: '₹500 - ₹1,500 per plate',
    experience: 15,
    businessType: 'Proprietorship',
    cuisines: ['South Indian', 'North Indian'],
    specialMenus: ['Wedding Feast', 'Reception'],
    serviceTypes: ['Banana Leaf Service', 'Table Service'],
    minCapacity: 100,
    maxCapacity: 1000,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'Central Kitchen',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local', 'Within District'],
    availableLocations: ['Chennai', 'Coimbatore', 'Bangalore', 'Hyderabad'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43210',
      email: 'info@traditionaltastes.com',
      website: 'www.traditionaltastes.com',
      address: '123 Traditional Street, Chennai - 600001'
    },
    whatsappNumber: '+919876543210',
    contactNumber: '+919876543210',
    socialMedia: {
      instagram: '@traditionaltastes',
      facebook: '/traditionaltastes'
    },
    portfolio: [
      { id: 1, image: traditional, title: 'South Indian Wedding Feast' },
      { id: 2, image: traditional, title: 'North Indian Thali' },
      { id: 3, image: traditional, title: 'Traditional Sweets Spread' },
    ],
    packages: [
      {
        name: 'Silver Package',
        price: '₹500 per plate',
        features: ['South Indian Meals', '4 Veg Items', '2 Sweets', 'Papad & Pickle', 'Basic Service Staff']
      },
      {
        name: 'Gold Package',
        price: '₹1,000 per plate',
        features: ['South + North Indian', '6 Veg Items', '3 Sweets', 'Welcome Drink', 'Unlimited Serving', 'Uniformed Staff']
      },
      {
        name: 'Platinum Package',
        price: '₹1,500 per plate',
        features: ['Premium Menu', '8 Veg Items', '4 Sweets', 'Welcome Drinks', 'Live Counter', 'Full Service Team', 'Decoration Included']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Priya S',
        rating: 5,
        date: '2024-01-15',
        comment: 'The food was absolutely delicious! Just like home-cooked traditional meals.',
        avatar: 'https://via.placeholder.com/50'
      },
      {
        id: 2,
        name: 'Rahul M',
        rating: 4.5,
        date: '2023-12-10',
        comment: 'Excellent service and authentic taste. Highly recommended for weddings!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 2,
    name: 'Heritage Kitchen',
    businessName: 'Heritage Kitchen Caterers',
    businessCategory: 'Traditional Catering',
    eventType: 'Traditional Catering',
    personName: 'Vikram Singh',
    designation: 'Catering Manager',
    description: 'Preserving culinary heritage with authentic regional cuisines',
    longDescription: 'Heritage Kitchen brings you the rich culinary traditions of India. With 12 years of experience, we specialize in regional cuisines from across the country, prepared with authentic techniques and traditional recipes.',
    services: ['Royal Rajasthani Food', 'Hyderabadi Biryani', 'Kerala Sadya', 'Bengali Cuisine'],
    logo: traditional,
    location: 'Coimbatore, Tamil Nadu',
    rating: 4.9,
    totalReviews: 203,
    budgetRange: '₹600 - ₹2,000 per plate',
    experience: 12,
    businessType: 'Partnership',
    cuisines: ['North Indian', 'South Indian'],
    specialMenus: ['Wedding Feast', 'Sangeet / Mehendi'],
    serviceTypes: ['Buffet', 'Banana Leaf Service'],
    minCapacity: 150,
    maxCapacity: 1200,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'On-site',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Within District', 'Outstation'],
    availableLocations: ['Coimbatore', 'Chennai', 'Bangalore', 'Mysore', 'Ooty', 'Kodaikanal'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43211',
      email: 'contact@heritagekitchen.com',
      website: 'www.heritagekitchen.com',
      address: '456 Heritage Avenue, Coimbatore - 641001'
    },
    whatsappNumber: '+919876543211',
    contactNumber: '+919876543211',
    socialMedia: {
      instagram: '@heritagekitchen',
      facebook: '/heritagekitchen'
    },
    portfolio: [
      { id: 1, image: traditional, title: 'Rajasthani Thali' },
      { id: 2, image: traditional, title: 'Hyderabadi Biryani' },
      { id: 3, image: traditional, title: 'Kerala Sadya' }
    ],
    packages: [
      {
        name: 'Regional Special',
        price: '₹600 per plate',
        features: ['Choice of 1 Regional Cuisine', '4 Main Items', '2 Desserts', 'Basic Setup']
      },
      {
        name: 'Royal Feast',
        price: '₹1,200 per plate',
        features: ['2 Regional Cuisines', '6 Main Items', '3 Desserts', 'Welcome Drink', 'Live Station']
      },
      {
        name: 'Maharaja Package',
        price: '₹2,000 per plate',
        features: ['Multi-Regional Menu', '8 Main Items', '4 Desserts', 'Multiple Live Counters', 'Royal Decor', 'Full Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anand K',
        rating: 5,
        date: '2024-02-01',
        comment: 'The Rajasthani thali was incredible! Authentic taste and great presentation.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Vegetarian Catering Vendors
  {
    id: 3,
    name: 'Pure Veg Delights',
    businessName: 'Pure Veg Delights Catering',
    businessCategory: 'Vegetarian Catering',
    eventType: 'Vegetarian Catering',
    personName: 'Priya Sharma',
    designation: 'Nutrition Specialist',
    description: '100% vegetarian catering with emphasis on organic and healthy ingredients',
    longDescription: 'Pure Veg Delights specializes in healthy, organic vegetarian cuisine. With 8 years of experience, we offer a wide range of vegetarian dishes prepared with fresh, organic ingredients and traditional recipes.',
    services: ['Organic Vegetable Dishes', 'Jain Food Options', 'Healthy Salads', 'Fresh Juices'],
    logo: veg,
    location: 'Bangalore, Karnataka',
    rating: 4.7,
    totalReviews: 89,
    budgetRange: '₹400 - ₹1,200 per plate',
    experience: 8,
    businessType: 'Individual',
    cuisines: ['South Indian', 'North Indian'],
    specialMenus: ['Wedding Feast', 'Reception', 'Engagement'],
    serviceTypes: ['Buffet', 'Table Service'],
    minCapacity: 50,
    maxCapacity: 800,
    servingStaff: 'yes',
    uniformedStaff: 'no',
    fssaiCompliance: 'yes',
    preparationLocation: 'Central Kitchen',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local', 'Within District'],
    availableLocations: ['Bangalore', 'Mysore', 'Chennai', 'Hyderabad'],
    transportCharges: 'no',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43212',
      email: 'hello@purevegdelights.com',
      website: 'www.purevegdelights.com',
      address: '789 Organic Street, Bangalore - 560001'
    },
    whatsappNumber: '+919876543212',
    contactNumber: '+919876543212',
    socialMedia: {
      instagram: '@purevegdelights',
      facebook: '/purevegdelights'
    },
    portfolio: [
      { id: 1, image: veg, title: 'Organic Veg Thali' },
      { id: 2, image: veg, title: 'Jain Special Menu' },
      { id: 3, image: veg, title: 'Fresh Salad Bar' }
    ],
    packages: [
      {
        name: 'Basic Veg',
        price: '₹400 per plate',
        features: ['4 Veg Items', '2 Desserts', 'Rice & Roti', 'Pickle & Papad']
      },
      {
        name: 'Premium Veg',
        price: '₹800 per plate',
        features: ['6 Veg Items', '3 Desserts', 'Welcome Drink', 'Live Pasta Counter', 'Salad Bar']
      },
      {
        name: 'Organic Special',
        price: '₹1,200 per plate',
        features: ['8 Organic Dishes', '4 Desserts', 'Fresh Juice Bar', 'Live Counter', 'Jain Options Available']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Sunil R',
        rating: 5,
        date: '2024-01-20',
        comment: 'Perfect for our Jain wedding! They understood all our requirements.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 4,
    name: 'Green Leaf Caterers',
    businessName: 'Green Leaf Vegetarian Catering',
    businessCategory: 'Vegetarian Catering',
    eventType: 'Vegetarian Catering',
    personName: 'Arun Mehta',
    designation: 'Executive Chef',
    description: 'Innovative vegetarian cuisine with global flavors',
    longDescription: 'Green Leaf Caterers brings innovation to vegetarian cuisine. With 6 years of experience, we offer creative vegetarian dishes inspired by global flavors, making vegetarian food exciting and delicious.',
    services: ['Continental Vegetarian', 'Italian Pasta', 'Mexican Veg', 'Asian Fusion'],
    logo: veg,
    location: 'Hyderabad, Telangana',
    rating: 4.6,
    totalReviews: 67,
    budgetRange: '₹450 - ₹1,500 per plate',
    experience: 6,
    businessType: 'Private Limited',
    cuisines: ['Continental', 'Chinese'],
    specialMenus: ['Buffet', 'Live Counters'],
    serviceTypes: ['Buffet'],
    minCapacity: 80,
    maxCapacity: 600,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'Central Kitchen',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Within District'],
    availableLocations: ['Hyderabad', 'Secunderabad', 'Warangal'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43213',
      email: 'info@greenleaf.com',
      website: 'www.greenleaf.com',
      address: '321 Green Road, Hyderabad - 500001'
    },
    whatsappNumber: '+919876543213',
    contactNumber: '+919876543213',
    socialMedia: {
      instagram: '@greenleafcaterers',
      facebook: '/greenleafcaterers'
    },
    portfolio: [
      { id: 1, image: veg, title: 'Italian Pasta Station' },
      { id: 2, image: veg, title: 'Mexican Fiesta' },
      { id: 3, image: veg, title: 'Asian Wok' }
    ],
    packages: [
      {
        name: 'Fusion Feast',
        price: '₹450 per plate',
        features: ['Choice of 1 Cuisine', '3 Main Items', '1 Dessert', 'Basic Setup']
      },
      {
        name: 'Global Veg',
        price: '₹900 per plate',
        features: ['2 International Cuisines', '5 Main Items', '2 Desserts', 'Live Counter']
      },
      {
        name: 'World Tour',
        price: '₹1,500 per plate',
        features: ['3 International Cuisines', '7 Main Items', '3 Desserts', 'Multiple Live Counters', 'Full Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Kavita M',
        rating: 4.5,
        date: '2023-12-05',
        comment: 'The Mexican spread was amazing! Great fusion options.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Non-Vegetarian Catering Vendors
  {
    id: 5,
    name: 'Royal Non-Veg Caterers',
    businessName: 'Royal Non-Veg Catering Services',
    businessCategory: 'Non-Vegetarian Catering',
    eventType: 'Non-Vegetarian Catering',
    personName: 'Rahul Kapoor',
    designation: 'Master Chef',
    description: 'Specializing in premium non-vegetarian dishes with expert preparation',
    longDescription: 'Royal Non-Veg Caterers is renowned for exceptional non-vegetarian cuisine. With 18 years of experience, we specialize in premium meat and seafood dishes prepared with expert techniques and authentic spices.',
    services: ['Mutton Biryani', 'Chicken Specialties', 'Seafood Spread', 'BBQ Grill'],
    logo: nonveg,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 178,
    budgetRange: '₹700 - ₹2,500 per plate',
    experience: 18,
    businessType: 'Partnership',
    cuisines: ['South Indian', 'North Indian', 'Arabic'],
    specialMenus: ['Wedding Feast', 'Reception', 'Buffet'],
    serviceTypes: ['Buffet', 'Table Service'],
    minCapacity: 200,
    maxCapacity: 1500,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'Central Kitchen',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local', 'Within District', 'Outstation'],
    availableLocations: ['Chennai', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43214',
      email: 'royal@royalnonveg.com',
      website: 'www.royalnonveg.com',
      address: '456 Royal Street, Chennai - 600001'
    },
    whatsappNumber: '+919876543214',
    contactNumber: '+919876543214',
    socialMedia: {
      instagram: '@royalnonveg',
      facebook: '/royalnonveg'
    },
    portfolio: [
      { id: 1, image: nonveg, title: 'Mutton Biryani' },
      { id: 2, image: nonveg, title: 'BBQ Grill Station' },
      { id: 3, image: nonveg, title: 'Seafood Spread' }
    ],
    packages: [
      {
        name: 'Non-Veg Feast',
        price: '₹700 per plate',
        features: ['2 Chicken Items', '1 Mutton Item', '1 Fish Item', 'Rice & Bread', 'Dessert']
      },
      {
        name: 'Royal Feast',
        price: '₹1,500 per plate',
        features: ['3 Chicken Items', '2 Mutton Items', '2 Seafood Items', 'Live BBQ', 'Premium Desserts']
      },
      {
        name: 'Maharaja Non-Veg',
        price: '₹2,500 per plate',
        features: ['Premium Menu', 'Live Grills', 'Seafood Special', 'Arabic Dishes', 'Multiple Live Counters', 'Full Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Arjun K',
        rating: 5,
        date: '2024-02-10',
        comment: 'Best biryani I\'ve ever had! The BBQ station was a hit at our reception.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 6,
    name: 'Ocean Delights',
    businessName: 'Ocean Delights Seafood Catering',
    businessCategory: 'Non-Vegetarian Catering',
    eventType: 'Non-Vegetarian Catering',
    personName: 'Anjali Nair',
    designation: 'Seafood Specialist',
    description: 'Fresh seafood catering with coastal flavors',
    longDescription: 'Ocean Delights brings the freshest seafood from coastal regions to your events. With 10 years of expertise, we specialize in authentic coastal seafood preparations that capture the essence of the sea.',
    services: ['Prawn Specialties', 'Fish Curries', 'Crab Dishes', 'Lobster Preparations'],
    logo: nonveg,
    location: 'Kochi, Kerala',
    rating: 4.8,
    totalReviews: 92,
    budgetRange: '₹800 - ₹3,000 per plate',
    experience: 10,
    businessType: 'Proprietorship',
    cuisines: ['South Indian'],
    specialMenus: ['Wedding Feast', 'Reception'],
    serviceTypes: ['Buffet', 'Banana Leaf Service'],
    minCapacity: 100,
    maxCapacity: 800,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'On-site',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Within District', 'Outstation'],
    availableLocations: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Chennai', 'Bangalore'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43215',
      email: 'hello@oceandelights.com',
      website: 'www.oceandelights.com',
      address: '789 Coastal Road, Kochi - 682001'
    },
    whatsappNumber: '+919876543215',
    contactNumber: '+919876543215',
    socialMedia: {
      instagram: '@oceandelights',
      facebook: '/oceandelights'
    },
    portfolio: [
      { id: 1, image: nonveg, title: 'Prawn Curry' },
      { id: 2, image: nonveg, title: 'Crab Masala' },
      { id: 3, image: nonveg, title: 'Lobster Special' }
    ],
    packages: [
      {
        name: 'Coastal Special',
        price: '₹800 per plate',
        features: ['2 Fish Items', '1 Prawn Item', '1 Crab Item', 'Rice & Bread', 'Dessert']
      },
      {
        name: 'Seafood Feast',
        price: '₹1,800 per plate',
        features: ['3 Fish Items', '2 Prawn Items', '1 Crab Item', '1 Lobster Item', 'Live Station']
      },
      {
        name: 'Royal Seafood',
        price: '₹3,000 per plate',
        features: ['Premium Seafood Menu', 'Live Grill Station', 'Oysters', 'Lobster Thermidor', 'Full Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Deepa N',
        rating: 5,
        date: '2024-01-05',
        comment: 'The seafood spread was incredible! So fresh and well-prepared.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Multi-Cuisine Catering Vendors
  {
    id: 7,
    name: 'Global Flavors',
    businessName: 'Global Flavors Multi-Cuisine Catering',
    businessCategory: 'Multi-Cuisine Catering',
    eventType: 'Multi-Cuisine Catering',
    personName: 'David Wilson',
    designation: 'Culinary Director',
    description: 'World cuisine experts offering diverse menu options',
    longDescription: 'Global Flavors brings the world to your plate. With 14 years of experience in international cuisine, we offer diverse menu options that cater to every palate, from traditional Indian to exotic global dishes.',
    services: ['Indian', 'Chinese', 'Continental', 'Mexican', 'Italian'],
    logo: multicuisine,
    location: 'Madurai, Tamil Nadu',
    rating: 4.7,
    totalReviews: 134,
    budgetRange: '₹600 - ₹2,000 per plate',
    experience: 14,
    businessType: 'Private Limited',
    cuisines: ['South Indian', 'North Indian', 'Chinese', 'Continental'],
    specialMenus: ['Buffet', 'Live Counters', 'Wedding Feast'],
    serviceTypes: ['Buffet', 'Table Service'],
    minCapacity: 150,
    maxCapacity: 2000,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'Central Kitchen',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local', 'Within District', 'Outstation'],
    availableLocations: ['Madurai', 'Chennai', 'Coimbatore', 'Bangalore', 'Hyderabad'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43216',
      email: 'info@globalflavors.com',
      website: 'www.globalflavors.com',
      address: '123 Global Avenue, Madurai - 625001'
    },
    whatsappNumber: '+919876543216',
    contactNumber: '+919876543216',
    socialMedia: {
      instagram: '@globalflavors',
      facebook: '/globalflavors'
    },
    portfolio: [
      { id: 1, image: multicuisine, title: 'Indian Thali' },
      { id: 2, image: multicuisine, title: 'Chinese Spread' },
      { id: 3, image: multicuisine, title: 'Continental Platter' }
    ],
    packages: [
      {
        name: 'Trio Cuisine',
        price: '₹600 per plate',
        features: ['3 Cuisines', '4 Items per Cuisine', '1 Dessert', 'Basic Setup']
      },
      {
        name: 'World Tour',
        price: '₹1,200 per plate',
        features: ['5 Cuisines', '6 Items per Cuisine', '2 Desserts', 'Live Counters']
      },
      {
        name: 'Global Feast',
        price: '₹2,000 per plate',
        features: ['7+ Cuisines', 'Premium Menu', 'Multiple Live Stations', 'International Desserts', 'Full Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Vijay S',
        rating: 5,
        date: '2024-01-25',
        comment: 'Perfect for our international guests! Everyone loved the variety.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 8,
    name: 'Fusion Feast',
    businessName: 'Fusion Feast Catering',
    businessCategory: 'Multi-Cuisine Catering',
    eventType: 'Multi-Cuisine Catering',
    personName: 'Meera Patel',
    designation: 'Fusion Chef',
    description: 'Creative fusion cuisine blending traditional and modern flavors',
    longDescription: 'Fusion Feast specializes in creative fusion cuisine that combines traditional Indian flavors with international cooking techniques. With 7 years of experience, we create unique culinary experiences that surprise and delight.',
    services: ['Indo-Chinese', 'Continental-Indian Fusion', 'Asian Mix', 'Dessert Stations'],
    logo: multicuisine,
    location: 'Ahmedabad, Gujarat',
    rating: 4.6,
    totalReviews: 78,
    budgetRange: '₹650 - ₹2,200 per plate',
    experience: 7,
    businessType: 'Partnership',
    cuisines: ['Chinese', 'Continental', 'North Indian'],
    specialMenus: ['Live Counters', 'Buffet'],
    serviceTypes: ['Buffet', 'Table Service'],
    minCapacity: 100,
    maxCapacity: 1000,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'Central Kitchen',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Within District', 'Outstation'],
    availableLocations: ['Ahmedabad', 'Gandhinagar', 'Surat', 'Vadodara', 'Mumbai'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43217',
      email: 'hello@fusionfeast.com',
      website: 'www.fusionfeast.com',
      address: '456 Fusion Street, Ahmedabad - 380001'
    },
    whatsappNumber: '+919876543217',
    contactNumber: '+919876543217',
    socialMedia: {
      instagram: '@fusionfeast',
      facebook: '/fusionfeast'
    },
    portfolio: [
      { id: 1, image: multicuisine, title: 'Indo-Chinese Platter' },
      { id: 2, image: multicuisine, title: 'Fusion Desserts' },
      { id: 3, image: multicuisine, title: 'Asian Wok Station' }
    ],
    packages: [
      {
        name: 'Fusion Basics',
        price: '₹650 per plate',
        features: ['3 Fusion Dishes', '2 Traditional Items', '1 Dessert', 'Basic Setup']
      },
      {
        name: 'Fusion Experience',
        price: '₹1,400 per plate',
        features: ['5 Fusion Dishes', '3 Traditional Items', '2 Desserts', 'Live Fusion Counter']
      },
      {
        name: 'Fusion Extravaganza',
        price: '₹2,200 per plate',
        features: ['8+ Fusion Creations', 'Multiple Live Stations', 'Molecular Gastronomy', 'Premium Desserts']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Neha P',
        rating: 4.5,
        date: '2023-11-15',
        comment: 'The fusion menu was innovative and delicious! Great concept.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Buffet Catering Vendors
  {
    id: 9,
    name: 'Grand Buffet Services',
    businessName: 'Grand Buffet Catering',
    businessCategory: 'Buffet Catering',
    eventType: 'Buffet Catering',
    personName: 'Aisha Khan',
    designation: 'Buffet Manager',
    description: 'Professional buffet setup with extensive menu options',
    longDescription: 'Grand Buffet Services specializes in creating impressive buffet spreads for large events. With 9 years of experience, we offer extensive menu options and professional setup that makes your event memorable.',
    services: ['Live Counters', 'Salad Bars', 'Dessert Stations', 'Beverage Centers'],
    logo: buffet,
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    totalReviews: 167,
    budgetRange: '₹550 - ₹1,800 per plate',
    experience: 9,
    businessType: 'Private Limited',
    cuisines: ['North Indian', 'Chinese', 'Continental'],
    specialMenus: ['Buffet', 'Live Counters'],
    serviceTypes: ['Buffet'],
    minCapacity: 200,
    maxCapacity: 2500,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'Central Kitchen',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local', 'Within District', 'Outstation'],
    availableLocations: ['Mumbai', 'Pune', 'Nashik', 'Nagpur', 'Thane'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43218',
      email: 'info@grandbuffet.com',
      website: 'www.grandbuffet.com',
      address: '789 Buffet Avenue, Mumbai - 400001'
    },
    whatsappNumber: '+919876543218',
    contactNumber: '+919876543218',
    socialMedia: {
      instagram: '@grandbuffet',
      facebook: '/grandbuffet'
    },
    portfolio: [
      { id: 1, image: buffet, title: 'Wedding Buffet' },
      { id: 2, image: buffet, title: 'Live Pasta Counter' },
      { id: 3, image: buffet, title: 'Dessert Station' }
    ],
    packages: [
      {
        name: 'Standard Buffet',
        price: '₹550 per plate',
        features: ['4 Veg Items', '2 Non-Veg Items', 'Salad Bar', '2 Desserts', 'Beverages']
      },
      {
        name: 'Deluxe Buffet',
        price: '₹1,100 per plate',
        features: ['6 Veg Items', '4 Non-Veg Items', 'Live Pasta Counter', 'Salad Bar', '3 Desserts', 'Premium Beverages']
      },
      {
        name: 'Premium Buffet',
        price: '₹1,800 per plate',
        features: ['8+ Items', 'Multiple Live Counters', 'Interactive Stations', 'Premium Desserts', 'Full Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Zara M',
        rating: 5,
        date: '2024-02-05',
        comment: 'The buffet setup was spectacular! Great variety and excellent presentation.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 10,
    name: 'Unlimited Buffet',
    businessName: 'Unlimited Buffet Caterers',
    businessCategory: 'Buffet Catering',
    eventType: 'Buffet Catering',
    personName: 'Kabir Malhotra',
    designation: 'Operations Head',
    description: 'Unlimited buffet services for large gatherings',
    longDescription: 'Unlimited Buffet specializes in large-scale buffet services for weddings and corporate events. With 11 years of experience, we ensure unlimited food options and seamless service for your guests.',
    services: ['Unlimited Food', 'Multiple Cuisines', 'Specialty Counters', 'Kids Corner'],
    logo: buffet,
    location: 'Delhi, Delhi',
    rating: 4.8,
    totalReviews: 112,
    budgetRange: '₹500 - ₹1,700 per plate',
    experience: 11,
    businessType: 'Partnership',
    cuisines: ['North Indian', 'South Indian', 'Chinese'],
    specialMenus: ['Buffet', 'Reception'],
    serviceTypes: ['Buffet'],
    minCapacity: 150,
    maxCapacity: 2000,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'Central Kitchen',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local', 'Within District'],
    availableLocations: ['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43219',
      email: 'hello@unlimitedbuffet.com',
      website: 'www.unlimitedbuffet.com',
      address: '123 Buffet Street, Delhi - 110001'
    },
    whatsappNumber: '+919876543219',
    contactNumber: '+919876543219',
    socialMedia: {
      instagram: '@unlimitedbuffet',
      facebook: '/unlimitedbuffet'
    },
    portfolio: [
      { id: 1, image: buffet, title: 'Wedding Buffet Setup' },
      { id: 2, image: buffet, title: 'Kids Corner' },
      { id: 3, image: buffet, title: 'Live Counter' }
    ],
    packages: [
      {
        name: 'Basic Unlimited',
        price: '₹500 per plate',
        features: ['Unlimited Veg Items', 'Salad Bar', '2 Desserts', 'Beverages']
      },
      {
        name: 'Premium Unlimited',
        price: '₹1,000 per plate',
        features: ['Unlimited Veg & Non-Veg', 'Live Counter', 'Salad Bar', '3 Desserts', 'Premium Beverages']
      },
      {
        name: 'Ultimate Feast',
        price: '₹1,700 per plate',
        features: ['Unlimited Everything', 'Multiple Live Counters', 'Kids Special Menu', 'Premium Desserts', 'Full Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Rohan M',
        rating: 4.8,
        date: '2024-01-12',
        comment: 'Great value for money! Unlimited options and great quality.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Live Counter Catering Vendors
  {
    id: 11,
    name: 'Live Kitchen Masters',
    businessName: 'Live Kitchen Masters Catering',
    businessCategory: 'Live Counter Catering',
    eventType: 'Live Counter Catering',
    personName: 'Sanjay Gupta',
    designation: 'Live Counter Chef',
    description: 'Interactive live cooking stations for engaging dining experience',
    longDescription: 'Live Kitchen Masters brings the excitement of live cooking to your events. With 8 years of experience, we offer interactive food stations where guests can watch their food being prepared fresh.',
    services: ['Live Pasta Station', 'Chaat Counter', 'Dosa Counter', 'Barbecue Station'],
    logo: livecounter,
    location: 'Bangalore, Karnataka',
    rating: 4.7,
    totalReviews: 98,
    budgetRange: '₹700 - ₹2,500 per plate',
    experience: 8,
    businessType: 'Proprietorship',
    cuisines: ['South Indian', 'North Indian', 'Chinese'],
    specialMenus: ['Live Counters', 'Buffet'],
    serviceTypes: ['Buffet', 'Table Service'],
    minCapacity: 80,
    maxCapacity: 800,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'On-site',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local', 'Within District'],
    availableLocations: ['Bangalore', 'Mysore', 'Chennai', 'Hyderabad'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43220',
      email: 'info@livekitchenmasters.com',
      website: 'www.livekitchenmasters.com',
      address: '456 Live Kitchen Road, Bangalore - 560001'
    },
    whatsappNumber: '+919876543220',
    contactNumber: '+919876543220',
    socialMedia: {
      instagram: '@livekitchenmasters',
      facebook: '/livekitchenmasters'
    },
    portfolio: [
      { id: 1, image: livecounter, title: 'Live Pasta Station' },
      { id: 2, image: livecounter, title: 'Chaat Counter' },
      { id: 3, image: livecounter, title: 'Barbecue Station' }
    ],
    packages: [
      {
        name: '2 Live Counters',
        price: '₹700 per plate',
        features: ['2 Live Stations', '4 Main Items', '2 Desserts', 'Basic Setup']
      },
      {
        name: '4 Live Counters',
        price: '₹1,500 per plate',
        features: ['4 Live Stations', '6 Main Items', '3 Desserts', 'Salad Bar']
      },
      {
        name: '6 Live Counters',
        price: '₹2,500 per plate',
        features: ['6+ Live Stations', 'Premium Menu', 'Interactive Experiences', 'Full Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anita S',
        rating: 4.7,
        date: '2024-01-18',
        comment: 'Guests loved the live pasta and chaat counters! Great interactive experience.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 12,
    name: 'Interactive Dining',
    businessName: 'Interactive Dining Experiences',
    businessCategory: 'Live Counter Catering',
    eventType: 'Live Counter Catering',
    personName: 'Neha Joshi',
    designation: 'Event Coordinator',
    description: 'Customized live counters based on event theme',
    longDescription: 'Interactive Dining creates memorable experiences with themed live counters. With 6 years of experience, we customize our live stations to match your event theme, creating a unique dining experience.',
    services: ['Sushi Bar', 'Taco Station', 'Waffle Counter', 'Mongolian Grill'],
    logo: livecounter,
    location: 'Pune, Maharashtra',
    rating: 4.8,
    totalReviews: 87,
    budgetRange: '₹750 - ₹2,800 per plate',
    experience: 6,
    businessType: 'Private Limited',
    cuisines: ['Continental', 'Chinese', 'Arabic'],
    specialMenus: ['Live Counters', 'Buffet'],
    serviceTypes: ['Buffet'],
    minCapacity: 100,
    maxCapacity: 600,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'On-site',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local', 'Within District'],
    availableLocations: ['Pune', 'Mumbai', 'Nashik', 'Nagpur', 'Aurangabad'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43221',
      email: 'hello@interactivedining.com',
      website: 'www.interactivedining.com',
      address: '789 Interactive Street, Pune - 411001'
    },
    whatsappNumber: '+919876543221',
    contactNumber: '+919876543221',
    socialMedia: {
      instagram: '@interactivedining',
      facebook: '/interactivedining'
    },
    portfolio: [
      { id: 1, image: livecounter, title: 'Sushi Bar' },
      { id: 2, image: livecounter, title: 'Taco Station' },
      { id: 3, image: livecounter, title: 'Mongolian Grill' }
    ],
    packages: [
      {
        name: 'Theme Basics',
        price: '₹750 per plate',
        features: ['2 Themed Counters', '4 Items', '1 Dessert', 'Theme Decor']
      },
      {
        name: 'Theme Experience',
        price: '₹1,600 per plate',
        features: ['3 Themed Counters', '6 Items', '2 Desserts', 'Complete Theming']
      },
      {
        name: 'Theme Extravaganza',
        price: '₹2,800 per plate',
        features: ['4+ Themed Counters', 'Interactive Chefs', 'Custom Menu', 'Full Event Integration']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Karan M',
        rating: 5,
        date: '2024-02-08',
        comment: 'The Mexican theme with taco station was a huge hit! Very creative.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Theme-Based Catering Vendors
  {
    id: 13,
    name: 'Themed Cuisine',
    businessName: 'Themed Cuisine Catering',
    businessCategory: 'Theme-Based Catering',
    eventType: 'Theme-Based Catering',
    personName: 'Venkatesh Iyer',
    designation: 'Theme Specialist',
    description: 'Complete theme-based catering including decor and menu',
    longDescription: 'Themed Cuisine offers complete themed catering experiences. With 13 years of experience, we provide end-to-end solutions including themed decor, menu, and entertainment that match your chosen theme perfectly.',
    services: ['Royal Theme', 'Beach Theme', 'Garden Party', 'Retro Theme'],
    logo: themebased,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 145,
    budgetRange: '₹1,000 - ₹3,500 per plate',
    experience: 13,
    businessType: 'Private Limited',
    cuisines: ['South Indian', 'North Indian', 'Continental'],
    specialMenus: ['Wedding Feast', 'Reception', 'Sangeet / Mehendi'],
    serviceTypes: ['Buffet', 'Table Service', 'Banana Leaf Service'],
    minCapacity: 100,
    maxCapacity: 1000,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'Central Kitchen',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local', 'Within District', 'Outstation'],
    availableLocations: ['Chennai', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43222',
      email: 'info@themedcuisine.com',
      website: 'www.themedcuisine.com',
      address: '123 Theme Avenue, Chennai - 600001'
    },
    whatsappNumber: '+919876543222',
    contactNumber: '+919876543222',
    socialMedia: {
      instagram: '@themedcuisine',
      facebook: '/themedcuisine'
    },
    portfolio: [
      { id: 1, image: themebased, title: 'Royal Theme Wedding' },
      { id: 2, image: themebased, title: 'Beach Party Setup' },
      { id: 3, image: themebased, title: 'Garden Theme' }
    ],
    packages: [
      {
        name: 'Basic Theme',
        price: '₹1,000 per plate',
        features: ['Theme-based Menu', 'Basic Decor', '4 Main Items', '2 Desserts']
      },
      {
        name: 'Premium Theme',
        price: '₹2,200 per plate',
        features: ['Complete Theming', 'Custom Menu', 'Live Counters', 'Entertainment', 'Full Decor']
      },
      {
        name: 'Luxury Theme',
        price: '₹3,500 per plate',
        features: ['Ultimate Theming', 'Premium Menu', 'Multiple Live Stations', 'Celebrity Chef', 'Full Production']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Lakshmi N',
        rating: 5,
        date: '2024-01-30',
        comment: 'The royal theme for our wedding was magnificent! Everything was perfect.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 14,
    name: 'Concept Catering',
    businessName: 'Concept Catering Services',
    businessCategory: 'Theme-Based Catering',
    eventType: 'Theme-Based Catering',
    personName: 'Radha Krishnan',
    designation: 'Concept Designer',
    description: 'Innovative concept-based catering solutions',
    longDescription: 'Concept Catering brings innovative ideas to life. With 10 years of experience, we create unique concept-based catering experiences that go beyond traditional themes, offering truly memorable events.',
    services: ['Destination Themes', 'Cultural Themes', 'Seasonal Themes', 'Color Themes'],
    logo: themebased,
    location: 'Kanyakumari, Tamil Nadu',
    rating: 4.8,
    totalReviews: 112,
    budgetRange: '₹900 - ₹3,200 per plate',
    experience: 10,
    businessType: 'Partnership',
    cuisines: ['South Indian', 'North Indian'],
    specialMenus: ['Wedding Feast', 'Reception'],
    serviceTypes: ['Buffet', 'Banana Leaf Service'],
    minCapacity: 80,
    maxCapacity: 800,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'On-site',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local', 'Within District'],
    availableLocations: ['Kanyakumari', 'Nagercoil', 'Tirunelveli', 'Thoothukudi', 'Madurai'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43223',
      email: 'contact@conceptcatering.com',
      website: 'www.conceptcatering.com',
      address: '456 Concept Street, Kanyakumari - 629001'
    },
    whatsappNumber: '+919876543223',
    contactNumber: '+919876543223',
    socialMedia: {
      instagram: '@conceptcatering',
      facebook: '/conceptcatering'
    },
    portfolio: [
      { id: 1, image: themebased, title: 'Destination Theme' },
      { id: 2, image: themebased, title: 'Seasonal Theme' },
      { id: 3, image: themebased, title: 'Color Theme' }
    ],
    packages: [
      {
        name: 'Concept Start',
        price: '₹900 per plate',
        features: ['Basic Concept', 'Themed Menu', '3 Items', '1 Dessert']
      },
      {
        name: 'Concept Plus',
        price: '₹1,900 per plate',
        features: ['Full Concept', 'Custom Menu', '5 Items', '2 Desserts', 'Decor']
      },
      {
        name: 'Concept Ultimate',
        price: '₹3,200 per plate',
        features: ['Premium Concept', 'Complete Experience', 'Interactive Elements', 'Full Production']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Sundar R',
        rating: 4.8,
        date: '2023-12-20',
        comment: 'The seasonal theme was beautifully executed. Very creative!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Event-Based Catering Vendors
  {
    id: 15,
    name: 'Event Specialists',
    businessName: 'Event Specialists Catering',
    businessCategory: 'Event-Based Catering',
    eventType: 'Event-Based Catering',
    personName: 'Pooja Mehta',
    designation: 'Event Manager',
    description: 'Specialized catering for different types of events',
    longDescription: 'Event Specialists understand that different events need different catering approaches. With 12 years of experience across all event types, we tailor our services to match the specific requirements of your occasion.',
    services: ['Weddings', 'Corporate Events', 'Birthday Parties', 'Anniversaries'],
    logo: eventbased,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 178,
    budgetRange: '₹600 - ₹2,000 per plate',
    experience: 12,
    businessType: 'Private Limited',
    cuisines: ['South Indian', 'North Indian', 'Chinese'],
    specialMenus: ['Wedding Feast', 'Reception', 'Buffet'],
    serviceTypes: ['Buffet', 'Table Service'],
    minCapacity: 150,
    maxCapacity: 1500,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'Central Kitchen',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local', 'Within District', 'Outstation'],
    availableLocations: ['Chennai', 'Coimbatore', 'Bangalore', 'Hyderabad'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43224',
      email: 'hello@eventspecialists.com',
      website: 'www.eventspecialists.com',
      address: '789 Event Street, Chennai - 600001'
    },
    whatsappNumber: '+919876543224',
    contactNumber: '+919876543224',
    socialMedia: {
      instagram: '@eventspecialists',
      facebook: '/eventspecialists'
    },
    portfolio: [
      { id: 1, image: eventbased, title: 'Wedding Catering' },
      { id: 2, image: eventbased, title: 'Corporate Event' },
      { id: 3, image: eventbased, title: 'Birthday Party' }
    ],
    packages: [
      {
        name: 'Wedding Special',
        price: '₹600 per plate',
        features: ['Wedding Menu', '4 Items', '2 Desserts', 'Basic Setup']
      },
      {
        name: 'Corporate Package',
        price: '₹1,200 per plate',
        features: ['Corporate Menu', '6 Items', '3 Desserts', 'Professional Service', 'Live Counter']
      },
      {
        name: 'Premium Events',
        price: '₹2,000 per plate',
        features: ['Custom Menu', 'Multiple Live Counters', 'Full Service', 'Event Coordination']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anita K',
        rating: 5,
        date: '2024-02-15',
        comment: 'They handled our corporate event perfectly. Great service and food!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 16,
    name: 'Occasion Experts',
    businessName: 'Occasion Experts Catering',
    businessCategory: 'Event-Based Catering',
    eventType: 'Event-Based Catering',
    personName: 'Ramesh Kumar',
    designation: 'Event Planner',
    description: 'Customized catering solutions for every occasion',
    longDescription: 'Occasion Experts specializes in customized catering for all types of celebrations. With 9 years of experience, we understand the unique requirements of each occasion and deliver personalized solutions.',
    services: ['Engagements', 'Baby Showers', 'House Warmings', 'Festival Events'],
    logo: eventbased,
    location: 'Coimbatore, Tamil Nadu',
    rating: 4.7,
    totalReviews: 89,
    budgetRange: '₹550 - ₹1,800 per plate',
    experience: 9,
    businessType: 'Proprietorship',
    cuisines: ['South Indian'],
    specialMenus: ['Wedding Feast', 'Engagement'],
    serviceTypes: ['Banana Leaf Service', 'Table Service'],
    minCapacity: 100,
    maxCapacity: 800,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'On-site',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local', 'Within District'],
    availableLocations: ['Coimbatore', 'Chennai', 'Ooty', 'Kodaikanal', 'Pollachi'],
    transportCharges: 'no',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43225',
      email: 'contact@occasionexperts.com',
      website: 'www.occasionexperts.com',
      address: '321 Occasion Road, Coimbatore - 641001'
    },
    whatsappNumber: '+919876543225',
    contactNumber: '+919876543225',
    socialMedia: {
      instagram: '@occasionexperts',
      facebook: '/occasionexperts'
    },
    portfolio: [
      { id: 1, image: eventbased, title: 'Engagement Ceremony' },
      { id: 2, image: eventbased, title: 'Baby Shower' },
      { id: 3, image: eventbased, title: 'House Warming' }
    ],
    packages: [
      {
        name: 'Engagement Special',
        price: '₹550 per plate',
        features: ['Engagement Menu', '4 Items', '2 Desserts', 'Basic Setup']
      },
      {
        name: 'Celebration Package',
        price: '₹1,100 per plate',
        features: ['Custom Menu', '6 Items', '3 Desserts', 'Live Counter']
      },
      {
        name: 'Complete Celebration',
        price: '₹1,800 per plate',
        features: ['Premium Menu', 'Multiple Live Counters', 'Full Service', 'Event Planning']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Priya V',
        rating: 4.7,
        date: '2024-01-22',
        comment: 'Perfect for our engagement! Great food and service.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Snack & Beverage Catering Vendors
  {
    id: 17,
    name: 'Snack Masters',
    businessName: 'Snack Masters Catering',
    businessCategory: 'Snack & Beverage Catering',
    eventType: 'Snack & Beverage Catering',
    personName: 'Suresh Reddy',
    designation: 'Snack Specialist',
    description: 'Premium snack and beverage services for all events',
    longDescription: 'Snack Masters specializes in high-quality snacks and beverages for events of all sizes. With 5 years of experience, we offer a wide range of finger foods, mocktails, and beverage stations.',
    services: ['Finger Foods', 'Mocktail Bar', 'Coffee Station', 'Dessert Bar'],
    logo: snackscatering,
    location: 'Hyderabad, Telangana',
    rating: 4.6,
    totalReviews: 67,
    budgetRange: '₹300 - ₹1,000 per person',
    experience: 5,
    businessType: 'Individual',
    cuisines: ['South Indian', 'North Indian', 'Chinese'],
    specialMenus: ['Live Counters', 'Buffet'],
    serviceTypes: ['Buffet', 'Table Service'],
    minCapacity: 50,
    maxCapacity: 500,
    servingStaff: 'yes',
    uniformedStaff: 'no',
    fssaiCompliance: 'yes',
    preparationLocation: 'Central Kitchen',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local', 'Within District'],
    availableLocations: ['Hyderabad', 'Secunderabad', 'Warangal'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'no',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43226',
      email: 'info@snackmasters.com',
      website: 'www.snackmasters.com',
      address: '456 Snack Street, Hyderabad - 500001'
    },
    whatsappNumber: '+919876543226',
    contactNumber: '+919876543226',
    socialMedia: {
      instagram: '@snackmasters',
      facebook: '/snackmasters'
    },
    portfolio: [
      { id: 1, image: snackscatering, title: 'Finger Food Platter' },
      { id: 2, image: snackscatering, title: 'Mocktail Bar' },
      { id: 3, image: snackscatering, title: 'Dessert Station' }
    ],
    packages: [
      {
        name: 'Snack Bar',
        price: '₹300 per person',
        features: ['6 Snack Varieties', '2 Beverages', 'Basic Setup']
      },
      {
        name: 'Premium Snacks',
        price: '₹600 per person',
        features: ['10 Snack Varieties', 'Mocktail Bar', 'Coffee Station', '3 Desserts']
      },
      {
        name: 'Ultimate Snack Experience',
        price: '₹1,000 per person',
        features: ['15+ Snacks', 'Full Beverage Station', 'Premium Mocktails', 'Dessert Bar', 'Live Counters']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Ravi T',
        rating: 4.5,
        date: '2023-11-10',
        comment: 'Great variety of snacks and drinks. Perfect for our cocktail party!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 18,
    name: 'Beverage Plus',
    businessName: 'Beverage Plus Catering',
    businessCategory: 'Snack & Beverage Catering',
    eventType: 'Snack & Beverage Catering',
    personName: 'Geetha Nair',
    designation: 'Beverage Manager',
    description: 'Specialized beverage and snack catering',
    longDescription: 'Beverage Plus focuses on creating refreshing beverage experiences complemented by delicious snacks. With 7 years of expertise, we specialize in beverage stations, juice bars, and tea/coffee services.',
    services: ['Juice Bar', 'Tea/Coffee Station', 'Canapés', 'Mini Desserts'],
    logo: snackscatering,
    location: 'Trichy, Tamil Nadu',
    rating: 4.7,
    totalReviews: 54,
    budgetRange: '₹250 - ₹900 per person',
    experience: 7,
    businessType: 'Proprietorship',
    cuisines: ['South Indian'],
    specialMenus: ['Live Counters'],
    serviceTypes: ['Table Service'],
    minCapacity: 40,
    maxCapacity: 400,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'Central Kitchen',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local'],
    availableLocations: ['Trichy', 'Tanjore', 'Kumbakonam', 'Chennai'],
    transportCharges: 'no',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43227',
      email: 'hello@beverageplus.com',
      website: 'www.beverageplus.com',
      address: '789 Beverage Road, Trichy - 620001'
    },
    whatsappNumber: '+919876543227',
    contactNumber: '+919876543227',
    socialMedia: {
      instagram: '@beverageplus',
      facebook: '/beverageplus'
    },
    portfolio: [
      { id: 1, image: snackscatering, title: 'Juice Bar' },
      { id: 2, image: snackscatering, title: 'Coffee Station' },
      { id: 3, image: snackscatering, title: 'Canapés' }
    ],
    packages: [
      {
        name: 'Beverage Basics',
        price: '₹250 per person',
        features: ['2 Beverage Options', '3 Snack Items', 'Basic Setup']
      },
      {
        name: 'Premium Beverage',
        price: '₹550 per person',
        features: ['4 Beverage Options', '6 Snack Items', '2 Desserts', 'Live Station']
      },
      {
        name: 'Luxury Beverage Experience',
        price: '₹900 per person',
        features: ['6+ Beverages', 'Premium Snacks', 'Barista Service', 'Dessert Bar', 'Full Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Meena K',
        rating: 4.8,
        date: '2024-01-08',
        comment: 'The coffee station was a hit at our morning event! Great service.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Special Service Catering Vendors
  {
    id: 19,
    name: 'Special Services',
    businessName: 'Special Services Catering',
    businessCategory: 'Special Service Catering',
    eventType: 'Special Service Catering',
    personName: 'Anand Kumar',
    designation: 'Service Director',
    description: 'Premium catering services with additional amenities',
    longDescription: 'Special Services Catering offers premium dining experiences with added luxury. With 16 years of experience, we provide silver service, butler service, and VIP catering for high-profile events.',
    services: ['Silver Service', 'Butler Service', 'VIP Catering', 'Luxury Setup'],
    logo: specialcatering,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 98,
    budgetRange: '₹1,500 - ₹5,000 per plate',
    experience: 16,
    businessType: 'Private Limited',
    cuisines: ['North Indian', 'Continental'],
    specialMenus: ['Wedding Feast', 'Reception'],
    serviceTypes: ['Table Service'],
    minCapacity: 50,
    maxCapacity: 500,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'On-site',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local', 'Within District'],
    availableLocations: ['Chennai', 'Bangalore', 'Hyderabad', 'Mumbai'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43228',
      email: 'info@specialservices.com',
      website: 'www.specialservices.com',
      address: '123 Premium Avenue, Chennai - 600001'
    },
    whatsappNumber: '+919876543228',
    contactNumber: '+919876543228',
    socialMedia: {
      instagram: '@specialservices',
      facebook: '/specialservices'
    },
    portfolio: [
      { id: 1, image: specialcatering, title: 'Silver Service Setup' },
      { id: 2, image: specialcatering, title: 'Butler Service' },
      { id: 3, image: specialcatering, title: 'VIP Dining' }
    ],
    packages: [
      {
        name: 'Silver Service',
        price: '₹1,500 per plate',
        features: ['Silver Service', '4 Course Meal', 'Wine Pairing', 'Premium Presentation']
      },
      {
        name: 'Butler Service',
        price: '₹3,000 per plate',
        features: ['Personal Butler', '5 Course Meal', 'Premium Beverages', 'Luxury Setup']
      },
      {
        name: 'VIP Experience',
        price: '₹5,000 per plate',
        features: ['VIP Treatment', '7 Course Gourmet Meal', 'Premium Wines', 'Celebrity Chef', 'Full Luxury Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Rajiv M',
        rating: 5,
        date: '2024-02-18',
        comment: 'Exceptional service! The butler service made our event truly special.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 20,
    name: 'Elite Catering',
    businessName: 'Elite Catering Services',
    businessCategory: 'Special Service Catering',
    eventType: 'Special Service Catering',
    personName: 'Divya Sharma',
    designation: 'Premium Services Manager',
    description: 'Luxury catering for high-profile events',
    longDescription: 'Elite Catering specializes in luxury dining experiences for discerning clients. With 11 years of experience, we offer personalized menus, celebrity chefs, and gourmet dining for exclusive events.',
    services: ['Personalized Menus', 'Celebrity Chefs', 'Gourmet Dining', 'Wine Pairing'],
    logo: specialcatering,
    location: 'Bangalore, Karnataka',
    rating: 4.8,
    totalReviews: 76,
    budgetRange: '₹2,000 - ₹6,000 per plate',
    experience: 11,
    businessType: 'Partnership',
    cuisines: ['Continental', 'Arabic'],
    specialMenus: ['Wedding Feast', 'Reception'],
    serviceTypes: ['Table Service'],
    minCapacity: 30,
    maxCapacity: 300,
    servingStaff: 'yes',
    uniformedStaff: 'yes',
    fssaiCompliance: 'yes',
    preparationLocation: 'On-site',
    waterSource: 'yes',
    wasteManagement: 'yes',
    preferredLocations: ['Local', 'Within District', 'Outstation'],
    availableLocations: ['Bangalore', 'Chennai', 'Hyderabad', 'Mumbai', 'Delhi'],
    transportCharges: 'yes',
    advanceRequired: 'yes',
    hasGST: 'yes',
    hasPAN: 'yes',
    hasFSSAI: 'yes',
    contact: {
      phone: '+91 98765 43229',
      email: 'hello@elitecatering.com',
      website: 'www.elitecatering.com',
      address: '456 Elite Street, Bangalore - 560001'
    },
    whatsappNumber: '+919876543229',
    contactNumber: '+919876543229',
    socialMedia: {
      instagram: '@elitecatering',
      facebook: '/elitecatering'
    },
    portfolio: [
      { id: 1, image: specialcatering, title: 'Gourmet Plating' },
      { id: 2, image: specialcatering, title: 'Wine Pairing Dinner' },
      { id: 3, image: specialcatering, title: 'Celebrity Chef Event' }
    ],
    packages: [
      {
        name: 'Gourmet Experience',
        price: '₹2,000 per plate',
        features: ['4 Course Gourmet Menu', 'Wine Pairing', 'Elegant Setup']
      },
      {
        name: 'Chef\'s Table',
        price: '₹4,000 per plate',
        features: ['6 Course Tasting Menu', 'Celebrity Chef', 'Premium Wines', 'Interactive Experience']
      },
      {
        name: 'Ultimate Luxury',
        price: '₹6,000 per plate',
        features: ['8+ Course Menu', 'Michelin Chef', 'Exclusive Wines', 'Personal Butler', 'Luxury Ambiance']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anjali R',
        rating: 5,
        date: '2024-01-28',
        comment: 'An unforgettable dining experience! The celebrity chef was amazing.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  }
];