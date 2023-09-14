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

  const setIsVisible = (id, value) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, isVisible: value }
          : notification,
      ),
    );
  };

  const closeAllNotifications = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isVisible: false,
      })),
    );
  };

  return (
    <div
      className='bg-main-dark-blue rounded-lg h-[80vh] flex flex-col'
      style={{ fontFamily: 'NotoSansKR' }}
    >
      <div className='flex justify-between p-2 items-center'>
        <div className='flex items-center'>
          <img src={bellIcon} alt='bell icon' className='h-4 w-4 mr-2' />
          <p className='text-main-green font-bold'>알림</p>
        </div>
        <button
          className='text-sm text-gray-400'
          onClick={closeAllNotifications}
        >
          전체 알림 닫기
        </button>
      </div>

      <div className='overflow-y-auto flex-grow custom-scrollbar'>
        {notifications.map((notification, index) => (
          <NotificationItem
            key={index}
            content={notification.content}
            date={notification.date}
            time={notification.time}
            status={notification.status}
            isVisible={notification.isVisible}
            setIsVisible={(value) => setIsVisible(notification.id, value)}
          />
        ))}
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
