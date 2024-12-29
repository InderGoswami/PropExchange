import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import { storage } from './cloudConfig.js'; // Assuming this is your Cloudinary storage config
import multer from 'multer';

dotenv.config(); // Loads environment variables from your .env file

// MongoDB connection
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });

const app = express();

// Enable CORS for all routes, with credentials allowed
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  credentials: true, // Allow credentials (cookies, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] // Allow these HTTP methods
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Multer and Cloudinary setup for image uploads
const upload = multer({ storage });

// Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Image Upload Route (using multer for file uploads and cloudinary storage)
app.post('/api/upload', upload.array('images', 6), async (req, res) => {
  try {
    // Log files for debugging
    console.log('Uploaded files:', req.files);
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No files uploaded');
    }

    // Extract image URLs from the Cloudinary response
    const imageUrls = req.files.map(file => file.path); // Assuming 'file.path' is the Cloudinary URL

    res.json({
      message: 'Files uploaded successfully',
      imageUrls: imageUrls, // Send the Cloudinary URLs back
    });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).send('Internal server error');
  }
});

// Global error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
