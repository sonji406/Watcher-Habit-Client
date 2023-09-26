import { useNavigate } from 'react-router-dom';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';

function NotFound() {
  const navigate = useNavigate();

  useDocumentTitle('404 - 페이지를 찾을 수 없습니다');

  const goToHome = () => {
    navigate('/');
  };

  const goBack = () => {
    window.history.back();
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
      <div className='flex space-x-4'>
        <button
          onClick={goToHome}
          className='bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded m-2'
        >
          메인 화면으로
        </button>
        <button
          onClick={goBack}
          className='bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-6 rounded m-2'
        >
          이전 화면으로
        </button>
      </div>
    </div>
  );
}

export default NotFound;
