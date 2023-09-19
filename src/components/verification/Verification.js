import { useSelector } from 'react-redux';
import ApprovalBox from './ApprovalBox';
import isLoginUser from '../../lib/isLoginUser';

const Verification = () => {
  const habit = useSelector((state) => state.habit.habitDetail);
  console.log('habit', habit);

  const status = habit?.status || undefined;

  const statusMessages = {
    notTimeYet: '습관이 시작 전입니다.',
    inProgress: '습관이 진행 중입니다.',
    awaitingVerification: '인증이 필요합니다. 사진을 업로드하여 인증 해주세요!',
    awaitingApproval: '인증이 완료되어 승인 대기중입니다.',
    approvalSuccess: '습관 완료 성공! 수고하셨습니다.',
    expiredFailure: '인증 시간이 만료되어 실패하였습니다.',
    approvalFailure: '승인 미달로 실패하였습니다.',
  };

  const statusApprovalMessages = {
    notTimeYet: '습관이 시작 전입니다.',
    inProgress: '습관이 진행 중입니다.',
    awaitingVerification: '인증 전입니다.',
    awaitingApproval: '인증이 완료되어 승인 대기중입니다.',
    approvalSuccess: '습관 완료 성공!',
    expiredFailure: '인증 시간이 만료되어 실패하였습니다.',
    approvalFailure: '승인 미달로 실패하였습니다.',
  };

  const loginUserIsCreator = isLoginUser(habit?.creator?._id || undefined);

  const statusMessage = loginUserIsCreator
    ? statusMessages[status]
    : statusApprovalMessages[status];

  const ispreVerification = status === 'inProgress' || status === 'notTimeYet';

  return (
    <div className='mt-12'>
      <div className='w-[450px] h-[40px] pt-2 mx-auto bg-main-bg text-center font-bold rounded-t-xl'>
        {statusMessage}
      </div>
      <div className='flex w-[550px] h-[50vh] mx-auto bg-main-bg rounded-xl custom-scrollbar'>
        <ApprovalBox
          habit={habit}
          loginUserIsCreator={loginUserIsCreator}
          ispreVerification={ispreVerification}
        />
      </div>
    </div>
  );
};

export default Verification;
