import { useState, useEffect } from 'react';
import axios from 'axios';

export const useGroups = (userId) => {
  const [groupOptions, setGroupOptions] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${userId}`,
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
