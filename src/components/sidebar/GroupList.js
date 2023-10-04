import { useLocation } from 'react-router-dom';
import Group from './GroupItem';

const GroupList = ({ groupList }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const pathGroupId = pathSegments[2];

  const hasNoGroups = !groupList || groupList.length === 0;

  const sortedGroupList = groupList.slice().sort((a, b) => {
    if (a.groupId === pathGroupId) return -1;
    if (b.groupId === pathGroupId) return 1;
    return a.groupName.localeCompare(b.groupName);
  });

  return (
    <ul className='border-l-2 border-customDarkGray border-solid py-0.5 ml-6 mt-6 overflow-y-auto max-h-40 transparent-scrollbar overflow-x-hidden'>
      {hasNoGroups ? (
        <div className='text-center py-4 ml-3 text-customDarkGray'>
          가입된 그룹이 없습니다
        </div>
      ) : (
        sortedGroupList.map((group) => {
          return (
            <Group
              key={group.groupId}
              groupId={group.groupId}
              pathGroupId={pathGroupId}
              groupName={group.groupName}
            />
          );
        })
      )}
    </ul>
  );
};

export default GroupList;
