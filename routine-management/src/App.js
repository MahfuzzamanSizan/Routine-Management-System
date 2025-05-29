import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './AuthContext';
import Admin from './pages/Admin';
import Student from './pages/Student';
import Login from './pages/Login';
import Navbar from './components/Navbar';

const AppContent = () => {
  const { role } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        {role === 'admin' && <Route path="/admin" element={<Admin />} />}
        {role === 'student' && <Route path="/student" element={<Student />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
