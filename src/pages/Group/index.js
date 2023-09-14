import React from 'react';
import Header from '../../components/common/Header';

const Group = () => {
  return (
    <div
      className='min-h-screen flex flex-col bg-main-bg text-white bg-vignette'
      style={{ fontFamily: 'NotoSansKR' }}
    >
      <Header />
      Group 페이지
    </div>
  );
};

export default Group;
