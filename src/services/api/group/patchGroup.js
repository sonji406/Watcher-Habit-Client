import api from '../../../lib/api';

const patchGroupAPI = (groupId, body) => {
  return api.patch(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/group/${groupId}/members`,
    body,
    { withCredentials: true },
  );
};

export default patchGroupAPI;
