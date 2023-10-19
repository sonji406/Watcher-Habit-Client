import api from '../../../lib/api';

const postInviteGroupAPI = (groupId, body) => {
  return api.post(`/group/${groupId}/invite`, body, { withCredentials: true });
};

export default postInviteGroupAPI;
