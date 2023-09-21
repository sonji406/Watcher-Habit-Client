import React from 'react';
import getButtonText from '../../lib/notification/getButtonText';
import formatDate from '../../utils/formatDate';
import axios from 'axios';

const commonButtonClass =
  'bg-dark-blue-bg text-white hover:text-green-txt text-sm mt-2 px-4 py-2 rounded-full';

const NotificationItem = ({ notification }) => {
  const {
    content,
    createdAt: date,
    status,
    to: userId,
    groupId,
  } = notification;
  const getButtonHandler = (status) => {
    const buttonHandlerMap = {
      success: '확인하러 가기',
      failure: '확인하러 가기',
      verificationRequest: '인증하러 가기',
      approveRequest: '승인하러 가기',
      invite: () => {
        const body = { userId };
        axios.patch(
          `${process.env.REACT_APP_SERVER_DOMAIN}api/group/${groupId}/invite`,
          body,
        );
      },
    };
    return buttonHandlerMap[status];
  };

  const { date: formattedDate, time: formattedTime } = formatDate(date);
  const renderButton = () => {
    const buttonText = getButtonText(status);
    return (
      <button className={commonButtonClass} onClick={getButtonHandler}>
        {buttonText}
      </button>
    );
  };

  return (
    <div className='py-2 px-4 flex flex-col items-center justify-center rounded-lg bg-main-bg m-4 relative'>
      <div className='absolute top-0 right-3 flex space-x-1'>
        <p className='text-sm text-gray-600'>{formattedDate}</p>
        <p className='text-sm text-gray-600'>{formattedTime}</p>
      </div>
      <p className='text-center mt-5'>{content}</p>
      {renderButton()}
    </div>
  );
};

export default NotificationItem;
