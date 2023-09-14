import React, { useState } from 'react';
import NotificationList from '../notifications/NotificationList';
import { useProfileImage } from '../../hooks/useProfileImage';

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

const Profile = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { profileImageUrl, error } = useProfileImage();

  const [notifications, setNotifications] = useState(mockNotifications);

  const visibleCount = notifications.filter((n) => n.isVisible).length;

  return (
    <div className='relative' style={{ fontFamily: 'NotoSansKR' }}>
      <div onClick={() => setShowNotifications(!showNotifications)}>
        {error ? (
          <div className='bg-red-500 rounded w-[40px] h-[40px] text-white flex justify-center items-center'>
            !
          </div>
        ) : profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt='프로필 이미지'
            className='rounded object-cover w-[40px] h-[40px]'
          />
        ) : (
          <div className='bg-blue-400 rounded w-[40px] h-[40px]'></div>
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
  );
};

export default Profile;
