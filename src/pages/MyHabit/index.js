import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearHabitDetail } from '../../redux/habitSlice';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useDailyHabits } from '../../hooks/useDailyHabits';
import getCurrentDate from '../../utils/getCurrentDate';
import HabitList from '../../components/habits/habitList/HabitList';
import HabitDetailAndVerification from '../../components/habits/HabitDetailAndVerification';
import Loading from '../../lib/loading/Loading';
import { clearNotificationHabitDetail } from '../../redux/notificationHabitSlice';
import getUserIdFromToken from '../../utils/getUserIdFromToken';
import { useFetchUserInfo } from '../../hooks/useFetchUserInfo';

function MyHabit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = getUserIdFromToken();
  const loggedInUserNickname = useFetchUserInfo(userId);
  const currentDate = getCurrentDate();

  const { nickname } = useParams('nickname');

  useDocumentTitle(`${nickname}님의 습관 관리 페이지`);

  const { dailyHabits, loading, error } = useDailyHabits(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${nickname}/habitList?date=${currentDate}`,
  );

  useEffect(() => {
    dispatch(clearHabitDetail());
    dispatch(clearNotificationHabitDetail());
  }, [nickname, dispatch]);

  if (!loggedInUserNickname || loading) return <Loading />;

  if (nickname !== loggedInUserNickname || error) {
    navigate(`/my-habit/${loggedInUserNickname}`);

    return null;
  }

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
