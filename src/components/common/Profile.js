import React, { useState, useRef, useEffect } from 'react';
import NotificationList from '../notifications/NotificationList';
import { useProfileImage } from '../../hooks/useProfileImage';
import { useClickOutside } from '../../hooks/useClickOutside';
import RealTimeNotifications from '../realTimeNotifications/RealTimeNotifications';
import getUserIdFromToken from '../../utils/getUserIdFromToken';
import { useQuery } from 'react-query';
import BellIcon from './bellIcon';
import api from '../../utils/api';

const Profile = () => {
  const containerRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const { profileImageUrl, error } = useProfileImage();
  const userId = getUserIdFromToken();

  const { data: notifications, isError } = useQuery(
    'notifications',
    async () => {
      const response = await api.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/notification/${userId}`,
        { withCredentials: true },
      );

      return response.data.notifications;
    },
    {
      refetchInterval: 10000,
    },
  );

  useEffect(() => {
    if (isError) {
      console.error('Error fetching notifications');
    }
  }, [isError]);

  const visibleCount = notifications?.length || 0;

  const toggleNotifications = () => {
    setShowNotifications((prevState) => !prevState);
  };

  useEffect(() => {
    if (notifications?.length > shakeKey) {
      setShakeKey(notifications.length);
    }
  }, [notifications]);

  useClickOutside(containerRef, () => setShowNotifications(false));

  return (
    <div className='absolute top-0 right-0 flex items-center p-4'>
      <RealTimeNotifications />
      <div
        className='absolute top-2 right-2'
        style={{ fontFamily: 'NotoSansKR' }}
        ref={containerRef}
      >
        <div onClick={toggleNotifications}>
          {error ? (
            <div className='bg-red-500 rounded w-[40px] h-[40px] text-white flex justify-center items-center border border-white'>
              !
            </div>
          ) : profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt='프로필 이미지'
              className='rounded object-cover w-[40px] h-[40px] border border-white'
            />
          ) : (
            <div className='bg-transparent rounded w-[40px] h-[40px] border border-white'></div>
          )}

          {visibleCount > 0 && (
            <span
              key={shakeKey}
              className={`absolute bottom-[-6px] right-[-6px] animate-shake`}
            >
              <BellIcon />
            </span>
          )}
        </div>

        {showNotifications && (
          <div className='absolute right-5 top-10 mt-2 w-64 rounded-lg shadow-lg'>
            <NotificationList
              notifications={notifications || []}
              setNotifications={() => {}}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
