import React from 'react';
import { useNavigate } from 'react-router-dom';

const VendorCard = ({ vendor, category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${category}/${vendor.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-purple-200"
    >
      {/* Image/Logo Section */}
      <div className="h-48 bg-gradient-to-r from-purple-100 to-pink-100 relative overflow-hidden">
        {vendor.logo ? (
          <img 
            src={vendor.logo} 
            alt={vendor.businessName || vendor.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-30">
              {vendor.businessName?.[0] || vendor.name?.[0] || '📸'}
            </span>
          </div>
        )}
        
        {/* Rating Badge */}
        {vendor.rating && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-lg">★</span>
              <span className="font-bold text-gray-800">{vendor.rating}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Business Name */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
          {vendor.businessName || vendor.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
          <span>📍</span>
          <span className="line-clamp-1">{vendor.location}</span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {vendor.description}
        </p>

        {/* Price Range */}
        <div className="flex items-center gap-1 text-purple-600 font-semibold mb-4">
          <span>💰</span>
          <span className="text-sm">{vendor.priceRange}</span>
        </div>

        {/* Dynamic Tags based on category */}
        <div className="flex flex-wrap gap-2">
          {/* Experience Tag */}
          {vendor.experience && (
            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
              ⏱️ {vendor.experience}+ years
            </span>
          )}

          {/* Category-specific tags */}
          {category === 'photography' && vendor.cameraModels && (
            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
              📸 {vendor.teamMembers} photographers
            </span>
          )}

          {category === 'catering' && vendor.cuisines && (
            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
              🍽️ {vendor.cuisines?.[0]}
            </span>
          )}

          {category === 'wedding-halls' && vendor.capacity && (
            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
              👥 Up to {vendor.capacity} guests
            </span>
          )}

          {category === 'entertainment' && vendor.performanceDuration && (
            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
              🎵 {vendor.performanceDuration} hours
            </span>
          )}

          {/* Travel Available Tag */}
          {vendor.hasTravelCharges === 'yes' && (
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1.5 rounded-full">
              ✈️ Travel Available
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorCard;