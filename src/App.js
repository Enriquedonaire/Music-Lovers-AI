import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Redirect from './components/Redirect';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import Footer from './components/Footer';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  const client_key = process.env.REACT_APP_TIKTOK_CLIENT_KEY;
  const client_secret = process.env.REACT_APP_TIKTOK_CLIENT_SECRET;

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('accessToken'))?.split('=')[1];
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const handleAuthSuccess = (token) => {
    setAccessToken(token);
  };

  const handleError = (message) => {
    setError(message);
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <Routes>
        <Route 
          path="/" 
          element={<Home accessToken={accessToken} client_key={client_key} />} 
        />
        <Route 
          path="/redirect" 
          element={
            <Redirect 
              client_key={client_key} 
              client_secret={client_secret} 
              onAuthSuccess={handleAuthSuccess} 
              onError={handleError} 
            />
          } 
        />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
