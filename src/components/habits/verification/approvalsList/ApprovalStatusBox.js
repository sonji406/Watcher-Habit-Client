const ApprovalStatusBox = ({ status, error, message }) => (
  <div className='w-[210px] h-[43px] my-2 bg-neutral-500 rounded-full font-bold text-center flex items-center justify-center'>
    {status === 'awaitingVerification' ? (
      <p className='text-xs tracking-tight'>
        인증샷이 업로드되면 확인 후 <br />
        승인 또는 거절하실 수 있습니다
      </p>
    ) : error ? (
      <p className='text-xs'>{error}</p>
    ) : (
      message
    )}
  </div>
);

export default ApprovalStatusBox;
