import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api"; 
import LocationPicker from "../components/LocationPicker"; 

import { useAuth } from "../context/AuthContext";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [location, setLocation] = useState(null); 
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate(); 
  const { user, logout } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleLocationSelect = (loc) => {
      setLocation(loc); 
  };
  
  const handleLogout = () => {
    logout();
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!location) {
        setError("Please select your location on the map.");
        return;
    }

    try {
      const payload = { ...form, location };
      const res = await api.post("/auth/register", payload);
      
      setMessage(res.data.msg);
      setError("");
      setTimeout(() => navigate("/login"), 3000);
      
    } catch (err) {
      setError(err.response?.data?.msg || "Registration Vayena");
      setMessage("");
    }
  };

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center border border-gray-100 dark:border-gray-700">
          <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">✨</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Account Active</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            You are currently logged in as <span className="font-semibold text-purple-600 dark:text-purple-400">{user.name}</span>.
            <br />
            To create a new account, please logout first.
          </p>
          <div className="space-y-3">
             <button
              onClick={() => navigate("/")}
              className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              Go to Home
            </button>
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse">
        
        <div className="md:w-5/12 bg-linear-to-br from-purple-600 to-pink-600 p-10 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4">Join Us!</h2>
            <p className="text-purple-100 mb-8">
              Start your journey with Kaarya. Discover local opportunities and build connections in your community.
            </p>
            <div className="w-20 h-2 bg-white rounded-full mb-8"></div>
             <p className="text-sm text-purple-200">
              "The power of community to create value is limitless."
            </p>
          </div>
        </div>

        <div className="md:w-7/12 p-8 md:p-12 overflow-y-auto max-h-screen">
          <div className="text-center md:text-left mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Create an Account</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Sign up to get started.</p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-6 text-center border border-red-200">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-lg text-sm mb-6 text-center border border-green-200">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="e.g. John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none dark:text-white"
                  />
                </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Choose a strong password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none dark:text-white"
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Location <span className="text-xs text-gray-500 font-normal">(Click on map to select)</span>
                </label>
                <div className="h-64 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <LocationPicker onLocationSelect={handleLocationSelect} />
                </div>
                {location && (
                    <p className="mt-2 text-xs text-green-600 font-medium">📍 {location.address}</p>
                )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 transition-all duration-200"
            >
              Register Now
            </button>
          </form>

          <div className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;