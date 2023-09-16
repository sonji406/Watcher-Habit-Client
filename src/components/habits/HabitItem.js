const HabitItem = ({ habitInfo }) => {
  const onClickHandler = () => {
    // 습관 조회 api 호출해서 데이터 가져오고 redux 상태관리에 저장
  };

  return (
    <div className='bg-main-bg text-white p-4 m-2 rounded-lg hover:bg-dark-green-bg transform hover:scale-95 hover: transition duration-200 ease-in-out'>
      <button className='w-full' onClick={onClickHandler}>
        <p className='text-sm'>
          {habitInfo.startTime} ~ {habitInfo.endTime}
        </p>
        <p className='text-2xl'>{habitInfo.habitTitle}</p>
      </button>
    </div>
  );
};

export default HabitItem;
