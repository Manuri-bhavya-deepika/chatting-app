import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from localStorage to log the user out
    localStorage.removeItem('token');
    
    // Redirect the user to the sign-in page or home page
    navigate('/signin');
  }, [navigate]);

  return (
    <div className="bg-slate-300 min-h-[720px] flex justify-center items-center">
      <div className="text-center p-4">
        <h1 className="text-xl font-semibold">Logging out...</h1>
        <p>Please wait while we log you out.</p>
      </div>
    </div>
  );
};

export default Logout;
