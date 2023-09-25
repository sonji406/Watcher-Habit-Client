import React, { useState } from 'react';
import validationMessages from './message/validationMessages';

const HabitInfoForm = ({
  habitTitle,
  setHabitTitle,
  habitContent,
  setHabitContent,
}) => {
  const [habitTitleValidation, setHabitTitleValidation] = useState('');
  const [habitContentValidation, setHabitContentValidation] = useState('');

  const handleHabitTitleChange = (e) => {
    setHabitTitle(e.target.value);

    if (e.target.value === '') {
      setHabitTitleValidation(validationMessages.habitTitleEmpty);
    } else if (e.target.value.length < 2 || e.target.value.length > 10) {
      setHabitTitleValidation(validationMessages.habitTitleLength);
    } else {
      setHabitTitleValidation('');
    }
  };

  const handleHabitContentChange = (e) => {
    setHabitContent(e.target.value);

    if (e.target.value === '') {
      setHabitContentValidation(validationMessages.habitContentEmpty);
    } else if (e.target.value.length < 2 || e.target.value.length > 100) {
      setHabitContentValidation(validationMessages.habitContentLength);
    } else {
      setHabitContentValidation('');
    }
  };

  return (
    <>
      <label className='text-white ml-2'>
        제목* <span className='text-red-500 ml-2'>{habitTitleValidation}</span>
      </label>
      <div className='mb-6 mt-2'>
        <input
          className='w-full p-2 border-2 border-gray-500 shadow-lg rounded bg-dark-blue-bg text-white'
          type='text'
          value={habitTitle}
          onChange={handleHabitTitleChange}
          placeholder='습관 제목을 입력하세요 (최대 10자)'
          minLength={2}
          maxLength={10}
        />
      </div>

      <label className='text-white ml-2'>
        내용*
        <span className='text-red-500 ml-2'>{habitContentValidation}</span>
      </label>
      <div className='mb-6 mt-2'>
        <textarea
          className='w-full p-2 border-2 border-gray-500 shadow-lg rounded bg-dark-blue-bg text-white'
          value={habitContent}
          onChange={handleHabitContentChange}
          placeholder='습관 내용을 입력하세요 (최대 100자)'
          minLength={2}
          maxLength={100}
        />
      </div>
    </>
  );
};

export default HabitInfoForm;
