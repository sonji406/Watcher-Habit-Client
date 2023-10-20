import api from '../../../lib/api';

const getInfoByEmailAPI = (email) => {
  return api.get(`/user/getInfoByEmail?email=${email}`, {
    withCredentials: true,
  });
};

export default getInfoByEmailAPI;
