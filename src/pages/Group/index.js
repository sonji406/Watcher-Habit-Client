import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import getGroup from '../../services/api/groupGet';
import { clearHabitDetail } from '../../redux/habitSlice';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import { useDailyHabits } from '../../hooks/useDailyHabits';
import getCurrentDate from '../../utils/getCurrentDate';
import HabitList from '../../components/habits/habitList/HabitList';
import HabitDetailAndVerification from '../../components/habits/HabitDetailAndVerification';
import Loading from '../../lib/loading/Loading';
import { clearNotificationHabitDetail } from '../../redux/notificationHabitSlice';

function Group() {
  const dispatch = useDispatch();
  const { groupId } = useParams('groupId');
  const currentDate = getCurrentDate();
  const [groupInfo, setGroupInfo] = useState(null);

  const { dailyHabits, loading, error } = useDailyHabits(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/group/${groupId}/habitList?date=${currentDate}`,
  );

  const fetchGroupInfo = async () => {
    try {
      dispatch(clearHabitDetail());
      dispatch(clearNotificationHabitDetail());

      const data = await getGroup(groupId);

      setGroupInfo(data);
    } catch (error) {
      console.error('Error fetching group info', error);
    }
  };

  let title = groupInfo ? `그룹 ${groupInfo.group.groupName}의 페이지` : null;

  useDocumentTitle(title);

  useEffect(() => {
    fetchGroupInfo();
  }, [groupId, dispatch]);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className='min-h-screen flex flex-col bg-main-bg text-white'>
      <div className='text-center pt-20 mr-20'>
        <div className='inline-block'>
          <h1 className='text-2xl'>{groupInfo.group.groupName}</h1>
          <div className='w-full h-[2px] bg-white mt-2'></div>
        </div>
      </div>
      <article className='flex mx-auto mt-10'>
        <HabitList dailyHabits={dailyHabits} />
        <HabitDetailAndVerification />
      </article>
    </section>
  );
}

export default Group;
