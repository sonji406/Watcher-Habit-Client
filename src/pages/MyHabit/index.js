import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearHabitDetail } from '../../redux/habitSlice';
import { clearNotificationHabitDetail } from '../../redux/notificationHabitSlice';
import Loading from '../../lib/loading/Loading';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useDailyHabits from '../../hooks/useDailyHabits';
import useFetchUserInfo from '../../hooks/useFetchUserInfo';
import getCurrentDate from '../../utils/getCurrentDate';
import getUserIdFromToken from '../../utils/getUserIdFromToken';
import HabitList from '../../components/habits/habitList/HabitList';
import HabitDetailAndVerification from '../../components/habits/HabitDetailAndVerification';

function MyHabit() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userId = getUserIdFromToken();
  const loggedInUserNickname = useFetchUserInfo(userId);
  const currentDate = getCurrentDate();

  const { nickname } = useParams('nickname');

  useDocumentTitle(`${nickname}님의 습관 관리 페이지`);

  const { dailyHabits, loading, error } = useDailyHabits(
    `/user/${nickname}/habitList?date=${currentDate}`,
  );

  useEffect(() => {
    dispatch(clearHabitDetail());
    dispatch(clearNotificationHabitDetail());

    if (nickname !== loggedInUserNickname || error) {
      navigate(`/my-habit/${loggedInUserNickname}`, { replace: true });
    }
  }, [nickname, dispatch, loggedInUserNickname, error, navigate]);

  if (!loggedInUserNickname || loading) return <Loading />;

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
