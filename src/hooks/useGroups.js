import { useState, useEffect } from 'react';
import getUserInfo from '../services/api/userGet';

const useGroups = (userId) => {
  const [groupOptions, setGroupOptions] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await getUserInfo(userId);

        if (response.groups) {
          setGroupOptions(response.groups);
        }
      } catch (error) {
        console.error('useGroups error:', error);
      }
    };

    fetchGroups();
  }, [userId]);

  return { groupOptions };
};

export default useGroups;
