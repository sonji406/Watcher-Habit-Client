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
    <div
      className='flex items-center text-customGray hover:text-customDarkGray hover:font-bold mb-10 p-3 duration-500 ease-in-out '
      style={{ cursor: 'pointer' }}
    >
      <CreateGroupIcon />
      {isHovered && (
        <span className='ml-2' onClick={openModal}>
          새로운 그룹 생성하기
        </span>
      )}
      {isModalOpen && <CreateGroupModal onClose={closeModal} />}
    </div>
  );
};

export default CreateGroupButton;
