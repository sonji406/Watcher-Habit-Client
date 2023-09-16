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
  },
});

export const { setHabitDetail } = habitSlice.actions;
export default habitSlice.reducer;
