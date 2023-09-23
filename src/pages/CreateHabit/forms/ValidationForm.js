import React from 'react';

const ValidationForm = ({ validationMessage }) => {
  return (
    <>
      {validationMessage && (
        <div className='mt-3 text-right text-red-500'>{validationMessage}</div>
      )}
    </>
  );
};

export default ValidationForm;
