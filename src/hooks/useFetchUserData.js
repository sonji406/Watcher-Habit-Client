import { useEffect, useState } from 'react';
import userGetAPI from '../services/api/userGet';

export const useFetchUserData = (userId) => {
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userGetAPI(userId, 'group', true);
        const groupOptions = response.groups.map((group) => ({
          groupId: group._id,
          groupName: group.groupName,
        }));

        setGroupList(groupOptions);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return groupList;
};
