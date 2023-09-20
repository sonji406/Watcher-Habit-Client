import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearHabitDetail } from '../../redux/habitSlice';
import { useDailyHabits } from '../../hooks/useDailyHabits';
import getCurrentDate from '../../utils/getCurrentDate';
import HabitList from '../../components/habits/habitList/HabitList';
import HabitDetailAndVerification from '../../components/habits/HabitDetailAndVerification';

function MyHabit() {
  const dispatch = useDispatch();
  const { nickname } = useParams('nickname');

  const currentDate = getCurrentDate();
  const { dailyHabits, loading, error } = useDailyHabits(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${nickname}/habitList?date=${currentDate}`,
  );

  useEffect(() => {
    dispatch(clearHabitDetail());
  }, [nickname, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className='flex flex-1 min-h-screen bg-main-bg text-white bg-vignette'>
      <article className='flex mt-28 mx-auto'>
        <HabitList dailyHabits={dailyHabits} />
        <HabitDetailAndVerification />
      </article>
    </section>
  );
}

export default MyHabit;
