import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successfull, setSuccessfull] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error on new submit
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Signup failed. Please try again.");
      }

      const data = await res.json(); // Parse JSON response
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      } else {
        setSuccessfull(true);
        setLoading(false);
        setError(null); // Reset error state after success
        console.log("Signup Successful:", data);
        setTimeout(() => {
          navigate('/sign-in'); // Redirect after 2 seconds
        }, 2000);
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      setLoading(false);
      setError(error.message); // Correct reference to error.message
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
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
              name="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <a
            href="/auth/google"
            className="w-full py-3 mt-4 flex items-center justify-center bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Continue with Google
          </a>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin">
              <span className="text-blue-600 hover:underline">Sign In</span>
            </Link>
          </p>
        </div>

        {error && <p className="text-red-500 mt-5 text-center">{error}</p>}
        {successfull && (
          <p className="text-green-400 mt-5 text-center">Sign up successful!</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
