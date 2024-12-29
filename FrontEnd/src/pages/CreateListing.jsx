import React, { useState } from 'react';

const CreateListing = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    regularPrice: '',
    discountPrice: '',
    bathrooms: '',
    bedrooms: '',
    furnished: false,
    parking: false,
    type: '',
    offer: false,
    imageUrls: '',
    userRef: '',
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can add the API call logic here to send data to your backend
  };

  return (

    <div className="pt-16 max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Create a Listing</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-semibold mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="address" className="block font-semibold mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            
            <label htmlFor="regularPrice" className="block font-semibold mb-1">
              Regular Price <span>($/Month)</span>
            </label>
            
            
            <input
              type="number"
              id="regularPrice"
              value={formData.regularPrice}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div>
            <label htmlFor="discountPrice" className="block font-semibold mb-1">
              Discount Price <span>($/Month)</span>
            </label>
          
            <input
              type="number"
              id="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
            <div className='flex gap-2'>
          <div className='w-[20%] '>
            <label htmlFor="bathrooms" className="block font-semibold mb-1">
              Bathrooms
            </label>
            <input
              type="number"
              id="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className='w-[20%]'>
            <label htmlFor="bedrooms" className="block font-semibold mb-1">
              Bedrooms
            </label>
            <input
              type="number"
              id="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          </div>
          <div className="flex justify-evenly w-[50%]">
            <label  className="block font-semibold mb-1">
              Type
            </label>
            <div>
            <input
              type="checkbox"
              id="sale"
              className='w-5'
            
            />
            <span >Rent</span>
            </div>
            <div>
            <input
              type="checkbox"
              id="rent"
              className='w-5'
            
            />
            <span>Sell</span>
            </div>
            
            
          </div>

         
            <div className='flex justify-evenly'>
          <div className="flex items-center">
            <label htmlFor="furnished" className="font-semibold mr-2">
              Furnished
            </label>
            <input
              type="checkbox"
              id="furnished"
              checked={formData.furnished}
              onChange={handleChange}
              className="form-checkbox"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="parking" className="font-semibold mr-2">
              Parking
            </label>
            <input
              type="checkbox"
              id="parking"
              checked={formData.parking}
              onChange={handleChange}
              className="form-checkbox"
            />
          </div>

          <div className="flex items-center">
            <label htmlFor="offer" className="font-semibold mr-2">
              Offer
            </label>
            <input
              type="checkbox"
              id="offer"
              checked={formData.offer}
              onChange={handleChange}
              className="form-checkbox"
            />
          </div>
          </div>

         
          <div>
            <label htmlFor="userRef" className="block font-semibold mb-1">
              User Reference
            </label>
            <input
              type="text"
              id="userRef"
              value={formData.userRef}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <h2 className='font-semibold'>Images</h2>
           <span>Max Images Allowed: 6</span>
           <div>
            <input style={{ backgroundColor: '#79D7BE' }} className="p-3 text-white rounded-lg" type="file" id="images" accept="image/*" mulitple/>
            <button style={{ backgroundColor: '#4DA1A9' }}  className="p-3  rounded text-white ml-2">Upload</button>
           </div>
          </div>
        </div>

        <button
        style={{ backgroundColor: '#2E5077' }}
          type="submit"
          className="mt-6 w-full  text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
