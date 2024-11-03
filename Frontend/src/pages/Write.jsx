import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Helmet } from 'react-helmet';

function Write() {

  // const navigate = useNavigate();


  const [complaintDept, setComplaintDept] = useState('');
  const [complaintText, setComplaintText] = useState('');

 const name = localStorage.getItem('name');
 const department = localStorage.getItem('department');
 const session = localStorage.getItem('session');
 const id = localStorage.getItem('id');
 const token = localStorage.getItem('token');

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form data:', { name, department, id, session, complaintDept, complaintText });
    try {
    
      const response = await fetch('/complaint', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add Authorization header
        },
        body: JSON.stringify({ name, dept: department, id, session, cdept: complaintDept, complaint: complaintText }),
      });

      if (response.ok) {
        
        const data = await response.json();
        const complaintToken = data.token;

        localStorage.setItem('complaintToken', complaintToken);
        window.location.replace('/complaint');
      } else {

        console.error('Error submitting complaint:', response.statusText);

      }
    } catch (err) {
      console.error('Error submitting complaint:', err);
      
    }
  };

  return (
    <>
    <Helmet>
    <title>Submit Complaint </title>
    </Helmet>
      <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 text-black">
        <Navbar />
        <div className="flex-grow p-4">
          <form onSubmit={handleSubmit} className="mx-auto p-6 bg-white rounded shadow-lg w-full sm:max-w-md md:max-w-lg lg:max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-center ">Write your Complaint</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">


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
                className="button text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

