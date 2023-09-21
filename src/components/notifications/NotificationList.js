import React from 'react';
import NotificationItem from './NotificationItem';
import { useNavigate } from 'react-router-dom';
import logoutAPI from '../../services/api/logout';

const bellIcon = `${process.env.PUBLIC_URL}/images/notification/bell.png`;

const NotificationList = ({ notifications, setNotifications }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAPI();
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div
      className='bg-dark-blue-bg rounded-lg h-[80vh] flex flex-col'
      style={{ fontFamily: 'NotoSansKR' }}
    >
      <div className='flex justify-between p-2 items-center'>
        <div className='flex items-center'>
          <img src={bellIcon} alt='bell icon' className='h-4 w-4 mr-2' />
          <p className='text-green-txt font-bold'>알림</p>
        </div>
      </div>

      <div className='overflow-y-auto flex-grow custom-scrollbar'>
        {notifications.length !== 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))
        ) : (
          <p className='text-center text-white'>알림이 없습니다</p>
        )}
      </div>

      <div className='flex-shrink-0'>
        <button
          className='w-full text-center py-2 text-sm text-red-400'
          onClick={handleLogout}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default NotificationList;
