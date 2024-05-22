// src/components/UserVideos.js
import React, { useEffect, useState } from 'react';
import { getUserVideos } from '../../utils/api';

const UserVideos = ({ accessToken }) => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      getUserVideos(accessToken)
        .then(setVideos)
        .catch((err) => {
          console.log('Error fetching user videos:', err.message);
          setError(err.message);
        });
    }, [accessToken]);
  
    if (error) {
      return <p>Error: {error}</p>;
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
