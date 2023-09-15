import { useState, useEffect } from 'react';

const mockGetGroupsAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: [
          { groupId: 'group1', groupName: 'Group 1' },
          { groupId: 'group2', groupName: 'Group 2' },
          { groupId: 'group3', groupName: 'Group 3' },
        ],
      });
    }, 500);
  });
};

export const useGroups = () => {
  const [groupOptions, setGroupOptions] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await mockGetGroupsAPI();
        if (response.status === 200) {
          setGroupOptions(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroups();
  }, []);

  return { groupOptions };
};
