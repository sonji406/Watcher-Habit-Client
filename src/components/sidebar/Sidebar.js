import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HamburgerButton from './HamburgerButton';
import MyHabitPageButton from './MyHabitPageButton';
import CreateGroupButton from './CreateGroupButton';
import JoinedGroupsButton from './JoinedGroupsButton';
import WeeklyScheduleButton from './WeeklyScheduleButton';
import getUserInfoAPI from '../../services/api/user/getUser';
import getUserIdFromToken from '../../utils/getUserIdFromToken';
import useFetchUserData from '../../hooks/useFetchUserData';

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [nickname, setNickname] = useState('');

  const location = useLocation();
  const pathSegments = location.pathname.split('/');

  const isMyHabitPage =
    pathSegments[1] === 'my-habit' && !!pathSegments[2] && !pathSegments[3];
  const isJoinedGroupPage =
    pathSegments[1] === 'group' && !!pathSegments[2] && !pathSegments[3];

  const userId = getUserIdFromToken();

  const { groupList, refetch } = useFetchUserData(userId);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUserInfoAPI(userId, 'group', true);
        setNickname(response.nickname);
      } catch (error) {
        throw new Error('사용자 정보 확인 중 문제가 발생했습니다.');
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div
      className={`h-screen fixed top-0 left-0 bg-[#2D3C4A] shadow-md duration-100 z-50 w-20 ${
        isHovered && 'w-72'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <HamburgerButton isHovered={isHovered} />
      <div
        className={`flex flex-col ${
          isHovered ? 'items-start w-72 pl-6' : 'items-center'
        } transition-all`}
      >
        <WeeklyScheduleButton isHovered={isHovered} />
        <MyHabitPageButton
          nickname={nickname}
          isHovered={isHovered}
          isCurrentPage={isMyHabitPage}
        />
        <CreateGroupButton isHovered={isHovered} refetchGroups={refetch} />
        <JoinedGroupsButton
          isHovered={isHovered}
          isCurrentPage={isJoinedGroupPage}
          groupList={groupList}
          refetchGroups={refetch}
        />
      </div>
    </div>
  );
};
export default Sidebar;
