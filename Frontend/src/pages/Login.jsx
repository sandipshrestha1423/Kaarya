import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import api from "../api/api"; 

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); 
  const { login } = useAuth(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const res = await api.post("/auth/login", form);
      
      login(res.data.user);
      navigate("/"); 
      
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        
        <div className="md:w-1/2 bg-linear-to-br from-indigo-600 to-purple-700 p-10 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl font-extrabold mb-4">Welcome Back!</h2>
            <p className="text-indigo-100 mb-8">
              Connect with your neighborhood. Login to find help or offer your skills today.
            </p>
            <div className="w-20 h-2 bg-white rounded-full mb-8"></div>
            <p className="text-sm text-indigo-200">
              "Community is about doing something together that makes belonging matter."
            </p>
          </div>
        </div>

        <div className="md:w-1/2 p-8 md:p-12">
          <div className="text-center md:text-left mb-8">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Login to Kaarya</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Please enter your details to continue.</p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm mb-6 text-center border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Your secret password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700 transition-all duration-200"
            >
              Sign In
            </button>
          </form>

          <div className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;