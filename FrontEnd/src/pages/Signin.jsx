import React, { useState } from "react";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure,signInStart,signInSuccess } from "../redux/user/userSlice";
import OAuth from "../Components/OAuth";
const SignIn = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const {loading,error}=useSelector((state)=>state.user);
const dispatch=useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    // Replace with your API call logic
    try {
      dispatch(signInStart());
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch(signInFailure(data.message));
        throw new Error("Invalid email or password.");
      }

      
      console.log("Login successful:", data);
     dispatch(signInSuccess(data));
      setTimeout(()=>
      {navigate("/home")},2000
      )

    } catch (err) {
      dispatch(signInFailure(err.message));
      return;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {error && (
            <p className="mt-4 text-sm text-center text-red-500">{error}</p>
          )}
          <OAuth></OAuth>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            <>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-400">
            Sign Up
            </Link> 
              
            </>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
