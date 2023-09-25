import { useState } from 'react';
import CloseButton from './CloseButton';
import ActionButton from './ActionButton';
import NotificationContent from './NotificationContent';

const NotificationMessage = ({
  notification,
  onActionButtonClick,
  onCloseButtonClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClose = () => {
    onCloseButtonClick(notification);
  };

  return (
    <div
      className='pt-4 pb-2 px-2 text-center bg-white text-sm border-green-400 mb-2 border-2 rounded-lg w-56 opacity-80 transition-transform duration-150 ease-in-out transform hover:scale-110'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <NotificationContent content={notification.content} />
      {isHovered && <CloseButton onClick={handleClose} />}
      <div className='flex mt-2'>
        <ActionButton
          status={notification.status}
          onClick={onActionButtonClick}
        />
      </div>
    </div>
  );
};

export default NotificationMessage;
