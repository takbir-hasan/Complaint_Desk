import React from 'react'
import Navbar from '../components/navbar'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function Complaint() {
      const navigate = useNavigate();

      const handleClick = () => {
        navigate('/write');   
      };
      const handleClick2 = () => {
        navigate('/check');   
      };
      
      return (

        <>
         <Helmet>
        <title> Success | Complaint </title>
        </Helmet>

         <div className="flex flex-col h-screen overflow-x-hidden max-auto text-black">
                  <Navbar />

       <div className="flex flex-col items-center justify-center h-screen bg-gray-100"> 

      <div className="max-w-screen-md mx-auto px-4 md:px-20 py-8 text-center"> 

        <p className=" text-2xl md:text-3xl mb-8">Thanks for your complaint. Your complaint will be solved as soon as possible. Your complaint token number is <b>{localStorage.getItem('complaintToken') || "...."}</b>.</p>

        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <button onClick={handleClick} className="btn btn-outline btn-info w-full md:w-auto">Another Complaint</button>
          <button onClick={handleClick2} className="btn btn-outline btn-warning w-full md:w-auto">Complaint Status</button>
        </div>

      </div>

    </div>

            </div>
        
        </>


      )
}

export default Complaint