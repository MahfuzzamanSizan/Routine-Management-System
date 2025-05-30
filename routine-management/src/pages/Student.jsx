import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Helper: Convert English numerals to Bengali numerals
const toBanglaNumber = (number) =>
  number.toString().replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);

// Helper: Format date to Bengali (e.g., ২১ জুন ২০২৫)
const formatBanglaDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

// Helper: Format time to Bengali (e.g., ০৩:০০ PM)
const formatBanglaTime = (timeString) => {
  const [hour, minute] = timeString.split(':');
  const date = new Date();
  date.setHours(+hour, +minute);
  return date.toLocaleTimeString('bn-BD', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

const Student = () => {
  const [routines, setRoutines] = useState([]);
  const [view, setView] = useState('timeline');

  const fetchRoutines = async () => {
    try {
      const res = await axios.get('/api/routines');
      setRoutines(res.data);
    } catch (err) {
      console.error('রুটিন লোড করতে সমস্যা হয়েছে');
    }
  };

  useEffect(() => {
    fetchRoutines();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">ACS রুটিন তালিকা ২০২৫</h1>
        <div className="space-x-2">
          <button
            onClick={() => setView('grid')}
            className={`px-4 py-2 rounded font-semibold transition ${
              view === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            রুটিন টেবিল
          </button>
          <button
            onClick={() => setView('timeline')}
            className={`px-4 py-2 rounded font-semibold transition ${
              view === 'timeline' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
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
                <th className="border p-2">বিষয়</th>
                <th className="border p-2">তারিখ</th>
                <th className="border p-2">শুরুর সময়</th>
                <th className="border p-2">শেষ সময়</th>
                <th className="border p-2">ক্লাস টাইপ</th>
                <th className="border p-2">পরীক্ষার নাম</th>
                <th className="border p-2">সময়কাল</th>
              </tr>
            </thead>
            <tbody>
              {routines.map((r) => (
                <tr key={r.id} className="hover:bg-gray-100">
                  <td className="border p-2">{r.subject}</td>
                  <td className="border p-2">{formatBanglaDate(r.date)}</td>
                  <td className="border p-2">{formatBanglaTime(r.starttime)}</td>
                  <td className="border p-2">{formatBanglaTime(r.endtime)}</td>
                  <td className="border p-2">{r.classtype}</td>
                  <td className="border p-2">{r.examname || '-'}</td>
                  <td className="border p-2">{toBanglaNumber(r.duration)} মিনিট</td>
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
                {r.subject} {r.examname && `(${r.examname})`}
              </h2>
              <p className="text-gray-700">
                {formatBanglaDate(r.date)}: {formatBanglaTime(r.starttime)} - {formatBanglaTime(r.endtime)} ({r.classtype})
              </p>
              <p className="text-sm text-gray-500">সময়কাল: {toBanglaNumber(r.duration)} মিনিট</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Student;
