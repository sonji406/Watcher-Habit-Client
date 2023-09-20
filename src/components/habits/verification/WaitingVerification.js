import { useSelector } from 'react-redux';
import isLoginUser from '../../../lib/isLoginUser';
import UploadImage from './UploadImage';
import PreVerificationIcon from './icon/PreVerification';

const WaitingVerification = () => {
  const habitDetail = useSelector((state) => state.habit.habitDetail);
  const isCreator = isLoginUser(habitDetail.creator._id || undefined);

  return (
    <>
      {isCreator ? (
        <UploadImage habitId={habitDetail._id} endTime={habitDetail.endTime} />
      ) : (
        <PreVerificationIcon />
      )}
    </>
  );
};

export default WaitingVerification;
