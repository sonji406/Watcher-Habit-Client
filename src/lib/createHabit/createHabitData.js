import handleTime from '../../utils/timeUtils';

const createHabitData = (formData, userId) => {
  const {
    habitTitle,
    habitContent,
    habitStartDate,
    habitEndDate,
    doDay,
    startTime,
    duration,
    minApprovalCount,
    sharedGroup,
    penalty,
    timePeriod,
  } = formData;

  const startTimeInMinutes = handleTime.convertTimeToMinutes(
    startTime,
    timePeriod,
  );
  const endTimeInMinutes = startTimeInMinutes + duration;

  const newStartTime = handleTime.formatTimeFromMinutes(startTimeInMinutes);
  const endTime = handleTime.formatTimeFromMinutes(endTimeInMinutes);

  const habitData = {
    creator: userId,
    doDay,
    startTime: newStartTime,
    endTime,
    habitStartDate,
    habitEndDate,
    minApprovalCount,
    habitTitle,
    habitContent,
    penalty,
  };

  if (sharedGroup) {
    habitData.sharedGroup = sharedGroup;
  }

  return habitData;
};

export default createHabitData;
