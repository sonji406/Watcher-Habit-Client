import { useState, useEffect } from 'react';
import getUserIdFromToken from '../utils/getUserIdFromToken';
import getUserProfileImage from '../lib/user/getUserProfileImage';

const useProfileImage = () => {
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

export default useProfileImage;
