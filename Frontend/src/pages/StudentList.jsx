import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(17);
  const [searchId, setSearchId] = useState('');
  
  const deptname = localStorage.getItem('assignedDept'); 
  const token = localStorage.getItem('teacherToken');
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`/student/api/getStudentsByDept/${deptname}`,{
          headers: {
            'Authorization': `Bearer ${token}`, // Add Authorization header
        },
        }); 
        if (response.data.length) {
            setStudents(response.data.reverse());
          } else {
            toast.success('No students found'); 
          }
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);


   // Calculate the indexes for the current page
   const indexOfLastStudent = currentPage * studentsPerPage;
   const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

   // Filter students based on search input
  const filteredStudents = students.filter(student => 
    student.id.toString().includes(searchId) // Check if student ID includes the search string
  );


  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

 
   // Change page
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle next and previous buttons
    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredStudents.length / studentsPerPage)) {
        setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

  const handleDetailsClick = (student) => {
    setSelectedStudent(student); // Set the selected student
  };

  const closeModal = () => {
    setSelectedStudent(null); // Close the modal by setting the selected student to null
  };

  //Handle verify
  const handleVerifyClick = async (studentId) => {
    try {
      const response = await axios.put(`/student/api/updateStudentStatusById/${studentId}`, {
        status: "verified",
      },{
        headers: {
          'Authorization': `Bearer ${token}`, // Add Authorization header
      },
      });
      if (response.status === 200) {
        // Update students state to reflect the change
        setStudents((prevStudents) => 
          prevStudents.map(student => 
            student.id === studentId ? { ...student, status: "verified" } : student
          )
        );
        // window.location.reload();
        toast.success('Student verified successfully');
      } else {
        toast.error("Failed to verify student.");
      }
    } catch (error) {
      console.error("Error verifying student:", error);
      toast.error("Error verifying student.");
    }
  };

  // Handle delete
  const handleDeleteClick = async (studentId) => {
    try {
      await axios.delete(`/student/api/deleteStudentById/${studentId}`,{
        headers: {
          'Authorization': `Bearer ${token}`, // Add Authorization header
      },
      });
      setStudents((prevStudents) => prevStudents.filter(student => student.id !== studentId)); // Remove deleted student from state
      toast.success("Student deleted successfully");
    } catch (error) {
      console.error("Error deleting student:", error);
      toast.error("Failed to delete student.");
    }
  };

  const handleBackClick = () => {
    window.history.back(); 
  };

  return (
    <>
      <Helmet>
        <title>Student List</title>
      </Helmet>
      <div className="flex flex-col min-h-screen bg-gray-100 text-black">
        <Navbar />
        <div className="container mx-auto max-w-7xl mt-4 mb-4 bg-white p-8 rounded-lg shadow-lg sm:p-4 md:p-6 lg:p-8">
          <h1 className="text-2xl text-center font-bold mb-1">Student List</h1>
          <div className="flex items-center justify-between mb-2">
              <p style={{ fontSize: "13px" }} className="mb-1 text-left font-bold">
                Student list for "<span className="text-green-500">{deptname}</span>" Department
              </p>
              <button
                onClick={handleBackClick}
                className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                <FaArrowLeft className="mr-1" /> 
                Back
              </button>
          </div>
          <hr className="border-t-4" style={{ borderColor: "#FEDE00" }} />

           {/* Search input */}
           <div className="mb-4 mt-4">
            <input
              type="text"
              placeholder="Search by Student ID"
              value={searchId}
              onChange={(e) => {
                setSearchId(e.target.value);
                setCurrentPage(1); // Reset to the first page when searching
              }}
              className="border p-2 bg-gray-100 rounded w-full " style={{ borderColor: "#FEDE00" }}
            />
          </div>
          
          {loading ? (
            <p className='loader-verify'></p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full mt-4 border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="py-2 px-4 border">StudentId</th>
                      <th className="py-2 px-4 border">Name</th>
                      <th className="py-2 px-4 border">Verify</th>
                      <th className="py-2 px-4 border">Delete</th>
                      <th className="py-2 px-4 border">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-100 text-center">
                        <td className="py-2 px-4 border">{student.id}</td>
                        <td className="py-2 px-4 border">{student.name}</td>
                        <td className="py-2 px-4 border">
                            <button
                                className={`py-2 px-3 rounded ${student.status === "verified" ? "bg-gray-400" : (student.status === "Email is not verified" ? "bg-red-600 text-white" : "bg-green-600 text-white")}`}
                                onClick={() => handleVerifyClick(student.id)}
                                disabled={student.status === "verified" || student.status === "Email is not verified"} // Disable if already verified
                                >
                               {student.status === "verified" ? "Verified" : (student.status === "Email is not verified" ? "Verify Email" : "Verify")}
                              {/* Condition changed */}
                            </button>
                        </td>
                        <td className="py-2 px-4 border">
                            <button 
                                className="bg-red-600 text-white py-2 px-3 rounded"
                                onClick={() => handleDeleteClick(student.id)} // Call handleDeleteClick on click
                                >
                                Delete
                            </button>
                        </td>
                        <td className="py-2 px-4 border">
                          <button
                            onClick={() => handleDetailsClick(student)}
                            className="button"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
               {/* Pagination controls */}
              <div className="flex justify-center mt-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-2 mx-1 ${currentPage === 1 ? 'bg-gray-300' : 'bg-sky-500'} rounded`}
                >
                  Previous
                </button>
                <span className="px-3 py-2 mx-1">
                  Page {currentPage} of {Math.ceil(students.length / studentsPerPage)}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === Math.ceil(students.length / studentsPerPage)}
                  className={`px-3 py-2 mx-1 ${currentPage === Math.ceil(students.length / studentsPerPage) ? 'bg-gray-300' : 'bg-indigo-600 text-white'} rounded`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
        <ToastContainer />
      </div>

      {/* Modal for displaying student details */}
      {selectedStudent && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h2 className="text-xl font-bold mb-1 text-black text-center">Student Details</h2>
            <hr className="border-t-4" style={{ borderColor: "#FEDE00" }} />
            <div className="flex justify-center mb-3 mt-3"> {/* Flex container for centering the image */}
              <img 
                src={selectedStudent.profilePhoto} // Assuming the profile picture URL is in this field
                alt={`${selectedStudent.name}'s profile`}
                className="w-24 h-24 rounded-full profile-image" // Centered image with rounded corners
              />
            </div>
            <p className='text-center mb-3 text-black'><strong>Name:</strong> {selectedStudent.name}</p>
            <p className='text-black'><strong>Student ID:</strong> {selectedStudent.id}</p>
            <p className='text-black'> <strong>Session:  </strong>{selectedStudent.session} </p>
            <p className='text-black'> <strong>Email:  </strong>{selectedStudent.email} </p>
            <p className='text-black'> <strong>Mobile:  </strong>{selectedStudent.phone} </p>
            <div className="mt-4 text-center">
              <button
                onClick={closeModal}
                className="bg-red-600 text-white py-2 px-4 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentList;
