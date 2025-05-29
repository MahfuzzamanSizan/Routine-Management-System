import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './AuthContext';
import Admin from './pages/Admin';
import Student from './pages/Student';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import ProtectedRoute from './ProtectedRoute';

const AppContent = () => {
  const { role } = useContext(AuthContext);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute element={Admin} allowedRole="admin" />} />
        <Route path="/student" element={<ProtectedRoute element={Student} allowedRole="student" />} />
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
