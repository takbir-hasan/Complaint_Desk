import Navbar from '../components/navbar'
import { Helmet } from 'react-helmet';
import React, { useEffect, useState } from 'react';


function AdminProfile() {

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
  return (
    <>
    <Helmet>
    <title> Profile | Admin </title>
    </Helmet> 

     <div className="flex flex-col min-h-screen bg-gray-100 text-black">
        <Navbar />
      <div className="container-fluid max-w-5xl mt-4 mb-4 ml-auto mr-auto mx-auto bg-white p-8 rounded-lg shadow-lg">
      <p className="text-lg mb-3 font-bold">Admin Profile</p>
      <hr className="border-t-4" style={{ borderColor: '#FEDE00' }} />
      <p className="text-gray-600 mb-5 text-2xl mt-5 text-center">
      Welcome to the admin profile page. Here, you can change your password and view feedback.</p>
      <p className="text-md mb-0 text-center">Change Password</p>
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <input
          type="text"
          placeholder="Enter New Password"
          className="input input-bordered w-full max-w-xs mb-4 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
       />

      <button type="submit" className="button  text-black w-full max-w-xs mb-4">
        Update
      </button>
      </div>

      <hr className="border-t-4" style={{ borderColor: '#FEDE00' }} />
      
      
      {/* Feedback Showing */}
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

export default AdminProfile;
