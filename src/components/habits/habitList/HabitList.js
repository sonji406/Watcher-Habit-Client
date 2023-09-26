import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HabitItem from './HabitItem';
import GroupInviteButton from './GroupInviteButton';
import HabbitCreateButton from './HabitCreateButton';

function HabitList({ dailyHabits }) {
  const [selectedHabitId, setSelectedHabitId] = useState(null);
  const currentUrl = useLocation().pathname;
  const currentPage = currentUrl.split('/')[1]; // 'my-habit' or 'group'
  const groupId = currentPage === 'group' ? currentUrl.split('/')[2] : '';
  const members = Object.keys(dailyHabits.data);
  const [selectedMemberNickname, setSelectedMemberNickname] = useState(
    members[0],
  );
  const sortedMembers = members.sort((a, b) => a.localeCompare(b));
  const habits = dailyHabits.data[selectedMemberNickname];

  const handleOnchange = (e) => setSelectedMemberNickname(e.target.value);

  const sortedHabits = habits?.sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <article className='w-[400px] mr-4 relative bg-main-dark-blue'>
      <div className='h-[70vh] absolute top-0 left-0 right-0 bg-green-bg text-white p-1 rounded-t-2xl text-center'>
        {currentPage === 'my-habit' && (
          <p
            className='text-2xl mt-3'
            style={{ transform: 'translateY(-10px)' }}
          >
            My Daily Habits
          </p>
        )}
        {currentPage === 'group' && (
          <select
            value={selectedMemberNickname}
            onChange={handleOnchange}
            className='bg-green-bg'
            style={{ transform: 'translateY(5px)' }}
          >
            {sortedMembers?.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
        )}
        {currentPage === 'group' && (
          <GroupInviteButton groupId={groupId}></GroupInviteButton>
        )}
      </div>

      <div className='h-[70vh] overflow-hidden border-2 border-customGreen top-12 bg-dark-blue-bg rounded-3xl z-20 relative p-3'>
        <div className='h-full overflow-y-auto pt-4 custom-scrollbar'>
          {sortedHabits && sortedHabits.length > 0 ? (
            sortedHabits.map((habit) => {
              return (
                <HabitItem
                  key={habit._id}
                  habitInfo={habit}
                  isSelected={selectedHabitId === habit._id}
                  onSelect={() => setSelectedHabitId(habit._id)}
                />
              );
            })
          ) : (
            <div
              className={`flex flex-col items-center justify-center bg-main-bg text-white p-4 m-2 rounded-lg shadow-lg transform hover:scale-95 transition duration-200 ease-in-out`}
            >
              <div className='flex flex-col items-center'>
                <div className='text-sm text-center text-dark-gray-txt my-2'>
                  등록된 습관이 없습니다
                </div>
                {currentPage === 'my-habit' && <HabbitCreateButton />}
              </div>
            </div>
          )}
        </div>

        {currentPage === 'my-habit' &&
          sortedHabits &&
          sortedHabits.length > 0 && (
            <div className='absolute bottom-4 right-4 z-20'>
              <HabbitCreateButton />
            </div>
          )}
      </div>
    </article>
  );
}

export default HabitList;
