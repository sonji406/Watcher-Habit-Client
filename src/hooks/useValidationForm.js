import { useState, useEffect } from 'react';
import validationMessages from '../pages/CreateHabit/forms/message/validationMessages';

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
      displayValidationMessage(validationMessages.generalRequired);
      return false;
    }

    if (
      sharedGroup &&
      (minApprovalCount === undefined || minApprovalCount <= 0)
    ) {
      displayValidationMessage(validationMessages.generalRequired);
      return false;
    }

    displayValidationMessage('');
    return true;
  };

  return { validationMessage, validateForm };
};
