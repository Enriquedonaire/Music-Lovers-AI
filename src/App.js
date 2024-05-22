// src/App.js
import React, { useState } from 'react';
import Auth from './components/auth/Auth';
import UserInfo from './components/data/UserInfo';
import UserVideos from './components/data/UserVideos';

const App = () => {
  const client_key = process.env.REACT_APP_TIKTOK_CLIENT_ID;
const client_secret = process.env.REACT_APP_TIKTOK_CLIENT_SECRET;
  const redirectUri = 'https://henko-ai.com/contacto/';

  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  const handleAuthSuccess = (token) => {
    setAccessToken(token);
  };

  const handleAuthError = (error) => {
    console.log('Authentication error:', error);
    setError(error);
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {!accessToken ? (
        <Auth client_key={client_key} client_secret={client_secret} redirectUri={redirectUri} onAuthSuccess={handleAuthSuccess} onAuthError={handleAuthError} />
      ) : (
        <>
          <UserInfo accessToken={accessToken} />
          <UserVideos accessToken={accessToken} />
        </>
      )}
    </div>
  );
};

export default App;


