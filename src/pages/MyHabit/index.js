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

  console.log(dailyHabits, loading, error);
  console.log(currentDate);

  return (
    <div className='min-h-screen flex flex-col bg-main-bg text-white bg-vignette'>
      <div className='flex-1 flex justify-center mx-auto mt-28'>
        <div className='flex'>
          <div className='w-[400px] mr-4'>
            <HabitList dailyHabits={dailyHabits} />
          </div>
          <div className='h-[70vh] w-[600px] overflow-y-auto top-12 bg-dark-blue-bg rounded-3xl z-10 relative custom-scrollbar'>
            <span>제목</span>
            <span>작성자</span>
            <HabitVerfication />
          </div>
          {/* <HabitDetail /> */}
          {/* <div className='w-[300px] h-[70px] bg-green-bg text-white p-4 rounded-t-2xl text-center z-0 mr-3'></div>
          <div className='w-[300px] h-[70px] bg-green-bg text-white p-4 rounded-t-2xl text-center z-0'></div> */}
        </div>
      </div>
    </div>
  );
};

export default MyHabit;
