import {BrowserRouter,Routes,Route} from 'react-router-dom'
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Header from './Components/Header';
import PrivateRoute from './Components/PrivateRoute';
import React from 'react';  // Add this to your main.jsx or other JSX files
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
export default function App() {
  return (
    <BrowserRouter>
    <Header></Header>
    <Routes >
      <Route path="/" element={<Home/>}></Route>
      <Route path="/about" element={<About/>}></Route>
      
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route element={<PrivateRoute/>}>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/create-listing" element={<CreateListing/>}></Route>
       <Route path="/update-listing/:listingId" element={<UpdateListing/>}></Route>
       </Route>
    </Routes>
    </BrowserRouter>
  )
}