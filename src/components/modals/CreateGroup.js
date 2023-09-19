import axios from 'axios';
import { useRef, useState } from 'react';
import getUserIdFromToken from '../../utils/getUserIdFromToken';

const CreateGroupModal = ({ onClose }) => {
  const modalContentRef = useRef();
  const [groupName, setGroupName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onChangeHandler = (e) => {
    setGroupName(e.target.value);
  };

  const onClickHandler = async (e) => {
    try {
      const requestBody = {
        groupName,
        creatorId: getUserIdFromToken(),
      };

      await axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/group`,
        requestBody,
      );

      setErrorMsg('');
      onClose();
    } catch (error) {
      let message = '알 수 없는 오류입니다.';

      if (error.response) {
        if (error.response.status === 404) {
          message = '그룹 아이디가 잘못 입력되었습니다.';
        } else {
          message = error.response.data.error || message;
        }
      }

      setErrorMsg(message);
      console.error(error);
    }
  };

  const handleBackdropClick = (e) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 w-full flex items-center justify-center z-10 bg-black bg-opacity-50'
      onClick={handleBackdropClick}
    >
      <div className='bg-white rounded p-5 w-96' ref={modalContentRef}>
        <p>그룹 생성하기</p>
        <input
          type='text'
          placeholder='생성할 그룹명을 입력하세요(15자 제한)'
          onChange={onChangeHandler}
          value={groupName}
        />
        {errorMsg && <p>{errorMsg}</p>}
        <div>
          <button onClick={onClickHandler} className='float-left'>
            생성
          </button>
          <button onClick={onClose} className='float-right'>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;
