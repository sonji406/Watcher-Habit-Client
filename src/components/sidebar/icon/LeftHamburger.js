const LeftHamburgerIcon = () => {
  return (
    <svg
      className='w-9 h-9 text-customGray stroke-current mt-4 hover:text-customDarkGray'
      viewBox='0 0 45 45'
      fill='none'
      style={{ cursor: 'pointer' }}
    >
      <path d='M7.5 13.125H37.5' strokeWidth='3' strokeLinecap='round' />
      <path d='M8 23H28' strokeWidth='3' strokeLinecap='round' />
      <path d='M8 32H28' strokeWidth='3' strokeLinecap='round' />
    </svg>
  );
};

export default LeftHamburgerIcon;
