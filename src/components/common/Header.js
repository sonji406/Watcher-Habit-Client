import React from 'react';
import Logo from './Logo';
import Profile from './Profile';

const Header = () => {
  return (
    <header className='fixed top-0 left-0 right-0 flex justify-between items-center p-4 z-10'>
      <Logo />
      <Profile />
    </header>
  );
};

export default Header;
