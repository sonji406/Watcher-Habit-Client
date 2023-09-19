const TitleAndAuthorInfo = ({ title, groupName, creator }) => {
  return (
    <>
      <h1 className='text-3xl text-center font-bold flex-1'>{title}</h1>
      <div className='mb-4 mr-8 font-bold text-right'>
        <p>{groupName ? groupName : '비공개'}</p>
        <p>{creator.nickname}</p>
      </div>
    </>
  );
};

export default TitleAndAuthorInfo;
