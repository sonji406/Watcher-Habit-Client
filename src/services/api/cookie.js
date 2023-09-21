const cookieAPI = () => {
  return fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/set-cookie`, {
    credentials: 'include',
  });
};

export default cookieAPI;
