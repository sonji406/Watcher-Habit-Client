import React, { useState } from 'react';
import NotificationList from '../Notifications/NotificationList';

const Profile = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const mockNotifications = [
    { message: '메세지 내용 어쩌구...', date: '2023-09-12', time: '14:30' },
    { message: '메세지 내용 어쩌구...', date: '2023-09-12', time: '14:30' },
    { message: '메세지 내용 어쩌구...', date: '2023-09-12', time: '14:30' },
  ];

  return (
    <div className='relative'>
      <div
        onClick={() => setShowNotifications(!showNotifications)}
        className='bg-blue-400 p-2 rounded relative'
        style={{ width: '40px', height: '40px' }}
      >
        <span
          className='absolute bottom-0 right-0 bg-yellow-400 rounded-full text-xs p-1'
          style={{
            width: '20px',
            height: '20px',
            lineHeight: '20px',
            textAlign: 'center',
          }}
        >
          {mockNotifications.length}
        </span>
      </div>
      {showNotifications && (
        <div className='absolute right-0 mt-2 w-64 rounded-lg shadow-lg'>
          <NotificationList notifications={mockNotifications} />
        </div>
      )}
    </div>
  );
};

export default Profile;
