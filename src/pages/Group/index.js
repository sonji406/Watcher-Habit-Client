import { useParams } from 'react-router-dom';
import HabitList from '../../components/habits/HabitList';
import { useDailyHabits } from '../../hooks/useDailyHabits';
import getCurrentDate from '../../utils/getCurrentDate';
import HabitDetail from '../../components/habits/HabitDetail';
import HabitVerfication from '../../components/verification/Verification';

function Group() {
  const { groupId } = useParams('groupId');
  const currentDate = getCurrentDate();
  const { dailyHabits, loading, error } = useDailyHabits(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/group/${groupId}/habitList?date=${currentDate}`,
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='min-h-screen flex flex-col bg-main-bg text-white bg-vignette'>
      <div className='flex-1 flex justify-center items-center ml-[100px] mr-[100px]'>
        <div className='flex'>
          <div className='w-[400px] mr-4'>
            <HabitList dailyHabits={dailyHabits}></HabitList>
          </div>
          <div className='h-[70vh] w-[600px] overflow-y-auto top-12 bg-dark-blue-bg rounded-3xl z-10 relative custom-scrollbar'>
            <HabitVerfication />
          </div>
          {/* <div className='w-[600px] ml-4'>
            <HabitDetail></HabitDetail>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Group;
