import { useNavigate } from 'react-router-dom';
import logoutAPI from '../../services/api/logout';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutAPI();

      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default LogoutButton;
