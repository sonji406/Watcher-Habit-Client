const ApprovalItem = ({ status, watcher }) => {
  const profileImageUrl = watcher.userId.profileImageUrl;
  const watcherStatus = watcher.status;

  const approvalsMessages = {
    undecided: (
      <div className='pl-2'>
        <button className='bg-emerald-700 font-semibold bg-slate-200 hover:bg-emerald-200 hover:font-bold hover:text-emerald-700 p-1 rounded-lg border-2 border-solid '>
          승인해요
        </button>
        <button className='bg-red-600 font-semibold bg-slate-200 hover:bg-red-200 hover:font-bold hover:text-red-600 ml-2 p-1 rounded-lg border-2 border-solid'>
          부족해요
        </button>
      </div>
    ),
    approved: (
      <p className='mb-1 text-slate-200 font-semibold underline decoration-4 underline-offset-4 decoration-emerald-700'>
        수고하셨습니다!!
      </p>
    ),
    rejected: (
      <p className='mb-1 text-slate-200 font-semibold underline decoration-4 underline-offset-4 decoration-red-700'>
        부족한 것 같아요..
      </p>
    ),
  };

  const approvalsMessage = approvalsMessages[watcherStatus];

  return (
    <div className='flex justify-center my-3'>
      <div className='relative mr-[-25px] w-[40px] h-[40px] bg-light-gray-bg rounded-full flex'>
        <img
          src={profileImageUrl}
          alt=''
          className='object-cover rounded-full'
        />
      </div>
      <div className='w-[210px] h-[43px] my-2 bg-dark-gray-bg rounded-full text-center flex items-center justify-center'>
        {approvalsMessage ? approvalsMessage : <p>인증전</p>}
      </div>
    </div>
  );
};

export default ApprovalItem;
