import { useState } from 'react';
import CloseButton from './CloseButton';
import ActionButton from './ActionButton';
import NotificationContent from './NotificationContent';

const NotificationMessage = ({ notification, onButtonClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClose = () => {
    onButtonClick(notification);
  };

  return (
    <div
      className='pt-4 pb-2 px-2 text-center bg-white text-sm border-green-400 mb-2 border-2 rounded-lg relative transform transition-transform duration-500 ease-in-out'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NotificationContent content={notification.content} />
      {isHovered && <CloseButton onClick={handleClose} />}
      <div className='flex mt-2'>
        <ActionButton status={notification.status} onClick={handleClose} />
      </div>
    </div>
  );
};

export default NotificationMessage;
