import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api"; // Import the API instance

function LandingPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services"); // Fetch from the backend
        setServices(response.data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError("Failed to load services. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex flex-col items-center justify-center text-center  py-20 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          Find or Offer Skills in Your Neighbourhood
        </h1>
        <p className="text-gray-600 max-w-2xl mb-8">
          Kaarya connects people nearby for short-term help — from tutoring and repairs to deliveries and more.
        </p>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Explore Services
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition"
          >
            Post a Service
          </Link>
        </div>
      </section>

      {/* Display Services Section */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Browse Available Services
        </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading && <p className="text-center text-gray-600">Loading services...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && services.length === 0 && !error && (
            <p className="text-center text-gray-600">No services posted yet. Be the first!</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-blue-600 text-sm mb-2">{service.category}</p>
                  <p className="text-gray-700 mb-4 line-clamp-3">{service.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>📍 {service.location}</span>
                    <span>Posted by: {service.user.name}</span>
                  </div>
                </div>
                {/* Optional: Add a "View Details" button */}
                {/* <div className="p-6 border-t border-gray-200">
                  <Link
                    to={`/service/${service._id}`} // Assuming a service detail page route
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    View Details
                  </Link>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          How It Works
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            { title: "Join Kaarya", desc: "Register as a seeker and explore your community." },
            { title: "Discover Local Skills", desc: "Browse services offered by people nearby." },
            { title: "Offer Your Skills", desc: "Upgrade to a poster and start earning." },
          ].map((step, i) => (
            <div
              key={i}
              className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Popular Categories
        </h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6">
          {["Tutoring", "Repairs", "Deliveries", "Tech Help", "Cleaning"].map(
            (cat, i) => (
              <div
                key={i}
                className="p-6 text-center bg-white border rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition"
              >
                <p className="text-lg font-semibold text-gray-700">{cat}</p>
              </div>
            )
          )}
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
