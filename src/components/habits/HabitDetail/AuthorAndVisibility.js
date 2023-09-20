const AuthorAndVisibility = ({ creator, sharedGroup }) => {
  return (
    <div className='mb-4 mr-8 font-bold text-right'>
      <p>{sharedGroup ? <>{sharedGroup.groupName}</> : '비공개'}</p>
      <p>{creator.nickname}</p>
    </div>
  );
};

export default AuthorAndVisibility;
