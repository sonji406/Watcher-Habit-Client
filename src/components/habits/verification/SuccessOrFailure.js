import FailureIcon from './icon/Failure';
import VerificationImage from './VerificationImage';
import SuccessCriteria from './SuccessCriteria';

const SuccessOrFailure = ({ habitImage }) => {
  return (
    <div className='mx-auto text-xl font-semibold '>
      {habitImage ? (
        <div className='w-56 h-56'>
          <SuccessCriteria />
          <VerificationImage />
        </div>
      ) : (
        <>
          <FailureIcon />
          <p className='pt-4 text-4xl text-center text-customRed font-bold'>
            Failure
          </p>
        </>
      )}
    </div>
  );
};

export default SuccessOrFailure;
