import React from 'react';

const GoogleLoginButton = () => {
  const handleClick = () => {
    console.log('Google Login Button Clicked!');
  };

  return (
    <button
      onClick={handleClick}
      className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8'
    >
      Google Login
    </button>
  );
};

export default GoogleLoginButton;
