import api from '../../lib/api';

const getNotificationListAPI = (userId) => {
  const response = api.get(`/notification/${userId}`, {
    withCredentials: true,
  });
  const notifications = response.data.data;

  return notifications;
};

export default getNotificationListAPI;
