// Import assets
import mandapdecor from '../assets/mandapdecor.jpg';
import stagedecor from '../assets/stagedecor.jpg';
import weddingdecor from '../assets/weddingdecor.jpg';
import receptiondecor from '../assets/receptiondecor.jpg';
import eventdecor from '../assets/eventdecor.jpg';
import floraldecor from '../assets/floraldecor.jpg';
import themedecor from '../assets/themedecor.jpg';
import lightingdecor from '../assets/lightingdecor.jpg';

export const decorationVendors = [
  // Wedding Decoration Vendors
  {
    id: 1,
    name: 'Royal Wedding Decorators',
    businessName: 'Royal Wedding Decoration Services',
    businessCategory: 'Wedding Decoration',
    eventType: 'Wedding Decoration',
    venueType: 'Wedding Decor',
    personName: 'Rajesh Kumar',
    designation: 'Creative Director',
    description: 'Specializing in royal wedding decorations with 10+ years of experience creating magical wedding setups.',
    longDescription: 'Royal Wedding Decorators is a premier wedding decoration service in Chennai, offering a perfect blend of traditional elegance and modern design. With our team of creative designers and experienced decorators, we transform your wedding venue into a dream setting. From grand entrance decorations to intimate mandap setups, we handle every detail with precision and artistry.',
    services: ['Complete Wedding Setup', 'Entrance Decor', 'Seating Arrangements', 'Stage Design', 'Mandap Decoration', 'Floral Arrangements'],
    logo: weddingdecor,
    location: 'Chennai, Tamil Nadu',
    rating: 4.8,
    totalReviews: 156,
    budgetRange: '₹50,000 - ₹5,00,000',
    experience: 10,
    capacity: '1000 guests',
    amenities: ['In-house Team', 'Design Consultation', 'Custom Themes', 'Quick Setup', 'Decoration Materials'],
    established: 2014,
    teamSize: 15,
    businessType: 'Proprietorship',
    hasTravelCharges: 'yes',
    serviceTypes: ['Wedding Setup', 'Stage Design', 'Theme Design', 'Mandap Decoration'],
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'Sangeet'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: false,
    availableLocations: ['Chennai', 'Kanchipuram', 'Mahabalipuram', 'Chengalpattu'],
    contact: {
      phone: '+91 98765 43210',
      email: 'info@royalweddingdecor.com',
      website: 'www.royalweddingdecor.com',
      address: '123 Decor Street, Chennai - 600001'
    },
    whatsappNumber: '+919876543210',
    contactNumber: '+919876543210',
    socialMedia: {
      instagram: '@royalweddingdecor',
      facebook: '/royalweddingdecor'
    },
    portfolio: [
      { id: 1, image: weddingdecor, title: 'Wedding Setup' },
      { id: 2, image: weddingdecor, title: 'Mandap Design' },
      { id: 3, image: weddingdecor, title: 'Entrance Decor' },
    ],
    packages: [
      {
        name: 'Silver Wedding Package',
        price: '₹50,000',
        features: ['Basic Wedding Setup', 'Stage Decoration', 'Entrance Decor', '100-200 Guests', 'Basic Floral Work']
      },
      {
        name: 'Gold Wedding Package',
        price: '₹2,00,000',
        features: ['Premium Wedding Setup', 'Mandap Decoration', 'Stage Design', '300-500 Guests', 'Premium Flowers']
      },
      {
        name: 'Platinum Wedding Package',
        price: '₹5,00,000',
        features: ['Luxury Wedding Setup', 'Complete Venue Decor', 'Custom Theme', '500-1000 Guests', 'Imported Flowers']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Priya S',
        rating: 5,
        date: '2024-01-15',
        comment: 'Absolutely stunning decorations! Made our wedding day magical.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 2,
    name: 'Dream Wedding Decor',
    businessName: 'Dream Wedding Decoration Studio',
    businessCategory: 'Wedding Decoration',
    eventType: 'Wedding Decoration',
    venueType: 'Wedding Decor',
    personName: 'Priya Sharma',
    designation: 'Head Designer',
    description: 'Creating dream wedding decorations with artistic vision and modern design techniques.',
    longDescription: 'Dream Wedding Decor is a creative studio dedicated to making wedding dreams come true. Our team of passionate designers brings fresh perspectives and innovative ideas to every wedding. We specialize in custom themes, destination weddings, and personalized decorations that reflect your unique style and story.',
    services: ['Custom Wedding Themes', 'Destination Weddings', 'Traditional Decor', 'Complete Setup', 'Lighting Design'],
    logo: weddingdecor,
    location: 'Coimbatore, Tamil Nadu',
    rating: 4.9,
    totalReviews: 203,
    budgetRange: '₹75,000 - ₹6,00,000',
    experience: 8,
    capacity: '800 guests',
    amenities: ['Design Studio', 'Material Library', 'Project Management', 'On-site Coordination'],
    established: 2016,
    teamSize: 20,
    businessType: 'Private Limited',
    hasTravelCharges: 'yes',
    serviceTypes: ['Wedding Setup', 'Theme Design', 'Event Styling', 'Destination Weddings'],
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'Sangeet'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: true,
    availableLocations: ['Coimbatore', 'Tirupur', 'Ooty', 'Salem'],
    contact: {
      phone: '+91 98765 43211',
      email: 'hello@dreamweddingdecor.com',
      website: 'www.dreamweddingdecor.com',
      address: '456 Dream Avenue, Coimbatore - 641001'
    },
    whatsappNumber: '+919876543211',
    contactNumber: '+919876543211',
    socialMedia: {
      instagram: '@dreamweddingdecor',
      facebook: '/dreamweddingdecor'
    },
    portfolio: [
      { id: 1, image: weddingdecor, title: 'Theme Wedding' },
      { id: 2, image: weddingdecor, title: 'Destination Setup' },
      { id: 3, image: weddingdecor, title: 'Custom Design' }
    ],
    packages: [
      {
        name: 'Dream Basic',
        price: '₹75,000',
        features: ['Basic Theme', 'Stage Setup', 'Entrance Decor', '200 Guests', 'Basic Flowers']
      },
      {
        name: 'Dream Premium',
        price: '₹2,50,000',
        features: ['Premium Theme', 'Full Venue Decor', 'Lighting Design', '400 Guests', 'Premium Flowers']
      },
      {
        name: 'Dream Ultimate',
        price: '₹6,00,000',
        features: ['Custom Theme', 'Complete Design', 'Destination Setup', '800 Guests', 'Imported Flowers']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anand K',
        rating: 5,
        date: '2024-02-01',
        comment: 'Exceeded all expectations! The team was incredibly creative.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Stage Decoration Vendors
  {
    id: 3,
    name: 'Stage Masters Decor',
    businessName: 'Stage Masters Decoration Services',
    businessCategory: 'Stage Decoration',
    eventType: 'Stage Decoration',
    venueType: 'Stage Decor',
    personName: 'Arun Mehta',
    designation: 'Stage Designer',
    description: 'Professional stage decoration for weddings and events with spectacular designs.',
    longDescription: 'Stage Masters specializes in creating stunning stage setups that become the centerpiece of your celebration. With expertise in both traditional and contemporary designs, we craft stages that perfectly complement your event theme. Our team uses high-quality materials, innovative lighting, and artistic elements to create memorable stage designs.',
    services: ['Main Stage Setup', 'Floral Stage Decor', 'LED Stage Effects', 'Custom Themes', 'Backdrop Design'],
    logo: stagedecor,
    location: 'Bangalore, Karnataka',
    rating: 4.7,
    totalReviews: 89,
    budgetRange: '₹25,000 - ₹2,50,000',
    experience: 6,
    capacity: '500 guests',
    amenities: ['LED Screens', 'Sound System', 'Lighting Equipment', 'Backdrops'],
    established: 2018,
    teamSize: 8,
    businessType: 'Individual',
    hasTravelCharges: 'yes',
    serviceTypes: ['Stage Design', 'Theme Design', 'Lighting Setup', 'Backdrop Design'],
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'Sangeet'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: false,
    availableLocations: ['Bangalore', 'Mysore', 'Mandya', 'Ramanagara'],
    contact: {
      phone: '+91 98765 43212',
      email: 'info@stagemasters.com',
      website: 'www.stagemasters.com',
      address: '789 Stage Road, Bangalore - 560001'
    },
    whatsappNumber: '+919876543212',
    contactNumber: '+919876543212',
    socialMedia: {
      instagram: '@stagemasters',
      facebook: '/stagemasters'
    },
    portfolio: [
      { id: 1, image: stagedecor, title: 'Wedding Stage' },
      { id: 2, image: stagedecor, title: 'LED Stage' },
      { id: 3, image: stagedecor, title: 'Floral Stage' }
    ],
    packages: [
      {
        name: 'Stage Basic',
        price: '₹25,000',
        features: ['Basic Stage Setup', 'Simple Backdrop', 'Floral Accents', '100 Guests']
      },
      {
        name: 'Stage Premium',
        price: '₹1,00,000',
        features: ['Premium Stage', 'LED Effects', 'Custom Backdrop', '250 Guests', 'Lighting']
      },
      {
        name: 'Stage Ultimate',
        price: '₹2,50,000',
        features: ['Luxury Stage', 'LED Wall', 'Custom Design', '500 Guests', 'Full Lighting']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Sunil R',
        rating: 4.5,
        date: '2024-01-20',
        comment: 'Beautiful stage design! Made our reception look grand.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 4,
    name: 'Elevated Stages',
    businessName: 'Elevated Stage Decoration',
    businessCategory: 'Stage Decoration',
    eventType: 'Stage Decoration',
    venueType: 'Stage Decor',
    personName: 'Sneha Reddy',
    designation: 'Event Decorator',
    description: 'Creating elevated stage designs that become the focal point of every celebration.',
    longDescription: 'Elevated Stages brings innovation and artistry to stage decoration. We specialize in multi-level stages, dramatic lighting effects, and custom backdrops that create wow moments. Whether it\'s a wedding reception or a corporate event, our stages are designed to impress and inspire.',
    services: ['Multi-level Stages', 'Lighting Effects', 'Props and Sets', 'Quick Setup', 'Custom Backdrops'],
    logo: stagedecor,
    location: 'Hyderabad, Telangana',
    rating: 4.6,
    totalReviews: 67,
    budgetRange: '₹30,000 - ₹3,00,000',
    experience: 5,
    capacity: '600 guests',
    amenities: ['Multi-level Platforms', 'LED Lighting', 'Special Effects', 'Custom Props'],
    established: 2019,
    teamSize: 10,
    businessType: 'Partnership',
    hasTravelCharges: 'yes',
    serviceTypes: ['Stage Design', 'Lighting Setup', 'Event Styling', 'Prop Design'],
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'Corporate Events'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: true,
    availableLocations: ['Hyderabad', 'Secunderabad', 'Warangal'],
    contact: {
      phone: '+91 98765 43213',
      email: 'hello@elevatedstages.com',
      website: 'www.elevatedstages.com',
      address: '321 Stage Street, Hyderabad - 500001'
    },
    whatsappNumber: '+919876543213',
    contactNumber: '+919876543213',
    socialMedia: {
      instagram: '@elevatedstages',
      facebook: '/elevatedstages'
    },
    portfolio: [
      { id: 1, image: stagedecor, title: 'Multi-level Stage' },
      { id: 2, image: stagedecor, title: 'Lighting Effects' },
      { id: 3, image: stagedecor, title: 'Custom Props' }
    ],
    packages: [
      {
        name: 'Elevated Basic',
        price: '₹30,000',
        features: ['Basic Stage', 'Lighting', 'Simple Backdrop', '150 Guests']
      },
      {
        name: 'Elevated Premium',
        price: '₹1,50,000',
        features: ['Multi-level Stage', 'LED Effects', 'Custom Backdrop', '300 Guests', 'Props']
      },
      {
        name: 'Elevated Ultimate',
        price: '₹3,00,000',
        features: ['Luxury Stage', 'Full Production', 'Custom Design', '600 Guests', 'Special Effects']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Kavita M',
        rating: 4.5,
        date: '2023-12-05',
        comment: 'Incredible stage design! Everyone was impressed.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Mandap Decoration Vendors
  {
    id: 5,
    name: 'Divine Mandap Decor',
    businessName: 'Divine Mandap Decoration Services',
    businessCategory: 'Mandap Decoration',
    eventType: 'Mandap Decoration',
    venueType: 'Mandap Decor',
    personName: 'Vikram Singh',
    designation: 'Traditional Decor Specialist',
    description: 'Traditional and modern mandap decorations for Hindu wedding ceremonies.',
    longDescription: 'Divine Mandap Decor specializes in creating sacred and beautiful mandap setups for traditional weddings. With deep understanding of Vastu and traditional requirements, we design mandaps that honor rituals while looking absolutely stunning. From classic wooden structures to modern floral designs, we create the perfect sacred space for your wedding.',
    services: ['Traditional Mandaps', 'Floral Mandaps', 'Theme Mandaps', 'Custom Mandap Designs', 'Sacred Setup'],
    logo: mandapdecor,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 178,
    budgetRange: '₹40,000 - ₹4,00,000',
    experience: 12,
    capacity: '400 guests',
    amenities: ['Wooden Structures', 'Fabric Draping', 'Floral Work', 'Traditional Elements'],
    established: 2012,
    teamSize: 12,
    businessType: 'Proprietorship',
    hasTravelCharges: 'yes',
    serviceTypes: ['Mandap Decoration', 'Floral Arrangements', 'Theme Design', 'Traditional Setup'],
    eventsAllowed: ['Marriage', 'Engagement'],
    timeSlots: ['Morning', 'Evening'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: false,
    availableLocations: ['Chennai', 'Kanchipuram', 'Mahabalipuram'],
    contact: {
      phone: '+91 98765 43214',
      email: 'info@divinemandap.com',
      website: 'www.divinemandap.com',
      address: '456 Mandap Road, Chennai - 600001'
    },
    whatsappNumber: '+919876543214',
    contactNumber: '+919876543214',
    socialMedia: {
      instagram: '@divinemandap',
      facebook: '/divinemandap'
    },
    portfolio: [
      { id: 1, image: mandapdecor, title: 'Traditional Mandap' },
      { id: 2, image: mandapdecor, title: 'Floral Mandap' },
      { id: 3, image: mandapdecor, title: 'Theme Mandap' }
    ],
    packages: [
      {
        name: 'Traditional Mandap',
        price: '₹40,000',
        features: ['Basic Mandap', 'Floral Decor', 'Traditional Setup', '100 Guests']
      },
      {
        name: 'Royal Mandap',
        price: '₹1,50,000',
        features: ['Premium Mandap', 'Extensive Flowers', 'Custom Design', '250 Guests', 'Lighting']
      },
      {
        name: 'Divine Mandap',
        price: '₹4,00,000',
        features: ['Luxury Mandap', 'Imported Flowers', 'Complete Theme', '400 Guests', 'Special Effects']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Arjun K',
        rating: 5,
        date: '2024-02-10',
        comment: 'Beautiful mandap! Perfect for our traditional wedding.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 6,
    name: 'Sacred Mandap Studio',
    businessName: 'Sacred Mandap Decoration',
    businessCategory: 'Mandap Decoration',
    eventType: 'Mandap Decoration',
    venueType: 'Mandap Decor',
    personName: 'Anjali Nair',
    designation: 'Mandap Designer',
    description: 'Creating sacred and beautiful mandap setups for traditional wedding ceremonies.',
    longDescription: 'Sacred Mandap Studio brings artistry and tradition together in every mandap we create. Our designs respect age-old customs while incorporating contemporary aesthetics. From intimate family weddings to grand celebrations, we design mandaps that become the heart of your wedding ceremony.',
    services: ['Wooden Mandaps', 'Floral Mandaps', 'Jeweled Mandaps', 'Traditional Themes', 'Complete Ceremony Decor'],
    logo: mandapdecor,
    location: 'Kochi, Kerala',
    rating: 4.8,
    totalReviews: 92,
    budgetRange: '₹35,000 - ₹3,50,000',
    experience: 9,
    capacity: '300 guests',
    amenities: ['Custom Woodwork', 'Fabric Collection', 'Fresh Flowers', 'Traditional Accessories'],
    established: 2015,
    teamSize: 14,
    businessType: 'Private Limited',
    hasTravelCharges: 'yes',
    serviceTypes: ['Mandap Decoration', 'Theme Design', 'Floral Arrangements', 'Traditional Setup'],
    eventsAllowed: ['Marriage', 'Engagement'],
    timeSlots: ['Morning', 'Evening'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: false,
    availableLocations: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
    contact: {
      phone: '+91 98765 43215',
      email: 'hello@sacredmandap.com',
      website: 'www.sacredmandap.com',
      address: '789 Mandap Avenue, Kochi - 682001'
    },
    whatsappNumber: '+919876543215',
    contactNumber: '+919876543215',
    socialMedia: {
      instagram: '@sacredmandap',
      facebook: '/sacredmandap'
    },
    portfolio: [
      { id: 1, image: mandapdecor, title: 'Wooden Mandap' },
      { id: 2, image: mandapdecor, title: 'Jeweled Mandap' },
      { id: 3, image: mandapdecor, title: 'Traditional Setup' }
    ],
    packages: [
      {
        name: 'Sacred Basic',
        price: '₹35,000',
        features: ['Basic Mandap', 'Floral Work', 'Traditional Setup', '100 Guests']
      },
      {
        name: 'Sacred Premium',
        price: '₹1,25,000',
        features: ['Premium Mandap', 'Extensive Flowers', 'Custom Design', '200 Guests']
      },
      {
        name: 'Sacred Royal',
        price: '₹3,50,000',
        features: ['Royal Mandap', 'Jeweled Elements', 'Complete Theme', '300 Guests', 'Lighting']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Deepa N',
        rating: 5,
        date: '2024-01-05',
        comment: 'Exquisite mandap! Truly sacred and beautiful.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Reception Decoration Vendors
  {
    id: 7,
    name: 'Reception Elegance',
    businessName: 'Reception Elegance Decoration',
    businessCategory: 'Reception Decoration',
    eventType: 'Reception Decoration',
    venueType: 'Reception Decor',
    personName: 'Rahul Verma',
    designation: 'Reception Decor Manager',
    description: 'Elegant reception decorations that create memorable party atmospheres.',
    longDescription: 'Reception Elegance specializes in creating stunning reception setups that wow your guests. From grand entrances to dance floors, we design every element to create a celebration atmosphere. Our team understands the flow of receptions and creates spaces that are both beautiful and functional.',
    services: ['Reception Entrance', 'Dance Floor Setup', 'Table Decorations', 'Bar Setup', 'Party Lighting'],
    logo: receptiondecor,
    location: 'Madurai, Tamil Nadu',
    rating: 4.7,
    totalReviews: 134,
    budgetRange: '₹30,000 - ₹3,00,000',
    experience: 7,
    capacity: '300 guests',
    amenities: ['Table Settings', 'Chair Covers', 'Centerpieces', 'Dance Floor', 'Lighting'],
    established: 2017,
    teamSize: 9,
    businessType: 'Individual',
    hasTravelCharges: 'yes',
    serviceTypes: ['Reception Decor', 'Lighting Setup', 'Event Styling', 'Table Design'],
    eventsAllowed: ['Reception', 'Engagement', 'Sangeet'],
    timeSlots: ['Evening', 'Night'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: true,
    availableLocations: ['Madurai', 'Dindigul', 'Theni'],
    contact: {
      phone: '+91 98765 43216',
      email: 'info@receptionelegance.com',
      website: 'www.receptionelegance.com',
      address: '123 Reception Street, Madurai - 625001'
    },
    whatsappNumber: '+919876543216',
    contactNumber: '+919876543216',
    socialMedia: {
      instagram: '@receptionelegance',
      facebook: '/receptionelegance'
    },
    portfolio: [
      { id: 1, image: receptiondecor, title: 'Reception Setup' },
      { id: 2, image: receptiondecor, title: 'Table Decor' },
      { id: 3, image: receptiondecor, title: 'Dance Floor' }
    ],
    packages: [
      {
        name: 'Elegance Basic',
        price: '₹30,000',
        features: ['Basic Reception Setup', 'Table Decorations', 'Simple Lighting', '150 Guests']
      },
      {
        name: 'Elegance Premium',
        price: '₹1,20,000',
        features: ['Premium Setup', 'Dance Floor', 'Party Lighting', '250 Guests', 'Bar Setup']
      },
      {
        name: 'Elegance Ultimate',
        price: '₹3,00,000',
        features: ['Luxury Setup', 'Full Production', 'Custom Design', '300 Guests', 'Photo Booth']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Vijay S',
        rating: 5,
        date: '2024-01-25',
        comment: 'Amazing reception setup! Everyone loved the decor.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 8,
    name: 'Celebration Reception',
    businessName: 'Celebration Reception Decoration',
    businessCategory: 'Reception Decoration',
    eventType: 'Reception Decoration',
    venueType: 'Reception Decor',
    personName: 'Meera Patel',
    designation: 'Party Decor Specialist',
    description: 'Creating celebration-ready reception spaces with vibrant and elegant decorations.',
    longDescription: 'Celebration Reception brings energy and style to your reception party. We specialize in creating vibrant, photo-worthy spaces that encourage celebration and create memories. From balloon installations to themed photo booths, we add fun elements to your elegant reception decor.',
    services: ['Balloon Decor', 'Photo Booth Setup', 'Cake Table Decor', 'Guest Seating', 'Themed Zones'],
    logo: receptiondecor,
    location: 'Ahmedabad, Gujarat',
    rating: 4.6,
    totalReviews: 78,
    budgetRange: '₹25,000 - ₹2,50,000',
    experience: 5,
    capacity: '250 guests',
    amenities: ['Balloon Arches', 'Photo Booths', 'Cake Tables', 'Seating Arrangements'],
    established: 2019,
    teamSize: 8,
    businessType: 'Partnership',
    hasTravelCharges: 'yes',
    serviceTypes: ['Reception Decor', 'Event Styling', 'Photo Booth Setup', 'Balloon Decor'],
    eventsAllowed: ['Reception', 'Engagement', 'Birthday Parties'],
    timeSlots: ['Evening', 'Night'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: true,
    availableLocations: ['Ahmedabad', 'Gandhinagar', 'Mehsana'],
    contact: {
      phone: '+91 98765 43217',
      email: 'hello@celebrationreception.com',
      website: 'www.celebrationreception.com',
      address: '456 Party Road, Ahmedabad - 380001'
    },
    whatsappNumber: '+919876543217',
    contactNumber: '+919876543217',
    socialMedia: {
      instagram: '@celebrationreception',
      facebook: '/celebrationreception'
    },
    portfolio: [
      { id: 1, image: receptiondecor, title: 'Balloon Decor' },
      { id: 2, image: receptiondecor, title: 'Photo Booth' },
      { id: 3, image: receptiondecor, title: 'Cake Table' }
    ],
    packages: [
      {
        name: 'Celebration Basic',
        price: '₹25,000',
        features: ['Basic Setup', 'Balloon Decor', 'Cake Table', '100 Guests']
      },
      {
        name: 'Celebration Premium',
        price: '₹1,00,000',
        features: ['Premium Setup', 'Photo Booth', 'Themed Zones', '200 Guests', 'Lighting']
      },
      {
        name: 'Celebration Ultimate',
        price: '₹2,50,000',
        features: ['Luxury Setup', 'Full Theming', 'Multiple Zones', '250 Guests', 'Entertainment']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Neha P',
        rating: 4.5,
        date: '2023-11-15',
        comment: 'Fun and vibrant decorations! Made our reception special.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Event Decoration Vendors
  {
    id: 9,
    name: 'Event Stylists',
    businessName: 'Event Stylists Decoration Services',
    businessCategory: 'Event Decoration',
    eventType: 'Event Decoration',
    venueType: 'Event Decor',
    personName: 'Aisha Khan',
    designation: 'Event Stylist',
    description: 'Comprehensive event decoration services for all types of celebrations and functions.',
    longDescription: 'Event Stylists is your one-stop solution for all event decoration needs. From intimate gatherings to large corporate events, we provide complete decoration services that transform spaces. Our versatile team handles weddings, corporate events, birthday parties, and special celebrations with equal passion and creativity.',
    services: ['Corporate Events', 'Birthday Parties', 'Anniversary Celebrations', 'Festival Decor', 'Special Events'],
    logo: eventdecor,
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    totalReviews: 167,
    budgetRange: '₹20,000 - ₹2,00,000',
    experience: 11,
    capacity: '500 guests',
    amenities: ['Theme Consultation', 'Props Library', 'Lighting Equipment', 'Fabric Collection'],
    established: 2013,
    teamSize: 18,
    businessType: 'Private Limited',
    hasTravelCharges: 'yes',
    serviceTypes: ['Event Styling', 'Theme Design', 'Lighting Setup', 'Corporate Events'],
    eventsAllowed: ['Corporate Events', 'Birthday Parties', 'Anniversary', 'Festivals'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: true,
    availableLocations: ['Mumbai', 'Thane', 'Navi Mumbai', 'Pune'],
    contact: {
      phone: '+91 98765 43218',
      email: 'info@eventstylists.com',
      website: 'www.eventstylists.com',
      address: '789 Event Street, Mumbai - 400001'
    },
    whatsappNumber: '+919876543218',
    contactNumber: '+919876543218',
    socialMedia: {
      instagram: '@eventstylists',
      facebook: '/eventstylists'
    },
    portfolio: [
      { id: 1, image: eventdecor, title: 'Corporate Event' },
      { id: 2, image: eventdecor, title: 'Birthday Party' },
      { id: 3, image: eventdecor, title: 'Anniversary Setup' }
    ],
    packages: [
      {
        name: 'Event Basic',
        price: '₹20,000',
        features: ['Basic Setup', 'Table Decor', 'Simple Lighting', '50-100 Guests']
      },
      {
        name: 'Event Premium',
        price: '₹80,000',
        features: ['Premium Setup', 'Theme Design', 'Lighting', '200-300 Guests', 'Props']
      },
      {
        name: 'Event Ultimate',
        price: '₹2,00,000',
        features: ['Luxury Setup', 'Complete Theming', 'Full Production', '500 Guests', 'Special Effects']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Zara M',
        rating: 5,
        date: '2024-02-05',
        comment: 'Versatile and creative! Perfect for our corporate gala.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 10,
    name: 'All Occasion Decor',
    businessName: 'All Occasion Decoration',
    businessCategory: 'Event Decoration',
    eventType: 'Event Decoration',
    venueType: 'Event Decor',
    personName: 'Kabir Malhotra',
    designation: 'Event Manager',
    description: 'Versatile decoration services for every type of event and celebration.',
    longDescription: 'All Occasion Decor believes every event deserves to be special. We provide comprehensive decoration services for all types of celebrations, adapting our style to match your vision. Whether it\'s a traditional ceremony or a modern party, we create beautiful environments that enhance your event experience.',
    services: ['Theme Events', 'Outdoor Events', 'Indoor Events', 'Seasonal Decor', 'Quick Transformations'],
    logo: eventdecor,
    location: 'Delhi, Delhi',
    rating: 4.8,
    totalReviews: 112,
    budgetRange: '₹15,000 - ₹1,50,000',
    experience: 8,
    capacity: '400 guests',
    amenities: ['Quick Setup', 'Portable Decor', 'Flexible Designs', 'Budget Options'],
    established: 2016,
    teamSize: 12,
    businessType: 'Proprietorship',
    hasTravelCharges: 'yes',
    serviceTypes: ['Event Styling', 'Theme Design', 'Outdoor Setup', 'Quick Setup'],
    eventsAllowed: ['All Events', 'Parties', 'Functions', 'Celebrations'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: true,
    availableLocations: ['Delhi', 'Noida', 'Gurugram', 'Faridabad'],
    contact: {
      phone: '+91 98765 43219',
      email: 'hello@alloccasiondecor.com',
      website: 'www.alloccasiondecor.com',
      address: '321 Event Road, Delhi - 110001'
    },
    whatsappNumber: '+919876543219',
    contactNumber: '+919876543219',
    socialMedia: {
      instagram: '@alloccasiondecor',
      facebook: '/alloccasiondecor'
    },
    portfolio: [
      { id: 1, image: eventdecor, title: 'Theme Event' },
      { id: 2, image: eventdecor, title: 'Outdoor Setup' },
      { id: 3, image: eventdecor, title: 'Quick Setup' }
    ],
    packages: [
      {
        name: 'Occasion Basic',
        price: '₹15,000',
        features: ['Basic Setup', 'Simple Decor', '100 Guests']
      },
      {
        name: 'Occasion Premium',
        price: '₹60,000',
        features: ['Premium Setup', 'Theme Design', 'Lighting', '250 Guests']
      },
      {
        name: 'Occasion Ultimate',
        price: '₹1,50,000',
        features: ['Luxury Setup', 'Complete Theming', 'Full Production', '400 Guests']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Rahul M',
        rating: 4.5,
        date: '2023-12-20',
        comment: 'Great service! Transformed our venue beautifully.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Floral Decoration Vendors
  {
    id: 11,
    name: 'Floral Artistry',
    businessName: 'Floral Artistry Decoration',
    businessCategory: 'Floral Decoration',
    eventType: 'Floral Decoration',
    venueType: 'Floral Decor',
    personName: 'Sanjay Gupta',
    designation: 'Floral Designer',
    description: 'Exquisite floral decorations using fresh and premium quality flowers.',
    longDescription: 'Floral Artistry brings the beauty of nature to your celebrations. As specialist floral decorators, we create stunning arrangements using the freshest flowers. From grand floral arches to delicate centerpieces, our designs add color, fragrance, and elegance to any event.',
    services: ['Fresh Flower Arrangements', 'Floral Arches', 'Flower Walls', 'Centerpieces', 'Bouquet Designs'],
    logo: floraldecor,
    location: 'Bangalore, Karnataka',
    rating: 4.7,
    totalReviews: 98,
    budgetRange: '₹25,000 - ₹3,00,000',
    experience: 13,
    capacity: '300 guests',
    amenities: ['Fresh Flowers', 'Preserved Flowers', 'Floral Foam', 'Design Tools'],
    established: 2011,
    teamSize: 10,
    businessType: 'Individual',
    hasTravelCharges: 'yes',
    serviceTypes: ['Floral Arrangements', 'Wedding Setup', 'Event Styling', 'Bouquets'],
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'All Events'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: true,
    availableLocations: ['Bangalore', 'Mysore', 'Electronic City'],
    contact: {
      phone: '+91 98765 43220',
      email: 'info@floralartistry.com',
      website: 'www.floralartistry.com',
      address: '456 Flower Street, Bangalore - 560001'
    },
    whatsappNumber: '+919876543220',
    contactNumber: '+919876543220',
    socialMedia: {
      instagram: '@floralartistry',
      facebook: '/floralartistry'
    },
    portfolio: [
      { id: 1, image: floraldecor, title: 'Floral Arch' },
      { id: 2, image: floraldecor, title: 'Flower Wall' },
      { id: 3, image: floraldecor, title: 'Centerpieces' }
    ],
    packages: [
      {
        name: 'Floral Basic',
        price: '₹25,000',
        features: ['Basic Floral Setup', 'Centerpieces', 'Bouquets', '100 Guests']
      },
      {
        name: 'Floral Premium',
        price: '₹1,20,000',
        features: ['Premium Flowers', 'Floral Arch', 'Flower Wall', '200 Guests', 'Arrangements']
      },
      {
        name: 'Floral Ultimate',
        price: '₹3,00,000',
        features: ['Luxury Flowers', 'Complete Floral Design', 'Imported Flowers', '300 Guests']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Lakshmi P',
        rating: 4.5,
        date: '2024-01-10',
        comment: 'Beautiful flowers! Added so much beauty to our event.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 12,
    name: 'Bloom & Petal',
    businessName: 'Bloom & Petal Floral Decor',
    businessCategory: 'Floral Decoration',
    eventType: 'Floral Decoration',
    venueType: 'Floral Decor',
    personName: 'Neha Joshi',
    designation: 'Floral Artist',
    description: 'Creating stunning floral decorations with artistic arrangements and premium blooms.',
    longDescription: 'Bloom & Petal is where flowers become art. Our floral artists create stunning arrangements that capture the essence of your celebration. Working with premium blooms, both local and imported, we design floral decorations that are fresh, fragrant, and absolutely beautiful.',
    services: ['Exotic Flower Arrangements', 'Seasonal Flowers', 'Floral Installations', 'Flower Crowns'],
    logo: floraldecor,
    location: 'Pune, Maharashtra',
    rating: 4.8,
    totalReviews: 82,
    budgetRange: '₹30,000 - ₹3,50,000',
    experience: 9,
    capacity: '400 guests',
    amenities: ['Exotic Flowers', 'Seasonal Selection', 'Floral Art', 'Fresh Arrangements'],
    established: 2015,
    teamSize: 12,
    businessType: 'Partnership',
    hasTravelCharges: 'yes',
    serviceTypes: ['Floral Arrangements', 'Wedding Setup', 'Event Styling', 'Floral Installations'],
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'All Events'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: true,
    availableLocations: ['Pune', 'Mumbai', 'Nashik'],
    contact: {
      phone: '+91 98765 43221',
      email: 'hello@bloomandpetal.com',
      website: 'www.bloomandpetal.com',
      address: '789 Petal Road, Pune - 411001'
    },
    whatsappNumber: '+919876543221',
    contactNumber: '+919876543221',
    socialMedia: {
      instagram: '@bloomandpetal',
      facebook: '/bloomandpetal'
    },
    portfolio: [
      { id: 1, image: floraldecor, title: 'Exotic Flowers' },
      { id: 2, image: floraldecor, title: 'Floral Installation' },
      { id: 3, image: floraldecor, title: 'Flower Crowns' }
    ],
    packages: [
      {
        name: 'Bloom Basic',
        price: '₹30,000',
        features: ['Basic Floral Setup', 'Seasonal Flowers', 'Arrangements', '150 Guests']
      },
      {
        name: 'Bloom Premium',
        price: '₹1,50,000',
        features: ['Premium Flowers', 'Floral Installations', 'Exotic Blooms', '250 Guests']
      },
      {
        name: 'Bloom Ultimate',
        price: '₹3,50,000',
        features: ['Luxury Flowers', 'Complete Floral Design', 'Imported Flowers', '400 Guests']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anita D',
        rating: 5,
        date: '2023-11-28',
        comment: 'Stunning floral arrangements! Truly artistic.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Theme-Based Decoration Vendors
  {
    id: 13,
    name: 'Theme Creators',
    businessName: 'Theme Creators Decoration Studio',
    businessCategory: 'Theme-Based Decoration',
    eventType: 'Theme-Based Decoration',
    venueType: 'Theme Decor',
    personName: 'Venkatesh Iyer',
    designation: 'Theme Designer',
    description: 'Complete theme-based decoration services that transform venues into magical spaces.',
    longDescription: 'Theme Creators brings stories to life through immersive themed decorations. We specialize in creating complete environments that transport your guests to another world. From beach themes to royal palaces, our team designs every detail to create a cohesive, magical experience.',
    services: ['Beach Themes', 'Garden Themes', 'Cultural Themes', 'Custom Themes', 'Immersive Design'],
    logo: themedecor,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 145,
    budgetRange: '₹50,000 - ₹5,00,000',
    experience: 15,
    capacity: '800 guests',
    amenities: ['Theme Library', 'Props Collection', 'Set Design', 'Custom Fabrication'],
    established: 2009,
    teamSize: 20,
    businessType: 'Private Limited',
    hasTravelCharges: 'yes',
    serviceTypes: ['Theme Design', 'Wedding Setup', 'Event Styling', 'Set Design'],
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'Corporate Events'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: true,
    availableLocations: ['Chennai', 'Bangalore', 'Coimbatore', 'Madurai'],
    contact: {
      phone: '+91 98765 43222',
      email: 'info@themecreators.com',
      website: 'www.themecreators.com',
      address: '123 Theme Street, Chennai - 600001'
    },
    whatsappNumber: '+919876543222',
    contactNumber: '+919876543222',
    socialMedia: {
      instagram: '@themecreators',
      facebook: '/themecreators'
    },
    portfolio: [
      { id: 1, image: themedecor, title: 'Beach Theme' },
      { id: 2, image: themedecor, title: 'Garden Theme' },
      { id: 3, image: themedecor, title: 'Cultural Theme' }
    ],
    packages: [
      {
        name: 'Theme Basic',
        price: '₹50,000',
        features: ['Basic Theme', 'Simple Props', 'Color Scheme', '150 Guests']
      },
      {
        name: 'Theme Premium',
        price: '₹2,00,000',
        features: ['Premium Theme', 'Full Props', 'Custom Elements', '400 Guests', 'Lighting']
      },
      {
        name: 'Theme Ultimate',
        price: '₹5,00,000',
        features: ['Luxury Theme', 'Complete Immersion', 'Custom Build', '800 Guests', 'Special Effects']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Ramesh N',
        rating: 5,
        date: '2024-01-30',
        comment: 'Incredible theme! Transformed our venue completely.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 14,
    name: 'Concept Decor',
    businessName: 'Concept Decoration Services',
    businessCategory: 'Theme-Based Decoration',
    eventType: 'Theme-Based Decoration',
    venueType: 'Theme Decor',
    personName: 'Radha Krishnan',
    designation: 'Concept Designer',
    description: 'Innovative concept-based decorations that tell your unique story.',
    longDescription: 'Concept Decor creates decorations that tell stories. We work closely with clients to understand their vision and translate it into beautiful, meaningful designs. From destination themes to fantasy worlds, our concepts are creative, unique, and perfectly executed.',
    services: ['Destination Themes', 'Color Themes', 'Era-based Themes', 'Fantasy Themes', 'Personalized Themes'],
    logo: themedecor,
    location: 'Kanyakumari, Tamil Nadu',
    rating: 4.8,
    totalReviews: 76,
    budgetRange: '₹45,000 - ₹4,50,000',
    experience: 12,
    capacity: '600 guests',
    amenities: ['Concept Development', 'Storytelling Design', 'Custom Props', 'Art Direction'],
    established: 2012,
    teamSize: 16,
    businessType: 'Proprietorship',
    hasTravelCharges: 'yes',
    serviceTypes: ['Theme Design', 'Wedding Setup', 'Stage Design', 'Concept Design'],
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'All Events'],
    timeSlots: ['Morning', 'Evening', 'Full Day'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: true,
    availableLocations: ['Kanyakumari', 'Tirunelveli', 'Nagercoil'],
    contact: {
      phone: '+91 98765 43223',
      email: 'hello@conceptdecor.com',
      website: 'www.conceptdecor.com',
      address: '456 Concept Road, Kanyakumari - 629001'
    },
    whatsappNumber: '+919876543223',
    contactNumber: '+919876543223',
    socialMedia: {
      instagram: '@conceptdecor',
      facebook: '/conceptdecor'
    },
    portfolio: [
      { id: 1, image: themedecor, title: 'Destination Theme' },
      { id: 2, image: themedecor, title: 'Color Theme' },
      { id: 3, image: themedecor, title: 'Fantasy Theme' }
    ],
    packages: [
      {
        name: 'Concept Basic',
        price: '₹45,000',
        features: ['Basic Concept', 'Theme Elements', 'Color Scheme', '200 Guests']
      },
      {
        name: 'Concept Premium',
        price: '₹1,80,000',
        features: ['Premium Concept', 'Custom Elements', 'Storytelling Design', '350 Guests']
      },
      {
        name: 'Concept Ultimate',
        price: '₹4,50,000',
        features: ['Luxury Concept', 'Complete Story', 'Custom Fabrication', '600 Guests']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Sundar P',
        rating: 4.5,
        date: '2023-12-12',
        comment: 'Unique concepts! Really brought our vision to life.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },

  // Lighting & Ambience Decoration Vendors
  {
    id: 15,
    name: 'Light Masters',
    businessName: 'Light Masters Decoration',
    businessCategory: 'Lighting & Ambience Decoration',
    eventType: 'Lighting & Ambience Decoration',
    venueType: 'Lighting Decor',
    personName: 'Pooja Mehta',
    designation: 'Lighting Designer',
    description: 'Creating magical ambience with professional lighting decoration services.',
    longDescription: 'Light Masters transforms events through the power of light. As specialist lighting designers, we create atmospheres that change the mood and feel of your space. From romantic fairy lights to dramatic color lighting, we use light to create magic.',
    services: ['LED Lighting', 'Fairy Lights', 'Spot Lighting', 'Color Lighting', 'Dance Floor Lighting'],
    logo: lightingdecor,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 89,
    budgetRange: '₹15,000 - ₹1,50,000',
    experience: 7,
    capacity: '500 guests',
    amenities: ['LED Equipment', 'Color Gels', 'DMX Controllers', 'Lighting Trusses'],
    established: 2017,
    teamSize: 6,
    businessType: 'Individual',
    hasTravelCharges: 'yes',
    serviceTypes: ['Lighting Setup', 'Event Styling', 'Ambience Design'],
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'All Events'],
    timeSlots: ['Evening', 'Night'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: true,
    availableLocations: ['Chennai', 'Kanchipuram', 'Chengalpattu'],
    contact: {
      phone: '+91 98765 43224',
      email: 'info@lightmasters.com',
      website: 'www.lightmasters.com',
      address: '123 Light Street, Chennai - 600001'
    },
    whatsappNumber: '+919876543224',
    contactNumber: '+919876543224',
    socialMedia: {
      instagram: '@lightmasters',
      facebook: '/lightmasters'
    },
    portfolio: [
      { id: 1, image: lightingdecor, title: 'LED Lighting' },
      { id: 2, image: lightingdecor, title: 'Fairy Lights' },
      { id: 3, image: lightingdecor, title: 'Color Lighting' }
    ],
    packages: [
      {
        name: 'Light Basic',
        price: '₹15,000',
        features: ['Basic Lighting', 'Fairy Lights', 'Simple Setup', '150 Guests']
      },
      {
        name: 'Light Premium',
        price: '₹60,000',
        features: ['Premium Lighting', 'LED Setup', 'Color Effects', '300 Guests']
      },
      {
        name: 'Light Ultimate',
        price: '₹1,50,000',
        features: ['Luxury Lighting', 'Full Production', 'DMX Control', '500 Guests', 'Special Effects']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Divya K',
        rating: 5,
        date: '2024-02-15',
        comment: 'Magical lighting! Transformed our reception completely.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 16,
    name: 'Ambience Experts',
    businessName: 'Ambience Experts Lighting',
    businessCategory: 'Lighting & Ambience Decoration',
    eventType: 'Lighting & Ambience Decoration',
    venueType: 'Lighting Decor',
    personName: 'David Wilson',
    designation: 'Ambience Specialist',
    description: 'Professional lighting and ambience decoration to create the perfect mood.',
    longDescription: 'Ambience Experts creates moods and feelings through professional lighting design. We understand that light affects emotion, and we use this knowledge to create the perfect atmosphere for your event. From romantic to dramatic, we design lighting that enhances your celebration.',
    services: ['Mood Lighting', 'Projection Mapping', 'Chandeliers', 'Outdoor Lighting', 'Smart Lighting'],
    logo: lightingdecor,
    location: 'Coimbatore, Tamil Nadu',
    rating: 4.7,
    totalReviews: 54,
    budgetRange: '₹20,000 - ₹2,00,000',
    experience: 5,
    capacity: '400 guests',
    amenities: ['Projection Equipment', 'Smart Systems', 'Chandeliers', 'Outdoor Fixtures'],
    established: 2019,
    teamSize: 8,
    businessType: 'Partnership',
    hasTravelCharges: 'yes',
    serviceTypes: ['Lighting Setup', 'Event Styling', 'Theme Design', 'Projection Mapping'],
    eventsAllowed: ['Marriage', 'Reception', 'Engagement', 'Corporate Events'],
    timeSlots: ['Evening', 'Night'],
    catering: ['Outside Catering Allowed'],
    decoration: 'In-house Decoration Only',
    soundAllowed: true,
    alcoholAllowed: true,
    availableLocations: ['Coimbatore', 'Tirupur', 'Ooty'],
    contact: {
      phone: '+91 98765 43225',
      email: 'hello@ambienceexperts.com',
      website: 'www.ambienceexperts.com',
      address: '789 Ambience Road, Coimbatore - 641001'
    },
    whatsappNumber: '+919876543225',
    contactNumber: '+919876543225',
    socialMedia: {
      instagram: '@ambienceexperts',
      facebook: '/ambienceexperts'
    },
    portfolio: [
      { id: 1, image: lightingdecor, title: 'Mood Lighting' },
      { id: 2, image: lightingdecor, title: 'Projection Mapping' },
      { id: 3, image: lightingdecor, title: 'Chandeliers' }
    ],
    packages: [
      {
        name: 'Ambience Basic',
        price: '₹20,000',
        features: ['Basic Lighting', 'Mood Setup', 'Simple Effects', '150 Guests']
      },
      {
        name: 'Ambience Premium',
        price: '₹80,000',
        features: ['Premium Lighting', 'Projection', 'Smart Control', '250 Guests']
      },
      {
        name: 'Ambience Ultimate',
        price: '₹2,00,000',
        features: ['Luxury Lighting', 'Full Production', 'Projection Mapping', '400 Guests']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Arun K',
        rating: 4.5,
        date: '2023-11-05',
        comment: 'Perfect ambience! Created exactly the mood we wanted.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  }
];