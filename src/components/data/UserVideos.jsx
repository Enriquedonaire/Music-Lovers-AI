import React, { useEffect, useState } from 'react';
import { fetchUserVideos } from '../../utils/api';

const UserVideos = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserVideos = async () => {
      try {
        const data = await fetchUserVideos();
        setVideos(data.videos);
      } catch (error) {
        setError(error.message);
      }
    };

    getUserVideos();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (videos.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
    <h2>Videos</h2>
    <ul>
      {videos.map((video) => (
        <li key={video.id}>
          <p>{video.description}</p>
          <video src={video.play_url} controls />
        </li>
      ))}
    </ul>
  </div>
  );
};

export default UserVideos;
