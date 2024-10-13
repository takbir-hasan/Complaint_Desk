import React from 'react'
import Navbar from '../components/navbar'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function FeedbackSuccess() {
      const navigate = useNavigate();

      const handleClick = () => {
            navigate('/home');
      };
      return (
            <>

<Helmet>
    <title> Success | Feedback </title>
    </Helmet>
                  <div className="flex flex-col min-h-screen overflow-x-hidden text-black">
                        <Navbar />

                        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">

                              <div className="max-w-screen-md mx-auto px-4 md:px-20 py-8 text-center">

                                    <p className="font-bold text-2xl md:text-3xl mb-8">Thanks for your feedback.</p>

                                    <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6">
                                          <button onClick={handleClick} className="btn btn-outline bg-yellow-300 text-black hover:bg-yellow-500 w-full md:w-auto">Go Home</button>

                                    </div>

                              </div>

                        </div>

                  </div>
            </>
      )
}

export default FeedbackSuccess