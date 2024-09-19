import React from 'react';
import Navbar from '../components/navbar';

function Check() {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 text-black">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
            <h2 className="font-bold text-2xl md:text-3xl mb-6">Check your complaint status</h2>

            <input
              type="text"
              placeholder="Complaint Token"
              className="input input-bordered w-full max-w-xs mb-4 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            />

            <button type="submit" className="btn btn-primary w-full max-w-xs mb-4">
              Check
            </button>

            <p className="text-gray-600">Your complaint is Pending or You have given a Wrong Token</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Check;