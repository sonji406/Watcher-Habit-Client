import axios from 'axios';
import getUserIdFromToken from '../../utils/getUserIdFromToken';

export const getGroup = async (groupId) => {
  const userId = getUserIdFromToken();

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/group/${groupId}?userId=${userId}`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getGroup;
