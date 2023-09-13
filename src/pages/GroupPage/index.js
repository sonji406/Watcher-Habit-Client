import HabitList from '../../components/Habits/HabitList';

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
    ],
    지은: [
      {
        _id: '603f650b1f32123d20b5372e',
        habitTitle: 'Meditation',
        startTime: '05:30',
        endTime: '06:00',
      },
    ],
  },
};

function GroupPage() {
  return <HabitList groupDailyHaibt={mockResponseData}></HabitList>;
}

export default GroupPage;
