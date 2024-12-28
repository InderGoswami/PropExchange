import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successfull, setSuccessfull] = useState(false);

  const navigate = useNavigate();

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
    setError(null);

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Signup failed. Please try again.");
      }

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
      } else {
        setSuccessfull(true);
        setLoading(false);
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">Sign Up</h2>

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
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>

          <OAuth className="mt-4" />

        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {successfull && (
          <p className="text-green-400 mt-4 text-center">Sign up successful!</p>
        )}
      </div>
    </div>
  );
};

export default Signup;
