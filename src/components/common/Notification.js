import { useEffect, useState } from 'react';
import initEventSource from '../../utils/initEventSource';

const Notification = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const onMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const onError = (err) => {
      setError(err);
    };

    const eventSource = initEventSource(onMessage, onError);

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      {error && <div>Error: {error.message}</div>}
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
};

export default Notification;
