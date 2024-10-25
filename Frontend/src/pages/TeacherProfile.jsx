import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherProfile = () => {
  const [formData, setFormData] = useState({
    dept: '',
    designation: '',
    phone: '',
    profilePhoto: null,
  });
  const [errorMessage, setErrorMessage] = useState("");


  const [teacher, setTeacher] = useState(null);
  const [Status, setStatus] = useState(null); // Define Status here
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('teacherToken');

  useEffect(() => {
    const fetchData = async () => {
      const email = localStorage.getItem('temail');
        try {
          const response = await fetch(`/teacher/${email}`, {
            headers: {
              'Authorization': `Bearer ${token}`, // Add Authorization header
          },
          });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            // console.log(data); 
            setTeacher(data.teacher);
            setStatus(data.teacher.assignedPosition);
            // console.log(data.teacher.status);
            localStorage.setItem('assignedDept', data.teacher.assignedDept);
            localStorage.setItem('assignedPosition', data.teacher.assignedPosition);
           
  const refreshKey = 'teacherProfileRefreshed';
  const hasRefreshed = localStorage.getItem(refreshKey);

  if (!hasRefreshed) {
    // Refresh the page once
    localStorage.setItem(refreshKey, 'true');
    window.location.reload();
  } else {
    // Clear the key after the refresh to allow future refreshes
    localStorage.removeItem(refreshKey);
  }

            // Set a timeout for 2 seconds before stopping the loading state
            setTimeout(() => {
              setLoading(false);
            }, 1000);
        } catch (error) {
            console.error('Error fetching teacher data:', error);
            setLoading(false); // Set loading to false even if there's an error
          }
    };

    fetchData();
}, []);

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

//Redirect Chairman
const handleDashboardClick = () => {
  console.log('Button clicked. Status:', Status); // Check button click and status
 if (Status === 'Chairman') {
      navigate('/ChairmanDashboard'); 
  }
  if(Status === "Committee")
  {
    navigate('/ChairmanDashboard'); // changed from '/CommitteDashboard' to '/ChairmanDashboard'
  }
};

const handleStudentListClick = () => {
  
  if (Status === 'Chairman') {
    navigate('/StudentList');
  }
};

const handleTeacherListClick = () => {
  if (Status === 'Chairman') {
    navigate('/TeacherPage');
  }
};
  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    // Handle file upload (if applicable)
    if (files) {
      const file = files[0];
      if (file.size > 2 * 1024 * 1024) {
        alert('File size should not exceed 2MB');
        return; // Exit if file size is too large
      }
      setFormData({
        ...formData,
        [name]: file,
      });
    } else {
      // Handle regular input changes
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  //Update Profile Info
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = localStorage.getItem('temail');
      let base64Photo = null;
      if (formData.profilePhoto) {
        base64Photo = await convertToBase64(formData.profilePhoto);
      }
      if(!validatePhone(formData.phone)) {
        alert('Invalid phone number format');
        return;
      }

      const response = await fetch(`/teacher/api/updateTeacherProfile/${email}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`, // Add Authorization header
         },
        body: JSON.stringify({ ...formData, profilePhoto: base64Photo }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // console.log(data);
      toast.success('Profile updated successfully!');
      window.location.reload();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile, please try again.'); // Use toast for error messages
    }
  };
  
  const validatePhone = (phone) => {
    // Adjust this regex based on your phone number format requirements (e.g., country code, etc.)
    const phoneRegex = /^(01|\+8801)[3-9]\d{8}$/;
        return phoneRegex.test(phone);
      };

  

  //Logout
  const handleLogoutRedirect = () => {
    localStorage.clear();
    // navigate('/login'); //Home page redirect by Logout button
    window.location.href = '/login';
  }



  return (
    <>
      <Helmet>
    <title> Profile | Teacher </title>
    </Helmet>

    <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 text-black">
       <Navbar />

      {/* Toast Notify */}
      <ToastContainer autoClose={3000} position="top-right" />

    <div className="container-fluid max-w-4xl mx-auto mt-4 mb-4 bg-white p-8 rounded-lg shadow-lg">
    <div className="flex flex-col sm:flex-row justify-between items-center mb-3">
      <p className="text-lg mb-3 font-bold">Teacher Profile</p>
      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-3 sm:mt-0">
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
      {loading ? (
        <div className="loader-verify"></div> // Display loader while loading
      ) : teacher && (
            <>
                <div className="p-4 text-center">
                    <img
                        className="mx-auto rounded-full profile-image"
                        src={teacher.profilePhoto || ''}
                        alt="Teacher"
                    />
                </div>
                <div className="text-center mb-3">
                    <span className="font-semibold">Department: </span> {teacher.dept}
                </div>

                {Status === 'Committee' && (
                        <div className="grid mb-2 gap-1">
                            <div className="bg-gray-200 p-4 text-center">
                                <span className="loader font-semibold text-xs">
                                    You are assigned to Complaint Committee <span className="dot"></span>
                                    <br />
                                </span>
                                <div className="flex flex-col sm:flex-row justify-center items-center mt-2 space-y-2 sm:space-y-0 sm:space-x-2">
                                  <button className="mt-2 bg-blue-500 text-white px-2 py-1 rounded" onClick={handleDashboardClick}>
                                      Dashboard
                                  </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {Status === 'Chairman' && (
                        <div className="grid mb-2 gap-1">
                            <div className="bg-gray-200 p-4 text-center">
                                <span className="loader font-semibold text-xs">
                                    You are assigned as Chairman <span className="dot"></span>
                                    <br />
                                </span>
                                <div className="flex flex-col sm:flex-row justify-center items-center mt-2 space-y-2 sm:space-y-0 sm:space-x-2">
                                  <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={handleDashboardClick} >
                                      Dashboard
                                  </button>
                                  <button className="bg-green-500 text-white px-4 py-1 rounded" onClick={handleStudentListClick}>
                                        Student List
                                  </button>
                                  <button className="bg-purple-500 text-white px-4 py-1 rounded" onClick={handleTeacherListClick}>
                                        Teacher List
                                  </button>
                                </div>
                            </div>
                        </div>
                    )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                    <div className="bg-gray-200 p-4 text-center">
                        <span className="font-semibold">Name: </span> {teacher.name}
                    </div>
                    <div className="bg-gray-200 p-4 text-center">
                        <span className="font-semibold">Designation: </span> {teacher.designation}
                    </div>
                    <div className="bg-gray-200 p-4 text-center">
                        <span className="font-semibold">Email: </span> {teacher.email}
                    </div>
                    <div className="bg-gray-200 p-4 text-center">
                        <span className="font-semibold">Mobile: </span> {teacher.phone}
                    </div>
                </div>
            </>
        )}

      <hr className="border-t-4 mt-5" style={{ borderColor: '#FEDE00' }} />
      <div className="text-center mb-3 mt-5">
        <p className="text-lg mb-3 font-bold">Edit Profile</p>
      </div>
      <div className="w-full mx-auto bg-white p-8 rounded-lg">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Column: Department and Designation */}
          <div className="space-y-4">
            <div>
              <label htmlFor="department" className="block text-gray-700 text-sm font-semibold mb-2">
                Department
              </label>
              <select
                id="department"
                type="text"
                name="dept"
                value={formData.dept}
                onChange={handleChange}
                required
                className="w-full px-3 bg-gray-100 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select a department
                </option>
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
              <label htmlFor="designation" className="block text-gray-700 text-sm font-semibold mb-2">
                Designation
              </label>
              <select
                id="designation"
                name="designation"
                type="text"
                value={formData.designation}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select a designation
                </option>
                <option value="Professor">Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Lecturer">Lecturer</option>
              </select>
            </div>
          </div>

          {/* Second Column: Other Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Mobile Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter mobile number"
                required
                className="w-full px-3 bg-gray-100 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Profile Photo (Max Size 2MB)</label>
              <div className="flex items-center space-x-5">
                <div className="shrink-0">
                  <img
                    className="h-12 w-12 object-cover rounded-full"
                    src={formData.profilePhoto ? URL.createObjectURL(formData.profilePhoto) : 'https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg'}
                    alt="Current profile"
                  />
                </div>
                <label className="block">
                  <input
                    type="file"
                    name="profilePhoto"
                    onChange={handleChange}
                    required
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="button w-full py-2 px-4 text-dark font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Update
              <i className="fa-solid fa-angle-right"></i>
            </button>
          </div>

          {/* Error message display */}
        {errorMessage && (
          <div className="md:col-span-2 text-red-500 text-center mt-4">
            {errorMessage}
          </div>
        )}
        </form>
      </div>
    </div>
    </div>
    </>
  );
};

export default TeacherProfile;
