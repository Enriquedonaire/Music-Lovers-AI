import React, { useEffect, useState } from 'react';
import { fetchUserInfo } from '../../utils/api';

const UserInfo = ({ accessToken }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserInfo(accessToken)
      .then((data) => setUserInfo(data))
      .catch((err) => setError(err.message));
  }, [accessToken]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <img src={userInfo.avatar_url} alt="Avatar" />
      <h2>{userInfo.display_name}</h2>
    </div>
  );
};

export default UserInfo;
