import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Your backend URL
});

// API endpoints
export const getRoutines = () => api.get("/routines");
export const createRoutine = (data) => api.post("/routines", data);
export const updateRoutine = (id, data) => api.put(`/routines/${id}`, data);
export const deleteRoutine = (id) => api.delete(`/routines/${id}`);

export default api;
