import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate ,Link} from 'react-router-dom';
import { updateUserFailure, updateUserSuccess, updateUserStart } from '../redux/user/userSlice';
import { deleteUserFailure,deleteUserStart,deleteUserSuccess } from '../redux/user/userSlice';
import { signOutFailure,signOutSuccess,signOutStart} from '../redux/user/userSlice';
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
  const [userListings,setUserListings]=useState([]);
  const[showListingsError,setshowLisitngsError]=useState(false);
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
  const handleDeleteUser=async()=>{
    try{
      dispatch(deleteUserStart());
      const res=await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data=await res.json();
      if(data.success===false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data.message));

    }catch(error){
      dispatch(deleteUserFailure(error));
    } 
  }
  const handleSignOut = async () => {
    try {
      dispatch(signOutStart());
      const res = await fetch('/api/auth/signout');
       
      const data = await res.json();
  
      if (data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
  
      dispatch(signOutSuccess(data.message));
      
    } catch (error) {
      dispatch(signOutFailure(error.message ));
     
    }
  };
  const handleShowListings=async()=>{
    try{
      setshowLisitngsError(false)
      const res=await fetch(`api/user/listings/${currentUser._id}`);
      const data=await res.json();
      if(data.success===false){
        setshowLisitngsError(true);
        return;
      }
      setUserListings(data);
    }

    catch(error){
      setshowLisitngsError(true);
    }
  }
  const handleListingDelete=async(listingId)=>{
    try{
      const res=await fetch(`/api/listing/delete/${listingId}`,{
        method:'DELETE',
      })
      const data=await res.json();
      if(data.success===false){
        console.log(data.message);
      }
      setUserListings((prev)=>prev.filter((listing)=>listing._id!==listingId))
    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <div className="container mx-auto w-[50%] px-4 py-6 ">
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
        <div className="flex justify-between mt-5">
          <span onClick={handleDeleteUser} className='text-red-500 cursor-pointer'>Delete Account</span>
          <span onClick={handleSignOut} className='text-sky-500 cursor-pointer'>Sign Out</span>
        </div>
        
        <Link className="flex justify-center bg-orange-500 p-3 rounded-lg text-white m-2 hover:opacity-95" to={"/create-listing"}>
        Create Listing
        </Link>
        <div className='flex justify-center'>
        <button type="button" onClick={handleShowListings} className=' text-green-800 '>Show Listings</button>
        </div>
        {showListingsError&& <p className='text-red-500'>Error is displaying Listings</p>}
        
      </div>
      <div className='flex gap-2 flex-col mt-4'>
       
      {userListings && userListings.length>0 && (
        userListings.map((listing)=>(
          <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center flex-row'>
            <div>
            <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} className='h-16 w-16 object-contain rounded-lg' />
            </Link>

            <Link to={`/listing/${listing._id}`}>
            <p className='text-cyan-700 font-semibold flex-1 hover:font-bold truncate'>{listing.name}</p>
            </Link>
            </div>
            <div className='flex gap-1'>
              <button onClick={()=>handleListingDelete(listing._id)} className="text-red-600 uppercase border rounded-md p-2">Delete</button>
              <Link to={`/update-listing/${listing._id}`}>
              <button className="text-green-500 uppercase border rounded-md p-2">Edit</button>
              </Link>
            </div>
            
          </div>

        ))
      )

      }
  </div>
    </div>
  );
};

export default Profile;
