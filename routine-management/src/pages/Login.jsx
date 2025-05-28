import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    localStorage.setItem("role", role);
    navigate(role === "admin" ? "/admin" : "/student");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <button
        onClick={() => handleLogin("admin")}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Login as Admin
      </button>
      <button
        onClick={() => handleLogin("student")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Login as Student
      </button>
    </div>
  );
};

export default Login;
