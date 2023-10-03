import React from 'react';
import Loading from '../../../lib/loading/Loading';
import validationMessages from '../forms/message/validationMessages';

const SubmitButton = ({ isEdit, isLoading, handleSubmit, error }) => {
  const buttonText = isEdit ? '수정' : '생성';

  return (
    <div>
      {error && (
        <div className='text-red-500 mb-2'>{validationMessages[error]}</div>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <button
          disabled={isLoading}
          className={`mr-2 bg-green-bg border-2 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg ${
            isLoading ? 'cursor-not-allowed' : ''
          }`}
          onClick={handleSubmit}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default SubmitButton;
