import React, { useState, useEffect } from 'react';
import initEventSource from '../../utils/initEventSource';

const Notification = () => {
  const [messages, setMessages] = useState([
    {
      id: 1632401012345, // 예시 타임스탬프
      text: '첫 번째 알림 메시지입니다.',
      text2: '알림을 확인하세요.',
      isVisible: true,
    },
    {
      id: 1632401023456, // 예시 타임스탬프
      text: '두 번째 알림 메시지입니다.',
      text2: '알림을 확인하세요.',
      isVisible: true,
    },
    {
      id: 1632401012345, // 예시 타임스탬프
      text: '첫 번째 알림 메시지입니다.',
      text2: '알림을 확인하세요.',
      isVisible: true,
    },
    {
      id: 1632401023456, // 예시 타임스탬프
      text: '두 번째 알림 메시지입니다.',
      text2: '알림을 확인하세요.',
      isVisible: true,
    },
    {
      id: 1632401012345, // 예시 타임스탬프
      text: '첫 번째 알림 메시지입니다.',
      text2: '알림을 확인하세요.',
      isVisible: true,
    },
    {
      id: 1632401023456, // 예시 타임스탬프
      text: '두 번째 알림 메시지입니다.',
      text2: '알림을 확인하세요.',
      isVisible: true,
    },
  ]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const onMessage = (messageText) => {
      const message = {
        id: Date.now(),
        text: messageText,
        isVisible: true,
      };

      setMessages((prevMessages) => [...prevMessages, message]);

      setTimeout(() => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === message.id ? { ...msg, isVisible: false } : msg,
          ),
        );
      }, 5000);
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
    <div className='mr-4'>
      {error && <div>Error: {error.message}</div>}
      {messages.map((message) => (
        <div
          className={`py-2 px-3 bg-white text-sm border-green-400 mb-2 border-solid border-2 rounded-lg opacity-80 ${
            !message.isVisible ? 'animate-slideOutLeft' : ''
          }`}
          key={message.id}
        >
          {message.text}
          <br />
          {message.text2}
        </div>
      ))}
    </div>
  );
};

export default Notification;
