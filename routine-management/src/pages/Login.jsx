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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">🔐 Login</h1>
        <p className="text-gray-600 mb-8">Select your role to continue</p>

        <div className="flex flex-col space-y-4">
          <button
            onClick={() => handleLogin('admin')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            👨‍💼 Login as Admin
          </button>
          <button
            onClick={() => handleLogin('student')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            🎓 Login as Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
