import { useState, useEffect } from "react";
import { createRoutine, updateRoutine } from "../services/api";
import toast from "react-hot-toast";

const RoutineForm = ({ selectedRoutine, onSuccess }) => {
  const [formData, setFormData] = useState({
    exam_name: "",
    subject_name: "",
    start_time: "",
    end_time: "",
    duration: "",
    class_type: "Regular",
  });

  useEffect(() => {
    if (selectedRoutine) {
      setFormData({
        ...selectedRoutine,
        start_time: selectedRoutine.start_time?.slice(0, 16),
        end_time: selectedRoutine.end_time?.slice(0, 16),
      });
    } else {
      setFormData({
        exam_name: "",
        subject_name: "",
        start_time: "",
        end_time: "",
        duration: "",
        class_type: "Regular",
      });
    }
  }, [selectedRoutine]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedRoutine) {
        await updateRoutine(selectedRoutine.id, formData);
        toast.success("Routine updated!");
      } else {
        await createRoutine(formData);
        toast.success("Routine created!");
      }
      onSuccess();
    } catch {
      toast.error("Action failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 border p-4 rounded shadow w-full max-w-md">
      <input
        type="text"
        name="exam_name"
        value={formData.exam_name}
        onChange={handleChange}
        placeholder="Exam Name"
        required
        className="border p-2 rounded"
      />
      <input
        type="text"
        name="subject_name"
        value={formData.subject_name}
        onChange={handleChange}
        placeholder="Subject"
        required
        className="border p-2 rounded"
      />
      <input
        type="datetime-local"
        name="start_time"
        value={formData.start_time}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="datetime-local"
        name="end_time"
        value={formData.end_time}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        type="number"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        placeholder="Duration (minutes)"
        required
        className="border p-2 rounded"
      />
      <select
        name="class_type"
        value={formData.class_type}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option>Regular</option>
        <option>Mock Test</option>
        <option>Intense Mode</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded"
      >
        {selectedRoutine ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default RoutineForm;
