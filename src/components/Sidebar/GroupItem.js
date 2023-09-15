import { Link } from 'react-router-dom';

const Group = ({ groupId, pathGroupId, groupName }) => {
  return (
    <Link to={`/group/${groupId}`}>
      <div className={`py-3`}>
        <li
          className={`hover:font-bold hover:text-customDarkGray py-2 w-36 text-center ${
            pathGroupId === groupId
              ? 'bg-dark-green-bg rounded-full text-customGreen'
              : ''
          }`}
        >
          {groupName}
        </li>
      </div>
    </Link>
  );
};

export default Group;
