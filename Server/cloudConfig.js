import cloudinaryPkg from 'cloudinary'; // Import the whole cloudinary package
import { CloudinaryStorage } from 'multer-storage-cloudinary'; // Import CloudinaryStorage
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Extract 'v2' from the cloudinary package
const { v2: cloudinary } = cloudinaryPkg;

// Configuration for Cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_API_SECRET
});

// Set up Cloudinary storage for multer
export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'PropExchange', // Cloudinary folder
    allowedFormats: ['png', 'jpg', 'jpeg'], // Allowed file formats
    public_id: (req, file) => `computed-filename-${Date.now()}`, // Compute the file name dynamically
  },
});

// Export Cloudinary for use in other parts of your app
export default cloudinary;
