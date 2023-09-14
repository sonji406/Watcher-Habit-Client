import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/my-habit/:nickname')}
      className='relative flex justify-center items-center rounded-full'
      style={{ width: '250px', height: '50px' }}
    >
      <div
        className='absolute bg-black rounded-full transform'
        style={{ width: '250px', height: '150px', top: '-100px' }}
      ></div>
      <span
        className='text-2xl z-10 text-white'
        style={{ fontFamily: 'Sinoreta' }}
      >
        WatcherHabit
      </span>
    </button>
  );
};

export default Logo;
