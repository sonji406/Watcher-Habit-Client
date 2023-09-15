import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className='bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded'
      onClick={() => {
        navigate(-1);
      }}
    >
      Cancel
    </button>
  );
};

export default CancelButton;
