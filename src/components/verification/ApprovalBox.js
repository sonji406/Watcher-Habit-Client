import ImageBox from './VerificationImage/ImageBox';
import ApprovalsList from './VerificationList/ApprovalsList';

const ApprovalBox = ({ habit, loginUserIsCreator, ispreVerification }) => {
  const status = habit.status;
  const approvals = habit.approvals;

  const isFailure = status === 'approvalFailure' || status === 'expiredFailure';
  const isOneColumnGrid = ispreVerification || isFailure;

  return (
    <div
      className={`grid ${
        isOneColumnGrid ? 'grid-cols-1' : 'grid-cols-2'
      } gap-x-4 mx-auto pt-4 h-[320px]`}
    >
      {Object.keys(habit).length !== 0 && (
        <>
          <ImageBox
            habit={habit}
            loginUserIsCreator={loginUserIsCreator}
            ispreVerification={ispreVerification}
            isFailure={isFailure}
          />
          {!isOneColumnGrid && (
            <ApprovalsList status={status} approvals={approvals} />
          )}
        </>
      )}
    </div>
  );
};

export default ApprovalBox;
