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
      state.habitDetail.approvals.push(action.payload);
    },
    unSubscribeWatcherList: (state, action) => {
      const approvalIdsFromPayload = action.payload.approvals.map(
        (approval) => approval._id,
      );

      state.habitDetail.approvals = state.habitDetail.approvals.filter(
        (approval) => approvalIdsFromPayload.includes(approval._id._id),
      );
    },
  },
});

export const { setHabitDetail, updateWatcherList, unSubscribeWatcherList } =
  habitSlice.actions;
export default habitSlice.reducer;
