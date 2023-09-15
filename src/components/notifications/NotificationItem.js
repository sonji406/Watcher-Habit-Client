import React from 'react';
import getButtonText from '../../utils/getButtonText';

const commonButtonClass =
  'bg-dark-blue-bg text-white hover:text-green-txt text-sm mt-2 px-4 py-2 rounded-full';

const formatDate = (isoString) => {
  const dateObj = new Date(isoString);
  const date = `${dateObj.getFullYear()}-${String(
    dateObj.getMonth() + 1,
  ).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
  const time = `${String(dateObj.getHours()).padStart(2, '0')}:${String(
    dateObj.getMinutes(),
  ).padStart(2, '0')}`;
  return { date, time };
};

const NotificationItem = ({ content, date, status }) => {
  const { date: formattedDate, time: formattedTime } = formatDate(date);
  const renderButton = () => {
    const buttonText = getButtonText(status);
    return <button className={commonButtonClass}>{buttonText}</button>;
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
