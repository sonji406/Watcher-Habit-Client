import { useState } from 'react';
import CreateGroupModal from '../modals/CreateGroup';
import CreateGroupIcon from './icon/CreateGroup';

const CreateGroupButton = ({ isHovered }) => {
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
        className={`flex items-center text-customGray hover:text-customDarkGray hover:font-bold mb-10 p-3 ${
          isHovered ? 'w-[210px]' : ''
        }`}
        style={{ cursor: 'pointer' }}
      >
        <CreateGroupIcon isHovered={isHovered} />
        {isHovered && <span>새로운 그룹 생성하기</span>}
      </div>
      {isModalOpen && <CreateGroupModal onClose={handleCloseModal} />}
    </>
  );
};

export default CreateGroupButton;
