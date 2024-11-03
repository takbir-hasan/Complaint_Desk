import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

function TeacherPage() {
  const [teachers, setTeachers] = useState([]);
  const [statusMessage, setStatusMessage] = useState('');
  const [textColor, setTextColor] = useState('black');
  const [selectedTeacher, setSelectedTeacher] = useState(null); // State to hold the selected teacher for the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [loading, setLoading] = useState(true); // State to manage loading
  const [verifiedStatus, setVerifiedStatus] = useState({});; // State to track verification
  const [error, setError] = useState(null);
  const department = localStorage.getItem('assignedDept');

  const token = localStorage.getItem('teacherToken');  

  useEffect(() => {
    const department = localStorage.getItem('assignedDept');
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/teacher/api/getAllteacherByDeparment/${department}`,{
          headers: {
            'Authorization': `Bearer ${token}`, // Add Authorization header
        },
        }); // Corrected URL
        
        setTeachers(response.data);
      
      } catch (err) {
        setError('Error fetching teacher data');
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);
  if (error) return <p>{error}</p>;

 
  


//   //Handle Verify Teacher
//   const handleVerifyTeacher = (teacherId, currentStatus) => {
//     // Check if the current status is already 'verified'
//     if (currentStatus === 'verified') {
//         toast.info('This teacher is already verified.');
//         return;
//     }

//     // Update the status to 'verified'
//     axios.put(`/teacher/api/verifyTeacherById/${teacherId}`,
//       {
//         status: "verified",
//     }, {
//       headers: {
//         'Authorization': `Bearer ${token}`, // Add Authorization header
//     },
//     }, 
//     )
//     .then((response) => {
//         console.log(response.data);
//         const updatedTeachers = teachers.map((teacher) => {
//             if (teacher._id === teacherId) {
//                 return { 
//                     ...teacher, 
//                     status: 'verified' // Update the status to 'verified'
//                 };
//             }
//             return teacher;
//         });

//         setTeachers(updatedTeachers); // Update the state with the new list of teachers
//         toast.success('Teacher verified successfully');
//     })
//     .catch((error) => {
//         console.error('Error verifying teacher:', error);
//         toast.error('Failed to verify teacher');
//     });
// };


const handleVerifyTeacher = async (teacherId, currentStatus) => {
  // Check if the current status is already 'verified'
  if (currentStatus === 'verified') {
      toast.info('This teacher is already verified.');
      return;
  }

  try {
      // Update the status to 'verified'
      const response = await axios.put(`/teacher/api/verifyTeacherById/${teacherId}`, {
          status: "verified",
      }, {
          headers: {
              'Authorization': `Bearer ${token}`, // Add Authorization header
          },
      });

      // console.log(response.data);

      // Update the teachers list with the new status
      const updatedTeachers = teachers.map((teacher) => {
          if (teacher._id === teacherId) {
              return { 
                  ...teacher, 
                  status: 'verified' // Update the status to 'verified'
              };
          }
          return teacher;
      });

      setTeachers(updatedTeachers); // Update the state with the new list of teachers
      toast.success('Teacher verified successfully');
  } catch (error) {
      console.error('Error verifying teacher:', error);
      toast.error('Failed to verify teacher');
  }
};



// //Handel AssignPostion
// const handleAssignCommittee = (teacherId, isAssigned) => {
//   const assignedDept = localStorage.getItem('assignedDept'); // This can be dynamically set if needed

//   const assignedPosition = isAssigned ? 'NotAssigned' : 'Committee'; // Set the assigned position based on current state

//   axios.put(`/teacher/api/updateAssignedCommitteeTeacherById/${teacherId}`, {
//     headers: {
//       'Authorization': `Bearer ${token}`, // Add Authorization header
//   },
//   },
//    {
//       assignedPosition,
//       assignedDept: isAssigned ? 'NotAssigned' : assignedDept, // Update department accordingly
//   })
//   .then((response) => {
//       console.log(response.data);
//       const updatedTeachers = teachers.map((teacher) => {
//           if (teacher._id === teacherId) {
//               return { 
//                   ...teacher, 
//                   assigned: !isAssigned, // Toggle assigned state
//                   assignedPosition  // Update assignedPosition here
//               };
//           }
//           return teacher;
//       });

//       setTeachers(updatedTeachers); // Update the state with the new list of teachers
//       toast.success(`Teacher ${isAssigned ? 'unassigned' : 'assigned'} from committee successfully`);
//   })
//   .catch((error) => {
//       console.error('Error updating teacher:', error);
//       toast.error(`Failed to ${isAssigned ? 'unassign' : 'assign'} teacher to committee`);
//   });
// };

const handleAssignCommittee = async (teacherId, isAssigned) => {
  const assignedDept = localStorage.getItem('assignedDept'); // This can be dynamically set if needed
  const assignedPosition = isAssigned ? 'NotAssigned' : 'Committee'; // Set the assigned position based on current state

  try {
    const response = await axios.put(
      `/teacher/api/updateAssignedCommitteeTeacherById/${teacherId}`,
      {
        assignedPosition,
        assignedDept: isAssigned ? 'NotAssigned' : assignedDept, // Update department accordingly
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`, // Add Authorization header
        },
      }
    );

    console.log(response.data);

    const updatedTeachers = teachers.map((teacher) => {
      if (teacher._id === teacherId) {
        return { 
          ...teacher, 
          assigned: !isAssigned, // Toggle assigned state
          assignedPosition, // Update assignedPosition here
        };
      }
      return teacher;
    });

    setTeachers(updatedTeachers); // Update the state with the new list of teachers
    toast.success(`Teacher ${isAssigned ? 'unassigned' : 'assigned'} from committee successfully`);
  } catch (error) {
    console.error('Error updating teacher:', error);
    toast.error(`Failed to ${isAssigned ? 'unassign' : 'assign'} teacher to committee`);
  }
};





