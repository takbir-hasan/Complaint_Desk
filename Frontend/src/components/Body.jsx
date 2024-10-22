import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Body() {
  const [solved, setSolved] = useState('');
  const [total, setTotal] = useState('');
  const [error, setError] = useState(null); 

  const navigate = useNavigate();

  const handleClick = () => {
    if(localStorage.getItem('semail'))
    navigate('/write');
    else
    toast.error('You must be login first.');
    
  };

  const handleClick2 = () => {
    navigate('/check');
  };

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const response = await fetch(`/info`, { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const result = await response.json();
        setSolved(result.solvedProblems);
        setTotal(result.totalProblems);
        
      } catch (err) {
        setError(err.message); 
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>; 
  }

  return (
   <>
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-screen-md mx-auto px-4 md:px-20 py-8 text-center">
        <p className="font-bold text-2xl md:text-3xl mb-8">
          {solved}/{total} Complaints are Solved
        </p>

        <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
          <button onClick={handleClick} className="button  w-full md:w-auto">
            Write a Complaint
          </button>
          <button onClick={handleClick2} className="btn btn-outline btn-warning w-full md:w-auto">
            Complaint Status
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
    </>
  );
}

export default Body;
