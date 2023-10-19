import api from '../../../lib/api';

const getUserInfoAPI = (userId, include = '', withUserData = true) => {
  try {
    const response = api.get(`/user/${userId}`, {
      params: {
        include,
        withUserData,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getUserInfoAPI;
