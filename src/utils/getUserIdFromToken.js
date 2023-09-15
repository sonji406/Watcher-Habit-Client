import decodeJwtResponse from './decodeJwtResponse';

const getUserIdFromToken = () => {
  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('accessToken을 확인해주세요.');
  }

  const decoded = decodeJwtResponse(accessToken);
  return decoded.userId;
};

export default getUserIdFromToken;
