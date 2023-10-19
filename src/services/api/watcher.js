import api from '../../lib/api';

export const subscribeWatcher = async (habitId, watcherId) => {
  try {
    const res = await api.patch(
      `/habit/${habitId}/watcher`,
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
    const res = await api.delete(`/habit/${habitId}/watcher/${watcherId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
