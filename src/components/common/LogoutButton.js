import { useNavigate } from 'react-router-dom';
import logoutAPI from '../../services/api/logout';

const handleLogout = async (navigate, logoutAPI) => {
  try {
    await logoutAPI();

    navigate('/');
  } catch (error) {
    throw error;
  }
};

const LogoutButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => handleLogout(navigate, logoutAPI)}>Logout</button>
    </>
  );
};

export default LogoutButton;
