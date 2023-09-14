import axios from 'axios';

const loginAndRedirect = async (
  loginApi,
  loginData,
  nickname,
  dispatch,
  navigate,
) => {
  try {
    await axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/api/auth/login`, loginData)
      .then((response) => {
        const accessToken = response.data.accessToken;
        localStorage.setItem('accessToken', accessToken);
      })
      .catch((error) => {
        console.error(error);
      });

    navigate(`/my-habit/${nickname}`);
  } catch (error) {
    throw new Error('로그인에 문제가 발생했습니다.');
  }
};

export default loginAndRedirect;
