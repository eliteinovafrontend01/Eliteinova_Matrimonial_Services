import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import achall from '../assets/achall.jpg';
import nonachall from '../assets/nonachall.jpg';
import luxuryhall from '../assets/luxuryhall.jpg';
import minihall from '../assets/minihall.jpg';
import eventhall from '../assets/eventhall.jpg';
import conventionhall from '../assets/conventionhall.jpg';
import partyhall from '../assets/partyhall.jpg';
import outdoorvenue from '../assets/outdoorvenue.jpg';
import hallbanner1 from '../assets/luxuryhall.jpg';
import hallbanner2 from '../assets/achall.jpg';
// Add a matrimony banner image
import matrimonyBanner from '../assets/Matrimonybanner.jpg';
import VendorDetails from '../Components/VendorDetails'; // ADD THIS IMPORT
import { weddingHallsVendors } from '../data/weddingHallsData'; // ADD THIS IMPORT

const WeddingHalls = () => {
  const navigate = useNavigate();
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  // NEW FILTER STATES - Updated to match form
  const [selectedVenueTypes, setSelectedVenueTypes] = useState([]);   // replaces selectedEvent for venue type
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  
  // Capacity & Facilities - Updated to text inputs
  const [seatingCapacity, setSeatingCapacity] = useState('');
  const [parkingCapacity, setParkingCapacity] = useState('');
  const [numberOfFloors, setNumberOfFloors] = useState('');
  const [diningCapacity, setDiningCapacity] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  
  // Rooms & Accommodation
  const [roomsFilter, setRoomsFilter] = useState('');
  const [roomTypeFilter, setRoomTypeFilter] = useState('');
  
  // Events & Time Slots
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);
  
  // Catering & Policy
  const [inhouseCateringFilter, setInhouseCateringFilter] = useState('');
  const [outsideCateringFilter, setOutsideCateringFilter] = useState('');
  const [selectedDecoration, setSelectedDecoration] = useState('');
  const [soundFilter, setSoundFilter] = useState('');
  const [alcoholFilter, setAlcoholFilter] = useState('');
  
  // Filter navigation
  const [currentFilterPage, setCurrentFilterPage] = useState(0);
  const [currentMobileFilterPage, setCurrentMobileFilterPage] = useState(0);
  const [showMobileFilterDrawer, setShowMobileFilterDrawer] = useState(false);

  // ADD THESE STATES FOR VENDOR DETAILS
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showVendorDetails, setShowVendorDetails] = useState(false);

  // USE THE IMPORTED VENDORS DATA
  const vendors = weddingHallsVendors;

  // Check if there's a filter parameter in the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const openFilter = urlParams.get('openFilter');
    
    if (openFilter === 'true') {
      setTimeout(() => {
        const filterSection = document.getElementById('filter-section');
        if (filterSection) {
          filterSection.scrollIntoView({ behavior: 'smooth' });
        }
        if (window.innerWidth < 1024) {
          setShowMobileFilterDrawer(true);
        }
      }, 500);
    }
  }, []);

  const banners = [
    {
      id: 1,
      image: hallbanner1,
      title: "Wedding Halls",
      subtitle: "Perfect Venues for Your Special Day"
    },
    {
      id: 2,
      image: hallbanner2,
      title: "Premium Wedding Venues",
      subtitle: "Create Unforgettable Memories"
    }
  ];

  const mainCategories = [
    { name: 'Photography', path: '/photography' },
    { name: 'Catering & Foods', path: '/catering' },
    { name: 'Wedding Halls', path: '/wedding-halls' },
    { name: 'Decorations', path: '/decorations' },
    { name: 'Entertainment', path: '/entertainment' },
    { name: 'Invitation & Gifts', path: '/invitation' },
    { name: 'Bridal Styling', path: '/styling' },
    { name: 'Background Investigations', path: '/background-investigations' },
  ];

  const weddingHallCategories = [
    { name: 'AC Wedding Halls', image: achall },
    { name: 'Non AC Wedding Halls', image: nonachall },
    { name: 'Luxury Wedding Halls', image: luxuryhall },
    { name: 'Mini Wedding Halls', image: minihall },
    { name: 'Event Halls', image: eventhall },
    { name: 'Convention & Banquet Halls', image: conventionhall },
    { name: 'Party & Reception Halls', image: partyhall },
    { name: 'Outdoor / Open-Air Venues', image: outdoorvenue },
  ];

  // Filter options based on form structure
  const venueTypes = [
    "Mandapam",
    "Wedding Hall",
    "Convention Center",
    "Banquet Hall",
    "Open Lawn"
  ];

  const facilityOptions = [
    "AC Hall",
    "Non-AC Hall",
    "Generator Backup",
    "Lift",
    "Wheelchair Access",
    "Green Rooms (Bridal/Groom)",
    "Power Backup",
    "CCTV",
    "Fire Safety",
    "RO Water"
  ];

  const eventTypeOptions = [
    "Marriage",
    "Reception",
    "Engagement",
    "Seemantham",
    "Sangeet / Mehendi",
    "Other Functions"
  ];

  const timeSlots = [
    "Morning",
    "Evening",
    "Full Day",
    "Night"
  ];

  const cateringOptions = [
    "In-house Catering Available",
    "Outside Catering Allowed"
  ];

  const decorationOptions = [
    "In-house Decoration Only",
    "Outside Decoration Allowed"
  ];

  // Filter options
  const states = ['Tamil Nadu', 'Kerala', 'Karnataka', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Delhi', 'Gujarat'];
  const districts = {
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy', 'Kanyakumari', 'Tirunelveli'],
    'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam'],
    'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum'],
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    'Delhi': ['New Delhi', 'South Delhi', 'North Delhi', 'East Delhi', 'West Delhi'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar']
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedVenueTypes([categoryName]);
    
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        const vendorSection = document.querySelector('.vendor-profiles');
        if (vendorSection) {
          vendorSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  // NEW HANDLER FUNCTIONS
  const handleVenueTypeToggle = (type) => {
    setSelectedVenueTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleFacilityToggle = (facility) => {
    setSelectedFacilities(prev => {
      if (prev.includes(facility)) {
        return prev.filter(f => f !== facility);
      } else {
        return [...prev, facility];
      }
    });
  };

  const handleEventToggle = (event) => {
    setSelectedEvents(prev => {
      if (prev.includes(event)) {
        return prev.filter(e => e !== event);
      } else {
        return [...prev, event];
      }
    });
  };

  const handleTimeSlotToggle = (slot) => {
    setSelectedTimeSlots(prev => {
      if (prev.includes(slot)) {
        return prev.filter(s => s !== slot);
      } else {
        return [...prev, slot];
      }
    });
  };

  // ADD THIS FUNCTION TO HANDLE VIEW DETAILS
  const handleViewDetails = (vendorId) => {
    const vendor = vendors.find(v => v.id === vendorId);
    if (vendor) {
      setSelectedVendor(vendor);
      setShowVendorDetails(true);
    }
  };

  // ─────────────────────────────────────────────────────────────
  //  DESKTOP filterPages
  // ─────────────────────────────────────────────────────────────
  const filterPages = [
    // PAGE 1 ── Venue Type & Budget  (Form Step 1)
    {
      title: "Venue Type & Budget",
      content: (
        <div className="space-y-3">
          {/* Type of Venue */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Type of Venue</label>
            <div className="space-y-1.5">
              {venueTypes.map(type => (
                <label key={type} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedVenueTypes.includes(type)}
                    onChange={() => handleVenueTypeToggle(type)}
                    className="w-3.5 h-3.5 accent-red-600"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">₹ Budget Range (Min - Max)</label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min Budget"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
                className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
              />
              <input
                type="number"
                placeholder="Max Budget"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
              />
            </div>
          </div>
        </div>
      )
    },

    // PAGE 2 ── Capacity & Facilities  (Form Step 4) - UPDATED
    {
      title: "Capacity & Facilities",
      content: (
        <div className="space-y-3">
          {/* Seating Capacity */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Seating Capacity</label>
            <input
              type="text"
              placeholder="Enter seating capacity"
              value={seatingCapacity}
              onChange={(e) => setSeatingCapacity(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            />
          </div>

          {/* Parking Capacity */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Parking Capacity</label>
            <input
              type="text"
              placeholder="Enter parking capacity"
              value={parkingCapacity}
              onChange={(e) => setParkingCapacity(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            />
          </div>

          {/* Number of Floors */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Number of Floors</label>
            <input
              type="text"
              placeholder="Enter number of floors"
              value={numberOfFloors}
              onChange={(e) => setNumberOfFloors(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            />
          </div>

          {/* Dining Capacity */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Dining Capacity</label>
            <input
              type="text"
              placeholder="Enter dining capacity"
              value={diningCapacity}
              onChange={(e) => setDiningCapacity(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            />
          </div>

          {/* Facilities Available */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Facilities Available</label>
            <div className="grid grid-cols-1 gap-1.5 max-h-44 overflow-y-auto p-1 border border-red-100 rounded-md">
              {facilityOptions.map(facility => (
                <label key={facility} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedFacilities.includes(facility)}
                    onChange={() => handleFacilityToggle(facility)}
                    className="w-3.5 h-3.5 accent-red-600"
                  />
                  <span>{facility}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },

    // PAGE 3 ── Rooms & Accommodation  (Form Step 5)
    {
      title: "Rooms & Accommodation",
      content: (
        <div className="space-y-3">
          {/* Number of Rooms */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Rooms Available</label>
            <select
              value={roomsFilter}
              onChange={(e) => setRoomsFilter(e.target.value)}
              className="w-full px-2 py-1.5 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 text-xs"
            >
              <option value="">Any</option>
              <option value="1-5">1–5 Rooms</option>
              <option value="6-10">6–10 Rooms</option>
              <option value="11-20">11–20 Rooms</option>
              <option value="20+">20+ Rooms</option>
            </select>
          </div>

          {/* Room Type */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Room Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="radio"
                  name="roomTypeFilter"
                  value="AC"
                  checked={roomTypeFilter === "AC"}
                  onChange={(e) => setRoomTypeFilter(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600"
                />
                AC
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="radio"
                  name="roomTypeFilter"
                  value="Non-AC"
                  checked={roomTypeFilter === "Non-AC"}
                  onChange={(e) => setRoomTypeFilter(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600"
                />
                Non-AC
              </label>
            </div>
          </div>
        </div>
      )
    },

    // PAGE 4 ── Events & Time Slots  (Form Step 6)
    {
      title: "Events & Time Slots",
      content: (
        <div className="space-y-3">
          {/* Events Allowed */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Events Allowed</label>
            <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto p-1 border border-red-100 rounded-md">
              {eventTypeOptions.map(event => (
                <label key={event} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(event)}
                    onChange={() => handleEventToggle(event)}
                    className="w-3.5 h-3.5 accent-red-600"
                  />
                  <span>{event}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Time Slots Available</label>
            <div className="grid grid-cols-2 gap-1.5">
              {timeSlots.map(slot => (
                <label key={slot} className="flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedTimeSlots.includes(slot)}
                    onChange={() => handleTimeSlotToggle(slot)}
                    className="w-3.5 h-3.5 accent-red-600"
                  />
                  <span>{slot}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },

    // PAGE 5 ── Catering & Policy  (Form Step 8)
    {
      title: "Catering & Policy",
      content: (
        <div className="space-y-3">
          {/* In-house Catering */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">In-house Catering</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="radio"
                  name="inhouseCateringFilter"
                  value="yes"
                  checked={inhouseCateringFilter === "yes"}
                  onChange={(e) => setInhouseCateringFilter(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600"
                />
                Yes
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="radio"
                  name="inhouseCateringFilter"
                  value="no"
                  checked={inhouseCateringFilter === "no"}
                  onChange={(e) => setInhouseCateringFilter(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600"
                />
                No
              </label>
            </div>
          </div>

          {/* Outside Catering */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Outside Catering Allowed</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="radio"
                  name="outsideCateringFilter"
                  value="yes"
                  checked={outsideCateringFilter === "yes"}
                  onChange={(e) => setOutsideCateringFilter(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600"
                />
                Yes
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="radio"
                  name="outsideCateringFilter"
                  value="no"
                  checked={outsideCateringFilter === "no"}
                  onChange={(e) => setOutsideCateringFilter(e.target.value)}
                  className="w-3.5 h-3.5 accent-red-600"
                />
                No
              </label>
            </div>
          </div>

          {/* Decoration */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Decoration Allowed</label>
            <div className="space-y-1.5">
              {decorationOptions.map(option => (
                <label key={option} className="flex items-center gap-2 text-xs">
                  <input
                    type="radio"
                    name="decorationFilter"
                    value={option}
                    checked={selectedDecoration === option}
                    onChange={(e) => setSelectedDecoration(e.target.value)}
                    className="w-3.5 h-3.5 accent-red-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sound / DJ */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Sound / DJ Allowed</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="radio"
                  name="soundFilter"
                  value="yes"
                  checked={soundFilter === "yes"}
                  onChange={() => setSoundFilter("yes")}
                  className="w-3.5 h-3.5 accent-red-600"
                />
                Yes
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="radio"
                  name="soundFilter"
                  value="no"
                  checked={soundFilter === "no"}
                  onChange={() => setSoundFilter("no")}
                  className="w-3.5 h-3.5 accent-red-600"
                />
                No
              </label>
            </div>
          </div>

          {/* Alcohol */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Alcohol Allowed</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="radio"
                  name="alcoholFilter"
                  value="yes"
                  checked={alcoholFilter === "yes"}
                  onChange={() => setAlcoholFilter("yes")}
                  className="w-3.5 h-3.5 accent-red-600"
                />
                Yes
              </label>
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="radio"
                  name="alcoholFilter"
                  value="no"
                  checked={alcoholFilter === "no"}
                  onChange={() => setAlcoholFilter("no")}
                  className="w-3.5 h-3.5 accent-red-600"
                />
                No
              </label>
            </div>
          </div>
        </div>
      )
    },
  ];

  // ─────────────────────────────────────────────────────────────
  //  MOBILE mobileFilterPages - UPDATED
  // ─────────────────────────────────────────────────────────────
  const mobileFilterPages = [
    // PAGE 1 ── Venue Type & Budget
    {
      title: "Venue Type & Budget",
      content: (
        <div className="space-y-2">
          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Type of Venue</label>
            <div className="grid grid-cols-2 gap-1">
              {venueTypes.map(type => (
                <label key={type} className="flex items-center gap-1.5 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedVenueTypes.includes(type)}
                    onChange={() => handleVenueTypeToggle(type)}
                    className="w-3.5 h-3.5 accent-red-600"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">₹ Budget Range (Min - Max)</label>
            <div className="grid grid-cols-2 gap-1">
              <input
                type="number"
                placeholder="Min"
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-red-300 rounded"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
                className="w-full px-2 py-1.5 text-xs border border-red-300 rounded"
              />
            </div>
          </div>
        </div>
      )
    },

    // PAGE 2 ── Capacity & Facilities - UPDATED
    {
      title: "Capacity & Facilities",
      content: (
        <div className="space-y-2">
          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Seating Capacity</label>
            <input
              type="text"
              placeholder="Enter seating capacity"
              value={seatingCapacity}
              onChange={(e) => setSeatingCapacity(e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-red-300 rounded"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Parking Capacity</label>
            <input
              type="text"
              placeholder="Enter parking capacity"
              value={parkingCapacity}
              onChange={(e) => setParkingCapacity(e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-red-300 rounded"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Number of Floors</label>
            <input
              type="text"
              placeholder="Enter number of floors"
              value={numberOfFloors}
              onChange={(e) => setNumberOfFloors(e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-red-300 rounded"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Dining Capacity</label>
            <input
              type="text"
              placeholder="Enter dining capacity"
              value={diningCapacity}
              onChange={(e) => setDiningCapacity(e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-red-300 rounded"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Facilities Available</label>
            <div className="grid grid-cols-1 gap-1 max-h-36 overflow-y-auto p-1 border border-red-100 rounded">
              {facilityOptions.map(facility => (
                <label key={facility} className="flex items-center gap-1.5 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedFacilities.includes(facility)}
                    onChange={() => handleFacilityToggle(facility)}
                    className="w-3.5 h-3.5 accent-red-600"
                  />
                  <span>{facility}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },

    // PAGE 3 ── Rooms & Accommodation
    {
      title: "Rooms & Accommodation",
      content: (
        <div className="space-y-2">
          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Rooms Available</label>
            <select
              value={roomsFilter}
              onChange={(e) => setRoomsFilter(e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-red-300 rounded"
            >
              <option value="">Any</option>
              <option value="1-5">1–5 Rooms</option>
              <option value="6-10">6–10 Rooms</option>
              <option value="11-20">11–20 Rooms</option>
              <option value="20+">20+ Rooms</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Room Type</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-1.5 text-xs">
                <input type="radio" name="roomTypeFilterM" value="AC" checked={roomTypeFilter === "AC"} onChange={() => setRoomTypeFilter("AC")} className="w-3.5 h-3.5 accent-red-600" />
                AC
              </label>
              <label className="flex items-center gap-1.5 text-xs">
                <input type="radio" name="roomTypeFilterM" value="Non-AC" checked={roomTypeFilter === "Non-AC"} onChange={() => setRoomTypeFilter("Non-AC")} className="w-3.5 h-3.5 accent-red-600" />
                Non-AC
              </label>
            </div>
          </div>
        </div>
      )
    },

    // PAGE 4 ── Events & Time Slots
    {
      title: "Events & Time Slots",
      content: (
        <div className="space-y-2">
          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Events Allowed</label>
            <div className="grid grid-cols-1 gap-1 max-h-32 overflow-y-auto p-1 border border-red-100 rounded">
              {eventTypeOptions.map(event => (
                <label key={event} className="flex items-center gap-1.5 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedEvents.includes(event)}
                    onChange={() => handleEventToggle(event)}
                    className="w-3.5 h-3.5 accent-red-600"
                  />
                  <span>{event}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Time Slots Available</label>
            <div className="grid grid-cols-2 gap-1">
              {timeSlots.map(slot => (
                <label key={slot} className="flex items-center gap-1.5 text-xs">
                  <input
                    type="checkbox"
                    checked={selectedTimeSlots.includes(slot)}
                    onChange={() => handleTimeSlotToggle(slot)}
                    className="w-3.5 h-3.5 accent-red-600"
                  />
                  <span>{slot}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },

    // PAGE 5 ── Catering & Policy
    {
      title: "Catering & Policy",
      content: (
        <div className="space-y-2">
          {/* In-house Catering */}
          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">In-house Catering</label>
            <div className="flex gap-3">
              {["yes", "no"].map((v) => (
                <label key={v} className="flex items-center gap-1.5 text-xs">
                  <input type="radio" name="inhouseCatM" value={v} checked={inhouseCateringFilter === v} onChange={() => setInhouseCateringFilter(v)} className="w-3.5 h-3.5 accent-red-600" />
                  {v === "yes" ? "Yes" : "No"}
                </label>
              ))}
            </div>
          </div>

          {/* Outside Catering */}
          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Outside Catering Allowed</label>
            <div className="flex gap-3">
              {["yes", "no"].map((v) => (
                <label key={v} className="flex items-center gap-1.5 text-xs">
                  <input type="radio" name="outsideCatM" value={v} checked={outsideCateringFilter === v} onChange={() => setOutsideCateringFilter(v)} className="w-3.5 h-3.5 accent-red-600" />
                  {v === "yes" ? "Yes" : "No"}
                </label>
              ))}
            </div>
          </div>

          {/* Decoration */}
          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Decoration Allowed</label>
            <div className="space-y-1">
              {decorationOptions.map(option => (
                <label key={option} className="flex items-center gap-1.5 text-xs">
                  <input type="radio" name="decM" value={option} checked={selectedDecoration === option} onChange={() => setSelectedDecoration(option)} className="w-3.5 h-3.5 accent-red-600" />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sound / DJ */}
          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Sound / DJ Allowed</label>
            <div className="flex gap-3">
               {["yes", "no"].map((v) => (
                <label key={v} className="flex items-center gap-1.5 text-xs">
                  <input type="radio" name="soundM" value={v} checked={soundFilter === v} onChange={() => setSoundFilter(v)} className="w-3.5 h-3.5 accent-red-600" />
                  {v === "yes" ? "Yes" : "No"}
                </label>
              ))}
            </div>
          </div>

          {/* Alcohol */}
          <div>
            <label className="block text-[10px] font-bold text-gray-700 mb-1">Alcohol Allowed</label>
            <div className="flex gap-3">
              {["yes", "no"].map((v) => (
                <label key={v} className="flex items-center gap-1.5 text-xs">
                  <input type="radio" name="alcoholM" value={v} checked={alcoholFilter === v} onChange={() => setAlcoholFilter(v)} className="w-3.5 h-3.5 accent-red-600" />
                  {v === "yes" ? "Yes" : "No"}
                </label>
              ))}
            </div>
          </div>
        </div>
      )
    },
  ];

  // Filter vendors based on selections - UPDATED
  const filteredVendors = vendors.filter(vendor => {
    // Venue type filter
    if (selectedVenueTypes.length > 0) {
      const hasMatchingVenue = selectedVenueTypes.some(type => 
        vendor.venueType?.includes(type) || vendor.businessCategory?.includes(type)
      );
      if (!hasMatchingVenue) return false;
    }
    
    // Location filters
    if (selectedState && !vendor.location.includes(selectedState)) return false;
    if (selectedDistrict && !vendor.location.includes(selectedDistrict)) return false;
    if (selectedLocation && !vendor.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;
    
    // Budget filter
    if (minBudget || maxBudget) {
      const minPrice = parseInt(minBudget) || 0;
      const maxPrice = parseInt(maxBudget) || Infinity;
      const vendorPrice = parseInt(vendor.priceRange?.replace(/[^0-9]/g, '').split('-')[0]) || 0;
      if (vendorPrice < minPrice || vendorPrice > maxPrice) return false;
    }

    // Seating Capacity filter
    if (seatingCapacity) {
      const vendorCapacity = parseInt(vendor.capacity) || 0;
      const searchCapacity = parseInt(seatingCapacity) || 0;
      if (vendorCapacity < searchCapacity) return false;
    }

    // Parking Capacity filter
    if (parkingCapacity) {
      const vendorParking = parseInt(vendor.parkingCapacity) || 0;
      const searchParking = parseInt(parkingCapacity) || 0;
      if (vendorParking < searchParking) return false;
    }

    // Number of Floors filter
    if (numberOfFloors) {
      const vendorFloors = parseInt(vendor.numberOfFloors) || 0;
      const searchFloors = parseInt(numberOfFloors) || 0;
      if (vendorFloors < searchFloors) return false;
    }

    // Dining Capacity filter
    if (diningCapacity) {
      const vendorDining = parseInt(vendor.diningCapacity) || 0;
      const searchDining = parseInt(diningCapacity) || 0;
      if (vendorDining < searchDining) return false;
    }

    // Facilities filter
    if (selectedFacilities.length > 0) {
      const hasAllFacilities = selectedFacilities.every(facility => 
        vendor.amenities?.includes(facility)
      );
      if (!hasAllFacilities) return false;
    }

    // Rooms filter
    if (roomsFilter) {
      const vendorRooms = parseInt(vendor.roomsAvailable) || 0;
      if (roomsFilter === '1-5' && (vendorRooms < 1 || vendorRooms > 5)) return false;
      if (roomsFilter === '6-10' && (vendorRooms < 6 || vendorRooms > 10)) return false;
      if (roomsFilter === '11-20' && (vendorRooms < 11 || vendorRooms > 20)) return false;
      if (roomsFilter === '20+' && vendorRooms < 20) return false;
    }

    // Room type filter
    if (roomTypeFilter && vendor.roomType !== roomTypeFilter) return false;

    // Events filter
    if (selectedEvents.length > 0) {
      const hasAllEvents = selectedEvents.every(event => 
        vendor.eventsAllowed?.includes(event)
      );
      if (!hasAllEvents) return false;
    }

    // Time slots filter
    if (selectedTimeSlots.length > 0) {
      const hasAllSlots = selectedTimeSlots.every(slot => 
        vendor.timeSlots?.includes(slot)
      );
      if (!hasAllSlots) return false;
    }

    // In-house catering filter
    if (inhouseCateringFilter) {
      if (inhouseCateringFilter === 'yes' && !vendor.inhouseCatering) return false;
      if (inhouseCateringFilter === 'no' && vendor.inhouseCatering) return false;
    }

    // Outside catering filter
    if (outsideCateringFilter) {
      if (outsideCateringFilter === 'yes' && !vendor.outsideCatering) return false;
      if (outsideCateringFilter === 'no' && vendor.outsideCatering) return false;
    }

    // Decoration filter
    if (selectedDecoration && vendor.decoration !== selectedDecoration) return false;

    // Sound filter
    if (soundFilter) {
      if (soundFilter === 'yes' && !vendor.soundAllowed) return false;
      if (soundFilter === 'no' && vendor.soundAllowed) return false;
    }

    // Alcohol filter
    if (alcoholFilter) {
      if (alcoholFilter === 'yes' && !vendor.alcoholAllowed) return false;
      if (alcoholFilter === 'no' && vendor.alcoholAllowed) return false;
    }
    
    return true;
  });

  // Auto change banner every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToBanner = (index) => {
    setCurrentBannerIndex(index);
  };

  const handleFilter = () => {
    console.log('Filtering...', filteredVendors.length);
    setShowMobileFilterDrawer(false);
    setShowMobileFilter(false);
    
    setTimeout(() => {
      const vendorSection = document.querySelector('.vendor-profiles');
      if (vendorSection) {
        vendorSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleReset = () => {
    setSelectedVenueTypes([]);
    setMinBudget('');
    setMaxBudget('');
    setSelectedState('');
    setSelectedDistrict('');
    setSelectedLocation('');
    setSeatingCapacity('');
    setParkingCapacity('');
    setNumberOfFloors('');
    setDiningCapacity('');
    setSelectedFacilities([]);
    setRoomsFilter('');
    setRoomTypeFilter('');
    setSelectedEvents([]);
    setSelectedTimeSlots([]);
    setInhouseCateringFilter('');
    setOutsideCateringFilter('');
    setSelectedDecoration('');
    setSoundFilter('');
    setAlcoholFilter('');
    setCurrentFilterPage(0);
    setCurrentMobileFilterPage(0);
    setShowMobileFilterDrawer(false);
    setShowMobileFilter(false);
  };

  const handleFilterButtonClick = () => {
    if (window.location.pathname === '/wedding-halls') {
      const filterSection = document.getElementById('filter-section');
      if (filterSection) {
        filterSection.scrollIntoView({ behavior: 'smooth' });
      }
      if (window.innerWidth < 1024) {
        setShowMobileFilterDrawer(true);
      }
    } else {
      navigate('/wedding-halls?openFilter=true');
    }
  };

  const nextFilterPage = () => {
    if (currentFilterPage < filterPages.length - 1) {
      setCurrentFilterPage(currentFilterPage + 1);
    }
  };

  const prevFilterPage = () => {
    if (currentFilterPage > 0) {
      setCurrentFilterPage(currentFilterPage - 1);
    }
  };

  const nextMobileFilterPage = () => {
    if (currentMobileFilterPage < mobileFilterPages.length - 1) {
      setCurrentMobileFilterPage(currentMobileFilterPage + 1);
    }
  };

  const prevMobileFilterPage = () => {
    if (currentMobileFilterPage > 0) {
      setCurrentMobileFilterPage(currentMobileFilterPage - 1);
    }
  };

  // Count active filters - UPDATED
  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedVenueTypes.length > 0) count++;
    if (minBudget) count++;
    if (maxBudget) count++;
    if (selectedState) count++;
    if (selectedDistrict) count++;
    if (selectedLocation) count++;
    if (seatingCapacity) count++;
    if (parkingCapacity) count++;
    if (numberOfFloors) count++;
    if (diningCapacity) count++;
    if (selectedFacilities.length > 0) count++;
    if (roomsFilter) count++;
    if (roomTypeFilter) count++;
    if (selectedEvents.length > 0) count++;
    if (selectedTimeSlots.length > 0) count++;
    if (inhouseCateringFilter) count++;
    if (outsideCateringFilter) count++;
    if (selectedDecoration) count++;
    if (soundFilter) count++;
    if (alcoholFilter) count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-yellow-50">
      {/* Add Pacifico and Plus Jakarta Sans fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      
      {/* Global font style */}
      <style jsx>{`
        .vendor-card {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }
        .vendor-card h3, .vendor-card .vendor-name {
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .vendor-card .price-tag {
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .vendor-card .service-item {
          font-weight: 500;
        }
        .vendor-card .contact-label {
          font-weight: 600;
          color: #4B5563;
        }
      `}</style>
      
      {/* Floating Filter Button with Badge */}
      <button
        onClick={handleFilterButtonClick}
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-red-600 to-red-700 text-white p-3 rounded-full shadow-lg hover:from-red-700 hover:to-red-800 hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center lg:hidden"
        aria-label="Open Filters"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        {getActiveFilterCount() > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-500 text-red-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {getActiveFilterCount()}
          </span>
        )}
      </button>

      {/* Banner Section */}
      <section className="relative w-full overflow-hidden">
        <div className="relative h-[200px] xs:h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[550px] w-full">
          {banners.map((banner, index) => (
            <div
              key={banner.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                index === currentBannerIndex 
                  ? 'opacity-100 z-10 pointer-events-auto' 
                  : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-red-500/5 to-yellow-500/5">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  style={{
                    objectPosition: 'center center',
                  }}
                />
              </div>
            </div>
          ))}

          {/* Navigation Buttons */}
          <button
            onClick={() => goToBanner(currentBannerIndex === 0 ? banners.length - 1 : currentBannerIndex - 1)}
            className="absolute left-1 xs:left-2 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 active:bg-black/80 p-1.5 xs:p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-300 z-20 touch-manipulation"
            aria-label="Previous banner"
          >
            <svg 
              className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={() => goToBanner(currentBannerIndex === banners.length - 1 ? 0 : currentBannerIndex + 1)}
            className="absolute right-1 xs:right-2 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 text-white bg-black/50 hover:bg-black/70 active:bg-black/80 p-1.5 xs:p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-300 z-20 touch-manipulation"
            aria-label="Next banner"
          >
            <svg 
              className="w-3.5 h-3.5 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dot Indicators */}
          <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToBanner(index)}
                className={`w-2 h-2 xs:w-2.5 xs:h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentBannerIndex 
                    ? 'bg-white scale-110' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Main Categories Navigation */}
      <div className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 shadow-md py-2 md:py-4">
        <div className="container mx-auto px-2 md:px-4">
          <h3 className="text-white text-xs sm:text-sm md:text-xl lg:text-2xl font-bold mb-1 md:mb-2 text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Browse All Wedding Services
          </h3>
          <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-1 scrollbar-hide gap-1 md:gap-2">
            {mainCategories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="flex-shrink-0 transition-all duration-300"
              >
                <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-medium py-1 md:py-2.5 px-2 md:px-5 rounded-md shadow hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] text-[10px] md:text-sm whitespace-nowrap border border-white/20 hover:border-yellow-300">
                  {category.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content with Filter Sidebar */}
      <div className="container mx-auto px-2 md:px-4 py-2 md:py-3 lg:py-4">
        <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
          {/* Main Content Area */}
          <div className="lg:flex-1 lg:max-w-[calc(100%-320px)]">
            {/* Wedding Hall Categories */}
            <section className="py-2 md:py-3">
              <h2 className="text-sm md:text-lg font-bold text-center text-red-800 mb-1 md:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Our Wedding Hall Categories
              </h2>
              
              {/* Mobile: Horizontal Scroll */}
              <div className="md:hidden overflow-x-auto pb-2 scrollbar-hide">
                <div className="flex space-x-1 px-1 min-w-max">
                  {weddingHallCategories.map((category) => (
                    <div key={category.name} className="flex flex-col items-center group flex-shrink-0 w-14">
                      <button 
                        onClick={() => handleCategoryClick(category.name)}
                        className="relative block w-12 h-12 mx-auto focus:outline-none"
                      >
                        <div className={`w-full h-full rounded-full border ${selectedVenueTypes.includes(category.name) ? 'border-yellow-500' : 'border-amber-700'} overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm hover:shadow transition-all duration-300 p-0.5`}>
                          <img 
                            src={category.image}
                            alt={category.name} 
                            className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-yellow-400 transition-all duration-300"></div>
                      </button>
                      <h3 className="mt-0.5 text-center font-medium text-gray-800 text-[7px] px-0.5 leading-tight line-clamp-2">
                        {category.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Desktop: Grid */}
              <div className="hidden md:grid grid-cols-4 md:grid-cols-8 gap-1 md:gap-1.5 px-1">
                {weddingHallCategories.map((category) => (
                  <div key={category.name} className="flex flex-col items-center group">
                    <button 
                      onClick={() => handleCategoryClick(category.name)}
                      className="relative block w-full aspect-square max-w-[60px] md:max-w-[65px] mx-auto focus:outline-none"
                    >
                      <div className={`w-full h-full rounded-full border ${selectedVenueTypes.includes(category.name) ? 'border-yellow-500' : 'border-amber-700'} overflow-hidden bg-gradient-to-br from-amber-50 to-yellow-50 shadow-sm hover:shadow transition-all duration-300 p-0.5`}>
                        <img 
                          src={category.image}
                          alt={category.name} 
                          className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 rounded-full border border-transparent group-hover:border-yellow-400 transition-all duration-300"></div>
                    </button>
                    <h3 className="mt-0.5 text-center font-medium text-gray-800 text-[9px] md:text-[10px] px-0.5 leading-tight line-clamp-2">
                      {category.name}
                    </h3>
                  </div>
                ))}
              </div>

              {selectedVenueTypes.length > 0 && (
                <div className="text-center mt-1 md:mt-2">
                  <button
                    onClick={() => setSelectedVenueTypes([])}
                    className="inline-flex items-center text-red-600 hover:text-red-800 text-[9px] md:text-xs font-medium"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <svg className="w-3 h-3 md:w-3.5 md:h-3.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Clear venue type filter
                  </button>
                </div>
              )}
            </section>

            {/* Mobile Matrimony Card */}
            <div className="md:hidden mb-3 mt-2">
              <div className="bg-white rounded-md shadow-lg border-2 border-red-300 overflow-hidden max-w-[95%] mx-auto">
                <div className="flex h-28">
                  {/* Left Side: Clear Image without overlay */}
                  <div className="w-2/5 relative overflow-hidden">
                    <img
                      src={matrimonyBanner || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"}
                      alt="Eliteinova Matrimony"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Right Side: Text and Button */}
                  <div className="w-3/5 p-2 bg-gradient-to-r from-red-50 to-yellow-50 flex flex-col justify-center">
                    <h2 className="text-sm font-bold text-red-600 mb-1 leading-tight" style={{ fontFamily: "'Pacifico', cursive" }}>
                      Eliteinova Matrimony
                    </h2>
                    <h3 className="text-xs font-bold text-yellow-500 mb-1.5 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Find Your Perfect Partner
                    </h3>
                    <a 
                      href="https://eliteinovamatrimony.com/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-red-600 to-red-700 text-white py-1.5 px-2 rounded-md hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-sm hover:shadow-md text-[9px] font-bold flex items-center justify-center"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      <svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Register Now
                    </a>
                  </div>
                </div>
              </div>

              {/* Mobile Filters - Below Matrimony Card */}
              <div className="mt-2 bg-white rounded-md shadow border border-red-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-700 px-2 py-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[10px] font-bold text-white flex items-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                      </svg>
                      Filter
                    </h3>
                    <span className="text-[8px] bg-white/20 text-white px-1.5 py-0.5 rounded-full">
                      {currentMobileFilterPage + 1}/{mobileFilterPages.length}
                    </span>
                  </div>
                </div>

                <div className="p-2">
                  {/* Filter Content */}
                  {mobileFilterPages[currentMobileFilterPage].content}

                  {/* Pagination Buttons */}
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={prevMobileFilterPage}
                      disabled={currentMobileFilterPage === 0}
                      className={`px-2 py-0.5 text-[8px] font-medium rounded ${
                        currentMobileFilterPage === 0
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      Prev
                    </button>
                    <button
                      onClick={nextMobileFilterPage}
                      disabled={currentMobileFilterPage === mobileFilterPages.length - 1}
                      className={`px-2 py-0.5 text-[8px] font-medium rounded ${
                        currentMobileFilterPage === mobileFilterPages.length - 1
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      Next
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1 mt-2 pt-1.5 border-t border-gray-200">
                    <button
                      onClick={handleFilter}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-1 px-1.5 rounded font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-sm text-[9px]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Apply
                      <span className="ml-1 bg-white/30 px-1 py-0.5 rounded text-[7px]">
                        {filteredVendors.length}
                      </span>
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 py-1 px-1.5 rounded font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-sm text-[9px]"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Vendor Count & Filters */}
            <div className="lg:hidden">
              {/* Vendor Count */}
              <section className="py-1 md:py-2">
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-md shadow p-2 mb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 pr-2">
                      <h3 className="text-xs font-bold text-white leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {selectedVenueTypes.length > 0 ? `${filteredVendors.length} ${selectedVenueTypes[0]} Vendors` : `${filteredVendors.length} Wedding Hall Vendors`}
                      </h3>
                      <p className="text-yellow-200 mt-0.5 text-[9px] leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {selectedVenueTypes.length > 0 ? `Showing results for "${selectedVenueTypes[0]}"` : 'Browse our premium wedding hall vendors'}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="bg-white/20 px-1.5 py-0.5 rounded mb-0.5">
                        <span className="text-white font-medium text-[8px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Price Range:</span>
                        <span className="text-yellow-300 ml-0.5 text-[8px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>₹10,000 - ₹6,00,000</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Applied Filters Tags - UPDATED */}
                <div className="flex flex-wrap gap-1 mb-2">
                  {selectedVenueTypes.length > 0 && (
                    <span className="inline-flex items-center bg-red-100 text-red-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Venue: {selectedVenueTypes[0]}
                      <button onClick={() => setSelectedVenueTypes([])} className="ml-0.5 text-red-500 hover:text-red-700">
                        ×
                      </button>
                    </span>
                  )}
                  {selectedState && (
                    <span className="inline-flex items-center bg-yellow-100 text-yellow-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      State: {selectedState}
                      <button onClick={() => setSelectedState('')} className="ml-0.5 text-yellow-500 hover:text-yellow-700">
                        ×
                      </button>
                    </span>
                  )}
                  {(minBudget || maxBudget) && (
                    <span className="inline-flex items-center bg-green-100 text-green-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Budget: {minBudget || '0'} - {maxBudget || '∞'}
                      <button onClick={() => { setMinBudget(''); setMaxBudget(''); }} className="ml-0.5 text-green-500 hover:text-green-700">
                        ×
                      </button>
                    </span>
                  )}
                  {seatingCapacity && (
                    <span className="inline-flex items-center bg-blue-100 text-blue-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Seating: {seatingCapacity}+
                      <button onClick={() => setSeatingCapacity('')} className="ml-0.5 text-blue-500 hover:text-blue-700">
                        ×
                      </button>
                    </span>
                  )}
                  {parkingCapacity && (
                    <span className="inline-flex items-center bg-indigo-100 text-indigo-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Parking: {parkingCapacity}+
                      <button onClick={() => setParkingCapacity('')} className="ml-0.5 text-indigo-500 hover:text-indigo-700">
                        ×
                      </button>
                    </span>
                  )}
                  {selectedFacilities.length > 0 && (
                    <span className="inline-flex items-center bg-purple-100 text-purple-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Facilities: {selectedFacilities.length}
                      <button onClick={() => setSelectedFacilities([])} className="ml-0.5 text-purple-500 hover:text-purple-700">
                        ×
                      </button>
                    </span>
                  )}
                  {selectedEvents.length > 0 && (
                    <span className="inline-flex items-center bg-pink-100 text-pink-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      Events: {selectedEvents.length}
                      <button onClick={() => setSelectedEvents([])} className="ml-0.5 text-pink-500 hover:text-pink-700">
                        ×
                      </button>
                    </span>
                  )}
                  {getActiveFilterCount() > 3 && (
                    <span className="inline-flex items-center bg-gray-100 text-gray-700 text-[9px] px-1.5 py-0.5 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                      +{getActiveFilterCount() - 3} more
                    </span>
                  )}
                </div>
              </section>
            </div>

            {/* Desktop: Vendor Count */}
            <div className="hidden lg:block mb-4">
              <section className="py-2">
                <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-lg shadow p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {selectedVenueTypes.length > 0 ? `${filteredVendors.length} ${selectedVenueTypes[0]} Vendors` : `${filteredVendors.length} Wedding Hall Vendors`}
                      </h3>
                      <p className="text-yellow-200 mt-1 text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        {selectedVenueTypes.length > 0 ? `Showing results for "${selectedVenueTypes[0]}"` : 'Browse our premium wedding hall vendors'}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className="bg-white/20 px-3 py-1.5 rounded">
                        <span className="text-white font-medium text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Price Range:</span>
                        <span className="text-yellow-300 ml-1.5 font-bold text-base" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>₹10,000 - ₹6,00,000</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Desktop Applied Filters Tags - UPDATED */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {selectedVenueTypes.length > 0 && (
                      <span className="inline-flex items-center bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Venue: {selectedVenueTypes[0]}
                        <button onClick={() => setSelectedVenueTypes([])} className="ml-1 text-red-500 hover:text-red-700">
                          ×
                        </button>
                      </span>
                    )}
                    {selectedState && (
                      <span className="inline-flex items-center bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        State: {selectedState}
                        <button onClick={() => setSelectedState('')} className="ml-1 text-yellow-500 hover:text-yellow-700">
                          ×
                        </button>
                      </span>
                    )}
                    {(minBudget || maxBudget) && (
                      <span className="inline-flex items-center bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Budget: {minBudget || '0'} - {maxBudget || '∞'}
                        <button onClick={() => { setMinBudget(''); setMaxBudget(''); }} className="ml-1 text-green-500 hover:text-green-700">
                          ×
                        </button>
                      </span>
                    )}
                    {seatingCapacity && (
                      <span className="inline-flex items-center bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Seating: {seatingCapacity}+
                        <button onClick={() => setSeatingCapacity('')} className="ml-1 text-blue-500 hover:text-blue-700">
                          ×
                        </button>
                      </span>
                    )}
                    {parkingCapacity && (
                      <span className="inline-flex items-center bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Parking: {parkingCapacity}+
                        <button onClick={() => setParkingCapacity('')} className="ml-1 text-indigo-500 hover:text-indigo-700">
                          ×
                        </button>
                      </span>
                    )}
                    {selectedFacilities.length > 0 && (
                      <span className="inline-flex items-center bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Facilities: {selectedFacilities.length}
                        <button onClick={() => setSelectedFacilities([])} className="ml-1 text-purple-500 hover:text-purple-700">
                          ×
                        </button>
                      </span>
                    )}
                    {selectedEvents.length > 0 && (
                      <span className="inline-flex items-center bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Events: {selectedEvents.length}
                        <button onClick={() => setSelectedEvents([])} className="ml-1 text-pink-500 hover:text-pink-700">
                          ×
                        </button>
                      </span>
                    )}
                    {getActiveFilterCount() > 3 && (
                      <span className="inline-flex items-center bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        +{getActiveFilterCount() - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </section>
            </div>

            {/* Vendor Profiles */}
            <section className="py-1 md:py-2 vendor-profiles vendor-card">
              {filteredVendors.length > 0 ? (
                <div className="space-y-2 md:space-y-4">
                  {filteredVendors.map((vendor) => (
                    <div key={vendor.id} className="bg-white rounded-md shadow border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      
                      {/* DESKTOP VIEW */}
                      <div className="hidden md:flex md:flex-row w-full h-[280px]">
                        {/* Left Box - Image */}
                        <div className="w-[22%] p-0 flex items-stretch h-full">
                          <div className="w-full h-full overflow-hidden">
                            <img 
                              src={vendor.logo} 
                              alt={vendor.businessName} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Middle Box - Business Details */}
                        <div className="w-[43%] p-4 bg-white border-r border-gray-200 h-full overflow-y-auto">
                          {/* Title with Star Rating */}
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-bold text-red-800 pr-2 vendor-name" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.02em' }}>
                              {vendor.businessName}
                            </h3>
                            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full flex-shrink-0">
                              <span className="text-yellow-700 font-bold mr-0.5 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{vendor.rating}</span>
                              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            </div>
                          </div>

                          {/* Business Category */}
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                              {vendor.businessCategory}
                            </span>
                          </div>
                          
                          {/* Budget */}
                          <div className="text-red-700 font-bold text-base mb-3 price-tag" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.01em' }}>
                            <span className="font-semibold text-gray-600 mr-1.5 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Budget:</span>
                            {vendor.priceRange}
                          </div>
                          
                          {/* Location */}
                          <div className="text-gray-600 flex items-start text-sm mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            <svg className="w-4 h-4 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="leading-tight font-medium">{vendor.location}</span>
                          </div>
                          
                          {/* Contact Details */}
                          <div className="space-y-1.5 text-sm">
                            <div className="flex items-start">
                              <span className="text-gray-600 font-semibold w-24 flex-shrink-0 contact-label" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Contact Person:</span>
                              <span className="text-gray-800 leading-tight font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{vendor.personName}</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-gray-600 font-semibold w-24 flex-shrink-0 contact-label" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Role:</span>
                              <span className="text-gray-800 leading-tight font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{vendor.designation}</span>
                            </div>
                            <div className="flex items-start">
                              <span className="text-gray-600 font-semibold w-24 flex-shrink-0 contact-label" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Capacity:</span>
                              <span className="text-gray-800 leading-tight font-medium" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{vendor.capacity} guests</span>
                            </div>
                          </div>
                        </div>

                        {/* Right Box - Description and Services */}
                        <div className="w-[35%] p-4 bg-white relative h-full overflow-y-auto">
                          {/* Description */}
                          <p className="text-gray-700 mb-3 text-sm leading-relaxed" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: '1.5' }}>
                            {vendor.description}
                          </p>
                          
                          {/* Facilities Offered */}
                          <h4 className="font-bold text-red-700 mb-2 text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '-0.01em' }}>
                            Facilities Offered
                          </h4>
                          <ul className="space-y-1.5 mb-3">
                            {vendor.services.slice(0, 4).map((service, index) => (
                              <li key={index} className="flex items-start">
                                <svg className="w-4 h-4 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 text-sm leading-tight service-item" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 500 }}>
                                  {service}
                                </span>
                              </li>
                            ))}
                          </ul>

                          {/* View Details Button */}
                          <div className="mt-3">
                            <button 
                              onClick={() => handleViewDetails(vendor.id)}
                              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 px-3 rounded-md font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow hover:shadow-md flex items-center justify-center text-sm"
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                            >
                              <span>View Details</span>
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* MOBILE VIEW */}
                      <div className="md:hidden flex flex-col w-full">
                        {/* Top Section - Image and Details Side by Side */}
                        <div className="flex border-b border-gray-200">
                          {/* Left Box - Image ONLY */}
                          <div className="w-2/5 p-1.5 flex items-center justify-center bg-gradient-to-br from-red-50 to-yellow-50 border-r border-gray-200">
                            <div className="w-full aspect-square rounded-md overflow-hidden border border-white shadow-sm">
                              <img 
                                src={vendor.logo} 
                                alt={vendor.businessName} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>

                          {/* Right Box - Business Details */}
                          <div className="w-3/5 p-1.5 bg-white">
                            {/* Title with Star Rating */}
                            <div className="flex items-start justify-between mb-0.5">
                              <h3 className="text-xs font-bold text-red-800 leading-tight line-clamp-2 pr-1">{vendor.businessName}</h3>
                              <div className="flex items-center bg-yellow-100 px-1.5 py-0.5 rounded-full flex-shrink-0">
                                <span className="text-yellow-700 font-bold mr-0.5 text-[10px]">{vendor.rating}</span>
                                <svg className="w-2.5 h-2.5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                            </div>

                            {/* Budget below title */}
                            <p className="text-red-700 font-bold text-xs mb-1">{vendor.priceRange}</p>
                            
                            {/* Business Category */}
                            <span className="inline-block px-1.5 py-0.5 bg-red-100 text-red-700 rounded-full text-[10px] font-medium mb-1">
                              {vendor.businessCategory}
                            </span>
                            
                            {/* Location */}
                            <div className="text-gray-600 flex items-start text-[10px] mb-1">
                              <svg className="w-2.5 h-2.5 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <span className="leading-tight">{vendor.location}</span>
                            </div>
                            
                            {/* Contact Details */}
                            <div className="space-y-0.5 text-[10px]">
                              <div className="flex items-start">
                                <span className="text-gray-600 font-bold w-16 flex-shrink-0">Contact:</span>
                                <span className="text-gray-800 leading-tight">{vendor.personName}</span>
                              </div>
                              <div className="flex items-start">
                                <span className="text-gray-600 font-bold w-16 flex-shrink-0">Capacity:</span>
                                <span className="text-gray-800 leading-tight">{vendor.capacity} guests</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Section - Full Width Description and Services */}
                        <div className="w-full p-2 bg-white relative pb-10">
                          {/* Description */}
                          <p className="text-gray-700 mb-2 text-xs leading-relaxed">{vendor.description}</p>
                          
                          {/* Facilities Offered */}
                          <h4 className="font-bold text-red-700 mb-1.5 text-sm">Facilities Offered</h4>
                          <ul className="space-y-0.5 mb-1">
                            {vendor.services.slice(0, 3).map((service, index) => (
                              <li key={index} className="flex items-start">
                                <svg className="w-3 h-3 text-green-500 mr-1.5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="text-gray-700 text-xs leading-tight">{service}</span>
                              </li>
                            ))}
                          </ul>

                          {/* View Details Button in Right Bottom Corner */}
                          <div className="absolute bottom-2 right-2">
                            <button 
                              onClick={() => handleViewDetails(vendor.id)}
                              className="bg-gradient-to-r from-red-600 to-red-700 text-white py-1.5 px-3 rounded-md font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow hover:shadow-md flex items-center justify-center text-xs"
                            >
                              <span>View Details</span>
                              <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-md shadow p-3 md:p-4 text-center">
                  <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-400 mx-auto mb-1.5 md:mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-xs md:text-base font-bold text-gray-700 mb-0.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>No Wedding Halls Found</h3>
                  <p className="text-gray-600 mb-2 text-[10px] md:text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Try adjusting your filter criteria to find more venues</p>
                  <button 
                    onClick={handleReset}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white py-1 md:py-1.5 px-2.5 md:px-3 rounded-md font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow hover:shadow-md text-xs"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </section>

            {/* Why Choose Us Section */}
            <section className="py-2 md:py-4">
              <h2 className="text-sm md:text-lg font-bold text-center text-red-800 mb-1.5 md:mb-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                Why Choose Our Wedding Halls?
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 md:gap-2">
                <div className="bg-white p-1.5 md:p-3 rounded-md shadow border border-red-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-0.5 md:mb-2 mx-auto">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[9px] md:text-sm text-red-700 mb-0.5 md:mb-0.5 text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Prime Locations</h3>
                  <p className="text-gray-600 text-[8px] md:text-xs text-center leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Conveniently located venues with easy access</p>
                </div>
                
                <div className="bg-white p-1.5 md:p-3 rounded-md shadow border border-yellow-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center mb-0.5 md:mb-2 mx-auto">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[9px] md:text-sm text-red-700 mb-0.5 md:mb-0.5 text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Spacious Capacity</h3>
                  <p className="text-gray-600 text-[8px] md:text-xs text-center leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Accommodating halls for all guest sizes</p>
                </div>
                
                <div className="bg-white p-1.5 md:p-3 rounded-md shadow border border-red-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-red-500 to-yellow-500 rounded-full flex items-center justify-center mb-0.5 md:mb-2 mx-auto">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[9px] md:text-sm text-red-700 mb-0.5 md:mb-0.5 text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Modern Amenities</h3>
                  <p className="text-gray-600 text-[8px] md:text-xs text-center leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>State-of-the-art facilities and equipment</p>
                </div>
                
                <div className="bg-white p-1.5 md:p-3 rounded-md shadow border border-yellow-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full flex items-center justify-center mb-0.5 md:mb-2 mx-auto">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[9px] md:text-sm text-red-700 mb-0.5 md:mb-0.5 text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Flexible Packages</h3>
                  <p className="text-gray-600 text-[8px] md:text-xs text-center leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Customizable options to fit your budget</p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar - Filter Section - Desktop Only */}
          <div id="filter-section" className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-20 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pb-4">
              {/* Matrimony Registration Box */}
              <div className="bg-white rounded-lg shadow-lg border-2 border-red-300 overflow-hidden mt-2">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={matrimonyBanner}
                    alt="Eliteinova Matrimony"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80";
                    }}
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-2xl font-bold text-red-600 mb-1 text-center" style={{ fontFamily: "'Pacifico', cursive" }}>
                    Eliteinova Matrimony
                  </h2>
                  <h3 className="text-lg font-bold text-yellow-500 mb-4 text-center" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Find Your Perfect Partner
                  </h3>
                  <a 
                    href="https://eliteinovamatrimony.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-md font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-md hover:shadow-lg text-base flex items-center justify-center"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Register Now
                  </a>
                  <p className="text-gray-500 text-xs text-center mt-3" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    Redirects to eliteinovamatrimony.com
                  </p>
                </div>
              </div>

              {/* Filter Container with Pagination */}
              <div className="bg-white rounded-lg shadow-lg border border-red-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-red-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {filterPages[currentFilterPage].title}
                  </h3>
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    {currentFilterPage + 1}/{filterPages.length}
                  </span>
                </div>

                {/* Filter Content */}
                {filterPages[currentFilterPage].content}

                {/* Pagination Buttons */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={prevFilterPage}
                    disabled={currentFilterPage === 0}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                      currentFilterPage === 0
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextFilterPage}
                    disabled={currentFilterPage === filterPages.length - 1}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                      currentFilterPage === filterPages.length - 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  >
                    Next
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4 pt-3 border-t border-gray-200">
                  <button
                    onClick={handleFilter}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 px-3 rounded-md font-medium hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-sm hover:shadow-md text-sm"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Apply Filter
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 py-2.5 px-3 rounded-md font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-sm hover:shadow-md text-sm"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilterDrawer && (
        <div className="lg:hidden fixed inset-0 z-[9999] bg-black/50 flex items-end justify-center">
          <div className="bg-white w-full rounded-t-2xl max-h-[70vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 px-3 py-2 border-b border-gray-200 flex justify-between items-center rounded-t-2xl">
              <div>
                <h3 className="text-sm font-bold text-red-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  {mobileFilterPages[currentMobileFilterPage].title}
                </h3>
                <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full mt-0.5 inline-block">
                  {currentMobileFilterPage + 1}/{mobileFilterPages.length}
                </span>
              </div>
              <button
                onClick={() => setShowMobileFilterDrawer(false)}
                className="text-gray-500 hover:text-red-700 p-1"
                aria-label="Close filter"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Filter Content */}
            <div className="px-3 py-2 space-y-2">
              {mobileFilterPages[currentMobileFilterPage].content}

              {/* Pagination Buttons */}
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={prevMobileFilterPage}
                  disabled={currentMobileFilterPage === 0}
                  className={`px-3 py-1 text-[9px] font-medium rounded ${
                    currentMobileFilterPage === 0
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={nextMobileFilterPage}
                  disabled={currentMobileFilterPage === mobileFilterPages.length - 1}
                  className={`px-3 py-1 text-[9px] font-medium rounded ${
                    currentMobileFilterPage === mobileFilterPages.length - 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  Next
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 pb-1 border-t border-gray-200 mt-2">
                <button
                  onClick={handleFilter}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-2 rounded-lg font-bold hover:from-red-700 hover:to-red-800 transition-all duration-300 shadow-sm text-xs flex items-center justify-center"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Apply
                  <span className="ml-1 bg-white/30 px-1 py-0.5 rounded text-[8px]">
                    {filteredVendors.length}
                  </span>
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 text-red-900 py-2 px-2 rounded-lg font-bold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 shadow-sm text-xs"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD THE VENDORDETAILS COMPONENT AT THE END */}
      <VendorDetails
        isOpen={showVendorDetails}
        onClose={() => {
          setShowVendorDetails(false);
          setSelectedVendor(null);
        }}
        vendor={selectedVendor}
        category="weddingHalls"
      />
    </div>
  );
};

export default WeddingHalls;