const TitleAndAuthorInfo = ({ title, groupName, creator }) => {
  return (
    <div className='h-[100px] mt-10 overflow-hidden'>
      <h1 className='text-3xl text-center font-bold flex-1 mt-4'>{title}</h1>
      <div className='mb-4 mr-8 font-bold text-right'>
        <p>{groupName ? groupName : '비공개'}</p>
        <p>{creator.nickname}</p>
      </div>
    </div>
  );
};

export default TitleAndAuthorInfo;
