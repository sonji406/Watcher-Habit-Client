export const mockCreateHabitAPI = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 201,
        data: {
          message: '습관이 성공적으로 생성되었습니다.',
          habitId: 'mock-habit-id-12345',
          ...data,
        },
      });
    }, 1000);
  });
};

export const mockEditHabitAPI = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: {
          message: '습관이 성공적으로 수정되었습니다.',
          habitId: 'mock-habit-id-12345',
          ...data,
        },
      });
    }, 1000);
  });
};
