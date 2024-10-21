import React, { useState } from 'react';
import Navbar from '../components/navbar'
import { Helmet } from 'react-helmet';

const StudentRegister = () => {

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    id: '',
    session: '',
    email: '',
    phone: '',
    password: '',
    profilePhoto: null,
  });

  
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input Validation
    if (!validateEmail(formData.email)) {
      alert('Invalid email format');
      return;
    }

    if (!validatePhone(formData.phone)) {
      alert('Invalid phone number format');
      return;
    }

    if (formData.password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    try {
      let base64Photo = null;
      if (formData.profilePhoto) {
        base64Photo = await convertToBase64(formData.profilePhoto);
      }

      const response = await fetch('/student/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, profilePhoto: base64Photo }),
      });

     if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message);
        
      } else {
        localStorage.setItem('name', formData.name);
        localStorage.setItem('semail', formData.email);
        window.location.href = '/sverification'; 
        
        console.log('Signup is pending!');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('An unexpected error occurred');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
    };
    const validatePhone = (phone) => {
    // Adjust this regex based on your phone number format requirements (e.g., country code, etc.)
    const phoneRegex = /^(01|\+8801)[3-9]\d{8}$/;
        return phoneRegex.test(phone);
      };

  return (
    <>
      <Helmet>
    <title> Sign Up | Teacher </title>
    </Helmet>

    <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 text-black">
        <Navbar />
        <div className="w-full max-w-md  mx-auto mt-4 mb-4 bg-white p-7 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
            <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter full name"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.name}
                onChange={handleChange}
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Department</label>
            <select
                id="department"
                name="department"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={formData.department}
                onChange={handleChange}
                required
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
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Student ID</label>
            <input
                type="text"
                id="id"
                name="id"
                placeholder="Enter your student ID"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.id}
                onChange={handleChange}
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Session</label>
            <input
                type="text"
                id="session"
                name="session"
                placeholder="Enter your session"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.session}
                onChange={handleChange}
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="example@just.edu.bd"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.email}
                onChange={handleChange}
            />
            </div>
            
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Mobile Number</label>
            <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Enter mobile number"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.phone}
                onChange={handleChange}
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.password}
                onChange={handleChange}
                required
            />
            </div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Profile Photo</label>
            <div className="flex mb-4 items-center space-x-5">
            <div className="shrink-0 mb-2">
                <img
                className="h-12 w-12 object-cover rounded-full"
                src="https://img.freepik.com/free-vector/mans-face-flat-style_90220-2877.jpg?ga=GA1.1.209838246.1722743839&semt=ais_hybrid"
                alt="Current profile photo"
                />
            </div>
            <label className="block mb-4">
                <span className="sr-only">Choose profile photo (Max Size 2MB)</span>
                <input
                type="file"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                name="profilePhoto"
                onChange={handleChange}
                required
                />
            </label>
            </div>
            <button
            type="submit"
            className="button w-full py-2 px-4 text-dark font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white"
            >
            Sign Up
            <i className="fa-solid fa-angle-right"></i>
            </button>
            <p className="mt-4 text-center text-gray-600 text-sm">
                Already have an account? <a href="/slogin" className="text-indigo-500 hover:text-indigo-700">Log In</a>
            </p>
        </form>
        </div>
        </div>
    </>
    
  );
};

export default StudentRegister;
