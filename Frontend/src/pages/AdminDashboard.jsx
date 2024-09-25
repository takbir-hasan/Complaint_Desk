// import { useState } from 'react';
import Navbar from '../components/navbar'
import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';


function AdminDashboard() {
  const [searchDepartment, setSearchDepartment] = useState('');
  const [searchChairman, setSearchChairman] = useState('');
  const [searchTeacher, setSearchTeacher] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  



  
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

  return (
    <>
     <Helmet>
    <title> Dashboard | Admin </title>
    </Helmet> 

     <div className="flex flex-col min-h-screen bg-gray-100 text-black">
        <Navbar />
      <div className="container-fluid max-w-full mt-4 mb-4 ml-auto mr-auto mx-auto bg-white p-8 rounded-lg shadow-lg">
      <p className="text-lg mb-3 font-bold">Admin Dashboard</p>
      <hr className="border-t-4" style={{ borderColor: '#FEDE00' }} />

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 mt-4">
        <div className="col-span-1">
          <div className="mb-0">
            <label htmlFor="searchDepartment" className="block text-gray-700 text-sm font-semibold mb-2">Department</label>
            <div className="flex">
              <input 
                type="text" 
                id="searchDepartment" 
                value={searchDepartment}
                onChange={e => setSearchDepartment(e.target.value)}
                placeholder="Search Department..." 
                className="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button className="button ml-2 px-4 py-2 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Add
              </button>
            <div className="col-span-1">
                <div className="mb-0">
                    <label htmlFor="searchDepartment" className="block text-gray-700 text-sm font-semibold mb-2">Department</label>
                    <div className="flex">
                        <input
                            type="text"
                            id="searchDepartment"
                            placeholder="Search Department..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                            <span key={index} className="px-2 py-1 bg-blue-100 rounded-md mr-2">{teacher}</span>
                        ))}
                    </div>
                </div>
            </div>

        <div className="col-span-1">
          <div className="mb-0">
            <label htmlFor="searchChairman" className="block text-gray-700 text-sm font-semibold mb-2">Chairman</label>
            <div className="flex">
              <input 
                type="text" 
                id="searchChairman" 
                value={searchChairman}
                onChange={e => setSearchChairman(e.target.value)}
                placeholder="Search Chairman..." 
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button className="button ml-2 px-4 py-2 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Add
              </button>
            </div>
            <ul className={`mt-2 border border-gray-300 rounded-md ${searchChairman ? '' : 'hidden'}`}>
              {filterList(searchChairman, chairmen).map((chairman, index) => (
                <li key={index} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => setSearchChairman(chairman)}>
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
                value={searchTeacher}
                onChange={e => setSearchTeacher(e.target.value)}
                placeholder="Search Teacher..." 
                className="w-full px-3 bg-gray-100 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button className="button ml-2 px-4 py-2 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Add
              </button>
            </div>
            <ul className={`mt-2 border border-gray-300 rounded-md ${searchTeacher ? '' : 'hidden'}`}>
              {filterList(searchTeacher, teachers).map((teacher, index) => (
                <li key={index} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleSelectTeacher(teacher)}>
                  {teacher}
                </li>
              ))}
            </ul>
            <div id="selectedTeachers" className="mt-2 gap-3 mb-2">
              {displaySelectedTeachers()}
            </div>
          </div>
        </div>
      </div>

      <hr className="border-t-4 mt-5" style={{ borderColor: '#FEDE00' }} />
      <div className="mt-4 mx-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="w-full bg-gray-200 text-left">
              <th className="py-2 px-2 border-b">Dept Name</th>
              <th className="py-2 px-2 border-b">Chairman Name</th>
              <th className="py-2 px-2 border-b">Teacher Names</th>
            </tr>
          </thead>
          <tbody>
            <tr className="w-full">
              <td className="py-2 px-2 border-b" rowSpan="6">
                Computer Science and Engineering (CSE)
                <button className="button ml-2 px-4 py-2 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  Remove
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
                                className="ml-2 p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                onClick={() => handleButtonClick(row.id)} 
                              >
                              Remove
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
