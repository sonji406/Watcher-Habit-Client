const UploadImage = ({ imageUrl, status }) => {
  return (
    <div className='w-[240px] bg-dark-blue-bg rounded-xl flex justify-center items-center'>
      <img
        src={imageUrl}
        alt=''
        className='w-[220px] h-[280px] object-cover rounded-xl'
      />
    </div>
  );
};

export default UploadImage;
