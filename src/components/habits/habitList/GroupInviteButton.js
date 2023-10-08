import { useState } from 'react';
import InviteGroupModal from '../../modals/InviteGroup';
import GroupInviteIcon from './icon/GroupInvite';

function GroupInviteButton({ groupId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section>
      <button
        className='flex hover:bg-dark-blue-bg text-white text-3xl w-10 h-10 rounded-full hover:text-green-700 absolute right-12 top-1 z-20'
        onClick={openModal}
      >
        <GroupInviteIcon />
      </button>
      {isModalOpen && (
        <InviteGroupModal groupId={groupId} onClose={closeModal} />
      )}
    </section>
  );
}

export default GroupInviteButton;
