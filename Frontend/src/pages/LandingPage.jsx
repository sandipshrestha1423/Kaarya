import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api"; // Import the API instance
import { useAuth } from "../context/AuthContext";

function LandingPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleServiceClick = (service) => {
      // If current user is the owner of the service, go to profile
      if (user && service.user && user.id === service.user._id) {
          navigate('/profile');
      } else {
          // Else go to service details
          navigate(`/service/${service._id}`);
      }
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        // Filter out services where user is null (deleted users)
        const validServices = response.data.filter(service => service.user);
        setServices(validServices);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10 transition-colors duration-300"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-200 dark:bg-indigo-900 rounded-full blur-3xl opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-6 border border-indigo-200 dark:border-indigo-800">
            🚀 Connect with your community
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 transition-colors duration-300">
            Find Help. <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Offer Skills.</span>
            <br /> All Nearby.
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed transition-colors duration-300">
            Kaarya bridges the gap between neighbors. Whether you need a quick repair, a tutor, or just a helping hand, find it here or offer your own expertise.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/login"
              className="px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Explore Services
            </Link>
            <Link
              to="/register"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 text-lg font-bold rounded-full shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-md transition-all duration-300"
            >
              Post a Service
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-12 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-8">
            Popular Categories
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Tutoring", "Repairs", "Deliveries", "Tech Help", "Cleaning", "Events", "Gardening"].map(
              (cat, i) => (
                <div
                  key={i}
                  className="px-6 py-2 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/50 hover:text-indigo-700 dark:hover:text-indigo-300 transition cursor-pointer font-medium"
                >
                  {cat}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Display Services Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Latest Services
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-400 transition-colors duration-300">See what your neighbors are offering.</p>
            </div>
            {/* <Link to="/services" className="hidden md:block text-indigo-600 font-semibold hover:text-indigo-800">View All &rarr;</Link> */}
          </div>

          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r shadow-sm">
               <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {!loading && services.length === 0 && !error && (
            <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
               <p className="text-gray-500 dark:text-gray-400 text-lg">No services posted yet. Be the first to add one!</p>
               <Link to="/post-service" className="mt-4 inline-block text-indigo-600 dark:text-indigo-400 font-medium">Create a Post &rarr;</Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                onClick={() => handleServiceClick(service)}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col h-full cursor-pointer"
              >
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase rounded-full tracking-wide">
                      {service.category}
                    </span>
                    <span className="text-gray-400 text-xs">
                       {/* Date placeholder if available */}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-600 flex items-center justify-between transition-colors duration-300">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-500 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-200">
                      {service.user?.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-gray-900 dark:text-gray-200">{service.user?.name || "Unknown User"}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {service.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
            How Kaarya Works
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                title: "1. Create an Account", 
                desc: "Sign up in seconds to start exploring or posting services in your area.",
                icon: (
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                ),
                color: "from-blue-400 to-blue-600"
              },
              { 
                title: "2. Find or Post", 
                desc: "Browse local listings for help you need, or create a post to offer your own skills.", 
                icon: (
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                ),
                color: "from-purple-400 to-purple-600"
              },
              { 
                title: "3. Connect & Solve", 
                desc: "Get in touch, get the job done, and build a stronger local community.", 
                icon: (
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                ),
                color: "from-indigo-400 to-indigo-600"
              },
            ].map((step, i) => (
              <div
                key={i}
                className="relative p-8 rounded-3xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-2xl bg-linear-to-br ${step.color} shadow-lg flex items-center justify-center`}>
                  {step.icon}
                </div>
                <h3 className="mt-8 text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 dark:bg-black text-white relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to join your community?</h2>
          <p className="text-indigo-200 text-lg mb-10">Join Kaarya today and start making meaningful connections in your neighborhood.</p>
          <Link
             to="/register"
             className="inline-block px-10 py-4 bg-white text-indigo-900 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300"
          >
             Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
