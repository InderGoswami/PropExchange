import React from 'react';
import { MdLocationOn } from 'react-icons/md';
import { FaBed, FaBath } from 'react-icons/fa'; // Added icons for bed and bath
import { Link } from 'react-router-dom';

function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden w-full sm:w-[300px] transform hover:scale-105">
      <Link to={`/listing/${listing._id}`}> {/* Use listing._id */}
        <img
          src={listing.imageUrls[0]}
          className="h-[320px] sm:h-[220px] w-full object-cover rounded-t-lg"
          alt={listing.name}
        />
      </Link>
      <div className="p-5">
        <p className="text-xl font-semibold text-slate-800 truncate">{listing.name}</p>
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <MdLocationOn className="inline text-slate-500" />
          <p className="ml-2 w-full truncate">{listing.address}</p>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 mt-2">{listing.description}</p>
        <p className="text-2xl text-slate-700 font-bold mt-4">
          ${listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')}
        </p>
        {listing.type === 'rent' && <p className="text-sm text-gray-600 mt-1">Per month</p>}
        <div className="mt-3 space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FaBed className="text-slate-500" />
            <span>{listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaBath className="text-slate-500" />
            <span>{listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms` : `${listing.bathrooms} bathroom`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingItem;
