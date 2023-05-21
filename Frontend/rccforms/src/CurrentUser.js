import React, { useEffect, useState } from 'react';
import { API_URL_CURRENT_USER } from "./constants";

const CurrentUser = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(API_URL_CURRENT_USER);
        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  return <div>{username}</div>;
};

export default CurrentUser;