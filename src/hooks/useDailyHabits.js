import { useState, useEffect } from 'react';
import axios from 'axios';

export const useDailyHabits = (apiUrl) => {
  const [dailyHabits, setDailyHabits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setDailyHabits(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return { dailyHabits, loading, error };
};
