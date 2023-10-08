import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import getUserIdFromToken from '../../utils/getUserIdFromToken';
import { useFetchUserInfo } from '../../hooks/useFetchUserInfo';

function NotFound() {
  const navigate = useNavigate();

  useDocumentTitle('404 - 페이지를 찾을 수 없습니다');

  const userId = getUserIdFromToken();
  const userNickname = useFetchUserInfo(userId);

  const goToHome = () => {
    navigate('/');
  };

  const goToMyHabitPage = () => {
    if (userNickname) {
      navigate(`/my-habit/${userNickname}`);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-main-bg'>
      <h1 className='text-white mb-10 text-5xl'>
        페이지를 찾을 수 없습니다! 🧐
      </h1>
      <h2 className='text-3xl text-gray-400 mb-10'>404 Not Found</h2>
      <p className='text-xl text-gray-400 mb-2'>
        존재하지 않거나, 사용할 수 없는 페이지입니다
      </p>
      <p className='text-xl text-gray-400 mb-10'>
        입력하신 주소가 정확한지 다시 확인해주세요
      </p>
      <button
        onClick={goToMyHabitPage}
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold text-lg py-4 px-6 rounded m-2'
      >
        나의 습관 관리 페이지로 이동
      </button>
      <button
        onClick={goToHome}
        className='hover:text-green-500 text-gray-500 font-medium py-2 px-4 rounded mt-5'
      >
        로그인 화면으로 이동
      </button>
    </div>
  );
}

export default NotFound;
