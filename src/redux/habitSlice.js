import { createSlice } from '@reduxjs/toolkit';

const habitSlice = createSlice({
  name: 'habit',
  initialState: {},
  reducers: {
    setHabitDetail: (state, action) => {
      state.habitDetail = action.payload;
    },
  },
});

export const { setHabitInfo } = habitSlice.actions;
export default habitSlice.reducer;
