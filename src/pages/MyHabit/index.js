import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearHabitDetail } from '../../redux/habitSlice';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useDailyHabits } from '../../hooks/useDailyHabits';
import getCurrentDate from '../../utils/getCurrentDate';
import HabitList from '../../components/habits/habitList/HabitList';
import HabitDetailAndVerification from '../../components/habits/HabitDetailAndVerification';
import Loading from '../../lib/loading/Loading';
import { clearNotificationHabitDetail } from '../../redux/notificationHabitSlice';

function MyHabit() {
  const dispatch = useDispatch();
  const { nickname } = useParams('nickname');

  useDocumentTitle(`${nickname}님의 습관 관리 페이지`);

  const currentDate = getCurrentDate();
  const { dailyHabits, loading, error } = useDailyHabits(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${nickname}/habitList?date=${currentDate}`,
  );

  useEffect(() => {
    dispatch(clearHabitDetail());
    dispatch(clearNotificationHabitDetail());
  }, [nickname, dispatch]);

  if (loading) return <Loading />;
  if (error) return <article>Error: {error.message}</article>;

  return (
    <main className='flex flex-1 min-h-screen bg-main-bg text-white bg-vignette'>
      <section className='flex mt-28 mx-auto'>
        <HabitList dailyHabits={dailyHabits} />
        <HabitDetailAndVerification />
      </section>
    </main>
  );
}

export default MyHabit;
