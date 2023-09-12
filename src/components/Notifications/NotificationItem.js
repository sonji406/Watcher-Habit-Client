import React from 'react';

const commonButtonClass =
  'bg-main-dark-blue text-white hover:text-main-green text-sm mt-2 px-4 py-2 rounded-full';

const NotificationItem = ({
  message,
  date,
  time,
  status,
  isVisible,
  setIsVisible,
}) => {
  const renderButton = () => {
    let buttonText = '확인하러 가기';
    switch (status) {
      case 'success':
        buttonText = '확인하러 가기';
        break;
      case 'failure':
        buttonText = '확인하러 가기';
        break;
      case 'verificationRequest':
        buttonText = '인증하러 가기';
        break;
      case 'approveRequest':
        buttonText = '승인하러 가기';
        break;
      case 'invite':
        buttonText = '수락하기';
        break;
      default:
        buttonText = '확인하러 가기';
        break;
    }

    return <button className={commonButtonClass}>{buttonText}</button>;
  };

  return (
    isVisible && (
      <div className='py-2 px-4 flex flex-col items-center justify-center rounded-lg bg-[#27313C] m-4 relative'>
        <div className='absolute top-0 right-3 flex space-x-1'>
          <p className='text-sm text-gray-600'>{date}</p>
          <p className='text-sm text-gray-600'>{time}</p>
          <button
            onClick={() => setIsVisible(false)}
            className='text-blue-500 text-xs'
          >
            닫기
          </button>
        </div>
        <p className='text-center mt-5'>{message}</p>
        {renderButton()}
      </div>
    )
  );
};

export default NotificationItem;
