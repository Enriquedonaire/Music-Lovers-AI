import React, { useEffect, useState } from 'react';
import { authenticate, getAccessToken } from '../../utils/api';

const Auth = ({ client_key, client_secret, redirectUri, onAuthSuccess, onError }) => {
  const [code, setCode] = useState(null);

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
          onError('Error during authentication: ' + err.message);
        });
    }
  }, [client_key, client_secret, redirectUri, onAuthSuccess, onError]);

  const handleLogin = () => {
    authenticate(client_key, redirectUri);
  };

  return (
    <div>
      {!code && <button onClick={handleLogin}>Login with TikTok</button>}
    </div>
  );
};

export default Auth;
