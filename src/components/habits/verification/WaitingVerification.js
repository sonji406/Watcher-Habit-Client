import { useSelector } from 'react-redux';
import isLoginUser from '../../../lib/isLoginUser';
import UploadImage from './UploadImage';
import PreVerificationIcon from './icon/PreVerification';

const WaitingVerification = ({ uploadImageUrl }) => {
  const habit = useSelector((state) => state.habit.habitDetail);
  const isCreator = isLoginUser(habit.creator || undefined);

  return (
    <>
      {isCreator ? (
        <UploadImage
          habitId={habit._id}
          endTime={habit.endTime}
          uploadImageUrl={uploadImageUrl}
        />
      ) : (
        <PreVerificationIcon />
      )}
    </>
  );
};

export default WaitingVerification;
