import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  subscribeWatcher,
  unsubscribeWatcher,
} from '../../../services/api/watcher';
import {
  unSubscribeWatcherList,
  updateWatcherList,
} from '../../../redux/habitSlice';
import getUserIdFromToken from '../../../utils/getUserIdFromToken';
import ErrorMessage from './ErrorMessage';
import WatcherList from './WatcherList';
import WatcherButton from './WatcherButton';
import {
  unSubscribeNotificationWatcherList,
  updateNotificationWatcherList,
} from '../../../redux/notificationHabitSlice';

const WatcherActions = ({ habitDetail, isModal = false }) => {
  const dispatch = useDispatch();
  const [subscriptionError, setSubscriptionError] = useState(null);
  const currentUserId = getUserIdFromToken();

  const shouldRenderButtons =
    habitDetail.status === 'notTimeYet' || habitDetail.status === 'inProgress';

  const isCurrentUserCreator = habitDetail.creator?._id === currentUserId;

  const isCurrentUserWatcher = habitDetail.approvals?.some((approval) => {
    return approval._id === currentUserId;
  });

  const isGroupShared =
    habitDetail.sharedGroup && habitDetail.sharedGroup.groupName;

  const hasNoWatchers =
    !habitDetail.approvals || habitDetail.approvals.length === 0;

  const sortedApprovals = habitDetail.approvals
    ? [...habitDetail.approvals].sort((a, b) => {
        if (a._id === currentUserId) return -1;
        if (b._id === currentUserId) return 1;
        return 0;
      })
    : [];

  useEffect(() => {
    setSubscriptionError(null);
  }, [habitDetail]);

  const handleSubscribe = async () => {
    try {
      setSubscriptionError(null);
      const habitId = habitDetail._id;
      const watcherId = getUserIdFromToken();
      const response = await subscribeWatcher(habitId, watcherId);

      dispatch(
        isModal
          ? updateNotificationWatcherList(response)
          : updateWatcherList(response),
      );
    } catch (error) {
      setSubscriptionError('구독할 수 없습니다.');
    }
  };

  const handleUnsubscribe = async () => {
    try {
      setSubscriptionError(null);
      const habitId = habitDetail._id;
      const watcherId = getUserIdFromToken();
      const response = await unsubscribeWatcher(habitId, watcherId);

      dispatch(
        isModal
          ? unSubscribeNotificationWatcherList(response)
          : unSubscribeWatcherList(response),
      );
    } catch (error) {
      setSubscriptionError('구독을 해제할 수 없습니다.');
    }
  };

  return (
    <div className='bg-main-bg p-4 rounded-lg text-left'>
      <span className='font-bold'>Watchers</span>
      {isGroupShared ? (
        <div>
          {hasNoWatchers && isCurrentUserCreator ? (
            <p className='text-center mb-4 text-dark-gray-txt'>
              내 습관을 구독한 <br />
              Watcher가 없습니다
            </p>
          ) : (
            <div className='flex flex-wrap justify-center'>
              {shouldRenderButtons &&
                !isCurrentUserWatcher &&
                !isCurrentUserCreator && (
                  <div className='m-2'>
                    <WatcherButton
                      isSubscribe={true}
                      handleAction={handleSubscribe}
                      className='w-12 h-12'
                    />
                  </div>
                )}
              <WatcherList
                sortedApprovals={sortedApprovals}
                currentUserId={currentUserId}
                handleUnsubscribe={handleUnsubscribe}
                shouldRenderButtons={shouldRenderButtons}
              />
            </div>
          )}
        </div>
      ) : (
        <p className='text-center mb-4 text-dark-gray-txt'>
          비공개 습관이므로
          <br />
          Watcher가 없습니다
        </p>
      )}
      {!shouldRenderButtons && isGroupShared && (
        <p className='text-center mb-4 text-dark-gray-txt'>
          인증/승인 탭을 확인하세요
        </p>
      )}
      {subscriptionError && <ErrorMessage message={subscriptionError} />}
    </div>
  );
};

export default WatcherActions;
