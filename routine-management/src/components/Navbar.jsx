import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-700 shadow-md px-6 py-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src="/acs.ico" alt="Logo" className="w-10 h-10 rounded-full" />
          <h1 className="text-2xl font-bold tracking-wide">Routine Manager</h1>
        </div>

        {role && (
          <div className="flex items-center space-x-6">
            {role === 'admin' && (
              <Link
                to="/admin"
                className="hover:text-yellow-400 transition-colors duration-200 text-lg"
              >
                Admin
              </Link>
            )}
            {role === 'student' && (
              <Link
                to="/student"
                className="hover:text-yellow-400 transition-colors duration-200 text-lg"
              >
                Student
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
