import { useState } from 'react';
import InviteGroupModal from '../../modals/InviteGroup';

function GroupInviteButton({ groupId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className='bg-dark-blue-bg text-white text-3xl w-10 h-10 rounded-full hover:bg-green-700 absolute right-8 top-1 z-20'
        onClick={openModal}
      >
        +
      </button>
      {isModalOpen && (
        <InviteGroupModal groupId={groupId} onClose={closeModal} />
      )}
    </div>
  );
}

export default GroupInviteButton;
