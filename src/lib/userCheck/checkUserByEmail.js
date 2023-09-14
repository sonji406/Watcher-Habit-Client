const checkUserByEmail = async (userCheckAPI, email) => {
  try {
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      throw new Error('유효하지 않은 이메일 형식');
    }

    const response = await userCheckAPI(email);

    if (response.data.nickname) {
      return response.data.nickname;
    }
  } catch (error) {
    throw new Error('사용자 정보 확인 중 문제가 발생했습니다.');
  }

  return false;
};

export default checkUserByEmail;
