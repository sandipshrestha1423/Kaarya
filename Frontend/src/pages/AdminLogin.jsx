import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
    navigate("/admin-login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/login", form);
      // Save admin info separately
      localStorage.setItem("admin", JSON.stringify(res.data.admin));
      navigate("/admin-dashboard"); 
    } catch (err) {
      setError(err.response?.data?.msg || "Invalid admin credentials");
    }
  };

  if (admin) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
         <div className="max-w-md w-full bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700 text-center">
           <div className="text-center mb-8">
             <h2 className="text-3xl font-extrabold text-white">Admin Panel</h2>
             <p className="text-gray-400 mt-2">Restricted Access</p>
           </div>
           
           <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-6 mb-8">
             <p className="text-blue-200 mb-4">
               You are already logged in as Admin.
             </p>
             <div className="flex flex-col gap-3">
               <button
                 onClick={() => navigate("/admin-dashboard")}
                 className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
               >
                 Go to Dashboard
               </button>
               <button
                 onClick={handleLogout}
                 className="w-full py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition"
               >
                 Logout
               </button>
             </div>
           </div>
         </div>
       </div>
     );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-700">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-white">Admin Panel</h2>
          <p className="text-gray-400 mt-2">Restricted Access</p>
        </div>

        {error && (
          <div className="bg-red-900/50 text-red-200 p-3 rounded-lg text-sm mb-6 text-center border border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all duration-200"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;