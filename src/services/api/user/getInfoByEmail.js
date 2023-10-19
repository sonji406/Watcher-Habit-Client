import api from '../../../lib/api';

const getInfoByEmailAPI = (email) => {
  return api.get(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/getInfoByEmail?email=${email}`,
    { withCredentials: true },
  );
};

export default getInfoByEmailAPI;
