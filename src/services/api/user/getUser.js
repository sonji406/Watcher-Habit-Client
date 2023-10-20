import api from '../../../lib/api';

const getUserInfoAPI = (userId, include = '', withUserData = true) => {
  return api.get(`/user/${userId}`, {
    params: {
      include,
      withUserData,
    },
    withCredentials: true,
  });
};

export default getUserInfoAPI;
