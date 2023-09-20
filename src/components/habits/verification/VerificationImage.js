import { useSelector } from 'react-redux';
import VerificationIcon from './icon/Verification';

const VerificationImage = ({ habitImage }) => {
  const habitDetail = useSelector((state) => state.habit.habitDetail);
  const imageUrl = habitDetail.habitImage ? habitDetail.habitImage : habitImage;

  return (
    <div className='w-full h-full rounded-xl mx-auto flex items-center justify-center'>
      <img
        src={imageUrl}
        alt=''
        className='relative w-full h-full mx-auto absolute object-cover rounded-xl p-1'
      />
      {habitDetail.status === 'approvalSuccess' && <VerificationIcon />}
    </div>
  );
};

export default VerificationImage;
