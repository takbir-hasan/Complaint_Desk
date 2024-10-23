import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '../components/navbar';
import { FaSignOutAlt, FaTrash, FaUserCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminDashboard() {
    const [selectedDept, setSelectedDept] = useState('');
    // const [teachers, setTeachers] = useState([]);
    const [search1, setSearch1] = useState('');
    // const [assignedTeachersData, setAssignedTeachersData] = useState([]);
    const [teachers, setTeachers] = useState([]); // Initialize as an empty array
    const [assignedTeachersData, setAssignedTeachersData] = useState([]); // Initialize as an empty array

    

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeachers = async () => {
            if (selectedDept) {
                try {
                    const response = await fetch(`/teacher/names/${selectedDept}`);
                    const result = await response.json();
                    setTeachers(result.teachers || []); // Ensure it defaults to an empty array
                } catch (error) {
                    console.error('Error fetching teachers:', error);
                }
            }
        };
        fetchTeachers();
    }, [selectedDept]);

    useEffect(() => {
        const fetchAssignedTeachers = async () => {
            try {
                const response = await fetch('/teacher/api/getAssignedTeachers');
                const data = await response.json();
                if (data.success) {
                    setAssignedTeachersData(data.assignedTeachers || []); // Ensure it defaults to an empty array
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Error fetching assigned teachers:', error);
            }
        };
    
        fetchAssignedTeachers();
    }, []);
    
    const filteredTeachers = (teachers).filter(teacher => teacher.dept === selectedDept); // Ensure teachers is an array

    console.log('Filtered Teachers:', filteredTeachers); // Check if this shows expected data


    const handleRedirect = () => navigate('/AdminProfile');
    
    const handleLogoutRedirect = () => {
        localStorage.clear();
        window.location.href = '/AdminLogin';
    };

    const handleAddClick = async () => {
        const chairmanData = {
            name: search1,
            assignedPosition: "Chairman",
            assignedDept: selectedDept,
        };

        const requestData = {
            chairman: chairmanData,
            teachers: assignedTeachersData,
        };

        try {
            const response = await fetch('/teacher/api/updatePosition', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error('Information may be wrong or Network response was not ok');
            }

            const data = await response.json();
            toast.success(data.message);
            setTimeout(() => window.location.reload(), 1000);
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error(error.message);
        }
    };

    const handleCancelClick = async (departmentName) => {
        try {
            const response = await fetch('/teacher/api/updatePositionByDepartment', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dept: departmentName }),
            });

            const data = await response.json();
            toast.success(data.message);
            window.location.reload();
        } catch (error) {
            console.error("Error updating positions:", error);
            toast.error("Failed to update positions.");
        }
    };


    return (
        <>
            <Helmet>
                <title>Dashboard | Admin</title>
            </Helmet>

            <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 text-black">
                <Navbar />
                <ToastContainer />

                <div className="container-fluid max-w-full mt-4 mb-4 mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-3">
                        <p className="text-lg font-bold">Admin Dashboard</p>
                        <div className="flex space-x-4">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200" onClick={handleRedirect}>
                                <FaUserCircle className="mr-2" /> Admin Profile
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200" onClick={handleLogoutRedirect}>
                                <FaSignOutAlt className="mr-2" /> Logout
                            </button>
                        </div>
                    </div>

                    <hr className="border-t-4" style={{ borderColor: '#FEDE00' }} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label htmlFor="searchDepartment" className="block text-gray-700 text-sm font-semibold mb-2">Department</label>
                            <select
                                className="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                            >
                                <option value="">Select Department</option>
                                {/* Add more departments here */}
                                <option value="CSE">Computer Science and Engineering (CSE)</option>
                                <option value="EEE">Electrical and Electronic Engineering (EEE)</option>
                                <option value="EST">(EST)</option>
                                {/* Add other departments... */}
                            </select>
                        </div>

                        <div>
            <label htmlFor="searchChairman" className="block text-gray-700 text-sm font-semibold mb-2">Chairman</label>
            <input
                type="text"
                placeholder="Search Chairman..."
                className="w-full px-3 bg-gray-100 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={search1}
                onChange={(e) => setSearch1(e.target.value)}
                list="teacherList1"
            />
            <datalist id="teacherList1">
                {filteredTeachers.map((teacher) => (
                    <option key={teacher._id} value={teacher.name} />
                ))}
            </datalist>
        </div>

                        <div className="flex justify-center">
                            <button className="button px-4 py-2 text-dark font-semibold rounded-md" onClick={handleAddClick}>
                                Add
                            </button>
                        </div>
                    </div>

                    <hr className="border-t-4 mt-5" style={{ borderColor: '#FEDE00' }} />

                    <div className="mt-4">
                        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                            <thead>
                                <tr className="w-full bg-gray-200 text-left">
                                    <th className="py-2 px-2 border-b text-center">Dept Name</th>
                                    <th className="py-2 px-2 border-b text-center">Chairman Name</th>
                                    <th className="py-2 px-2 border-b text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignedTeachersData.length > 0 ? (
                                    assignedTeachersData.map((teacher, index) => {
                                        const departmentName = teacher.assignedDept;
                                        const isNewDepartment = index === 0 || assignedTeachersData[index - 1].assignedDept !== departmentName;

                                        return isNewDepartment ? (
                                            <tr key={teacher.id || index} className="hover:bg-gray-100">
                                                <td className="py-2 px-2 border-b text-center">{departmentName}</td>
                                                <td className="py-2 px-2 border-b text-center">
                                                    {assignedTeachersData.find(t => t.assignedPosition === "Chairman" && t.assignedDept === departmentName)?.name || ''}
                                                </td>
                                                <td className="py-2 px-2 border-b text-center">
                                                    <button 
                                                        onClick={() => handleCancelClick(departmentName)}
                                                        className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
                                                    >
                                                        Cancel
                                                    </button>
                                                </td>
                                            </tr>
                                        ) : null;
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="py-2 text-center">No assigned Committee found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminDashboard;
