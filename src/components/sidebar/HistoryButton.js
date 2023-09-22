import React, { useState } from 'react';
import HistoryModal from '../modals/history/HistoryModal';
import HistoryIcon from './icon/History';

const HistoryButton = ({ isHovered }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);

    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    document.body.style.overflow = '';
  };

  return (
    <>
      <div
        onClick={handleButtonClick}
        className={`flex items-center text-customGray hover:text-customDarkGray hover:font-bold mb-14 p-3 ${
          isHovered ? 'ml-2' : ''
        }${isHovered ? 'w-[210px] ' : ''}`}
        style={{ cursor: 'pointer' }}
      >
        <HistoryIcon />
        {isHovered && <span className='ml-2'>지난 습관 기록</span>}
      </div>

      {isModalOpen && <HistoryModal onClose={handleCloseModal} />}
    </>
  );
};

export default HistoryButton;
