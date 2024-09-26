// import { useState } from 'react';
import Navbar from '../components/navbar'
import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';

function AdminDashboard() {
  const [searchDepartment, setSearchDepartment] = useState('');
  const [searchChairman, setSearchChairman] = useState('');
  const [searchTeacher, setSearchTeacher] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/AdminProfile'); // Adjust the path as necessary
  };

  const handleLogoutRedirect = () => {
    navigate('/'); //Home page redirect by Logout button
  }



  const departments = [
    { name: 'Computer Science & Engineering (CSE)', value: 'CSE' },
    { name: 'Electrical & Electronic Engineering (EEE)', value: 'EEE' },
    { name: 'Biomedical Engineering (BME)', value: 'BME' },
    { name: 'Pharmacy (PHARM)', value: 'PHARM' },
];

const chairmen = [
    'John Doe',
    'Jane Smith',
    'Michael Brown',
    'Lisa Johnson'
];

const teachers = [
    'John Doe',
    'Jane Smith',
    'Galib',
    'Michael Brown',
    'Lisa Johnson'
];

const [tableData, setTableData] = useState([]);

const filterItems = (list, search) => {
    return list.filter(item => item.toLowerCase().includes(search.toLowerCase()));
};

const selectTeacher = (teacher) => {
    if (selectedTeachers.length < 5 && !selectedTeachers.includes(teacher)) {
        setSelectedTeachers([...selectedTeachers, teacher]);
    } else {
        alert("You can only add up to 5 teachers.");
    }
};

const addToTable = () => {
    const departmentValue = searchDepartment;
    const chairmanValue = searchChairman;
    if (departmentValue && chairmanValue && selectedTeachers.length) {
        setTableData([
            ...tableData,
            {
                department: departmentValue,
                chairman: chairmanValue,
                teachers: selectedTeachers
            }
        ]);

        // Clear selections
        setSearchDepartment('');
        setSearchChairman('');
        setSelectedTeachers([]);
        setSearchTeacher('');
    }
};

const removeTeacher = (teacherToRemove) => {
    setSelectedTeachers(prevTeachers => 
        prevTeachers.filter(teacher => teacher !== teacherToRemove)
    );
};


  return (
    <>
     <Helmet>
    <title> Dashboard | Admin </title>
    </Helmet> 

     <div className="flex flex-col min-h-screen bg-gray-100 text-black">
        <Navbar />
      <div className="container-fluid max-w-full mt-4 mb-4 ml-auto mr-auto mx-auto bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <p className="text-lg font-bold">Admin Dashboard</p>
        <div className="flex justify-end space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
              onClick={handleRedirect}
          >
          <span className="flex items-center">
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

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
            <div className="col-span-1">
                <div className="mb-0">
                    <label htmlFor="searchDepartment" className="block text-gray-700 text-sm font-semibold mb-2">Department</label>
                    <div className="flex">
                        <input
                            type="text"
                            id="searchDepartment"
                            placeholder="Search Department..."
                            className="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={searchDepartment}
                            onChange={e => setSearchDepartment(e.target.value)}
                        />
                    </div>
                    <ul className={`mt-2 border border-gray-300 rounded-md ${searchDepartment ? '' : 'hidden'}`}>
                        {filterItems(departments.map(d => d.name), searchDepartment).map((department, index) => (
                            <li
                                key={index}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => setSearchDepartment(departments[index].value)}
                            >
                                {department}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-span-1">
                <div className="mb-0">
                    <label htmlFor="searchChairman" className="block text-gray-700 text-sm font-semibold mb-2">Chairman</label>
                    <div className="flex">
                        <input
                            type="text"
                            id="searchChairman"
                            placeholder="Search Chairman..."
                            className="w-full px-3 bg-gray-100 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={searchChairman}
                            onChange={e => setSearchChairman(e.target.value)}
                        />
                    </div>
                    <ul className={`mt-2 border border-gray-300 rounded-md ${searchChairman ? '' : 'hidden'}`}>
                        {filterItems(chairmen, searchChairman).map((chairman, index) => (
                            <li
                                key={index}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => setSearchChairman(chairman)}
                            >
                                {chairman}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="col-span-1">
                <div className="mb-0">
                    <label htmlFor="searchTeacher" className="block text-gray-700 text-sm font-semibold mb-2">Teacher</label>
                    <div className="flex">
                        <input
                            type="text"
                            id="searchTeacher"
                            placeholder="Search Teacher..."
                            className="w-full px-3 bg-gray-100 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            value={searchTeacher}
                            onChange={e => setSearchTeacher(e.target.value)}
                        />
                    </div>
                    <ul className={`mt-2 border border-gray-300 rounded-md ${searchTeacher ? '' : 'hidden'}`}>
                        {filterItems(teachers, searchTeacher).map((teacher, index) => (
                            <li
                                key={index}
                                className="p-2 cursor-pointer hover:bg-gray-200"
                                onClick={() => selectTeacher(teacher)}
                            >
                                {teacher}
                            </li>
                        ))}
                    </ul>
                    <div id="selectedTeachers" className="mt-2 gap-3 mb-2">
                        {selectedTeachers.map((teacher, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 rounded-md mr-2 flex items-center">
                            {teacher}
                            <button
                                className="ml-2 text-red-600 hover:text-red-800 focus:outline-none"
                                onClick={() => removeTeacher(teacher)} // Call removeTeacher function
                                aria-label={`Remove ${teacher}`}
                            >
                                &times;
                            </button>
                        </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="col-span-1 sm:col-span-3 md:col-span-3 lg:col-span-3 flex justify-center">
                <button
                    className="button px-4 py-2 text-dark font-semibold rounded-md"
                    onClick={addToTable}
                >
                    Add
                </button>
            </div>
        </div>

        <hr className="border-t-4 mt-5" style={{ borderColor: '#FEDE00' }} />
        
        <div className="mt-4 mx-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                <thead>
                    <tr className="w-full bg-gray-200 text-left">
                        <th className="py-2 px-2 border-b text-center">Dept Name</th>
                        <th className="py-2 px-2 border-b text-center">Chairman Name</th>
                        <th className="py-2 px-2 border-b text-center">Teacher Names</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td className="py-2 px-2 border-b text-center">
                              {row.department} <br/>
                              <button 
                                className="ml-2 p-2 bg-red-500 text-white rounded hover:bg-red-600"
                                onClick={() => handleButtonClick(row.id)} 
                                
                              >
                                <span className="flex items-center">
                                <FaTrash className="mr-2" />
                                    Remove
                                </span>
                              </button>
                            </td>
                            <td className="py-2 px-2 border-b text-center">{row.chairman}</td>
                            <td className="py-2 px-2 border-b">
                                <ol type="1">
                                    {row.teachers.map((teacher, i) => (
                                        <li key={i}>{teacher}</li>
                                    ))}
                                </ol>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

      </div>
    
    </div>
    </>
  );
}

export default AdminDashboard;
