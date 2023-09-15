import React from 'react';
import Header from '../../components/common/Header';

const CreateHabit = () => {
  return (
    <div
      className='min-h-screen flex flex-col bg-main-bg text-white bg-vignette'
      style={{ fontFamily: 'NotoSansKR' }}
    >
      <Header />
      생성/수정 페이지
    </div>
  );
};

export default CreateHabit;
