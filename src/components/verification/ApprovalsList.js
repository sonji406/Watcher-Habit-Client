import getUserIdFromToken from '../../utils/getUserIdFromToken';
import ApprovalItem from './ApprovalItem';

const ApprovalsList = ({ status, approvals }) => {
  // const loginId = getUserIdFromToken();
  const loginId = '6503cd53c7ffdf4851bb27d9';
  const myApproval = approvals.filter((item) => item.userId._id === loginId)[0];

  const updatedApprovals = approvals.filter((item) => item !== myApproval);

  return (
    <div className='w-[240px] bg-dark-blue-bg rounded-xl overflow-y-auto max-h-full transparent-scrollbar'>
      {<ApprovalItem status={status} watcher={myApproval} />}
      {updatedApprovals.map((watcher) => {
        return <ApprovalItem status={status} watcher={watcher} />;
      })}
    </div>
  );
};

export default ApprovalsList;
