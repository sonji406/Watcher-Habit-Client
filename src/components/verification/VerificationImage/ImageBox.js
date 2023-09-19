import { useEffect, useState } from 'react';
import Failure from './Failure';
import UploadImage from './UploadImage';
import PreVerification from './PreVerification';
import VerificationImage from './VerificationImage';

const ImageBox = ({
  habit,
  loginUserIsCreator,
  ispreVerification,
  isFailure,
}) => {
  const [habitImage, setHabitImage] = useState('');

  const habitId = habit._id;
  const status = habit.status;
  const endTime = habit.endTime;

  useEffect(() => {
    setHabitImage(habit.habitImage);
  }, [habit.habitImage]);

  const uploadImageUrl = (url) => {
    setHabitImage(url);
  };

  return (
    <div className='w-[240px] bg-gray-bg rounded-xl flex'>
      {ispreVerification ? (
        <PreVerification />
      ) : status === 'awaitingVerification' ? (
        loginUserIsCreator && (
          <UploadImage
            habitId={habitId}
            endTime={endTime}
            setImageUrl={uploadImageUrl}
          />
        )
      ) : habitImage ? (
        <VerificationImage habitImage={habitImage} status={status} />
      ) : isFailure ? (
        <Failure />
      ) : (
        <PreVerification />
      )}
    </div>
  );
};

export default ImageBox;
