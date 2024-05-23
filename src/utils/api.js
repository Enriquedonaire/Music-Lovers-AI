import axios from 'axios';

export const authenticate = (clientKey, redirectUri) => {
  const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${clientKey}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=user.info.basic,video.list`;
  window.location.href = authUrl;
};

export const getAccessToken = async (clientKey, clientSecret, code, redirectUri) => {
  try {
    const response = await axios.post('https://open-api.tiktok.com/oauth/access_token/', null, {
      params: {
        client_key: clientKey,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      },
    });

    return response.data.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

export const fetchUserInfo = async () => {
  try {
    const response = await axios.get('/api/userinfo');
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const fetchUserVideos = async () => {
  try {
    const response = await axios.get('/api/uservideos');
    return response.data;
  } catch (error) {
    console.error('Error fetching user videos:', error);
    throw error;
  }
};
