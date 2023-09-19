import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ApprovedIcon from '../icon/Approved';
import RejectedIcon from '../icon/Rejected';
import isLoginUser from '../../../../lib/isLoginUser';
import UnderlinedText from '../lib/UnderlinedText';
import ApprovalStatusBox from './ApprovalStatusBox';
import ProfileImage from './ProfileImage';
import ApprovalButtons from './ApprovalButtons';

const ApprovalItem = ({ status, watcher }) => {
  const [error, setError] = useState('');

  const habitId = useSelector((state) => state.habit.habitDetail);

  const getApprovalMessage = (watcherStatus) => {
    if (watcherStatus === 'undecided' && isLoginUser(watcher._id)) {
      return (
        <ApprovalButtons
          onApprove={() => updateStatus('approved')}
          onReject={() => updateStatus('rejected')}
        />
      );
    }
    if (watcherStatus === 'approved') {
      return (
        <>
          <UnderlinedText color='emerald-700'>수고하셨습니다!!</UnderlinedText>
          <ApprovedIcon />
        </>
      );
    }
    if (watcherStatus === 'rejected') {
      return (
        <>
          <UnderlinedText color='red-700'>부족한 것 같아요..</UnderlinedText>
          <RejectedIcon />
        </>
      );
    }
    return (
      <p className='text-xm tracking-tight ml-2'>아직 승인 대기중 입니다.</p>
    );
  };

  const [approvalsMessage, setApprovalsMessage] = useState(() =>
    getApprovalMessage(watcher.status),
  );

  const updateStatus = async (newStatus) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId._id}/${watcher._id}`,
        { status: newStatus },
      );

      setApprovalsMessage(getApprovalMessage(newStatus));
    } catch (error) {
      setError('다시 시도 해주시길 바랍니다.');
    }
  };

  return (
    <div className='flex justify-center my-3'>
      <ProfileImage src={watcher.profileImageUrl} />
      <ApprovalStatusBox
        status={status}
        error={error}
        message={approvalsMessage}
      />
    </div>
  );
};

export default ApprovalItem;
