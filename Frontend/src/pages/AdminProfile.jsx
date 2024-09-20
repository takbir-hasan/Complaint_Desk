import { useState } from 'react';
import Navbar from '../components/navbar'


function AdminProfile() {
  return (
    <>
     <div className="flex flex-col min-h-screen bg-gray-100 text-black">
        <Navbar />
      <div className="container-fluid max-w-5xl mt-4 mb-4 ml-auto mr-auto mx-auto bg-white p-8 rounded-lg shadow-lg">
      <p className="text-lg mb-3 font-bold">Admin Profile</p>
      <hr className="border-t-4" style={{ borderColor: '#FEDE00' }} />
      <p className="text-gray-600 mb-5 text-2xl mt-5 text-center">
      Welcome to the admin profile page. Here, you can change your password and view feedback.</p>
    <p className="text-md mb-0 text-center">Change Password</p>
    <div className="flex-grow flex flex-col items-center justify-center p-4">
      <input
          type="text"
          placeholder="Enter New Password"
          className="input input-bordered w-full max-w-xs mb-4 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
      />

      <button type="submit" className="button  text-black w-full max-w-xs mb-4">
        Update
      </button>
      </div>

      <hr className="border-t-4" style={{ borderColor: '#FEDE00' }} />
      <p className="text-lg mb-3 mt-2 font-bold text-center">Feedback</p>

    </div>
    </div>
    </>
  );
}

export default AdminProfile;
