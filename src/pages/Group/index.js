import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearHabitDetail } from '../../redux/habitSlice';
import { clearNotificationHabitDetail } from '../../redux/notificationHabitSlice';
import Loading from '../../lib/loading/Loading';
import getGroupAPI from '../../services/api/group/getGroup';
import getUserInfoAPI from '../../services/api/user/getUser';
import getCurrentDate from '../../utils/getCurrentDate';
import getUserIdFromToken from '../../utils/getUserIdFromToken';
import useDailyHabits from '../../hooks/useDailyHabits';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import HabitList from '../../components/habits/habitList/HabitList';
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

      const data = await getGroupAPI(groupId);

      if (!data.isMember) {
        const userId = getUserIdFromToken();
        const userInfo = await getUserInfoAPI(userId);

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
