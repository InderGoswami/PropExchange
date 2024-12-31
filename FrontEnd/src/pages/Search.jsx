import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../Components/ListingItem';

function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]); // Store all fetched listings
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [showMore, setShowMore] = useState(false);
  const [visibleListings, setVisibleListings] = useState(8); // Initially show 8 listings

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
      setSidebarData({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true',
        furnished: furnishedFromUrl === 'true',
        offer: offerFromUrl === 'true',
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const response = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await response.json();
      if (data.length > 8) {
        setShowMore(true);
      }
      setAllListings(data); // Store all listings
      setListings(data.slice(0, visibleListings)); // Show initial listings
      setLoading(false);
    };

    fetchListings();
  }, [location.search, visibleListings]);

  const handleChange = (e) => {
    const { id, type, checked, value } = e.target;
    if (id === 'all' || id === 'rent' || id === 'sale') {
      setSidebarData({ ...sidebarData, type: id });
    } else if (id === 'searchTerm') {
      setSidebarData({ ...sidebarData, searchTerm: value });
    } else if (id === 'parking' || id === 'furnished' || id === 'offer') {
      setSidebarData({ ...sidebarData, [id]: checked });
    } else if (id === 'sort_order') {
      const [sort, order] = value.split('_');
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('type', sidebarData.type);
    urlParams.set('parking', sidebarData.parking);
    urlParams.set('furnished', sidebarData.furnished);
    urlParams.set('offer', sidebarData.offer);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('order', sidebarData.order);
    navigate(`/search?${urlParams.toString()}`);
  };

  const onShowMoreClick = () => {
    // Increase the number of visible listings
    setVisibleListings((prev) => prev + 8); // Show 8 more listings each time
    setListings(allListings.slice(0, visibleListings + 8)); // Update the listings shown
    if (visibleListings + 8 >= allListings.length) {
      setShowMore(false); // Hide the "Show More" button when all listings are shown
    }
  };

  return (
    <div className="mt-14 flex flex-col md:flex-row">
      <div className="p-6 md:p-8 border-b-2 md:border-r-2 md:min-h-screen bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Search Term */}
          <div className="flex items-center gap-2">
            <label className="font-semibold text-gray-700">Search Term:</label>
            <input
              value={sidebarData.searchTerm}
              onChange={handleChange}
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Type (Rent, Sale, All) */}
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold text-gray-700">Type:</label>
            <div className="flex gap-2">
              <input
                checked={sidebarData.type === 'all'}
                onChange={handleChange}
                type="radio"
                id="all"
                className="w-5"
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                checked={sidebarData.type === 'rent'}
                onChange={handleChange}
                type="radio"
                id="rent"
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                checked={sidebarData.type === 'sale'}
                onChange={handleChange}
                type="radio"
                id="sale"
                className="w-5"
              />
              <span>Sale</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold text-gray-700">Amenities:</label>
            <div className="flex gap-2">
              <input
                checked={sidebarData.parking}
                onChange={handleChange}
                type="checkbox"
                id="parking"
                className="w-5"
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                checked={sidebarData.furnished}
                onChange={handleChange}
                type="checkbox"
                id="furnished"
                className="w-5"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                checked={sidebarData.offer}
                onChange={handleChange}
                type="checkbox"
                id="offer"
                className="w-5"
              />
              <span>Offer</span>
            </div>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2">
            <label className="font-semibold text-gray-700">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue="created_at_desc"
              id="sort_order"
              className="border rounded-lg p-3 focus:ring-2 focus:ring-sky-500"
            >
              <option value="regular_price_desc">Price high to low</option>
              <option value="regular_price_asc">Price low to high</option>
              <option value="created_at_desc">Latest</option>
              <option value="created_at_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-slate-500 text-white p-3 rounded-lg hover:opacity-95 transition-opacity">Search</button>
        </form>
      </div>

      {/* Listing Results */}
      <div className="flex-1 p-7">
        <h1 className="text-3xl font-semibold text-slate-700 border-b p-3 mt-5">Listing Results</h1>
        <div className="flex flex-wrap gap-6 mt-5">
          {loading && <h1 className="text-xl text-slate-600">Loading...</h1>}
          {!loading && listings.length === 0 && <h1 className="text-xl text-slate-600">No listings found</h1>}
          {!loading && listings.map((listing) => (
            <ListingItem key={listing._id} listing={listing} />
          ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="bg-slate-500 text-white p-3 rounded-lg hover:opacity-95 transition-opacity"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
