import getUserIdFromToken from '../utils/getUserIdFromToken';

const isLoggedinUser = (checkId) => {
  const userId = getUserIdFromToken();

  return userId === checkId;
};

export default isLoggedinUser;
