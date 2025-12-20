import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import LocationPicker from "../components/LocationPicker";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "seeker" });
  const [location, setLocation] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleLocationSelect = (loc) => {
      setLocation(loc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include location in the payload
      const payload = { ...form, location };
      const res = await api.post("/auth/register", payload);
      login(res.data.user); // Log user in immediately via context
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
      <div className="max-w-6xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse transition-colors duration-300">
        
        {/* Right Side - Visual (Reversed for Register) */}
        <div className="md:w-5/12 bg-linear-to-br from-purple-600 to-pink-600 p-10 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-white opacity-10 transform skew-x-12"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4">Join Us!</h2>
            <p className="text-purple-100 mb-8">
              Start your journey with Kaarya. Discover local opportunities and build connections.
            </p>
            <div className="w-20 h-2 bg-white rounded-full mb-8"></div>
             <p className="text-sm text-purple-200">
              "The power of community to create health is far greater than any physician, clinic or hospital."
            </p>
          </div>
        </div>

        {/* Left Side - Form */}
        <div className="md:w-7/12 p-8 md:p-12 overflow-y-auto max-h-screen">
          <div className="text-center md:text-left mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Create an Account</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Sign up to get started.</p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-gray-600 dark:text-white transition-all outline-none"
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
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-gray-600 dark:text-white transition-all outline-none"
                  />
                </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white dark:focus:bg-gray-600 dark:text-white transition-all outline-none"
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Location <span className="text-xs text-gray-500 font-normal">(Click on map to select)</span>
                </label>
                <div className="h-64 rounded-xl overflow-hidden z-0">
                    <LocationPicker onLocationSelect={handleLocationSelect} />
                </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Register
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
};

export default Register;