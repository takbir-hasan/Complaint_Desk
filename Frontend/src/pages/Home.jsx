import React from 'react';
import Navbar from '../components/navbar';
import Body from '../components/body';

function Home() {
  return (
    <>
    <div className="flex flex-col h-screen text-black">
        <Navbar />
        <Body/>
      </div>
    </>
  )
}

export default Home