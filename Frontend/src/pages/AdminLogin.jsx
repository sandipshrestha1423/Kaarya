import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
// We might want to store admin user state separately or handle it via context, 
// but for now, we'll just redirect to a dashboard or home.
// Since the requirement is just "login page", I'll focus on that.

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
      // You might want to store admin info in a separate storage key or context
      localStorage.setItem("admin", JSON.stringify(res.data.admin)); 
      alert("Admin Login Successful");
      // navigate("/admin/dashboard"); // Future step: Admin Dashboard
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Admin Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-600"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-600"
          />
          <button
            type="submit"
            className="w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
