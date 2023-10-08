import { useState, useEffect } from 'react';
import api from '../lib/api';

export const useGroups = (userId) => {
  const [groupOptions, setGroupOptions] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await api.get(
          `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${userId}`,
          { withCredentials: true },
        );
        if (response.status === 200 && response.data.groups) {
          setGroupOptions(response.data.groups);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, [userId]);

  return { groupOptions };
};
