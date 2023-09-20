import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import getGroup from '../../services/api/groupGet';
import { clearHabitDetail } from '../../redux/habitSlice';
import { useDailyHabits } from '../../hooks/useDailyHabits';
import getCurrentDate from '../../utils/getCurrentDate';
import HabitList from '../../components/habits/habitList/HabitList';
import HabitDetailAndVerification from '../../components/habits/HabitDetailAndVerification';

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

      const data = await getGroup(groupId);

      setGroupInfo(data);
    } catch (error) {
      console.error('Error fetching group info', error);
    }
  };

  useEffect(() => {
    fetchGroupInfo();
  }, [groupId, dispatch]);

  if (loading) return <div>Loading...</div>;
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
