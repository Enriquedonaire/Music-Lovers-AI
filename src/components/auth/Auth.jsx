// src/components/Auth.js
import React, { useEffect, useState } from 'react';
import { authenticate, getAccessToken } from '../../utils/api';


const Auth = ({ client_key, client_secret, redirectUri, onAuthSuccess }) => {
    const [code, setCode] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      if (code) {
        setCode(code);
        getAccessToken(client_key, client_secret, code, redirectUri)
          .then((accessToken) => {
            onAuthSuccess(accessToken);
          })
          .catch((err) => {
            console.log('Error during authentication:', err.message);
            setError(err.message);
          });
      }
    }, [client_key, client_secret, redirectUri, onAuthSuccess]);
  
    const handleLogin = () => {
      authenticate(client_key, redirectUri);
    };
  
    return (
      <div>
        {error && <p>Error: {error}</p>}
        {!code && <button onClick={handleLogin}>Login with TikTok</button>}
      </div>
    );
  };
  
  export default Auth;
