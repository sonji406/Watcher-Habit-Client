import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <div>
      <h1>404 error!</h1>
      <h2>페이지를 찾을 수 없습니다.</h2>
      <button onClick={goToHome}>홈으로 돌아가기</button>
      <button onClick={goBack}>뒤로가기</button>
    </div>
  );
}

export default NotFound;
