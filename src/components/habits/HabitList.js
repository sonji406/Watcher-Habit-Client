import { useLocation } from 'react-router-dom';
import GroupInviteButton from './GroupInviteButton';
import { useState } from 'react';
import HabitItem from './HabitItem';
import HabbitCreateButton from './HabitCreateButton';

function HabitList({ dailyHabits }) {
  const currentUrl = useLocation().pathname;
  const currentPage = currentUrl.split('/')[1]; // 'my-habit' or 'group'
  const members = Object.keys(dailyHabits.data);
  const [selectedMemberNickname, setSelectedMemberNickname] = useState(
    members[0],
  );
  const habits = dailyHabits.data[selectedMemberNickname];
  const handleOnchange = (e) => setSelectedMemberNickname(e.target.value);

  const sortedHabits = habits.sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className='relative bg-main-dark-blue'>
      <div className='h-[70vh] absolute top-0 left-0 right-0 bg-green-bg text-white p-4 rounded-t-2xl text-center z-0'>
        {currentPage === 'my-habit' && (
          <p className='text-2xl' style={{ transform: 'translateY(-10px)' }}>
            My Daily Habits
          </p>
        )}
        {currentPage === 'group' && (
          <>
            <select
              value={selectedMemberNickname}
              onChange={handleOnchange}
              className='bg-green-bg'
              style={{ transform: 'translateY(5px)' }}
            >
              {members.map((member) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </select>
            <GroupInviteButton></GroupInviteButton>
          </>
        )}
      </div>
      <div className='h-[70vh] overflow-hidden top-12 bg-dark-blue-bg rounded-3xl z-10 relative p-3'>
        <div className='h-full overflow-y-auto pt-4 custom-scrollbar'>
          {sortedHabits.map((habit) => {
            return <HabitItem key={habit._id} habitInfo={habit}></HabitItem>;
          })}
        </div>
        {currentPage === 'my-habit' && (
          <HabbitCreateButton></HabbitCreateButton>
        )}
      </div>
    </div>
  );
}

export default HabitList;
