import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Toast from '../components/Toast';

const Admin = () => {
    const [editingId, setEditingId] = useState(null);
    const [routines, setRoutines] = useState([]);
    const [form, setForm] = useState({
        subject: '',
        date: '',
        startTime: '',
        endTime: '',
        classType: '',
        examName: '',
        duration: ''
    });
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState({ message: '', type: '' });

    const fetchRoutines = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/routines');
            setRoutines(res.data);
        } catch (err) {
            setToast({ message: 'রুটিন আনতে সমস্যা হয়েছে', type: 'error' });
        } finally {
            setLoading(false);
            setTimeout(() => setToast({ message: '', type: '' }), 3000);
        }
    };

    useEffect(() => {
        fetchRoutines();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEdit = (routine) => {
        setForm({
            subject: routine.subject,
            date: routine.date,
            startTime: routine.starttime,
            endTime: routine.endtime,
            classType: routine.classtype,
            examName: routine.examname,
            duration: routine.duration
        });
        setEditingId(routine.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (editingId) {
                await axios.put(`/api/routines/${editingId}`, form);
                setToast({ message: 'রুটিন সফলভাবে আপডেট হয়েছে', type: 'success' });
            } else {
                await axios.post('/api/routines', form);
                setToast({ message: 'রুটিন সফলভাবে যোগ হয়েছে', type: 'success' });
            }

            fetchRoutines();
            setForm({
                subject: '',
                date: '',
                startTime: '',
                endTime: '',
                classType: '',
                examName: '',
                duration: ''
            });
            setEditingId(null);
        } catch (err) {
            setToast({ message: editingId ? 'রুটিন আপডেট করতে সমস্যা হয়েছে' : 'রুটিন যোগ করতে সমস্যা হয়েছে', type: 'error' });
        } finally {
            setLoading(false);
            setTimeout(() => setToast({ message: '', type: '' }), 3000);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/routines/${id}`);
            fetchRoutines();
            setToast({ message: 'রুটিন সফলভাবে মোছা হয়েছে', type: 'success' });
        } catch (err) {
            setToast({ message: 'রুটিন মোছা যায়নি', type: 'error' });
        } finally {
            setTimeout(() => setToast({ message: '', type: '' }), 3000);
        }
    };

    const toBengaliNumber = (str) =>
        String(str).replace(/\d/g, (digit) => '০১২৩৪৫৬৭৮৯'[digit]);

    const formatDate = (dateStr) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('bn-BD', options);
    };

    const formatTime = (timeStr) => {
        const [hour, minute] = timeStr.split(':');
        const date = new Date();
        date.setHours(+hour);
        date.setMinutes(+minute);
        return date.toLocaleTimeString('bn-BD', { hour: 'numeric', minute: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {loading && <Loader />}
            {toast.message && <Toast message={toast.message} type={toast.type} />}
            <header className="bg-green-600 text-white p-5 shadow-lg">
                <h1 className="text-3xl font-extrabold">অ্যাডমিন প্যানেল</h1>
            </header>

            <main className="flex-1 container mx-auto p-6">
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-green-700">
                        {editingId ? 'রুটিন সম্পাদনা করুন' : 'নতুন রুটিন যোগ করুন'}
                    </h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input
                            name="subject"
                            placeholder="বিষয়ের নাম লিখুন"
                            value={form.subject}
                            onChange={handleChange}
                            className="border rounded-md p-2"
                            required
                        />
                        <input
                            name="date"
                            type="date"
                            value={form.date}
                            onChange={handleChange}
                            className="border rounded-md p-2"
                            required
                        />
                        <input
                            name="startTime"
                            type="time"
                            value={form.startTime}
                            onChange={handleChange}
                            className="border rounded-md p-2"
                            required
                        />
                        <input
                            name="endTime"
                            type="time"
                            value={form.endTime}
                            onChange={handleChange}
                            className="border rounded-md p-2"
                            required
                        />
                        <input
                            name="classType"
                            placeholder="ক্লাসের ধরন (যেমন: অনলাইন)"
                            value={form.classType}
                            onChange={handleChange}
                            className="border rounded-md p-2"
                        />
                        <input
                            name="examName"
                            placeholder="পরীক্ষার নাম (যদি থাকে)"
                            value={form.examName}
                            onChange={handleChange}
                            className="border rounded-md p-2"
                        />
                        <input
                            name="duration"
                            placeholder="সময়কাল (মিনিট)"
                            value={form.duration}
                            onChange={handleChange}
                            className="border rounded-md p-2"
                        />
                        <button
                            type="submit"
                            className="col-span-1 md:col-span-3 bg-green-600 hover:bg-green-700 text-white rounded-md p-2 font-bold transition"
                        >
                            {editingId ? 'আপডেট করুন' : 'যোগ করুন'}
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4 text-green-700">সকল রুটিন</h2>
                    {routines.length === 0 ? (
                        <p className="text-gray-500">এখনো কোনো রুটিন যোগ করা হয়নি।</p>
                    ) : (
                        <ul className="divide-y divide-gray-200">
                            {routines.map((r) => (
                                <li key={r.id} className="flex justify-between items-center py-4">
                                    <div>
                                        <p className="text-lg font-bold text-gray-700">{r.subject}</p>
                                        <p className="text-sm text-gray-500">{formatDate(r.date)} | {formatTime(r.starttime)} - {formatTime(r.endtime)}</p>
                                        <p className="text-sm text-gray-400 italic">{r.classtype} | {r.examname} | {toBengaliNumber(r.duration)} মিনিট</p>
                                    </div>

                                    {/* Fix: Wrap buttons in flex container */}
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(r)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-md transition"
                                        >
                                            সম্পাদনা
                                        </button>
                                        <button
                                            onClick={() => handleDelete(r.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md transition"
                                        >
                                            মোছা
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>

            <footer className="bg-gray-100 text-center p-3 text-gray-600 text-sm shadow-inner">
                &copy; {new Date().getFullYear()} রুটিন ম্যানেজমেন্ট সিস্টেম - ACS Future School
            </footer>
        </div>
    );
};

export default Admin;
