# PropExchange

## Overview

**PropExchange** is a modern real estate marketplace built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This application allows users to seamlessly browse, create, update, and manage real estate listings, facilitating connections between buyers and sellers. With an intuitive UI, role-based access control, secure authentication, and advanced search capabilities, PropExchange is designed to provide a smooth and scalable user experience.

---

## Features

- **User Authentication & Authorization**
  - Secure login and signup with JWT-based token authentication.
  - Integration with Google OAuth for easy sign-in.
  - Role-based access control for buyers, sellers, and admins.
  
- **Real Estate Listings**
  - CRUD (Create, Read, Update, Delete) operations for managing property listings.
  - Detailed listing information including price, location, images, and amenities.
  
- **Advanced Search and Filters**
  - Filters for type, price, location, number of rooms, and more.
  - Real-time search results for a dynamic user experience.
  
- **Image Uploads**
  - Secure image handling using Firebase Storage to store property images.
  
- **User Profile Management**
  - Users can update their profiles, view their listings, and manage their properties.

- **Real-Time Updates**
  - Notifications for new listings, messages, and inquiries.

---

## Technologies Used

- **MongoDB**: NoSQL database for storing listings and user data.
- **Express.js**: Web framework for building the REST API.
- **React.js**: Frontend library for building a responsive and dynamic user interface.
- **Node.js**: Server-side JavaScript runtime for handling API requests and business logic.
- **Firebase**: Secure image uploads and storage.
- **JWT (JSON Web Tokens)**: Authentication and session management.
- **Redux Toolkit**: State management across components.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.

---

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** and **npm** (Node Package Manager)
- **MongoDB** (local or MongoDB Atlas for cloud database)
- **Firebase Account** for image storage

### Steps to Run the Application

1. Clone the repository:

    ```bash
    git clone https://github.com/InderGoswami/PropExchange.git
    cd PropExchange
    ```

2. Set up the backend:

    - Go to the backend directory:
    
        ```bash
        cd server
        ```
    
    - Install the required dependencies:
    
        ```bash
        npm install
        ```

    - Create a `.env` file in the root directory and add your MongoDB connection string and Firebase credentials:

        ```
        MONGO_URI=your_mongo_connection_string
        JWT_SECRET=your_jwt_secret_key
        FIREBASE_API_KEY=your_firebase_api_key
        ```

    - Start the backend server:

        ```bash
        npm start
        ```

3. Set up the frontend:

    - Go to the frontend directory:

        ```bash
        cd frontend
        ```

    - Install the required dependencies:

        ```bash
        npm install
        ```

    - Start the React development server:

        ```bash
        npm start
        ```

4. Access the application:

    - The frontend will be available at `http://localhost:3000`.
    - The backend will be running at `http://localhost:5173`.

---

## API Endpoints

### Authentication

- `POST /api/auth/signup`: User registration.
- `POST /api/auth/login`: User login.
- `POST /api/auth/google`: Google OAuth authentication.
- `POST /api/auth/forgot-password`: Reset password request.
- `POST /api/auth/logout`: User logout.

### Listings

- `GET /api/listings`: Get all property listings.
- `POST /api/listings`: Create a new property listing.
- `PUT /api/listings/:id`: Update an existing listing.
- `DELETE /api/listings/:id`: Delete a property listing.
- `GET /api/listings/search`: Search listings with filters (price, type, location, etc.).

### User Management

- `GET /api/users/:id`: Get user profile information.
- `PUT /api/users/:id`: Update user profile details.
- `DELETE /api/users/:id`: Delete user account.
- `GET /api/users/:id/listings`: Get all listings posted by a user.

---

## Frontend Structure

The frontend is built with React.js and uses Redux Toolkit for state management.

### Component Structure
---

## Styling

The application uses **Tailwind CSS** for a modern and responsive design. Tailwind's utility-first classes are used to speed up development and ensure that the layout adapts seamlessly to different screen sizes.

---

## Deployment

### Frontend

The frontend is deployed on **Vercel** or **Netlify** for easy and fast deployment of React applications.

### Backend

The backend is deployed using **Render** or **AWS** for scalable server hosting.

### Firebase Hosting

For image uploads, Firebase Cloud Storage is used to securely store and serve property images.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new pull request.

---



