import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaGift, FaMapMarkerAlt, FaBed, FaBath, FaParking, FaCouch } from 'react-icons/fa';

SwiperCore.use([Navigation]);

function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [discount, setDiscount] = useState(false);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await response.json();

        if (data.success === false) {
          setError('Failed to fetch the listing');
          setLoading(false);
          return;
        }

        setListing(data);
        setLoading(false);
        if (data.offer) {
          setDiscount(true);
        }
      } catch (error) {
        setError('An error occurred while fetching the listing');
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <div className="container mx-auto mt-14 px-4">
      {error && <p className="text-red-600 text-center">{error}</p>}
      {loading && <p className="text-center my-7">Loading...</p>}
      {listing && (
        <>
          {/* Image Slider */}
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div className="mt-14 relative w-full max-w-3xl mx-auto h-72 sm:h-96 overflow-hidden">
                  <img
                    src={url}
                    alt="Listing"
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Listing Details */}
          <div className="mt-8">
            <h1 className="text-4xl font-semibold text-primary">{listing.name}</h1>
            <p className="mt-4 text-lg text-gray-700">{listing.description}</p>
            
            {/* Address */}
            <div className="mt-4 flex items-center text-lg text-gray-600">
              <FaMapMarkerAlt size={20} color="green" />
              <span className="ml-2">{listing.address}</span>
            </div>

            {/* Pricing */}
            <div className="mt-4 text-2xl font-semibold text-gray-800">
              {discount ? (
                <>
                  <span className="line-through text-gray-500">${listing.regularPrice}</span>
                  <span className="ml-4">${listing.discountPrice}</span>
                </>
              ) : (
                <span>${listing.regularPrice}</span>
              )}
              <span className="text-sm text-gray-500">/month</span>
            </div>

            {/* Offer Icon */}
            {listing.offer && (
              <div className="mt-4 flex items-center text-purple-600">
                <FaGift size={30} />
                <span className="ml-2">Special Offer</span>
              </div>
            )}

            {/* Listing Features */}
            <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
              <div className="flex items-center">
                <FaBed size={24} className="text-gray-600" />
                <span className="ml-2 text-gray-700">{listing.bedrooms} Bedrooms</span>
              </div>
              <div className="flex items-center">
                <FaBath size={24} className="text-gray-600" />
                <span className="ml-2 text-gray-700">{listing.bathrooms} Bathrooms</span>
              </div>
              <div className="flex items-center">
                <FaParking size={24} className="text-gray-600" />
                <span className="ml-2 text-gray-700">
                  {listing.parking ? "Parking Available" : "No Parking"}
                </span>
              </div>
              <div className="flex items-center">
                <FaCouch size={24} className="text-gray-600" />
                <span className="ml-2 text-gray-700">
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Listing;
