import { useState } from 'react';
import axios from 'axios';
import {
  convertTimeToMinutes,
  formatTimeFromMinutes,
} from '../utils/timeUtils';

export const useHandleSubmit = (
  validateForm,
  userId,
  navigate,
  nickname,
  isEdit = false,
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleResponse = (response) => {
    if (response.status !== 200 && response.status !== 201) {
      setMessage('오류가 발생했습니다.');
      setMessageType('error');
      return;
    }

    setMessage('습관이 성공적으로 저장되었습니다.');
    setMessageType('success');

    setTimeout(() => {
      navigate(`/my-habit/${nickname}`);
    }, 3000);
  };

  const handleSubmit = async (formData) => {
    const isValid = validateForm(formData);

    if (!isValid) return;

    setIsSubmitting(true);

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

    try {
      let response;

      if (isEdit) {
        response = await axios.patch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitData.habitId}`,
          habitData,
        );
        handleResponse(response);
        return;
      }

      response = await axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit`,
        habitData,
      );

      handleResponse(response);
    } catch (error) {
      const errorMsg =
        error.response && error.response.data
          ? error.response.data.error
          : '습관 생성에 실패하였습니다.';

      setMessage(errorMsg);
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting, message, messageType };
};
