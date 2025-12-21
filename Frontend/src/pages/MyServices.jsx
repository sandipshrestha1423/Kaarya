import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const MyServices = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyServices = async () => {
      try {
        const res = await api.get("/services");
        const myServices = res.data.filter(service => 
            service.user && service.user._id === user.id
        );
        setServices(myServices);
      } catch (err) {
        console.error(err);
        setError("Failed to load your services.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
        fetchMyServices();
    }
  }, [user]);

  const handleDelete = async (id) => {
      if(!window.confirm("Are you sure you want to delete this service?")) return;

      try {
          await api.delete(`/services/${id}`);
          setServices(services.filter(service => service._id !== id));
      } catch (err) {
          alert("Failed to delete service.");
      }
  };

  if (loading) return (
      <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Services</h1>
            <Link to="/post-service" className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
                + Post New
            </Link>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {services.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-sm">
                <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't posted any services yet.</p>
                <Link to="/post-service" className="text-indigo-600 font-bold hover:underline">Get Started</Link>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                    <div key={service._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className={`h-2 ${service.type === 'offer' ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{service.category}</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${service.type === 'offer' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                    {service.type}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">{service.description}</p>
                            
                            <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                                <span className="font-bold text-gray-900 dark:text-white">Rs. {service.fee}</span>
                                <button 
                                    onClick={() => handleDelete(service._id)}
                                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default MyServices;