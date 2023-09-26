import { Link } from 'react-router-dom';

const Group = ({ groupId, pathGroupId, groupName }) => {
  return (
    <Link to={`/group/${groupId}`}>
      <div className={`py-3`}>
        <li
          className={`w-50 mx-2 px-3 text-left truncate hover:font-bold hover:text-customDarkGray ${
            pathGroupId === groupId
              ? 'py-1 bg-dark-green-bg rounded-full text-customGreen font-bold'
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
