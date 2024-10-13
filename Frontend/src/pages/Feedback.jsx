import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Helmet } from 'react-helmet';

function Feedback() {
      const navigate = useNavigate();

      const [complaintText, setComplaintText] = useState('');
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form data:', { complaintText });
        try {
    
          const response = await fetch('/feedback', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ complaint: complaintText }),
          });
    
          if (response.ok) {
           
            navigate('/feedbackSuccess')
            
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
    <title> Feedback </title>
    </Helmet>

     <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 text-black">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="mx-auto p-6 bg-white rounded shadow-lg w-full sm:max-w-md md:max-w-lg lg:max-w-2xl">
            <h2 className="text-2xl font-semibold mb-4 text-center ">Give your Feedback</h2>

           

            {/* Complaint Textarea */}
            <div className="mb-4">
              <textarea
                id="complaintText"
                value={complaintText}
                onChange={(e) => setComplaintText(e.target.value)}
                placeholder='Write your feedback here...'
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
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Feedback