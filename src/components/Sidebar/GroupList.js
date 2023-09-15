import { useLocation } from 'react-router-dom';
import Group from './GroupItem';

const GroupList = ({ groupList }) => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const pathGroupId = pathSegments[2];

  const groupNames = groupList.groupNames;
  const groupIds = groupList.groupIds;

  return (
    <ul className='border-l-2 border-customDarkGray border-solid py-0.5 ml-6 mt-6 pl-4 overflow-y-auto max-h-60'>
      {groupNames.map((groupName, index) => {
        const groupId = groupIds[index];

        return (
          <Group
            key={groupId}
            groupId={groupId}
            pathGroupId={pathGroupId}
            groupName={groupName}
          />
        );
      })}
    </ul>
  );
};

export default GroupList;
