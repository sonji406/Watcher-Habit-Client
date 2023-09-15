import { useState } from 'react';

export const useValidation = () => {
  const [validationMessage, setValidationMessage] = useState('');

  const validateForm = ({
    habitTitle,
    habitContent,
    habitStartDate,
    habitEndDate,
    doDay,
    startTime,
    duration,
    minApprovalCount,
    sharedGroup,
  }) => {
    if (!habitTitle) {
      setValidationMessage('습관 제목을 입력해 주세요.');
      return false;
    }

    if (habitTitle.length < 2 || habitTitle.length > 10) {
      setValidationMessage('습관 제목은 2자 이상 10자 이내로 입력해 주세요.');
      return false;
    }

    if (!habitContent) {
      setValidationMessage('습관 내용을 입력해 주세요.');
      return false;
    }

    if (habitContent.length < 2 || habitContent.length > 100) {
      setValidationMessage('습관 내용은 2자 이상 100자 이내로 입력해 주세요.');
      return false;
    }

    if (!habitStartDate) {
      setValidationMessage('시작일을 선택해 주세요.');
      return false;
    }

    if (!habitEndDate) {
      setValidationMessage('종료일을 선택해 주세요.');
      return false;
    }

    if (new Date(habitEndDate) < new Date(habitStartDate)) {
      setValidationMessage('종료일은 시작일 이후로 설정해 주세요.');
      return false;
    }

    if (!doDay.length) {
      setValidationMessage('반복 주기를 선택해 주세요.');
      return false;
    }

    if (!startTime) {
      setValidationMessage('습관 시작 시간을 선택해 주세요.');
      return false;
    }

    if (duration === 0) {
      setValidationMessage('습관 진행 시간을 선택해 주세요.');
      return false;
    }

    if (sharedGroup) {
      if (minApprovalCount <= 0) {
        setValidationMessage(
          '그룹 공유 시 최소 승인 인원은 1명 이상이어야 합니다.',
        );
        return false;
      }
    }

    setValidationMessage('');
    return true;
  };

  return { validationMessage, validateForm };
};
