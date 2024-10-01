import React, { useState } from 'react';
import Navbar from '../components/navbar'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherProfile = () => {
  const [formData, setFormData] = useState({
    department: '',
    designation: '',
    phone: '',
    password: '',
    profilePhoto: null,
  });



  const [Status, setStatus] = useState('Committee'); // Define Status here
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    if (Status === 'Committee') {
      navigate('/CommitteDashboard'); // Redirect to the CommitteeDashboard page
    }
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePhoto') {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
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

    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
       <Navbar />
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
      <div className="p-4 text-center">
        <img
          className="mx-auto"
          src="https://img.freepik.com/premium-photo/girl-stands-front-chalkboard-with-word-phot-it_984237-23448.jpg?ga=GA1.1.209838246.1722743839&semt=ais_hybrid"
          alt="Teacher"
          style={{ borderRadius: '50%', width: '200px' }}
        />
      </div>
      <div className="text-center mb-3">
        <span className="font-semibold">Department: </span> Computer Science and Engineering (CSE)
      </div>

      {Status === 'Committee' && (
        <div className="grid mb-2 gap-1">
          <div className="bg-gray-200 p-4 text-center">
            <span className="loader font-semibold text-xs">
              You are assigned to Complaint Committee <span className="dot"></span>
              <br />
            </span>
            <button className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
            onClick={handleDashboardClick}
            >
              Dashboard
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        <div className="bg-gray-200 p-4 text-center">
          <span className="font-semibold">Name: </span> Syed Md. Galib
        </div>
        <div className="bg-gray-200 p-4 text-center">
          <span className="font-semibold">Designation: </span> Chairman
        </div>
        <div className="bg-gray-200 p-4 text-center">
          <span className="font-semibold">Email: </span> example@just.edu.bd
        </div>
        <div className="bg-gray-200 p-4 text-center">
          <span className="font-semibold">Mobile: </span>01*********
        </div>
      </div>

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
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 bg-gray-100 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select a department
                </option>
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="BME">BME</option>
                <option value="PHARM">PHARM</option>
              </select>
            </div>

            <div>
              <label htmlFor="designation" className="block text-gray-700 text-sm font-semibold mb-2">
                Designation
              </label>
              <select
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select a designation
                </option>
                <option value="Chairman">Chairman</option>
                <option value="Professor">Professor</option>
                <option value="Assistant Professor">Assistant Professor</option>
                <option value="Associate Professor">Associate Professor</option>
                <option value="Lecturer">Lecturer</option>
              </select>
            </div>
          </div>

          {/* Second Column: Other Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Mobile Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className="w-full px-3 bg-gray-100 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Profile Photo</label>
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
        </form>
      </div>
    </div>
    </div>
    </>
  );
};

export default TeacherProfile;
