import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Helmet } from 'react-helmet';

const Verification = () => {
  const [status, setStatus] = useState('');
  const [textColor, setTextColor] = useState('black');
  const [token, setToken] = useState('');
  const email = localStorage.getItem('temail');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, email }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // localStorage.setItem('status','success');

        localStorage.clear();


        setStatus('Mail verification successful. Please, Contact with the chairman of the department for account confirmation.');
        setTextColor('green');
        // localStorage.setItem('tmail', data.email);
        // window.location.href = '/TeacherProfile';
        // window.location.href = '/Login'; 
      } else {
        console.error('Error checking verification:', response.statusText);
        setStatus('Verification failed');
        setTextColor('red');
      }
    } catch (err) {
      console.error('Error checking verification:', err);
    }
  };

  return (
    <>
      <Helmet>
        <title>Verification | Teacher</title>
      </Helmet>

      <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 text-black">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded text-center shadow-lg w-full max-w-md">
            <h2 className="font-bold text-2xl md:text-3xl mb-6">Complete Verification</h2>
            <p className="mb-6">You must be verified for your security. We prevent misuse of data.</p>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Verification Code"
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="input input-bordered w-full max-w-xs mb-4 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <p className="mb-6" style={{ color: textColor }}>{status}</p>
              <button type="submit" className="button text-black w-full max-w-xs mb-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verification;