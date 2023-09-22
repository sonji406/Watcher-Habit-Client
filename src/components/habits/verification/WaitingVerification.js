import { useSelector } from 'react-redux';
import isLoginUser from '../../../lib/isLoginUser';
import UploadImage from './UploadImage';
import PreVerificationIcon from './icon/PreVerification';

const WaitingVerification = ({ isModal = false }) => {
  const selectConditon = isModal
    ? (state) => state.notificationHabit.notificationHabitDetail
    : (state) => state.habit.habitDetail;
  const habitDetail = useSelector(selectConditon);
  const isCreator = isLoginUser(habitDetail.creator._id || undefined);

  return (
    <>
      {isCreator ? (
        <UploadImage
          habitId={habitDetail._id}
          endTime={habitDetail.endTime}
          isModal={isModal}
        />
      ) : (
        <PreVerificationIcon />
      )}
    </>
  );
};

export default WaitingVerification;
