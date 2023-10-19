import api from '../../../lib/api';

const getUserInfoAPI = async (userId, include = '', withUserData = true) => {
  try {
    const response = await api.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${userId}`,
      {
        params: {
          include,
          withUserData,
        },
        withCredentials: true,
      },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getUserInfoAPI;
