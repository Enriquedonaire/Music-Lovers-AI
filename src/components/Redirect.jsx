import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Redirect = ({ onAuthSuccess, onError }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const code = urlSearchParams.get('code');
      try {
        const response = await axios.post("http://localhost:4000/tiktokaccesstoken", { code });
        document.cookie = `accessToken=${response.data.access_token}; max-age=${response.data.expires_in}`;
        onAuthSuccess(response.data.access_token);
        navigate("/");
      } catch (error) {
        console.error("Error during callback:", error.message);
        onError("An error occurred during the login process.");
      }
    };
    fetchToken();
  }, [onAuthSuccess, onError, navigate]);

  return <div>Redirecting...</div>;
};

export default Redirect;
