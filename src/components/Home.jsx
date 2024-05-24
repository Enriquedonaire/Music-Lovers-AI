import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = ({ accessToken }) => {
  const requestToken = async () => {
    try {
      const response = await axios.get('http://localhost:4000/oauth');
      window.location.href = `${response.data.url}`;
    } catch (error) {
      console.error('Error fetching OAuth URL:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500">
      <h1 className="text-4xl font-bold text-white mb-6">Welcome to Music Lovers</h1>
      {!accessToken && (
        <button
          onClick={requestToken}
          className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none"
        >
          Login with TikTok
        </button>
      )}
      <div className="mt-6">
        <Link to="/privacy" className="text-white underline mx-4">Privacy Policy</Link>
        <Link to="/terms" className="text-white underline mx-4">Terms of Service</Link>
      </div>
    </div>
  );
};

export default Home;
