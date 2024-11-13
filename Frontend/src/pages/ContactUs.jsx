import React from 'react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';  // Importing FontAwesome icons
import Navbar from '../components/navbar';

// eslint-disable-next-line react/prop-types
const TeamCard = ({ image, name, email, linkedin, contact, department, session }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg flex flex-col items-center justify-center mx-auto p-3">
      <img className="w-32 h-32 object-cover rounded-full mx-auto border-[#FEDE00] border-2" src={image} alt={name}/>
      
      <div className="px-6 py-2 text-center">
        <div className="font-bold text-xl mb-1 text-black">{name}</div>
        <p className="text-gray-700 text-base">{department} {session}</p>
        <p className="text-gray-700 text-sm mt-2">Contact: {contact}</p>
      </div>
      
      <div className="px-6 pt-4 pb-2 flex justify-center gap-4 mb-1">
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
      session: '2020-21',
    },
    {
      image: 'https://media.licdn.com/dms/image/v2/D5603AQFjicvrl3bwgw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1689980567863?e=1736985600&v=beta&t=ZIIVijx_7bouYV0QsVqMHPowymb5lK02ivBSgiJUi10',
      name: 'Sajid Hasan Takbir',
      email: 'takbirhasan274@gmail.com',
      linkedin: 'https://www.linkedin.com/in/sajid-hasan-takbir/',
      contact: '+8801750006553',
      department: 'Computer Science and Engineering',
      session: '2020-21',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-grow container mx-auto py-2 flex flex-col items-center">
        <h1 className="text-black text-2xl font-semibold mb-2">Credits</h1>
        <p className="text-black mb-4">Designed and Developed by</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full px-4">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} {...member} />
          ))}
        </div>
        <div className="text-center text-black mt-4">
          <p className="text-sm">&copy; All Rights Reserved 2024</p>
        </div>
      </div>
    </div>
  );
};

export default Team;
