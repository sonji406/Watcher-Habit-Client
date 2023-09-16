import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setHabitInfo } from '../../redux/habitSlice';

const HabitItem = ({ habitInfo }) => {
  const dispatch = useDispatch();

  const onClickHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitInfo._id}`,
      );
      dispatch(setHabitInfo(response.data));
    } catch (error) {
      console.error('습관 조회에 실패했습니다.');
    }
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
