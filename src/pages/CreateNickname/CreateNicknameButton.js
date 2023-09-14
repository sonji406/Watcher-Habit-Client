const CreateNickNameButton = ({ onClick }) => {
  return (
    <div className='bg-green-bg w-32 h-8 rounded-xl mt-6 flex items-center justify-center text-center text-white font-extrabold'>
      <button className='w-full h-full' onClick={onClick}>
        생성
      </button>
    </div>
  );
};

export default CreateNickNameButton;
