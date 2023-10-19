import loginAPI from '../../services/api/login';

const loginAndRedirect = async (email, nickname, navigate) => {
  try {
    const response = await loginAPI(email);

    const accessToken = response.data.accessToken;
    localStorage.setItem('accessToken', accessToken);

    navigate(`/my-habit/${nickname}`);
  } catch (error) {
    console.error(error);
    throw new Error('로그인에 문제가 발생했습니다.');
  }
};

export default loginAndRedirect;
