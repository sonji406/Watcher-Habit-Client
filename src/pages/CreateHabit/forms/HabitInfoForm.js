import React from 'react';

const HabitInfoForm = ({
  habitTitle,
  setHabitTitle,
  habitContent,
  setHabitContent,
}) => {
  const handleHabitTitleChange = (e) => {
    setHabitTitle(e.target.value);
  };

  const handleHabitContentChange = (e) => {
    setHabitContent(e.target.value);
  };

  return (
    <>
      <label>습관 제목</label>
      <div className='mb-4'>
        <input
          className='w-full p-2 border rounded'
          type='text'
          value={habitTitle}
          onChange={handleHabitTitleChange}
          placeholder='습관 제목을 입력하세요(최대 10자)'
          minLength={2}
          maxLength={10}
        />
      </div>

      <label>습관 내용</label>
      <div className='mb-4'>
        <textarea
          className='w-full p-2 border rounded'
          value={habitContent}
          onChange={handleHabitContentChange}
          placeholder='습관 내용을 입력하세요(최대 100자)'
          minLength={2}
          maxLength={100}
        />
      </div>
    </>
  );
};

export default HabitInfoForm;
