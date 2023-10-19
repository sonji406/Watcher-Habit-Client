import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUserIdFromToken from '../../utils/getUserIdFromToken';
import getUserInfoAPI from '../../services/api/user/getUser';

const Logo = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserIdFromToken();
        const userInfo = await getUserInfoAPI(userId);
        setNickname(userInfo.nickname);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchData();
  }, []);

  const handleLogoClick = () => {
    if (nickname) {
      navigate(`/my-habit/${nickname}`);
    }
  };

  return (
    <div className='absolute inset-x-0 top-0 flex justify-center'>
      <button
        onClick={handleLogoClick}
        className='relative flex justify-center items-center rounded-full w-[250px] h-[50px]'
      >
        <div className='absolute bg-black rounded-full transform w-[250px] h-[150px] top-[-100px]'></div>
        <span
          className='text-2xl z-10 text-white'
          style={{ fontFamily: 'Sinoreta' }}
        >
          WatcherHabit
        </span>
      </button>
    </div>
  );
};

export default Logo;
