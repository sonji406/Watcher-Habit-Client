import axios from 'axios';

export const getUserInfo = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${userId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfileImage = async (userId) => {
  try {
    const user = await getUserInfo(userId);
    return user.profileImageUrl;
  } catch (error) {
    throw error;
  }
};
