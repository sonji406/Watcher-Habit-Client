import { useQuery } from 'react-query';
import getUserInfoAPI from '../services/api/user/getUser';

const useFetchUserData = (userId) => {
  const fetchUserData = async () => {
    const response = await getUserInfoAPI(userId, 'group', true);

    return response.groups.map((group) => ({
      groupId: group._id,
      groupName: group.groupName,
    }));
  };

  const {
    data: groupList,
    refetch,
    isLoading,
  } = useQuery(['userData', userId], fetchUserData, {
    enabled: !!userId,
  });

  return { groupList, refetch, isLoading };
};

export default useFetchUserData;
