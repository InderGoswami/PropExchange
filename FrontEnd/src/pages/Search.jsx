import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search() {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
  const [listings, setListings] = useState([]);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });
  useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const searchTermFromUrl=urlParams.get('searchTerm');
    const typeFromUrl=urlParams.get('type');
    const parkingFromUrl=urlParams.get('parking');
    const furnishedFromUrl=urlParams.get('furnished');
    const offerFromUrl=urlParams.get('offer');
    const sortFromUrl=urlParams.get('sort');
    const orderFromUrl=urlParams.get('order');
    if(searchTermFromUrl || typeFromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl){
      setSidebarData({searchTerm:searchTermFromUrl || '' , type:typeFromUrl || 'all', parking:parkingFromUrl==='true'?true:false , furnished:furnishedFromUrl === 'true'?true:false, offer:offerFromUrl === 'true'?true:false, sort:sortFromUrl || 'created_at', order:orderFromUrl || 'desc' });
    }
    const fetchListings = async () => {
        setLoading(true);
        const searchQuery=urlParams.toString();
        const response = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await response.json();
        setListings(data);
        setLoading(false);
        

    }
    fetchListings();
  },[location.search])

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

  return (
    <div className="mt-14 flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">Search Term:</label>
            <input
              value={sidebarData.searchTerm}
              onChange={handleChange}
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="border rounded-lg p-3 w-full"
            />
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
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

          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
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

          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue="created_at_desc"
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="regular_price_desc">Price high to low</option>
              <option value="regular_price_asc">Price low to high</option>
              <option value="created_at_desc">Latest</option>
              <option value="created_at_asc">Oldest</option>
            </select>
          </div>

          <button className="bg-slate-500 text-white p-3 rounded-lg hover:opacity-95">Search</button>
        </form>
      </div>

      <div className="">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Listing results</h1>
      </div>
    </div>
  );
}

export default Search;
