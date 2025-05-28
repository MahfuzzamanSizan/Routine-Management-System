import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./pages/Admin";
import Student from "./pages/Student";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";

const App = () => {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={role === "admin" ? <Admin /> : <Navigate to="/login" />}
        />
        <Route
          path="/student"
          element={role === "student" ? <Student /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
