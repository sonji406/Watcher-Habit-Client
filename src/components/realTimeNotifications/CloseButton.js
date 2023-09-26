const CloseButton = ({ onClick }) => (
  <button
    className='absolute text-sm top-0.5 right-1 bg-transparent text-slate-400 font-bold hover:text-red-500 focus:outline-none'
    onClick={onClick}
  >
    ×
  </button>
);

export default CloseButton;
