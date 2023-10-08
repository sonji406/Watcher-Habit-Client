import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import decodeJwtResponse from '../../utils/decodeJwtResponse';
import userCheckAPI from '../../services/api/userCheck';
import checkUserByEmail from '../../lib/userCheck/checkUserByEmail';
import loginAndRedirect from '../../lib/login/loginAndRedirect';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const [error, setError] = useState();

  const loadGoogleScript = () => {
    if (document.getElementById('google-login-script')) {
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-login-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleLogin;
    document.head.appendChild(script);
  };

  const handleResponse = async (response) => {
    try {
      const responsePayload = decodeJwtResponse(response.credential);
      const nickname = await checkUserByEmail(
        userCheckAPI,
        responsePayload.email,
      );

      if (!nickname) {
        navigate('/create-nickname', { state: { responsePayload } });
        return;
      }

      await loginAndRedirect(responsePayload.email, nickname, navigate);
    } catch (error) {
      setError(error.message);
    }
  };

  const initializeGoogleLogin = () => {
    if (!process.env.REACT_APP_GOOGLE_CLIENT_ID) {
      setError('Google Client ID 가 존재하지 않습니다.');
      return;
    }

    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('googleLoginButton'),
      { theme: 'outline', size: 'large' },
    );
  };

  useEffect(() => {
    loadGoogleScript();
  }, []);

  return (
    <>
      <div id='googleLoginButton' className='place-content-center'></div>
      <div className='pt-4 text-sm text-red-500'>{error}</div>
    </>
  );
};

export default GoogleLoginButton;
