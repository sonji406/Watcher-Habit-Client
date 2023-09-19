import ImageBox from './VerificationImage/ImageBox';
import ApprovalsList from './VerificationList/ApprovalsList';

const ApprovalBox = ({ habit, loginUserIsCreator, isPreVerification }) => {
  const status = habit.status;
  const approvals = habit.approvals;

  const isFailure = status === 'approvalFailure' || status === 'expiredFailure';

  return (
    <div className='grid grid-cols-2 gap-x-4 mx-auto pt-4 h-[320px]'>
      {Object.keys(habit).length !== 0 && (
        <>
          <ImageBox
            habit={habit}
            loginUserIsCreator={loginUserIsCreator}
            ispreVerification={isPreVerification}
            isFailure={isFailure}
          />
          <ApprovalsList status={status} approvals={approvals} />
        </>
      )}
    </div>
  );
};

export default ApprovalBox;
