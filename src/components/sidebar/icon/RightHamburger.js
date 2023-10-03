const RightHamburgerIcon = () => {
  return (
    <svg
      className='w-9 h-9 text-customGray stroke-current mt-4 hover:text-customDarkGray'
      viewBox='0 0 45 45'
      fill='none'
      style={{ cursor: 'pointer' }}
    >
      <path d='M37.5 13.125H7.5' strokeWidth='3' strokeLinecap='round' />
      <path d='M37 23H17' strokeWidth='3' strokeLinecap='round' />
      <path d='M37 32H17' strokeWidth='3' strokeLinecap='round' />
    </svg>
  );
};

export default RightHamburgerIcon;
