import React from 'react';

const Loading = () => (
  <section className='fixed top-0 left-0 w-full h-full flex items-center justify-center'>
    <div className='w-16 h-16 border-t-4 border-b-4 border-white rounded-full animate-spin'></div>
  </section>
);

export default Loading;
