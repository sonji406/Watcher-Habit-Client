import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NotificationMessage from './NotificationMessage';
import VerifyHabitModal from '../modals/VerifyHabit';
import initEventSource from '../../utils/initEventSource';
import { setNotificationHabitDetail } from '../../redux/notificationHabitSlice';
import api from '../../utils/api';

const NOTIFICATION_STATUSES = [
  'success',
  'failure',
  'verificationRequest',
  'approveRequest',
];

const RealTimeNotifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventSource = initEventSource(onMessage, setError);
    return () => eventSource.close();
  }, []);

  const onMessage = (notification) => {
    addMessage(notification);
    setTimeout(() => removeMessage(notification._id), 5000);
  };

  const addMessage = (message) => {
    setNotifications((currentNotifications) => [
      message,
      ...currentNotifications,
    ]);
  };

  const removeMessage = (id) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((message) => message._id !== id),
    );
  };

  const handleInvite = async (notification) => {
    const body = { userId: notification.to };
    const response = await api.patch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/group/${notification.groupId}/members`,
      body,
      { withCredentials: true },
    );
    const groupId = response.data.groupId;
    navigate(`/group/${groupId}`);
  };

  const handleHabitNotification = async (notification) => {
    const response = await api.get(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${notification.habitId}`,
      { withCredentials: true },
    );

    const updatedApprovals = response.data.approvals.map((approval) => ({
      ...approval._id,
      status: approval.status,
      profileImageUrl: approval._id.profileImageUrl,
    }));

    dispatch(
      setNotificationHabitDetail({
        ...response.data,
        approvals: updatedApprovals,
      }),
    );
  };

  const handleActionButtonClick = async (notification) => {
    try {
      if (notification.status === 'invite') {
        await handleInvite(notification);
      } else {
        await handleHabitNotification(notification);
      }

      if (NOTIFICATION_STATUSES.includes(notification.status)) {
        setIsModalOpen(true);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCloseButtonClick = (notification) => {
    removeMessage(notification._id);
  };

  return (
    <div className='mr-10'>
      {isModalOpen && (
        <VerifyHabitModal onClose={() => setIsModalOpen(false)} />
      )}
      {error && <div>Error: {error}</div>}
      {notifications.map((notification) => (
        <NotificationMessage
          key={notification._id}
          notification={notification}
          onActionButtonClick={() => handleActionButtonClick(notification)}
          onCloseButtonClick={() => handleCloseButtonClick(notification)}
        />
      ))}
    </div>
  );
};

export default RealTimeNotifications;
