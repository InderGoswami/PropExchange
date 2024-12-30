import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
function Listing() {
    SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
      } catch (error) {
        setError('An error occurred while fetching the listing');
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  return (
    <div className="mt-14">
      {error && <p className="text-red-600">{error}</p>}
      {loading && <p className="text-center my-7">Loading...</p>}
      {listing && (
        <>
        <Swiper navigation>
            {listing.imageUrls.map((url)=>(
                <SwiperSlide key={url}>
                <div className='h-[500px] center bg-no-repeat' style={{background:`url(${url})`}}></div>
                </SwiperSlide>
            ))}
        </Swiper>
        </>
      )}
    </div>
  );
}

export default Listing;
