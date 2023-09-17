import { useSelector } from 'react-redux';
import ApprovalsList from './ApprovalsList';
import UploadImage from './UploadImage';

const Verification = () => {
  // const habit = useSelector((state) => state.habit.habitDetail);

  const habit = {
    _id: '6505d5fa09b439bd7e225cb8',
    habitTitle: 'Morning Run',
    habitContent: 'Run 5km every morning.',
    habitStartDate: '2023-09-01',
    habitEndDate: '2023-09-30',
    doDay: 'mon',
    startTime: '06:00',
    endTime: '13:46',
    penalty: 'Missed run = Donate $10',
    creator: {
      _id: '6503f18912b32c5a11945425',
      nickname: 'xhrrl003',
    },
    sharedGroup: '6503cc62c7ffdf4851bb27d7',
    habitImage: '',
    // 'https://watcher-habit.s3.ap-northeast-2.amazonaws.com/1694809849024-KakaoTalk_Photo_2023-08-29-16-13-54-3.jpeg',
    minApprovalCount: 2,
    approvals: [
      {
        userId: {
          _id: '6503cd53c7ffdf4851bb27d9',
          profileImageUrl:
            'https://lh3.googleusercontent.com/a/ACg8ocLX6SUyJF4Rg33r42HgO34BBwPJ5INmL_XWySlxDUAEyGkw=s96-c',
        },
        status: 'undecided',
      },
      {
        userId: {
          _id: '65040785e0f213a1de54a184',
          profileImageUrl:
            'https://lh3.googleusercontent.com/a/ACg8ocLfLpyhOwcQcbCFtEDCYAEOMnoSdGZD2eQF3UHDCU456tg=s96-c',
        },
        status: 'approved',
      },
      {
        userId: {
          _id: '6503f1898834dd2d0726fb63',
          profileImageUrl:
            'https://lh3.googleusercontent.com/a/ACg8ocIVfvshvLgaDn6HoKsLXVQ62HogKTZSAzxdJPSH5v6t=s96-c',
        },
        status: 'rejected',
      },
    ],
    notifications: [],
    status: 'awaitingVerification',
  };

  const statusMessages = {
    awaitingVerification: '인증이 필요합니다. 사진을 업로드하여 인증 해주세요!',
    awaitingApproval: '인증이 완료되어 승인 대기중입니다.',
    approvalSuccess: '습관 완료 성공! 수고하셨습니다.',
    expiredFailure: '인증 시간이 만료되어 실패하였습니다.',
    apapprovalFailuref: '승인 미달로 실패하였습니다.',
  };

  const status = habit.status;
  const statusMessage = statusMessages[status];
  const approvals = habit.approvals;
  const habitImage = habit.habitImage;
  const creator = habit.creator;
  const endTime = habit.endTime;

  return (
    <div className='mt-12'>
      <div className='w-[450px] h-[40px] pt-2 mx-auto bg-main-bg text-center rounded-t-xl'>
        {statusMessage}
      </div>
      <div className='flex w-[550px] h-[50vh] mx-auto bg-main-bg rounded-xl custom-scrollbar'>
        <div className='grid grid-cols-2 gap-x-4 mx-auto pt-4 h-[320px]'>
          <UploadImage
            habitImage={habitImage}
            status={status}
            creator={creator}
            endTime={endTime}
          />
          <ApprovalsList status={status} approvals={approvals} />
        </div>
      </div>
    </div>
  );
};

export default Verification;
