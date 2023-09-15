import React from 'react';

const SubmitButton = ({ isEdit, handleSubmit }) => {
  const buttonText = isEdit ? 'Edit' : 'Create';

  return (
    <button
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      onClick={handleSubmit}
    >
      {buttonText}
    </button>
  );
};

export default SubmitButton;
