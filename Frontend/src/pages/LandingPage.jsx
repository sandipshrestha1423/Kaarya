import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
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
          <Link to="/login" className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
            Explore Services
          </Link>
          <Link to="/register" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition">
            Post a Service
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">How It Works</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            { title: "Join Kaarya", desc: "Register as a seeker and explore your community." },
            { title: "Discover Local Skills", desc: "Browse services offered by people nearby." },
            { title: "Offer Your Skills", desc: "Upgrade to a poster and start earning." },
          ].map((step, i) => (
            <div key={i} className="p-6 border rounded-2xl shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">Popular Categories</h2>
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-6">
          {["Tutoring", "Repairs", "Deliveries", "Tech Help", "Cleaning"].map((cat, i) => (
            <div
              key={i}
              className="p-6 text-center bg-white border rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition"
            >
              <p className="text-lg font-semibold text-gray-700">{cat}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
