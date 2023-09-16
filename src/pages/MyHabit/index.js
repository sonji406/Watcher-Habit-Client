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
          <div className='w-[600px] ml-4 relative'>
            <div className='h-[70vh] bg-main-dark-blue rounded-t-2xl z-0'>
              <div className='flex h-full'>
                <div
                  style={{ width: '50%' }}
                  className='bg-green-bg text-center rounded-t-2xl'
                >
                  <p
                    className='text-2xl'
                    style={{ transform: 'translateY(10px)' }}
                  >
                    상세 페이지
                  </p>
                </div>
                <div
                  style={{ width: '50%' }}
                  className='bg-black text-center rounded-t-2xl'
                >
                  <p
                    className='text-2xl'
                    style={{ transform: 'translateY(10px)' }}
                  >
                    인증 페이지
                  </p>
                </div>
              </div>
            </div>
            <div className='h-[70vh] overflow-y-auto absolute top-12 left-0 right-0 bg-dark-blue-bg rounded-3xl z-10'>
              <HabitDetail />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyHabit;
