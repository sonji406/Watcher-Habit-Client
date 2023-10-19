import api from '../../../lib/api';

const postGroupAPI = (body) => {
  return api.post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/group`, body, {
    withCredentials: true,
  });
};

export default postGroupAPI;
