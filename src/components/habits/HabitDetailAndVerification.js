import { useState } from 'react';
import TitleAndAuthorInfo from './TitleAndAuthorInfo';
import HabitDetail from './HabitDetail/HabitDetail';
import HabitVerfication from './verification/Verification';

const HabitDetailAndVerification = ({ habit }) => {
  const [isDetail, setIsDetail] = useState(true);

  const handleViewDetail = () => {
    setIsDetail(true);
  };

  const handleViewVerfication = () => {
    setIsDetail(false);
  };

  return (
    <article className='w-[600px] ml-4 relative'>
      <div className='h-[100px] flex bg-main-dark-blue rounded-t-2xl z-0'>
        <div
          style={{ width: '50%' }}
          className='bg-green-bg text-center rounded-t-2xl'
          onClick={handleViewDetail}
        >
          <p className='text-2xl' style={{ transform: 'translateY(10px)' }}>
            상세 페이지
          </p>
        </div>
        <div
          style={{ width: '50%' }}
          className='bg-black text-center rounded-t-2xl'
          onClick={handleViewVerfication}
        >
          <p className='text-2xl' style={{ transform: 'translateY(10px)' }}>
            인증 페이지
          </p>
        </div>
      </div>
      <div className='h-[70vh] absolute top-12 left-0 right-0 bg-dark-blue-bg rounded-3xl z-10 overflow-hidden'>
        {Object.keys(habit).length !== 0 ? (
          <>
            <TitleAndAuthorInfo
              title={habit.title}
              groupName={habit.sharedGroup.groupName}
              creator={habit.creator}
            />
            {isDetail ? <HabitDetail /> : <HabitVerfication />}
          </>
        ) : (
          <></>
        )}
      </div>
    </article>
  );
};

export default HabitDetailAndVerification;
