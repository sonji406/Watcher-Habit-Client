import { useLocation, useParams } from 'react-router-dom';
import GroupInviteButton from './GroupInviteButton';
import { useState } from 'react';

function HabitList({ userDailyHaibt, groupDailyHaibt }) {
  const currentUrl = useLocation().pathname;
  const { nickname: currentUserNickName } = useParams();
  const [selectedMemberNickname, setSelectedMemberNickname] =
    useState(currentUserNickName);

  const currentPage = currentUrl.split('/')[1]; // 'my-habit' or 'group'
  const groupMembers =
    currentPage === 'group' ? Object.keys(groupDailyHaibt.data) : null;

  let habits = [];

  if (currentPage === 'my-habit') {
    habits = userDailyHaibt.data;
  }

  if (currentPage === 'group') {
    habits = groupDailyHaibt.data[selectedMemberNickname];
  }

  return (
    <div>
      {currentPage === 'my-habit' && (
        <div>
          <p>My Daily Habits</p>
        </div>
      )}
      {currentPage === 'group' && (
        <div>
          <select
            value={selectedMemberNickname}
            onChange={(e) => setSelectedMemberNickname(e.target.value)}
          >
            {groupMembers.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
          <GroupInviteButton></GroupInviteButton>
        </div>
      )}
      <div>
        {habits.map((habit) => {
          return <div>test</div>;
        })}
      </div>
    </div>
  );
}

export default HabitList;
