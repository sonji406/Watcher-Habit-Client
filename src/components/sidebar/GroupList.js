import { useLocation } from 'react-router-dom';
import Group from './GroupItem';

const GroupList = ({ groupList }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const pathGroupId = pathSegments[2];

  const groupNames = groupList.groupNames;
  const groupIds = groupList.groupIds;

  const hasNoGroups = groupNames.length === 0;

  return (
    <ul className='border-l-2 border-customDarkGray border-solid py-0.5 ml-6 mt-6 overflow-y-auto max-h-40 transparent-scrollbar overflow-x-hidden'>
      {hasNoGroups ? (
        <div className='text-center py-4 ml-3 text-customDarkGray'>
          가입된 그룹이 없습니다
        </div>
      ) : (
        groupNames.map((groupName, index) => {
          const groupId = groupIds[index];

          return (
            <Group
              key={groupId}
              groupId={groupId}
              pathGroupId={pathGroupId}
              groupName={groupName}
            />
          );
        })
      )}
    </ul>
  );
};

export default GroupList;
