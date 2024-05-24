import React, { useEffect, useState } from 'react';
import { fetchUserVideos } from '../../utils/api';

const UserVideos = ({ accessToken }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserVideos(accessToken)
      .then((data) => setVideos(data))
      .catch((err) => setError(err.message));
  }, [accessToken]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (videos.length === 0) {
    return <p>No videos found</p>;
  }

  return (
    <div>
      {videos.map((video) => (
        <div key={video.id}>
          <h3>{video.title}</h3>
          <p>{video.video_description}</p>
          <iframe src={video.embed_link} title={video.id} frameBorder="0" allowFullScreen></iframe>
        </div>
      ))}
    </div>
  );
};

export default UserVideos;
