import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationHabitDetail: {},
};

const notificationHabitSlice = createSlice({
  name: 'notificationHabitDetail',
  initialState,
  reducers: {
    setNotificationHabitDetail: (state, action) => {
      state.notificationHabitDetail = action.payload;
    },
    updateNotificationWatcherList: (state, action) => {
      const transformedPayload = {
        _id: action.payload._id,
        profileImageUrl: action.payload.profileImageUrl,
        status: action.payload.status,
      };

      state.notificationHabitDetail.approvals.push(transformedPayload);
    },
    unSubscribeNotificationWatcherList: (state, action) => {
      state.notificationHabitDetail.approvals =
        state.notificationHabitDetail.approvals.filter(
          (approval) => approval._id !== action.payload._id,
        );
    },
    clearNotificationHabitDetail: (state) => {
      state.notificationHabitDetail = {};
    },
  },
});

export const {
  setNotificationHabitDetail,
  updateNotificationWatcherList,
  unSubscribeNotificationWatcherList,
  clearNotificationHabitDetail,
} = notificationHabitSlice.actions;

export default notificationHabitSlice.reducer;
