import React, { useState } from 'react';
import Navbar from '../components/navbar';
import { Helmet } from 'react-helmet';

function Donation() {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch('/donor', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      })
      .then((res)=> res.json())
      .then((result)=>{
        window.location.replace(result.url);
        console.log(result);
      });
  
     
    } catch (err) {
      console.error('Error submitting donation:', err);
      
    }
  };

  return (
      <>
        <Helmet>
    <title> Donation </title>
    </Helmet>

   <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-100 text-black">
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
    <span className="text-gray-500 sm:text-sm">BDT</span> 
  </div>
  <input 
    type="number" 
    id="amount"   
    placeholder="Enter amount"
    value={amount} 
    onChange={(e) => setAmount(e.target.value)} 
    className="pl-12 shadow bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
    required 
  />
</div>

              </div>

              <div className="flex items-center justify-center">
                <button 
                  type="submit" 
                  className=" button  text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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