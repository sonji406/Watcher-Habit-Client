import decodeJwtResponse from './decodeJwtResponse';

const getUserIdFromToken = (token) => {
  let userId = null;
  try {
    const decoded = decodeJwtResponse(token);
    userId = decoded.userId;
  } catch (error) {
    console.error('Error decoding JWT:', error);
    throw error;
  }
  return userId;
};

export default getUserIdFromToken;
