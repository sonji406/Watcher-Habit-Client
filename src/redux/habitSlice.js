import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  habitDetail: {},
};

const habitSlice = createSlice({
  name: 'habitDetail',
  initialState,
  reducers: {
    setHabitDetail: (state, action) => {
      state.habitDetail = action.payload;
    },
    updateWatcherList: (state, action) => {
      const transformedPayload = {
        _id: action.payload._id,
        profileImageUrl: action.payload.profileImageUrl,
        status: action.payload.status,
      };

      state.habitDetail.approvals.push(transformedPayload);
    },
    unSubscribeWatcherList: (state, action) => {
      state.habitDetail.approvals = state.habitDetail.approvals.filter(
        (approval) => approval._id !== action.payload._id,
      );
    },
    clearHabitDetail: (state) => {
      state.habitDetail = {};
    },
  },
});

export const {
  setHabitDetail,
  updateWatcherList,
  unSubscribeWatcherList,
  clearHabitDetail,
} = habitSlice.actions;

export default habitSlice.reducer;
