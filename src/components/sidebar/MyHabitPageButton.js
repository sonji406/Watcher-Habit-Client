import { Link } from 'react-router-dom';
import MyHabitIcon from './icon/MyHabit';

const MyHabitPageButton = ({ nickname, isHovered, isCurrentPage }) => {
  return (
    <Link to={`/my-habit/${nickname}`}>
      <div
        className={`flex items-center text-customGray hover:text-customDarkGray hover:font-bold p-3 mb-10 ${
          isCurrentPage
            ? 'bg-dark-green-bg rounded-full text-customGreen hover:text-customGreen'
            : ''
        } ${isHovered ? 'w-[210px] ' : ''}`}
        style={{ cursor: 'pointer' }}
      >
        <MyHabitIcon />
        {isHovered && <span className='ml-2'>나의 습관 관리</span>}
      </div>
    </Link>
  );
};

export default MyHabitPageButton;
