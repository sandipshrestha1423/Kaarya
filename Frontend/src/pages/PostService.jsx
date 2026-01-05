import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

function PostService() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    type: "request",
    fee: "",
    feeUnit: "Hour",
    preferredTime: "",
    preferredDay: "",
    mobile: "",
    skills: "",
    experience: "",
    education: "",
    certifications: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user.mobile) {
      setFormData(prev => ({ ...prev, mobile: user.mobile }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleTypeChange = (type) => {
      setFormData({ ...formData, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/services", formData);
      
      // Update local user context if mobile was added/changed
      if (user && (!user.mobile || user.mobile !== formData.mobile)) {
          updateUser({ mobile: formData.mobile });
      }

      setMessage("Service Admin le Verify garey paxi Post hunxa... Wait For Approval. Success ghyar ghyar ghyar!");
      setFormData({ 
          title: "", category: "", description: "", type: "request",
          fee: "", feeUnit: "Hour", preferredTime: "", preferredDay: "", mobile: "",
          skills: "", experience: "", education: "", certifications: ""
      });
      setTimeout(() => navigate("/"), 5000);
    } catch (err) {
      console.error(err);
      setMessage(
        err.response?.data?.msg || "Service Post garna mildaina. Pheri try ghyar ghyar ghyar!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
        
        <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-8 py-6">
          <h2 className="text-3xl font-bold text-white">Post a New Service</h2>
          <p className="text-indigo-100 mt-2">Share your skills or request help. Your registered location will be used.</p>
        </div>

        <div className="p-8">
          {message && (
            <div className={`p-4 rounded-xl mb-6 flex items-center ${
              message.includes("success") ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300" : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Type Toggle Slider */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">I am looking to...</label>
                <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-xl relative h-12">
                    <div 
                        className={`w-1/2 h-full absolute top-0 left-0 bg-indigo-600 rounded-xl transition-all duration-300 transform ${formData.type === 'offer' ? 'translate-x-full' : 'translate-x-0'}`}
                    ></div>
                    <button
                        type="button"
                        onClick={() => handleTypeChange('request')}
                        className={`flex-1 text-center text-sm font-bold z-10 transition-colors duration-300 flex items-center justify-center gap-2 ${formData.type === 'request' ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}
                    >
                        <span>🔍</span> Find Help
                    </button>
                    <button
                        type="button"
                        onClick={() => handleTypeChange('offer')}
                        className={`flex-1 text-center text-sm font-bold z-10 transition-colors duration-300 flex items-center justify-center gap-2 ${formData.type === 'offer' ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`}
                    >
                         <span>💼</span> Offer Skill
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Service Title</label>
                  <input
                    type="text"
                    name="title"
                    placeholder={formData.type === 'request' ? "e.g. Plumbing Help Needed" : "e.g. Expert Plumbing Services"}
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="Repairs">Repairs</option>
                    <option value="Tutoring">Tutoring</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="Tech Support">Tech Support</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex space-x-2">
                    <div className="w-2/3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Fee Amount</label>
                        <input
                            type="number"
                            name="fee"
                            placeholder="e.g. 500"
                            value={formData.fee}
                            onChange={handleChange}
                            required
                            min="0"
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                        />
                    </div>
                    <div className="w-1/3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Unit</label>
                        <select
                            name="feeUnit"
                            value={formData.feeUnit}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                        >
                            <option value="Hour">Per Hour</option>
                            <option value="Day">Per Day</option>
                            <option value="Job">Fixed/Job</option>
                        </select>
                    </div>
                </div>
                 <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="e.g. 9841XXXXXX"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                  />
                </div>
            </div>

            {/* Provider Verification Details - Only for Offers */}
            {formData.type === 'offer' && (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800 space-y-4">
                    <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-200">Qualifications & Verification</h3>
                    <p className="text-sm text-indigo-700 dark:text-indigo-300 -mt-2 mb-2">Please provide details to help us verify your expertise.</p>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Skills (Comma Separated)</label>
                        <input
                            type="text"
                            name="skills"
                            placeholder="e.g. Pipe fitting, Leak detection, Installation"
                            value={formData.skills}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Experience (Years/Level)</label>
                            <input
                                type="text"
                                name="experience"
                                placeholder="e.g. 5 Years"
                                value={formData.experience}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Education</label>
                            <input
                                type="text"
                                name="education"
                                placeholder="e.g. High School, Vocational Training"
                                value={formData.education}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Certifications / Licenses</label>
                        <input
                            type="text"
                            name="certifications"
                            placeholder="e.g. Certified Plumber License #12345"
                            value={formData.certifications}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                        />
                    </div>
                </div>
            )}

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Preferred Time</label>
                  <input
                    type="text"
                    name="preferredTime"
                    placeholder="e.g. Morning 9AM - 11AM"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Preferred Day</label>
                  <input
                    type="text"
                    name="preferredDay"
                    placeholder="e.g. Weekends, Mondays"
                    value={formData.preferredDay}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                  />
                </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Description</label>
              <textarea
                name="description"
                placeholder="Describe what you need or what you are offering in detail..."
                value={formData.description}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white resize-none"
              ></textarea>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Posting Service...' : 'Publish Service'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostService;