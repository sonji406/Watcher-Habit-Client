import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className='ml-2 border-2 border-white text-white hover:bg-red-500 text-black font-bold py-2 px-4 rounded-lg'
      onClick={() => {
        navigate(-1);
      }}
    >
      취소
    </button>
  );
};

export default CancelButton;
