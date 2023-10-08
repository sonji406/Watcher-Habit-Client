import api from '../../utils/api';
import { useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import getUserIdFromToken from '../../utils/getUserIdFromToken';
import groupGet from '../../services/api/groupGet';

const InviteGroupModal = ({ groupId, onClose }) => {
  const modalContentRef = useRef();
  const [groupName, setGroupName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [invitedUser, setInvitedUser] = useState({});
  const [searchClicked, setSearchClicked] = useState(false);
  const inviteUserId = getUserIdFromToken();

  useClickOutside(modalContentRef, onClose);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = groupGet(groupId);

        setGroupName(response.data.groupName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const onChangeHandler = (e) => {
    setInviteEmail(e.target.value);
    setSearchClicked(false);
    setErrorMsg('');
  };

  const onClickGetUserByEmail = async (e) => {
    try {
      const response = await api.get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/getInfoByEmail?email=${inviteEmail}`,
        { withCredentials: true },
      );

      setInvitedUser(response.data);
      setErrorMsg('');
    } catch (error) {
      const validationErrors = error.response.data?.errors;

      if (error.response.status === 400 && validationErrors) {
        setErrorMsg('이메일 형식이 잘못되었습니다.');
      } else if (error.response.status === 404) {
        setErrorMsg('존재하지 않는 사용자입니다.');
      } else {
        setErrorMsg('알 수 없는 에러입니다.');
      }
    }

    setSearchClicked(true);
  };

  const onClickInvite = async (e) => {
    try {
      await api.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/group/${groupId}/invite`,
        {
          fromUserId: inviteUserId,
          toUserId: invitedUser.userId,
        },
      );

      setErrorMsg('');
      onClose();
    } catch (error) {
      const validationErrors = error.response.data?.errors;
      let message = '알 수 없는 오류입니다.';

      if (error.response.status === 400 && validationErrors) {
        message = '유효하지 않은 아이디입니다.';
      } else if (error.response.status === 404) {
        message = '존재하지 않는 사용자입니다.';
      } else {
        message = error.response.data.error || message;
      }

      setErrorMsg(message);
      console.error(error);
    }
  };

  return (
    <div className='fixed inset-0 w-full flex items-center justify-center z-50 bg-black bg-opacity-50'>
      <div
        className='bg-dark-blue-bg border border-customGreen rounded p-5 w-8000 text-white rounded-xl'
        ref={modalContentRef}
      >
        <p className='text-center font-extrabold'>{groupName}</p>
        <p className='text-center font-extrabold'>그룹에 멤버 초대하기</p>
        <div className='flex items-center mt-4'>
          <input
            className='flex-grow h-12 bg-gray-bg text-center text-black rounded-lg mt-4'
            type='email'
            placeholder='초대할 멤버의 이메일을 입력하세요'
            onChange={onChangeHandler}
            value={inviteEmail}
            minLength={3}
            maxLength={50}
            required
          />
          <button
            className='w-16 h-12 bg-green-bg text-white text-center rounded-lg mt-4 ml-4 font-extrabold hover:bg-green-800'
            onClick={onClickGetUserByEmail}
          >
            검색
          </button>
        </div>
        {!errorMsg && searchClicked && (
          <>
            <p className='text-center'>
              [{inviteEmail}]로 검색된 유저의 닉네임은 [{invitedUser.nickname}
              ]님입니다.
            </p>
            <p className='text-center'>위의 유저를 그룹에 초대하시겠습니까?</p>
          </>
        )}
        {errorMsg && (
          <p className='text-center text-red-500 mt-4'>{errorMsg}</p>
        )}
        <div className='flex justify-center mt-4'>
          <button
            onClick={onClickInvite}
            className='bg-green-bg text-white rounded-xl p-2 w-40 mx-7 font-extrabold hover:bg-green-800'
            disabled={!searchClicked || errorMsg}
            style={{ cursor: 'pointer' }}
          >
            초대
          </button>
          <button
            onClick={onClose}
            className='bg-dark-blue-bg text-green-txt border border-customGreen rounded-xl p-2 w-40 mx-7 font-extrabold hover:bg-red-800 hover:text-white hover:border-red-700'
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteGroupModal;
