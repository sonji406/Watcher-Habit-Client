import React from 'react';
import Carousel from './Carousel';
import MainLogo from './MainLogo';
import SubTitle from './SubTitle';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import GoogleLoginButton from '../../components/common/GoogleLoginButton';

function HomePage() {
  useDocumentTitle('WatcherHabit 홈페이지');

  return (
    <div
      className='min-h-screen flex flex-col items-center justify-center bg-main-bg text-white p-20 space-y-6 bg-vignette'
      style={{ fontFamily: 'NotoSansKR' }}
    >
      <MainLogo />
      <div className='mb-4'>
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
