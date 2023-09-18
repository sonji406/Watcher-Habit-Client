const WatcherButton = ({ isSubscribe, handleAction, className }) => {
  return (
    <button
      className={`rounded-full border border-gray-300 text-3xl ${className} ${
        isSubscribe ? 'bg-green-500' : 'bg-red-500'
      } flex items-center justify-center`}
      onClick={handleAction}
    >
      {isSubscribe ? '+' : '-'}
    </button>
  );
};

export default WatcherButton;
