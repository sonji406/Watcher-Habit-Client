import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Tabs = ({ handleViewDetail, handleViewVerfication }) => {
  const [selectedTab, setSelectedTab] = useState('detail');
  const location = useLocation();

  useEffect(() => {
    setSelectedTab('detail');
  }, [location.pathname]);

  const handleDetailClick = () => {
    handleViewDetail();
    setSelectedTab('detail');
  };

  const handleVerificationClick = () => {
    handleViewVerfication();
    setSelectedTab('verification');
  };

  return (
    <div className='h-[100px] flex bg-main-dark-blue rounded-t-2xl z-0'>
      <div
        style={{
          width: '50%',
          transform:
            selectedTab === 'detail' ? 'translateY(-10px)' : 'translateY(0)',
        }}
        className='bg-green-bg text-center rounded-t-2xl cursor-pointer'
        onClick={handleDetailClick}
      >
        <p className='text-2xl' style={{ transform: 'translateY(10px)' }}>
          습관 상세
        </p>
      </div>
      <div
        style={{
          width: '50%',
          transform:
            selectedTab === 'verification'
              ? 'translateY(-10px)'
              : 'translateY(0)',
        }}
        className='bg-black text-center rounded-t-2xl cursor-pointer'
        onClick={handleVerificationClick}
      >
        <p className='text-2xl' style={{ transform: 'translateY(10px)' }}>
          인증/승인
        </p>
      </div>
    </div>
  );
};

export default Tabs;
