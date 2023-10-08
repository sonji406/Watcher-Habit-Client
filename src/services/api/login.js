import api from '../../lib/api';

const loginAPI = (payload) => {
  return api.post(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/login`,
    payload,
  );
};

export default loginAPI;
