import axios from 'axios';

const habitGetAPI = (habitId) => {
  return fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/api/habit/${habitId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Cookie: 'cookieName=cookieValue; anotherCookieName=anotherCookieValue', // 여기에 쿠키를 추가합니다.
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export default habitGetAPI;
