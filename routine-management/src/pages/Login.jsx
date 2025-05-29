import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (role) => {
    login(role);
    navigate(`/${role}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Select Role to Login</h1>
      <div className="space-x-4">
        <button onClick={() => handleLogin('admin')} className="bg-blue-500 text-white px-4 py-2 rounded">Login as Admin</button>
        <button onClick={() => handleLogin('student')} className="bg-green-500 text-white px-4 py-2 rounded">Login as Student</button>
      </div>
    </div>
  );
};

export default Login;
