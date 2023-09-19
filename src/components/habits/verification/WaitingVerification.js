import isLoginUser from '../../../lib/isLoginUser';
import UploadImage from './UploadImage';
import PreVerificationIcon from './icon/PreVerification';

const WaitingVerification = ({ creator, habitId, endTime, uploadImageUrl }) => {
  const isCreator = isLoginUser(creator || undefined);

  return (
    <>
      {isCreator ? (
        <UploadImage
          habitId={habitId}
          endTime={endTime}
          uploadImageUrl={uploadImageUrl}
        />
      ) : (
        <PreVerificationIcon />
      )}
    </>
  );
};

export default WaitingVerification;
