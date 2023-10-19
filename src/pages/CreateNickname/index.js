import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import NicknameInput from './NicknameInput';
import ErrorMessage from './ErrorMessage';
import CreateNicknameButton from './CreateNicknameButton';
import postUserAPI from '../../services/api/user/postUser';
import loginAndRedirect from '../../lib/login/loginAndRedirect';

const CreateNickname = () => {
  useDocumentTitle('닉네임 생성 페이지');

  const location = useLocation();
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');

  const responsePayload = location.state?.responsePayload;

  const handleNicknameChange = (e) => {
    const value = e.target.value;

    if (/^[a-zA-Z0-9]+$/.test(value) || value === '') {
      setNickname(value);
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
      if (!nickname) {
        setError('닉네임을 입력해주세요');
        return;
      }

      const userData = {
        nickname,
        profileImageUrl: responsePayload.picture,
        email: responsePayload.email,
        socialLoginType: getSocialLoginType(responsePayload),
      };

      await postUserAPI(userData);

      await loginAndRedirect(responsePayload.email, nickname, navigate);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center pt-32'>
      <span className='text-white text-2xl pb-5 font-extrabold'>
        닉네임 생성
      </span>
      <NicknameInput nickname={nickname} onChange={handleNicknameChange} />
      <ErrorMessage error={error} />
      <CreateNicknameButton onClick={handleSubmit} />
    </div>
  );
};

export default CreateNickname;
