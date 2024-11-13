import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCheck } from 'react-icons/fa'; // Import the user-check icon for credits

const Footer = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/contact'); 
  };

  return (
    <footer className="bg-gray-100 text-white py-6 fixed bottom-0 right-0 mr-4 mb-4">
      <div className="flex justify-end items-center">
        <div className="group relative flex justify-center items-center text-zinc-600 text-sm font-bold">
          <div
            className="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-[150%] -translate-y-[300%] duration-500 group-hover:delay-500 skew-y-[20deg] group-hover:skew-y-0 shadow-md bg-[#FEDE00] rounded-md"
          >
          </div>

          <div
            onClick={handleClick}
            className="shadow-md flex items-center group-hover:gap-2 p-3 rounded-full cursor-pointer duration-300 bg-[#FEDE00]"
          >
            <FaUserCheck className="fill-black" size={20} /> {/* User-check icon for credits */}
            <span className="text-[0px] group-hover:text-sm text-black duration-300">
              Credits 
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
