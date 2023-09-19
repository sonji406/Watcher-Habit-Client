import { useParams } from 'react-router-dom';
import getCurrentDate from '../../utils/getCurrentDate';
import { useDailyHabits } from '../../hooks/useDailyHabits';
import HabitList from '../../components/habits/HabitList';
import HabitDetail from '../../components/habits/HabitDetail';
import HabitVerfication from '../../components/verification/Verification';

const MyHabit = () => {
  const { nickname } = useParams('nickname');
  const currentDate = getCurrentDate();
  const { dailyHabits, loading, error } = useDailyHabits(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${nickname}/habitList?date=${currentDate}`,
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='min-h-screen flex flex-col bg-main-bg text-white bg-vignette'>
      <div className='flex-1 flex justify-center mx-auto mt-28'>
        <div className='flex'>
          <div className='w-[400px] mr-4'>
            <HabitList dailyHabits={dailyHabits} />
          </div>
          <div className='h-[70vh] w-[600px] overflow-y-auto top-12 bg-dark-blue-bg rounded-3xl z-10 relative custom-scrollbar'>
            <HabitVerfication />
          </div>
          {/* <HabitDetail /> */}
        </div>
      </div>
    </div>
  );
};

export default MyHabit;
