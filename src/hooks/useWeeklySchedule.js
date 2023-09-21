import { useState, useEffect } from 'react';
import getUserIdFromToken from '../utils/getUserIdFromToken';
import getStartAndEndOfWeek from '../utils/getStartAndEndOfWeek';
import axios from 'axios';

const useWeeklySchedule = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [weeklySchedule, setWeeklySchedule] = useState([]);

  useEffect(() => {
    const fetchWeeklySchedule = async () => {
      setIsLoading(true);

      try {
        const userId = getUserIdFromToken();
        const [startDate, endDate] = getStartAndEndOfWeek(new Date());

        const habitsResponse = await axios.get(
          `${
            process.env.REACT_APP_SERVER_DOMAIN
          }/api/habit/periodic/${userId}?startDate=${
            startDate.toISOString().split('T')[0]
          }&endDate=${endDate.toISOString().split('T')[0]}`,
        );

        setWeeklySchedule(habitsResponse.data);
      } catch (error) {
        console.error('Failed to fetch weekly schedule', error);
      }

      setIsLoading(false);
    };

    fetchWeeklySchedule();
  }, []);

  return { isLoading, weeklySchedule };
};

export default useWeeklySchedule;
