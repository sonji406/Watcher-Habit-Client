import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import formatDate from '../../utils/formatDate';
import getHabitAPI from '../../services/api/habit/getHabit';
import patchGroupAPI from '../../services/api/group/patchGroup';
import getButtonText from '../../lib/notification/getButtonText';
import { setNotificationHabitDetail } from '../../redux/notificationHabitSlice';

const commonButtonClass =
  'bg-dark-blue-bg text-white hover:text-green-txt text-sm mt-2 px-4 py-2 rounded-full';

const NotificationItem = ({
  notification,
  hideNotification,
  setIsModalOpen,
}) => {
  const {
    content,
    createdAt: date,
    status,
    to: userId,
    groupId,
    habitId,
  } = notification;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInvite = async () => {
    try {
      const body = { userId };
      await patchGroupAPI(groupId, body);

      navigate(`/group/${groupId}`);
    } catch (error) {
      console.error('NotificationItem error:', error);
    }
  };

  const openHabitVerificationModal = () => {
    setIsModalOpen(true);
  };

  const getButtonHandler = (status) => {
    const buttonHandlerMap = {
      success: openHabitVerificationModal,
      failure: openHabitVerificationModal,
      verificationRequest: openHabitVerificationModal,
      approveRequest: openHabitVerificationModal,
      invite: handleInvite,
    };
    return buttonHandlerMap[status];
  };

  const handleOnClick = async () => {
    try {
      const response = await getHabitAPI(habitId);

      response.data.approvals = response.data.approvals.map((approval) => ({
        ...approval._id,
        status: approval.status,
        profileImageUrl: approval._id.profileImageUrl,
      }));

      dispatch(setNotificationHabitDetail(response.data));
    } catch (error) {
      console.error('NotificationItem error:', error);
    }
    hideNotification();
    await getButtonHandler(status)();
  };

  const { date: formattedDate, time: formattedTime } = formatDate(date);
  const renderButton = () => {
    const buttonText = getButtonText(status);
    return (
      <button className={commonButtonClass} onClick={handleOnClick}>
        {buttonText}
      </button>
    );
  };

  return (
    <div className='py-2 px-4 flex flex-col items-center justify-center border rounded-lg bg-main-bg m-4 relative '>
      <div className='absolute top-0 right-3 flex space-x-1'>
        <p className='text-sm text-gray-600 pr-1 pt-1'>{formattedDate}</p>
        <p className='text-sm text-gray-600 pr-1 pt-1'>{formattedTime}</p>
      </div>
      <p className='text-center text-white text-sm mt-5'>{content}</p>
      {renderButton()}
    </div>
  );
};

export default NotificationItem;
