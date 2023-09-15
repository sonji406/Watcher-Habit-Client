import React from 'react';

const Tooltip = ({ text }) => (
  <span
    className='absolute invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity p-4 rounded border text-sm'
    style={{
      left: '100%',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 10,
      minWidth: '300px',
      backgroundColor: '#f2f2f2',
    }}
  >
    {text}
  </span>
);

export default Tooltip;
