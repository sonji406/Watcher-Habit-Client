import React, { useState, useEffect } from 'react';
import initEventSource from '../../utils/initEventSource';
import getButtonText from '../../lib/notification/getButtonText';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setNotificationHabitDetail } from '../../redux/notificationHabitSlice';
import getUserIdFromToken from '../../utils/getUserIdFromToken';
import VerifyHabitModal from '../modals/VerifyHabit';

const Notification = () => {
  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hiddenNotifications, setHiddenNotifications] = useState(new Set());
  const [error, setError] = useState(null);

  const userId = getUserIdFromToken();
  const status = 'success';
  const groupId = '';
  const habitId = '';

  const handleInvite = async () => {
    try {
      const body = { userId };

      await axios.patch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/group/${groupId}/members`,
        body,
      );
    } catch (error) {
      console.error(error);
    }
  };

  const openHabitVerificationModal = () => {
    setIsModalOpen(true);
  };

  const getButtonHandler = (status) => {
    const buttonHandlerMap = {
      success: openHabitVerificationModal,
      failure: openHabitVerificationModal,
      verificationRequest: openHabitVerificationModal,
      approveRequest: openHabitVerificationModal,
      invite: handleInvite,
    };
    return buttonHandlerMap[status];
  };

  useEffect(() => {
    const onMessage = (event) => {
      const messageData = JSON.parse(event.data);

      const { content, from, to, status, groupId, _id } = messageData;
      const message = {
        id: _id,
        text: content,
        isVisible: true,
        status,
        groupId,
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

  const renderButton = () => {
    const buttonText = getButtonText(status);
    return (
      <div className='flex'>
        <button className='mx-auto bg-green-400 p-1 mt-2 rounded-lg hover:bg-green-500 hover:font-semibold'>
          {buttonText}
        </button>
      </div>
    );
  };

  const hideNotification = (id) => {
    setHiddenNotifications((prev) => new Set(prev).add(id));
  };

  const handleOnClick = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId}`,
      );

      response.data.approvals = response.data.approvals.map((approval) => ({
        ...approval._id,
        status: approval.status,
        profileImageUrl: approval._id.profileImageUrl,
      }));

      dispatch(setNotificationHabitDetail(response.data));
    } catch (error) {
      console.error(error);
    }
    hideNotification();
    await getButtonHandler(status)();
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='mr-4'>
      {isModalOpen && <VerifyHabitModal onClose={onClose} />}
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
          <button
            onClick={() => handleOnClick(message.status, message.groupId)}
          >
            {renderButton()}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
