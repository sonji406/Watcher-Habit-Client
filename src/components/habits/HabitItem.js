import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setHabitDetail } from '../../redux/habitSlice';

const HabitItem = ({ habitInfo }) => {
  const dispatch = useDispatch();

  const onClickHandler = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitInfo._id}`,
      );
      dispatch(setHabitDetail(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='bg-main-bg text-white p-4 m-2 rounded-lg hover:bg-dark-green-bg transform hover:scale-95 hover: transition duration-200 ease-in-out'>
      <button className='w-full' onClick={onClickHandler}>
        <p className='text-sm text-left'>
          {habitInfo.startTime} ~ {habitInfo.endTime}
        </p>
        <p className='text-2xl'>{habitInfo.habitTitle}</p>
      </button>
    </div>
  );
};

export default HabitItem;
