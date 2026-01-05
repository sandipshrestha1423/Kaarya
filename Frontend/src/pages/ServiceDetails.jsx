import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

function ServiceDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const { user: authUser } = useAuth(); 

  const [service, setService] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 
  const [requestStatus, setRequestStatus] = useState(null); // 'pending', 'accepted', 'rejected', or null
  const [isAdmin, setIsAdmin] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
        const admin = localStorage.getItem("admin");
        setIsAdmin(!!admin);
    };
    checkAdmin();

    const fetchService = async () => {
      try {
        const res = await api.get(`/services/${id}`);
        setService(res.data);
        
        if (authUser && !isAdmin) {
            try {
                const requestsRes = await api.get('/gig-requests/requester');
                const myRequest = requestsRes.data.find(req => req.service._id === id || req.service === id);
                if (myRequest) {
                    setRequestStatus(myRequest.status);
                }
            } catch (reqErr) {
                console.error("Error fetching requests", reqErr);
            }
        }

      } catch (err) {
        console.error(err);
        setError("Could not load service details.");
      } finally {
        setLoading(false); 
      }
    };
    fetchService();
  }, [id, authUser, isAdmin]);

  const handleRequestGig = async () => {
      if (!authUser) {
          navigate('/login');
          return;
      }
      setProcessing(true);
      try {
          await api.post('/gig-requests', { serviceId: id, message: "I'm interested in this service." });
          setRequestStatus('pending');
          alert("Request sent successfully!");
      } catch (err) {
          console.error(err);
          alert(err.response?.data?.msg || "Failed to send request.");
      } finally {
          setProcessing(false);
      }
  };

  const handleContact = () => {
      if (!authUser) { 
          navigate('/login');
      } else {
          navigate('/messages');
      }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!service) return <div className="text-center mt-20">Service not found</div>;

  const { title, description, category, fee, feeUnit, preferredTime, preferredDay, location, user, type } = service;
  
  const getInitials = (name) => {
      if (!name || typeof name !== 'string') return "U";
      const parts = name.split(" ");
      if (parts.length > 1) {
          return (parts[0][0] + (parts[1][0] || '')).toUpperCase();
      }
      return name.substring(0,2).toUpperCase();
  };

  const getProfileImage = () => {
      if (user?.profileImage) {
          return `http://localhost:5000/${user.profileImage}`;
      }
      return null;
  };
  
  const isOwner = authUser && user && authUser._id === user._id;
  const showPhone = isAdmin || (requestStatus === 'accepted') || isOwner;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
        
        <div className={`h-32 ${type === 'offer' ? 'bg-linear-to-r from-purple-600 to-indigo-600' : 'bg-linear-to-r from-blue-500 to-cyan-500'}`}></div>
        
        <div className="px-8 pb-8 relative">
           
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end -mt-12 mb-8">
               <div className="flex items-end">
                   <div className="bg-white dark:bg-gray-800 p-1 rounded-2xl shadow-lg">
                       <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center text-3xl font-bold text-gray-500 dark:text-gray-300 overflow-hidden">
                           {getProfileImage() ? (
                               <img src={getProfileImage()} alt={user?.name} className="w-full h-full object-cover" />
                           ) : (
                               getInitials(user?.name)
                           )}
                       </div>
                   </div>
                   
                   <div className="ml-4 mb-2">
                       <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-tight">{title}</h1>
                       <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                           <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded text-xs font-bold uppercase mr-2">{category}</span>
                           <span>Posted by {user?.name}</span>
                       </div>
                   </div>
               </div>

               {/* <div className="mt-4 md:mt-0">
                    <span className={`inline-block px-4 py-2 rounded-lg font-bold text-white shadow-md ${type === 'offer' ? 'bg-purple-600' : 'bg-blue-600'}`}>
                        {type === 'offer' ? 'Offer' : 'Request'}
                    </span>
               </div> */}
           </div>

           <div className="grid md:grid-cols-3 gap-8">
               
               <div className="md:col-span-2 space-y-8">
                   <section>
                       <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Description</h3>
                       <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                           {description}
                       </p>
                   </section>

                   <section>
                       <h3 className="text-lg font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2 mb-4">Details</h3>
                       <div className="grid grid-cols-2 gap-4">
                           <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                               <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Fee</p>
                               <p className="text-lg font-bold text-gray-900 dark:text-white">Rs. {fee} <span className="text-sm font-normal text-gray-500">/ {feeUnit}</span></p>
                           </div>
                           <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                               <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Location</p>
                               <p className="text-lg font-bold text-gray-900 dark:text-white truncate" title={location}>{location}</p>
                           </div>
                           <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                               <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Time</p>
                               <p className="text-lg font-bold text-gray-900 dark:text-white">{preferredTime}</p>
                           </div>
                           <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                               <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Days</p>
                               <p className="text-lg font-bold text-gray-900 dark:text-white">{preferredDay}</p>
                           </div>
                       </div>
                   </section>
               </div>

               <div className="md:col-span-1">
                   <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-800">
                       <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200 mb-4">Contact Provider</h3>
                       <div className="space-y-4">
                           <div>
                               <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                               <p className="text-indigo-600 dark:text-indigo-400 font-medium truncate">
                                   {user?.email}
                               </p>
                           </div>
                           
                           {showPhone && user?.mobile && (
                               <div>
                                   <p className="text-sm text-gray-500 dark:text-gray-400">Mobile</p>
                                   <p className="text-indigo-600 dark:text-indigo-400 font-medium">
                                       {user?.mobile}
                                   </p>
                               </div>
                           )}
                           
                           {!isOwner && !isAdmin && (
                               <>
                                   {requestStatus ? (
                                       <div className={`mt-4 py-3 text-center font-bold rounded-xl ${
                                           requestStatus === 'accepted' ? 'bg-green-100 text-green-700' :
                                           requestStatus === 'rejected' ? 'bg-red-100 text-red-700' :
                                           'bg-yellow-100 text-yellow-700'
                                       }`}>
                                           Request {requestStatus.charAt(0).toUpperCase() + requestStatus.slice(1)}
                                       </div>
                                   ) : (
                                       <button 
                                            onClick={handleRequestGig}
                                            disabled={processing}
                                            className="w-full mt-4 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow hover:bg-indigo-700 transition"
                                       >
                                           {processing ? 'Sending...' : 'Request Gig'}
                                       </button>
                                   )}
                               </>
                           )}
                           
                           <button 
                                onClick={handleContact}
                                className="w-full mt-2 py-3 bg-white border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl shadow hover:bg-indigo-50 transition"
                           >
                               Message Now
                           </button>
                       </div>
                   </div>
               </div>

           </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;