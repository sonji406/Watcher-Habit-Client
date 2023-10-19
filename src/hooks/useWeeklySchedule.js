import { useState, useEffect } from 'react';
import getUserIdFromToken from '../utils/getUserIdFromToken';
import getStartAndEndOfWeek from '../utils/getStartAndEndOfWeek';
import getPeriodicHabitsAPI from '../services/api/habit/getPeriodicHabits';

const useWeeklySchedule = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [weeklySchedule, setWeeklySchedule] = useState({
    history: [],
    regular: [],
  });

  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  useEffect(() => {
    const fetchWeeklySchedule = async () => {
      setIsLoading(true);

      try {
        const userId = getUserIdFromToken();
        const [startDate, endDate] = getStartAndEndOfWeek(currentWeekStart);

        const startDateStr = `${startDate.getFullYear()}-${String(
          startDate.getMonth() + 1,
        ).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
        const endDateStr = `${endDate.getFullYear()}-${String(
          endDate.getMonth() + 1,
        ).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;

        const habitsResponse = await getPeriodicHabitsAPI(
          userId,
          startDateStr,
          endDateStr,
        );

        const habitsData = habitsResponse.data || [];

        setWeeklySchedule({
          history: habitsData.history || [],
          regular: habitsData.regular || [],
        });
      } catch (error) {
        console.error('Failed to fetch weekly schedule', error);
      }
      setIsLoading(false);
    };

    fetchWeeklySchedule();
  }, [currentWeekStart]);

  return { isLoading, weeklySchedule, setCurrentWeekStart, currentWeekStart };
};

export default useWeeklySchedule;
