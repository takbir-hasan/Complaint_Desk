import { useState } from 'react';
import Navbar from '../components/navbar'
import { Helmet } from 'react-helmet';


function AdminDashboard() {
  const [searchDepartment, setSearchDepartment] = useState('');
  const [searchChairman, setSearchChairman] = useState('');
  const [searchTeacher, setSearchTeacher] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState([]);

  const departments = ['CSE', 'EEE', 'BME', 'PHARM'];
  const chairmen = ['John Doe', 'Jane Smith', 'Michael Brown', 'Lisa Johnson'];
  const teachers = ['John Doe', 'Jane Smith', 'Galib', 'Michael Brown', 'Lisa Johnson'];

  const filterList = (input, list) => {
    return list.filter(item => item.toLowerCase().includes(input.toLowerCase()));
  };

  const handleSelectTeacher = (teacher) => {
    if (!selectedTeachers.includes(teacher)) {
      setSelectedTeachers([...selectedTeachers, teacher]);
    }
  };

  const displaySelectedTeachers = () => {
    return selectedTeachers.map((t, index) => (
      <span key={index} className="px-2 py-1 bg-blue-100 rounded-md mr-2">{t}</span>
    ));
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              <button className="button ml-2 px-4 py-2 text-dark rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                Add
              </button>
            </div>
            <ul className={`mt-2 border border-gray-300 rounded-md ${searchDepartment ? '' : 'hidden'}`}>
              {filterList(searchDepartment, departments).map((dept, index) => (
                <li key={index} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => setSearchDepartment(dept)}>
                  {dept}
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
                value={searchChairman}
                onChange={e => setSearchChairman(e.target.value)}
                placeholder="Search Chairman..." 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
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
                </button>
              </td>
              <td className="py-2 px-2 border-b" rowSpan="6">Syed Md. Galib</td>
              <td className="py-2 px-2 border-b">Yeasir Arafat</td>
            </tr>
            <tr className="w-full">
              <td className="py-2 px-2 border-b">Jamil</td>
            </tr>
            <tr className="w-full">
              <td className="py-2 px-2 border-b">Alom Hossain</td>
            </tr>
            <tr className="w-full">
              <td className="py-2 px-2 border-b">Kamrul Islam</td>
            </tr>
            <tr className="w-full">
              <td className="py-2 px-2 border-b">Jubayer</td>
            </tr>
            <tr className="w-full">
              <td className="py-2 px-2 border-b"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </>
  );
}

export default AdminDashboard;
