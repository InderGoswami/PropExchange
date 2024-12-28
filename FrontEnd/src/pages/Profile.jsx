import React, { useState ,useRef} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const fileRef=useRef();

  // Handle form submission for updating user info
  const handleUpdate = () => {
    // Logic to handle updating user info (e.g., API call)
    console.log('User updated', { username, email, password });
  };

  // Handle create listing action
  const handleCreateListing = () => {
    // Navigate to listing creation page
    navigate('/create-listing');
  };

  // Handle sign out
  const handleSignOut = () => {
    // Clear user data and redirect to sign-in page
    navigate('/signin');
  };

  // Handle delete account action
  const handleDeleteAccount = () => {
    // Logic to delete the account (e.g., API call)
    console.log('Account deleted');
    navigate('/signin');
  };

  return (
    <div className="container mx-auto px-4 py-6 ">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>

       
       

       
        <form className="mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <input type="file" ref={fileRef} hidden accept='image/*'/>
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
            
            <img onClick={()=>fileRef.current.click()} src={currentUser?.avatar || 'https://via.placeholder.com/150'} alt="User" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <div className="text-lg font-semibold">{currentUser?.username}</div>
            <div className="text-sm text-gray-500">{currentUser?.email}</div>
          </div>
        </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="font-semibold">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="font-semibold">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="font-semibold">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Update Information
          </button>
        </form>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleCreateListing}
            className="py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Create Listing
          </button>

          <button
            onClick={handleSignOut}
            className="py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Sign Out
          </button>

          <button
            onClick={handleDeleteAccount}
            className="py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Delete Account
          </button>
        </div>

        {/* Links */}
        <div className="mt-6 text-sm text-center">
          <a href="/listings" className="text-blue-500 hover:underline">Show My Listings</a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
