import { useSelector } from 'react-redux';
import ApprovalBox from './ApprovalBox';
import isLoginUser from '../../../lib/isLoginUser';
import PreVerificationIcon from './icon/PreVerification';

const STATUS_MESSAGES = {
  notTimeYet: {
    creator: '습관이 시작 전입니다.',
    approval: '습관이 시작 전입니다.',
  },
  inProgress: {
    creator: '습관이 진행 중입니다.',
    approval: '습관이 진행 중입니다.',
  },
  awaitingVerification: {
    creator: '인증이 필요합니다. 사진을 업로드하여 인증 해주세요!',
    approval: '인증 전입니다.',
  },
  awaitingApproval: {
    creator: '인증이 완료되어 승인 대기중입니다.',
    approval: '인증이 완료되어 승인 대기중입니다.',
  },
  approvalSuccess: {
    creator: '습관 완료 성공! 수고하셨습니다.',
    approval: '습관 완료 성공!',
  },
  expiredFailure: {
    creator: '인증 시간이 만료되어 실패하였습니다.',
    approval: '인증 시간이 만료되어 실패하였습니다.',
  },
  approvalFailure: {
    creator: '승인 미달로 실패하였습니다.',
    approval: '승인 미달로 실패하였습니다.',
  },
};

const Verification = () => {
  const habit = useSelector((state) => state.habit.habitDetail);

  const status = habit?.status || undefined;
  const isCreator = isLoginUser(habit?.creator?._id || undefined);

  const userType = isCreator ? 'creator' : 'approval';
  const statusMessage = STATUS_MESSAGES[status]?.[userType] || '';

  const isPreVerification = ['inProgress', 'notTimeYet'].includes(status);

  return (
    <div className='flex'>
      <div className='flex mx-auto w-[550px] h-[50vh] bg-main-bg rounded-xl'>
        <div className='mx-auto mt-6'>
          <p>{statusMessage}</p>
          {isPreVerification ? (
            <PreVerificationIcon />
          ) : (
            <ApprovalBox
              habit={habit}
              loginUserIsCreator={isCreator}
              isPreVerification={isPreVerification}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Verification;
