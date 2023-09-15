import { useParams } from 'react-router-dom';
import LogoutButton from '../../components/common/LogoutButton';

const MyHabit = () => {
  const { nickname } = useParams();

  return (
    <div
      className='min-h-screen flex flex-col bg-main-bg text-white bg-vignette'
      style={{ fontFamily: 'NotoSansKR' }}
    >
      <h2>{nickname}'s Habits</h2>
      <LogoutButton />
    </div>
  );
};

export default MyHabit;
