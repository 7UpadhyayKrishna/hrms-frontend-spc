import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomeRedirect = () => {
  const { user } = useAuth();
  
  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Role-based redirection
  if (user.role === 'hr') {
    return <Navigate to="/job-desk" replace />;
  }

  if (user.role === 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Navigate to="/unauthorized" replace />;
};

export default HomeRedirect;
