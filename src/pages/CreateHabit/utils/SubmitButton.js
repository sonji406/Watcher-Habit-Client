import React from 'react';

const SubmitButton = ({ isEdit, isLoading, handleSubmit }) => {
  const buttonText = isEdit ? 'Edit' : 'Create';

  return (
    <button
      disabled={isLoading}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
        isLoading ? 'cursor-not-allowed' : ''
      }`}
      onClick={handleSubmit}
    >
      {isLoading ? 'Loading...' : buttonText}
    </button>
  );
};

export default SubmitButton;
