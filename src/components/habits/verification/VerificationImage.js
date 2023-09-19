import { useSelector } from 'react-redux';
import VerificationIcon from './icon/Verification';

const VerificationImage = ({ habitImage }) => {
  const habit = useSelector((state) => state.habit.habitDetail);
  const imageUrl = habit.habitImage ? habit.habitImage : habitImage;

  return (
    <div className='w-full h-full rounded-xl mx-auto flex items-center justify-center'>
      <img
        src={imageUrl}
        alt=''
        className='relative w-full h-full mx-auto absolute object-cover rounded-xl p-1'
      />
      {habit.status === 'approvalSuccess' && <VerificationIcon />}
    </div>
  );
};

export default VerificationImage;
