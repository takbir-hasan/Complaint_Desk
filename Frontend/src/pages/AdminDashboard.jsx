// import { useState } from 'react';
import Navbar from '../components/navbar'
import { Helmet } from 'react-helmet';
import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AdminDashboard() {
 const [selectedDept, setSelectedDept] = useState('');
 const [teachers, setTeachers] = useState([]);
 const [search1, setSearch1] = useState('');
const [selectedTeachers, setSelectedTeachers] = useState([]); // for committe
const [assignedTeachersData, setAssignedTeachersData] = useState([]);


useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(`/teacher/api/getAllteacherByDeparment?dept=${selectedDept}`);
        const data = await response.json();
        setTeachers(data.teachers);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };
    fetchTeachers();
  }, [selectedDept]);



  

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/AdminProfile'); // Adjust the path as necessary
  };

  const handleLogoutRedirect = () => {
    localStorage.clear();
    window.location.href = '/AdminLogin';
    // navigate('/AdminLogin'); //Login page redirect by Logout button
  }


  //Add Committee
  const handleAddClick = async () => {

    const chairmanData = {
        name: search1,
        assignedPosition: "Chairman", 
        assignedDept: selectedDept,
    };

    const requestData = {
        chairman: chairmanData, 
        teachers: assignedData, 
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
            // throw new Error('Network response was not ok');
            throw new Error('Information may be wrong or Network response was not ok');
        }

        const data = await response.json(); 
        // console.log('Update successful:', data);
        toast.success(data.message); 
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    } catch (error) {
        console.error('Error updating data:', error);
        toast.error(error.message);
    }
};

//Fetch Assigned Committee
useEffect(() => {
    const fetchAssignedTeachers = async () => {
      try {
        const response = await fetch('/teacher/api/getAssignedTeachers');
        const data = await response.json();
        // console.log(data);
        if (data.success) {
          setAssignedTeachersData(data.assignedTeachers);
          console.log('Assigned Teachers:', data.assignedTeachers);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching assigned teachers:', error);
        // toast.error('Failed to fetch assigned teachers');
      }
    };

    fetchAssignedTeachers();
  }, []);


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
    <title> Dashboard | Admin </title>
    </Helmet> 

     <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 text-black">
        <Navbar />

       {/* Selected teachers Toast */}
       <ToastContainer/>

      <div className="container-fluid max-w-full mt-4 mb-4 ml-auto mr-auto mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-3">
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-3 sm:mt-0">
            <p className="text-lg font-bold">Admin Dashboard</p>
        </div>
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-3 sm:mt-0">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
              onClick={handleRedirect}
          >
          <span className="flex items-center">
          <FaUserCircle className="mr-2" />
            Admin Profile
          </span>
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
              onClick={handleLogoutRedirect}
          >
          <span className="flex items-center">
            <FaSignOutAlt className="mr-2" />
             Logout
          </span>
          </button>
       </div>
      </div>
      <hr className="border-t-4" style={{ borderColor: '#FEDE00' }} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
            <div className="col-span-1">
                <div className="mb-0">
                    <label htmlFor="searchDepartment" className="block text-gray-700 text-sm font-semibold mb-2">Department</label>
                    <div className="flex">
                        <select
                            placeholder="Search Department..."
                            className="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={selectedDept}
                            onChange={(e) => setSelectedDept(e.target.value)}
                        >
                             <option value="">Select Department</option>
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
                </div>
            </div>
            <div className="col-span-1">
                <div className="mb-0">
                    <label htmlFor="searchChairman" className="block text-gray-700 text-sm font-semibold mb-2">Chairman</label>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="Search Chairman..."
                            className="w-full px-3 bg-gray-100 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={search1}
                            list="teacherList1"
                            onChange={(e) => setSearch1(e.target.value)}
                        />
                        <datalist id="teacherList1">
                        {teachers.map((teacher) => (
                        <option key={teacher._id} value={teacher.name} />
                        ))}
                        </datalist>
                    </div>
                </div>
            </div>


            <div className="col-span-1 sm:col-span-3 md:col-span-3 lg:col-span-3 flex justify-center">
                <button
                    className="button px-4 py-2 text-dark font-semibold rounded-md"
                    onClick={handleAddClick} // Add onClick handler
                >
                    Add
                </button>
                <ToastContainer />
            </div>

        </div>

        <hr className="border-t-4 mt-5" style={{ borderColor: '#FEDE00' }} />
        
        <div className="mt-4 mx-auto">
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
                <td className="py-2 px-2 border-b text-center">
                    {departmentName} 
                   
                </td>
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
