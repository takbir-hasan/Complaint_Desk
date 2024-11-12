import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/contact'); 
  };

  return (
    <footer className="bg-gray-100 text-white py-6 relative">
      <div className="container mx-auto flex justify-between items-center ml-3">
       
        <div className="group relative flex justify-center items-center text-zinc-600 text-sm font-bold">
          <div
            className="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-[150%] -translate-y-[300%] duration-500 group-hover:delay-500 skew-y-[20deg] group-hover:skew-y-0 shadow-md bg-[#FEDE00] rounded-md"
          >
          </div>

         
          <div
            onClick={handleClick}
            className="shadow-md flex items-center group-hover:gap-2 p-3 rounded-full cursor-pointer duration-300 bg-[#FEDE00]"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="20px"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-black"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                d="M15.4306 7.70172C7.55045 7.99826 3.43929 15.232 2.17021 19.3956C2.07701 19.7014 2.31139 20 2.63107 20C2.82491 20 3.0008 19.8828 3.08334 19.7074C6.04179 13.4211 12.7066 12.3152 15.514 12.5639C15.7583 12.5856 15.9333 12.7956 15.9333 13.0409V15.1247C15.9333 15.5667 16.4648 15.7913 16.7818 15.4833L20.6976 11.6784C20.8723 11.5087 20.8993 11.2378 20.7615 11.037L16.8456 5.32965C16.5677 4.92457 15.9333 5.12126 15.9333 5.61253V7.19231C15.9333 7.46845 15.7065 7.69133 15.4306 7.70172Z"
              ></path>
            </svg>
            <span className="text-[0px] group-hover:text-sm duration-300">
              Contact Us
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
