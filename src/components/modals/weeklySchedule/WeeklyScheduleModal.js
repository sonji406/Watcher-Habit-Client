import React, { useRef } from 'react';
import Loading from './Loading';
import WeeklySchedule from './WeeklySchedule';
import { useClickOutside } from '../../../hooks/useClickOutside';
import useWeeklySchedule from '../../../hooks/useWeeklySchedule';

const WeeklyScheduleModal = ({ onClose }) => {
  const modalContentRef = useRef();
  const { isLoading, weeklySchedule, setCurrentWeekStart, currentWeekStart } =
    useWeeklySchedule();

  const goToCurrentWeek = () => {
    setCurrentWeekStart(new Date(currentWeekStart));
  };

  const goToPreviousWeek = () => {
    const prevStartDate = new Date(currentWeekStart);
    prevStartDate.setDate(prevStartDate.getDate() - 7);
    setCurrentWeekStart(prevStartDate);
  };

  const goToNextWeek = () => {
    const nextStartDate = new Date(currentWeekStart);
    nextStartDate.setDate(nextStartDate.getDate() + 7);
    setCurrentWeekStart(nextStartDate);
  };

  const handleClose = () => {
    document.body.style.overflow = '';
    onClose();
  };

  useClickOutside(modalContentRef, handleClose);

  return (
    <div className='fixed inset-0 w-full flex items-center justify-center z-40 bg-black bg-opacity-50'>
      {isLoading ? (
        <Loading />
      ) : (
        <WeeklySchedule
          weeklySchedule={weeklySchedule}
          modalContentRef={modalContentRef}
          handleClose={handleClose}
          goToPreviousWeek={goToPreviousWeek}
          goToNextWeek={goToNextWeek}
          goToCurrentWeek={goToCurrentWeek}
          currentWeekStart={currentWeekStart}
        />
      )}
    </div>
  );
};

export default WeeklyScheduleModal;
