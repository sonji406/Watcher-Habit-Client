import { useEffect, useState } from 'react';
import habitGetAPI from '../services/api/habitGet';

export const useFetchHabitData = (habitId, isEdit) => {
  const [habitData, setHabitData] = useState(null);

  useEffect(() => {
    const fetchHabitData = async () => {
      try {
        const response = await habitGetAPI(habitId);

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
