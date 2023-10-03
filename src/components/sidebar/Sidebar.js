import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HamburgerButton from './HamburgerButton';
import MyHabitPageButton from './MyHabitPageButton';
import CreateGroupButton from './CreateGroupButton';
import JoinedGroupsButton from './JoinedGroupsButton';
import WeeklyScheduleButton from './WeeklyScheduleButton';
import userGetAPI from '../../services/api/userGet';
import getUserIdFromToken from '../../utils/getUserIdFromToken';
import cookieAPI from '../../services/api/cookie';
import habitGetAPI from '../../services/api/habitGet';

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [nickname, setNickname] = useState('');
  const [groupList, setGroupList] = useState([]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const location = useLocation();
  const pathSegments = location.pathname.split('/');

  const isMyHabitPage =
    pathSegments[1] === 'my-habit' && !!pathSegments[2] && !pathSegments[3];
  const isJoinedGroupPage =
    pathSegments[1] === 'group' && !!pathSegments[2] && !pathSegments[3];

  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await userGetAPI(userId, 'group', true);
        const groupNames = response.groups.map((group) => group.groupName);
        const groupIds = response.groups.map((group) => group._id);

        setNickname(response.nickname);
        setGroupList({
          groupNames: groupNames,
          groupIds: groupIds,
        });
      } catch (error) {
        throw new Error('사용자 정보 확인 중 문제가 발생했습니다.');
      }
    };

    fetchUserData();
  }, []);

  const cookieTest = () => {
    cookieAPI();
  };

  const getTest = () => {
    habitGetAPI('650121c4be0e36ef9a07a5cb');
  };

  return (
    <div
      className={`h-screen fixed top-0 left-0 bg-[#2D3C4A] shadow-md duration-100 z-50 w-20 ${
        isHovered && 'w-72'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <HamburgerButton isHovered={isHovered} />
      <button onClick={cookieTest}>쿠키API</button>
      <button onClick={getTest}>GET API</button>
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
        <CreateGroupButton isHovered={isHovered} />
        <JoinedGroupsButton
          isHovered={isHovered}
          isCurrentPage={isJoinedGroupPage}
          groupList={groupList}
        />
      </div>
    </div>
  );
};
export default Sidebar;
