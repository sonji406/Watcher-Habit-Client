import VerificationIcon from '../icon/Verification';

const VerificationImage = ({ habitImage, status }) => {
  return (
    <div className='relative w-[220px] h-[280px] mx-auto mt-3'>
      <img
        src={habitImage}
        alt=''
        className='absolute w-full h-full object-cover rounded-xl bg-white p-1'
      />
      {status === 'approvalSuccess' && <VerificationIcon />}
    </div>
  );
};

export default VerificationImage;
