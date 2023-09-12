import React from 'react';
import NotificationItem from './NotificationItem';

const NotificationList = ({ notifications }) => {
  return (
    <div className='bg-[#1C2532] rounded-lg'>
      <div className='flex justify-between p-2'>
        <p className='font-bold'>알림</p>
        <button className='text-sm text-gray-400'>지우기</button>
      </div>
      {notifications.map((notification, index) => (
        <NotificationItem key={index} {...notification} />
      ))}
      <button className='w-full text-center py-2 text-sm text-red-400'>
        로그아웃
      </button>
    </div>
  );
};

export default NotificationList;
