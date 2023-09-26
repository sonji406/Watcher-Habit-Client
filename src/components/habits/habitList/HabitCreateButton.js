import { useNavigate, useParams } from 'react-router-dom';

const HabitCreateButton = () => {
  const { nickname } = useParams('nickname');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/my-habit/${nickname}/new-habit`);
  };

  return (
    <button
      className='flex justify-center items-center bg-green-bg text-white text-3xl rounded-full w-10 h-10 hover:bg-green-700'
      onClick={handleClick}
    >
      +
    </button>
  );
};

export default HabitCreateButton;
