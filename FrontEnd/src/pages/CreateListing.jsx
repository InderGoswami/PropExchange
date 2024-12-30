import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CreateListing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    regularPrice: 0,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: 'rent',
    offer: false,
    imageUrls: [],
    userRef: '',
  });

  const [uploadingImages, setUploadingImages] = useState(false);
  const [savingListing, setSavingListing] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadListSuccess, setUploadListSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    if (files.length > 0 && files.length <= 6) {
      const imageData = new FormData();
      for (let file of files) {
        imageData.append('images', file);
      }

      setUploadingImages(true);
      setError(null);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: imageData,
        });

        if (!response.ok) {
          throw new Error('Error uploading files');
        }

        const result = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          imageUrls: result.imageUrls,
        }));
        setUploadSuccess(true);
      } catch (err) {
        console.error(err);
        setError('Error uploading files. Please try again.');
      } finally {
        setUploadingImages(false);
      }
    } else {
      alert('Please select between 1 and 6 images.');
    }
  };

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavingListing(true);
    setError(null);
  
    if (!currentUser || !currentUser._id) {
      console.error("Current user ID is missing");
      setError("User not logged in");
      setSavingListing(false);
      return;
    }
  
    try {
      const requestBody = {
        ...formData,
        userRef: currentUser._id,
      };
      console.log("Form Data being sent:", requestBody); // Log the body for debugging
  
      const response = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      const result = await response.json();
      console.log(result);
  
      if (!response.ok) {
        throw new Error(result.message || 'Error creating listing');
      }
  
      setUploadListSuccess(true);
    } catch (err) {
      console.error("Error creating listing:", err);
      setError(err.message || "An unknown error occurred");
    } finally {
      setSavingListing(false);
    }
  };
  ;

  return (
    <div className="pt-16 max-w-5xl mx-auto p-8 bg-gradient-to-br from-gray-50 via-gray-100 to-white shadow-lg rounded-lg">
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
              <label className="block font-semibold mb-1">Type</label>
              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    id="rent"
                    name="type"
                    value="rent"
                    checked={formData.type === 'rent'}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        type: e.target.value,
                      }))
                    }
                  />
                  
                 <span></span> Rent
                </label>
                <label>
                  <input
                    type="radio"
                    id="sale"
                    name="type"
                    value="sale"
                    checked={formData.type === 'sale'}
                    onChange={(e) =>
                      setFormData((prevData) => ({
                        ...prevData,
                        type: e.target.value,
                      }))
                    }
                  
                  />
                  <span> </span>Sale
                </label>
              </div>
            </div>
          <div>
            <label htmlFor="regularPrice" className="block font-semibold mb-1">
              Regular Price {formData.type==="rent" && <span>($/Month)</span>}
            </label>
            <input
              type="number"
              min="50"
              max="10000000"
              id="regularPrice"
              value={formData.regularPrice}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          {formData.offer && (
          <div>
            <label htmlFor="discountPrice" className="block font-semibold mb-1">
              Discount Price {formData.type==="rent" && <span>($/Month)</span>}
            </label>
            <input
              type="number"
              id="discountPrice"
              value={formData.discountPrice}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>)}

          <div className="flex gap-2">
            <div className="w-[20%]">
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

            <div className="w-[20%]">
              <label htmlFor="bedrooms" className="block font-semibold mb-1">
                Bedrooms
              </label>
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="flex flex-row gap-4">
            

            <div className="flex items-center gap-4">
              <label>
                <input
                  type="checkbox"
                  id="parking"
                  checked={formData.parking}
                  onChange={handleChange}
                />
                &nbsp; Parking Spot
              </label>
              <label>
                <input
                  type="checkbox"
                  id="furnished"
                  checked={formData.furnished}
                  onChange={handleChange}
                />
                &nbsp;  Furnished
              </label>
              <label>
                <input
                  type="checkbox"
                  id="offer"
                  checked={formData.offer}
                  onChange={handleChange}
                />
                &nbsp; Offer
              </label>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="images" className="block font-semibold mb-1">
            Select Images
          </label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => setFiles(e.target.files)}
            className="w-full p-2 border rounded-md"
          />
          <button
            type="button"
            onClick={handleImageSubmit}
            className="mt-2 w-full py-2 bg-blue-500 text-white rounded-md"
            disabled={uploadingImages}
          >
            {uploadingImages ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>

        {uploadSuccess && (
          <div className="mt-4 text-green-500 font-semibold">
            Files uploaded successfully!
          </div>
        )}

        {formData.imageUrls.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Uploaded Files:</h3>
            <ul className="grid grid-cols-3 gap-4">
              {formData.imageUrls.map((url, index) => (
                <li key={index}>
                  <img src={url} alt={`Uploaded file ${index + 1}`} className="w-32 h-32 object-cover" />
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md hover:opacity-95 disabled:opacity-80"
          disabled={savingListing}
        >
          {savingListing ? 'Submitting...' : 'Create Listing'}
        </button>

        {error && <p className="text-red-700 text-sm mt-2">{error}</p>}
        {uploadListSuccess && (
          <p className="text-green-700 text-sm mt-2">Listing added successfully!</p>
        )}
      </form>
    </div>
  );
};

export default CreateListing;
