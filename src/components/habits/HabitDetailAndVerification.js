import { useState } from 'react';
import { useSelector } from 'react-redux';
import TitleAndAuthorInfo from './TitleAndAuthorInfo';
import HabitDetail from './HabitDetail/HabitDetail';
import HabitVerification from './verification/HabitVerification';
import Tabs from './Tabs';
import { isEmptyObject } from '../../utils/objectUtils';
import EmptyHabitDetailState from './HabitDetail/EmptyHabitDetailState';

const HabitDetailAndVerification = ({ isModal = false }) => {
  const [isDetail, setIsDetail] = useState(true);
  const selectConditon = isModal
    ? (state) => state.notificationHabit.notificationHabitDetail
    : (state) => state.habit.habitDetail;
  const habitDetail = useSelector(selectConditon);

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
        {isEmptyObject(habitDetail) ? (
          <EmptyHabitDetailState />
        ) : (
          <>
            <TitleAndAuthorInfo
              title={habitDetail.habitTitle}
              groupName={habitDetail.sharedGroup?.groupName}
              creator={habitDetail.creator}
            />
            {isDetail ? (
              <HabitDetail isModal={isModal} />
            ) : (
              <HabitVerification isModal={isModal} />
            )}
          </>
        )}
      </div>
    </article>
  );
};

export default HabitDetailAndVerification;
