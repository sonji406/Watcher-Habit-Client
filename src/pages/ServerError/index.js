import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../../hooks/useDocumentTitle';

function ServerError() {
  const navigate = useNavigate();

  useDocumentTitle('500 - 서버 오류');

  const goToHome = () => {
    navigate('/');
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-main-bg'>
      <h1 className='text-white mb-10 text-5xl'>
        서버에 오류가 발생했습니다! 😓
      </h1>
      <h2 className='text-3xl text-gray-400 mb-10'>500 Server Error</h2>
      <p className='text-xl text-gray-400 mb-2'>
        문제가 계속 발생한다면 관리자에게 연락해주세요.
      </p>
      <p className='text-xl text-gray-400 mb-10'>
        잠시 후에 다시 시도하거나 다른 페이지를 방문해보세요.
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

export default ServerError;
