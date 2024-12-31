import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react'; // Import only necessary Swiper components
import 'swiper/css'; // Import Swiper core styles

import ListingItem from '../Components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
 

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return (
    <div>
     <div 
  className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
 
  

        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Discover Your <span className="text-slate-500">Ideal</span>
          <br />
          Home Today
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          PropExchange offers a wide selection of homes, tailored to meet your needs.
          <br />
          From cozy rentals to dream homes for sale, we’ve got something for everyone.
        </div>
        <Link to={'/search'} className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">
          Start your search now...
        </Link>
      </div>
      
     
      


      {/* listing results for offer, sale and rent */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {offerListings && offerListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Featured Deals</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={'/search?offer=true'}>
                See all offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => (
                <Link to={`/listing/${listing._id}`} key={listing._id}>
                  <ListingItem listing={listing} />
                </Link>
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Properties for Rent</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={'/search?type=rent'}>
                View more rental properties
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <Link to={`/listing/${listing._id}`} key={listing._id}>
                  <ListingItem listing={listing} />
                </Link>
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div>
            <div className="my-3">
              <h2 className="text-2xl font-semibold text-slate-600">Homes for Sale</h2>
              <Link className="text-sm text-blue-800 hover:underline" to={'/search?type=sale'}>
                Explore more homes for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <Link to={`/listing/${listing._id}`} key={listing._id}>
                  <ListingItem listing={listing} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