//Handle Delete

  const handleDelete = async (teacherId) => {
    try {
      // Send the delete request with the teacherId in the URL
      const response = await axios.delete(`/teacher/api/teacherDeleteById/${teacherId}`,{
        headers: {
          'Authorization': `Bearer ${token}`, // Add Authorization header
      },
      });
  
      // Check if the deletion was successful
      if (response.status === 200) {
        toast.success("Teacher deleted successfully");
        setTeachers(teachers.filter((teacher) => teacher._id !== teacherId));
      } else {
        toast.error("Failed to delete teacher");
      }
    } catch (error) {
      console.error("Error deleting teacher:", error);
      toast.error("An error occurred while deleting the teacher");
    }
  };
  
  

  const openModal = (teacher) => {
    setSelectedTeacher(teacher); // Set the selected teacher data
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedTeacher(null); // Clear selected teacher data
  };

  const handleBackClick = () => {
    window.history.back(); 
  };

  return (
    <>
      <Helmet>
        <title>Teacher List</title>
      </Helmet>

      {/* Toast Notify */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />

      <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 text-black">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded text-center shadow-lg w-full max-w-7xl">
            <h2 className="font-bold text-2xl md:text-3xl mb-3">Teacher List</h2>
            <div className="flex items-center justify-between mb-2">
                <p className='text-left'>Teacher List for "<span className='text-green-600 font-semibold'>{department} </span>"</p>
                <button
                  onClick={handleBackClick}
                  className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  <FaArrowLeft className="mr-1" /> 
                  Back
                </button>
            </div>
            <hr className="border-t-4" style={{ borderColor: '#FEDE00' }} />

            {statusMessage && <p style={{ color: textColor }}>{statusMessage}</p>}

            {loading ? ( // Show loader or message while loading
              <p className="loader-verify"></p>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="min-w-full bg-white border border-gray-200">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Name</th>
                      <th className="py-2 px-4 border-b">Verified</th>
                      <th className="py-2 px-4 border-b">Assign Committee</th>
                      <th className="py-2 px-4 border-b">Delete</th>
                      <th className="py-2 px-4 border-b">Details</th> {/* New Details column */}
                    </tr>
                  </thead>
                  <tbody>
                 
                      {teachers.map((teacher) => (
                          <tr key={teacher.id}>
                            <td className="py-2 px-4 border-b">{teacher.name}</td>
                            <td className="py-2 px-4 border-b">
                              <button 
                                  className={`py-2 px-3 rounded text-white ${teacher.status === "verified" ? "bg-gray-400" : (teacher.status === "Email is not verified" ? "bg-red-600 text-white" : "bg-green-600 text-white")}`}
                                  onClick={() => handleVerifyTeacher(teacher._id, teacher.status)}
                                  disabled={teacher.status === 'verified' || teacher.status === "Email is not verified"}
                                    >
                                {teacher.status === "verified" ? "Verified" : (teacher.status === "Email is not verified" ? "Verify Email" : "Verify")}
                              </button>
                            </td>
                            <td className="py-2 px-4 border-b">
                              <button 
                                  className={`py-2 px-3 rounded text-white ${teacher.assignedPosition === 'Committee' ? 'bg-red-600 hover:bg-red-700' : (teacher.status === "Email is not verified" ? "bg-gray-400" : 'bg-blue-600 hover:bg-blue-700') }`}
                                  onClick={() => handleAssignCommittee(teacher._id, teacher.assignedPosition === 'Committee')}
                                  disabled={teacher.status === "Email is not verified"}
                                  >
                                  {teacher.assignedPosition === 'Committee' ? 'Cancel' : 'Assign'}

                              </button>

                            </td>
                            <td className="py-2 px-4 border-b">
                              <button
                                  className="bg-red-600 text-white py-2 px-3 rounded hover:bg-red-700"
                                  onClick={() => handleDelete(teacher._id)} 
                                    >
                                  Delete
                              </button>
                            </td>
                            <td className="py-2 px-4 border-b">
                              <button
                                  className="button"
                                  onClick={() => openModal(teacher)}
                                >
                                  Details
                              </button>
                            </td>
                          </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {teachers.length === 0 && !loading && ( // Adjusted for loading state
              <p className="mt-4 text-gray-600">No teachers found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for displaying teacher details */}
      {isModalOpen && selectedTeacher && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="font-bold text-2xl md:text-3xl mb-1 text-black text-center">Teacher Details</h2>
            <hr className="border-t-4" style={{ borderColor: '#FEDE00' }} />
            <div className="flex justify-center mb-4 mt-3"> {/* Flex container for centering the image */}
              <img 
                src={selectedTeacher.profilePhoto} // Assuming the profile picture URL is in this field
                alt={`${selectedTeacher.name}'s profile`}
                className="w-24 h-24 rounded-full profile-image" // Centered image with rounded corners
              />
            </div>
            <h3 className="text-xl font-bold mb-4 text-center text-black">{selectedTeacher.name}</h3>
            <p className='text-black'><strong>Department:</strong> <span className='text-lime-700 text-black'>{selectedTeacher.dept}</span></p>
            <p className='text-black'><strong>Designation:</strong> {selectedTeacher.designation}</p>
            <p className='text-black'><strong>Mobile:</strong> {selectedTeacher.phone}</p>
            <p className='text-black'><strong>Email:</strong> {selectedTeacher.email}</p> {/* Add more fields as necessary */}
            <div className="flex justify-center mt-4"> {/* Flex container for centering the button */}
              <button
                className="bg-red-500 text-white py-1 px-2 rounded"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TeacherPage;
