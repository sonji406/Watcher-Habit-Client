import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import habitReducer from './habitSlice';
import notificationHabitReducer from './notificationHabitSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    habit: habitReducer,
    notificationHabit: notificationHabitReducer,
  },
});

export default store;
