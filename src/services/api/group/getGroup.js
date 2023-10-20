import getUserIdFromToken from '../../../utils/getUserIdFromToken';
import api from '../../../lib/api';

const getGroupAPI = (groupId) => {
  const userId = getUserIdFromToken();

  const response = api.get(`/group/${groupId}?userId=${userId}`, {
    withCredentials: true,
  });

  return response.data;
};

export default getGroupAPI;
