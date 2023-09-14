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

  return (
    <div className='w-3/10 bg-main-dark-blue'>
      <div>
        {currentPage === 'my-habit' && <p>My Daily Habits</p>}
        {currentPage === 'group' && (
          <>
            <select
              value={selectedMemberNickname}
              onChange={(e) => setSelectedMemberNickname(e.target.value)}
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
      <div className='h-72 overflow-y-auto'>
        {habits.map((habit) => {
          return <HabitItem key={habit._id} habitInfo={habit}></HabitItem>;
        })}
        {currentPage === 'my-habit' && (
          <HabbitCreateButton></HabbitCreateButton>
        )}
      </div>
    </div>
  );
}

export default HabitList;
