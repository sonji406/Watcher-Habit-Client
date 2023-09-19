const Tabs = ({ handleViewDetail, handleViewVerfication }) => {
  return (
    <div className='h-[100px] flex bg-main-dark-blue rounded-t-2xl z-0'>
      <div
        style={{ width: '50%' }}
        className='bg-green-bg text-center rounded-t-2xl'
        onClick={handleViewDetail}
      >
        <p className='text-2xl' style={{ transform: 'translateY(10px)' }}>
          상세 페이지
        </p>
      </div>
      <div
        style={{ width: '50%' }}
        className='bg-black text-center rounded-t-2xl'
        onClick={handleViewVerfication}
      >
        <p className='text-2xl' style={{ transform: 'translateY(10px)' }}>
          인증 페이지
        </p>
      </div>
    </div>
  );
};

export default Tabs;
