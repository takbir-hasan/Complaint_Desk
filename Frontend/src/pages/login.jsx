import React, { useState } from 'react';
import Navbar from '../components/navbar'
import { Helmet } from 'react-helmet';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission refresh
    try {
      const response = await fetch('/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        localStorage.setItem('temail', email); 
        localStorage.setItem('status','success');
        window.location.replace('/TeacherProfile')
         
      } else {
          const errorData = await response.json();
          alert(errorData.message);
      }
  } catch (error) {
      alert('Error logging in. Please try again later.');
  }

  };

  return (
    <>
         <Helmet>
    <title> Login | Teacher </title>
    </Helmet>

    <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 text-black">
        <Navbar />
    <div className="w-full max-w-md mx-auto mt-4 mb-4 bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@just.edu.bd"
            className="w-full px-3 bg-gray-100 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 text-left">
          <a href="/forget" className="text-indigo-500 hover:text-indigo-700 text-sm">Forgot Password?</a>
        </div>

        <button
          type="submit"
          className="button w-full py-2 px-4 text-dark font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white"
        >
          Login <i className="fa-solid fa-angle-right"></i>
        </button>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account? <a href="/Signup" className="text-indigo-500 hover:text-indigo-700">Sign Up</a>
        </p>
      </form>
    </div>
    </div>
    </>
  );
};

export default Login;
