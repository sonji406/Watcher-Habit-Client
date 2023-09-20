import { useSelector } from 'react-redux';

const SuccessCriteria = () => {
  const habitDetail = useSelector((state) => state.habit.habitDetail);

  const minApprovalCount = habitDetail.minApprovalCount;
  const approvedCount = habitDetail.approvals.filter(
    (approval) => approval.status === 'approved',
  ).length;

  return (
    <p className='mb-2'>{`성공 조건 : ${approvedCount}/${minApprovalCount}`}</p>
  );
};

export default SuccessCriteria;
