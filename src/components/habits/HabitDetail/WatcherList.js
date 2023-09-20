import { useState } from 'react';
import WatcherButton from './WatcherButton';

const WatcherList = ({
  sortedApprovals,
  currentUserId,
  handleUnsubscribe,
  shouldRenderButtons,
}) => {
  const [hoveredWatcher, setHoveredWatcher] = useState(null);

  const handleMouseEnter = (watcherId) => {
    setHoveredWatcher(watcherId);
  };

  const handleMouseLeave = () => {
    setHoveredWatcher(null);
  };

  return (
    <div className='flex flex-wrap'>
      {Array.isArray(sortedApprovals) &&
        sortedApprovals.map((approval, index) => (
          <div
            className='relative m-2'
            key={index}
            onMouseEnter={() => handleMouseEnter(approval._id)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className='rounded-full border border-gray-300 w-12 h-12 object-cover'
              src={approval.profileImageUrl}
              alt='Watcher profile'
            />
            {shouldRenderButtons &&
              hoveredWatcher === approval._id &&
              approval._id === currentUserId && (
                <WatcherButton
                  isSubscribe={false}
                  handleAction={handleUnsubscribe}
                  className='absolute top-0 right-0 text-xl bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white'
                />
              )}
          </div>
        ))}
    </div>
  );
};

export default WatcherList;
