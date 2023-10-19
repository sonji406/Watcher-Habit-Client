import api from '../../../lib/api';

const patchGroupAPI = (groupId, body) => {
  return api.patch(`/group/${groupId}/members`, body, {
    withCredentials: true,
  });
};

export default patchGroupAPI;
