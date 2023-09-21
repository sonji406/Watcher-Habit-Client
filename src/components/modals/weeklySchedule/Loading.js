import React from 'react';

const Loading = () => (
  <section className='items-center justify-center'>
    <div className='ml-4 text-white'>주간 계획표를 불러오는 중</div>
    <div className='w-16 h-16 border-t-4 border-b-4 border-white rounded-full animate-spin'></div>
  </section>
);

export default Loading;
