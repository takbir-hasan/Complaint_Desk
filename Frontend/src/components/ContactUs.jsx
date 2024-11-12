import React from 'react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';  // Importing FontAwesome icons
import Navbar from './navbar';
// eslint-disable-next-line react/prop-types
const TeamCard = ({ image, name, email, linkedin, contact, department, session }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg items-center justify-center">
      <img className="w-32 h-32 object-cover rounded-full mx-auto border-[#FEDE00] border-2" src={image} alt={name}/>
      
      <div className="px-6 py-2">
        <div className="font-bold text-xl mb-1 text-center">{name}</div>
        <p className="text-gray-700 text-base text-center">{department}  {session}</p>
        <p className="text-gray-700 text-sm text-center mt-2">Contact: {contact}</p>
      </div>
      
      <div className="px-6 pt-4 pb-2 flex justify-center gap-4 mb-4">
        <button
          className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
          onClick={() => window.location.href = `mailto:${email}`}
        >
          <FaEnvelope className="text-xl" />
        </button>
        <button
          className="flex items-center justify-center w-8 h-8 bg-blue-700 text-white rounded-full hover:bg-blue-800 focus:outline-none"
          onClick={() => window.open(linkedin, "_blank")}
        >
          <FaLinkedin className="text-xl" />
        </button>
      </div>
    </div>
  );
};

const Team = () => {
  const teamMembers = [
    {
      image: 'https://media.licdn.com/dms/image/v2/D5603AQFJ5Vyaeqi-lQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1716058317164?e=1736985600&v=beta&t=MoAHHVC5715yg6-aZEZHxpgs47My-z7Nh14n_DRGvrY',
      name: 'Md Saniul Basir Saz',
      email: 'saniul.cse.just@gmail.com',
      linkedin: 'https://www.linkedin.com/in/md-saniul-basir-saz/',
      contact: '+8801616781441',
      department: 'Computer Science and Engineering',
      session: '2020-2021',
    },
    {
      image: 'https://via.placeholder.com/150',
      name: 'Jane Smith (CTO)',
      email: 'jane.smith@example.com',
      linkedin: 'https://linkedin.com/in/janesmith',
      contact: '+1 987 654 321',
      department: 'Computer Science and Engineering',
      session: '2020-2021',
    },
  ];

  return (
    <>
    <Navbar/>
    <div className="container mx-auto py-8 justify-items-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 ml-2">
        {teamMembers.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>
      <div className="text-center mb-8">
        <p className="text-sm">&copy; All Rights Reserved 2024  <br/>Department of Computer Science and Engineering (CSE)</p>
     </div>
    </div>
    </>
  );
};

export default Team;
