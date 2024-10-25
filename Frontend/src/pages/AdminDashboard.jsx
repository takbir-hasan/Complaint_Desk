import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Navbar from '../components/navbar';
import { FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function AdminDashboard() {
    const [selectedDept, setSelectedDept] = useState('');
    const [search1, setSearch1] = useState('');
    const [teachers, setTeachers] = useState([]); // Initialize as an empty array
    const [assignedTeachersData, setAssignedTeachersData] = useState([]); // Initialize as an empty array
    const [filteredTeachers, setFilteredTeachers] = useState([]);

    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        const fetchTeachers = async () => {
            if (selectedDept) {
                try {
                    const response = await axios.get(`/teacher/names/${selectedDept}`,{
                        headers: {
                            'Authorization': `Bearer ${token}`, // Add Authorization header
                        },
                    });
                    // const result = await response.json();
                    setTeachers(response.data); // Ensure it defaults to an empty array
                } catch (error) {
                    console.error('Error fetching teachers:', error);
                }
            }
        };
        fetchTeachers();
    }, [selectedDept]);


   
    // Filter teachers based on search input
    useEffect(() => {
        setFilteredTeachers(
            teachers.filter((teacher) =>
                teacher.name.toLowerCase().includes(search1.toLowerCase())
            )
        );
    }, [search1]);


    useEffect(() => {
        const fetchAssignedTeachers = async () => {
            try {
                const response = await fetch('/teacher/api/getAssignedTeachers',{
                    headers: {
                        'Authorization': `Bearer ${token}`, // Add Authorization header
                    },
                });
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
    

    const handleRedirect = () => navigate('/AdminProfile');
    
    const handleLogoutRedirect = () => {
        localStorage.clear();
        window.location.href = '/AdminLogin';
    };

    const handleAddClick = async () => {
       
        if (!selectedDept || !search1) {
            toast.error("Please select a department and enter a chairman's name.");
            return; 
        }

        const chairmanData = {
            name: search1,
            assignedPosition: "Chairman",
            assignedDept: selectedDept,
        };

         // Check if a chairman is already assigned for the selected department
    const isChairmanAssigned = assignedTeachersData.some(teacher => teacher.assignedDept === selectedDept && teacher.assignedPosition === 'Chairman');

    if (isChairmanAssigned) {
        toast.error("Chairman already assigned for this department.");
        return;
    }



        const requestData = {
            chairman: chairmanData,
            teachers: assignedTeachersData,
        };



        try {
            const response = await fetch('/teacher/api/updatePosition', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Add Authorization header
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
                headers: 
                {   
                    'Content-Type': 'application/json' ,
                    'Authorization': `Bearer ${token}`, // Add Authorization header
                },
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
                            <div className='flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-3 sm:mt-0'>
                            <p className="text-lg font-bold">Admin Dashboard</p>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-3 sm:mt-0">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
                                onClick={handleRedirect}
                            >
                            <span className="flex items-center justify-center">
                                <FaUserCircle className="mr-2" />
                                Admin Profile
                            </span>
                            </button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
                                onClick={handleLogoutRedirect}
                            >
                            <span className="flex items-center justify-center">
                                <FaSignOutAlt className="mr-2" />
                                Logout
                            </span>
                            </button>
                        </div>
                        </div>

                    <hr className="border-t-4" style={{ borderColor: '#FEDE00' }} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label htmlFor="searchDepartment" className="block text-gray-700 text-sm font-semibold mb-2">Department</label>
                            <select required
                                className="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                value={selectedDept}
                                onChange={(e) => setSelectedDept(e.target.value)}
                            >
                                <option value="" disabled>Select Department</option>
                                <option value="CSE">Computer Science and Engineering (CSE)</option>
                                <option value="EEE">Electrical and Electronic Engineering (EEE)</option>
                                <option value="BME">Biomedical Engineering (BME)</option>
                                <option value="PHARM">Pharmacy (PHARM)</option>
                                <option value="ChE">Chemical Engineering (ChE)</option>
                                <option value="IPE">Industrial and Production Engineering (IPE)</option>
                                <option value="PME">Petroleum and Mining Engineering (PME)</option>
                                <option value="TE">Textile Engineering (TE)</option>
                                <option value="APPT">Agro Product Processing Technology (APPT)</option>
                                <option value="CDM">Climate and Disaster Management (CDM)</option>
                                <option value="EST">Environmental Science and Technology (EST)</option>
                                <option value="NFT">Nutrition and Food Technology (NFT)</option>
                                <option value="BMB">Biochemistry and Molecular Biology (BMB)</option>
                                <option value="FMB">Fisheries and Marine Bioscience (FMB)</option>
                                <option value="GEBT">Genetic Engineering and Biotechnology (GEBT)</option>
                                <option value="MB">Microbiology (MB)</option>
                                <option value="NHS">Nursing and Health Science (NHS)</option>
                                <option value="PESS">Physical Education and Sports Science (PESS)</option>
                                <option value="PTR">Physiotherapy and Rehabilitation (PTR)</option>
                                <option value="ENGLISH">English</option>
                                <option value="STATISTICS">Applied Statistics</option>
                                <option value="CHE">Chemistry</option>
                                <option value="MATH">Mathematics</option>
                                <option value="PHY">Physics</option>
                                <option value="AIS">Accounting and Information Systems (AIS)</option>
                                <option value="FB">Finance and Banking (FB)</option>
                                <option value="MANAGEMENT">Management</option>
                                <option value="MARKETING">Marketing</option>
                
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
                                required
                            />
                            <datalist id="teacherList1">
                                {filteredTeachers.map((teacher) => (
                                    <option key={teacher._id} value={teacher.name} />
                                ))}
                            </datalist>
                        </div>
    
                    </div>

                    <div className="flex justify-center items-center mt-4">
                            <button className="button px-4 py-2 text-dark font-semibold rounded-md" onClick={handleAddClick}>
                                Add
                            </button>
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
