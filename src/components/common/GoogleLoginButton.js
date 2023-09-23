import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import decodeJwtResponse from '../../utils/decodeJwtResponse';
import loginAPI from '../../services/api/login';
import userCheckAPI from '../../services/api/userCheck';
import checkUserByEmail from '../../lib/userCheck/checkUserByEmail';
import loginAndRedirect from '../../lib/login/loginAndRedirect';

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState();

  useEffect(() => {
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

        await loginAndRedirect(
          loginAPI,
          responsePayload,
          nickname,
          dispatch,
          navigate,
        );
      } catch (error) {
        setError(error.message);
      }
    };

    // if (window.google && window.google.accounts && window.google.accounts.id) {
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('googleLoginButton'),
      { theme: 'outline', size: 'large' },
    );
    // }
  }, [dispatch, navigate]);

  return (
    <>
      <div id='googleLoginButton' className='place-content-center'></div>
      <div className='pt-4 text-sm text-red-500'>{error}</div>
    </>
  );
};

export default GoogleLoginButton;
