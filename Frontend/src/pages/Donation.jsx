import React, { useState } from 'react';
import Navbar from '../components/navbar';

function Donation() {
  const [amount, setAmount] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you would typically handle sending the donation data to your backend for processing
    console.log('Donation data:', { amount });
  };

  return (
      <>
   <div className="flex flex-col h-screen bg-gray-100 text-black">
        <Navbar />
        <div className=" flex flex-grow items-center justify-center p-4"> 
          <div className="bg-white p-6 rounded-lg fle shadow-lg w-full max-w-md md:max-w-lg lg:max-w-xl"> 
            <h2 className="text-2xl font-semibold text-center mb-6">Support Our Cause</h2>
            <p className="text-gray-600 text-center mb-6">
              Your generosity can make a real difference. Every donation, big or small, helps us continue our important work.
            </p> 

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-gray-700 text-sm font-bold mb-2">
                  Donation Amount:
                </label>
                <div className="relative"> 
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span> 
                  </div>
                  <input 
                    type="number" 
                    id="amount"   
 
                    placeholder="Enter amount"
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    className="pl-7 shadow bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    required 
                  />
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button 
                  type="submit" 
                  className="bg-yellow-300 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Donate Now
                </button>
              </div>
            </form>
          </div> 
        </div>
      </div>
  </>
  );
}

export default Donation;