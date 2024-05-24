import axios from 'axios';

export const authenticate = (client_key, redirectUri) => {
  const authUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${client_key}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=user.info.basic,video.list`;
  window.location.href = authUrl;
};

export const getAccessToken = async (client_key, client_secret, code, redirectUri) => {
  try {
    const response = await axios.post('https://open.tiktokapis.com/oauth/access_token/', null, {
      params: {
        client_key,
        client_secret,
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

export const fetchUserInfo = async (accessToken) => {
  try {
    const response = await axios.get('https://open.tiktokapis.com/v2/user/info/?fields=open_id,union_id,avatar_url,display_name', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data.user;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const fetchUserVideos = async (accessToken) => {
  try {
    const response = await axios.post('https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,duration,cover_image_url,embed_link', null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        max_count: 20,
      },
    });
    return response.data.data.videos;
  } catch (error) {
    console.error('Error fetching user videos:', error);
    throw error;
  }
};
