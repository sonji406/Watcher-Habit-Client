import api from '../../utils/api';

export const subscribeWatcher = async (habitId, watcherId) => {
  try {
    const res = await api.patch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId}/watcher`,
      {
        watcherId,
      },
      { withCredentials: true },
    );

    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const unsubscribeWatcher = async (habitId, watcherId) => {
  try {
    const res = await api.delete(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId}/watcher/${watcherId}`,
      { withCredentials: true },
    );
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
