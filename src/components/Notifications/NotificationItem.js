import React from 'react';

const NotificationItem = ({
  message,
  date,
  time,
  status,
  isVisible,
  setIsVisible,
}) => {
  const renderButton = () => {
    switch (status) {
      case 'success':
        return (
          <button className='bg-[#1C2532] text-white text-sm mt-2 px-4 py-2 rounded-full'>
            확인하러 가기
          </button>
        );
      case 'failure':
        return (
          <button className='bg-[#1C2532] text-white text-sm mt-2 px-4 py-2 rounded-full'>
            확인하러 가기
          </button>
        );
      case 'verificationRequest':
        return (
          <button className='bg-[#1C2532] text-white text-sm mt-2 px-4 py-2 rounded-full'>
            인증하러 가기
          </button>
        );
      case 'approveRequest':
        return (
          <button className='bg-[#1C2532] text-white text-sm mt-2 px-4 py-2 rounded-full'>
            승인하러 가기
          </button>
        );
      case 'invite':
        return (
          <button className='bg-[#1C2532] text-white text-sm mt-2 px-4 py-2 rounded-full'>
            수락하기
          </button>
        );
      default:
        return (
          <button className='bg-[#1C2532] text-white text-sm mt-2 px-4 py-2 rounded-full'>
            확인하러 가기
          </button>
        );
    }
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
