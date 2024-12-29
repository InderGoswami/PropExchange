import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserFailure, updateUserSuccess, updateUserStart } from '../redux/user/userSlice';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [username, setUsername] = useState(currentUser?.username || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [password, setPassword] = useState('');
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState(''); // New state for displaying messages
  const fileRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear any previous message
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensures cookies are sent with the request
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok || data.success === false) {
        dispatch(updateUserFailure(data.message || 'Update failed'));
        setMessage(`Error: ${data.message || 'Update failed'}`);
        console.error('Error:', data.message);
        return;
      }

      dispatch(updateUserSuccess(data.user));
      setMessage('User updated successfully!');
      console.log('User updated successfully:', data.user);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setMessage(`Error: ${error.message}`);
      console.error('Update error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 ">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>

        {/* Message Display */}
        {message && (
          <div
            className={`p-4 mb-4 text-sm rounded ${
              message.startsWith('Error') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
            }`}
          >
            {message}
          </div>
        )}

        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <input type="file" ref={fileRef} hidden accept="image/*" />
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200">
              <img
                onClick={() => fileRef.current.click()}
                src={currentUser?.avatar || 'https://via.placeholder.com/150'}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-semibold">{currentUser?.username}</div>
              <div className="text-sm text-gray-500">{currentUser?.email}</div>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="username" className="font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              defaultValue={username}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              defaultValue={email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex flex-col mb-4">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              defaultValue={password}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>

          <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Update Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
