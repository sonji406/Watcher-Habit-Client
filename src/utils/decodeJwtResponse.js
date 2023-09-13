import jwtDecode from 'jwt-decode';

const decodeJwtResponse = (jwt) => {
  if (typeof jwt !== 'string' || (jwt.match(/\./g) || []).length !== 2) {
    throw new Error('유효하지 않은 JWT 형식');
  }

  const decodedJwt = jwtDecode(jwt);

  return decodedJwt;
};

export default decodeJwtResponse;
