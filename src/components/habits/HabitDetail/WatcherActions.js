import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  subscribeWatcher,
  unsubscribeWatcher,
} from '../../../services/api/watcher';
import { updateWatcherList } from '../../../redux/habitSlice';
import getUserIdFromToken from '../../../utils/getUserIdFromToken';

const WatcherActions = ({ habitDetail }) => {
  const [hoveredWatcher, setHoveredWatcher] = useState(null);
  const currentUserId = getUserIdFromToken();
  let sortedApprovals = [];

  const isCurrentUserCreator =
    habitDetail.creator?._id?.toString() === currentUserId.toString();

  const isCurrentUserWatcher = habitDetail.approvals?.some((approval) => {
    return approval._id._id.toString() === currentUserId.toString();
  });

  const isGroupShared =
    habitDetail.sharedGroup && habitDetail.sharedGroup.groupName;
  const hasNoWatchers =
    !habitDetail.approvals || habitDetail.approvals.length === 0;

  if (habitDetail.approvals) {
    sortedApprovals = [...habitDetail.approvals].sort((a, b) => {
      if (a._id === currentUserId) return -1;
      if (b._id === currentUserId) return 1;
      return 0;
    });
  }

  const dispatch = useDispatch();

  const handleSubscribe = async () => {
    try {
      const habitId = habitDetail._id;
      const watcherId = getUserIdFromToken();
      const response = await subscribeWatcher(habitId, watcherId);
      console.log('Subscribe response:', response);
      dispatch(updateWatcherList(response.updatedWatchers));
    } catch (error) {
      console.error('Failed to subscribe:', error);
    }
  };

  const handleUnsubscribe = async () => {
    try {
      const habitId = habitDetail._id;
      const watcherId = getUserIdFromToken();
      const response = await unsubscribeWatcher(habitId, watcherId);
      console.log('Unsubscribe response:', response);
      dispatch(updateWatcherList(response.updatedWatchers));
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
    }
  };

  const handleMouseEnter = (watcherId) => {
    setHoveredWatcher(watcherId);
  };

  const handleMouseLeave = () => {
    setHoveredWatcher(null);
  };

  return (
    <div className='bg-main-bg p-4 rounded-lg mb-4 text-left'>
      <span className='font-bold'>Watchers</span>
      {isGroupShared ? (
        <>
          {hasNoWatchers && !isCurrentUserCreator ? (
            <div className='m-2'>
              <button
                className='rounded-full border border-gray-300 text-3xl bg-green-bg w-12 h-12 flex items-center justify-center'
                onClick={handleSubscribe}
              >
                +
              </button>
            </div>
          ) : hasNoWatchers && isCurrentUserCreator ? (
            <p className='text-center mb-4 text-dark-gray-txt'>
              내 습관을 구독한 <br />
              Watcher가 없습니다
            </p>
          ) : (
            <div className='flex flex-wrap mb-4'>
              {!isCurrentUserWatcher && !isCurrentUserCreator && (
                <div className='m-2'>
                  <button
                    className='rounded-full border border-gray-300 text-3xl bg-green-bg w-12 h-12 flex items-center justify-center'
                    onClick={handleSubscribe}
                  >
                    +
                  </button>
                </div>
              )}
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
                      src={approval._id.profileImageUrl}
                      alt='Watcher profile'
                    />
                    {hoveredWatcher === approval._id &&
                      approval._id._id.toString() ===
                        currentUserId.toString() && (
                        <button
                          className='absolute top-0 right-0 text-xl bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white'
                          onClick={handleUnsubscribe}
                        >
                          -
                        </button>
                      )}
                  </div>
                ))}
            </div>
          )}
        </>
      ) : (
        <p className='text-center mb-4 text-dark-gray-txt'>
          비공개 습관이므로
          <br />
          Watcher가 없습니다
        </p>
      )}
    </div>
  );
};

export default WatcherActions;
