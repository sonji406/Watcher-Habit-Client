import axios from 'axios';

export const getUserProfileImage = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${userId}`,
    );
    const user = response.data;
    return user.profileImageUrl;
  } catch (error) {
    throw error;
  }
};
