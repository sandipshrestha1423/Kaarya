import React, { useState, useEffect } from 'react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';

const Requests = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('sent'); // 'sent' or 'received'
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const sentRes = await api.get('/gig-requests/requester');
      setSentRequests(sentRes.data);

      const receivedRes = await api.get('/gig-requests/provider');
      setReceivedRequests(receivedRes.data);
    } catch (err) {
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await api.put(`/gig-requests/${requestId}/status`, { status: newStatus });
      // Update local state
      setReceivedRequests(prev => prev.map(req => 
        req._id === requestId ? { ...req, status: newStatus } : req
      ));
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    }
  };

  if (loading) {
     return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Gig Requests</h1>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 dark:bg-gray-700 p-1 rounded-xl mb-8 w-fit">
          <button
            onClick={() => setActiveTab('sent')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'sent' 
                ? 'bg-white dark:bg-gray-800 text-indigo-600 shadow' 
                : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600'
            }`}
          >
            Sent Requests
          </button>
          <button
            onClick={() => setActiveTab('received')}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'received' 
                ? 'bg-white dark:bg-gray-800 text-indigo-600 shadow' 
                : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600'
            }`}
          >
            Received Requests
          </button>
        </div>

        <div className="space-y-4">
          {activeTab === 'sent' ? (
            sentRequests.length === 0 ? (
               <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
                  <p className="text-gray-500 dark:text-gray-400">You haven't sent any requests yet.</p>
               </div>
            ) : (
              sentRequests.map((request) => (
                <div key={request._id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{request.service?.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Provider: {request.provider?.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Message: "{request.message}"</p>
                    
                    {request.status === 'accepted' && request.provider?.mobile && (
                         <div className="mt-2 p-2 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg inline-block">
                             <p className="text-xs text-indigo-800 dark:text-indigo-300 font-bold">Provider Contact:</p>
                             <p className="text-sm text-indigo-600 dark:text-indigo-400 font-bold">{request.provider.mobile}</p>
                         </div>
                    )}
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                  </div>
                </div>
              ))
            )
          ) : (
            receivedRequests.length === 0 ? (
               <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
                  <p className="text-gray-500 dark:text-gray-400">You haven't received any requests yet.</p>
               </div>
            ) : (
              receivedRequests.map((request) => (
                <div key={request._id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Request for: {request.service?.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                          <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                              {request.requester?.profileImage ? (
                                  <img src={`http://localhost:5000/${request.requester.profileImage}`} alt="" className="w-full h-full object-cover"/>
                              ) : (
                                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-500 font-bold">{request.requester?.name?.substring(0,2).toUpperCase()}</div>
                              )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">From: {request.requester?.name}</p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 italic">"{request.message}"</p>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                  </div>

                  {request.status === 'pending' && (
                    <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => handleStatusUpdate(request._id, 'accepted')}
                        className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(request._id, 'rejected')}
                        className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}

                  {request.status === 'accepted' && (
                       <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-900">
                           <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                               You accepted this request. Please contact the requester:
                           </p>
                           <p className="text-lg font-bold text-green-700 dark:text-green-400 mt-1">
                               {request.requester?.mobile || "No mobile number provided"}
                           </p>
                       </div>
                  )}
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Requests;
