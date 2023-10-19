import { useState, useEffect } from 'react';
import getUserInfo from '../services/api/userGet';

export const useGroups = (userId) => {
  const [groupOptions, setGroupOptions] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getUserInfo(userId);

        if (response.groups) {
          setGroupOptions(response.groups);
        }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups();
  }, [userId]);

  return { groupOptions };
};
