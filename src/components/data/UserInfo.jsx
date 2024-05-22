// src/components/UserInfo.js
import React, { useEffect, useState } from 'react';
import { getUserInfo } from '../../utils/api';

const UserInfo = ({ accessToken }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      getUserInfo(accessToken)
        .then(setUserInfo)
        .catch((err) => {
          console.log('Error fetching user info:', err.message);
          setError(err.message);
        });
    }, [accessToken]);
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    if (!userInfo) {
      return <p>Loading...</p>;
    }
  
    return (
      <div>
        <h1>{userInfo.nickname}</h1>
        <p>{userInfo.signature}</p>
        <img src={userInfo.avatar} alt={userInfo.nickname} />
      </div>
    );
  };
  
  export default UserInfo;
