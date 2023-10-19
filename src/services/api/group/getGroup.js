import getUserIdFromToken from '../../../utils/getUserIdFromToken';
import api from '../../../lib/api';

const getGroupAPI = (groupId) => {
  const userId = getUserIdFromToken();

  try {
    const response = api.get(`/group/${groupId}?userId=${userId}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getGroupAPI;
