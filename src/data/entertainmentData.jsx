// Entertainment vendor data matching the registration form structure

// Import assets - adjust paths as needed
import weddingmc from '../assets/weddingmc.jpg';
import dj from '../assets/dj.jpg';
import danceshow from '../assets/danceshow.jpg';
import livemusic from '../assets/livemusic.jpg';
import photobooth from '../assets/photobooth.jpg';
import ledeffects from '../assets/ledeffects.jpg';
import kidsentertainment from '../assets/kidsentertainment.jpg';

export const entertainmentVendors = [
  // Wedding MCs
  {
    id: 1,
    name: 'Master of Ceremonies',
    businessName: 'Master of Ceremonies Entertainment',
    businessCategory: 'Wedding MCs',
    eventType: 'Wedding MCs',
    personName: 'Rajesh Kumar',
    designation: 'Lead MC',
    description: 'Professional wedding MC with 10+ years experience in hosting memorable wedding events',
    longDescription: 'Master of Ceremonies Entertainment has been hosting weddings and special events for over a decade. Rajesh Kumar, our lead MC, brings energy, charm, and professionalism to every event. With expertise in both traditional and modern wedding formats, we ensure your special day flows smoothly while keeping guests engaged and entertained throughout.',
    services: ['Wedding Hosting', 'Event Coordination', 'Audience Engagement', 'Script Writing', 'Bilingual MC'],
    logo: weddingmc,
    location: 'Chennai, Tamil Nadu',
    availableLocations: [
      'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli', 
      'Vellore', 'Erode', 'Thoothukkudi', 'Kanniyakumari', 'Bengaluru', 'Hyderabad'
    ],
    rating: 4.8,
    totalReviews: 156,
    budgetRange: '₹20,000 - ₹1,00,000',
    priceRange: '₹20,000 - ₹1,00,000',
    serviceTypes: ['MC / Anchor'],
    eventCoverage: ['Wedding', 'Reception', 'Engagement', 'Sangeet / Mehendi'],
    businessType: 'Proprietorship',
    experience: 10,
    performanceDuration: 4,
    customPerformances: 'yes',
    soundSystem: 'yes',
    lightingSetup: 'no',
    ledEffects: 'no',
    powerRequirement: 500,
    backupEquipment: 'yes',
    teamSize: 2,
    uniformProvided: 'yes',
    setupIncluded: 'yes',
    preferredLocations: ['Local', 'Within District', 'Outstation'],
    hasTravelCharges: 'yes',
    travelCharges: 'yes',
    noiseRestrictions: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '25%',
    overtimeCharges: '₹5,000/hour',
    hasGST: 'yes',
    hasPAN: 'yes',
    contact: {
      phone: '+91 98765 43210',
      email: 'contact@masterofceremonies.com',
      website: 'www.masterofceremonies.com',
      address: '123 Event Street, Chennai - 600001'
    },
    whatsappNumber: '+919876543210',
    contactNumber: '+919876543210',
    socialMedia: {
      instagram: '@masterofceremonies',
      facebook: '/masterofceremonies',
      youtube: '@masterofceremonies'
    },
    portfolio: [
      { id: 1, image: weddingmc, title: 'Wedding Hosting' },
      { id: 2, image: weddingmc, title: 'Reception Event' },
      { id: 3, image: weddingmc, title: 'Engagement Ceremony' }
    ],
    packages: [
      {
        name: 'Silver Package',
        price: '₹20,000',
        features: ['4 Hours Coverage', 'Script Writing', 'Basic Announcements', '1 MC']
      },
      {
        name: 'Gold Package',
        price: '₹50,000',
        features: ['6 Hours Coverage', 'Custom Script', 'Audience Games', '1 MC', 'Coordinator']
      },
      {
        name: 'Platinum Package',
        price: '₹1,00,000',
        features: ['Full Day Coverage', 'Custom Script', 'Interactive Activities', 'Bilingual MC', 'Event Coordination', 'Rehearsal Session']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Priya S',
        rating: 5,
        date: '2024-01-15',
        comment: 'Rajesh was amazing! He kept the event lively and engaging throughout.',
        avatar: 'https://via.placeholder.com/50'
      },
      {
        id: 2,
        name: 'Rahul M',
        rating: 4.5,
        date: '2023-12-10',
        comment: 'Very professional and entertaining. Highly recommended!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 2,
    name: 'Celebration Hosts',
    businessName: 'Celebration Hosts MC Services',
    businessCategory: 'Wedding MCs',
    eventType: 'Wedding MCs',
    personName: 'Priya Sharma',
    designation: 'Wedding Host',
    description: 'Energetic and engaging MC services for weddings and special celebrations',
    longDescription: 'Celebration Hosts brings a fresh and energetic approach to wedding hosting. Priya Sharma specializes in creating a warm and engaging atmosphere that connects with guests of all ages. With expertise in multiple languages and cultural traditions, she ensures every moment of your celebration is memorable.',
    services: ['Traditional Weddings', 'Modern Events', 'Interactive Games', 'Guest Management', 'Multilingual Hosting'],
    logo: weddingmc,
    location: 'Coimbatore, Tamil Nadu',
    availableLocations: [
      'Coimbatore', 'Chennai', 'Madurai', 'Tirupur', 'Erode', 'Salem', 
      'Ooty', 'Kochi', 'Bengaluru', 'Mysuru'
    ],
    rating: 4.9,
    totalReviews: 203,
    budgetRange: '₹25,000 - ₹1,20,000',
    priceRange: '₹25,000 - ₹1,20,000',
    serviceTypes: ['MC / Anchor'],
    eventCoverage: ['Wedding', 'Reception', 'Engagement'],
    businessType: 'Individual',
    experience: 8,
    performanceDuration: 5,
    customPerformances: 'yes',
    soundSystem: 'yes',
    lightingSetup: 'no',
    ledEffects: 'no',
    powerRequirement: 300,
    backupEquipment: 'yes',
    teamSize: 1,
    uniformProvided: 'yes',
    setupIncluded: 'yes',
    preferredLocations: ['Local', 'Within District'],
    hasTravelCharges: 'yes',
    travelCharges: 'yes',
    noiseRestrictions: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '30%',
    overtimeCharges: '₹4,000/hour',
    hasGST: 'yes',
    hasPAN: 'yes',
    contact: {
      phone: '+91 98765 43211',
      email: 'priya@celebrationhosts.com',
      website: 'www.celebrationhosts.com',
      address: '456 Host Avenue, Coimbatore - 641001'
    },
    whatsappNumber: '+919876543211',
    contactNumber: '+919876543211',
    socialMedia: {
      instagram: '@celebrationhosts',
      facebook: '/celebrationhosts'
    },
    portfolio: [
      { id: 1, image: weddingmc, title: 'Wedding Ceremony' },
      { id: 2, image: weddingmc, title: 'Sangeet Night' },
      { id: 3, image: weddingmc, title: 'Sangeet Night' }
    ],
    packages: [
      {
        name: 'Essential Package',
        price: '₹25,000',
        features: ['4 Hours', 'Script Writing', 'Basic Announcements']
      },
      {
        name: 'Premium Package',
        price: '₹60,000',
        features: ['6 Hours', 'Custom Script', 'Audience Games', 'Coordination']
      },
      {
        name: 'Luxury Package',
        price: '₹1,20,000',
        features: ['Full Day', 'Bilingual Hosting', 'Interactive Activities', 'Rehearsal', 'Event Management']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anand K',
        rating: 5,
        date: '2024-02-01',
        comment: 'Priya made our wedding so special! Highly professional and engaging.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // DJ & Remix
  {
    id: 3,
    name: 'Sound Waves DJ',
    businessName: 'Sound Waves DJ Entertainment',
    businessCategory: 'DJ & Remix',
    eventType: 'DJ & Remix',
    personName: 'Arun Mehta',
    designation: 'Head DJ',
    description: 'Professional DJ services with latest music collection and state-of-the-art equipment',
    longDescription: 'Sound Waves DJ Entertainment has been the heartbeat of countless weddings and events across South India. With a vast collection of music spanning genres, languages, and eras, Arun Mehta and his team know exactly how to read the crowd and keep the dance floor packed all night long.',
    services: ['Wedding Mixes', 'Bollywood Remixes', 'International Music', 'Sound System Setup', 'Light Effects'],
    logo: dj,
    location: 'Bangalore, Karnataka',
    availableLocations: [
      'Bengaluru', 'Chennai', 'Hyderabad', 'Mysuru', 'Coimbatore', 'Mangaluru',
      'Pondicherry', 'Vellore', 'Hosur', 'Tumakuru'
    ],
    rating: 4.7,
    totalReviews: 189,
    budgetRange: '₹15,000 - ₹80,000',
    priceRange: '₹15,000 - ₹80,000',
    serviceTypes: ['DJ & Music', 'Sound & Light Systems'],
    eventCoverage: ['Wedding', 'Reception', 'Sangeet / Mehendi', 'Pre-Wedding Events'],
    businessType: 'Partnership',
    experience: 12,
    performanceDuration: 6,
    customPerformances: 'yes',
    soundSystem: 'yes',
    lightingSetup: 'yes',
    ledEffects: 'yes',
    powerRequirement: 2000,
    backupEquipment: 'yes',
    teamSize: 2,
    uniformProvided: 'no',
    setupIncluded: 'yes',
    preferredLocations: ['Local', 'Within District', 'Outstation'],
    hasTravelCharges: 'yes',
    travelCharges: 'yes',
    noiseRestrictions: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '25%',
    overtimeCharges: '₹6,000/hour',
    hasGST: 'yes',
    hasPAN: 'yes',
    contact: {
      phone: '+91 98765 43212',
      email: 'arun@soundwavesdj.com',
      website: 'www.soundwavesdj.com',
      address: '789 Music Lane, Bangalore - 560001'
    },
    whatsappNumber: '+919876543212',
    contactNumber: '+919876543212',
    socialMedia: {
      instagram: '@soundwavesdj',
      facebook: '/soundwavesdj',
      youtube: '@soundwavesdj'
    },
    portfolio: [
      { id: 1, image: dj, title: 'Wedding Reception' },
      { id: 2, image: dj, title: 'Sangeet Night' },
      { id: 3, image: dj, title: 'Corporate Event' }
    ],
    packages: [
      {
        name: 'Basic Package',
        price: '₹15,000',
        features: ['4 Hours', 'Basic Sound System', 'Standard Playlist', '1 DJ']
      },
      {
        name: 'Premium Package',
        price: '₹40,000',
        features: ['6 Hours', 'Premium Sound System', 'Custom Requests', 'Lighting Effects', '1 DJ']
      },
      {
        name: 'Ultimate Package',
        price: '₹80,000',
        features: ['8 Hours', 'High-End Sound System', 'LED Lighting', 'Wireless Mics', '2 DJs', 'Karaoke Setup']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Sunil R',
        rating: 4.7,
        date: '2024-01-20',
        comment: 'Great music selection! Kept everyone dancing all night.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 4,
    name: 'Beat Masters',
    businessName: 'Beat Masters DJ Services',
    businessCategory: 'DJ & Remix',
    eventType: 'DJ & Remix',
    personName: 'Sneha Reddy',
    designation: 'DJ Specialist',
    description: 'Creating perfect party atmosphere with custom music mixes and professional DJing',
    longDescription: 'Beat Masters is led by Sneha Reddy, one of the few female DJs specializing in wedding entertainment. With a keen ear for music and a passion for creating memorable experiences, Sneha brings a unique perspective to event DJing, blending traditional and contemporary sounds seamlessly.',
    services: ['Custom Playlists', 'Live Mixing', 'Karaoke Setup', 'Wireless Mic System', 'Party Music'],
    logo: dj,
    location: 'Hyderabad, Telangana',
    availableLocations: [
      'Hyderabad', 'Secunderabad', 'Warangal', 'Karimnagar', 'Nizamabad',
      'Chennai', 'Bengaluru', 'Vijayawada', 'Visakhapatnam'
    ],
    rating: 4.6,
    totalReviews: 112,
    budgetRange: '₹12,000 - ₹75,000',
    priceRange: '₹12,000 - ₹75,000',
    serviceTypes: ['DJ & Music'],
    eventCoverage: ['Wedding', 'Reception', 'Engagement', 'Post-Wedding Events'],
    businessType: 'Proprietorship',
    experience: 6,
    performanceDuration: 5,
    customPerformances: 'yes',
    soundSystem: 'yes',
    lightingSetup: 'yes',
    ledEffects: 'no',
    powerRequirement: 1500,
    backupEquipment: 'yes',
    teamSize: 2,
    uniformProvided: 'no',
    setupIncluded: 'yes',
    preferredLocations: ['Local', 'Within District'],
    hasTravelCharges: 'yes',
    travelCharges: 'yes',
    noiseRestrictions: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '20%',
    overtimeCharges: '₹5,000/hour',
    hasGST: 'yes',
    hasPAN: 'yes',
    contact: {
      phone: '+91 98765 43213',
      email: 'sneha@beatmasters.com',
      website: 'www.beatmasters.com',
      address: '321 Beat Street, Hyderabad - 500001'
    },
    whatsappNumber: '+919876543213',
    contactNumber: '+919876543213',
    socialMedia: {
      instagram: '@beatmasters',
      facebook: '/beatmasters'
    },
    portfolio: [
      { id: 1, image: dj, title: 'Wedding Reception' },
      { id: 2, image: dj, title: 'Engagement Party' },
      { id: 3, image: dj, title: 'Engagement Party' }
    ],
    packages: [
      {
        name: 'Starter Package',
        price: '₹12,000',
        features: ['3 Hours', 'Basic Sound', 'Standard Playlist']
      },
      {
        name: 'Deluxe Package',
        price: '₹35,000',
        features: ['5 Hours', 'Premium Sound', 'Lighting', 'Custom Requests']
      },
      {
        name: 'Party Package',
        price: '₹75,000',
        features: ['7 Hours', 'High-End Sound', 'LED Effects', 'Wireless Mics', 'Karaoke']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Kavita M',
        rating: 4.5,
        date: '2023-12-05',
        comment: 'Sneha was amazing! Great energy and music selection.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Dance Shows
  {
    id: 5,
    name: 'Dance Express',
    businessName: 'Dance Express Performances',
    businessCategory: 'Dance Shows',
    eventType: 'Dance Shows',
    personName: 'Vikram Singh',
    designation: 'Dance Director',
    description: 'Professional dance performances for weddings and special events with trained artists',
    longDescription: 'Dance Express brings the magic of Bollywood and traditional Indian dance forms to your wedding celebrations. With a troupe of professionally trained dancers, Vikram Singh choreographs spectacular performances that add glamour and entertainment to any event.',
    services: ['Bollywood Dance', 'Traditional Dances', 'Fusion Performances', 'Group Dances', 'Solo Performances'],
    logo: danceshow,
    location: 'Chennai, Tamil Nadu',
    availableLocations: [
      'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli',
      'Vellore', 'Erode', 'Thoothukkudi', 'Kanniyakumari', 'Bengaluru', 'Pondicherry',
      'Mumbai', 'Delhi', 'Kolkata'
    ],
    rating: 4.9,
    totalReviews: 178,
    budgetRange: '₹25,000 - ₹1,50,000',
    priceRange: '₹25,000 - ₹1,50,000',
    serviceTypes: ['Dance Troupe'],
    eventCoverage: ['Wedding', 'Reception', 'Sangeet / Mehendi', 'Pre-Wedding Events'],
    businessType: 'Private Limited',
    experience: 15,
    performanceDuration: 3,
    customPerformances: 'yes',
    soundSystem: 'no',
    lightingSetup: 'no',
    ledEffects: 'no',
    powerRequirement: 0,
    backupEquipment: 'no',
    teamSize: 8,
    uniformProvided: 'yes',
    setupIncluded: 'yes',
    preferredLocations: ['Local', 'Within District', 'Outstation'],
    hasTravelCharges: 'yes',
    travelCharges: 'yes',
    noiseRestrictions: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '30%',
    overtimeCharges: '₹8,000/hour',
    hasGST: 'yes',
    hasPAN: 'yes',
    contact: {
      phone: '+91 98765 43214',
      email: 'vikram@danceexpress.com',
      website: 'www.danceexpress.com',
      address: '456 Dance Studio, Chennai - 600001'
    },
    whatsappNumber: '+919876543214',
    contactNumber: '+919876543214',
    socialMedia: {
      instagram: '@danceexpress',
      facebook: '/danceexpress',
      youtube: '@danceexpress'
    },
    portfolio: [
      { id: 1, image: danceshow, title: 'Bollywood Performance' },
      { id: 2, image: danceshow, title: 'Sangeet Night' },
      { id: 3, image: danceshow, title: 'Fusion Dance' }
    ],
    packages: [
      {
        name: 'Solo Performance',
        price: '₹25,000',
        features: ['2 Performances', '1 Dancer', 'Custom Choreography', 'Costumes']
      },
      {
        name: 'Group Performance',
        price: '₹75,000',
        features: ['3 Performances', '4-6 Dancers', 'Custom Choreography', 'Costumes', 'Music Production']
      },
      {
        name: 'Full Show Package',
        price: '₹1,50,000',
        features: ['5+ Performances', '8-10 Dancers', 'Custom Choreography', 'Premium Costumes', 'Music Production', 'Rehearsal Session']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Arjun K',
        rating: 5,
        date: '2024-02-10',
        comment: 'The dance performance was the highlight of our sangeet! Amazing choreography.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 6,
    name: 'Rhythm Masters',
    businessName: 'Rhythm Masters Dance Troupe',
    businessCategory: 'Dance Shows',
    eventType: 'Dance Shows',
    personName: 'Anjali Nair',
    designation: 'Choreographer',
    description: 'Energetic dance performances that add glamour and excitement to your celebrations',
    longDescription: 'Rhythm Masters specializes in creating vibrant and energetic dance performances that celebrate Indian culture and modern fusion styles. Anjali Nair, our lead choreographer, brings years of experience in classical and contemporary dance to create memorable performances for weddings and special events.',
    services: ['Themed Performances', 'Classical Dances', 'Contemporary Dance', 'Interactive Performances', 'Costume Design'],
    logo: danceshow,
    location: 'Kochi, Kerala',
    availableLocations: [
      'Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam',
      'Coimbatore', 'Madurai', 'Bengaluru', 'Chennai', 'Mysuru'
    ],
    rating: 4.8,
    totalReviews: 92,
    budgetRange: '₹20,000 - ₹1,20,000',
    priceRange: '₹20,000 - ₹1,20,000',
    serviceTypes: ['Dance Troupe'],
    eventCoverage: ['Wedding', 'Reception', 'Engagement', 'Sangeet / Mehendi'],
    businessType: 'Partnership',
    experience: 9,
    performanceDuration: 4,
    customPerformances: 'yes',
    soundSystem: 'no',
    lightingSetup: 'no',
    ledEffects: 'no',
    powerRequirement: 0,
    backupEquipment: 'no',
    teamSize: 6,
    uniformProvided: 'yes',
    setupIncluded: 'yes',
    preferredLocations: ['Local', 'Within District'],
    hasTravelCharges: 'yes',
    travelCharges: 'yes',
    noiseRestrictions: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '25%',
    overtimeCharges: '₹6,000/hour',
    hasGST: 'yes',
    hasPAN: 'yes',
    contact: {
      phone: '+91 98765 43215',
      email: 'anjali@rhythmmasters.com',
      website: 'www.rhythmmasters.com',
      address: '789 Dance Avenue, Kochi - 682001'
    },
    whatsappNumber: '+919876543215',
    contactNumber: '+919876543215',
    socialMedia: {
      instagram: '@rhythmmasters',
      facebook: '/rhythmmasters'
    },
    portfolio: [
      { id: 1, image: danceshow, title: 'Classical Dance' },
      { id: 2, image: danceshow, title: 'Fusion Performance' },
      { id: 3, image: danceshow, title: 'Fusion Performance' }
    ],
    packages: [
      {
        name: 'Classical Package',
        price: '₹20,000',
        features: ['2 Performances', '3 Dancers', 'Traditional Costumes']
      },
      {
        name: 'Fusion Package',
        price: '₹60,000',
        features: ['3 Performances', '5 Dancers', 'Custom Choreography', 'Costumes']
      },
      {
        name: 'Grand Package',
        price: '₹1,20,000',
        features: ['4+ Performances', '8 Dancers', 'Custom Choreography', 'Premium Costumes', 'Music']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Deepa N',
        rating: 5,
        date: '2024-01-05',
        comment: 'Beautiful classical performance at our wedding! Very professional.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Live Music
  {
    id: 7,
    name: 'Melody Makers',
    businessName: 'Melody Makers Live Music',
    businessCategory: 'Live Music',
    eventType: 'Live Music',
    personName: 'Rahul Verma',
    designation: 'Music Director',
    description: 'Live musical performances with professional singers and instrumentalists',
    longDescription: 'Melody Makers brings the soul of live music to your wedding celebrations. With a team of talented vocalists and instrumentalists, Rahul Verma creates magical musical moments that resonate with emotion and joy. From classical wedding songs to modern Bollywood hits, we cover it all.',
    services: ['Live Singing', 'Instrumental Music', 'Band Performances', 'Classical Music', 'Fusion Music'],
    logo: livemusic,
    location: 'Madurai, Tamil Nadu',
    availableLocations: [
      'Madurai', 'Chennai', 'Coimbatore', 'Tirunelveli', 'Dindigul', 'Theni',
      'Virudhunagar', 'Sivakasi', 'Karaikudi', 'Rameswaram', 'Kanyakumari'
    ],
    rating: 4.7,
    totalReviews: 134,
    budgetRange: '₹30,000 - ₹2,00,000',
    priceRange: '₹30,000 - ₹2,00,000',
    serviceTypes: ['Live Band / Orchestra', 'Classical Music / Nadaswaram'],
    eventCoverage: ['Wedding', 'Reception', 'Engagement', 'Sangeet / Mehendi'],
    businessType: 'Partnership',
    experience: 14,
    performanceDuration: 5,
    customPerformances: 'yes',
    soundSystem: 'yes',
    lightingSetup: 'no',
    ledEffects: 'no',
    powerRequirement: 1000,
    backupEquipment: 'yes',
    teamSize: 5,
    uniformProvided: 'yes',
    setupIncluded: 'yes',
    preferredLocations: ['Local', 'Within District', 'Outstation'],
    hasTravelCharges: 'yes',
    travelCharges: 'yes',
    noiseRestrictions: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '25%',
    overtimeCharges: '₹7,000/hour',
    hasGST: 'yes',
    hasPAN: 'yes',
    contact: {
      phone: '+91 98765 43216',
      email: 'rahul@melodymakers.com',
      website: 'www.melodymakers.com',
      address: '123 Music Street, Madurai - 625001'
    },
    whatsappNumber: '+919876543216',
    contactNumber: '+919876543216',
    socialMedia: {
      instagram: '@melodymakers',
      facebook: '/melodymakers',
      youtube: '@melodymakers'
    },
    portfolio: [
      { id: 1, image: livemusic, title: 'Wedding Ceremony' },
      { id: 2, image: livemusic, title: 'Sangeet Night' },
      { id: 3, image: livemusic, title: 'Reception Performance' }
    ],
    packages: [
      {
        name: 'Classical Package',
        price: '₹30,000',
        features: ['3 Hours', '2 Vocalists', '3 Instrumentalists', 'Traditional Songs']
      },
      {
        name: 'Band Package',
        price: '₹1,00,000',
        features: ['4 Hours', '4 Vocalists', '5 Piece Band', 'Modern & Traditional', 'Sound System']
      },
      {
        name: 'Orchestra Package',
        price: '₹2,00,000',
        features: ['5 Hours', '6 Vocalists', '8 Piece Orchestra', 'Custom Song Requests', 'Premium Sound', 'Lighting']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Vijay S',
        rating: 4.8,
        date: '2024-01-25',
        comment: 'Amazing live music! Made our wedding ceremony so special.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 8,
    name: 'Harmony Ensemble',
    businessName: 'Harmony Ensemble Music Group',
    businessCategory: 'Live Music',
    eventType: 'Live Music',
    personName: 'Meera Patel',
    designation: 'Lead Vocalist',
    description: 'Creating beautiful musical ambiance with live performances for special occasions',
    longDescription: 'Harmony Ensemble is a collective of passionate musicians dedicated to creating beautiful live music for weddings and events. Led by Meera Patel, our group specializes in creating the perfect musical ambiance that complements your celebration, from romantic melodies to upbeat party numbers.',
    services: ['Wedding Songs', 'Background Music', 'Cultural Music', 'Western Music', 'Custom Compositions'],
    logo: livemusic,
    location: 'Ahmedabad, Gujarat',
    availableLocations: [
      'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar',
      'Jamnagar', 'Gandhinagar', 'Mumbai', 'Pune', 'Udaipur'
    ],
    rating: 4.6,
    totalReviews: 87,
    budgetRange: '₹25,000 - ₹1,80,000',
    priceRange: '₹25,000 - ₹1,80,000',
    serviceTypes: ['Live Band / Orchestra'],
    eventCoverage: ['Wedding', 'Reception', 'Engagement'],
    businessType: 'Proprietorship',
    experience: 7,
    performanceDuration: 4,
    customPerformances: 'yes',
    soundSystem: 'yes',
    lightingSetup: 'no',
    ledEffects: 'no',
    powerRequirement: 800,
    backupEquipment: 'yes',
    teamSize: 4,
    uniformProvided: 'yes',
    setupIncluded: 'yes',
    preferredLocations: ['Local', 'Within District'],
    hasTravelCharges: 'yes',
    travelCharges: 'yes',
    noiseRestrictions: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '20%',
    overtimeCharges: '₹5,000/hour',
    hasGST: 'yes',
    hasPAN: 'yes',
    contact: {
      phone: '+91 98765 43217',
      email: 'meera@harmonyensemble.com',
      website: 'www.harmonyensemble.com',
      address: '456 Harmony Lane, Ahmedabad - 380001'
    },
    whatsappNumber: '+919876543217',
    contactNumber: '+919876543217',
    socialMedia: {
      instagram: '@harmonyensemble',
      facebook: '/harmonyensemble'
    },
    portfolio: [
      { id: 1, image: livemusic, title: 'Wedding Ceremony' },
      { id: 2, image: livemusic, title: 'Reception' },
      { id: 3, image: livemusic, title: 'Reception' }
    ],
    packages: [
      {
        name: 'Duo Package',
        price: '₹25,000',
        features: ['3 Hours', 'Vocalist + Keyboard', 'Background Music']
      },
      {
        name: 'Trio Package',
        price: '₹60,000',
        features: ['4 Hours', '3 Musicians', 'Mixed Repertoire', 'Sound System']
      },
      {
        name: 'Full Band',
        price: '₹1,80,000',
        features: ['5 Hours', '5-6 Musicians', 'Complete Setup', 'Custom Songs', 'Lighting']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Neha P',
        rating: 4.5,
        date: '2023-11-15',
        comment: 'Beautiful music! Created a wonderful atmosphere for our reception.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Photo Booths
  {
    id: 9,
    name: 'Snap Happy',
    businessName: 'Snap Happy Photo Booth',
    businessCategory: 'Photo Booths',
    eventType: 'Photo Booths',
    personName: 'Aisha Khan',
    designation: 'Booth Manager',
    description: 'Fun and interactive photo booth services for weddings and events with instant prints',
    longDescription: 'Snap Happy brings the party to your wedding with our state-of-the-art photo booths. With fun props, custom backdrops, and instant social media sharing, we ensure your guests have a memorable experience while capturing fun moments from your special day.',
    services: ['Instant Prints', 'Custom Backdrops', 'Props Collection', 'Digital Copies', 'Social Media Sharing'],
    logo: photobooth,
    location: 'Mumbai, Maharashtra',
    availableLocations: [
      'Mumbai', 'Pune', 'Nashik', 'Nagpur', 'Thane', 'Navi Mumbai',
      'Goa', 'Surat', 'Ahmedabad', 'Bengaluru', 'Chennai'
    ],
    rating: 4.9,
    totalReviews: 167,
    budgetRange: '₹10,000 - ₹50,000',
    priceRange: '₹10,000 - ₹50,000',
    serviceTypes: ['Games & Interactive Activities'],
    eventCoverage: ['Wedding', 'Reception', 'Engagement', 'Sangeet / Mehendi', 'Pre-Wedding Events', 'Post-Wedding Events'],
    businessType: 'Private Limited',
    experience: 5,
    performanceDuration: 6,
    customPerformances: 'no',
    soundSystem: 'no',
    lightingSetup: 'yes',
    ledEffects: 'yes',
    powerRequirement: 500,
    backupEquipment: 'yes',
    teamSize: 2,
    uniformProvided: 'yes',
    setupIncluded: 'yes',
    preferredLocations: ['Local', 'Within District', 'Outstation'],
    hasTravelCharges: 'yes',
    travelCharges: 'yes',
    noiseRestrictions: 'no',
    advanceRequired: 'yes',
    advanceAmount: '25%',
    overtimeCharges: '₹3,000/hour',
    hasGST: 'yes',
    hasPAN: 'yes',
    contact: {
      phone: '+91 98765 43218',
      email: 'aisha@snaphappy.com',
      website: 'www.snaphappy.com',
      address: '789 Photo Street, Mumbai - 400001'
    },
    whatsappNumber: '+919876543218',
    contactNumber: '+919876543218',
    socialMedia: {
      instagram: '@snaphappy',
      facebook: '/snaphappy'
    },
    portfolio: [
      { id: 1, image: photobooth, title: 'Wedding Booth' },
      { id: 2, image: photobooth, title: 'Props Collection' },
      { id: 3, image: photobooth, title: 'Guest Photos' }
    ],
    packages: [
      {
        name: 'Basic Booth',
        price: '₹10,000',
        features: ['3 Hours', '100 Prints', 'Basic Props', 'Digital Gallery']
      },
      {
        name: 'Premium Booth',
        price: '₹25,000',
        features: ['4 Hours', '200 Prints', 'Custom Backdrop', 'Premium Props', 'Social Sharing']
      },
      {
        name: 'Ultimate Booth',
        price: '₹50,000',
        features: ['5 Hours', '300 Prints', 'Custom Backdrop', 'Premium Props', 'Social Sharing', 'GIF Booth', 'Guest Book']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Zara M',
        rating: 5,
        date: '2024-02-05',
        comment: 'The photo booth was a huge hit! Guests loved the props and instant prints.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 10,
    name: 'Memory Booth',
    businessName: 'Memory Booth Services',
    businessCategory: 'Photo Booths',
    eventType: 'Photo Booths',
    personName: 'Kabir Malhotra',
    designation: 'Photo Booth Specialist',
    description: 'Creating memorable photo experiences with themed booths and instant sharing options',
    longDescription: 'Memory Booth specializes in creating immersive photo experiences that your guests will talk about long after the wedding. From 360° video booths to green screen technology, we offer the latest innovations in event photography entertainment.',
    services: ['360° Video Booth', 'GIF Booth', 'Green Screen', 'Custom Themes', 'Online Gallery'],
    logo: photobooth,
    location: 'Delhi, Delhi',
    availableLocations: [
      'Delhi', 'Noida', 'Gurugram', 'Faridabad', 'Ghaziabad',
      'Jaipur', 'Lucknow', 'Chandigarh', 'Agra', 'Dehradun'
    ],
    rating: 4.8,
    totalReviews: 98,
    budgetRange: '₹12,000 - ₹60,000',
    priceRange: '₹12,000 - ₹60,000',
    serviceTypes: ['Games & Interactive Activities'],
    eventCoverage: ['Wedding', 'Reception', 'Engagement', 'Sangeet / Mehendi'],
    businessType: 'Proprietorship',
    experience: 4,
    performanceDuration: 5,
    customPerformances: 'no',
    soundSystem: 'no',
    lightingSetup: 'yes',
    ledEffects: 'yes',
    powerRequirement: 500,
    backupEquipment: 'yes',
    teamSize: 2,
    uniformProvided: 'yes',
    setupIncluded: 'yes',
    preferredLocations: ['Local', 'Within District'],
    hasTravelCharges: 'yes',
    travelCharges: 'yes',
    noiseRestrictions: 'no',
    advanceRequired: 'yes',
    advanceAmount: '20%',
    overtimeCharges: '₹2,500/hour',
    hasGST: 'yes',
    hasPAN: 'yes',
    contact: {
      phone: '+91 98765 43219',
      email: 'kabir@memorybooth.com',
      website: 'www.memorybooth.com',
      address: '123 Booth Avenue, Delhi - 110001'
    },
    whatsappNumber: '+919876543219',
    contactNumber: '+919876543219',
    socialMedia: {
      instagram: '@memorybooth',
      facebook: '/memorybooth'
    },
    portfolio: [
      { id: 1, image: photobooth, title: '360 Booth' },
      { id: 2, image: photobooth, title: 'Green Screen' },
      { id: 3, image: photobooth, title: 'Green Screen' }
    ],
    packages: [
      {
        name: 'Standard Booth',
        price: '₹12,000',
        features: ['3 Hours', '100 Prints', 'Props', 'Digital Gallery']
      },
      {
        name: 'Green Screen Package',
        price: '₹30,000',
        features: ['4 Hours', '150 Prints', 'Green Screen', 'Custom Backgrounds', 'Props']
      },
      {
        name: '360 Experience',
        price: '₹60,000',
        features: ['4 Hours', 'Unlimited Videos', 'Green Screen', 'Premium Props', 'Social Sharing', 'Digital Gallery']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Rohan M',
        rating: 4.8,
        date: '2024-01-12',
        comment: 'The 360 booth was amazing! Everyone loved the videos.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // LED Effects
  {
    id: 11,
    name: 'Light Magic',
    businessName: 'Light Magic LED Effects',
    businessCategory: 'LED Effects',
    eventType: 'LED Effects',
    personName: 'Sanjay Gupta',
    designation: 'Lighting Designer',
    description: 'Professional LED lighting effects and installations for weddings and events',
    longDescription: 'Light Magic transforms wedding venues with spectacular LED lighting effects. Sanjay Gupta, our lighting designer, creates immersive visual experiences that enhance the mood and beauty of your celebration. From LED walls to synchronized light shows, we bring magic to your event.',
    services: ['LED Walls', 'Light Shows', 'Stage Lighting', 'Ambience Lighting', 'Special Effects'],
    logo: ledeffects,
    location: 'Bangalore, Karnataka',
    availableLocations: [
      'Bengaluru', 'Chennai', 'Hyderabad', 'Mysuru', 'Coimbatore',
      'Mangaluru', 'Pondicherry', 'Tirupati', 'Vellore', 'Hosur'
    ],
    rating: 4.7,
    totalReviews: 123,
    budgetRange: '₹20,000 - ₹1,00,000',
    priceRange: '₹20,000 - ₹1,00,000',
    serviceTypes: ['Sound & Light Systems'],
    eventCoverage: ['Wedding', 'Reception', 'Sangeet / Mehendi', 'Pre-Wedding Events', 'Post-Wedding Events'],
    businessType: 'Private Limited',
    experience: 11,
    performanceDuration: 8,
    customPerformances: 'yes',
    soundSystem: 'no',
    lightingSetup: 'yes',
    ledEffects: 'yes',
    powerRequirement: 3000,
    backupEquipment: 'yes',
    teamSize: 3,
    uniformProvided: 'yes',
    setupIncluded: 'yes',
    preferredLocations: ['Local', 'Within District', 'Outstation'],
    hasTravelCharges: 'yes',
    travelCharges: 'yes',
    noiseRestrictions: 'no',
    advanceRequired: 'yes',
    advanceAmount: '30%',
    overtimeCharges: '₹8,000/hour',
    hasGST: 'yes',
    hasPAN: 'yes',
    contact: {
      phone: '+91 98765 43220',
      email: 'sanjay@lightmagic.com',
      website: 'www.lightmagic.com',
      address: '456 Light Lane, Bangalore - 560001'
    },
    whatsappNumber: '+919876543220',
    contactNumber: '+919876543220',
    socialMedia: {
      instagram: '@lightmagic',
      facebook: '/lightmagic',
      youtube: '@lightmagic'
    },
    portfolio: [
      { id: 1, image: ledeffects, title: 'LED Wall' },
      { id: 2, image: ledeffects, title: 'Stage Lighting' },
      { id: 3, image: ledeffects, title: 'Sangeet Setup' }
    ],
    packages: [
      {
        name: 'Basic Lighting',
        price: '₹20,000',
        features: ['Uplighting', 'Stage Wash', 'Basic Setup', '4 Hours']
      },
      {
        name: 'Premium Lighting',
        price: '₹50,000',
        features: ['Moving Heads', 'LED Wash', 'Spotlights', 'Gobo Projection', '6 Hours']
      },
      {
        name: 'LED Wall Package',
        price: '₹1,00,000',
        features: ['10x10 LED Wall', 'Moving Heads', 'Full Stage Setup', 'Synchronized Show', '8 Hours']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anita S',
        rating: 4.7,
        date: '2024-01-18',
        comment: 'The LED wall transformed our reception venue! Amazing work.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 12,
    name: 'Glow Effects',
    businessName: 'Glow Effects Lighting',
    businessCategory: 'LED Effects',
    eventType: 'LED Effects',
    personName: 'Neha Joshi',
    designation: 'Effects Specialist',
    description: 'Creating magical lighting effects that transform event spaces',
    longDescription: 'Glow Effects specializes in creating magical lighting atmospheres that transform ordinary venues into extraordinary spaces. Neha Joshi brings artistic vision and technical expertise to every project, ensuring your wedding venue looks absolutely stunning.',
    services: ['LED Dance Floor', 'Moving Lights', 'Projection Mapping', 'Color Effects', 'Sound Sync Lights'],
    logo: ledeffects,
    location: 'Pune, Maharashtra',
    availableLocations: [
      'Pune', 'Mumbai', 'Nashik', 'Aurangabad', 'Satara',
      'Kolhapur', 'Goa', 'Solapur', 'Ahmednagar', 'Bengaluru'
    ],
    rating: 4.8,
    totalReviews: 87,
    budgetRange: '₹25,000 - ₹1,20,000',
    priceRange: '₹25,000 - ₹1,20,000',
    serviceTypes: ['Sound & Light Systems'],
    eventCoverage: ['Wedding', 'Reception', 'Sangeet / Mehendi'],
    businessType: 'Partnership',
    experience: 8,
    performanceDuration: 6,
    customPerformances: 'yes',
    soundSystem: 'no',
    lightingSetup: 'yes',
    ledEffects: 'yes',
    powerRequirement: 2500,
    backupEquipment: 'yes',
    teamSize: 4,
    uniformProvided: 'yes',
    setupIncluded: 'yes',
    preferredLocations: ['Local', 'Within District'],
    hasTravelCharges: 'yes',
    travelCharges: 'yes',
    noiseRestrictions: 'no',
    advanceRequired: 'yes',
    advanceAmount: '25%',
    overtimeCharges: '₹6,000/hour',
    hasGST: 'yes',
    hasPAN: 'yes',
    contact: {
      phone: '+91 98765 43221',
      email: 'neha@gloweffects.com',
      website: 'www.gloweffects.com',
      address: '789 Glow Street, Pune - 411001'
    },
    whatsappNumber: '+919876543221',
    contactNumber: '+919876543221',
    socialMedia: {
      instagram: '@gloweffects',
      facebook: '/gloweffects'
    },
    portfolio: [
      { id: 1, image: ledeffects, title: 'LED Dance Floor' },
      { id: 2, image: ledeffects, title: 'Projection Mapping' },
      { id: 3, image: ledeffects, title: 'Projection Mapping' }
    ],
    packages: [
      {
        name: 'Dance Floor Package',
        price: '₹25,000',
        features: ['LED Dance Floor', 'Basic Lighting', '4 Hours']
      },
      {
        name: 'Full Venue Package',
        price: '₹60,000',
        features: ['LED Dance Floor', 'Moving Lights', 'Uplighting', 'Color Effects', '6 Hours']
      },
      {
        name: 'Projection Package',
        price: '₹1,20,000',
        features: ['LED Dance Floor', 'Projection Mapping', 'Moving Heads', 'Full Setup', '8 Hours']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Karan M',
        rating: 5,
        date: '2024-02-08',
        comment: 'The LED dance floor was incredible! Everyone loved it.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Kids Entertainment
  {
    id: 13,
    name: 'Kids Kingdom',
    businessName: 'Kids Kingdom Entertainment',
    businessCategory: 'Kids Entertainment',
    eventType: 'Kids Entertainment',
    personName: 'Venkatesh Iyer',
    designation: 'Kids Activity Coordinator',
    description: 'Specialized entertainment services for children at weddings and family events',
    longDescription: 'Kids Kingdom ensures that the youngest guests at your wedding have the time of their lives. With a range of engaging activities, magic shows, and interactive games, Venkatesh Iyer and his team create a fun and safe environment where kids can enjoy while adults celebrate.',
    services: ['Magic Shows', 'Face Painting', 'Games & Activities', 'Balloon Art', 'Storytelling'],
    logo: kidsentertainment,
    location: 'Chennai, Tamil Nadu',
    availableLocations: [
      'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem',
      'Vellore', 'Kanchipuram', 'Pondicherry', 'Bengaluru', 'Hyderabad'
    ],
    rating: 4.9,
    totalReviews: 145,
    budgetRange: '₹8,000 - ₹40,000',
    priceRange: '₹8,000 - ₹40,000',
    serviceTypes: ['Magic Show', 'Games & Interactive Activities'],
    eventCoverage: ['Wedding', 'Engagement', 'Pre-Wedding Events', 'Post-Wedding Events'],
    businessType: 'Proprietorship',
    experience: 7,
    performanceDuration: 3,
    customPerformances: 'yes',
    soundSystem: 'no',
    lightingSetup: 'no',
    ledEffects: 'no',
    powerRequirement: 200,
    backupEquipment: 'no',
    teamSize: 3,
    uniformProvided: 'yes',
    setupIncluded: 'yes',
    preferredLocations: ['Local', 'Within District'],
    hasTravelCharges: 'yes',
    travelCharges: 'yes',
    noiseRestrictions: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '20%',
    overtimeCharges: '₹2,000/hour',
    hasGST: 'yes',
    hasPAN: 'yes',
    contact: {
      phone: '+91 98765 43222',
      email: 'venkatesh@kidskingdom.com',
      website: 'www.kidskingdom.com',
      address: '123 Kids Street, Chennai - 600001'
    },
    whatsappNumber: '+919876543222',
    contactNumber: '+919876543222',
    socialMedia: {
      instagram: '@kidskingdom',
      facebook: '/kidskingdom'
    },
    portfolio: [
      { id: 1, image: kidsentertainment, title: 'Magic Show' },
      { id: 2, image: kidsentertainment, title: 'Face Painting' },
      { id: 3, image: kidsentertainment, title: 'Games Corner' }
    ],
    packages: [
      {
        name: 'Magic Show Package',
        price: '₹8,000',
        features: ['1 Hour Magic Show', 'Balloon Art', '1 Performer']
      },
      {
        name: 'Activity Package',
        price: '₹20,000',
        features: ['3 Hours', 'Face Painting', 'Balloon Art', 'Games', '2 Staff']
      },
      {
        name: 'Full Entertainment',
        price: '₹40,000',
        features: ['4 Hours', 'Magic Show', 'Face Painting', 'Games', 'Balloon Art', 'Storytelling', '3 Staff']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Lakshmi N',
        rating: 5,
        date: '2024-01-30',
        comment: 'The kids were so happy! Great entertainment that kept them engaged all evening.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 14,
    name: 'Little Stars',
    businessName: 'Little Stars Kids Entertainment',
    businessCategory: 'Kids Entertainment',
    eventType: 'Kids Entertainment',
    personName: 'Radha Krishnan',
    designation: 'Kids Entertainer',
    description: 'Engaging and fun entertainment activities specially designed for children',
    longDescription: 'Little Stars brings joy and laughter to your wedding with specialized entertainment for children. Radha Krishnan has a natural gift for connecting with kids and creating activities that are both fun and engaging. From puppet shows to treasure hunts, we ensure the little ones have a memorable time.',
    services: ['Puppet Shows', 'Art & Craft', 'Treasure Hunts', 'Interactive Games', 'Toy Zone'],
    logo: kidsentertainment,
    location: 'Kanyakumari, Tamil Nadu',
    availableLocations: [
      'Kanyakumari', 'Tirunelveli', 'Thoothukkudi', 'Nagercoil',
      'Tenkasi', 'Virudhunagar', 'Madurai', 'Kovilpatti', 'Kerala border areas'
    ],
    rating: 4.8,
    totalReviews: 89,
    budgetRange: '₹10,000 - ₹50,000',
    priceRange: '₹10,000 - ₹50,000',
    serviceTypes: ['Magic Show', 'Games & Interactive Activities'],
    eventCoverage: ['Wedding', 'Engagement', 'Pre-Wedding Events'],
    businessType: 'Individual',
    experience: 6,
    performanceDuration: 4,
    customPerformances: 'yes',
    soundSystem: 'no',
    lightingSetup: 'no',
    ledEffects: 'no',
    powerRequirement: 200,
    backupEquipment: 'no',
    teamSize: 2,
    uniformProvided: 'yes',
    setupIncluded: 'yes',
    preferredLocations: ['Local'],
    hasTravelCharges: 'no',
    travelCharges: 'no',
    noiseRestrictions: 'yes',
    advanceRequired: 'yes',
    advanceAmount: '15%',
    overtimeCharges: '₹1,500/hour',
    hasGST: 'yes',
    hasPAN: 'yes',
    contact: {
      phone: '+91 98765 43223',
      email: 'radha@littlestars.com',
      website: 'www.littlestars.com',
      address: '456 Kids Avenue, Kanyakumari - 629001'
    },
    whatsappNumber: '+919876543223',
    contactNumber: '+919876543223',
    socialMedia: {
      instagram: '@littlestars',
      facebook: '/littlestars'
    },
    portfolio: [
      { id: 1, image: kidsentertainment, title: 'Puppet Show' },
      { id: 2, image: kidsentertainment, title: 'Treasure Hunt' },
      { id: 3, image: kidsentertainment, title: 'Treasure Hunt' }
    ],
    packages: [
      {
        name: 'Puppet Show',
        price: '₹10,000',
        features: ['1 Hour Puppet Show', 'Interactive Session', '1 Performer']
      },
      {
        name: 'Activity Zone',
        price: '₹25,000',
        features: ['3 Hours', 'Art & Craft', 'Games', 'Face Painting', '2 Staff']
      },
      {
        name: 'Complete Package',
        price: '₹50,000',
        features: ['4 Hours', 'Puppet Show', 'Treasure Hunt', 'Art & Craft', 'Games', 'Face Painting', '3 Staff']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Sundar R',
        rating: 4.8,
        date: '2023-12-20',
        comment: 'The kids absolutely loved the puppet show! Very engaging and well-organized.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  }
];