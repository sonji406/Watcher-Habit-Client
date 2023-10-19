import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NotificationMessage from './NotificationMessage';
import VerifyHabitModal from '../modals/VerifyHabit';
import initEventSource from '../../utils/initEventSource';
import getHabitAPI from '../../services/api/habit/getHabit';
import patchGroupAPI from '../../services/api/group/patchGroup';
import { setNotificationHabitDetail } from '../../redux/notificationHabitSlice';

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
    try {
      const body = { userId: notification.to };
      const response = await patchGroupAPI(notification.groupId, body);

      const groupId = response.data.groupId;
      navigate(`/group/${groupId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleHabitNotification = async (notification) => {
    try {
      const response = await getHabitAPI(notification.habitId);

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
    } catch (error) {
      console.error(error);
    }
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
    <aside className='mr-10'>
      {isModalOpen && (
        <VerifyHabitModal onClose={() => setIsModalOpen(false)} />
      )}
      {error && <article>Error: {error.message}</article>}
      {notifications.map((notification) => (
        <NotificationMessage
          key={notification._id}
          notification={notification}
          onActionButtonClick={() => handleActionButtonClick(notification)}
          onCloseButtonClick={() => handleCloseButtonClick(notification)}
        />
      ))}
    </aside>
  );
};

export default RealTimeNotifications;
