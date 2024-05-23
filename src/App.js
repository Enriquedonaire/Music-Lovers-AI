import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/auth/Auth';
import UserInfo from './components/data/UserInfo';
import UserVideos from './components/data/UserVideos';
import TermsOfService from './components/TermsOfService';
import PrivacyPolicy from './components/PrivacyPolicy';
import Footer from './components/Footer';

function App() {
  const client_key = process.env.REACT_APP_TIKTOK_CLIENT_KEY;
  const client_secret = process.env.REACT_APP_TIKTOK_CLIENT_SECRET;
  const redirectUri = 'https://Enriquedonaire.github.io/Music-Lovers-AI/auth/callback';
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

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
        <Route path="/" element={accessToken ? (
          <>
            <UserInfo />
            <UserVideos />
          </>
        ) : (
          <Auth client_key={client_key} client_secret={client_secret} redirectUri={redirectUri} onAuthSuccess={handleAuthSuccess} onError={handleError} />
        )} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
