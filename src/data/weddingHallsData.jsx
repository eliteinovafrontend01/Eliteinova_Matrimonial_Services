// Import assets
import achall from '../assets/achall.jpg';
import nonachall from '../assets/nonachall.jpg';
import luxuryhall from '../assets/luxuryhall.jpg';
import minihall from '../assets/minihall.jpg';
import eventhall from '../assets/eventhall.jpg';
import conventionhall from '../assets/conventionhall.jpg';
import partyhall from '../assets/partyhall.jpg';
import outdoorvenue from '../assets/outdoorvenue.jpg';

export const weddingHallsVendors = [
  // AC Wedding Halls Vendors
  {
    id: 1,
    name: 'Royal AC Palace',
    businessName: 'Royal AC Wedding Palace',
    businessCategory: 'AC Wedding Halls',
    eventType: 'AC Wedding Halls',
    venueType: 'Wedding Hall',
    personName: 'Rajesh Kumar',
    designation: 'Venue Manager',
    description: 'Premium air-conditioned wedding hall with state-of-the-art facilities and luxurious interiors.',
    longDescription: 'Royal AC Palace is a premier wedding venue in Chennai, offering a perfect blend of luxury and comfort. With fully air-conditioned halls, elegant decor, and professional event management services, we ensure your wedding day is nothing short of perfect. Our venue features spacious halls, modern amenities, and a dedicated team to handle every detail of your celebration.',
    services: ['Central AC', 'Stage Setup', 'Parking Space', 'Changing Rooms', 'Generator Backup', 'Sound System'],
    logo: achall,
    location: 'Chennai, Tamil Nadu',
    rating: 4.8,
    totalReviews: 156,
    budgetRange: '₹50,000 - ₹2,00,000 per event',
    experience: 14,
    capacity: '500',
    amenities: ['AC Hall', 'Generator Backup', 'Power Backup', 'CCTV', 'Fire Safety', 'RO Water', 'Parking Available', 'Decoration Services'],
    established: 2010,
    hallSize: '5000 sq.ft',
    parkingCapacity: '50',
    numberOfFloors: '2',
    eventsAllowed: ['Marriage', 'Reception', 'Engagement'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['In-house Catering Available'],
    decoration: 'Outside Decoration Allowed',
    soundAllowed: true,
    alcoholAllowed: false,
    roomsAvailable: '10',
    roomType: 'AC',
    availableLocations: ['Chennai', 'Kanchipuram', 'Mahabalipuram', 'Chengalpattu'],
    contact: {
      phone: '+91 98765 43210',
      email: 'info@royalacpalace.com',
      website: 'www.royalacpalace.com',
      address: '123 Palace Road, Chennai - 600001'
    },
    whatsappNumber: '+919876543210',
    contactNumber: '+919876543210',
    socialMedia: {
      instagram: '@royalacpalace',
      facebook: '/royalacpalace'
    },
    portfolio: [
      { id: 1, image: achall, title: 'Main Wedding Hall' },
      { id: 2, image: achall, title: 'Reception Area' },
      { id: 3, image: achall, title: 'Stage Setup' },
    ],
    packages: [
      {
        name: 'Silver Package',
        price: '₹50,000',
        features: ['4 Hours Hall Booking', 'Basic Decoration', '200 Guests Capacity', 'Changing Rooms', 'Parking']
      },
      {
        name: 'Gold Package',
        price: '₹1,00,000',
        features: ['8 Hours Hall Booking', 'Premium Decoration', '300 Guests Capacity', 'Sound System', 'Catering Space']
      },
      {
        name: 'Platinum Package',
        price: '₹2,00,000',
        features: ['Full Day Booking', 'Luxury Decoration', '500 Guests Capacity', 'In-house Catering', 'Bridal Suite']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Priya S',
        rating: 5,
        date: '2024-01-15',
        comment: 'Beautiful AC hall with excellent facilities. The staff was very helpful and professional.',
        avatar: 'https://via.placeholder.com/50'
      },
      {
        id: 2,
        name: 'Rahul M',
        rating: 4.5,
        date: '2023-12-10',
        comment: 'Great venue for our wedding reception. Spacious and well-maintained.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 2,
    name: 'Grand AC Venue',
    businessName: 'Grand AC Wedding Venue',
    businessCategory: 'AC Wedding Halls',
    eventType: 'AC Wedding Halls',
    venueType: 'Convention Center',
    personName: 'Priya Sharma',
    designation: 'Event Coordinator',
    description: 'Spacious AC hall with modern amenities and excellent service staff.',
    longDescription: 'Grand AC Venue is a magnificent convention center designed for grand weddings and celebrations. Spread across multiple floors, our venue offers versatile spaces that can be customized to suit your needs. With state-of-the-art sound and lighting systems, elegant interiors, and experienced event coordinators, we make your special day truly memorable.',
    services: ['Fully Air Conditioned', 'LED Lighting', 'Sound System', 'Kitchen Facilities', 'Decoration Support', 'Valet Parking'],
    logo: achall,
    location: 'Coimbatore, Tamil Nadu',
    rating: 4.9,
    totalReviews: 203,
    budgetRange: '₹75,000 - ₹3,00,000 per event',
    experience: 9,
    capacity: '800',
    amenities: ['AC Hall', 'Generator Backup', 'Lift', 'Wheelchair Access', 'Green Rooms (Bridal/Groom)', 'CCTV', 'Fire Safety', 'RO Water', 'Power Backup'],
    established: 2015,
    hallSize: '7500 sq.ft',
    parkingCapacity: '100',
    numberOfFloors: '3',
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'Sangeet / Mehendi'],
    timeSlots: ['Morning', 'Evening', 'Full Day', 'Night'],
    catering: ['In-house Catering Available', 'Outside Catering Allowed'],
    decoration: 'Outside Decoration Allowed',
    soundAllowed: true,
    alcoholAllowed: true,
    roomsAvailable: '15',
    roomType: 'AC',
    availableLocations: ['Coimbatore', 'Tirupur', 'Erode', 'Salem', 'Ooty'],
    contact: {
      phone: '+91 98765 43211',
      email: 'info@grandacvenue.com',
      website: 'www.grandacvenue.com',
      address: '456 Convention Road, Coimbatore - 641001'
    },
    whatsappNumber: '+919876543211',
    contactNumber: '+919876543211',
    socialMedia: {
      instagram: '@grandacvenue',
      facebook: '/grandacvenue'
    },
    portfolio: [
      { id: 1, image: achall, title: 'Main Convention Hall' },
      { id: 2, image: achall, title: 'Reception Area' },
      { id: 3, image: achall, title: 'Stage Setup' },
    ],
    packages: [
      {
        name: 'Basic Package',
        price: '₹75,000',
        features: ['6 Hours Booking', 'Standard Decoration', '400 Guests', 'Sound System', 'Parking']
      },
      {
        name: 'Premium Package',
        price: '₹1,50,000',
        features: ['12 Hours Booking', 'Premium Decoration', '600 Guests', 'LED Lighting', 'Catering Services']
      },
      {
        name: 'Luxury Package',
        price: '₹3,00,000',
        features: ['Full Day Booking', 'Luxury Decoration', '800 Guests', 'In-house Catering', 'Valet Parking']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anand K',
        rating: 5,
        date: '2024-02-01',
        comment: 'Excellent venue with great facilities. The team was very professional.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Non AC Wedding Halls Vendors
  {
    id: 3,
    name: 'Traditional Garden Hall',
    businessName: 'Traditional Garden Wedding Hall',
    businessCategory: 'Non AC Wedding Halls',
    eventType: 'Non AC Wedding Halls',
    venueType: 'Open Lawn',
    personName: 'Arun Mehta',
    designation: 'Hall Manager',
    description: 'Traditional non-AC hall with natural ventilation and beautiful garden setting.',
    longDescription: 'Traditional Garden Hall offers a charming open-air venue surrounded by lush gardens. Perfect for those who love natural settings, our venue provides a beautiful backdrop for your wedding ceremonies. With ample outdoor space, natural ventilation, and rustic charm, we create a unique and memorable experience for you and your guests.',
    services: ['Natural Ventilation', 'Garden Area', 'Traditional Décor', 'Catering Space', 'Outdoor Seating', 'Fountain Area'],
    logo: nonachall,
    location: 'Bangalore, Karnataka',
    rating: 4.7,
    totalReviews: 89,
    budgetRange: '₹25,000 - ₹1,50,000 per event',
    experience: 16,
    capacity: '250',
    amenities: ['Non-AC Hall', 'Parking Available', 'Decoration Services', 'Outdoor Space', 'RO Water', 'Garden Area'],
    established: 2008,
    hallSize: '4000 sq.ft',
    parkingCapacity: '30',
    numberOfFloors: '1',
    eventsAllowed: ['Marriage', 'Engagement', 'Other Functions'],
    timeSlots: ['Morning', 'Evening'],
    catering: ['Outside Catering Allowed'],
    decoration: 'Outside Decoration Allowed',
    soundAllowed: true,
    alcoholAllowed: false,
    roomsAvailable: '5',
    roomType: 'Non-AC',
    availableLocations: ['Bangalore', 'Mysore', 'Mandya', 'Ramanagara'],
    contact: {
      phone: '+91 98765 43212',
      email: 'info@traditionagarden.com',
      website: 'www.traditionagarden.com',
      address: '789 Garden Road, Bangalore - 560001'
    },
    whatsappNumber: '+919876543212',
    contactNumber: '+919876543212',
    socialMedia: {
      instagram: '@traditionagarden',
      facebook: '/traditionagarden'
    },
    portfolio: [
      { id: 1, image: nonachall, title: 'Garden Venue' },
      { id: 2, image: nonachall, title: 'Outdoor Seating' },
      { id: 3, image: nonachall, title: 'Fountain Area' }
    ],
    packages: [
      {
        name: 'Basic Garden',
        price: '₹25,000',
        features: ['4 Hours Booking', 'Basic Setup', '150 Guests', 'Parking', 'Garden Access']
      },
      {
        name: 'Premium Garden',
        price: '₹75,000',
        features: ['8 Hours Booking', 'Decoration', '200 Guests', 'Sound System', 'Catering Space']
      },
      {
        name: 'Complete Garden',
        price: '₹1,50,000',
        features: ['Full Day Booking', 'Premium Decoration', '250 Guests', 'Lighting', 'Fountain Setup']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Sunil R',
        rating: 4.5,
        date: '2024-01-20',
        comment: 'Beautiful garden setting! Perfect for outdoor weddings.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 4,
    name: 'Heritage Wedding Hall',
    businessName: 'Heritage Non AC Wedding Hall',
    businessCategory: 'Non AC Wedding Halls',
    eventType: 'Non AC Wedding Halls',
    venueType: 'Mandapam',
    personName: 'Sneha Reddy',
    designation: 'Event Manager',
    description: 'Heritage style wedding hall with traditional architecture and large capacity.',
    longDescription: 'Heritage Wedding Hall is a traditional venue that captures the essence of cultural weddings. With its classic architecture, spacious halls, and traditional ambiance, we provide an authentic setting for your celebrations. Our experienced team ensures that every ritual and tradition is accommodated with care and respect.',
    services: ['Traditional Architecture', 'Large Capacity', 'Natural Lighting', 'Multiple Halls', 'Prayer Room', 'Courtyard'],
    logo: nonachall,
    location: 'Hyderabad, Telangana',
    rating: 4.6,
    totalReviews: 67,
    budgetRange: '₹20,000 - ₹1,00,000 per event',
    experience: 18,
    capacity: '400',
    amenities: ['Non-AC Hall', 'Parking Available', 'Bridal Room', 'Decoration Services', 'Fire Safety', 'Prayer Hall'],
    established: 2005,
    hallSize: '6000 sq.ft',
    parkingCapacity: '40',
    numberOfFloors: '2',
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'Seemantham'],
    timeSlots: ['Morning', 'Evening'],
    catering: ['Outside Catering Allowed'],
    decoration: 'Outside Decoration Allowed',
    soundAllowed: true,
    alcoholAllowed: false,
    roomsAvailable: '8',
    roomType: 'Non-AC',
    availableLocations: ['Hyderabad', 'Secunderabad', 'Warangal', 'Karimnagar'],
    contact: {
      phone: '+91 98765 43213',
      email: 'hello@heritagehall.com',
      website: 'www.heritagehall.com',
      address: '321 Heritage Street, Hyderabad - 500001'
    },
    whatsappNumber: '+919876543213',
    contactNumber: '+919876543213',
    socialMedia: {
      instagram: '@heritagehall',
      facebook: '/heritagehall'
    },
    portfolio: [
      { id: 1, image: nonachall, title: 'Main Hall' },
      { id: 2, image: nonachall, title: 'Traditional Setup' },
      { id: 3, image: nonachall, title: 'Courtyard' }
    ],
    packages: [
      {
        name: 'Traditional Package',
        price: '₹20,000',
        features: ['4 Hours Booking', 'Basic Setup', '250 Guests', 'Changing Rooms', 'Parking']
      },
      {
        name: 'Heritage Package',
        price: '₹50,000',
        features: ['8 Hours Booking', 'Decoration', '350 Guests', 'Sound System', 'Prayer Hall']
      },
      {
        name: 'Royal Heritage',
        price: '₹1,00,000',
        features: ['Full Day Booking', 'Premium Decoration', '400 Guests', 'Traditional Setup', 'Multiple Halls']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Kavita M',
        rating: 4.5,
        date: '2023-12-05',
        comment: 'Perfect traditional venue for our wedding!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Luxury Wedding Halls Vendors
  {
    id: 5,
    name: 'Luxury Palace',
    businessName: 'Luxury Wedding Palace',
    businessCategory: 'Luxury Wedding Halls',
    eventType: 'Luxury Wedding Halls',
    venueType: 'Banquet Hall',
    personName: 'Vikram Singh',
    designation: 'Luxury Services Director',
    description: 'Ultra-luxurious wedding venue with premium amenities and five-star services.',
    longDescription: 'Luxury Palace redefines elegance and sophistication for your special day. With opulent interiors, world-class amenities, and impeccable service, we offer a truly royal experience. Our venue features grand ballrooms, luxurious bridal suites, gourmet catering, and a dedicated team to ensure every detail exceeds your expectations.',
    services: ['VIP Lounges', 'Premium Catering', 'Valet Parking', 'Bridal Suite', 'Professional Event Planning', 'Poolside Venue'],
    logo: luxuryhall,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 178,
    budgetRange: '₹1,50,000 - ₹5,00,000 per event',
    experience: 12,
    capacity: '1000',
    amenities: ['AC Hall', 'Generator Backup', 'Lift', 'Wheelchair Access', 'Green Rooms (Bridal/Groom)', 'Power Backup', 'CCTV', 'Fire Safety', 'RO Water', 'Valet Parking'],
    established: 2018,
    hallSize: '10000 sq.ft',
    parkingCapacity: '150',
    numberOfFloors: '4',
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'Sangeet / Mehendi', 'Other Functions'],
    timeSlots: ['Morning', 'Evening', 'Full Day', 'Night'],
    catering: ['In-house Catering Available', 'Outside Catering Allowed'],
    decoration: 'Outside Decoration Allowed',
    soundAllowed: true,
    alcoholAllowed: true,
    roomsAvailable: '20',
    roomType: 'AC',
    availableLocations: ['Chennai', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi'],
    contact: {
      phone: '+91 98765 43214',
      email: 'royal@luxurypalace.com',
      website: 'www.luxurypalace.com',
      address: '456 Palace Avenue, Chennai - 600001'
    },
    whatsappNumber: '+919876543214',
    contactNumber: '+919876543214',
    socialMedia: {
      instagram: '@luxurypalace',
      facebook: '/luxurypalace'
    },
    portfolio: [
      { id: 1, image: luxuryhall, title: 'Grand Ballroom' },
      { id: 2, image: luxuryhall, title: 'Bridal Suite' },
      { id: 3, image: luxuryhall, title: 'Poolside Venue' },
    ],
    packages: [
      {
        name: 'Silver Luxury',
        price: '₹1,50,000',
        features: ['6 Hours Booking', 'Premium Decoration', '400 Guests', 'Valet Parking', 'Bridal Room']
      },
      {
        name: 'Gold Luxury',
        price: '₹3,00,000',
        features: ['12 Hours Booking', 'Luxury Decoration', '600 Guests', 'In-house Catering', 'VIP Lounge']
      },
      {
        name: 'Platinum Luxury',
        price: '₹5,00,000',
        features: ['Full Day Booking', 'Ultra Luxury', '1000 Guests', 'Premium Catering', 'Bridal Suite']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Arjun K',
        rating: 5,
        date: '2024-02-10',
        comment: 'Absolutely stunning venue! Everything was perfect and luxurious.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 6,
    name: 'Elite Banquet',
    businessName: 'Elite Luxury Banquet Hall',
    businessCategory: 'Luxury Wedding Halls',
    eventType: 'Luxury Wedding Halls',
    venueType: 'Banquet Hall',
    personName: 'Anjali Nair',
    designation: 'Luxury Venue Manager',
    description: 'Exclusive luxury venue with custom-designed interiors and premium facilities.',
    longDescription: 'Elite Banquet offers an exclusive setting for discerning clients who appreciate the finer things in life. Our custom-designed interiors, premium sound and lighting systems, and personalized service create an unforgettable experience. From intimate gatherings to grand celebrations, we cater to your every need with elegance and sophistication.',
    services: ['Custom Interiors', 'Premium Sound System', 'Luxury Décor', 'Private Garden', 'Concierge Service', 'Champagne Bar'],
    logo: luxuryhall,
    location: 'Kochi, Kerala',
    rating: 4.8,
    totalReviews: 92,
    budgetRange: '₹2,00,000 - ₹6,00,000 per event',
    experience: 6,
    capacity: '500',
    amenities: ['AC Hall', 'Generator Backup', 'Lift', 'Green Rooms (Bridal/Groom)', 'Power Backup', 'CCTV', 'Fire Safety', 'RO Water'],
    established: 2019,
    hallSize: '8000 sq.ft',
    parkingCapacity: '80',
    numberOfFloors: '3',
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'Sangeet / Mehendi'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['In-house Catering Available'],
    decoration: 'Outside Decoration Allowed',
    soundAllowed: true,
    alcoholAllowed: true,
    roomsAvailable: '12',
    roomType: 'AC',
    availableLocations: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Alappuzha'],
    contact: {
      phone: '+91 98765 43215',
      email: 'hello@elitebanquet.com',
      website: 'www.elitebanquet.com',
      address: '789 Elite Street, Kochi - 682001'
    },
    whatsappNumber: '+919876543215',
    contactNumber: '+919876543215',
    socialMedia: {
      instagram: '@elitebanquet',
      facebook: '/elitebanquet'
    },
    portfolio: [
      { id: 1, image: luxuryhall, title: 'Main Banquet Hall' },
      { id: 2, image: luxuryhall, title: 'Private Garden' },
      { id: 3, image: luxuryhall, title: 'Champagne Bar' }
    ],
    packages: [
      {
        name: 'Elite Basic',
        price: '₹2,00,000',
        features: ['6 Hours Booking', 'Premium Decoration', '300 Guests', 'Sound System', 'Concierge']
      },
      {
        name: 'Elite Premium',
        price: '₹4,00,000',
        features: ['12 Hours Booking', 'Luxury Décor', '400 Guests', 'In-house Catering', 'Private Garden']
      },
      {
        name: 'Elite Ultimate',
        price: '₹6,00,000',
        features: ['Full Day Booking', 'Custom Design', '500 Guests', 'Premium Catering', 'Champagne Bar']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Deepa N',
        rating: 5,
        date: '2024-01-05',
        comment: 'Exquisite venue with amazing attention to detail!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Mini Wedding Halls Vendors
  {
    id: 7,
    name: 'Cozy Celebrations',
    businessName: 'Cozy Mini Wedding Hall',
    businessCategory: 'Mini Wedding Halls',
    eventType: 'Mini Wedding Halls',
    venueType: 'Wedding Hall',
    personName: 'Rahul Verma',
    designation: 'Small Events Manager',
    description: 'Perfect for intimate weddings with cozy atmosphere and personalized service.',
    longDescription: 'Cozy Celebrations specializes in intimate weddings and small gatherings. Our venue offers a warm and inviting atmosphere where every guest feels special. With personalized service, flexible packages, and attention to detail, we ensure your intimate celebration is memorable and stress-free.',
    services: ['Intimate Setting', 'Personalized Service', 'Cost-Effective', 'Quick Setup', 'Home-like Feel', 'Custom Menus'],
    logo: minihall,
    location: 'Madurai, Tamil Nadu',
    rating: 4.7,
    totalReviews: 134,
    budgetRange: '₹15,000 - ₹80,000 per event',
    experience: 8,
    capacity: '100',
    amenities: ['AC Hall', 'Parking Available', 'Decoration Services', 'Sound System', 'RO Water', 'Bridal Room'],
    established: 2016,
    hallSize: '2000 sq.ft',
    parkingCapacity: '20',
    numberOfFloors: '1',
    eventsAllowed: ['Marriage', 'Engagement', 'Other Functions'],
    timeSlots: ['Morning', 'Evening'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: false,
    roomsAvailable: '3',
    roomType: 'AC',
    availableLocations: ['Madurai', 'Dindigul', 'Theni', 'Virudhunagar'],
    contact: {
      phone: '+91 98765 43216',
      email: 'info@cozycelebrations.com',
      website: 'www.cozycelebrations.com',
      address: '123 Cozy Street, Madurai - 625001'
    },
    whatsappNumber: '+919876543216',
    contactNumber: '+919876543216',
    socialMedia: {
      instagram: '@cozycelebrations',
      facebook: '/cozycelebrations'
    },
    portfolio: [
      { id: 1, image: minihall, title: 'Intimate Hall' },
      { id: 2, image: minihall, title: 'Reception Setup' },
      { id: 3, image: minihall, title: 'Decoration Sample' }
    ],
    packages: [
      {
        name: 'Basic Intimate',
        price: '₹15,000',
        features: ['4 Hours Booking', 'Basic Decoration', '50 Guests', 'Sound System', 'Parking']
      },
      {
        name: 'Premium Intimate',
        price: '₹40,000',
        features: ['8 Hours Booking', 'Premium Decoration', '80 Guests', 'Catering Space', 'Bridal Room']
      },
      {
        name: 'Complete Intimate',
        price: '₹80,000',
        features: ['Full Day Booking', 'Complete Decoration', '100 Guests', 'Custom Menu', 'Full Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Vijay S',
        rating: 5,
        date: '2024-01-25',
        comment: 'Perfect for our small wedding! Very cozy and personal.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 8,
    name: 'Family Venue',
    businessName: 'Family Mini Wedding Venue',
    businessCategory: 'Mini Wedding Halls',
    eventType: 'Mini Wedding Halls',
    venueType: 'Mandapam',
    personName: 'Meera Patel',
    designation: 'Family Events Coordinator',
    description: 'Small wedding hall perfect for family gatherings and intimate ceremonies.',
    longDescription: 'Family Venue is dedicated to creating beautiful memories for family celebrations. Our intimate space is ideal for small weddings, engagement ceremonies, and family gatherings. With warm hospitality, flexible arrangements, and affordable packages, we make your family celebrations truly special.',
    services: ['Family Gatherings', 'Simple Decorations', 'Basic Facilities', 'Affordable Packages', 'Flexible Timings', 'Homely Atmosphere'],
    logo: minihall,
    location: 'Ahmedabad, Gujarat',
    rating: 4.6,
    totalReviews: 78,
    budgetRange: '₹10,000 - ₹50,000 per event',
    experience: 10,
    capacity: '80',
    amenities: ['Non-AC Hall', 'Parking Available', 'Decoration Services', 'Fire Safety', 'Bridal Room'],
    established: 2014,
    hallSize: '1500 sq.ft',
    parkingCapacity: '15',
    numberOfFloors: '1',
    eventsAllowed: ['Marriage', 'Engagement'],
    timeSlots: ['Morning'],
    catering: ['Outside Catering Allowed'],
    decoration: 'Outside Decoration Allowed',
    soundAllowed: true,
    alcoholAllowed: false,
    roomsAvailable: '2',
    roomType: 'Non-AC',
    availableLocations: ['Ahmedabad', 'Gandhinagar', 'Mehsana', 'Nadiad'],
    contact: {
      phone: '+91 98765 43217',
      email: 'hello@familyvenue.com',
      website: 'www.familyvenue.com',
      address: '456 Family Road, Ahmedabad - 380001'
    },
    whatsappNumber: '+919876543217',
    contactNumber: '+919876543217',
    socialMedia: {
      instagram: '@familyvenue',
      facebook: '/familyvenue'
    },
    portfolio: [
      { id: 1, image: minihall, title: 'Family Hall' },
      { id: 2, image: minihall, title: 'Simple Setup' },
      { id: 3, image: minihall, title: 'Intimate Gathering' }
    ],
    packages: [
      {
        name: 'Family Basic',
        price: '₹10,000',
        features: ['3 Hours Booking', 'Basic Setup', '50 Guests', 'Parking', 'Changing Room']
      },
      {
        name: 'Family Premium',
        price: '₹25,000',
        features: ['6 Hours Booking', 'Decoration', '70 Guests', 'Sound System', 'Catering Space']
      },
      {
        name: 'Family Complete',
        price: '₹50,000',
        features: ['Full Day Booking', 'Complete Decoration', '80 Guests', 'Lighting', 'Full Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Neha P',
        rating: 4.5,
        date: '2023-11-15',
        comment: 'Great venue for our small family wedding!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Event Halls Vendors
  {
    id: 9,
    name: 'Multi-Purpose Hall',
    businessName: 'Multi-Purpose Event Hall',
    businessCategory: 'Event Halls',
    eventType: 'Event Halls',
    venueType: 'Convention Center',
    personName: 'Aisha Khan',
    designation: 'Event Hall Manager',
    description: 'Versatile event hall suitable for weddings, corporate events, and celebrations.',
    longDescription: 'Multi-Purpose Hall is a versatile venue designed to accommodate various events. From weddings to corporate conferences, our adaptable space can be configured to meet your specific requirements. With modern equipment, flexible layouts, and professional event support, we ensure your event runs smoothly and successfully.',
    services: ['Multi-Purpose Use', 'Flexible Layout', 'Modern Equipment', 'Catering Kitchen', 'Storage Space', 'Breakout Rooms'],
    logo: eventhall,
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    totalReviews: 167,
    budgetRange: '₹50,000 - ₹2,50,000 per event',
    experience: 7,
    capacity: '500',
    amenities: ['AC Hall', 'Generator Backup', 'Lift', 'Wheelchair Access', 'Power Backup', 'CCTV', 'Fire Safety', 'RO Water'],
    established: 2017,
    hallSize: '5500 sq.ft',
    parkingCapacity: '60',
    numberOfFloors: '2',
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'Other Functions'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['In-house Catering Available', 'Outside Catering Allowed'],
    decoration: 'Outside Decoration Allowed',
    soundAllowed: true,
    alcoholAllowed: true,
    roomsAvailable: '6',
    roomType: 'AC',
    availableLocations: ['Mumbai', 'Thane', 'Navi Mumbai', 'Kalyan'],
    contact: {
      phone: '+91 98765 43218',
      email: 'info@multipurposehall.com',
      website: 'www.multipurposehall.com',
      address: '789 Event Street, Mumbai - 400001'
    },
    whatsappNumber: '+919876543218',
    contactNumber: '+919876543218',
    socialMedia: {
      instagram: '@multipurposehall',
      facebook: '/multipurposehall'
    },
    portfolio: [
      { id: 1, image: eventhall, title: 'Main Hall' },
      { id: 2, image: eventhall, title: 'Conference Setup' },
      { id: 3, image: eventhall, title: 'Wedding Setup' }
    ],
    packages: [
      {
        name: 'Basic Event',
        price: '₹50,000',
        features: ['4 Hours Booking', 'Basic Setup', '200 Guests', 'Sound System', 'Parking']
      },
      {
        name: 'Premium Event',
        price: '₹1,50,000',
        features: ['8 Hours Booking', 'Premium Setup', '350 Guests', 'Catering Services', 'Lighting']
      },
      {
        name: 'Complete Event',
        price: '₹2,50,000',
        features: ['Full Day Booking', 'Complete Setup', '500 Guests', 'In-house Catering', 'Full Support']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Zara M',
        rating: 5,
        date: '2024-02-05',
        comment: 'Very versatile space! Worked perfectly for our corporate event.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 10,
    name: 'City Events Center',
    businessName: 'City Events Center Hall',
    businessCategory: 'Event Halls',
    eventType: 'Event Halls',
    venueType: 'Convention Center',
    personName: 'Kabir Malhotra',
    designation: 'Events Director',
    description: 'Central location event hall with modern amenities and professional event support.',
    longDescription: 'City Events Center is conveniently located in the heart of the city, offering easy access and modern facilities for all types of events. Our professional team provides comprehensive event support, from planning to execution, ensuring your event is a resounding success. With state-of-the-art AV equipment, flexible spaces, and excellent service, we are the preferred choice for many.',
    services: ['Central Location', 'Professional Staff', 'Technical Support', 'Catering Services', 'Parking Facility', 'AV Equipment'],
    logo: eventhall,
    location: 'Delhi, Delhi',
    rating: 4.8,
    totalReviews: 112,
    budgetRange: '₹40,000 - ₹3,00,000 per event',
    experience: 11,
    capacity: '800',
    amenities: ['AC Hall', 'Generator Backup', 'Lift', 'Green Rooms (Bridal/Groom)', 'Power Backup', 'CCTV', 'Fire Safety', 'RO Water'],
    established: 2013,
    hallSize: '9000 sq.ft',
    parkingCapacity: '100',
    numberOfFloors: '3',
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'Sangeet / Mehendi'],
    timeSlots: ['Morning', 'Evening', 'Full Day', 'Night'],
    catering: ['In-house Catering Available'],
    decoration: 'Outside Decoration Allowed',
    soundAllowed: true,
    alcoholAllowed: false,
    roomsAvailable: '10',
    roomType: 'AC',
    availableLocations: ['Delhi', 'Noida', 'Gurugram', 'Faridabad', 'Ghaziabad'],
    contact: {
      phone: '+91 98765 43219',
      email: 'hello@cityevents.com',
      website: 'www.cityevents.com',
      address: '123 City Center, Delhi - 110001'
    },
    whatsappNumber: '+919876543219',
    contactNumber: '+919876543219',
    socialMedia: {
      instagram: '@cityevents',
      facebook: '/cityevents'
    },
    portfolio: [
      { id: 1, image: eventhall, title: 'Main Event Hall' },
      { id: 2, image: eventhall, title: 'Conference Room' },
      { id: 3, image: eventhall, title: 'Wedding Setup' }
    ],
    packages: [
      {
        name: 'City Basic',
        price: '₹40,000',
        features: ['4 Hours Booking', 'Basic Setup', '300 Guests', 'Sound System', 'Parking']
      },
      {
        name: 'City Premium',
        price: '₹1,50,000',
        features: ['8 Hours Booking', 'Premium Setup', '500 Guests', 'Catering', 'Technical Support']
      },
      {
        name: 'City Ultimate',
        price: '₹3,00,000',
        features: ['Full Day Booking', 'Complete Setup', '800 Guests', 'In-house Catering', 'Full Support']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Rohan M',
        rating: 4.8,
        date: '2024-01-12',
        comment: 'Great location and excellent facilities!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Convention & Banquet Halls Vendors
  {
    id: 11,
    name: 'Grand Convention',
    businessName: 'Grand Convention Center',
    businessCategory: 'Convention & Banquet Halls',
    eventType: 'Convention & Banquet Halls',
    venueType: 'Convention Center',
    personName: 'Sanjay Gupta',
    designation: 'Convention Manager',
    description: 'Large convention hall suitable for big weddings and grand celebrations.',
    longDescription: 'Grand Convention Center is one of the largest venues in the region, capable of hosting grand weddings and large-scale events. With multiple halls, extensive facilities, and professional event management, we provide everything you need for a spectacular celebration. Our experienced team ensures seamless execution of your event, no matter the size.',
    services: ['Large Capacity', 'Multiple Halls', 'Professional Setup', 'Technical Support', 'Hospitality Services', 'Exhibition Space'],
    logo: conventionhall,
    location: 'Bangalore, Karnataka',
    rating: 4.7,
    totalReviews: 98,
    budgetRange: '₹75,000 - ₹4,00,000 per event',
    experience: 13,
    capacity: '1500',
    amenities: ['AC Hall', 'Generator Backup', 'Lift', 'Wheelchair Access', 'Green Rooms (Bridal/Groom)', 'Power Backup', 'CCTV', 'Fire Safety', 'RO Water'],
    established: 2011,
    hallSize: '15000 sq.ft',
    parkingCapacity: '200',
    numberOfFloors: '4',
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'Sangeet / Mehendi', 'Other Functions'],
    timeSlots: ['Morning', 'Evening', 'Full Day', 'Night'],
    catering: ['In-house Catering Available', 'Outside Catering Allowed'],
    decoration: 'Outside Decoration Allowed',
    soundAllowed: true,
    alcoholAllowed: true,
    roomsAvailable: '25',
    roomType: 'AC',
    availableLocations: ['Bangalore', 'Mysore', 'Hubli', 'Belgaum'],
    contact: {
      phone: '+91 98765 43220',
      email: 'info@grandconvention.com',
      website: 'www.grandconvention.com',
      address: '456 Convention Avenue, Bangalore - 560001'
    },
    whatsappNumber: '+919876543220',
    contactNumber: '+919876543220',
    socialMedia: {
      instagram: '@grandconvention',
      facebook: '/grandconvention'
    },
    portfolio: [
      { id: 1, image: conventionhall, title: 'Main Convention Hall' },
      { id: 2, image: conventionhall, title: 'Banquet Setup' },
      { id: 3, image: conventionhall, title: 'Exhibition Space' }
    ],
    packages: [
      {
        name: 'Convention Basic',
        price: '₹75,000',
        features: ['4 Hours Booking', 'Basic Setup', '500 Guests', 'Sound System', 'Parking']
      },
      {
        name: 'Convention Premium',
        price: '₹2,00,000',
        features: ['8 Hours Booking', 'Premium Setup', '1000 Guests', 'Catering', 'Multiple Halls']
      },
      {
        name: 'Convention Ultimate',
        price: '₹4,00,000',
        features: ['Full Day Booking', 'Complete Setup', '1500 Guests', 'In-house Catering', 'Full Support']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anita S',
        rating: 4.7,
        date: '2024-01-18',
        comment: 'Perfect for our large wedding! Spacious and well-organized.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 12,
    name: 'Banquet Excellence',
    businessName: 'Banquet Excellence Hall',
    businessCategory: 'Convention & Banquet Halls',
    eventType: 'Convention & Banquet Halls',
    venueType: 'Banquet Hall',
    personName: 'Neha Joshi',
    designation: 'Banquet Manager',
    description: 'Premium banquet hall with professional event management services.',
    longDescription: 'Banquet Excellence offers sophisticated banquet facilities for weddings and special occasions. Our elegant halls, professional service, and attention to detail create the perfect setting for your celebration. From intimate gatherings to large banquets, we provide customized solutions that exceed expectations.',
    services: ['Banquet Services', 'Event Planning', 'Catering Coordination', 'Decoration Services', 'Guest Management', 'Lighting Design'],
    logo: conventionhall,
    location: 'Pune, Maharashtra',
    rating: 4.8,
    totalReviews: 87,
    budgetRange: '₹80,000 - ₹3,50,000 per event',
    experience: 8,
    capacity: '1000',
    amenities: ['AC Hall', 'Generator Backup', 'Lift', 'Green Rooms (Bridal/Groom)', 'Power Backup', 'CCTV', 'Fire Safety', 'RO Water'],
    established: 2016,
    hallSize: '12000 sq.ft',
    parkingCapacity: '150',
    numberOfFloors: '3',
    eventsAllowed: ['Marriage', 'Reception', 'Engagement'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['In-house Catering Available'],
    decoration: 'Outside Decoration Allowed',
    soundAllowed: true,
    alcoholAllowed: true,
    roomsAvailable: '18',
    roomType: 'AC',
    availableLocations: ['Pune', 'Pimpri-Chinchwad', 'Lonavala', 'Satara'],
    contact: {
      phone: '+91 98765 43221',
      email: 'studio@banquetexcellence.com',
      website: 'www.banquetexcellence.com',
      address: '789 Banquet Road, Pune - 411001'
    },
    whatsappNumber: '+919876543221',
    contactNumber: '+919876543221',
    socialMedia: {
      instagram: '@banquetexcellence',
      facebook: '/banquetexcellence'
    },
    portfolio: [
      { id: 1, image: conventionhall, title: 'Main Banquet Hall' },
      { id: 2, image: conventionhall, title: 'Reception Setup' },
      { id: 3, image: conventionhall, title: 'Wedding Decoration' }
    ],
    packages: [
      {
        name: 'Banquet Basic',
        price: '₹80,000',
        features: ['4 Hours Booking', 'Basic Setup', '400 Guests', 'Sound System', 'Parking']
      },
      {
        name: 'Banquet Premium',
        price: '₹1,80,000',
        features: ['8 Hours Booking', 'Premium Setup', '600 Guests', 'Catering', 'Lighting']
      },
      {
        name: 'Banquet Ultimate',
        price: '₹3,50,000',
        features: ['Full Day Booking', 'Complete Setup', '1000 Guests', 'In-house Catering', 'Event Planning']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Karan M',
        rating: 5,
        date: '2024-02-08',
        comment: 'Excellent banquet hall with great service!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Party & Reception Halls Vendors
  {
    id: 13,
    name: 'Celebration Hall',
    businessName: 'Celebration Party Hall',
    businessCategory: 'Party & Reception Halls',
    eventType: 'Party & Reception Halls',
    venueType: 'Banquet Hall',
    personName: 'Venkatesh Iyer',
    designation: 'Party Hall Manager',
    description: 'Perfect venue for wedding receptions and party celebrations.',
    longDescription: 'Celebration Hall is designed specifically for parties and receptions. With vibrant decor, excellent sound and lighting systems, and a party-friendly atmosphere, we create the perfect environment for your celebrations. Our team specializes in making your reception or party memorable and fun-filled.',
    services: ['Reception Setup', 'Dance Floor', 'Party Lighting', 'DJ Booth', 'Bar Setup', 'Photo Booth'],
    logo: partyhall,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 145,
    budgetRange: '₹35,000 - ₹2,00,000 per event',
    experience: 7,
    capacity: '250',
    amenities: ['AC Hall', 'Generator Backup', 'Sound System', 'Decoration Services', 'CCTV', 'Fire Safety', 'Dance Floor'],
    established: 2018,
    hallSize: '3000 sq.ft',
    parkingCapacity: '40',
    numberOfFloors: '1',
    eventsAllowed: ['Reception', 'Engagement', 'Sangeet / Mehendi'],
    timeSlots: ['Evening', 'Night'],
    catering: ['Outside Catering Allowed'],
    decoration: 'Outside Decoration Allowed',
    soundAllowed: true,
    alcoholAllowed: true,
    roomsAvailable: '4',
    roomType: 'AC',
    availableLocations: ['Chennai', 'Tambaram', 'Avadi', 'Pallavaram'],
    contact: {
      phone: '+91 98765 43222',
      email: 'info@celebrationhall.com',
      website: 'www.celebrationhall.com',
      address: '123 Party Street, Chennai - 600001'
    },
    whatsappNumber: '+919876543222',
    contactNumber: '+919876543222',
    socialMedia: {
      instagram: '@celebrationhall',
      facebook: '/celebrationhall'
    },
    portfolio: [
      { id: 1, image: partyhall, title: 'Reception Setup' },
      { id: 2, image: partyhall, title: 'Dance Floor' },
      { id: 3, image: partyhall, title: 'Party Lighting' }
    ],
    packages: [
      {
        name: 'Party Basic',
        price: '₹35,000',
        features: ['4 Hours Booking', 'Basic Setup', '150 Guests', 'Sound System', 'Parking']
      },
      {
        name: 'Party Premium',
        price: '₹1,00,000',
        features: ['6 Hours Booking', 'Premium Setup', '200 Guests', 'DJ Booth', 'Party Lighting']
      },
      {
        name: 'Party Ultimate',
        price: '₹2,00,000',
        features: ['8 Hours Booking', 'Complete Setup', '250 Guests', 'Photo Booth', 'Bar Setup']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Lakshmi N',
        rating: 5,
        date: '2024-01-30',
        comment: 'Amazing party hall! Great atmosphere and facilities.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 14,
    name: 'Reception Palace',
    businessName: 'Reception Palace Hall',
    businessCategory: 'Party & Reception Halls',
    eventType: 'Party & Reception Halls',
    venueType: 'Banquet Hall',
    personName: 'Radha Krishnan',
    designation: 'Reception Coordinator',
    description: 'Specialized reception hall with party atmosphere and celebration setup.',
    longDescription: 'Reception Palace is dedicated to creating unforgettable reception experiences. Our venue is designed to celebrate with style, featuring elegant decor, professional sound and lighting, and a team that understands the importance of your special day. From the entrance to the dance floor, every element is crafted for celebration.',
    services: ['Themed Decorations', 'Sound & Lighting', 'Food Counters', 'Seating Arrangements', 'Entertainment Setup', 'Cocktail Area'],
    logo: partyhall,
    location: 'Kanyakumari, Tamil Nadu',
    rating: 4.8,
    totalReviews: 112,
    budgetRange: '₹40,000 - ₹2,50,000 per event',
    experience: 8,
    capacity: '200',
    amenities: ['AC Hall', 'Generator Backup', 'Sound System', 'Decoration Services', 'Bridal Room', 'RO Water'],
    established: 2017,
    hallSize: '3500 sq.ft',
    parkingCapacity: '35',
    numberOfFloors: '1',
    eventsAllowed: ['Reception', 'Engagement'],
    timeSlots: ['Evening', 'Night'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: false,
    roomsAvailable: '3',
    roomType: 'AC',
    availableLocations: ['Kanyakumari', 'Nagercoil', 'Marthandam'],
    contact: {
      phone: '+91 98765 43223',
      email: 'contact@receptionpalace.com',
      website: 'www.receptionpalace.com',
      address: '456 Palace Road, Kanyakumari - 629001'
    },
    whatsappNumber: '+919876543223',
    contactNumber: '+919876543223',
    socialMedia: {
      instagram: '@receptionpalace',
      facebook: '/receptionpalace'
    },
    portfolio: [
      { id: 1, image: partyhall, title: 'Reception Setup' },
      { id: 2, image: partyhall, title: 'Themed Decoration' },
      { id: 3, image: partyhall, title: 'Dance Floor' }
    ],
    packages: [
      {
        name: 'Reception Basic',
        price: '₹40,000',
        features: ['4 Hours Booking', 'Basic Decoration', '120 Guests', 'Sound System', 'Parking']
      },
      {
        name: 'Reception Premium',
        price: '₹1,20,000',
        features: ['6 Hours Booking', 'Themed Decoration', '150 Guests', 'DJ Setup', 'Lighting']
      },
      {
        name: 'Reception Ultimate',
        price: '₹2,50,000',
        features: ['8 Hours Booking', 'Complete Theming', '200 Guests', 'Entertainment', 'Full Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Sundar R',
        rating: 4.8,
        date: '2023-12-20',
        comment: 'Perfect reception venue! Great ambiance and service.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  // Outdoor / Open-Air Venues Vendors
  {
    id: 15,
    name: 'Garden Paradise',
    businessName: 'Garden Paradise Open-Air Venue',
    businessCategory: 'Outdoor / Open-Air Venues',
    eventType: 'Outdoor / Open-Air Venues',
    venueType: 'Open Lawn',
    personName: 'Pooja Mehta',
    designation: 'Outdoor Venue Manager',
    description: 'Beautiful garden venue for outdoor weddings and open-air celebrations.',
    longDescription: 'Garden Paradise offers a stunning outdoor setting for weddings and celebrations. Surrounded by lush greenery and beautiful landscapes, our venue provides a natural and romantic backdrop for your special day. With flexible space, weather contingency options, and dedicated service, we ensure your outdoor celebration is magical and memorable.',
    services: ['Garden Setting', 'Outdoor Seating', 'Natural Backdrop', 'Weather Contingency', 'Garden Decor', 'Water Feature'],
    logo: outdoorvenue,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 178,
    budgetRange: '₹60,000 - ₹3,00,000 per event',
    experience: 5,
    capacity: '400',
    amenities: ['Non-AC Hall', 'Parking Available', 'Outdoor Space', 'Decoration Services', 'Generator Backup', 'RO Water', 'Garden Area'],
    established: 2019,
    hallSize: '8000 sq.ft',
    parkingCapacity: '60',
    numberOfFloors: '1',
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'Other Functions'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['Outside Catering Allowed'],
    decoration: 'Outside Decoration Allowed',
    soundAllowed: true,
    alcoholAllowed: true,
    roomsAvailable: '2',
    roomType: 'Non-AC',
    availableLocations: ['Chennai', 'Pondicherry', 'Mahabalipuram', 'Kanchipuram'],
    contact: {
      phone: '+91 98765 43224',
      email: 'hello@gardenparadise.com',
      website: 'www.gardenparadise.com',
      address: '789 Garden Avenue, Chennai - 600001'
    },
    whatsappNumber: '+919876543224',
    contactNumber: '+919876543224',
    socialMedia: {
      instagram: '@gardenparadise',
      facebook: '/gardenparadise'
    },
    portfolio: [
      { id: 1, image: outdoorvenue, title: 'Garden Venue' },
      { id: 2, image: outdoorvenue, title: 'Outdoor Setup' },
      { id: 3, image: outdoorvenue, title: 'Water Feature' }
    ],
    packages: [
      {
        name: 'Garden Basic',
        price: '₹60,000',
        features: ['4 Hours Booking', 'Basic Setup', '250 Guests', 'Parking', 'Garden Access']
      },
      {
        name: 'Garden Premium',
        price: '₹1,50,000',
        features: ['8 Hours Booking', 'Premium Setup', '350 Guests', 'Tent Option', 'Lighting']
      },
      {
        name: 'Garden Ultimate',
        price: '₹3,00,000',
        features: ['Full Day Booking', 'Complete Setup', '400 Guests', 'Weather Contingency', 'Full Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anita K',
        rating: 5,
        date: '2024-02-15',
        comment: 'Beautiful garden venue! Perfect for our outdoor wedding.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 16,
    name: 'Open Sky Venue',
    businessName: 'Open Sky Wedding Venue',
    businessCategory: 'Outdoor / Open-Air Venues',
    eventType: 'Outdoor / Open-Air Venues',
    venueType: 'Open Lawn',
    personName: 'David Wilson',
    designation: 'Outdoor Events Director',
    description: 'Stunning open-air venue with panoramic views and natural surroundings.',
    longDescription: 'Open Sky Venue offers a breathtaking outdoor experience with panoramic views and natural beauty. Perfect for those who dream of celebrating under the open sky, our venue provides a spectacular setting for weddings and special events. With carefully landscaped gardens, stunning sunset views, and professional service, we create unforgettable outdoor celebrations.',
    services: ['Panoramic Views', 'Natural Lighting', 'Outdoor Stage', 'Tent Setup', 'Landscaped Gardens', 'Sunset Point'],
    logo: outdoorvenue,
    location: 'Coimbatore, Tamil Nadu',
    rating: 4.7,
    totalReviews: 89,
    budgetRange: '₹70,000 - ₹3,50,000 per event',
    experience: 4,
    capacity: '450',
    amenities: ['Non-AC Hall', 'Parking Available', 'Outdoor Space', 'Decoration Services', 'Generator Backup', 'Bridal Room', 'Fire Safety'],
    established: 2020,
    hallSize: '10000 sq.ft',
    parkingCapacity: '80',
    numberOfFloors: '1',
    eventsAllowed: ['Marriage', 'Reception', 'Engagement'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['Outside Catering Allowed'],
    decoration: 'Outside Decoration Allowed',
    soundAllowed: true,
    alcoholAllowed: true,
    roomsAvailable: '4',
    roomType: 'Non-AC',
    availableLocations: ['Coimbatore', 'Ooty', 'Pollachi', 'Valparai'],
    contact: {
      phone: '+91 98765 43225',
      email: 'studio@openskyvenue.com',
      website: 'www.openskyvenue.com',
      address: '321 Open Sky Road, Coimbatore - 641001'
    },
    whatsappNumber: '+919876543225',
    contactNumber: '+919876543225',
    socialMedia: {
      instagram: '@openskyvenue',
      facebook: '/openskyvenue'
    },
    portfolio: [
      { id: 1, image: outdoorvenue, title: 'Panoramic View' },
      { id: 2, image: outdoorvenue, title: 'Sunset Point' },
      { id: 3, image: outdoorvenue, title: 'Outdoor Stage' }
    ],
    packages: [
      {
        name: 'Open Sky Basic',
        price: '₹70,000',
        features: ['4 Hours Booking', 'Basic Setup', '300 Guests', 'Parking', 'Garden Access']
      },
      {
        name: 'Open Sky Premium',
        price: '₹1,80,000',
        features: ['8 Hours Booking', 'Premium Setup', '350 Guests', 'Tent Setup', 'Lighting']
      },
      {
        name: 'Open Sky Ultimate',
        price: '₹3,50,000',
        features: ['Full Day Booking', 'Complete Setup', '450 Guests', 'Sunset Experience', 'Full Service']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Priya V',
        rating: 4.7,
        date: '2024-01-22',
        comment: 'Amazing views! The sunset was perfect for our wedding.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  }
];