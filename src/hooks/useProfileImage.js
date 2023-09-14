import { useState, useEffect } from 'react';
import { getUserProfileImage } from '../services/api/userGet';
import decodeJwtResponse from '../utils/decodeJwtResponse';

export const useProfileImage = () => {
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const accessToken = localStorage.getItem('accessToken');

  const fetchData = async () => {
    let userId = null;

    try {
      const decoded = decodeJwtResponse(accessToken);
      userId = decoded.userId;
    } catch (decodeError) {
      console.error('Error decoding JWT:', decodeError);
      setError(decodeError);
      return;
    }

    try {
      const imageUrl = await getUserProfileImage(userId);
      setProfileImageUrl(imageUrl);
    } catch (fetchError) {
      setError(fetchError);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  return { profileImageUrl, error };
};
