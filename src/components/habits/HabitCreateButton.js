import { useNavigate, useParams } from 'react-router-dom';

const HabitCreateButton = () => {
  const { nickname } = useParams('nickname');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/my-habit/${nickname}/new-habit`);
  };

  return <button onClick={handleClick}>+</button>;
};

export default HabitCreateButton;
