import React, { useEffect, useState } from "react";
import API from "../api/api";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    try {
      const res = await API.get("/services");
      setServices(res.data);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching services:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">Loading services...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6">
      <h2 className="text-3xl font-semibold mb-6">Available Services</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service._id} className="border shadow-md rounded-lg p-4">
            <h3 className="text-xl font-bold">{service.title}</h3>

            <p className="text-gray-600 mt-1">{service.description}</p>

            <p className="mt-2 text-blue-600 font-semibold">
              ₹ {service.price}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              Location: {service.location}
            </p>

            <button className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Contact
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
