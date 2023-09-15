import { useEffect } from 'react';
import axios from 'axios';

export const useSubmitHabit = (habitData, isFormValid, isEdit, submitFlag) => {
  const { startTime, timePeriod, duration } = habitData;
  useEffect(() => {
    const submitHabit = async () => {
      if (!isFormValid) return;

      let calculatedStartTime;
      let calculatedEndTime;

      if (startTime && timePeriod) {
        let [inputHour, inputMinute] = startTime.split(':').map(Number);

        if (timePeriod === 'PM' && inputHour < 12) inputHour += 12;
        if (timePeriod === 'AM' && inputHour === 12) inputHour = 0;

        calculatedStartTime = `${String(inputHour).padStart(2, '0')}:${String(
          inputMinute,
        ).padStart(2, '0')}`;

        const endDateTime = new Date();
        endDateTime.setHours(inputHour, inputMinute);
        endDateTime.setMinutes(endDateTime.getMinutes() + duration);

        const endHour = endDateTime.getHours();
        const endMinute = endDateTime.getMinutes();

        calculatedEndTime = `${String(endHour).padStart(2, '0')}:${String(
          endMinute,
        ).padStart(2, '0')}`;
      }

      const newHabitData = {
        ...habitData,
        startTime: calculatedStartTime,
        endTime: calculatedEndTime,
      };

      try {
        let response;
        if (isEdit) {
          response = await axios.patch(
            `/api/habit/${habitData.habitId}`,
            newHabitData,
          );
        } else {
          response = await axios.post('/api/habit', newHabitData);
        }

        if (response.status === 200 || response.status === 201) {
          console.log('Success:', response.data);
        } else {
          console.log('Error:', response.data);
        }
      } catch (error) {
        console.error('API Error:', error);
      }
    };

    if (isFormValid) {
      submitHabit();
    }
  }, [submitFlag]);
};
