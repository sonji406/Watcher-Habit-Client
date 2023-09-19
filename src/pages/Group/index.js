import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearHabitDetail } from '../../redux/habitSlice';
import { useDailyHabits } from '../../hooks/useDailyHabits';
import getCurrentDate from '../../utils/getCurrentDate';
import HabitList from '../../components/habits/HabitList';
import HabitDetailAndVerification from '../../components/habits/HabitDetailAndVerification';

function Group() {
  const dispatch = useDispatch();
  const { groupId } = useParams('groupId');

  const habit = useSelector((state) => state.habit.habitDetail);

  const currentDate = getCurrentDate();
  const { dailyHabits, loading, error } = useDailyHabits(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/group/${groupId}/habitList?date=${currentDate}`,
  );

  useEffect(() => {
    dispatch(clearHabitDetail());
  }, [groupId, dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className='min-h-screen flex-1  flex flex-col bg-main-bg text-white bg-vignette'>
      <article className='flex mx-auto mt-28'>
        <HabitList dailyHabits={dailyHabits} />
        <HabitDetailAndVerification habit={habit} />
      </article>
    </section>
  );
}

export default Group;
