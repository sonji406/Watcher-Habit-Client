import { useEffect, useState } from 'react';
import getHabitAPI from '../services/api/habit/getHabit';

export const useFetchHabitData = (habitId, isEdit) => {
  const [habitData, setHabitData] = useState(null);

  useEffect(() => {
    const fetchHabitData = async () => {
      try {
        const response = await getHabitAPI(habitId);

        setHabitData(response.data);
      } catch (error) {
        console.error('Error fetching habit:', error);
      }
    };

    if (isEdit) {
      fetchHabitData();
    }
  }, [habitId, isEdit]);

  return habitData;
};
