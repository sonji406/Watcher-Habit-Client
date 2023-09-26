import axios from 'axios';

const loginAndRedirect = async (loginData, nickname, navigate) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/login`,
      { email: loginData },
    );

    const accessToken = response.data.accessToken;
    localStorage.setItem('accessToken', accessToken);

    navigate(`/my-habit/${nickname}`);
  } catch (error) {
    console.error(error);
    throw new Error('로그인에 문제가 발생했습니다.');
  }
};

export default loginAndRedirect;
