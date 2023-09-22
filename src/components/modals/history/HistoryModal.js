import { useEffect, useRef, useState } from 'react';
import mockHistory from './mockData';
import { useClickOutside } from '../../../hooks/useClickOutside';
import Loading from '../../../lib/loading/Loading';

const getStatusColor = (status) => {
  switch (status) {
    case 'approvalSuccess':
      return 'bg-green-500';
    case 'expiredFailure':
      return 'bg-red-500';
    case 'approvalFailure':
      return 'bg-yellow-500';
    default:
      return 'bg-gray-400';
  }
};

const HistoryModal = ({ onClose }) => {
  const modalRef = useRef();

  const [displayedHabitsCount, setDisplayedHabitsCount] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  useClickOutside(modalRef, handleClose);

  const userHabitHistory = mockHistory.map(({ date, userIds }) => {
    return {
      date,
      habits: userIds.userId1,
    };
  });

  const displayedHabits = userHabitHistory.slice(0, displayedHabitsCount);
  const hasMoreHabits = displayedHabitsCount < userHabitHistory.length;

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop <= clientHeight + 5 && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setDisplayedHabitsCount((prevCount) => prevCount + 3);
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    const modalContent = modalRef.current;

    modalContent.addEventListener('scroll', handleScroll);

    return () => {
      modalContent.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading]);

  return (
    <div className='fixed inset-0 w-full flex items-center justify-center z-40 bg-black bg-opacity-50'>
      {isLoading && <Loading />}
      <div
        className='bg-dark-blue-bg border h-[75vh] border-customGreen overflow-y-auto custom-scrollbar relative rounded w-3/5 pr-5 pl-5 pb-5 text-white rounded-xl'
        ref={modalRef}
      >
        <div className='flex flex-col sticky top-0 bg-dark-blue-bg z-10 p-5'>
          <div>
            <header className='text-center font-extrabold'>History</header>
          </div>

          <div className='mt-2 flex justify-end'>
            <button
              onClick={handleClose}
              className='text-2xl text-white hover:text-red-600 transition duration-200 ease-in-out'
            >
              ×
            </button>
          </div>
        </div>

        {displayedHabits.map(({ date, habits }) => (
          <div key={date} className='mb-4'>
            <h2 className='text-lg font-semibold'>{date}</h2>
            <ul>
              {habits &&
                Object.entries(habits).map(([habitId, habit]) => (
                  <li key={habitId} className='mb-2'>
                    <div
                      className={`p-2 rounded-lg ${getStatusColor(
                        habit.status,
                      )}`}
                    >
                      <h3>{habit.habitTitle}</h3>
                      <p>
                        {habit.startTime}~{habit.endTime}
                      </p>
                      <p>{habit.habitContent}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        ))}

        {isLoading && hasMoreHabits && (
          <div className='text-center py-2'>지난 습관 불러오는 중...</div>
        )}

        {!hasMoreHabits && (
          <div className='text-center py-2'>더 불러올 습관이 없습니다</div>
        )}
      </div>
    </div>
  );
};

export default HistoryModal;
