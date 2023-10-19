import api from '../../../lib/api';

const logoutAPI = () => {
  return api.post(
    '/auth/logout',
    {},
    {
      withCredentials: true,
    },
  );
};

export default logoutAPI;
