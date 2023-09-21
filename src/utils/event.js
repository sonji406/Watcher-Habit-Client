import getUserIdFromToken from './getUserIdFromToken';

function initEventSource(onMessage, onError) {
  const loginUserId = getUserIdFromToken();

  const eventSource = new EventSource(
    `${process.env.REACT_APP_SERVER_DOMAIN}/events?userId=${loginUserId}`,
  );

  eventSource.onmessage = function (event) {
    const notification = JSON.parse(event.data);

    onMessage(notification.message);
  };

  eventSource.onerror = function (error) {
    console.error(error);

    eventSource.close();

    if (onError) {
      onError(error);
    }
  };

  return eventSource;
}

export default initEventSource;
