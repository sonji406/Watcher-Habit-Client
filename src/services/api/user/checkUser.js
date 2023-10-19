import api from '../../../lib/api';

const checkUserAPI = (email) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/check?email=${email}`,
    { withCredentials: true },
  );
};

export default checkUserAPI;
