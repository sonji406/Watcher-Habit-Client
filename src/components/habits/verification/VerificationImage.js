import { useSelector } from 'react-redux';
import VerificationIcon from './icon/Verification';

const VerificationImage = ({ isModal = false }) => {
  const selectConditon = isModal
    ? (state) => state.notificationHabit.notificationHabitDetail
    : (state) => state.habit.habitDetail;
  const habitDetail = useSelector(selectConditon);

  return (
    <div className='w-full h-full rounded-xl mx-auto flex items-center justify-center'>
      <img
        src={habitDetail.habitImage}
        alt=''
        className='relative w-full h-full mx-auto absolute object-cover rounded-xl p-1'
      />
      {habitDetail.status === 'approvalSuccess' && <VerificationIcon />}
    </div>
  );
};

export default VerificationImage;
