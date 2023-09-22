import ApprovalBox from './ApprovalBox';
import isLoginUser from '../../../lib/isLoginUser';
import PreVerificationIcon from './icon/PreVerification';
import { useSelector } from 'react-redux';

const STATUS_MESSAGES = {
  notTimeYet: {
    creator: '습관이 시작 전입니다.',
    member: '습관이 시작 전입니다.',
  },
  inProgress: {
    creator: '습관이 진행 중입니다.',
    member: '습관이 진행 중입니다.',
  },
  awaitingVerification: {
    creator: '제한시간 이내에 사진을 업로드 해주세요!',
    member: '인증 전입니다.',
  },
  awaitingApproval: {
    creator: '인증이 완료되어 승인 대기중입니다.',
    member: '인증이 완료되어 승인 대기중입니다.',
  },
  approvalSuccess: {
    creator: '습관 완료 성공! 수고하셨습니다.',
    member: '습관 완료 성공!',
  },
  expiredFailure: {
    creator: '인증 시간이 만료되어 실패하였습니다.',
    member: '인증 시간이 만료되어 실패하였습니다.',
  },
  approvalFailure: {
    creator: '승인 미달로 실패하였습니다.',
    member: '승인 미달로 실패하였습니다.',
  },
};

const HabitVerification = ({ isModal = false }) => {
  const selectConditon = isModal
    ? (state) => state.notificationHabit.notificationHabitDetail
    : (state) => state.habit.habitDetail;
  const habitDetail = useSelector(selectConditon);

  const isCreator = isLoginUser(habitDetail?.creator?._id || undefined);
  const userType = isCreator ? 'creator' : 'member';
  const status = habitDetail?.status || undefined;
  const statusMessage = STATUS_MESSAGES[status]?.[userType] || '';

  const isPreVerification = ['inProgress', 'notTimeYet'].includes(status);

  return (
    <div className='w-[560px] h-[330px] mx-auto bg-main-bg rounded-xl pt-2 pb-10'>
      <p className='font-semibold'>{statusMessage}</p>
      <div className='flex mt-4 h-[280px]'>
        {isPreVerification ? (
          <PreVerificationIcon />
        ) : (
          <ApprovalBox isModal={isModal} />
        )}
      </div>
    </div>
  );
};

export default HabitVerification;
