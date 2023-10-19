import api from '../../../lib/api';

const logoutAPI = () => {
  return api.post(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/logout`,
    {},
    {
      withCredentials: true,
    },
  );
};

export default logoutAPI;
