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
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="font-bold text-xl">Routine Manager</h1>
      <div>
        {role && (
          <>
            {role === 'admin' && <Link to="/admin" className="mr-4 hover:underline">Admin</Link>}
            {role === 'student' && <Link to="/student" className="mr-4 hover:underline">Student</Link>}
            <button onClick={handleLogout} className="bg-red-500 px-2 py-1 rounded">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
