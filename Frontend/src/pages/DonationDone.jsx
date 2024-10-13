import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function DonationDone() {
  const navigate = useNavigate();
  const [textColor, setTextColor] = useState('');
  const [con, setCon] = useState('');
  const [text, setText] = useState('');
  const { condition } = useParams();

  useEffect(() => {
    if (condition == 'successful') {
      setCon('Success');
      setText('Transaction Success. Thank You for Your Donation!');
      setTextColor('green');
    } else {
      setCon('Failed');
      setText('Oops! Transaction Failed.');
      setTextColor('red');
    }
  }, [condition]); // This ensures the state updates only when `condition` changes

  const handleClick = () => {
    navigate('/');
  };

  const handleClick2 = () => {
    navigate('/donation');
  };

  return (
    <>
      <Helmet>
        <title>{con} | Donation</title>
      </Helmet>

      <div className="flex flex-col min-h-screen overflow-x-hidden text-black">
        <Navbar />

        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <div className="max-w-screen-md mx-auto px-4 md:px-20 py-8 text-center">
            <p style={{ color: textColor }} className="text-2xl md:text-3xl mb-8">
              {text}
            </p>

            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
              <button onClick={handleClick} className="button w-full md:w-auto">
                Go to Home
              </button>
              <button onClick={handleClick2} className="button w-full md:w-auto">
                Donate More
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DonationDone;
