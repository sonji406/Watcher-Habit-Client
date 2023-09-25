import getButtonText from '../../lib/notification/getButtonText';

const ActionButton = ({ status, onClick }) => (
  <button
    className='mx-auto text-white bg-green-400 py-1 px-2 font-semibold rounded-lg hover:bg-green-500'
    onClick={onClick}
  >
    {getButtonText(status)}
  </button>
);

export default ActionButton;
