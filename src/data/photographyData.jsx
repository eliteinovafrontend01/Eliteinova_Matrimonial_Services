// Import assets
import album from '../assets/album.jpg';
import kids from '../assets/kids.jpg';
import videography from '../assets/videography.jpg';
import event from '../assets/event.jpg';
import weddingphoto from '../assets/weddingphoto.jpg';
import fashion from '../assets/fashion.jpg';
import commercial from '../assets/commercial.jpg';
import religious from '../assets/religious.jpg';

export const photographyVendors = [
  {
    id: 1,
    name: 'Capture Moments Studio',
    businessName: 'Capture Moments Wedding Photography',
    businessCategory: 'Wedding Photography',
    eventType: 'Wedding Photography',
    personName: 'Rajesh Kumar',
    designation: 'Lead Photographer',
    description: 'Specializing in candid wedding photography with 10+ years of experience',
    longDescription: 'Capture Moments Studio has been at the forefront of wedding photography for over a decade. We specialize in capturing the raw emotions, candid moments, and beautiful details of your special day. Our team of professional photographers uses state-of-the-art equipment and creative techniques to ensure your wedding memories are preserved forever.',
    services: ['Pre-wedding Shoots', 'Candid Photography', 'Traditional Wedding Coverage', 'Album Design'],
    logo: weddingphoto,
    location: 'Chennai, Tamil Nadu',
    rating: 4.8,
    totalReviews: 156,
    budgetRange: '₹50,000 - ₹2,00,000',
    experience: 10,
    businessType: 'Proprietorship',
    cameraModels: 'Canon EOS R5, Sony A7III',
    videoEquipment: 'DJI Ronin, Sony FX6',
    teamMembers: 8,
    hasBackup: 'yes',
    preferredLocations: ['Local', 'Within State'],
    hasTravelCharges: 'yes',
    availableLocations: ['Chennai', 'Coimbatore', 'Bangalore', 'Hyderabad'],
    photoDelivery: 45,
    videoDelivery: 60,
    albumDelivery: 75,
    selectedServices: ['Wedding Photography', 'Candid Photography', 'Pre-Wedding Shoot'],
    contact: {
      phone: '+91 98765 43210',
      email: 'contact@capturemoments.com',
      website: 'www.capturemoments.com',
      address: '123 Photography Street, Chennai - 600001'
    },
    whatsappNumber: '+919876543210',
    contactNumber: '+919876543210',
    socialMedia: {
      instagram: '@capturemoments',
      facebook: '/capturemoments',
      youtube: '@capturemoments'
    },
    portfolio: [
      { id: 1, image: weddingphoto, title: 'Wedding Ceremony' },
      { id: 2, image: event, title: 'Reception' },
      { id: 3, image: fashion, title: 'Pre-wedding Shoot' },
    ],
    packages: [
      {
        name: 'Silver Package',
        price: '₹50,000',
        features: ['4 Hours Coverage', '200 Edited Photos', 'Online Gallery', '1 Photographer']
      },
      {
        name: 'Gold Package',
        price: '₹1,00,000',
        features: ['8 Hours Coverage', '400 Edited Photos', 'Online Gallery', '2 Photographers', 'Pre-wedding Shoot']
      },
      {
        name: 'Platinum Package',
        price: '₹2,00,000',
        features: ['Full Day Coverage', '800+ Edited Photos', 'Online Gallery', '3 Photographers', 'Pre-wedding Shoot', 'Drone Coverage', 'Album']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Priya S',
        rating: 5,
        date: '2024-01-15',
        comment: 'Amazing work! Captured our wedding beautifully. Very professional team.',
        avatar: 'https://via.placeholder.com/50'
      },
      {
        id: 2,
        name: 'Rahul M',
        rating: 4.5,
        date: '2023-12-10',
        comment: 'Great attention to detail. Delivery was on time. Highly recommended!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 2,
    name: 'Evergreen Memories',
    businessName: 'Evergreen Wedding Photography',
    businessCategory: 'Wedding Photography',
    eventType: 'Wedding Photography',
    personName: 'Priya Sharma',
    designation: 'Creative Director',
    description: 'Documenting love stories with artistic vision and modern techniques',
    longDescription: 'Evergreen Memories is a team of passionate photographers who believe in telling love stories through art. With 8+ years of experience in destination weddings and modern photography techniques, we create timeless memories that last forever.',
    services: ['Destination Weddings', 'Drone Photography', 'Cinematic Videos', 'Photo Booths'],
    logo: weddingphoto,
    location: 'Coimbatore, Tamil Nadu',
    rating: 4.9,
    totalReviews: 203,
    budgetRange: '₹75,000 - ₹3,00,000',
    experience: 8,
    businessType: 'Private Limited',
    cameraModels: 'Nikon Z9, Fujifilm GFX',
    videoEquipment: 'DJI Mavic 3, Blackmagic URSA',
    teamMembers: 12,
    hasBackup: 'yes',
    preferredLocations: ['Outstation', 'International'],
    hasTravelCharges: 'yes',
    availableLocations: ['Coimbatore', 'Chennai', 'Bangalore', 'Mysore', 'Ooty', 'Kodaikanal'],
    photoDelivery: 30,
    videoDelivery: 45,
    albumDelivery: 60,
    selectedServices: ['Wedding Photography', 'Cinematic Wedding Film', 'Drone Coverage'],
    contact: {
      phone: '+91 98765 43211',
      email: 'info@evergreenmemories.com',
      website: 'www.evergreenmemories.com',
      address: '456 Photography Avenue, Coimbatore - 641001'
    },
    whatsappNumber: '+919876543211',
    contactNumber: '+919876543211',
    socialMedia: {
      instagram: '@evergreenmemories',
      facebook: '/evergreenmemories',
      youtube: '@evergreenmemories'
    },
    portfolio: [
      { id: 1, image: weddingphoto, title: 'Destination Wedding' },
      { id: 2, image: event, title: 'Reception' },
      { id: 3, image: fashion, title: 'Pre-wedding Shoot' }
    ],
    packages: [
      {
        name: 'Essential Package',
        price: '₹75,000',
        features: ['6 Hours Coverage', '300 Edited Photos', 'Online Gallery', '1 Photographer', '1 Videographer']
      },
      {
        name: 'Premium Package',
        price: '₹1,50,000',
        features: ['12 Hours Coverage', '600 Edited Photos', 'Online Gallery', '2 Photographers', '2 Videographers', 'Drone Coverage']
      },
      {
        name: 'Luxury Package',
        price: '₹3,00,000',
        features: ['Full Day Coverage', '1000+ Edited Photos', 'Cinematic Film', '3 Photographers', '3 Videographers', 'Drone Coverage', 'Premium Album']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anand K',
        rating: 5,
        date: '2024-02-01',
        comment: 'Absolutely stunning photography! They captured every moment perfectly.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 3,
    name: 'Event Masters Pro',
    businessName: 'Event Masters Photography',
    businessCategory: 'Event Photography',
    eventType: 'Event Photography',
    personName: 'Arun Mehta',
    designation: 'Event Photographer',
    description: 'Professional event coverage for corporate and social events',
    longDescription: 'Event Masters Pro specializes in capturing the essence of corporate events, conferences, and social gatherings. With 6+ years of experience, we ensure every important moment is documented professionally.',
    services: ['Corporate Events', 'Birthday Parties', 'Product Launches', 'Conferences'],
    logo: event,
    location: 'Bangalore, Karnataka',
    rating: 4.7,
    totalReviews: 89,
    budgetRange: '₹25,000 - ₹1,50,000',
    experience: 6,
    businessType: 'Individual',
    cameraModels: 'Sony A7IV, Canon 5D Mark IV',
    videoEquipment: 'DJI Osmo Pocket, GoPro',
    teamMembers: 4,
    hasBackup: 'yes',
    preferredLocations: ['Local', 'Within State'],
    hasTravelCharges: 'no',
    availableLocations: ['Bangalore', 'Mysore', 'Chennai', 'Hyderabad'],
    photoDelivery: 14,
    videoDelivery: 21,
    albumDelivery: 30,
    selectedServices: ['Event Photography', 'Videography'],
    contact: {
      phone: '+91 98765 43212',
      email: 'info@eventmasters.com',
      website: 'www.eventmasters.com',
      address: '789 Event Street, Bangalore - 560001'
    },
    whatsappNumber: '+919876543212',
    contactNumber: '+919876543212',
    socialMedia: {
      instagram: '@eventmasters',
      facebook: '/eventmasters',
      youtube: '@eventmasters'
    },
    portfolio: [
      { id: 1, image: event, title: 'Corporate Event' },
      { id: 2, image: event, title: 'Conference' },
      { id: 3, image: event, title: 'Conference' }
    ],
    packages: [
      {
        name: 'Basic Package',
        price: '₹25,000',
        features: ['3 Hours Coverage', '100 Edited Photos', 'Online Gallery', '1 Photographer']
      },
      {
        name: 'Standard Package',
        price: '₹75,000',
        features: ['6 Hours Coverage', '250 Edited Photos', 'Online Gallery', '1 Photographer', '1 Videographer']
      },
      {
        name: 'Premium Package',
        price: '₹1,50,000',
        features: ['Full Day Coverage', '500+ Edited Photos', 'Highlight Video', '2 Photographers', '1 Videographer']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Sunil R',
        rating: 5,
        date: '2024-01-20',
        comment: 'Excellent coverage of our annual conference. Very professional team.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 4,
    name: 'Celebration Shots',
    businessName: 'Celebration Photography Services',
    businessCategory: 'Event Photography',
    eventType: 'Event Photography',
    personName: 'Sneha Reddy',
    designation: 'Event Manager',
    description: 'Capturing the essence of every celebration with precision',
    longDescription: 'Celebration Shots is dedicated to capturing the joy and excitement of all your special celebrations. From birthday parties to anniversary events, we ensure every moment is preserved beautifully.',
    services: ['Anniversary Events', 'Festival Celebrations', 'Award Functions', 'Social Gatherings'],
    logo: event,
    location: 'Hyderabad, Telangana',
    rating: 4.6,
    totalReviews: 67,
    budgetRange: '₹20,000 - ₹1,00,000',
    experience: 5,
    businessType: 'Partnership',
    cameraModels: 'Canon EOS R6, Nikon D850',
    videoEquipment: 'DJI Ronin-S, Sony ZV-1',
    teamMembers: 6,
    hasBackup: 'yes',
    preferredLocations: ['Local'],
    hasTravelCharges: 'no',
    availableLocations: ['Hyderabad', 'Secunderabad', 'Warangal'],
    photoDelivery: 10,
    videoDelivery: 15,
    albumDelivery: 20,
    selectedServices: ['Event Photography'],
    contact: {
      phone: '+91 98765 43213',
      email: 'hello@celebrationshots.com',
      website: 'www.celebrationshots.com',
      address: '321 Celebration Road, Hyderabad - 500001'
    },
    whatsappNumber: '+919876543213',
    contactNumber: '+919876543213',
    socialMedia: {
      instagram: '@celebrationshots',
      facebook: '/celebrationshots'
    },
    portfolio: [
      { id: 1, image: event, title: 'Anniversary' },
      { id: 2, image: event, title: 'Birthday' },
      { id: 3, image: event, title: 'Birthday' }
    ],
    packages: [
      {
        name: 'Silver Package',
        price: '₹20,000',
        features: ['2 Hours Coverage', '75 Edited Photos', 'Online Gallery']
      },
      {
        name: 'Gold Package',
        price: '₹50,000',
        features: ['4 Hours Coverage', '150 Edited Photos', 'Online Gallery', '1 Videographer']
      },
      {
        name: 'Platinum Package',
        price: '₹1,00,000',
        features: ['6 Hours Coverage', '300 Edited Photos', 'Highlight Video', '2 Photographers']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Kavita M',
        rating: 4.5,
        date: '2023-12-05',
        comment: 'Great work for our anniversary celebration!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 5,
    name: 'Motion Picture Studio',
    businessName: 'Motion Picture Videography',
    businessCategory: 'Videography',
    eventType: 'Videography',
    personName: 'Vikram Singh',
    designation: 'Videography Director',
    description: 'Creating cinematic wedding films and corporate videos',
    longDescription: 'Motion Picture Studio specializes in cinematic storytelling through video. With 12+ years of experience in wedding films and corporate videos, we create compelling visual narratives that resonate with audiences.',
    services: ['Wedding Films', 'Corporate Videos', 'Documentaries', 'Promotional Videos'],
    logo: videography,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 178,
    budgetRange: '₹1,00,000 - ₹5,00,000',
    experience: 12,
    businessType: 'Private Limited',
    cameraModels: 'RED Komodo, Sony FX9',
    videoEquipment: 'DJI Inspire 2, Arri Alexa',
    teamMembers: 15,
    hasBackup: 'yes',
    preferredLocations: ['Outstation', 'International'],
    hasTravelCharges: 'yes',
    availableLocations: ['Chennai', 'Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Kochi'],
    photoDelivery: 60,
    videoDelivery: 90,
    albumDelivery: 120,
    selectedServices: ['Videography', 'Cinematic Wedding Film', 'Drone Coverage'],
    contact: {
      phone: '+91 98765 43214',
      email: 'info@motionpicture.com',
      website: 'www.motionpicture.com',
      address: '456 Film Nagar, Chennai - 600001'
    },
    whatsappNumber: '+919876543214',
    contactNumber: '+919876543214',
    socialMedia: {
      instagram: '@motionpicture',
      facebook: '/motionpicture',
      youtube: '@motionpicture'
    },
    portfolio: [
      { id: 1, image: videography, title: 'Wedding Film' },
      { id: 2, image: videography, title: 'Corporate Video' },
      { id: 3, image: videography, title: 'Corporate Video' }
    ],
    packages: [
      {
        name: 'Silver Film',
        price: '₹1,00,000',
        features: ['4 Hours Coverage', '3-5 Min Highlight Film', 'Full Ceremony Video', '1 Videographer']
      },
      {
        name: 'Gold Film',
        price: '₹2,50,000',
        features: ['8 Hours Coverage', '5-8 Min Cinematic Film', 'Full Ceremony Video', 'Drone Shots', '2 Videographers']
      },
      {
        name: 'Platinum Film',
        price: '₹5,00,000',
        features: ['Full Day Coverage', '10-15 Min Feature Film', 'Full Ceremony Video', 'Drone Coverage', 'Pre-wedding Film', '3 Videographers']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Arjun K',
        rating: 5,
        date: '2024-02-10',
        comment: 'The wedding film they created was absolutely magical!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 6,
    name: 'Visual Storytellers',
    businessName: 'Visual Storytellers Studio',
    businessCategory: 'Videography',
    eventType: 'Videography',
    personName: 'Anjali Nair',
    designation: 'Creative Producer',
    description: 'Story-driven video production for memorable occasions',
    longDescription: 'Visual Storytellers believes in the power of visual narratives. We create engaging video content that tells your unique story, whether it\'s a wedding, corporate event, or creative project.',
    services: ['Short Films', 'Event Coverage', 'Music Videos', 'Animation Videos'],
    logo: videography,
    location: 'Kochi, Kerala',
    rating: 4.8,
    totalReviews: 92,
    budgetRange: '₹80,000 - ₹4,00,000',
    experience: 7,
    businessType: 'Proprietorship',
    cameraModels: 'Blackmagic Pocket 6K, Sony FS7',
    videoEquipment: 'DJI Mavic Pro, Zhiyun Crane',
    teamMembers: 8,
    hasBackup: 'yes',
    preferredLocations: ['Within State', 'Outstation'],
    hasTravelCharges: 'yes',
    availableLocations: ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Chennai', 'Bangalore'],
    photoDelivery: 30,
    videoDelivery: 45,
    albumDelivery: 60,
    selectedServices: ['Videography', 'Cinematic Wedding Film'],
    contact: {
      phone: '+91 98765 43215',
      email: 'hello@visualstorytellers.com',
      website: 'www.visualstorytellers.com',
      address: '789 Creative Street, Kochi - 682001'
    },
    whatsappNumber: '+919876543215',
    contactNumber: '+919876543215',
    socialMedia: {
      instagram: '@visualstorytellers',
      facebook: '/visualstorytellers'
    },
    portfolio: [
      { id: 1, image: videography, title: 'Short Film' },
      { id: 2, image: videography, title: 'Music Video' },
      { id: 3, image: videography, title: 'Music Video' }
    ],
    packages: [
      {
        name: 'Basic Package',
        price: '₹80,000',
        features: ['3 Hours Coverage', '3-5 Min Video', 'Online Gallery', '1 Videographer']
      },
      {
        name: 'Premium Package',
        price: '₹2,00,000',
        features: ['6 Hours Coverage', '5-8 Min Cinematic Video', 'Drone Shots', '2 Videographers']
      },
      {
        name: 'Ultimate Package',
        price: '₹4,00,000',
        features: ['Full Day Coverage', '10-15 Min Feature', 'Drone Coverage', 'Behind the Scenes', '3 Videographers']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Deepa N',
        rating: 5,
        date: '2024-01-05',
        comment: 'They captured our wedding story beautifully!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 7,
    name: 'Pixel Perfect Editing',
    businessName: 'Pixel Perfect Photo Studio',
    businessCategory: 'Editing & Album Services',
    eventType: 'Editing & Album Services',
    personName: 'Rahul Verma',
    designation: 'Photo Editor',
    description: 'Professional photo editing and custom album design services',
    longDescription: 'Pixel Perfect Editing specializes in transforming your photos into works of art. From basic retouching to complex album designs, we ensure your memories are presented beautifully.',
    services: ['Photo Retouching', 'Album Design', 'Photo Restoration', 'Digital Artwork'],
    logo: album,
    location: 'Madurai, Tamil Nadu',
    rating: 4.7,
    totalReviews: 134,
    budgetRange: '₹10,000 - ₹50,000',
    experience: 9,
    businessType: 'Individual',
    cameraModels: 'N/A',
    videoEquipment: 'N/A',
    teamMembers: 3,
    hasBackup: 'yes',
    preferredLocations: ['Local'],
    hasTravelCharges: 'no',
    availableLocations: ['Madurai', 'Chennai', 'Coimbatore', 'Tirunelveli'],
    photoDelivery: 7,
    videoDelivery: 'N/A',
    albumDelivery: 14,
    selectedServices: ['Editing & Album Services'],
    contact: {
      phone: '+91 98765 43216',
      email: 'info@pixelperfect.com',
      website: 'www.pixelperfect.com',
      address: '123 Editing Lane, Madurai - 625001'
    },
    whatsappNumber: '+919876543216',
    contactNumber: '+919876543216',
    socialMedia: {
      instagram: '@pixelperfect',
      facebook: '/pixelperfect'
    },
    portfolio: [
      { id: 1, image: album, title: 'Wedding Album' },
      { id: 2, image: album, title: 'Photo Restoration' },
      { id: 3, image: album, title: 'Photo Restoration' }
    ],
    packages: [
      {
        name: 'Basic Editing',
        price: '₹10,000',
        features: ['50 Photos Retouched', 'Basic Color Correction', 'Digital Delivery']
      },
      {
        name: 'Premium Album',
        price: '₹30,000',
        features: ['100 Photos Retouched', '20 Page Album Design', 'Print Ready Files']
      },
      {
        name: 'Ultimate Package',
        price: '₹50,000',
        features: ['200 Photos Retouched', '40 Page Premium Album', 'Photo Restoration (10)', 'Digital Artwork']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Vijay S',
        rating: 5,
        date: '2024-01-25',
        comment: 'The album they designed for our wedding is stunning!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 8,
    name: 'Memory Albums',
    businessName: 'Memory Album Creators',
    businessCategory: 'Editing & Album Services',
    eventType: 'Editing & Album Services',
    personName: 'Meera Patel',
    designation: 'Album Designer',
    description: 'Creating beautiful photo albums that tell your story',
    longDescription: 'Memory Albums specializes in creating heirloom-quality photo albums that preserve your precious moments. With attention to detail and artistic design, we turn your photos into beautiful keepsakes.',
    services: ['Custom Albums', 'Photo Books', 'Digital Albums', 'Coffee Table Books'],
    logo: album,
    location: 'Ahmedabad, Gujarat',
    rating: 4.6,
    totalReviews: 78,
    budgetRange: '₹15,000 - ₹75,000',
    experience: 6,
    businessType: 'Partnership',
    cameraModels: 'N/A',
    videoEquipment: 'N/A',
    teamMembers: 5,
    hasBackup: 'yes',
    preferredLocations: ['Local', 'Within State'],
    hasTravelCharges: 'yes',
    availableLocations: ['Ahmedabad', 'Gandhinagar', 'Surat', 'Vadodara'],
    photoDelivery: 10,
    videoDelivery: 'N/A',
    albumDelivery: 20,
    selectedServices: ['Editing & Album Services'],
    contact: {
      phone: '+91 98765 43217',
      email: 'hello@memoryalbums.com',
      website: 'www.memoryalbums.com',
      address: '456 Album Street, Ahmedabad - 380001'
    },
    whatsappNumber: '+919876543217',
    contactNumber: '+919876543217',
    socialMedia: {
      instagram: '@memoryalbums',
      facebook: '/memoryalbums'
    },
    portfolio: [
      { id: 1, image: album, title: 'Coffee Table Book' },
      { id: 2, image: album, title: 'Custom Album' },
      { id: 3, image: album, title: 'Custom Album' }
    ],
    packages: [
      {
        name: 'Standard Album',
        price: '₹15,000',
        features: ['20 Pages', '50 Photos', 'Hard Cover', 'Digital Copy']
      },
      {
        name: 'Deluxe Album',
        price: '₹35,000',
        features: ['40 Pages', '100 Photos', 'Leather Cover', 'Digital Copy', 'Presentation Box']
      },
      {
        name: 'Premium Book',
        price: '₹75,000',
        features: ['60 Pages', '150 Photos', 'Premium Leather', 'Digital Copy', 'Display Stand', '2 Copies']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Neha P',
        rating: 4.5,
        date: '2023-11-15',
        comment: 'Beautiful album quality and design!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 9,
    name: 'Style Frame Studio',
    businessName: 'Style Frame Fashion Photography',
    businessCategory: 'Fashion & Lifestyle',
    eventType: 'Fashion & Lifestyle',
    personName: 'Aisha Khan',
    designation: 'Fashion Photographer',
    description: 'Specializing in fashion editorial and lifestyle photography',
    longDescription: 'Style Frame Studio brings fashion visions to life through stunning editorial photography. With 11+ years of experience in the fashion industry, we create compelling images for brands, designers, and models.',
    services: ['Fashion Shoots', 'Portfolio Photography', 'Lookbook Creation', 'Model Portfolios'],
    logo: fashion,
    location: 'Mumbai, Maharashtra',
    rating: 4.9,
    totalReviews: 167,
    budgetRange: '₹50,000 - ₹3,00,000',
    experience: 11,
    businessType: 'Private Limited',
    cameraModels: 'Hasselblad H6D, Canon EOS R5',
    videoEquipment: 'DJI Ronin 2, Sony FX6',
    teamMembers: 10,
    hasBackup: 'yes',
    preferredLocations: ['Outstation', 'International'],
    hasTravelCharges: 'yes',
    availableLocations: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad'],
    photoDelivery: 21,
    videoDelivery: 30,
    albumDelivery: 45,
    selectedServices: ['Fashion & Lifestyle', 'Candid Photography'],
    contact: {
      phone: '+91 98765 43218',
      email: 'studio@styleframe.com',
      website: 'www.styleframe.com',
      address: '789 Fashion Avenue, Mumbai - 400001'
    },
    whatsappNumber: '+919876543218',
    contactNumber: '+919876543218',
    socialMedia: {
      instagram: '@styleframestudio',
      facebook: '/styleframe',
      youtube: '@styleframe'
    },
    portfolio: [
      { id: 1, image: fashion, title: 'Editorial Shoot' },
      { id: 2, image: fashion, title: 'Lookbook' },
      { id: 3, image: fashion, title: 'Lookbook' }
    ],
    packages: [
      {
        name: 'Portfolio Package',
        price: '₹50,000',
        features: ['2 Looks', '20 Edited Photos', 'Hair & Makeup', 'Studio Rental']
      },
      {
        name: 'Lookbook Package',
        price: '₹1,50,000',
        features: ['5 Looks', '50 Edited Photos', 'Location Shoot', 'Styling', 'Hair & Makeup']
      },
      {
        name: 'Campaign Package',
        price: '₹3,00,000',
        features: ['10 Looks', '100 Edited Photos', 'Video Content', 'Multiple Locations', 'Full Team', 'Usage Rights']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Zara M',
        rating: 5,
        date: '2024-02-05',
        comment: 'Amazing work! They created stunning images for my portfolio.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 10,
    name: 'Urban Lifestyle',
    businessName: 'Urban Lifestyle Photography',
    businessCategory: 'Fashion & Lifestyle',
    eventType: 'Fashion & Lifestyle',
    personName: 'Kabir Malhotra',
    designation: 'Creative Director',
    description: 'Contemporary lifestyle and urban photography',
    longDescription: 'Urban Lifestyle captures the essence of modern living through contemporary photography. We specialize in lifestyle brands, street photography, and personal branding for the urban audience.',
    services: ['Street Photography', 'Lifestyle Brands', 'E-commerce Photography', 'Personal Branding'],
    logo: fashion,
    location: 'Delhi, Delhi',
    rating: 4.8,
    totalReviews: 112,
    budgetRange: '₹40,000 - ₹2,50,000',
    experience: 8,
    businessType: 'Proprietorship',
    cameraModels: 'Fujifilm X-T4, Sony A7RIV',
    videoEquipment: 'DJI RS2, Sony ZV-E1',
    teamMembers: 7,
    hasBackup: 'yes',
    preferredLocations: ['Within State', 'Outstation'],
    hasTravelCharges: 'yes',
    availableLocations: ['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad'],
    photoDelivery: 14,
    videoDelivery: 21,
    albumDelivery: 30,
    selectedServices: ['Fashion & Lifestyle'],
    contact: {
      phone: '+91 98765 43219',
      email: 'hello@urbanlifestyle.com',
      website: 'www.urbanlifestyle.com',
      address: '123 Lifestyle Street, Delhi - 110001'
    },
    whatsappNumber: '+919876543219',
    contactNumber: '+919876543219',
    socialMedia: {
      instagram: '@urbanlifestyle',
      facebook: '/urbanlifestyle'
    },
    portfolio: [
      { id: 1, image: fashion, title: 'Street Photography' },
      { id: 2, image: fashion, title: 'Lifestyle Shoot' },
      { id: 3, image: fashion, title: 'Lifestyle Shoot' }
    ],
    packages: [
      {
        name: 'Basic Shoot',
        price: '₹40,000',
        features: ['2 Hours', '30 Edited Photos', 'Online Gallery', '1 Photographer']
      },
      {
        name: 'Professional Shoot',
        price: '₹1,20,000',
        features: ['4 Hours', '75 Edited Photos', 'Online Gallery', '1 Photographer', 'Styling']
      },
      {
        name: 'Premium Campaign',
        price: '₹2,50,000',
        features: ['Full Day', '150 Edited Photos', 'Video Content', '2 Photographers', 'Full Production Team']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Rohan M',
        rating: 4.8,
        date: '2024-01-12',
        comment: 'Great work for my personal branding shoot!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 11,
    name: 'Business Lens',
    businessName: 'Business Lens Commercial Photography',
    businessCategory: 'Commercial Photography',
    eventType: 'Commercial Photography',
    personName: 'Sanjay Gupta',
    designation: 'Commercial Photographer',
    description: 'Professional commercial photography for businesses',
    longDescription: 'Business Lens specializes in high-quality commercial photography for businesses of all sizes. From product shots to corporate headshots, we deliver images that help your brand stand out.',
    services: ['Product Photography', 'Architecture', 'Food Photography', 'Corporate Headshots'],
    logo: commercial,
    location: 'Bangalore, Karnataka',
    rating: 4.7,
    totalReviews: 98,
    budgetRange: '₹30,000 - ₹2,00,000',
    experience: 13,
    businessType: 'Private Limited',
    cameraModels: 'Phase One IQ4, Canon 1DX Mark III',
    videoEquipment: 'DJI Mavic 3, Sony FS7',
    teamMembers: 12,
    hasBackup: 'yes',
    preferredLocations: ['Within State', 'Outstation'],
    hasTravelCharges: 'yes',
    availableLocations: ['Bangalore', 'Mysore', 'Chennai', 'Hyderabad', 'Mumbai'],
    photoDelivery: 10,
    videoDelivery: 15,
    albumDelivery: 20,
    selectedServices: ['Commercial Photography'],
    contact: {
      phone: '+91 98765 43220',
      email: 'info@businesslens.com',
      website: 'www.businesslens.com',
      address: '456 Commercial Street, Bangalore - 560001'
    },
    whatsappNumber: '+919876543220',
    contactNumber: '+919876543220',
    socialMedia: {
      instagram: '@businesslens',
      facebook: '/businesslens',
      linkedin: '/company/businesslens'
    },
    portfolio: [
      { id: 1, image: commercial, title: 'Product Shoot' },
      { id: 2, image: commercial, title: 'Corporate Headshots' },
      { id: 3, image: commercial, title: 'Corporate Headshots' }
    ],
    packages: [
      {
        name: 'Product Package',
        price: '₹30,000',
        features: ['20 Product Shots', 'Basic Editing', 'Digital Delivery', 'Usage Rights']
      },
      {
        name: 'Corporate Package',
        price: '₹80,000',
        features: ['50 Headshots', 'Location Shoot', 'Edited Photos', 'Online Gallery']
      },
      {
        name: 'Full Campaign',
        price: '₹2,00,000',
        features: ['100+ Product Shots', 'Location Shoots', 'Video Content', 'Full Production Team', 'All Rights']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anita S',
        rating: 4.7,
        date: '2024-01-18',
        comment: 'Excellent product photography for our e-commerce site.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 12,
    name: 'Brand Visuals',
    businessName: 'Brand Visuals Studio',
    businessCategory: 'Commercial Photography',
    eventType: 'Commercial Photography',
    personName: 'Neha Joshi',
    designation: 'Brand Photographer',
    description: 'Creating compelling visual content for brands',
    longDescription: 'Brand Visuals Studio helps businesses tell their story through powerful imagery. We specialize in brand campaigns, advertising photography, and corporate events that capture the essence of your brand.',
    services: ['Brand Campaigns', 'Advertising Photography', 'Packaging Shots', 'Corporate Events'],
    logo: commercial,
    location: 'Pune, Maharashtra',
    rating: 4.8,
    totalReviews: 87,
    budgetRange: '₹50,000 - ₹3,00,000',
    experience: 9,
    businessType: 'Partnership',
    cameraModels: 'Sony A9II, Canon EOS R3',
    videoEquipment: 'DJI Inspire 2, Blackmagic Pocket',
    teamMembers: 9,
    hasBackup: 'yes',
    preferredLocations: ['Within State', 'Outstation'],
    hasTravelCharges: 'yes',
    availableLocations: ['Pune', 'Mumbai', 'Nashik', 'Nagpur', 'Aurangabad'],
    photoDelivery: 14,
    videoDelivery: 21,
    albumDelivery: 28,
    selectedServices: ['Commercial Photography'],
    contact: {
      phone: '+91 98765 43221',
      email: 'studio@brandvisuals.com',
      website: 'www.brandvisuals.com',
      address: '789 Brand Avenue, Pune - 411001'
    },
    whatsappNumber: '+919876543221',
    contactNumber: '+919876543221',
    socialMedia: {
      instagram: '@brandvisuals',
      facebook: '/brandvisuals',
      youtube: '@brandvisuals'
    },
    portfolio: [
      { id: 1, image: commercial, title: 'Brand Campaign' },
      { id: 2, image: commercial, title: 'Packaging' },
      { id: 3, image: commercial, title: 'Packaging' }
    ],
    packages: [
      {
        name: 'Starter Campaign',
        price: '₹50,000',
        features: ['10 Final Images', 'Basic Editing', 'Digital Delivery', 'Social Media Rights']
      },
      {
        name: 'Professional Campaign',
        price: '₹1,50,000',
        features: ['30 Final Images', 'Location Shoot', 'Professional Editing', 'Full Usage Rights']
      },
      {
        name: 'Premium Campaign',
        price: '₹3,00,000',
        features: ['50+ Final Images', 'Video Content', 'Multiple Locations', 'Full Team', 'All Rights']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Karan M',
        rating: 5,
        date: '2024-02-08',
        comment: 'They understood our brand perfectly and delivered amazing visuals!',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 13,
    name: 'Cultural Heritage',
    businessName: 'Cultural Heritage Photography',
    businessCategory: 'Religious & Cultural',
    eventType: 'Religious & Cultural Photography',
    personName: 'Venkatesh Iyer',
    designation: 'Cultural Photographer',
    description: 'Documenting religious ceremonies and cultural events',
    longDescription: 'Cultural Heritage Photography specializes in documenting religious ceremonies and cultural events with respect and authenticity. With 15+ years of experience, we understand the significance of every ritual and tradition.',
    services: ['Temple Festivals', 'Religious Ceremonies', 'Cultural Events', 'Traditional Rituals'],
    logo: religious,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 145,
    budgetRange: '₹25,000 - ₹1,50,000',
    experience: 15,
    businessType: 'Individual',
    cameraModels: 'Nikon D850, Canon EOS R',
    videoEquipment: 'DJI Osmo Pocket, Sony A6400',
    teamMembers: 4,
    hasBackup: 'yes',
    preferredLocations: ['Local', 'Within State'],
    hasTravelCharges: 'no',
    availableLocations: ['Chennai', 'Kanchipuram', 'Mahabalipuram', 'Tiruvannamalai', 'Vellore'],
    photoDelivery: 21,
    videoDelivery: 30,
    albumDelivery: 45,
    selectedServices: ['Religious & Cultural Photography'],
    contact: {
      phone: '+91 98765 43222',
      email: 'info@culturalheritage.com',
      website: 'www.culturalheritage.com',
      address: '123 Temple Road, Chennai - 600001'
    },
    whatsappNumber: '+919876543222',
    contactNumber: '+919876543222',
    socialMedia: {
      instagram: '@culturalheritage',
      facebook: '/culturalheritage'
    },
    portfolio: [
      { id: 1, image: religious, title: 'Temple Festival' },
      { id: 2, image: religious, title: 'Religious Ceremony' },
      { id: 3, image: religious, title: 'Religious Ceremony' }
    ],
    packages: [
      {
        name: 'Ceremony Package',
        price: '₹25,000',
        features: ['3 Hours Coverage', '100 Edited Photos', 'Online Gallery', '1 Photographer']
      },
      {
        name: 'Festival Package',
        price: '₹75,000',
        features: ['Full Day Coverage', '300 Edited Photos', 'Highlight Video', '2 Photographers']
      },
      {
        name: 'Complete Documentation',
        price: '₹1,50,000',
        features: ['Multi-Day Coverage', '500+ Photos', 'Full Video Documentation', 'Premium Album', '3 Photographers']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Lakshmi N',
        rating: 5,
        date: '2024-01-30',
        comment: 'They captured our temple festival beautifully with great respect for traditions.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 14,
    name: 'Divine Moments',
    businessName: 'Divine Moments Photography',
    businessCategory: 'Religious & Cultural',
    eventType: 'Religious & Cultural Photography',
    personName: 'Radha Krishnan',
    designation: 'Religious Event Specialist',
    description: 'Specializing in religious event photography with respect and devotion',
    longDescription: 'Divine Moments Photography is dedicated to capturing the spiritual essence of religious events. With 12+ years of experience, we ensure every sacred moment is preserved with the reverence it deserves.',
    services: ['Pujas', 'Religious Processions', 'Temple Events', 'Spiritual Gatherings'],
    logo: religious,
    location: 'Kanyakumari, Tamil Nadu',
    rating: 4.8,
    totalReviews: 112,
    budgetRange: '₹20,000 - ₹1,00,000',
    experience: 12,
    businessType: 'Proprietorship',
    cameraModels: 'Canon 90D, Sony A7III',
    videoEquipment: 'DJI Mavic Air, Panasonic GH5',
    teamMembers: 5,
    hasBackup: 'yes',
    preferredLocations: ['Local', 'Within State'],
    hasTravelCharges: 'no',
    availableLocations: ['Kanyakumari', 'Nagercoil', 'Tirunelveli', 'Thoothukudi', 'Madurai'],
    photoDelivery: 14,
    videoDelivery: 21,
    albumDelivery: 30,
    selectedServices: ['Religious & Cultural Photography'],
    contact: {
      phone: '+91 98765 43223',
      email: 'contact@divinemoments.com',
      website: 'www.divinemoments.com',
      address: '456 Temple Street, Kanyakumari - 629001'
    },
    whatsappNumber: '+919876543223',
    contactNumber: '+919876543223',
    socialMedia: {
      instagram: '@divinemoments',
      facebook: '/divinemoments'
    },
    portfolio: [
      { id: 1, image: religious, title: 'Puja Ceremony' },
      { id: 2, image: religious, title: 'Religious Procession' },
      { id: 3, image: religious, title: 'Religious Procession' }
    ],
    packages: [
      {
        name: 'Puja Package',
        price: '₹20,000',
        features: ['2 Hours Coverage', '75 Edited Photos', 'Online Gallery', '1 Photographer']
      },
      {
        name: 'Temple Package',
        price: '₹50,000',
        features: ['4 Hours Coverage', '150 Edited Photos', 'Short Video', '1 Photographer', '1 Videographer']
      },
      {
        name: 'Festival Package',
        price: '₹1,00,000',
        features: ['Full Day Coverage', '300+ Photos', 'Full Video', '2 Photographers', '1 Videographer']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Sundar R',
        rating: 4.8,
        date: '2023-12-20',
        comment: 'Beautiful coverage of our family puja. Very professional and respectful.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 15,
    name: 'Little Angels',
    businessName: 'Little Angels Photography',
    businessCategory: 'Kids & Special Shoots',
    eventType: 'Kids & Special Shoots',
    personName: 'Pooja Mehta',
    designation: 'Children Photographer',
    description: 'Creating magical memories for children and families',
    longDescription: 'Little Angels Photography specializes in capturing the innocence and joy of childhood. From newborn sessions to birthday parties, we create magical memories that families will treasure forever.',
    services: ['Newborn Photography', 'Birthday Shoots', 'Family Portraits', 'Baby Showers'],
    logo: kids,
    location: 'Chennai, Tamil Nadu',
    rating: 4.9,
    totalReviews: 178,
    budgetRange: '₹15,000 - ₹80,000',
    experience: 7,
    businessType: 'Individual',
    cameraModels: 'Canon EOS R6, Sony A7C',
    videoEquipment: 'DJI Osmo Pocket, iPhone 14 Pro',
    teamMembers: 3,
    hasBackup: 'yes',
    preferredLocations: ['Local'],
    hasTravelCharges: 'no',
    availableLocations: ['Chennai', 'Coimbatore', 'Bangalore'],
    photoDelivery: 10,
    videoDelivery: 14,
    albumDelivery: 21,
    selectedServices: ['Kids & Special Shoots'],
    contact: {
      phone: '+91 98765 43224',
      email: 'hello@littleangels.com',
      website: 'www.littleangels.com',
      address: '789 Kids Street, Chennai - 600001'
    },
    whatsappNumber: '+919876543224',
    contactNumber: '+919876543224',
    socialMedia: {
      instagram: '@littleangels',
      facebook: '/littleangels'
    },
    portfolio: [
      { id: 1, image: kids, title: 'Newborn Session' },
      { id: 2, image: kids, title: 'Birthday Party' },
      { id: 3, image: kids, title: 'Family Portrait' }
    ],
    packages: [
      {
        name: 'Newborn Package',
        price: '₹15,000',
        features: ['2-3 Hour Session', '25 Edited Photos', 'Online Gallery', 'Digital Prints']
      },
      {
        name: 'Birthday Package',
        price: '₹35,000',
        features: ['3 Hours Coverage', '75 Edited Photos', 'Highlight Video', '1 Photographer']
      },
      {
        name: 'Family Package',
        price: '₹80,000',
        features: ['Full Day Session', '150+ Photos', 'Photo Album', 'Video Highlights', '2 Photographers']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Anita K',
        rating: 5,
        date: '2024-02-15',
        comment: 'Pooja is amazing with kids! She captured my daughter\'s first birthday perfectly.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  },
  {
    id: 16,
    name: 'Special Moments',
    businessName: 'Special Moments Studio',
    businessCategory: 'Kids & Special Shoots',
    eventType: 'Kids & Special Shoots',
    personName: 'David Wilson',
    designation: 'Special Shoots Director',
    description: 'Specialized photography for unique occasions and celebrations',
    longDescription: 'Special Moments Studio focuses on capturing unique life moments - from maternity shoots to pet photography. We believe every special moment deserves to be preserved beautifully.',
    services: ['Maternity Shoots', 'Pet Photography', 'Anniversary Shoots', 'Surprise Events'],
    logo: kids,
    location: 'Coimbatore, Tamil Nadu',
    rating: 4.7,
    totalReviews: 89,
    budgetRange: '₹20,000 - ₹1,00,000',
    experience: 5,
    businessType: 'Partnership',
    cameraModels: 'Nikon Z6II, Fujifilm X-T4',
    videoEquipment: 'DJI Ronin-SC, Sony ZV-1',
    teamMembers: 4,
    hasBackup: 'yes',
    preferredLocations: ['Local', 'Within State'],
    hasTravelCharges: 'yes',
    availableLocations: ['Coimbatore', 'Chennai', 'Ooty', 'Kodaikanal', 'Pollachi'],
    photoDelivery: 7,
    videoDelivery: 10,
    albumDelivery: 14,
    selectedServices: ['Kids & Special Shoots'],
    contact: {
      phone: '+91 98765 43225',
      email: 'studio@specialmoments.com',
      website: 'www.specialmoments.com',
      address: '321 Celebration Road, Coimbatore - 641001'
    },
    whatsappNumber: '+919876543225',
    contactNumber: '+919876543225',
    socialMedia: {
      instagram: '@specialmoments',
      facebook: '/specialmoments'
    },
    portfolio: [
      { id: 1, image: kids, title: 'Maternity Shoot' },
      { id: 2, image: kids, title: 'Pet Photography' },
      { id: 3, image: kids, title: 'Anniversary' }
    ],
    packages: [
      {
        name: 'Maternity Package',
        price: '₹20,000',
        features: ['2 Hour Session', '30 Edited Photos', 'Online Gallery', 'Digital Prints']
      },
      {
        name: 'Pet Package',
        price: '₹25,000',
        features: ['2 Hour Session', '30 Edited Photos', 'Outdoor Location', 'Digital Gallery']
      },
      {
        name: 'Special Event',
        price: '₹1,00,000',
        features: ['Full Day Coverage', '200+ Photos', 'Video Highlights', 'Photo Album', '2 Photographers']
      }
    ],
    reviews: [
      {
        id: 1,
        name: 'Priya V',
        rating: 4.7,
        date: '2024-01-22',
        comment: 'Great maternity shoot! Very comfortable and professional.',
        avatar: 'https://via.placeholder.com/50'
      }
    ]
  }
];