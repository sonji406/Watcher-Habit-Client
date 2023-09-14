import { useState, useEffect } from 'react';
import axios from 'axios';
import decodeJwtResponse from '../utils/decodeJwtResponse';

export const useProfileImage = () => {
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      let userId = null;
      try {
        const decoded = decodeJwtResponse(accessToken);
        userId = decoded.userId;
      } catch (error) {
        console.error('Error decoding JWT:', error);
        setError(error);

        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${userId}`,
        );
        const user = response.data;
        setProfileImageUrl(user.profileImageUrl);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [accessToken]);

  return { profileImageUrl, error };
};
