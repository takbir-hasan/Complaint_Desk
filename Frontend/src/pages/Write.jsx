import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';

function Write() {

  const navigate = useNavigate();


  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [id, setId] = useState('');
  const [complaintDept, setComplaintDept] = useState('');
  const [complaintText, setComplaintText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form data:', { name, department, id, complaintDept, complaintText });
    navigate('/complaint')
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 text-black">
        <Navbar />
        <div className="flex-grow p-4">
          <form onSubmit={handleSubmit} className="mx-auto p-6 bg-white rounded shadow-lg w-full sm:max-w-md md:max-w-lg lg:max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-center ">Write your Complaint:</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Name field */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name (Optional):</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  placeholder='Your Name'
                  onChange={(e) => setName(e.target.value)}
                  className="shadow appearance-none border rounded text-center bg-gray-100 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 
                />
              </div>

              {/* Department field */}
              <div className="mb-4">
                <label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">Department (Optional):</label>
                <select
                  id="department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="shadow appearance-none border text-center rounded bg-gray-100 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                 
                >
                  <option value="">Select Your Department</option>
                  <option value="CSE">CSE</option>
                  <option value="EST">EST</option>
                   <option value="MB">MB</option>
                   <option value="FB">FB</option>
                   <option value="FMB">FMB</option>
                </select>
              </div>

              {/* ID field */}
              <div className="mb-4">
                <label htmlFor="id" className="block text-gray-700 text-sm font-bold mb-2">Student ID (Optional):</label>
                <input
                  type="text"
                  id="id"
                  value={id}
                  placeholder='Your ID'
                  onChange={(e) => setId(e.target.value)}
                  className="shadow appearance-none border text-center bg-gray-100 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
           
                />
              </div>

              {/* Complaint Department field */}
              <div className="mb-4">
                <label htmlFor="complaintDept" className="block text-gray-700 text-sm font-bold mb-2">Complaint Department:</label>
                <select
                  id="complaintDept"
                  value={complaintDept}
                  onChange={(e) => setComplaintDept(e.target.value)}
                  className="shadow appearance-none border rounded text-center bg-gray-100 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">Select Complaint Department</option>
                  <option value="CSE">CSE</option>
                  <option value="EST">EST</option>
                   <option value="MB">MB</option>
                   <option value="FB">FB</option>
                   <option value="FMB">FMB</option>
                </select>
              </div>
            </div>

            {/* Complaint Textarea */}
            <div className="mb-4">
              <label htmlFor="complaintText" className="block text-gray-700 text-sm font-bold mb-2">Complaint:</label>
              <textarea
                id="complaintText"
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
                placeholder='Write your complaint here...'
                className="shadow appearance-none border bg-gray-100 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                required
              />
            </div>

            <div className="flex items-center justify-center mt-6">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Write;

