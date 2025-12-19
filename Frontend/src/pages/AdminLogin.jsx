import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/login", form);
      localStorage.setItem("admin", JSON.stringify(res.data.admin)); 
      alert("Admin Login Successful");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 shadow-2xl rounded-2xl p-8 md:p-10">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white tracking-tight">Admin Portal</h2>
            <p className="text-gray-400 text-sm mt-2">Restricted Access</p>
        </div>

        {error && (
            <div className="bg-red-900/50 border border-red-800 text-red-200 text-sm p-3 rounded-lg mb-6 text-center">
             {error}
            </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email</label>
              <input
                name="email"
                type="email"
                placeholder="admin@kaarya.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder-gray-600"
              />
          </div>
          <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder-gray-600"
              />
          </div>
          
          <button
            type="submit"
            className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 shadow-lg shadow-blue-900/30 transition-all duration-200"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
