import React, { useState } from 'react';
import Navbar from '../components/navbar'
import { Helmet } from 'react-helmet';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    email: '',
    designation: '',
    phone: '',
    password: '',
    profilePhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle form submission logic here
  };

  return (
    <>
      <Helmet>
    <title> Sign Up | Teacher </title>
    </Helmet>

    <div className="flex flex-col min-h-screen bg-gray-100 text-black">
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
                <option value="CSE">CSE</option>
                <option value="EEE">EEE</option>
                <option value="BME">BME</option>
                <option value="PHARM">PHARM</option>
                {/* Add more options as needed */}
                
            </select>
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
            <label className="block text-gray-700 text-sm font-semibold mb-2">Designation</label>
            <select
                id="designation"
                name="designation"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={formData.designation}
                onChange={handleChange}
                required
            >
                <option value="" disabled>
                Select a designation
                </option>
                {/* <option value="Chairman">Chairman</option> */}
                <option value="Professor">Professor</option>
                <option value="Associate Professor">Assistant Professor</option>
                <option value="Assistant Professor">Associate Professor</option>
                <option value="Lecturer">Lecturer</option>
            </select>
            </div>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Mobile Number</label>
            <input
                type="text"
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
                <span className="sr-only">Choose profile photo</span>
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
                Already have an account? <a href="/Login" className="text-indigo-500 hover:text-indigo-700">Log In</a>
            </p>
        </form>
        </div>
        </div>
    </>
    
  );
};

export default Signup;
