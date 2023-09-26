import { useState } from 'react';
import CreateGroupModal from '../modals/CreateGroup';
import CreateGroupIcon from './icon/CreateGroup';

const CreateGroupButton = ({ isHovered }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className='flex items-center text-customGray hover:text-customDarkGray hover:font-bold p-3 mb-10'
        style={{ cursor: 'pointer' }}
      >
        <CreateGroupIcon isHovered={isHovered} />
        {isHovered && <span onClick={openModal}>새로운 그룹 생성하기</span>}
      </div>
      {isModalOpen && <CreateGroupModal onClose={closeModal} />}
    </>
  );
};

export default CreateGroupButton;
