import React from 'react';
import Logo from './Logo';
import ProfileIcon from './ProfileIcon';

const Header = () => {
  return (
    <header className='fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-10'>
      <div className='absolute inset-x-0 top-0 flex justify-center'>
        <Logo />
      </div>
      <div className='absolute top-0 right-0 flex items-center p-4'>
        <ProfileIcon />
      </div>
    </header>
  );
};

export default Header;
