import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function ResetPassword() { // admin reset page
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const { token } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic input validation
    if (!password || !confirmPassword) {
      setError('Please enter both password and confirm password fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password should be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Confirm password does not match password.');
      return;
    }

    try {
      const response = await fetch('/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          setSuccessMessage(data.message);
          setError(null);
         window.location.href = '/AdminLogin';
        } else {
          setError(data.message); // Set error message from response
        }
      } else {
        setError('Server error. Please try again later.');
      }
    } catch (err) {
      console.error('Error verifying email:', err);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>

      <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 text-black">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded text-center shadow-lg w-full max-w-md">
            <h2 className="font-bold text-2xl md:text-3xl mb-6">Reset Password</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="password"
                placeholder="New Password"
                id="newPassword"
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs mb-4 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                id="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs mb-4 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />

              {error && <p className="text-red-500 font-bold mb-4">{error}</p>}
              {successMessage && <p className="text-green-500 font-bold mb-4">{successMessage}</p>}

              <button type="submit" className="button text-black w-full max-w-xs mb-4">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;