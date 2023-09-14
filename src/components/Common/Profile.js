import React, { useEffect, useState } from 'react';
import NotificationList from '../notifications/NotificationList';
import axios from 'axios';

const Profile = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('/api/user/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserProfile(response.data);
      } catch (error) {
        console.error('Profile fetch failed:', error);
      }
    };

    fetchProfile();
  }, []);

  const mockNotifications = [
    {
      id: 1,
      message: 'ㅇㅇㅇ님이 습관 성공',
      date: '2023-09-12',
      time: '14:30',
      status: 'success',
      isVisible: true,
    },
    {
      id: 2,
      message: 'ㅇㅇㅇ님이 습관 실패',
      date: '2023-09-12',
      time: '14:30',
      status: 'failure',
      isVisible: true,
    },
    {
      id: 3,
      message: 'ㅇㅇㅇ님이 인증 요청',
      date: '2023-09-12',
      time: '14:30',
      status: 'verificationRequest',
      isVisible: true,
    },
    {
      id: 4,
      message: 'ㅇㅇㅇ님이 승인 완료',
      date: '2023-09-12',
      time: '14:30',
      status: 'approveRequest',
      isVisible: true,
    },
    {
      id: 5,
      message: 'ㅇㅇㅇ님이 초대',
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
        {userProfile.profileImageUrl ? (
          <img
            src={userProfile.profileImageUrl}
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
