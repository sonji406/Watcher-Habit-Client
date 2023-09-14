import { setAccessToken } from '../../redux/authSlice';

const loginAndRedirect = async (
  loginApi,
  loginData,
  nickname,
  dispatch,
  navigate,
) => {
  try {
    const apiResponse = await loginApi(loginData);

    dispatch(setAccessToken(apiResponse.data.accessToken));

    navigate(`/my-habit/${nickname}`);
  } catch (error) {
    throw new Error('로그인에 문제가 발생했습니다.');
  }
};

export default loginAndRedirect;
