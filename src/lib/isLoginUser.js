import getUserIdFromToken from '../utils/getUserIdFromToken';

const isLoginUser = (checkId) => {
  const userId = getUserIdFromToken();

  return userId === checkId;
};

export default isLoginUser;
