import { useParams } from 'react-router-dom';
import HabitList from '../../components/habits/HabitList';
import { useDailyHabits } from '../../hooks/useDailyHabits';
import getCurrentDate from '../../utils/getCurrentDate';
import HabitDetail from '../../components/habits/HabitDetail';

function Group() {
  const { groupId } = useParams('groupId');
  const currentDate = getCurrentDate();
  const { dailyHabits, loading, error } = useDailyHabits(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/group/${groupId}/habitList?date=${currentDate}`,
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='min-h-screen flex flex-col bg-main-bg text-white bg-vignette'>
      <HabitList dailyHabits={dailyHabits}></HabitList>
      <HabitDetail></HabitDetail>
    </div>
  );
}

export default Group;
