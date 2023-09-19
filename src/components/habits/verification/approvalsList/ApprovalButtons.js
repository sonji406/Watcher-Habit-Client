const ApprovalButtons = ({ onApprove, onReject }) => (
  <div className='pl-2'>
    <button
      className='bg-emerald-700 hover:bg-emerald-200 hover:font-bold hover:text-emerald-700 p-1 rounded-lg border-2 border-solid'
      onClick={onApprove}
    >
      승인해요
    </button>
    <button
      className='bg-red-600 hover:bg-red-200 hover:font-bold hover:text-red-600 ml-2 p-1 rounded-lg border-2 border-solid'
      onClick={onReject}
    >
      부족해요
    </button>
  </div>
);

export default ApprovalButtons;
