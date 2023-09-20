import axios from 'axios';

export const getGroup = async (groupId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/group/${groupId}`,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getGroup;
