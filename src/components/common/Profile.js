import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotificationList from '../notifications/NotificationList';
import { useSelector } from 'react-redux';
import decodeJwtResponse from '../../utils/decodeJwtResponse';

const Profile = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchData = async () => {
      let userId = null;
      try {
        const decoded = decodeJwtResponse(accessToken);
        userId = decoded.userId;
      } catch (error) {
        console.error('Error decoding JWT:', error);
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/${userId}`,
        );
        const user = response.data;
        setProfileImageUrl(user.profileImageUrl);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();
  }, [accessToken]);

  const mockNotifications = [
    {
      id: 1,
      content: 'ㅇㅇㅇ님이 습관 성공',
      date: '2023-09-12',
      time: '14:30',
      status: 'success',
      isVisible: true,
    },
    {
      id: 2,
      content: 'ㅇㅇㅇ님이 습관 실패',
      date: '2023-09-12',
      time: '14:30',
      status: 'failure',
      isVisible: true,
    },
    {
      id: 3,
      content: 'ㅇㅇㅇ님이 인증 요청',
      date: '2023-09-12',
      time: '14:30',
      status: 'verificationRequest',
      isVisible: true,
    },
    {
      id: 4,
      content: 'ㅇㅇㅇ님이 승인 완료',
      date: '2023-09-12',
      time: '14:30',
      status: 'approveRequest',
      isVisible: true,
    },
    {
      id: 5,
      content: 'ㅇㅇㅇ님이 초대',
      date: '2023-09-12',
      time: '14:30',
      status: 'invite',
      isVisible: true,
    },
  ];

  const [notifications, setNotifications] = useState(mockNotifications);

  const visibleCount = notifications.filter((n) => n.isVisible).length;

  return (
    <div className='relative'>
      <div onClick={() => setShowNotifications(!showNotifications)}>
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt='프로필 이미지'
            className='rounded object-cover'
            style={{ width: '40px', height: '40px' }}
          />
        ) : (
          <div
            className='bg-blue-400 rounded'
            style={{ width: '40px', height: '40px' }}
          ></div>
        )}
        {visibleCount > 0 && (
          <span
            className='absolute bottom-0 right-0 bg-yellow-400 rounded-full text-xs p-1 flex justify-center items-center'
            style={{
              width: '20px',
              height: '20px',
              fontSize: '12px',
              bottom: '-5px',
              right: '-5px',
            }}
          >
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
  );
};

export default Profile;
