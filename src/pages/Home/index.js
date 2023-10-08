import React from 'react';
import Carousel from './Carousel';
import MainLogo from './MainLogo';
import SubTitle from './SubTitle';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import GoogleLoginButton from '../../components/common/GoogleLoginButton';

function HomePage() {
  useDocumentTitle('WatcherHabit 홈페이지');

  return (
    <main
      className='min-h-screen flex flex-col items-center justify-center bg-main-bg text-white p-20 space-y-6 bg-vignette'
      style={{ fontFamily: 'NotoSansKR' }}
    >
      <h1>
        <MainLogo />
      </h1>
      <section className='mb-4'>
        <SubTitle />
      </section>
      <section>
        <Carousel />
      </section>
      <footer className='pt-8'>
        <GoogleLoginButton />
      </footer>
    </main>
  );
}

export default HomePage;
