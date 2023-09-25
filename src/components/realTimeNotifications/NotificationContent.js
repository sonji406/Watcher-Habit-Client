const NotificationContent = ({ content }) => {
  const parts = content.split('.').filter((part) => part.trim() !== '');

  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part.trim()}
          {index === 0 && '.'}
          <br />
        </span>
      ))}
    </>
  );
};

export default NotificationContent;
