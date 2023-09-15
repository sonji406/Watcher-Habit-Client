import HabitList from '../../components/habits/HabitList';
import HabitDetail from '../../components/habits/HabitDetail';
import { useParams } from 'react-router-dom';
import getCurrentDate from '../../utils/getCurrentDate';
import { useDailyHabits } from '../../hooks/useDailyHabits';

const mockResponseData = {
  status: 200,
  data: {
    시환: [
      {
        _id: '603f650b1f32123d20b5372b',
        habitTitle: 'Morning Run',
        startTime: '06:00',
        endTime: '07:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
      {
        _id: '603f650b1f32123d20b5372c',
        habitTitle: 'Reading',
        startTime: '21:00',
        endTime: '22:00',
      },
    ],
  },
};

function MyHabit() {
  const { nickname } = useParams('nickname');
  const currentDate = getCurrentDate();
  const { dailyHabits, loading, error } = useDailyHabits(
    `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${nickname}/habitList?date=${currentDate}`,
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='min-h-screen flex flex-col bg-main-bg text-white bg-vignette'>
      <div className='w-full h-4/5 flex'>
        <HabitList dailyHabits={dailyHabits}></HabitList>
        <HabitDetail></HabitDetail>
      </div>
    </div>
  );
}

export default MyHabit;
