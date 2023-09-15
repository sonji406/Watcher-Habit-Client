const HabitItem = ({ habitInfo }) => {
  const onClickHandler = () => {
    // 습관 조회 api 호출해서 데이터 가져오고 redux 상태관리에 저장
  };
  return (
    <div>
      <button onClick={onClickHandler}>
        <p>
          {habitInfo.startTime} ~ {habitInfo.endTime}
        </p>
        <p>{habitInfo.habitTitle}</p>
      </button>
    </div>
  );
};

export default HabitItem;
