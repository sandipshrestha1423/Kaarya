import React, { useState } from 'react';

function HowItWorks() {
  const [activeTab, setActiveTab] = useState('seeker'); // 'seeker' or 'poster'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col">
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10 transition-colors duration-300"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-200 dark:bg-indigo-900 rounded-full blur-3xl opacity-30"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-semibold mb-6 border border-indigo-200 dark:border-indigo-800">
            💡 The Process
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 transition-colors duration-300">
            Simple. Fast. <br/>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              Hyper-Local.
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed transition-colors duration-300">
            Kaarya makes it incredibly easy to connect with people nearby. Here’s how you can get started.
          </p>
        </div>
      </section>

      {/* Toggle Tabs */}
      <section className="py-10 px-4 bg-white dark:bg-gray-800 transition-colors duration-300 border-y border-gray-100 dark:border-gray-700">
        <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex bg-gray-50 dark:bg-gray-900 p-1 rounded-full shadow-inner border border-gray-100 dark:border-gray-700">
                <button 
                    onClick={() => setActiveTab('seeker')}
                    className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${activeTab === 'seeker' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                    I Need Help
                </button>
                <button 
                    onClick={() => setActiveTab('poster')}
                    className={`px-8 py-3 rounded-full font-bold transition-all duration-300 ${activeTab === 'poster' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                    I Want to Earn
                </button>
            </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 grow bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-5xl mx-auto">
              {activeTab === 'seeker' ? (
                  <div className="space-y-12">
                      {[
                          { num: 1, title: "Search Services", desc: "Browse through categories like Repairs, Tutoring, or Cleaning to find exactly what you need in your locality.", icon: "🔍" },
                          { num: 2, title: "Connect", desc: "View profiles, check ratings (coming soon), and contact the service provider directly.", icon: "💬" },
                          { num: 3, title: "Get it Done", desc: "Agree on a time and price, get your task completed, and pay the provider.", icon: "✅" }
                      ].map((step) => (
                          <div key={step.num} className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
                              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center text-3xl font-bold mb-6 md:mb-0 md:mr-8 shrink-0">
                                  {step.icon}
                              </div>
                              <div className="text-center md:text-left">
                                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Step {step.num}: {step.title}</h3>
                                  <p className="text-gray-600 dark:text-gray-300 text-lg">{step.desc}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              ) : (
                  <div className="space-y-12">
                      {[
                          { num: 1, title: "Post a Service", desc: "Create a listing describing your skills, your location, and what you offer.", icon: "📝" },
                          { num: 2, title: "Get Noticed", desc: "Your service becomes visible to everyone in your neighborhood immediately.", icon: "👀" },
                          { num: 3, title: "Start Earning", desc: "Receive inquiries, complete tasks, and build your reputation.", icon: "💰" }
                      ].map((step) => (
                          <div key={step.num} className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
                              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center text-3xl font-bold mb-6 md:mb-0 md:mr-8 shrink-0">
                                  {step.icon}
                              </div>
                              <div className="text-center md:text-left">
                                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Step {step.num}: {step.title}</h3>
                                  <p className="text-gray-600 dark:text-gray-300 text-lg">{step.desc}</p>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors duration-300">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">Is it free to join?</h4>
                      <p className="text-gray-600 dark:text-gray-300">Yes! Creating an account and browsing services is completely free.</p>
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl transition-colors duration-300">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">How do I pay?</h4>
                      <p className="text-gray-600 dark:text-gray-300">Payments are currently handled directly between users (cash or QR) after the job is done.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* CTA Section (Footer) */}
      <section className="py-20 bg-gray-900 dark:bg-black text-white relative overflow-hidden transition-colors duration-300">
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

export default HowItWorks;