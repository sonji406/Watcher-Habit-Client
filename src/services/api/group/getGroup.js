import getUserIdFromToken from '../../../utils/getUserIdFromToken';
import api from '../../../lib/api';

const getGroupAPI = async (groupId) => {
  const userId = getUserIdFromToken();

  try {
    const response = await api.get(`/group/${groupId}?userId=${userId}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getGroupAPI;
