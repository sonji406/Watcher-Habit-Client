import axios from 'axios';
import { useRef, useState } from 'react';
import getUserIdFromToken from '../../utils/getUserIdFromToken';

/* 
- [ ]  그룹 이름 입력창 (15자 제한, 중복 검사 필요)
- [x]  생성 버튼
- 그룹 생성 api 호출
    - [ ]  성공적으로 생성시 모달 없어지고 가입된 그룹 목록에 생성한 그룹명 버튼 추가
    모달이 안닫희고
    가입된 그룹 목록에 생성한 그룹명은 새로고침해야 보여짐
- [0]  취소 또는 모달 영역 바깥을 누르면 닫히도록 구현
- 에러 메시지 출력 논의 필요
*/

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

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/group`,
        requestBody,
      );

      console.log('response.status');
      console.log(response.status);

      if (response.status !== 201) {
        setErrorMsg(
          '에러 메시지 서버에서 받는 값을 주나? 아님 자체적으로 메시지를 만드나?',
        );
      } else {
        setErrorMsg('');
        onclose();
      }
    } catch (error) {
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
