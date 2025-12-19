import React from 'react';
import { getUser } from '../utils/auth';

const Profile = () => {
  const user = getUser();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mb-8 transition-colors duration-300">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32 md:h-48"></div>
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              <div className="bg-white dark:bg-gray-800 p-1 rounded-full transition-colors duration-300">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-800 flex items-center justify-center text-3xl font-bold text-gray-400 dark:text-gray-500">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
                Edit Profile
              </button>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user?.name || "User Name"}</h1>
              <p className="text-gray-500 dark:text-gray-400">{user?.email || "user@example.com"}</p>
              <div className="mt-4 flex gap-4">
                 <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">Verified Member</span>
                 <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">Community Starter</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {/* Sidebar / Stats */}
           <div className="md:col-span-1 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transition-colors duration-300">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Community Stats</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-gray-600 dark:text-gray-400">Services Posted</span>
                       <span className="font-bold text-gray-900 dark:text-white">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-gray-600 dark:text-gray-400">Reviews</span>
                       <span className="font-bold text-gray-900 dark:text-white">0</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-gray-600 dark:text-gray-400">Rating</span>
                       <span className="font-bold text-gray-900 dark:text-white">N/A</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Main Content Area */}
           <div className="md:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-center transition-colors duration-300">
                 <div className="inline-block p-4 bg-gray-50 dark:bg-gray-700 rounded-full mb-4">
                    <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Recent Activity</h3>
                 <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't posted or interacted with any services yet.</p>
                 <button className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">Browse Services</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
