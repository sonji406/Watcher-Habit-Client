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

  return (
    <div className='relative bg-main-dark-blue'>
      <div className='h-[50vh] absolute top-0 left-0 right-0 bg-green-bg text-white p-4 rounded-t-2xl text-center z-0'>
        <div style={{ transform: 'translateY(-10px)' }}>
          {currentPage === 'my-habit' && (
            <p className='text-2xl'>My Daily Habits</p>
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
      </div>
      <div className='h-[50vh] overflow-y-auto top-12 bg-dark-blue-bg rounded-3xl z-10 relative custom-scrollbar'>
        {habits.map((habit) => {
          return <HabitItem key={habit._id} habitInfo={habit}></HabitItem>;
        })}
      </div>
      {currentPage === 'my-habit' && <HabbitCreateButton></HabbitCreateButton>}
    </div>
  );
}

export default HabitList;
