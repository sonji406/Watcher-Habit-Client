import { useState, useEffect } from 'react';
import { getUserInfo } from '../services/api/userGet';

export const useFetchUserInfo = (userId) => {
  const [nickname, setNickname] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await getUserInfo(userId);
        setNickname(userInfo.nickname);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    fetchData();
  }, [userId]);

  return nickname;
};
