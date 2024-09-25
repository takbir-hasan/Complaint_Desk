// import { useState } from 'react';
import Navbar from '../components/navbar'
import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';


function AdminDashboard() {
  const [searchDepartment, setSearchDepartment] = useState('');
  const [searchChairman, setSearchChairman] = useState('');
  const [searchTeacher, setSearchTeacher] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);




  // Fetch feedback data from the API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('/feedback/getFeedback');
        const data = await response.json();
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            
        setFeedbacks(sortedData);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    };
    fetchFeedbacks();
  }, []);


   // Helper function to get the first 10 words
   const getFirst10Words = (text) => {
    return text.split(' ').slice(0, 10).join(' ') + (text.split(' ').length > 10 ? '...' : '');
  };

  const handleSeeMoreClick = (feedback) => {
    setSelectedFeedback(feedback);
    setModalOpen(true);
  };


  const indexOfLastFeedback = currentPage * itemsPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - itemsPerPage;
  const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);
  const totalPages = Math.ceil(feedbacks.length / itemsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(feedbacks.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (number) => {
    setCurrentPage(number);
  };




  
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
                className="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
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


      {/* Feedback Showing */}
      <hr className="mt-5 border-t-4" style={{ borderColor: '#FEDE00' }}/>
      <p className="mt-3 text-lg mb-3 font-bold text-center">User Feedback</p>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {currentFeedbacks.map(feedback => (
        <div key={feedback._id} className="bg-white shadow rounded-lg p-6">
          <p className="mb-2 mt-2 text-gray-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3M16 7V3M4 11h16M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="text-[12px]">{new Date(feedback.date).toLocaleDateString()}</span>
          </p>
          <p className="mb-2 mt-2 text-gray-700">{getFirst10Words(feedback.complaint)}</p>
          <div className="text-right">
              <button 
                    className="button-feedback" 
                    onClick={() => handleSeeMoreClick(feedback)}
                  >
                    <i className="animation"></i>See more<i className="animation"></i>
              </button>          
          </div>
        </div>
      ))} 
      </div>


      {/* Pagination */}
      <div className="mt-5 flex justify-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <button 
                key={index + 1} 
                onClick={() => handleClick(index + 1)} 
                className={`mx-2 border p-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}
              >
                {index + 1}
              </button>
            ))}
      </div>

      {/* Modal */}
      {isModalOpen && selectedFeedback && (
        <div className="fixed inset-0 z-50 flex items-center  justify-center bg-black bg-opacity-50">
         <div className="bg-white p-5 ml-4 mr-4 rounded-lg shadow-lg">
         <p className="mt-3 text-lg mb-3 font-bold text-center">Feedback Details</p>
         <hr className="border-t-4 mb-2" style={{ borderColor: '#FEDE00' }} />
            <p class="text-justify">{selectedFeedback.complaint}</p>
            <button 
              className="mt-4 bg-red-500 text-white rounded px-4 py-2" 
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    
    </div>
    </>
  );
}

export default AdminDashboard;
