import axios from "axios";

const api = axios.create({
  baseURL: "https://routine-management-system-1.onrender.com", // Your backend URL
});

// API endpoints
export const getRoutines = () => api.get("/routines");
export const createRoutine = (data) => api.post("/routines", data);
export const updateRoutine = (id, data) => api.put(`/routines/${id}`, data);
export const deleteRoutine = (id) => api.delete(`/routines/${id}`);

export default api;
