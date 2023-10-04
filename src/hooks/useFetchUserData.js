import { useQuery } from 'react-query';
import userGetAPI from '../services/api/userGet';

export const useFetchUserData = (userId) => {
  const fetchUserData = async () => {
    const response = await userGetAPI(userId, 'group', true);

    return response.groups.map((group) => ({
      groupId: group._id,
      groupName: group.groupName,
    }));
  };

  const { data: groupList, refetch } = useQuery(
    ['userData', userId],
    fetchUserData,
    {
      enabled: !!userId,
    },
  );

  return { groupList, refetch };
};
