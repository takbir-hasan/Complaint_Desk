import React from 'react';
import { useNavigate } from 'react-router-dom';


function Body() {

        const navigate = useNavigate();
      
        const handleClick = () => {
          navigate('/write');   
        };
        const handleClick2 = () => {
          navigate('/check');   
        };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100"> 

      <div className="max-w-screen-md mx-auto px-4 md:px-20 py-8 text-center"> 

        <p className="font-bold text-2xl md:text-3xl mb-8">3/10 Complaints are Solved</p>

        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <button onClick={handleClick} className="btn btn-outline btn-info w-full md:w-auto">Write a Complaint</button>
          <button onClick={handleClick2} className="btn btn-outline btn-warning w-full md:w-auto">Complaint Status</button>
        </div>

      </div>

    </div>
  );
}

export default Body;