import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function PostService() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    price: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const dataToSend = {
        ...formData,
        price: parseFloat(formData.price),
      };

      await api.post('/services', dataToSend);

      setMessage('Service posted successfully!');
      setFormData({
        title: '',
        category: '',
        description: '',
        location: '',
        price: '',
      });

      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error posting service. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Post a Service
        </h2>

        {message && (
          <p
            className={`text-center mb-4 ${
              message.includes('success')
                ? 'text-green-600'
                : 'text-red-500'
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Service Title (e.g. Plumbing Help)"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="category"
            placeholder="Category (e.g. Repairs, Tutoring)"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="description"
            placeholder="Describe your service..."
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <input
            type="text"
            name="location"
            placeholder="Location (e.g. Mumbai, Sector 10)"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            name="price"
            placeholder="Price (in your currency)"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Service'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostService;
