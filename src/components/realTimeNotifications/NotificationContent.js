const NotificationContent = ({ content }) => (
  <>
    {content.split('.').map((part, index) => (
      <span key={index}>
        {part}
        <br />
      </span>
    ))}
  </>
);

export default NotificationContent;
