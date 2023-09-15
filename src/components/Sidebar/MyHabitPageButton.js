import { Link } from 'react-router-dom';
import MyHabitIcon from './icon/MyHabit';

const MyHabitPageButton = ({ nickname, isHovered, isCurrentPage }) => {
  return (
    <div className='mb-14'>
      <Link to={`/my-habit/${nickname}`}>
        <div
          className={`flex items-center text-customGray hover:text-customDarkGray hover:font-bold p-3 ${
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
    </div>
  );
};

export default MyHabitPageButton;
