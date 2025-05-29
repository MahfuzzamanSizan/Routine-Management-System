import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Student = () => {
  const [routines, setRoutines] = useState([]);
  const [view, setView] = useState('timeline'); // 'grid' or 'timeline'

  const fetchRoutines = async () => {
    const res = await axios.get('/api/routines');
    setRoutines(res.data);
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">প্রশিক্ষণ রুটিন তালিকা ২০২৫</h1>
        <div className="space-x-2">
          <button
            onClick={() => setView('grid')}
            className={`px-4 py-2 rounded ${view === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            রুটিন টেবিল
          </button>
          <button
            onClick={() => setView('timeline')}
            className={`px-4 py-2 rounded ${view === 'timeline' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          >
            রুটিন টাইমলাইন
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="overflow-x-auto">
          <table className="w-full border text-sm">
            <thead className="bg-green-100">
              <tr>
                <th className="border p-2">বিষয়</th>
                <th className="border p-2">তারিখ</th>
                <th className="border p-2">শুরুর সময়</th>
                <th className="border p-2">শেষ সময়</th>
                <th className="border p-2">ক্লাস টাইপ</th>
              </tr>
            </thead>
            <tbody>
              {routines.map((r) => (
                <tr key={r.id} className="hover:bg-gray-100">
                  <td className="border p-2">{r.subject}</td>
                  <td className="border p-2">{r.date}</td>
                  <td className="border p-2">{r.starttime}</td>
                  <td className="border p-2">{r.endtime}</td>
                  <td className="border p-2">{r.classtype}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-4">
          {routines.map((r) => (
            <div
              key={r.id}
              className="p-4 border-l-4 border-green-600 bg-gray-50 shadow rounded"
            >
              <h2 className="text-lg font-semibold text-green-700">
                {r.subject} ({r.examName})
              </h2>
              <p className="text-gray-700">
                {r.date}: {r.startTime} - {r.endTime} ({r.classType})
              </p>
              <p className="text-sm text-gray-500">সময়কাল: {r.duration} মিনিট</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Student;
