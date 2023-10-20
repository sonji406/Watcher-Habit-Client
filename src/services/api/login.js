import api from '../../lib/api';

const loginAPI = (email) => {
  return api.post(
    '/auth/login',
    {
      email,
    },
    { withCredentials: true },
  );
};

export default loginAPI;
