import React from 'react';

function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10 transition-colors duration-300"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-200 dark:bg-indigo-900 rounded-full blur-3xl opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-6 border border-indigo-200 dark:border-indigo-800">
            📖 Our Story
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 transition-colors duration-300">
            Empowering Communities, <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              One Connection at a Time.
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed transition-colors duration-300">
            Kaarya isn't just a platform; it's a movement to bring neighbors closer. We believe that help should always be just around the corner.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-800 transition-colors duration-300 flex-grow">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
                <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-2xl shadow-xl transform rotate-2">
                     <img 
                        src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="Community Collaboration" 
                        className="rounded-xl w-full h-auto object-cover"
                     />
                </div>
            </div>
            <div className="md:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    In a world that is increasingly digital, we often forget the value of local connections. Kaarya was born from a simple idea: 
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400"> everyone has a skill to offer, and everyone needs a hand sometimes.</span>
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    We aim to create a trusted, safe, and hyper-local marketplace where you can find a tutor for your child, a plumber for your leak, or someone to walk your dog—all within your own neighborhood.
                </p>
            </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">Core Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: "Trust & Safety", icon: "🛡️", desc: "We prioritize your safety with verified profiles and secure interactions." },
                    { title: "Community First", icon: "🤝", desc: "We build features that foster real relationships, not just transactions." },
                    { title: "Accessibility", icon: "🌍", desc: "Help should be available to everyone, everywhere, at any time." }
                ].map((value, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 text-center group border border-gray-100 dark:border-gray-700">
                        <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{value.desc}</p>
                    </div>
                ))}
            </div>
          </div>
      </section>

      {/* CTA Section (Footer-like) */}
      <section className="py-20 bg-gray-900 dark:bg-black text-white relative overflow-hidden transition-colors duration-300 mt-auto">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to join your community?</h2>
          <p className="text-indigo-200 text-lg mb-10">Join Kaarya today and start making meaningful connections in your neighborhood.</p>
          <button className="inline-block px-10 py-4 bg-white text-indigo-900 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300">
             Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}

export default About;