const ProfileImage = ({ src }) => (
  <div className='relative mr-[-25px] w-[40px] h-[40px] bg-light-gray-bg rounded-full flex'>
    <img src={src} alt='' className='object-cover rounded-full p-0.5' />
  </div>
);

export default ProfileImage;
