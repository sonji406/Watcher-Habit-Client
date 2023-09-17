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
      state.habitDetail.approvals = action.payload;
    },
  },
});

export const { setHabitDetail, updateWatcherList } = habitSlice.actions;
export default habitSlice.reducer;
