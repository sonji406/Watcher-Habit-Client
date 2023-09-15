import { useState, useEffect } from 'react';
import { getUserProfileImage } from '../services/api/userGet';
import getUserIdFromToken from '../utils/getUserIdFromToken';

export const useProfileImage = () => {
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    let userId = null;

    try {
      userId = getUserIdFromToken();
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
  }, []);

  return { profileImageUrl, error };
};
