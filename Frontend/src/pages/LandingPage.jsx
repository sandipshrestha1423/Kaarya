import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api"; 
import { useAuth } from "../context/AuthContext"; 

function LandingPage() {
  const [services, setServices] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); 
  const { user } = useAuth(); 

  const handleServiceClick = (service) => {
      if (user && service.user && user.id === service.user._id) {
          navigate('/profile');
      } else {
          navigate(`/service/${service._id}`);
      }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        const validServices = response.data.filter(s => s.user);
        setServices(validServices);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Oops! We couldn't load the services right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-6 border border-indigo-200 dark:border-indigo-800">
            🚀 Connect with your community
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
            Find Help. <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Offer Skills.</span>
            <br /> All Nearby.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Kaarya bridges the gap between neighbors. Whether you need a quick repair, a tutor, or just a helping hand, find it here or offer your own expertise.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              Explore Services
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 text-lg font-bold rounded-full shadow-sm hover:bg-gray-50 transition-all duration-300"
            >
              Post a Service
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-8">
            Popular Categories
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Tutoring", "Repairs", "Deliveries", "Tech Help", "Cleaning", "Events", "Gardening"].map(
              (cat, i) => (
                <div
                  key={i}
                  className="px-6 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full border border-gray-200 hover:border-indigo-300 transition cursor-pointer font-medium"
                >
                  {cat}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Latest Services
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">See what your neighbors are offering or looking for.</p>
          </div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 p-4 rounded text-red-700 border-l-4 border-red-500">
               {error}
            </div>
          )}

          {!loading && services.length === 0 && !error && (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
               <p className="text-gray-500 dark:text-gray-400 text-lg">No services posted yet. Be the first!</p>
               <Link to="/register" className="mt-4 inline-block text-indigo-600 font-medium hover:underline">Sign up to post &rarr;</Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                onClick={() => handleServiceClick(service)}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase rounded-full">
                      {service.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${service.type === 'offer' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                        {service.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
                    {service.description}
                  </p>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                      {service.user?.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-gray-900 dark:text-gray-200">{service.user?.name || "User"}</span>
                      <span className="text-[10px] text-gray-500 dark:text-gray-400">📍 {service.location}</span>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-indigo-600">
                      Rs. {service.fee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
            How Kaarya Works
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                title: "1. Create an Account", 
                desc: "Sign up in seconds to start exploring or posting services in your area.",
                color: "from-blue-400 to-blue-600"
              },
              { 
                title: "2. Find or Post", 
                desc: "Browse local listings for help you need, or create a post to offer your own skills.", 
                color: "from-purple-400 to-purple-600"
              },
              { 
                title: "3. Connect & Solve", 
                desc: "Get in touch, get the job done, and build a stronger local community.", 
                color: "from-indigo-400 to-indigo-600"
              },
            ].map((step, i) => (
              <div
                key={i}
                className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to join your community?</h2>
        <p className="text-indigo-200 text-lg mb-10 max-w-lg mx-auto">Join Kaarya today and start making meaningful connections in your neighborhood.</p>
        <Link
            to="/register"
            className="inline-block px-10 py-4 bg-white text-indigo-900 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
        >
            Get Started Now
        </Link>
      </section>
    </div>
  );
}

export default LandingPage;