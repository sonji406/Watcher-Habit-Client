import { useState } from 'react';
import GroupList from './GroupList';
import ArrowUpIcon from './icon/ArrowUp';
import ArrowDownIcon from './icon/ArrowDown';
import JoinGroupIcon from './icon/JoinedGroups';

const JoinedGroupsButton = ({ isHovered, isCurrentPage, groupList }) => {
  const [showGroupList, setShowGroupList] = useState(false);

  const handleGroupsButtonClick = () => {
    setShowGroupList(!showGroupList);
  };

  return (
    <>
      <div
        className={`text-customGray hover:text-customDarkGray flex hover:font-bold`}
        style={{ cursor: 'pointer' }}
        onClick={handleGroupsButtonClick}
      >
        <div
          className={`flex items-center p-3 ${
            !isHovered && isCurrentPage ? 'bg-dark-green-bg rounded-full' : ''
          } ${isCurrentPage ? 'text-customGreen' : ''}`}
        >
          <div className='flex items-center'>
            <JoinGroupIcon />
            {isHovered && <span className='ml-3'>가입된 그룹</span>}
          </div>
          <div className={`${isHovered ? 'ml-20' : ''}`}>
            {isHovered && (showGroupList ? <ArrowDownIcon /> : <ArrowUpIcon />)}
          </div>
        </div>
      </div>
      <div className={`flex w-full items-center text-customGray`}>
        {showGroupList && isHovered && <GroupList groupList={groupList} />}
      </div>
    </>
  );
};

export default JoinedGroupsButton;
