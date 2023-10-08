import getUserIdFromToken from '../../utils/getUserIdFromToken';
import api from '../../lib/api';

export const groupGet = async (groupId) => {
  const userId = getUserIdFromToken();

  try {
    const response = await api.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/group/${groupId}?userId=${userId}`,
      { withCredentials: true },
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default groupGet;
