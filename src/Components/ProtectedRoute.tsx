// ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

type ProtectedRouteProps = {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth(); 

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
