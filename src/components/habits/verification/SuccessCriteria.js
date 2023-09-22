import { useSelector } from 'react-redux';

const SuccessCriteria = ({ isModal = false }) => {
  const selectConditon = isModal
    ? (state) => state.notificationHabit.notificationHabitDetail
    : (state) => state.habit.habitDetail;
  const habitDetail = useSelector(selectConditon);

  const minApprovalCount = habitDetail.minApprovalCount;
  const approvedCount = habitDetail.approvals.filter(
    (approval) => approval.status === 'approved',
  ).length;

  return (
    <p className='mb-2'>{`성공 조건 : ${approvedCount}/${minApprovalCount}`}</p>
  );
};

export default SuccessCriteria;
