import React, {useState} from 'react';
import Navbar from '../components/navbar';
import { Helmet } from 'react-helmet';


function Check() {

  const [status, setSatus] = useState('');
  const [textColor, setTextColor] = useState('black');
  const [token, setToken] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send token as a query parameter for a GET request
      const response = await fetch(`/check?token=${token}`, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        const status = data.status;
  
        if (status === 'submitted') {
          setSatus('Your complaint is processing.');
          setTextColor('blue');
        } else if (status === 'Pending') {
          setSatus('Your complaint has been reached to the investigative committee.');
          setTextColor('orange');
        } else if (status === 'Solved') {
          setSatus('Your complaint has been solved. Thanks for your concern.');
          setTextColor('green');
        } else if (status === 'Discarded') {
          setSatus('Sorry! Your complaint has been discarded. Write a complaint correctly and it should be authentic and .');
          setTextColor('red');
        } else {
          setSatus('Wrong Token Number!');
          setTextColor('red');
        }
      } else {
        console.error('Error checking complaint:', response.statusText);
      }
    } catch (err) {
      console.error('Error checking complaint:', err);
    }
  };
  

  return (
    <>
    <Helmet>
    <title> Status | Complaint </title>
    </Helmet>

      <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 text-black">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded text-center shadow-lg w-full max-w-md">
            <h2 className="font-bold text-2xl md:text-3xl mb-6">Check your complaint status</h2>

            <form onSubmit={handleSubmit}> 
  <input 
    type="text"
    placeholder="Complaint Token"
    id='token'
    value={token}
    onChange={(e) => setToken(e.target.value)}
    className="input input-bordered w-full max-w-xs mb-4 py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
    required
  />

  <button type="submit" className="button text-black w-full max-w-xs mb-4">
    Check
  </button>
</form>
            <p style={{ color: textColor }}>{status}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Check;