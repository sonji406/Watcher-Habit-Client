import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ApprovedIcon from '../icon/Approved';
import RejectedIcon from '../icon/Rejected';
import isLoginUser from '../../../lib/isLoginUser';
import UnderlinedText from '../lib/UnderlinedText';

const ApprovalItem = ({ status, watcher }) => {
  const watcherStatus = watcher.status;
  const [error, setError] = useState('');

  const habitId = useSelector((state) => state.habit.habitDetail);
  const watcherId = watcher._id;
  const profileImageUrl = watcher.profileImageUrl;
  const loginUserIsWatcher = isLoginUser(watcherId);

  const updateStatus = async (status) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId._id}/${watcherId}`,
        {
          status,
        },
      );

      setApprovalsMessage(approvalsMessages[status]);
    } catch (error) {
      setError('다시 시도 해주시길 바랍니다.');
    }
  };

  const approvalsMessages = {
    undecided: loginUserIsWatcher ? (
      <div className='pl-2'>
        <button
          className='bg-emerald-700 hover:bg-emerald-200 hover:font-bold hover:text-emerald-700 p-1 rounded-lg border-2 border-solid'
          onClick={() => updateStatus('approved')}
        >
          승인해요
        </button>
        <button
          className='bg-red-600 hover:bg-red-200 hover:font-bold hover:text-red-600 ml-2 p-1 rounded-lg border-2 border-solid'
          onClick={() => updateStatus('rejected')}
        >
          부족해요
        </button>
      </div>
    ) : (
      <p className='text-xm tracking-tight ml-2'>아직 승인 대기중 입니다.</p>
    ),
    approved: (
      <>
        <UnderlinedText color='emerald-700'>수고하셨습니다!!</UnderlinedText>
        <ApprovedIcon />
      </>
    ),
    rejected: (
      <>
        <UnderlinedText color='red-700'>부족한 것 같아요..</UnderlinedText>
        <RejectedIcon />
      </>
    ),
  };

  const [approvalsMessage, setApprovalsMessage] = useState(
    approvalsMessages[watcherStatus],
  );

  return (
    <div className='flex justify-center my-3'>
      <div className='relative mr-[-25px] w-[40px] h-[40px] bg-light-gray-bg rounded-full flex'>
        <img
          src={profileImageUrl}
          alt=''
          className='object-cover rounded-full'
        />
      </div>
      <div className='w-[210px] h-[43px] my-2 bg-dark-gray-bg rounded-full font-bold text-center flex items-center justify-center'>
        {status === 'awaitingVerification' ? (
          <p className='text-xs tracking-tight'>
            인증샷이 업로드되면 확인 후 <br />
            승인 또는 거절하실 수 있습니다
          </p>
        ) : error ? (
          <p className='text-xs'>{error}</p>
        ) : (
          approvalsMessage
        )}
      </div>
    </div>
  );
};

export default ApprovalItem;
