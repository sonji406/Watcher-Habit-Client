import React from 'react';

const ValidationForm = ({ validationMessage }) => {
  return (
    <>
      {validationMessage && (
        <div className='text-red-500'>{validationMessage}</div>
      )}
    </>
  );
};

export default ValidationForm;
