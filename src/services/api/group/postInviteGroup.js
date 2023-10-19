import api from '../../../lib/api';

const postInviteGroupAPI = (groupId, body) => {
  return api.post(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/group/${groupId}/invite`,
    body,
    { withCredentials: true },
  );
};

export default postInviteGroupAPI;
