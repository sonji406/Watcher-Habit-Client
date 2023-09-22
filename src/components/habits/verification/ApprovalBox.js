import { useSelector } from 'react-redux';
import SuccessOrFailure from './SuccessOrFailure';
import VerificationImage from './VerificationImage';
import WaitingVerification from './WaitingVerification';
import ApprovalsList from './approvalsList/ApprovalsList';

const ApprovalBox = ({ isModal = false }) => {
  const selectConditon = isModal
    ? (state) => state.notificationHabit.notificationHabitDetail
    : (state) => state.habit.habitDetail;
  const habitDetail = useSelector(selectConditon);
  const status = habitDetail.status;

  const isWaitingVerification = status === 'awaitingVerification';
  const isSuccess = status === 'approvalSuccess';
  const isFailure = status === 'approvalFailure' || status === 'expiredFailure';

  return (
    <div className='mx-auto'>
      {isSuccess || isFailure ? (
        <SuccessOrFailure
          habitImage={habitDetail.habitImage}
          isModal={isModal}
        />
      ) : (
        <div className='flex h-full'>
          {isWaitingVerification ? (
            <WaitingVerification isModal={isModal} />
          ) : (
            <div className='grid grid-cols-2 gap-x-1 mx-auto font-semibold text-center '>
              <VerificationImage isModal={isModal} />
              <ApprovalsList isModal={isModal} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ApprovalBox;
