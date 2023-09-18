const AuthorAndVisibility = ({ creator, sharedGroup }) => {
  return (
    <div className='mb-4 text-right'>
      작성자 {creator.nickname}
      <div>{sharedGroup ? `그룹 ${sharedGroup.groupName}` : '비공개'}</div>
    </div>
  );
};

export default AuthorAndVisibility;
