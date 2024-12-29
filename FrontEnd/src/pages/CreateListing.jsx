import React, { useState } from 'react';

const CreateListing = () => {
  const [files, setFiles] = useState([]);
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
    imageUrls: [],
    userRef: '',
  });
  
  const [loading, setLoading] = useState(false); // State to handle loading effect
  const [uploadSuccess, setUploadSuccess] = useState(false); // State to handle success message

  const handleImageSubmit = async (e) => {
    e.preventDefault();

    if (files.length > 0 && files.length <= 6) {
      const formData = new FormData();
      // Append each selected file to the FormData object
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }

      setLoading(true); // Start the loading effect

      try {
        // Send a POST request to the backend with the files
        const response = await fetch('api/upload', {
          method: 'POST',
          body: formData, // FormData contains the files
        });
        console.log(response);
        if (!response.ok) {
          throw new Error('Error uploading files');
        }

        const result = await response.json();
        console.log('Files uploaded successfully:', result.imageUrls);

        // Save the image URLs in formData
        setFormData((prevData) => ({
          ...prevData,
          imageUrls: result.imageUrls, // Store the uploaded image URLs
        }));
        
        setUploadSuccess(true); // Set success message
        setLoading(false); // End the loading effect
      } catch (error) {
        console.error('Error uploading files:', error);
        alert('Error uploading files. Please try again.');
        setLoading(false); // End the loading effect on error
      }
    } else {
      alert('Please select between 1 and 6 images.');
    }
  };

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
                value={formData.bedrooms}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-evenly w-[50%]">
            <label className="block font-semibold mb-1">Type</label>
            <div>
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
              />
              <span>Rent</span>
            </div>
            <div>
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
              />
              <span>Sale</span>
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
            disabled={loading} // Disable button during upload
          >
            {loading ? (
              <span>Uploading...</span> // Show uploading text while uploading
            ) : (
              <span>Upload Images</span>
            )}
          </button>
        </div>

        {/* Success message */}
        {uploadSuccess && (
          <div className="mt-4 text-green-500 font-semibold">
            Files uploaded successfully!
          </div>
        )}

        {/* Display the list of uploaded files */}
        {formData.imageUrls.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Uploaded Files:</h3>
            <ul>
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
          className="mt-4 w-full py-2 bg-blue-500 text-white rounded-md"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default CreateListing;
