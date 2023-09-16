import HabitList from '../../components/habits/HabitList';
import HabitDetail from '../../components/habits/HabitDetail';
import { useParams } from 'react-router-dom';
import getCurrentDate from '../../utils/getCurrentDate';
import { useDailyHabits } from '../../hooks/useDailyHabits';

function MyHabit() {
  const { nickname } = useParams('nickname');
  const currentDate = getCurrentDate();
  const { dailyHabits, loading, error } = useDailyHabits(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${nickname}/habitList?date=${currentDate}`,
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='min-h-screen flex flex-col bg-main-bg text-white bg-vignette'>
      <div className='flex-1 flex justify-center items-center ml-[100px] mr-[100px]'>
        <div className='flex'>
          <div className='w-[400px] mr-4'>
            <HabitList dailyHabits={dailyHabits}></HabitList>
          </div>
          <div className='w-[600px] ml-4'>
            <HabitDetail></HabitDetail>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyHabit;
