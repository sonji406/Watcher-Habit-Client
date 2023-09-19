import getUserIdFromToken from '../../../utils/getUserIdFromToken';
import ApprovalItem from './ApprovalItem';

const ApprovalsList = ({ status, approvals }) => {
  const loginId = getUserIdFromToken();

  console.log('approvals', approvals);

  const myApproval = approvals?.filter((item) => item._id === loginId)[0];
  const updatedApprovals = approvals?.filter((item) => item !== myApproval);

  return (
    <div className='w-[240px] bg-dark-blue-bg rounded-xl overflow-y-auto max-h-full transparent-scrollbar'>
      {myApproval && <ApprovalItem status={status} watcher={myApproval} />}
      {updatedApprovals &&
        updatedApprovals.map((watcher) => {
          return <ApprovalItem status={status} watcher={watcher} />;
        })}
      {!myApproval && !updatedApprovals && (
        <p className='text-center m-3'>Watcher가 없습니다.</p>
      )}
    </div>
  );
};

export default ApprovalsList;
