const getStatusMessage = (status) => {
  switch (status) {
    case 'approvalSuccess':
      return (
        <>
          성공!
          <span role='img' aria-label='축하 이모티콘' className='ml-2'>
            🎉
          </span>
        </>
      );
    case 'expiredFailure':
      return (
        <>
          기한 내에 인증 사진을 업로드하지 않았네요
          <span role='img' aria-label='우는 이모티콘' className='ml-2'>
            😢
          </span>
        </>
      );
    case 'approvalFailure':
      return (
        <>
          최소 승인 인원을 넘지 못했어요
          <span role='img' aria-label='아쉬운 이모티콘' className='ml-2'>
            😔
          </span>
        </>
      );
    default:
      return '종료된 습관';
  }
};

export default getStatusMessage;
