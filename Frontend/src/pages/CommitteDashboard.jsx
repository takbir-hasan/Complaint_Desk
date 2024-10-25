import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Helmet } from 'react-helmet';
import { FaArrowLeft } from 'react-icons/fa';

const formatDate = (date) => {
  const complaintDate = new Date(date);
  const day = String(complaintDate.getDate()).padStart(2, '0');
  const month = String(complaintDate.getMonth() + 1).padStart(2, '0');
  const year = complaintDate.getFullYear();
  let hours = complaintDate.getHours();
  const minutes = String(complaintDate.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? String(hours).padStart(2, '0') : '12';

  return `${day}-${month}-${year} Time: ${hours}:${minutes}${ampm}`;
};

const Modal = ({ isOpen, onClose, complaint }) => {
  if (!isOpen) return null;

  return (
   <>
    <Helmet>
    <title> Dashboard | Committee </title>
    </Helmet>
    
    <div className="fixed inset-0 z-50 flex items-center  justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 ml-4 mr-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-center text-black">Complaint Details</h2>
        <hr className="border-t-4" style={{ borderColor: "#FEDE00" }} />
        <p style={{ fontSize: "13px" }} className="mt-2 text-black"><strong>Token Number: </strong>
        <span className="font-semibold bg-gray-300 rounded" style={{ color: "blue", fontSize: "13px" }}>
          {complaint._id}
        </span>
        </p>
        <p style={{ fontSize: "13px",textAlign: "justify", whiteSpace: "pre-line" }} className="text-black"><strong>Details: </strong> <br/> {complaint.complaint}</p>
        <p style={{ fontSize: "13px" }} className="mt-3 text-black"><strong className='text-black'>Date: </strong>{formatDate(complaint.date)}</p>
        
        <div className= "flex justify-center items-center">
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white font-semibold py-1 px-4 rounded"
        >
          Close
        </button>
        </div>

      </div>
    </div>
   
   </>
  );
};

const ChairmanDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [solvedComplaints, setSolvedComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const deptname = localStorage.getItem('assignedDept');
  // const deptname = "EST";
  const token = localStorage.getItem('teacherToken');

  useEffect(() => {
    setLoading(true);
    fetch(`/complaint/pendingsolve/${deptname}`,{
      headers: {
        'Authorization': `Bearer ${token}`, // Add Authorization header
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const sortedComplaints = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setComplaints(sortedComplaints);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [deptname]);

  const handleMarksolve = (complaintId, event) => {
    event.preventDefault();
  
    const updatedData = {
      status: 'Solved',
    };
  
    fetch(`/complaint/solved/${complaintId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add Authorization header
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update the complaint status');
        }
        return response.json(); 
      })
      .then((updatedComplaint) => {
        const updatedComplaints = complaints.map((complaint) =>
          complaint._id === complaintId ? { ...complaint, status: 'Solved' } : complaint
        );
  
        setComplaints(updatedComplaints);
  
        const updatedSolvedComplaints = updatedComplaints.filter(
          (complaint) => complaint.status === 'Solved'
        );
        setSolvedComplaints(updatedSolvedComplaints); 
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  // State Pagination
  const [currentPage, setCurrentPage] = useState ([1]);
  const complaintsPerPage = 10;

  //Logic to calculate current complaints
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = complaints.slice(indexOfFirstComplaint, indexOfLastComplaint);

  //Logic for Pagination controls
  const totalPages = Math.ceil(complaints.length / complaintsPerPage);
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));


  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
  };

  const handleBackClick = () => {
    window.history.back(); 
  };


  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 text-black">
        <Navbar />
        <div className="container mx-auto max-w-7xl mt-4 mb-4 bg-white p-8 rounded-lg shadow-lg sm:p-4 md:p-6 lg:p-8">
        <h1 className="text-2xl text-center font-bold mb-1">Committe Dashboard</h1>
        <div className="flex items-center justify-between mb-2">
              <p style={{ fontSize: "13px" }} className="mb-1 text-left font-bold">Complaints for "<span className="text-green-500">{deptname}</span>" Department</p>
                <button
                  onClick={handleBackClick}
                  className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  <FaArrowLeft className="mr-1" /> 
                  Back
                </button>
          </div>
          <hr className="border-t-4" style={{ borderColor: "#FEDE00" }} />
          {loading && <p>Loading complaints...</p>}
          {error && <p className="text-red-500">{error.message}</p>}
          {!loading && !error && (
            <table className="table-fixed w-full text-sm mt-4 text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-0 py-2">Token Number</th>
                  <th className="px-0 py-2">Mark Solve</th>
                  <th className="px-0 py-2">Details</th>
                </tr>
              </thead>
              <tbody>
                {currentComplaints.map((complaint) => (
                  <tr key={complaint._id}>
                    <td className="border px-0 py-2 mb-0">
                      <span className="font-semibold bg-gray-300 rounded text-xs sm:text-sm md:text-base responsive-font" style={{ color: "blue"}}>
                        {complaint._id}
                      </span>
                      <br />
                      <span style={{ fontSize: "10px" }}>
                        <i className="fa-solid fa-calendar-days"></i> {formatDate(complaint.date)}
                      </span>
                    </td>
                    <td className="border px-0 py-2">
                    <button
                        style={{ fontSize: '10px' }}
                        className={`${
                          complaint.status === 'Solved' ? 'bg-yellow-300' : 'bg-green-400'
                        } hover:bg-yellow-300 text-dark font-semibold py-1 px-2 rounded`}
                        onClick={(event) => handleMarksolve(complaint._id, event)}
                        >
                        {complaint.status === 'Solved' ? 'Solved' : 'Mark Solve'}
                      </button>
                    </td>
                    <td className="border px-0 py-2">
                      <button style={{ fontSize: "10px", padding: "4px 8px" }} onClick={() => openModal(complaint)} className="button text-dark font-semibold py-1 mt-2 px-2 rounded">
                        See Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
            {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Previous
              </button>
              <span className="px-4 py-2 mx-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Next
              </button>
            </div>
          </div>

      </div>
      <Modal isOpen={!!selectedComplaint} onClose={closeModal} complaint={selectedComplaint} />
    </>
  );
};

export default ChairmanDashboard;
