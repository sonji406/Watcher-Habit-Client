import { useEffect, useState } from 'react';
import getHabitAPI from '../services/api/habit/getHabit';

const useFetchHabitData = (habitId, isEdit) => {
  const [habitData, setHabitData] = useState(null);

  useEffect(() => {
    const fetchHabitData = async () => {
      try {
        const response = await getHabitAPI(habitId);

        setHabitData(response.data);
      } catch (error) {
        console.error('useFetchHabitData error:', error);
      }
    };

    if (isEdit) {
      fetchHabitData();
    }
  }, [habitId, isEdit]);

  return habitData;
};

export default useFetchHabitData;
