import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import HabitList from '../../components/habits/HabitList';
import HabitDetail from '../../components/habits/HabitDetail/HabitDetail';
import getCurrentDate from '../../utils/getCurrentDate';
import { useDailyHabits } from '../../hooks/useDailyHabits';
import { clearHabitDetail } from '../../redux/habitSlice';
import HabitVerfication from '../../components/habits/verification/Verification';

function MyHabit() {
  const dispatch = useDispatch();
  const { nickname } = useParams('nickname');
  const [isDetail, setIsDetail] = useState(true);

  useEffect(() => {
    dispatch(clearHabitDetail());
  }, [nickname, dispatch]);

  const currentDate = getCurrentDate();
  const { dailyHabits, loading, error } = useDailyHabits(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${nickname}/habitList?date=${currentDate}`,
  );

  const handleView = () => {
    setIsDetail(!isDetail);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='min-h-screen flex flex-col bg-main-bg text-white bg-vignette'>
      <div className='flex-1 flex justify-center mx-auto mt-28'>
        <div className='flex'>
          <div className='w-[400px] mr-4'>
            <HabitList dailyHabits={dailyHabits} />
          </div>
          <div className='w-[600px] ml-4 relative'>
            <div className='h-[70vh] bg-main-dark-blue rounded-t-2xl z-0'>
              <div className='flex h-full'>
                <div
                  style={{ width: '50%' }}
                  className='bg-green-bg text-center rounded-t-2xl'
                  onClick={handleView}
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
                  onClick={handleView}
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
              {isDetail ? <HabitDetail /> : <HabitVerfication />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyHabit;
