import React from 'react';

const NotificationItem = ({ message, date, time }) => {
  return (
    <div className='py-2 px-4 flex flex-col items-center justify-cente rounded-lg bg-[#27313C] m-4'>
      <div className='self-end flex space-x-1'>
        <p className='text-sm text-gray-600'>{date}</p>
        <p className='text-sm text-gray-600'>{time}</p>
      </div>
      <p className='text-center'>{message}</p>
      <button className='bg-black text-white text-sm mt-2 px-4 py-2 rounded-full'>
        확인하러 가기
      </button>
    </div>
  );
};

export default NotificationItem;
