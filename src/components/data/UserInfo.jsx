import React, { useEffect, useState } from 'react';
import { fetchUserInfo } from '../../utils/api';

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchUserInfo();
        setUserInfo(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getUserInfo();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Info</h2>
        <h1>{userInfo.nickname}</h1>
        <p>{userInfo.signature}</p>
        <img src={userInfo.avatar} alt={userInfo.nickname} />
    </div>
  );
};

export default UserInfo;

