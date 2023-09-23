import { useState, useEffect } from 'react';

export const useValidation = () => {
  const [validationMessage, setValidationMessage] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  const displayValidationMessage = (message) => {
    setValidationMessage(message);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(() => {
      setValidationMessage('');
    }, 3000);

    setTimeoutId(id);
  };

  const validateForm = ({
    habitTitle,
    habitContent,
    doDay,
    startTime,
    duration,
    minApprovalCount,
    sharedGroup,
    penalty,
    habitStartDate,
    habitEndDate,
  }) => {
    if (
      !habitTitle ||
      !habitContent ||
      !doDay.length ||
      !startTime ||
      duration === 0 ||
      !penalty ||
      !habitStartDate ||
      !habitEndDate
    ) {
      displayValidationMessage('필수 항목*을 모두 작성해야 합니다.');
      return false;
    }

    if (
      sharedGroup &&
      (minApprovalCount === undefined || minApprovalCount <= 0)
    ) {
      displayValidationMessage('필수 항목*을 모두 작성해야 합니다.');
      return false;
    }

    displayValidationMessage('');
    return true;
  };

  return { validationMessage, validateForm };
};
