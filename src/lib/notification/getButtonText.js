const getButtonText = (status) => {
  const buttonTextMap = {
    success: '확인하러 가기',
    failure: '확인하러 가기',
    verificationRequest: '인증하러 가기',
    approveRequest: '승인하러 가기',
    invite: '수락하기',
  };
  return buttonTextMap[status] || '확인하러 가기';
};

export default getButtonText;
