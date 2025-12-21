import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import LocationPicker from "../components/LocationPicker";

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  const [editForm, setEditForm] = useState({
      name: "",
      mobile: "",
  });
  const [newLocation, setNewLocation] = useState(null); 
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (user) {
          setEditForm({
              name: user.name || "",
              mobile: user.mobile || "",
          });
      }
  }, [user]);

  const getInitials = (name) => {
      if (!name) return "U";
      const parts = name.split(" ");
      if (parts.length > 1) {
          return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return name.substring(0,2).toUpperCase();
  };
  
  const handleEditChange = (e) => {
      setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  
  const handleImageChange = (e) => {
      if (e.target.files && e.target.files[0]) {
          setProfileImage(e.target.files[0]);
      }
  };
  
  const handleLocationSelect = (loc) => {
      setNewLocation(loc);
  };

  const saveProfile = async () => {
      setLoading(true);
      try {
          const formData = new FormData();
          formData.append('name', editForm.name);
          formData.append('mobile', editForm.mobile);
          
          if (newLocation) {
              formData.append('location', JSON.stringify(newLocation));
          }
          if (profileImage) {
              formData.append('profileImage', profileImage);
          }
          
          const res = await api.put('/auth/profile', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data', 
              },
          });

          updateUser(res.data.user);
          setIsEditing(false); 
          alert("Profile Updated Successfully!");

      } catch (err) {
          console.error(err);
          alert("Failed to update profile.");
      } finally {
          setLoading(false);
      }
  };

  const getProfileImageUrl = () => {
      if (user?.profileImage) {
          return `http://localhost:5000/${user.profileImage}`; 
      }
      return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="bg-linear-to-r from-indigo-600 to-purple-600 h-32 md:h-48"></div>
          
          <div className="px-8 pb-8">
            <div className="relative flex justify-between items-end -mt-12 mb-6">
              
              <div className="bg-white dark:bg-gray-800 p-1 rounded-full relative group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200 dark:bg-gray-700 border-4 border-white dark:border-gray-800 flex items-center justify-center text-3xl md:text-5xl font-bold text-gray-400 dark:text-gray-500 overflow-hidden">
                   {getProfileImageUrl() ? (
                       <img src={getProfileImageUrl()} alt="Profile" className="w-full h-full object-cover" />
                   ) : (
                       getInitials(user?.name)
                   )}
                </div>
                
                {isEditing && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-bold">Change</span>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                )}
              </div>

              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              >
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>
            </div>
            
            {!isEditing ? (
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user?.name || "User Name"}</h1>
                  <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                   {user?.mobile && <p className="text-gray-500 dark:text-gray-400 mt-1">📞 {user.mobile}</p>}
                   
                   <div className="mt-4 flex flex-wrap gap-4">
                     <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium">Verified Member</span>
                     
                     {/* Dynamic Roles Display */}
                     {user?.roles && user.roles.map((role, idx) => (
                         <span key={idx} className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium capitalize">
                            {role}
                         </span>
                     ))}
                  </div>
                  
                  {user?.location && user.location.address && (
                      <p className="mt-4 text-gray-600 dark:text-gray-300">📍 {user.location.address}</p>
                  )}
                </div>
            ) : (
                <div className="space-y-4 max-w-lg">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={editForm.name} 
                            onChange={handleEditChange}
                            className="w-full mt-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mobile</label>
                        <input 
                            type="text" 
                            name="mobile" 
                            value={editForm.mobile} 
                            onChange={handleEditChange}
                            className="w-full mt-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Update Location (Optional)</label>
                        <div className="h-48 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                             <LocationPicker 
                                onLocationSelect={handleLocationSelect} 
                                initialPosition={user?.location?.coordinates ? { lat: user.location.coordinates[1], lng: user.location.coordinates[0] } : null} 
                             />
                        </div>
                    </div>

                    <button 
                        onClick={saveProfile}
                        disabled={loading}
                        className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            )}
            
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="md:col-span-1 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                 <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Community Stats</h3>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <span className="text-gray-600 dark:text-gray-400">Services Posted</span>
                       <span className="font-bold text-gray-900 dark:text-white">0</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="md:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-8 text-center">
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Recent Activity</h3>
                 <p className="text-gray-500 dark:text-gray-400 mb-6">You haven't posted anything yet.</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;