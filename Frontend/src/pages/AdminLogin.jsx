import React, { useState } from 'react';
import Navbar from '../components/navbar'

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
  };

  return (
    <>
     <div className="flex flex-col min-h-screen bg-gray-100 text-black">
        <Navbar />
        <div className="w-full max-w-md mt-4 mb-4 mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@just.edu.bd"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            </div>

            <div className="mb-4 text-left">
            <a href="#" className="text-indigo-500 hover:text-indigo-700 text-sm">Forgot Password?</a>
            </div>

            <button type="submit" className="button w-full py-2 px-4 text-dark font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white">
            Login
            <i className="fa-solid fa-angle-right"></i>
            </button>
            </form>
        </div>
    </div>
    </>
  );
};

export default AdminLogin;
