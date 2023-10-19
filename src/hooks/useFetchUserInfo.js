import { useState, useEffect } from 'react';
import getUserInfoAPI from '../services/api/user/getUser';

export const useFetchUserInfo = (userId) => {
  const [nickname, setNickname] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await getUserInfoAPI(userId);
        setNickname(userInfo.nickname);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    fetchData();
  }, [userId]);

  return nickname;
};
