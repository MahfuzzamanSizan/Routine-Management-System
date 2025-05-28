import { useState, useEffect } from "react";
import RoutineForm from "../components/RoutineForm";
import RoutineTable from "../components/RoutineTable";
import { getRoutines, deleteRoutine } from "../services/api";
import toast from "react-hot-toast";

const Admin = () => {
  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRoutines = async () => {
    setLoading(true);
    try {
      const res = await getRoutines();
      setRoutines(res.data);
    } catch {
      toast.error("Failed to fetch routines.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  const handleDelete = async (id) => {
    await deleteRoutine(id);
    toast.success("Routine deleted!");
    fetchRoutines();
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>
      <RoutineForm
        selectedRoutine={selectedRoutine}
        onSuccess={() => {
          fetchRoutines();
          setSelectedRoutine(null);
        }}
      />
      <h2 className="text-lg font-semibold my-4">Routines</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <RoutineTable
          routines={routines}
          onEdit={setSelectedRoutine}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default Admin;
