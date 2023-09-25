import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Tabs = ({ handleViewDetail, handleViewVerfication, currentTab }) => {
  const location = useLocation();

  useEffect(() => {
    handleViewDetail();
  }, [location.pathname]);

  return (
    <div className='h-[100px] flex bg-main-dark-blue rounded-t-2xl z-0'>
      <div
        style={{
          width: '50%',
          transform:
            currentTab === 'detail' ? 'translateY(-10px)' : 'translateY(0)',
        }}
        className='bg-green-bg text-center rounded-t-2xl cursor-pointer'
        onClick={handleViewDetail}
      >
        <p className='text-2xl' style={{ transform: 'translateY(10px)' }}>
          습관 상세
        </p>
      </div>
      <div
        style={{
          width: '50%',
          transform:
            currentTab === 'verification'
              ? 'translateY(-10px)'
              : 'translateY(0)',
        }}
        className='bg-black text-center rounded-t-2xl cursor-pointer'
        onClick={handleViewVerfication}
      >
        <p className='text-2xl' style={{ transform: 'translateY(10px)' }}>
          인증/승인
        </p>
      </div>
    </div>
  );
};

export default Tabs;
