const RoutineTable = ({ routines, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Exam</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Start</th>
            <th className="border p-2">End</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {routines.map((r) => (
            <tr key={r.id}>
              <td className="border p-2">{r.exam_name}</td>
              <td className="border p-2">{r.subject_name}</td>
              <td className="border p-2">{new Date(r.start_time).toLocaleString()}</td>
              <td className="border p-2">{new Date(r.end_time).toLocaleString()}</td>
              <td className="border p-2">{r.duration} min</td>
              <td className="border p-2">{r.class_type}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => onEdit(r)}
                  className="bg-yellow-500 text-white px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(r.id)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoutineTable;
