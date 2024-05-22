import axios from "axios";

const api = axios.create({
  baseURL: "https://open-api.tiktok.com/",
  timeout: 10000,
});

export const authenticate = (clientId, redirectUri) => {
  const authUrl = `https://open-api.tiktok.com/platform/oauth/connect/?client_key=${clientId}&response_type=code&scope=user.info.basic,video.list&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`;
  window.location.href = authUrl;
};

export const getAccessToken = async (
  clientId,
  clientSecret,
  code,
  redirectUri
) => {
  try {
    const response = await api.post("oauth/access_token/", null, {
      params: {
        client_key: process.env.REACT_APP_TIKTOK_CLIENT_ID,
        client_secret: process.env.REACT_APP_TIKTOK_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      },
    });
    return response.data.data.access_token;
  } catch (error) {
    console.log("Error getting access token:", error.message);
    throw error;
  }
};

export const getUserInfo = async (accessToken) => {
  try {
    const response = await api.get("user/info/", {
      params: { access_token: accessToken },
    });
    return response.data.data;
  } catch (error) {
    console.log("Error getting user info:", error.message);
    throw error;
  }
};

export const getUserVideos = async (accessToken) => {
  try {
    const response = await api.get("video/list/", {
      params: { access_token: accessToken, count: 10 },
    });
    return response.data.data.videos;
  } catch (error) {
    console.log("Error getting user videos:", error.message);
    throw error;
  }
};
