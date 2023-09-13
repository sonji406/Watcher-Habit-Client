import { useParams } from 'react-router-dom';
import LogoutButton from '../../components/Common/LogoutButton';

const MyHabit = () => {
  const { nickname } = useParams();

  return (
    <div>
      <h2>{nickname}'s Habits</h2>
      <LogoutButton />
    </div>
  );
};

export default MyHabit;
