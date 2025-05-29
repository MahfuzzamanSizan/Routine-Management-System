import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element: Component, allowedRole }) => {
  const { role } = useContext(AuthContext);

  if (!role) {
    // Still loading or not logged in
    return <Navigate to="/" />;
  }

  return role === allowedRole ? <Component /> : <Navigate to="/" />;
};

export default ProtectedRoute;
