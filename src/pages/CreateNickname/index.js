import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import NicknameInput from './NicknameInput';
import ErrorMessage from './ErrorMessage';
import CreateNicknameButton from './CreateNicknameButton';
import loginAPI from '../../services/api/login';
import userPostAPI from '../../services/api/userPost';
import loginAndRedirect from '../../lib/login/loginAndRedirect';

const CreateNickName = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [nickName, setNickName] = useState('');
  const [error, setError] = useState('');

  const responsePayload = location.state?.responsePayload;

  const handleNicknameChange = (e) => {
    const value = e.target.value;

    if (/^[a-zA-Z0-9]+$/.test(value) || value === '') {
      setNickName(value);
      setError('');
      return;
    }

    if (/\s/.test(value)) {
      setError('닉네임에 공백을 포함할 수 없습니다.');
      return;
    }

    setError('닉네임은 영어 대소문자, 숫자만 가능합니다.');
  };

  const getSocialLoginType = (responsePayload) => {
    const issuer = responsePayload.iss;

    if (issuer.includes('accounts.google.com')) {
      return 'google';
    } else if (issuer.includes('facebook.com')) {
      return 'facebook';
    } else if (issuer.includes('twitter.com')) {
      return 'twitter';
    }
    return 'none';
  };

  const handleSubmit = async () => {
    try {
      if (!nickName) {
        setError('닉네임을 입력해주세요');
        return;
      }

      const userData = {
        nickName,
        profileImageUrl: responsePayload.picture,
        email: responsePayload.email,
        socialLoginType: getSocialLoginType(responsePayload),
      };

      await userPostAPI(userData);

      await loginAndRedirect(
        loginAPI,
        responsePayload,
        nickName,
        dispatch,
        navigate,
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center pt-32'>
      <span className='text-white text-2xl pb-5 font-extrabold'>
        닉네임 생성
      </span>
      <NicknameInput nickName={nickName} onChange={handleNicknameChange} />
      <ErrorMessage error={error} />
      <CreateNicknameButton onClick={handleSubmit} />
    </div>
  );
};

export default CreateNickName;
