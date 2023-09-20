import { useSelector } from 'react-redux';
import getUserIdFromToken from '../../../../utils/getUserIdFromToken';
import ApprovalItem from './ApprovalItem';

const ApprovalsList = () => {
  const habitDetail = useSelector((state) => state.habit.habitDetail);
  const status = habitDetail.status;
  const approvals = habitDetail.approvals;

  const loginId = getUserIdFromToken();
  const myApproval = approvals?.filter((item) => item._id === loginId)[0];
  const updatedApprovals = approvals?.filter((item) => item !== myApproval);

  return (
    <div className='w-full rounded-xl overflow-y-auto max-h-full transparent-scrollbar'>
      {myApproval && <ApprovalItem status={status} watcher={myApproval} />}
      {updatedApprovals &&
        updatedApprovals.map((watcher) => {
          return (
            <ApprovalItem key={watcher._id} status={status} watcher={watcher} />
          );
        })}
      {approvals.length === 0 && (
        <p className='text-center m-3'>Watcher가 없습니다.</p>
      )}
    </div>
  );
};

export default ApprovalsList;
