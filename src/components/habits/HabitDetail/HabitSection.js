const HabitSection = ({ title, content }) => {
  return (
    <div className='bg-main-bg p-4 rounded-lg mb-4 text-center'>
      <p className='font-bold text-left'>{title}</p>
      <p className='mb-4 text-2xl'>{content}</p>
    </div>
  );
};

export default HabitSection;
