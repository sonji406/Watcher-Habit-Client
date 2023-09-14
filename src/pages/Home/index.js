import React from 'react';
import Carousel from './Carousel';
import Logo from './Logo';
import SubTitle from './SubTitle';
import GoogleLoginButton from '../../components/Common/GoogleLoginButton';

function HomePage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-main-bg text-white p-20 space-y-6 bg-vignette'>
      <Logo />
      <div>
        <SubTitle />
      </div>
      <div>
        <Carousel />
      </div>
      <div className='pt-8'>
        <GoogleLoginButton />
      </div>
    </div>
  );
}

export default HomePage;
