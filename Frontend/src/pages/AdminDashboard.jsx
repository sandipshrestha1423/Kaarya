import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
      const admin = localStorage.getItem("admin");
      if (!admin) {
          navigate("/admin-login");
      }
      fetchData();
  }, []);

  const fetchData = async () => {
      try {
          const [usersRes, servicesRes] = await Promise.all([
              api.get("/admin/pending-users"),
              api.get("/admin/pending-services")
          ]);
          setUsers(usersRes.data);
          setServices(servicesRes.data);
      } catch (err) {
          console.error("Failed to fetch admin data", err);
      } finally {
          setLoading(false);
      }
  };

  const handleUserAction = async (userId, status) => {
      try {
          await api.post("/admin/verify-user", { userId, status });
          setUsers(users.filter(u => u._id !== userId));
      } catch (err) {
          alert("Action failed");
      }
  };

  const handleServiceAction = async (serviceId, status) => {
      try {
          await api.post("/admin/verify-service", { serviceId, status });
          setServices(services.filter(s => s._id !== serviceId));
      } catch (err) {
          alert("Action failed");
      }
  };

  const handleLogout = async () => {
      await api.post("/admin/logout");
      localStorage.removeItem("admin");
      navigate("/admin-login");
  };

  if (loading) return <div className="text-center mt-20 text-white">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">Logout</button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
            
            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                    User Approvals 
                    <span className="ml-2 bg-blue-600 text-xs px-2 py-1 rounded-full">{users.length}</span>
                </h2>
                <div className="space-y-4">
                    {users.length === 0 && <p className="text-gray-500">No pending users.</p>}
                    {users.map(user => (
                        <div key={user._id} className="bg-gray-700 p-4 rounded-xl flex justify-between items-center">
                            <div>
                                <p className="font-bold">{user.name}</p>
                                <p className="text-sm text-gray-400">{user.email}</p>
                                <p className="text-sm text-gray-400">{user.mobile || "No Mobile"}</p>
                                <div className="flex gap-1 mt-1">
                                    {user.roles && user.roles.map(role => (
                                        <span key={role} className="text-xs bg-gray-600 px-1 rounded uppercase text-blue-300">{role}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleUserAction(user._id, 'active')}
                                    className="bg-green-600 p-2 rounded hover:bg-green-700" title="Approve">
                                    ✓
                                </button>
                                <button 
                                    onClick={() => handleUserAction(user._id, 'rejected')}
                                    className="bg-red-600 p-2 rounded hover:bg-red-700" title="Reject">
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                    Service Approvals
                    <span className="ml-2 bg-purple-600 text-xs px-2 py-1 rounded-full">{services.length}</span>
                </h2>
                <div className="space-y-4">
                    {services.length === 0 && <p className="text-gray-500">No pending services.</p>}
                    {services.map(service => (
                        <div key={service._id} className="bg-gray-700 p-4 rounded-xl">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold">{service.title}</h3>
                                    <p className="text-xs text-purple-300 uppercase">{service.category}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handleServiceAction(service._id, 'active')}
                                        className="bg-green-600 p-2 rounded hover:bg-green-700" title="Approve">
                                        ✓
                                    </button>
                                    <button 
                                        onClick={() => handleServiceAction(service._id, 'rejected')}
                                        className="bg-red-600 p-2 rounded hover:bg-red-700" title="Reject">
                                        ✕
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2 mb-2">{service.description}</p>
                            
                            {service.type === 'offer' && (
                                <div className="mb-2 p-2 bg-gray-800 rounded text-xs border border-gray-600">
                                    {service.skills && <p><span className="text-gray-400">Skills:</span> {service.skills}</p>}
                                    {service.experience && <p><span className="text-gray-400">Exp:</span> {service.experience}</p>}
                                    {service.education && <p><span className="text-gray-400">Edu:</span> {service.education}</p>}
                                    {service.certifications && <p><span className="text-gray-400">Cert:</span> {service.certifications}</p>}
                                </div>
                            )}

                            <div className="text-xs text-gray-500">
                                Posted by: {service.user?.name || "Unknown"} <br/>
                                <span className="text-gray-400">Mobile: {service.user?.mobile || "N/A"}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;