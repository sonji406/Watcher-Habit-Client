import { useState } from 'react';
import { useSelector } from 'react-redux';
import TitleAndAuthorInfo from './TitleAndAuthorInfo';
import HabitDetail from './HabitDetail/HabitDetail';
import HabitVerfication from './verification/Verification';
import Tabs from './Tabs';
import { isEmptyObject } from '../../utils/objectUtils';
import EmptyHabitDetailState from './HabitDetail/EmptyHabitDetailState';

const HabitDetailAndVerification = () => {
  const [isDetail, setIsDetail] = useState(true);

  const habit = useSelector((state) => state.habit.habitDetail);

  const handleViewDetail = () => {
    setIsDetail(true);
  };

  const handleViewVerfication = () => {
    setIsDetail(false);
  };

  return (
    <article className='w-[600px] ml-4 relative'>
      <Tabs
        handleViewDetail={handleViewDetail}
        handleViewVerfication={handleViewVerfication}
      />
      <div className='h-[70vh] text-center absolute top-12 left-0 right-0 bg-dark-blue-bg rounded-3xl z-10'>
        {isEmptyObject(habit) ? (
          <EmptyHabitDetailState />
        ) : (
          <>
            <TitleAndAuthorInfo
              title={habit.habitTitle}
              groupName={habit.sharedGroup.groupName}
              creator={habit.creator}
            />
            {isDetail ? (
              <HabitDetail habitDetail={habit} />
            ) : (
              <HabitVerfication habit={habit} />
            )}
          </>
        )}
      </div>
    </article>
  );
};

export default HabitDetailAndVerification;
