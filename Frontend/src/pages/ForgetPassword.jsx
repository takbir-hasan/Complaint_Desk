import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Helmet } from 'react-helmet';

function ForgetPassword() { // admin forget pass page
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null); // Store error messages
  const [successMessage, setSuccessMessage] = useState(''); // Store success message
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      // Send email verification request
      const response = await fetch('/adminforgetpass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), 
      });

      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          setSuccessMessage(data.message); // Set success message
          setError(null); // Clear any previous error messages
        } else {
          setError(data.message); // Set error message from response
        }
      } else {
        setError('Error sending verification email. Please, provide a correct email address.');
      }
    } catch (err) {
      console.error('Error verifying email:', err);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title> Forgot Password </title>
      </Helmet>

      <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 text-black">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded text-center shadow-lg w-full max-w-md">
            <h2 className="font-bold text-2xl md:text-3xl mb-6">Forgot Password</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email address"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full max-w-xs mb-4 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />

              {error && <p className="text-red-500 font-bold mb-4">{error}</p>}
              {successMessage && <p className="text-green-500 font-bold mb-4">{successMessage}</p>}

              {/* <button type="submit" className="button text-black w-full max-w-xs mb-4">
                Verify
              </button> */}
               {loading ? (
                <div className="loader-verify"></div> // Display loader while loading
              ) : (
                <button type="submit" className="button text-black w-full max-w-xs mb-4">
                  Verify
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;
