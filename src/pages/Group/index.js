import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../lib/loading/Loading';
import groupGet from '../../services/api/groupGet';
import getUserInfo from '../../services/api/userGet';
import getCurrentDate from '../../utils/getCurrentDate';
import { clearHabitDetail } from '../../redux/habitSlice';
import { useDailyHabits } from '../../hooks/useDailyHabits';
import getUserIdFromToken from '../../utils/getUserIdFromToken';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import HabitList from '../../components/habits/habitList/HabitList';
import { clearNotificationHabitDetail } from '../../redux/notificationHabitSlice';
import HabitDetailAndVerification from '../../components/habits/HabitDetailAndVerification';

function Group() {
  const dispatch = useDispatch();
  const { groupId } = useParams('groupId');
  const navigate = useNavigate();

  const currentDate = getCurrentDate();
  const [groupInfo, setGroupInfo] = useState(null);

  const { dailyHabits, loading, error } = useDailyHabits(
    `/group/${groupId}/habitList?date=${currentDate}`,
  );

  const fetchGroupInfo = async () => {
    try {
      dispatch(clearHabitDetail());
      dispatch(clearNotificationHabitDetail());

      const data = await groupGet(groupId);

      if (!data.isMember) {
        const userId = getUserIdFromToken();
        const userInfo = await getUserInfo(userId);

        setGroupInfo(data.group);

        navigate(`/my-habit/${userInfo.nickname}`);
        return;
      }

      setGroupInfo(data);
    } catch (error) {
      navigate('/404');
    }
  };

  let title =
    groupInfo && groupInfo.group
      ? `그룹 ${groupInfo.group.groupName}의 페이지`
      : null;

  useDocumentTitle(title);

  useEffect(() => {
    fetchGroupInfo();
  }, [groupId, dispatch]);

  if (loading) return <Loading />;

  if (error) {
    navigate('/404');
    return null;
  }

  return (
    <section className='min-h-screen flex flex-col bg-main-bg text-white'>
      <header className='text-center pt-20'>
        <div className='inline-block'>
          <h1 className='text-2xl'>
            {groupInfo?.group?.groupName || 'Loading...'}
          </h1>
          <hr className='w-full h-[2px] bg-white mt-2' />
        </div>
      </header>
      <main className='flex mx-auto mt-10'>
        <HabitList dailyHabits={dailyHabits} />
        <HabitDetailAndVerification />
      </main>
    </section>
  );
}

export default Group;
