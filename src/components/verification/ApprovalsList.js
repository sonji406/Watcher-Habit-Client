const ApprovalsList = ({ approvals }) => {
  const approvalsMessages = {
    undecided: (
      <p className='font-bold text-[12px]'>
        인증샷이 업로드되면 확인 후<br />
        승인 또는 거절하실 수 있습니다
      </p>
    ),
    approved: (
      <p className='mb-1 font-semibold underline decoration-4 underline-offset-4 decoration-emerald-700'>
        확인했어요!
      </p>
    ),
    rejected: (
      <p className='mb-1 font-semibold underline decoration-4 underline-offset-4 decoration-red-700'>
        부족한 것 같아요..
      </p>
    ),
  };

  const approvalsMessage = approvalsMessages['approved'];

  const profileImageUrl =
    'https://lh3.googleusercontent.com/a/ACg8ocLX6SUyJF4Rg33r42HgO34BBwPJ5INmL_XWySlxDUAEyGkw=s96-c';

  return (
    <div className='w-[240px] bg-dark-blue-bg rounded-xl'>
      <div className='flex justify-center my-3'>
        <div className='relative mr-[-25px] w-[40px] h-[40px] bg-light-gray-bg rounded-full flex'>
          <img
            src={profileImageUrl}
            alt=''
            className='object-cover rounded-full'
          />
        </div>
        <div className='w-[210px] h-[43px] my-2 bg-dark-gray-bg rounded-full text-center flex items-center justify-center'>
          {approvalsMessage}
        </div>
      </div>
    </div>
  );
};

export default ApprovalsList;
