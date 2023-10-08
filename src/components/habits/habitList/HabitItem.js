import { useDispatch } from 'react-redux';
import { setHabitDetail } from '../../../redux/habitSlice';
import api from '../../../lib/api';

const HabitItem = ({ habitInfo, isSelected, onSelect }) => {
  const dispatch = useDispatch();

  const onClickHandler = async () => {
    try {
      onSelect();
      const response = await api.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitInfo._id}`,
        { withCredentials: true },
      );

      response.data.approvals = response.data.approvals.map((approval) => ({
        ...approval._id,
        status: approval.status,
        profileImageUrl: approval._id.profileImageUrl,
      }));

      dispatch(setHabitDetail(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`bg-main-bg text-white p-4 m-2 rounded-lg hover:bg-dark-green-bg transform hover:scale-95 transition duration-200 ease-in-out ${
        isSelected ? 'shadow-green' : ''
      }`}
    >
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
