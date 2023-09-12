import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useAuth } from '../../AuthContext';

function GoogleLoginButton() {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();

  const checkUserByEmail = async (email) => {
    try {
      const userCheckEndpoint = `${process.env.REACT_APP_SERVER_DOMAIN}/api/userCheck?email=${email}`;
      const response = await axios.get(userCheckEndpoint);

      if (response.data.user) {
        return response.data.user;
      }
    } catch (error) {
      console.error('API 요청 중 오류 발생:', error);
    }
    return false;
  };

  const handleResponse = async (response) => {
    const responsePayload = decodeJwtResponse(response.credential);
    const existingUser = await checkUserByEmail(responsePayload.email);

    if (!existingUser) {
      navigate('/create-nickname', { state: { responsePayload } });
    } else {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/login`,
        responsePayload,
      );

      setAccessToken(response.data.accessToken);

      navigate(`/my-habit/${existingUser.nickName}`);
    }
  };

  const decodeJwtResponse = (credential) => {
    return jwtDecode(credential);
  };

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      { theme: 'outline', size: 'large' },
    );
  });

  return <div id='signInDiv'></div>;
}

export default GoogleLoginButton;
