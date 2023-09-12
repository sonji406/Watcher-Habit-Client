import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';

function CreateNickname() {
  const location = useLocation();
  const navigate = useNavigate();

  const { setAccessToken } = useAuth();

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
      setError('닉네임은 공백을 포함할 수 없습니다.');
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
      const userData = {
        nickName,
        profileImageUrl: responsePayload.picture,
        email: responsePayload.email,
        socialLoginType: getSocialLoginType(responsePayload),
      };

      await axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/user`,
        userData,
      );

      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/login`,
        userData,
      );

      setAccessToken(response.data.accessToken);

      navigate(`/my-habit/${nickName}`);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <>
      <div>
        <input
          value={nickName}
          onChange={handleNicknameChange}
          placeholder='닉네임 입력'
          maxLength={10}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      <button onClick={handleSubmit}>생성</button>
    </>
  );
}

export default CreateNickname;
