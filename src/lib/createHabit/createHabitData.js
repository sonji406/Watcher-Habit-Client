import {
  convertTimeToMinutes,
  formatTimeFromMinutes,
} from '../../utils/timeUtils';

export const createHabitData = (formData, userId) => {
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

  const startTimeInMinutes = convertTimeToMinutes(startTime, timePeriod);
  const endTimeInMinutes = startTimeInMinutes + duration;

  const newStartTime = formatTimeFromMinutes(startTimeInMinutes);
  const endTime = formatTimeFromMinutes(endTimeInMinutes);

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
