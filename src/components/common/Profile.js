import React, { useState, useRef, useEffect } from 'react';
import NotificationList from '../notifications/NotificationList';
import { useProfileImage } from '../../hooks/useProfileImage';
import { useClickOutside } from '../../hooks/useClickOutside';
import Notification from './Notification';
import axios from 'axios';
import getUserIdFromToken from '../../utils/getUserIdFromToken';

const Profile = () => {
  const containerRef = useRef(null);

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { profileImageUrl, error } = useProfileImage();
  const userId = getUserIdFromToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_DOMAIN}/api/notification/${userId}`,
        );
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const visibleCount = notifications.length;

  const toggleNotifications = () => {
    setShowNotifications((prevState) => !prevState);
  };

  useClickOutside(containerRef, () => setShowNotifications(false));

  return (
    <div className='absolute top-0 right-0 flex items-center p-4'>
      <Notification />
      <div
        className='relative'
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
            <span className='absolute bottom-[-5px] right-[-5px] bg-yellow-400 rounded-full text-xs p-1 flex justify-center items-center w-[20px] h-[20px] text-[12px]'>
              {visibleCount}
            </span>
          )}
        </div>

        {showNotifications && (
          <div className='absolute right-0 mt-2 w-64 rounded-lg shadow-lg'>
            <NotificationList
              notifications={notifications}
              setNotifications={setNotifications}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
